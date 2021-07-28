export function set(target: any, key: string | number, val: unknown) {
  return (target[key] = val)
}
