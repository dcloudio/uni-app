/**
 * touch 状态机（touchstart 只记录手势，不改变刷新状态）：
 * Idle --到达顶部后继续向下 touchmove--> Pulling
 * Pulling --touchend，达到阈值--> Refresh
 * Pulling --touchend，未达阈值 / touchcancel / 多指中断--> Abort
 * Refresh --向上 touchmove--> Restore
 * Restore / Abort --300ms 回弹完成--> Idle
 *
 * 严格按照此状态机执行，比如Refresh状态继续下拉，不会改变为Pulling状态，scroll-view在界面上也不会动
 * Refresh --向上 touchmove--> Restore 这步有动画直接完成Restore状态，touch事件继续用于触发滚动
 * 原生滚动触顶后，即使 touchmove 不可取消，也可以观察下拉距离进入 Pulling；
 * 此时不调用 preventDefault()，不将触顶前的滚动距离计入刷新高度。
 */
export const enum RefreshStateEnum {
  Idle = '',
  Pulling = 'pulling',
  Refresh = 'refresh',
  Restore = 'restore',
  Abort = 'abort',
}

export interface RefresherState {
  refresherHeight: number
  refreshState: RefreshStateEnum
}
