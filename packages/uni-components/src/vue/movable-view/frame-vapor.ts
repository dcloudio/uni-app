import { onBeforeUnmount } from 'vue'

// 每个节点独立合并帧内更新，避免多个 movable-view 互相丢弃任务。
export function useMovableViewFrame() {
  let frame: number | undefined
  let pending: (() => void) | undefined

  function run() {
    const callback = pending
    frame = undefined
    pending = undefined
    callback?.()
  }
  function cancel() {
    if (frame !== undefined) cancelAnimationFrame(frame)
    frame = undefined
    pending = undefined
  }
  function flush() {
    if (frame !== undefined) cancelAnimationFrame(frame)
    run()
  }
  onBeforeUnmount(cancel)

  return {
    request(callback: () => void) {
      pending = callback
      if (frame === undefined) frame = requestAnimationFrame(run)
    },
    flush,
    cancel,
  }
}
