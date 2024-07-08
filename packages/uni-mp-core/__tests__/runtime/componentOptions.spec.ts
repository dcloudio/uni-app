import { initBehaviors } from '../../src/runtime/componentOptions'
// import { initBehaviors } from '@dcloudio/uni-mp-core'

describe('test:runtime/componentOptions', () => {
  it('test: initBehaviors', () => {
    expect(typeof initBehaviors).toBe('function')

    const options = {
      behaviors: ['uni://form-field'],
    }

    const behaviors = initBehaviors(options)
    expect(behaviors).toEqual(['__GLOBAL__://form-field'])
  })
})
