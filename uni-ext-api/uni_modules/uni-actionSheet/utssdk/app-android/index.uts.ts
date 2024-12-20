import { registerSystemRoute, getCurrentPage, isSystemActionSheetDialogPage } from "@dcloudio/uni-runtime";
import UniActionSheetPage from "@/uni_modules/uni-actionSheet/pages/actionSheet/actionSheet.vue";
import { ShowActionSheet, ShowActionSheetOptions, ShowActionSheetSuccessImpl, ShowActionSheetFailImpl } from "../interface.uts";

export {
  ShowActionSheet,
  ShowActionSheetOptions,
} from '../interface.uts'

export const showActionSheet: ShowActionSheet = function (
  options: ShowActionSheetOptions
) {
  registerSystemRoute("uni:actionSheet", UniActionSheetPage);

  const uuid = `${Date.now()}${Math.floor(Math.random() * 1e7)}`
  const baseEventName = `uni_action_sheet_${uuid}`
  const readyEventName = `${baseEventName}_ready`
  const optionsEventName = `${baseEventName}_options`
  const successEventName = `${baseEventName}_success`
  const failEventName = `${baseEventName}_fail`
  uni.$on(readyEventName, () => {
    uni.$emit(optionsEventName, JSON.parse(JSON.stringify(options)))
  })
  uni.$on(successEventName, (index: number) => {
    const res = new ShowActionSheetSuccessImpl(index)
    options.success?.(res)
    options.complete?.(res)
  })
  uni.$on(failEventName, () => {
    const res = new ShowActionSheetFailImpl()
    options.fail?.(res)
    options.complete?.(res)
  })
  uni.openDialogPage({
    url: `uni:actionSheet?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
    fail(err) {
      const res = new ShowActionSheetFailImpl(`showActionSheet failed, ${err.errMsg}`)
      options.fail?.(res)
      options.complete?.(res)
      uni.$off(readyEventName, null)
      uni.$off(successEventName, null)
      uni.$off(failEventName, null)
    }
  } as io.dcloud.uniapp.framework.extapi.OpenDialogPageOptions)
};

export const hideActionSheet = function () {
  const currentPage = getCurrentPage()
  if (currentPage == null) return
  const dialogPages = currentPage.$systemDialogPages
  const len = dialogPages.length.toInt()
  for (let i: Int = 0;i < len;i++) {
    const page = dialogPages[i]
    if (isSystemActionSheetDialogPage(page)) {
      page.vm!.$close()
      return
    }
  }
};
