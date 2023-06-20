const protocol = Object.create(null)
const modules = require.context('./protocol', true, /\.js$/)
modules.keys().forEach(function (key) {
  Object.assign(protocol, modules(key))
})
export default protocol
