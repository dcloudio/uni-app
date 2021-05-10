import { hasOwn, NOOP, isArray, isPlainObject, isFunction } from '@vue/shared'
import { ComponentPublicInstance } from 'vue'
import { MPComponentInstance } from './component'

interface Event extends WechatMiniprogram.BaseEvent {
  detail: Record<string, any>
  stopPropagation: () => void
  preventDefault: () => void
}

function getValue(obj: any, path: string): unknown {
  const parts = path.split('.')
  let key: string | number = parts[0]
  if (key.indexOf('__$n') === 0) {
    //number index
    key = parseInt(key.replace('__$n', ''))
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getValue(obj[key], parts.slice(1).join('.'))
}

function getExtraValue(
  instance: ComponentPublicInstance,
  dataPathsArray: string[]
) {
  let context: unknown = instance
  dataPathsArray.forEach((dataPathArray) => {
    const dataPath = dataPathArray[0]
    const value = dataPathArray[2]
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      const propPath = dataPathArray[1]
      const valuePath = dataPathArray[3]

      let vFor: any
      if (Number.isInteger(dataPath)) {
        vFor = dataPath
      } else if (!dataPath) {
        vFor = context
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3)
        } else {
          vFor = getValue(context, dataPath)
        }
      }

      if (Number.isInteger(vFor)) {
        context = value
      } else if (!propPath) {
        context = vFor[value]
      } else {
        if (isArray(vFor)) {
          context = vFor.find((vForItem) => {
            return getValue(vForItem, propPath) === value
          })
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find((vForKey) => {
            return getValue(vFor[vForKey], propPath) === value
          })
        } else {
          console.error('v-for 暂不支持循环数据：', vFor)
        }
      }

      if (valuePath) {
        context = getValue(context, valuePath)
      }
    }
  })
  return context
}

function processEventExtra(
  instance: ComponentPublicInstance,
  extra: any[],
  event: Event
) {
  const extraObj: Record<string, any> = {}

  if (isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach((dataPath, index) => {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = instance
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__
            } else {
              extraObj['$' + index] = [event]
            }
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = getValue(
              event,
              dataPath.replace('$event.', '')
            )
          } else {
            extraObj['$' + index] = getValue(instance, dataPath)
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(instance, dataPath)
      }
    })
  }

  return extraObj
}

function getObjByArray(arr: any[]) {
  const obj: Record<string, any> = {}
  for (let i = 1; i < arr.length; i++) {
    const element = arr[i]
    obj[element[0]] = element[1]
  }
  return obj
}

function processEventArgs(
  instance: ComponentPublicInstance,
  event: Event,
  args = [],
  extra = [],
  isCustom: boolean,
  methodName: string
) {
  let isCustomMPEvent = false // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent =
      event.currentTarget &&
      event.currentTarget.dataset &&
      event.currentTarget.dataset.comType === 'wx'
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event]
      }
      return event.detail.__args__ || event.detail
    }
  }

  const extraObj = processEventExtra(instance, extra, event)

  const ret: any[] = []
  args.forEach((arg) => {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push((event.target as any).value)
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0])
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event)
        }
      }
    } else {
      if (isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg))
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg])
      } else {
        ret.push(arg)
      }
    }
  })

  return ret
}

function wrapper(event: Event) {
  event.stopPropagation = NOOP
  event.preventDefault = NOOP

  event.target = event.target || {}

  if (!hasOwn(event, 'detail')) {
    event.detail = {}
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {}
    event.detail.markerId = (event as any).markerId
  }

  if (__PLATFORM__ === 'mp-baidu') {
    // mp-baidu，checked=>value
    if (
      isPlainObject(event.detail) &&
      hasOwn(event.detail, 'checked') &&
      !hasOwn(event.detail, 'value')
    ) {
      ;(event.detail as any).value = (event.detail as any).checked
    }
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail)
  }

  return event
}

const ONCE = '~'
const CUSTOM = '^'

function matchEventType(eventType: string, optType: string) {
  return (
    eventType === optType ||
    (optType === 'regionchange' &&
      (eventType === 'begin' || eventType === 'end'))
  )
}

export function handleEvent(this: MPComponentInstance, event: Event) {
  event = wrapper(event)

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  const dataset = (event.currentTarget || event.target).dataset
  if (!dataset) {
    return console.warn('事件信息不存在')
  }
  const eventOpts = (dataset.eventOpts ||
    dataset['event-opts']) as unknown as any[] // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在')
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  const eventType = event.type

  const ret: any[] = []

  eventOpts.forEach((eventOpt: any[]) => {
    let type = eventOpt[0]
    const eventsArray = eventOpt[1]

    const isCustom = type.charAt(0) === CUSTOM
    type = isCustom ? type.slice(1) : type
    const isOnce = type.charAt(0) === ONCE
    type = isOnce ? type.slice(1) : type

    if (eventsArray && matchEventType(eventType, type)) {
      eventsArray.forEach((eventArray: any[]) => {
        const methodName = eventArray[0]
        if (methodName) {
          let handlerCtx = this.$vm!
          if (
            handlerCtx.$options.generic &&
            handlerCtx.$parent &&
            handlerCtx.$parent.$parent
          ) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(
              handlerCtx,
              processEventArgs(
                this.$vm!,
                event,
                eventArray[1],
                eventArray[2],
                isCustom,
                methodName
              )
            )
            return
          }
          const handler = (handlerCtx as any)[methodName]
          if (!isFunction(handler)) {
            throw new Error(` _vm.${methodName} is not a function`)
          }
          if (isOnce) {
            if (handler.once) {
              return
            }
            handler.once = true
          }
          ret.push(
            handler.apply(
              handlerCtx,
              processEventArgs(
                this.$vm!,
                event,
                eventArray[1],
                eventArray[2],
                isCustom,
                methodName
              )
            )
          )
        }
      })
    }
  })

  if (
    eventType === 'input' &&
    ret.length === 1 &&
    typeof ret[0] !== 'undefined'
  ) {
    return ret[0]
  }
}
