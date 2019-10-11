function setResult (data, k, v) {
  data[k] = v
}

function diffObject (id, newObj, oldObj, result) {
  let key, cur, old
  for (key in newObj) {
    cur = newObj[key]
    old = oldObj[key]
    if (old !== cur) {
      setResult(result[id] || (result[id] = {}), key, cur)
    }
  }
}

export function diff (newData, oldData) {
  const result = Object.create(null)
  let id, cur, old
  for (id in newData) {
    cur = newData[id]
    old = oldData[id]
    if (!old) {
      setResult(result, id, cur)
      continue
    }
    diffObject(id, cur, old, result)
  }
  return result
}
