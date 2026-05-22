import { resolve } from 'path'
import { FORMATS, type GenProxyCodeOptions, genProxyCode } from '../src/code'
import { ERR_MSG_PLACEHOLDER } from '../src/utils'

const inputDir = resolve(__dirname, 'examples/uts')
const pluginDir = resolve(__dirname, 'examples/uts/utssdk/test-uts')
const uniModuleDir = resolve(__dirname, 'examples/uts/uni_modules/test-uts')
const uniModuleKeepAliveDir = resolve(
  __dirname,
  'examples/uts/uni_modules/test-keepAlive'
)
const pluginElementProxyDir = resolve(
  __dirname,
  'examples/uts/utssdk/test-element-proxy'
)

async function withUniAppXDom2<T>(
  value: 'true' | undefined,
  run: () => Promise<T>
) {
  const originalUniAppXDom2 = process.env.UNI_APP_X_DOM2
  if (value === undefined) {
    delete process.env.UNI_APP_X_DOM2
  } else {
    process.env.UNI_APP_X_DOM2 = value
  }
  try {
    return await run()
  } finally {
    if (originalUniAppXDom2 === undefined) {
      delete process.env.UNI_APP_X_DOM2
    } else {
      process.env.UNI_APP_X_DOM2 = originalUniAppXDom2
    }
  }
}

describe('code', () => {
  test('genProxyCode', async () => {
    const options: GenProxyCodeOptions = {
      moduleName: '测试',
      moduleType: 'built-in',
      id: 'test-uts',
      is_uni_modules: false,
      name: 'test-uts',
      namespace: 'uts.sdk.testUTS',
      extname: '.uts',
      androidComponents: { TestUTS: '' },
      inputDir,
      platform: 'app-android',
    }
    const res = await genProxyCode(pluginDir, options)
    expect(res.replace(ERR_MSG_PLACEHOLDER, '')).toMatchSnapshot()
    expect(options.meta).toMatchSnapshot()
    expect(options.types).toMatchSnapshot()
  })
  test('genProxyCode cjs', async () => {
    expect(
      (
        await genProxyCode(pluginDir, {
          id: 'test-uts',
          is_uni_modules: false,
          name: 'test-uts',
          namespace: 'uts.sdk.testUTS',
          extname: '.uts',
          format: FORMATS.CJS,
          pluginRelativeDir: 'utssdk/test-uts',
          androidComponents: { TestUTS: '' },
          inputDir,
          platform: 'app-android',
        })
      ).replace(ERR_MSG_PLACEHOLDER, '')
    ).toMatchSnapshot()
  })

  test('genProxyCode uni_modules', async () => {
    expect(
      (
        await genProxyCode(uniModuleDir, {
          id: 'test-uts',
          is_uni_modules: true,
          name: 'test-uts',
          namespace: 'uts.sdk.testUTS',
          extname: '.uts',
          androidComponents: {},
          inputDir,
          platform: 'app-android',
        })
      ).replace(ERR_MSG_PLACEHOLDER, '')
    ).toMatchSnapshot()
  })

  test('genProxyCode uni_modules keepAlive', async () => {
    expect(
      (
        await genProxyCode(uniModuleKeepAliveDir, {
          id: 'test-keepAlive',
          is_uni_modules: true,
          name: 'test-keepAlive',
          namespace: 'uts.sdk.testKeepAlive',
          extname: '.uts',
          androidComponents: {},
          inputDir,
          platform: 'app-android',
        })
      ).replace(ERR_MSG_PLACEHOLDER, '')
    ).toMatchSnapshot()
  })

  function genElementProxyCode() {
    return genProxyCode(pluginElementProxyDir, {
      id: 'test-element',
      is_uni_modules: false,
      name: 'test-element',
      namespace: 'uts.sdk.testElement',
      extname: '.uts',
      androidComponents: {},
      inputDir,
      platform: 'app-android',
    })
  }

  test('genProxyCode uses element proxy class for Uni*Element and Uni*ElementImpl classes in DOM2', async () => {
    const res = await withUniAppXDom2('true', genElementProxyCode)

    expect(res).toContain('initUTSElementProxyClass')
    expect(res).toContain(
      'export const UniViewElement = /*#__PURE__*/ initUTSElementProxyClass'
    )
    expect(res).toContain(
      'export const UniCanvasElementImpl = /*#__PURE__*/ initUTSElementProxyClass'
    )
    expect(res).toContain(
      'export const ViewController = /*#__PURE__*/ initUTSProxyClass'
    )
    expect(res).toContain('export default /*#__PURE__*/ initUTSProxyClass')
    expect(res).not.toContain(
      'export default /*#__PURE__*/ initUTSElementProxyClass'
    )
  })

  test('genProxyCode uses normal proxy class for Uni*Element and Uni*ElementImpl classes outside DOM2', async () => {
    const res = await withUniAppXDom2(undefined, genElementProxyCode)

    expect(res).toContain(
      'export const UniViewElement = /*#__PURE__*/ initUTSProxyClass'
    )
    expect(res).toContain(
      'export const UniCanvasElementImpl = /*#__PURE__*/ initUTSProxyClass'
    )
    expect(res).toContain(
      'export const ViewController = /*#__PURE__*/ initUTSProxyClass'
    )
    expect(res).toContain('export default /*#__PURE__*/ initUTSProxyClass')
    expect(res).not.toContain(
      'export const UniViewElement = /*#__PURE__*/ initUTSElementProxyClass'
    )
    expect(res).not.toContain(
      'export const UniCanvasElementImpl = /*#__PURE__*/ initUTSElementProxyClass'
    )
  })
})
