import { createPublicFileFilter } from '../src/utils'

describe('static', () => {
  test('filter', () => {
    const filter = createPublicFileFilter('/')
    expect(filter('logo.png')).toBe(false)
    expect(filter('/static/logo.png')).toBe(true)
    expect(filter('/static/test/logo.png')).toBe(true)
    expect(filter('/uni_modules/fxy-components/logo.png')).toBe(false)
    expect(filter('/uni_modules/fxy-components/static/logo.png')).toBe(true)
    expect(filter('/uni_modules/fxy-components/static/test/logo.png')).toBe(
      true
    )
  })
})
