/**
 * 简易版systemInfo，主要为upx2px,i18n服务
 * @returns
 */
export function getBaseSystemInfo() {
  // @ts-expect-error view 层
  if (typeof __SYSTEM_INFO__ !== 'undefined') {
    return (window as any).__SYSTEM_INFO__
  }
  const { resolutionWidth } = plus.screen.getCurrentSize()
  return {
    platform: (plus.os.name || '').toLowerCase(),
    pixelRatio: plus.screen.scale!,
    windowWidth: Math.round(resolutionWidth),
  }
}
