const path = require('path')

const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

const HandlerPlugin = require('@hap-toolkit/packager/lib/plugin/handler-plugin')
const ZipPlugin = require('@hap-toolkit/packager/lib/plugin/zip-plugin')
const NotifyPlugin = require('@hap-toolkit/packager/lib/plugin/notify-plugin')

const Css2jsonPlugin = require('@hap-toolkit/dsl-vue/lib/plugin/css2json-plugin')
const InstVuePlugin = require('@hap-toolkit/dsl-vue/lib/plugin/instvue-plugin')

const env = {
  // 平台：native
  NODE_PLATFORM: 'native',
  // 阶段: dev|test|release
  NODE_PHASE: process.env.NODE_PHASE
}

const dslFilename = 'vue.' + (process.env.NODE_ENV === 'production' ? 'prod' : 'dev') + '.js'
const manifest = global.framework.manifest

function genPriorities(e) {
  const o = [/^i18n\/.+\.json$/i, 'manifest.json', 'app.js', /^common\//i];
  if (e && e.router && e.router.entry) {
    const n = e.router.entry;
    o.splice(3, 0, new RegExp(`^${n}/$`), new RegExp(`^${n}/.+`))
  } else colorconsole.error('manifest.json 中未配置入口页面 router.entry');
  return o
}

module.exports = {
  devtool: false,
  entry: {
    'app': '/Users/fxy/Documents/demo/my-qa-project/src/App.vue?uxType=app',
    'pages/index/index': '/Users/fxy/Documents/demo/my-qa-project/src/pages/index/index.vue?uxType=page',
    'pages/detail/detail': '/Users/fxy/Documents/demo/my-qa-project/src/pages/detail/detail.vue?uxType=page',
    'pages/about/about': '/Users/fxy/Documents/demo/my-qa-project/src/pages/about/about.vue?uxType=page'
  },
  plugins: [
    new webpack.DefinePlugin({
      // 平台：na
      ENV_PLATFORM: JSON.stringify(env.NODE_PLATFORM),
      // 阶段: dev|test|release
      ENV_PHASE: JSON.stringify(env.NODE_PHASE),
      ENV_PHASE_DV: env.NODE_PHASE === 'dev',
      ENV_PHASE_QA: env.NODE_PHASE === 'test',
      ENV_PHASE_OL: env.NODE_PHASE === 'prod'
    }),
    new CopyPlugin([{
      from: path.resolve(__dirname, '../dist/' + dslFilename),
      to: 'dsl.js'
    }, {
      from: path.resolve(process.env.UNI_INPUT_DIR, 'manifest.json')
    }]),
    new HandlerPlugin({}),
    new Css2jsonPlugin(),
    new InstVuePlugin(),
    new ZipPlugin({
      name: manifest.package,
      icon: manifest.icon,
      versionCode: manifest.versionCode,
      output: path.resolve(process.env.UNI_OUTPUT_DIR),
      pathBuild: path.resolve(process.env.UNI_OUTPUT_DIR, 'build'),
      pathSignFolder: './sign',
      sign: process.env.NODE_ENV === 'production' ? 'release' : 'debug',
      priorities: genPriorities(manifest),
      subpackages: undefined,
      comment: '{"toolkit":"0.6.13","timeStamp":"2020-03-08T13:22:31.014Z","node":"v12.15.0","platform":"darwin","arch":"x64","extends":null}',
      cwd: process.env.UNI_INPUT_DIR,
      disableStreamPack: undefined,
      disableSubpackages: undefined
    }),
    new NotifyPlugin()
  ]
}
