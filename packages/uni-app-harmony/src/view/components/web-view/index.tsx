import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { getRealPath } from '../../../platform/getRealPath'
import Embed from '../embed'

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
        <Embed
          tag="webview"
          options={{
            src: getRealPath(props.src),
            updateTitle: props.updateTitle,
            webviewStyles: props.webviewStyles,
          }}
          style="width:100%;height:100%"
        />
      </uni-web-view>
    )
  },
})
