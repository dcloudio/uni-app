module.exports = {
  input: 'packages/uni-cloud-stat/src/index.js',
  output: {
    file: 'packages/uni-cloud-stat/dist/index.js',
    format: 'es'
  },
  external: ['vue', '../package.json'],
  plugins: []
}
