import { BluetoothPort, RuntimeConfiguration } from '../types';
import { DeviceSession } from '../DeviceSessionStore';
import { RequestContext } from '../DeviceRequestQueue';
import { BluetoothEventHub } from '../BluetoothEventHub';
import { BluetoothRuntimeError } from '../errors';

export class MtuCapability {
  private port: BluetoothPort;
  private events: BluetoothEventHub;
  private configuration: RuntimeConfiguration;
  private canPublish: (session: DeviceSession) => boolean;

  constructor(
    port: BluetoothPort,
    events: BluetoothEventHub,
    configuration: RuntimeConfiguration,
    canPublish: (session: DeviceSession) => boolean
  ) {
    this.port = port;
    this.events = events;
    this.configuration = configuration;
    this.canPublish = canPublish;
  }

  get(session: DeviceSession): number {
    return session.observedMtu;
  }

  async set(session: DeviceSession, requested: number): Promise<number> {
    // HarmonyOS setBLEMtuSize 官方参数范围为闭区间 [23, 517]。
    if (!Number.isInteger(requested) || requested < 23 || requested > 517) {
      throw new BluetoothRuntimeError(1509601, 'MTU must be an integer in [23, 517]', 'parameter');
    }
    return await session.queue.submit(
      (_context: RequestContext): Promise<number> => {
        if (session.state !== 'connected') {
          throw new BluetoothRuntimeError(1509003, 'Connection ended', 'mtu');
        }
        if (session.mtuRequested !== undefined) {
          throw new BluetoothRuntimeError(
            1509000,
            'Another MTU negotiation is in progress',
            'mtuPolicy'
          );
        }
        return new Promise<number>((resolve, reject): void => {
          session.mtuRequested = requested;
          session.mtuResolve = resolve;
          session.mtuReject = reject;
          try {
            this.port.setMtu(session.deviceId, requested);
          } catch (e) {
            session.mtuResolve = undefined;
            session.mtuReject = undefined;
            session.mtuRequested = undefined;
            reject(e as Error);
          }
        });
      },
      this.configuration.mtuTimeoutMs
    );
  }

  changed(session: DeviceSession, mtu: number): void {
    if (!Number.isInteger(mtu) || mtu < 23 || mtu > 517) {
      return;
    }
    session.observedMtu = mtu;
    const resolve = session.mtuResolve;
    session.mtuRequested = undefined;
    session.mtuResolve = undefined;
    session.mtuReject = undefined;
    resolve?.(mtu);
    // set() 直接向队列返回原生 Promise；其完成回调先入微任务，确保公共事件不持有提交槽。
    Promise.resolve().then((): void => {
      if (!this.canPublish(session)) {
        return;
      }
      this.events.mtu.emit(
        { deviceId: session.deviceId, mtu: mtu },
        (): boolean => this.canPublish(session)
      );
    });
  }
}
