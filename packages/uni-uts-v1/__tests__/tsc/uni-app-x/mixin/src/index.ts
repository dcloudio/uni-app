import { ComponentOptions } from '@vue/runtime-core'

const mixin = defineMixin({
  props: {
    p1: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      d1: '',
    }
  },
  computed: {
    c1(): string {
      return ''
    },
  },
  onLoad() {},
  methods: {
    m1(): string {
      return ''
    },
  },
})

export function createApp() {
  const app = createSSRApp(defineComponent({}))
  app.mixin(mixin)
}

export const __sfc__ = defineComponent({
  mixins: [
    {
      props: {
        p1: {
          type: String,
          default: '',
        },
      },
    },
  ],
  onLoad() {
    this.p1
  },
})
