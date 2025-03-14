import path from 'path'
import { resolveUTSKotlinFilenameByClassName } from '../src/stacktrace/kotlin'

describe('uts:kotlin', () => {
  test('resolveUTSKotlinFileByClassName', () => {
    const cacheDir = path.resolve(
      __dirname,
      'examples/uni-app-x/output/cache/app-android'
    )
    expect(
      resolveUTSKotlinFilenameByClassName('GenPagesIndexIndex', { cacheDir })
    ).toBe('pages/index/index.kt')
    expect(
      resolveUTSKotlinFilenameByClassName('Demo', {
        cacheDir,
      })
    ).toBe('index.kt')
  })
})
