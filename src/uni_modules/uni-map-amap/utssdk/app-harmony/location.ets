import { abilityAccessCtrl, common, Permissions } from '@kit.AbilityKit';
import { geoLocationManager } from '@kit.LocationKit';
import { LocationSource, OnLocationChangedListener } from '@amap/amap_lbs_map3d';
import {
  AMapLocation, AMapLocationErrorInfo, AMapLocationManagerImpl,
  AMapLocationOption, AMapLocationType, IAMapLocationListener
} from '@amap/amap_lbs_location';

export class AmapLocationError extends Error {
  code: number = 500002;

  constructor(message: string) {
    super(message);
    this.name = 'AmapLocationError';
  }
}

class LocationWaiter {
  resolve: (location: geoLocationManager.Location) => void;
  reject: (error: AmapLocationError) => void;
  timer: number = -1;
  done: boolean = false;

  constructor(resolve: (location: geoLocationManager.Location) => void,
    reject: (error: AmapLocationError) => void) {
    this.resolve = resolve;
    this.reject = reject;
  }
}

/** Construct only after the host has supplied real AMap privacy consent. */
export class AmapLocationSource implements LocationSource {
  private context: common.UIAbilityContext;
  private manager: AMapLocationManagerImpl;
  private onLocation: (location: geoLocationManager.Location) => void;
  private mapListener: OnLocationChangedListener | null = null;
  private lastLocation: geoLocationManager.Location | null = null;
  private waiters: LocationWaiter[] = [];
  private enabled: boolean = false;
  private visible: boolean = true;
  private disposed: boolean = false;
  private running: boolean = false;
  private starting: boolean = false;
  private generation: number = 0;
  private permissionRequest: Promise<void> | null = null;
  private permissionDenied: boolean = false;
  private allowPermissionPrompt: boolean = true;

  constructor(context: common.UIAbilityContext,
    onLocation: (location: geoLocationManager.Location) => void) {
    this.context = context;
    this.onLocation = onLocation;
    // Foreground-only is an instance option. Do not change the SDK's global
    // task switch, which may also be used by another plugin in the host app.
    this.manager = new AMapLocationManagerImpl(context);
    const option: AMapLocationOption = {
      priority: geoLocationManager.LocationRequestPriority.FIRST_FIX,
      scenario: geoLocationManager.LocationRequestScenario.UNSET,
      timeInterval: 2,
      distanceInterval: 0,
      maxAccuracy: 0,
      isOffset: true,
      allowsBackgroundLocationUpdates: false,
      singleLocationTimeout: 10000,
      locatingWithReGeocode: false
    };
    this.manager.setLocationOption(AMapLocationType.Updating, option);
    const listener: IAMapLocationListener = {
      onLocationChanged: (location: AMapLocation) => this.receive(location),
      onLocationError: (error: AMapLocationErrorInfo) => this.handleError(error.errorMsg)
    };
    this.manager.setLocationListener(AMapLocationType.Updating, listener);
  }

  activate(listener: OnLocationChangedListener): void {
    if (this.disposed) return;
    this.mapListener = listener;
    this.reconcile();
  }

  deactivate(): void {
    this.mapListener = null;
    this.reconcile();
  }

  setEnabled(enabled: boolean): void {
    if (this.disposed) return;
    const changed = enabled !== this.enabled;
    this.enabled = enabled;
    if (changed && enabled) {
      this.permissionDenied = false;
      this.allowPermissionPrompt = true;
    }
    this.reconcile();
  }

  setVisible(visible: boolean): void {
    if (this.disposed || this.visible === visible) return;
    this.visible = visible;
    this.generation++;
    if (!visible) {
      this.rejectWaiters('Map is not in the foreground');
      this.stop();
    } else {
      // The user may have granted permission or enabled location in Settings.
      // Resume checks are silent; only enabling location or locate() can open
      // a permission dialog, avoiding a deny -> foreground -> dialog loop.
      this.permissionDenied = false;
      this.allowPermissionPrompt = false;
      this.reconcile();
    }
  }

  locate(): Promise<geoLocationManager.Location> {
    if (this.disposed) return Promise.reject(new AmapLocationError('Map location source is disposed'));
    if (!this.visible) return Promise.reject(new AmapLocationError('Map is not in the foreground'));
    this.permissionDenied = false;
    this.allowPermissionPrompt = true;
    return new Promise<geoLocationManager.Location>((resolve, reject) => {
      const waiter = new LocationWaiter(resolve, reject);
      waiter.timer = setTimeout(() => {
        this.rejectWaiter(waiter, 'Location request timed out');
        this.reconcile();
      }, 10000);
      this.waiters.push(waiter);
      this.ensurePermission().then(() => {
        if (waiter.done || this.disposed || !this.visible) return;
        this.permissionDenied = false;
        // Only use this instance's cache, after rechecking current permission.
        if (this.lastLocation !== null) {
          this.resolveWaiter(waiter, this.lastLocation);
        }
        this.reconcile();
      }).catch((error: Error) => {
        if (waiter.done || this.disposed || !this.visible) return;
        this.permissionDenied = true;
        this.lastLocation = null;
        this.rejectWaiter(waiter, error.message);
        this.stop();
      });
    });
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.generation++;
    this.rejectWaiters('Map was destroyed while locating');
    this.stop();
    try {
      this.manager.unRegisterLocationListener(AMapLocationType.Updating);
    } catch (_) {
      // Destruction still needs to run if the native listener is already gone.
    }
    try {
      this.manager.onDestroy();
    } catch (_) {
      // Permission revocation must not interrupt the owner's remaining cleanup.
    }
    this.mapListener = null;
    this.lastLocation = null;
  }

  private shouldRun(): boolean {
    return !this.disposed && this.visible && !this.permissionDenied &&
      ((this.enabled && this.mapListener !== null) || this.waiters.length > 0);
  }

  private reconcile(): void {
    if (!this.shouldRun()) {
      this.stop();
      return;
    }
    if (this.running || this.starting) return;
    this.starting = true;
    const generation = this.generation;
    this.ensurePermission(this.allowPermissionPrompt).then(() => {
      if (generation !== this.generation || !this.shouldRun()) return;
      if (!geoLocationManager.isLocationEnabled()) {
        throw new AmapLocationError('System location service is disabled');
      }
      this.running = true;
      try {
        this.manager.startUpdatingLocation();
      } catch (error) {
        this.running = false;
        throw new AmapLocationError((error as Error).message);
      }
    }).catch((error: Error) => {
      if (generation !== this.generation || this.disposed) return;
      this.permissionDenied = true;
      this.lastLocation = null;
      this.handleError(error.message);
    }).finally(() => {
      this.starting = false;
      // A visibility transition may have invalidated a pending permission UI.
      if (generation !== this.generation && this.shouldRun()) this.reconcile();
    });
  }

  private ensurePermission(allowPrompt: boolean = true): Promise<void> {
    if (this.permissionRequest !== null) return this.permissionRequest;
    // A silent foreground check must not suppress a concurrent explicit request.
    if (!allowPrompt) return this.requestPermission(false);
    const request = this.requestPermission(true);
    this.permissionRequest = request;
    request.then(() => {
      this.permissionRequest = null;
    }).catch(() => {
      this.permissionRequest = null;
    });
    return request;
  }

  private async requestPermission(allowPrompt: boolean): Promise<void> {
    const manager = abilityAccessCtrl.createAtManager();
    const tokenId = this.context.applicationInfo.accessTokenId;
    const approximate: Permissions = 'ohos.permission.APPROXIMATELY_LOCATION';
    const precise: Permissions = 'ohos.permission.LOCATION';
    const granted = await manager.checkAccessToken(tokenId, approximate);
    if (granted === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) return;
    if (!allowPrompt) throw new AmapLocationError('Location permission is not granted');
    const result = await manager.requestPermissionsFromUser(this.context, [approximate, precise]);
    if (result.authResults.length === 0 || result.authResults[0] !== abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
      throw new AmapLocationError('Location permission was denied');
    }
  }

  private stop(): void {
    if (!this.running) return;
    this.running = false;
    try {
      this.manager.stopUpdatingLocation();
    } catch (_) {
      // A revoked permission or already stopped native service is harmless.
    }
  }

  private receive(value: AMapLocation): void {
    if (!this.running || !this.shouldRun()) return;
    if ((value.errorCode !== undefined && value.errorCode !== 0) ||
      !Number.isFinite(value.latitude) || !Number.isFinite(value.longitude) ||
      Math.abs(value.latitude) > 90 || Math.abs(value.longitude) > 180) {
      this.handleError(value.errorInfo ?? 'Invalid location result');
      return;
    }
    const location: geoLocationManager.Location = {
      latitude: value.latitude,
      longitude: value.longitude,
      altitude: value.altitude,
      accuracy: value.accuracy,
      speed: value.speed,
      timeStamp: value.timeStamp,
      direction: value.direction,
      timeSinceBoot: value.timeSinceBoot,
      additions: value.additions,
      additionSize: value.additionSize
    };
    this.lastLocation = location;
    const pending = this.waiters.slice();
    pending.forEach((waiter: LocationWaiter) => this.resolveWaiter(waiter, location));
    this.reconcile();
    // Settle requests before notifying observers so an observer exception or
    // synchronous unmount cannot strand an already successful request.
    if (this.enabled) this.mapListener?.onLocationChanged(location);
    this.onLocation(location);
  }

  private handleError(message: string): void {
    if (this.disposed) return;
    this.rejectWaiters(message.length > 0 ? message : 'Location failed');
    this.stop();
  }

  private resolveWaiter(waiter: LocationWaiter, location: geoLocationManager.Location): void {
    if (waiter.done) return;
    waiter.done = true;
    clearTimeout(waiter.timer);
    this.removeWaiter(waiter);
    waiter.resolve(location);
  }

  private rejectWaiter(waiter: LocationWaiter, message: string): void {
    if (waiter.done) return;
    waiter.done = true;
    clearTimeout(waiter.timer);
    this.removeWaiter(waiter);
    waiter.reject(new AmapLocationError(message));
  }

  private rejectWaiters(message: string): void {
    const pending = this.waiters.slice();
    pending.forEach((waiter: LocationWaiter) => this.rejectWaiter(waiter, message));
  }

  private removeWaiter(waiter: LocationWaiter): void {
    const index = this.waiters.indexOf(waiter);
    if (index >= 0) this.waiters.splice(index, 1);
  }
}
