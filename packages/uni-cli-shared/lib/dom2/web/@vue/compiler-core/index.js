'use strict'

module.exports = require(
  process.env.NODE_ENV === 'production'
    ? './dist/compiler-core.cjs.prod.js'
    : './dist/compiler-core.cjs.js'
)
