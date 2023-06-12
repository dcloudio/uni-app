import appVite from '@dcloudio/uni-app-vite'
import appUVue from '@dcloudio/uni-app-uts'
export default [process.env.UNI_APP_X === 'true' ? appUVue : appVite]
