import { ChooseLocation, ChooseLocationOptions, ChooseLocationSuccessImpl, ChooseLocationFailImpl } from "../interface.uts"

export const chooseLocation: ChooseLocation = (options: ChooseLocationOptions) => {
	const uuid = `${Date.now()}${Math.floor(Math.random() * 1e7)}`
	const baseEventName = `uni_choose_location_${uuid}`
	const readyEventName = `${baseEventName}_ready`
	const optionsEventName = `${baseEventName}_options`
	const successEventName = `${baseEventName}_success`
	const failEventName = `${baseEventName}_fail`
	uni.$on(readyEventName, (..._: any) => {
		uni.$emit(optionsEventName, JSON.parse(JSON.stringify(options)!))
	})
	uni.$on(successEventName, (...res: any) => {
		const resObj = res[0] as UTSJSONObject
		const name = resObj['name'] as string
		const address = resObj['address'] as string
		const latitude = resObj['latitude'] as number
		const longitude = resObj['longitude'] as number
		const result = new ChooseLocationSuccessImpl(name, address, latitude, longitude)
		options.success?.(result)
		options.complete?.(result)
	})
	uni.$on(failEventName, (..._: any) => {
		options.fail?.(new ChooseLocationFailImpl())
		options.complete?.(new ChooseLocationFailImpl())
	})
	uni.openDialogPage({
		url: `/uni_modules/uni-chooseLocation/pages/chooseLocation/chooseLocation?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
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
