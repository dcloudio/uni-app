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
}

// 不应该用 class，应该用lit，调整起来影响较多，暂不调整
type Types = {
  interface: Record<string, { returned: boolean; decl: TsInterfaceDeclaration }>
  class: Record<string, ClassMeta>
  fn: Record<string, Param[]>
  alias: Record<string, {}>
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
  types: Record<string, 'function' | 'class' | 'interface' | 'typealias'>
  components: string[]
}
export interface GenProxyCodeOptions {
  is_uni_modules: boolean
  id: string
  name: string
  extname: string
  namespace: string
  androidComponents?: Record<string, string>
  iosComponents?: Record<string, string>
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
}

export async function genProxyCode(
  module: string,
  options: GenProxyCodeOptions
) {
  const { name, is_uni_modules, format, moduleName, moduleType } = options
  options.inputDir = options.inputDir || process.env.UNI_INPUT_DIR
  if (!options.meta) {
    options.meta = { exports: {}, types: {}, typeParams: [], components: [] }
  }
  options.types = await parseInterfaceTypes(module, options)
  options.meta!.types = parseMetaTypes(options.types)
  options.meta!.typeParams = parseTypeParams(options.types)
  const components = new Set<string>()
  // 自动补充 VideoElement 导出
  if (options.androidComponents) {
    Object.keys(options.androidComponents).forEach((name) => {
      options.meta!.types[
        (process.env.UNI_UTS_MODULE_PREFIX ? 'Uni' : '') +
          capitalize(camelize(name)) +
          'Element'
      ] = 'class'
      components.add(name)
    })
  }
  if (options.iosComponents) {
    Object.keys(options.iosComponents).forEach((name) => {
      options.meta!.types[
        (process.env.UNI_UTS_MODULE_PREFIX ? 'Uni' : '') +
          capitalize(camelize(name)) +
          'Element'
      ] = 'class'
      components.add(name)
    })
  }
  options.meta!.components = [...components]
  const decls = await parseModuleDecls(module, options)
  return `
const { registerUTSInterface, initUTSProxyClass, initUTSProxyFunction, initUTSPackageName, initUTSIndexClassName, initUTSClassName } = uni
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
)}

${genModuleCode(decls, format, options.pluginRelativeDir!, options.meta!)}
`
}

function parseMetaTypes(types: Types) {
  let res: Meta['types'] = {}
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

export function genComponentsCode(
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

export function resolveRootIndex(module: string, options: GenProxyCodeOptions) {
  const filename = path.resolve(
    module,
    options.is_uni_modules ? 'utssdk' : '',
    `index${options.extname}`
  )
  return fs.existsSync(filename) ? filename : ''
}

export function resolveRootInterface(
  module: string,
  options: GenProxyCodeOptions
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
  options: GenProxyCodeOptions
) {
  return path.resolve(
    module,
    options.is_uni_modules ? 'utssdk' : '',
    platform,
    `index${options.extname}`
  )
}

export function resolvePlatformIndex(
  platform: 'app-android' | 'app-ios',
  module: string,
  options: GenProxyCodeOptions
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
  meta: Meta
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
        codes.push(
          `${exportDefault}initUTSProxyClass(Object.assign({ moduleName, moduleType, errMsg, package: pkg, class: initUTSClassName(name, '${
            decl.cls
          }ByJs', is_uni_modules) }, ${genClassOptionsCode(decl.options)} ))`
        )
      } else {
        codes.push(
          `${exportConst}${
            decl.cls
          } = /*#__PURE__*/ initUTSProxyClass(Object.assign({ moduleName, moduleType, errMsg, package: pkg, class: initUTSClassName(name, '${
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
        codes.push(
          `${exportConst}${decl.method} = /*#__PURE__*/ initUTSProxyFunction(${
            decl.async
          }, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: '${
            decl.method
          }ByJs', keepAlive: ${decl.keepAlive}, params: ${JSON.stringify(
            decl.params
          )}, return: ${JSON.stringify(returnOptions)}})`
        )
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
async function parseInterfaceTypes(
  module: string,
  options: GenProxyCodeOptions
): Promise<Types> {
  const interfaceFilename = resolveRootInterface(module, options)

  if (!interfaceFilename) {
    return {
      interface: {},
      class: {},
      fn: {},
      alias: {},
    }
  }
  // 懒加载 uts 编译器
  // eslint-disable-next-line no-restricted-globals
  const { parse } = require('@dcloudio/uts')
  let ast: Module | null = null
  try {
    ast = await parse(fs.readFileSync(interfaceFilename, 'utf8'), {
      filename: relative(interfaceFilename, options.inputDir!),
      noColor: !isColorSupported(),
    })
  } catch (e) {
    console.error(parseUTSSyntaxError(e, options.inputDir!))
  }
  return parseAstTypes(ast, true)
}

function parseAstTypes(ast: Module | null, isInterface: boolean) {
  const interfaceTypes: Types['interface'] = {}
  const classTypes: Types['class'] = {}
  const fnTypes: Types['fn'] = {}
  const aliasTypes: Types['alias'] = {}

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
        } else if (node.declaration.type === 'ClassDeclaration') {
          classTypes[node.declaration.identifier.value] = {}
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
        classTypes[node.identifier.value] = {}
      }
    })
  }
  return {
    interface: interfaceTypes,
    class: classTypes,
    fn: fnTypes,
    alias: aliasTypes,
  }
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
  // 优先合并 ios + android，如果没有，查找根目录 index.uts
  const iosDecls = (
    await parseFile(resolvePlatformIndex('app-ios', module, options), options)
  ).filter((decl) => {
    if (decl.type === 'Class') {
      if (decl.isHook) {
        options.iOSHookClass = options.namespace + capitalize(decl.cls)
        return false
      }
    }
    return true
  })
  const androidDecls = (
    await parseFile(
      resolvePlatformIndex('app-android', module, options),
      options
    )
  ).filter((decl) => {
    if (decl.type === 'Class') {
      if (decl.isHook) {
        options.androidHookClass =
          parseKotlinPackageWithPluginId(options.id, options.is_uni_modules) +
          '.' +
          decl.cls
        return false
      }
    }
    return true
  })
  // 优先使用 app-ios，因为 app-ios 平台函数类型需要正确的参数列表
  const decls = mergeDecls(androidDecls, iosDecls)
  // 如果没有平台特有，查找 root index.uts
  if (!decls.length) {
    return await parseFile(resolveRootIndex(module, options), options)
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
  filename: string | undefined | false,
  options: GenProxyCodeOptions
): Promise<ProxyDecl[]> {
  if (filename) {
    // 暂时不从uvue目录读取了，就读取原始文件
    // filename = resolveUVueFileName(filename)
    if (fs.existsSync(filename)) {
      return parseCode(
        fs.readFileSync(filename, 'utf8'),
        options.namespace,
        options.types!,
        filename,
        options.inputDir!
      )
    }
  }
  return []
}

async function parseCode(
  code: string,
  namespace: string,
  types: Types,
  filename: string,
  inputDir: string
): Promise<ProxyDecl[]> {
  // 懒加载 uts 编译器
  // eslint-disable-next-line no-restricted-globals
  const { parse } = require('@dcloudio/uts')
  try {
    const ast = await parse(code, {
      filename: relative(filename, inputDir),
      noColor: !isColorSupported(),
    })
    return parseAst(
      ast,
      createResolveTypeReferenceName(namespace, ast, types.class),
      types
    )
  } catch (e: any) {
    console.error(parseUTSSyntaxError(e, inputDir))
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
    methods: Record<string, any>
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
  isHook = false
): ProxyClass {
  return { type: 'Class', cls, options, isDefault, isVar, isHook }
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
    for (const type of typeAnnotation.types) {
      if (type.type === 'TsKeywordType') {
        continue
      }
      return resolveType(types, type, resolveTypeReferenceName)
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
  params: Param[],
  resolveTypeReferenceName: ResolveTypeReferenceName
) {
  const result: Parameter[] = []
  params.forEach(({ pat }) => {
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

function parseReturnInterface(types: Types, returnType: TsType): string {
  switch (returnType.type) {
    case 'TsTypeReference':
      if (returnType.typeName.type === 'Identifier') {
        if (hasOwn(types.interface, returnType.typeName.value)) {
          types.interface[returnType.typeName.value].returned = true
          return returnType.typeName.value
        }
      }
      break
    case 'TsUnionType':
      for (const type of returnType.types) {
        if (type.type === 'TsKeywordType') {
          continue
        }
        return parseReturnInterface(types, type)
      }
      break
    case 'TsParenthesizedType':
      return parseReturnInterface(types, returnType.typeAnnotation)
  }
  return ''
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
        methods[name + 'ByJs'] = value
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
  decl.body.forEach((item) => {
    if (item.type === 'Constructor') {
      constructor.params = resolveFunctionParams(
        types,
        item.params as Param[],
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
            methods[name + 'ByJs'] = value
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
    isHook
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

export async function parseExportIdentifiers(fileName: string) {
  const ids: string[] = []
  if (!fs.existsSync(fileName)) {
    return ids
  }
  const { parse } = require('@dcloudio/uts')
  let ast: Module | null = null
  try {
    ast = await parse(fs.readFileSync(fileName, 'utf8'), {
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
