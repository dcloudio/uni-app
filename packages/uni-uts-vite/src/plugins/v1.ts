import type { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'
import { normalizePath, parseVueRequest } from '@dcloudio/uni-cli-shared'
import {
  ExportDefaultDeclaration,
  Module,
  TsFunctionType,
  TsType,
  TsTypeAnnotation,
} from '../../types/types'
// 需要区分 android，iOS
export function uniUtsV1Plugin(): Plugin {
  // TODO 1.0 版本，解析到 uts module 时，动态编译 uts ？
  let moduleCode: string
  return {
    name: 'uni:uts-v1',
    apply: 'build',
    enforce: 'pre',
    async transform(code, id, opts) {
      if (opts && opts.ssr) {
        return
      }
      const { filename } = parseVueRequest(id)
      if (path.extname(filename) !== '.uts') {
        return
      }
      const moduleName = parseModuleId(filename)
      if (!moduleName) {
        return
      }
      // 懒加载 uts
      // eslint-disable-next-line no-restricted-globals
      const { parse } = require('@dcloudio/uts')
      const ast = await parse(code)
      if (!moduleCode) {
        moduleCode = fs.readFileSync(
          path.resolve(__dirname, '../../lib/module.js'),
          'utf8'
        )
      }
      return moduleCode
        .replace(`__MODULE_NAME__`, moduleName)
        .replace(`'__MODULE_DEFINE__'`, JSON.stringify(parseModuleDefines(ast)))
    },
  }
}

function parseModuleId(filepath: string) {
  const parts = normalizePath(filepath).split('/')
  const index = parts.findIndex((part) => part === 'uni_modules')
  if (index > -1) {
    return parts[index + 1]
  }
  return ''
}

function parseModuleDefines(ast: Module) {
  const module: Record<string, { async: boolean }> = {}
  const defaultDecl = ast.body.find(
    (item) => item.type === 'ExportDefaultDeclaration'
  ) as ExportDefaultDeclaration
  if (!defaultDecl || defaultDecl.decl.type !== 'TsInterfaceDeclaration') {
    return 'only support `export default interface Module {}`'
  }
  const body = defaultDecl.decl.body.body
  body.forEach((item) => {
    if (item.type === 'TsPropertySignature') {
      const { key, typeAnnotation } = item
      if (key.type !== 'Identifier') {
        return
      }
      if (!typeAnnotation) {
        return
      }
      const functionType = typeAnnotation.typeAnnotation
      if (!isFunctionType(functionType)) {
        return
      }
      const methodName = key.value
      module[methodName] = {
        async: isReturnPromise(functionType.typeAnnotation),
      }
    } else if (item.type === 'TsMethodSignature') {
      if (item.key.type !== 'Identifier') {
        return
      }
      const methodName = item.key.value
      module[methodName] = {
        async: item.typeAnn ? isReturnPromise(item.typeAnn) : false,
      }
    }
  })
  return module
}

function isFunctionType(type: TsType): type is TsFunctionType {
  return type.type === 'TsFunctionType'
}

function isReturnPromise({ typeAnnotation }: TsTypeAnnotation) {
  return (
    typeAnnotation.type === 'TsTypeReference' &&
    typeAnnotation.typeName.type === 'Identifier' &&
    typeAnnotation.typeName.value === 'Promise'
  )
}
