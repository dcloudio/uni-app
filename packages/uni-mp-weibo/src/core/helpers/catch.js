/**
 * 框架内 try-catch
 */
export function tryCatchFramework (fn) {
  return function () {
    try {
      return fn.apply(fn, arguments)
    } catch (e) {
      // TODO
      console.error(e)
    }
  }
}
/**
 * 开发者 try-catch
 */
export function tryCatch (fn) {
  return function () {
    try {
      return fn.apply(fn, arguments)
    } catch (e) {
      // TODO
      console.error(e)
    }
  }
}
