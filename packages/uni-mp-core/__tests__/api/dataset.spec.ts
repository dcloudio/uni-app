import { normalizeDatasetApi } from '../../src/api/x/dataset'

describe('api dataset', () => {
  test('wraps selector query dataset callbacks', () => {
    const plainResult = { id: 'plain' }
    const query = {
      exec(callback: Function) {
        callback([{ dataset: { foo: 'bar' } }, plainResult])
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

    selectorQuery.exec((result: any[]) => {
      expect(result[0].dataset).toBeInstanceOf(Map)
      expect(result[0].dataset.get('foo')).toBe('bar')
      expect('dataset' in result[1]).toBe(false)
    })
    selectorQuery.boundingClientRect((result: any) => {
      expect(result.dataset.get('userId')).toBe(1)
    })
    selectorQuery.scrollOffset((result: any) => {
      expect(result.dataset.top).toBe(10)
    })
    selectorQuery.fields({ dataset: true }, (result: any) => {
      expect(result.dataset).toBeInstanceOf(Map)
      expect(result.dataset.get('get')).toBe('value')
      expect(typeof result.dataset.get).toBe('function')
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
