import { common } from '@kit.AbilityKit';
import { ble } from '@kit.ConnectivityKit';

export interface AdapterSnapshot {
  available: boolean;
  discovering: boolean;
}

export type AdapterListener = (state: AdapterSnapshot) => void;
export type PowerListener = (available: boolean, poweredOff: boolean) => void;
export type ScanListener = (devices: ble.ScanResult[]) => void;
export type ConnectionListener = (deviceId: string, state: ble.BLEConnectionChangeState) => void;
export type ValueListener = (deviceId: string, value: ble.BLECharacteristic) => void;
export type MtuListener = (deviceId: string, mtu: number) => void;

export interface BluetoothClock {
  // 系统启动以来的单调毫秒，包含深度休眠；用于期限、节流和缓存 TTL。
  monotonicNowMs(): number;
}

// 系统能力边界；Fake 与生产 Port 共用同一个单调时钟。
export interface BluetoothPort extends BluetoothClock {
  normalizeConnectionDeviceId(deviceId: string): string | undefined;
  // 仅判断系统虚拟地址映射是否有效，不代表外设在线或可连接。
  isValidRandomDeviceId(deviceId: string): boolean;
  requestBluetoothPermission(context: common.UIAbilityContext): Promise<void>;
  observePower(listener: PowerListener): void;
  removePowerObserver(): void;
  getPower(): AdapterSnapshot;
  isPoweredOff(): boolean;
  startDiscovery(
    filters: ble.ScanFilter[],
    options: ble.ScanOptions,
    listener: ScanListener,
    deadlineMs?: number
  ): Promise<void>;
  stopDiscovery(deadlineMs?: number): Promise<void>;
  removeDiscoveryObserver(): void;
  getConnectedDevices(): string[];
  createClient(
    deviceId: string,
    listener: ConnectionListener,
    valueListener: ValueListener,
    mtuListener: MtuListener
  ): void;
  deviceName(deviceId: string): string;
  connect(deviceId: string): void;
  disconnect(deviceId: string): void;
  closeClient(deviceId: string): void;
  retryClientCleanup(): void;
  services(deviceId: string): Promise<ble.GattService[]>;
  read(deviceId: string, characteristic: ble.BLECharacteristic): Promise<ble.BLECharacteristic>;
  write(
    deviceId: string,
    characteristic: ble.BLECharacteristic,
    type: ble.GattWriteType
  ): Promise<void>;
  notify(
    deviceId: string,
    characteristic: ble.BLECharacteristic,
    enable: boolean,
    indication: boolean
  ): Promise<void>;
  rssi(deviceId: string): Promise<number>;
  setMtu(deviceId: string, mtu: number): void;
}

export class RuntimeConfiguration {
  readonly discoveredDeviceLimit: number = 512;
  readonly discoveredDeviceTtlMs: number = 15 * 60 * 1000;
  readonly discoveryBatchLimit: number = 256;
  readonly sessionRequestLimit: number = 16;
  readonly runtimeRequestLimit: number = 128;
  readonly sessionPayloadLimit: number = 8 * 1024;
  readonly runtimePayloadLimit: number = 64 * 1024;
  readonly operationTimeoutMs: number = 10000;
  readonly discoveryTimeoutMs: number = 20000;
  readonly mtuTimeoutMs: number = 10000;
  readonly wnSubmitIntervalMs: number = 60;
}

export interface DeviceSnapshot {
  name: string;
  deviceId: string;
  RSSI: number;
  advertisData: ArrayBuffer;
  advertisServiceUUIDs: string[];
  localName: string;
  serviceData: Map<string, ArrayBuffer>;
  connectable: boolean;
}
export interface DeviceFoundEvent {
  devices: DeviceSnapshot[];
}
export interface ConnectionEvent {
  deviceId: string;
  connected: boolean;
}
export interface ValueEvent {
  deviceId: string;
  serviceId: string;
  characteristicId: string;
  value: ArrayBuffer;
}
export interface MtuEvent {
  deviceId: string;
  mtu: number;
}
export interface ServiceSnapshot {
  uuid: string;
  isPrimary: boolean;
}
export interface CharacteristicProperties {
  read: boolean;
  write: boolean;
  notify: boolean;
  indicate: boolean;
  writeNoResponse: boolean;
  writeDefault: boolean;
}
export interface CharacteristicSnapshot {
  uuid: string;
  properties: CharacteristicProperties;
}
export interface ConnectedDeviceSnapshot {
  deviceId: string;
  name: string;
}
export type DeviceFoundListener = (event: DeviceFoundEvent) => void;
export type ConnectionEventListener = (event: ConnectionEvent) => void;
export type ValueEventListener = (event: ValueEvent) => void;
export type MtuEventListener = (event: MtuEvent) => void;
