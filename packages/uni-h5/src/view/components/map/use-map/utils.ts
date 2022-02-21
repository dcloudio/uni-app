/**
 * 工具方法
 */
import { Point } from '../../../../helpers/location'
import { LatLng } from '../maps'

/**
 * 复制 points 数组
 * @returns newPoints
 */
export function getPoints(points: Point[]): Point[] {
  const newPoints: Point[] = []
  if (Array.isArray(points)) {
    points.forEach((point) => {
      const { latitude, longitude } = point || {}
      if (latitude && longitude) {
        newPoints.push({
          latitude,
          longitude,
        })
      }
    })
  }
  return newPoints
}

export function getLat(latLng: LatLng) {
  if ('getLat' in latLng) {
    return latLng.getLat()
  } else {
    return latLng.lat()
  }
}

export function getLng(latLng: LatLng) {
  if ('getLng' in latLng) {
    return latLng.getLng()
  } else {
    return latLng.lng()
  }
}
