function getStorageSync(_key: string): any | null {
  return null
}
export function main() {
  const res = getStorageSync('key')
  console.log(res instanceof UTSJSONObject)
}
