const stringify = require('./stringify')
module.exports = function (errors) {
  console.error(stringify(errors))
}
