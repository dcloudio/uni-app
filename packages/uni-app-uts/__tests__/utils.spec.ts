import type { CopyOptions } from '@dcloudio/uni-cli-shared'
import { createUniOptions } from '../src/plugins/utils'

function resolveCopyAssets(
  platform: 'app-android' | 'app-ios' | 'app-harmony'
) {
  const copyOptions = createUniOptions(platform)!
    .copyOptions as () => CopyOptions
  return copyOptions().assets
}

describe('createUniOptions', () => {
  test.each([
    ['app-android', 'libs'],
    ['app-harmony', 'libs'],
    ['app-ios', 'frameworks'],
  ] as const)('copy %s uasm resources', (platform, resourceDir) => {
    expect(resolveCopyAssets(platform)).toContain(
      `uni_modules/*/uasm/${platform}/${resourceDir}/**/*`
    )
  })
})
