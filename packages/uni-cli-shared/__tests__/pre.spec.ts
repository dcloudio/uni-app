import fs from 'fs'
import os from 'os'
import path from 'path'
import { PREPROCESS_EXCLUDE } from '../src/constants'
import { M } from '../src/messages'
import { uniPrePlugin } from '../src/vite/plugins/pre'

describe('pre plugin', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
  }

  let inputDir = ''

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-pre-plugin-'))
    fs.mkdirSync(path.join(inputDir, 'pages', 'index'), { recursive: true })
    fs.writeFileSync(path.join(inputDir, 'pages', 'index', 'index.uvue'), '')
    fs.writeFileSync(
      path.join(inputDir, 'pages.json'),
      JSON.stringify({
        pages: [{ path: 'pages/index/index', style: {} }],
        globalStyle: {},
      })
    )

    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_PLATFORM = 'app'
  })

  afterEach(() => {
    fs.rmSync(inputDir, { recursive: true, force: true })
    jest.restoreAllMocks()
    restoreEnv('UNI_APP_X', originalEnv.UNI_APP_X)
    restoreEnv('UNI_APP_X_DOM2', originalEnv.UNI_APP_X_DOM2)
    restoreEnv('UNI_INPUT_DIR', originalEnv.UNI_INPUT_DIR)
    restoreEnv('UNI_PLATFORM', originalEnv.UNI_PLATFORM)
  })

  test.each([
    '/项目 [demo](1)/node_modules/pako/lib/zlib/trees.js?v=1',
    '/project/node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/deflate.js',
    String.raw`C:\项目 [demo](1)\node_modules\pako\lib\zlib\inflate.js`,
    String.raw`\\server\share\node_modules\pako\lib\zlib\inffast.js`,
  ])('跳过 pako 源文件 %s', (id) => {
    const plugin = uniPrePlugin({ build: {} } as any, {
      exclude: PREPROCESS_EXCLUDE,
    })
    const source = '/*#ifdef NO_INIT_GLOBAL_POINTERS\ninit();\n#endif*/'
    expect((plugin.transform as any)(source, id)).toBeUndefined()
  })

  test.each([
    '/project/src/pako/lib/zlib/trees.js',
    '/project/node_modules/pako-extra/lib/zlib/trees.js',
    '/project/node_modules/@scope/pako/lib/zlib/trees.js',
  ])('继续处理其他模块的条件编译 %s', (id) => {
    const plugin = uniPrePlugin({ build: {} } as any, {
      exclude: PREPROCESS_EXCLUDE,
    })
    const source = '// #ifdef UNKNOWN\ndrop()\n// #endif\nkeep()'
    const result = (plugin.transform as any)(source, id)
    expect(result.code).toContain('keep()')
    expect(result.code).not.toContain('drop()')
  })

  test('调用方可覆盖默认排除规则', () => {
    const plugin = uniPrePlugin({ build: {} } as any, { exclude: [] })
    const source = '// #ifdef UNKNOWN\ndrop()\n// #endif\nkeep()'
    const result = (plugin.transform as any)(
      source,
      '/project/node_modules/pako/index.js'
    )
    expect(result.code).toContain('keep()')
    expect(result.code).not.toContain('drop()')
  })

  test('warns only for the expected APP root scroll-view wrapper', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    const plugin = uniPrePlugin({ build: {} } as any, {})

    ;(plugin.transform as any).call(
      {
        getCombinedSourcemap() {
          return null
        },
      },
      `<template>
<!-- #ifdef APP -->
<scroll-view style="flex:1">
<!-- #endif -->
  <view>hello</view>
<!-- #ifdef APP -->
</scroll-view>
<!-- #endif -->
</template>`,
      path.join(inputDir, 'pages', 'index', 'index.uvue')
    )

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(M['dom2.root.scroll.view'])
    )
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('at pages/index/index.uvue:3:0')
    )
    expect(logSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('<view>hello</view>')
    )
    warnSpy.mockClear()
    logSpy.mockClear()
    ;(plugin.transform as any).call(
      {
        getCombinedSourcemap() {
          return null
        },
      },
      `<template>
<!-- #ifdef APP -->
<scroll-view style="flex:1;height:100%">
  <view>hello</view>
</scroll-view>
<!-- #endif -->
</template>`,
      path.join(inputDir, 'pages', 'index', 'index.uvue')
    )

    expect(warnSpy).not.toHaveBeenCalled()
    expect(logSpy).not.toHaveBeenCalled()
  })

  test('does not warn outside app platform', () => {
    process.env.UNI_PLATFORM = 'web'
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    const plugin = uniPrePlugin({ build: {} } as any, {})

    ;(plugin.transform as any).call(
      {
        getCombinedSourcemap() {
          return null
        },
      },
      `<template>
<!-- #ifdef APP -->
<scroll-view style="flex:1">
<!-- #endif -->
  <view>hello</view>
<!-- #ifdef APP -->
</scroll-view>
<!-- #endif -->
</template>`,
      path.join(inputDir, 'pages', 'index', 'index.uvue')
    )

    expect(warnSpy).not.toHaveBeenCalled()
    expect(logSpy).not.toHaveBeenCalled()
  })
})

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) {
    Reflect.deleteProperty(process.env, name)
  } else {
    process.env[name] = value
  }
}
