import common from '@ohos.app.ability.common';
import bundleManager from '@ohos.bundle.bundleManager';
import geoLocationManager from '@ohos.geoLocationManager';
import { UIContext } from '@ohos.arkui.UIContext';
import {
  AMap, MapView, MapViewManager, MapViewCreateCallback, MapsInitializer, MapType,
  CameraPosition, CameraUpdate, CameraUpdateFactory, OnCameraChangeListener, CustomRenderer,
  Marker, MarkerOptions, LatLng, LatLngBounds, Point, Poi, PolylineOptions, PolygonOptions,
  CircleOptions, GroundOverlay, GroundOverlayOptions, MyLocationStyle
} from '@amap/amap_lbs_map3d';
import { AMapPrivacyAgreeStatus, AMapPrivacyInfoStatus, AMapPrivacyShowStatus } from '@amap/amap_lbs_common';
import { AMapLocationManagerImpl } from '@amap/amap_lbs_location';
import { AmapImageStore, AmapImageError, ImageAsset } from './resources';
import { AmapLocationSource, AmapLocationError } from './location';
import {
  Coordinate, MarkerData, PolylineData, PolygonData, CircleData, GroundData, ControlData,
  CameraData, CenterData, ScaleCameraData, RotateCameraData, SkewCameraData, IncludeCameraData,
  AddMarkersData, RemoveMarkersData, RemoveGroundData, MoveToData, IncludeData,
  TranslateData, MoveAlongData, NativeCallback, MapProperties, AmapViewState, TextOverlay,
  ControlOverlay, AccessibleMarker, PointerPayload, RegionPayload, MarkerPayload,
  ControlPayload, SuccessResult, ErrorResult, Bounds, ScaleResult
} from './native-types';
import {
  clamp, finite, validCoordinate, normalizeAngle, angleDelta, bearing, distanceMeters,
  interpolateCoordinate, colorARGB, uiColor, DistancePath
} from './geometry';
import { MarkerAnimation } from './animation';

class OperationError extends Error {
  code: number;
  constructor(code: number, message: string) { super(message); this.code = code; }
}
class MarkerRecord {
  model: MarkerData;
  native?: Marker;
  revision: number = 0;
  width: number = 24;
  height: number = 34;
  selected: boolean = false;
  rotation: number = 0;
  heading?: number;
  headingOffset: number = 0;
  rotateAroundCenter: boolean = false;
  animation?: MarkerAnimation;
  constructor(model: MarkerData) { this.model = model; }
}
class GroundRecord {
  data: GroundData;
  committedData?: GroundData;
  native?: GroundOverlay;
  revision: number = 0;
  constructor(data: GroundData) { this.data = data; }
}

// MapViewManager is SDK-global. Only one callback belongs to this plugin.
const mapRoutes: Map<string, HarmonyAmapController> = new Map();
let mapSequence: number = 0;
let routerRegistered: boolean = false;
const createdRouter: MapViewCreateCallback = (view?: MapView, name?: string): void => {
  if (view == null || name == null) return;
  mapRoutes.get(name)?.acceptMapView(view, name);
};

export class HarmonyAmapController {
  private context: common.UIAbilityContext;
  private resolvePath: (src: string) => string;
  private emit: (type: string, payload: string) => void;
  private scheduleUI: (job: () => void) => void;
  private uiContext?: UIContext;
  private images?: AmapImageStore;
  private location?: AmapLocationSource;
  private lastLocation?: geoLocationManager.Location;
  private props: MapProperties = new MapProperties();
  private mapView?: MapView;
  private map?: AMap;
  private key: string = '';
  private generation: number = 0;
  private mapName: string = '';
  private disposed: boolean = false;
  private privacyGranted: boolean = false;
  private sdkPrivacyInitialized: boolean = false;
  private visible: boolean = true;
  private initialized: boolean = false;
  private updatedSent: boolean = false;
  private initialOptionsApplied: boolean = false;
  private initializationError: number = 0;
  private listeners: Set<(state: AmapViewState) => void> = new Set();
  private publishPending: boolean = false;
  private markers: Map<number, MarkerRecord> = new Map();
  private markerIds: Map<string, number> = new Map();
  private grounds: Map<string, GroundRecord> = new Map();
  private polylineIds: string[] = [];
  private polygonIds: string[] = [];
  private circleIds: string[] = [];
  private geometryRevision: number = 0;
  private controlRevision: number = 0;
  private controls: ControlOverlay[] = [];
  private requests: Map<number, NativeCallback> = new Map();
  private requestSequence: number = 0;
  private layoutWidth: number = 0;
  private layoutHeight: number = 0;
  private screenLeft: number = 0;
  private screenTop: number = 0;
  private pendingInclude: boolean = false;
  private includeAnimate: boolean = false;
  private regionActive: boolean = false;
  private regionCause: string = 'update';
  private touchActive: boolean = false;
  private touchUntil: number = 0;
  private touchZoom: number = 0;
  private programmaticUntil: number = 0;

  constructor(context: common.UIAbilityContext, resolvePath: (src: string) => string,
    emit: (type: string, payload: string) => void, scheduleUI: (job: () => void) => void) {
    this.context = context;
    this.resolvePath = resolvePath;
    this.emit = emit;
    this.scheduleUI = scheduleUI;
    try {
      const flags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_HAP_MODULE |
        bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_METADATA;
      const info = bundleManager.getBundleInfoForSelfSync(flags);
      const entry = info.hapModulesInfo.find((module) => module.type === bundleManager.ModuleType.ENTRY);
      const metadata = entry?.metadata.find((item) => item.name === 'AMAP_API_KEY');
      this.key = metadata?.value?.trim() ?? '';
      if (this.key === 'your_harmony_amap_api_key') this.key = '';
    } catch (error) { this.warn('read AMAP_API_KEY', error as Error); }
    if (this.key.length === 0) this.initializationError = 500013;
  }

  subscribe(listener: (state: AmapViewState) => void): void {
    this.listeners.add(listener);
    listener(this.viewState());
  }
  unsubscribe(listener: (state: AmapViewState) => void): void { this.listeners.delete(listener); }
  setUIContext(context: UIContext): void { this.uiContext = context; }
  setLayout(width: number, height: number, left: number, top: number): void {
    if (this.disposed) return;
    this.layoutWidth = finite(width, 0);
    this.layoutHeight = finite(height, 0);
    this.screenLeft = finite(left, 0);
    this.screenTop = finite(top, 0);
    this.tryPendingInclude();
    this.publish();
  }

  setPrivacyGranted(granted: boolean): void {
    if (this.disposed || this.privacyGranted === granted) return;
    this.privacyGranted = granted;
    if (!granted) {
      this.releaseNative();
      if (this.sdkPrivacyInitialized) {
        // The host privacy decision is application-global. Tear down native
        // consumers before revoking both SDKs; initial false never touches them.
        this.cleanup('revoke map privacy', (): void => {
          MapsInitializer.updatePrivacyAgree(AMapPrivacyAgreeStatus.NotAgree, this.context);
        });
        this.cleanup('revoke location privacy', (): void => {
          AMapLocationManagerImpl.updatePrivacyAgree(AMapPrivacyAgreeStatus.NotAgree, this.context);
        });
        this.sdkPrivacyInitialized = false;
      }
      this.publish();
      return;
    }
    if (this.key.length === 0) {
      this.initializationError = 500013;
      this.warn('initialization', new Error('AMAP_API_KEY is missing from ENTRY module metadata'));
      return;
    }
    try {
      // The caller passes the actual host privacy authorization; no SDK is constructed before this branch.
      MapsInitializer.initialize(this.context);
      MapsInitializer.updatePrivacyShow(AMapPrivacyShowStatus.DidShow, AMapPrivacyInfoStatus.DidContain, this.context);
      MapsInitializer.updatePrivacyAgree(AMapPrivacyAgreeStatus.DidAgree, this.context);
      this.sdkPrivacyInitialized = true;
      MapsInitializer.setApiKey(this.key);
      AMapLocationManagerImpl.setApiKey(this.key);
      AMapLocationManagerImpl.updatePrivacyShow(AMapPrivacyShowStatus.DidShow, AMapPrivacyInfoStatus.DidContain, this.context);
      AMapLocationManagerImpl.updatePrivacyAgree(AMapPrivacyAgreeStatus.DidAgree, this.context);
      this.images = new AmapImageStore(this.context, this.resolvePath);
      const generation = ++this.generation;
      this.location = new AmapLocationSource(this.context, (location: geoLocationManager.Location): void => {
        if (!this.isCurrent(generation)) return;
        this.lastLocation = location;
        this.publish();
      });
      this.location.setVisible(this.visible);
      this.mapName = 'uni-amap-' + (++mapSequence).toString();
      mapRoutes.set(this.mapName, this);
      if (!routerRegistered) {
        MapViewManager.getInstance().registerMapViewCreatedCallback(createdRouter);
        routerRegistered = true;
      }
      this.initialized = true;
      this.initializationError = 0;
      this.publish();
    } catch (error) {
      this.initializationError = 500012;
      this.warn('initialization', error as Error);
      this.releaseNative();
      this.publish();
    }
  }

  setVisible(visible: boolean): void {
    if (this.disposed || this.visible === visible) return;
    this.visible = visible;
    this.location?.setVisible(visible);
    this.markers.forEach((record) => record.animation?.setVisible(visible));
    if (visible) this.mapView?.onResume();
    else this.mapView?.onPause();
    if (visible) this.publish();
  }

  acceptMapView(view: MapView, name: string): void {
    if (!this.initialized || this.disposed || !this.privacyGranted || name !== this.mapName || this.mapView != null) return;
    this.mapView = view;
    const generation = this.generation;
    try {
      view.onCreate();
      view.getMapAsync((map: AMap): void => {
        if (!this.isCurrent(generation) || this.mapView !== view) return;
        try {
          this.map = map;
          this.bindEvents(map, generation);
          this.applySettings();
          this.setCamera(false);
          this.markers.forEach((record) => { this.loadMarker(record).catch((error: Error) => this.warn('marker', error)); });
          this.grounds.forEach((record) => { this.loadGround(record).catch((error: Error) => this.warn('ground overlay', error)); });
          this.applyPolylines();
          this.applyPolygons();
          this.applyCircles();
          this.applyControls();
          if (this.props.includePoints.length > 0) this.pendingInclude = true;
          this.tryPendingInclude();
          this.initialOptionsApplied = true;
          map.runOnDrawFrame();
          if (this.visible) view.onResume(); else view.onPause();
          this.publish();
        } catch (error) {
          this.initializationError = 500012;
          this.warn('map ready', error as Error);
          this.releaseNative();
          this.publish();
        }
      });
    } catch (error) {
      this.initializationError = 500012;
      this.warn('map creation', error as Error);
      this.releaseNative();
      this.publish();
    }
  }

  setProperty(name: string, json: string): void {
    if (this.disposed) return;
    try {
      switch (name) {
        case 'camera': {
          const camera = JSON.parse(json) as CameraData;
          this.requireCoordinate(camera);
          this.props.latitude = camera.latitude; this.props.longitude = camera.longitude;
          this.props.scale = finite(camera.scale, 16); this.props.skew = finite(camera.skew, 0);
          this.props.rotate = finite(camera.rotate, 0);
          this.setCamera(camera.animate ?? false);
          return;
        }
        case 'center': {
          const center = JSON.parse(json) as CenterData;
          this.requireCoordinate(center);
          this.props.latitude = center.latitude; this.props.longitude = center.longitude;
          if (this.map != null) this.moveCamera(CameraUpdateFactory.newLatLng(this.latLng(center)), center.animate ?? true);
          return;
        }
        case 'scaleCamera': {
          const option = JSON.parse(json) as ScaleCameraData;
          this.props.scale = finite(option.scale, 16);
          if (this.map != null) this.moveCamera(CameraUpdateFactory.zoomTo(this.zoom(this.props.scale)), option.animate ?? true);
          return;
        }
        case 'rotateCamera': {
          const option = JSON.parse(json) as RotateCameraData;
          this.props.rotate = finite(option.rotate, 0);
          if (this.map != null) this.moveCamera(CameraUpdateFactory.changeBearing(normalizeAngle(this.props.rotate)), option.animate ?? true);
          return;
        }
        case 'skewCamera': {
          const option = JSON.parse(json) as SkewCameraData;
          this.props.skew = finite(option.skew, 0);
          if (this.map != null) this.moveCamera(CameraUpdateFactory.changeTilt(clamp(this.props.skew, 0, 80)), option.animate ?? true);
          return;
        }
        case 'includePointsCamera': {
          const option = JSON.parse(json) as IncludeCameraData;
          this.props.includePoints = option.points ?? [];
          this.includeAnimate = option.animate ?? true; this.pendingInclude = this.props.includePoints.length > 0;
          this.tryPendingInclude(); return;
        }
        case 'latitude': this.props.latitude = JSON.parse(json) as number; this.setCamera(false); return;
        case 'longitude': this.props.longitude = JSON.parse(json) as number; this.setCamera(false); return;
        case 'scale': this.props.scale = JSON.parse(json) as number;
          if (this.map != null) this.moveCamera(CameraUpdateFactory.zoomTo(this.zoom(this.props.scale)), true); return;
        case 'rotate': this.props.rotate = JSON.parse(json) as number;
          if (this.map != null) this.moveCamera(CameraUpdateFactory.changeBearing(normalizeAngle(this.props.rotate)), true); return;
        case 'skew': this.props.skew = JSON.parse(json) as number;
          if (this.map != null) this.moveCamera(CameraUpdateFactory.changeTilt(clamp(this.props.skew, 0, 80)), true); return;
        case 'theme': this.props.theme = JSON.parse(json) as string; break;
        case 'layerStyle': this.props.layerStyle = JSON.parse(json) as string; break;
        case 'minScale': this.props.minScale = JSON.parse(json) as number; break;
        case 'maxScale': this.props.maxScale = JSON.parse(json) as number; break;
        case 'showLocation': this.props.showLocation = JSON.parse(json) as boolean; break;
        case 'enableTraffic': this.props.enableTraffic = JSON.parse(json) as boolean; break;
        case 'enableSatellite': this.props.enableSatellite = JSON.parse(json) as boolean; break;
        case 'enableRotate': this.props.enableRotate = JSON.parse(json) as boolean; break;
        case 'enableZoom': this.props.enableZoom = JSON.parse(json) as boolean; break;
        case 'enableScroll': this.props.enableScroll = JSON.parse(json) as boolean; break;
        case 'showCompass': this.props.showCompass = JSON.parse(json) as boolean; break;
        case 'showScale': this.props.showScale = JSON.parse(json) as boolean; break;
        case 'enable3D': this.props.enable3D = JSON.parse(json) as boolean; break;
        case 'enablePoi': this.props.enablePoi = JSON.parse(json) as boolean; break;
        case 'enableBuilding': this.props.enableBuilding = JSON.parse(json) as boolean; break;
        case 'enableIndoorMap': this.props.enableIndoorMap = JSON.parse(json) as boolean; break;
        case 'enableOverlooking': this.props.enableOverlooking = JSON.parse(json) as boolean; break;
        case 'markers': {
          const models = (JSON.parse(json) as MarkerData[] | null) ?? [];
          this.replaceMarkers(models).catch((error: Error) => this.warn('markers', error)); return;
        }
        case 'polylines': this.props.polylines = (JSON.parse(json) as PolylineData[] | null) ?? []; this.applyPolylines(); return;
        case 'polygons': this.props.polygons = (JSON.parse(json) as PolygonData[] | null) ?? []; this.applyPolygons(); return;
        case 'circles': this.props.circles = (JSON.parse(json) as CircleData[] | null) ?? []; this.applyCircles(); return;
        case 'controls': this.props.controls = (JSON.parse(json) as ControlData[] | null) ?? []; this.applyControls(); return;
        case 'includePoints':
          this.props.includePoints = (JSON.parse(json) as Coordinate[] | null) ?? [];
          this.pendingInclude = this.props.includePoints.length > 0; this.includeAnimate = true;
          this.tryPendingInclude(); return;
        default: throw new Error('Unknown map property: ' + name);
      }
      this.applySettings();
      this.publish();
    } catch (error) { this.warn('set ' + name, error as Error); }
  }

  invoke(name: string, json: string, callback: NativeCallback): void {
    if (this.disposed || !this.privacyGranted || this.map == null) {
      callback(this.initializationError || (this.key.length === 0 ? 500013 : 500012), '{}'); return;
    }
    const id = ++this.requestSequence;
    this.requests.set(id, callback);
    this.execute(name, json, id).catch((error: Error) => {
      let code = 500012;
      if (error instanceof OperationError || error instanceof AmapImageError || error instanceof AmapLocationError) code = error.code;
      const result: ErrorResult = { errMsg: error.message };
      this.finishRequest(id, code, JSON.stringify(result));
    });
  }

  private async execute(name: string, json: string, request: number): Promise<void> {
    const map = this.map!;
    const generation = this.generation;
    switch (name) {
      case 'getCenterLocation': {
        const position = map.getCameraPosition();
        if (position == null) throw new OperationError(500001, 'Map camera is not ready');
        this.finishRequest(request, 0, JSON.stringify(this.coordinate(position.target))); return;
      }
      case 'getScale': {
        const position = map.getCameraPosition();
        if (position == null) throw new OperationError(500012, 'Map camera is not ready');
        const result: ScaleResult = { scale: position.zoom };
        this.finishRequest(request, 0, JSON.stringify(result)); return;
      }
      case 'getRegion': {
        const region = map.getProjection()?.getVisibleRegion();
        if (region == null) throw new OperationError(500012, 'Map projection is not ready');
        const result: Bounds = { southwest: this.coordinate(region.latLngBounds.southwest),
          northeast: this.coordinate(region.latLngBounds.northeast) };
        this.finishRequest(request, 0, JSON.stringify(result)); return;
      }
      case 'moveToLocation': {
        const option = JSON.parse(json) as MoveToData;
        let point: Coordinate;
        if (option.latitude != null && option.longitude != null) {
          point = { latitude: option.latitude, longitude: option.longitude };
        } else if (option.latitude != null || option.longitude != null) {
          throw new OperationError(500012, 'Both latitude and longitude are required');
        } else {
          if (this.location == null) throw new OperationError(500002, 'Location is unavailable');
          const located = await this.location.locate();
          point = { latitude: located.latitude, longitude: located.longitude };
        }
        if (!this.isCurrent(generation)) return;
        this.requireCoordinate(point);
        this.moveCamera(CameraUpdateFactory.newLatLng(this.latLng(point)), true); break;
      }
      case 'includePoints': {
        const option = JSON.parse(json) as IncludeData;
        this.include(option.points, true); break;
      }
      case 'addMarkers': {
        const option = JSON.parse(json) as AddMarkersData;
        this.validateMarkers(option.markers);
        if (option.clear === true) this.clearMarkers();
        await this.upsertMarkers(option.markers);
        if (!this.isCurrent(generation)) return;
        break;
      }
      case 'removeMarkers': {
        const option = JSON.parse(json) as RemoveMarkersData;
        for (let i = 0; i < option.markerIds.length; i++) this.removeMarker(option.markerIds[i]);
        this.publish(); break;
      }
      case 'addGroundOverlay':
      case 'updateGroundOverlay': {
        const option = JSON.parse(json) as GroundData;
        if (option.id == null || option.id.length === 0) throw new OperationError(500004, 'Ground overlay id is required');
        this.requireCoordinate(option.bounds.southwest); this.requireCoordinate(option.bounds.northeast);
        let record = this.grounds.get(option.id);
        if (record == null && name === 'updateGroundOverlay') throw new OperationError(500005, 'Ground overlay not found');
        if (record == null) { record = new GroundRecord(option); this.grounds.set(option.id, record); }
        else record.data = option;
        await this.loadGround(record);
        if (!this.isCurrent(generation)) return;
        break;
      }
      case 'removeGroundOverlay': {
        const option = JSON.parse(json) as RemoveGroundData;
        const record = this.grounds.get(option.id);
        if (record == null) throw new OperationError(500005, 'Ground overlay not found');
        record.revision++; this.grounds.delete(option.id); record.native?.remove(); break;
      }
      case 'translateMarker': {
        this.translate(JSON.parse(json) as TranslateData);
        break; // Existing contract: translateMarker acknowledges scheduling, not animation completion.
      }
      case 'moveAlong': {
        this.moveAlong(JSON.parse(json) as MoveAlongData);
        break; // Both marker animation methods acknowledge successful scheduling.
      }
      default: throw new OperationError(500012, 'Unknown map method: ' + name);
    }
    this.success(request, name);
  }

  private success(request: number, name: string): void {
    const result: SuccessResult = { errMsg: name + ':ok' };
    this.finishRequest(request, 0, JSON.stringify(result));
  }
  private finishRequest(request: number, code: number, result: string): void {
    const callback = this.requests.get(request);
    if (callback == null) return;
    this.requests.delete(request);
    this.deliver(callback, code, result);
  }

  private bindEvents(map: AMap, generation: number): void {
    map.setOnMapClickListener((point: LatLng): void => {
      if (!this.isCurrent(generation)) return;
      this.markers.forEach((record) => { record.selected = false; });
      this.send('tapNative', JSON.stringify(this.pointer(point)));
      this.publish();
    });
    map.setOnMarkerClickListener((marker: Marker): boolean => {
      if (!this.isCurrent(generation)) return true;
      const id = this.markerIds.get(marker.getId());
      if (id != null) this.clickMarker(id);
      return true;
    });
    map.setOnPOIClickListener({ onPOIClick: (poi: Poi): void => {
      if (!this.isCurrent(generation) || !this.props.enablePoi) return;
      const point = poi.getCoordinate();
      if (point == null) return;
      const payload = this.pointer(point); payload.name = poi.getName();
      this.send('poitap', JSON.stringify(payload));
    } });
    map.setOnMapTouchListener((event: TouchEvent): void => {
      if (!this.isCurrent(generation)) return;
      if (event.type === TouchType.Down) {
        this.touchActive = true;
        this.programmaticUntil = 0;
        this.touchZoom = map.getCameraPosition()?.zoom ?? this.props.scale;
      } else if (event.type === TouchType.Up || event.type === TouchType.Cancel) {
        this.touchActive = false;
        this.touchUntil = Date.now() + 400;
      }
    });
    map.setOnCameraChangeListener(new OnCameraChangeListener((position: CameraPosition): void => {
      if (!this.isCurrent(generation)) return;
      if (!this.regionActive) {
        this.regionActive = true;
        this.regionCause = this.cameraCause(position);
        this.region('begin', position);
      } else if (this.regionCause === 'drag' && Math.abs(position.zoom - this.touchZoom) > 0.0001) {
        this.regionCause = 'scale';
      }
      this.markers.forEach((record) => { if (record.heading != null || record.rotateAroundCenter) this.positionMarker(record); });
      this.publish();
    }, (position: CameraPosition): void => {
      if (!this.isCurrent(generation)) return;
      if (!this.regionActive) { this.regionCause = this.cameraCause(position); this.region('begin', position); }
      this.region('end', position); this.regionActive = false;
      this.programmaticUntil = 0;
      this.publish();
    }));
    map.setCustomRenderer(new CustomRenderer((): void => {
      if (!this.isCurrent(generation) || !this.initialOptionsApplied || this.updatedSent) return;
      this.updatedSent = true;
      this.scheduleUI((): void => {
        if (!this.isCurrent(generation)) return;
        this.emit('updated', '{}'); this.tryPendingInclude(); this.publish();
      });
    }));
    // Added in 11.2.1; used for operations that need a nonzero, ready viewport.
    map.setOnMapLoadedListener((_ready: AMap): void => {
      if (!this.isCurrent(generation)) return;
      this.scheduleUI((): void => { if (this.isCurrent(generation)) { this.tryPendingInclude(); this.publish(); } });
    });
    if (this.location != null) map.setLocationSource(this.location);
    const style = new MyLocationStyle();
    style.myLocationType(MyLocationStyle.LOCATION_TYPE_SHOW);
    map.setMyLocationStyle(style);
  }

  private cameraCause(position: CameraPosition): string {
    if (Date.now() <= this.programmaticUntil) return 'update';
    if (this.touchActive || Date.now() <= this.touchUntil) {
      return Math.abs(position.zoom - this.touchZoom) > 0.0001 ? 'scale' : 'drag';
    }
    return 'update';
  }
  private region(type: string, position: CameraPosition): void {
    const payload: RegionPayload = { type: type, causedBy: type === 'begin' ? null : this.regionCause, skew: position.tilt, rotate: position.bearing };
    this.send('regionchange', JSON.stringify(payload));
  }
  private applySettings(): void {
    const map = this.map;
    if (map == null) return;
    map.setMapType(this.mapType());
    const minimum = clamp(finite(this.props.minScale, 3), 3, 20);
    const maximum = clamp(finite(this.props.maxScale, 20), minimum, 20);
    map.setMinZoomLevel(minimum); map.setMaxZoomLevel(maximum);
    map.setTrafficEnabled(this.props.enableTraffic);
    map.showBuildings(this.props.enable3D || this.props.enableBuilding);
    map.showMapText(this.props.enablePoi); map.setTouchPoiEnable(this.props.enablePoi);
    map.showIndoorMap(this.props.enableIndoorMap);
    const ui = map.getUiSettings();
    ui?.setZoomControlsEnabled(false);
    ui?.setMyLocationButtonEnabled(false);
    ui?.setRotateGesturesEnabled(this.props.enableRotate);
    ui?.setZoomGesturesEnabled(this.props.enableZoom);
    ui?.setScrollGesturesEnabled(this.props.enableScroll);
    ui?.setTiltGesturesEnabled(this.props.enableOverlooking);
    ui?.setCompassEnabled(this.props.showCompass); ui?.setScaleControlsEnabled(this.props.showScale);
    ui?.setIndoorSwitchEnabled(this.props.enableIndoorMap);
    this.location?.setEnabled(this.props.showLocation);
    map.setMyLocationEnabled(this.props.showLocation);
  }
  private mapType(): MapType {
    if (this.props.enableSatellite || this.props.theme === 'satellite') return MapType.MAP_TYPE_SATELLITE;
    const layer = Number(this.props.layerStyle);
    if (layer >= 2 && layer <= 6 && Number.isInteger(layer)) return layer as MapType;
    switch (this.props.theme) {
      case 'night': return MapType.MAP_TYPE_NIGHT;
      case 'navi': return MapType.MAP_TYPE_NAVI;
      case 'bus': return MapType.MAP_TYPE_BUS;
      case 'naviNight': return MapType.MAP_TYPE_NAVI_NIGHT;
      default: return MapType.MAP_TYPE_NORMAL;
    }
  }
  private zoom(value: number): number {
    const minimum = clamp(finite(this.props.minScale, 3), 3, 20);
    return clamp(finite(value, 16), minimum, clamp(finite(this.props.maxScale, 20), minimum, 20));
  }
  private setCamera(animate: boolean): void {
    if (this.map == null) return;
    const position = new CameraPosition(new LatLng(this.props.latitude, this.props.longitude), this.zoom(this.props.scale),
      clamp(this.props.skew, 0, 80), normalizeAngle(this.props.rotate));
    this.moveCamera(CameraUpdateFactory.newCameraPosition(position), animate);
  }
  private moveCamera(update: CameraUpdate, animate: boolean): void {
    if (this.map == null) return;
    this.programmaticUntil = Date.now() + 1000;
    if (animate) this.map.animateCamera(update, undefined, 250); else this.map.moveCamera(update);
  }
  private include(points: Coordinate[], animate: boolean): void {
    if (points.length === 0) return;
    for (let i = 0; i < points.length; i++) this.requireCoordinate(points[i]);
    if (points.length === 1) { this.moveCamera(CameraUpdateFactory.newLatLng(this.latLng(points[0])), animate); return; }
    if (this.layoutWidth <= 0 || this.layoutHeight <= 0) throw new OperationError(500012, 'Map viewport has no size');
    const builder = LatLngBounds.builder();
    for (let i = 0; i < points.length; i++) builder.include(this.latLng(points[i]));
    const bounds = builder.build();
    if (bounds == null) throw new OperationError(500012, 'Cannot calculate map bounds');
    if (bounds.southwest.equals(bounds.northeast)) {
      this.moveCamera(CameraUpdateFactory.newLatLng(bounds.southwest), animate);
    } else {
      this.moveCamera(CameraUpdateFactory.newLatLngBounds(bounds, this.vp(40), this.vp(this.layoutWidth), this.vp(this.layoutHeight)), animate);
    }
  }
  private tryPendingInclude(): void {
    if (!this.pendingInclude || this.map == null || this.layoutWidth <= 0 || this.layoutHeight <= 0) return;
    try { this.include(this.props.includePoints, this.includeAnimate); this.pendingInclude = false; }
    catch (error) { this.warn('includePoints', error as Error); this.pendingInclude = false; }
  }

  private validateMarkers(models: MarkerData[]): void {
    for (let i = 0; i < models.length; i++) {
      this.requireCoordinate(models[i]);
      if (!Number.isInteger(models[i].id)) throw new OperationError(500012, 'Marker id must be an integer');
    }
  }
  private async replaceMarkers(models: MarkerData[]): Promise<void> {
    this.validateMarkers(models);
    const desired = new Set<number>();
    for (let i = 0; i < models.length; i++) desired.add(models[i].id);
    const removed: number[] = [];
    this.markers.forEach((_record, id) => { if (!desired.has(id)) removed.push(id); });
    for (let i = 0; i < removed.length; i++) this.removeMarker(removed[i]);
    await this.upsertMarkers(models);
    this.publish();
  }
  private async upsertMarkers(models: MarkerData[]): Promise<void> {
    const latest = new Map<number, MarkerData>();
    for (let i = 0; i < models.length; i++) latest.set(models[i].id, models[i]);
    const loads: Promise<void>[] = [];
    latest.forEach((model, id) => {
      let record = this.markers.get(id);
      if (record == null) { record = new MarkerRecord(model); this.markers.set(id, record); }
      else {
        record.animation?.cancel(); record.animation = undefined;
        record.heading = undefined; record.rotateAroundCenter = false; record.model = model;
      }
      record.rotation = finite(model.rotate ?? 0, 0);
      loads.push(this.loadMarker(record));
    });
    await Promise.all(loads);
  }
  private async loadMarker(record: MarkerRecord): Promise<void> {
    const revision = ++record.revision;
    const generation = this.generation;
    const map = this.map;
    const images = this.images;
    if (map == null || images == null) return;
    const model = record.model;
    let asset: ImageAsset | undefined;
    if (model.iconPath != null && model.iconPath.length > 0) asset = await images.load(model.iconPath, model.width ?? undefined, model.height ?? undefined);
    if (!this.isCurrent(generation) || this.markers.get(model.id) !== record || record.revision !== revision) {
      throw new OperationError(500012, 'Marker update was superseded');
    }
    record.width = asset?.width ?? model.width ?? 24;
    record.height = asset?.height ?? model.height ?? 34;
    const options = new MarkerOptions().setPosition(this.latLng(model)).setAnchor(clamp(model.anchor?.x ?? 0.5, 0, 1), clamp(model.anchor?.y ?? 1, 0, 1))
      .setAlpha(clamp(model.alpha ?? 1, 0, 1)).setRotateAngle(-normalizeAngle(record.rotation)).setInfoWindowEnable(false)
      .setTitle(model.title ?? '');
    if (asset != null) options.setIcon(asset.descriptor);
    if (record.native == null) {
      record.native = map.addMarker(options);
      if (record.native == null) throw new OperationError(500012, 'SDK could not create marker');
      this.markerIds.set(record.native.getId(), model.id);
    } else record.native.setMarkerOptions(options);
    this.positionMarker(record);
    this.publish();
  }
  private removeMarker(id: number): void {
    const record = this.markers.get(id);
    if (record == null) return;
    this.markers.delete(id); record.revision++;
    record.animation?.cancel(); record.animation = undefined;
    if (record.native != null) { this.markerIds.delete(record.native.getId()); record.native.remove(); }
  }
  private clearMarkers(): void {
    const ids: number[] = [];
    this.markers.forEach((_record, id) => ids.push(id));
    for (let i = 0; i < ids.length; i++) this.removeMarker(ids[i]);
    this.publish();
  }
  clickMarker(id: number): void {
    const record = this.markers.get(id);
    if (record == null || record.native == null || this.disposed) return;
    this.markers.forEach((item) => { item.selected = item === record; });
    const payload = this.pointer(this.latLng(record.model)); payload.markerId = id;
    this.send('markertap', JSON.stringify(payload)); this.publish();
  }
  clickCallout(id: number): void {
    if (!this.markers.has(id)) return;
    const payload: MarkerPayload = { markerId: id }; this.send('callouttap', JSON.stringify(payload));
  }
  clickControl(id: number): void {
    const payload: ControlPayload = { controlId: id }; this.send('controltap', JSON.stringify(payload));
  }
  clickLocation(): void {
    if (!this.props.showLocation || this.lastLocation == null) return;
    this.send('anchorpointtap', JSON.stringify(this.pointer(new LatLng(this.lastLocation.latitude, this.lastLocation.longitude))));
  }

  private positionMarker(record: MarkerRecord): void {
    const marker = record.native;
    if (marker == null) return;
    const mapBearing = this.map?.getCameraPosition()?.bearing ?? 0;
    const rotation = record.heading == null ? record.rotation : record.heading + record.headingOffset - mapBearing;
    marker.setRotateAngle(-normalizeAngle(rotation));
    let position = this.latLng(record.model);
    const projection = this.map?.getProjection();
    if (record.rotateAroundCenter && projection != null) {
      const point = projection.toScreenLocationSync(position);
      const vx = this.vp(((record.model.anchor?.x ?? 0.5) - 0.5) * record.width);
      const vy = this.vp(((record.model.anchor?.y ?? 1) - 0.5) * record.height);
      const theta = rotation * Math.PI / 180;
      position = projection.fromScreenLocationSync(new Point(point.x - vx + vx * Math.cos(theta) - vy * Math.sin(theta),
        point.y - vy + vx * Math.sin(theta) + vy * Math.cos(theta)));
    }
    marker.setPosition(position);
  }
  private translate(option: TranslateData): void {
    const record = this.markers.get(option.markerId);
    if (record == null || record.native == null) throw new OperationError(500003, 'Marker not found');
    this.requireCoordinate(option.destination);
    record.animation?.cancel(); record.heading = undefined; record.rotateAroundCenter = true;
    const generation = this.generation;
    const start: Coordinate = { latitude: record.model.latitude, longitude: record.model.longitude };
    const initial = record.rotation;
    const initialMapBearing = this.map?.getCameraPosition()?.bearing ?? 0;
    const followHeading = option.autoRotate === true && distanceMeters(start, option.destination) > 0.000001;
    const target = option.autoRotate === true ?
      (followHeading ? bearing(start, option.destination) - initialMapBearing : initial) : option.rotate;
    const endRotation = target == null ? initial : target;
    const split = target != null && option.moveWithRotate !== true;
    const duration = Math.max(0, finite(option.duration ?? 1000, 1000));
    const animation = new MarkerAnimation(duration, (progress: number): void => {
      if (!this.isCurrent(generation) || this.markers.get(option.markerId) !== record) return;
      const moveProgress = split ? clamp((progress - 0.3) / 0.7, 0, 1) : progress;
      const rotateProgress = split ? clamp(progress / 0.3, 0, 1) : progress;
      const point = interpolateCoordinate(start, option.destination, moveProgress);
      record.model.latitude = point.latitude; record.model.longitude = point.longitude;
      const rotation = initial + angleDelta(initial, endRotation) * rotateProgress;
      if (followHeading) {
        record.heading = rotation + initialMapBearing;
        record.headingOffset = 0;
        record.rotation = record.heading - (this.map?.getCameraPosition()?.bearing ?? 0);
      } else record.rotation = rotation;
      record.model.rotate = normalizeAngle(record.rotation);
      this.positionMarker(record); this.publish();
    }, (_completed: boolean): void => {
      if (record.animation === animation) record.animation = undefined;
      record.rotation = record.model.rotate ?? record.rotation;
    });
    record.animation = animation; animation.start(this.visible);
  }
  private moveAlong(option: MoveAlongData): void {
    const record = this.markers.get(option.markerId);
    if (record == null || record.native == null) throw new OperationError(500003, 'Marker not found');
    if (option.path.length === 0) return;
    const path = new DistancePath(option.path);
    record.animation?.cancel(); record.rotateAroundCenter = true;
    const generation = this.generation;
    record.headingOffset = record.rotation;
    const animation = new MarkerAnimation(Math.max(0, finite(option.duration ?? 1000, 1000)), (progress: number): void => {
      if (!this.isCurrent(generation) || this.markers.get(option.markerId) !== record) return;
      const sample = path.sample(progress);
      record.model.latitude = sample.point.latitude; record.model.longitude = sample.point.longitude;
      record.heading = sample.direction;
      record.model.rotate = normalizeAngle(sample.direction + record.headingOffset - (this.map?.getCameraPosition()?.bearing ?? 0));
      this.positionMarker(record); this.publish();
    }, (_completed: boolean): void => {
      if (record.animation === animation) record.animation = undefined;
      record.rotation = record.model.rotate ?? record.rotation;
    });
    record.animation = animation; animation.start(this.visible);
  }

  private applyPolylines(): void {
    const revision = ++this.geometryRevision;
    const generation = this.generation;
    const map = this.map;
    const images = this.images;
    if (map == null || images == null) return;
    this.buildPolylines(this.props.polylines, map, images, generation, revision).catch((error: Error) => this.warn('polylines', error));
  }
  private async buildPolylines(models: PolylineData[], map: AMap, images: AmapImageStore,
    generation: number, revision: number): Promise<void> {
    const created: string[] = [];
    try {
      for (let i = 0; i < models.length; i++) {
        const model = models[i];
        if (model.points.length < 2) continue;
        for (let j = 0; j < model.points.length; j++) this.requireCoordinate(model.points[j]);
        let arrow: ImageAsset | undefined;
        if (model.arrowLine === true) arrow = await images.loadArrow(model.arrowIconPath ?? null);
        if (!this.isCurrent(generation)) return; // onDestroy owns the old native overlays.
        if (revision !== this.geometryRevision) { this.removeIds(map, created); return; }
        const width = Math.max(0, finite(model.width ?? 1, 1));
        const borderWidth = Math.max(0, finite(model.borderWidth ?? 0, 0));
        if (borderWidth > 0) {
          const border = this.lineOptions(model).setColor(colorARGB(model.borderColor, 0xFF000000))
            .setWidth(this.vp(width + borderWidth * 2)).setZIndex(i * 3);
          const native = map.addPolyline(border);
          if (native == null) throw new OperationError(500012, 'SDK could not create polyline border');
          created.push(native.getId());
        }
        const options = this.lineOptions(model).setColor(colorARGB(model.color, 0xFF000000)).setWidth(this.vp(width)).setZIndex(i * 3 + 1);
        if (model.colorList != null && model.colorList.length > 0) {
          const colors = new Int32Array(model.colorList.length);
          for (let j = 0; j < model.colorList.length; j++) colors[j] = colorARGB(model.colorList[j], 0xFF000000);
          options.setColorValues(colors); options.setGradient(false);
        }
        const line = map.addPolyline(options);
        if (line == null) throw new OperationError(500012, 'SDK could not create polyline');
        created.push(line.getId());
        if (arrow != null) {
          const arrows = this.lineOptions(model).setCustomTexture(arrow.descriptor).setWidth(this.vp(width)).setZIndex(i * 3 + 2);
          const overlay = map.addPolyline(arrows);
          if (overlay == null) throw new OperationError(500012, 'SDK could not create arrow line');
          created.push(overlay.getId());
        }
      }
      if (!this.isCurrent(generation)) return;
      if (revision !== this.geometryRevision) { this.removeIds(map, created); return; }
      this.removeIds(map, this.polylineIds); this.polylineIds = created;
    } catch (error) { if (this.isCurrent(generation)) this.removeIds(map, created); throw error as Error; }
  }
  private lineOptions(model: PolylineData): PolylineOptions {
    const options = new PolylineOptions().setDottedLine(model.dottedLine ?? false);
    for (let i = 0; i < model.points.length; i++) options.add(this.latLng(model.points[i]));
    return options;
  }
  private applyPolygons(): void {
    const map = this.map;
    if (map == null) return;
    const created: string[] = [];
    try {
      for (let i = 0; i < this.props.polygons.length; i++) {
        const model = this.props.polygons[i];
        if (model.points.length < 3) continue;
        const options = new PolygonOptions().setStrokeWidth(this.vp(Math.max(0, model.strokeWidth ?? 1)))
          .setStrokeColor(colorARGB(model.strokeColor, 0xFF000000)).setFillColor(colorARGB(model.fillColor, 0x00000000))
          .setZIndex(model.zIndex ?? 0);
        for (let j = 0; j < model.points.length; j++) { this.requireCoordinate(model.points[j]); options.add(this.latLng(model.points[j])); }
        const polygon = map.addPolygon(options);
        if (polygon == null) throw new OperationError(500012, 'SDK could not create polygon');
        created.push(polygon.getId());
      }
      this.removeIds(map, this.polygonIds); this.polygonIds = created;
    } catch (error) { this.removeIds(map, created); this.warn('polygons', error as Error); }
  }
  private applyCircles(): void {
    const map = this.map;
    if (map == null) return;
    const created: string[] = [];
    try {
      for (let i = 0; i < this.props.circles.length; i++) {
        const model = this.props.circles[i]; this.requireCoordinate(model);
        if (!Number.isFinite(model.radius) || model.radius < 0) throw new Error('Invalid circle radius');
        const options = new CircleOptions().setCenter(this.latLng(model)).setRadius(model.radius)
          .setStrokeWidth(this.vp(Math.max(0, model.strokeWidth ?? 1)))
          .setStrokeColor(colorARGB(model.color, 0xFF000000)).setFillColor(colorARGB(model.fillColor, 0x00000000));
        const circle = map.addCircle(options);
        if (circle == null) throw new OperationError(500012, 'SDK could not create circle');
        created.push(circle.getId());
      }
      this.removeIds(map, this.circleIds); this.circleIds = created;
    } catch (error) { this.removeIds(map, created); this.warn('circles', error as Error); }
  }
  private async loadGround(record: GroundRecord): Promise<void> {
    const map = this.map; const images = this.images;
    if (map == null || images == null) throw new OperationError(500012, 'Map is not ready');
    const generation = this.generation; const revision = ++record.revision; const data = record.data;
    let candidate: GroundOverlay | undefined;
    try {
      const asset = await images.load(data.src);
      if (!this.isCurrent(generation) || this.grounds.get(data.id) !== record || record.revision !== revision) {
        throw new OperationError(500012, 'Ground overlay update was superseded');
      }
      const bounds = new LatLngBounds(this.latLng(data.bounds.southwest), this.latLng(data.bounds.northeast));
      const opacity = clamp(finite(data.opacity ?? 1, 1), 0, 1);
      const options = new GroundOverlayOptions().image(asset.descriptor).positionFromBounds(bounds)
        .visible(data.visible ?? true).setZIndex(data.zIndex ?? 0).setTransparency(1 - opacity);
      candidate = map.addGroundOverlay(options);
      if (candidate == null) throw new OperationError(500004, 'SDK could not create ground overlay');
      // Build the complete replacement first. A failed image / creation leaves
      // the previously committed native overlay and its recovery model intact.
      record.native?.remove();
      record.native = candidate;
      record.committedData = data;
      candidate = undefined;
    } catch (error) {
      if (this.isCurrent(generation)) {
        if (candidate != null) this.cleanup('rollback ground overlay', (): void => { candidate?.remove(); });
        if (this.grounds.get(data.id) === record && record.revision === revision) {
          if (record.committedData == null) this.grounds.delete(data.id);
          else record.data = record.committedData;
        }
      }
      throw error as Error;
    }
  }
  private applyControls(): void {
    const revision = ++this.controlRevision;
    const generation = this.generation;
    const images = this.images;
    if (images == null) return;
    const jobs: Promise<ControlOverlay>[] = [];
    for (let i = 0; i < this.props.controls.length; i++) jobs.push(this.loadControl(this.props.controls[i], i, images));
    Promise.all(jobs).then((controls: ControlOverlay[]): void => {
      if (!this.isCurrent(generation) || revision !== this.controlRevision) return;
      this.controls = controls; this.publish();
    }).catch((error: Error): void => this.warn('controls', error));
  }
  private async loadControl(data: ControlData, index: number, images: AmapImageStore): Promise<ControlOverlay> {
    const asset = await images.load(data.iconPath, data.position.width ?? undefined, data.position.height ?? undefined);
    const overlay = new ControlOverlay();
    overlay.key = 'control-' + index.toString(); overlay.id = data.id ?? index;
    overlay.x = data.position.left ?? 0; overlay.y = data.position.top ?? 0;
    overlay.width = data.position.width ?? asset.width; overlay.height = data.position.height ?? asset.height;
    overlay.image = asset.pixelMap; overlay.clickable = data.clickable ?? false;
    return overlay;
  }

  private viewState(): AmapViewState {
    const state = new AmapViewState();
    state.mountMap = this.initialized && this.privacyGranted && !this.disposed;
    state.mapName = this.mapName;
    if (!state.mountMap) return state;
    state.controls = this.controls.slice();
    const projection = this.map?.getProjection();
    if (projection == null) return state;
    this.markers.forEach((record, id): void => {
      if (record.native == null) return;
      const point = projection.toScreenLocationSync(this.latLng(record.model));
      const x = this.px(point.x); const y = this.px(point.y);
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      // Leave a margin so a bubble anchored just outside the viewport can remain visible.
      if (x < -200 || y < -200 || x > this.layoutWidth + 200 || y > this.layoutHeight + 200) return;
      const model = record.model;
      const label = model.label;
      if (label != null && label.content.length > 0) {
        const overlay = new TextOverlay(); overlay.key = 'label-' + id.toString(); overlay.markerId = id;
        overlay.content = label.content; overlay.x = x + (label.x ?? 0); overlay.y = y + (label.y ?? 0);
        overlay.color = uiColor(label.color, '#000000'); overlay.fontSize = label.fontSize ?? 14;
        overlay.bgColor = uiColor(label.bgColor, '#00FFFFFF'); overlay.borderColor = uiColor(label.borderColor, '#000000');
        overlay.borderWidth = label.borderWidth ?? 0; overlay.borderRadius = label.borderRadius ?? 0;
        overlay.padding = label.padding ?? 0; overlay.textAlign = label.textAlign ?? 'center';
        state.overlays.push(overlay);
      }
      const callout = model.callout;
      const content = callout?.content ?? model.title ?? '';
      if (content.length > 0 && (record.selected || callout?.display === 'ALWAYS')) {
        const overlay = new TextOverlay(); overlay.key = 'callout-' + id.toString(); overlay.markerId = id;
        overlay.callout = true; overlay.content = content; overlay.x = x;
        overlay.y = y - record.height * (model.anchor?.y ?? 1) - 4;
        overlay.color = uiColor(callout?.color, '#000000'); overlay.fontSize = callout?.fontSize ?? 14;
        overlay.bgColor = uiColor(callout?.bgColor, '#FFFFFF'); overlay.borderColor = uiColor(callout?.borderColor, '#000000');
        overlay.borderWidth = callout?.borderWidth ?? 0; overlay.borderRadius = callout?.borderRadius ?? 5;
        overlay.padding = callout?.padding ?? 6; overlay.textAlign = callout?.textAlign ?? 'center';
        state.overlays.push(overlay);
      }
      if (model.ariaLabel != null && model.ariaLabel.length > 0) {
        const accessible = new AccessibleMarker(); accessible.key = 'aria-' + id.toString(); accessible.id = id;
        accessible.text = model.ariaLabel; accessible.x = x - record.width * (model.anchor?.x ?? 0.5);
        accessible.y = y - record.height * (model.anchor?.y ?? 1); accessible.width = record.width; accessible.height = record.height;
        state.accessibleMarkers.push(accessible);
      }
    });
    if (this.props.showLocation && this.lastLocation != null) {
      const point = projection.toScreenLocationSync(new LatLng(this.lastLocation.latitude, this.lastLocation.longitude));
      state.locationX = this.px(point.x); state.locationY = this.px(point.y);
      state.locationVisible = Number.isFinite(point.x) && Number.isFinite(point.y);
    }
    return state;
  }
  private publish(): void {
    if (this.publishPending) return;
    this.publishPending = true;
    this.scheduleUI((): void => {
      this.publishPending = false;
      if (this.listeners.size === 0) return;
      try {
        const state = this.viewState();
        this.listeners.forEach((listener) => listener(state));
      } catch (error) { this.warn('overlay projection', error as Error); }
    });
  }
  private pointer(point: LatLng): PointerPayload {
    const projected = this.map?.getProjection()?.toScreenLocationSync(point);
    const x = projected == null ? 0 : this.px(projected.x);
    const y = projected == null ? 0 : this.px(projected.y);
    return { x: x, y: y, screenX: this.screenLeft + x, screenY: this.screenTop + y,
      latitude: point.latitude, longitude: point.longitude };
  }
  private send(type: string, payload: string): void {
    const generation = this.generation;
    this.scheduleUI((): void => { if (this.isCurrent(generation)) this.emit(type, payload); });
  }
  private vp(value: number): number { return this.uiContext?.vp2px(value) ?? value; }
  private px(value: number): number { return this.uiContext?.px2vp(value) ?? value; }
  private coordinate(point: LatLng): Coordinate { return { latitude: point.latitude, longitude: point.longitude }; }
  private latLng(point: Coordinate): LatLng { return new LatLng(point.latitude, point.longitude); }
  private requireCoordinate(point: Coordinate): void {
    if (!validCoordinate(point)) throw new OperationError(500012, 'Invalid map coordinate');
  }
  private isCurrent(generation: number): boolean {
    return !this.disposed && this.privacyGranted && this.initialized && generation === this.generation;
  }
  private removeIds(map: AMap, ids: string[]): void {
    for (let i = 0; i < ids.length; i++) map.removeOverlay(ids[i]);
  }
  private warn(operation: string, error: Error): void {
    console.warn('[uni-map-amap] ' + operation + ': ' + error.message);
  }
  private deliver(callback: NativeCallback, code: number, json: string): void {
    // Consumer exceptions are not native operation failures. The UTS facade
    // already runs complete in a finally block; report the exception on the UI task.
    try { callback(code, json); }
    catch (error) { this.scheduleUI((): void => { throw error as Error; }); }
  }
  private cleanup(name: string, action: () => void): void {
    try { action(); } catch (error) { this.warn(name, error as Error); }
  }
  private releaseNative(): void {
    this.generation++; this.initialized = false; this.geometryRevision++; this.controlRevision++;
    this.publishPending = false; this.updatedSent = false; this.initialOptionsApplied = false;
    if (this.mapName.length > 0) mapRoutes.delete(this.mapName);
    if (routerRegistered && mapRoutes.size === 0) {
      this.cleanup('unregister map callback', (): void => {
        MapViewManager.getInstance().unregisterMapViewCreatedCallback(createdRouter);
      });
      routerRegistered = false;
    }
    const location = this.location;
    this.location = undefined; this.lastLocation = undefined;
    this.cleanup('dispose location', (): void => { location?.dispose(); });
    this.markers.forEach((record): void => {
      record.revision++;
      this.cleanup('cancel marker animation', (): void => { record.animation?.cancel(); });
      record.animation = undefined;
      record.native = undefined;
    });
    const uncommittedGrounds: string[] = [];
    this.grounds.forEach((record, id): void => {
      record.revision++; record.native = undefined;
      if (record.committedData == null) uncommittedGrounds.push(id);
      else record.data = record.committedData;
    });
    for (let i = 0; i < uncommittedGrounds.length; i++) this.grounds.delete(uncommittedGrounds[i]);
    this.markerIds.clear(); this.polylineIds = []; this.polygonIds = []; this.circleIds = []; this.controls = [];
    this.map = undefined;
    const view = this.mapView; this.mapView = undefined;
    this.cleanup('destroy map view', (): void => { view?.onDestroy(); });
    const images = this.images; this.images = undefined;
    this.cleanup('dispose images', (): void => { images?.dispose(); });
    this.regionActive = false; this.touchActive = false;
    const pending: NativeCallback[] = [];
    this.requests.forEach((callback) => pending.push(callback)); this.requests.clear();
    for (let i = 0; i < pending.length; i++) this.deliver(pending[i], 500012, '{"errMsg":"Map was disposed"}');
  }
  destroy(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.releaseNative();
    this.markers.clear(); this.grounds.clear();
    this.listeners.forEach((listener) => this.cleanup('clear native view', (): void => listener(new AmapViewState())));
    this.listeners.clear();
  }
}
