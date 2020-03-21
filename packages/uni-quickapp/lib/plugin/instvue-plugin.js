const path = require('path')
const WebpackSources = require('webpack-sources')

const extList = ['.vue', '.nvue']

class InstVuePlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('InstVuePlugin', (compilation) => {
      compilation.hooks.optimizeChunkAssets.tapAsync('InstVuePlugin', (chunks, callback) => {
        this.instMain(compilation, chunks)
        this.instVue(compilation, chunks)
        callback()
      })
    })
  }
  instMain(compilation, chunks) {
    if (chunks.find(chunk => chunk.files.includes('app.js'))) {
      const appAsset = compilation.assets['app.js']
      compilation.assets['app.js'] =
        new WebpackSources.ConcatSource(
          `(function(){\n      var handler = function() {\n        return `, appAsset,
          `\n      };\n      if (typeof window === "undefined") {\n        let options = handler();\n        options.default['manifest'] = ${JSON.stringify(global.framework.manifest)}\n        $app_define$(options.default)\n        $app_bootstrap$()\n      }\n    })();`
        )
    }
  }
  instVue(compilation, chunks) {
    chunks.forEach(chunk => {
      const extname = path.extname(Array.from(chunk.entryModule.buildInfo.fileDependencies)[0])
      if (!extList.includes(extname)) {
        return
      }
      chunk.files.forEach(file => {
        if (!/\.js$/.test(file)) {
          return
        }
        compilation.assets[file] = new WebpackSources.ConcatSource(
          `(function(){\n      var handler = function() {\n        return `,
          compilation.assets[file],
          `\n      };\n      if (typeof window === \"undefined\") {\n        let options = handler();\n        options = options.default ? options.default: options\n        options['type'] = 'page'\n        new Vue({render: function(h) {return h(options)}}).$mount('#app')\n      }\n    })();`
        )
      })
    })
  }
}
module.exports = InstVuePlugin
