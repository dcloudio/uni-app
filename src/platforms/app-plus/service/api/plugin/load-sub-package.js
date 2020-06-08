import {
  invoke
} from '../../bridge'

const SUB_FILENAME = 'app-sub-service.js'

function evaluateScriptFile (file, callback) {
  setTimeout(() => {
    callback()
  }, 2000)
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
