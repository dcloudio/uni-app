'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/message-compiler.cjs.prod.js')
} else {
  module.exports = require('./dist/message-compiler.cjs.js')
}
