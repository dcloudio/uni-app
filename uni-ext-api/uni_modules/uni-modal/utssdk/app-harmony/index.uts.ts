import { ShowModal, ShowModalOptions,ModalPage,UniShowModalResult,UniShowModalFailImpl } from "../interface.uts";
import { HideModal, HideModalOptions,UniHideModalResult,UniHideModalFailImpl} from "../interface.uts";

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
	  uni.$emit(optionsEventName, JSON.parse(JSON.stringify(options)))
	})
	uni.$on(successEventName, (inputParamStr: string) => {
		
		let inputParam : UTSJSONObject = JSON.parse(inputParamStr)!
		let res = {
			cancel : inputParam["cancel"] as boolean,
			confirm : inputParam["confirm"] as boolean,
			content : inputParam["content"] as string
		} as UniShowModalResult
		
		options.success?.(res)
		options.complete?.(res)
	})
	uni.$on(failEventName, () => {
	  
	  const res = new UniShowModalFailImpl()
	  options.fail?.(res)
	  options.complete?.(res)
	  
	})
	
	let openRet:UniPage = uni.openDialogPage({
	  url: `/uni_modules/uni-modal/pages/uniModal/uniModal?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
	  fail(err) {
	    const res = new UniShowModalFailImpl(`showModal failed, ${err}`)
	    options.fail?.(res)
	    options.complete?.(res)
	    uni.$off(readyEventName, null)
	    uni.$off(successEventName, null)
	    uni.$off(failEventName, null)
	  }
	})
	
	if(openRet != null){
		return openRet as ModalPage
	}else{
		/**
		 * 返回null 或者 类型不匹配等不应该存在的情况，返回未知错误码
		 */
		const res = new UniShowModalFailImpl()
		options.fail?.(res)
		options.complete?.(res)
		return null
	}
	
	
}



export const hideModal: HideModal = function (
  options: HideModalOptions|null
) {
	
	
	const pages:Array<UniPage> = getCurrentPages()
	if (pages.length < 1){
		const res = new UniHideModalFailImpl()
		options?.fail?.(res)
		options?.complete?.(res)
		return
	}
	
	const currentPage:UniPage = pages[pages.length - 1]
	if(currentPage == null) {
		const res = new UniHideModalFailImpl()
		options?.fail?.(res)
		options?.complete?.(res)
		return
	}
	
	if(currentPage.vm.$systemDialogPages == null) {
		const res = new UniHideModalFailImpl()
		options?.fail?.(res)
		options?.complete?.(res)
		return
	}
	
	const dialogPages:Array<UniPage> = currentPage.vm.$systemDialogPages.value
	console.log("dialogPages",dialogPages.length)
	/**
	 * 查找需要关闭的dialog实例
	 */
	let shallClosePages:Array<UniPage> = []
	
	for(let perPage of dialogPages){
		
		if (isSystemModalDialogPage(perPage)) {
			if(options?.modalPage == null){
				// 如果是无差别关闭，则直接关闭所有modal 页面
				shallClosePages.push(perPage)
			}else{
				// 需要对比当前的page 
				if(perPage == options!.modalPage){
					shallClosePages.push(perPage)
					break
				}
			}
		}
	}
	console.log("shallClosePages",shallClosePages)
	/**
	 * 集中处理待关闭的page
	 */
	for(let perPage of shallClosePages){
		
		let ret = {
			cancel : false,
			confirm : false,
		}
		
		if(perPage.options!["successEventName"] != null){
			uni.$emit(perPage.options["successEventName"]!, JSON.stringify(ret))
			
			uni.closeDialogPage({
				dialogPage:perPage
			})
		}
		
	}
	
	/**
	 * 给调用者成功/完成回调
	 */
	let res = {
	} as UniHideModalResult
	options?.success?.(res)
	options?.complete?.(res)
	
}

/**
 * 根据路径判断page是否是modal类型
 */
function isSystemModalDialogPage(page: UniPage):boolean {	
	return page.route.startsWith("uni:uniModal")
}

export {
    UniShowModalFail,
    UniHideModalFail,
    UniShowModalResult,
    UniShowModalFailImpl,
    ShowModalOptions,
    UniHideModalResult,
    UniHideModalFailImpl,
    HideModalOptions,
    ShowModal,
    HideModal,
    UniShowModalErrorCode,
    ModalPage,
    UniHideModalErrorCode,
} from '../interface.uts'