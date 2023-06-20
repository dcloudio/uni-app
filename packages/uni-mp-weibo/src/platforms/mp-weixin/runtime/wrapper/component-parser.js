import parseBaseComponent from './component-base-parser'

import {
  isPage,
  initRelation
} from './util'

export default function parseComponent (vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage,
    initRelation
  }, needVueOptions)
}
