import parseBasePage from './page-base-parser'

import {
  isPage,
  initRelation
} from './util'

export default function parsePage (vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage,
    initRelation
  })
}
