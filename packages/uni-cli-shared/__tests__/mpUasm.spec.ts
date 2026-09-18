import {
  createMiniProgramUasmCopyTarget,
  transformMiniProgramUasmJs,
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

  test('does not transform a non-Emscripten UASM entry wrapper', () => {
    const target = createMiniProgramUasmCopyTarget('mp-alipay')
    const source =
      'export default function createModule() {} const url = import.meta.url'
    expect(
      target.transform!(
        Buffer.from(source),
        '/tmp/uni_modules/zstd/uasm/mp-alipay/zstd.js'
      )
    ).toBeUndefined()
  })

  test('leaves binary assets on the copy plugin byte-for-byte path', () => {
    const target = createMiniProgramUasmCopyTarget('mp-weixin')
    expect(
      target.transform!(
        Buffer.from([0, 255, 1]),
        '/tmp/uni_modules/zstd/uasm/mp-weixin/zstd.wasm'
      )
    ).toBeUndefined()
  })
})
