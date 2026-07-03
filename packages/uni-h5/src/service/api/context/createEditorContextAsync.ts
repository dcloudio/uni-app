import type { CreateEditorContextAsyncOptions } from '@dcloudio/uni-app-x/types/uni'
import type {
  SelectorQueryNodeInfo,
  SelectorQueryRequest,
} from '@dcloudio/uni-api'
import { EditorContext } from '@dcloudio/uni-api'
import { getCurrentBasePages } from '../../../framework/setup/page'
import { requestComponentInfo } from '../ui/requestComponentInfo'
import { type ComponentPublicInstance, nextTick } from 'vue'

const ERR_SUBJECT = 'uni-createEditorContextAsync'

export const createEditorContextAsync = function (
  options: CreateEditorContextAsyncOptions
) {
  nextTick(() => {
    const pages = getCurrentBasePages()
    const currentPage: ComponentPublicInstance =
      options.component ?? pages[pages.length - 1]
    requestComponentInfo(
      currentPage,
      [
        {
          component: currentPage,
          selector: '#' + options.id,
          single: true,
          fields: {
            context: true,
          },
        } as SelectorQueryRequest,
      ],
      (result: Array<SelectorQueryNodeInfo | null>) => {
        if (result.length > 0) {
          const contextInfo = result[0]!.contextInfo
          const id = contextInfo?.id
          const page = contextInfo?.page
          if (id != null && page != null) {
            options.success?.(new EditorContext(id, page))
          } else {
            const uniError = new UniError(
              ERR_SUBJECT,
              -2,
              'Editor context information not found.'
            )
            options.fail?.(uniError)
          }
        } else {
          const uniError = new UniError(
            ERR_SUBJECT,
            -1,
            'Editor id or component invalid.'
          )
          options.fail?.(uniError)
        }
        options.complete?.()
      }
    )
  })
}
