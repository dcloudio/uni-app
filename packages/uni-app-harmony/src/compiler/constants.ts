// type ExternalModuleSubType = 'customElements' | 'components' | 'pages' | 'utssdk'

// TODO 未来component类型的provider需要重构，比如uni-map-tencent需要依赖内置基础模块uni-map，先基于现状实现。
export const ComponentsWithProvider = []
export const ComponentsWithProviderX = ['uni-map']

export const ExtApiBlackListX = ['uni-pullDownRefresh']
export const ExtApiBlackListDom2 = [
  ...ExtApiBlackListX,
  'uni-createWebviewContext',
]
export const ExtApiBlackList = [
  'uni-loadFontFace',
  'uni-getElementById',
  'uni-document',
  'uni-navigationBar',
  'uni-createWebviewContext',
  'uni-map-tencent',
  'uni-arrayBufferToBase64',
  'uni-base64ToArrayBuffer',
  'uni-privacy',
  'uni-showLoading',
]
