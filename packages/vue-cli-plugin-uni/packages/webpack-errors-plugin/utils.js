/**
 * Dedupes array based on criterion returned from iteratee function.
 * Ex: uniqueBy(
 *     [{ id: 1 }, { id: 1 }, { id: 2 }],
 *     val => val.id
 * ) = [{ id: 1 }, { id: 2 }]
 */
function uniqueBy (arr, fun) {
  const seen = {}
  return arr.filter(el => {
    const e = fun(el)
    return !(e in seen) && (seen[e] = 1)
  })
}

module.exports = {
  uniqueBy: uniqueBy
}
