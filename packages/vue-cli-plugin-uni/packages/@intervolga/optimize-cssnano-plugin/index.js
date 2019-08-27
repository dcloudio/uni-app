const cssnano = require('cssnano');
const postcss = require('postcss');

/**
 * Optimize cssnano plugin
 *
 * @param {Object} options
 */
function OptimizeCssnanoPlugin(options) {
  this.options = Object.assign({
    sourceMap: false,
    filter(assetName){// fixed by xxxxxx custom filter
      return /\.css$/i.test(assetName);
    },
    cssnanoOptions: {
      preset: 'default',
    },
  }, options);

  if (this.options.sourceMap) {
    this.options.sourceMap = Object.assign(
      {inline: false},
      this.options.sourceMap || {});
  }
}

OptimizeCssnanoPlugin.prototype.apply = function(compiler) {
  const self = this;

  compiler.hooks.emit.tapAsync('OptimizeCssnanoPlugin',
    function(compilation, callback) {
      // Search for CSS assets
      const assetsNames = Object.keys(compilation.assets)
        .filter(self.options.filter);// fixed by xxxxxx custom filter
      let hasErrors = false;
      const promises = [];
      // Generate promises for each minification
      assetsNames.forEach((assetName) => {
        // Original CSS
        const asset = compilation.assets[assetName];
        const originalCss = asset.source();

        // Options for particalar cssnano call
        const postCssOptions = {
          from: assetName,
          to: assetName,
          map: false,
        };
        const cssnanoOptions = self.options.cssnanoOptions;

        // Extract or remove previous map
        const mapName = assetName + '.map';
        if (self.options.sourceMap) {
          // Use previous map if exist...
          if (compilation.assets[mapName]) {
            const mapObject = JSON.parse(compilation.assets[mapName].source());

            // ... and not empty
            if (mapObject.sources.length > 0 || mapObject.mappings.length > 0) {
              postCssOptions.map = Object.assign({
                prev: compilation.assets[mapName].source(),
              }, self.options.sourceMap);
            } else {
              postCssOptions.map = Object.assign({}, self.options.sourceMap);
            }
          }
        } else {
          delete compilation.assets[mapName];
        }

        // Run minification
        const promise = postcss([cssnano(cssnanoOptions)])
          .process(originalCss, postCssOptions)
          .then((result) => {
              if (hasErrors) {
                return;
              }

              // Extract CSS back to assets
              const processedCss = result.css;
              compilation.assets[assetName] = {
                source: function() {
                  return processedCss;
                },
                size: function() {
                  return processedCss.length;
                },
              };

              // Extract map back to assets
              if (result.map) {
                const processedMap = result.map.toString();

                compilation.assets[mapName] = {
                  source: function() {
                    return processedMap;
                  },
                  size: function() {
                    return processedMap.length;
                  },
                };
              }
            }
          ).catch(function(err) {
              hasErrors = true;
              throw new Error('CSS minification error: ' + err.message +
                '. File: ' + assetName);
            }
          );
        promises.push(promise);
      });

      Promise.all(promises)
        .then(function() {
          callback();
        })
        .catch(callback);
    });
};

module.exports = OptimizeCssnanoPlugin;
