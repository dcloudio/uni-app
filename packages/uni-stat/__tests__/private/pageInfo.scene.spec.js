/**
 * 私有版 scene 回归：小程序场景值不应只支持微信。
 */

jest.mock(
  'uni-pages?{"type":"style"}',
  () => ({
    default: { pages: {} },
  }),
  { virtual: true }
)

jest.mock('../../src/utils/util.js', () => ({
  sys: {},
}))

const originalPlatform = process.env.VUE_APP_PLATFORM

function loadGetScene(platform, launchOptions) {
  jest.resetModules()
  process.env.VUE_APP_PLATFORM = platform
  delete global.my
  global.uni = {
    getLaunchOptionsSync:
      typeof launchOptions === 'function'
        ? launchOptions
        : jest.fn(() => launchOptions),
  }
  return require('../../src/utils/pageInfo.js').get_scene
}

describe('private pageInfo.get_scene', () => {
  afterEach(() => {
    if (originalPlatform === undefined) {
      delete process.env.VUE_APP_PLATFORM
    } else {
      process.env.VUE_APP_PLATFORM = originalPlatform
    }
    delete global.uni
    delete global.my
    jest.resetModules()
  })

  test('显式 scene 优先，并统一转为字符串', () => {
    const get_scene = loadGetScene('mp-weixin', { scene: 1001 })
    expect(get_scene(2002)).toBe('2002')
    expect(get_scene('3003')).toBe('3003')
    expect(get_scene(0)).toBe('0')
  })

  test.each([
    'mp-weixin',
    'mp-qq',
    'mp-toutiao',
    'mp-baidu',
    'mp-alipay',
    'mp-kuaishou',
    'mp-lark',
    'mp-xhs',
    'mp-jd',
    'mp-harmony',
  ])('%s 通过 getLaunchOptionsSync 读取 scene', (platform) => {
    const get_scene = loadGetScene(platform, { scene: 9999 })
    expect(get_scene()).toBe('9999')
  })

  test('非小程序端返回空字符串', () => {
    expect(loadGetScene('h5', { scene: 1001 })()).toBe('')
    expect(loadGetScene('app-plus', { scene: 1001 })()).toBe('')
  })

  test('getLaunchOptionsSync 缺失或抛错时返回空字符串', () => {
    let get_scene = loadGetScene('mp-weixin', {})
    delete global.uni.getLaunchOptionsSync
    expect(get_scene()).toBe('')

    get_scene = loadGetScene('mp-weixin', () => {
      throw new Error('boom')
    })
    expect(get_scene()).toBe('')
  })
})
