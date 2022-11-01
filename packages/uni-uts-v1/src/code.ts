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
} from '../types/types'
import { createResolveTypeReferenceName } from './utils'
import { isInHBuilderX } from './shared'
interface GenProxyCodeOptions {
  is_uni_modules: boolean
  name: string
  namespace: string
}

export async function genProxyCode(
  module: string,
  options: GenProxyCodeOptions
) {
  const { name, is_uni_modules } = options
  return `
import { initUtsProxyClass, initUtsProxyFunction, initUtsPackageName, initUtsIndexClassName, initUtsClassName } from '@dcloudio/uni-app'
const name = '${name}'
const is_uni_modules = ${is_uni_modules}
const pkg = initUtsPackageName(name, is_uni_modules)
const cls = initUtsIndexClassName(name, is_uni_modules)
${genModuleCode(await parseModuleDecls(module, options))}
`
}

export function resolveRootIndex(module: string, options: GenProxyCodeOptions) {
  const filename = path.resolve(
    module,
    options.is_uni_modules ? 'utssdk' : '',
    'index.uts'
  )
  return fs.existsSync(filename) && filename
}

export function resolvePlatformIndex(
  platform: 'app-android' | 'app-ios',
  module: string,
  options: GenProxyCodeOptions
) {
  const filename = path.resolve(
    module,
    options.is_uni_modules ? 'utssdk' : '',
    platform,
    'index.uts'
  )
  return fs.existsSync(filename) && filename
}

function genModuleCode(decls: ProxyDecl[]) {
  const codes: string[] = []
  decls.forEach((decl) => {
    if (decl.type === 'Class') {
      if (decl.isDefault) {
        codes.push(
          `export default initUtsProxyClass(Object.assign({ package: pkg, class: initUtsClassName(name, '${
            decl.cls
          }', is_uni_modules) }, ${JSON.stringify(decl.options)} ))`
        )
      } else {
        codes.push(
          `export const ${
            decl.cls
          } = initUtsProxyClass(Object.assign({ package: pkg, class: initUtsClassName(name, '${
            decl.cls
          }', is_uni_modules) }, ${JSON.stringify(decl.options)} ))`
        )
      }
    } else if (decl.type === 'FunctionDeclaration') {
      if (decl.isDefault) {
        codes.push(
          `export default initUtsProxyFunction(${
            decl.async
          }, { main: true, package: pkg, class: cls, name: '${
            decl.method
          }', params: ${JSON.stringify(decl.params)}})`
        )
      } else {
        codes.push(
          `export const ${decl.method} = initUtsProxyFunction(${
            decl.async
          }, { main: true, package: pkg, class: cls, name: '${
            decl.method
          }', params: ${JSON.stringify(decl.params)}})`
        )
      }
    } else if (decl.type === 'VariableDeclaration') {
      codes.push(
        `export ${decl.kind} ${decl.declarations
          .map((d) => `${(d.id as Identifier).value} = ${genInitCode(d.init!)}`)
          .join(', ')}`
      )
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
}

type ResolveTypeReferenceName = (name: string) => string

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
