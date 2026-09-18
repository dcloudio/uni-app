'use strict'

module.exports = require(
  process.env.NODE_ENV === 'production'
    ? './dist/shared.cjs.prod.js'
    : './dist/shared.cjs.js'
)
