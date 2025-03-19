/**
 * uni-app内部extapi发行到ohpm的uni_modules组织下的包列表
 * 注意此列表会同时被框架编译器和用户项目编译器引用
 */

/**
 * TODO 允许部分provider内置？
 * 注意要考虑以下几点
 * 1. 用户未勾选的provider不可用
 * 2. provider文件内要依赖uni.api.ets、还要依赖uni-mp-sdk
 */
interface IExternalModule {
  name: string
  type: ExternalModuleType
  // subType?: ExternalModuleSubType
}

type ExternalModuleType = 'extapi' | 'provider'
// type ExternalModuleSubType = 'customElements' | 'components' | 'pages' | 'utssdk'

export const ExternalModules: IExternalModule[] = [
  {
    name: 'uni-payment-alipay',
    type: 'provider',
  },
  {
    name: 'uni-payment-huawei',
    type: 'provider',
  },
  {
    name: 'uni-oauth-huawei',
    type: 'provider',
  },
  {
    name: 'uni-payment-wxpay',
    type: 'provider',
  },
  {
    name: 'uni-getLocation-system',
    type: 'provider',
  },
  {
    name: 'uni-facialRecognitionVerify',
    type: 'extapi',
  },
  {
    name: 'uni-push',
    type: 'extapi',
  },
  {
    name: 'uni-verify',
    type: 'extapi',
  },
  {
    name: 'uni-map-tencent',
    type: 'extapi',
    // subType: 'components',
  },
]
export const ExternalModulesX = ExternalModules

// TODO 未来component类型的provider需要重构，比如uni-map-tencent需要依赖内置基础模块uni-map，先基于现状实现。
export const ComponentsWithProvider = []
export const ComponentsWithProviderX = ['uni-map']

export const ExtApiBlackListX = ['uni-pullDownRefresh']
export const ExtApiBlackList = [
  'uni-loadFontFace',
  'uni-getElementById',
  'uni-document',
  'uni-navigationBar',
  'uni-createWebviewContext',
  'uni-map-tencent',
  'uni-arrayBufferToBase64',
  'uni-base64ToArrayBuffer',
]
