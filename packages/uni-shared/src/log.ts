export function formatLog(module: string, ...args: any[]) {
  return `[${Date.now()}][${module}]：${args
    .map((arg) => JSON.stringify(arg))
    .join(' ')}`
}
