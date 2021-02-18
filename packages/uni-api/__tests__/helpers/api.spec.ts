import { createOnApi } from '../../src/helpers/api/index'
import { normalizeErrMsg } from '../../src/helpers/api/callback'
describe('api', () => {
  test('normalizeErrMsg', () => {
    expect(normalizeErrMsg('', 'navigateTo')).toEqual('navigateTo:ok')
    expect(normalizeErrMsg('navigateTo:ok', 'navigateTo')).toEqual(
      'navigateTo:ok'
    )
    expect(normalizeErrMsg('navigateTo:fail', 'navigateTo')).toEqual(
      'navigateTo:fail'
    )
    expect(
      normalizeErrMsg('redirectTo:fail page not found', 'navigateTo')
    ).toEqual('navigateTo:fail page not found')
  })
  test('createOnApi', () => {
    createOnApi<typeof uni.onCompassChange>(
      'onCompassChange',
      (callback: Function) => {}
    )
  })
})
