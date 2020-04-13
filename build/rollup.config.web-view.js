const path = require('path')
const babel = require('rollup-plugin-babel')
const alias = require('@rollup/plugin-alias')
const terser = require('rollup-plugin-terser')
module.exports = {
  input: 'src/core/runtime/web-view/index.js',
  output: {
    name: 'uni',
    file: 'dist/uni.webview.1.5.2.js',
    format: 'umd'
  },
  plugins: [
    alias({
      entries: [{
        find: 'uni-shared',
        replacement: path.resolve(__dirname, '../src/shared/index.js')
      }, {
        find: 'uni-platforms',
        replacement: path.resolve(__dirname, '../src/platforms')
      }]
    }),
    babel(),
    terser.terser()
  ]
}
