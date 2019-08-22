module.exports = function hasRequireContext (code) {
  return /require\.context/g.test(code)
}
