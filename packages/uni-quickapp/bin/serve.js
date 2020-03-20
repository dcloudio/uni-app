const path = require('path')
const moduleAlias = require('module-alias')
moduleAlias.addAlias('../service', (fromPath, request, alias) => {
  // @hap-toolkit/packager/lib/router/routes/index.js
  if (fromPath.indexOf('/@hap-toolkit') !== -1 && fromPath.indexOf('packager') !== -1) {
    return path.resolve(__dirname, 'service.js')
  }
  return path.join(fromPath, '..', request)
})
require('@hap-toolkit/server').launchServer({})
