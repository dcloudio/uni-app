import { isFunction } from '@vue/shared'
interface Options {
  callback?: string
  timeout?: number
}

export function getJSONP(
  url: string,
  options: Options,
  success: Function,
  error: Function
) {
  var js = document.createElement('script')
  var callbackKey = options.callback || 'callback'
  var callbackName = '__callback' + Date.now()
  var timeout = options.timeout || 30000
  var timing: ReturnType<typeof setTimeout>
  function end() {
    clearTimeout(timing)
    delete (window as any)[callbackName]
    js.remove()
  }
  ;(window as any)[callbackName] = (res: any) => {
    if (isFunction(success)) {
      success(res)
    }
    end()
  }
  js.onerror = () => {
    if (isFunction(error)) {
      error()
    }
    end()
  }
  timing = setTimeout(function () {
    if (isFunction(error)) {
      error()
    }
    end()
  }, timeout)
  js.src =
    url + (url.indexOf('?') >= 0 ? '&' : '?') + callbackKey + '=' + callbackName
  document.body.appendChild(js)
}
