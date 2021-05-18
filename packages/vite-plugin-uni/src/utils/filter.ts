import path from 'path'
import slash from 'slash'
import { createFilter } from '@rollup/pluginutils'
import { PUBLIC_DIR } from '@dcloudio/uni-cli-shared'

export function createPublicFileFilter(base: string = '/') {
  const publicDir = slash(path.join(base, PUBLIC_DIR + '/**/*'))
  const uniModulesDir = slash(
    path.join(base, 'uni_modules/*/' + PUBLIC_DIR + '/**/*')
  )
  return createFilter([publicDir, uniModulesDir])
}
