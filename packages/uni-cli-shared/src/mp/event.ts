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
  if (eventName === 'click') {
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
  return eventType + (eventName.indexOf('-') > -1 ? ':' : '') + eventName
}
