import { registerSystemRoute, getCurrentPage } from '@dcloudio/uni-runtime'
import UniModalPage from "@/uni_modules/uni-modal/pages/uniModal/uniModal.vue";
import { ShowModal, ShowModalOptions,UniShowModalResult,UniShowModalFailImpl } from "../interface.uts";
import { HideModal, HideModalOptions,UniHideModalResult,UniHideModalFailImpl} from "../interface.uts";

export const showModal: ShowModal = (options: ShowModalOptions) => {
	registerSystemRoute("uni:uniModal", UniModalPage);

	const uuid = `${Date.now()}${Math.floor(Math.random() * 1e7)}`
	const baseEventName = `uni_modal_${uuid}`
	const readyEventName = `${baseEventName}_ready`
	const optionsEventName = `${baseEventName}_options`
	const successEventName = `${baseEventName}_success`
	const failEventName = `${baseEventName}_fail`
	
	uni.$on(readyEventName, () => {
		uni.$emit(optionsEventName, options)
	})
	uni.$on(successEventName, (inputParamStr: string) => {
		let inputParam = JSON.parse(inputParamStr)! as UTSJSONObject
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
	let openRet = uni.openDialogPage({
		url: `/uni_modules/uni-modal/pages/uniModal/uniModal?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
		fail(err) {
			const res = new UniShowModalFailImpl(`showModal failed, ${err.errMsg}`)
			options.fail?.(res)
			options.complete?.(res)
			uni.$off(readyEventName)
			uni.$off(successEventName)
			uni.$off(failEventName)
		}
	})
	
	if(openRet != null){
		return openRet as ModalPage
	}else{
		/**
		 * 返回null 或者 类型不匹配等不应该存在的情况，返回未知错误码-4
		 */
		const res = new UniShowModalFailImpl()
		options.fail?.(res)
		options.complete?.(res)
		return null
	}
};



export const hideModal: HideModal = function (
  options: HideModalOptions|null
) {
	
	const currentPage = getCurrentPage() as unknown as UniPage
	if (!currentPage){
		const res = new UniHideModalFailImpl()
		options?.fail?.(res)
		options?.complete?.(res)
		return
	}
	
	const systemDialogPages = currentPage.vm.$pageLayoutInstance?.$systemDialogPages.value
	
	
	let shallClosePages:Array<UniPage> = []
	
	for(let perPage of systemDialogPages){
	
		if (isSystemModalDialogPage(perPage)) {
			
			if(options?.modalPage == null){
				// 如果是无差别关闭，则直接关闭所有modal 页面
				shallClosePages.push(perPage)
			}else{
				/**
				 * js 中是响应式对象，不能直接比较对象
				 */
				if(perPage.options!["optionsEventName"] === options!.modalPage!.options["optionsEventName"]){
					shallClosePages.push(perPage)
					break
				}
			}
		}
	}
	
	
	shallClosePages.forEach(item => {
		const index = systemDialogPages.indexOf(item);
		if (index > -1) {
			notifyClosedDialog(systemDialogPages[index])
			systemDialogPages.splice(index, 1);
		}
	});
	
	
	let res = {
	} as UniHideModalResult
	options?.success?.(res)
	options?.complete?.(res)
	
}


function notifyClosedDialog(perPage:UniPage){
	
	let ret = {
		cancel : false,
		confirm : false,
	}
	
	if(perPage.options!["successEventName"] != null){
		uni.$emit(perPage.options["successEventName"]!, JSON.stringify(ret))
	}
	
	
	
}
/**
 * 根据路径判断page是否是modal类型
 */
function isSystemModalDialogPage(page: UniPage):boolean {
    return page.route.startsWith("uni:uniModal")
}


