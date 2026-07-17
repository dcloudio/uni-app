import { isFunction } from '@vue/shared'
import { UniDOMStringMap, createUniDOMStringMap } from '@dcloudio/uni-shared'

function normalizeDatasetResult(result: any) {
  if (Array.isArray(result)) {
    result.forEach(normalizeDatasetResult)
    return result
  }
  if (
    result &&
    result.dataset &&
    !(result.dataset instanceof UniDOMStringMap)
  ) {
    result.dataset = createUniDOMStringMap(result.dataset)
  }
  return result
}

function normalizeDatasetCallback(callback?: Function) {
  if (!isFunction(callback)) {
    return callback
  }
  return function datasetCallback(this: any, result: any) {
    normalizeDatasetResult(result)
    return callback.call(this, result)
  }
}

function normalizeSelectorQueryMethods(target: any) {
  if (!target) {
    return target
  }
  ;['boundingClientRect', 'scrollOffset'].forEach((name) => {
    const method = target[name]
    if (isFunction(method)) {
      target[name] = function datasetMethod(callback?: Function) {
        return method.call(this, normalizeDatasetCallback(callback))
      }
    }
  })

  const oldFields = target.fields
  if (isFunction(oldFields)) {
    target.fields = function fields(
      fields: UniApp.NodeField,
      callback?: Function
    ) {
      return oldFields.call(this, fields, normalizeDatasetCallback(callback))
    }
  }

  return target
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

  normalizeSelectorQueryMethods(query)
  ;['select', 'selectAll', 'selectViewport'].forEach((name) => {
    const method = query[name]
    if (isFunction(method)) {
      query[name] = function datasetMethod(...args: any[]) {
        const target = method.apply(this, args)
        return target === query ? target : normalizeSelectorQueryMethods(target)
      }
    }
  })

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
