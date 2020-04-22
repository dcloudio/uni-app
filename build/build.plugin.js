const path = require('path')
const del = require('del')

const {
  error
} = require('@vue/cli-shared-utils')

const Service = require('@vue/cli-service')

const vueConfig = require('./vue.config.js')

const extendsApiPath = path.resolve(__dirname, '../lib/h5/extends-api')

vueConfig.configureWebpack.resolve.alias['uni-invoke-api'] = extendsApiPath

const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd(), {
  inlineOptions: vueConfig
})
// 删除 cache 目录
del.sync(['node_modules/.cache'])

let pluginDir = process.argv[2]
if (!pluginDir) {
  console.error('缺少参数')
  process.exit(0)
}

if (pluginDir.indexOf('/') === -1) {
  pluginDir = path.resolve(__dirname, '../packages/uni-' + pluginDir)
}

const pkg = require(path.join(pluginDir, 'package.json'))
if (!pkg['uni-app']) {
  console.error('缺少 uni-app 配置')
  process.exit(0)
}

service.webpackRawConfigFns.push(function () {
  return {
    resolve: {
      alias: {
        'uni-platform/service/api.js': extendsApiPath,
        'uni-sub-platform': path.resolve(pluginDir, 'src'),
        'uni-platform-api': path.resolve(__dirname, '../src/platforms/h5/service/api'),
        'uni-sub-platform-api': path.resolve(pluginDir, 'src/service/api')
      }
    },
    module: {
      rules: [{
        test: path.resolve(__dirname, '../src/platforms/h5/service/api/index.js'),
        use: [{
          loader: path.resolve(__dirname, '../lib/extends-loader'),
          options: {
            extends: path.resolve(pluginDir, 'src/service/api'),
            base: path.resolve(__dirname, '../src/platforms/h5/service/api')
          }
        }]
      }]
    }
  }
})

service.run('build', {
  name: 'index',
  watch: process.env.UNI_WATCH === 'true',
  target: 'lib',
  formats: process.env.UNI_WATCH === 'true' ? 'umd' : 'umd-min',
  entry: './lib/h5/main.js',
  dest: path.join(pluginDir, 'dist'),
  clean: true,
  mode: process.env.NODE_ENV
}).then(function () {}).catch(err => {
  error(err)
  process.exit(1)
})
