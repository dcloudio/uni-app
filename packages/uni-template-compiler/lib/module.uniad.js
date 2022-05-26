const AD_COMPONENTS = ['uniad', 'ad-rewarded-video', 'ad-fullscreen-video', 'ad-interstitial']

module.exports = {
  preTransformNode (el, {
    warn
  }) {
    if (process.env.UNI_PLATFORM === 'mp-weixin') {
      if (el.tag === 'ad' && (el.attrsMap.adpid || el.attrsMap[':adpid'])) {
        el.tag = 'uniad'
      }
      if (AD_COMPONENTS.indexOf(el.tag) > -1) {
        process.env.USE_UNI_AD = true
      }
    }
  }
}
