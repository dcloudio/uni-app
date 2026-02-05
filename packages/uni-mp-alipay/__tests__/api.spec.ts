/// <reference path="../node_modules/mini-types/types/api/index.d.ts" />

// type IA = my.IGetAuthCodeOptions

jest.mock('@dcloudio/uni-mp-core', () => {
  return {
    navigateTo: jest.fn(),
    addSafeAreaInsets: jest.fn(),
    isSyncApi: jest.fn(),
    populateParameters: jest.fn(),
    useDeviceId: jest.fn(),
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
    if (api === 'saveFileToDingTalk') {
      return true
    }

    return true
  }),
}

import { request, showModal } from '../src/api/protocols'

describe('api', () => {
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

  // 目前不区分 dingding/alipay
  test('api-dingding showModal', () => {
    expect(typeof showModal).toBe('function')

    const result = showModal() as any
    expect(result.name).toBe('confirm')
    expect(typeof result.args).toBe('function')

    const fromArgs = { cancelText: '取消按钮' }
    const toArgs: any = {}
    result.args(fromArgs, toArgs)

    expect(toArgs.cancelButtonText).toBe('取消按钮')
    expect(toArgs.confirmButtonText).toBe('确定')
  })
})
