/**
 * JSONP请求
 * @param {string} url 请求的地址
 * @param {object} options 请求的参数
 * @param {Function} success 请求成功的回调
 * @param {Function} error 请求失败的回调
 */
export function getJSONP (url, options, success, error) {
  var js = document.createElement('script')
  var callbackKey = options.callback || 'callback'
  var callbackName = '__callback' + Date.now()
  var timeout = options.timeout || 30000
  var timing
  function end () {
    clearTimeout(timing)
    delete window[callbackName]
    js.remove()
  }
  window[callbackName] = (res) => {
    if (typeof success === 'function') {
      success(res)
    }
    end()
  }
  js.onerror = () => {
    if (typeof error === 'function') {
      error()
    }
    end()
  }
  timing = setTimeout(function () {
    if (typeof error === 'function') {
      error()
    }
    end()
  }, timeout)
  js.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + callbackKey + '=' + callbackName
  document.body.appendChild(js)
}
