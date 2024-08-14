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
  // app.mixin(mixin)
}

export const __sfc__ = defineComponent({
  mixins: [mixin],
  onLoad() {
    this.d1
    this.c1
    this.m1
    this.p1
  },
})
