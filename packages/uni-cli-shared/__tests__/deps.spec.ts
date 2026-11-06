import { API_DEPS_CSS, COMPONENT_DEPS_CSS } from '../src/deps'

describe('API 样式依赖', () => {
  const scrollViewCss = ['@dcloudio/uni-h5/style/vapor/scroll-view.css']
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
  }

  afterEach(() => {
    Object.entries(originalEnv).forEach(([name, value]) => {
      if (value === undefined) {
        delete process.env[name]
      } else {
        process.env[name] = value
      }
    })
  })

  test.each(['h5', 'web'] as const)(
    '%s Vapor 使用对应的 Swiper 和 Loading 样式依赖',
    (platform) => {
      process.env.UNI_APP_X = 'true'
      process.env.UNI_PLATFORM = platform
      process.env.UNI_APP_X_DOM2 = 'true'
      expect(COMPONENT_DEPS_CSS(true)).toEqual({
        'picker-view-column': scrollViewCss,
        'list-view': scrollViewCss,
        waterflow: scrollViewCss,
        picker: [
          '@dcloudio/uni-components/style-x-vapor/picker-view.css',
          '@dcloudio/uni-components/style-x-vapor/picker-view-column.css',
          ...scrollViewCss,
        ],
      })
      expect(API_DEPS_CSS(true)).toEqual({
        showModal: [
          '@dcloudio/uni-h5/style/vapor/textarea.css',
          ...scrollViewCss,
        ],
        showToast: ['@dcloudio/uni-h5/style/api/toast.css'],
        showActionSheet: [],
        chooseLocation: [
          '@dcloudio/uni-h5/style/vapor/input.css',
          '@dcloudio/uni-h5/style/map.css',
          ...scrollViewCss,
          '@dcloudio/uni-components/style-x-vapor/loading.css',
        ],
        showLoading: ['@dcloudio/uni-components/style-x-vapor/loading.css'],
        showNavigationBarLoading: [
          '@dcloudio/uni-components/style-x-vapor/loading.css',
        ],
        previewImage: [
          '@dcloudio/uni-components/style-x-vapor/swiper.css',
          '@dcloudio/uni-components/style-x-vapor/swiper-item.css',
          '@dcloudio/uni-components/style-x-vapor/loading.css',
        ],
        openLocation: ['@dcloudio/uni-h5/style/map.css'],
        setClipboardData: ['@dcloudio/uni-h5/style/api/toast.css'],
      })
    }
  )

  test.each([
    [false, undefined, 'true', 'h5'],
    [true, 'true', undefined, 'h5'],
    [true, 'true', 'true', 'app'],
    [false, 'true', 'true', 'h5'],
  ] as const)(
    '非 Web Vapor 保留原样式（%s, %s, %s, %s）',
    (isX, appX, dom2, platform) => {
      if (appX === undefined) delete process.env.UNI_APP_X
      else process.env.UNI_APP_X = appX
      if (dom2 === undefined) delete process.env.UNI_APP_X_DOM2
      else process.env.UNI_APP_X_DOM2 = dom2
      process.env.UNI_PLATFORM = platform

      expect(API_DEPS_CSS(isX).previewImage).toEqual([
        '@dcloudio/uni-components/style/resize-sensor.css',
        '@dcloudio/uni-components/style/swiper.css',
        '@dcloudio/uni-components/style/swiper-item.css',
        '@dcloudio/uni-components/style/movable-area.css',
        '@dcloudio/uni-components/style/movable-view.css',
      ])
      expect(API_DEPS_CSS(isX)).not.toHaveProperty('setClipboardData')
      expect(API_DEPS_CSS(isX).chooseLocation).toEqual(
        isX
          ? [
              '@dcloudio/uni-components/style//view.css',
              '@dcloudio/uni-components/style//text.css',
              '@dcloudio/uni-components/style//input.css',
              '@dcloudio/uni-h5/style//map.css',
              '@dcloudio/uni-components/style//scroll-view.css',
              '@dcloudio/uni-components/style//image.css',
            ]
          : [
              '@dcloudio/uni-h5/style/api//location-picker.css',
              '@dcloudio/uni-components/style//input.css',
              '@dcloudio/uni-h5/style//map.css',
              '@dcloudio/uni-components/style//scroll-view.css',
            ]
      )
      expect(API_DEPS_CSS(isX).showLoading).toEqual(
        isX ? ['@dcloudio/uni-components/style-x/loading.css'] : []
      )
      expect(API_DEPS_CSS(isX).showToast).toEqual([
        '@dcloudio/uni-h5/style/api/toast.css',
      ])
      expect(API_DEPS_CSS(isX).openLocation).toEqual([
        '@dcloudio/uni-h5/style/api/location-view.css',
      ])
      expect(COMPONENT_DEPS_CSS(isX).picker).toEqual([
        '@dcloudio/uni-components/style/resize-sensor.css',
        '@dcloudio/uni-components/style/picker-view.css',
        '@dcloudio/uni-components/style/picker-view-column.css',
      ])
      expect(COMPONENT_DEPS_CSS(isX)['picker-view-column']).toEqual([
        '@dcloudio/uni-components/style/resize-sensor.css',
      ])
      expect(COMPONENT_DEPS_CSS(isX)['list-view']).toEqual([
        '@dcloudio/uni-components/style/resize-sensor.css',
        '@dcloudio/uni-components/style/refresher.css',
      ])
      expect(COMPONENT_DEPS_CSS(isX)).not.toHaveProperty('waterflow')
      expect(API_DEPS_CSS(isX).showActionSheet).toEqual(
        isX ? [] : ['@dcloudio/uni-h5/style/api/action-sheet.css']
      )
      expect(API_DEPS_CSS(isX).showModal).toEqual([
        isX
          ? '@dcloudio/uni-components/style/textarea.css'
          : '@dcloudio/uni-h5/style/api/modal.css',
      ])
    }
  )
})
