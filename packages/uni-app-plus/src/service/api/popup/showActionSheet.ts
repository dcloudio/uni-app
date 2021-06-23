import {
  API_TYPE_SHOW_ACTION_SHEET,
  API_SHOW_ACTION_SHEET,
  ShowActionSheetProtocol,
  ShowActionSheetOptions,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { extend } from '@vue/shared'
import { nextTick, reactive } from 'vue'
import { Props } from '../../../../../uni-h5/src/service/api/ui/popup/actionSheet'
import { useI18n } from '@dcloudio/uni-core'

let showActionSheetState: Props

export const showActionSheet = defineAsyncApi<API_TYPE_SHOW_ACTION_SHEET>(
  API_SHOW_ACTION_SHEET,
  (
    { itemList = [], itemColor = '#000000', title = '', popover },
    { resolve, reject }
  ) => {
    const { t } = useI18n()
    if (!showActionSheetState) {
      showActionSheetState = reactive({
        itemList,
        itemColor,
        title,
        popover,
      } as Props)
      const options = {
        title,
        cancel: t('uni.showActionSheet.cancel'),
        buttons: itemList.map((item) => ({
          title: item,
          color: itemColor,
        })),
      }
      if (title) {
        options.title = title
      }
      plus.nativeUI.actionSheet(
        extend(options, {
          popover,
        }),
        (e) => {
          if (e.index > 0) {
            resolve({
              tapIndex: e.index - 1,
            })
          } else {
            reject('showActionSheet:fail cancel')
          }
        }
      )
      nextTick(() => (showActionSheetState.visible = true))
    } else {
      extend(showActionSheetState, {
        itemList,
        itemColor,
        title,
        popover,
      })
      showActionSheetState.visible = true
    }
  },
  ShowActionSheetProtocol,
  ShowActionSheetOptions
)
