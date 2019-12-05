function relative (from, to) {
  if (to.indexOf('/') === 0) {
    from = ''
  }
  const fromArr = from.split('/')
  const toArr = to.split('/')
  fromArr.pop()
  while (toArr.length) {
    const part = toArr.shift()
    if (part !== '' && part !== '.') {
      if (part !== '..') {
        fromArr.push(part)
      } else {
        fromArr.pop()
      }
    }
  }
  return fromArr.join('/')
}

export function parseRelations (relations, vueComponentOptions) {
  if (!relations) {
    return
  }
  Object.keys(relations).forEach(name => {
    const relation = relations[name]
    relation.name = name
    relation.target = relation.target ? String(relation.target) : relative(global['__wxRoute'], name)
  })
  vueComponentOptions.mpOptions.relations = relations
}
