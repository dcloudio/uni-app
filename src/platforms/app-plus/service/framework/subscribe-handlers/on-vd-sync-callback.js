export const vdSyncCallbacks = [] // 数据同步 callback

export default function onVdSyncCallback () {
  const copies = vdSyncCallbacks.slice(0)
  vdSyncCallbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
