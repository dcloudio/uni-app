export function formatAppLog(
  type: 'log' | 'info' | 'debug' | 'warn' | 'error',
  filename: string,
  ...args: unknown[]
) {
  // @ts-ignore
  if (uni.__log__) {
    // @ts-ignore
    uni.__log__(type, filename, ...args)
  } else {
    ;(console[type] as Function).apply(console, [...args, filename])
  }
}

export function formatH5Log(
  type: keyof Console,
  filename: string,
  ...args: unknown[]
) {
  ;(console[type] as Function).apply(console, [...args, filename])
}
