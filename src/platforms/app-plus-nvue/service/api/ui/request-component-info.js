function parseDataset (attr) {
  const dataset = {}

  Object.keys(attr || {}).forEach(key => {
    if (key.indexOf('data') === 0) {
      let str = key.replace('data', '')
      str = str.charAt(0).toLowerCase() + str.slice(1)
      dataset[str] = attr[key]
    }
  })

  return dataset
}

function findAttrs (ids, elm, result) {
  const nodes = elm.children
  if (!Array.isArray(nodes)) {
    return false
  }
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (node.attr) {
      const index = ids.indexOf(node.attr.id)
      if (index >= 0) {
        result[index] = {
          id: ids[index],
          ref: node.ref,
          dataset: parseDataset(node.attr)
        }
        if (ids.length === 1) {
          break
        }
      }
    }
    if (node.children) {
      findAttrs(ids, node, result)
    }
  }
}

function getSelectors (queue) {
  const ids = []
  for (let i = 0; i < queue.length; i++) {
    const selector = queue[i].selector
    if (selector.indexOf('#') === 0) {
      ids.push(selector.substring(1))
    }
  }
  return ids
}

function getComponentRectAll (dom, attrs, index, result, callback) {
  const attr = attrs[index]
  dom.getComponentRect(attr.ref, option => {
    option.size.id = attr.id
    option.size.dataset = attr.dataset
    result.push(option.size)
    index += 1
    if (index < attrs.length) {
      getComponentRectAll(dom, attrs, index, result, callback)
    } else {
      callback(result)
    }
  })
}

export function requestComponentInfo (pageVm, queue, callback) {
  // TODO 重构，逻辑不对，queue 里的每一项可能有单独的作用域查找（即 component）
  const dom = pageVm._$weex.requireModule('dom')
  const selectors = getSelectors(queue)
  const outAttrs = new Array(selectors.length)
  findAttrs(selectors, pageVm.$el, outAttrs)
  getComponentRectAll(dom, outAttrs, 0, [], (result) => {
    callback(result)
  })
}
