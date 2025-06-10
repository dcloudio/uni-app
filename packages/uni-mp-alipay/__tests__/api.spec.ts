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

import {
  request,
  showLoading,
  showModal,
  showToast,
} from '../src/api/protocols'

describe('api', () => {
  test('api-request base', () => {
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
    expect(data(undefined)).toEqual({
      name: 'data',
      value: '{}',
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

  test('api-alipay showModal', () => {
    global.my.canIUse = jest.fn().mockImplementation((api) => {
      if (api === 'showModal') {
        return true
      }
      return true
    })
    expect(typeof showModal).toBe('function')

    const args = showModal() as any

    expect(args).toEqual({
      name: 'showModal',
    })
  })

  test('api-dingding showModal', () => {
    global.my.canIUse = jest.fn().mockImplementation((api) => {
      if (api === 'showModal') {
        return false
      }
      return true
    })
    expect(typeof showModal).toBe('function')
    const args = showModal().args as any
    expect(typeof args).toBe('object')

    expect(args.cancelColor).toBe(false)
    expect(args.confirmColor).toBe(false)
  })

  test('api-alipay showLoading', () => {
    global.my.canIUse = jest.fn().mockImplementation((api) => {
      if (api === 'showLoading.object.mask') {
        return true
      }
      return true
    })

    expect(showLoading.args).toEqual({
      title: 'content',
      mask: 'mask',
    })
  })

  test('api-dingding showLoading', () => {
    global.my.canIUse = jest.fn().mockImplementation((api) => {
      if (api === 'showLoading.object.mask') {
        return false
      }
      return true
    })

    expect(showLoading.args.mask).toBe(false)
    expect(showLoading.args.title).toBe('content')
  })

  test('api-alipay showToast', () => {
    global.my.canIUse = jest.fn().mockImplementation((api) => {
      if (api === 'showToast') {
        return true
      }
      return true
    })

    expect(typeof showToast).toBe('function')
    const loadingArgs = showToast({ icon: 'loading' }) as any

    expect(loadingArgs.name).toEqual('showLoading')
    expect(loadingArgs.args).toEqual({
      title: 'content',
      mask: 'mask',
    })

    const toastArgs = showToast() as any

    expect(toastArgs.name).toEqual('showToast')
    expect(toastArgs.args).toEqual({
      icon: 'type',
      title: 'content',
      mask: 'mask',
      image: 'image',
    })
  })

  test('api-dingding showToast', () => {
    global.my.canIUse = jest.fn().mockImplementation((api) => {
      if (
        api === 'showLoading.object.mask' ||
        api === 'showToast.object.image' ||
        api === 'showToast.object.mask'
      ) {
        return false
      }
      return true
    })

    expect(typeof showToast).toBe('function')
    const loadingArgs = showToast({ icon: 'loading' }) as any

    expect(loadingArgs.name).toEqual('showLoading')
    expect(loadingArgs.args).toEqual({
      title: 'content',
      mask: false,
    })

    const toastArgs = showToast() as any

    expect(toastArgs.name).toEqual('showToast')
    expect(toastArgs.args).toEqual({
      icon: 'type',
      title: 'content',
      mask: false,
      image: false,
    })
  })
})
