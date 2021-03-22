import { App } from 'vue'
import { Router } from 'vue-router'
import { PolySymbol } from '@dcloudio/uni-core'
import { initLayout } from './layout'

const layoutKey = PolySymbol(__DEV__ ? 'layout' : 'l')

export function initProvide(app: App, router?: Router) {
  app.provide(layoutKey, initLayout(router))
}
