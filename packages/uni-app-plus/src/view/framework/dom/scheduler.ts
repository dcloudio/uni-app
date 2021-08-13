import { formatLog } from '@dcloudio/uni-shared'

interface ActionJob {
  (): void
  priority: number
}

function createActionJob(fn: Function, priority: number) {
  return ((fn as ActionJob).priority = priority), fn as ActionJob
}

const postActionJobs = new Set<ActionJob>()
// 升序排列
export const JOB_PRIORITY_DEFAULT = 0
// 组件自身 update，比如 hover 类组件需要初始化事件
export const JOB_PRIORITY_UPDATE = 1
// 容器组件重建
export const JOB_PRIORITY_REBUILD = 2
// 初始化 renderjs 实例
export const JOB_PRIORITY_RENDERJS = 3
// 初始化触发 wxs 的 change:prop，前置条件 renderjs 实例被初始化
export const JOB_PRIORITY_WXS_PROPS = 4

export function queuePostActionJob(job: Function, priority: number) {
  postActionJobs.add(createActionJob(job, priority))
}

export function flushPostActionJobs() {
  if (__DEV__) {
    console.log(formatLog(`flushPostActionJobs`, postActionJobs.size))
  }
  try {
    ;[...postActionJobs]
      .sort((a, b) => a.priority - b.priority)
      .forEach((fn) => fn())
  } finally {
    postActionJobs.clear()
  }
}
