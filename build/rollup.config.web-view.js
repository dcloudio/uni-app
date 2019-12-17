const path = require('path')
const babel = require('rollup-plugin-babel')
const alias = require('rollup-plugin-alias')
const uglify = require('rollup-plugin-uglify')
module.exports = {
  input: 'src/core/runtime/web-view/index.js',
  output: {
    name: 'uni',
    file: `dist/uni.webview.1.5.2.js`,
    format: 'umd'
  },
  plugins: [
    alias({
      'uni-platforms': path.resolve(__dirname, '../src/platforms')
    }),
    babel(),
    uglify.uglify({
      output: {
        ascii_only: true
      }
    })
  ]
}
