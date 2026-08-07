import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  MP_INDEPENDENT_MAIN_PREFIX,
  formatIndependentVirtualId,
  normalizePath,
  resolveBuiltIn,
  withIndependentRoot,
} from '@dcloudio/uni-cli-shared'

const ENV_KEYS = ['UNI_INPUT_DIR', 'UNI_PLATFORM', 'NODE_ENV'] as const

const originalEnv = ENV_KEYS.reduce<Record<string, string | undefined>>(
  (env, key) => {
    env[key] = process.env[key]
    return env
  },
  {}
)

const tempDirs: string[] = []

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

function createInputDir(enablePush = true) {
  const inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-push-input-'))
  tempDirs.push(inputDir)
  fs.writeFileSync(
    path.join(inputDir, 'manifest.json'),
    JSON.stringify({
      appid: '__UNI__TEST',
      'mp-weixin': enablePush
        ? {
            unipush: {
              enable: true,
            },
          }
        : {},
    })
  )
  return inputDir
}

function setPushEnv(inputDir: string) {
  process.env.NODE_ENV = 'development'
  process.env.UNI_INPUT_DIR = inputDir
  process.env.UNI_PLATFORM = 'mp-weixin'
}

async function getPushPlugin(inputDir: string) {
  setPushEnv(inputDir)
  jest.resetModules()
  const { default: uniPushPlugin } = await import('../src/plugin')
  const plugins = uniPushPlugin() as any[]
  const plugin = plugins.find((plugin) => plugin.name === 'uni:push')
  expect(plugin).toBeTruthy()
  plugin.config?.({} as any, { command: 'build', mode: 'production' })
  plugin.configResolved?.({} as any)
  return plugin
}

function resolveMpRuntimePath() {
  return normalizePath(
    resolveBuiltIn(path.join('@dcloudio/uni-push', 'dist/uni-push.mp.es.js'))
  )
}

afterEach(() => {
  restoreEnv()
  while (tempDirs.length) {
    fs.rmSync(tempDirs.pop()!, { recursive: true, force: true })
  }
})

describe('uniPushPlugin', () => {
  test('injects runtime into app main', async () => {
    const inputDir = createInputDir()
    const plugin = await getPushPlugin(inputDir)
    const code = `console.log('app')`
    const id = normalizePath(path.join(inputDir, 'main.ts'))
    const result = plugin.transform(code, id)

    expect(result.code).toBe(`import '@dcloudio/uni-push';${code}`)
  })

  test('resolves uni-push to mp runtime on mini program platform', async () => {
    const inputDir = createInputDir()
    const plugin = await getPushPlugin(inputDir)

    expect(plugin.resolveId('@dcloudio/uni-push')).toBe(resolveMpRuntimePath())
  })

  test('injects root-scoped runtime into independent subpackage main', async () => {
    const inputDir = createInputDir()
    const plugin = await getPushPlugin(inputDir)
    const code = `console.log('independent')`
    const root = 'package-a'
    const id = formatIndependentVirtualId(MP_INDEPENDENT_MAIN_PREFIX, root)
    const result = plugin.transform(code, id)

    expect(result.code).toBe(
      `import ${JSON.stringify(
        withIndependentRoot(resolveMpRuntimePath(), root)
      )};${code}`
    )
  })

  test('skips developer independent subpackage main hook', async () => {
    const inputDir = createInputDir()
    const plugin = await getPushPlugin(inputDir)
    const id = normalizePath(path.join(inputDir, 'package-a/main.ts'))

    expect(plugin.transform('console.log(1)', id)).toBeUndefined()
  })

  test('skips injection when uni-push is disabled', async () => {
    const inputDir = createInputDir(false)
    const plugin = await getPushPlugin(inputDir)
    const id = formatIndependentVirtualId(
      MP_INDEPENDENT_MAIN_PREFIX,
      'package-a'
    )

    expect(plugin.transform('console.log(1)', id)).toBeUndefined()
  })
})
