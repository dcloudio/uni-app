import { ChooseLocation, ChooseLocationOptions, ChooseLocationSuccessImpl, ChooseLocationFailImpl } from "../interface.uts"

export const chooseLocation: ChooseLocation = (options: ChooseLocationOptions) => {
	const uuid = `${Date.now()}${Math.floor(Math.random() * 1e7)}`
	const baseEventName = `uni_choose_location_${uuid}`
	const readyEventName = `${baseEventName}_ready`
	const optionsEventName = `${baseEventName}_options`
	const successEventName = `${baseEventName}_success`
	const failEventName = `${baseEventName}_fail`
	uni.$on(readyEventName, (...options: any) => {
		uni.$emit(optionsEventName, JSON.parse(JSON.stringify(options)!))
	})
	uni.$on(successEventName, (...res: any) => {
		const mapRes = res[0] as Map<string, any>
		const result = new ChooseLocationSuccessImpl(mapRes.get('name') as string, mapRes.get('address') as string, mapRes.get('latitude') as number, mapRes.get('longitude') as number)
		options.success?.(result)
		options.complete?.(result)
	})
	uni.$on(failEventName, (..._: any) => {
		options.fail?.(new ChooseLocationFailImpl())
		options.complete?.(new ChooseLocationFailImpl())
	})
	uni.openDialogPage({
		url: `uni:chooseLocation?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
		fail(err) {
			options.fail?.(new ChooseLocationFailImpl(`chooseLocation:fail ${err.errMsg}`, 4))
			options.complete?.(new ChooseLocationFailImpl(`chooseLocation:fail ${err.errMsg}`, 4))
			uni.$off(readyEventName)
			uni.$off(successEventName)
			uni.$off(failEventName)
		}
	})
};
