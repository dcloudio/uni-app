const fs = require('fs')
const path = require('path')
const {
  isInHBuilderX
} = require('@dcloudio/uni-cli-shared')

class UniTips {
  apply (compiler) {
    compiler.hooks.emit.tap('PreprocessAssetsPlugin', compilation => {
      const assets = compilation.assets
      let hasAd = false

      try {
        Object.keys(assets).forEach(name => {
          if (hasAd) {
            return
          }

          if (!name.startsWith('common') && !name.startsWith('pages')) {
            return
          }

          const extname = path.extname(name)
          if (extname !== '.js') {
            return
          }

          if (!hasAd && !process.env.USE_UNI_AD) {
            hasAd = assets[name]._value.match(/createRewardedVideoAd|createInterstitialAd/)
          }
        })

        setTimeout(() => {
          if (hasAd) {
            console.log(
              '推荐使用uni-ad微信小程序版广告，无开通门槛、提前结算、插件丰富，助力广告变现。详情: https://uniapp.dcloud.net.cn/component/ad-weixin.html'
            )
          }

          let projectRoot = ''
          if (isInHBuilderX) {
            projectRoot = process.env.UNI_INPUT_DIR
          } else {
            projectRoot = process.env.UNI_CLI_CONTEXT
          }

          const paths = fs.readdirSync(projectRoot)
          const useUniCloud = paths.find((name) => {
            return name.includes('uniCloud-')
          })

          if (!useUniCloud && assets['project.config.json']) {
            const pcjString = assets['project.config.json'].source()
            const pcjJson = JSON.parse(pcjString)
            if (typeof pcjJson.cloudfunctionRoot === 'string' && pcjJson.cloudfunctionRoot.length > 0) {
              console.log(
                '欢迎使用uniCloud，价格更便宜、开发更方便、生态更丰富的云开发。详情: https://uniapp.dcloud.net.cn/uniCloud/wx2unicloud.html'
              )
            }
          }
        }, 100)
      } catch (e) {}
    })
  }
}

module.exports = UniTips
