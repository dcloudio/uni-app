
const createWxMpIndependentPlugins = require('./createIndependentPlugin')
const RequireAsyncPlugin = require('./support-require-async/RequireAsyncPlugin')

module.exports = function createWxMpPlugins () {
  if (process.env.UNI_PLATFORM === 'mp-weixin') {
    return [
      ...createWxMpIndependentPlugins(),
      new RequireAsyncPlugin()
    ]
  }
  return []
}
