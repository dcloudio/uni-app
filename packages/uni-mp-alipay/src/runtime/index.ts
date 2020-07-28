import { initCreateApp } from '@dcloudio/uni-mp-core'

import * as parseAppOptions from './parseAppOptions'

export { createPage } from './createPage'
export { createComponent } from './createComponent'

export const createApp = initCreateApp(parseAppOptions)
