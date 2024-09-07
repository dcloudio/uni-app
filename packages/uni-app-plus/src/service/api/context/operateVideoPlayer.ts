import type { ComponentPublicInstance } from 'vue'
import { findElmById, invokeVmMethod, invokeVmMethodWithoutArgs } from '../util'
import {
  getPage$BasePage,
  getPageById,
} from '../../framework/page/getCurrentPages'

const METHODS = {
  play(ctx: any) {
    return invokeVmMethodWithoutArgs(ctx, 'play')
  },
  pause(ctx: any) {
    return invokeVmMethodWithoutArgs(ctx, 'pause')
  },
  seek(ctx: any, args: { position: number }) {
    return invokeVmMethod(ctx, 'seek', args.position)
  },
  stop(ctx: any) {
    return invokeVmMethodWithoutArgs(ctx, 'stop')
  },
  sendDanmu(ctx: any, args: WechatMiniprogram.Danmu) {
    return invokeVmMethod(ctx, 'sendDanmu', args)
  },
  playbackRate(ctx: any, args: { rate: number }) {
    return invokeVmMethod(ctx, 'playbackRate', args.rate)
  },
  requestFullScreen(
    ctx: any,
    args: WechatMiniprogram.VideoContextRequestFullScreenOption = {}
  ) {
    return invokeVmMethod(ctx, 'requestFullScreen', args)
  },
  exitFullScreen(ctx: any) {
    return invokeVmMethodWithoutArgs(ctx, 'exitFullScreen')
  },
  showStatusBar(ctx: any) {
    return invokeVmMethodWithoutArgs(ctx, 'showStatusBar')
  },
  hideStatusBar(ctx: any) {
    return invokeVmMethodWithoutArgs(ctx, 'hideStatusBar')
  },
}

export function operateVideoPlayer(
  videoId: string,
  pageId: number,
  type: string,
  data?: unknown
) {
  const page = getPageById(pageId)
  if (page && getPage$BasePage(page).meta.isNVue) {
    const pageVm = (page as any).$vm as ComponentPublicInstance
    return METHODS[type as keyof typeof METHODS](
      findElmById(videoId, pageVm),
      data as any
    )
  }
  UniServiceJSBridge.invokeViewMethod(
    'video.' + videoId,
    {
      videoId,
      type,
      data,
    },
    pageId
  )
}
