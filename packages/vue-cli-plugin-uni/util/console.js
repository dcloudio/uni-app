const ZERO_WIDTH_CHAR = {
  NOTE: '',
  WARNING: '\u200B',
  ERROR: '\u200C',
  backup0: '\u200D',
  backup1: '\u200E',
  backup2: '\u200F',
  backup3: '\uFEFF'
}

function overridedConsole (name, oldFn, char) {
  console[name] = function (...args) {
    oldFn.apply(this, args.map(arg => {
      let item
      if (typeof arg !== 'object') {
        item = `${char}${arg}${char}`
      } else {
        item = `${char}${JSON.stringify(arg)}${char}`
      }

      return item
    }))
  }
}
if (typeof console !== 'undefined') {
  overridedConsole('warn', console.warn, ZERO_WIDTH_CHAR.WARNING)
  // overridedConsole('error', console.error, ZERO_WIDTH_CHAR.ERROR)
}
