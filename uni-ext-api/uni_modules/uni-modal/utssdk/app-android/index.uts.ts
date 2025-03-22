import { ShowModal, ShowModalOptions,ModalPage,UniShowModalResult,UniShowModalFailImpl } from "../interface.uts";
import { HideModal, HideModalOptions,UniHideModalResult,UniHideModalFailImpl} from "../interface.uts";
import { getCurrentPage} from "@dcloudio/uni-runtime";

export const showModal: ShowModal = function (
  options: ShowModalOptions
):ModalPage {
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
		
		let inputParam = JSON.parseObject(inputParamStr)!
		let res = {
			cancel : inputParam.getBoolean("cancel")!,
			confirm : inputParam.getBoolean("confirm")!,
			content : inputParam.getString("content")
		} as UniShowModalResult
		
		options.success?.(res)
		options.complete?.(res)
	})
	uni.$on(failEventName, () => {
	  
	  const res = new UniShowModalFailImpl()
	  options.fail?.(res)
	  options.complete?.(res)
	  
	})
	return uni.openDialogPage({
	  url: `/uni_modules/uni-modal/pages/uniModal/uniModal?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
	  fail(err) {
	    const res = new UniShowModalFailImpl(`showModal failed, ${err.errMsg}`)
	    options.fail?.(res)
	    options.complete?.(res)
	    uni.$off(readyEventName, null)
	    uni.$off(successEventName, null)
	    uni.$off(failEventName, null)
	  }
	}) as ModalPage
	
}



export const hideModal: HideModal = function (
  options: HideModalOptions|null
) {
	
	
	const currentPageInstance = getCurrentPage()
	
	if (currentPageInstance == null){
		const res = new UniHideModalFailImpl()
		options?.fail?.(res)
		options?.complete?.(res)
		return
	}
	const dialogPages = currentPageInstance.$systemDialogPages
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
