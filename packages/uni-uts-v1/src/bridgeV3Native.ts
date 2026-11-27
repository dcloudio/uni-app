import type { UTSBridge } from '@dcloudio/uts'

type Method = NonNullable<UTSBridge['native']>['methods'][number]
type WireType = Method['result']

const descriptor: Record<WireType, string> = {
  double: 'D',
  boolean: 'Z',
  string: 'Ljava/lang/String;',
  object: 'Ljava/lang/Object;',
  void: 'V',
}
const jniType: Record<WireType, string> = {
  double: 'Double',
  boolean: 'Boolean',
  string: 'Object',
  object: 'Object',
  void: 'Void',
}

type Scalar = Exclude<Method['params'][number], object>
type ResultRecord = NonNullable<Method['result_record']>

function layouts(method: Method) {
  const keys: string[][] = []
  const inputs = method.params.map((param) => {
    if (typeof param === 'string') return -1
    return keys.push(param.fields.map((f) => f.name)) - 1
  })
  const output = method.result_record
    ? keys.push(method.result_record.fields.map((f) => f.name)) - 1
    : -1
  return { inputs, output, keys }
}

function overload(method: Method, argc: number, recordId?: number) {
  const shape = layouts(method)
  const name = `m${method.method_id}_${argc}`
  const wires: string[] = []
  const length = argc + Number(method.receiver) + Number(method.completion)
  const lines: string[] = []
  function read(wire: Scalar, value: string) {
    lines.push(
      `      if (!Read${
        wire[0].toUpperCase() + wire.slice(1)
      }(context, jni, ${value}, values[${
        wires.length
      }])) return ArgumentError(env);`
    )
    wires.push(descriptor[wire])
  }
  if (method.receiver) read('object', 'info.Arg(0)')
  method.params.slice(0, argc).forEach((param, i) => {
    const arg = `info.Arg(${i + Number(method.receiver)})`
    if (typeof param === 'string') return read(param, arg)
    lines.push(
      `      fast::Object input${i};`,
      `      fast::LocalObjectLayout keys${i};`,
      `      if (!ReadRecord(context, ${arg}, *layouts.values[${shape.inputs[i]}], input${i}, keys${i})) return ArgumentError(env);`
    )
    param.fields.forEach((field, j) => {
      const prop = `p${i}_${j}`
      lines.push(
        `      napi_value ${prop};`,
        `      if (context.GetProperty(input${i}, keys${i}, ${j}, &${prop}) != napi_ok) return ArgumentError(env);`
      )
      read(field.wire, prop)
    })
  })
  if (method.completion) read('object', `info.Arg(${length - 1})`)
  const signature = `(${wires.join('')})${descriptor[method.result]}`
  if (wires.length) lines.unshift(`      jvalue values[${wires.length}]{};`)
  const call = `jni->CallStatic${
    jniType[method.result]
  }MethodA(clazz, ${name}, ${wires.length ? 'values' : 'nullptr'})`
  lines.push(
    `      ${method.result === 'void' ? '' : 'auto result = '}${call};`,
    '      if (ThrowIfJavaException(env, jni)) return;'
  )
  const returns = {
    void: 'return info.ReturnUndefined();',
    boolean: 'return info.ReturnBoolean(result == JNI_TRUE);',
    double: 'return info.ReturnDouble(result);',
    string:
      'return info.Return(WriteString(context, jni, static_cast<jstring>(result)));',
    object:
      recordId === undefined
        ? 'return info.Return(ToJS(env, jni, result));'
        : `return info.Return(Result${recordId}(context, jni, result, *layouts.values[${shape.output}]));`,
  }
  lines.push(`      ${returns[method.result]}`)
  return {
    name,
    signature,
    body: [`    case ${length}: {`, ...lines, '    }'].join('\n'),
  }
}

const primitiveReaders: Record<string, string> = {
  Z: 'Boolean',
  I: 'Int',
  J: 'Long',
  S: 'Short',
  B: 'Byte',
  D: 'Double',
  F: 'Float',
}

function resultReader(record: ResultRecord, id: number) {
  const reads = record.fields.map(({ descriptor }, i) => {
    const field = `record${id}[${i}]`
    const primitive = primitiveReaders[descriptor]
    if (primitive) {
      const get = `jni->Get${primitive}Field(result, ${field})`
      return `  values[${i}] = context.${
        primitive === 'Boolean' ? 'Boolean' : 'Double'
      }(${get});`
    }
    let convert: string
    if (descriptor === 'Ljava/lang/String;')
      convert = 'WriteString(context, jni, static_cast<jstring>(value))'
    else if (descriptor === 'Ljava/lang/Boolean;')
      convert =
        'context.Boolean(jni->CallBooleanMethod(value, unboxBoolean) == JNI_TRUE)'
    else convert = 'context.Double(jni->CallDoubleMethod(value, unboxNumber))'
    return `  {
    jobject value = jni->GetObjectField(result, ${field});
    values[${i}] = value ? ${convert} : context.Null();
    if (value) jni->DeleteLocalRef(value);
  }`
  })
  return `napi_value Result${id}(fast::Context& context, JNIEnv* jni, jobject result, const fast::ObjectLayout& shape) {
  if (!result) return context.Null();
  fast::LocalObjectLayout layout;
  context.BindLayout(shape, &layout);
  std::array<napi_value, ${record.fields.length}> values;
${reads
  .map(
    (read, i) =>
      read +
      `\n  if (ThrowIfJavaException(context.Env(), jni) || !values[${i}]) return nullptr;`
  )
  .join('\n')}
  return context.CreateObject(layout, values);
}`
}

/** 每个内置 Android UTS 模块生成一个可独立编译的 C++ 文件。 */
export function genBridgeV3Cpp(
  bridge: UTSBridge,
  kotlinPackage: string
): string {
  const native = bridge.native
  if (native?.version !== 3) {
    throw new Error(
      `UTS compiler did not emit V3 JNI metadata for ${bridge.uts_bridge_name}`
    )
  }
  const prefix = kotlinPackage.replace(/\./g, '/') + '/'
  const records: ResultRecord[] = []
  const accessors = native.methods.map((method) => {
    let recordId: number | undefined
    if (method.result_record) {
      const name = method.result_record.name
      const index = records.findIndex((record) => record.name === name)
      recordId = index === -1 ? records.push(method.result_record) - 1 : index
    }
    const arms: ReturnType<typeof overload>[] = []
    for (let argc = method.required; argc <= method.params.length; argc++) {
      arms.push(overload(method, argc, recordId))
    }
    const keys = layouts(method).keys
    const body = `void Call${method.method_id}(fast::CallbackInfo& info) {
  auto& context = info.GetContext();
  napi_env env = context.Env();
${
  keys.length ? '  auto& layouts = *static_cast<Layouts*>(info.Data());\n' : ''
}  auto* jni = GetJNIEnv();
  if (!jni) { napi_throw_error(env, nullptr, "UTS bridge JNI is unavailable"); return; }
  if (jni->PushLocalFrame(32) != JNI_OK) { ThrowIfJavaException(env, jni); return; }
  LocalFrame frame{jni};
  switch (info.Length()) {
${arms.map((arm) => arm.body).join('\n')}
    default: return ArgumentError(env);
  }
}`
    return { id: method.method_id, arms, body, keys }
  })
  const arms = accessors.flatMap((accessor) => accessor.arms)
  const fields = records.flatMap((r) => r.fields)
  const unbox = [
    {
      enabled: fields.some((f) => f.descriptor === 'Ljava/lang/Boolean;'),
      name: 'unboxBoolean',
      clazz: 'java/lang/Boolean',
      method: 'booleanValue',
      signature: '()Z',
    },
    {
      enabled: fields.some(
        (f) =>
          f.descriptor.startsWith('L') &&
          !['Ljava/lang/String;', 'Ljava/lang/Boolean;'].includes(f.descriptor)
      ),
      name: 'unboxNumber',
      clazz: 'java/lang/Number',
      method: 'doubleValue',
      signature: '()D',
    },
  ].filter((item) => item.enabled)
  const cache = arms.length
    ? `jclass clazz{};
${arms.map(({ name }) => `jmethodID ${name}{};`).join('\n')}
${unbox.map(({ name }) => `jmethodID ${name}{};`).join('\n')}
${records
  .map((record, i) => `jfieldID record${i}[${record.fields.length}]{};`)
  .join('\n')}

bool CacheMethods(JNIEnv* jni) {
  static std::mutex mutex;
  std::lock_guard<std::mutex> lock(mutex);
  if (clazz) return true;
  if (jni->PushLocalFrame(16) != JNI_OK) return false;
  LocalFrame frame{jni};
  jclass local = FindClass(jni, ${JSON.stringify(prefix + 'UniUTSBridgeV3')});
  if (!local) return false;
${arms
  .map(
    ({
      name,
      signature,
    }) => `  ${name} = jni->GetStaticMethodID(local, "${name}", "${signature}");
  if (!${name}) return false;`
  )
  .join('\n')}
${unbox
  .map(
    ({
      name,
      clazz,
      method,
      signature,
    }) => `  ${name} = InstanceMethod(jni, "${clazz}", "${method}", "${signature}");
  if (!${name}) return false;`
  )
  .join('\n')}
${records
  .map(
    (r, i) => `  {
    static constexpr const char* fields[][2] = {${r.fields
      .map(
        (f) => `{${JSON.stringify(f.name)}, ${JSON.stringify(f.descriptor)}}`
      )
      .join(', ')}};
    if (!CacheRecord(jni, ${JSON.stringify(
      prefix + r.name
    )}, fields, record${i}, ${r.fields.length})) return false;
  }`
  )
  .join('\n')}
  clazz = static_cast<jclass>(jni->NewGlobalRef(local));
  return clazz != nullptr;
}`
    : ''
  return `#include "uniappx/uts/bridge_v3_fast.h"
#include <mutex>

namespace {
using namespace uniappx::uts::v3;
${cache}

${records.map(resultReader).join('\n\n')}
${accessors.map((a) => a.body).join('\n\n')}

napi_status Install([[maybe_unused]] napi_env env, [[maybe_unused]] napi_value exports) {
${
  arms.length
    ? `  auto* jni = GetJNIEnv();
  if (!jni || !CacheMethods(jni)) {
    if (!jni || !ThrowIfJavaException(env, jni)) napi_throw_error(env, nullptr, "Failed to resolve generated UTS bridge methods");
    return napi_pending_exception;
  }\n`
    : ''
}${
    accessors.some((a) => a.keys.length)
      ? `  napi_value sample, prototype;
  if (auto s = napi_create_object(env, &sample); s != napi_ok) return s;
  if (auto s = napi_get_prototype(env, sample, &prototype); s != napi_ok) return s;\n`
      : ''
  }${[...bridge.classes, ...bridge.interfaces]
    .map(
      ({ name }) =>
        `  if (auto s = RegisterType(env, exports, ${JSON.stringify(
          prefix + name
        )}, ${JSON.stringify(name)}); s != napi_ok) return s;\n`
    )
    .join('')}${accessors
    .map(
      ({ id, keys }) => `  {
${keys.length ? '    auto layouts = std::make_unique<Layouts>();\n' : ''}${keys
        .map(
          (
            names,
            index
          ) => `    static constexpr const char* keys${index}[] = {${names
            .map((n) => JSON.stringify(n))
            .join(', ')}};
    if (auto s = layouts->Add(env, prototype, keys${index}); s != napi_ok) return s;\n`
        )
        .join(
          ''
        )}    if (auto s = ExportMethod(env, exports, ${id}, "m${id}", Call${id}, ${
        keys.length ? 'std::move(layouts)' : 'nullptr'
      }); s != napi_ok) return s;
  }\n`
    )
    .join('')}  return napi_ok;
}

[[maybe_unused]] const bool registered = RegisterModule(${JSON.stringify(
    bridge.uts_bridge_name
  )}, Install);
}  // namespace
`
}

/** 保留 JNI 按名查找的类型和固定布局字段，防止 R8 改名或消除。 */
export function genBridgeV3KeepRules(bridge: UTSBridge, kotlinPackage: string) {
  const rules = new Set(
    [...bridge.classes, ...bridge.interfaces].map(
      ({ name }) => `-keep class ${kotlinPackage}.${name}`
    )
  )
  for (const method of bridge.native?.methods || []) {
    const record = method.result_record
    if (record) {
      rules.add(
        `-keep class ${kotlinPackage}.${record.name} {\n${record.fields
          .map(({ name }) => `    *** ${name};`)
          .join('\n')}\n}`
      )
    }
  }
  return Array.from(rules).join('\n') + '\n'
}
