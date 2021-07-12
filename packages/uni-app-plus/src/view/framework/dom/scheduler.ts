import { formatLog } from '@dcloudio/uni-shared'

const postActionJobs = new Set<Function>()
export function queuePostActionJob(job: Function) {
  postActionJobs.add(job)
}
export function flushPostActionJobs() {
  if (__DEV__) {
    console.log(formatLog(`flushPostActionJobs`, postActionJobs.size))
  }
  try {
    postActionJobs.forEach((fn) => fn())
  } finally {
    postActionJobs.clear()
  }
}
