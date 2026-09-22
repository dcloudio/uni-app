import { formatStyleIsolationVersionMessage } from '../src/cli/utils'

describe('formatStyleIsolationVersionMessage', () => {
  test.each(['1', '2.1', '3'])(
    'recommends upgrading style isolation version %s',
    (version) => {
      const message = formatStyleIsolationVersionMessage(version)

      expect(message).toContain('2.0')
      expect(message).toMatch(/recommended|推荐/i)
    }
  )

  test.each([
    ['2', '2.0'],
    ['2.0', '2.0'],
  ])(
    'does not recommend upgrading style isolation version %s',
    (version, displayVersion) => {
      const message = formatStyleIsolationVersionMessage(version)

      expect(message).toContain(displayVersion)
      expect(message).not.toMatch(/recommended|推荐/i)
    }
  )
})
