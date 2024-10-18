import { ShowActionSheet2, ShowActionSheet2Options } from "../interface.uts";

export const showActionSheet2: ShowActionSheet2 = function (
  options: ShowActionSheet2Options
) {
  const uuid = Date.now() + '' + Math.floor(Math.random() * 1e7)
  const baseEventName = `_action_sheet_${uuid}`
  const readyEventName = `${baseEventName}_ready`
  const optionsEventName = `${baseEventName}_options`
  const successEventName = `${baseEventName}_success`
  const failEventName = `${baseEventName}_fail`
  uni.$on(readyEventName, () => {
    uni.$emit(optionsEventName, options)
  })
  uni.$on(successEventName, (index: number) => {
    // @ts-expect-error
    options.success?.({ errMsg: 'showActionSheet:ok', tapIndex: index })
  })
  uni.$on(failEventName, () => {
    // @ts-expect-error
    options.fail?.({ errMsg: `showActionSheet:failed cancel` })
  })
  uni.openDialogPage({
    url: `uni:actionSheet?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
    fail(err) {
      // @ts-expect-error
      options.fail?.({ errMsg: `showActionSheet:failed ${err.errMsg}` })
      // @ts-expect-error
      uni.$off(readyEventName, null)
    }
  })
};
