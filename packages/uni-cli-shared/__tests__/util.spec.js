const {
  pathToRegexp,
  pathToGlob
} = require('../lib/util')

describe('pathToRegexp', () => {
  function expectRegexp (pathString, options, source, flags = 'i') {
    const exp = pathToRegexp(pathString, options)
    expect(exp.source).toBe(source)
    expect(exp.flags).toBe(flags)
  }
  it('path', () => {
    expectRegexp('/test', {}, '\\/test')
    expectRegexp('/test(1', {}, '\\/test\\(1')
  })
  it('path with options', () => {
    expectRegexp('/test', { start: true }, '^\\/test')
    expectRegexp('/test', { end: true }, '\\/test$')
    expectRegexp('/test', { start: true, end: true }, '^\\/test$')
    expectRegexp('/test', { global: true }, '\\/test', 'gi')
  })
})

describe('pathToGlob', () => {
  it('path in unix', () => {
    expect(pathToGlob('/test', '**/*.js')).toBe('/test/**/*.js')
    expect(pathToGlob('/test(1', '**/*.js')).toBe('/test[(]1/**/*.js')
    expect(pathToGlob('/test(1', '**/*.js', { escape: true })).toBe('/test\\(1/**/*.js')
  })
  it('path in windows', () => {
    expect(pathToGlob('C:\\\\test\\test', '**/*.js', { windows: true })).toBe('C:/test/test/**/*.js')
    expect(pathToGlob('C:\\\\test\\test(1', '**/*.js', { windows: true })).toBe('C:/test/test[(]1/**/*.js')
    expect(pathToGlob('C:\\\\test\\test(1', '**/*.js', { windows: true, escape: true })).toBe('C:/test/test[(]1/**/*.js')
  })
})
