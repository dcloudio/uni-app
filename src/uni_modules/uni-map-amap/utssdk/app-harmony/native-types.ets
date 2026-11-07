// Plain data at the UTS / ArkTS boundary. Keep in sync with utssdk/interface.uts.
export interface Coordinate { latitude: number; longitude: number }
export interface Anchor { x: number; y: number }
export interface Bounds { southwest: Coordinate; northeast: Coordinate }
export interface Callout {
  content: string;
  color?: string | null;
  fontSize?: number | null;
  borderRadius?: number | null;
  borderWidth?: number | null;
  borderColor?: string | null;
  bgColor?: string | null;
  padding?: number | null;
  display?: string | null;
  textAlign?: string | null;
}
export interface Label {
  content: string;
  color?: string | null;
  fontSize?: number | null;
  x?: number | null;
  y?: number | null;
  borderWidth?: number | null;
  borderColor?: string | null;
  bgColor?: string | null;
  borderRadius?: number | null;
  padding?: number | null;
  textAlign?: string | null;
}
export interface MarkerData extends Coordinate {
  id: number;
  latitude: number;
  longitude: number;
  iconPath: string;
  title?: string | null;
  rotate?: number | null;
  alpha?: number | null;
  width?: number | null;
  height?: number | null;
  ariaLabel?: string | null;
  anchor?: Anchor | null;
  callout?: Callout | null;
  label?: Label | null;
  joinCluster?: boolean | null;
  clusterId?: number | null;
}
export interface PolylineData {
  points: Coordinate[];
  color?: string | null;
  width?: number | null;
  dottedLine?: boolean | null;
  arrowLine?: boolean | null;
  arrowIconPath?: string | null;
  borderColor?: string | null;
  borderWidth?: number | null;
  colorList?: string[] | null;
}
export interface PolygonData {
  points: Coordinate[];
  strokeWidth?: number | null;
  strokeColor?: string | null;
  fillColor?: string | null;
  zIndex?: number | null;
}
export interface CircleData extends Coordinate {
  latitude: number;
  longitude: number;
  radius: number;
  color?: string | null;
  fillColor?: string | null;
  strokeWidth?: number | null;
}
export interface ControlPosition {
  left?: number | null;
  top?: number | null;
  width?: number | null;
  height?: number | null;
}
export interface ControlData {
  position: ControlPosition;
  iconPath: string;
  id?: number | null;
  clickable?: boolean | null;
}
export interface GroundData {
  id: string;
  src: string;
  bounds: Bounds;
  visible?: boolean | null;
  zIndex?: number | null;
  opacity?: number | null;
}
export interface CameraData extends Coordinate {
  latitude: number;
  longitude: number;
  scale: number;
  skew: number;
  rotate: number;
  animate?: boolean;
}
export interface CenterData extends Coordinate { animate?: boolean }
export interface ScaleCameraData { scale: number; animate?: boolean }
export interface RotateCameraData { rotate: number; animate?: boolean }
export interface SkewCameraData { skew: number; animate?: boolean }
export interface IncludeCameraData { points: Coordinate[]; animate?: boolean }
export interface MoveToData { latitude?: number | null; longitude?: number | null }
export interface IncludeData { points: Coordinate[] }
export interface AddMarkersData { markers: MarkerData[]; clear?: boolean | null }
export interface RemoveMarkersData { markerIds: number[] }
export interface RemoveGroundData { id: string }
export interface TranslateData {
  markerId: number;
  destination: Coordinate;
  autoRotate?: boolean | null;
  rotate?: number | null;
  moveWithRotate?: boolean | null;
  duration?: number | null;
}
export interface MoveAlongData { markerId: number; path: Coordinate[]; duration?: number | null }
export interface ScaleResult { scale: number }
export interface SuccessResult { errMsg: string }
export interface ErrorResult { errMsg: string }
export type NativeCallback = (code: number, json: string) => void;

export class MapProperties {
  latitude: number = 0;
  longitude: number = 0;
  scale: number = 16;
  theme: string = 'normal';
  minScale: number = 3;
  maxScale: number = 20;
  layerStyle: string = '1';
  showLocation: boolean = false;
  enableTraffic: boolean = false;
  enableSatellite: boolean = false;
  enableRotate: boolean = true;
  enableZoom: boolean = true;
  enableScroll: boolean = true;
  showCompass: boolean = false;
  showScale: boolean = false;
  enable3D: boolean = false;
  enablePoi: boolean = false;
  enableBuilding: boolean = false;
  enableIndoorMap: boolean = false;
  enableOverlooking: boolean = false;
  rotate: number = 0;
  skew: number = 0;
  polylines: PolylineData[] = [];
  polygons: PolygonData[] = [];
  circles: CircleData[] = [];
  includePoints: Coordinate[] = [];
  controls: ControlData[] = [];
}

// The visual host gets immutable snapshots, never an SDK instance.
export class TextOverlay {
  key: string = '';
  markerId: number = 0;
  x: number = 0;
  y: number = 0;
  content: string = '';
  color: string = '#000000';
  fontSize: number = 14;
  borderRadius: number = 0;
  borderWidth: number = 0;
  borderColor: string = '#000000';
  bgColor: string = '#FFFFFF';
  padding: number = 4;
  textAlign: string = 'center';
  callout: boolean = false;
}
export class ControlOverlay {
  key: string = '';
  id: number = 0;
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  clickable: boolean = false;
  image?: PixelMap;
}
export class AccessibleMarker {
  key: string = '';
  id: number = 0;
  text: string = '';
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
}
export class AmapViewState {
  mountMap: boolean = false;
  mapName: string = '';
  overlays: TextOverlay[] = [];
  controls: ControlOverlay[] = [];
  accessibleMarkers: AccessibleMarker[] = [];
  locationVisible: boolean = false;
  locationX: number = 0;
  locationY: number = 0;
}
export interface PointerPayload {
  x: number; y: number; screenX: number; screenY: number;
  latitude?: number; longitude?: number; markerId?: number; name?: string;
}
export interface RegionPayload { type: string; causedBy: string | null; skew: number; rotate: number }
export interface MarkerPayload { markerId: number }
export interface ControlPayload { controlId: number }
