import { inspect } from 'util'
import { decodeActions } from '../../../src/service/framework/dom/decodeActions'

describe('decode', () => {
  test('actions', () => {
    console.log(
      inspect(
        decodeActions([
          [3, 1, 4],
          [3, 2, 4],
          [4, 1, 0, -1, { a: {}, t: '' }],
          [4, 2, 0, -1, { a: {}, t: '' }],
          [3, 3, 1],
          [4, 3, 0, 2, { a: { '.c': 'content' }, t: '123' }],
          [3, 4, 1],
          [4, 4, 0, 2, { a: { '.c': 'title' }, t: '456' }],
          [2],
        ]),
        { colors: true, depth: null }
      )
    )
  })
})
