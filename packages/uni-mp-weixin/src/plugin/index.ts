import { resolveBuiltIn } from '@dcloudio/uni-cli-shared'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'

export default initMiniProgramPlugin({
  global: 'wx',
  alias: {
    'uni-mp-runtime': resolveBuiltIn(
      '@dcloudio/uni-mp-weixin/dist/uni.mp.esm.js'
    ),
  },
})
