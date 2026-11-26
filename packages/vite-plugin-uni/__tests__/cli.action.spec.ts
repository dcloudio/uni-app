import fs from 'fs'
import fsPromises from 'fs/promises'
import os from 'os'
import path from 'path'
import { M, output } from '@dcloudio/uni-cli-shared'
import type { RollupWatcherEvent } from 'rollup'
import { runDev } from '../src/cli/action'
import { build } from '../src/cli/build'

jest.mock('@dcloudio/uni-cli-shared', () => ({
  ...jest.requireActual('@dcloudio/uni-cli-shared'),
  isUniAppXAndroidNative: () => false,
  output: jest.fn(),
}))
jest.mock('../src/cli/build', () => ({ build: jest.fn() }))
jest.mock('../src/cli/utils', () => ({
  initEnv: jest.fn(),
  printStartupDuration: jest.fn(),
  showRunPrompt: jest.fn(),
}))
jest.mock('../src/utils/easycom', () => ({ initEasycom: jest.fn() }))

test.each([false, true])(
  '字节码模式只在首轮产物生成时补充编译提示（首轮失败=%s）',
  async (firstBuildFailed) => {
    const originalEnv = process.env
    process.env = {
      ...originalEnv,
      UNI_APP_X: 'true',
      UNI_APP_X_DOM2: 'true',
      UNI_APP_X_DOM2_DYNAMIC: 'true',
      HX_IS_CLEAN_CACHE: 'true',
    }
    delete process.env.UNI_COMPILE_TARGET
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    try {
      await runDev({ platform: 'app' })
      const [, onBuildEvent, onRenderStart] = jest.mocked(build).mock.calls[0]
      const start = {
        code: 'BUNDLE_START',
        input: 'main.js',
        output: [],
      } as const

      await onBuildEvent!(start)
      expect(process.env.HX_IS_CLEAN_CACHE).toBe('true')
      if (!firstBuildFailed) {
        onRenderStart!()
        onRenderStart!()
      }
      expect(output).not.toHaveBeenCalled()
      expect(log.mock.calls).toEqual(firstBuildFailed ? [] : [[M.compiling]])

      log.mockClear()
      await onBuildEvent!(start)
      onRenderStart!()

      expect(process.env.HX_IS_CLEAN_CACHE).toBe('false')
      expect(output).toHaveBeenCalledWith('log', M['dev.watching.start'])
      expect(log).not.toHaveBeenCalled()
    } finally {
      process.env = originalEnv
      log.mockRestore()
      jest.clearAllMocks()
    }
  }
)

describe('增量编译快照', () => {
  const originalEnv = process.env
  let root: string
  let outputDir: string
  let snapshotRoot: string
  let finishBuild: () => Promise<void>
  let failBuild: () => Promise<void>

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-快照 [测试] (App)-'))
    outputDir = path.join(root, '产物 [App]')
    snapshotRoot = path.join(root, '快照 (App)')
    process.env = {
      ...originalEnv,
      UNI_OUTPUT_DIR: outputDir,
      UNI_COMPILE_SNAPSHOT_DIR: snapshotRoot,
      UNI_APP_X: 'true',
      UNI_APP_X_DOM2: 'true',
      UNI_UTS_PLATFORM: 'app-android',
    }
  })

  async function startWatcher(platform: 'app' | 'app-harmony' = 'app') {
    await runDev({ platform })
    const [, onBuildEvent] = jest.mocked(build).mock.calls[0]
    finishBuild = async () => {
      await onBuildEvent!({
        code: 'BUNDLE_END',
        result: { close: jest.fn() },
      } as unknown as RollupWatcherEvent)
    }
    failBuild = async () => {
      await onBuildEvent!({
        code: 'ERROR',
        error: new Error('编译失败'),
        result: null,
      })
    }
    await finishBuild()
    jest.mocked(output).mockClear()
  }

  afterEach(() => {
    process.env = originalEnv
    jest.restoreAllMocks()
    jest.clearAllMocks()
    fs.rmSync(root, { recursive: true, force: true })
  })

  function writeOutput(file: string, content: string) {
    const filename = path.join(outputDir, file)
    fs.mkdirSync(path.dirname(filename), { recursive: true })
    fs.writeFileSync(filename, content)
  }

  function expectSnapshot(files: Record<string, string>) {
    const calls = jest.mocked(output).mock.calls
    expect(calls).toHaveLength(1)
    const [[type, message]] = calls
    expect(type).toBe('log')
    const match = /^DONE  Build complete\. SNAPSHOT:([^\s/\\]+)$/.exec(message)
    expect(match).not.toBeNull()
    const id = match![1]
    const snapshotDir = path.join(snapshotRoot, id)
    for (const [file, content] of Object.entries(files)) {
      expect(fs.readFileSync(path.join(snapshotDir, file), 'utf8')).toBe(
        content
      )
    }
    jest.mocked(output).mockClear()
    return id
  }

  test.each(['app-android', 'app-ios'] as const)(
    '%s 下一轮写入同名产物后，上一轮快照仍保留原内容',
    async (platform) => {
      process.env.UNI_UTS_PLATFORM = platform
      await startWatcher()
      const file = 'pages/中文 [1] (test)/index.js'
      const sibling = 'pages/中文 [1] (test)/helper.js'
      const dex = path.join('uni_modules', 'demo', 'classes.dex')
      writeOutput(file, '第一轮')
      writeOutput(sibling, '同目录文件')
      process.env.UNI_APP_CHANGED_FILES = JSON.stringify([file, sibling])
      const expectedFiles: Record<string, string> = {
        [file]: '第一轮',
        [sibling]: '同目录文件',
      }
      if (platform === 'app-android') {
        writeOutput(dex, 'UTS 产物')
        process.env.UNI_APP_UTS_CHANGED_FILES = JSON.stringify([dex])
        expectedFiles[dex] = 'UTS 产物'
      }
      await finishBuild()
      const firstId = expectSnapshot(expectedFiles)

      writeOutput(file, '第二轮')
      process.env.UNI_APP_CHANGED_FILES = JSON.stringify([file])
      await finishBuild()
      const secondId = expectSnapshot({ [file]: '第二轮' })

      expect(firstId).not.toBe(secondId)
      expect(
        fs.readFileSync(path.join(snapshotRoot, firstId, file), 'utf8')
      ).toBe('第一轮')
      expect(fs.existsSync(path.join(snapshotRoot, secondId, dex))).toBe(false)
    }
  )

  test('Android 应用配置脚本可以增量同步', async () => {
    await startWatcher()
    writeOutput('app-config-service.js', 'service 产物')
    process.env.UNI_APP_CHANGED_FILES = '["app-config-service.js"]'

    await finishBuild()

    expectSnapshot({ 'app-config-service.js': 'service 产物' })
  })

  test.each([true, false])(
    'pages.json 变更时，即使生成应用配置和 JS 产物也全量同步（快照=%s）',
    async (snapshotEnabled) => {
      if (!snapshotEnabled) delete process.env.UNI_COMPILE_SNAPSHOT_DIR
      await startWatcher()
      writeOutput('app-config.js', 'pages 配置产物')
      writeOutput('app-service.js', 'pages 服务产物')
      process.env.UNI_APP_CHANGED_FILES = JSON.stringify([
        'app-config.js',
        'app-service.js',
      ])
      process.env.UNI_APP_X_DOM2_PAGES_JSON_CHANGED = 'true'

      await finishBuild()

      expect(output).toHaveBeenCalledWith('log', M['dev.watching.end'])
      expect(fs.existsSync(snapshotRoot)).toBe(false)
    }
  )

  test.each([
    ['app-android', true, false],
    ['app-ios', true, true],
    ['app-android', false, false],
    ['app-ios', false, true],
  ] as const)(
    '%s 动态渲染 bytes 同步（快照=%s，JS 变更=%s）',
    async (platform, snapshotEnabled, hasJsChanges) => {
      process.env.UNI_UTS_PLATFORM = platform
      process.env.UNI_APP_X_DOM2_DYNAMIC = 'true'
      if (!snapshotEnabled) {
        delete process.env.UNI_COMPILE_SNAPSHOT_DIR
      }
      await startWatcher()
      const bytesFile = 'bytes/pages/index.bytes'
      writeOutput(bytesFile, 'bytes 产物')
      process.env.UNI_APP_X_DOM2_BYTES_CHANGED_FILES = JSON.stringify([
        bytesFile,
      ])
      const files: Record<string, string> = { [bytesFile]: 'bytes 产物' }
      if (hasJsChanges) {
        const file = 'app-service.js'
        writeOutput(file, 'JS 产物')
        files[file] = 'JS 产物'
        process.env.UNI_APP_CHANGED_FILES = JSON.stringify([file])
      }

      await finishBuild()

      if (snapshotEnabled) {
        expectSnapshot(files)
      } else {
        expect(output).toHaveBeenCalledWith(
          'log',
          'DONE  Build complete. FILES:' +
            JSON.stringify(
              hasJsChanges ? ['app-service.js', bytesFile] : [bytesFile]
            )
        )
        expect(fs.existsSync(snapshotRoot)).toBe(false)
      }
      expect(process.env.UNI_APP_X_DOM2_BYTES_CHANGED_FILES).toBe('')
    }
  )

  test('首轮全量同步消耗当轮的 bytes 变更', async () => {
    process.env.UNI_APP_X_DOM2_DYNAMIC = 'true'
    process.env.UNI_APP_X_DOM2_BYTES_CHANGED_FILES =
      '["bytes/pages/index.bytes"]'
    await startWatcher()
    await finishBuild()

    expect(output).toHaveBeenCalledWith('log', M['uvue.dev.watching.end.empty'])
    expect(fs.existsSync(snapshotRoot)).toBe(false)
  })

  test.each([true, false])(
    '同轮 C++ 和 JS 变更全量同步，下一轮恢复增量（快照=%s）',
    async (snapshotEnabled) => {
      if (!snapshotEnabled) delete process.env.UNI_COMPILE_SNAPSHOT_DIR
      await startWatcher()
      writeOutput('app-service.js', '第一轮 JS')
      writeOutput('libdemo.so', 'C++ 产物')
      process.env.UNI_APP_CHANGED_FILES = '["app-service.js"]'
      process.env.UNI_APP_X_DOM2_CPP_CHANGED = 'true'
      await finishBuild()

      expect(output).toHaveBeenCalledWith('log', M['dev.watching.end'])
      expect(fs.existsSync(snapshotRoot)).toBe(false)
      jest.mocked(output).mockClear()

      writeOutput('app-service.js', '第二轮 JS')
      writeOutput('index/classes.dex', '应用 DEX')
      process.env.UNI_APP_CHANGED_FILES = '["app-service.js"]'
      process.env.UNI_APP_UTS_CHANGED_FILES = '["index/classes.dex"]'
      await finishBuild()

      if (snapshotEnabled) {
        expectSnapshot({
          'app-service.js': '第二轮 JS',
          'index/classes.dex': '应用 DEX',
        })
      } else {
        expect(output).toHaveBeenCalledWith(
          'log',
          'DONE  Build complete. FILES:["app-service.js","index/classes.dex"]'
        )
      }
    }
  )

  test.each([true, false])(
    '编译失败后的首轮成功通知（快照=%s）',
    async (snapshotEnabled) => {
      if (!snapshotEnabled) {
        delete process.env.UNI_COMPILE_SNAPSHOT_DIR
      }
      await startWatcher()
      writeOutput('index/classes.dex', '失败轮次已生成的 DEX')
      await failBuild()
      await failBuild()

      // 重试时 DEX 命中缓存，编译器只报告本轮变更的 JS。
      writeOutput('pages/index.js', '重试后的 JS')
      process.env.UNI_APP_CHANGED_FILES = '["pages/index.js"]'
      await finishBuild()

      expect(jest.mocked(output).mock.calls).toEqual([
        ['log', M['dev.watching.end']],
      ])
      expect(fs.existsSync(snapshotRoot)).toBe(false)
      jest.mocked(output).mockClear()

      writeOutput('pages/index.js', '下一轮 JS')
      process.env.UNI_APP_CHANGED_FILES = '["pages/index.js"]'
      await finishBuild()

      if (snapshotEnabled) {
        expectSnapshot({ 'pages/index.js': '下一轮 JS' })
      } else {
        expect(output).toHaveBeenCalledWith(
          'log',
          'DONE  Build complete. FILES:["pages/index.js"]'
        )
      }
    }
  )

  test.each([true, false])(
    'iOS 原生渲染的应用入口变更沿用全量同步（快照=%s）',
    async (snapshotEnabled) => {
      if (!snapshotEnabled) delete process.env.UNI_COMPILE_SNAPSHOT_DIR
      process.env.UNI_UTS_PLATFORM = 'app-ios'
      await startWatcher()
      writeOutput('app-service.js', '应用入口')
      process.env.UNI_APP_CHANGED_FILES = '["app-service.js"]'
      process.env.UNI_APP_UTS_CHANGED_FILES = '[]'
      await finishBuild()

      expect(output).toHaveBeenCalledWith('log', M['dev.watching.end'])
      expect(fs.existsSync(snapshotRoot)).toBe(false)
    }
  )

  test.each([
    [true, false],
    [true, true],
    [false, true],
  ])(
    'iOS 原生 UTS 变更（快照=%s，JS 变更=%s）',
    async (snapshotEnabled, hasJsChanges) => {
      process.env.UNI_UTS_PLATFORM = 'app-ios'
      if (!snapshotEnabled) {
        delete process.env.UNI_COMPILE_SNAPSHOT_DIR
      }
      await startWatcher()
      const swift = 'uni_modules/demo/utssdk/app-ios/index.swift'
      const jsFiles = hasJsChanges ? ['pages/index.js'] : []
      writeOutput(swift, 'Swift 源码')
      jsFiles.forEach((file) => writeOutput(file, 'JS 产物'))
      process.env.UNI_APP_CHANGED_FILES = jsFiles.length
        ? JSON.stringify(jsFiles)
        : ''
      process.env.UNI_APP_UTS_CHANGED = 'true'
      await finishBuild()
      if (hasJsChanges && snapshotEnabled) {
        const id = expectSnapshot({ 'pages/index.js': 'JS 产物' })
        expect(fs.existsSync(path.join(snapshotRoot, id, swift))).toBe(false)
      } else {
        expect(jest.mocked(output).mock.calls).toEqual([
          [
            'log',
            hasJsChanges
              ? 'DONE  Build complete. FILES:["pages/index.js"]'
              : M['dev.watching.end'],
          ],
        ])
        expect(fs.existsSync(snapshotRoot)).toBe(false)
      }
    }
  )

  test('iOS 原生 UTS 编译失败时保留空 FILES 通知', async () => {
    process.env.UNI_UTS_PLATFORM = 'app-ios'
    await startWatcher()
    process.env.UNI_APP_UTS_CHANGED = 'true'
    process.env.UNI_APP_UTS_CHANGED_FILES = '[]'

    await finishBuild()

    expect(jest.mocked(output).mock.calls).toEqual([
      ['log', 'DONE  Build complete. FILES:[]'],
    ])
    expect(fs.existsSync(snapshotRoot)).toBe(false)
  })

  test('iOS UTS 失败时仍快照同轮的 JS 产物', async () => {
    process.env.UNI_UTS_PLATFORM = 'app-ios'
    await startWatcher()
    writeOutput('pages/index.js', 'JS 产物')
    process.env.UNI_APP_CHANGED_FILES = '["pages/index.js"]'
    process.env.UNI_APP_UTS_CHANGED_FILES = '[]'
    await finishBuild()

    expectSnapshot({ 'pages/index.js': 'JS 产物' })
  })

  test.each([false, true])(
    '目录外的 DEX 回退到 FILES（绝对路径=%s）',
    async (absolute) => {
      await startWatcher()
      const relativeDex = '../cache.dex'
      writeOutput(relativeDex, 'DEX 缓存')
      const dex = absolute ? path.resolve(outputDir, relativeDex) : relativeDex
      const files = JSON.stringify([dex])
      process.env.UNI_APP_UTS_CHANGED_FILES = files

      await finishBuild()

      expect(output).toHaveBeenCalledWith(
        'log',
        'DONE  Build complete. FILES:' + files
      )
      expect(fs.readdirSync(snapshotRoot)).toEqual([])
    }
  )

  test('复制失败时等所有复制结束，再清理目录并回退到 FILES', async () => {
    process.env.UNI_APP_X_DOM2_DYNAMIC = 'true'
    await startWatcher()
    const jsFiles = ['first.js', 'a.js', 'b.js', 'c.js']
    for (const file of jsFiles) {
      writeOutput(file, '第一轮')
    }
    writeOutput('price$$.bytes', '同一轮')
    let releaseCopy!: () => void
    let signalCopyStarted!: () => void
    const canCopy = new Promise<void>((resolve) => {
      releaseCopy = resolve
    })
    const copyStarted = new Promise<void>((resolve) => {
      signalCopyStarted = resolve
    })
    const copyFile = fsPromises.copyFile
    const cleanup = jest.spyOn(fsPromises, 'rm')
    jest
      .spyOn(fsPromises, 'copyFile')
      .mockRejectedValueOnce(new Error('ENOSPC'))
      .mockImplementationOnce(async (source, target) => {
        signalCopyStarted()
        await canCopy
        await copyFile(source, target)
      })
    process.env.UNI_APP_CHANGED_FILES = JSON.stringify(jsFiles)
    process.env.UNI_APP_X_DOM2_BYTES_CHANGED_FILES = '["price$$.bytes"]'
    const completed = finishBuild()
    try {
      await copyStarted
      await new Promise<void>((resolve) => setImmediate(resolve))
      expect(fsPromises.copyFile).toHaveBeenCalledTimes(jsFiles.length + 1)
      expect(cleanup).not.toHaveBeenCalled()
      expect(output).not.toHaveBeenCalled()
    } finally {
      releaseCopy()
      await completed
    }
    expect(fs.readdirSync(snapshotRoot)).toEqual([])
    expect(jest.mocked(output).mock.calls).toEqual([
      [
        'log',
        'DONE  Build complete. FILES:' +
          JSON.stringify([...jsFiles, 'price$$.bytes']),
      ],
    ])
    jest.mocked(output).mockClear()

    writeOutput('second.js', '第二轮')
    process.env.UNI_APP_CHANGED_FILES = JSON.stringify(['second.js'])
    await finishBuild()
    const id = expectSnapshot({ 'second.js': '第二轮' })
    expect(fs.readdirSync(path.join(snapshotRoot, id))).toEqual(['second.js'])
  })

  test('没有快照参数时输出原有 FILES 通知', async () => {
    delete process.env.UNI_COMPILE_SNAPSHOT_DIR
    await startWatcher()
    process.env.UNI_APP_CHANGED_FILES = '["pages/price$&.js"]'
    await finishBuild()
    expect(output).toHaveBeenCalledWith(
      'log',
      'DONE  Build complete. FILES:["pages/price$&.js"]'
    )
    expect(fs.existsSync(snapshotRoot)).toBe(false)
  })

  test.each([true, false])(
    '页面通知走 PAGES 分支（快照=%s）',
    async (snapshotEnabled) => {
      if (!snapshotEnabled) delete process.env.UNI_COMPILE_SNAPSHOT_DIR
      await startWatcher()
      process.env.UNI_APP_CHANGED_PAGES = '["pages/index.js"]'
      await finishBuild()
      expect(output).toHaveBeenCalledWith(
        'log',
        'DONE  Build complete. PAGES:["pages/index.js"]'
      )
      expect(fs.existsSync(snapshotRoot)).toBe(false)
    }
  )

  test.each([
    ['uni-app', 'app', 'app-ios', false, false],
    ['uni-app x 非蒸汽模式', 'app', 'app-ios', true, false],
    ['uni-app x 鸿蒙蒸汽模式', 'app-harmony', 'app-harmony', true, true],
  ] as const)('%s 继续使用 FILES 通知', async (_, cli, uts, appX, vapor) => {
    process.env.UNI_APP_X = appX ? 'true' : 'false'
    if (!vapor) {
      delete process.env.UNI_APP_X_DOM2
    }
    process.env.UNI_UTS_PLATFORM = uts
    await startWatcher(cli)
    process.env.UNI_APP_CHANGED_FILES = '["pages/index.js"]'
    await finishBuild()
    expect(output).toHaveBeenCalledWith(
      'log',
      'DONE  Build complete. FILES:["pages/index.js"]'
    )
    expect(fs.existsSync(snapshotRoot)).toBe(false)
  })
})
