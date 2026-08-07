import appVite from '@dcloudio/uni-app-vite'
import { initUniAppXHarmonyPlugin } from '@dcloudio/uni-app-uts'
import { uniAppHarmonyPlugin } from './plugin'
export default [
  process.env.UNI_APP_X === 'true' ? initUniAppXHarmonyPlugin : appVite,
  uniAppHarmonyPlugin,
]
