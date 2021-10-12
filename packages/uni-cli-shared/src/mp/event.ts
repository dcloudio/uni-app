export function formatMiniProgramEvent(
  eventName: string,
  {
    isCatch,
    isCapture,
  }: {
    isCatch?: boolean
    isCapture?: boolean
  }
) {
  let eventType = 'bind'
  if (isCatch) {
    eventType = 'catch'
  }
  if (isCapture) {
    return `capture-${eventType}:${eventName}`
  }
  // 原生组件不支持 bind:input 等写法，统一使用 bindinput
  return `${eventType}${eventName}`
}
