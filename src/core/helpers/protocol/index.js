const protocol = Object.create(null)
const modules = require.context('./', true, /\.js$/)
modules.keys().forEach(function (key) {
  if (key !== './index.js') {
    Object.assign(protocol, modules(key))
  }
})
export default protocol
