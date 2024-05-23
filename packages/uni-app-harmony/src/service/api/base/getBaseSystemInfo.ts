declare function vp2px(value: number): number
declare function lpx2px(value: number): number

/**
 * 简易版systemInfo，主要为upx2px,i18n服务
 * @returns
 */
export function getBaseSystemInfo() {
  return {
    platform: 'harmony',
    pixelRatio: vp2px(1),
    windowWidth: lpx2px(720), // TODO designWidth可配置
  }
}
