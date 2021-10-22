import {
  API_GET_CLIPBOARD_DATA,
  API_SET_CLIPBOARD_DATA,
  API_TYPE_GET_CLIPBOARD_DATA,
  API_TYPE_SET_CLIPBOARD_DATA,
  SetClipboardDataOptions,
  SetClipboardDataProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { showModal } from '../../api/ui/popup/showModal'
import {
  useI18n,
  initI18nSetClipboardDataMsgsOnce,
  initI18nGetClipboardDataMsgsOnce,
} from '@dcloudio/uni-core'

export const getClipboardData = defineAsyncApi<API_TYPE_GET_CLIPBOARD_DATA>(
  API_GET_CLIPBOARD_DATA,
  async (_, { resolve, reject }) => {
    initI18nGetClipboardDataMsgsOnce()
    const { t } = useI18n()
    try {
      const data = await navigator.clipboard.readText()
      resolve({ data })
    } catch (error: any) {
      reject(`${error} ${t('uni.getClipboardData.fail')}`)
    }
  }
)

export const setClipboardData = defineAsyncApi<API_TYPE_SET_CLIPBOARD_DATA>(
  API_SET_CLIPBOARD_DATA,
  async ({ data }, { resolve, reject }) => {
    initI18nSetClipboardDataMsgsOnce()
    const { t } = useI18n()
    try {
      await navigator.clipboard.writeText(data)
      resolve()
    } catch (error) {
      reject()
      showModal({
        title: t('uni.setClipboardData.fail'),
        content: data,
        editable: true,
      })
    }
  },
  SetClipboardDataProtocol,
  SetClipboardDataOptions
)
