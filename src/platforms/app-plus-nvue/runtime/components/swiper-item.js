function getSwiperItem (weex) {
  return {
    name: 'SwiperItem',
    props: {
      itemId: {
        type: String,
        default: ''
      }
    },
    render (createElement) {
      return createElement('div', this._g({
        staticClass: ['uni-swiper-item'],
        staticStyle: {
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden'
        }
      }, this.$listeners), this._t('default'), 2)
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('swiper-item', getSwiperItem(weex))
}
