import { createApp, h } from 'vue'
import wrapper from 'vue3-webcomponent-wrapper'
import '@dcloudio/uni-components/style/button.css'
import {
  // Audio,
  Button,
  // Canvas,
  // Checkbox,
  // CheckboxGroup,
  // Editor,
  // Form,
  Icon,
  Image,
  // Input,
  // Label,
  // MovableArea,
  // MovableView,
  // Navigator,
  // PickerView,
  // PickerViewColumn,
  // Progress,
  // Radio,
  // RadioGroup,
  // ResizeSensor,
  // RichText,
  // ScrollView,
  // Slider,
  // Swiper,
  // SwiperItem,
  // Switch,
  Text,
  // Textarea,
  View,
} from '@dcloudio/uni-components'

const { customElements } = window
customElements.define('v-uni-button', wrapper(Button, createApp, h))
customElements.define('v-uni-icon', wrapper(Icon, createApp, h))
customElements.define('v-uni-image', wrapper(Image, createApp, h))
customElements.define('v-uni-text', wrapper(Text, createApp, h))
customElements.define('v-uni-view', wrapper(View, createApp, h))
