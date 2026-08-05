/**
 * 私有版入口回归：Vue3 小程序 uni.onAppShow 的 options 需要透传到 Stat.appShow。
 */

const mockStat = {
  appHide: jest.fn(),
  appShow: jest.fn(),
  sendEvent: jest.fn(),
}

jest.mock('../../src/core/stat.js', () => ({
  __esModule: true,
  default: {
    getInstance: () => mockStat,
  },
}))

jest.mock('../../src/utils/pageInfo.js', () => ({
  get_page_vm: jest.fn(() => 'page-vm'),
  get_platform_name: jest.fn(() => 'wx'),
  is_debug: false,
}))

jest.mock('../../src/public/infra/logger.ts', () => ({
  logger: { debug: jest.fn() },
}))

jest.mock(
  'vue',
  () => ({
    default: { mixin: jest.fn() },
  }),
  { virtual: true }
)

describe('private index scene wiring', () => {
  const originalNodeEnv = process.env.NODE_ENV

  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
    process.env.NODE_ENV = 'production'
    global.__STAT_VERSION__ = '2'
  })

  afterEach(() => {
    if (originalNodeEnv === undefined) {
      delete process.env.NODE_ENV
    } else {
      process.env.NODE_ENV = originalNodeEnv
    }
    delete global.uni
    delete global.__STAT_VERSION__
    jest.resetModules()
  })

  test('uni.onAppShow options 透传给 stat.appShow', () => {
    let appShowCallback
    const app = { mixin: jest.fn() }
    global.uni = {
      onCreateVueApp: jest.fn((cb) => cb(app)),
      onAppHide: jest.fn(),
      onAppShow: jest.fn((cb) => {
        appShowCallback = cb
      }),
    }

    require('../../src/index.js')

    const options = { scene: 2002, path: 'pages/index/index' }
    appShowCallback(options)
    expect(mockStat.appShow).toHaveBeenCalledWith('page-vm', options)
  })
})
