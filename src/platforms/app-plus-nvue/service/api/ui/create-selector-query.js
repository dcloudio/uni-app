import {
  isFn
} from 'uni-shared'

class NodesRef {
  constructor (selectorQuery, component, selector, single) {
    this._selectorQuery = selectorQuery
    this._component = component
    this._selector = selector
    this._single = single
  }

  boundingClientRect (callback) {
    this._selectorQuery._push(
      this._selector,
      this._component,
      this._single, {
        id: true,
        dataset: true,
        rect: true,
        size: true
      },
      callback)
    return this._selectorQuery
  }

  fields (fields, callback) {
    this._selectorQuery._push(
      this._selector,
      this._component,
      this._single,
      fields,
      callback
    )
    return this._selectorQuery
  }

  scrollOffset (callback) {
    this._selectorQuery._push(
      this._selector,
      this._component,
      this._single, {
        id: true,
        dataset: true,
        scrollOffset: true
      },
      callback
    )
    return this._selectorQuery
  }
}

function processDataset (attr) {
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
  let nodes = elm.children
  if (!Array.isArray(nodes)) {
    return false
  }
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i]
    if (node.attr) {
      let index = ids.indexOf('#' + node.attr.id)
      if (index >= 0) {
        result[index] = {
          id: ids[index],
          ref: node.ref,
          dataset: processDataset(node.attr)
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
  let ids = []
  for (let i = 0; i < queue.length; i++) {
    const selector = queue[i].selector
    if (selector.indexOf('#') === 0) {
      ids.push(selector)
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

function requestComponentInfo (dom, component, queue, callback) {
  const selectors = getSelectors(queue)
  let outAttrs = new Array(selectors.length)
  findAttrs(selectors, component.$el, outAttrs)
  getComponentRectAll(dom, outAttrs, 0, [], (result) => {
    callback(result)
  })
}

class SelectorQuery {
  constructor (pageId) {
    this.pageId = pageId
    this._queue = []
    this._queueCb = []
  }

  exec (callback) {
    if (!this._component) {
      return
    }
    this._dom = this._component._$weex.requireModule('dom')
    requestComponentInfo(this._dom, this._component, this._queue, res => {
      const queueCbs = this._queueCb
      res.forEach((result, index) => {
        const queueCb = queueCbs[index]
        if (isFn(queueCb)) {
          queueCb.call(this, result)
        }
      })
      isFn(callback) && callback.call(this, res)
    })
  }

  ['in'] (component) {
    if (!component) {
      return console.warn('uni.createSelectorQuery 必须传入当前 vm 对象(this)')
    }
    this._component = component
    return this
  }

  select (selector) {
    return new NodesRef(this, this._component, selector, true)
  }

  selectAll (selector) {
    return new NodesRef(this, this._component, selector, false)
  }

  selectViewport () {
    return new NodesRef(this, 0, '', true)
  }

  _push (selector, component, single, fields, callback) {
    this._queue.push({
      component,
      selector,
      single,
      fields
    })
    this._queueCb.push(callback)
  }
}

export function createSelectorQuery () {
  return new SelectorQuery()
}
