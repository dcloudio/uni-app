class MockHTMLElement {
  private _attrs: Record<string, string> = {}

  private getDatasetKey(name: string) {
    return name.substring(5).replace(/-([a-z])/g, (_, char) => {
      return char.toUpperCase()
    })
  }

  setAttribute(name: string, value: string) {
    if (name.startsWith('data-')) {
      const dataset =
        (this as any).__uniDataset || ((this as any).__uniDataset = {})
      dataset[this.getDatasetKey(name)] = String(value)
    }
    this._attrs[name] = String(value)
  }

  removeAttribute(name: string) {
    if (name.startsWith('data-') && (this as any).__uniDataset) {
      delete (this as any).__uniDataset[this.getDatasetKey(name)]
    }
    delete this._attrs[name]
  }

  getAttribute(name: string) {
    return this._attrs[name] ?? null
  }

  hasAttribute(name: string) {
    return name in this._attrs
  }
}

describe('UniElement', () => {
  let UniElement: any

  beforeAll(async () => {
    ;(global as any).HTMLElement = MockHTMLElement
    jest.resetModules()
    UniElement = (await import('../src/helpers/UniElement')).UniElement
  })

  test('dataset initializes from __uniDataset', () => {
    const element = new UniElement()
    element.__uniDataset = {
      foo: 'foo',
      barBaz: 'bar',
    }

    expect(element.dataset.get('foo')).toBe('foo')
    expect(element.dataset.foo).toBe('foo')
    expect(element.dataset.get('barBaz')).toBe('bar')
  })

  test('dataset initializes from data attributes set before first access', () => {
    const element = new UniElement()

    element.setAttribute('data-foo', 'foo')
    element.setAttribute('data-bar-baz', 'bar')

    expect(element.dataset.get('foo')).toBe('foo')
    expect(element.dataset.foo).toBe('foo')
    expect(element.dataset.get('barBaz')).toBe('bar')
  })

  test('dataset ignores data attributes removed before first access', () => {
    const element = new UniElement()

    element.setAttribute('data-foo', 'foo')
    element.removeAttribute('data-foo')

    expect(element.dataset.has('foo')).toBe(false)
  })

  test('data attribute changes sync to initialized dataset', () => {
    const element = new UniElement()

    expect(element.dataset.has('foo')).toBe(false)

    element.setAttribute('data-foo', 'foo')
    expect(element.dataset.get('foo')).toBe('foo')

    element.removeAttribute('data-foo')
    expect(element.dataset.has('foo')).toBe(false)
  })
})
