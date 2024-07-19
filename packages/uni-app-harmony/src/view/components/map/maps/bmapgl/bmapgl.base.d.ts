declare namespace BMapGL {
  type Callback = (...args: any[]) => void
  class Point {
    constructor(lng: number, lat: number)
    lng: number
    lat: number
    equals(other: Point): boolean
  }
  class Pixel {
    constructor(x: number, y: number)
    x: number
    y: number
    equals(other: Pixel): boolean
  }
  class Size {
    constructor(width: number, height: number)
    width: number
    height: number
    equals(other: Size): boolean
  }
  class Bounds {
    constructor(minX: number, minY: number, maxX: number, maxY: number)
    constructor(sw: Point, ne: Point)
    minX: number
    minY: number
    maxX: number
    maxY: number
    equals(other: Bounds): boolean
    containsPoint(point: Point): boolean
    containsBounds(bounds: Bounds): boolean
    intersects(other: Bounds): boolean
    extend(point: Point): void
    getCenter(): Point
    isEmpty(): boolean
    getSouthWest(): Point
    getNorthEast(): Point
    toSpan(): Point
  }
  class Projection {
    static convertMC2LL(point: Point): Point
    static convertLL2MC(point: Point): Point
    static proximityConvertMC2LL(point: Point): Point
  }
}
