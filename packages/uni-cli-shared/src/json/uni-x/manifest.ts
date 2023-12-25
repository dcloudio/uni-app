import { isPlainObject } from '@vue/shared'

const flexDirs = ['row', 'row-reverse', 'column', 'column-reverse'] as const

export function parseUniXFlexDirection(manifestJson: Record<string, any>) {
  const flexDir = manifestJson?.['uni-app-x']?.['flex-direction']
  if (flexDir && flexDirs.includes(flexDir)) {
    return flexDir
  }
  return 'column'
}

export function parseUniXSplashScreen(manifestJson: Record<string, any>) {
  const splashScreen = manifestJson?.['app']?.['splashScreen']
  if (isPlainObject(splashScreen)) {
    return splashScreen
  }
  return false
}
