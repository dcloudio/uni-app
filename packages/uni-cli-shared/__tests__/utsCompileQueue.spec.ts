import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import type { Plugin } from 'vite'
import { type PluginContext, type TransformPluginContext, watch } from 'rollup'
import { normalizePath } from '../src/utils'
import { resolveUTSCompiler } from '../src/uts'
import { uniUTSAppUniModulesPlugin } from '../src/vite/plugins/uts/uni_modules'

jest.mock('../src/uts', () => ({
  ...jest.requireActual('../src/uts'),
  resolveUTSCompiler: jest.fn(),
}))

function hook<T>(value: T | { handler: T }): T {
  return typeof value === 'object' && value && 'handler' in value
    ? value.handler
    : (value as T)
}

function deferred() {
  let resolve!: () => void
  const promise = new Promise<void>((done) => (resolve = done))
  return { promise, resolve }
}

describe.each(['app-android', 'app-ios', 'app-harmony'] as const)(
  '%s UTS 插件串行编译',
  (platform) => {
    const originalEnv = process.env
    const context = {
      addWatchFile: jest.fn(),
    } as unknown as TransformPluginContext
    const compile = jest.fn()
    let inputDir: string
    let plugin: Plugin

    function transform(id: string, target = plugin) {
      return hook(target.transform!).call(
        context,
        '',
        normalizePath(path.join(inputDir, 'uni_modules', id)) + '?uts-proxy'
      )
    }

    function createPlugin(id: string, dependencies: string[] = []) {
      const dir = path.join(inputDir, 'uni_modules', id)
      fs.outputJSONSync(path.join(dir, 'package.json'), {
        id,
        uni_modules: { dependencies },
      })
      fs.outputFileSync(path.join(dir, 'utssdk', 'index.uts'), '')
    }

    beforeEach(() => {
      inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uts-queue-'))
      process.env = {
        ...originalEnv,
        NODE_ENV: 'development',
        UNI_APP_X: 'true',
        UNI_APP_X_TSC: 'false',
        UNI_PLATFORM: platform === 'app-harmony' ? 'app-harmony' : 'app',
        UNI_UTS_PLATFORM: platform,
        UNI_INPUT_DIR: inputDir,
        UNI_COMPILE_TARGET: undefined,
      }
      compile.mockReset().mockImplementation(async (dir: string) => ({
        code: path.basename(dir),
        deps: [],
      }))
      jest.mocked(resolveUTSCompiler).mockReturnValue({
        compile,
        compileArkTS: compile,
      } as unknown as ReturnType<typeof resolveUTSCompiler>)
      createPlugin('first')
      createPlugin('second')
      plugin = uniUTSAppUniModulesPlugin()
    })

    afterEach(async () => {
      await hook(plugin.buildEnd!).call(context)
      await hook(plugin.closeBundle!).call(context)
      fs.removeSync(inputDir)
      process.env = originalEnv
      jest.clearAllMocks()
    })

    test('跨实例排队，编译未完成时不启动下一个插件', async () => {
      let release!: () => void
      let started!: () => void
      const pending = new Promise<void>((resolve) => (release = resolve))
      const firstStarted = new Promise<void>((resolve) => (started = resolve))
      compile.mockImplementationOnce(async () => {
        started()
        await pending
        return { code: 'first', deps: [] }
      })
      const first = transform('first')
      await firstStarted
      const second = transform('second', uniUTSAppUniModulesPlugin())
      await Promise.resolve()
      expect(compile).toHaveBeenCalledTimes(1)
      release()
      expect(await first).toMatchObject({ code: 'first' })
      expect(await second).toMatchObject({ code: 'second' })
      expect(compile).toHaveBeenCalledTimes(2)
    })

    test('共享依赖先完成且只编译一次，不阻塞依赖它的插件', async () => {
      createPlugin('parent', ['first'])
      const results = await Promise.all([
        transform('parent'),
        transform('first'),
        transform('second'),
      ])
      expect(results).toMatchObject([
        { code: 'parent' },
        { code: 'first' },
        { code: 'second' },
      ])
      const ids = compile.mock.calls.map(([dir]) => path.basename(dir))
      expect(ids.filter((id) => id === 'first')).toHaveLength(1)
      expect(ids.indexOf('first')).toBeLessThan(ids.indexOf('parent'))
      expect(compile).toHaveBeenCalledTimes(3)
    })

    test('真实 watcher 失败后先等完依赖和排队任务，再清理并立即重试', async () => {
      createPlugin('parent', ['second'])
      createPlugin('third')
      const entry = path.join(inputDir, 'main.js')
      fs.writeFileSync(
        entry,
        ['first', 'parent', 'third']
          .map(
            (id) =>
              `import ${JSON.stringify(
                normalizePath(path.join(inputDir, 'uni_modules', id)) +
                  '?uts-proxy'
              )}`
          )
          .join('\n') + '\nexport const main = 1'
      )
      const firstStarted = deferred()
      const allRequested = deferred()
      const cleanupStarted = deferred()
      const releaseDependency = deferred()
      const parentStarted = deferred()
      const releaseParent = deferred()
      const completed = deferred()
      const starts: [string, string | undefined][] = []
      const errors: string[] = []
      let requested = 0
      let failed = false
      let rounds = 0
      let closing = false
      let triggerChange: ReturnType<typeof setInterval> | undefined
      let timeout: ReturnType<typeof setTimeout> | undefined
      process.env.HX_IS_CLEAN_CACHE = 'true'
      compile.mockImplementation(async (dir: string) => {
        const id = path.basename(dir)
        starts.push([id, process.env.HX_IS_CLEAN_CACHE])
        if (id === 'first' && !failed) {
          failed = true
          firstStarted.resolve()
          await allRequested.promise
          throw new Error('first failed')
        }
        if (id === 'second') {
          await releaseDependency.promise
        }
        if (id === 'parent') {
          parentStarted.resolve()
          await releaseParent.promise
        }
        return { code: 'export const value = 1', deps: [] }
      })
      const transformHook = hook(plugin.transform!)
      plugin.transform = async function (code, id, options) {
        if (id.endsWith('?uts-proxy')) {
          if (++requested === 3) allRequested.resolve()
          if (!id.endsWith('/first?uts-proxy')) {
            await firstStarted.promise
          }
        }
        return transformHook.call(this, code, id, options)
      }
      const cleanupHook =
        platform === 'app-harmony' ? 'closeBundle' : 'buildEnd'
      const cleanup = hook(plugin[cleanupHook]!)
      plugin[cleanupHook] = async function (this: PluginContext) {
        cleanupStarted.resolve()
        await cleanup.call(this)
      }
      const watcher = watch({
        input: entry,
        plugins: [plugin],
        watch: { chokidar: { usePolling: true, interval: 10 } },
        output: {
          dir: path.join(inputDir, 'dist'),
          format: 'es',
        },
      })
      watcher.on('change', () => clearInterval(triggerChange))
      watcher.on('event', async (event) => {
        if (event.code === 'BUNDLE_START') {
          if (++rounds > 1) {
            clearInterval(triggerChange)
            process.env.HX_IS_CLEAN_CACHE = 'false'
          }
        } else if (event.code === 'ERROR') {
          errors.push(event.error.message)
          if (!closing && errors.length === 1) {
            // 文件监听异步建立，持续修改到首次 change 通知，避免遗漏过早的修改。
            triggerChange = setInterval(() => {
              fs.appendFileSync(entry, '\n// 立即触发下一轮构建')
            }, 20)
          } else {
            completed.resolve()
          }
        } else if (event.code === 'BUNDLE_END') {
          await event.result.close()
          completed.resolve()
        }
      })
      try {
        await cleanupStarted.promise
        await new Promise((resolve) => setImmediate(resolve))
        expect(errors).toEqual([])
        expect(rounds).toBe(1)
        releaseDependency.resolve()
        await parentStarted.promise
        await new Promise((resolve) => setImmediate(resolve))
        // parent 在依赖完成后才入队，收尾也必须等待它，而不是只等之前的队列尾部。
        expect(errors).toEqual([])
        expect(rounds).toBe(1)
        releaseParent.resolve()
        await Promise.race([
          completed.promise,
          new Promise((_, reject) => {
            timeout = setTimeout(
              () => reject(new Error('watcher 重试超时')),
              2000
            )
          }),
        ])
        expect(errors).toEqual(['first failed'])
        expect(rounds).toBe(2)
        for (const id of ['first', 'second', 'parent', 'third']) {
          expect(starts.filter(([pluginId]) => pluginId === id)).toEqual([
            [id, 'true'],
            [id, 'false'],
          ])
        }
      } finally {
        closing = true
        clearInterval(triggerChange)
        clearTimeout(timeout)
        releaseDependency.resolve()
        releaseParent.resolve()
        await watcher.close()
      }
    })

    test('错误仍交给调用者，后续任务和下一轮构建继续编译', async () => {
      compile.mockRejectedValueOnce(new Error('compile failed'))
      const results = await Promise.allSettled([
        transform('first'),
        transform('second'),
      ])
      expect(results[0]).toMatchObject({
        status: 'rejected',
        reason: new Error('compile failed'),
      })
      expect(results[1]).toMatchObject({
        status: 'fulfilled',
        value: { code: 'second' },
      })
      await hook(plugin.buildEnd!).call(context)
      await hook(plugin.closeBundle!).call(context)
      expect(await transform('first')).toMatchObject({ code: 'first' })
      expect(compile).toHaveBeenCalledTimes(3)
    })
  }
)
