import { selectChannel } from '../../../../public/pipeline/channel/selector'

import type { Channel } from '../../../../public/pipeline/types'

function makeChannel(name: '1.0' | '2.0', available: boolean): Channel {
  return {
    name,
    available: jest.fn(() => available),
    send: jest.fn(() => Promise.resolve()),
  }
}

describe('pipeline/channel/selector', () => {
  describe('version === "2"（默认）', () => {
    test('cloud 可用 → cloud', () => {
      const cloud = makeChannel('2.0', true)
      const http = makeChannel('1.0', true)
      const ch = selectChannel({ http, cloud })
      expect(ch?.name).toBe('2.0')
    })

    test('cloud 不可用 + fallback 默认 → http', () => {
      const cloud = makeChannel('2.0', false)
      const http = makeChannel('1.0', true)
      const ch = selectChannel({ http, cloud })
      expect(ch?.name).toBe('1.0')
    })

    test('cloud 不可用 + http 不可用 → undefined', () => {
      const cloud = makeChannel('2.0', false)
      const http = makeChannel('1.0', false)
      const ch = selectChannel({ http, cloud })
      expect(ch).toBeUndefined()
    })

    test('cloud 缺失 + fallback 默认 → http', () => {
      const http = makeChannel('1.0', true)
      const ch = selectChannel({ http })
      expect(ch?.name).toBe('1.0')
    })

    test('cloud 不可用 + fallback=false → undefined', () => {
      const cloud = makeChannel('2.0', false)
      const http = makeChannel('1.0', true)
      const ch = selectChannel({ http, cloud, fallbackToHttp: false })
      expect(ch).toBeUndefined()
    })
  })

  describe('version === "1"', () => {
    test('http 可用 → http', () => {
      const http = makeChannel('1.0', true)
      const ch = selectChannel({ version: '1', http })
      expect(ch?.name).toBe('1.0')
    })

    test('http 不可用 → undefined（不会去试 cloud）', () => {
      const http = makeChannel('1.0', false)
      const cloud = makeChannel('2.0', true)
      const ch = selectChannel({ version: '1', http, cloud })
      expect(ch).toBeUndefined()
      expect(cloud.available).not.toHaveBeenCalled()
    })
  })
})
