import { pathToGlob } from '../src/utils'

describe('pathToGlob', () => {
  it('path in unix', () => {
    expect(pathToGlob('/test', '**/*.js')).toBe('/test/**/*.js')
    expect(pathToGlob('/test(1', '**/*.js')).toBe('/test[(]1/**/*.js')
    expect(
      pathToGlob('/test(1', '**/*.js', { escape: true, windows: false })
    ).toBe('/test\\(1/**/*.js')
  })
  it('path in windows', () => {
    expect(pathToGlob('C:\\\\test\\test', '**/*.js', { windows: true })).toBe(
      'C:/test/test/**/*.js'
    )
    expect(pathToGlob('C:\\\\test\\test(1', '**/*.js', { windows: true })).toBe(
      'C:/test/test[(]1/**/*.js'
    )
    expect(
      pathToGlob('C:\\\\test\\test(1', '**/*.js', {
        windows: true,
        escape: true,
      })
    ).toBe('C:/test/test[(]1/**/*.js')
  })
})
