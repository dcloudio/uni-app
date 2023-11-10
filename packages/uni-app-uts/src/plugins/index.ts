import { AutoImportOptions } from '@dcloudio/uni-cli-shared'
import { init as initAndroidPlugins } from './android'
import { init as initIOSPlugins } from './ios'

export function initAndroid(options: {
  autoImportOptions?: AutoImportOptions
}) {
  import('./errorReporting')
  return initAndroidPlugins(options)
}

export function initIOS() {
  import('./errorReporting')
  return initIOSPlugins()
}
