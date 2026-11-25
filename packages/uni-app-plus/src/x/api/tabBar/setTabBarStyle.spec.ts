const API_SET_TAB_BAR_STYLE = 'setTabBarStyle'
const SetTabBarStyleOptions = {}
const SetTabBarStyleProtocol = {}

const setTabBarStyleMock = jest.fn()

jest.mock('@dcloudio/uni-api', () => ({
  API_SET_TAB_BAR_STYLE,
  SetTabBarStyleOptions,
  SetTabBarStyleProtocol,
  defineAsyncApi: jest.fn((name, fn, protocol, options) => [
    name,
    fn,
    protocol,
    options,
  ]),
}))

jest.mock('../../framework/app/tabBar', () => ({
  getTabBar: jest.fn(() => ({
    setTabBarStyle: setTabBarStyleMock,
  })),
}))

import { setTabBarStyle as setTabBarStyleReturn } from './setTabBarStyle'

describe('setTabBarStyle', () => {
  beforeEach(() => {
    setTabBarStyleMock.mockClear()
  })

  it('does not reset the themed border when only changing text color', () => {
    const fn = setTabBarStyleReturn[1] as Function
    const resolve = jest.fn()

    fn({ color: '#123456' }, { resolve, reject: jest.fn() })

    expect(setTabBarStyleMock).toHaveBeenCalledWith(
      new Map([['color', '#123456']])
    )
    expect(resolve).toHaveBeenCalledTimes(1)
  })

  it('only updates provided style properties', () => {
    const fn = setTabBarStyleReturn[1] as Function
    const resolve = jest.fn()

    fn(
      {
        borderColor: '#fff6cf',
        backgroundColor: '#fff6cf',
      },
      { resolve, reject: jest.fn() }
    )

    expect(setTabBarStyleMock).toHaveBeenCalledWith(
      new Map([
        ['backgroundColor', '#fff6cf'],
        ['borderStyle', '#fff6cf'],
      ])
    )
    expect(resolve).toHaveBeenCalledTimes(1)
  })
})
