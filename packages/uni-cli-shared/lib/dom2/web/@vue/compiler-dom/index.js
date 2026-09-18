'use strict'

module.exports = require(
  process.env.NODE_ENV === 'production'
    ? './dist/compiler-dom.cjs.prod.js'
    : './dist/compiler-dom.cjs.js'
)
