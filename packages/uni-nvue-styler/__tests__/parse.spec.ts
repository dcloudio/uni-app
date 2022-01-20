import { parse } from '../src'

describe('mp-weixin: transform v-on', () => {
  test('basic', () => {
    console.log(parse(`.test{color:red}`))
  })
})
