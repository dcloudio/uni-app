import UniActionSheetPage from "@/uni_modules/uni-actionSheet/pages/actionSheet/actionSheet.vue";
import { defineAsyncApi, registerSystemRoute } from "@dcloudio/uni-runtime";
import { ShowActionSheet2, ShowActionSheet2Options } from "../interface.uts";


export const showActionSheet2: ShowActionSheet2 = defineAsyncApi('showActionSheet2', (
	options: ShowActionSheet2Options, { resolve, reject }
) => {
	registerSystemRoute('uni:actionSheet', UniActionSheetPage)

	const uuid = Date.now() + '' + Math.floor(Math.random() * 1e7)
	const baseEventName = `uni_action_sheet_${uuid}`
	const readyEventName = `${baseEventName}_ready`
	const optionsEventName = `${baseEventName}_options`
	const successEventName = `${baseEventName}_success`
	const failEventName = `${baseEventName}_fail`
	uni.$on(readyEventName, () => {
		uni.$emit(optionsEventName, options)
	})
	uni.$on(successEventName, (index: number) => {
		resolve({ tapIndex: index })
	})
	uni.$on(failEventName, () => {
		reject('cancel')
	})
	uni.openDialogPage({
		url: `uni:actionSheet?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
		fail: function (err) {
			options.fail?.({ errMsg: `showActionSheet:failed, ${err.errMsg}` })
			uni.$off(readyEventName)
			uni.$off(successEventName)
			uni.$off(failEventName)
		},
	})
})
