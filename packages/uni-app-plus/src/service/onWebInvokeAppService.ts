import { getPageNode, findNodeByTagName } from './framework/dom/Page'
import { createUniEvent } from '@dcloudio/uni-shared'

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
    uni[name](arg)
  }
}

function onMessage(pageId: string, arg: any) {
  const page = getPageNode(pageId)
  if (!page) {
    return
  }
  const uniNode = findNodeByTagName('web-view', page)
  uniNode?.dispatchEvent(
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
