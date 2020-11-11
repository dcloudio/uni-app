function mergeWith (objects, customizer) {
  const [first, ...rest] = objects
  let ret = first
  rest.forEach(a => {
    ret = mergeTo(ret, a, customizer)
  })
  return ret
}

function mergeTo (a, b, customizer) {
  const ret = {}
  Object.keys(a)
    .concat(Object.keys(b))
    .forEach(k => {
      const v = customizer(a[k], b[k], k)
      ret[k] = typeof v === 'undefined' ? a[k] : v
    })
  return ret
}

module.exports = mergeWith
