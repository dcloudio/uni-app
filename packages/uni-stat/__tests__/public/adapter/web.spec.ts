import {
  __resetCache,
  getWebDomain,
  getWebInfo,
} from '../../../src/public/adapter/web'
import { restoreMockUni } from '../helpers/mockUni'

describe('adapter/web', () => {
  const env = process.env as Record<string, string | undefined>

  afterEach(() => {
    __resetCache()
    restoreMockUni()
    delete env.UNI_PLATFORM
    delete (globalThis as { location?: unknown }).location
  })

  test('非 H5 平台返回空串', () => {
    env.UNI_PLATFORM = 'mp-weixin'
    ;(
      globalThis as {
        location?: { origin: string; protocol: string; hostname: string }
      }
    ).location = {
      origin: 'https://should-not-read.com',
      protocol: 'https:',
      hostname: 'should-not-read.com',
    }
    expect(getWebInfo()).toEqual({ domain: '' })
    expect(getWebDomain()).toBe('')
  })

  test('H5 优先读取 location.origin（https）', () => {
    env.UNI_PLATFORM = 'h5'
    ;(
      globalThis as {
        location?: { origin: string; protocol: string; hostname: string }
      }
    ).location = {
      origin: 'https://www.example.com',
      protocol: 'https:',
      hostname: 'www.example.com',
    }
    expect(getWebInfo()).toEqual({ domain: 'https://www.example.com' })
    expect(getWebDomain()).toBe('https://www.example.com')
  })

  test('H5 识别 http 协议', () => {
    env.UNI_PLATFORM = 'h5'
    ;(
      globalThis as {
        location?: { origin: string; protocol: string; host: string }
      }
    ).location = {
      origin: 'http://localhost:8080',
      protocol: 'http:',
      host: 'localhost:8080',
    }
    expect(getWebDomain()).toBe('http://localhost:8080')
  })

  test('H5 无 origin 时由 protocol + host 拼装', () => {
    env.UNI_PLATFORM = 'h5'
    ;(
      globalThis as {
        location?: { protocol: string; host: string; hostname: string }
      }
    ).location = {
      protocol: 'https:',
      host: 'api.example.com',
      hostname: 'api.example.com',
    }
    expect(getWebDomain()).toBe('https://api.example.com')
  })

  test('H5 无 location 时返回空串', () => {
    env.UNI_PLATFORM = 'h5'
    delete (globalThis as { location?: unknown }).location
    expect(getWebInfo()).toEqual({ domain: '' })
  })

  test('H5 非 http/https 协议返回空串', () => {
    env.UNI_PLATFORM = 'h5'
    ;(
      globalThis as {
        location?: { origin: string; protocol: string; hostname: string }
      }
    ).location = {
      origin: 'file://',
      protocol: 'file:',
      hostname: '',
    }
    expect(getWebDomain()).toBe('')
  })

  test('H5 结果缓存', () => {
    env.UNI_PLATFORM = 'h5'
    const loc = {
      origin: 'https://cached.example.com',
      protocol: 'https:',
      hostname: 'cached.example.com',
    }
    ;(globalThis as { location?: typeof loc }).location = loc
    expect(getWebDomain()).toBe('https://cached.example.com')
    loc.origin = 'http://changed.example.com'
    loc.protocol = 'http:'
    expect(getWebDomain()).toBe('https://cached.example.com')
  })
})
