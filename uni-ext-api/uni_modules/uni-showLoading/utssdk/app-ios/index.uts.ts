import { ShowLoading, ShowLoadingOptions,LoadingPage,ShowLoadingSuccess,ShowLoadingFailImpl } from "../interface.uts";
import { HideLoading, HideLoadingOptions,HideLoadingSuccess,HideLoadingFailImpl} from "../interface.uts";

export const showLoading: ShowLoading = function (
  options: ShowLoadingOptions|null
):LoadingPage | null {

	const uuid = `${Date.now()}${Math.floor(Math.random() * 1e7)}`
	const baseEventName = `uni_loading_${uuid}`
	const readyEventName = `${baseEventName}_ready`
	const optionsEventName = `${baseEventName}_options`
	const successEventName = `${baseEventName}_success`
	const failEventName = `${baseEventName}_fail`
	
	let nextOptions:any|null = {}
	if(options != null){
		nextOptions = JSON.parse(JSON.stringify(options)!)
	}
	
	uni.$on(readyEventName, () => {
	  uni.$emit(optionsEventName, nextOptions)
	})
	uni.$on(successEventName, (inputParamStr: string) => {

		let res = {
		} as ShowLoadingSuccess

		options?.success?.(res)
		options?.complete?.(res)

	})
	uni.$on(failEventName, () => {

	  const res = new ShowLoadingFailImpl()
	  options?.fail?.(res)
	  options?.complete?.(res)

	})
	let openRet = uni.openDialogPage({
		url: `/uni_modules/uni-showLoading/pages/showLoading/showLoading?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
		fail: function (err) {
			const res = new ShowLoadingFailImpl(`showLoading failed, ${err.errMsg}`)
			options?.fail?.(res)
			options?.complete?.(res)
			uni.$off(readyEventName, null)
			uni.$off(successEventName, null)
			uni.$off(failEventName, null)
		},
	})

	if(openRet instanceof LoadingPage){
		return openRet as LoadingPage
	}else{
		/**
		 * 返回null 或者 类型不匹配等不应该存在的情况，返回未知错误码-4
		 */
		const res = new ShowLoadingFailImpl()
		options?.fail?.(res)
		options?.complete?.(res)
		return null
	}

}



export const hideLoading: HideLoading = function (
  options: HideLoadingOptions|null
) {


	const pages = getCurrentPages()
	if (pages.length < 1){
		const res = new HideLoadingFailImpl()
		options?.fail?.(res)
		options?.complete?.(res)
		return
	}

	const currentPage = pages[pages.length - 1]
	if(currentPage == null) {
		const res = new HideLoadingFailImpl()
		options?.fail?.(res)
		options?.complete?.(res)
		return
	}

	const dialogPages = currentPage.getDialogPages('systemDialog')
	let shallClosePages:Array<UniPage> = []

	for(let perPage of dialogPages){

		if (isSystemShowLoadingDialogPage(perPage)) {

			if(options?.loadingPage == null){
				// 如果是无差别关闭，则直接关闭所有loading 页面
				shallClosePages.push(perPage)
			}else{
				// 需要对比当前的page
				if(perPage === options!.loadingPage!){
					shallClosePages.push(perPage)
					break
				}
			}
		}
	}

	/**
	 * 集中处理待关闭的page
	 */
	for(let perPage of shallClosePages){
		uni.closeDialogPage({
			dialogPage:perPage
		})
	}

	let res = {
	} as HideLoadingSuccess
	options?.success?.(res)
	options?.complete?.(res)

}

/**
 * 根据路径判断page是否是loading类型
 */
function isSystemShowLoadingDialogPage(page: UniPage):boolean {
	return page.route == "uni:showLoading"
}
