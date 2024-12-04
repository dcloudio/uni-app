import { registerSystemRoute } from "@dcloudio/uni-runtime";
import uniChooseLocationPage from "@/uni_modules/uni-chooseLocation/pages/chooseLocation/chooseLocation.vue";
import { ChooseLocation, ChooseLocationOptions, ChooseLocationSuccess, ChooseLocationFailImpl } from "../interface.uts"

export const chooseLocation: ChooseLocation = (options: ChooseLocationOptions ) => {
	registerSystemRoute("uni:chooseLocation", uniChooseLocationPage);

	const uuid = `${Date.now()}${Math.floor(Math.random() * 1e7)}`
	const baseEventName = `uni_choose_location_${uuid}`
	const readyEventName = `${baseEventName}_ready`
	const optionsEventName = `${baseEventName}_options`
	const successEventName = `${baseEventName}_success`
	const failEventName = `${baseEventName}_fail`
	uni.$on(readyEventName, () => {
		uni.$emit(optionsEventName, JSON.parse(JSON.stringify(options)))
	})
	uni.$on(successEventName, (result: ChooseLocationSuccess) => {
		options.success?.(result)
		options.complete?.(result)
	})
	uni.$on(failEventName, () => {
		options.fail?.(new ChooseLocationFailImpl())
		options.complete?.(new ChooseLocationFailImpl())
	})
	uni.openDialogPage({
		url: `uni:chooseLocation?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
		triggerParentHide: true,
		fail(err) {
			options.fail?.(new ChooseLocationFailImpl(`chooseLocation:fail ${err.errMsg}`, 4))
			options.complete?.(new ChooseLocationFailImpl(`chooseLocation:fail ${err.errMsg}`, 4))
			uni.$off(readyEventName)
			uni.$off(successEventName)
			uni.$off(failEventName)
		}
	})
};
