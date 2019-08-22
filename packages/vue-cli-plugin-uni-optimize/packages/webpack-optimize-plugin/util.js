function cached(fn) {
  const cache = Object.create(null)
  return function cachedFn(str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

const camelizeRE = /-(\w)/g

const camelize = cached(function(str) {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

const capitalize = cached(function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

module.exports = {
  camelize,
  capitalize
}
