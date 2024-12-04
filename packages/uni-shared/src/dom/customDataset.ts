import { camelize, extend } from '@vue/shared'
import { once } from '../utils'
interface HTMLElementWithDataset extends HTMLElement {
  __uniDataset?: Record<string, any>
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
      setAttribute.call(this, key, value)
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
  return extend({}, el.dataset, (el as HTMLElementWithDataset).__uniDataset)
}
