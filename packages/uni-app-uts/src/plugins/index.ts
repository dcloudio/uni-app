import type { PluginOption } from 'vite'
import { init as initAndroidDom2Plugins } from './android-dom2'
import { init as initAndroidPlugins } from './android'
import { init as initIOSPlugins } from './ios'

export function initAndroidDom2(): PluginOption[] {
  import('./errorReporting')
  return initAndroidDom2Plugins()
}

export function initAndroid(): PluginOption[] {
  import('./errorReporting')
  return initAndroidPlugins()
}

export function initIOS(): PluginOption[] {
  import('./errorReporting')
  return initIOSPlugins()
}
