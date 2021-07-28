import { DefinePlugin } from 'webpack'

export const define = new DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.VUE_APP_PLATFORM': JSON.stringify(process.env.UNI_PLATFORM),
  'process.env.UNI_CLOUD_PROVIDER': process.env.UNI_CLOUD_PROVIDER,
  'process.env.HBX_USER_TOKEN': JSON.stringify(
    process.env.HBX_USER_TOKEN || ''
  ),
  'process.env.UNI_AUTOMATOR_WS_ENDPOINT': JSON.stringify(
    process.env.UNI_AUTOMATOR_WS_ENDPOINT
  ),
})
