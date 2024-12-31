import path from 'path'
import { normalizePath } from '../utils'
import { uniConsolePlugin } from '../vite/plugins/console'

export { formatAtFilename } from './log'

export * from './env'
export {
  initModuleAlias,
  installHBuilderXPlugin,
  formatInstallHBuilderXPluginTips,
} from './alias'

export function uniHBuilderXConsolePlugin(method: string = '__f__') {
  return uniConsolePlugin({
    method,
    filename(filename) {
      filename = path.relative(process.env.UNI_INPUT_DIR, filename)
      if (filename.startsWith('.') || path.isAbsolute(filename)) {
        return ''
      }
      return normalizePath(filename)
    },
  })
}

export function isEnableConsole() {
  return !!(
    process.env.NODE_ENV === 'development' &&
    process.env.UNI_SOCKET_HOSTS &&
    process.env.UNI_SOCKET_PORT &&
    process.env.UNI_SOCKET_ID
  )
}
