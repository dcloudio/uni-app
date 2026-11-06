import fs from 'fs'
import os from 'os'
import path from 'path'
import { execFileSync } from 'child_process'
import {
  initVueTemplateCompilerExtraOptions,
  parseUniXPageOptions,
} from '../src'

test('DOM2 发布目录可加载生产依赖中的媒体查询 tokenizer', () => {
  execFileSync(
    process.execPath,
    [
      '--eval',
      `
    const assert = require('node:assert/strict')
    const path = require('node:path')
    const { createRequire } = require('node:module')
    assert.ok(require('./package.json').dependencies['@csstools/css-tokenizer'])
    const load = createRequire(path.resolve('lib/dom2/app/@vue/compiler-vapor-dom2/dist/compiler-vapor-dom2.cjs.js'))
    const { tokenize, TokenType } = load('@csstools/css-tokenizer')
    const dimension = tokenize({ css: '(min-width: 600px)' }).find(token => token[0] === TokenType.Dimension)
    assert.equal(dimension[4].value, 600)
    assert.equal(dimension[4].unit, 'px')
  `,
    ],
    { cwd: path.resolve(__dirname, '..'), stdio: 'pipe' }
  )
})

describe('dom2 vue compiler extra options', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_HELPERS_DIR: process.env.UNI_HELPERS_DIR,
    UNI_HBUILDERX_PLUGINS: process.env.UNI_HBUILDERX_PLUGINS,
    UNI_HX_VERSION_DEV: process.env.UNI_HX_VERSION_DEV,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
    NODE_ENV: process.env.NODE_ENV,
  }

  const tempDirs: string[] = []
  let inputDir: string
  let helpersDir: string

  function createTempDir(prefix: string) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix))
    tempDirs.push(dir)
    return dir
  }

  beforeEach(() => {
    tempDirs.length = 0
    inputDir = createTempDir('uni-dom2-pages-')
    helpersDir = createTempDir('uni-dom2-helpers-')

    fs.mkdirSync(path.join(inputDir, 'pages', 'index'), { recursive: true })
    fs.mkdirSync(path.join(inputDir, 'components'), { recursive: true })
    fs.writeFileSync(path.join(inputDir, 'pages', 'index', 'index.uvue'), '')
    fs.writeFileSync(
      path.join(inputDir, 'pages.json'),
      JSON.stringify({
        pages: [
          {
            path: 'pages/index/index',
            style: {
              enablePullDownRefresh: true,
              scrollIndicator: 'none',
            },
          },
        ],
        globalStyle: {},
      })
    )
    fs.writeFileSync(
      path.join(helpersDir, 'index.js'),
      [
        'module.exports = {',
        '  K(name) { return name },',
        "  GCN() { return 'MockClassName' }",
        '}',
      ].join('\n')
    )

    process.env.UNI_APP_X = 'true'
    process.env.UNI_HELPERS_DIR = helpersDir
    Reflect.deleteProperty(process.env, 'UNI_HBUILDERX_PLUGINS')
    process.env.UNI_HX_VERSION_DEV = 'false'
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_UTS_PLATFORM = 'app-android'
    process.env.NODE_ENV = 'test'
  })

  afterEach(() => {
    tempDirs.forEach((dir) => {
      fs.rmSync(dir, { recursive: true, force: true })
    })

    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        process.env[key] = value
      }
    })
  })

  test('passes rootScrollView for page files', () => {
    const options = initVueTemplateCompilerExtraOptions({
      filename: path.join(inputDir, 'pages', 'index', 'index.uvue'),
      source: '<template><view /></template>',
    } as any)

    expect(options.componentType).toBe('page')
    expect(options.rootScrollView).toEqual({
      enablePullDownRefresh: true,
      scrollIndicator: 'none',
    })
  })

  test('does not pass rootScrollView for component files', () => {
    const options = initVueTemplateCompilerExtraOptions({
      filename: path.join(inputDir, 'components', 'Foo.uvue'),
      source: '<template><view /></template>',
    } as any)

    expect(options.componentType).toBe('component')
    expect(options.rootScrollView).toBeUndefined()
  })

  test('re-initializes page options after switching UNI_INPUT_DIR', () => {
    const otherInputDir = createTempDir('uni-dom2-pages-other-')
    fs.mkdirSync(path.join(otherInputDir, 'pages', 'index'), {
      recursive: true,
    })
    fs.writeFileSync(
      path.join(otherInputDir, 'pages', 'index', 'index.uvue'),
      ''
    )
    fs.writeFileSync(
      path.join(otherInputDir, 'pages.json'),
      JSON.stringify({
        pages: [{ path: 'pages/index/index', style: {} }],
        globalStyle: {},
      })
    )

    expect(
      parseUniXPageOptions(path.join(inputDir, 'pages', 'index', 'index.uvue'))
    ).toEqual({
      enablePullDownRefresh: true,
      scrollIndicator: 'none',
    })

    process.env.UNI_INPUT_DIR = otherInputDir

    expect(
      parseUniXPageOptions(
        path.join(otherInputDir, 'pages', 'index', 'index.uvue')
      )
    ).toEqual({})
  })
})
