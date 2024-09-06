/**
 * uni-app内部extapi发行到ohpm的uni_modules组织下的包列表
 * 注意此列表会同时被框架编译器和用户项目编译器引用
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
    name: 'uni-facialRecognitionVerify',
    type: 'extapi',
  },
]
