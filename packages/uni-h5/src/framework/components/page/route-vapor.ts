import type { Component } from 'vue'

import PageComponent from './index-vapor.vue'

export type VaporPageRouteComponent = Component & {
  __uniPageComponent: Component
  __uniGetPageProps: () => Record<string, any>
  mpType?: 'page'
}

export function createVaporPageRouteComponent(
  pageComponent: Component,
  getPageProps: () => Record<string, any>
) {
  return Object.assign({}, PageComponent, {
    __uniPageComponent: pageComponent,
    __uniGetPageProps: getPageProps,
  }) as VaporPageRouteComponent
}
