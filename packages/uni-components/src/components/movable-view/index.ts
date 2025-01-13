import type { ExtractPropTypes } from 'vue'
import { Decline, Friction, STD } from './utils'
export { Decline, Friction, STD }
export const movableViewProps = {
  direction: {
    type: String,
    default: 'none',
  },
  inertia: {
    type: [Boolean, String],
    default: false,
  },
  outOfBounds: {
    type: [Boolean, String],
    default: false,
  },
  x: {
    type: [Number, String],
    default: 0,
  },
  y: {
    type: [Number, String],
    default: 0,
  },
  damping: {
    type: [Number, String],
    default: 20,
  },
  friction: {
    type: [Number, String],
    default: 2,
  },
  disabled: {
    type: [Boolean, String],
    default: false,
  },
  scale: {
    type: [Boolean, String],
    default: false,
  },
  scaleMin: {
    type: [Number, String],
    default: 0.1,
  },
  scaleMax: {
    type: [Number, String],
    default: 10,
  },
  scaleValue: {
    type: [Number, String],
    default: 1,
  },
  animation: {
    type: [Boolean, String],
    default: true,
  },
}

export type Props = ExtractPropTypes<typeof movableViewProps>
export type FrictionCallback = (friction: Friction | STD) => void
export type Record = {
  id: number
  cancelled: boolean
}

export function v(a: number, b: number) {
  return +((1000 * a - 1000 * b) / 1000).toFixed(1)
}
