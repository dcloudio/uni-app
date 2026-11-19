import { constant, ble } from '@kit.ConnectivityKit';
import { BluetoothPort, RuntimeConfiguration } from '../types';
import { DeviceSession, DeviceSessionStore } from '../DeviceSessionStore';
import { BluetoothEventHub } from '../BluetoothEventHub';
import { BluetoothRuntimeError } from '../errors';

export class ConnectionCapability {
  private port: BluetoothPort;
  private store: DeviceSessionStore;
  private events: BluetoothEventHub;
  private configuration: RuntimeConfiguration;
  private valueHandler: (session: DeviceSession, value: ble.BLECharacteristic) => void;
  private mtuHandler: (session: DeviceSession, mtu: number) => void;

  constructor(
    port: BluetoothPort,
    store: DeviceSessionStore,
    events: BluetoothEventHub,
    configuration: RuntimeConfiguration,
    valueHandler: (session: DeviceSession, value: ble.BLECharacteristic) => void,
    mtuHandler: (session: DeviceSession, mtu: number) => void
  ) {
    this.port = port;
    this.store = store;
    this.events = events;
    this.configuration = configuration;
    this.valueHandler = valueHandler;
    this.mtuHandler = mtuHandler;
  }

  normalizeDeviceId(deviceId: string): string {
    const normalized = this.port.normalizeConnectionDeviceId(deviceId);
    if (normalized === undefined) {
      throw new BluetoothRuntimeError(1509601, 'Invalid Bluetooth deviceId', 'parameter');
    }
    return normalized;
  }

  admit(deviceId: string, timeout: number | undefined): boolean {
    if (timeout !== undefined && (!Number.isFinite(timeout) || timeout <= 0)) {
      throw new BluetoothRuntimeError(1509601, 'Invalid connection parameters', 'parameter');
    }
    const existing = this.store.get(deviceId);
    if (existing?.state === 'connected') {
      return false;
    }
    if (existing !== undefined) {
      throw new BluetoothRuntimeError(1509001, 'Connection lifecycle is in progress', 'connection');
    }
    return true;
  }

  async connectAdmitted(deviceId: string, timeout: number | undefined): Promise<void> {
    const session = this.store.create(deviceId);
    return new Promise<void>((resolve, reject): void => {
      session.connectResolve = resolve;
      session.connectReject = reject;
      if (timeout !== undefined) {
        session.connectDeadline = this.port.monotonicNowMs() + timeout;
        this.armLifecycleTimeout(session);
      }
      try {
        this.port.createClient(
          deviceId,
          (_id: string, state: ble.BLEConnectionChangeState): void =>
            this.connectionChanged(session, state),
          (_id: string, value: ble.BLECharacteristic): void => {
            if (this.store.current(session) && session.state === 'connected') {
              this.valueHandler(session, value);
            }
          },
          (_id: string, mtu: number): void => {
            if (
              this.store.current(session) &&
              (session.state === 'connecting' || session.state === 'connected')
            ) {
              this.mtuHandler(session, mtu);
            }
          }
        );
        if (!this.store.current(session) || this.expireIfDue(session)) {
          return;
        }
        this.port.connect(deviceId);
      } catch (e) {
        if (!this.expireIfDue(session)) {
          this.terminate(session, e as Error);
        }
      }
    });
  }

  async disconnect(deviceId: string): Promise<void> {
    const session = this.store.connected(deviceId);
    // 先关闭准入；同步事件亦可安全结束这个 session。
    session.state = 'disconnecting';
    return await new Promise<void>((resolve, reject): void => {
      session.disconnectResolve = resolve;
      session.disconnectReject = reject;
      const cancellationError = new BluetoothRuntimeError(
        1509003,
        'BLE device is disconnecting',
        'disconnect'
      ) as Error;
      session.queue.dispose();
      const mtuReject = session.mtuReject;
      session.mtuRequested = undefined;
      session.mtuResolve = undefined;
      session.mtuReject = undefined;
      mtuReject?.(cancellationError);
      session.catalog = undefined;
      ++session.catalogRevision;
      session.subscriptions.clear();
      try {
        // 先记录期限，使同步返回的断开事件也遵守同一超时边界。
        session.disconnectDeadline =
          this.port.monotonicNowMs() + this.configuration.operationTimeoutMs;
        this.port.disconnect(deviceId);
        if (this.store.current(session) && !this.expireIfDue(session)) {
          this.armLifecycleTimeout(session);
        }
      } catch (e) {
        if (this.store.current(session)) {
          if (!this.expireIfDue(session)) {
            this.terminate(session, e as Error);
          }
        } else {
          reject(e as Error);
        }
      }
    });
  }

  private expireIfDue(session: DeviceSession): boolean {
    const connecting = session.state === 'connecting';
    const deadline = connecting ? session.connectDeadline : session.disconnectDeadline;
    if (
      (session.state !== 'connecting' && session.state !== 'disconnecting') ||
      !Number.isFinite(deadline) || this.port.monotonicNowMs() < deadline
    ) {
      return false;
    }
    this.terminate(
      session,
      new BluetoothRuntimeError(
        1509005,
        connecting ? 'Connection timed out' : 'Disconnect event timed out',
        connecting ? 'connect' : 'disconnect'
      ) as Error
    );
    return true;
  }

  private armLifecycleTimeout(session: DeviceSession): void {
    const phase = session.state;
    const connecting = phase === 'connecting';
    const deadline = connecting ? session.connectDeadline : session.disconnectDeadline;
    if ((phase !== 'connecting' && phase !== 'disconnecting') || !Number.isFinite(deadline)) {
      return;
    }
    const timer = setTimeout((): void => {
      // 清除 timer 之外仍检查会话和阶段，避免已排队的旧回调终结新操作。
      if (!this.store.current(session) || session.state !== phase) {
        return;
      }
      if (connecting) {
        session.connectTimer = -1;
      } else {
        session.disconnectTimer = -1;
      }
      // timer 只负责唤醒；提前执行时沿用原期限，不重新获得完整超时额度。
      if (!this.expireIfDue(session)) {
        this.armLifecycleTimeout(session);
      }
    }, Math.max(0, Math.ceil(deadline - this.port.monotonicNowMs())));
    if (connecting) {
      session.connectTimer = timer;
    } else {
      session.disconnectTimer = timer;
    }
  }

  terminate(
    session: DeviceSession,
    error: Error,
    disconnectSucceeded: boolean = false
  ): Error | undefined {
    if (!this.store.current(session)) {
      return undefined;
    }
    const previousState = session.state;
    this.store.remove(session);
    const wasConnected = session.state === 'connected' || session.state === 'disconnecting';
    session.state = 'closed';
    clearTimeout(session.connectTimer);
    clearTimeout(session.disconnectTimer);
    session.connectTimer = -1;
    session.disconnectTimer = -1;
    session.connectDeadline = Number.POSITIVE_INFINITY;
    session.disconnectDeadline = Number.POSITIVE_INFINITY;
    session.queue.dispose();
    session.catalog = undefined;
    ++session.catalogRevision;
    session.subscriptions.clear();
    const reject = session.connectReject;
    session.connectReject = undefined;
    session.connectResolve = undefined;
    const disconnectResolve = session.disconnectResolve;
    const disconnectReject = session.disconnectReject;
    session.disconnectResolve = undefined;
    session.disconnectReject = undefined;
    const mtuReject = session.mtuReject;
    session.mtuRequested = undefined;
    session.mtuReject = undefined;
    session.mtuResolve = undefined;
    let cleanupError: Error | undefined = undefined;
    try {
      this.port.closeClient(session.deviceId);
    } catch (e) {
      cleanupError = e as Error;
    }
    reject?.(error);
    mtuReject?.(error);
    if (previousState === 'disconnecting') {
      if (disconnectSucceeded) {
        if (cleanupError === undefined) {
          disconnectResolve?.();
        } else {
          disconnectReject?.(cleanupError);
        }
      } else {
        disconnectReject?.(error);
      }
    }
    if (wasConnected) {
      this.events.connection.emit({ deviceId: session.deviceId, connected: false });
    }
    return cleanupError;
  }

  closeAll(): Error | undefined {
    let failure: Error | undefined = undefined;
    // 先重试上次遗留资源；本轮新发生的关闭失败留待下次关闭或重连处理。
    try {
      this.port.retryClientCleanup();
    } catch (e) {
      failure = e as Error;
    }
    this.store.all().forEach((session: DeviceSession): void => {
      const connecting = session.state === 'connecting';
      const error = this.terminate(
        session,
        new BluetoothRuntimeError(
          connecting ? 1509000 : 1509003,
          connecting ? 'Connection cancelled: adapter unavailable or closed' : 'Adapter unavailable or closed',
          connecting ? 'connectCancelled' : 'connection'
        ) as Error
      );
      if (failure === undefined) {
        failure = error;
      }
    });
    return failure;
  }

  private connectionChanged(session: DeviceSession, state: ble.BLEConnectionChangeState): void {
    if (!this.store.current(session)) {
      return;
    }
    // 事件可能先于延迟的 timer 被处理，成功/失败结果都必须复核截止时间。
    if (this.expireIfDue(session)) {
      return;
    }
    if (
      state.state === constant.ProfileConnectionState.STATE_CONNECTED &&
      session.state === 'connecting'
    ) {
      session.state = 'connected';
      clearTimeout(session.connectTimer);
      session.connectTimer = -1;
      session.connectDeadline = Number.POSITIVE_INFINITY;
      const resolve = session.connectResolve;
      session.connectResolve = undefined;
      session.connectReject = undefined;
      resolve?.();
      this.events.connection.emit({ deviceId: session.deviceId, connected: true });
    } else if (state.state === constant.ProfileConnectionState.STATE_DISCONNECTED) {
      // 尚未建立连接时是连接失败；已建立后的断开仍按无连接处理。
      const connecting = session.state === 'connecting';
      this.terminate(
        session,
        new BluetoothRuntimeError(
          connecting ? 1509001 : 1509003,
          connecting ? 'BLE connection failed' : 'BLE device disconnected',
          connecting ? 'connect' : 'connection'
        ) as Error,
        session.state === 'disconnecting'
      );
    }
  }
}
