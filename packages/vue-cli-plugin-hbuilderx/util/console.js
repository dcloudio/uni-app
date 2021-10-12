const ZERO_WIDTH_CHAR = {
  NOTE: '',
  WARNING: '\u200B',
  ERROR: '\u200C',
  backup0: '\u200D',
  backup1: '\u200E',
  backup2: '\u200F',
  backup3: '\uFEFF'
}

module.exports = {
  warn (msg) {
    msg = ZERO_WIDTH_CHAR.WARNING + msg + ZERO_WIDTH_CHAR.WARNING
    console.warn(msg)
  },
  error (msg) {
    msg = ZERO_WIDTH_CHAR.ERROR + msg + ZERO_WIDTH_CHAR.ERROR
    console.error(msg)
  },
  log (msg) {
    console.log(msg)
  }
}
