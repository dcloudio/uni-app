import { createInterface } from 'readline'
import { Readable } from 'stream'

describe.each([
  ['zh_CN', 'uts插件[test]开始编译', 'uts插件[test]编译完成'],
  [
    'en',
    'UTS plugin [test] compilation started',
    'UTS plugin [test] compilation completed',
  ],
])('UTS 进度日志：%s', (lang, start, complete) => {
  const originalEnv = process.env

  afterEach(() => {
    process.env = originalEnv
    jest.restoreAllMocks()
  })

  test.each([
    [false, false],
    [false, true],
    [true, false],
    [true, true],
  ])('HBuilderX=%s，中间插入警告=%s', async (hbuilderx, warning) => {
    process.env = { ...originalEnv, UNI_HBUILDERX_LANGID: lang }
    for (const key of [
      'HX_PLUGIN_PATHS',
      'UNI_HBUILDERX_PLUGINS',
      'RUN_BY_HBUILDERX',
      'HX_Version',
    ]) {
      delete process.env[key]
    }
    if (hbuilderx) {
      process.env.HX_PLUGIN_PATHS = '{}'
      process.env.HX_Version = '5.41.2026112604-dev'
    }
    let print!: typeof import('../src/shared').logUTSPluginCompile
    jest.isolateModules(() => {
      print = require('../src/shared').logUTSPluginCompile
    })
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    print('test', 'start')
    if (warning) console.log('警告：需要自定义基座')
    print('test', 'complete')

    // HBuilderX 按行读取 stdout，直接输出回车会被移除，进度标记必须能通过这一层。
    const reader = createInterface({
      input: Readable.from(log.mock.calls.map(([line]) => `${line}\n`)),
      crlfDelay: Infinity,
    })
    const lines: string[] = []
    for await (const line of reader) lines.push(line)
    expect(lines).toEqual([
      start + (hbuilderx ? '\u200D' : ''),
      ...(warning ? ['警告：需要自定义基座'] : []),
      complete,
    ])
  })
})
