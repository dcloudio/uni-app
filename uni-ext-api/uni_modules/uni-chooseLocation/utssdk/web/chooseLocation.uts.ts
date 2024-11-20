import { defineAsyncApi, registerSystemRoute } from "@dcloudio/uni-runtime";
import uniChooseLocationPage from "@/uni_modules/uni-chooseLocation/pages/chooseLocation/chooseLocation.vue";
import { ChooseLocation, ChooseLocationOptions, ChooseLocationSuccess, ChooseLocationFail } from "../interface.uts"

export const chooseLocation: ChooseLocation = defineAsyncApi('chooseLocation', (
  options: ChooseLocationOptions, { resolve, reject }
) => {
  registerSystemRoute("uni:chooseLocation", uniChooseLocationPage);

  const uuid = Date.now() + '' + Math.floor(Math.random() * 1e7)
  const baseEventName = `uni_choose_location_${uuid}`
  const readyEventName = `${baseEventName}_ready`
  const optionsEventName = `${baseEventName}_options`
  const successEventName = `${baseEventName}_success`
  const failEventName = `${baseEventName}_fail`
  uni.$on(readyEventName, () => {
    uni.$emit(optionsEventName, JSON.parse(JSON.stringify(options)))
  })
  uni.$on(successEventName, (result: ChooseLocationSuccess) => {
    resolve(result)
  })
  uni.$on(failEventName, () => {
    reject('cancel', {
			errCode: 1
		})
  })
  uni.openDialogPage({
    url: `uni:chooseLocation?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
    fail(err) {
      options.fail?.({ errMsg: `chooseLocation:fail ${err.errMsg}`, errCode: 4 } as ChooseLocationFail)
      uni.$off(readyEventName)
      uni.$off(successEventName)
      uni.$off(failEventName)
    }
  })
});
