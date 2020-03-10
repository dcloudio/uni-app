module.exports = function(source, map) {
  return `
import 'uni-pages';
${source}
export default App;
`
}
