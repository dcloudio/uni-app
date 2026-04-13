import {
	ShowModal,
	ShowModalOptions,
	ShowModalSuccessImpl,
	ShowModalFailImpl,
	ModalPage,
	HideModal,
	HideModalOptions,
	HideModalSuccessImpl,
	HideModalFailImpl,
	
} from './interface.uts'

export const showModal: ShowModal = (options?: ShowModalOptions | null) => {
	const uuid = `${Date.now()}${Math.floor(Math.random() * 1e7)}`
	const baseEventName = `uni_modal_${uuid}`
	const readyEventName = `${baseEventName}_ready`
	const optionsEventName = `${baseEventName}_options`
	const successEventName = `${baseEventName}_success`
	const failEventName = `${baseEventName}_fail`
	uni.$on(readyEventName, () => {
		uni.$emit(optionsEventName, options != null ? JSON.parse(JSON.stringify(options)!) : {})
	})
	uni.$on(successEventName, (inputParamStr: string) => {
		const inputParam = JSON.parse(inputParamStr)! as UTSJSONObject
		const res = new ShowModalSuccessImpl(
			inputParam["cancel"] as boolean,
			inputParam["confirm"] as boolean,
			inputParam["content"] as string | null,
		)
		options?.success?.(res)
		options?.complete?.(res)
	})
	uni.$on(failEventName, () => {
		const res = new ShowModalFailImpl()
		options?.fail?.(res)
		options?.complete?.(res)
	})
	const openRet: UniPage | null = uni.openDialogPage({
		url: `/uni_modules/uni-modal/pages/uniModal/uniModal?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
		fail(err) {
			// #ifndef APP-HARMONY
			const res = new ShowModalFailImpl(`showModal failed, ${err.errMsg}`)
			// #endif
			// #ifdef APP-HARMONY
			const res = new ShowModalFailImpl(`showModal failed, ${err['errMsg']}`)
			// #endif
			options?.fail?.(res)
			options?.complete?.(res)
			uni.$off(readyEventName)
			uni.$off(successEventName)
			uni.$off(failEventName)
		}
	})
	if (openRet != null) {
		return openRet as ModalPage
	}
	const res = new ShowModalFailImpl()
	options?.fail?.(res)
	options?.complete?.(res)
	return null
}

const SYSTEM_DIALOG_MODAL_PAGE_PATH = 'uni:uniModal'

export const hideModal: HideModal = (options?: HideModalOptions | null) => {
	const pages = getCurrentPages()
	const currentPage = pages[pages.length - 1]
	if (currentPage == null) {
		const res = new HideModalFailImpl()
		options?.fail?.(res)
		options?.complete?.(res)
		return
	}
	const systemDialogPages = currentPage.$getSystemDialogPages()
	for (let i = systemDialogPages.length - 1; i >= 0; i--) {
		const page = systemDialogPages[i]
		if (!page.route.startsWith(SYSTEM_DIALOG_MODAL_PAGE_PATH)) {
			continue
		}
		if(options?.modalPage == null){
			uni.closeDialogPage({
				dialogPage: page,
			})
		} else if(options?.modalPage === page) {
			uni.closeDialogPage({
				dialogPage: page
			})
			break
		}
	}
	const res = new HideModalSuccessImpl()
	options?.success?.(res)
	options?.complete?.(res)
}

export {
	ShowModal,
	ShowModalOptions,
	ShowModalSuccess,
	ShowModalSuccessImpl,
	ShowModalFail,
	ShowModalFailImpl,
	ShowModalErrorCode,
	ModalPage,
	HideModal,
	HideModalOptions,
	HideModalSuccess,
	HideModalSuccessImpl,
	HideModalFail,
	HideModalFailImpl,
	HideModalErrorCode,
} from './interface.uts'
