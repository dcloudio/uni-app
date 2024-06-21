interface IUniRuntime {
  UTSJSONObject: any
  UniError: any
}

export function setUniRuntime(runtime: IUniRuntime) {
  // @ts-expect-error
  globalThis.UTSJSONObject = runtime.UTSJSONObject
  // @ts-expect-error
  globalThis.UniError = runtime.UniError
}
