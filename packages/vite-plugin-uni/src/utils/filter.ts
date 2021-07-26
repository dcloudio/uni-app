import path from 'path'
import { createFilter } from '@rollup/pluginutils'
import { normalizePath, PUBLIC_DIR } from '@dcloudio/uni-cli-shared'

export function createPublicFileFilter(base: string = '/') {
  const publicDir = normalizePath(path.join(base, PUBLIC_DIR + '/**/*'))
  const uniModulesDir = normalizePath(
    path.join(base, 'uni_modules/*/' + PUBLIC_DIR + '/**/*')
  )
  return createFilter([publicDir, uniModulesDir])
}
