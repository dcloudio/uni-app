import type { OutputAsset } from 'rollup'
import type { Plugin } from 'vite'
import { ENTRY_FILENAME } from './utils'

let uniCloudSpaces: Array<any> = []

function initUniCloudSpaces() {
  if (!process.env.UNI_CLOUD_SPACES) {
    return
  }
  try {
    const spaces = JSON.parse(process.env.UNI_CLOUD_SPACES)
    if (!Array.isArray(spaces)) {
      return
    }
    uniCloudSpaces = spaces.map((space) => {
      if (space.provider === 'tcb') {
        space.provider = 'tencent'
      }
      if (space.clientSecret) {
        return {
          provider: space.provider || 'aliyun',
          spaceName: space.name,
          spaceId: space.id,
          clientSecret: space.clientSecret,
          endpoint: space.apiEndpoint,
        }
      } else {
        return {
          provider: space.provider || 'tencent',
          spaceName: space.name,
          spaceId: space.id,
        }
      }
    })
  } catch (error) {}
}
initUniCloudSpaces()

export function uniCloudPlugin(): Plugin {
  return {
    name: 'uni:app-unicloud',
    apply: 'build',
    generateBundle(_, bundle) {
      if (uniCloudSpaces.length === 0) {
        return
      }
      if (bundle[ENTRY_FILENAME]) {
        const asset = bundle[ENTRY_FILENAME] as OutputAsset
        asset.source =
          asset.source +
          `
import "uts.sdk.modules.unicloudClientSdk.InternalUniCloudConfig"
export class UniCloudConfig extends InternalUniCloudConfig {
    override isDev : boolean = ${
      process.env.NODE_ENV === 'development' ? 'true' : 'false'
    }
    override spaceList : string = ${JSON.stringify(
      JSON.stringify(uniCloudSpaces)
    )}
    override debuggerInfo ?: string = ${JSON.stringify(
      process.env.UNICLOUD_DEBUG || '{}'
    )}
    override secureNetworkEnable : boolean = false
    override secureNetworkConfig ?: string = ""
    constructor() {}
}
`
      }
    },
  }
}
