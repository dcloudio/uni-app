// TODO 临时拷贝 uni-app/api/cancelAnimationFrame

export const cancelAnimationFrame = function (handle: number) {
  window.cancelAnimationFrame(handle)
}
