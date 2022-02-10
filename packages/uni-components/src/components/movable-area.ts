import { ExtractPropTypes } from 'vue'
export const props = {
  scaleArea: {
    type: Boolean,
    default: false,
  },
}
export type Props = ExtractPropTypes<typeof props>
