const API_SET_NAVIGATION_BAR_COLOR = '1'
const SetNavigationBarColorOptions = {}
const SetNavigationBarColorProtocol = {}

const updateStyle = jest.fn()
jest.mock('@dcloudio/uni-core', () => {
  return {
    getCurrentPage: jest.fn(() => {
      return {
        vm: {
          $nativePage: {
            updateStyle,
          },
        },
      }
    }),
  }
})

jest.mock('@dcloudio/uni-api', () => {
  const mockdefineAsyncApi = jest.fn((name, fn, protocol, options) => {
    return [name, fn, protocol, options]
  })

  return {
    __esModule: true,
    API_SET_NAVIGATION_BAR_COLOR: API_SET_NAVIGATION_BAR_COLOR,
    SetNavigationBarColorOptions: SetNavigationBarColorOptions,
    SetNavigationBarColorProtocol: SetNavigationBarColorProtocol,
    defineAsyncApi: mockdefineAsyncApi,
  }
})

import { setNavigationBarColor as setNavigationBarColorReturn } from './setNavigationBarColor'

describe('setNavigationBarColor', () => {
  it('should setNavigationBarColor', async () => {
    expect(setNavigationBarColorReturn).toEqual([
      API_SET_NAVIGATION_BAR_COLOR,
      expect.any(Function),
      SetNavigationBarColorProtocol,
      SetNavigationBarColorOptions,
    ])

    const fn = setNavigationBarColorReturn[1]
    expect(typeof fn).toBe('function')

    // mock call
    const options = { frontColor: '#000000', backgroundColor: '#ff0000' }
    fn(options, { resolve: jest.fn(), reject: jest.fn() })

    expect(updateStyle).toHaveBeenCalledTimes(1)

    const val1 = new Map<string, any | null>([
      [
        'navigationBarTextStyle',
        options.frontColor == '#000000' ? 'black' : 'white',
      ],
      ['navigationBarBackgroundColor', options.backgroundColor],
    ])
    expect(updateStyle).toHaveBeenCalledWith(val1)
  })
})
