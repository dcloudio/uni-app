export function getAppRenderer(manifestJson: Record<string, any>) {
  const platformOptions = manifestJson['app-plus']
  if (platformOptions && platformOptions.renderer === 'native') {
    return 'native'
  }
  return ''
}

export function getAppCodeSplitting(manifestJson: Record<string, any>) {
  if (manifestJson['app-plus']?.optimization?.codeSplitting === true) {
    return true
  }
  return false
}

export function getAppStyleIsolation(
  manifestJson: Record<string, any>
): 'apply-shared' | 'isolated' | 'shared' {
  return (
    manifestJson['app-plus']?.optimization?.styleIsolation ?? 'apply-shared'
  )
}
