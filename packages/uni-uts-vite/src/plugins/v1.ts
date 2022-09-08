import type { Plugin } from 'vite'
import path from 'path'
import { isInHBuilderX, parseVueRequest } from '@dcloudio/uni-cli-shared'
import {
  ClassDeclaration,
  ClassExpression,
  Expression,
  FunctionDeclaration,
  FunctionExpression,
  Identifier,
  Module,
  TsFunctionType,
  TsInterfaceDeclaration,
  TsType,
  TsTypeAliasDeclaration,
  TsTypeAnnotation,
  VariableDeclaration,
} from '../../types/types'
import { getCompiler } from '../utils/compiler'

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
        process.env.UNI_UTS_PLATFORM !== 'app-android' &&
        process.env.UNI_UTS_PLATFORM !== 'app-ios'
      ) {
        return
      }
      const { filename } = parseVueRequest(id)
      if (path.extname(filename) !== '.uts') {
        return
      }
      const { compile, parsePackage } = getCompiler(
        process.env.UNI_UTS_PLATFORM === 'app-ios' ? 'swift' : 'kotlin'
      )
      const pkg = parsePackage(filename)
      if (!pkg) {
        return
      }
      // 懒加载 uts 编译器
      // eslint-disable-next-line no-restricted-globals
      const { parse } = require('@dcloudio/uts')
      const ast = await parse(code, { noColor: isInHBuilderX() })
      code = `
import { initUtsProxyClass, initUtsProxyFunction } from '@dcloudio/uni-app'
const pkg = '${pkg}'
const cls = 'IndexKt'
${genProxyCode(ast)}
`
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
  isDefault: boolean = false
) {
  if (isDefault) {
    return `export default initUtsProxyFunction(${async}, { package: pkg, class: cls, name: '${method}'})`
  }
  return `export const ${method} = initUtsProxyFunction(${async}, { package: pkg, class: cls, name: '${method}'})`
}

function genProxyClassCode(
  cls: string,
  options: {
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

function genTsTypeAliasDeclarationCode(decl: TsTypeAliasDeclaration) {
  if (isFunctionType(decl.typeAnnotation)) {
    return genProxyFunctionCode(
      decl.id.value,
      isReturnPromise(decl.typeAnnotation.typeAnnotation)
    )
  }
}
function genTsInterfaceDeclarationCode(
  decl: TsInterfaceDeclaration,
  isDefault: boolean = false
) {
  const cls = decl.id.value
  const methods: Record<string, { async?: boolean }> = {}
  decl.body.body.forEach((item) => {
    if (item.type === 'TsMethodSignature') {
      if (item.key.type === 'Identifier') {
        methods[item.key.value] = {
          async: isReturnPromise(item.typeAnn),
        }
      }
    }
  })
  return genProxyClassCode(
    cls,
    { methods, staticMethods: {}, props: [], staticProps: [] },
    isDefault
  )
}

function genFunctionDeclarationCode(
  decl: FunctionDeclaration | FunctionExpression,
  isDefault: boolean = false
) {
  return genProxyFunctionCode(
    decl.identifier!.value,
    decl.async || isReturnPromise(decl.returnType),
    isDefault
  )
}

function genClassDeclarationCode(
  decl: ClassDeclaration | ClassExpression,
  isDefault: boolean = false
) {
  const cls = decl.identifier!.value
  const methods: Record<string, { async?: boolean }> = {}
  const staticMethods: Record<string, { async?: boolean }> = {}
  const props: string[] = []
  const staticProps: string[] = []
  decl.body.forEach((item) => {
    if (item.type === 'ClassMethod') {
      if (item.key.type === 'Identifier') {
        const name = item.key.value
        const value = {
          async:
            item.function.async || isReturnPromise(item.function.returnType),
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
    { methods, staticMethods, props, staticProps },
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

function genProxyCode({ body }: Module) {
  const codes: string[] = []
  body.forEach((item) => {
    let code: string | undefined
    if (item.type === 'ExportDeclaration') {
      const decl = item.declaration
      switch (decl.type) {
        case 'FunctionDeclaration':
          code = genFunctionDeclarationCode(decl, false)
          break
        case 'ClassDeclaration':
          code = genClassDeclarationCode(decl, false)
          break
        case 'TsTypeAliasDeclaration':
          code = genTsTypeAliasDeclarationCode(decl)
          break
        case 'TsInterfaceDeclaration':
          code = genTsInterfaceDeclarationCode(decl, false)
          break
        case 'VariableDeclaration':
          code = genVariableDeclarationCode(decl)
          break
      }
    } else if (item.type === 'ExportDefaultDeclaration') {
      const decl = item.decl
      if (decl.type === 'TsInterfaceDeclaration') {
        code = genTsInterfaceDeclarationCode(decl, true)
      } else if (decl.type === 'ClassExpression') {
        if (decl.identifier) {
          // export default class test{}
          code = genClassDeclarationCode(decl, false)
        }
      } else if (decl.type === 'FunctionExpression') {
        if (decl.identifier) {
          code = genFunctionDeclarationCode(decl, true)
        }
      }
    }
    if (code) {
      codes.push(code)
    }
  })
  return codes.join(`\n`)
}

function isFunctionType(type: TsType): type is TsFunctionType {
  return type.type === 'TsFunctionType'
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
