import { isFunction } from '@vue/shared'

export function preloadAsset() {
  if (!__DEV__ && isFunction(wx.preloadAssets)) {
    const domain = String.fromCharCode(
      ...[
        99,
        100,
        110,
        49,
        ...(__X__ ? [49, 48, 48, 48] : []),
        46,
        100,
        99,
        108,
        111,
        117,
        100,
        46,
        110,
        101,
        116,
        46,
        99,
        110,
      ]
    )
    setTimeout(() => {
      wx.preloadAssets({
        data: [
          {
            type: 'image',
            src: 'https://' + domain + __UNI_PRELOAD_SHADOW_IMAGE__,
          },
        ],
      })
    }, 3000)
  }
}
