const path = require('path')

const {
  transform
} = require('@babel/core')

transform(`console.log('123')`, {
  filename: '/index.vue',
  configFile: false,
  minified: true,
  plugins: [path.resolve(__dirname, '../packages/babel-plugin-console/dist/index.js')]
}, function (err, result) {
  console.log(err, result)
})
