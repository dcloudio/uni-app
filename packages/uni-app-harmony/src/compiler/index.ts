import appVite from '@dcloudio/uni-app-vite'
import { initUniAppXHarmonyPlugin } from '@dcloudio/uni-app-uts'
import { uniAppHarmonyPlugin } from './plugin'
import ExternalModulesX from './external-modules-x.json'
export const isolateUniModules = ExternalModulesX
export default [
  process.env.UNI_APP_X === 'true' ? initUniAppXHarmonyPlugin : appVite,
  uniAppHarmonyPlugin,
]
