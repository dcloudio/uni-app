import fs from 'fs'
import path from 'path'

import {
  BindingIdentifier,
  ClassDeclaration,
  ClassExpression,
  Expression,
  FunctionDeclaration,
  FunctionExpression,
  Identifier,
  Module,
  Param,
  TsTypeAnnotation,
  VariableDeclaration,
  VariableDeclarationKind,
} from '../types/types'
import { createResolveTypeReferenceName, ERR_MSG_PLACEHOLDER } from './utils'
import { isInHBuilderX } from './shared'
import { camelize, capitalize } from '@vue/shared'

export const enum FORMATS {
  ES = 'es',
  CJS = 'cjs',
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
}

export async function genProxyCode(
  module: string,
  options: GenProxyCodeOptions
) {
  const { name, is_uni_modules, format } = options
  return `
import { initUtsProxyClass, initUtsProxyFunction, initUtsPackageName, initUtsIndexClassName, initUtsClassName } from '@dcloudio/uni-app'
// const { initUtsProxyClass, initUtsProxyFunction, initUtsPackageName, initUtsIndexClassName, initUtsClassName } = uni
const name = '${name}'
const errMsg = \`${ERR_MSG_PLACEHOLDER}\`
const is_uni_modules = ${is_uni_modules}
const pkg = initUtsPackageName(name, is_uni_modules)
const cls = initUtsIndexClassName(name, is_uni_modules)
${genComponentsCode(
  options.androidComponents || {},
  options.iosComponents || {}
)}
${genModuleCode(await parseModuleDecls(module, options), format)}
`
}

export function genComponentsCode(
  androidComponents: Record<string, string>,
  iosComponents: Record<string, string>
) {
  const codes: string[] = []
  Object.keys(Object.assign({}, androidComponents, iosComponents)).forEach(
    (name) => {
      codes.push(`export const ${capitalize(camelize(name))}Component = {}`)
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
  return format === FORMATS.ES ? 'export default ' : 'exports.default = '
}

function exportVarCode(format: FORMATS, kind: VariableDeclarationKind) {
  if (format === FORMATS.ES) {
    return `export ${kind} `
  }
  return `exports.`
}

function genModuleCode(decls: ProxyDecl[], format: FORMATS = FORMATS.ES) {
  const codes: string[] = []
  if (format === FORMATS.CJS) {
    codes.push(`Object.defineProperty(exports, '__esModule', { value: true })`)
  }
  const exportDefault = exportDefaultCode(format)
  const exportConst = exportVarCode(format, 'const')
  decls.forEach((decl) => {
    if (decl.type === 'Class') {
      if (decl.isDefault) {
        codes.push(
          `${exportDefault}initUtsProxyClass(Object.assign({ errMsg, package: pkg, class: initUtsClassName(name, '${
            decl.cls
          }', is_uni_modules) }, ${JSON.stringify(decl.options)} ))`
        )
      } else {
        codes.push(
          `${exportConst}${
            decl.cls
          } = initUtsProxyClass(Object.assign({ errMsg, package: pkg, class: initUtsClassName(name, '${
            decl.cls
          }', is_uni_modules) }, ${JSON.stringify(decl.options)} ))`
        )
      }
    } else if (decl.type === 'FunctionDeclaration') {
      if (decl.isDefault) {
        codes.push(
          `${exportDefault}nitUtsProxyFunction(${
            decl.async
          }, { errMsg, main: true, package: pkg, class: cls, name: '${
            decl.method
          }', params: ${JSON.stringify(decl.params)}})`
        )
      } else {
        codes.push(
          `${exportConst}${decl.method} = initUtsProxyFunction(${
            decl.async
          }, { errMsg, main: true, package: pkg, class: cls, name: '${
            decl.method
          }', params: ${JSON.stringify(decl.params)}})`
        )
      }
    } else if (decl.type === 'VariableDeclaration') {
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
  return codes.join(`\n`)
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
    if (item.type === 'Class') {
      if (
        !to.find((toItem) => toItem.type === 'Class' && toItem.cls === item.cls)
      ) {
        to.push(item)
      }
    } else if (item.type === 'FunctionDeclaration') {
      if (
        !to.find(
          (toItem) =>
            toItem.type === 'FunctionDeclaration' &&
            toItem.method === item.method
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
) {
  if (filename) {
    return parseCode(fs.readFileSync(filename, 'utf8'), options.namespace)
  }
  return []
}

async function parseCode(code: string, namespace: string) {
  // 懒加载 uts 编译器
  // eslint-disable-next-line no-restricted-globals
  const { parse } = require('@dcloudio/uts')
  const ast = await parse(code, { noColor: isInHBuilderX() })
  return parseAst(ast, createResolveTypeReferenceName(namespace, ast))
}

type ProxyDecl = ProxyFunctionDeclaration | ProxyClass | VariableDeclaration

interface ProxyFunctionDeclaration {
  type: 'FunctionDeclaration'
  method: string
  async: boolean
  params: Parameter[]
  isDefault: boolean
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
}

function parseAst(
  { body }: Module,
  resolveTypeReferenceName: ResolveTypeReferenceName
) {
  const decls: Array<
    ProxyFunctionDeclaration | ProxyClass | VariableDeclaration
  > = []

  body.forEach((item) => {
    if (item.type === 'ExportDeclaration') {
      const decl = item.declaration
      switch (decl.type) {
        case 'FunctionDeclaration':
          decls.push(
            genFunctionDeclaration(decl, resolveTypeReferenceName, false)
          )
          break
        case 'ClassDeclaration':
          decls.push(genClassDeclaration(decl, resolveTypeReferenceName, false))
          break
        case 'VariableDeclaration':
          const varDecl = genVariableDeclaration(decl)
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
          decls.push(genClassDeclaration(decl, resolveTypeReferenceName, true))
        }
      } else if (decl.type === 'FunctionExpression') {
        if (decl.identifier) {
          decls.push(
            genFunctionDeclaration(decl, resolveTypeReferenceName, true)
          )
        }
      }
    }
  })
  return decls
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
  isDefault: boolean = false
): ProxyFunctionDeclaration {
  return { type: 'FunctionDeclaration', method, async, params, isDefault }
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
  isDefault: boolean = false
): ProxyClass {
  return { type: 'Class', cls, options, isDefault }
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

function resolveIdentifierType(
  ident: BindingIdentifier,
  resolveTypeReferenceName: ResolveTypeReferenceName
) {
  if (ident.typeAnnotation) {
    const { typeAnnotation } = ident.typeAnnotation
    if (typeAnnotation.type === 'TsKeywordType') {
      return typeAnnotation.kind
    } else if (typeAnnotation.type === 'TsFunctionType') {
      return 'UTSCallback'
    } else if (
      typeAnnotation.type === 'TsTypeReference' &&
      typeAnnotation.typeName.type === 'Identifier'
    ) {
      return resolveTypeReferenceName(typeAnnotation.typeName.value)
    } else if (typeAnnotation.type === 'TsUnionType') {
      if (typeAnnotation.types.length === 2) {
        const [type1, type2] = typeAnnotation.types
        if (type1.type === 'TsKeywordType' && type1.kind === 'null') {
          if (
            type2.type === 'TsParenthesizedType' &&
            type2.typeAnnotation.type === 'TsFunctionType'
          ) {
            return 'UTSCallback'
          }
        }
        if (type2.type === 'TsKeywordType' && type2.kind === 'null') {
          if (
            type1.type === 'TsParenthesizedType' &&
            type1.typeAnnotation.type === 'TsFunctionType'
          ) {
            return 'UTSCallback'
          }
        }
      }
    }
  }
  return ''
}

function resolveFunctionParams(
  params: Param[],
  resolveTypeReferenceName: ResolveTypeReferenceName
) {
  const result: Parameter[] = []
  params.forEach(({ pat }) => {
    if (pat.type === 'Identifier') {
      result.push({
        name: pat.value,
        type: resolveIdentifierType(
          pat as BindingIdentifier,
          resolveTypeReferenceName
        ),
      })
    } else if (pat.type === 'AssignmentPattern') {
      if (pat.left.type === 'Identifier') {
        const param: Parameter = {
          name: pat.left.value,
          type: resolveIdentifierType(
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

function genFunctionDeclaration(
  decl: FunctionDeclaration | FunctionExpression,
  resolveTypeReferenceName: ResolveTypeReferenceName,
  isDefault: boolean = false
): ProxyFunctionDeclaration {
  return genProxyFunction(
    decl.identifier!.value,
    decl.async || isReturnPromise(decl.returnType),
    resolveFunctionParams(decl.params, resolveTypeReferenceName),
    isDefault
  )
}

function genClassDeclaration(
  decl: ClassDeclaration | ClassExpression,
  resolveTypeReferenceName: ResolveTypeReferenceName,
  isDefault: boolean = false
): ProxyClass {
  const cls = decl.identifier!.value
  const constructor: { params: Parameter[] } = { params: [] }
  const methods: Record<string, { async?: boolean; params: Parameter[] }> = {}
  const staticMethods: Record<
    string,
    { async?: boolean; params: Parameter[] }
  > = {}
  const props: string[] = []
  const staticProps: string[] = []
  decl.body.forEach((item) => {
    if (item.type === 'Constructor') {
      constructor.params = resolveFunctionParams(
        item.params as Param[],
        resolveTypeReferenceName
      )
    } else if (item.type === 'ClassMethod') {
      if (item.key.type === 'Identifier') {
        const name = item.key.value
        const value = {
          async:
            item.function.async || isReturnPromise(item.function.returnType),
          params: resolveFunctionParams(
            item.function.params,
            resolveTypeReferenceName
          ),
        }
        if (item.isStatic) {
          staticMethods[name] = value
        } else {
          methods[name] = value
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
  decl: VariableDeclaration
): VariableDeclaration | undefined {
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
}
