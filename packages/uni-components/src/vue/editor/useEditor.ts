import { extend } from '@vue/shared'
import { type ExtractPropTypes, type Ref, type SetupContext, ref } from 'vue'
import { useCustomEvent } from '../../helpers/useEvent'
import {
  emit as keyboardEmit,
  props as keyboardProps,
  useKeyboard,
} from '../../helpers/useKeyboard'
import { useQuill } from './quill'

export const editorProps = /*#__PURE__*/ extend({}, keyboardProps, {
  id: {
    type: String,
    default: '',
  },
  readOnly: {
    type: [Boolean, String],
    default: false,
  },
  type: {
    type: String,
    default: '',
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

export const editorEmit = [
  'ready',
  'focus',
  'blur',
  'input',
  'statuschange',
  ...keyboardEmit,
]

export function useEditor(
  props: ExtractPropTypes<typeof editorProps>,
  emit: SetupContext['emit']
) {
  const rootRef: Ref<HTMLElement | null> = ref(null)
  const trigger = useCustomEvent(rootRef, emit)
  useQuill(props, rootRef, trigger)
  useKeyboard(props, rootRef, trigger)
  return rootRef
}
