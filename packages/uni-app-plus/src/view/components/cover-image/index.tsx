import {
  type ExtractPropTypes,
  type Ref,
  onBeforeUnmount,
  reactive,
  ref,
  watch,
} from 'vue'
import {
  type CustomEventTrigger,
  type EmitEvent,
  defineBuiltInComponent,
  useCustomEvent,
} from '@dcloudio/uni-components'
import { useCover } from '../../../helpers/useCover'
import { getRealPath } from '../../../platform/getRealPath'
// TODO 从 service 层传入
const TEMP_PATH = '_doc/uniapp_temp/'

const props = {
  src: {
    type: String,
    default: '',
  },
  autoSize: {
    type: [Boolean, String],
    default: false,
  },
}
type Props = ExtractPropTypes<typeof props>

function useImageLoad(
  props: Props,
  content: { src: string },
  trigger: CustomEventTrigger
) {
  const style = ref('')
  let downloaTask: PlusDownloaderDownload
  function loadImage() {
    content.src = ''
    style.value = props.autoSize ? 'width:0;height:0;' : ''
    const realPath = props.src ? getRealPath(props.src) : ''
    if (
      realPath.indexOf('http://') === 0 ||
      realPath.indexOf('https://') === 0
    ) {
      downloaTask = plus.downloader.createDownload(
        realPath,
        {
          filename: TEMP_PATH + '/download/',
        },
        (task, status) => {
          if (status === 200) {
            getImageInfo(task.filename!)
          } else {
            trigger('error', {} as Event, {
              errMsg: 'error',
            })
          }
        }
      )
      downloaTask.start()
    } else if (realPath) {
      getImageInfo(realPath)
    }
  }

  function getImageInfo(src: string) {
    content.src = src
    plus.io.getImageInfo({
      src,
      success: ({ width, height }) => {
        if (props.autoSize) {
          style.value = `width:${width}px;height:${height}px;`
          window.dispatchEvent(new CustomEvent('updateview'))
        }
        trigger('load', {} as Event, { width, height })
      },
      fail: () => {
        trigger('error', {} as Event, {
          errMsg: 'error',
        })
      },
    })
  }

  if (props.src) {
    loadImage()
  }
  watch(() => props.src, loadImage)

  onBeforeUnmount(() => {
    if (downloaTask) {
      downloaTask.abort()
    }
  })

  return style
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'CoverImage',
  props,
  emits: ['click', 'load', 'error'],
  setup(props, { emit }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    let content = reactive({ src: '' })
    const style = useImageLoad(props, content, trigger)
    useCover(rootRef, trigger, content)

    return () => {
      return (
        <uni-cover-image ref={rootRef} style={style.value}>
          <div class="uni-cover-image"></div>
        </uni-cover-image>
      )
    }
  },
})
