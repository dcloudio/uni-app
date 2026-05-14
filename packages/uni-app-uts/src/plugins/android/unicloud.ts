import type { Plugin } from 'vite'
import path from 'path'
import {
  addUTSEasyComAutoImports,
  isEnableSecureNetwork,
  normalizePath,
  resolveComponentsLibPath,
} from '@dcloudio/uni-cli-shared'
import { ENTRY_FILENAME, getUniCloudSpaceList } from './utils'

const uniCloudSpaceList = getUniCloudSpaceList()

export function uniCloudPlugin(): Plugin {
  if (
    !(
      process.env.UNI_COMPILE_TARGET === 'ext-api' &&
      process.env.UNI_APP_NEXT_WORKSPACE
    )
  ) {
    addUTSEasyComAutoImports(
      normalizePath(
        path.resolve(resolveComponentsLibPath(), 'unicloud-db', 'index.uts')
      ),
      ['mixinDatacom', 'uniCloudMixinDatacom']
    )
  }
  return {
    name: 'uni:app-unicloud',
    apply: 'build',
    generateBundle(_, bundle) {
      if (uniCloudSpaceList.length === 0) {
        return
      }

      const asset = bundle[ENTRY_FILENAME()]
      if (asset?.type === 'asset' && asset.source != null) {
        const inputDir = process.env.UNI_INPUT_DIR!
        const platform = process.env.UNI_UTS_PLATFORM!
        const isSecureNetworkEnabled = isEnableSecureNetwork(inputDir, platform)
        asset.source =
          asset.source +
          `
export class UniCloudConfig extends io.dcloud.unicloud.InternalUniCloudConfig {
    override isDev : boolean = ${
      process.env.NODE_ENV === 'development' ? 'true' : 'false'
    }
    override spaceList : string = ${JSON.stringify(
      JSON.stringify(
        uniCloudSpaceList.map((item) => {
          const itemCopy = { ...item }
          delete itemCopy.workspaceFolder
          return itemCopy
        })
      )
    )}
    override debuggerInfo ?: string = ${JSON.stringify(
      process.env.UNICLOUD_DEBUG || null
    )}
    override secureNetworkEnable : boolean = ${JSON.stringify(
      isSecureNetworkEnabled || false
    )}
    override secureNetworkConfig ?: string = ${JSON.stringify(
      process.env.UNI_SECURE_NETWORK_CONFIG || '[]'
    )}
    constructor() { super() }
}
`
      }
    },
  }
}
