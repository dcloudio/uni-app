module.exports = {
  initAutomator (args) {
    const port = args['auto-port'] || process.env.UNI_AUTOMATOR_PORT
    if (port) {
      const host = args['auto-host'] || process.env.UNI_AUTOMATOR_HOST || '0.0.0.0'
      const prepareURLs = require('@vue/cli-service/lib/util/prepareURLs')
      const urls = prepareURLs('ws', host, port, '')
      if (urls.lanUrlForConfig) {
        process.env.UNI_AUTOMATOR_WS_ENDPOINT = 'ws://' + urls.lanUrlForConfig + ':' + port
      } else {
        process.env.UNI_AUTOMATOR_WS_ENDPOINT = urls.localUrlForBrowser
      }
    }
  }
}
