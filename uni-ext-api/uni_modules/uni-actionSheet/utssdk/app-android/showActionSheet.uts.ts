import { registerSystemRoute } from "@dcloudio/uni-runtime";
import UniActionSheetPage from "@/uni_modules/uni-actionSheet/pages/actionSheet/actionSheet.vue";
import { ShowActionSheet2, ShowActionSheet2Options, ShowActionSheetSuccessImpl, ShowActionSheetFailImpl } from "../interface.uts";

export const showActionSheet2: ShowActionSheet2 = function (
  options: ShowActionSheet2Options
) {
  registerSystemRoute("uni:actionSheet", UniActionSheetPage);

  const uuid = Date.now() + '' + Math.floor(Math.random() * 1e7)
  const baseEventName = `_action_sheet_${uuid}`
  const readyEventName = `${baseEventName}_ready`
  const optionsEventName = `${baseEventName}_options`
  const successEventName = `${baseEventName}_success`
  const failEventName = `${baseEventName}_fail`
  uni.$on(readyEventName, () => {
    uni.$emit(optionsEventName, JSON.parse(JSON.stringify(options)))
  })
  uni.$on(successEventName, (index: number) => {
    options.success?.(new ShowActionSheetSuccessImpl(index))
  })
  uni.$on(failEventName, () => {
    options.fail?.(new ShowActionSheetFailImpl())
  })
  uni.openDialogPage({
    url: `uni:actionSheet?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
    fail(err) {
      options.fail?.(new ShowActionSheetFailImpl(`showActionSheet failed, ${err.errMsg}`))
      uni.$off(readyEventName, null)
      uni.$off(successEventName, null)
      uni.$off(failEventName, null)
    }
    // @ts-expect-error
  } as io.dcloud.uniapp.framework.extapi.OpenDialogPageOptions)
};
