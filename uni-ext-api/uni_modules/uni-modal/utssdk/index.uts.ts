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
	const modalPage = options?.modalPage
	for (let i = systemDialogPages.length - 1; i >= 0; i--) {
		const page = systemDialogPages[i]
		if (!page.route.startsWith(SYSTEM_DIALOG_MODAL_PAGE_PATH)) {
			continue
		}
		if(modalPage == null){
			uni.closeDialogPage({
				dialogPage: page,
			})
		} else {
			// #ifdef APP-IOS && VUE3-VAPOR
			const nativePageId = getModalPageId(modalPage!)
			if (nativePageId == getModalPageId(page)) {
				uni.closeDialogPage({
					dialogPage: page
				})
				break
			}
			// #endif

			// #ifndef (APP-IOS && VUE3-VAPOR)
			if (modalPage === page) {
				uni.closeDialogPage({
					dialogPage: page
				})
				break
			}
			// #endif
		}
	}
	const res = new HideModalSuccessImpl()
	options?.success?.(res)
	options?.complete?.(res)
}

// #ifdef APP-IOS
function getModalPageId(page: UniPage): string {
	// TODO：条件编译原因:
	// iOS dom1 UniPage 是直接通过JSExport通道供js调用，所以js.getSystemDialogPages 捕获到的和options.modalPage是同一个UniPage对象
	// dom2 中的 UniPage 对象是c++层实现的，js.getSystemDialogPages捕获到的是通过js框架返回的信息构造的OC的UniPageImpl，但是options.modalPage捕获到的是一个Map，只能通过__nativePageId 判断是否相同

	// #ifndef VUE3-VAPOR
	return page.__nativePageId
	// #endif

	// #ifdef VUE3-VAPOR
	if(UTSiOS.instanceof(page, Map<string, any>.self)) {
		const pageMap = page as Map<string, any>
		const rawId = pageMap.get("__nativePageId")
		if (rawId != null && UTSiOS.instanceof(rawId!, String.self)) {
			return rawId as string
		}
	} else if (UTSiOS.instanceof(page, UniPageImpl.self)) {
		return page.__nativePageId
	}
	return "none"
	// #endif
}
// #endif

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
