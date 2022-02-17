import { defineComponent } from 'vue'
import { swiperItemProps } from '../../components/swiper-item'

export default defineComponent({
  name: 'SwiperItem',
  props: swiperItemProps,
  setup(props, { emit }) {
    return () => {
      return (
        <div
          class="uni-swiper-item"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
          }}
        ></div>
      )
    }
  },
})
