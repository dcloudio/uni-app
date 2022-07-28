import type { Plugin } from 'vite'
import path from 'path'
import { camelize } from '@vue/shared'
import {
  normalizePath,
  parseVueRequest,
  requireResolve,
} from '@dcloudio/uni-cli-shared'
import {
  ClassDeclaration,
  FunctionDeclaration,
  Module,
  TsFunctionType,
  TsInterfaceDeclaration,
  TsType,
  TsTypeAliasDeclaration,
  TsTypeAnnotation,
} from '../../types/types'
import { compile } from '../utils/compiler'

export function uniUtsV1Plugin(): Plugin {
  // 目前仅支持 app-android
  process.env.UNI_APP_PLATFORM = 'app-android'
  return {
    name: 'uni:uts-v1',
    apply: 'build',
    enforce: 'pre',
    resolveId(id, importer) {
      if (isUtsModuleRoot(id)) {
        return requireResolve(
          id,
          (importer && path.dirname(importer)) || process.env.UNI_INPUT_DIR
        )
      }
    },
    async transform(code, id, opts) {
      if (opts && opts.ssr) {
        return
      }
      const { filename } = parseVueRequest(id)
      if (path.extname(filename) !== '.uts') {
        return
      }
      const pkg = parsePackage(filename)
      if (!pkg) {
        return
      }
      // 懒加载 uts 编译器
      // eslint-disable-next-line no-restricted-globals
      const { parse } = require('@dcloudio/uts')
      const ast = await parse(code)
      code = `
import { initUtsProxyClass, initUtsProxyFunction } from '@dcloudio/uni-app'
const pkg = '${pkg}'
${genProxyCode(ast)}
`
      await compile(id)
      return code
    },
  }
}

// 仅限 uni_modules/test-plugin 格式
function isUtsModuleRoot(id: string) {
  const parts = normalizePath(id).split('/')
  if (parts[parts.length - 2] === 'uni_modules') {
    return true
  }
  return false
}

function parsePackage(filepath: string) {
  const parts = normalizePath(filepath).split('/')
  const index = parts.findIndex((part) => part === 'uni_modules')
  if (index > -1) {
    return camelize(parts[index + 1])
  }
  return ''
}

function genProxyFunctionCode(
  method: string,
  async: boolean,
  isDefault: boolean = false
) {
  if (isDefault) {
    return `export default initUtsProxyFunction({ pkg, cls: '', method: '${method}', async: ${async} })`
  }
  return `export const ${method} = initUtsProxyFunction({ pkg, cls: '', method: '${method}', async: ${async} })`
}

function genProxyClassCode(
  cls: string,
  methods: Record<string, any>,
  isDefault: boolean = false
) {
  if (isDefault) {
    return `export default initUtsProxyClass({ pkg, cls: '${cls}', methods: ${JSON.stringify(
      methods
    )} })`
  }
  return `export const ${cls} = initUtsProxyClass({ pkg, cls: '${cls}', methods: ${JSON.stringify(
    methods
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
  return genProxyClassCode(cls, methods, isDefault)
}

function genFunctionDeclarationCode(
  decl: FunctionDeclaration,
  isDefault: boolean = false
) {
  return genProxyFunctionCode(
    decl.identifier.value,
    decl.async || isReturnPromise(decl.returnType),
    isDefault
  )
}

function genClassDeclarationCode(
  decl: ClassDeclaration,
  isDefault: boolean = false
) {
  const cls = decl.identifier.value
  const methods: Record<string, { async?: boolean }> = {}
  decl.body.forEach((item) => {
    if (item.type === 'ClassMethod') {
      if (item.key.type === 'Identifier') {
        methods[item.key.value] = {
          async:
            item.function.async || isReturnPromise(item.function.returnType),
        }
      }
    }
  })
  return genProxyClassCode(cls, methods, isDefault)
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
      }
    } else if (item.type === 'ExportDefaultDeclaration') {
      if (item.decl.type === 'TsInterfaceDeclaration') {
        code = genTsInterfaceDeclarationCode(item.decl, true)
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
