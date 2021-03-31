import path from 'path'

import { createFilter } from '@rollup/pluginutils'
import { PUBLIC_DIR } from '@dcloudio/uni-cli-shared'

export function createPublicFileFilter(base: string = '/') {
  const publicDir = path.join(base, PUBLIC_DIR + '/**/*')
  const uniModulesDir = path.join(base, 'uni_modules/*/' + PUBLIC_DIR + '/**/*')
  return createFilter([publicDir, uniModulesDir])
}
