// idleScheduler.js

const FRAME_BUDGET = 8 // ms，可安全使用的 JS 时间
let lastFrameTime = Date.now()

export function scheduleIdleWork(cb : (remaining : () => number) => void) {
  // rAF + 帧预算
  requestAnimationFrame(() => {
    const now = Date.now()
    const frameCost = now - lastFrameTime
    lastFrameTime = now

    const remaining = Math.max(0, FRAME_BUDGET - frameCost)
    cb(() => remaining)
  })
}