import os from 'os'
import path from 'path'
import fs from 'fs-extra'
import { initEasycoms } from '../src/easycom'
import { getUTSCustomElement } from '../src/uts'

describe('easycom refresh', () => {
  const originalDom2 = process.env.UNI_APP_X_DOM2
  const originalCompileTarget = process.env.UNI_COMPILE_TARGET
  let inputDir = ''

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'easycom-refresh-'))
    fs.outputJsonSync(path.join(inputDir, 'pages.json'), {
      pages: [
        {
          path: 'pages/index/index',
        },
      ],
    })
    fs.outputFileSync(
      path.join(inputDir, 'pages/index/index.uvue'),
      '<template><view /></template>'
    )
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/test-plugin/customElements/uni-foo/uni-foo.uts'
      ),
      'export const UniFooElement = {}'
    )
  })

  afterEach(() => {
    process.env.UNI_APP_X_DOM2 = originalDom2
    process.env.UNI_COMPILE_TARGET = originalCompileTarget
    if (inputDir) {
      fs.removeSync(inputDir)
    }
  })

  test('dom2 refresh keeps customElements disabled', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    delete process.env.UNI_COMPILE_TARGET

    const ctx = initEasycoms(inputDir, {
      platform: 'app',
      dirs: [],
      isX: true,
    })

    expect(getUTSCustomElement('uni-foo')).toBeUndefined()

    ctx.refresh()

    expect(getUTSCustomElement('uni-foo')).toBeUndefined()
  })
})
