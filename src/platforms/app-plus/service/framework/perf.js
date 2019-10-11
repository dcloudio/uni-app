export function perf (type, startTime) {
  /* eslint-disable no-undef */
  startTime = startTime || __UniServiceStartTime__
  console.log(`[PERF] ${type} 耗时[${Date.now() - startTime}]`)
}
