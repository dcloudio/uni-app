export function __f__(
  type: keyof Console,
  filename: string,
  ...args: unknown[]
) {
  ;(console[type] as Function).apply(console, [...args, filename])
}
