export default function onWxsInvokeCallMethod ({
  cid,
  method,
  args
}, pageId) {
  pageId = parseInt(pageId)
  const page = getCurrentPages(true).find(page => page.$page.id === pageId)
  if (!page) {
    return console.error(`Page[${pageId}] not found`)
  }
  const vm = page.$vm._$vd.getVm(cid)
  if (!vm) {
    return console.error(`vm[${cid}] not found`)
  }
  vm[method] && vm[method](args)
}
