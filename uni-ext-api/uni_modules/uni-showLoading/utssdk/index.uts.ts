import {
	HideLoading,
	HideLoadingFailImpl,
	HideLoadingOptions,
	HideLoadingSuccess,
	LoadingPage,
	ShowLoading,
	ShowLoadingFailImpl,
	ShowLoadingOptions,
	ShowLoadingSuccess,
} from './interface.uts'

export const showLoading: ShowLoading = (options?: ShowLoadingOptions | null) => {
	const uuid = `${Date.now()}${Math.floor(Math.random() * 1e7)}`
	const baseEventName = `uni_loading_${uuid}`
	const readyEventName = `${baseEventName}_ready`
	const optionsEventName = `${baseEventName}_options`
	const successEventName = `${baseEventName}_success`
	const failEventName = `${baseEventName}_fail`
	uni.$on(readyEventName, () => {
		uni.$emit(optionsEventName, JSON.parse(JSON.stringify(options)!))
	})
	uni.$on(successEventName, (_: string) => {
		const res = {} as ShowLoadingSuccess
		options?.success?.(res)
		options?.complete?.(res)
	})
	uni.$on(failEventName, () => {
		const res = new ShowLoadingFailImpl()
		options?.fail?.(res)
		options?.complete?.(res)
	})
	const openRet: UniPage | null = uni.openDialogPage({
		url: `/uni_modules/uni-showLoading/pages/showLoading/showLoading?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
		fail(err) {
			// #ifndef APP-HARMONY
			const res = new ShowLoadingFailImpl(`showLoading failed, ${err.errMsg}`)
			// #endif
			// #ifdef APP-HARMONY
			const res = new ShowLoadingFailImpl(`showLoading failed, ${err['errMsg']}`)
			// #endif
			options?.fail?.(res)
			options?.complete?.(res)
			uni.$off(readyEventName)
			uni.$off(successEventName)
			uni.$off(failEventName)
		}
	})
	if (openRet != null) {
		return openRet as LoadingPage
	}
	const res = new ShowLoadingFailImpl()
	options?.fail?.(res)
	options?.complete?.(res)
	return null
}

const SYSTEM_DIALOG_LOADING_PAGE_PATH = 'uni:showLoading'

export const hideLoading: HideLoading = (options?: HideLoadingOptions | null) => {
	const pages = getCurrentPages()
	const currentPage = pages[pages.length - 1]
	if (currentPage == null) {
		const res = new HideLoadingFailImpl()
		options?.fail?.(res)
		options?.complete?.(res)
		return
	}
	const systemDialogPages = currentPage.$getSystemDialogPages()
	for(let i = systemDialogPages.length - 1; i >= 0; i--) {
		const page = systemDialogPages[i]
		if (!page.route.startsWith(SYSTEM_DIALOG_LOADING_PAGE_PATH)) {
			continue
		}
		if(options?.loadingPage == null){
			uni.closeDialogPage({
				dialogPage: page,
			})
		} else if(options?.loadingPage === page) {
			uni.closeDialogPage({
				dialogPage: page
			})
			break
		}
	}
	const res = {} as HideLoadingSuccess
	options?.success?.(res)
	options?.complete?.(res)
}

export * from './interface.uts'
