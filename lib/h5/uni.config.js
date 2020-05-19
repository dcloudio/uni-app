const fs = require('fs')
const path = require('path')

function getTemplatePath (template) {
  if (template) {
    const userTemplate = path.resolve(process.env.UNI_INPUT_DIR, template)
    if (fs.existsSync(userTemplate))
      return userTemplate
  }
  return path.resolve(process.env.UNI_CLI_CONTEXT, 'public/index.html')
}

function transform(content) {
  if (process.env.NODE_ENV === 'production') {
    return content + // shadow
      `body::after{position:fixed;content:'';left:-1000px;top:-1000px;-webkit-animation:shadow-preload .1s;-webkit-animation-delay:3s;animation:shadow-preload .1s;animation-delay:3s}@-webkit-keyframes shadow-preload{0%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}100%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}}@keyframes shadow-preload{0%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}100%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}}`
  }
  return content
}

function getIndexCssPath(assetsDir, template) {
  const VUE_APP_INDEX_CSS_HASH = process.env.VUE_APP_INDEX_CSS_HASH
  if (VUE_APP_INDEX_CSS_HASH) {
    try {
      const templateContent = fs.readFileSync(getTemplatePath(template))
      if (/\bVUE_APP_INDEX_CSS_HASH\b/.test(templateContent)) {
        return path.join(assetsDir, `[name].${VUE_APP_INDEX_CSS_HASH}.[ext]`)
      }
    } catch (e) {}
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
  copyWebpackOptions(platformOptions, vueOptions) {
    return [{
        from: require.resolve('@dcloudio/uni-h5/dist/index.css'),
        to: getIndexCssPath(vueOptions.assetsDir, platformOptions.template),
        transform
      },
      'hybrid/html'
    ]
  }
}
