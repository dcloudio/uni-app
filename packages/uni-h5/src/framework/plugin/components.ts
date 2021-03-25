import { App } from 'vue'

import { COMPONENT_NAME_PREFIX } from '@dcloudio/uni-shared'

import AppComponent from '../components/app/index'

export function initSystemComponents(app: App) {
  // @ts-ignore
  AppComponent.name = COMPONENT_NAME_PREFIX + AppComponent.name
  app.component(AppComponent.name, AppComponent)
}
