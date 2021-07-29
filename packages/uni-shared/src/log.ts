let lastLogTime = 0
export function formatLog(module: string, ...args: any[]) {
  const now = Date.now()
  const diff = lastLogTime ? now - lastLogTime : 0
  lastLogTime = now
  return `[${now}][${diff}ms][${module}]：${args
    .map((arg) => JSON.stringify(arg))
    .join(' ')}`
}
