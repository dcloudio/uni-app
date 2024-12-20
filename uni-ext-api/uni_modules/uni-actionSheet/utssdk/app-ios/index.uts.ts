import { ShowActionSheet, ShowActionSheetOptions, ShowActionSheetSuccessImpl, ShowActionSheetFailImpl } from "../interface.uts";


export const showActionSheet: ShowActionSheet = (options: ShowActionSheetOptions) => {
	const uuid = `${Date.now()}${Math.floor(Math.random() * 1e7)}`
	const baseEventName = `uni_action_sheet_${uuid}`
	const readyEventName = `${baseEventName}_ready`
	const optionsEventName = `${baseEventName}_options`
	const successEventName = `${baseEventName}_success`
	const failEventName = `${baseEventName}_fail`
	uni.$on(readyEventName, () => {
		uni.$emit(optionsEventName, JSON.parse(JSON.stringify(options)!))
	})
	uni.$on(successEventName, (index: number) => {
		const res = new ShowActionSheetSuccessImpl(index)
		options.success?.(res)
		options.complete?.(res)
	})
	uni.$on(failEventName, () => {
		const res = new ShowActionSheetFailImpl()
		options.fail?.(res)
		options.complete?.(res)
	})
	uni.openDialogPage({
		url: `uni:actionSheet?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
		fail: function (err) {
			const res = new ShowActionSheetFailImpl(`showActionSheet failed, ${err.errMsg}`)
			options.fail?.(res)
			options.complete?.(res)
			uni.$off(readyEventName)
			uni.$off(successEventName)
			uni.$off(failEventName)
		},
	})
}

export const hideActionSheet = () => {
	const pages = getCurrentPages()
	const currentPage = pages[pages.length - 1]
	if(currentPage == null) return
	const systemDialogPages = currentPage.getDialogPages('systemDialog')
	systemDialogPages.forEach((page) => {
		if (page.route == 'uni:actionSheet') {
			page.close(new Map<string, any>())
		}
	})
}

