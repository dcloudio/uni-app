import { isFunction } from '@vue/shared'
import { createUniDOMStringMap } from '@dcloudio/uni-shared'

function normalizeDatasetResult(result: any) {
  if (result && result.dataset) {
    result.dataset = createUniDOMStringMap(result.dataset)
  }
  return result
}

function normalizeDatasetCallback(callback?: Function) {
  if (!isFunction(callback)) {
    return callback
  }
  return function datasetCallback(this: any, result: any) {
    if (Array.isArray(result)) {
      result.forEach(normalizeDatasetResult)
    } else {
      normalizeDatasetResult(result)
    }
    return callback.call(this, result)
  }
}

function normalizeSelectorQueryDataset(query: any) {
  if (!query) {
    return query
  }

  const oldExec = query.exec
  if (isFunction(oldExec)) {
    query.exec = function exec(callback?: Function) {
      return oldExec.call(this, normalizeDatasetCallback(callback))
    }
  }

  ;['boundingClientRect', 'scrollOffset'].forEach((name) => {
    const method = query[name]
    if (isFunction(method)) {
      query[name] = function datasetMethod(callback?: Function) {
        return method.call(this, normalizeDatasetCallback(callback))
      }
    }
  })

  const oldFields = query.fields
  if (isFunction(oldFields)) {
    query.fields = function fields(
      fields: UniApp.NodeField,
      callback?: Function
    ) {
      return oldFields.call(this, fields, normalizeDatasetCallback(callback))
    }
  }

  return query
}

function normalizeIntersectionObserverDataset(observer: any) {
  if (!observer) {
    return observer
  }

  const oldObserve = observer.observe
  if (isFunction(oldObserve)) {
    observer.observe = function observe(selector: string, callback?: Function) {
      return oldObserve.call(this, selector, normalizeDatasetCallback(callback))
    }
  }

  return observer
}

export function normalizeDatasetApi(name: string, api: unknown) {
  if (!isFunction(api)) {
    return api
  }

  if (name === 'createSelectorQuery') {
    return function createSelectorQuery(this: any, ...args: any[]) {
      return normalizeSelectorQueryDataset(api.apply(this, args))
    }
  }

  if (name === 'createIntersectionObserver') {
    return function createIntersectionObserver(this: any, ...args: any[]) {
      return normalizeIntersectionObserverDataset(api.apply(this, args))
    }
  }

  return api
}
