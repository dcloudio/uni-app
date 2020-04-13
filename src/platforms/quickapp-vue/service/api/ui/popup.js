import {
  invoke
} from '../../bridge'

import prompt from '@system.prompt'

export function showModal ({
  title = '',
  content = '',
  showCancel = true,
  cancelText = '取消',
  cancelColor = '#000000',
  confirmText = '确定',
  confirmColor = '#3CC51F'
} = {}, callbackId) {
  prompt.showDialog({
    title: title,
    message: content,
    buttons: [
      {
        text: '确定',
        color: confirmColor
      }
    ],
    success: (data) => {
      console.log('handling callback')
      invoke(callbackId, {
        errMsg: 'showModal:ok',
        confirm: true,
        cancel: false
      })
    },
    cancel: () => {
      console.log('handling cancel')
    },
    fail: (data, code) => {
      console.log(`handling fail, code = ${code}`)
    }
  })
}
