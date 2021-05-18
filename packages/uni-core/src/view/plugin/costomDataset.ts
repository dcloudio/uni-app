import { camelize } from '@vue/shared'
interface HTMLElementWithDataset extends HTMLElement {
  __uniDataset?: Record<string, any>
}

function formatKey(key: string) {
  return camelize(key.substring(5))
}

export function initCostomDataset() {
  const prototype = HTMLElement.prototype
  const setAttribute = prototype.setAttribute
  prototype.setAttribute = function (key, value) {
    if (key.startsWith('data-') && this.tagName.startsWith('UNI-')) {
      const dataset = ((this as HTMLElementWithDataset).__uniDataset =
        (this as HTMLElementWithDataset).__uniDataset || {})
      dataset[formatKey(key)] = value
    }
    setAttribute.call(this, key, value)
  }
  const removeAttribute = prototype.removeAttribute
  prototype.removeAttribute = function (key) {
    if (
      (this as HTMLElementWithDataset).__uniDataset &&
      key.startsWith('data-') &&
      this.tagName.startsWith('UNI-')
    ) {
      delete (this as HTMLElementWithDataset).__uniDataset![formatKey(key)]
    }
    removeAttribute.call(this, key)
  }
}

export function getCostomDataset(el: HTMLElement | HTMLElementWithDataset) {
  return Object.assign(
    {},
    el.dataset,
    (el as HTMLElementWithDataset).__uniDataset
  )
}
