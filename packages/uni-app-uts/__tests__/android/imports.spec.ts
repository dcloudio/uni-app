import { parseImports } from '../../src/plugins/android/utils'

describe('imports', () => {
  test(`parseImports`, async () => {
    expect(
      await parseImports(`


import { test } from './test'
test()
export default {
    methods: {
        test() {
        }
    }
}`)
    ).toMatchSnapshot()
  })
})
