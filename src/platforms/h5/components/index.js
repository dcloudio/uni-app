import Vue from 'vue'

import App from './app'
import Page from './page'
import AsyncError from './async-error'
import AsyncLoading from './async-loading'

import SystemRouteComponents from 'uni-h5-system-routes'

Vue.component(App.name, App)
Vue.component(Page.name, Page)
Vue.component(AsyncError.name, AsyncError)
Vue.component(AsyncLoading.name, AsyncLoading)

Object.keys(SystemRouteComponents).forEach(name => {
  const Component = SystemRouteComponents[name]
  Vue.component(Component.name, Component)
})
