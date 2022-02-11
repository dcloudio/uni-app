import { ExtractPropTypes } from 'vue'
export const movableAreaProps = {
  scaleArea: {
    type: Boolean,
    default: false,
  },
}
export type Props = ExtractPropTypes<typeof movableAreaProps>
