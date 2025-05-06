import type {
  AddMediaQueryObserverArgs,
  RemoveMediaQueryObserverArgs,
} from '@dcloudio/uni-api'

let mediaQueryObservers: any = {}
let listeners: any = {}

// 拼接媒体查询条件
function handleMediaQueryStr($props: UniApp.DescriptorOptions) {
  const mediaQueryArr: string[] = []
  const propsMenu = [
    'width',
    'minWidth',
    'maxWidth',
    'height',
    'minHeight',
    'maxHeight',
    'orientation',
  ]
  for (const item of propsMenu) {
    if (
      item !== 'orientation' &&
      $props[item as keyof UniApp.DescriptorOptions] &&
      Number(($props[item as keyof UniApp.DescriptorOptions] as number) >= 0)
    ) {
      mediaQueryArr.push(
        `(${humpToLine(item)}: ${Number(
          $props[item as keyof UniApp.DescriptorOptions]
        )}px)`
      )
    }
    if (item === 'orientation' && $props[item]) {
      mediaQueryArr.push(`(${humpToLine(item)}: ${$props[item]})`)
    }
  }
  const mediaQueryStr = mediaQueryArr.join(' and ')
  return mediaQueryStr
}

function humpToLine(name: string) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 请求媒体查询对象
export function addMediaQueryObserver({
  reqId,
  options,
  callback,
}: AddMediaQueryObserverArgs) {
  // 创建一个媒体查询对象
  const mediaQueryObserver = (mediaQueryObservers[reqId] = window.matchMedia(
    handleMediaQueryStr(options)
  ))
  // 创建一个监听器
  const listener = (listeners[reqId] = (observer: any) =>
    callback(observer.matches as any))
  listener(mediaQueryObserver) // 监听前执行一次媒体查询
  mediaQueryObserver.addListener(listener as any)
}

// 销毁媒体查询对象
export function removeMediaQueryObserver({
  reqId,
}: RemoveMediaQueryObserverArgs) {
  const listener = listeners[reqId]
  const mediaQueryObserver = mediaQueryObservers[reqId]
  if (mediaQueryObserver) {
    mediaQueryObserver.removeListener(listener as any) // 移除监听
    delete listeners[reqId]
    delete mediaQueryObservers[reqId]
  }
}
