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
    console.error(`vdSync[${pageId}] not found`)
  }
}
