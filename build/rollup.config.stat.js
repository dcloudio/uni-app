module.exports = {
  input: 'packages/uni-stat/src/index.js',
  output: {
    file: 'packages/uni-stat/dist/index.js',
    format: 'es'
  },
  external: ['vue', '@dcloudio/uni-stat/package.json'],
  plugins: []
}
