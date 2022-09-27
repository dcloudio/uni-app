'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/vue-composition-api.common.prod.js')
} else {
  module.exports = require('./dist/vue-composition-api.common.js')
}
