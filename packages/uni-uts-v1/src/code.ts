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
  Identifier,
  Module,
  Param,
  Span,
  TsFnParameter,
  TsInterfaceDeclaration,
  TsType,
  TsTypeAliasDeclaration,
  TsTypeAnnotation,
  VariableDeclaration,
  VariableDeclarationKind,
} from '../types/types'
import {
  createResolveTypeReferenceName,
  ERR_MSG_PLACEHOLDER,
  isColorSupported,
  relative,
} from './utils'
import { normalizePath } from './shared'
import { parseUTSSyntaxError } from './stacktrace'

export const enum FORMATS {
  ES = 'es',
  CJS = 'cjs',
}

// 不应该用 class，应该用lit，调整起来影响较多，暂不调整
type Types = {
  interface: Record<string, { returned: boolean; decl: TsInterfaceDeclaration }>
  class: string[]
  fn: Record<string, Param[]>
}

interface Meta {
  exports: Record<string, 'var' | 'function' | 'class'>
  types: Record<string, 'function' | 'class'>
}
interface GenProxyCodeOptions {
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
}

export async function genProxyCode(
  module: string,
  options: GenProxyCodeOptions
) {
  const { name, is_uni_modules, format, moduleName, moduleType } = options
  options.inputDir = options.inputDir || process.env.UNI_INPUT_DIR
  if (!options.meta) {
    options.meta = { exports: {}, types: {} }
  }
  options.types = await parseInterfaceTypes(module, options)
  options.meta!.types = parseMetaTypes(options.types)
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
  types.class.forEach((n) => {
    res[n] = 'class'
  })
  Object.keys(types.fn).forEach((n) => {
    res[n] = 'function'
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
  return fs.existsSync(filename) && filename
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
  return fs.existsSync(filename) && filename
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
  return fs.existsSync(filename) && filename
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
      codes.push(
        `registerUTSInterface('${
          decl.cls
        }Options',Object.assign({ moduleName, moduleType, errMsg, package: pkg, class: initUTSClassName(name, '${
          decl.cls
        }ByJsProxy', is_uni_modules) }, ${genClassOptionsCode(decl.options)} ))`
      )
    } else if (decl.type === 'Class') {
      meta.exports[decl.cls] = decl.isVar ? 'var' : 'class'

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
      meta.exports[decl.method] = decl.isVar ? 'var' : 'function'
      const returnOptions = decl.return
        ? { type: decl.return.type, options: decl.return.options + 'Options' }
        : ''
      if (decl.isDefault) {
        codes.push(
          `${exportDefault}initUTSProxyFunction(${
            decl.async
          }, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: '${
            decl.method
          }ByJs', params: ${JSON.stringify(
            decl.params
          )}, return: ${JSON.stringify(returnOptions)}})`
        )
      } else {
        codes.push(
          `${exportConst}${decl.method} = /*#__PURE__*/ initUTSProxyFunction(${
            decl.async
          }, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: '${
            decl.method
          }ByJs', params: ${JSON.stringify(
            decl.params
          )}, return: ${JSON.stringify(returnOptions)}})`
        )
      }
    } else if (decl.type === 'VariableDeclaration') {
      decl.declarations.forEach((d) => {
        meta.exports[(d.id as Identifier).value] = 'var'
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
      class: [],
      fn: {},
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
  const interfaceTypes: Types['interface'] = {}
  const classTypes: Types['class'] = []
  const fnTypes: Types['fn'] = {}

  const exportNamed: string[] = []
  if (ast) {
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

    ast.body.filter((node) => {
      if (node.type === 'ExportDeclaration') {
        if (node.declaration.type === 'TsTypeAliasDeclaration') {
          parseTypes(node.declaration, classTypes, fnTypes)
        } else if (node.declaration.type === 'TsInterfaceDeclaration') {
          interfaceTypes[node.declaration.id.value] = {
            returned: false,
            decl: node.declaration,
          }
        }
      } else if (node.type === 'TsTypeAliasDeclaration') {
        if (exportNamed.includes(node.id.value)) {
          parseTypes(node, classTypes, fnTypes)
        }
      } else if (node.type === 'TsInterfaceDeclaration') {
        interfaceTypes[node.id.value] = {
          returned: false,
          decl: node,
        }
      }
    })
  }
  return {
    interface: interfaceTypes,
    class: classTypes,
    fn: fnTypes,
  }
}

function parseTypes(
  decl: TsTypeAliasDeclaration,
  classTypes: string[],
  fnTypes: Record<string, Param[]>
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
    case 'TsTypeLiteral':
      classTypes.push(decl.id.value)
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
  const iosDecls = await parseFile(
    resolvePlatformIndex('app-ios', module, options),
    options
  )
  const androidDecls = await parseFile(
    resolvePlatformIndex('app-android', module, options),
    options
  )
  // 优先使用 app-ios，因为 app-ios 平台函数类型需要正确的参数列表
  const decls = mergeDecls(androidDecls, iosDecls)
  // 如果没有平台特有，查找 root index.uts
  if (!decls.length) {
    return await parseFile(resolveRootIndex(module, options), options)
  }
  return decls
}

function mergeDecls(from: ProxyDecl[], to: ProxyDecl[]) {
  from.forEach((item) => {
    if (item.type === 'InterfaceDeclaration') {
      if (
        !to.find(
          (toItem) =>
            toItem.type === 'InterfaceDeclaration' && toItem.cls === item.cls
        )
      ) {
        to.push(item)
      }
    } else if (item.type === 'Class') {
      if (
        !to.find(
          (toItem) =>
            toItem.type === 'Class' &&
            toItem.cls === item.cls &&
            toItem.isDefault === item.isDefault
        )
      ) {
        to.push(item)
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
    return parseCode(
      fs.readFileSync(filename, 'utf8'),
      options.namespace,
      options.types!,
      filename,
      options.inputDir!
    )
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
  }
}

interface ProxyFunctionDeclaration {
  type: 'FunctionDeclaration'
  method: string
  async: boolean
  params: Parameter[]
  isDefault: boolean
  isVar: boolean
  return?: {
    type: 'interface'
    options: string
  }
}

interface ProxyClass {
  type: 'Class'
  cls: string
  options: {
    constructor: { params: Parameter[] }
    methods: Record<string, any>
    staticMethods: Record<string, any>
    props: string[]
    staticProps: string[]
  }
  isDefault: boolean
  isVar: boolean
}

function parseAst(
  { body }: Module,
  resolveTypeReferenceName: ResolveTypeReferenceName,
  types: Types
): ProxyDecl[] {
  const decls: ProxyDecl[] = []

  body.forEach((item) => {
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
  isVar: boolean = false
): ProxyFunctionDeclaration {
  return {
    type: 'FunctionDeclaration',
    method,
    async,
    params,
    return: ret ? { type: 'interface', options: ret } : undefined,
    isDefault,
    isVar,
  }
}

function genProxyClass(
  cls: string,
  options: {
    constructor: { params: Parameter[] }
    methods: Record<string, any>
    staticMethods: Record<string, any>
    props: string[]
    staticProps: string[]
  },
  isDefault = false,
  isVar = false
): ProxyClass {
  return { type: 'Class', cls, options, isDefault, isVar }
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

function resolveFunctionParams(
  types: Types,
  params: Param[],
  resolveTypeReferenceName: ResolveTypeReferenceName
) {
  const result: Parameter[] = []
  params.forEach(({ pat }) => {
    if (pat.type === 'Identifier') {
      result.push({
        name: pat.value,
        type: resolveIdentifierType(
          types,
          pat as BindingIdentifier,
          resolveTypeReferenceName
        ),
      })
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
    isVar
  )
}

function genInterfaceDeclaration(
  types: Types,
  decl: TsInterfaceDeclaration,
  resolveTypeReferenceName: ResolveTypeReferenceName
): ProxyInterface {
  const cls = decl.id.value
  const methods: ProxyClass['options']['methods'] = {}
  const props: string[] = []
  decl.body.body.forEach((item) => {
    if (item.type === 'TsMethodSignature') {
      if (item.key.type === 'Identifier') {
        let returnOptions = {}
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
        const value = {
          async: isReturnPromise(item.typeAnn),
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
      }
    }
  })
  return {
    type: 'InterfaceDeclaration',
    cls,
    options: {
      methods,
      props,
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
  decl.body.forEach((item) => {
    if (item.type === 'Constructor') {
      constructor.params = resolveFunctionParams(
        types,
        item.params as Param[],
        resolveTypeReferenceName
      )
    } else if (item.type === 'ClassMethod') {
      if (item.key.type === 'Identifier') {
        let returnOptions = {}
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
        const value = {
          async:
            item.function.async || isReturnPromise(item.function.returnType),
          params: resolveFunctionParams(
            types,
            item.function.params,
            resolveTypeReferenceName
          ),
          returnOptions,
        }
        if (item.isStatic) {
          staticMethods[name + 'ByJs'] = value
        } else {
          methods[name + 'ByJs'] = value
        }
      }
    } else if (item.type === 'ClassProperty') {
      if (item.key.type === 'Identifier') {
        if (item.isStatic) {
          staticProps.push(item.key.value)
        } else {
          props.push(item.key.value)
        }
      }
    }
  })
  return genProxyClass(
    cls,
    { constructor, methods, staticMethods, props, staticProps },
    isDefault
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

// function createBindingIdentifier(name: string, typeAnnotation?: TsTypeAnnotation): BindingIdentifier {
//   return {
//     type: 'Identifier',
//     value: name,
//     optional: false,
//     span: {} as Span,
//     typeAnnotation
//   }
// }

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
