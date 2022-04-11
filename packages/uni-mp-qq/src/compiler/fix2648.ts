import path from 'path'
import fs from 'fs-extra'

import { OutputAsset, OutputBundle } from 'rollup'

let isFixed = false
export function fix2648(bundle: OutputBundle) {
  if (isFixed) {
    return
  }
  const appJsonAsset = bundle['app.json'] as OutputAsset
  if (!appJsonAsset) {
    return
  }
  try {
    const { usingComponents } = JSON.parse(appJsonAsset.source.toString()) as {
      usingComponents?: Record<string, string>
    }
    if (usingComponents && usingComponents['fix-2648']) {
      fs.outputFileSync(
        path.resolve(process.env.UNI_OUTPUT_DIR, 'fix-2648.json'),
        `{"component":true}`
      )
      fs.outputFileSync(
        path.resolve(process.env.UNI_OUTPUT_DIR, 'fix-2648.qml'),
        `<!-- https://github.com/dcloudio/uni-app/issues/2648 -->`
      )
      fs.outputFileSync(
        path.resolve(process.env.UNI_OUTPUT_DIR, 'fix-2648.js'),
        `Component({})`
      )
    }
    isFixed = true
  } catch {}
}
