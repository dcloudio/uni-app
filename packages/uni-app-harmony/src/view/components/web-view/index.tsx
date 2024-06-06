import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { getRealPath } from '../../../platform/getRealPath'

const props = {
  src: {
    type: String,
    default: '',
  },
  updateTitle: {
    type: Boolean,
    default: true,
  },
  webviewStyles: {
    type: Object,
    default() {
      return {}
    },
  },
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'WebView',
  props,
  setup(props) {
    return () => (
      <uni-web-view>
        <embed
          id="webview"
          type="native/webview"
          src={getRealPath(props.src)}
          style="width:100%;height:100%"
        />
      </uni-web-view>
    )
  },
})
