export function tryCatchFramework(fn: Function): Function {
  return function () {
    try {
      return fn.apply(fn, arguments)
    } catch (e) {
      // TODO
      console.error(e)
    }
  }
}

export function tryCatch(fn: Function): Function {
  return function () {
    try {
      return fn.apply(fn, arguments)
    } catch (e) {
      // TODO
      console.error(e)
    }
  }
}
