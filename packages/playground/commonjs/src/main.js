import App from './App'

import { createSSRApp } from 'vue'
import { data } from 'test-data'
console.log(data)
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}