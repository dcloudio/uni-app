export function getStatusbarHeight () {
  // 横屏时 iOS 获取的状态栏高度错误，进行纠正
  return plus.navigator.isImmersedStatusbar() ? Math.round(plus.os.name === 'iOS' ? plus.navigator.getSafeAreaInsets().top : plus.navigator.getStatusbarHeight()) : 0
}
