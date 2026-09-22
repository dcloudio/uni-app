import fs from 'fs-extra'
import os from 'node:os'
import path from 'node:path'

import {
  createMiniProgramUasmCopyTarget,
  transformMiniProgramUasmJs,
  uniMiniProgramUasmPlugin,
} from '../src/mp/uasm'

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
