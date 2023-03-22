export function initNVue(
  manifestJson: Record<string, any>,
  pagesJson: UniApp.PagesJson
) {}

export function getNVueCompiler(manifestJson: Record<string, any>) {
  const platformOptions = manifestJson['app-plus']
  if (platformOptions) {
    const { nvueCompiler } = platformOptions
    if (nvueCompiler === 'weex') {
      return 'weex'
    }
    if (nvueCompiler === 'vue') {
      return 'vue'
    }
    if (nvueCompiler === 'vite') {
      return 'vite'
    }
  }
  return 'uni-app'
}

export function getNVueStyleCompiler(manifestJson: Record<string, any>) {
  const platformOptions = manifestJson['app-plus']
  if (platformOptions && platformOptions.nvueStyleCompiler === 'uni-app') {
    return 'uni-app'
  }
  return 'weex'
}

const flexDirs = ['row', 'row-reverse', 'column', 'column-reverse'] as const

type FlexDir = (typeof flexDirs)[number]

export function getNVueFlexDirection(manifestJson: Record<string, any>) {
  let flexDir: FlexDir = 'column'
  if (manifestJson['app-plus']?.nvue?.['flex-direction']) {
    flexDir = manifestJson['app-plus'].nvue['flex-direction'] as FlexDir
    if (flexDirs.indexOf(flexDir) === -1) {
      flexDir = 'column'
    }
  }
  return flexDir
}
