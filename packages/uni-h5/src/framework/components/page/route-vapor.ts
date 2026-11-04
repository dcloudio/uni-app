import type { Component } from 'vue'

import PageComponent from './index-vapor.vue'

export type VaporPageRouteComponent = Component & {
  __uniPageComponent: Component
  mpType?: 'page'
}

export function createVaporPageRouteComponent(pageComponent: Component) {
  return Object.assign({}, PageComponent, {
    __uniPageComponent: pageComponent,
  }) as VaporPageRouteComponent
}
