function shouldReport (err = '') {
  try {
    const errMsg = err.toString()
    // 目前简单的上报逻辑为：错误信息中包含@dcloudio包名
    if (
      errMsg.includes('@dcloudio') &&
      !errMsg.includes('Errors compiling template')
    ) {
      return true
    }
  } catch (e) {}
  return false
}

// err:string|Error
function report (type, err) {
  if (shouldReport(err)) {
    // console.log('Error Reporting...')
    // const https = require('https')
    // const data = ...
    // const req = https.request({
    //   hostname: '',
    //   port: 8080,
    //   path: '/todos',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Content-Length': data.length
    //   }
    // })
    // req.write(data)
    // req.end()
  }
}

global.__error_reporting__ = report

process
  .on('unhandledRejection', (reason, p) => {
    global.__error_reporting__ && global.__error_reporting__('unhandledRejection', reason)
  })
  .on('uncaughtException', err => {
    global.__error_reporting__ && global.__error_reporting__('uncaughtException', err)
  })
