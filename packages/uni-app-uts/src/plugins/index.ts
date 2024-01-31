import { init as initAndroidPlugins } from './android'
import { init as initIOSPlugins } from './ios'

export function initAndroid() {
  import('./errorReporting')
  return initAndroidPlugins()
}

export function initIOS() {
  import('./errorReporting')
  return initIOSPlugins()
}
