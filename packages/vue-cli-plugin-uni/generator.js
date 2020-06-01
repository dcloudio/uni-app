module.exports = (api, options, rootOptions) => {
  const mainVersion = require('./package.json').version
  const version = '^' + mainVersion
  api.extendPackage(pkg => {
    delete pkg.postcss
    delete pkg.browserslist
    return {
      scripts: {
        info: 'node node_modules/@dcloudio/vue-cli-plugin-uni/commands/info.js',
        serve: 'npm run dev:h5',
        build: 'npm run build:h5',
        'serve:quickapp-native': 'node node_modules/@dcloudio/uni-quickapp-native/bin/serve.js',
        'dev:h5': 'cross-env NODE_ENV=development UNI_PLATFORM=h5 vue-cli-service uni-serve',
        'dev:mp-qq': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-qq vue-cli-service uni-build --watch',
        'dev:mp-weixin': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-weixin vue-cli-service uni-build --watch',
        'dev:mp-baidu': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-baidu vue-cli-service uni-build --watch',
        'dev:mp-alipay': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-alipay vue-cli-service uni-build --watch',
        'dev:mp-toutiao': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-toutiao vue-cli-service uni-build --watch',
        'dev:quickapp-native': 'cross-env NODE_ENV=development UNI_PLATFORM=quickapp-native vue-cli-service uni-build --watch',
        'dev:quickapp-webview': 'cross-env NODE_ENV=development UNI_PLATFORM=quickapp-webview vue-cli-service uni-build --watch',
        'build:h5': 'cross-env NODE_ENV=production UNI_PLATFORM=h5 vue-cli-service uni-build',
        'build:mp-qq': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-qq vue-cli-service uni-build',
        'build:mp-weixin': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-weixin vue-cli-service uni-build',
        'build:mp-baidu': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-baidu vue-cli-service uni-build',
        'build:mp-alipay': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-alipay vue-cli-service uni-build',
        'build:mp-toutiao': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-toutiao vue-cli-service uni-build',
        'build:quickapp-native': 'cross-env NODE_ENV=production UNI_PLATFORM=quickapp-native vue-cli-service uni-build',
        'build:quickapp-webview': 'cross-env NODE_ENV=production UNI_PLATFORM=quickapp-webview vue-cli-service uni-build',
        'dev:mp-360': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-360 vue-cli-service uni-build --watch',
        'build:mp-360': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-360 vue-cli-service uni-build',
        'dev:custom': 'cross-env NODE_ENV=development uniapp-cli custom',
        'build:custom': 'cross-env NODE_ENV=production uniapp-cli custom',
        'test:h5': 'cross-env UNI_PLATFORM=h5 jest -i',
        'test:ios': 'cross-env UNI_PLATFORM=app-plus UNI_OS_NAME=ios jest -i',
        'test:android': 'cross-env UNI_PLATFORM=app-plus UNI_OS_NAME=android jest -i',
        'test:mp-weixin': 'cross-env UNI_PLATFORM=mp-weixin jest -i',
        'test:mp-baidu': 'cross-env UNI_PLATFORM=mp-baidu jest -i'
      },
      'uni-app': {
        scripts: {}
      },
      dependencies: {
        '@dcloudio/uni-app-plus': version,
        '@dcloudio/uni-h5': version,
        '@dcloudio/uni-mp-qq': version,
        '@dcloudio/uni-mp-weixin': version,
        '@dcloudio/uni-mp-baidu': version,
        '@dcloudio/uni-mp-alipay': version,
        '@dcloudio/uni-mp-toutiao': version,
        '@dcloudio/uni-mp-360': version,
        '@dcloudio/uni-quickapp-native': version,
        '@dcloudio/uni-quickapp-webview': version,
        '@dcloudio/uni-stat': version,
        flyio: '^0.6.2',
        vuex: '^3.2.0'
      },
      devDependencies: {
        '@dcloudio/uni-automator': version,
        '@dcloudio/uni-cli-shared': version,
        '@dcloudio/uni-migration': version,
        '@dcloudio/uni-template-compiler': version,
        '@dcloudio/vue-cli-plugin-hbuilderx': version,
        '@dcloudio/vue-cli-plugin-uni': version,
        '@dcloudio/vue-cli-plugin-uni-optimize': version,
        '@dcloudio/webpack-uni-mp-loader': version,
        '@dcloudio/webpack-uni-pages-loader': version,
        'babel-plugin-import': '^1.11.0',
        'cross-env': '^7.0.2',
        jest: '^25.4.0'
      },
      browserslist: [
        'Android >= 4',
        'ios >= 8'
      ]
    }
  })
}
