export function __f__ (
  type,
  ...args
) {
  console[type].apply(console, args)
}
