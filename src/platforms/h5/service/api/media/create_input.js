import { updateElementStyle } from 'uni-shared'

export default function ({ count, sourceType, type, extension }) {
  const inputEl = document.createElement('input')
  inputEl.type = 'file'

  updateElementStyle(inputEl, {
    position: 'absolute',
    visibility: 'hidden',
    'z-index': -999,
    width: 0,
    height: 0,
    top: 0,
    left: 0
  })

  inputEl.accept = extension.map(item => {
    if (type !== '*') {
      // 剔除.拼接在type后
      return `${type}/${item.replace('.', '')}`
    } else {
      // 在后缀前方加上.
      return item.indexOf('.') === 0 ? item : `.${item}`
    }
  }).join(',')

  if (count > 1) {
    inputEl.multiple = 'multiple'
  }

  // 经过测试，仅能限制只通过相机拍摄，不能限制只允许从相册选择。
  if (sourceType.length === 1 && sourceType[0] === 'camera') {
    inputEl.capture = 'camera'
  }

  return inputEl
}
