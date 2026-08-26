import type { OutputAsset } from 'rollup'
import type { Plugin } from 'vite'
import crypto from 'crypto'
import path from 'path'
import {
  addUTSEasyComAutoImports,
  isEnableSecureNetwork,
  normalizePath,
  resolveComponentsLibPath,
} from '@dcloudio/uni-cli-shared'
import { ENTRY_FILENAME, getUniCloudSpaceList } from './utils'

const uniCloudSpaceList = getUniCloudSpaceList()

function createObfuscatedStringDecoder(name: string, value: string): string {
  const data: number[] = []
  const mask: number[] = []
  const randomData = crypto.randomBytes(value.length * 2)

  for (let i = 0; i < value.length; i++) {
    const maskValue = randomData.readUInt16LE(i * 2)
    mask.push(maskValue)
    data.push(value.charCodeAt(i) ^ maskValue)
  }

  return `
function ${name}() : string {
    const data : Array<number> = ${JSON.stringify(data)}
    const mask : Array<number> = ${JSON.stringify(mask)}
    let result = ''
    for (let i = 0; i < data.length; i++) {
        result += String.fromCharCode(data[i] ^ mask[i])
    }
    return result
}
`
}

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

      if (bundle[ENTRY_FILENAME()]) {
        const inputDir = process.env.UNI_INPUT_DIR!
        const platform = process.env.UNI_UTS_PLATFORM!
        const isSecureNetworkEnabled = isEnableSecureNetwork(inputDir, platform)
        const asset = bundle[ENTRY_FILENAME()] as OutputAsset
        const spaceList = JSON.stringify(
          uniCloudSpaceList.map((item) => {
            const itemCopy = { ...item }
            delete itemCopy.workspaceFolder
            return itemCopy
          })
        )
        const spaceListDecoder = '__decodeUniCloudSpaceList'
        asset.source =
          asset.source +
          `
${createObfuscatedStringDecoder(spaceListDecoder, spaceList)}
export class UniCloudConfig extends io.dcloud.unicloud.InternalUniCloudConfig {
    override isDev : boolean = ${
      process.env.NODE_ENV === 'development' ? 'true' : 'false'
    }
    override spaceList : string = ${spaceListDecoder}()
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
