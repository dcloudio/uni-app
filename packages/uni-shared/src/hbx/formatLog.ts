export function formatAppLog(
  type: 'log' | 'info' | 'debug' | 'warn' | 'error',
  filename: string,
  ...args: unknown[]
) {
  // @ts-ignore
  uni.__log__ && uni.__log__(type, filename, args)
}

export function formatH5Log(
  type: keyof Console,
  filename: string,
  ...args: unknown[]
) {
  ;(console[type] as Function).apply(console, [...args, filename])
}
