import fs from 'fs'
import path from 'path'
import {
  isCallExpression,
  isIdentifier,
  isMemberExpression,
  normalizePath,
  resolveMainUtsName,
} from '@dcloudio/uni-cli-shared'
import { walk } from 'estree-walker'

export function resolveIndependentMainPath(
  inputDir: string | undefined,
  root: string
) {
  if (!inputDir) {
    return
  }
  return resolveIndependentMainCandidates(inputDir, root).find((filename) =>
    fs.existsSync(filename)
  )
}

function resolveIndependentMainCandidates(inputDir: string, root: string) {
  const rootDir = path.resolve(inputDir, root)
  const filenames = ['main.ts', 'main.js']
  if (process.env.UNI_APP_X === 'true') {
    filenames.unshift(resolveMainUtsName())
  }
  return filenames.map((filename) =>
    normalizePath(path.resolve(rootDir, filename))
  )
}

export function isIndependentMainJs(
  filename: string,
  root: string | undefined
) {
  if (!root || !process.env.UNI_INPUT_DIR) {
    return false
  }
  const normalizedFilename = normalizePath(filename)
  const mainPath = normalizePath(
    path.resolve(process.env.UNI_INPUT_DIR, root, 'main')
  )
  return (
    normalizedFilename === mainPath + '.js' ||
    normalizedFilename === mainPath + '.ts' ||
    normalizedFilename === mainPath + '.uts'
  )
}

export function validateIndependentMainJs(ast: any, filename: string) {
  const appNames = findCreateAppParamNames(ast)
  if (!appNames.size) {
    return
  }
  ;(walk as any)(ast, {
    enter(node: any) {
      if (!isCallExpression(node)) {
        return
      }
      const { callee } = node
      if (
        isMemberExpression(callee) &&
        callee.object &&
        isIdentifier(callee.object) &&
        callee.property &&
        isIdentifier(callee.property) &&
        appNames.has(callee.object.name) &&
        callee.property.name === 'component'
      ) {
        throw new Error(
          `独立分包 main 暂不支持 app.component 注册全局组件：${filename}。请在独立分包页面或组件内局部引用组件。`
        )
      }
    },
  })
}

function findCreateAppParamNames(ast: any) {
  const appNames = new Set<string>()
  ;(walk as any)(ast, {
    enter(node: any) {
      if (
        node.type === 'FunctionDeclaration' &&
        node.id &&
        isIdentifier(node.id) &&
        node.id.name === 'createApp'
      ) {
        addFirstParamName(appNames, node)
        return
      }
      if (
        node.type === 'VariableDeclarator' &&
        node.id &&
        isIdentifier(node.id) &&
        node.id.name === 'createApp' &&
        isFunctionNode(node.init)
      ) {
        addFirstParamName(appNames, node.init)
      }
    },
  })
  return appNames
}

function addFirstParamName(appNames: Set<string>, node: any) {
  const [appParam] = node.params || []
  if (appParam && isIdentifier(appParam)) {
    appNames.add(appParam.name)
  }
}

function isFunctionNode(node: any) {
  return (
    node &&
    (node.type === 'FunctionExpression' ||
      node.type === 'ArrowFunctionExpression')
  )
}
