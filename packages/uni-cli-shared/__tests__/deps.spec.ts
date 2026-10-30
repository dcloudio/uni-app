import { API_DEPS_CSS, COMPONENT_DEPS_CSS } from '../src/deps'

describe('API 样式依赖', () => {
  const scrollViewCss = [
    '@dcloudio/uni-h5/style/vapor/scroll-view.css',
    '@dcloudio/uni-components/style/refresher.css',
    '@dcloudio/uni-components/style-x-vapor/loading.css',
  ]
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
      delete process.env.UNI_APP_X_DOM2
      const vdomDeps = API_DEPS_CSS(true)
      const vdomComponentDeps = COMPONENT_DEPS_CSS(true)

      process.env.UNI_APP_X_DOM2 = 'true'
      const vaporDeps = API_DEPS_CSS(true)
      expect(COMPONENT_DEPS_CSS(true)).toEqual({
        ...vdomComponentDeps,
        'scroll-view': [
          ...vdomComponentDeps['scroll-view'],
          '@dcloudio/uni-components/style-x-vapor/loading.css',
        ],
        'picker-view-column': [
          ...vdomComponentDeps['picker-view-column'],
          ...scrollViewCss,
        ],
        'list-view': [vdomComponentDeps['list-view'][0], ...scrollViewCss],
        waterflow: [vdomComponentDeps['list-view'][0], ...scrollViewCss],
        picker: [
          ...vdomComponentDeps.picker.map((style) =>
            /\/picker-view(?:-column)?\.css$/.test(style)
              ? style.replace('/style/', '/style-x-vapor/')
              : style
          ),
          ...scrollViewCss,
        ],
      })
      expect(vaporDeps).toEqual({
        ...vdomDeps,
        showModal: [
          '@dcloudio/uni-h5/style/vapor/textarea.css',
          ...scrollViewCss,
        ],
        showActionSheet: scrollViewCss,
        chooseLocation: [
          '@dcloudio/uni-components/style//view.css',
          '@dcloudio/uni-components/style//text.css',
          '@dcloudio/uni-h5/style/vapor/input.css',
          '@dcloudio/uni-h5/style//map.css',
          ...scrollViewCss,
          '@dcloudio/uni-components/style//image.css',
        ],
        showLoading: ['@dcloudio/uni-components/style-x-vapor/loading.css'],
        previewImage: vdomDeps.previewImage.map((style) =>
          /\/swiper(?:-item)?\.css$/.test(style)
            ? style.replace('/style/', '/style-x-vapor/')
            : style
        ),
      })
      expect(vaporDeps.previewImage).toContain(
        '@dcloudio/uni-components/style-x-vapor/swiper.css'
      )
      expect(vaporDeps.previewImage).toContain(
        '@dcloudio/uni-components/style-x-vapor/swiper-item.css'
      )
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
