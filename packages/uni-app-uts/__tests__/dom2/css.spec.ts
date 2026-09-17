import { isAnimationEnabled } from '../../src/plugins/dom2/css'

describe('dom2 css plugin', () => {
  const originalInputDir = process.env.UNI_INPUT_DIR

  afterEach(() => {
    if (originalInputDir === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_INPUT_DIR')
    } else {
      process.env.UNI_INPUT_DIR = originalInputDir
    }
  })

  test('supports missing UNI_INPUT_DIR', () => {
    Reflect.deleteProperty(process.env, 'UNI_INPUT_DIR')

    expect(isAnimationEnabled()).toBe(false)
  })
})
