import { selectChannel } from '../../../../src/public/pipeline/channel/selector'

import type { Channel } from '../../../../src/public/pipeline/types'

function makeChannel(
  name: '1.0' | '2.0' | 'image',
  available: boolean
): Channel {
  return {
    name,
    available: jest.fn(() => available),
    send: jest.fn(() => Promise.resolve()),
  }
}

describe('pipeline/channel/selector', () => {
  describe('version === "image"（公有版默认）', () => {
    test('image 可用 → image', () => {
      const image = makeChannel('image', true)
      const http = makeChannel('1.0', true)
      const ch = selectChannel({ image, http })
      expect(ch?.name).toBe('image')
    })

    test('未传 version 默认走 image 选择策略', () => {
      const image = makeChannel('image', true)
      const ch = selectChannel({ image })
      expect(ch?.name).toBe('image')
    })

    test('image 不可用 + http 可用 → 降级到 http（warn）', () => {
      const image = makeChannel('image', false)
      const http = makeChannel('1.0', true)
      const ch = selectChannel({ image, http })
      expect(ch?.name).toBe('1.0')
    })

    test('image 缺失（未注入）+ http 可用 → 静默走 http，不打 warn', () => {
      // 公有版默认场景：cloud 不构造、image 也未构造（极端测试），只走 http 兜底
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
      const http = makeChannel('1.0', true)
      const ch = selectChannel({ http })
      expect(ch?.name).toBe('1.0')
      expect(warn).not.toHaveBeenCalled()
      warn.mockRestore()
    })

    test('image / http 全不可用 → undefined', () => {
      const image = makeChannel('image', false)
      const http = makeChannel('1.0', false)
      const ch = selectChannel({ image, http })
      expect(ch).toBeUndefined()
    })

    test('image 不可用 + fallback=false → undefined（drop）', () => {
      const image = makeChannel('image', false)
      const http = makeChannel('1.0', true)
      const ch = selectChannel({ image, http, fallbackToHttp: false })
      expect(ch).toBeUndefined()
    })
  })

  describe('version === "2"（私有版兼容）', () => {
    test('cloud 可用 → cloud', () => {
      const cloud = makeChannel('2.0', true)
      const http = makeChannel('1.0', true)
      const ch = selectChannel({ version: '2', http, cloud })
      expect(ch?.name).toBe('2.0')
    })

    test('cloud 不可用 + fallback 默认 → http', () => {
      const cloud = makeChannel('2.0', false)
      const http = makeChannel('1.0', true)
      const ch = selectChannel({ version: '2', http, cloud })
      expect(ch?.name).toBe('1.0')
    })

    test('cloud 不可用 + http 不可用 → undefined', () => {
      const cloud = makeChannel('2.0', false)
      const http = makeChannel('1.0', false)
      const ch = selectChannel({ version: '2', http, cloud })
      expect(ch).toBeUndefined()
    })

    test('cloud 缺失 + fallback 默认 → http', () => {
      const http = makeChannel('1.0', true)
      const ch = selectChannel({ version: '2', http })
      expect(ch?.name).toBe('1.0')
    })

    test('cloud 不可用 + fallback=false → undefined', () => {
      const cloud = makeChannel('2.0', false)
      const http = makeChannel('1.0', true)
      const ch = selectChannel({
        version: '2',
        http,
        cloud,
        fallbackToHttp: false,
      })
      expect(ch).toBeUndefined()
    })
  })

  describe('version === "1"', () => {
    test('http 可用 → http', () => {
      const http = makeChannel('1.0', true)
      const ch = selectChannel({ version: '1', http })
      expect(ch?.name).toBe('1.0')
    })

    test('http 不可用 → undefined（不会去试 cloud 或 image）', () => {
      const http = makeChannel('1.0', false)
      const cloud = makeChannel('2.0', true)
      const image = makeChannel('image', true)
      const ch = selectChannel({ version: '1', http, cloud, image })
      expect(ch).toBeUndefined()
      expect(cloud.available).not.toHaveBeenCalled()
      expect(image.available).not.toHaveBeenCalled()
    })
  })
})
