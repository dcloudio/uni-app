export function formatAppLog(
  type: 'log' | 'info' | 'debug' | 'warn' | 'error',
  filename: string,
  ...args: unknown[]
) {
  // @ts-expect-error
  if (uni.__log__) {
    // @ts-expect-error
    uni.__log__(type, filename, ...args)
  } else {
    ;(console[type] as Function).apply(console, [...args, filename])
  }
}

export function formatLog(
  type: keyof Console,
  filename: string,
  ...args: unknown[]
) {
  ;(console[type] as Function).apply(console, [...args, filename])
}
