import { normalizeClass } from '@dcloudio/uni-shared'

function patchClassList(classList: string[]) {
  const patchedClassList: string[] = []
  classList.forEach((className) => {
    className = className.trim()
    if (!className) {
      return
    }
    if (__X_STYLE_ISOLATION__) {
      // 需要兼容原始类名，因为该class可能是全局样式定义的，当组件配置为app时，目前的方案
      // 是底层配置isolated+@import app.wxss来实现的，需要兼容这种情况
      const originalClassName = className.replace(/^\^/g, '')
      if (!patchedClassList.includes(originalClassName)) {
        patchedClassList.push(originalClassName)
      }
    }
    const patchedClassName = '^' + className
    if (!patchedClassList.includes(patchedClassName)) {
      patchedClassList.push(patchedClassName)
    }
  })
  return patchedClassList
}

export function parseVirtualHostClass(className: string | string[]) {
  className = normalizeClass(className)
  return patchClassList(className.split(/\s+/)).join(' ')
}
