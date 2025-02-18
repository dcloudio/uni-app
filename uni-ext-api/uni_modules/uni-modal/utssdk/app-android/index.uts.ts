import { ShowModal2, ShowModalOptions2,UniShowModalResult,UniShowModalFailImpl } from "../interface.uts";


export const showModal2: ShowModal2 = function (
  options: ShowModalOptions2
) {
	const uuid = `${Date.now()}${Math.floor(Math.random() * 1e7)}`
	const baseEventName = `uni_modal_${uuid}`
	const readyEventName = `${baseEventName}_ready`
	const optionsEventName = `${baseEventName}_options`
	const successEventName = `${baseEventName}_success`
	const failEventName = `${baseEventName}_fail`
	
	
	uni.$on(readyEventName, () => {
	  uni.$emit(optionsEventName, JSON.parse(JSON.stringify(options)))
	})
	uni.$on(successEventName, (content: string|null) => {
		let res = {
			cancel : false,
			confirm : true,
			content : content
		} as UniShowModalResult
		options.success?.(res)
		options.complete?.(res)
	})
	uni.$on(failEventName, () => {
	  
	  const res = new UniShowModalFailImpl()
	  options.fail?.(res)
	  options.complete?.(res)
	  
	})
	uni.openDialogPage({
	  url: `/uni_modules/uni-modal/pages/uniModal/uniModal?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
	  fail(err) {
	    const res = new UniShowModalFailImpl(`showModal failed, ${err.errMsg}`)
	    options.fail?.(res)
	    options.complete?.(res)
	    uni.$off(readyEventName, null)
	    uni.$off(successEventName, null)
	    uni.$off(failEventName, null)
	  }
	} as io.dcloud.uniapp.framework.extapi.OpenDialogPageOptions)
	
}