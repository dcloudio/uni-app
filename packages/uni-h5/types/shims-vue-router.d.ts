import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    route: string
    isEntry: boolean
    isTabBar: boolean
    topWindow?: boolean
    leftWindow?: boolean
    rightWindow?: boolean
    maxWidth?: string | number
  }
}
