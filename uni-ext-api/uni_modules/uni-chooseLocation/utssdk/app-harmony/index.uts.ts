import { ChooseLocationErrorCode, ChooseLocationSuccess, ChooseLocationFail, ChooseLocationComplete, ChooseLocationOptions, ChooseLocation, ChooseLocationSuccessImpl, ChooseLocationFailImpl } from "../interface.uts"

export { ChooseLocationErrorCode, ChooseLocationSuccess, ChooseLocationFail, ChooseLocationComplete, ChooseLocationOptions, ChooseLocation, ChooseLocationSuccessImpl, ChooseLocationFailImpl } from "../interface.uts"


export const chooseLocation : ChooseLocation = function (options : ChooseLocationOptions) {
  const uuid = Date.now() + '' + Math.floor(Math.random() * 1e7)
  const baseEventName = `uni_choose_location_${uuid}`
  const readyEventName = `${baseEventName}_ready`
  const optionsEventName = `${baseEventName}_options`
  const successEventName = `${baseEventName}_success`
  const failEventName = `${baseEventName}_fail`
  uni.$on(readyEventName, () => {
    uni.$emit(optionsEventName, JSON.parse(JSON.stringify(options)))
  })
  uni.$on(successEventName, (result : ChooseLocationSuccess) => {
    options?.success?.(result)
  })
  uni.$on(failEventName, () => {
    options.fail?.({ errMsg: `chooseLocation:fail cancel`, errCode: 1 } as ChooseLocationFail)
  })
  uni.openDialogPage({
    url: `/uni_modules/uni-chooseLocation/pages/chooseLocation/chooseLocation?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
    fail(err) {
      options.fail?.({ errMsg: `chooseLocation:fail`, errCode: 4 } as ChooseLocationFail)
      uni.$off(readyEventName)
      uni.$off(successEventName)
      uni.$off(failEventName)
    }
  })
};
