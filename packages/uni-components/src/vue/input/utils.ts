import { once } from '@dcloudio/uni-shared'
import type { Ref } from 'vue'
import type { State } from '../../helpers/useField'

type ResetCache = { fn: (() => void) | null }

const resolveDigitDecimalPointDeleteContentBackward = once(() => {
  //#if !_NODE_JS_
  if (__PLATFORM__ === 'app') {
    const osVersion = plus.os.version
    return (
      plus.os.name === 'iOS' &&
      !!osVersion &&
      parseInt(osVersion) >= 16 &&
      parseFloat(osVersion) < 17.2
    )
  }

  if (__PLATFORM__ === 'h5') {
    const ua = navigator.userAgent
    let osVersion = ''
    const osVersionFind = ua.match(/OS\s([\w_]+)\slike/)
    if (osVersionFind) {
      osVersion = osVersionFind[1].replace(/_/g, '.')
    } else if (/Macintosh|Mac/i.test(ua) && navigator.maxTouchPoints > 0) {
      const versionMatched = ua.match(/Version\/(\S*)\b/)
      if (versionMatched) {
        osVersion = versionMatched[1]
      }
    }
    return (
      !!osVersion && parseInt(osVersion) >= 16 && parseFloat(osVersion) < 17.2
    )
  }
  //#endif
})

export function resolveDigitDecimalPoint(
  event: InputEvent,
  cache: Ref<string>,
  state: State,
  input: HTMLInputElement,
  resetCache?: ResetCache
) {
  if (cache.value) {
    // TODO 苹果智能标点：safari（webview） 上连续输入两次 . 后，在第三次输入 . 时，会触发两次 deleteContentBackward（删除） 的输入外加一次 insertText 为 …（三个点） 的输入
    if ((event as InputEvent).data === '.') {
      // 解决可重复输入小数点的问题
      if (cache.value.slice(-1) === '.') {
        state.value = input.value = cache.value = cache.value.slice(0, -1)
        return false
      }
      // 加载 dot 后数据没有发生变化，说明dot 加到了末尾
      if (
        cache.value &&
        !cache.value.includes('.') &&
        cache.value === input.value
      ) {
        cache.value += '.'
        if (resetCache) {
          resetCache.fn = () => {
            state.value = input.value = cache.value = cache.value.slice(0, -1)
            input.removeEventListener('blur', resetCache.fn!)
          }
          input.addEventListener('blur', resetCache.fn)
        }
        return false
      }
    } else if ((event as InputEvent).inputType === 'deleteContentBackward') {
      // ios 无法删除小数
      if (resolveDigitDecimalPointDeleteContentBackward()) {
        if (cache.value.slice(-2, -1) === '.') {
          cache.value = state.value = input.value = cache.value.slice(0, -2)
          return true
        }
      }
    }
  }
}
