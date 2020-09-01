const VUES = ['vue', 'vue.js', './vue.js']

export const resolvers = [
  {
    alias(id: string) {
      if (VUES.includes(id)) {
        return '@dcloudio/uni-h5-vue'
      }
    }
  }
]
