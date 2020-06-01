const utils = require('loader-utils')

module.exports = function (source, map) {
  this.cacheable()

  const opts = utils.getOptions(this) || {}
  this.callback(null, [].concat(opts.before, source, opts.after).join('').trim(), map)
}
