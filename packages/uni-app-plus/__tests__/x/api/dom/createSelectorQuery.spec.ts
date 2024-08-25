import { createSelectorQuery } from '../../../../src/x/api/dom/createSelectorQuery'

// import { getCurrentPage } from '@dcloudio/uni-core'

jest.mock('@dcloudio/uni-core', () => {
  return {
    getCurrentPage: jest.fn(),
  }
})

describe('createSelectorQuery', () => {
  it('定义包含的方法', () => {
    const query = createSelectorQuery()
    expect(typeof query.in).toBe('function')
    expect(typeof query.select).toBe('function')
    expect(typeof query.selectAll).toBe('function')
    expect(typeof query.selectViewport).toBe('function')
    expect(typeof query.exec).toBe('function')
  })
  it('NodesRef 定义的方法', () => {
    const query = createSelectorQuery()
    const ref = query.select('.test')
    expect(typeof ref.boundingClientRect).toBe('function')
    expect(typeof ref.scrollOffset).toBe('function')
    expect(typeof ref.fields).toBe('function')
    expect(typeof ref.context).toBe('function')
    expect(typeof ref.node).toBe('function')
  })
})
