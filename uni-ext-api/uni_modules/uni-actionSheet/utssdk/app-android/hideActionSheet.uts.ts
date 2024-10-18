import {
  getCurrentPage,
  isSystemActionSheetDialogPage,
} from '@dcloudio/uni-runtime'
import { HideActionSheet } from "../interface.uts";

export const hideActionSheet2: HideActionSheet = function () {
  const page = getCurrentPage()
  if (page == null) {
    return
  }
  const dialogPages = page.$systemDialogPages
  const len = dialogPages.length.toInt()
  for (let i: Int = 0;i < len;i++) {
    const page = dialogPages[i]
    if (isSystemActionSheetDialogPage(page)) {
      page.vm!.$close()
      return
    }
  }
};
