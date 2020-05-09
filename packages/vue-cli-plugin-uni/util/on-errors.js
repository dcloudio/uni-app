const stringify = require('./stringify')
module.exports = function (errors) {
  const errMsg = stringify(errors, 'error')
  if (typeof errMsg !== 'string') {
    global.__error_reporting__ && global.__error_reporting__(errMsg.type, errMsg.msg)
    console.error(errMsg.msg)
  } else {
    console.error(errMsg)
  }
}
