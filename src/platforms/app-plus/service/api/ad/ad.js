
function operateAdView (pageId, id, type, data) {
  UniServiceJSBridge.publishHandler(id, {
    type,
    data
  }, pageId)
}

UniServiceJSBridge.subscribe('onAdMethodCallback', ({
  callbackId,
  data
}, pageId) => {
  const { adpid, width, count } = data
  getAdData(adpid, width, count, (res) => {
    operateAdView(pageId, callbackId, 'success', res)
  }, (err) => {
    operateAdView(pageId, callbackId, 'fail', err)
  })
})

const _adDataCache = {}

function getAdData (adpid, width, count, onsuccess, onerror) {
  const key = adpid + '-' + width
  const adDataList = _adDataCache[key]
  if (adDataList && adDataList.length > 0) {
    onsuccess(adDataList.splice(0, 1)[0])
    return
  }

  plus.ad.getAds(
    {
      adpid,
      count,
      width
    },
    (res) => {
      const list = res.ads
      onsuccess(list.splice(0, 1)[0])
      _adDataCache[key] = adDataList ? adDataList.concat(list) : list
    },
    (err) => {
      onerror({
        errCode: err.code,
        errMsg: err.message
      })
    }
  )
}
