// @ts-expect-error
import { hideActionSheet2 as hideActionSheetOrig } from '@dcloudio/uni-ext-api/uni-actionSheet'

export const hideActionSheet2 = () => {
  hideActionSheetOrig()
}
