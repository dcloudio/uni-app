import { extend } from '@vue/shared'
import { Ref, ref } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { useCustomEvent } from '../../helpers/useEvent'
import {
  props as keyboardProps,
  emit as keyboardEmit,
  useKeyboard,
} from '../../helpers/useKeyboard'
import { useQuill } from './quill'

const props = /*#__PURE__*/ extend({}, keyboardProps, {
  id: {
    type: String,
    default: '',
  },
  readOnly: {
    type: [Boolean, String],
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  showImgSize: {
    type: [Boolean, String],
    default: false,
  },
  showImgToolbar: {
    type: [Boolean, String],
    default: false,
  },
  showImgResize: {
    type: [Boolean, String],
    default: false,
  },
})

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Editor',
  props,
  emit: ['ready', 'focus', 'blur', 'input', 'statuschange', ...keyboardEmit],
  setup(props, { emit }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent(rootRef, emit)
    useQuill(props, rootRef, trigger)
    useKeyboard(props, rootRef, trigger)
    return () => {
      return <uni-editor ref={rootRef} id={props.id} class="ql-container" />
    }
  },
})
