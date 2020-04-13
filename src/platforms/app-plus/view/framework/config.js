export function registerConfig (config) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[uni-app] registerConfig', __uniConfig)
  }
  global.__uniConfig = config
}
