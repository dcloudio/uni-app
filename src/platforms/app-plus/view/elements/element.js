import {
  camelize
} from 'uni-shared'

function formatKey (key) {
  return camelize(key.substring(5))
}

export default class UniElement extends HTMLElement {
  setAttribute (key, value) {
    if (key.startsWith('data-')) {
      const dataset = this.__uniDataset || (this.__uniDataset = {})
      dataset[formatKey(key)] = value
    }
    super.setAttribute(key, value)
  }

  removeAttribute (key) {
    if (this.__uniDataset && key.startsWith('data-')) {
      delete this.__uniDataset[formatKey(key)]
    }
    super.removeAttribute(key)
  }
}
