import fs from 'fs'
import path from 'path'

import {
  camelize,
  capitalize,
  hasOwn,
  isArray,
  isPlainObject,
  isString,
} from '@vue/shared'

import type {
  ArrowFunctionExpression,
  BindingIdentifier,
  ClassDeclaration,
  ClassExpression,
  Expression,
  FunctionDeclaration,
  FunctionExpression,
  HasDecorator,
  Identifier,
  Module,
  Param,
  Span,
  TsFnParameter,
  TsInterfaceDeclaration,
  TsParameterProperty,
  TsType,
  TsTypeAliasDeclaration,
  TsTypeAnnotation,
  TsTypeElement,
  VariableDeclaration,
  VariableDeclarationKind,
} from '../types/types'
import {
  ERR_MSG_PLACEHOLDER,
  createResolveTypeReferenceName,
  isColorSupported,
  parseKotlinPackageWithPluginId,
  relative,
} from './utils'
import { normalizePath } from './shared'
import { parseUTSSyntaxError } from './stacktrace'
import type { SyncUniModulesFilePreprocessor } from './uni_modules'
import type { UTSBridge, UTSBridgeMethod } from '@dcloudio/uts'

const IOS_HOOK_CLASS = 'UTSiOSHookProxy'
const ANDROID_HOOK_CLASS = 'UTSAndroidHookProxy'

function isHookClass(name: string) {
  return name === ANDROID_HOOK_CLASS || name === IOS_HOOK_CLASS
}

export const enum FORMATS {
  ES = 'es',
  CJS = 'cjs',
}

export interface ClassMeta {
  typeParams?: boolean
  interfaces: string[]
  keepAliveMethods: string[]
}

// 不应该用 class，应该用lit，调整起来影响较多，暂不调整
type Types = {
  interface: Record<string, { returned: boolean; decl: TsInterfaceDeclaration }>
  class: Record<string, ClassMeta>
  fn: Record<string, Param[]>
  alias: Record<string, {}>
  uni?: string[]
}

interface Meta {
  typeParams: string[]
  exports: Record<
    string,
    {
      type: 'var' | 'function' | 'class' | 'interface'
      params?: Parameter[]
    }
  >
  types: Record<
    string,
    'function' | 'class' | 'interface' | 'typealias' | string[]
  >
  components: string[]
  customElements: string[]
  android?: {
    typeParams: string[]
    types: Record<
      string,
      'function' | 'class' | 'interface' | 'typealias' | string[]
    >
  }
  ios?: {
    typeParams: string[]
    types: Record<
      string,
      'function' | 'class' | 'interface' | 'typealias' | string[]
    >
  }
}
export interface GenProxyCodeOptions {
  platform: 'app-android' | 'app-ios'
  is_uni_modules: boolean
  id: string
  name: string
  extname: string
  namespace: string
  androidComponents?: Record<string, string>
  iosComponents?: Record<string, string>
  customElements?: Record<string, string>
  format?: FORMATS
  inputDir?: string
  pluginRelativeDir?: string
  moduleName?: string
  moduleType?: string
  types?: Types
  meta?: Meta
  isExtApi?: boolean
  androidHookClass?: string
  iOSHookClass?: string
  androidPreprocessor?: SyncUniModulesFilePreprocessor
  iosPreprocessor?: SyncUniModulesFilePreprocessor
}

function isUTSElementProxyClass(cls: string) {
  return (
    process.env.UNI_APP_X_DOM2 === 'true' &&
    process.env.UNI_UTS_PLATFORM === 'app-android' &&
    /^Uni.*Element(?:Impl)?$/.test(cls)
  )
}

function formatUTSBridgeMethod(method: UTSBridgeMethod) {
  return {
    name: method.name,
    methodId: method.method_id,
    type: method.type,
    keepAlive: method.keep_alive,
    async: method.async,
    returnType: method.return_type,
  }
}

function stringifyUTSBridgeMethod(method: UTSBridgeMethod) {
  let code = '{'
  const formattedMethod = formatUTSBridgeMethod(method)
  for (const key in formattedMethod) {
    if (!hasOwn(formattedMethod, key)) {
      continue
    }
    const value = formattedMethod[key]
    if (value === undefined) {
      continue
    }
    if (code.length > 1) {
      code += ', '
    }
    code += `${key}: ${JSON.stringify(value)}`
  }
  code += '}'
  return code
}

function stringifyUTSBridgeMethodList(methods: UTSBridgeMethod[]) {
  return `[${methods.map(stringifyUTSBridgeMethod).join(', ')}]`
}

export async function genProxyCodeV2(bridge: UTSBridge) {
  const {
    functions,
    classes,
    interfaces,
    uts_bridge_name: utsBridgeName,
  } = bridge
  let code = `const { registerUTSInterface, initUTSProxyClass, initUTSElementProxyClass, initUTSProxyFunction } = uni\n
const moduleName = '${utsBridgeName}'\n`
  interfaces.forEach((i) => {
    code += `registerUTSInterface({ name: '${
      i.name
    }', utsBridgeName: moduleName, methods: ${stringifyUTSBridgeMethodList(
      i.methods
    )} })\n`
  })
  classes.forEach((c) => {
    const exportModifier = c.is_default
      ? 'export default '
      : `export const ${c.name} = `
    const isElement = isUTSElementProxyClass(c.name)
    // TODO 目前仅用于安卓dom2，如果要支持iOS dom2需要屏蔽ElementProxyClass的注册
    if (isElement) {
      code += `${exportModifier}initUTSElementProxyClass({ utsBridgeName: moduleName, class: '${
        c.name
      }', staticMethods: ${stringifyUTSBridgeMethodList(
        c.static_methods
      )}, methods: ${stringifyUTSBridgeMethodList(c.methods)} })\n`
    } else {
      code += `${exportModifier}initUTSProxyClass({ utsBridgeName: moduleName, class: '${
        c.name
      }', constructor: ${stringifyUTSBridgeMethod(
        c.constructor
      )}, staticMethods: ${stringifyUTSBridgeMethodList(
        c.static_methods
      )}, methods: ${stringifyUTSBridgeMethodList(c.methods)} })\n`
    }
  })
  functions.forEach((f) => {
    const exportModifier = f.is_default
      ? 'export default '
      : `export const ${f.name} = `
    code += `${exportModifier}initUTSProxyFunction(moduleName, ${stringifyUTSBridgeMethod(
      f
    )})\n`
  })
  return code
}

export async function genProxyCode(
  module: string,
  options: GenProxyCodeOptions
) {
  const { name, is_uni_modules, format, moduleName, moduleType } = options
  options.inputDir = options.inputDir || process.env.UNI_INPUT_DIR
  if (!options.meta) {
    options.meta = {
      exports: {},
      types: {},
      typeParams: [],
      components: [],
      customElements: [],
    }
  }
  options.types = await parseInterfaceTypes(module, options)
  options.meta!.types = parseMetaTypes(options.types)
  options.meta!.typeParams = parseTypeParams(options.types)

  if (options.androidPreprocessor) {
    // 内置 ext-api 需要分平台解析interface
    const androidTypes = await parseInterfaceTypes(
      module,
      options,
      options.androidPreprocessor
    )
    options.meta!.android = {
      typeParams: parseTypeParams(androidTypes),
      types: parseMetaTypes(androidTypes),
    }
  }
  if (options.iosPreprocessor) {
    const iosTypes = await parseInterfaceTypes(
      module,
      options,
      options.iosPreprocessor
    )
    options.meta!.ios = {
      typeParams: parseTypeParams(iosTypes),
      types: parseMetaTypes(iosTypes),
    }
  }

  const components = new Set<string>()
  // 自动补充 VideoElement 导出
  if (options.androidComponents) {
    Object.keys(options.androidComponents).forEach((name) => {
      const className =
        (process.env.UNI_UTS_MODULE_PREFIX ? 'Uni' : '') +
        capitalize(camelize(name)) +
        'Element'
      options.meta!.types[className] = 'class'
      if (options.meta?.android?.types) {
        options.meta.android.types[className] = 'class'
      }
      components.add(name)
    })
  }
  if (options.iosComponents) {
    Object.keys(options.iosComponents).forEach((name) => {
      const className =
        (process.env.UNI_UTS_MODULE_PREFIX ? 'Uni' : '') +
        capitalize(camelize(name)) +
        'Element'
      options.meta!.types[className] = 'class'
      if (options.meta?.ios?.types) {
        options.meta.ios.types[className] = 'class'
      }
      components.add(name)
    })
  }
  options.meta.components = [...components]
  const decls = await parseModuleDecls(module, options)

  normalizeInterfaceKeepAlive(decls, options.types)
  const interceptor = await parseInterceptor(options.platform!, module, options)
  const hasMatchedInterceptor = decls.some((decl) => {
    if (decl.type === 'FunctionDeclaration') {
      return interceptor.initMethods.includes(`init${capitalize(decl.method)} `)
    }
    return false
  })
  return `
const { registerUTSInterface, initUTSProxyClass, initUTSElementProxyClass, initUTSProxyFunction, initUTSPackageName, initUTSIndexClassName, initUTSClassName } = uni
const name = '${name}'
const moduleName = '${moduleName || ''}'
const moduleType = '${moduleType || ''}'
const errMsg = \`${ERR_MSG_PLACEHOLDER}\`
const is_uni_modules = ${is_uni_modules}
const pkg = /*#__PURE__*/ initUTSPackageName(name, is_uni_modules)
const cls = /*#__PURE__*/ initUTSIndexClassName(name, is_uni_modules)
${
  format === FORMATS.CJS
    ? `
const exports = { __esModule: true }
`
    : ''
}
${genComponentsCode(
  format,
  options.androidComponents || {},
  options.iosComponents || {}
)}${genCustomElementsCode(format, options.customElements || {})}
${hasMatchedInterceptor ? interceptor.code : ''}
${genModuleCode(
  decls,
  format,
  options.pluginRelativeDir!,
  options.meta!,
  interceptor.initMethods
)}
`
}

interface ParseInterceptorResult {
  code: string
  initMethods: string[]
}

export async function parseInterceptor(
  platform: 'app-android' | 'app-ios',
  module: string,
  options: Omit<GenProxyCodeOptions, 'platform'>
): Promise<ParseInterceptorResult> {
  const interceptorFilename = resolvePlatformInterceptorFilename(
    platform,
    module,
    options
  )
  if (!interceptorFilename || !fs.existsSync(interceptorFilename)) {
    return {
      code: '',
      initMethods: [],
    }
  }
  const preprocessor =
    platform === 'app-android'
      ? options.androidPreprocessor
      : options.iosPreprocessor
  const code = fs.readFileSync(interceptorFilename, 'utf8')
  const rawInterceptorCode = preprocessor
    ? await preprocessor(code, interceptorFilename)
    : code
  return parseInterceptorCode(rawInterceptorCode)
}

export function parseInterceptorCode(code: string): ParseInterceptorResult {
  const interceptorCode = stripInterceptorComments(code)
  return {
    code: stripInterceptorExports(interceptorCode),
    initMethods: extractInterceptorInitMethods(interceptorCode),
  }
}

function stripInterceptorComments(code: string) {
  let result = ''
  let quote: "'" | '"' | '`' | undefined

  for (let i = 0; i < code.length; i++) {
    const char = code[i]
    const nextChar = code[i + 1]

    if (quote) {
      result += char
      if (char === '\\') {
        result += nextChar || ''
        i++
      } else if (char === quote) {
        quote = undefined
      }
      continue
    }

    if (char === "'" || char === '"' || char === '`') {
      quote = char
      result += char
      continue
    }

    if (char === '/' && nextChar === '/') {
      while (i + 1 < code.length && code[i + 1] !== '\n') {
        i++
      }
      continue
    }

    if (char === '/' && nextChar === '*') {
      result += ' '
      i++
      while (i + 1 < code.length) {
        i++
        if (code[i] === '\n') {
          result += '\n'
        } else if (code[i] === '*' && code[i + 1] === '/') {
          i++
          break
        }
      }
      continue
    }

    result += char
  }

  return result
}

function stripInterceptorExports(code: string) {
  return code
    .replace(
      /^([\t ]*)export\s+default\s+(?=(async\s+)?function\b|class\b)/gm,
      '$1'
    )
    .replace(
      /^([\t ]*)export\s+(?=(async\s+)?function\b|const\b|let\b|var\b|class\b)/gm,
      '$1'
    )
}

function extractInterceptorInitMethods(code: string) {
  const initMethods: string[] = []
  const initMethodRE =
    /^[\t ]*(?:export\s+)?(?:default\s+)?(?:(?:async\s+)?function|const|let|var)\s+(init[A-Z]\w*)\b/gm

  let match: RegExpExecArray | null
  while ((match = initMethodRE.exec(code))) {
    initMethods.push(match[1])
  }
  return initMethods
}

// 查找实现该interface的class中是否有keepAlive方法，有则标记为keepAlive
function normalizeInterfaceKeepAlive(decls: ProxyDecl[], types: Types) {
  const classTypes = types.class
  if (!classTypes) {
    return
  }
  const classNames = Object.keys(classTypes)
  decls.forEach((decl) => {
    if (decl.type === 'InterfaceDeclaration') {
      classNames.find((n) => {
        const classMeta = classTypes[n]
        if (classMeta.interfaces && classMeta.interfaces.includes(decl.cls)) {
          const isElement = isUTSElementProxyClass(decl.cls)
          classMeta.keepAliveMethods.forEach((method) => {
            const jsMethod = method + (isElement ? '' : 'ByJs')
            if (decl.options.methods[jsMethod]) {
              decl.options.methods[jsMethod].keepAlive = true
            }
          })
        }
      })
    }
  })
}

function parseMetaTypes(types: Types) {
  let res: Meta['types'] = {
    uni: types.uni || [],
  }
  Object.keys(types.class).forEach((n) => {
    res[n] = 'class'
  })
  Object.keys(types.fn).forEach((n) => {
    res[n] = 'function'
  })
  Object.keys(types.interface).forEach((n) => {
    res[n] = 'interface'
  })
  Object.keys(types.alias).forEach((n) => {
    res[n] = 'typealias'
  })
  return res
}

function parseTypeParams(types: Types) {
  let res: Meta['typeParams'] = []
  Object.keys(types.class).forEach((n) => {
    if (types.class[n].typeParams) {
      res.push(n)
    }
  })
  return res
}

function genComponentsCode(
  format: FORMATS = FORMATS.ES,
  androidComponents: Record<string, string>,
  iosComponents: Record<string, string>
) {
  const codes: string[] = []
  Object.keys(Object.assign({}, androidComponents, iosComponents)).forEach(
    (name) => {
      if (format === FORMATS.CJS) {
        codes.push(`exports.${capitalize(camelize(name))}Component = {}`)
      } else {
        codes.push(`export const ${capitalize(camelize(name))}Component = {}`)
      }
    }
  )
  return codes.join('\n')
}

function genCustomElementsCode(
  format: FORMATS = FORMATS.ES,
  customElements: Record<string, string>
) {
  const codes: string[] = []
  Object.keys(customElements).forEach((name) => {
    if (format === FORMATS.CJS) {
      codes.push(`exports.${capitalize(camelize(name))}Element = {}`)
    } else {
      codes.push(`export const ${capitalize(camelize(name))}Element = {}`)
    }
  })
  if (codes.length) {
    codes.unshift('\n')
  }
  return codes.join('\n')
}

export function resolveRootIndex(
  module: string,
  options: Omit<GenProxyCodeOptions, 'platform'>
) {
  const filename = path.resolve(
    module,
    options.is_uni_modules ? 'utssdk' : '',
    `index${options.extname}`
  )
  return fs.existsSync(filename) ? filename : ''
}

export function resolveRootInterface(
  module: string,
  options: Omit<GenProxyCodeOptions, 'platform'>
) {
  const filename = path.resolve(
    module,
    options.is_uni_modules ? 'utssdk' : '',
    `interface${options.extname}`
  )
  return fs.existsSync(filename) ? filename : ''
}

export function resolvePlatformIndexFilename(
  platform: 'app-android' | 'app-ios',
  module: string,
  options: Omit<GenProxyCodeOptions, 'platform'>
) {
  return path.resolve(
    module,
    options.is_uni_modules ? 'utssdk' : '',
    platform,
    `index${options.extname}`
  )
}

export function resolvePlatformInterceptorFilename(
  platform: 'app-android' | 'app-ios',
  module: string,
  options: Omit<GenProxyCodeOptions, 'platform'>
) {
  return path.resolve(
    module,
    options.is_uni_modules ? 'utssdk' : '',
    platform,
    `interceptor.js`
  )
}

export function resolvePlatformIndex(
  platform: 'app-android' | 'app-ios',
  module: string,
  options: Omit<GenProxyCodeOptions, 'platform'>
) {
  const filename = resolvePlatformIndexFilename(platform, module, options)
  return fs.existsSync(filename) ? filename : ''
}

function exportDefaultCode(format: FORMATS) {
  return format === FORMATS.ES
    ? 'export default /*#__PURE__*/ '
    : 'exports.default = '
}

function exportVarCode(format: FORMATS, kind: VariableDeclarationKind) {
  if (format === FORMATS.ES) {
    return `export ${kind} `
  }
  return `exports.`
}

function isClassReturnOptions(value: unknown): value is { options: string } {
  return (
    isPlainObject(value) &&
    (value as any).type === 'interface' &&
    isString((value as any).options)
  )
}

function genClassOptionsCode(
  options: ProxyClass['options'] | ProxyInterface['options']
): string {
  return JSON.stringify(options, (key, value) => {
    if (key === 'return' && isClassReturnOptions(value)) {
      return { type: 'interface', options: `${value.options}Options` }
    }
    return value
  })
}

function genModuleCode(
  decls: ProxyDecl[],
  format: FORMATS = FORMATS.ES,
  pluginRelativeDir: string,
  meta: Meta,
  initInterceptorMethods: string[]
) {
  const codes: string[] = []
  const exportDefault = exportDefaultCode(format)
  const exportConst = exportVarCode(format, 'const')
  decls.forEach((decl) => {
    if (decl.type === 'InterfaceDeclaration') {
      meta.exports[decl.cls] = {
        type: 'interface',
      }
      codes.push(
        `registerUTSInterface('${
          decl.cls
        }Options',Object.assign({ moduleName, moduleType, errMsg, package: pkg, class: initUTSClassName(name, '${
          decl.cls
        }ByJsProxy', is_uni_modules) }, ${genClassOptionsCode(decl.options)} ))`
      )
    } else if (decl.type === 'Class') {
      meta.exports[decl.cls] = {
        type: decl.isVar ? 'var' : 'class',
      }

      if (decl.isDefault) {
        // initUTSElementProxyClass不会进入此分支
        codes.push(
          `${exportDefault}initUTSProxyClass(Object.assign({ moduleName, moduleType, errMsg, package: pkg, class: initUTSClassName(name, '${
            decl.cls
          }ByJs', is_uni_modules) }, ${genClassOptionsCode(decl.options)} ))`
        )
      } else {
        const isElement = isUTSElementProxyClass(decl.cls)
        const initProxyMethodName = isElement
          ? 'initUTSElementProxyClass'
          : 'initUTSProxyClass'
        codes.push(
          `${exportConst}${
            decl.cls
          } = /*#__PURE__*/ ${initProxyMethodName}(Object.assign({ moduleName, moduleType, errMsg, package: pkg, class: initUTSClassName(name, '${
            decl.cls
          }ByJs', is_uni_modules) }, ${genClassOptionsCode(decl.options)} ))`
        )
      }
    } else if (decl.type === 'FunctionDeclaration') {
      meta.exports[decl.method] = {
        type: decl.isVar ? 'var' : 'function',
        params: decl.params,
      }
      const returnOptions = decl.return
        ? { type: decl.return.type, options: decl.return.options + 'Options' }
        : ''
      if (decl.isDefault) {
        codes.push(
          `${exportDefault}initUTSProxyFunction(${
            decl.async
          }, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: '${
            decl.method
          }ByJs', keepAlive: ${decl.keepAlive}, params: ${JSON.stringify(
            decl.params
          )}, return: ${JSON.stringify(returnOptions)}})`
        )
      } else {
        const originalMethod = `initUTSProxyFunction(${
          decl.async
        }, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: '${
          decl.method
        }ByJs', keepAlive: ${decl.keepAlive}, params: ${JSON.stringify(
          decl.params
        )}, return: ${JSON.stringify(returnOptions)}})`
        const initInterceptorMethodName = `init${capitalize(decl.method)}`
        if (initInterceptorMethods.includes(initInterceptorMethodName)) {
          codes.push(
            `${exportConst}${decl.method} = /*#__PURE__*/ ${initInterceptorMethodName}(${originalMethod})`
          )
        } else {
          codes.push(
            `${exportConst}${decl.method} = /*#__PURE__*/ ${originalMethod}`
          )
        }
      }
    } else if (decl.type === 'VariableDeclaration') {
      decl.declarations.forEach((d) => {
        meta.exports[(d.id as Identifier).value] = {
          type: 'var',
        }
      })

      if (format === FORMATS.ES) {
        codes.push(
          `export ${decl.kind} ${decl.declarations
            .map(
              (d) => `${(d.id as Identifier).value} = ${genInitCode(d.init!)}`
            )
            .join(', ')}`
        )
      } else if (format === FORMATS.CJS) {
        codes.push(
          `${decl.kind} ${decl.declarations
            .map(
              (d) => `${(d.id as Identifier).value} = ${genInitCode(d.init!)}`
            )
            .join(', ')}`
        )
        const exportVar = exportVarCode(format, decl.kind)
        decl.declarations.forEach((d) => {
          const name = (d.id as Identifier).value
          codes.push(`${exportVar}${name} = ${name}`)
        })
      }
    }
  })
  if (format === FORMATS.CJS) {
    codes.push(
      `uni.registerUTSPlugin('${normalizePath(pluginRelativeDir)}', exports)`
    )
  }
  return codes.join(`\n`)
}

/**
 * 解析接口文件中定义的类型信息
 * @param module
 * @param options
 * @returns
 */
export async function parseInterfaceTypes(
  module: string,
  options: GenProxyCodeOptions,
  preprocessor?: SyncUniModulesFilePreprocessor
): Promise<Types> {
  const interfaceFilename = resolveRootInterface(module, options)

  if (!interfaceFilename) {
    return {
      interface: {},
      class: {},
      fn: {},
      alias: {},
      uni: [],
    }
  }
  let ast: Module | null = null
  try {
    const code = fs.readFileSync(interfaceFilename, 'utf8')
    ast = await parseUtsCode(
      preprocessor ? await preprocessor(code, interfaceFilename) : code,
      {
        filename: relative(interfaceFilename, options.inputDir!),
        noColor: !isColorSupported(),
      }
    )
  } catch (e) {
    console.error(
      parseUTSSyntaxError(e, process.env.UNI_INPUT_DIR || options.inputDir!)
    )
  }
  return parseAstTypes(ast, true)
}

function parseAstTypes(ast: Module | null, isInterface: boolean) {
  const interfaceTypes: Types['interface'] = {}
  const classTypes: Types['class'] = {}
  const fnTypes: Types['fn'] = {}
  const aliasTypes: Types['alias'] = {}
  const uniMethods: string[] = []

  const exportNamed: string[] = []
  if (ast) {
    if (isInterface) {
      ast.body.filter((node) => {
        if (node.type === 'ExportNamedDeclaration') {
          node.specifiers.forEach((s) => {
            if (s.type === 'ExportSpecifier') {
              if (s.exported) {
                if (s.exported.type === 'Identifier') {
                  exportNamed.push(s.exported.value)
                }
              } else {
                exportNamed.push(s.orig.value)
              }
            }
          })
        }
      })
    }

    ast.body.filter((node) => {
      if (node.type === 'ExportDeclaration') {
        if (node.declaration.type === 'TsTypeAliasDeclaration') {
          parseTypes(node.declaration, classTypes, fnTypes, aliasTypes)
        } else if (node.declaration.type === 'TsInterfaceDeclaration') {
          interfaceTypes[node.declaration.id.value] = {
            returned: false,
            decl: node.declaration,
          }
          if (node.declaration.id.value === 'Uni') {
            node.declaration.body.body.forEach((item) => {
              if (
                item.type === 'TsMethodSignature' &&
                item.key.type === 'Identifier'
              ) {
                uniMethods.push(item.key.value)
              } else if (
                item.type === 'TsPropertySignature' &&
                item.key.type === 'Identifier'
              ) {
                uniMethods.push(item.key.value)
              }
            })
          }
        } else if (node.declaration.type === 'ClassDeclaration') {
          classTypes[node.declaration.identifier.value] = {
            interfaces: parseImplements(node.declaration),
            keepAliveMethods: parseKeepAliveMethods(node.declaration),
          }
        }
      } else if (node.type === 'TsTypeAliasDeclaration') {
        if (!isInterface || exportNamed.includes(node.id.value)) {
          parseTypes(node, classTypes, fnTypes, aliasTypes)
        }
      } else if (node.type === 'TsInterfaceDeclaration') {
        interfaceTypes[node.id.value] = {
          returned: false,
          decl: node,
        }
      } else if (node.type === 'ClassDeclaration') {
        classTypes[node.identifier.value] = {
          interfaces: parseImplements(node),
          keepAliveMethods: parseKeepAliveMethods(node),
        }
      }
    })
  }
  return {
    interface: interfaceTypes,
    class: classTypes,
    fn: fnTypes,
    alias: aliasTypes,
    uni: uniMethods,
  }
}

function parseImplements(node: ClassDeclaration | ClassExpression): string[] {
  const interfaces: string[] = []
  node.implements.forEach((implement) => {
    if (implement.expression.type === 'Identifier') {
      interfaces.push(implement.expression.value)
    }
  })
  return interfaces
}

function parseKeepAliveMethods(
  node: ClassDeclaration | ClassExpression
): string[] {
  const keepAliveMethods: string[] = []
  node.body.forEach((method) => {
    if (method.type === 'ClassMethod' && method.key.type === 'Identifier') {
      if (parseKeepAlive(method.function)) {
        keepAliveMethods.push(method.key.value)
      }
    }
  })
  return keepAliveMethods
}

function parseTypes(
  decl: TsTypeAliasDeclaration,
  classTypes: Record<string, ClassMeta>,
  fnTypes: Record<string, Param[]>,
  aliasTypes: Record<string, {}>
) {
  switch (decl.typeAnnotation.type) {
    // export type ShowLoading = ()=>void
    case 'TsFunctionType':
      const params = createParams(decl.typeAnnotation.params)
      if (params.length) {
        fnTypes[decl.id.value] = params
      } else {
        fnTypes[decl.id.value] = []
      }
      break
    // export type ShowLoadingOptions = {}
    // export type RequestMethod = 'GET' | 'POST'
    case 'TsTypeLiteral':
    case 'TsUnionType':
      classTypes[decl.id.value] = {
        typeParams: !!decl.typeParams,
        interfaces: [],
        keepAliveMethods: [],
      }
      break
    default:
      aliasTypes[decl.id.value] = {}
  }
}

function createParams(tsParams: TsFnParameter[]) {
  const params: Param[] = []
  tsParams.forEach((pat) => {
    if (pat.type === 'Identifier') {
      params.push({
        type: 'Parameter',
        pat,
        span: {} as Span,
      })
    }
  })
  return params
}

async function parseModuleDecls(module: string, options: GenProxyCodeOptions) {
  const isX = process.env.UNI_APP_X === 'true'
  const platform = options.platform
  // 优先合并 ios + android，如果没有，查找根目录 index.uts
  const iosDecls =
    !isX || platform === 'app-ios'
      ? (
          await parseFile(
            options.platform === 'app-ios',
            resolvePlatformIndex('app-ios', module, options),
            options,
            options.iosPreprocessor
          )
        ).filter((decl) => {
          if (decl.type === 'Class') {
            if (decl.isHook) {
              options.iOSHookClass = options.namespace + capitalize(decl.cls)
              return false
            }
          }
          return true
        })
      : []
  const androidDecls =
    !isX || platform === 'app-android'
      ? (
          await parseFile(
            options.platform === 'app-android',
            resolvePlatformIndex('app-android', module, options),
            options,
            options.androidPreprocessor
          )
        ).filter((decl) => {
          if (decl.type === 'Class') {
            if (decl.isHook) {
              options.androidHookClass =
                parseKotlinPackageWithPluginId(
                  options.id,
                  options.is_uni_modules
                ) +
                '.' +
                decl.cls
              return false
            }
          }
          return true
        })
      : []
  let decls: ProxyDecl[] = []
  if (isX) {
    decls = options.platform === 'app-android' ? androidDecls : iosDecls
  } else {
    // 优先使用 app-ios，因为 app-ios 平台函数类型需要正确的参数列表
    decls = mergeDecls(androidDecls, iosDecls)
  }
  // 如果没有平台特有，查找 root index.uts
  if (!decls.length) {
    return await parseFile(true, resolveRootIndex(module, options), options)
  }
  return decls
}

function mergeRecord(from: Record<string, any>, to: Record<string, any>) {
  Object.keys(from).forEach((key) => {
    if (!hasOwn(to, key)) {
      to[key] = from[key]
    }
  })
}
function mergeArray(from: any[], to: any[]) {
  from.forEach((item) => {
    if (!to.includes(item)) {
      to.push(item)
    }
  })
}

function mergeDecls(from: ProxyDecl[], to: ProxyDecl[]) {
  from.forEach((item) => {
    if (item.type === 'InterfaceDeclaration') {
      const decl = to.find(
        (toItem) =>
          toItem.type === 'InterfaceDeclaration' && toItem.cls === item.cls
      ) as ProxyInterface | undefined
      if (!decl) {
        to.push(item)
      } else {
        mergeRecord(item.options.methods, decl.options.methods)
        mergeArray(item.options.props, decl.options.props)
      }
    } else if (item.type === 'Class') {
      const decl = to.find(
        (toItem) =>
          toItem.type === 'Class' &&
          toItem.cls === item.cls &&
          toItem.isDefault === item.isDefault
      ) as ProxyClass | undefined
      if (!decl) {
        to.push(item)
      } else {
        mergeRecord(item.options.methods, decl.options.methods)
        mergeRecord(item.options.staticMethods, decl.options.staticMethods)
        mergeArray(item.options.props, decl.options.props)
        mergeArray(item.options.staticProps, decl.options.staticProps)
      }
    } else if (item.type === 'FunctionDeclaration') {
      if (
        !to.find(
          (toItem) =>
            toItem.type === 'FunctionDeclaration' &&
            toItem.method === item.method &&
            toItem.isDefault === item.isDefault
        )
      ) {
        to.push(item)
      }
    } else if (
      item.type === 'VariableDeclaration' &&
      item.declarations.length === 1
    ) {
      if (
        !to.find((toItem) => {
          if (
            toItem.type === 'VariableDeclaration' &&
            toItem.declarations.length === 1
          ) {
            const toDecl = toItem.declarations[0].id
            const decl = item.declarations[0].id
            return (
              toDecl.type === 'Identifier' &&
              decl.type === 'Identifier' &&
              toDecl.value === decl.value
            )
          }
          return false
        })
      ) {
        to.push(item)
      }
    }
  })
  return to
}

async function parseFile(
  checkEmpty: boolean,
  filename: string | undefined | false,
  options: GenProxyCodeOptions,
  preprocessor?: SyncUniModulesFilePreprocessor
): Promise<ProxyDecl[]> {
  if (filename) {
    // 暂时不从uvue目录读取了，就读取原始文件
    // filename = resolveUVueFileName(filename)
    if (fs.existsSync(filename)) {
      const code = fs.readFileSync(filename, 'utf8')
      if (!code || code.trim() === '') {
        if (checkEmpty) {
          console.error(`error: 文件内容为空，请检查。`)
          console.error(`at ${relative(filename, options.inputDir!)}:1`)
        }
        return []
      }
      return parseCode(
        preprocessor ? await preprocessor(code, filename) : code,
        options.namespace,
        options.types!,
        filename,
        options.inputDir!
      )
    }
  }
  return []
}

async function parseUtsCode(code: string, options: unknown) {
  // eslint-disable-next-line no-restricted-globals
  const { parse } = require('@dcloudio/uts')
  const result = await parse(code, options)
  if (result && result.error) {
    throw result.error
  }
  return result
}

async function parseCode(
  code: string,
  namespace: string,
  types: Types,
  filename: string,
  inputDir: string
): Promise<ProxyDecl[]> {
  try {
    const ast = await parseUtsCode(code, {
      filename: relative(filename, inputDir),
      noColor: !isColorSupported(),
    })
    return parseAst(
      ast,
      createResolveTypeReferenceName(namespace, ast, types.class),
      types
    )
  } catch (e: any) {
    console.error(parseUTSSyntaxError(e, process.env.UNI_INPUT_DIR))
  }
  return []
}

type ProxyDecl =
  | ProxyInterface
  | ProxyFunctionDeclaration
  | ProxyClass
  | VariableDeclaration

interface ProxyInterface {
  type: 'InterfaceDeclaration'
  cls: string
  options: {
    methods: {
      [name: string]: ProxyClassMethod
    }
    props: string[]
    setters: Record<string, Parameter>
  }
}

interface ProxyFunctionDeclaration {
  type: 'FunctionDeclaration'
  method: string
  keepAlive: boolean
  async: boolean
  params: Parameter[]
  isDefault: boolean
  isVar: boolean
  return?: {
    type: 'interface'
    options: string
  }
}
interface ProxyFunctionReturnOptions {
  type: 'interface'
  options: string
}

interface ProxyClassMethod {
  async?: boolean
  keepAlive: boolean
  params: Parameter[]
  return?: ProxyFunctionReturnOptions
}
interface ProxyClass {
  type: 'Class'
  cls: string
  options: {
    constructor: { params: Parameter[] }
    methods: {
      [name: string]: ProxyClassMethod
    }
    staticMethods: {
      [name: string]: ProxyClassMethod
    }
    props: string[]
    staticProps: string[]
    setters: Record<string, Parameter>
    staticSetters: Record<string, Parameter>
  }
  isDefault: boolean
  isVar: boolean
  isHook: boolean
  interfaces: string[]
}

function mergeAstTypes(to: Types, from: Types) {
  if (Object.keys(from.class).length) {
    for (const name in from.class) {
      if (!hasOwn(to.class, name)) {
        to.class[name] = from.class[name]
      }
    }
  }
  if (Object.keys(from.fn).length) {
    for (const name in from.fn) {
      if (!hasOwn(to.fn, name)) {
        to.fn[name] = from.fn[name]
      }
    }
  }
  if (Object.keys(from.interface).length) {
    for (const name in from.interface) {
      if (!hasOwn(to.interface, name)) {
        to.interface[name] = from.interface[name]
      }
    }
  }
}

function parseAst(
  ast: Module,
  resolveTypeReferenceName: ResolveTypeReferenceName,
  types: Types
): ProxyDecl[] {
  const decls: ProxyDecl[] = []

  mergeAstTypes(types, parseAstTypes(ast, false))

  ast.body.forEach((item) => {
    if (item.type === 'ExportDeclaration') {
      const decl = item.declaration
      switch (decl.type) {
        case 'FunctionDeclaration':
          decls.push(
            genFunctionDeclaration(types, decl, resolveTypeReferenceName, false)
          )
          break
        case 'ClassDeclaration':
          decls.push(
            genClassDeclaration(types, decl, resolveTypeReferenceName, false)
          )
          break
        case 'VariableDeclaration':
          const varDecl = genVariableDeclaration(
            types,
            decl,
            resolveTypeReferenceName
          )
          if (varDecl) {
            decls.push(varDecl)
          }
          break
        case 'TsInterfaceDeclaration':
          // 直接继承自JSExport的interface，作为class处理
          decls.push(
            genClassDeclarationFromInterface(
              types,
              decl,
              resolveTypeReferenceName
            )
          )
          break
      }
    } else if (item.type === 'ExportDefaultDeclaration') {
      const decl = item.decl
      if (decl.type === 'ClassExpression') {
        if (decl.identifier) {
          // export default class test{}
          decls.push(
            genClassDeclaration(types, decl, resolveTypeReferenceName, true)
          )
        }
      } else if (decl.type === 'FunctionExpression') {
        if (decl.identifier) {
          decls.push(
            genFunctionDeclaration(types, decl, resolveTypeReferenceName, true)
          )
        }
      }
    }
  })

  // 处理interface内的方法return另一个interface的情况
  let interfacesToTraverse: typeof types.interface = types.interface
  do {
    const tempInterfaces = interfacesToTraverse
    interfacesToTraverse = {}
    Object.keys(tempInterfaces).forEach((name) => {
      const options = tempInterfaces[name]
      if (options.returned) {
        const decl = options.decl
        const elements = parseInterfaceBody(types, decl)
        elements.forEach((item) => {
          let returnType: TsType | undefined = undefined
          if (item.type === 'TsMethodSignature') {
            if (item.key.type === 'Identifier') {
              returnType = item.typeAnn?.typeAnnotation
            }
          } else if (
            item.type === 'TsPropertySignature' ||
            item.type === 'TsGetterSignature'
          ) {
            if (item.key.type === 'Identifier') {
              returnType = item.typeAnnotation?.typeAnnotation
            }
          }
          if (returnType) {
            parseReturnInterfaceWithCallback(
              types,
              returnType,
              (interfaceName) => {
                if (hasOwn(types.interface, interfaceName)) {
                  const returnOptions = types.interface[interfaceName]
                  if (!returnOptions.returned) {
                    returnOptions.returned = true
                    interfacesToTraverse[interfaceName] = returnOptions
                  }
                }
              }
            )
          }
        })
      }
    })
  } while (Object.keys(interfacesToTraverse).length > 0)

  const interfaces: ProxyInterface[] = []
  Object.keys(types.interface).forEach((name) => {
    const options = types.interface[name]
    if (options.returned) {
      interfaces.push(
        genInterfaceDeclaration(types, options.decl, resolveTypeReferenceName)
      )
    }
  })
  return [...interfaces, ...decls]
}

function isReturnPromise(anno?: TsTypeAnnotation) {
  if (!anno) {
    return false
  }
  const { typeAnnotation } = anno
  return (
    typeAnnotation.type === 'TsTypeReference' &&
    typeAnnotation.typeName.type === 'Identifier' &&
    typeAnnotation.typeName.value === 'Promise'
  )
}

function genProxyFunction(
  method: string,
  async: boolean,
  params: Parameter[],
  ret: string = '',
  isDefault: boolean = false,
  isVar: boolean = false,
  keepAlive: boolean = false
): ProxyFunctionDeclaration {
  return {
    type: 'FunctionDeclaration',
    method,
    async,
    keepAlive,
    params,
    return: ret ? { type: 'interface', options: ret } : undefined,
    isDefault,
    isVar,
  }
}

function genProxyClass(
  cls: string,
  options: ProxyClass['options'],
  isDefault = false,
  isVar = false,
  isHook = false,
  interfaces: string[] = []
): ProxyClass {
  return { type: 'Class', cls, options, isDefault, isVar, isHook, interfaces }
}

interface Parameter {
  name: string
  type: string
  default?: string | number | boolean
}

type ResolveTypeReferenceName = (name: string) => string

function resolveIdentifierDefaultValue(ident: Expression) {
  if (ident.type === 'NullLiteral') {
    return 'UTSNull'
  } else if (
    ident.type === 'StringLiteral' ||
    ident.type === 'NumericLiteral' ||
    ident.type === 'BooleanLiteral'
  ) {
    return ident.value
  }
  return null
}

function resolveType(
  types: Types,
  typeAnnotation: TsType,
  resolveTypeReferenceName: ResolveTypeReferenceName
): string {
  if (typeAnnotation.type === 'TsKeywordType') {
    return typeAnnotation.kind
  } else if (typeAnnotation.type === 'TsFunctionType') {
    return 'UTSCallback'
  } else if (
    typeAnnotation.type === 'TsTypeReference' &&
    typeAnnotation.typeName.type === 'Identifier'
  ) {
    // Array<string>
    if (
      typeAnnotation.typeName.value === 'Array' &&
      typeAnnotation.typeParams &&
      typeAnnotation.typeParams.params.length === 1
    ) {
      return resolveType(
        types,
        typeAnnotation.typeParams.params[0],
        resolveTypeReferenceName
      )
    }
    if (hasOwn(types.fn, typeAnnotation.typeName.value)) {
      return 'UTSCallback'
    }
    return resolveTypeReferenceName(typeAnnotation.typeName.value)
  } else if (typeAnnotation.type === 'TsParenthesizedType') {
    return resolveType(
      types,
      typeAnnotation.typeAnnotation,
      resolveTypeReferenceName
    )
  } else if (typeAnnotation.type === 'TsUnionType') {
    const isNullable =
      typeAnnotation.types.length === 2 &&
      typeAnnotation.types.some(
        (type) => type.type === 'TsKeywordType' && type.kind === 'null'
      )
    if (isNullable) {
      for (const type of typeAnnotation.types) {
        if (type.type === 'TsKeywordType') {
          continue
        }
        return resolveType(types, type, resolveTypeReferenceName)
      }
    }
  } else if (typeAnnotation.type === 'TsArrayType') {
    return resolveType(types, typeAnnotation.elemType, resolveTypeReferenceName)
  }
  return ''
}

function resolveIdentifierType(
  types: Types,
  ident: BindingIdentifier,
  resolveTypeReferenceName: ResolveTypeReferenceName
) {
  if (ident.typeAnnotation) {
    return resolveType(
      types,
      ident.typeAnnotation.typeAnnotation,
      resolveTypeReferenceName
    )
  }
  return ''
}

// function request<T>(options : RequestOptions<T>, _t : T.Type) : RequestTask
function isTDotType(pat: BindingIdentifier) {
  const typeAnn = pat.typeAnnotation?.typeAnnotation
  return (
    typeAnn?.type === 'TsTypeReference' &&
    typeAnn.typeName.type === 'TsQualifiedName' &&
    typeAnn.typeName.right.value === 'Type'
  )
}

function resolveFunctionParams(
  types: Types,
  params: (Param | TsParameterProperty)[],
  resolveTypeReferenceName: ResolveTypeReferenceName
) {
  const result: Parameter[] = []
  params.forEach((param) => {
    let pat = param.type === 'Parameter' ? param.pat : param.param
    if (pat.type === 'Identifier') {
      if (!isTDotType(pat)) {
        // ignore T.Type
        const param: Parameter = {
          name: pat.value,
          type: resolveIdentifierType(
            types,
            pat as BindingIdentifier,
            resolveTypeReferenceName
          ),
        }
        // A | null
        if (
          (pat as BindingIdentifier).typeAnnotation?.typeAnnotation.type ===
          'TsUnionType'
        ) {
          param.default = 'UTSNull'
        }
        result.push(param)
      }
    } else if (pat.type === 'AssignmentPattern') {
      if (pat.left.type === 'Identifier') {
        const param: Parameter = {
          name: pat.left.value,
          type: resolveIdentifierType(
            types,
            pat.left as BindingIdentifier,
            resolveTypeReferenceName
          ),
        }
        const defaultValue = resolveIdentifierDefaultValue(pat.right)
        if (defaultValue !== null) {
          param.default = defaultValue
        }
        result.push(param)
      }
    } else {
      result.push({ name: '', type: '' })
    }
  })
  return result
}

function parseReturnInterfaceWithCallback(
  types: Types,
  returnType: TsType,
  callback: (interfaceName: string) => void
): string {
  switch (returnType.type) {
    case 'TsTypeReference':
      if (returnType.typeName.type === 'Identifier') {
        if (hasOwn(types.interface, returnType.typeName.value)) {
          callback(returnType.typeName.value)
          return returnType.typeName.value
        }
      }
      break
    case 'TsUnionType':
      for (const type of returnType.types) {
        if (type.type === 'TsKeywordType') {
          continue
        }
        return parseReturnInterfaceWithCallback(types, type, callback)
      }
      break
    case 'TsParenthesizedType':
      return parseReturnInterfaceWithCallback(
        types,
        returnType.typeAnnotation,
        callback
      )
  }
  return ''
}

function parseReturnInterface(types: Types, returnType: TsType): string {
  return parseReturnInterfaceWithCallback(
    types,
    returnType,
    (interfaceName) => {
      types.interface[interfaceName].returned = true
    }
  )
}

function genFunctionDeclaration(
  types: Types,
  decl: FunctionDeclaration | FunctionExpression,
  resolveTypeReferenceName: ResolveTypeReferenceName,
  isDefault: boolean = false,
  isVar: boolean = false
): ProxyFunctionDeclaration {
  return genProxyFunction(
    decl.identifier!.value,
    decl.async || isReturnPromise(decl.returnType),
    resolveFunctionParams(types, decl.params, resolveTypeReferenceName),
    decl.returnType
      ? parseReturnInterface(types, decl.returnType.typeAnnotation)
      : '',
    isDefault,
    isVar,
    parseKeepAlive(decl)
  )
}

function parseKeepAlive(decl: HasDecorator) {
  if (!decl.decorators || !decl.decorators.length) {
    return false
  }
  return decl.decorators.some((decorator) => {
    if (
      decorator.expression.type === 'MemberExpression' &&
      decorator.expression.property.type === 'Identifier' &&
      decorator.expression.property.value === 'keepAlive'
    ) {
      return true
    }
    return false
  })
}

function parseInterfaceBody(
  types: Types,
  decl: TsInterfaceDeclaration
): TsTypeElement[] {
  const elements = decl.body.body.slice()
  decl.extends.forEach((extend) => {
    if (
      extend.expression.type === 'Identifier' &&
      types.interface[extend.expression.value]
    ) {
      elements.push(
        ...parseInterfaceBody(
          types,
          types.interface[extend.expression.value].decl
        )
      )
    }
  })
  return elements
}

function genInterfaceDeclaration(
  types: Types,
  decl: TsInterfaceDeclaration,
  resolveTypeReferenceName: ResolveTypeReferenceName
): ProxyInterface {
  const cls = decl.id.value
  const methods: ProxyClass['options']['methods'] = {}
  const props: string[] = []
  const setters: Record<string, Parameter> = {}
  const elements = parseInterfaceBody(types, decl)
  const isElement = isUTSElementProxyClass(cls)

  elements.forEach((item) => {
    if (item.type === 'TsMethodSignature') {
      if (item.key.type === 'Identifier') {
        let returnOptions: ProxyFunctionReturnOptions | undefined
        if (item.typeAnn) {
          let returnInterface = parseReturnInterface(
            types,
            item.typeAnn.typeAnnotation
          )
          if (returnInterface) {
            returnOptions = {
              type: 'interface',
              options: returnInterface,
            }
          }
        }

        const name = item.key.value
        const value: ProxyClassMethod = {
          async: isReturnPromise(item.typeAnn),
          keepAlive: false,
          params: resolveFunctionParams(
            types,
            tsParamsToParams(item.params),
            resolveTypeReferenceName
          ),
          return: returnOptions,
        }
        methods[name + (isElement ? '' : 'ByJs')] = value
      }
    } else if (item.type === 'TsPropertySignature') {
      if (item.key.type === 'Identifier') {
        props.push(item.key.value)
        if (item.typeAnnotation) {
          const params = resolveFunctionParams(
            types,
            tsParamsToParams([
              createBindingIdentifier(item.key.value, item.typeAnnotation),
            ]),
            resolveTypeReferenceName
          )
          if (params.length) {
            setters[item.key.value] = params[0]
          }
        }
      }
    }
  })
  return {
    type: 'InterfaceDeclaration',
    cls,
    options: {
      methods,
      props,
      setters,
    },
  }
}

function tsParamsToParams(tsParams: TsFnParameter[]) {
  const params: Param[] = []
  tsParams.forEach((p) => {
    if (p.type === 'Identifier') {
      params.push({
        type: 'Parameter',
        pat: p,
        span: {} as Span,
      })
    }
  })
  return params
}

function genClassDeclaration(
  types: Types,
  decl: ClassDeclaration | ClassExpression,
  resolveTypeReferenceName: ResolveTypeReferenceName,
  isDefault: boolean = false
): ProxyClass {
  const cls = decl.identifier!.value
  const constructor: { params: Parameter[] } = { params: [] }
  const methods: ProxyClass['options']['methods'] = {}
  const staticMethods: ProxyClass['options']['staticMethods'] = {}
  const props: string[] = []
  const staticProps: string[] = []
  const setters: Record<string, Parameter> = {}
  const staticSetters: Record<string, Parameter> = {}
  const isHook = decl.implements.some(
    (implement) =>
      implement.expression.type === 'Identifier' &&
      isHookClass(implement.expression.value)
  )
  const isElement = isUTSElementProxyClass(cls)

  const interfaces = parseImplements(decl)
  decl.body.forEach((item) => {
    if (item.type === 'Constructor') {
      constructor.params = resolveFunctionParams(
        types,
        item.params,
        resolveTypeReferenceName
      )
    } else if (item.type === 'ClassMethod') {
      if (item.key.type === 'Identifier') {
        if (item.kind === 'getter' || item.kind === 'setter') {
          const curProps = item.isStatic ? staticProps : props
          if (!curProps.includes(item.key.value)) {
            curProps.push(item.key.value)
          }
          if (item.kind === 'setter') {
            const params = resolveFunctionParams(
              types,
              item.function.params,
              resolveTypeReferenceName
            )
            if (params.length) {
              ;(item.isStatic ? staticSetters : setters)[item.key.value] =
                params[0]
            }
          }
        } else {
          let returnOptions: ProxyFunctionReturnOptions | undefined
          if (item.function.returnType) {
            let returnInterface = parseReturnInterface(
              types,
              item.function.returnType.typeAnnotation
            )
            if (returnInterface) {
              returnOptions = {
                type: 'interface',
                options: returnInterface,
              }
            }
          }

          const name = item.key.value
          const value: ProxyClassMethod = {
            async:
              item.function.async || isReturnPromise(item.function.returnType),
            keepAlive: parseKeepAlive(item.function),
            params: resolveFunctionParams(
              types,
              item.function.params,
              resolveTypeReferenceName
            ),
            return: returnOptions,
          }
          if (item.isStatic) {
            staticMethods[name + 'ByJs'] = value
          } else {
            methods[name + (isElement ? '' : 'ByJs')] = value
          }
        }
      }
    } else if (item.type === 'ClassProperty') {
      if (item.key.type === 'Identifier') {
        if (item.isStatic) {
          staticProps.push(item.key.value)
        } else {
          props.push(item.key.value)
        }
        if (item.typeAnnotation) {
          const params = resolveFunctionParams(
            types,
            tsParamsToParams([
              createBindingIdentifier(item.key.value, item.typeAnnotation),
            ]),
            resolveTypeReferenceName
          )
          if (params.length) {
            ;(item.isStatic ? staticSetters : setters)[item.key.value] =
              params[0]
          }
        }
      }
    }
  })
  return genProxyClass(
    cls,
    {
      constructor,
      methods,
      staticMethods,
      props,
      staticProps,
      setters,
      staticSetters,
    },
    isDefault,
    false,
    isHook,
    interfaces
  )
}

/**
 * 不考虑接口继承类的情况，直接把接口当成类来处理，接口中的方法都当成实例方法，属性当成实例属性
 */
function genClassDeclarationFromInterface(
  types: Types,
  decl: TsInterfaceDeclaration,
  resolveTypeReferenceName: ResolveTypeReferenceName
): ProxyClass {
  const cls = decl.id.value
  const methods: ProxyClass['options']['methods'] = {}
  const props: string[] = []
  const setters: Record<string, Parameter> = {}
  const elements = parseInterfaceBody(types, decl)
  const isElement = isUTSElementProxyClass(cls)

  elements.forEach((item) => {
    if (item.type === 'TsMethodSignature') {
      if (item.key.type === 'Identifier') {
        let returnOptions: ProxyFunctionReturnOptions | undefined
        if (item.typeAnn) {
          let returnInterface = parseReturnInterface(
            types,
            item.typeAnn.typeAnnotation
          )
          if (returnInterface) {
            returnOptions = {
              type: 'interface',
              options: returnInterface,
            }
          }
        }

        const name = item.key.value
        methods[name + (isElement ? '' : 'ByJs')] = {
          async: isReturnPromise(item.typeAnn),
          keepAlive: false,
          params: resolveFunctionParams(
            types,
            tsParamsToParams(item.params),
            resolveTypeReferenceName
          ),
          return: returnOptions,
        }
      }
    } else if (item.type === 'TsPropertySignature') {
      if (item.key.type === 'Identifier') {
        props.push(item.key.value)
        if (item.typeAnnotation) {
          const params = resolveFunctionParams(
            types,
            tsParamsToParams([
              createBindingIdentifier(item.key.value, item.typeAnnotation),
            ]),
            resolveTypeReferenceName
          )
          if (params.length) {
            setters[item.key.value] = params[0]
          }
        }
      }
    }
  })
  return genProxyClass(
    cls,
    {
      constructor: { params: [] },
      methods,
      staticMethods: {},
      props,
      staticProps: [],
      setters,
      staticSetters: {},
    },
    false,
    false,
    false,
    []
  )
}

function genInitCode(expr: Expression) {
  switch (expr.type) {
    case 'BooleanLiteral':
      return expr.value + ''
    case 'NumericLiteral':
      return expr.value + ''
    case 'StringLiteral':
      return expr.value
  }
  return ''
}

function genVariableDeclaration(
  types: Types,
  decl: VariableDeclaration,
  resolveTypeReferenceName: ResolveTypeReferenceName
): VariableDeclaration | ProxyFunctionDeclaration | undefined {
  // 目前仅支持 const 的 boolean,number,string
  const lits = ['BooleanLiteral', 'NumericLiteral', 'StringLiteral']
  if (
    decl.kind === 'const' &&
    !decl.declarations.find((d) => {
      if (d.id.type !== 'Identifier') {
        return true
      }
      if (!d.init) {
        return true
      }
      const type = d.init.type
      if (!lits.includes(type)) {
        return true
      }
      return false
    })
  ) {
    return decl
  }
  if (decl.declarations.length === 1) {
    // 识别是否是定义的 function,如：export const showToast:ShowToast = ()=>{}
    const { id, init } = decl.declarations[0]
    if (
      id.type === 'Identifier' &&
      init &&
      (init.type === 'ArrowFunctionExpression' ||
        init.type === 'FunctionExpression')
    ) {
      // 根据类型信息查找参数列表
      let params: Param[] | undefined
      const typeAnn = (id as BindingIdentifier).typeAnnotation
      if (typeAnn && typeAnn.typeAnnotation.type === 'TsTypeReference') {
        const { typeName } = typeAnn.typeAnnotation
        if (typeName.type === 'Identifier') {
          const value = types.fn[typeName.value]
          if (isArray(value)) {
            params = value
          }
        }
      }
      return genFunctionDeclaration(
        types,
        createFunctionDeclaration(id.value, init, params),
        resolveTypeReferenceName,
        false,
        true
      )
    } else if (
      id.type === 'Identifier' &&
      init &&
      init.type === 'CallExpression' &&
      init.callee.type === 'Identifier' &&
      /^define.*Api/.test(init.callee.value)
    ) {
      // TODO 合并重复逻辑
      /**
       * 例：export const getElementById = defineSyncApi<GetElementById>(
       *        'getElementById',
       *        (id: string.IDString | string): UniElement | null => {
       *            const pages = getCurrentPages();
       *            if (pages.length == 0) {
       *                return null;
       *            }
       *            const page = pages[pages.length - 1];
       *            if (page == null) {
       *                console.warn('page is null');
       *                return null;
       *            }
       *            return page.getElementById(id)
       *        },
       *    )
       */
      // 根据类型信息查找参数列表
      let params: Param[] | undefined
      const typeAnn = init.typeArguments?.[0]
      if (typeAnn && typeAnn.type === 'TsTypeReference') {
        const { typeName } = typeAnn
        if (typeName.type === 'Identifier') {
          const value = types.fn[typeName.value]
          if (isArray(value)) {
            params = value
          }
        }
      }

      return genFunctionDeclaration(
        types,
        createFunctionDeclaration(
          id.value,
          init.arguments?.[1].expression as
            | FunctionExpression
            | ArrowFunctionExpression,
          params
        ),
        resolveTypeReferenceName,
        false,
        true
      )
    }
  }
}

function createBindingIdentifier(
  name: string,
  typeAnnotation?: TsTypeAnnotation
): BindingIdentifier {
  return {
    type: 'Identifier',
    value: name,
    optional: false,
    span: {} as Span,
    typeAnnotation,
  }
}

function createIdentifier(name: string): Identifier {
  return {
    type: 'Identifier',
    value: name,
    optional: false,
    span: {} as Span,
  }
}

function createFunctionDeclaration(
  name: string,
  func: ArrowFunctionExpression | FunctionExpression,
  params?: Param[]
): FunctionDeclaration {
  if (!params) {
    if (func.type === 'FunctionExpression') {
      params = func.params
    } else if (func.type === 'ArrowFunctionExpression') {
      params = []
      func.params.forEach((p) => {
        if (p.type === 'Identifier') {
          params!.push({
            type: 'Parameter',
            pat: p,
            span: {} as Span,
          })
        }
      })
    }
  }
  return {
    type: 'FunctionDeclaration',
    identifier: createIdentifier(name),
    declare: false,
    params: params!,
    generator: false,
    async: func.async,
    typeParameters: func.typeParameters,
    returnType: func.returnType,
    span: {} as Span,
  }
}

export async function parseExportIdentifiers(
  fileName: string,
  preprocessor?: SyncUniModulesFilePreprocessor
) {
  const ids: string[] = []
  if (!fs.existsSync(fileName)) {
    return ids
  }
  let ast: Module | null = null
  try {
    let code = fs.readFileSync(fileName, 'utf8')
    if (preprocessor) {
      code = await preprocessor(code, fileName)
    }
    ast = await parseUtsCode(code, {
      filename: fileName,
      noColor: true,
    })
  } catch (e: any) {}
  if (!ast) {
    return ids
  }
  ast.body.forEach((item) => {
    if (item.type === 'ExportDeclaration') {
      switch (item.declaration.type) {
        case 'FunctionDeclaration':
          ids.push(item.declaration.identifier.value)
          break
        case 'ClassDeclaration':
          ids.push(item.declaration.identifier.value)
          break
        case 'VariableDeclaration':
          item.declaration.declarations.forEach((d) => {
            if (d.id.type === 'Identifier') {
              ids.push(d.id.value)
            }
          })
          break
        case 'TsInterfaceDeclaration':
          ids.push(item.declaration.id.value)
          break
        case 'TsTypeAliasDeclaration':
          ids.push(item.declaration.id.value)
          break
        case 'TsEnumDeclaration':
          ids.push(item.declaration.id.value)
          break
        case 'TsModuleDeclaration':
          ids.push(item.declaration.id.value)
          break
      }
    }
  })
  return ids
}
