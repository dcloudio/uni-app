
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
  getAdData(data, (res) => {
    operateAdView(pageId, callbackId, 'success', res)
  }, (err) => {
    operateAdView(pageId, callbackId, 'fail', err)
  })
})

const _adDataCache = {}

function getAdData (data, onsuccess, onerror) {
  const { adpid, width } = data
  const key = adpid + '-' + width
  const adDataList = _adDataCache[key]
  if (adDataList && adDataList.length > 0) {
    onsuccess(adDataList.splice(0, 1)[0])
    return
  }

  plus.ad.getAds(
    data,
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
