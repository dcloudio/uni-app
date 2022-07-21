import type { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'
import { parseJson, parseVueRequest } from '@dcloudio/uni-cli-shared'
import {
  ExportDefaultDeclaration,
  Module,
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
    resolveId(id) {
      if (!id.includes('uni_modules')) {
        return
      }
      const pkgPath = path.join(id, 'package.json')
      if (!fs.existsSync(pkgPath)) {
        return
      }
      const pkg = parseJson(fs.readFileSync(pkgPath, 'utf-8'))
      if (pkg.uni_modules?.type !== 'uts') {
        return
      }
      return (
        path.join(id, pkg.main || 'interface.uts') +
        '?module=' +
        path.basename(path.dirname(pkgPath))
      )
    },
    transform(code, id, opts) {
      if (opts && opts.ssr) {
        return
      }
      const { filename, query } = parseVueRequest(id)
      if (path.extname(filename) !== '.uts') {
        return
      }
      const moduleName = (query as any).module as string
      if (!moduleName) {
        return
      }
      // 懒加载 uts
      // eslint-disable-next-line no-restricted-globals
      const { parse } = require('@dcloudio/uts')
      const ast = parse(code)
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
    if (item.type !== 'TsMethodSignature' || item.key.type !== 'Identifier') {
      return
    }
    const methodName = item.key.value
    module[methodName] = {
      async: item.typeAnn ? isReturnPromise(item.typeAnn) : false,
    }
  })
  return module
}

function isReturnPromise({ typeAnnotation }: TsTypeAnnotation) {
  return (
    typeAnnotation.type === 'TsTypeReference' &&
    typeAnnotation.typeName.type === 'Identifier' &&
    typeAnnotation.typeName.value === 'Promise'
  )
}
