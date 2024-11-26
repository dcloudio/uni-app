import { formatArg } from '../src/runtime/console'

describe('uni-console', () => {
  test('formatArg undefined', () => {
    expect(formatArg(undefined)).toEqual({
      type: 'undefined',
    })
  })
  test('formatArg null', () => {
    expect(formatArg(null)).toEqual({
      type: 'null',
    })
  })
  test('formatArg boolean', () => {
    expect(formatArg(true)).toEqual({
      type: 'boolean',
      value: 'true',
    })
    expect(formatArg(false)).toEqual({
      type: 'boolean',
      value: 'false',
    })
  })
  test('formatArg number', () => {
    expect(formatArg(1)).toEqual({
      type: 'number',
      value: '1',
    })
  })
  test('formatArg string', () => {
    expect(formatArg('1')).toEqual({
      type: 'string',
      value: '1',
    })
  })
  test('formatArg symbol', () => {
    expect(formatArg(Symbol('1'))).toEqual({
      type: 'symbol',
      value: '1',
    })
  })
  test('formatArg bigint', () => {
    expect(formatArg(BigInt(1))).toEqual({
      type: 'bigint',
      value: '1',
    })
  })
  test('formatArg array', () => {
    expect(formatArg([1, '2', true])).toEqual({
      type: 'object',
      subType: 'array',
      value: {
        properties: [
          { name: '0', type: 'number', value: '1' },
          { name: '1', type: 'string', value: '2' },
          { name: '2', type: 'boolean', value: 'true' },
        ],
        methods: [],
      },
    })
  })
  test('formatArg set', () => {
    expect(formatArg(new Set([1, '2', true]))).toEqual({
      type: 'object',
      subType: 'set',
      className: 'Set',
      description: `Set(3)`,
      value: {
        entries: [
          {
            value: { type: 'number', value: '1' },
          },
          {
            value: { type: 'string', value: '2' },
          },
          {
            value: { type: 'boolean', value: 'true' },
          },
        ],
        methods: [],
      },
    })
  })
  test('formatArg map', () => {
    expect(
      formatArg(
        new Map<any, any>([
          ['a', 1],
          ['b', '2'],
          ['c', true],
          [1, 1],
        ])
      )
    ).toEqual({
      type: 'object',
      subType: 'map',
      className: 'Map',
      description: `Map(4)`,
      value: {
        entries: [
          {
            key: { type: 'string', value: 'a' },
            value: { type: 'number', value: '1' },
          },
          {
            key: { type: 'string', value: 'b' },
            value: { type: 'string', value: '2' },
          },
          {
            key: { type: 'string', value: 'c' },
            value: { type: 'boolean', value: 'true' },
          },
          {
            key: { type: 'number', value: '1' },
            value: { type: 'number', value: '1' },
          },
        ],
        methods: [],
      },
    })
  })
  test('formatArg regexp', () => {
    expect(formatArg(/a/g)).toEqual({
      type: 'object',
      subType: 'regexp',
      className: 'Regexp',
      value: '/a/g',
    })
  })
  test('formatArg date', () => {
    const date = new Date()
    expect(formatArg(date)).toEqual({
      type: 'object',
      subType: 'date',
      className: 'Date',
      value: String(date),
    })
  })
  test('formatArg error', () => {
    try {
      // @ts-expect-error
      a
    } catch (e) {
      expect(formatArg(e)).toEqual({
        type: 'object',
        subType: 'error',
        value: 'a is not defined',
        className: 'ReferenceError',
      })
    }
  })
  test('formatArg object', () => {
    expect(formatArg({ a: 1, b: '2', c: true })).toEqual({
      type: 'object',
      value: {
        properties: [
          { name: 'a', type: 'number', value: '1' },
          { name: 'b', type: 'string', value: '2' },
          { name: 'c', type: 'boolean', value: 'true' },
        ],
        methods: [],
      },
    })
  })
  test('formatArg maximum depth', () => {
    expect(formatArg([[[[[[[[[1]]]]]]]]])).toEqual({
      type: 'object',
      subType: 'array',
      value: {
        properties: [
          {
            type: 'object',
            subType: 'array',
            value: {
              properties: [
                {
                  type: 'object',
                  subType: 'array',
                  value: {
                    properties: [
                      {
                        type: 'object',
                        subType: 'array',
                        value: {
                          properties: [
                            {
                              type: 'object',
                              subType: 'array',
                              value: {
                                properties: [
                                  {
                                    type: 'object',
                                    subType: 'array',
                                    value: {
                                      properties: [
                                        {
                                          type: 'object',
                                          subType: 'array',
                                          value: {
                                            properties: [
                                              {
                                                type: 'object',
                                                value:
                                                  '[Maximum depth reached]',
                                                name: '0',
                                              },
                                            ],
                                            methods: [],
                                          },
                                          name: '0',
                                        },
                                      ],
                                      methods: [],
                                    },
                                    name: '0',
                                  },
                                ],
                                methods: [],
                              },
                              name: '0',
                            },
                          ],
                          methods: [],
                        },
                        name: '0',
                      },
                    ],
                    methods: [],
                  },
                  name: '0',
                },
              ],
              methods: [],
            },
            name: '0',
          },
        ],
        methods: [],
      },
    })
  })
})
