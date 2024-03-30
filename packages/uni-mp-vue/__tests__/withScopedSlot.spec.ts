import { initScopedSlotDataByPath } from '../src/helpers/withScopedSlot'

const tests: Record<string, Data> = {
  a: {
    a: [{ a: 1 }],
  },
  'a.b': {
    a: {
      b: [{ a: 1 }],
    },
  },
  'a.0.b': {
    a: [
      {
        b: [{ a: 1 }],
      },
    ],
  },
  'a.1.b': {
    a: createArrayData(1, { b: [{ a: 1 }] }),
  },
  'a.1.b.2.c.b': {
    a: createArrayData(1, { b: createArrayData(2, { c: { b: [{ a: 1 }] } }) }),
  },
}

function createArrayData(index: number, data: Data) {
  const arr: Data[] = []
  arr[index] = data
  return arr
}

describe('uni-mp-vue: withScopedSlot', () => {
  Object.keys(tests).forEach((path) => {
    test(path, () => {
      const data = {}
      initScopedSlotDataByPath(path, { a: 1 }, data)
      expect(data).toMatchObject(tests[path])
    })
  })
})
