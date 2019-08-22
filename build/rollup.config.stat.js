module.exports = {
  input: 'packages/uni-stat/src/index.js',
  output: {
    file: 'packages/uni-stat/dist/index.js',
    format: 'es'
  },
  external: ['vue', '../package.json'],
  plugins: []
}
