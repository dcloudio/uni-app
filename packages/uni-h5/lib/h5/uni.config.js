const fs = require('fs')
const path = require('path')

function getTemplatePath (template) {
  if (template) {
    const userTemplate = path.resolve(process.env.UNI_INPUT_DIR, template)
    if (fs.existsSync(userTemplate)) { return userTemplate }
  }
  return path.resolve(process.env.UNI_CLI_CONTEXT, 'public/index.html')
}

function transform (content, platformOptions) {
  if (platformOptions.darkmode === true) {
    // darkmode
    try {
      content += fs.readFileSync(require.resolve('@dcloudio/uni-h5/dist/index.dark.css'))
    } catch (error) { }
  }
  if (process.env.NODE_ENV === 'production') {
    return content + // shadow
      'body::after{position:fixed;content:\'\';left:-1000px;top:-1000px;-webkit-animation:shadow-preload .1s;-webkit-animation-delay:3s;animation:shadow-preload .1s;animation-delay:3s}@-webkit-keyframes shadow-preload{0%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}100%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}}@keyframes shadow-preload{0%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}100%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}}'
  }
  return content
}

function getIndexCssPath (assetsDir, template, hashKey) {
  const CopyWebpackPluginVersion = Number(require('copy-webpack-plugin/package.json').version.split('.')[0])
  const VUE_APP_INDEX_CSS_HASH = process.env[hashKey]
  if (VUE_APP_INDEX_CSS_HASH) {
    try {
      const templateContent = fs.readFileSync(getTemplatePath(template))
      if (new RegExp('\\b' + hashKey + '\\b').test(templateContent)) {
        return path.join(assetsDir, `[name].${VUE_APP_INDEX_CSS_HASH}${CopyWebpackPluginVersion > 7 ? '' : '.'}[ext]`)
      }
    } catch (e) { }
  }
  return assetsDir
}

module.exports = {
  options: {
    cssVars: {
      '--status-bar-height': '0px'
    },
    filterTag: 'wxs',
    vue: '@dcloudio/vue-cli-plugin-uni/packages/h5-vue'
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = [
      {
        from: require.resolve('@dcloudio/uni-h5/dist/index.css'),
        to: getIndexCssPath(vueOptions.assetsDir, platformOptions.template, 'VUE_APP_INDEX_CSS_HASH'),
        transform (content) {
          return transform(content, platformOptions)
        }
      },
      'hybrid/html'
    ]
    global.uniModules.forEach(module => {
      copyOptions.push('uni_modules/' + module + '/hybrid/html')
    })

    return copyOptions
  }
}
