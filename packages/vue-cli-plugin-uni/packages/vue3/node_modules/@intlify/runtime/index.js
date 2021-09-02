'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/runtime.cjs.prod.js')
} else {
  module.exports = require('./dist/runtime.cjs.js')
}
