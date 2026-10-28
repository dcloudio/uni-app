import ts from 'typescript'
import {
  transformUniElementClasses,
  uniWebVaporElementPlugin,
} from '../../src/vite/plugins/uniElement'

function compile(code: string, id = '/src/uni_modules/form/global.ts') {
  const transformed = transformUniElementClasses(code, id)!
  const js = ts.transpileModule(transformed.code, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
    },
  }).outputText
  const exports: any = {}
  new Function('exports', 'UniViewElementImpl', js)(exports, class {})
  return exports
}

test('复用原类成员，独立初始化公开字段，不搬运 DOM 标签名', () => {
  const { UniPickerElement } =
    compile(`export class UniPickerElement extends UniViewElementImpl {
    tagName = 'PICKER'; nodeName = 'PICKER'; _value = ''; items = [];
    get value() { return this.vm?.getValue() ?? this._value }
    set value(value) { this._value = value; this.vm?.setValue(value) }
  }`)
  const a: any = {},
    b: any = {}
  UniPickerElement.__uniElement.init.call(a)
  UniPickerElement.__uniElement.init.call(b)
  expect(a).toEqual({ _value: '', items: [] })
  expect(a.items).not.toBe(b.items)
  expect(UniPickerElement.__uniElement.vm).toBe(true)
  expect(
    Object.getOwnPropertyDescriptor(UniPickerElement.prototype, 'value')!.get
  ).toBeInstanceOf(Function)
})

test('空类不创建字段初始化函数，纯字段类不绑定组件接口', () => {
  const { UniFormElement, UniSwiperItemElement } = compile(`
    export class UniFormElement extends UniViewElementImpl {}
    export class UniSwiperItemElement extends UniViewElementImpl { itemId = null }
  `)
  expect(UniFormElement.__uniElement).toEqual({})
  expect(UniSwiperItemElement.__uniElement.vm).toBeUndefined()
  const root: any = {}
  UniSwiperItemElement.__uniElement.init.call(root)
  expect(root.itemId).toBeNull()
})

test('显式构造器在编译时拒绝，不改变非 Vapor 原类的构造行为', () => {
  const code = `class UniExampleElement extends UniViewElementImpl {
    value = 1
    constructor() { super(); this.value += 2 }
  }`
  const Original = new Function(
    'UniViewElementImpl',
    code + ';return UniExampleElement'
  )(class {})
  expect(new Original().value).toBe(3)
  expect(() => transformUniElementClasses(code, '/element.js')).toThrow(
    '暂不支持自定义构造器'
  )
})

test.each([
  '/src/[demo]/global.ts',
  'C:\\src\\[demo]\\global.ts',
  '\\\\server\\share\\global.ts',
])('转换不依赖操作系统和模块目录：%s', (id) => {
  const code = 'export class UniFormElement extends UniViewElementImpl {}'
  const first = transformUniElementClasses(code, id)!
  expect(first.code).toContain('static __uniElement')
  expect(transformUniElementClasses(first.code, id)).toBeUndefined()
  expect(first.map.sources).toHaveLength(1)
})

test.each([
  'constructor(value) { super(); this.value = value }',
  '#value = 1',
  '["value"] = 1',
])('无法可靠迁移的类语义在编译时报告，不能静默漏初始化：%s', (member) => {
  expect(() =>
    transformUniElementClasses(
      `class UniExampleElement extends UniViewElementImpl { ${member} }`,
      '/global.ts'
    )
  ).toThrow()
})

test('不转换普通类和 raw/url/声明文件，不解析原始 SFC', () => {
  expect(
    transformUniElementClasses('class Example extends HTMLElement {}', '/a.ts')
  ).toBeUndefined()
  const plugin = uniWebVaporElementPlugin()
  const transform = plugin.transform as Function
  const code = 'class UniExampleElement extends UniViewElementImpl {}'
  for (const id of [
    '/a.ts?raw',
    '/a.ts?url',
    '/a.d.ts',
    '/a.d.mts',
    '/a.d.cts',
    '/a.uvue',
  ])
    expect(transform(code, id)).toBeUndefined()
  expect(transform(code, '/a.uvue?vue&type=script&lang.ts').code).toContain(
    '__uniElement'
  )
})

test('生成元信息不改变 TypeScript 的静态继承关系和字段 this 类型', () => {
  const file = '/element.ts'
  const source = transformUniElementClasses(
    `
    class UniViewElementImpl { vm: any }
    class UniBaseElement extends UniViewElementImpl { value = 1 }
    class UniDerivedElement extends UniBaseElement {}
  `,
    file
  )!.code
  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2020,
    strict: true,
    noEmit: true,
    types: [],
  }
  const host = ts.createCompilerHost(options)
  const original = host.getSourceFile
  host.getSourceFile = (name, language, onError, shouldCreate) =>
    name === file
      ? ts.createSourceFile(name, source, language, true)
      : original(name, language, onError, shouldCreate)
  const program = ts.createProgram([file], options, host)
  expect(
    ts
      .getPreEmitDiagnostics(program)
      .map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'))
  ).toEqual([])
})

test('JS 字段初始化不能进入构造器局部变量的作用域', () => {
  const code = `
    const value = 1
    class UniExampleElement extends UniViewElementImpl {
      result = value
      constructor() { super(); const value = 2; this.other = value }
    }
  `
  const Original = new Function(
    'UniViewElementImpl',
    code + ';return UniExampleElement'
  )(class {})
  expect(new Original().result).toBe(1)
  // 保留作用域回归：不能将字段表达式放入构造器局部作用域。
  expect(() => transformUniElementClasses(code, '/element.js')).toThrow(
    '暂不支持自定义构造器'
  )
})

test('JS 实例字段必须遮蔽继承访问器，不能变成调用 setter 的普通赋值', () => {
  const code = `
    class UniBaseElement extends UniViewElementImpl { get value() { return 1 } }
    class UniExampleElement extends UniBaseElement { value = 2 }
  `
  const transformed = transformUniElementClasses(code, '/element.js')!.code
  const { UniBaseElement, UniExampleElement } = new Function(
    'UniViewElementImpl',
    transformed + ';return { UniBaseElement, UniExampleElement }'
  )(class {})
  expect(new UniExampleElement().value).toBe(2)
  // 运行时会先安装原类的访问器；新字段应当像 JS class 一样定义 own property。
  const root = Object.create(UniBaseElement.prototype)
  expect(() => UniExampleElement.__uniElement.init.call(root)).not.toThrow()
  expect(root.value).toBe(2)
})

test('无初值字段保留自身属性，declare 不产生运行时代码，初始化按声明顺序执行', () => {
  const { UniExampleElement } =
    compile(`export class UniExampleElement extends UniViewElementImpl {
    declare typeOnly: number
    empty: any
    first = 1
    second = this.first + 1
    items = []
  }`)
  const a: any = {},
    b: any = {}
  UniExampleElement.__uniElement.init.call(a)
  UniExampleElement.__uniElement.init.call(b)
  expect(Object.prototype.hasOwnProperty.call(a, 'typeOnly')).toBe(false)
  expect(Object.getOwnPropertyDescriptor(a, 'empty')).toEqual({
    value: undefined,
    writable: true,
    enumerable: true,
    configurable: true,
  })
  expect(a.second).toBe(2)
  expect(a.items).not.toBe(b.items)
})

test('字段的括号表达式保留为完整表达式，不能拆成描述符成员', () => {
  const code = `class UniExampleElement extends UniViewElementImpl {
    value = (1, 2)
  }`
  const source = transformUniElementClasses(code, '/element.js')!.code
  let Type: any
  expect(() => {
    Type = new Function(
      'UniViewElementImpl',
      source + ';return UniExampleElement'
    )(class {})
  }).not.toThrow()
  const root: any = {}
  Type.__uniElement.init.call(root)
  expect(root.value).toBe(2)
})

// 快速筛选只能排除无关代码，不能因合法的类头写法而漏掉实例字段初始化。
test.each([
  'class UniExampleElement /* Element 实现 */ extends UniViewElementImpl',
  'class UniExampleElement<T> extends UniViewElementImpl',
])('合法类头仍应初始化字段：%s', (header) => {
  const result = transformUniElementClasses(
    `${header} { value = 1 }`,
    '/global.ts'
  )
  expect(result).toBeDefined()
  const js = ts.transpileModule(result!.code, {
    compilerOptions: { target: ts.ScriptTarget.ES2020 },
  }).outputText
  const Type = new Function(
    'UniViewElementImpl',
    js + ';return UniExampleElement'
  )(class {})
  const root: any = {}
  Type.__uniElement.init.call(root)
  expect(root.value).toBe(1)
})

test.each(['ts', 'mts', 'cts'])(
  '插件接受的 TypeScript 模块保留字段 this 类型：.%s',
  (extension) => {
    const filename = '/element.' + extension
    const code = `class UniViewElementImpl {}
      class UniExampleElement<T = number> extends UniViewElementImpl {
        first = 1
        second = this.first + 1
        items = [] as T[]
      }`
    const transform = uniWebVaporElementPlugin().transform as Function
    const source = transform(code, filename).code
    const options: ts.CompilerOptions = {
      target: ts.ScriptTarget.ES2020,
      strict: true,
      noEmit: true,
      types: [],
    }
    const host = ts.createCompilerHost(options)
    const original = host.getSourceFile
    host.getSourceFile = (name, language, onError, shouldCreate) =>
      name === filename
        ? ts.createSourceFile(name, source, language, true)
        : original(name, language, onError, shouldCreate)
    const program = ts.createProgram([filename], options, host)
    expect(
      program
        .getSemanticDiagnostics(program.getSourceFile(filename))
        .map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'))
    ).toEqual([])
  }
)

test('普通 TS 文件中的 declare class 不应生成运行时初始化器', () => {
  const source =
    'declare class UniExampleElement extends UniViewElementImpl { value: number }'
  expect(transformUniElementClasses(source, '/global.ts')).toBeUndefined()
})

// ambient 上下文中的类不一定自身带 declare，仍然不能追加运行时代码。
test.each([
  'declare namespace Elements { class UniExampleElement extends UniViewElementImpl { value: number } }',
  'export {}; declare global { class UniExampleElement extends UniViewElementImpl { value: number } }',
])('环境声明中的类保持纯类型：%s', (source) => {
  expect(transformUniElementClasses(source, '/global.ts')).toBeUndefined()
})

test('抽象字段不生成自身属性，不能遮蔽派生类访问器', () => {
  const { UniBaseElement, UniExampleElement } = compile(`
    export abstract class UniBaseElement extends UniViewElementImpl {
      abstract value: number
    }
    export class UniExampleElement extends UniBaseElement {
      get value() { return 42 }
    }
  `)
  expect(new UniExampleElement().value).toBe(42)
  const root: any = {}
  Object.defineProperty(
    root,
    'value',
    Object.getOwnPropertyDescriptor(UniExampleElement.prototype, 'value')!
  )
  // 与运行时一致：先安装派生类成员，再执行基类和派生类字段初始化。
  UniBaseElement.__uniElement.init?.call(root)
  UniExampleElement.__uniElement.init?.call(root)
  expect(root.value).toBe(42)
})

test('环境声明不影响相邻的运行时类及普通 namespace', () => {
  const { UniBeforeElement, UniAfterElement, Elements } = compile(`
    export class UniBeforeElement extends UniViewElementImpl { value = 1 }
    declare namespace Types {
      namespace Nested {
        class UniDeclaredElement extends UniViewElementImpl { value: number }
      }
    }
    export class UniAfterElement extends UniViewElementImpl { value = 2 }
    export namespace Elements {
      export class UniNestedElement extends UniViewElementImpl { value = 3 }
    }
  `)
  for (const [Type, value] of [
    [UniBeforeElement, 1],
    [UniAfterElement, 2],
    [Elements.UniNestedElement, 3],
  ]) {
    const root: any = {}
    Type.__uniElement.init.call(root)
    expect(root.value).toBe(value)
  }
})
