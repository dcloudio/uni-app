import path from 'path'
import slash from 'slash'

import { dynamicImportCode } from './dynamicImportUtils'

const MAIN_RE = /main.[jt]s/

export function isMainJs(path: string) {
  return MAIN_RE.test(path)
}

export function getRoot(mainJsPath: string) {
  return mainJsPath.replace(MAIN_RE, '')
}

export function wrapperMainCode(code: string, root: string) {
  return `${dynamicImportCode}
import '@dcloudio/uni-h5/dist/uni-h5.css'
import '@dcloudio/uni-components/dist/uni-components.css'
import '${slash(path.resolve(root, 'pages.json'))}'
${code}
`
}
