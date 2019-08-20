module.exports = (api, options, rootOptions) => {
  let version = '*'
  if (require('./package.json').version.indexOf('alpha') !== -1) {
    version = '^1.0.0-alpha-22120190814001'
  }
  api.extendPackage(pkg => {
    delete pkg.postcss
    delete pkg.browserslist
    return {
      scripts: {
        'info': 'node node_modules/@dcloudio/vue-cli-plugin-uni/commands/info.js',
        'serve': 'npm run dev:h5',
        'build': 'npm run build:h5',
        'dev:h5': 'cross-env NODE_ENV=development UNI_PLATFORM=h5 vue-cli-service uni-serve',
        'dev:mp-qq': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-qq vue-cli-service uni-build --watch',
        'dev:mp-weixin': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-weixin vue-cli-service uni-build --watch',
        'dev:mp-baidu': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-baidu vue-cli-service uni-build --watch',
        'dev:mp-alipay': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-alipay vue-cli-service uni-build --watch',
        'dev:mp-toutiao': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-toutiao vue-cli-service uni-build --watch',
        'build:h5': 'cross-env NODE_ENV=production UNI_PLATFORM=h5 vue-cli-service uni-build',
        'build:mp-qq': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-qq vue-cli-service uni-build',
        'build:mp-weixin': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-weixin vue-cli-service uni-build',
        'build:mp-baidu': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-baidu vue-cli-service uni-build',
        'build:mp-alipay': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-alipay vue-cli-service uni-build',
        'build:mp-toutiao': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-toutiao vue-cli-service uni-build',
        'dev:custom': 'cross-env NODE_ENV=development uniapp-cli custom',
        'build:custom': 'cross-env NODE_ENV=production uniapp-cli custom'
      },
      'uni-app': {
        'scripts': {}
      },
      dependencies: {
        '@dcloudio/uni-app-plus': version,
        '@dcloudio/uni-h5': version,
        '@dcloudio/uni-mp-qq': version,
        '@dcloudio/uni-mp-weixin': version,
        '@dcloudio/uni-mp-baidu': version,
        '@dcloudio/uni-mp-alipay': version,
        '@dcloudio/uni-mp-toutiao': version,
        '@dcloudio/uni-stat': version,
        'flyio': '^0.6.2',
        'vuex': '^3.0.1'
      },
      devDependencies: {
        '@dcloudio/uni-cli-shared': version,
        '@dcloudio/uni-template-compiler': version,
        '@dcloudio/webpack-uni-mp-loader': version,
        '@dcloudio/webpack-uni-pages-loader': version,
        'babel-plugin-import': '^1.11.0'
      },
      browserslist: [
        'last 3 versions',
        'Android >= 4.4',
        'ios >= 8'
      ]
    }
  })
}
