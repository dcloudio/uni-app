export let supportsPassive = false
try {
  const opts = {}
  Object.defineProperty(opts, 'passive', ({
    get () {
      /* istanbul ignore next */
      supportsPassive = true
    }
  })) // https://github.com/facebook/flow/issues/285
  window.addEventListener('test-passive', null, opts)
} catch (e) {}
