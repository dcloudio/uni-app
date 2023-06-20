const api = Object.create(null)

const modules = require.context('./api', true, /\.js$/)
modules.keys().forEach(function (key) {
  Object.assign(api, modules(key))
})

export default api
