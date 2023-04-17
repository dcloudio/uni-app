import appVite from '@dcloudio/uni-app-vite'
import appUVue from '@dcloudio/uni-app-uts'
export default [process.env.UNI_UVUE === 'true' ? appUVue : appVite]
