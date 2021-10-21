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
  if (name.indexOf('-') > -1) {
    return false
  }
  if (name.indexOf(':') > -1) {
    return false
  }
  return true
}
