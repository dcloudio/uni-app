import { createSSRApp } from 'vue'
import App from './App.uvue'

export function createApp() {
  return { app: createSSRApp(App) }
}
