import { omitEmptyStringFieldsForUpload } from '../../../src/public/infra/omitEmptyStringFields'

import type { StatData } from '../../../src/public/domain/statData'

describe('infra/omitEmptyStringFieldsForUpload', () => {
  test('剔除顶层值为空串的键', () => {
    const input: StatData = {
      lt: '11',
      t: 1,
      ak: 'x',
      ch: '',
      lat: '',
      iey: 0,
    }
    const out = omitEmptyStringFieldsForUpload(input)
    expect(out).toEqual({ lt: '11', t: 1, ak: 'x', iey: 0 })
    expect(out.ch).toBeUndefined()
    expect(out.lat).toBeUndefined()
  })
})
