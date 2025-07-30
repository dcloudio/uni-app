import { isFn } from 'uni-shared'

export function getFacialRecognitionMetaInfo () {
  if (Object.getPrototypeOf(window) !== Window.prototype) {
    console.error(
      'getFacialRecognitionMetaInfo:fail window对象原型被篡改，可能存在劫持'
    )
    return ''
  }
  if (window.window !== window || window.self !== window) {
    console.error(
      'getFacialRecognitionMetaInfo:fail window对象属性引用异常，可能被劫持'
    )
    return ''
  }
  if (
    Object.prototype.toString.call(window) !== '[object Window]' &&
    Object.prototype.toString.call(window) !== '[object DOMWindow]'
  ) {
    console.error(
      'getFacialRecognitionMetaInfo:fail window对象类型标识异常，可能被劫持'
    )
    return ''
  }
  if (isFn(window.getMetaInfo)) {
    return window.getMetaInfo()
  } else {
    console.error(
      'getFacialRecognitionMetaInfo:fail window对象缺少getMetaInfo方法，请参考文档引用：https://doc.dcloud.net.cn/uniCloud/frv/dev-v2.html#window-get-meta-info'
    )
    return ''
  }
}
