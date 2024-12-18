import { registerSystemRoute, getCurrentPage, isSystemActionSheetDialogPage } from '@dcloudio/uni-runtime'
import UniActionSheetPage from "@/uni_modules/uni-actionSheet/pages/actionSheet/actionSheet.vue";
import { ShowActionSheet2, ShowActionSheet2Options, ShowActionSheetSuccessImpl, ShowActionSheetFailImpl, } from "../interface.uts";

export const showActionSheet2: ShowActionSheet2 = (options: ShowActionSheet2Options) => {
	registerSystemRoute("uni:actionSheet", UniActionSheetPage);

	const uuid = `${Date.now()}${Math.floor(Math.random() * 1e7)}`
	const baseEventName = `uni_action_sheet_${uuid}`
	const readyEventName = `${baseEventName}_ready`
	const optionsEventName = `${baseEventName}_options`
	const successEventName = `${baseEventName}_success`
	const failEventName = `${baseEventName}_fail`
	uni.$on(readyEventName, () => {
		uni.$emit(optionsEventName, options)
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
		fail(err) {
			const res = new ShowActionSheetFailImpl(`showActionSheet failed, ${err.errMsg}`)
			options.fail?.(res)
			options.complete?.(res)
			uni.$off(readyEventName)
			uni.$off(successEventName)
			uni.$off(failEventName)
		}
	})
};

export const hideActionSheet2 = () => {
	const currentPage = getCurrentPage() as unknown as UniPage
	if (!currentPage) return
	const systemDialogPages = currentPage.vm.$pageLayoutInstance?.$systemDialogPages.value
	for (let i = 0;i < systemDialogPages.length;i++) {
		if (isSystemActionSheetDialogPage(systemDialogPages[i])) {
			systemDialogPages.splice(i, 1)
			return
		}
	}
}
