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
interface IStandaloneExtApi {
  name: string
  type: 'extapi' | 'provider'
}

export const StandaloneExtApi: IStandaloneExtApi[] = [
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
    name: 'uni-facialRecognitionVerify',
    type: 'extapi',
  },
  {
    name: 'uni-push',
    type: 'extapi',
  },
]
