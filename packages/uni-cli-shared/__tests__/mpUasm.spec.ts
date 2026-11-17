import fs from 'fs-extra'
import os from 'node:os'
import path from 'node:path'
import { createFilter } from '@rollup/pluginutils'
import { type RollupWatcherEvent, rollup, watch } from 'rollup'

import {
  createMiniProgramUasmCopyTarget,
  resolveMiniProgramUasmWorkerPaths,
  transformMiniProgramUasmJs,
  uniMiniProgramUasmPlugin,
} from '../src/mp/uasm'
import { pathToGlob } from '../src/utils'
import { FileWatcher } from '../src/watcher'
import { uniViteCopyPlugin } from '../src/vite/plugins/copy'

describe('mini program uasm', () => {
  const options = {
    webAssemblyGlobal: 'WXWebAssembly',
    wasmFile: 'zstd.wasm',
  }

  test.each([
    'var Module = moduleArg; var url = import.meta.url;',
    'var Module=moduleArg;var url=import.meta.url;',
  ])('transforms compressed and uncompressed output', (source) => {
    const result = transformMiniProgramUasmJs(source, options)

    expect(result.code).toContain('const WebAssembly = WXWebAssembly;')
    expect(result.code).toMatch(/var\s+url\s*=\s*''/)
    expect(result.code).toContain(
      'WebAssembly.instantiate("zstd.wasm", imports)'
    )
    expect(result.map).toBeDefined()
  })

  test('can skip source map generation for copied assets', () => {
    const result = transformMiniProgramUasmJs('var Module=moduleArg;', {
      ...options,
      generateMap: false,
    })

    expect(result.map).toBeUndefined()
  })

  test('is idempotent', () => {
    const source = 'var Module=moduleArg;'
    const first = transformMiniProgramUasmJs(source, options).code
    expect(transformMiniProgramUasmJs(first, options).code).toBe(first)
  })

  test('does not duplicate an existing mini-program prelude or hooks', () => {
    const source = `const WebAssembly = WXWebAssembly;
var Module=moduleArg;
Module["locateFile"] = function(filename) { return filename; };
Module["instantiateWasm"] = function(imports, successCallback) {
  WebAssembly.instantiate("zstd.wasm", imports).then(result => successCallback(result.instance));
  return {};
};`
    const result = transformMiniProgramUasmJs(source, options).code

    expect(result.match(/const WebAssembly = WXWebAssembly;/g)).toHaveLength(1)
    expect(result.match(/Module\["locateFile"\]/g)).toHaveLength(1)
    expect(result.match(/Module\["instantiateWasm"\]/g)).toHaveLength(1)
  })

  test('keeps the global WebAssembly binding when Emscripten has a local binding', () => {
    const source = `async function createModule(moduleArg = {}) {
  var Module = moduleArg;
  const WebAssembly = WXWebAssembly;
}`
    const result = transformMiniProgramUasmJs(source, options).code

    expect(result).toContain('const WebAssembly = WXWebAssembly;')
    expect(result.match(/const WebAssembly = WXWebAssembly;/g)).toHaveLength(2)
  })

  test('does not treat Emscripten hook documentation as an existing hook', () => {
    const source = `async function createModule(moduleArg = {}) {
  var Module = moduleArg;
  // Module.instantiateWasm = function(imports, successCallback) {}
}`
    const result = transformMiniProgramUasmJs(source, options).code

    expect(result).toContain(
      'Module["instantiateWasm"] = function(imports, successCallback)'
    )
  })

  test('rejects missing or ambiguous Module initialization', () => {
    expect(() => transformMiniProgramUasmJs('', options)).toThrow(
      '实际找到 0 处'
    )
    expect(() =>
      transformMiniProgramUasmJs(
        'var Module=moduleArg;var Module = moduleArg;',
        options
      )
    ).toThrow('实际找到 2 处')
  })

  test('copies only mini program WASM assets', () => {
    const target = createMiniProgramUasmCopyTarget('mp-weixin')
    expect(target.src).toEqual([
      'uni_modules/*/uasm/mp-weixin/**/*.wasm',
      'uni_modules/*/uasm/mp-weixin/**/*.wasm.br',
    ])
    expect(target.transform).toBeUndefined()
  })

  test('transforms a statically imported mini program entry', () => {
    const inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-uasm-mp-'))
    const entry = path.join(inputDir, 'uni_modules/zstd/uasm/mp-weixin/zstd.js')
    fs.outputFileSync(path.join(path.dirname(entry), 'zstd.wasm'), '')
    const plugin = uniMiniProgramUasmPlugin('mp-weixin')
    const transform = plugin.transform as (
      source: string,
      id: string
    ) => { code: string }

    const result = transform('var Module=moduleArg;', entry)

    expect(result.code).toContain('const WebAssembly = WXWebAssembly;')
    expect(result.code).toContain(
      'WebAssembly.instantiate("uni_modules/zstd/uasm/mp-weixin/zstd.wasm", imports)'
    )
    fs.removeSync(inputDir)
  })

  test('uses the Alipay WebAssembly implementation', () => {
    const inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-uasm-mp-'))
    const entry = path.join(
      inputDir,
      'uni_modules/zstd/workers/mp-alipay/zstd.js'
    )
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/zstd/uasm/mp-alipay/zstd.wasm'),
      ''
    )
    const transform = uniMiniProgramUasmPlugin('mp-alipay').transform as (
      source: string,
      id: string
    ) => { code: string }

    const result = transform('var Module=moduleArg;', entry)

    expect(result.code).toContain('const WebAssembly = MYWebAssembly;')
    expect(result.code).toContain(
      'WebAssembly.instantiate("uni_modules/zstd/uasm/mp-alipay/zstd.wasm", imports)'
    )
    fs.removeSync(inputDir)
  })

  test('keeps the Alipay UASM wrapper outside the WASM transform', () => {
    const plugin = uniMiniProgramUasmPlugin('mp-alipay')
    const transform = plugin.transform as (
      source: string,
      id: string
    ) => unknown

    expect(
      transform(
        'const workerUrl = "/workers/mp-alipay/zstd-in-worker.js"',
        '/tmp/uni_modules/zstd/uasm/mp-alipay/zstd.js'
      )
    ).toBeUndefined()
  })

  test('emits Alipay UASM worker assets separately from standard workers', () => {
    const inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-uasm-mp-'))
    const workerDir = path.join(inputDir, 'uni_modules/zstd/workers/mp-alipay')
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/zstd/uasm/mp-alipay/zstd.js'),
      'export default function createModule() {}'
    )
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/zstd/uasm/mp-alipay/zstd.wasm'),
      ''
    )
    fs.outputFileSync(path.join(workerDir, 'zstd.js'), 'var Module=moduleArg;')
    fs.outputFileSync(
      path.join(workerDir, 'zstd-in-worker.js'),
      'import { createZstdModule } from "./zstd.js"'
    )

    const plugin = uniMiniProgramUasmPlugin('mp-alipay', inputDir)
    const emitted: Array<{ fileName: string; source: string }> = []
    ;(plugin.buildStart as Function).call({ addWatchFile: jest.fn() })
    const generateBundle = plugin.generateBundle as Function
    generateBundle.call(
      {
        emitFile(asset: { fileName: string; source: string }) {
          emitted.push(asset)
        },
      },
      {},
      {}
    )

    expect(emitted).toHaveLength(2)
    expect(emitted).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fileName: 'workers/mp-alipay/zstd-in-worker.js',
          source: 'import { createZstdModule } from "./zstd.js"',
        }),
        expect.objectContaining({
          fileName: 'workers/mp-alipay/zstd.js',
          source: expect.stringContaining('const WebAssembly = MYWebAssembly;'),
        }),
      ])
    )
    fs.removeSync(inputDir)
  })

  test('preserves nested Alipay UASM worker assets', () => {
    const inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-uasm-mp-'))
    const workerDir = path.join(
      inputDir,
      'uni_modules/zstd/workers/mp-alipay/helpers'
    )
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/zstd/uasm/mp-alipay/zstd.wasm'),
      ''
    )
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/zstd/uasm/mp-alipay/zstd.js'),
      'export default function createModule() {}'
    )
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/zstd/workers/mp-alipay/zstd.js'),
      'var Module=moduleArg;'
    )
    fs.outputFileSync(
      path.join(workerDir, 'codec.js'),
      'export const codec = 1'
    )

    const plugin = uniMiniProgramUasmPlugin('mp-alipay', inputDir)
    const emitted: Array<{ fileName: string; source: string }> = []
    ;(plugin.buildStart as Function).call({ addWatchFile: jest.fn() })
    const generateBundle = plugin.generateBundle as Function
    generateBundle.call(
      {
        emitFile(asset: { fileName: string; source: string }) {
          emitted.push(asset)
        },
      },
      {},
      {}
    )

    expect(emitted).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fileName: 'workers/mp-alipay/helpers/codec.js',
          source: 'export const codec = 1',
        }),
      ])
    )
    fs.removeSync(inputDir)
  })

  test('fails on an existing Alipay UASM worker asset', () => {
    const inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-uasm-mp-'))
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/zstd/uasm/mp-alipay/zstd.js'),
      'export default function createModule() {}'
    )
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/zstd/uasm/mp-alipay/zstd.wasm'),
      ''
    )
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/zstd/workers/mp-alipay/zstd.js'),
      'var Module=moduleArg;'
    )

    const plugin = uniMiniProgramUasmPlugin('mp-alipay', inputDir)
    ;(plugin.buildStart as Function).call({ addWatchFile: jest.fn() })
    const generateBundle = plugin.generateBundle as Function

    expect(() =>
      generateBundle.call(
        {
          emitFile() {},
        },
        {},
        {
          'workers/mp-alipay/zstd.js': {
            type: 'asset',
            fileName: 'workers/mp-alipay/zstd.js',
            source: 'existing',
          },
        }
      )
    ).toThrow('UASM 小程序 Worker 产物冲突：workers/mp-alipay/zstd.js')
    fs.removeSync(inputDir)
  })
})

describe('支付宝 UASM 新 Worker 目录', () => {
  let inputDir: string
  const originalInputDir = process.env.UNI_INPUT_DIR
  const originalOutputDir = process.env.UNI_OUTPUT_DIR
  const originalNodeEnv = process.env.NODE_ENV
  const moduleDir = 'uni_modules/zstd'
  const workerDir = `${moduleDir}/uasm/mp-alipay/workers`

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-uasm-项目 [1]-'))
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_OUTPUT_DIR = path.join(inputDir, 'output')
    process.env.NODE_ENV = 'production'
    fs.outputFileSync(path.join(inputDir, 'entry.js'), 'export default 1')
    fs.outputFileSync(
      path.join(inputDir, moduleDir, 'uasm/mp-alipay/zstd.js'),
      'export default function createModule() {}'
    )
    fs.outputFileSync(
      path.join(inputDir, moduleDir, 'workers/mp-alipay/zstd.js'),
      'var Module=moduleArg;'
    )
    fs.ensureDirSync(path.join(inputDir, workerDir))
  })

  afterEach(() => {
    jest.restoreAllMocks()
    fs.removeSync(inputDir)
    for (const [key, value] of Object.entries({
      UNI_INPUT_DIR: originalInputDir,
      UNI_OUTPUT_DIR: originalOutputDir,
      NODE_ENV: originalNodeEnv,
    })) {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    }
  })

  test.each(['development', 'production'] as const)(
    '适配新目录并复制完整依赖（%s）',
    async (mode) => {
      process.env.NODE_ENV = mode
      const files: Record<string, string | Buffer> = {
        'zstd.js': 'var Module=moduleArg;var url=import.meta.url;',
        'zstd-in-worker.js': 'import createModule from "./zstd.js";',
        'zstd.wasm.br': Buffer.from([0, 255, 128, 1]),
        'helpers/字典 [1].data': Buffer.from([255, 0, 128]),
        'helpers/codec.js': 'export const codec = 1',
        LICENSE: 'license',
        'helpers/config.json': '{"dictionary":"字典 [1].data"}',
      }
      for (const [file, source] of Object.entries(files)) {
        fs.outputFileSync(path.join(inputDir, workerDir, file), source)
      }
      expect(
        resolveMiniProgramUasmWorkerPaths('mp-alipay', inputDir).sort()
      ).toEqual(
        [
          `${workerDir}/helpers/codec.js`,
          `${workerDir}/zstd-in-worker.js`,
          `${workerDir}/zstd.js`,
        ].sort()
      )

      const uasmPlugin = uniMiniProgramUasmPlugin('mp-alipay', inputDir)
      const transform = uasmPlugin.transform as Function
      const transformed = transform(
        files['zstd.js'],
        path.join(inputDir, workerDir, 'zstd.js')
      ).code
      expect(transformed).toContain('const WebAssembly = MYWebAssembly;')
      expect(transformed).toContain(
        `WebAssembly.instantiate("${workerDir}/zstd.wasm.br", imports)`
      )
      expect(transformed).not.toContain('import.meta.url')
      expect(
        transform(
          'var Module=moduleArg;',
          path.join(inputDir, moduleDir, 'workers/mp-alipay/zstd.js')
        )
      ).toBeUndefined()

      const watchSpy = jest.spyOn(FileWatcher.prototype, 'watch')
      const assetTarget = createMiniProgramUasmCopyTarget('mp-alipay')
      expect(assetTarget.transform).toBeUndefined()
      const copyPlugin = uniViteCopyPlugin({
        targets: [assetTarget],
      })
      const bundle = await rollup({
        input: path.join(inputDir, 'entry.js'),
        plugins: [uasmPlugin],
      })
      try {
        await bundle.write({ dir: process.env.UNI_OUTPUT_DIR, format: 'es' })
        ;(copyPlugin.configResolved as Function)({ build: { ssr: false } })
        await (copyPlugin.writeBundle as Function)()
        for (const [file, source] of Object.entries(files)) {
          expect(
            fs.readFileSync(
              path.join(process.env.UNI_OUTPUT_DIR!, workerDir, file)
            )
          ).toEqual(Buffer.from(file === 'zstd.js' ? transformed : source))
        }
        expect(
          fs.existsSync(path.join(process.env.UNI_OUTPUT_DIR!, 'workers'))
        ).toBe(false)
      } finally {
        await bundle.close()
        await Promise.all(
          watchSpy.mock.results.map(({ value: watcher }) => watcher.close())
        )
      }
    }
  )

  test('新入口缺少同目录 WASM 时构建失败，不回退或复制未转换源码', async () => {
    fs.outputFileSync(
      path.join(inputDir, moduleDir, 'uasm/mp-alipay/zstd.wasm'),
      ''
    )
    fs.outputFileSync(
      path.join(inputDir, workerDir, 'zstd.js'),
      'var Module=moduleArg;'
    )
    const bundle = await rollup({
      input: path.join(inputDir, 'entry.js'),
      plugins: [uniMiniProgramUasmPlugin('mp-alipay', inputDir)],
    })
    try {
      await expect(
        bundle.write({ dir: process.env.UNI_OUTPUT_DIR, format: 'es' })
      ).rejects.toThrow('未找到对应的 WASM 文件')
      expect(
        fs.existsSync(
          path.join(process.env.UNI_OUTPUT_DIR!, workerDir, 'zstd.js')
        )
      ).toBe(false)
    } finally {
      await bundle.close()
    }
  })

  test.each(['.wasm', '.wasm.br'])(
    '开发转换失败后保持监听，恢复 %s 或修正 JS 后重新输出',
    async (suffix) => {
      const entry = path.join(inputDir, workerDir, 'zstd.js')
      const wasm = path.join(inputDir, workerDir, `zstd${suffix}`)
      const backup = path.join(inputDir, 'wasm-backup')
      fs.outputFileSync(backup, '')
      const output = path.join(
        process.env.UNI_OUTPUT_DIR!,
        workerDir,
        'zstd.js'
      )
      fs.outputFileSync(entry, 'var Module=moduleArg;')
      const watcher = watch({
        input: path.join(inputDir, 'entry.js'),
        output: { dir: process.env.UNI_OUTPUT_DIR, format: 'es' },
        plugins: [uniMiniProgramUasmPlugin('mp-alipay', inputDir)],
      })
      function nextBuild(stage: string) {
        return new Promise<RollupWatcherEvent>((resolve, reject) => {
          const timeout = setTimeout(() => {
            watcher.off('event', onEvent)
            reject(new Error(`等待 Worker 重建超时：${stage}`))
          }, 5000)
          async function onEvent(event: RollupWatcherEvent) {
            if (event.code !== 'ERROR' && event.code !== 'BUNDLE_END') {
              return
            }
            watcher.off('event', onEvent)
            clearTimeout(timeout)
            if (event.result) {
              await event.result.close()
            }
            resolve(event)
          }
          watcher.on('event', onEvent)
        })
      }
      try {
        // 首次构建缺失 WASM，恢复依赖文件即可重试，无须重启。
        expect((await nextBuild('首次缺失 WASM')).code).toBe('ERROR')
        // 等待底层监听初始化完成，模拟用户看到报错后修复文件。
        await new Promise((resolve) => setTimeout(resolve, 200))
        let rebuilt = nextBuild('恢复 WASM')
        if (suffix === '.wasm.br') {
          fs.renameSync(backup, wasm)
        } else {
          fs.outputFileSync(wasm, '')
        }
        expect((await rebuilt).code).toBe('BUNDLE_END')
        expect(fs.readFileSync(output, 'utf8')).toContain('MYWebAssembly')

        rebuilt = nextBuild('JS 转换失败')
        fs.writeFileSync(entry, 'var Module=moduleArg;var Module=moduleArg;')
        expect((await rebuilt).code).toBe('ERROR')
        expect(fs.readFileSync(output, 'utf8')).not.toContain(
          'var Module=moduleArg;var Module=moduleArg;'
        )

        rebuilt = nextBuild('修正 JS')
        fs.writeFileSync(entry, 'var Module=moduleArg; // 已修复')
        expect((await rebuilt).code).toBe('BUNDLE_END')
        expect(fs.readFileSync(output, 'utf8')).toContain('已修复')
      } finally {
        await watcher.close()
      }
    },
    20000
  )

  test('空的新目录不回退旧方案，其他插件仍使用旧方案', () => {
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/legacy/uasm/mp-alipay/legacy.js'),
      'export default function createModule() {}'
    )
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/legacy/workers/mp-alipay/legacy.js'),
      'var Module=moduleArg;'
    )
    expect(resolveMiniProgramUasmWorkerPaths('mp-alipay', inputDir)).toEqual([
      'workers/mp-alipay/legacy.js',
    ])
    fs.removeSync(path.join(inputDir, workerDir))
    expect(
      resolveMiniProgramUasmWorkerPaths('mp-alipay', inputDir).sort()
    ).toEqual(['workers/mp-alipay/legacy.js', 'workers/mp-alipay/zstd.js'])
  })

  test('新目录按插件隔离同名 Worker', () => {
    fs.outputFileSync(path.join(inputDir, workerDir, 'worker.js'), '')
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/other/uasm/mp-alipay/other.js'),
      'export default function createModule() {}'
    )
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/other/uasm/mp-alipay/workers/worker.js'),
      ''
    )
    expect(
      resolveMiniProgramUasmWorkerPaths('mp-alipay', inputDir).sort()
    ).toEqual([
      'uni_modules/other/uasm/mp-alipay/workers/worker.js',
      `${workerDir}/worker.js`,
    ])
    expect(resolveMiniProgramUasmWorkerPaths('mp-weixin', inputDir)).toEqual([])
  })

  test('Windows 特殊目录名下新资源复制模式保留路径字面量', () => {
    const root = 'C:\\项目 [test](1)'
    const target = createMiniProgramUasmCopyTarget('mp-alipay')
    const patterns = (target.src as string[]).map((pattern) =>
      pathToGlob(root, pattern, { windows: true })
    )
    const filter = createFilter(patterns, undefined, { resolve: false })
    const file = path.win32.join(root, workerDir, 'helpers', '字典 [1].data')
    expect(filter(file.replace(/\\/g, '/'))).toBe(true)
    expect(filter(file.replace(/\\/g, '/').replace('[test]', 't'))).toBe(false)
  })
})
