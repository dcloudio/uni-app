import { updateElementStyle } from '@dcloudio/uni-shared'
import MIMEType from './MIMEType'
import { addInteractListener } from '@dcloudio/uni-components'

export type createInputOptions = Pick<
  UniApp.ChooseFileOptions,
  'count' | 'sourceType' | 'type' | 'extension'
>

const ALL = 'all'

function isWXEnv(): boolean {
  const ua = window.navigator.userAgent.toLowerCase()
  const matchUA = ua.match(/MicroMessenger/i)
  return !!(matchUA && matchUA[0] === 'micromessenger')
}

export default function ({
  count,
  sourceType,
  type,
  extension,
}: createInputOptions): HTMLInputElement {
  addInteractListener()
  const inputEl = document.createElement('input')
  inputEl.type = 'file'

  updateElementStyle(inputEl, {
    position: 'absolute',
    visibility: 'hidden',
    zIndex: '-999',
    width: '0',
    height: '0',
    top: '0',
    left: '0',
  })

  /**
   * 选择文件
   * chooseFile 使用后缀名
   * chooseImage、chooseVideo 使用MIME类型
   */
  inputEl.accept = extension!
    .map((item) => {
      if (type !== ALL) {
        const MIMEKey = item.replace('.', '')
        return `${type}/${MIMEType[type!][MIMEKey] || MIMEKey}`
      } else {
        // 在微信环境里，'.jpeg,.png' 会提示没有应用可执行此操作
        if (isWXEnv()) {
          return '.'
        }
        return item.indexOf('.') === 0 ? item : `.${item}`
      }
    })
    .join(',')

  if (count && count > 1) {
    inputEl.multiple = true
  }

  // 经过测试，仅能限制只通过相机拍摄，不能限制只允许从相册选择。
  if (
    type !== ALL &&
    sourceType instanceof Array &&
    sourceType.length === 1 &&
    sourceType[0] === 'camera'
  ) {
    inputEl.setAttribute('capture', 'camera')
  }

  return inputEl
}
