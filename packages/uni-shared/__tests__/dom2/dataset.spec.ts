import {
  createUniDOMStringMap,
  normalizeDatasetAttrName,
} from '../../src/dom2/dataset'

describe('UniDOMStringMap', () => {
  test('初始化 source 时不触发 hooks', () => {
    const onSet = jest.fn()
    const onDelete = jest.fn()
    const dataset = createUniDOMStringMap(
      {
        foo: 'foo',
        'data-bar-baz': 'bar',
      },
      {
        onSet,
        onDelete,
      }
    )

    expect(dataset.get('foo')).toBe('foo')
    expect(dataset.get('barBaz')).toBe('bar')
    expect(onSet).not.toHaveBeenCalled()
    expect(onDelete).not.toHaveBeenCalled()
  })

  test('set/delete/clear 触发 hooks，并传入归一化后的 key', () => {
    const onSet = jest.fn()
    const onDelete = jest.fn()
    const dataset = createUniDOMStringMap(undefined, {
      onSet,
      onDelete,
    })

    dataset.set('data-foo-bar', 'foo')
    dataset.set('baz', 'baz')
    dataset.delete('data-foo-bar')
    dataset.clear()

    expect(onSet).toHaveBeenNthCalledWith(1, 'fooBar', 'foo')
    expect(onSet).toHaveBeenNthCalledWith(2, 'baz', 'baz')
    expect(onDelete).toHaveBeenNthCalledWith(1, 'fooBar')
    expect(onDelete).toHaveBeenNthCalledWith(2, 'baz')
  })

  test('属性读写删除会走 hooks', () => {
    const onSet = jest.fn()
    const onDelete = jest.fn()
    const dataset = createUniDOMStringMap(undefined, {
      onSet,
      onDelete,
    })

    dataset.fooBar = 'foo'
    expect(dataset.fooBar).toBe('foo')

    delete dataset.fooBar
    expect(dataset.fooBar).toBeNull()

    expect(onSet).toHaveBeenCalledWith('fooBar', 'foo')
    expect(onDelete).toHaveBeenCalledWith('fooBar')
  })

  test('不存在的 key 返回 null，已存在的 undefined 原样返回', () => {
    const dataset = createUniDOMStringMap({
      foo: undefined,
      bar: null,
    })

    expect(dataset.get('missing')).toBeNull()
    expect(dataset.missing).toBeNull()
    expect(dataset['missing']).toBeNull()
    expect(dataset.get('foo')).toBeUndefined()
    expect(dataset.foo).toBeUndefined()
    expect(dataset.get('bar')).toBeNull()
    expect(dataset.bar).toBeNull()
    expect(dataset.has('foo')).toBe(true)
    expect(dataset.has('missing')).toBe(false)
  })

  test('normalizeDatasetAttrName 转换为 data-* 属性名', () => {
    expect(normalizeDatasetAttrName('fooBar')).toBe('data-foo-bar')
    expect(normalizeDatasetAttrName('data-foo-bar')).toBe('data-foo-bar')
  })
})
