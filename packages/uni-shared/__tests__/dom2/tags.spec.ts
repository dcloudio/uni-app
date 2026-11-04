import {
  hasWebVaporComponentStyle,
  isDom2AppVueComponentTag,
  isDom2WebVueComponentTag,
} from '../../src/dom2/tags'

describe('DOM2 组件标签', () => {
  test('识别 Web Vapor 内置组件并独立判断样式位置', () => {
    expect(isDom2WebVueComponentTag('progress')).toBe(true)
    expect(isDom2WebVueComponentTag('swiper')).toBe(true)
    expect(isDom2WebVueComponentTag('loading')).toBe(true)
    for (const name of ['button', 'input', 'textarea', 'video']) {
      expect(isDom2WebVueComponentTag(name)).toBe(true)
    }
    expect(hasWebVaporComponentStyle('button')).toBe(true)
    expect(hasWebVaporComponentStyle('progress')).toBe(true)
    for (const name of ['input', 'textarea', 'video']) {
      expect(hasWebVaporComponentStyle(name)).toBe(false)
    }
  })

  test('Web 与 App DOM2 组件名单相互独立', () => {
    expect(isDom2AppVueComponentTag('resize-sensor')).toBe(false)
    expect(isDom2WebVueComponentTag('resize-sensor')).toBe(true)
  })
})
