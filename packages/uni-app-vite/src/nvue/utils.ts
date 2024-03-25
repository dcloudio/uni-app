export function external(appService: boolean) {
  return appService ? ['vue'] : ['vue', 'vuex', 'pinia']
}
export function globals(appService: boolean): { [name: string]: string } {
  return appService
    ? { vue: 'Vue' }
    : {
        vue: 'Vue',
        vuex: 'Vuex',
        pinia: 'Pinia',
      }
}
export function esbuildGlobals(appService: boolean): {
  [name: string]: string
} {
  return appService
    ? { vue: 'Vue' }
    : {
        vue: 'Vue',
        vuex: 'uni.Vuex',
        pinia: 'uni.Pinia',
      }
}
