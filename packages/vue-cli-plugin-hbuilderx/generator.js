module.exports = (api, options, rootOptions) => {
  api.extendPackage(pkg => {
    return {
      scripts: {
        'dev:app-plus': 'cross-env NODE_ENV=development UNI_PLATFORM=app-plus vue-cli-service uni-build --watch',
        'build:app-plus': 'cross-env NODE_ENV=production UNI_PLATFORM=app-plus vue-cli-service uni-build'
      }
    }
  })
}
