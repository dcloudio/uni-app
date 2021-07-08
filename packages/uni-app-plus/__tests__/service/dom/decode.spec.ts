import { inspect } from 'util'
import { decodeActions } from '../../../src/service/framework/dom/decodeActions'

describe('decode', () => {
  test('actions', () => {
    console.log(
      inspect(
        decodeActions([
          [3, 1, 4],
          [3, 2, 4],
          [
            4,
            1,
            0,
            -1,
            {
              t: '',
            },
          ],
          [
            4,
            2,
            0,
            -1,
            {
              t: '',
            },
          ],
          [3, 3, 1],
          [
            4,
            3,
            0,
            2,
            {
              a: {
                '.e0': 0,
              },
              t: '跳转二级页面',
            },
          ],
          [3, 4, 1],
          [3, 5, 1],
          [
            4,
            5,
            4,
            -1,
            {
              a: {
                '.e0': 0,
              },
              t: '123aaaaaaaaaaaa',
            },
          ],
          [
            4,
            4,
            0,
            2,
            {
              a: {
                '.c': 'content',
                '.h0': 'none',
              },
            },
          ],
          [3, 6, 4],
          [3, 7, 4],
          [
            4,
            6,
            0,
            2,
            {
              t: '',
            },
          ],
          [
            4,
            7,
            0,
            2,
            {
              t: '',
            },
          ],
          [3, 8, 1],
          [
            4,
            8,
            0,
            7,
            {
              a: {
                '.e0': 0,
              },
              t: '1test...........',
            },
          ],
          [3, 9, 1],
          [
            4,
            9,
            0,
            7,
            {
              t: '2',
            },
          ],
          [3, 10, 1],
          [
            4,
            10,
            0,
            2,
            {
              a: {
                '.e0': 0,
              },
              t: 'showModal',
            },
          ],
          [3, 11, 1],
          [
            4,
            11,
            0,
            2,
            {
              a: {
                '.c': 'title',
              },
              t: '456',
            },
          ],
          [3, 12, 1],
          [
            4,
            12,
            0,
            2,
            {
              a: {
                '.e0': 0,
              },
              t: '切换hover',
            },
          ],
          [3, 13, 1],
          [
            4,
            13,
            0,
            2,
            {
              a: {
                '.s': {
                  color: 'red',
                },
              },
              t: 'static style',
            },
          ],
          [3, 14, 1],
          [
            4,
            14,
            0,
            2,
            {
              a: {
                '.s': {
                  color: 'red',
                },
              },
              t: 'dynamic obj style',
            },
          ],
          [3, 15, 1],
          [
            4,
            15,
            0,
            2,
            {
              a: {
                '.s': {
                  color: 'black',
                },
              },
              t: 'dynamic array style',
            },
          ],
          [3, 16, 1],
          [
            4,
            16,
            0,
            2,
            {
              a: {
                '.s': 'color:blue',
              },
              t: 'dynamic string style',
            },
          ],
          [2],
        ]),
        { colors: true, depth: null }
      )
    )
  })
})
