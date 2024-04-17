import type { MPProtocol } from './types'

export const showActionSheet: MPProtocol = {
  args(
    fromArgs: UniApp.ShowActionSheetOptions,
    toArgs: WechatMiniprogram.ShowActionSheetOption
  ) {
    toArgs.alertText = fromArgs.title
  },
}
