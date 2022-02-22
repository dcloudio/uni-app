const _adDataCache: Record<string, any> = {}

export function getAdData(
  adpid: string | number,
  width: any,
  height: any,
  onsuccess: Function,
  onerror: Function
) {
  const key = adpid + '-' + width
  const adDataList = _adDataCache[key]
  if (adDataList && adDataList.length > 0) {
    onsuccess(adDataList.splice(0, 1)[0])
    return
  }

  // TODO 缺少语法提示 getDrawAds
  // @ts-ignore
  plus.ad.getDrawAds(
    {
      adpid: String(adpid),
      count: 3,
      width,
    },
    (res: any) => {
      const list = res.ads
      onsuccess(list.splice(0, 1)[0])
      _adDataCache[key] = adDataList ? adDataList.concat(list) : list
    },
    (err: any) => {
      onerror({
        errCode: err.code,
        errMsg: err.message,
      })
    }
  )
}

export const adDrawProps = {
  adpid: {
    type: [Number, String],
    default: '',
  },
  data: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '',
  },
}
