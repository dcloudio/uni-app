declare function __uniLoadUASM(module: string): unknown

export function loadUASM<T>(module: string): Promise<T> {
  return new Promise<T>((resolve) => {
    resolve(__uniLoadUASM(module) as T)
  })
}
