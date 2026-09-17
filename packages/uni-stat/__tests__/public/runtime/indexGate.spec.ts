const mockInstallPublicStat = jest.fn()
const mockVaporInstall = jest.fn()

jest.mock('../../../src/public/runtime/install', () => ({
  __resetInstall: jest.fn(),
  installPublicStat: mockInstallPublicStat,
}))

jest.mock('../../../src/public/runtime/StatApp', () => ({
  __resetStatApp: jest.fn(),
  getStatApp: jest.fn(),
}))

jest.mock('../../../src/public/runtime/vapor', () => ({
  __resetVaporStat: jest.fn(),
  vaporStat: { install: mockVaporInstall },
}))

describe('public runtime entry gate', () => {
  const env = process.env as Record<string, string | undefined>
  const originalNodeEnv = process.env.NODE_ENV
  const originalDebug = process.env.UNI_STAT_DEBUG
  const originalVapor = process.env.UNI_STAT_VAPOR

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    process.env.UNI_STAT_VAPOR = 'true'
  })

  afterAll(() => {
    const restore = (key: string, value: string | undefined): void => {
      if (value === undefined) delete env[key]
      else env[key] = value
    }
    restore('NODE_ENV', originalNodeEnv)
    restore('UNI_STAT_DEBUG', originalDebug)
    restore('UNI_STAT_VAPOR', originalVapor)
  })

  test.each([
    ['development', 'false', false],
    ['development', 'true', true],
    ['production', 'false', true],
  ])('NODE_ENV=%s debug=%s 自动安装=%s', (nodeEnv, debug, expected) => {
    env.NODE_ENV = nodeEnv
    env.UNI_STAT_DEBUG = debug

    jest.isolateModules(() => {
      require('../../../src/public/index')
    })

    expect(mockInstallPublicStat).toHaveBeenCalledTimes(expected ? 1 : 0)
    expect(mockVaporInstall).toHaveBeenCalledTimes(expected ? 1 : 0)
  })
})
