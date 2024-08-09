import { createSSRApp, defineComponent } from 'vue'

export function createApp() {
  const app = createSSRApp(defineComponent({}))

  app.config.globalProperties.globalStr = ''
}
defineComponent({
  mounted() {
    this.globalStr
  },
})
