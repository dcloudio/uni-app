// import { elemInArray } from '../../helpers/protocol'

export const API_CREATE_ANIMATION = 'createAnimation'
export type API_TYPE_CREATE_ANIMATION = typeof uni.createAnimation
export type API_TYPE_CREATE_ANIMATION_Timing_Function =
  UniApp.CreateAnimationOptions['timingFunction']
// const timingFunctions: API_TYPE_CREATE_ANIMATION_Timing_Function[] = [
//   'linear',
//   'ease',
//   'ease-in',
//   'ease-in-out',
//   'ease-out',
//   'step-start',
//   'step-end',
// ]

export const CreateAnimationOptions: ApiOptions<API_TYPE_CREATE_ANIMATION> = {
  // 目前参数校验不支持此api校验
  formatArgs: {
    /* duration: 400,
    timingFunction(timingFunction, params) {
      params.timingFunction = elemInArray(timingFunction, timingFunctions)
    },
    delay: 0,
    transformOrigin: '50% 50% 0', */
  },
}

export const CreateAnimationProtocol: ApiProtocol<API_TYPE_CREATE_ANIMATION> = {
  duration: Number,
  timingFunction: String as any,
  delay: Number,
  transformOrigin: String,
}
