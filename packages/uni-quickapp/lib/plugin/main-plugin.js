const WebpackSources = require('webpack-sources')
class InstMainPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('InstMainPlugin', (compilation) => {
      compilation.hooks.optimizeChunkAssets.tapAsync('InstMainPlugin', (chunks, callback) => {
        if (chunks.find(chunk => chunk.files.includes('app.js'))) {
          const appAsset = compilation.assets['app.js']
          compilation.assets['app.js'] =
            new WebpackSources.ConcatSource(
              `(function(){\n      var handler = function() {\n        return `, appAsset,
              `\n      };\n      if (typeof window === "undefined") {\n        let options = handler();\n        options.default['manifest'] = ${JSON.stringify(global.framework.manifest)}\n        $app_define$(options.default)\n        $app_bootstrap$()\n      }\n    })();`
            )
        }
        callback()
      })
    })
  }
}
module.exports = InstMainPlugin
