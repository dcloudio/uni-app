import { common, wantAgent } from '@kit.AbilityKit';
import { geoLocationManager } from '@kit.LocationKit';
import { backgroundTaskManager } from '@kit.BackgroundTasksKit';
import { deviceInfo } from '@kit.BasicServicesKit';
import {
  AMapLocation, AMapLocationErrorCode, AMapLocationErrorInfo, AMapLocationManagerImpl, AMapLocationMoreType,
  AMapLocationOption, AMapLocationType, IAMapLocationListener
} from '@amap/amap_lbs_location';
import { AmapLocationEnvironment, AmapLocationFailure } from './AmapLocationEnvironment';

export class AmapFix {
  latitude: number;
  longitude: number;
  speed: number;
  accuracy: number;
  altitude: number;
  verticalAccuracy: number;
  horizontalAccuracy: number;
  address: string | null;

  constructor(location: AMapLocation, geocode: boolean, altitude: boolean) {
    // AMapLocation.errorCode (11.2.1) is the fix's Android-compatible status.
    // onLocationError uses Harmony's *different* AMapLocationErrorCode values.
    const status = location.errorCode ?? 0;
    if (status !== 0) {
      let code = 1505602;
      if (status === AMapLocationMoreType.ERROR_CODE_FAILURE_AUTH) code = 1505605;
      else if (status === AMapLocationMoreType.ERROR_CODE_FAILURE_LOCATION_PERMISSION) code = 1505004;
      else if (status === AMapLocationMoreType.ERROR_CODE_FAILURE_COARSE_LOCATION) code = 1505800;
      throw new AmapLocationFailure(code, location.errorInfo ?? 'Invalid location result');
    }
    if (!Number.isFinite(location.latitude) || Math.abs(location.latitude) > 90 ||
      !Number.isFinite(location.longitude) || Math.abs(location.longitude) > 180) {
      throw new AmapLocationFailure(1505602, 'Invalid coordinates in location result');
    }
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.speed = Number.isFinite(location.speed) ? location.speed : 0;
    this.accuracy = Number.isFinite(location.accuracy) ? location.accuracy : 0;
    this.altitude = altitude && Number.isFinite(location.altitude) ? location.altitude : 0;
    this.verticalAccuracy = Number.isFinite(location.verticalAccuracyMeters ?? 0) ? (location.verticalAccuracyMeters ?? 0) : 0;
    this.horizontalAccuracy = this.accuracy;
    this.address = geocode ? (location.reGeo?.address || location.address || null) : null;
    if (geocode && !this.address?.trim()) throw new AmapLocationFailure(1505603, 'AMap returned no address');
  }
}

function failure(error: Error): AmapLocationFailure {
  return error instanceof AmapLocationFailure ? error : new AmapLocationFailure(1505602, error.message);
}

function sdkFailure(error: AMapLocationErrorInfo): AmapLocationFailure {
  const message = [error.errorMsg, error.locationDetail ?? ''].join(' ').trim();
  let code = 1505602;
  if (/INVALID_USER_KEY|USERKEY_PLAT_NOMATCH|INVALID_USER_SIGNATURE/i.test(message)) {
    code = 1505605;
  } else if (error.errorCode === AMapLocationMoreType.ERROR_CODE_FAILURE_LOCATION_PERMISSION ||
    error.errorCode === AMapLocationErrorCode.ERROR_CHECK_PERMINSSION ||
    error.errorCode === AMapLocationErrorCode.ERROR_CHECK_PRIVACY) {
    code = 1505004;
  } else if (error.errorCode === AMapLocationErrorCode.ERROR_LOCATION_SERVICE_CLOSE) {
    code = 1505003;
  } else if (error.errorCode === AMapLocationErrorCode.ERROR_REQUEST_REGEO_FAIL) {
    code = 1505603;
  } else if (/timeout|timed out|超时/i.test(message)) {
    code = 1505600;
  }
  return new AmapLocationFailure(code, message);
}

function release(manager: AMapLocationManagerImpl, type: AMapLocationType): void {
  // Each release step must still run if a permission was revoked mid-session.
  try { manager.unRegisterLocationListener(type); } catch (_) {}
  if (type === AMapLocationType.Updating) {
    try { manager.stopUpdatingLocation(); } catch (_) {}
  }
  try { manager.onDestroy(); } catch (_) {}
}

class SingleRequest {
  manager: AMapLocationManagerImpl | null = null;
  timer: number = -1;
  resolve: (fix: AmapFix) => void;
  reject: (error: AmapLocationFailure) => void;

  constructor(resolve: (fix: AmapFix) => void, reject: (error: AmapLocationFailure) => void) {
    this.resolve = resolve;
    this.reject = reject;
  }
}

class UpdateSession {
  background: boolean;
  onFix: (fix: AmapFix) => void;
  onError: (error: AmapLocationFailure) => void;
  resolve: (() => void) | null;
  reject: ((error: AmapLocationFailure) => void) | null;
  manager: AMapLocationManagerImpl | null = null;
  unobserve: (() => void) | null = null;
  generation: number = 0;
  task: backgroundTaskManager.ContinuousTaskNotification | null = null;
  taskCancelled: ((info: backgroundTaskManager.ContinuousTaskCancelInfo) => void) | null = null;
  gotFix: boolean = false;
  timer: number = -1;

  constructor(background: boolean, onFix: (fix: AmapFix) => void,
    onError: (error: AmapLocationFailure) => void, resolve: () => void, reject: (error: AmapLocationFailure) => void) {
    this.background = background;
    this.onFix = onFix;
    this.onError = onError;
    this.resolve = resolve;
    this.reject = reject;
  }
}

export class AmapLocationDriver {
  private context: common.UIAbilityContext;
  private environment: AmapLocationEnvironment;
  private singles: Set<SingleRequest> = new Set();
  private stream: UpdateSession | null = null;
  private taskQueue: Promise<void> = Promise.resolve();

  constructor(context: common.UIAbilityContext) {
    this.context = context;
    this.environment = new AmapLocationEnvironment(context);
  }

  single(highAccuracy: boolean, timeoutMs: number, geocode: boolean, altitude: boolean): Promise<AmapFix> {
    return new Promise<AmapFix>((resolve, reject) => {
      const request = new SingleRequest(resolve, reject);
      this.singles.add(request);
      const precise = highAccuracy || altitude;
      this.environment.prepare(precise, false, true).then(() => {
        if (!this.singles.has(request)) return;
        if (!this.environment.isForeground()) throw new AmapLocationFailure(1505602, 'Location requires a foreground app');
        const manager = new AMapLocationManagerImpl(this.context);
        request.manager = manager;
        const options: AMapLocationOption = {
          // The SDK's ACCURACY priority selects GNSS only. FIRST_FIX uses both
          // GNSS and network; precise access is enforced separately above.
          priority: geoLocationManager.LocationRequestPriority.FIRST_FIX,
          scenario: geoLocationManager.LocationRequestScenario.UNSET,
          singleLocationTimeout: timeoutMs,
          isOffset: true, locatingWithReGeocode: geocode, allowsBackgroundLocationUpdates: false
        };
        const listener: IAMapLocationListener = {
          onLocationChanged: (loc: AMapLocation): void => {
            if (!this.singles.has(request)) return;
            try {
              const fix = new AmapFix(loc, geocode, altitude);
              if (this.takeSingle(request)) request.resolve(fix);
            } catch (error) { this.rejectSingle(request, failure(error as Error)); }
          },
          onLocationError: (err: AMapLocationErrorInfo): void => this.rejectSingle(request, sdkFailure(err))
        };
        manager.setLocationOption(AMapLocationType.Single, options);
        manager.setLocationListener(AMapLocationType.Single, listener);
        request.timer = setTimeout(() => {
          this.rejectSingle(request, new AmapLocationFailure(1505600, 'Location request timed out'));
        }, timeoutMs);
        manager.requestSingleLocation();
      }).catch((err: Error): void => this.rejectSingle(request, failure(err)));
    });
  }

  private takeSingle(request: SingleRequest): boolean {
    if (!this.singles.delete(request)) return false;
    clearTimeout(request.timer);
    if (request.manager !== null) release(request.manager, AMapLocationType.Single);
    request.manager = null;
    return true;
  }

  private rejectSingle(request: SingleRequest, error: AmapLocationFailure): void {
    if (this.takeSingle(request)) request.reject(error);
  }

  start(background: boolean, onFix: (fix: AmapFix) => void,
    onError: (error: AmapLocationFailure) => void): Promise<void> {
    if (this.stream !== null) return Promise.reject(new AmapLocationFailure(1505602, 'Location updates are already active'));
    return new Promise<void>((resolve, reject) => {
      const session = new UpdateSession(background, onFix, onError, resolve, reject);
      this.stream = session;
      this.activate(session, true);
    });
  }

  private activate(session: UpdateSession, initial: boolean): void {
    const generation = ++session.generation;
    this.environment.prepare(true, session.background, initial).then(async () => {
      if (this.stream !== session || session.generation !== generation) return;
      if (session.background) {
        await this.queueTask(() => this.acquireTask(session));
        if (this.stream !== session || session.generation !== generation) return;
      }
      if (!this.environment.isForeground()) throw new AmapLocationFailure(1505602, 'Location must be started in the foreground');
      if (!session.background && session.unobserve === null) {
        session.unobserve = this.environment.observeVisibility((visible: boolean): void => {
          if (this.stream !== session) return;
          if (!visible) {
            this.pause(session);
          } else if (session.manager === null) {
            this.activate(session, false);
          }
        });
      }
      if (session.generation !== generation) return;
      const manager = new AMapLocationManagerImpl(this.context);
      session.manager = manager;
      const options: AMapLocationOption = {
        priority: geoLocationManager.LocationRequestPriority.FIRST_FIX,
        scenario: geoLocationManager.LocationRequestScenario.UNSET,
        timeInterval: 2, distanceInterval: 0, isOffset: true,
        allowsBackgroundLocationUpdates: session.background, locatingWithReGeocode: false
      };
      const listener: IAMapLocationListener = {
        onLocationChanged: (loc: AMapLocation): void => {
          if (this.stream !== session || session.manager !== manager) return;
          let fix: AmapFix;
          try { fix = new AmapFix(loc, false, true); } catch (error) {
            const cause = failure(error as Error);
            if (session.resolve !== null) this.terminate(session, cause);
            else session.onError(cause);
            return;
          }
          session.gotFix = true;
          this.acknowledge(session);
          session.onFix(fix);
        },
        onLocationError: (err: AMapLocationErrorInfo): void => {
          if (this.stream !== session || session.manager !== manager) return;
          const cause = sdkFailure(err);
          if (session.resolve !== null || err.errorCode === AMapLocationErrorCode.ERROR_START_UPDATING_LOCATION_FAIL ||
            cause.code === 1505003 || cause.code === 1505004) this.terminate(session, cause);
          else session.onError(cause);
        }
      };
      manager.setLocationOption(AMapLocationType.Updating, options);
      manager.setLocationListener(AMapLocationType.Updating, listener);
      manager.startUpdatingLocation();
      if (session.manager !== manager) return;
      // Registration may complete asynchronously. Acknowledging via isStarted
      // also lets start complete on a stationary device before the first fix.
      if (session.gotFix || manager.isStarted()) this.acknowledge(session);
      else this.waitForRegistration(session, manager, Date.now() + 10000);
    }).catch((err: Error): void => {
      if (this.stream === session && session.generation === generation) this.terminate(session, failure(err));
    });
  }

  private queueTask(operation: () => Promise<void>): Promise<void> {
    const work = this.taskQueue.then(operation);
    this.taskQueue = work.catch((): void => {});
    return work;
  }

  // AMap's void startContinuousTask() can create a task *after* stop/onDestroy.
  // Await Harmony's own task request, keep the returned identity, and queue
  // its release even if the owning session ended while the request was pending.
  private async acquireTask(session: UpdateSession): Promise<void> {
    if (this.stream !== session) return;
    if (deviceInfo.sdkApiVersion < 21) {
      const tasks = await backgroundTaskManager.getAllContinuousTasks(this.context);
      if (tasks.some((task: backgroundTaskManager.ContinuousTaskInfo): boolean => task.abilityName === this.context.abilityInfo.name)) {
        throw new AmapLocationFailure(1505602, 'The foreground ability already owns a background task');
      }
    }
    if (this.stream !== session) return;
    const agent = await wantAgent.getWantAgent({
      wants: [{ bundleName: this.context.abilityInfo.bundleName, abilityName: this.context.abilityInfo.name }],
      actionType: wantAgent.OperationType.START_ABILITY,
      requestCode: 0,
      wantAgentFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
    });
    if (this.stream !== session) return;
    if (!this.environment.isForeground()) throw new AmapLocationFailure(1505602, 'Background location must be started in the foreground');
    if (deviceInfo.sdkApiVersion >= 21) {
      const request = new backgroundTaskManager.ContinuousTaskRequest();
      request.backgroundTaskModes = [backgroundTaskManager.BackgroundTaskMode.MODE_LOCATION];
      request.backgroundTaskSubmodes = [backgroundTaskManager.BackgroundTaskSubmode.SUBMODE_NORMAL_NOTIFICATION];
      request.wantAgent = agent;
      request.combinedTaskNotification = false;
      session.task = await backgroundTaskManager.startBackgroundRunning(this.context, request);
    } else {
      session.task = await backgroundTaskManager.startBackgroundRunning(this.context, ['location'], agent);
    }
    if (this.stream !== session) return; // terminate() already queued releaseTask behind us.
    session.taskCancelled = (info: backgroundTaskManager.ContinuousTaskCancelInfo): void => {
      if (this.stream !== session || info.id !== session.task?.continuousTaskId) return;
      session.task = null;
      this.terminate(session, new AmapLocationFailure(1505602, 'System cancelled the background location task'));
    };
    backgroundTaskManager.on('continuousTaskCancel', session.taskCancelled);
  }

  private async releaseTask(session: UpdateSession): Promise<void> {
    if (session.taskCancelled !== null) {
      try { backgroundTaskManager.off('continuousTaskCancel', session.taskCancelled); } catch (_) {}
      session.taskCancelled = null;
    }
    const owned = session.task;
    if (owned === null) return;
    try {
      if (deviceInfo.sdkApiVersion >= 21 && owned.continuousTaskId !== undefined) {
        await backgroundTaskManager.stopBackgroundRunning(this.context, owned.continuousTaskId);
      } else {
        // On API 20 the stop call addresses the entire ability. Confirm its
        // current task still has our identity (a cancelled task may be replaced).
        const tasks = await backgroundTaskManager.getAllContinuousTasks(this.context);
        const current = tasks.find((task: backgroundTaskManager.ContinuousTaskInfo): boolean =>
          task.abilityName === this.context.abilityInfo.name && task.notificationId === owned.notificationId &&
          (owned.continuousTaskId === undefined || task.continuousTaskId === owned.continuousTaskId));
        if (current !== undefined) {
          if (deviceInfo.sdkApiVersion >= 21) await backgroundTaskManager.stopBackgroundRunning(this.context, current.continuousTaskId);
          else await backgroundTaskManager.stopBackgroundRunning(this.context);
        }
      }
    } catch (error) {
      throw failure(error as Error);
    } finally {
      session.task = null;
    }
  }

  private waitForRegistration(session: UpdateSession, manager: AMapLocationManagerImpl, deadline: number): void {
    session.timer = setTimeout(() => {
      if (session.manager !== manager || this.stream !== session) return;
      try {
        if (session.gotFix || manager.isStarted()) this.acknowledge(session);
        else if (Date.now() >= deadline) this.terminate(session, new AmapLocationFailure(1505602, 'Location updates did not start'));
        else this.waitForRegistration(session, manager, deadline);
      } catch (error) {
        if (session.manager === manager) this.terminate(session, failure(error as Error));
      }
    }, 200);
  }

  private acknowledge(session: UpdateSession): void {
    clearTimeout(session.timer);
    session.timer = -1;
    const resolve = session.resolve;
    session.resolve = null;
    session.reject = null;
    if (resolve !== null) resolve();
  }

  private pause(session: UpdateSession): void {
    session.generation++;
    clearTimeout(session.timer);
    session.timer = -1;
    const manager = session.manager;
    session.manager = null;
    session.gotFix = false;
    if (manager !== null) release(manager, AMapLocationType.Updating);
  }

  private terminate(session: UpdateSession, error: AmapLocationFailure, notify: boolean = true): Promise<void> {
    if (this.stream !== session) return this.taskQueue;
    this.stream = null;
    const reject = session.reject;
    session.resolve = null;
    session.reject = null;
    this.pause(session);
    try { if (session.unobserve !== null) session.unobserve(); } catch (_) {}
    session.unobserve = null;
    const released = session.background ? this.queueTask(() => this.releaseTask(session)) : this.taskQueue;
    if (reject !== null) reject(error);
    else if (notify) session.onError(error);
    return released;
  }

  stop(): Promise<void> {
    if (this.stream !== null) return this.terminate(this.stream, new AmapLocationFailure(1505602, 'Location updates stopped'), false);
    return this.taskQueue;
  }

  revokePrivacy(): void {
    const cause = new AmapLocationFailure(1505004, 'Location privacy consent was revoked');
    try {
      if (this.stream !== null) this.terminate(this.stream, cause);
    } finally {
      this.singles.forEach((request: SingleRequest): void => this.rejectSingle(request, cause));
      this.environment.revokePrivacy();
    }
  }
}
