import parseBaseComponent from './component-base-parser'

import {
  isPage,
  initRelation
} from './util'

export default function parseComponent (vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage,
    initRelation
  })
}
