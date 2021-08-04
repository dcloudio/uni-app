export function getAppRenderer(manifestJson: Record<string, any>) {
  const platformOptions = manifestJson['app-plus']
  if (platformOptions && platformOptions.renderer === 'native') {
    return 'native'
  }
  return ''
}

export function getAppCodeSpliting(manifestJson: Record<string, any>) {
  if (manifestJson['app-plus']?.optimization?.codeSpliting === true) {
    return true
  }
  return false
}
