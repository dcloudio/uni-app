const mixins = []
const context = require.context('./', false, /\.js$/)
context.keys().forEach(function (key) {
  if (key !== './index.js') {
    mixins.push(context(key).default)
  }
})
export default mixins
