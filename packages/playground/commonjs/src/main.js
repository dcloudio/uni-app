import App from './App'

import { createSSRApp } from 'vue'
import Web3 from 'web3';
console.log(Web3)
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}