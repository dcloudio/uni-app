import fs from 'fs'
import path from 'path'
import {
  formatStyleIsolationVersionMessage,
  initVaporScriptLangEnv,
} from '../src/cli/utils'

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

describe('initVaporScriptLangEnv', () => {
  const originalScriptLang = process.env.UNI_APP_X_VAPOR_SCRIPT_LANG

  afterEach(() => {
    jest.restoreAllMocks()
    if (originalScriptLang === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_APP_X_VAPOR_SCRIPT_LANG')
    } else {
      process.env.UNI_APP_X_VAPOR_SCRIPT_LANG = originalScriptLang
    }
  })

  test.each([
    [true, 'true'],
    [false, 'false'],
  ] as const)('sets the script lang environment to %s', (exists, expected) => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(exists)

    initVaporScriptLangEnv('/project/src')

    expect(fs.existsSync).toHaveBeenCalledWith(
      path.resolve('/project/src', '.lang')
    )
    expect(process.env.UNI_APP_X_VAPOR_SCRIPT_LANG).toBe(expected)
  })
})
