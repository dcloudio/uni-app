import type { ComponentPublicInstance } from 'vue'
import { initVaporPageStyle } from '../../../../src/x/framework/page/vaporPageStyle'

class MockPageRootElement {
  tagName = 'PAGE'
}

function createPage(pageStyleOverrides = new Map<string, boolean | string>()) {
  const rootElement = new MockPageRootElement()
  const setVaporPageStyle = jest.fn()
  const setVaporPageStyleInitialValue = jest.fn()
  const flushVaporPageStyleQueue = jest.fn()
  const pageStyleOwner = {
    __vaporPageStyleOverrides: pageStyleOverrides,
    __setVaporPageStyleInitialValue: setVaporPageStyleInitialValue,
    __setVaporPageStyle: setVaporPageStyle,
    __flushVaporPageStyleQueue: flushVaporPageStyleQueue,
  }
  const pageVm = {
    $el: rootElement,
    $page: pageStyleOwner,
  } as unknown as ComponentPublicInstance
  return {
    flushVaporPageStyleQueue,
    pageStyleOwner,
    pageVm,
    rootElement,
    setVaporPageStyle,
    setVaporPageStyleInitialValue,
  }
}

describe('vapor page style', () => {
  const testGlobal = globalThis as typeof globalThis & {
    UniViewElementImpl?: typeof MockPageRootElement
  }
  const originalUniViewElementImpl = testGlobal.UniViewElementImpl

  beforeAll(() => {
    testGlobal.UniViewElementImpl = class UniViewElementImpl {} as any
  })

  afterAll(() => {
    testGlobal.UniViewElementImpl = originalUniViewElementImpl
  })

  test('records defaults without setting root scroll-view attributes', () => {
    const {
      pageStyleOwner,
      pageVm,
      setVaporPageStyle,
      setVaporPageStyleInitialValue,
    } = createPage()

    initVaporPageStyle(pageVm, {} as UniApp.PageRouteMeta)

    expect(setVaporPageStyle).not.toHaveBeenCalled()
    expect(setVaporPageStyleInitialValue.mock.calls).toEqual([
      ['enableBackToTop', false],
      ['bounces', false],
      ['androidOverscroll', false],
      ['backgroundTextStyle', 'dark'],
      ['androidRefresherColor', ''],
      ['backgroundColor', 'transparent'],
    ])
    expect(setVaporPageStyleInitialValue.mock.contexts).toEqual([
      pageStyleOwner,
      pageStyleOwner,
      pageStyleOwner,
      pageStyleOwner,
      pageStyleOwner,
      pageStyleOwner,
    ])
  })

  test('initializes attributes from the current pages.json style', () => {
    const { pageVm, setVaporPageStyle } = createPage()
    const pageStyle = {
      enableBackToTop: true,
      bounces: true,
      androidOverscroll: true,
      androidRefresherColor: '#00ff00',
      backgroundTextStyle: 'light',
      backgroundColor: '#ff0000',
    } as unknown as UniApp.PageRouteMeta

    initVaporPageStyle(pageVm, pageStyle)

    expect(setVaporPageStyle.mock.calls).toEqual([
      ['enableBackToTop', true],
      ['bounces', true],
      ['androidOverscroll', true],
      ['backgroundTextStyle', 'light'],
      ['androidRefresherColor', '#00ff00'],
      ['backgroundColor', '#ff0000'],
    ])
  })

  test('normalizes unsupported background text styles without setting the default', () => {
    const { pageVm, setVaporPageStyle, setVaporPageStyleInitialValue } =
      createPage()

    initVaporPageStyle(pageVm, {
      backgroundTextStyle: 'invalid',
    } as unknown as UniApp.PageRouteMeta)

    expect(setVaporPageStyle).not.toHaveBeenCalled()
    expect(setVaporPageStyleInitialValue).toHaveBeenCalledWith(
      'backgroundTextStyle',
      'dark'
    )
  })

  test('skips attributes changed before native ready', () => {
    const {
      flushVaporPageStyleQueue,
      pageStyleOwner,
      pageVm,
      setVaporPageStyle,
      setVaporPageStyleInitialValue,
    } = createPage(
      new Map<string, boolean | string>([
        ['bounces', true],
        ['androidRefresherColor', '#0000ff'],
      ])
    )
    const pageStyle = {
      enableBackToTop: true,
      bounces: false,
      androidOverscroll: true,
      androidRefresherColor: '#00ff00',
      backgroundTextStyle: 'light',
      backgroundColor: '#ff0000',
    } as unknown as UniApp.PageRouteMeta

    initVaporPageStyle(pageVm, pageStyle)

    expect(setVaporPageStyle.mock.calls).toEqual([
      ['enableBackToTop', true],
      ['androidOverscroll', true],
      ['backgroundTextStyle', 'light'],
      ['backgroundColor', '#ff0000'],
    ])
    expect(setVaporPageStyleInitialValue.mock.calls).toEqual([
      ['enableBackToTop', true],
      ['bounces', false],
      ['androidOverscroll', true],
      ['backgroundTextStyle', 'light'],
      ['androidRefresherColor', '#00ff00'],
      ['backgroundColor', '#ff0000'],
    ])
    expect(flushVaporPageStyleQueue).toHaveBeenCalledTimes(1)
    expect(flushVaporPageStyleQueue.mock.contexts).toEqual([pageStyleOwner])
  })

  test('discards queued updates when the root element is unavailable on ready', () => {
    const {
      flushVaporPageStyleQueue,
      pageStyleOwner,
      pageVm,
      setVaporPageStyle,
    } = createPage()
    ;(pageVm as unknown as { $el: unknown }).$el = null

    initVaporPageStyle(pageVm, {} as UniApp.PageRouteMeta)

    expect(setVaporPageStyle).not.toHaveBeenCalled()
    expect(flushVaporPageStyleQueue).toHaveBeenCalledTimes(1)
    expect(flushVaporPageStyleQueue.mock.contexts).toEqual([pageStyleOwner])
  })
})
