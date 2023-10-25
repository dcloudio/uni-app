const path = require('path')
const {
  resolveUTSModule
} = require('./uts')
class UTSResolverPlugin {
  apply (resolver) {
    resolver.hooks.resolve.tapAsync('UTSResolverPlugin', (request, resolveContext, callback) => {
      let utsModulePath = ''
      if (request.request.startsWith('@/uni_modules/')) {
        utsModulePath = path.resolve(process.env.UNI_INPUT_DIR, request.request.replace('@/', ''))
      } else if (request.request.includes('uni_modules')) {
        utsModulePath = path.resolve(request.path, request.request)
      }
      if (utsModulePath) {
        const utsModule = resolveUTSModule(utsModulePath)
        if (utsModule) {
          if (process.env.UNI_PLATFORM === 'app-plus') {
            request.request = utsModule + '/package.json?uts-proxy'
          } else {
            request.request = utsModule
          }
        }
      }
      callback()
    })
  }
}

module.exports = UTSResolverPlugin
