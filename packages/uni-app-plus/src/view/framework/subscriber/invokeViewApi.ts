import { ComponentPublicInstance } from 'vue'
import { requestComponentInfo } from '../../../../../uni-h5/src/platform'
import { INVOKE_VIEW_API } from '../../../constants'

const pageVm = { $el: document.body } as ComponentPublicInstance

export function onInvokeViewApi({
  id,
  name,
  args,
}: {
  id: number
  name: string
  args: any
}) {
  const publish = (res: unknown) => {
    UniViewJSBridge.publishHandler(INVOKE_VIEW_API + '.' + id, res)
  }
  switch (name) {
    case 'requestComponentInfo':
      return requestComponentInfo(pageVm, args.reqs, publish)
  }
}
