import { camelize, extend } from '@vue/shared'
import { once } from '../utils'
interface HTMLElementWithDataset extends HTMLElement {
  __uniDataset?: Record<string, any>
  $uniDataset?: Readonly<Record<string, string>> | Map<string, any>
}

function formatKey(key: string) {
  return camelize(key.substring(5))
}

// question/139181，增加副作用，避免 initCustomDataset 在 build 下被 tree-shaking
export const initCustomDatasetOnce = /*#__PURE__*/ once(
  (isBuiltInElement?: (el: HTMLElement) => boolean) => {
    isBuiltInElement =
      isBuiltInElement || ((el: HTMLElement) => el.tagName.startsWith('UNI-'))
    const prototype = HTMLElement.prototype
    const setAttribute = prototype.setAttribute
    prototype.setAttribute = function (key, value) {
      if (key.startsWith('data-') && isBuiltInElement!(this)) {
        const dataset =
          (this as HTMLElementWithDataset).__uniDataset ||
          ((this as HTMLElementWithDataset).__uniDataset = {})
        dataset[formatKey(key)] = value
      }
      // github issues5773 过滤 web 端 query key为数字开头
      if (!/^\d/.test(key)) {
        setAttribute.call(this, key, value)
      }
    }
    const removeAttribute = prototype.removeAttribute
    prototype.removeAttribute = function (key) {
      if (
        (this as HTMLElementWithDataset).__uniDataset &&
        key.startsWith('data-') &&
        isBuiltInElement!(this)
      ) {
        delete (this as HTMLElementWithDataset).__uniDataset![formatKey(key)]
      }
      removeAttribute.call(this, key)
    }
  }
)

export function getCustomDataset(el: HTMLElement | HTMLElementWithDataset) {
  const dataset = el.dataset
  const target = el as HTMLElementWithDataset
  // Vapor 原生宿主只有一份 Map 数据，直接供事件读取，并让查询按条目复制，
  // 避免对象展开丢失 get/set 等保留键。旧 uni-* Custom Element 仍走原缓存合并。
  if (target.$uniDataset === dataset) {
    return dataset as DOMStringMap & Map<string, any>
  }
  return extend({}, dataset, target.__uniDataset)
}
