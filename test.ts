export function test(): JSONObject {
  var res = { a: 1, b: [1, 2, 3] }
  return res
}
type JSONObject = Record<string, any>
