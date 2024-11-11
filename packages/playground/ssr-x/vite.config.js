import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

process.env.UNI_CLOUD_SPACES = JSON.stringify([
  {
    provider: 'aliyun',
    id: '3db58d4d-09c2-4dcf-998a-81cf8bedf388',
    clientSecret: 'xLSd4kh4pFmNzqsK5rs7fQ==',
  },
])

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  build: { minify: false },
  plugins: [uni({ viteLegacyOptions: false })],
  server: {
    port: 5174
  }
})
