function onMessage (pageId, arg) {
  pageId = parseInt(pageId)
  const page = getCurrentPages(true).find(page => page.$page.id === pageId)
  if (!page) {
    return
  }
  if (!page.$page.meta.isNVue) {
    const target = page.$vm._$vd.elements.find(target => target.type === 'web-view' && target.events['message'])
    if (!target) {
      return
    }
    target.dispatchEvent('message', {
      type: 'message',
      target: Object.create(null),
      currentTarget: Object.create(null),
      timeStamp: Date.now(),
      detail: {
        data: [arg]
      }
    })
  }
}

export default function onWebInvokeAppService ({
  name,
  arg
}, pageIds) {
  if (name === 'postMessage') {
    onMessage(pageIds[0], arg)
  } else {
    uni[name](arg)
  }
}
