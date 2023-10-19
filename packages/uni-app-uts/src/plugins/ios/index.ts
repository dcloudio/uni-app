import { UniVitePlugin } from '@dcloudio/uni-cli-shared'

export function uniAppUTSPlugin(): UniVitePlugin {
  return { name: 'uni:app-uts', apply: 'build' }
}
