const Path = require('path')
const extractArgs = require('./extract-args')
const resolveRequireModules = require('./resolve-reqquire-modules')
const resolveRequireCode = require('./resolve-require-code')

module.exports = async function gernerateRequireContextCode (id, code) {
  const currentCodeDirname = Path.dirname(id)
  const data = await extractArgs(code, currentCodeDirname)
  let head = ''

  const body = data.reduceRight((res, r) => {
    const {
      start, end,
      dirname, recursive, regexp
    } = r
    const modules = resolveRequireModules(dirname, recursive, regexp)
    const moduleCode = resolveRequireCode(dirname, modules)
    const {
      importCode,
      requireFnCode
    } = moduleCode

    head += importCode
    res = [
      res.slice(0, start),
      requireFnCode,
      res.slice(end)
    ].join('')
    return res
  }, code)

  return [
    head,
    body
  ].join('\n')
}
