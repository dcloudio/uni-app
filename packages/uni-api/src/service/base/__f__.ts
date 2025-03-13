export function __f__(
  type: keyof Console,
  filename: string,
  ...args: unknown[]
) {
  if (filename) {
    args.push(filename)
  }
  ;(console[type] as Function).apply(console, args)
}
