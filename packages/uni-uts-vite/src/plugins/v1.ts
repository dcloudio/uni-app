import type { Plugin } from 'vite'
import path from 'path'
import { isInHBuilderX, parseVueRequest } from '@dcloudio/uni-cli-shared'
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
} from '../../types/types'
import { getCompiler } from '../utils/compiler'
import {
  createResolveTypeReferenceName,
  resolvePackage,
} from '../utils/compiler/utils'

export function uniUtsV1Plugin(): Plugin {
  let isFirst = true
  return {
    name: 'uni:uts-v1',
    apply: 'build',
    enforce: 'pre',
    async transform(code, id, opts) {
      if (opts && opts.ssr) {
        return
      }
      // 目前仅支持 app-android|app-ios
      if (
        process.env.UNI_UTS_PLATFORM !== 'app' &&
        process.env.UNI_UTS_PLATFORM !== 'app-android' &&
        process.env.UNI_UTS_PLATFORM !== 'app-ios'
      ) {
        return
      }
      const { filename } = parseVueRequest(id)
      if (path.extname(filename) !== '.uts') {
        return
      }
      const { compile } = getCompiler(
        process.env.UNI_UTS_PLATFORM === 'app-ios' ? 'swift' : 'kotlin'
      )
      const pkg = resolvePackage(filename)
      if (!pkg) {
        return
      }
      // 懒加载 uts 编译器
      // eslint-disable-next-line no-restricted-globals
      const { parse } = require('@dcloudio/uts')
      const ast = await parse(code, { noColor: isInHBuilderX() })
      code = `
import { initUtsProxyClass, initUtsProxyFunction, initUtsPackageName, initUtsClassName } from '@dcloudio/uni-app'
const name = '${pkg.name}'
const is_uni_modules = ${pkg.is_uni_modules}
const pkg = initUtsPackageName(name, is_uni_modules)
const cls = initUtsClassName(name, is_uni_modules)
${genProxyCode(ast, createResolveTypeReferenceName(pkg.namespace, ast))}
`
      // 平台不匹配，不走平台代码编译，仅生成js代码
      if (
        process.env.UNI_UTS_PLATFORM === 'app' ||
        (process.env.UNI_UTS_PLATFORM === 'app-android' &&
          id.includes('app-ios')) ||
        (process.env.UNI_UTS_PLATFORM === 'app-ios' &&
          id.includes('app-android'))
      ) {
        return code
      }
      const res = await compile(id)
      if (process.env.UNI_UTS_PLATFORM === 'app-android') {
        if (!isFirst && res) {
          const files = []
          if (process.env.UNI_APP_CHANGED_DEX_FILES) {
            try {
              files.push(...JSON.parse(process.env.UNI_APP_CHANGED_DEX_FILES))
            } catch (e) {}
          }
          files.push(res)
          process.env.UNI_APP_CHANGED_DEX_FILES = JSON.stringify([
            ...new Set(files),
          ])
        }
      }
      return code
    },
    buildEnd() {
      isFirst = false
    },
  }
}

function genProxyFunctionCode(
  method: string,
  async: boolean,
  params: Parameter[],
  isDefault: boolean = false
) {
  if (isDefault) {
    return `export default initUtsProxyFunction(${async}, { package: pkg, class: cls, name: '${method}', params: ${JSON.stringify(
      params
    )}})`
  }
  return `export const ${method} = initUtsProxyFunction(${async}, { package: pkg, class: cls, name: '${method}', params: ${JSON.stringify(
    params
  )}})`
}

function genProxyClassCode(
  cls: string,
  options: {
    constructor: { params: Parameter[] }
    methods: Record<string, any>
    staticMethods: Record<string, any>
    props: string[]
    staticProps: string[]
  },
  isDefault: boolean = false
) {
  if (isDefault) {
    return `export default initUtsProxyClass({ package: pkg, class: '${cls}', ...${JSON.stringify(
      options
    )} })`
  }
  return `export const ${cls} = initUtsProxyClass({ package: pkg, class: '${cls}', ...${JSON.stringify(
    options
  )} })`
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

function genFunctionDeclarationCode(
  decl: FunctionDeclaration | FunctionExpression,
  resolveTypeReferenceName: ResolveTypeReferenceName,
  isDefault: boolean = false
) {
  return genProxyFunctionCode(
    decl.identifier!.value,
    decl.async || isReturnPromise(decl.returnType),
    resolveFunctionParams(decl.params, resolveTypeReferenceName),
    isDefault
  )
}

function genClassDeclarationCode(
  decl: ClassDeclaration | ClassExpression,
  resolveTypeReferenceName: ResolveTypeReferenceName,
  isDefault: boolean = false
) {
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
  return genProxyClassCode(
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

function genVariableDeclarationCode(decl: VariableDeclaration) {
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
    return `export ${decl.kind} ${decl.declarations
      .map((d) => `${(d.id as Identifier).value} = ${genInitCode(d.init!)}`)
      .join(', ')}`
  }
}

function genProxyCode(
  { body }: Module,
  resolveTypeReferenceName: ResolveTypeReferenceName
) {
  const codes: string[] = []

  body.forEach((item) => {
    let code: string | undefined
    if (item.type === 'ExportDeclaration') {
      const decl = item.declaration
      switch (decl.type) {
        case 'FunctionDeclaration':
          code = genFunctionDeclarationCode(
            decl,
            resolveTypeReferenceName,
            false
          )
          break
        case 'ClassDeclaration':
          code = genClassDeclarationCode(decl, resolveTypeReferenceName, false)
          break
        case 'VariableDeclaration':
          code = genVariableDeclarationCode(decl)
          break
      }
    } else if (item.type === 'ExportDefaultDeclaration') {
      const decl = item.decl
      if (decl.type === 'ClassExpression') {
        if (decl.identifier) {
          // export default class test{}
          code = genClassDeclarationCode(decl, resolveTypeReferenceName, false)
        }
      } else if (decl.type === 'FunctionExpression') {
        if (decl.identifier) {
          code = genFunctionDeclarationCode(
            decl,
            resolveTypeReferenceName,
            true
          )
        }
      }
    }
    if (code) {
      codes.push(code)
    }
  })
  return codes.join(`\n`)
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
