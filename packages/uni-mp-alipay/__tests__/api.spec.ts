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

import { request } from '../src/api/protocols'

describe('api', () => {
  test(' request', () => {
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
      value: { 'Content-Type': 'application/json;charset=UTF-8' },
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
  test('ding request no header', () => {
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
      value: { 'Content-Type': 'application/json' },
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
  test('ding request no body', () => {
    expect(typeof request.args).toBe('function')

    const { header, data } = request.args({
      url: 'https://www.example.com',
      method: 'POST',
    })
    expect(header()).toEqual({
      name: 'headers',
      value: { 'Content-Type': 'application/json' },
    })
    expect(data(undefined)).toEqual({
      name: 'data',
      value: '{}',
    })
  })

  test('alipay request no header', () => {
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
  test('alipay request no body', () => {
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
