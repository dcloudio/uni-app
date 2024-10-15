import { getRealPath } from '../src/platform/dom'

describe('dom', () => {
  test(`getRealPath`, () => {
    ;(global as any).__uniConfig = {
      router: { base: '' },
    }
    expect(getRealPath(`/assets/logo.xxxxxx.png`)).toBe(
      '/assets/logo.xxxxxx.png'
    )
    expect(getRealPath(`/static/logo.png`)).toBe('/static/logo.png')
    expect(getRealPath(`/pages/sub/static/logo.png`)).toBe(
      '/pages/sub/static/logo.png'
    )
    expect(getRealPath(`/uni_modules/test-com/static/logo.png`)).toBe(
      '/uni_modules/test-com/static/logo.png'
    )
  })
  test(`getRealPath with base(./)`, () => {
    ;(global as any).__uniConfig = {
      router: { base: './' },
    }
    // TODO
    // expect(getRealPath(`./assets/logo.xxxxxx.png`)).toBe(
    //   '/assets/logo.xxxxxx.png'
    // )
    // expect(getRealPath(`./static/logo.png`)).toBe('/static/logo.png')
    // expect(getRealPath(`./pages/sub/static/logo.png`)).toBe(
    //   '/pages/sub/static/logo.png'
    // )
    // expect(getRealPath(`./uni_modules/test-com/static/logo.png`)).toBe(
    //   '/uni_modules/test-com/static/logo.png'
    // )
  })
})
