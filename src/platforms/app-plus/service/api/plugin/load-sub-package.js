import {
  invoke
} from '../../bridge'

import {
  loadedSubPackages
} from '../../framework/load-sub-package'

const SUB_FILENAME = 'app-sub-service.js'

function evaluateScriptFile (file, callback) {
  __uniConfig.onServiceReady(() => {
    weex.requireModule('plus').evalJSFiles([file], callback)
  })
}

export function loadSubPackage ({
  root
}, callbackId) {
  if (loadedSubPackages.indexOf(root) !== -1) {
    return {
      errMsg: 'loadSubPackage:ok'
    }
  }
  loadedSubPackages.push(root)
  if (process.env.NODE_ENV !== 'production') {
    console.log('UNIAPP[loadSubPackage]:' + root)
  }
  const startTime = Date.now()
  evaluateScriptFile(root + '/' + SUB_FILENAME, res => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('UNIAPP[loadSubPackage]:耗时(' + (Date.now() - startTime) + ')')
    }
    invoke(callbackId, {
      errMsg: 'loadSubPackage:ok'
    })
  })
}
