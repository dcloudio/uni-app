
export function getClipboardData () {
  const pasteText = document.getElementById('#clipboard')
  const data = pasteText ? pasteText.value : undefined
  if (data) {
    return {
      data,
      errMsg: 'getClipboardData:ok'
    }
  } else {
    return {
      errMsg: 'getClipboardData:fail'
    }
  }
}

export function setClipboardData ({
  data
}) {
  const pasteText = document.getElementById('#clipboard')
  pasteText && pasteText.remove()
  const textarea = document.createElement('textarea')
  textarea.id = '#clipboard'
  textarea.style.position = 'absolute'
  textarea.style.top = '0'
  textarea.style.zIndex = '-9999'
  document.body.appendChild(textarea)
  textarea.value = data
  textarea.focus()
  textarea.select()
  const result = document.execCommand('Copy', false, null)
  if (result) {
    uni.showToast({
      title: '复制成功',
      icon: 'none'
    })
    return {
      errMsg: 'setClipboardData:ok'
    }
  } else {
    return {
      errMsg: 'setClipboardData:fail'
    }
  }
}
