const vdSyncHandlers = Object.create(null)

export function registerVdSync (pageId, callback) {
  (vdSyncHandlers[pageId] || (vdSyncHandlers[pageId] = [])).push(callback)
}

export function removeVdSync (pageId) {
  delete vdSyncHandlers[pageId]
}

export default function onVdSync ({
  data,
  options
}, pageId) {
  const handlers = vdSyncHandlers[pageId]
  if (Array.isArray(handlers)) {
    handlers.forEach(handler => {
      handler(data)
    })
  } else {
    // 页面关闭时可能会赶上触发同步，此时页面已销毁
    // console.error(`vdSync[${pageId}] not found`)
  }
}
