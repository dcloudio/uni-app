import { ShowModal, ShowModalOptions,ModalPage,ShowModalResult,ShowModalFailImpl } from "../interface.uts";
import { HideModal, HideModalOptions,HideModalResult,HideModalFailImpl} from "../interface.uts";

export const showModal: ShowModal = function (
  options: ShowModalOptions
):ModalPage | null {
	
	const uuid = `${Date.now()}${Math.floor(Math.random() * 1e7)}`
	const baseEventName = `uni_modal_${uuid}`
	const readyEventName = `${baseEventName}_ready`
	const optionsEventName = `${baseEventName}_options`
	const successEventName = `${baseEventName}_success`
	const failEventName = `${baseEventName}_fail`
	
	uni.$on(readyEventName, () => {
	  uni.$emit(optionsEventName, JSON.parse(JSON.stringify(options)!))
	})
	uni.$on(successEventName, (inputParamStr: string) => {
		
		let inputParam = JSON.parseObject(inputParamStr)
		let res = {
			cancel : inputParam!.getBoolean("cancel")!,
			confirm : inputParam!.getBoolean("confirm")!,
			content : inputParam!.getString("content")
		} as ShowModalResult
		
		options.success?.(res)
		options.complete?.(res)
		
	})
	uni.$on(failEventName, () => {
	  
	  const res = new ShowModalFailImpl()
	  options.fail?.(res)
	  options.complete?.(res)
	  
	})
	let openRet = uni.openDialogPage({
		url: `/uni_modules/uni-modal/pages/uniModal/uniModal?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
		fail: function (err) {
			const res = new ShowModalFailImpl(`showModal failed, ${err.errMsg}`)
			options.fail?.(res)
			options.complete?.(res)
			uni.$off(readyEventName, null)
			uni.$off(successEventName, null)
			uni.$off(failEventName, null)
		},
	})
	
	if(openRet instanceof ModalPage){
		return openRet as ModalPage
	}else{
		/**
		 * 返回null 或者 类型不匹配等不应该存在的情况，返回未知错误码-4
		 */
		const res = new ShowModalFailImpl()
		options.fail?.(res)
		options.complete?.(res)
		return null
	}
	
}



export const hideModal: HideModal = function (
  options: HideModalOptions|null
) {
	
	
	const pages = getCurrentPages()
	if (pages.length < 1){
		const res = new HideModalFailImpl()
		options?.fail?.(res)
		options?.complete?.(res)
		return
	}
	
	const currentPage = pages[pages.length - 1]
	if(currentPage == null) {
		const res = new HideModalFailImpl()
		options?.fail?.(res)
		options?.complete?.(res)
		return
	}
	
	const dialogPages = currentPage.getDialogPages('systemDialog')
	let shallClosePages:Array<UniPage> = []
	
	for(let perPage of dialogPages){

		if (isSystemModalDialogPage(perPage)) {
			
			if(options?.modalPage == null){
				// 如果是无差别关闭，则直接关闭所有modal 页面
				shallClosePages.push(perPage)
			}else{
				// 需要对比当前的page 
				if(perPage === options!.modalPage!){
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
		
		if(perPage.options["successEventName"] != null){
			
			let ret = {
				cancel : false,
				confirm : false,
			}
			uni.$emit(perPage.options["successEventName"]! as string, JSON.stringify(ret))
			
			uni.closeDialogPage({
				dialogPage:perPage
			})
		}
		
	}
	
	let res = {
	} as HideModalResult
	options?.success?.(res)
	options?.complete?.(res)
	
}

/**
 * 根据路径判断page是否是modal类型
 */
function isSystemModalDialogPage(page: UniPage):boolean {
	return page.route == "uni:uniModal"
}
