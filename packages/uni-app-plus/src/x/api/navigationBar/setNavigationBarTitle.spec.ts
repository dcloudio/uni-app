const API_SET_NAVIGATION_BAR_TITLE = '1'
const SetNavigationBarTitleProtocol = {}

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
    API_SET_NAVIGATION_BAR_TITLE,
    SetNavigationBarTitleProtocol,
    defineAsyncApi: mockdefineAsyncApi,
  }
})

import { setNavigationBarTitle as setNavigationBarTitleReturn } from './setNavigationBarTitle'

describe('test:setNavigationBarTitle', () => {
  it('should setNavigationBarTitle', async () => {
    const [name, fn, protocol, options] = setNavigationBarTitleReturn as any

    expect(typeof name).toBe('string')
    expect(typeof fn).toBe('function')
    expect(typeof protocol).toBe('object')
    expect(typeof options).toBe('undefined')

    const mockOptions = {
      title: 'test',
    }

    const resolve = jest.fn()

    fn(mockOptions, { resolve, reject: jest.fn() })
    expect(updateStyle).toHaveBeenCalledTimes(1)
    expect(updateStyle).toHaveBeenCalledWith(
      new Map([['navigationBarTitleText', mockOptions.title]])
    )
    expect(resolve).toHaveBeenCalledTimes(1)
  })
})
