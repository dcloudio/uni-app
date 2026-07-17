import { normalizeDatasetApi } from '../../src/api/x/dataset'

describe('api dataset', () => {
  test('wraps selector query dataset callbacks', () => {
    const plainResult = { id: 'plain' }
    const boundingResult = {
      dataset: { foo: 'bar', 'data-user-id': 1 },
    }
    const callbacks: Function[] = []
    let query: any
    function createNodeRef() {
      return {
        boundingClientRect(callback: Function) {
          callbacks.push(() => callback(boundingResult))
          return query
        },
        scrollOffset(callback: Function) {
          callbacks.push(() => callback({ dataset: { top: 10 } }))
          return query
        },
        fields(_fields: UniApp.NodeField, callback: Function) {
          callbacks.push(() => callback({ dataset: { get: 'value' } }))
          return query
        },
      }
    }
    query = {
      exec(callback: Function) {
        callbacks.forEach((callback) => callback())
        callback([boundingResult, [{ dataset: { nested: true } }], plainResult])
        return this
      },
      select() {
        return createNodeRef()
      },
      selectAll() {
        return createNodeRef()
      },
      selectViewport() {
        return createNodeRef()
      },
    }
    const createSelectorQuery = normalizeDatasetApi(
      'createSelectorQuery',
      () => query
    ) as Function
    const selectorQuery = createSelectorQuery()

    let boundingDataset: Map<string, any> | null = null
    selectorQuery
      .select('#target')
      .boundingClientRect((result: any) => {
        boundingDataset = result.dataset
        expect(result.dataset.get('userId')).toBe(1)
      })
      .selectAll('.target')
      .scrollOffset((result: any) => {
        expect(result.dataset.top).toBe(10)
      })
      .selectViewport()
      .fields({ dataset: true }, (result: any) => {
        expect(result.dataset).toBeInstanceOf(Map)
        expect(result.dataset.get('get')).toBe('value')
        expect(typeof result.dataset.get).toBe('function')
      })
      .exec((result: any[]) => {
        expect(result[0].dataset).toBeInstanceOf(Map)
        expect(result[0].dataset).toBe(boundingDataset)
        expect(result[0].dataset.get('foo')).toBe('bar')
        expect(result[1][0].dataset.get('nested')).toBe(true)
        expect('dataset' in result[2]).toBe(false)
      })
  })

  test('wraps selector query direct dataset callbacks', () => {
    const query = {
      select() {
        return this
      },
      boundingClientRect(callback: Function) {
        callback({ dataset: { 'data-user-id': 1 } })
        return this
      },
      scrollOffset(callback: Function) {
        callback({ dataset: { top: 10 } })
        return this
      },
      fields(_fields: UniApp.NodeField, callback: Function) {
        callback({ dataset: { get: 'value' } })
        return this
      },
    }
    const createSelectorQuery = normalizeDatasetApi(
      'createSelectorQuery',
      () => query
    ) as Function
    const selectorQuery = createSelectorQuery()
    const boundingClientRect = selectorQuery.boundingClientRect

    selectorQuery.select('#target').boundingClientRect((result: any) => {
      expect(result.dataset.get('userId')).toBe(1)
    })
    expect(selectorQuery.boundingClientRect).toBe(boundingClientRect)
    selectorQuery.scrollOffset((result: any) => {
      expect(result.dataset.top).toBe(10)
    })
    selectorQuery.fields({ dataset: true }, (result: any) => {
      expect(result.dataset).toBeInstanceOf(Map)
      expect(result.dataset.get('get')).toBe('value')
    })
  })

  test('wraps intersection observer dataset callbacks', () => {
    const createIntersectionObserver = normalizeDatasetApi(
      'createIntersectionObserver',
      () => ({
        observe(selector: string, callback: Function) {
          callback({ dataset: { foo: 'bar' }, selector })
          return this
        },
      })
    ) as Function

    createIntersectionObserver().observe('#target', (result: any) => {
      expect(result.dataset).toBeInstanceOf(Map)
      expect(result.dataset.foo).toBe('bar')
      expect(result.selector).toBe('#target')
    })
  })
})
