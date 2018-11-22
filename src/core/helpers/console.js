const unshift = Array.prototype.unshift

function format (args) {
  unshift.call(args, '[system]')
  return args
}

function createLog (method) {
  return function () {
    let printLog = true
    if (method === 'debug' && !__uniConfig.debug) {
      printLog = false
    }
    printLog && global.console[method].apply(global.console, format(arguments))
  }
}

export default {
  log: createLog('log'),
  info: createLog('info'),
  warn: createLog('warn'),
  debug: createLog('debug'),
  error: createLog('error')
}
