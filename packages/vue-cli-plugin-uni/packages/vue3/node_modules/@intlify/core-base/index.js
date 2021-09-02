'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/core-base.cjs.prod.js')
} else {
  module.exports = require('./dist/core-base.cjs.js')
}
