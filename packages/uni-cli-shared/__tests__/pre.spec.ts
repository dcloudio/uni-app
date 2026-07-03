import fs from 'fs'
import os from 'os'
import path from 'path'
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
