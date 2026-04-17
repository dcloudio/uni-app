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
})
