'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/devtools-if.cjs.prod.js')
} else {
  module.exports = require('./dist/devtools-if.cjs.js')
}
