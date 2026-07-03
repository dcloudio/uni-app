import { init as initAndroidDom2Plugins } from './android-dom2'
import { init as initAndroidPlugins } from './android'
import { init as initIOSPlugins } from './ios'

export function initAndroidDom2() {
  import('./errorReporting')
  return initAndroidDom2Plugins()
}

export function initAndroid() {
  import('./errorReporting')
  return initAndroidPlugins()
}

export function initIOS() {
  import('./errorReporting')
  return initIOSPlugins()
}
