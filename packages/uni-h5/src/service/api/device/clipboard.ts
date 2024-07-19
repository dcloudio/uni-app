import {
  API_GET_CLIPBOARD_DATA,
  API_SET_CLIPBOARD_DATA,
  type API_TYPE_GET_CLIPBOARD_DATA,
  type API_TYPE_SET_CLIPBOARD_DATA,
  SetClipboardDataOptions,
  SetClipboardDataProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
// import { showModal } from '../../api/ui/popup/showModal'
import { initI18nGetClipboardDataMsgsOnce, useI18n } from '@dcloudio/uni-core'

export const getClipboardData = defineAsyncApi<API_TYPE_GET_CLIPBOARD_DATA>(
  API_GET_CLIPBOARD_DATA,
  async (_, { resolve, reject }) => {
    initI18nGetClipboardDataMsgsOnce()
    const { t } = useI18n()
    try {
      const data = await navigator.clipboard.readText()
      resolve({ data })
    } catch (error: any) {
      _getClipboardData(resolve, () => {
        reject(`${error} ${t('uni.getClipboardData.fail')}`)
      })
    }
  }
)

export const setClipboardData = defineAsyncApi<API_TYPE_SET_CLIPBOARD_DATA>(
  API_SET_CLIPBOARD_DATA,
  async ({ data }, { resolve, reject }) => {
    try {
      await navigator.clipboard.writeText(data)
      resolve()
    } catch (error) {
      _setClipboardData(data, resolve, reject)
    }
  },
  SetClipboardDataProtocol,
  SetClipboardDataOptions
)

function _getClipboardData(resolve: Function, reject: Function) {
  const pasteText = document.getElementById('#clipboard') as HTMLInputElement
  const data = pasteText ? pasteText.value : undefined
  if (data) {
    resolve({ data })
  } else {
    reject()
  }
}

function _setClipboardData(data: string, resolve: Function, reject: Function) {
  const pasteText = document.getElementById('#clipboard')
  pasteText && pasteText.remove()
  const textarea = document.createElement('textarea')
  textarea.setAttribute('inputmode', 'none')
  textarea.id = '#clipboard'
  textarea.style.position = 'fixed'
  textarea.style.top = '-9999px'
  textarea.style.zIndex = '-9999'
  document.body.appendChild(textarea)
  textarea.value = data
  textarea.select()
  textarea.setSelectionRange(0, textarea.value.length)
  const result = document.execCommand('Copy', false)
  textarea.blur()
  if (result) {
    resolve()
  } else {
    reject()
  }
}
