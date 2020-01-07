/**
 * https://github.com/swan-team/swan-js/blob/61e2a63f7aa576b5daafbe77fdfa7c65b977060c/src/utils/index.js
 */

const _toString = Object.prototype.toString
/**
 * 深度assign的函数
 * @param {Object} targetObject 要被拷贝的目标对象
 * @param {Object} originObject 拷贝的源对象
 * @return {Object} merge后的对象
 */
export const deepAssign = (targetObject = {}, originObject) => {
  const originType = _toString.call(originObject)
  if (originType === '[object Array]') {
    targetObject = originObject.slice(0)
    return targetObject
  } else if (originType === '[object Object]') {
    for (const key in originObject) {
      targetObject[key] = deepAssign(targetObject[key], originObject[key])
    }
    return targetObject
  } else if (originType === '[object Date]') {
    return new Date(originObject.getTime())
  } else if (originType === '[object RegExp]') {
    const target = String(originObject)
    const lastIndex = target.lastIndexOf('/')
    return new RegExp(target.slice(1, lastIndex), target.slice(lastIndex + 1))
  }
  return originObject
}

/**
 * 深度拷贝逻辑，不同于lodash等库，但是与微信一致
 * @param {*} [originObj] 原对象
 * @return {Object|Array} 拷贝结果
 */
export const deepClone = originObj => {
  return deepAssign(_toString.call(originObj) === '[object Array]' ? [] : {}, originObj)
}
