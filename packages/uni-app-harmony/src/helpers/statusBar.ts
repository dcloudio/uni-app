export function getStatusbarHeight() {
  // 使用安全区高度，以适配小窗模式
  return plus.navigator.getSafeAreaInsets().top!
}
