/// <reference path="./harmonyChannel.d.ts" />
// javaScriptProxy能处理的最大层级为10级，使用序列化避免层级超限
export function invokeHarmonyChannel(method: string, args?: any[]) {
  return harmonyChannel.invokeSync(
    method,
    args ? args.map((arg) => JSON.stringify(arg)) : undefined
  )
}
