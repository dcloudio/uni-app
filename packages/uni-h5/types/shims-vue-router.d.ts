import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    isEntry: boolean
    isTabBar: boolean
  }
}
