import {
  isPlainObject
} from 'uni-shared'

function setResult (data, k, v) {
  data[k] = v
}

function diffObject (newObj, oldObj) {
  let result, key, cur, old
  for (key in newObj) {
    cur = newObj[key]
    old = oldObj[key]
    if (old !== cur) {
      if (key === 's' && isPlainObject(cur) && isPlainObject(old)) {
        const style = diffObject(cur, old)
        style && setResult(result || (result = Object.create(null)), 's', style)
      } else {
        setResult(result || (result = Object.create(null)), key, cur)
      }
    }
  }
  return result
}

export function diff (newData, oldData, result) {
  let id, cur, old
  for (id in newData) {
    cur = newData[id]
    old = oldData[id]
    if (!old) {
      setResult(result, id, cur)
      continue
    }
    const idObj = diffObject(cur, old)
    idObj && setResult(result, id, idObj)
  }
  return result
}
