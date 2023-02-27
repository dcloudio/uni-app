import { extend } from '@vue/shared'
import { createUniEvent } from '@dcloudio/uni-shared'
import { findNodeByTagName } from '../../dom/Page'

type Name =
  | 'navigateTo'
  | 'navigateBack'
  | 'switchTab'
  | 'reLaunch'
  | 'redirectTo'
  | 'postMessage'
type WebInvokeData = {
  name: Name
  arg: any
}
export type WebInvokeAppService = (
  webInvokeData: WebInvokeData,
  pageIds: string[]
) => void

export const onWebInvokeAppService: WebInvokeAppService = (
  { name, arg },
  pageIds
) => {
  if (name === 'postMessage') {
    onMessage(pageIds[0], arg)
  } else {
    ;(uni[name] as (options: any) => void)(
      extend(arg, {
        fail(res: { errMsg: string }) {
          console.error(res.errMsg)
        },
      })
    )
  }
}

function onMessage(pageId: string, arg: any) {
  const uniNode = findNodeByTagName('web-view', parseInt(pageId))
  uniNode &&
    uniNode.dispatchEvent(
      createUniEvent({
        type: 'onMessage',
        target: Object.create(null),
        currentTarget: Object.create(null),
        detail: {
          data: [arg],
        },
      })
    )
}
