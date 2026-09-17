/// <reference path="../node_modules/mini-types/types/api/index.d.ts" />

// type IA = my.IGetAuthCodeOptions

jest.mock('@dcloudio/uni-mp-core', () => {
  return {
    navigateTo: jest.fn(),
    addSafeAreaInsets: jest.fn(),
    isSyncApi: jest.fn(),
    populateParameters: jest.fn(),
    useDeviceId: jest.fn(),
    getAppBaseInfo: { returnValue: jest.fn() },
    getWindowInfo: { returnValue: jest.fn() },
    getDeviceInfo: { returnValue: jest.fn() },
    redirectTo: jest.fn(),
    onError: jest.fn(),
    offError: jest.fn(),
    onSocketOpen: jest.fn(),
    onSocketMessage: jest.fn(),
  }
})
jest.mock('../src/api/shims', () => {
  return {
    getStorageSync: jest.fn(),
  }
})

global.my = {
  ...global.my,
  request: jest.fn(),
  canIUse: jest.fn().mockImplementation((api) => {
    if (
      api === 'getAppBaseInfo' ||
      api === 'getWindowInfo' ||
      api === 'getDeviceBaseInfo'
    ) {
      return false
    }
    if (api === 'saveFileToDingTalk') {
      return true
    }

    return true
  }),
}

import {
  getAppBaseInfo as coreGetAppBaseInfo,
  getDeviceInfo as coreGetDeviceInfo,
  getWindowInfo as coreGetWindowInfo,
} from '@dcloudio/uni-mp-core'
import {
  getAppBaseInfo,
  getDeviceInfo,
  getWindowInfo,
  request,
} from '../src/api/protocols'

describe('api', () => {
  test('系统信息拆分 API 不可用时回退并保留 core 协议', () => {
    expect(my.canIUse).toHaveBeenCalledWith('getAppBaseInfo')
    expect(my.canIUse).toHaveBeenCalledWith('getWindowInfo')
    expect(my.canIUse).toHaveBeenCalledWith('getDeviceBaseInfo')
    expect(getAppBaseInfo).toEqual({
      ...coreGetAppBaseInfo,
      name: 'getSystemInfoSync',
    })
    expect(getWindowInfo).toEqual({
      ...coreGetWindowInfo,
      name: 'getSystemInfoSync',
    })
    expect(getDeviceInfo).toEqual({
      ...coreGetDeviceInfo,
      name: 'getSystemInfoSync',
    })
  })

  test('api-request base-object-data', () => {
    expect(typeof request.args).toBe('function')

    const { header, data } = request.args({
      url: 'https://www.example.com',
      method: 'POST',
      header: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: {
        type: 'abc',
      },
    })
    expect(header()).toEqual({
      name: 'headers',
      value: { 'content-type': 'application/json;charset=UTF-8' },
    })
    expect(
      data({
        type: 'abc',
      })
    ).toEqual({
      name: 'data',
      value: '{"type":"abc"}',
    })
  })
  test('api-request ding request no header', () => {
    expect(typeof request.args).toBe('function')

    const { header, data } = request.args({
      url: 'https://www.example.com',
      method: 'POST',
      data: {
        type: 'abc',
      },
    })
    expect(header()).toEqual({
      name: 'headers',
      value: { 'content-type': 'application/json' },
    })
    expect(
      data({
        type: 'abc',
      })
    ).toEqual({
      name: 'data',
      value: '{"type":"abc"}',
    })

    const fetchRes2 = request.args({
      url: 'https://www.example.com',
      method: 'POST',
      data: [1, { id: 2 }],
    })
    expect(fetchRes2.header()).toEqual({
      name: 'headers',
      value: { 'content-type': 'application/json' },
    })
    expect(fetchRes2.data([1, { id: 2 }])).toEqual({
      name: 'data',
      value: '[1,{"id":2}]',
    })
  })
  test('api-request ding request no body', () => {
    expect(typeof request.args).toBe('function')

    const { header, data } = request.args({
      url: 'https://www.example.com',
      method: 'POST',
    })
    expect(header()).toEqual({
      name: 'headers',
      value: { 'content-type': 'application/json' },
    })

    expect(data(null)).toEqual({
      name: 'data',
      value: null,
    })
    expect(data(undefined)).toEqual({
      name: 'data',
      value: undefined,
    })
    expect(data(1)).toEqual({
      name: 'data',
      value: 1,
    })
    expect(data('1')).toEqual({
      name: 'data',
      value: '1',
    })
    expect(data(true)).toEqual({
      name: 'data',
      value: true,
    })
    expect(data(false)).toEqual({
      name: 'data',
      value: false,
    })
  })

  test('api-request alipay request no header', () => {
    global.my = {
      ...global.my,
      request: jest.fn(),
      canIUse: jest.fn().mockImplementation((api) => {
        if (api === 'saveFileToDingTalk') {
          return false
        }

        return true
      }),
    }
    expect(typeof request.args).toBe('function')

    const { header, data } = request.args({
      url: 'https://www.example.com',
      method: 'POST',
      data: {
        type: 'abc',
      },
    })
    expect(header()).toEqual({
      name: 'headers',
      value: { 'content-type': 'application/json' },
    })
    expect(
      data({
        type: 'abc',
      })
    ).toEqual({
      name: 'data',
      value: { type: 'abc' },
    })
  })
  test('api-request alipay request no body', () => {
    global.my = {
      ...global.my,
      request: jest.fn(),
      canIUse: jest.fn().mockImplementation((api) => {
        if (api === 'saveFileToDingTalk') {
          return false
        }

        return true
      }),
    }
    expect(typeof request.args).toBe('function')

    const { header, data } = request.args({
      url: 'https://www.example.com',
      method: 'POST',
    })
    expect(header()).toEqual({
      name: 'headers',
      value: { 'content-type': 'application/json' },
    })
    expect(data(undefined)).toEqual({
      name: 'data',
      value: undefined,
    })
  })
})
