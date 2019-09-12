const stringify = require('./stringify')
module.exports = function (errors) {
  const {
    runByHBuilderX
  } = require('@dcloudio/uni-cli-shared')
  if (runByHBuilderX) {
    console.log(stringify(errors))
  } else {
    console.warn(stringify(errors))
  }
}
