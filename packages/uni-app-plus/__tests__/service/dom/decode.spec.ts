import { inspect } from 'util'
import { decodeActions } from '../../../src/service/framework/dom/decodeActions'

describe('decode', () => {
  test('actions', () => {
    console.log(inspect(decodeActions([]), { colors: true, depth: null }))
  })
})
