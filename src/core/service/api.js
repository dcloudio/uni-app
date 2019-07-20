export const api = Object.create(null)

const baseApis = require.context(
  './api',
  true,
  /\.js$/
)
baseApis.keys().forEach(function (key) {
  Object.assign(api, baseApis(key))
})

const platformApis = require.context(
  '../../platforms/' + __PLATFORM__ + '/service/api',
  true,
  /\.js$/
)

platformApis.keys().forEach(function (key) {
  Object.assign(api, platformApis(key))
})

export function invokeMethod (name, ...args) {
  return api[name](...args)
}
