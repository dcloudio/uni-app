import { ble } from '@kit.ConnectivityKit';
import { DeviceRequestQueue, RequestBudget } from './DeviceRequestQueue';
import { BluetoothClock, RuntimeConfiguration } from './types';
import { BluetoothRuntimeError } from './errors';

export class DeviceSession {
  readonly deviceId: string;
  readonly epoch: number;
  readonly queue: DeviceRequestQueue;
  state: string = 'connecting';
  catalog: ble.GattService[] | undefined = undefined;
  catalogRevision: number = 0;
  observedMtu: number = 23;
  mtuRequested: number | undefined = undefined;
  mtuResolve: ((value: number) => void) | undefined = undefined;
  mtuReject: ((error: Error) => void) | undefined = undefined;
  connectResolve: (() => void) | undefined = undefined;
  connectReject: ((error: Error) => void) | undefined = undefined;
  connectTimer: number = -1;
  connectDeadline: number = Number.POSITIVE_INFINITY;
  disconnectResolve: (() => void) | undefined = undefined;
  disconnectReject: ((error: Error) => void) | undefined = undefined;
  disconnectTimer: number = -1;
  disconnectDeadline: number = Number.POSITIVE_INFINITY;
  subscriptions: Map<string, boolean> = new Map();

  constructor(
    deviceId: string,
    epoch: number,
    configuration: RuntimeConfiguration,
    budget: RequestBudget,
    clock: BluetoothClock
  ) {
    this.deviceId = deviceId;
    this.epoch = epoch;
    this.queue = new DeviceRequestQueue(clock, configuration, budget);
  }
}

export class DeviceSessionStore {
  private sessions: Map<string, DeviceSession> = new Map();
  private nextEpoch: number = 0;
  private configuration: RuntimeConfiguration;
  private clock: BluetoothClock;
  private budget: RequestBudget = new RequestBudget();

  constructor(configuration: RuntimeConfiguration, clock: BluetoothClock) {
    this.configuration = configuration;
    this.clock = clock;
  }

  create(deviceId: string): DeviceSession {
    const session = new DeviceSession(
      deviceId, ++this.nextEpoch, this.configuration, this.budget, this.clock
    );
    this.sessions.set(deviceId, session);
    return session;
  }

  get(deviceId: string): DeviceSession | undefined {
    return this.sessions.get(deviceId);
  }

  current(session: DeviceSession): boolean {
    return this.sessions.get(session.deviceId) === session;
  }

  connected(deviceId: string): DeviceSession {
    const session = this.sessions.get(deviceId);
    if (session === undefined || session.state !== 'connected') {
      throw new BluetoothRuntimeError(1509003, 'BLE device is not connected', 'connection');
    }
    return session;
  }

  all(): DeviceSession[] {
    return Array.from(this.sessions.values());
  }

  remove(session: DeviceSession): void {
    if (this.current(session)) {
      this.sessions.delete(session.deviceId);
    }
  }
}
