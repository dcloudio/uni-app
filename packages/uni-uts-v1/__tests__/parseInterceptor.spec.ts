import { parseInterceptorCode } from '../src/code'

describe('parseInterceptorCode', () => {
  test('extracts all init method names and strips export declarations from code', () => {
    const result =
      parseInterceptorCode(`export const initRequest = () => 'request'
const initLocal = () => 'local'
export async function initShare() {
  return 'share'
}
export const helper = () => 'helper'
function run() {
  return helper()
}
`)

    expect(result.initMethods).toEqual([
      'initRequest',
      'initLocal',
      'initShare',
    ])
    expect(result.code).toContain(`const initRequest = () => 'request'`)
    expect(result.code).toContain(`const initLocal = () => 'local'`)
    expect(result.code).toContain(`async function initShare()`)
    expect(result.code).toContain(`const helper = () => 'helper'`)
    expect(result.code).not.toContain(`export const initRequest`)
    expect(result.code).not.toContain(`export async function initShare`)
    expect(result.code).not.toContain(`export const helper`)
  })

  test('returns empty result for empty code', () => {
    expect(parseInterceptorCode('')).toEqual({
      code: '',
      initMethods: [],
    })
  })

  test('strips comments before parsing interceptor code', () => {
    const result = parseInterceptorCode(`// export const initComment = () => {}
export /* comment */ const initRequest = () => {
  const url = 'https://example.com/path//keep'
  const block = "/* keep */"
  return url + block
}
/*
export const initShare = () => {}
*/
`)

    expect(result.initMethods).toEqual(['initRequest'])
    expect(result.code).toContain(`const initRequest = () => {`)
    expect(result.code).toContain(`https://example.com/path//keep`)
    expect(result.code).toContain(`/* keep */`)
    expect(result.code).not.toContain(`initComment`)
    expect(result.code).not.toContain(`initShare`)
    expect(result.code).not.toContain(`export /* comment */ const initRequest`)
  })
})
