import {
  invoke
} from '../../bridge'

const SUB_FILENAME = 'app-sub-service.js'

function evaluateScriptFile (file, callback) {
  // TODO 有可能当前 instance 是非 app-service
  weex.requireModule('plus').evalJSFiles([file], callback)
}

export function loadSubPackage ({
  root
}, callbackId) {
  evaluateScriptFile(root + '/' + SUB_FILENAME, res => {
    invoke(callbackId, {
      errMsg: 'loadSubPackage:ok'
    })
  })
}
