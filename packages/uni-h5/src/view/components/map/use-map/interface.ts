import { Point } from '../../../../helpers/location'
import props from './props'

export interface MapState {
  latitude: number
  longitude: number
  includePoints: Point[]
}

// props 的 ts 类型
export type Props = Record<keyof typeof props, any>
