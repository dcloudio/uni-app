import { DepOptimizationOptions } from 'vite'
export const optimizeDeps: DepOptimizationOptions = {
  exclude: [
    'vue-router',
    '@dcloudio/uni-components',
    '@dcloudio/uni-h5',
    '@dcloudio/uni-h5-vue',
    '@dcloudio/uni-shared'
  ]
}
