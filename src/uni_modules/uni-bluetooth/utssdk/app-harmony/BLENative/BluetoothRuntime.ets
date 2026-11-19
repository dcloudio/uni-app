import { common } from '@kit.AbilityKit';
import {
  AdapterListener,
  AdapterSnapshot,
  BluetoothPort,
  RuntimeConfiguration,
  DeviceSnapshot,
  DeviceFoundListener,
  ConnectionEventListener,
  ValueEventListener,
  MtuEventListener,
  ServiceSnapshot,
  CharacteristicSnapshot,
  ConnectedDeviceSnapshot
} from './types';
import { BluetoothRuntimeError } from './errors';
import { BluetoothEventHub } from './BluetoothEventHub';
import { HarmonyBluetoothPort } from './HarmonyBluetoothPort';
import { AdapterCapability } from './capabilities/AdapterCapability';
import { ble } from '@kit.ConnectivityKit';
import { DeviceSession, DeviceSessionStore } from './DeviceSessionStore';
import { DiscoveryCapability } from './capabilities/DiscoveryCapability';
import { normalizeUuid } from './uuid';
import { ConnectionCapability } from './capabilities/ConnectionCapability';
import { GattCapability } from './capabilities/GattCapability';
import { CharacteristicIOCapability } from './capabilities/CharacteristicIOCapability';
import { SubscriptionCapability } from './capabilities/SubscriptionCapability';
import { RssiCapability } from './capabilities/RssiCapability';
import { MtuCapability } from './capabilities/MtuCapability';

export class BluetoothRuntime {
  private static sharedInstance: BluetoothRuntime | undefined = undefined;
  readonly configuration: RuntimeConfiguration = new RuntimeConfiguration();
  private events: BluetoothEventHub = new BluetoothEventHub();
  private adapter: AdapterCapability;
  private port: BluetoothPort;
  private permissionRequest: Promise<void> | undefined = undefined;
  private generation: number = 0;
  private closing: boolean = false;
  private sessions: DeviceSessionStore;
  private discovery: DiscoveryCapability;
  private connections: ConnectionCapability;
  private gatt: GattCapability;
  private io: CharacteristicIOCapability;
  private subscription: SubscriptionCapability;
  private rssi: RssiCapability;
  private mtu: MtuCapability;

  // 显式注入 Port 供 Fake 使用；生产入口只调用 shared()。
  constructor(port: BluetoothPort) {
    this.port = port;
    this.sessions = new DeviceSessionStore(this.configuration, port);
    this.discovery = new DiscoveryCapability(
      port,
      this.events,
      this.configuration,
      (): void => this.emitAdapter(),
      (deviceId: string): boolean => this.sessions.get(deviceId) !== undefined
    );
    this.gatt = new GattCapability(port, this.configuration);
    this.io = new CharacteristicIOCapability(port, this.events, this.configuration);
    this.subscription = new SubscriptionCapability(port, this.events);
    this.rssi = new RssiCapability(port);
    this.mtu = new MtuCapability(
      port,
      this.events,
      this.configuration,
      (session: DeviceSession): boolean =>
        this.sessions.current(session) &&
        (session.state === 'connecting' || session.state === 'connected')
    );
    this.connections = new ConnectionCapability(
      port,
      this.sessions,
      this.events,
      this.configuration,
      (session: DeviceSession, value: ble.BLECharacteristic): void =>
        this.subscription.received(session, value),
      (session: DeviceSession, mtu: number): void => this.mtu.changed(session, mtu)
    );
    this.adapter = new AdapterCapability(port, (available: boolean, _poweredOff: boolean): void => {
      if (!available) {
        this.connections.closeAll();
        this.discovery.reset().catch((): void => {
          // 电源事件中的清理失败不阻断状态通知。
        });
      }
      this.events.emitAdapter({
        available: available,
        discovering: available && this.discovery.discovering()
      });
    });
  }

  static shared(): BluetoothRuntime {
    if (BluetoothRuntime.sharedInstance === undefined) {
      BluetoothRuntime.sharedInstance = new BluetoothRuntime(new HarmonyBluetoothPort());
    }
    return BluetoothRuntime.sharedInstance;
  }


  async open(context: common.UIAbilityContext): Promise<void> {
    if (this.closing) {
      throw new BluetoothRuntimeError(1509000, 'Adapter is closing', 'open');
    }
    const generation = this.generation;
    try {
      await this.requestPermission(context);
      if (generation !== this.generation) {
        throw new BluetoothRuntimeError(1509000, 'Open cancelled by adapter close', 'permission');
      }
      this.adapter.open();
    } catch (e) {
      // 旧授权结果不得清理新一代 open 已安装的资源。
      if (generation !== this.generation) {
        throw new BluetoothRuntimeError(1509000, 'Open cancelled by adapter close', 'permission');
      }
      try {
        this.adapter.removeObserverIfIdle(this.events.adapterListenerCount() > 0);
      } catch (_) {
        // 清理失败不能覆盖原始 open 错误。
      }
      throw e as Error;
    }
  }

  private requestPermission(context: common.UIAbilityContext): Promise<void> {
    if (this.permissionRequest !== undefined) {
      return this.permissionRequest;
    }
    const request = this.port.requestBluetoothPermission(context);
    this.permissionRequest = request;
    const clear = (): void => {
      if (this.permissionRequest === request) {
        this.permissionRequest = undefined;
      }
    };
    // close 无法取消系统弹窗；保留未决授权供重开复用，避免重叠申请。
    request.then(clear, clear);
    return request;
  }

  async close(): Promise<void> {
    if (this.closing) {
      throw new BluetoothRuntimeError(1509000, 'Adapter is closing', 'close');
    }
    ++this.generation;
    this.closing = true;
    this.events.resetAdapterState();
    // 所有准入先关闭；任一清理失败仍继续释放其余资源。
    let discoveryCleanup: Promise<void> = Promise.resolve();
    let discoveryFailure: Error | undefined = undefined;
    try {
      discoveryCleanup = this.discovery.close();
    } catch (e) {
      discoveryFailure = e as Error;
    }
    const connectionFailure = this.connections.closeAll();
    let adapterFailure: Error | undefined = undefined;
    try {
      this.adapter.close();
    } catch (e) {
      adapterFailure = e as Error;
    }
    try {
      await discoveryCleanup;
    } catch (e) {
      if (discoveryFailure === undefined) {
        discoveryFailure = e as Error;
      }
    }
    this.closing = false;
    const failure = discoveryFailure ?? connectionFailure ?? adapterFailure;
    if (failure !== undefined) {
      throw failure;
    }
  }

  async getAdapterState(): Promise<AdapterSnapshot> {
    const state = this.adapter.snapshot();
    return { available: state.available, discovering: this.discovery.discovering() };
  }

  private ready(): void {
    if (this.closing) {
      throw new BluetoothRuntimeError(1509000, 'Adapter is closing', 'adapter');
    }
    if (!this.adapter.snapshot().available) {
      const poweredOff = this.port.isPoweredOff();
      throw new BluetoothRuntimeError(
        poweredOff ? 1509603 : 1500102,
        'Bluetooth unavailable',
        'adapter'
      );
    }
  }

  private emitAdapter(): void {
    if (this.closing) {
      return;
    }
    try {
      const state = this.adapter.snapshot();
      this.events.emitAdapter({
        available: state.available,
        discovering: this.discovery.discovering()
      });
    } catch (_) {
      /* 未初始化时不发布虚假状态。 */
    }
  }

  async startDiscovery(
    services: string[] = [],
    duplicates: boolean = false,
    interval: number = 0,
    power: string = 'medium'
  ): Promise<void> {
    this.ready();
    return await this.discovery.start(services, duplicates, interval, power);
  }

  async stopDiscovery(): Promise<void> {
    this.ready();
    await this.discovery.stop();
  }

  async getDevices(): Promise<DeviceSnapshot[]> {
    this.ready();
    return this.discovery.list();
  }

  async connect(deviceId: string, timeout: number | undefined = undefined): Promise<void> {
    const normalizedDeviceId = this.connections.normalizeDeviceId(deviceId);
    this.ready();
    if (!this.connections.admit(normalizedDeviceId, timeout)) {
      return;
    }
    const device = this.discovery.connectionIdentity(normalizedDeviceId);
    if (device === undefined) {
      throw new BluetoothRuntimeError(
        1509006,
        'BLE device was not discovered in the current adapter lifecycle',
        'connectAdmission'
      );
    }
    if (device.connectable === false) {
      throw new BluetoothRuntimeError(
        1509604,
        'BLE device is not connectable',
        'connectAdmission'
      );
    }
    // 历史发现登记仍存在，不代表系统继续认可这个虚拟地址；先检查再创建 session。
    const addressValid = this.port.isValidRandomDeviceId(normalizedDeviceId);
    if (!addressValid) {
      throw new BluetoothRuntimeError(
        1509006,
        'BLE virtual device address is invalid; scan again to obtain a valid deviceId',
        'connectAdmission'
      );
    }
    await this.connections.connectAdmitted(normalizedDeviceId, timeout);
  }

  async disconnect(deviceId: string): Promise<void> {
    const normalizedDeviceId = this.connections.normalizeDeviceId(deviceId);
    this.ready();
    await this.connections.disconnect(normalizedDeviceId);
  }

  async getServices(deviceId: string): Promise<ServiceSnapshot[]> {
    const normalizedDeviceId = this.connections.normalizeDeviceId(deviceId);
    this.ready();
    return await this.gatt.services(this.sessions.connected(normalizedDeviceId), true);
  }

  async getCharacteristics(deviceId: string, serviceId: string): Promise<CharacteristicSnapshot[]> {
    const normalizedDeviceId = this.connections.normalizeDeviceId(deviceId);
    this.ready();
    const session = this.sessions.connected(normalizedDeviceId);
    if (session.catalog === undefined) {
      await this.gatt.services(session);
    }
    // await 期间原会话可能已断开或被重连替换，目录清空不能误报尚未发现服务。
    if (!this.sessions.current(session) || session.state !== 'connected') {
      throw new BluetoothRuntimeError(1509003, 'Connection ended', 'connection');
    }
    return this.gatt.characteristics(session, serviceId);
  }

  async read(deviceId: string, serviceId: string, characteristicId: string): Promise<ArrayBuffer> {
    const normalizedDeviceId = this.connections.normalizeDeviceId(deviceId);
    this.ready();
    return await this.io.read(
      this.sessions.connected(normalizedDeviceId),
      serviceId,
      characteristicId
    );
  }

  async write(
    deviceId: string,
    serviceId: string,
    characteristicId: string,
    value: ArrayBuffer,
    mode: string | undefined = undefined
  ): Promise<void> {
    const normalizedDeviceId = this.connections.normalizeDeviceId(deviceId);
    this.ready();
    await this.io.write(
      this.sessions.connected(normalizedDeviceId),
      serviceId,
      characteristicId,
      value,
      mode
    );
  }

  async notify(
    deviceId: string,
    serviceId: string,
    characteristicId: string,
    enable: boolean,
    type: string = 'indication'
  ): Promise<void> {
    const normalizedDeviceId = this.connections.normalizeDeviceId(deviceId);
    this.ready();
    await this.subscription.configure(
      this.sessions.connected(normalizedDeviceId),
      serviceId,
      characteristicId,
      enable,
      type
    );
  }

  async getRssi(deviceId: string): Promise<number> {
    const normalizedDeviceId = this.connections.normalizeDeviceId(deviceId);
    this.ready();
    return await this.rssi.read(this.sessions.connected(normalizedDeviceId));
  }

  async setMtu(deviceId: string, mtu: number): Promise<number> {
    const normalizedDeviceId = this.connections.normalizeDeviceId(deviceId);
    this.ready();
    return await this.mtu.set(this.sessions.connected(normalizedDeviceId), mtu);
  }

  async getMtu(deviceId: string): Promise<number> {
    const normalizedDeviceId = this.connections.normalizeDeviceId(deviceId);
    this.ready();
    return this.mtu.get(this.sessions.connected(normalizedDeviceId));
  }

  async getConnectedDevices(services: string[]): Promise<ConnectedDeviceSnapshot[]> {
    this.ready();
    if (services.length === 0) {
      throw new BluetoothRuntimeError(1509601, 'services must not be empty', 'parameter');
    }
    const wanted = services.map((uuid: string): string => normalizeUuid(uuid));
    const deviceIds = this.port.getConnectedDevices();
    const result: ConnectedDeviceSnapshot[] = [];
    for (let i = 0; i < deviceIds.length; ++i) {
      const deviceId = this.port.normalizeConnectionDeviceId(deviceIds[i]);
      if (deviceId === undefined) {
        continue;
      }
      const session = this.sessions.get(deviceId);
      if (wanted.length > 0) {
        if (session === undefined || session.state !== 'connected') {
          // 系统地址没有服务元数据；不能漏掉外部连接后声称完成系统范围过滤。
          throw new BluetoothRuntimeError(
            1500105,
            'Cannot filter services of a system connection not owned by Runtime',
            'externalServiceMetadata'
          );
        }
        const serviceIds =
          session.catalog !== undefined
            ? session.catalog
                .filter((service: ble.GattService): boolean => service.isPrimary)
                .map((service: ble.GattService): string => normalizeUuid(service.serviceUuid))
            : (await this.gatt.services(session))
                .filter((service: ServiceSnapshot): boolean => service.isPrimary)
                .map((service: ServiceSnapshot): string => normalizeUuid(service.uuid));
        if (!serviceIds.some((uuid: string): boolean => wanted.indexOf(uuid) >= 0)) {
          continue;
        }
      }
      result.push({
        deviceId: deviceId,
        name: this.discovery.name(deviceId) || this.port.deviceName(deviceId)
      });
    }
    return result;
  }

  addDeviceListener(listener: DeviceFoundListener): number {
    return this.events.discovery.add(listener);
  }

  removeDeviceListener(listener: number | DeviceFoundListener | null = null): void {
    this.events.discovery.remove(listener);
  }

  addConnectionListener(listener: ConnectionEventListener): number {
    return this.events.connection.add(listener);
  }

  removeConnectionListener(listener: number | ConnectionEventListener | null = null): void {
    this.events.connection.remove(listener);
  }

  addValueListener(listener: ValueEventListener): number {
    return this.events.value.add(listener);
  }

  removeValueListener(listener: number | ValueEventListener | null = null): void {
    this.events.value.remove(listener);
  }

  addMtuListener(listener: MtuEventListener): number {
    return this.events.mtu.add(listener);
  }

  removeMtuListener(listener: number | MtuEventListener | null = null): void {
    this.events.mtu.remove(listener);
  }

  addAdapterListener(listener: AdapterListener): number {
    this.adapter.observe();
    return this.events.addAdapter(listener);
  }

  removeAdapterListener(listener: number | AdapterListener | null = null): void {
    this.events.removeAdapter(listener);
    this.adapter.removeObserverIfIdle(this.events.adapterListenerCount() > 0);
  }
}
