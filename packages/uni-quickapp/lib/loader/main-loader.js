const path = require('path')

const isWin = /^win/.test(process.platform)
const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

const polyfill = normalizePath(path.resolve(__dirname, '../polyfill.css'))

module.exports = function(source, map) {
  return `
import 'uni-pages';
import '${polyfill}';
${source}
export default App;
`
}
