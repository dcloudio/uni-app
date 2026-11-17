import fs from 'fs-extra'
import os from 'node:os'
import path from 'node:path'
import { createFilter } from '@rollup/pluginutils'
import { pathToGlob } from '@dcloudio/uni-cli-shared'
import { FileWatcher } from '../../uni-cli-shared/src/watcher'
import { uniCopyPlugin } from '../../vite-plugin-uni/src/plugins/copy'
import { createUni } from '../src/plugin/uni'

describe('Web UASM Worker 静态资源', () => {
  const originalEnv = { ...process.env }
  let tempDir: string
  let inputDir: string
  const workerDir = 'uni_modules/zstd/uasm/web/workers'
  const sourceFiles: Record<string, string | Buffer> = {
    [`${workerDir}/zstd-in-worker.js`]:
      'import createModule from "./zstd.js"; createModule();',
    [`${workerDir}/zstd.js`]:
      'export default () => fetch(new URL("./zstd.wasm", import.meta.url));',
    [`${workerDir}/zstd.wasm`]: Buffer.from([0, 97, 115, 109, 1, 0, 0, 0]),
    [`${workerDir}/helpers/字典 [1].data`]: 'dictionary',
    'uni_modules/other/uasm/web/workers/zstd.js': 'other worker',
  }
  const excludedFiles = [
    'uni_modules/zstd/uasm/web/zstd.js',
    'uni_modules/legacy/uasm/web/legacy.js',
    'uni_modules/legacy/uasm/web/legacy.wasm',
    'uni_modules/zstd/uasm/mp-alipay/workers/zstd.js',
    'uni_modules/zstd/workers/web/zstd.js',
  ]

  function copyOptions() {
    const options = createUni()!.copyOptions!
    return {
      assets: [],
      targets: [],
      ...(typeof options === 'function' ? options() : options),
    }
  }

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-web-uasm-'))
    inputDir = path.join(tempDir, '项目 [test](1)')
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_APP_X = 'true'
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_UTS_PLATFORM = 'web'
    process.env.NODE_ENV = 'production'
    delete process.env.UNI_APP_X_DOM2
    delete process.env.UNI_APP_X_DOM2_CPP_DIR
    fs.outputJsonSync(path.join(inputDir, 'pages.json'), { pages: [] })
    for (const [file, source] of Object.entries(sourceFiles)) {
      fs.outputFileSync(path.join(inputDir, file), source)
    }
    for (const file of excludedFiles) {
      fs.outputFileSync(path.join(inputDir, file), 'export default () => ({})')
    }
  })

  afterEach(() => {
    jest.restoreAllMocks()
    fs.removeSync(tempDir)
    for (const key of new Set([
      ...Object.keys(process.env),
      ...Object.keys(originalEnv),
    ])) {
      if (originalEnv[key] === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = originalEnv[key]
      }
    }
  })

  test('构建复制完整 Worker 目录，保留插件隔离及相对路径', async () => {
    const watchSpy = jest.spyOn(FileWatcher.prototype, 'watch')
    const outputDir = path.join(tempDir, 'output')
    const plugin = uniCopyPlugin({
      outputDir,
      copyOptions: copyOptions(),
    })
    try {
      ;(plugin.configResolved as Function)({ build: { ssr: false } })
      await (plugin.writeBundle as Function)()
      for (const [file, source] of Object.entries(sourceFiles)) {
        expect(fs.readFileSync(path.join(outputDir, file))).toEqual(
          Buffer.from(source)
        )
      }
      for (const file of excludedFiles) {
        expect(fs.existsSync(path.join(outputDir, file))).toBe(false)
      }
    } finally {
      await Promise.all(
        watchSpy.mock.results.map(({ value: watcher }) => watcher.close())
      )
    }
  }, 10000)

  test('仅 uni-app x 增加 Worker 资源复制', () => {
    delete process.env.UNI_APP_X
    expect(copyOptions().assets).not.toContain(
      'uni_modules/*/uasm/web/workers/**/*'
    )
  })

  test.each(['C:\\项目 [test](1)', 'D:\\projects\\插件 (test)[2]'])(
    'Windows 盘符路径的复制模式保留目录字面量：%s',
    (root) => {
      const workerPattern = copyOptions().assets.find((pattern) =>
        pattern.includes('/uasm/web/workers/')
      )!
      const pattern = pathToGlob(root, workerPattern, {
        windows: true,
      })
      const filter = createFilter(pattern, undefined, { resolve: false })
      const file = path.win32.join(root, workerDir, 'zstd.wasm')
      expect(filter(file.replace(/\\/g, '/'))).toBe(true)
      expect(filter(file.replace(/\\/g, '/').replace(/\[[^\]]+\]/g, 't'))).toBe(
        false
      )
    }
  )
})
