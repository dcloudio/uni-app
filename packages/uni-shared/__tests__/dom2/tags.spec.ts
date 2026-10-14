import {
  isDom2AppVueComponentTag,
  isDom2WebVueComponentTag,
} from '../../src/dom2/tags'

describe('DOM2 组件标签', () => {
  test('识别 package.json 配置的 Web DOM2 组件', () => {
    expect(isDom2WebVueComponentTag('progress')).toBe(true)
    expect(isDom2WebVueComponentTag('swiper')).toBe(true)
    expect(isDom2WebVueComponentTag('loading')).toBe(true)
    expect(isDom2WebVueComponentTag('button')).toBe(false)
    expect(isDom2WebVueComponentTag('input')).toBe(false)
    expect(isDom2WebVueComponentTag('textarea')).toBe(false)
    expect(isDom2WebVueComponentTag('video')).toBe(false)
  })

  test('Web 与 App DOM2 组件名单相互独立', () => {
    expect(isDom2AppVueComponentTag('video')).toBe(true)
    expect(isDom2WebVueComponentTag('video')).toBe(false)
  })
})
