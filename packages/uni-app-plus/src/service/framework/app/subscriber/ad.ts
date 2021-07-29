import { registerServiceMethod } from '@dcloudio/uni-core'

const _adDataCache: Record<string, any> = {}

function getAdData(data: any, onsuccess: Function, onerror: Function) {
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
        errMsg: err.message,
      })
    }
  )
}

export function subscribeAd() {
  registerServiceMethod('getAdData', (args, resolve) => {
    getAdData(
      args,
      (res: any) => {
        resolve({
          code: 0,
          data: res,
        })
      },
      (err: any) => {
        resolve({
          code: 1,
          message: err,
        })
      }
    )
  })
}
