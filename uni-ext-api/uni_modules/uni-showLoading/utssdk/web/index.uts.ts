import { ShowLoading, ShowLoadingOptions,LoadingPage,ShowLoadingSuccess,ShowLoadingFailImpl } from "../interface.uts";
import { HideLoading, HideLoadingOptions,HideLoadingSuccess,HideLoadingFailImpl} from "../interface.uts";


export const showLoading: ShowLoading = (options: ShowLoadingOptions|null) => {
	const uuid = `${Date.now()}${Math.floor(Math.random() * 1e7)}`
	const baseEventName = `uni_loading_${uuid}`
	const readyEventName = `${baseEventName}_ready`
	const optionsEventName = `${baseEventName}_options`
	const successEventName = `${baseEventName}_success`
	const failEventName = `${baseEventName}_fail`
	
	uni.$on(readyEventName, () => {
		uni.$emit(optionsEventName, options)
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
		fail(err) {
			const res = new ShowLoadingFailImpl(`showLoading failed, ${err.errMsg}`)
			options?.fail?.(res)
			options?.complete?.(res)
			uni.$off(readyEventName)
			uni.$off(successEventName)
			uni.$off(failEventName)
		}
	})
	
	if(openRet != null){
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
};



export const hideLoading: HideLoading = function (
  options: HideLoadingOptions|null
) {
	
	const currentPage = getCurrentPage() as unknown as UniPage
	if (!currentPage){
		const res = new HideLoadingFailImpl()
		options?.fail?.(res)
		options?.complete?.(res)
		return
	}
	
	const systemDialogPages = currentPage.vm.$pageLayoutInstance?.$systemDialogPages.value
	
	
	let shallClosePages:Array<UniPage> = []
	
	for(let perPage of systemDialogPages){
	
		if (isSystemShowLoadingDialogPage(perPage)) {
			
			if(options?.loadingPage == null){
				// 如果是无差别关闭，则直接关闭所有loading 页面
				shallClosePages.push(perPage)
			}else{
				/**
				 * js 中是响应式对象，不能直接比较对象
				 */
				if(perPage.options!["optionsEventName"] === options!.loadingPage!.options["optionsEventName"]){
					shallClosePages.push(perPage)
					break
				}
			}
		}
	}
	
	
	shallClosePages.forEach(item => {
		const index = systemDialogPages.indexOf(item);
		if (index > -1) {
			systemDialogPages.splice(index, 1);
		}
	});
	
	
	let res = {
	} as HideLoadingSuccess
	options?.success?.(res)
	options?.complete?.(res)
	
}


/**
 * 根据路径判断page是否是loading类型
 */
function isSystemShowLoadingDialogPage(page: UniPage):boolean {
    return page.route.startsWith("uni:showLoading")
}


