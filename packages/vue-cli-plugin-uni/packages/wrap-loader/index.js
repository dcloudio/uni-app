const utils = require('loader-utils')

module.exports = function (source) {
  this.cacheable()

  const opts = utils.getOptions(this) || {}
  // fixed by xxxxxx 保持行号不变
  return [].concat(opts.before, source, opts.after).join('').trim()
  // return [].concat(opts.before, source, opts.after).join('\n').trim()
}
