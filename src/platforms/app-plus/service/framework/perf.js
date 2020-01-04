export function perf (type, startTime) {
  /* eslint-disable no-undef */
  startTime = startTime || __UniServiceStartTime__
  const endTime = Date.now()
  console.log(`[PERF][${endTime}] ${type} 耗时[${Date.now() - startTime}]`)
}
