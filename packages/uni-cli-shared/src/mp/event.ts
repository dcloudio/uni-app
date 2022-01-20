import { customizeEvent } from '@dcloudio/uni-shared'
export function formatMiniProgramEvent(
  eventName: string,
  {
    isCatch,
    isCapture,
    isComponent,
  }: {
    isCatch?: boolean
    isCapture?: boolean
    isComponent?: boolean
  }
) {
  if (isComponent) {
    // 自定义组件的自定义事件需要格式化，因为 triggerEvent 时也会格式化
    eventName = customizeEvent(eventName)
  }
  if (!isComponent && eventName === 'click') {
    eventName = 'tap'
  }
  let eventType = 'bind'
  if (isCatch) {
    eventType = 'catch'
  }
  if (isCapture) {
    return `capture-${eventType}:${eventName}`
  }
  // bind:foo-bar
  return eventType + (isSimpleExpr(eventName) ? '' : ':') + eventName
}

function isSimpleExpr(name: string) {
  if (name.startsWith('_')) {
    return false
  }
  if (name.indexOf('-') > -1) {
    return false
  }
  if (name.indexOf(':') > -1) {
    return false
  }
  return true
}
