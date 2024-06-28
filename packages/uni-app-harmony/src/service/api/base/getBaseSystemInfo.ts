declare function vp2px(value: number): number
declare function lpx2px(value: number): number

/**
 * 简易版systemInfo，主要为upx2px,i18n服务
 * @returns
 */
export function getBaseSystemInfo() {
  // @ts-expect-error view 层
  if (typeof __SYSTEM_INFO__ !== 'undefined') {
    return (window as any).__SYSTEM_INFO__
  }
  return {
    platform: 'harmonyos',
    pixelRatio: vp2px(1),
    windowWidth: lpx2px(720), // TODO designWidth可配置
  }
}
