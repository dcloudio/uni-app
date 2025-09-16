import path from 'path'
import { normalizePath, pathToGlob } from '../utils'
import { uniConsolePlugin } from '../vite/plugins/console'
import { resolveWorkersDir } from '../workers'

export { formatAtFilename, createErrorWithBlockFlag } from './log'

export * from './env'
export {
  initModuleAlias,
  installHBuilderXPlugin,
  formatInstallHBuilderXPluginTips,
} from './alias'

export function uniHBuilderXConsolePlugin(method: string = '__f__') {
  const exclude: string[] = []
  if (process.env.UNI_APP_X === 'true') {
    const workersDirs = resolveWorkersDir(process.env.UNI_INPUT_DIR)
    if (workersDirs.length) {
      // 排除workers目录
      for (const workersDir of workersDirs) {
        exclude.push(
          pathToGlob(path.join(process.env.UNI_INPUT_DIR, workersDir), '**/*')
        )
      }
    }
  }
  return uniConsolePlugin({
    method,
    exclude,
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
