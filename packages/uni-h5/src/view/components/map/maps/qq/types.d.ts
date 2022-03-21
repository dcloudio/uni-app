class Base {
  get(key: string): any
  set(key: string, val: any): void
  setOptions(options: any): void
  bindTo(a, b, c, e)
  bindsTo?: (a, b, c, e) => void
  changed(a)
  notify(a)
  setValues(a)
  unbind(a, b)
  unbindAll(a)
}

export interface MapPanes {
  /**
   * （容器 0）此容器是最下面的容器，在所有覆盖物层的底下，底图的上面。
   */
  mapPane: HTMLDivElement
  /**
   * （容器 1）此容器中包含Polyline、Polygon、GroundOverlay等。
   */
  overlayLayer: HTMLDivElement
  /**
   * （容器 2）此容器包含Marker阴影层。
   */
  overlayShadow: HTMLDivElement
  /**
   * （容器 3）此容器包含Marker图片层。
   */
  overlayImage: HTMLDivElement
  /**
   * （容器 4）此容器包含InfoWindow的阴影，位于overlayImage之上。
   */
  floatShadow: HTMLDivElement
  /**
   * （容器 5）此容器包含透明的鼠标相应元素，用于接收Marker的鼠标事件。该窗格在floatShadow之上，这样便可点击信息窗口阴影中的Marker。
   */
  overlayMouseTarget: HTMLDivElement
  /**
   * （容器 6）此窗格包含InfoWindow。它位于所有地图叠加层之上。
   */
  floatPane: HTMLDivElement
}

export interface MapCanvasProjection {
  /**
   * 根据地图外部容器左上角的相对像素坐标计算经纬度坐标。
   */
  fromContainerPixelToLatLng(): LatLng
  /**
   * 根据地图内部容器左上角的相对像素坐标计算经纬度坐标。
   */
  fromDivPixelToLatLng(): LatLng
  /**
   * 根据经纬度坐标计算相对于地图外部容器左上角的相对像素坐标。
   */
  fromLatLngToContainerPixel(): Point
  /**
   * 根据经纬度坐标计算相对于地图内部容器左上角的相对像素坐标。
   */
  fromLatLngToDivPixel(latLng: LatLng): Point
}

export class Overlay extends Base {
  constructor()
  /**
   * 实现这个接口来初始化自定义的Dom元素，此方法会在setMap(map)后被调用，panes和projection属性也将被初始化。
   */
  construct(): void
  /**
   * 实现这个接口来绘制和更新自定义的dom元素。
   */
  draw(): void
  /**
   * 实现这个接口来删除自定义的Dom元素，此方法会在setMap(null)后被调用。
   */
  destroy(): void
  /**
   * 返回覆盖物容器所在的map对象。
   */
  getMap(): Map
  /**
   * 返回地图覆盖物容器列表。
   */
  getPanes(): MapPanes
  /**
   * 返回覆盖物容器的相对像素坐标或是经纬度坐标。
   */
  getProjection(): MapCanvasProjection
  /**
   * 设置覆盖物容器所在的map对象。
   */
  setMap(map: Map | null): void
  /**
   *
   */
  map_changed?: () => void
}

export class LatLng {
  constructor(latitude: number, longitude: number)
  /**
   * 比较两个经纬度坐标是否相等。
   */
  equals(other: LatLng): boolean
  /**
   * 返回纬度值。
   */
  getLat(): number
  /**
   * 返回经度值。
   */
  getLng(): number
  /**
   * 转换为字符串表示。
   */
  tostring(): string
  /**
   *
   */
  clone(): LatLng
}

export enum MapZoomType {
  /**
   * 默认缩放，手指中心位置。
   */
  DEFAULT,
  /**
   * 中心点位置缩放。
   */
  CENTER,
}

export interface MapTypeControlOptions {
  /**
   * 设置控件的地图类型ID。
   */
  mapTypeIds: Array<MapTypeId | string>
  /**
   * 设置控件位置。
   */
  position: ControlPosition
}

export interface PanControlOptions {
  /**
   * 设置控件位置。
   */
  position: ControlPosition
}

export interface ZoomControlOptions {
  /**
   * 设置控件位置。
   */
  position: ControlPosition
  /**
   * 设置控件样式。
   */
  style: ZoomControlStyle
}

export interface ScaleControlOptions {
  /**
   * 设置控件位置。
   */
  position: ControlPosition
}

export interface MapOptions {
  /**
   * 初始化地图中心坐标。
   */
  center?: LatLng
  /**
   * 初始化地图缩放级别。
   */
  zoom?: number
  /**
   * 设置地图的最小缩放级别。
   */
  minZoom?: number
  /**
   * 设置地图的最大缩放级别。
   */
  maxZoom?: number
  /**
   * 缩放类型，可设置以地图中心点或双指中心点为焦点（移动端）。
   */
  mapZoomType?: MapZoomType
  /**
   * 如果为 true，在初始化地图时不会清除地图容器内的内容。
   */
  noClear?: boolean
  /**
   * 用作地图 div 的背景颜色。当用户进行平移时，如果尚未载入图块，则显示此颜色。仅在地图初始化时，才能设置此选项。
   */
  backgroundColor?: string
  /**
   * boundary规定了地图的边界，当拖拽超出限定的边界范围后，会固定住，不能移出去。
   */
  boundary?: LatLngBounds
  /**
   * 地图的默认鼠标指针样式。
   */
  draggableCursor?: string
  /**
   * 拖动地图时的鼠标指针样式。
   */
  draggingCursor?: string
  /**
   * 地图类型ID。
   */
  mapTypeId?: MapTypeId
  /**
   * 地图样式ID，有效值为‘style[编号]’，与key绑定，详见个性化地图配置页面。
   */
  mapStyleId?: string
  /**
   * 如果为 false，则禁止拖动地图。默认情况下启用拖动。
   */
  draggable?: boolean
  /**
   * 如果为 false，则停用通过滚轮缩放地图的功能。默认情况下启用滚轮功能。
   */
  scrollwheel?: boolean
  /**
   * 启用/停用在双击鼠标左键时时放大地图。默认情况下处于启用状态。
   */
  disableDoubleClickZoom?: boolean
  /**
   * 如果为 false，则禁止通过键盘控制地图。默认情况下启用键盘快捷键。
   */
  keyboardShortcuts?: boolean
  /**
   * 地图类型控件的初始启用/停用状态。
   */
  mapTypeControl?: boolean
  /**
   * 地图类型控件的初始化选项。
   */
  mapTypeControlOptions?: MapTypeControlOptions
  /**
   * 平移控件的初始启用/停用状态。
   */
  panControl?: boolean
  /**
   * 平移控件的初始化参数。
   */
  panControlOptions?: PanControlOptions
  /**
   * 缩放控件的初始启用/停用状态。
   */
  zoomControl?: boolean
  /**
   * 缩放控件的初始化选项。
   */
  zoomControlOptions?: ZoomControlOptions
  /**
   * 比例尺控件的初始启用/停用状态。
   */
  scaleControl?: boolean
  /**
   * 比例尺控件的初始化参数。
   */
  scaleControlOptions?: ScaleControlOptions
}

export class Point {
  x: number
  y: number
  constructor(x: number, y: number)
  /**
   * 比较两个点是否相等。
   */
  equals(other: Point): boolean
  /**
   * 获取该点的 x 坐标。
   */
  getX(): number
  /**
   * 获取该点的 y 坐标。
   */
  getY(): number
  /**
   * 转换为字符串表示。
   */
  tostring(): string
  /**
   *
   */
  clone(): Point
}

export interface Projection {
  /**
   * 从 LatLng 圆柱转换为 Point 平面。此接口指定一个函数，该函数实现从指定 LatLng 值到地图投影上的世界地图坐标的转换。腾讯 Maps API 在需要在屏幕上绘制位置时调用此方法。Projection 对象必须实现此方法。
   */
  fromLatLngToPoint(latlng: LatLng): Point
  /**
   * 此接口指定一个函数，该函数实现从地图投影上的世界地图坐标到 LatLng 值的转换。腾讯 Maps API 在需要将屏幕上的操作转换为地图上的位置时调用此方法。Projection 对象必须实现此方法。
   */
  fromPointToLatLng(pixel: Point, noWrap?: boolean): LatLng
}

export class MVCArray<T extends any> {
  constructor(array?: Array<T>)
  /**
   * 循环访问每个元素，调用所提供的回调。回调会被每个元素调用。如：callback(element, index):
   */
  forEach(callback: Function): void
  /**
   * 获取指定索引处的元素。
   */
  getAt(index: number): T
  /**
   * 设置指定索引处的元素。
   */
  setAt(index: number, element: T): void
  /**
   * 传回此数组中的元素数。
   */
  getLength(): number
  /**
   * 删除数组的最后一个元素并传回该元素。
   */
  pop(): T
  /**
   * 将一个元素添加到数组末尾并传回数组的新长度。
   */
  setAt(element: T): number
  /**
   * 在指定索引处插入元素。
   */
  insertAt(index: number, element: T): void
  /**
   * 从指定索引处删除元素。
   */
  removeAt(): T
  /**
   * 向数组的末尾添加一个元素，并返回新的长度
   */
  push(element: T): number
}

export class Size {
  constructor(width: number, height: number)
  /**
   * 比较两个点是否相等。
   */
  equals(other: Size): boolean
  /**
   * 获取width值。
   */
  getWidth(): number
  /**
   * 获取height值。
   */
  getHeight(): number
  /**
   * 转换为字符串表示。
   */
  tostring(): string
  /**
   *
   */
  clone(): Point
}

export class MapType {
  /**
   * 当此 MapType 的按钮悬停在 MapTypeControl 中时显示的备选文本。可选。
   */
  alt: string
  /**
   * 显示此 MapType 时地图的最大缩放级别。对于基本 MapType，为必填项。而对于叠加层 MapType，则将其忽略。
   */
  maxZoom: number
  /**
   * 显示此 MapType 时地图的最小缩放级别。可选；默认值为 0。
   */
  minZoom: number
  /**
   * 要在 MapTypeControl 中显示的名称。可选。
   */
  name: string
  /**
   * 用于渲染此 MapType 的投影。可选；默认值为 Mercator。
   */
  projection: Projection
  /**
   * 地图的行星半径（以米为单位）。可选；默认为地球的赤道半径（6378137 米）。
   */
  radius: number
  /**
   * 每个图块的尺寸。必填。
   */
  tileSize: Size
  /**
   * 返回指定坐标(x, y)和放大级别处的瓦片节点。生成的瓦片会被插入到指定的ownerDocument中。
   */
  getTile(tileCoord: Point, zoom: number, ownerDocument: Document): HTMLElement
  /**
   * 释放给定的瓦片节点，执行必要的清理。注意此瓦片节点已经从文档中移除。可选。
   */
  releaseTile(tile: HTMLElement): void
}

export class MapTypeRegistry {
  constructor()
  /**
   * 设置注册表以将传递的字符串标识符与传递的 MapType 相关联。
   */
  set(id: string, mapType: MapType): void
}

export class Map {
  /**
   * 在地图上添加自定义控件。
   */
  controls: Array<MVCArray<HTMLDivElement>>
  /**
   * 通过Id注册MapType实例。
   */
  mapTypes: MapTypeRegistry
  /**
   * 添加用户自定义的叠加地图类型。
   */
  overlayMapTypes: MVCArray<MapType>
  constructor(mapContainer: HTMLDivElement | string, options: MapOptions)
  /**
   * LatLngBounds: 根据指定的范围调整地图视野; padding(可选):: 可设置边距。
   */
  fitBounds(bounds: LatLngBounds, padding?: number): void
  /**
   * 返回当前地图的视野范围。bounds属性是异步的，不能直接获得，第一次获取可以用bounds_changed事件来获取。
   */
  getBounds(): LatLngBounds
  /**
   * 返回地图当前中心点地理坐标。
   */
  getCenter(): LatLng
  /**
   * 返回地图缩放级别。
   */
  getZoom(): number
  /**
   * 返回当前地图所在的 HTML 容器。
   */
  getContainer(): HTMLDivElement
  /**
   * 返回当前地图类型ID。
   */
  getMapTypeId(): MapTypeId
  /**
   * 传回当前地图的投影对象。如果还未启动地图（即 mapType 仍为 Null），则结果为 Null。侦听 projection_changed 并确保其值不为 Null。
   */
  getProjection(): Projection
  /**
   * 将地图中心移动一段指定的距离（以像素为单位）。
   */
  panBy(x: number, y: number): void
  /**
   * 将地图缩放到当前的级别加上指定的数值后的级别。
   */
  zoomBy(deltaZoom: number): void
  /**
   * 将地图中心移动到指定的经纬度坐标。
   */
  panTo(latLng: LatLng): void
  /**
   * 将地图缩放到指定的级别。
   */
  zoomTo(zoom: number): void
  /**
   * 设置地图中心点坐标。
   */
  setCenter(latLng: LatLng): void
  /**
   * 设置地图缩放级别。
   */
  setZoom(zoom: number): void
  /**
   * 设置地图类型ID。
   */
  setMapTypeId(mapTypeId: MapTypeId): void
  /**
   * 设置地图参数。
   */
  setOptions(options: MapOptions): void
}

export class LatLngBounds {
  constructor(sw?: LatLng, ne?: LatLng)
  /**
   * 获取该范围的中心点坐标。
   */
  getCenter(): LatLng
  /**
   * 获取该范围的东北角坐标。
   */
  getNorthEast(): LatLng
  /**
   * 获取该范围的西南角坐标。
   */
  getSouthWest(): LatLng
  /**
   * 扩展该范围边界，以包含指定的坐标点。
   */
  extend(latlng: LatLng): LatLngBounds
  /**
   * 扩展该范围边界，以包含指定的一个矩形范围。
   */
  union(other: LatLngBounds): LatLngBounds
  /**
   * 比较两个矩形范围是否完全相等。
   */
  equals(other: LatLngBounds): boolean
  /**
   * 判断该范围是否与另一矩形范围相交。
   */
  intersects(other: LatLngBounds): boolean
  /**
   * 判断该范围是否为空。
   */
  isEmpty(): boolean
  /**
   * 判断指定的坐标是否在这个范围内。
   */
  contains(latlng: LatLng): boolean
  /**
   * 转换为字符串表示。
   */
  tostring(): string
}

export enum MapTypeId {
  /**
   * 该地图类型显示普通的街道地图。
   */
  ROADMAP,
  /**
   * 该地图类型显示卫星图像。
   */
  SATELLITE,
  /**
   * 该地图类型显示卫星图像上的主要街道透明层。
   */
  HYBRID,
}

export enum ControlPosition {
  /**
   * 相对左上角对齐，向右排列。
   */
  TOP_LEFT,
  /**
   * 相对上方中间位置对齐。
   */
  TOP_CENTER,
  /**
   * 相对右上角对齐，向左排列。
   */
  TOP_RIGHT,
  /**
   * 相对左下角对齐，向右排列。
   */
  BOTTOM_LEFT,
  /**
   * 相对下方中间位置对齐。
   */
  BOTTOM_CENTER,
  /**
   * 相对右下角对齐，向左排列。
   */
  BOTTOM_RIGHT,
  /**
   * 相对左上角对齐，向下排列。
   */
  LEFT_TOP,
  /**
   * 相对左方中间位置对齐。
   */
  LEFT_CENTER,
  /**
   * 相对左下角对齐，向上排列。
   */
  LEFT_BOTTOM,
  /**
   * 相对右上角对齐，向下排列。
   */
  RIGHT_TOP,
  /**
   * 相对右方中间位置对齐。
   */
  RIGHT_CENTER,
  /**
   * 相对右下角对齐，向上排列。
   */
  RIGHT_BOTTOM,
  /**
   * 中间位置对齐。
   */
  CENTER,
}

export enum ZoomControlStyle {
  /**
   * 默认的缩放控件。会根据地图尺寸的大小和其他因素自动调整样式。
   */
  DEFAULT,
  /**
   * 标准的缩放控件。包含放大、缩小和滑块。
   */
  LARGE,
  /**
   * 仅包含放大缩小两个按钮。
   */
  SMALL,
}

export interface MapsEventListener {
  /**
   * 删除当前事件侦听器。
   */
  remove()
}

export interface Event {
  /**
   * 绑定Dom事件。
   */
  addDomListener(
    element: HTMLElement,
    eventName: string,
    handler: Function
  ): MapsEventListener
  /**
   * 绑定Dom事件，触发一次后自动移除该绑定。
   */
  addDomListenerOnce(
    element: HTMLElement,
    eventName: string,
    handler: Function
  ): MapsEventListener
  /**
   * 注册对象事件。
   */
  addListener(
    instance: Object,
    eventName: string,
    handler: Function
  ): MapsEventListener
  /**
   * 注册对象事件，触发一次后自动移除该事件。
   */
  addListenerOnce(
    instance: Object,
    eventName: string,
    handler: Function
  ): MapsEventListener
  /**
   * 删除指定的事件侦听器。
   */
  removeListener(listener: MapsEventListener): void
  /**
   * 删除该对象上指定事件的所有侦听器。
   */
  clearListeners(instance: Object, eventName: string): void
  /**
   * 触发指定对象的指定事件。
   */
  trigger(instance: Object, eventName: string, var_args: any): void
}

export interface MarkerOptions {
  /**
   * 用于指定Marker被添加到Map上时的动画效果。
   */
  animation?: MarkerAnimation
  /**
   * 如果为true，Marker可响应鼠标的click事件和触屏设备上touch事件。默认值true。
   */
  clickable?: boolean
  /**
   * 该值为true时，Marker可以拖拽移动，默认值false。
   */
  draggable?: boolean
  /**
   * Marker的覆盖内容
   */
  decoration?: MarkerDecoration
  /**
   * 为true，表示不显示默认图标的阴影，默认值为false。
   */
  flat?: boolean
  /**
   * 鼠标hover的光标形状。
   */
  cursor?: string
  /**
   * Marker的图标，当使用自定义图标时，设置该属性。
   */
  icon?: MarkerImage
  /**
   * Marker的阴影使用的图标。
   */
  shadow?: MarkerImage
  /**
   * Marker图片可点区域。
   */
  shape?: MarkerShape
  /**
   * Marker标题，鼠标划过Marker时显示。
   */
  title?: string
  /**
   * 是否可见，为true时可见。
   */
  visible?: boolean
  /**
   * Marker的z轴高度，它决定了Marker在地图上的显示前后顺序。zIndex大的Marker显示在zIndex值小的前面。若没有设置zIndex属性，默认情况下， Marker在地图屏幕纵向位置决定前后顺序，位置越靠近屏幕下方的Marker，显示在位置靠近屏幕上方的Marker的前面。
   */
  zIndex?: number
  /**
   * 显示Marker的地图。
   */
  map?: Map
  /**
   * Marker的位置坐标，必填项。
   */
  position?: LatLng
  /**
   * marker旋转角度(取值范围0 - 360)
   */
  rotation?: number
  /**
   * 是否自动旋转。点标记在使用moveTo、moveAlong动画时，路径方向若有变化，点标记是否自动调整角度，默认为false。
   */
  autoRotation?: boolean
}

export class Marker {
  constructor(options: MarkerOptions)
  /**
   * 返回标注的动画效果。
   */
  getAnimation(): MarkerAnimation
  /**
   * 返回标注的可点击性。
   */
  getClickable(): boolean
  /**
   * 返回标注的鼠标样式。
   */
  getCursor(): string
  /**
   * 返回标注是否可拖拽。
   */
  getDraggable(): boolean
  /**
   * 返回标注的阴影是否可见。
   */
  getFlat(): boolean
  /**
   * 返回标注的图标。
   */
  getIcon(): string | MarkerImage
  /**
   * 返回标注的map对象。
   */
  getMap(): Map
  /**
   * 返回标注的位置。
   */
  getPosition(): LatLng
  /**
   * 返回标注的阴影。
   */
  getShadow(): string | MarkerImage
  /**
   * 返回标注的可响应区域。
   */
  getShape(): MarkerShape
  /**
   * 返回标注的名称属性。
   */
  getTitle(): string
  /**
   * 返回标注是否可见。
   */
  getVisible(): boolean
  /**
   * 返回标注的zIndex。
   */
  getZIndex(): number
  /**
   * 返回marker的旋转角度
   */
  getRotation(): number
  /**
   * 获取标注的覆盖内容
   */
  getDecoration(): MarkerDecoration
  /**
   * 启用一个动画，目前Marker支持反复弹跳、坠落、落下、弹起四种动画。当设置为null时，会自动终止当前动画。
   */
  setAnimation(animation: MarkerAnimation): void
  /**
   * 设置标注是否可点击。
   */
  setClickable(clickable: boolean): void
  /**
   * 设置鼠标经过标注时的样式。
   */
  setCursor(cursor: string): void
  /**
   * 设置标注是否可拖拽。
   */
  setDraggable(draggable: boolean): void
  /**
   * 设置标注是否有阴影。
   */
  setFlat(flat: boolean): void
  /**
   * 设置标注图标。
   */
  setIcon(icon: string | MarkerImage): void
  /**
   * 在地图对象上显示Marker，若设置为null，则从地图上移除Marker。
   */
  setMap(map: Map | null): void
  /**
   * 设置标注位置。
   */
  setPosition(position: LatLng): void
  /**
   * 设置标注的阴影。
   */
  setShadow(shadow: string | MarkerImage): void
  /**
   * 设置标注的可响应区域。
   */
  setShape(shape: MarkerShape): void
  /**
   * 设置标注的名称。
   */
  setTitle(title: string): void
  /**
   * 设置标注可见性。
   */
  setVisible(visible: boolean): void
  /**
   * 设置标注的zIndex。
   */
  setZIndex(zIndex: number): void
  /**
   * 设置marker角度(注：rotation属性取值范围0-360, 支持IE9及以上版本)
   */
  setRotation(rotation: number): void
  /**
   * 设置标注的覆盖内容
   */
  setDecoration(decoration: MarkerDecoration): void
  /**
   * 以给定速度移动点标记到指定位置。参数lnglat为指定位置，必设；speed为指定速度，单位：千米 / 小时。
   */
  moveTo(latlng: LatLng, speed: number): void
  /**
   * 以指定的速度，点标记沿指定的路径移动。参数path为路径坐标串；speed为指定速度，单位：千米 / 小时。
   */
  moveAlong(path: Array<LatLng>, speed: number): void
  /**
   * 点标记停止动画。
   */
  stopMove(): void
  /**
   * 暂定点标记的动画效果。
   */
  pauseMove(): void
  /**
   * 重新开始点标记的动画效果。
   */
  resumeMove(): void
}

export enum MarkerAnimation {
  /**
   * 反复弹跳
   */
  BOUNCE,
  /**
   * 从天而降
   */
  DROP,
  /**
   * 落下
   */
  DOWN,
  /**
   * 升起
   */
  UP,
}

export class MarkerDecoration {
  constructor(content: string | HTMLElement, offset: Point)
}

export class MarkerImage {
  constructor(
    url: string,
    size: Size | null,
    origin: Point | null,
    anchor: Point | null,
    scaleSize: Size | null,
    shadowAngle?: number
  )
}

export class MarkerShape {
  constructor(coords: Array<number>, type: 'circle' | 'poly' | 'rect')
}

export interface LabelOptions {
  /**
   * 如果为true，表示可点击，默认true。
   */
  clickable?: boolean
  /**
   * 标签的文本。
   */
  content?: string
  /**
   * 显示标签的地图。
   */
  map?: Map
  /**
   * 相对于position位置偏移值，x方向向右偏移为正值，y方向向下偏移为正值，反之为负。
   */
  offset?: Size
  /**
   * 标签位置坐标，若offset不设置，默认标签左上角对准该位置。
   */
  position?: LatLng
  /**
   * Label样式，例如：{color:"#000000",backgroundColor:"red"}
   */
  style?: Partial<CSSStyleDeclaration>
  /**
   * 如果为true，表示标签可见，默认为true。
   */
  visible?: boolean
  /**
   * 标签的z轴高度，zIndex大的标签，显示在zIndex小的前面。
   */
  zIndex?: number
}

export class Label {
  constructor(options: LabelOptions)
  /**
   * 返回Label的内容。
   */
  getContent(): string
  /**
   * 返回Label所在的map对象。
   */
  getMap(): Map
  /**
   * 返回Label的位置。
   */
  getPosition(): LatLng
  /**
   * 返回Label是否可见。
   */
  getVisible(): boolean
  /**
   * 返回Label的zIndex。
   */
  getZIndex(): number
  /**
   * 设置Label的内容。
   */
  setContent(content: string): void
  /**
   * 设置Label所在的map对象。
   */
  setMap(map: Map | null): void
  /**
   * 设置Label的位置。
   */
  setPosition(position: LatLng): void
  /**
   * 设置Label样式，例如：{color:"#000000",backgroundColor:"red"}。
   */
  setStyle(style: Object): void
  /**
   * 设置Label的可见性。
   */
  setVisible(visible: boolean): void
  /**
   * 设置Label的zIndex。
   */
  setZIndex(zIndex: number): void
  /**
   * 设置Label参数。
   */
  setOptions(options: LabelOptions): void
}

export class Color {
  constructor(red: number, green: number, blue: number, alpha?: number)
  /**
   * 返回格式:rgb(r,g,b)
   */
  toRGB(): string
  /**
   * 返回格式:rgb(r,g,b,a)
   */
  toRGBA(): string
  /**
   * 返回格式:#000000
   */
  toHex(): string
  /**
   * 通过#FFFFFF或者#FFF生成Color实例。
   */
  static fromHex(hex: string, alpha?: number): Color
}

export interface PolylineOptions {
  /**
   * 折线是否可点击。
   */
  clickable?: boolean
  /**
   * 鼠标在折线上的光标样式。
   */
  cursor?: string
  /**
   * 可选项：
   * true - 启动编辑功能，
   * false - 默认，不启动编辑功能，
   * 启动编辑功能后，可拖动端点对折线进行调整，双击节点可删除。
   */
  editable?: boolean
  /**
   * 要显示折线的地图。
   */
  map?: Map
  /**
   * 折线的路径，以经纬度坐标数组构成。
   */
  path: Array<LatLng> | MVCArray<LatLng>
  /**
   * 折线的线条颜色，可通过Color对象的alpha属性设置透明度。
   */
  strokeColor: Color | string
  /**
   * 折线的形状。实线是solid，虚线是dash。
   */
  strokeDashStyle?: string
  /**
   * 折线的线宽。
   */
  strokeWeight?: number
  /**
   * 折线末端线帽的样式，圆形为round（默认），方形为square，平直为butt。
   */
  strokeLinecap?: string
  /**
   * 折线是否可见。
   */
  visible?: boolean
  /**
   * 折线的zIndex值。
   */
  zIndex?: number
}

export class Polyline {
  constructor(options: PolylineOptions)
  /**
   * 返回折线的地理区域范围。
   */
  getBounds(): LatLngBounds
  /**
   * 获取折线所在的map对象
   */
  getMap(): Map
  /**
   * 获取折线的经纬度坐标数组。
   */
  getPath(): MVCArray<LatLng>
  /**
   * 获取折线的颜色。
   */
  getStrokeColor(): Color
  /**
   * 获取折线的宽度。
   */
  getStrokeWeight(): number
  /**
   * 获取折线末端线帽的样式。
   */
  getStrokeLinecap(): string
  /**
   * 获取折线的可见性。
   */
  getVisible(): boolean
  /**
   * 获取折线的zIndex值。
   */
  getZIndex(): number
  /**
   * 设置折线所在的map对象
   */
  setMap(map: Map | null): void
  /**
   * 设置折线的路径。
   */
  setPath(path: Array<LatLng> | MVCArray<LatLng>): void
  /**
   * 设置折线的颜色（包括透明度）。
   */
  setStrokeColor(color: Color): void
  /**
   * 设置折线的宽度。
   */
  setStrokeWeight(width: number): void
  /**
   * 设置折线末端线帽的样式，圆形为round（默认），方形为square，平直为butt。
   */
  setStrokeLinecap(linecap: string): void
  /**
   * 设置折线的可见性。
   */
  setVisible(visible: boolean): void
  /**
   * 设置折线的zIndex。
   */
  setZIndex(zIndex: number): void
  /**
   *
   */
  setOptions(options: PolylineOptions): void
}

export interface CircleOptions {
  /**
   * 圆形的中心点坐标。
   */
  center?: LatLng
  /**
   * 圆形是否可点击。
   */
  clickable?: boolean
  /**
   * 鼠标在圆形内的光标样式。
   */
  cursor?: string
  /**
   * 可选项：
   * true - 启动编辑功能，
   * false - 默认，不启动编辑功能，
   * 启动编辑功能后，可拖动编辑点对半径和圆心进行调整。
   */
  editable?: boolean
  /**
   * 圆形的填充色，可通过Color对象的alpha属性设置透明度。
   */
  fillColor?: Color | string
  /**
   * 要显示圆形的地图。
   */
  map?: Map
  /**
   * 圆形的半径。
   */
  radius?: number
  /**
   * 圆形的边框颜色，可通过Color对象的alpha属性设置透明度。
   */
  strokeColor?: Color | string
  /**
   * 圆形的边框样式。实线是solid，虚线是dash。
   */
  strokeDashStyle?: string
  /**
   * 圆形的边框线宽。
   */
  strokeWeight?: number
  /**
   * 圆形是否可见。
   */
  visible?: boolean
  /**
   * 圆形的zIndex值。
   */
  zIndex?: number
}

export class Circle {
  constructor(options: CircleOptions)
  /**
   * 返回圆形的地理区域范围。
   */
  getBounds(): LatLngBounds
  /**
   * 返回圆形的中心点坐标。
   */
  getCenter(): LatLng
  /**
   * 返回圆形所在的map对象。
   */
  getMap(): Map
  /**
   * 返回圆形半径。
   */
  getRadius(): number
  /**
   * 获取圆形的可见性。
   */
  getVisible(): boolean
  /**
   * 获取圆形的zIndex值。
   */
  getZIndex(): number
  /**
   * 设置圆心坐标。
   */
  setCenter(center: LatLng): none
  /**
   * 设置圆形所在的map对象。
   */
  setMap(map: Map | null): none
  /**
   * 设置圆形半径。
   */
  setRadius(radius: number): none
  /**
   * 设置圆形覆盖物的可见性。
   */
  setVisible(visible: boolean): none
  /**
   * 设置圆形覆盖物的zIndex。
   */
  setZIndex(zIndex: number): none
  /**
   * 设置圆形参数。
   */
  setOptions(options: CircleOptions): none
}

export interface Spherical {
  /**
   * 返回闭合路径的面积。返回的面积单位为平方米。
   */
  computeArea(path: Array<LatLng> | MVCArray<LatLng>, radius?: number): number
  /**
   * 返回两个坐标点间的距离。
   */
  computeDistanceBetween(from: LatLng, to: LatLng, radius?: number): number
  /**
   * 返回从一个坐标到另一个坐标的航向。航向是指从一个坐标指向另一个坐标的向量与正北方向的夹角，范围为[-180,180)。
   */
  computeHeading(from: LatLng, to: LatLng): number
  /**
   * 返回给定路径的长度。
   */
  computeLength(path: Array<LatLng> | MVCArray<LatLng>): number
  /**
   * 通过起始点坐标、距离以及航向算出终点坐标。
   */
  computeOffset(
    from: LatLng,
    distance: number,
    heading: number,
    radius?: number
  ): LatLng
  /**
   * 通过终点坐标、距离以及航向算出起始点坐标。
   */
  computeOffsetOrigin(
    to: LatLng,
    distance: number,
    heading: number,
    radius?: number
  ): LatLng
  /**
   * 返回闭合路径的有向面积。有向面积可以用于检测路径的方向。返回的有向面积单位为平方米。
   */
  computeSignedArea(
    loop: Array<LatLng> | MVCArray<LatLng>,
    radius?: number
  ): number
  /**
   * 返回在起终点连线上位于给定比例的点坐标。比例值fraction范围为0~1。
   */
  interpolate(from: LatLng, to: LatLng, fraction: number): LatLng
}

export interface Geometry {
  spherical: Spherical
}

export interface QQMaps {
  LatLng: typeof LatLng
  Overlay: typeof Overlay
  Map: typeof Map
  MapZoomType: MapZoomType
  LatLngBounds: typeof LatLngBounds
  MapTypeId: record<MapTypeId, MapTypeId>
  ControlPosition: typeof ControlPosition
  ZoomControlStyle: ZoomControlStyle
  Point: typeof Point
  MVCArray: typeof MVCArray
  MapTypeRegistrya: typeof MapTypeRegistry
  Size: typeof Size
  event: Event
  Marker: typeof Marker
  MarkerAnimation: MarkerAnimation
  MarkerDecoration: typeof MarkerDecoration
  MarkerImage: typeof MarkerImage
  MarkerShape: typeof MarkerShape
  Label: typeof Label
  Polyline: typeof Polyline
  Color: typeof Color
  Circle: typeof Circle
  geometry: Geometry
  Polygon: typeof Polygon
}

export interface PolygonOptions {
  // 多边形是否可点击
  clickable: boolean
  // 鼠标在多边形内的光标样式
  cursor: string
  // true - 启动编辑功能，
  // false - 默认，不启动编辑功能，
  // 启动编辑功能后，可拖动端点对形状进行调整，双击节点可删除
  editable?: boolean
  // 多边形的填充色，可通过Color对象的alpha属性设置透明度
  fillColor: Color | string
  // google map 支持，fillColor 的透明度
  fillOpacity?: number
  // 要显示多边形的地图。
  map: Map
  // 多边形轮廓的坐标数组。若为环多边形，设置为二维数组，第一个元素为外多边形，其他元素为内部“孤岛”轮廓
  path: Array<LatLng> | Array<Array<LatLng>>
  // 多边形的线条颜色，可通过Color对象的alpha属性设置透明度
  strokeColor: Color | string
  // google map 支持，strokeColor 的透明度
  strokeOpacity?: number
  // 多边形的边框样式。实线是solid，虚线是dash
  strokeDashStyle: string
  // 多边形的边框线宽
  strokeWeight: number
  // 多边形是否可见
  visible: boolean
  // 多边形的zIndex值
  zIndex: number
}

export class Polygon {
  constructor(options: PolygonOptions)
  // 返回多边形的地理区域范围
  getBounds(): LatLngBounds
  // 返回多边形所在的map对象
  getMap(): Map
  // 获取多边形的经纬度坐标数组。
  getPath(): MVCArray<LatLng>
  // 获取多边形覆盖物的可见性
  getVisible(): boolean
  // 获取多边形覆盖物的zIndex值
  getZIndex(): number
  // 设置多边形所在的map对象
  setMap(map: Map | null): void
  // 设置多边形轮廓的经纬度坐标数组，若为二维数组则表现为环多边形
  setPath(path: Array<LatLng> | Array<Array<LatLng>>): void
  // 设置多边形的可见性
  setVisible(visible: boolean): void
  // 设置多变心覆盖物的zIndex
  setZIndex(zIndex: number): void
  // 设置多边形参数
  setOptions(options: PolygonOptions): void
}
