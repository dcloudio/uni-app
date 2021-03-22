import { App } from 'vue'

import { COMPONENT_NAME_PREFIX } from '@dcloudio/uni-shared'

import AppComponent from '../components/app/index'
// import PageComponent from '../components/page/index.vue'
// import AsyncErrorComponent from '../components/async-error/index.vue'
// import AsyncLoadingComponent from '../components/async-loading/index.vue'

import LayoutComponent from '../components/app/test.vue'

export function initSystemComponents(app: App) {
  // @ts-ignore
  AppComponent.name = COMPONENT_NAME_PREFIX + AppComponent.name
  // @ts-ignore
  // PageComponent.name = COMPONENT_NAME_PREFIX + PageComponent.name
  // @ts-ignore
  // AsyncErrorComponent.name = COMPONENT_NAME_PREFIX + AsyncErrorComponent.name
  // @ts-ignore
  // AsyncLoadingComponent.name =
  //   COMPONENT_NAME_PREFIX + AsyncLoadingComponent.name

  app.component(AppComponent.name, AppComponent)
  // app.component(PageComponent.name, PageComponent)
  // app.component(AsyncErrorComponent.name, AsyncErrorComponent)
  // app.component(AsyncLoadingComponent.name, AsyncLoadingComponent)

  app.component(LayoutComponent.name, LayoutComponent)
}
