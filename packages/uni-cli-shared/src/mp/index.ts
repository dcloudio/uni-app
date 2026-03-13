export * from './ast'
export * from './wxs'
export * from './nvue'
export * from './event'
export * from './style'
export * from './assets'
export * from './template'
export * from './constants'

export { HTML_TO_MINI_PROGRAM_TAGS } from './tags'
export {
  copyMiniProgramPluginJson,
  copyMiniProgramThemeJson,
  createCopyPluginTarget,
} from './plugin'
export {
  parseMainDescriptor,
  parseScriptDescriptor,
  parseTemplateDescriptor,
  transformDynamicImports,
  updateMiniProgramGlobalComponents,
  updateMiniProgramComponentsByMainFilename,
  updateMiniProgramComponentsByScriptFilename,
  updateMiniProgramComponentsByTemplateFilename,
  getGlobalComponentSource,
} from './usingComponents'
export {
  hasExternalClasses,
  parseExternalClasses,
  parseStyleIsolation,
  findMiniProgramComponentExternalClasses,
  updateMiniProgramComponentExternalClasses,
  updateMiniProgramComponentStyleIsolation,
  findMiniProgramComponentStyleIsolation,
  findPageExternalClasses,
  updatePageExternalClasses,
  addPageExternalClasses,
  clearPageExternalClasses,
  createDefaultSFCStyleBlock,
} from './externalClasses'
export type { PageExternalClassesInfo } from './externalClasses'
