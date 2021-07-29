import { UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'
import {
  parseManifestJsonOnce,
  runByHBuilderX,
} from '../../../uni-cli-shared/dist'

export function createDefine({
  platform,
}: VitePluginUniResolvedOptions): UserConfig['define'] {
  const manifestJson = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
  return {
    __VUE_PROD_DEVTOOLS__: false,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.UNI_APP_ID': JSON.stringify(manifestJson.appid || ''),
    'process.env.UNI_APP_NAME': JSON.stringify(manifestJson.name || ''),
    'process.env.UNI_PLATFORM': JSON.stringify(platform),
    'process.env.RUN_BY_HBUILDERX': runByHBuilderX(),
  }
}
