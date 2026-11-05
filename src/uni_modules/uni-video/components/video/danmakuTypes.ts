export type DanmakuType = 0 | 1 | 2
// 0: 全屏滚动 1: 半屏滚动 2: 1/3屏滚动

export type DanmakuTask = {
  text : string
  color ?: string
  type ?: DanmakuType
}
