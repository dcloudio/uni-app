import path from 'path'
import {
  findCloudEncryptUniModules,
  findUploadEncryptUniModulesFiles,
  parseUniModulesWithComponents,
} from '../src/uni_modules.cloud'
import { normalizePath } from '../src/utils'
import { isNonTreeShakingPlugin } from '../src/uni_modules'

const platforms = [
  'app-android',
  'app-ios',
  'web',
  'app-harmony',
  'mp-weixin',
] as const
describe('uni_modules:uni-ext-api', () => {
  const inputDir = path.resolve(__dirname, '../../playground/uni_modules/src')

  platforms.forEach((platform) => {
    test(`findCloudEncryptUniModules(${platform})`, () => {
      expect(findCloudEncryptUniModules(platform, inputDir)).toMatchSnapshot()
    })
    test(`findUploadEncryptUniModulesFiles(${platform})`, () => {
      const modules = findUploadEncryptUniModulesFiles(
        findCloudEncryptUniModules(platform, inputDir),
        platform,
        inputDir
      )
      expect(
        Object.keys(modules).reduce((res: string[], id: string) => {
          res.push(
            ...modules[id].map((item) => normalizePath(item).split('/src/')[1])
          )
          return res
        }, [])
      ).toMatchSnapshot()
    })
  })
})
describe('uni_modules:cloud', () => {
  const inputDir = path.resolve(__dirname, 'examples/cloud')
  test('parseUniModulesWithComponents', () => {
    expect(
      parseUniModulesWithComponents(inputDir, 'app-android')
    ).toMatchSnapshot()
    expect(parseUniModulesWithComponents(inputDir, 'app-ios')).toMatchSnapshot()
    expect(parseUniModulesWithComponents(inputDir, 'web')).toMatchSnapshot()
    expect(
      parseUniModulesWithComponents(inputDir, 'mp-weixin')
    ).toMatchSnapshot()
  })
})
describe('uni_modules:nonTreeShaking', () => {
  test('should return true when treeShaking is false', () => {
    const uni_modules = {
      treeShaking: false,
    }

    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('mp-weixin', uni_modules)).toBe(true)
  })

  test('should return false when treeShaking is undefined', () => {
    const uni_modules = {}

    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('mp-weixin', uni_modules)).toBe(false)
  })

  test('should return false when treeShaking is true', () => {
    const uni_modules = {
      treeShaking: true,
    }

    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('mp-weixin', uni_modules)).toBe(false)
  })

  test('should return correct result based on platform configuration', () => {
    const uni_modules = {
      treeShaking: {
        web: false,
        'mp-weixin': false,
        'app-android': true,
        'app-ios': true,
      },
    }

    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('mp-weixin', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(false)
  })

  test('should handle nested platform configuration - base app platform is false', () => {
    const uni_modules = {
      treeShaking: {
        app: false,
        web: true,
      },
    }

    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('app-harmony', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(false)
  })

  test('should handle nested platform configuration - specific sub-platform is false', () => {
    const uni_modules = {
      treeShaking: {
        app: {
          android: false,
          ios: true,
          harmony: false,
        },
        web: true,
      },
    }

    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-harmony', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(false)
  })

  test('should handle mixed configuration - both direct platform and nested configuration', () => {
    const uni_modules = {
      treeShaking: {
        web: false,
        'mp-weixin': true,
        app: {
          android: false,
          ios: true,
        },
      },
    }

    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('mp-weixin', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(false)
  })

  test('should handle empty nested configuration', () => {
    const uni_modules = {
      treeShaking: {
        app: {},
        web: true,
      },
    }

    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(false)
  })

  test('should handle invalid platform formats', () => {
    const uni_modules = {
      treeShaking: {
        web: false,
        app: false,
      },
    }

    expect(isNonTreeShakingPlugin('invalid' as any, uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('web-unknown' as any, uni_modules)).toBe(true)
  })

  test('should handle empty objects and null values', () => {
    expect(isNonTreeShakingPlugin('web', {})).toBe(false)
    expect(isNonTreeShakingPlugin('web', { treeShaking: {} })).toBe(false)
    expect(isNonTreeShakingPlugin('web', { treeShaking: null })).toBe(false)
  })

  test('should handle complex real-world configuration scenarios', () => {
    const uni_modules1 = {
      treeShaking: {
        app: {
          android: false,
          ios: true,
          harmony: false,
        },
        web: false,
        'mp-weixin': true,
        'mp-alipay': false,
      },
    }

    // Platforms expected to disable tree shaking
    expect(isNonTreeShakingPlugin('app-android', uni_modules1)).toBe(true)
    expect(isNonTreeShakingPlugin('app-harmony', uni_modules1)).toBe(true)
    expect(isNonTreeShakingPlugin('web', uni_modules1)).toBe(true)
    expect(isNonTreeShakingPlugin('mp-alipay', uni_modules1)).toBe(true)

    // Platforms expected to enable tree shaking
    expect(isNonTreeShakingPlugin('app-ios', uni_modules1)).toBe(false)
    expect(isNonTreeShakingPlugin('mp-weixin', uni_modules1)).toBe(false)
  })
})
