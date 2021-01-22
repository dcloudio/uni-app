import { hasOwn, isFunction } from '@vue/shared'

import { initGetProvider } from '@dcloudio/uni-mp-core'

export const getProvider = initGetProvider({
  oauth: ['alipay'],
  share: ['alipay'],
  payment: ['alipay'],
  push: ['alipay'],
})

export function setStorageSync(key: string, data: any) {
  return my.setStorageSync({
    key,
    data,
  })
}

export function getStorageSync(key: string) {
  const result = my.getStorageSync({
    key,
  })
  // 支付宝平台会返回一个 success 值，但是目前测试的结果这个始终是 true。当没有存储数据的时候，其它平台会返回空字符串。
  return result.data !== null ? result.data : ''
}

export function removeStorageSync(key: string) {
  return my.removeStorageSync({
    key,
  })
}

export function startGyroscope(args: UniApp.StartGyroscopeOptions) {
  if (hasOwn(args, 'interval')) {
    console.warn('支付宝小程序 startGyroscope暂不支持interval')
  }
  args.success &&
    args.success({
      errMsg: 'startGyroscope:ok',
    })
  args.complete &&
    args.complete({
      errMsg: 'startGyroscope:ok',
    })
}

function createExecCallback(execCallback: Function) {
  return function wrapperExecCallback(this: any, res: any) {
    this.actions.forEach((action: any, index: number) => {
      ;(action._$callbacks || []).forEach((callback: Function) => {
        callback(res[index])
      })
    })
    if (isFunction(execCallback)) {
      execCallback(res)
    }
  }
}

function addCallback(this: any, callback: Function) {
  if (isFunction(callback)) {
    const action = this.actions[this.actions.length - 1]
    if (action) {
      ;(action._$callbacks || (action._$callbacks = [])).push(callback)
    }
  }
}

export function createSelectorQuery() {
  const query = my.createSelectorQuery()

  const oldExec = query.exec
  const oldScrollOffset = query.scrollOffset
  const oldBoundingClientRect = query.boundingClientRect
  query.exec = function exec(callback: Function) {
    return oldExec.call(this, createExecCallback(callback).bind(this))
  }
  query.scrollOffset = function scrollOffset(callback?: Function) {
    const ret = oldScrollOffset.call(this)
    addCallback.call(this, callback as Function)
    return ret
  }
  query.boundingClientRect = function boundingClientRect(callback?: Function) {
    const ret = oldBoundingClientRect.call(this)
    addCallback.call(this, callback as Function)
    return ret
  }

  if (!(query as any).fields) {
    ;(query as any).fields = function (
      { rect, size, scrollOffset }: UniApp.NodeField,
      callback: Function
    ) {
      if (rect || size) {
        this.boundingClientRect()
      }
      if (scrollOffset) {
        this.scrollOffset()
      }
      addCallback.call(this, callback)
      return this
    }
  }

  if (!(query as any).in) {
    ;(query as any).in = function () {
      return this
    }
  }
  return query
}

export function createIntersectionObserver(
  component: any,
  options: UniApp.CreateIntersectionObserverOptions
) {
  if (options && options.observeAll) {
    ;(options as any).selectAll = options.observeAll
    delete options.observeAll
  }
  return (my as any).createIntersectionObserver(options)
}
