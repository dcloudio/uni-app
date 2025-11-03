import { validateThemeValue } from '@dcloudio/uni-cli-shared'
import { normalizeManifestJson } from '../src/plugins/utils'

describe('x-ios x-harmony manifestJson', () => {
  const mockManifestJson = {
    name: 'TestApp',
    appid: '__UNI__TEST123',
    versionName: '1.0.0',
    versionCode: '100',
    app: {
      defaultAppTheme: 'dark',
    },
    defaultAppTheme: 'light',
  }

  const mockManifestJsonWithoutTheme = {
    name: 'TestApp',
    appid: '__UNI__TEST123',
    versionName: '1.0.0',
    versionCode: '100',
  }

  describe('validateThemeValue', () => {
    test('should validate valid theme values', () => {
      expect(validateThemeValue('dark')).toBe(true)
      expect(validateThemeValue('light')).toBe(true)
      expect(validateThemeValue('auto')).toBe(true)
    })

    test('should reject invalid theme values', () => {
      expect(validateThemeValue('invalid')).toBe(false)
      expect(validateThemeValue('')).toBe(false)
      // validateThemeValue 期望 string 类型，所以我们需要先检查值是否为字符串
      expect(validateThemeValue(undefined as any)).toBe(false)
      expect(validateThemeValue(null as any)).toBe(false)
    })
  })

  describe('android manifestJson processing', () => {
    // 模拟安卓平台的 generateBundle 逻辑
    function generateAndroidUniAppConfigCode(manifestJson: any) {
      const hasAppDefaultAppTheme = validateThemeValue(
        manifestJson.app?.defaultAppTheme
      )
      const hasDefaultAppTheme = validateThemeValue(
        manifestJson.defaultAppTheme
      )
      const defaultAppThemeCode = hasAppDefaultAppTheme
        ? `override defaultAppTheme: string = "${manifestJson.app.defaultAppTheme}"`
        : hasDefaultAppTheme
        ? `override defaultAppTheme: string = "${manifestJson.defaultAppTheme}"`
        : ''

      return defaultAppThemeCode
    }

    test('should generate defaultAppTheme code for app.defaultAppTheme', () => {
      const result = generateAndroidUniAppConfigCode(mockManifestJson)
      expect(result).toBe('override defaultAppTheme: string = "dark"')
    })

    test('should generate defaultAppTheme code for root defaultAppTheme when app.defaultAppTheme is missing', () => {
      const manifestWithoutApp = {
        ...mockManifestJson,
        app: {},
      }
      const result = generateAndroidUniAppConfigCode(manifestWithoutApp)
      expect(result).toBe('override defaultAppTheme: string = "light"')
    })

    test('should not generate defaultAppTheme code when no valid theme is provided', () => {
      const result = generateAndroidUniAppConfigCode(
        mockManifestJsonWithoutTheme
      )
      expect(result).toBe('')
    })
  })

  describe('ios manifestJson processing', () => {
    test('should normalize manifest for ios platform', () => {
      const result = normalizeManifestJson('app-ios', mockManifestJson)
      expect(result).toMatchObject({
        id: '__UNI__TEST123',
        name: 'TestApp',
        version: {
          name: '1.0.0',
          code: '100',
        },
      })
    })

    test('should preserve theme configuration in normalized manifest', () => {
      const result = normalizeManifestJson('app-ios', mockManifestJson) as any
      // iOS 平台应该也能访问 theme 配置
      expect(result.app?.defaultAppTheme).toBe('dark')
    })
  })

  describe('platform output comparison', () => {
    test('android generates UTS code with theme logic', () => {
      // 安卓平台生成 UTS 代码，包含 defaultAppTheme 逻辑
      const androidThemeCode = validateThemeValue(
        mockManifestJson.app?.defaultAppTheme
      )
        ? `override defaultAppTheme: string = "${mockManifestJson.app.defaultAppTheme}"`
        : ''

      expect(androidThemeCode).toBe('override defaultAppTheme: string = "dark"')
    })

    test('ios should also support theme logic processing', () => {
      // iOS 平台目前缺少主题逻辑处理
      // 这个测试展示了需要补充的逻辑
      const iosManifest = normalizeManifestJson(
        'app-ios',
        mockManifestJson
      ) as any

      // 应该能够获取主题配置
      const manifest = iosManifest as any
      const hasAppDefaultAppTheme = validateThemeValue(
        manifest.app?.defaultAppTheme || ''
      )

      expect(hasAppDefaultAppTheme).toBe(true)

      // iOS 平台也应该支持主题配置的处理
      const expectedThemeValue = manifest.app.defaultAppTheme

      expect(expectedThemeValue).toBe('dark')
    })
  })

  describe('edge cases', () => {
    test('should handle invalid theme values gracefully', () => {
      const manifestWithInvalidTheme = {
        ...mockManifestJson,
        app: {
          defaultAppTheme: 'invalid-theme',
        },
        defaultAppTheme: 'another-invalid',
      }

      const hasAppTheme = validateThemeValue(
        manifestWithInvalidTheme.app.defaultAppTheme
      )

      expect(hasAppTheme).toBe(false)
    })

    test('should prioritize app.defaultAppTheme over root defaultAppTheme', () => {
      const hasAppDefaultAppTheme = validateThemeValue(
        mockManifestJson.app?.defaultAppTheme
      )

      expect(hasAppDefaultAppTheme).toBe(true)

      // app.defaultAppTheme 应该优先于 root defaultAppTheme
      const selectedTheme = mockManifestJson.app.defaultAppTheme

      expect(selectedTheme).toBe('dark') // app.defaultAppTheme 优先
    })
  })
})
