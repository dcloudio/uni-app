import os from 'os'
import path from 'path'
import {
  MP_INDEPENDENT_MAIN_PREFIX,
  formatIndependentVirtualId,
  normalizePath,
  resolveBuiltIn,
  withIndependentRoot,
} from '@dcloudio/uni-cli-shared'
import uniConsolePlugin from '../src/compiler'

const ENV_KEYS = [
  'NODE_ENV',
  'UNI_APP_X',
  'UNI_INPUT_DIR',
  'UNI_PLATFORM',
  'UNI_SOCKET_HOSTS',
  'UNI_SOCKET_ID',
  'UNI_SOCKET_PORT',
] as const

const originalEnv = ENV_KEYS.reduce<Record<string, string | undefined>>(
  (env, key) => {
    env[key] = process.env[key]
    return env
  },
  {}
)

function restoreEnv() {
  const env = process.env as Record<string, string | undefined>
  ENV_KEYS.forEach((key) => {
    const value = originalEnv[key]
    if (value === undefined) {
      delete env[key]
    } else {
      env[key] = value
    }
  })
}

function setConsoleEnv() {
  process.env.NODE_ENV = 'development'
  process.env.UNI_INPUT_DIR = path.join(os.tmpdir(), 'uni-console-input')
  process.env.UNI_PLATFORM = 'mp-weixin'
  process.env.UNI_SOCKET_HOSTS = '127.0.0.1'
  process.env.UNI_SOCKET_PORT = '9999'
  process.env.UNI_SOCKET_ID = 'test'
  delete (process.env as Record<string, string | undefined>).UNI_APP_X
}

function getMainJsPlugin() {
  const plugins = uniConsolePlugin() as any[]
  const plugin = plugins.find((plugin) => plugin.name === 'uni:console-main-js')
  expect(plugin).toBeTruthy()
  plugin.configResolved?.({} as any)
  return plugin
}

function resolveMpRuntimePath() {
  return normalizePath(
    resolveBuiltIn(path.join('@dcloudio/uni-console', 'dist/mp.esm.js'))
  )
}

afterEach(() => {
  restoreEnv()
})

describe('uniConsolePlugin', () => {
  test('injects runtime into app main', () => {
    setConsoleEnv()
    const plugin = getMainJsPlugin()
    const code = `console.log('app')`
    const id = normalizePath(path.join(process.env.UNI_INPUT_DIR, 'main.ts'))
    const result = plugin.transform(code, id)

    expect(result.code).toBe(`import '${resolveMpRuntimePath()}';${code}`)
  })

  test('injects root-scoped runtime into independent subpackage main', () => {
    setConsoleEnv()
    const plugin = getMainJsPlugin()
    const code = `console.log('independent')`
    const root = 'package-a'
    const id = formatIndependentVirtualId(MP_INDEPENDENT_MAIN_PREFIX, root)
    const result = plugin.transform(code, id)

    expect(result.code).toBe(
      `import '${withIndependentRoot(resolveMpRuntimePath(), root)}';${code}`
    )
  })

  test('skips injection when runtime socket is disabled', () => {
    setConsoleEnv()
    delete (process.env as Record<string, string | undefined>).UNI_SOCKET_ID
    const plugin = getMainJsPlugin()
    const id = formatIndependentVirtualId(
      MP_INDEPENDENT_MAIN_PREFIX,
      'package-a'
    )

    expect(plugin.transform('console.log(1)', id)).toBeUndefined()
  })
})
