import { ble } from '@kit.ConnectivityKit';
import { BluetoothPort, DeviceSnapshot, RuntimeConfiguration } from '../types';
import { BluetoothEventHub } from '../BluetoothEventHub';
import { BluetoothRuntimeError } from '../errors';
import { normalizeUuid } from '../uuid';

function adUuid(data: Uint8Array, offset: number, length: number): string {
  let hex = '';
  for (let i = length - 1; i >= 0; --i) {
    hex += data[offset + i].toString(16).padStart(2, '0');
  }
  if (length === 16) {
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(
      16,
      20
    )}-${hex.slice(20)}`;
  }
  return normalizeUuid(hex);
}

export function parseAdvertisement(result: ble.ScanResult): DeviceSnapshot {
  const bytes = new Uint8Array(result.data);
  const services: string[] = [];
  const serviceData: Map<string, ArrayBuffer> = new Map();
  let manufacturer = new ArrayBuffer(0);
  let hasManufacturer = false;
  let localName = '';
  let completeName = false;
  for (let offset = 0; offset < bytes.length; ) {
    const length = bytes[offset];
    if (length === 0) {
      break;
    }
    const end = offset + length + 1;
    if (length < 1 || end > bytes.length) {
      break;
    }
    const type = bytes[offset + 1];
    const start = offset + 2;
    const size = length - 1;
    if (type >= 0x02 && type <= 0x07) {
      const width = type <= 0x03 ? 2 : type <= 0x05 ? 4 : 16;
      for (let at = start; at + width <= end; at += width) {
        const uuid = adUuid(bytes, at, width);
        if (services.indexOf(uuid) < 0) {
          services.push(uuid);
        }
      }
    } else if ((type === 0x08 || type === 0x09) && (!completeName || type === 0x09)) {
      // 蓝牙名称是 UTF-8；解码在 Port 外独立验证，不读取越界报文。
      localName = decodeName(bytes.subarray(start, end));
      completeName = type === 0x09;
    } else if (type === 0xff && !hasManufacturer) {
      manufacturer = result.data.slice(start, end); // 首个制造商 AD，保留公司 ID 的两个字节。
      hasManufacturer = true;
    } else if (type === 0x16 || type === 0x20 || type === 0x21) {
      const width = type === 0x16 ? 2 : type === 0x20 ? 4 : 16;
      if (size >= width) {
        serviceData.set(adUuid(bytes, start, width), result.data.slice(start + width, end));
      }
    }
    offset = end;
  }
  return {
    name: result.deviceName || localName,
    deviceId: result.deviceId,
    RSSI: result.rssi,
    advertisData: manufacturer,
    advertisServiceUUIDs: services,
    localName: localName || result.deviceName,
    serviceData: serviceData,
    connectable: result.connectable
  };
}

function decodeName(bytes: Uint8Array): string {
  // 有界 UTF-8 解码；非法序列输出替换字符，不使扫描事件抛出。
  let text = '';
  for (let i = 0; i < bytes.length; ) {
    const first = bytes[i++];
    if (first < 0x80) {
      text += String.fromCharCode(first);
      continue;
    }
    const count =
      first >= 0xc2 && first <= 0xdf
        ? 1
        : first >= 0xe0 && first <= 0xef
        ? 2
        : first >= 0xf0 && first <= 0xf4
        ? 3
        : 0;
    if (count === 0 || i + count > bytes.length) {
      text += '\ufffd';
      continue;
    }
    let code = first & (count === 1 ? 0x1f : count === 2 ? 0x0f : 0x07);
    let valid = true;
    for (let k = 0; k < count; ++k) {
      if ((bytes[i + k] & 0xc0) !== 0x80) {
        valid = false;
        break;
      }
      code = (code << 6) | (bytes[i + k] & 0x3f);
    }
    if (!valid) {
      text += '\ufffd';
      continue;
    }
    i += count;
    const minimum = count === 1 ? 0x80 : count === 2 ? 0x800 : 0x10000;
    text +=
      code < minimum || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff)
        ? '\ufffd'
        : String.fromCodePoint(code);
  }
  return text;
}

class DiscoveredDeviceEntry {
  snapshot: DeviceSnapshot;
  observedAt: number;
  reportedRound: number = -1;

  constructor(snapshot: DeviceSnapshot, observedAt: number) {
    this.snapshot = snapshot;
    this.observedAt = observedAt;
  }
}

export interface DiscoveredDeviceIdentity {
  name: string;
  connectable: boolean;
}

export class DiscoveryCapability {
  private port: BluetoothPort;
  private events: BluetoothEventHub;
  private configuration: RuntimeConfiguration;
  private devices: Map<string, DiscoveredDeviceEntry> = new Map();
  // 连接依据只保留轻量元数据，不引用广播 buffer，也不随快照 TTL/容量回收。
  // 随本适配器生命周期增长；close/reset 统一清空，不静默遗忘已发现设备。
  private knownDevices: Map<string, DiscoveredDeviceIdentity> = new Map();
  private batch: Map<string, DeviceSnapshot> = new Map();
  private timer: number = -1;
  private epoch: number = 0;
  private lifecycle: number = 0;
  private tail: Promise<void> = Promise.resolve();
  private active: boolean = false;
  private operationPhase: string = '';
  private stateChanged: () => void;
  private protectedDevice: (deviceId: string) => boolean;

  constructor(
    port: BluetoothPort,
    events: BluetoothEventHub,
    configuration: RuntimeConfiguration,
    stateChanged: () => void,
    protectedDevice: (deviceId: string) => boolean
  ) {
    this.port = port;
    this.events = events;
    this.configuration = configuration;
    this.stateChanged = stateChanged;
    this.protectedDevice = protectedDevice;
  }

  discovering(): boolean {
    return this.active;
  }

  list(): DeviceSnapshot[] {
    this.pruneExpired(this.port.monotonicNowMs());
    return Array.from(this.devices.values()).map(
      (entry: DiscoveredDeviceEntry): DeviceSnapshot => entry.snapshot
    );
  }

  name(deviceId: string): string {
    return this.knownDevices.get(deviceId)?.name ?? '';
  }

  connectionIdentity(deviceId: string): DiscoveredDeviceIdentity | undefined {
    return this.knownDevices.get(deviceId);
  }

  private pruneExpired(now: number): void {
    this.devices.forEach((entry: DiscoveredDeviceEntry, deviceId: string): void => {
      if (
        now - entry.observedAt >= this.configuration.discoveredDeviceTtlMs &&
        !this.protectedDevice(deviceId)
      ) {
        this.devices.delete(deviceId);
      }
    });
  }

  private record(device: DeviceSnapshot): DiscoveredDeviceEntry | undefined {
    const now = this.port.monotonicNowMs();
    this.pruneExpired(now);
    let entry = this.devices.get(device.deviceId);
    if (entry === undefined) {
      if (this.devices.size >= this.configuration.discoveredDeviceLimit) {
        let oldestId: string | undefined = undefined;
        // Map 按最后广播顺序维护；跳过 connecting/connected/disconnecting 会话。
        this.devices.forEach((_entry: DiscoveredDeviceEntry, deviceId: string): void => {
          if (oldestId === undefined && !this.protectedDevice(deviceId)) {
            oldestId = deviceId;
          }
        });
        if (oldestId === undefined) {
          return undefined;
        }
        this.devices.delete(oldestId);
      }
      entry = new DiscoveredDeviceEntry(device, now);
    } else {
      entry.snapshot = device;
      entry.observedAt = now;
      this.devices.delete(device.deviceId);
    }
    // 去重状态随缓存条目一同淘汰，避免长扫描期间另建无限增长的 seen 集合。
    this.devices.set(device.deviceId, entry);
    // 必须在去重判断和应用回调之前更新；与对外快照分开，防止回调修改连接依据。
    this.knownDevices.set(device.deviceId, {
      name: device.name,
      connectable: device.connectable
    });
    return entry;
  }

  start(services: string[], duplicates: boolean, interval: number, power: string): Promise<void> {
    const normalized = services.map((value: string): string => normalizeUuid(value));
    if (
      !Number.isFinite(interval) ||
      interval < 0 ||
      ['low', 'medium', 'high'].indexOf(power) < 0
    ) {
      return Promise.reject(
        new BluetoothRuntimeError(1509601, 'Invalid scan options', 'parameter')
      );
    }
    const lifecycle = this.lifecycle;
    const operation = this.tail.then(async (): Promise<void> => {
      this.operationPhase = 'start';
      if (lifecycle !== this.lifecycle) {
        throw new BluetoothRuntimeError(1509000, 'Scan start cancelled', 'discovery');
      }
      const deadline = this.port.monotonicNowMs() + this.configuration.operationTimeoutMs;
      // 新配置替换旧轮次；旧 batch 不得穿透到新轮次。
      if (this.active) {
        await this.stopNow(deadline);
      }
      if (lifecycle !== this.lifecycle) {
        throw new BluetoothRuntimeError(1509000, 'Scan start cancelled', 'discovery');
      }
      const round = ++this.epoch;
      const filters: ble.ScanFilter[] =
        normalized.length > 0 && normalized.length <= 3
          ? normalized.map((uuid: string): ble.ScanFilter => {
              return { serviceUuid: uuid };
            })
          : [];
      const options: ble.ScanOptions = {
        dutyMode:
          power === 'low'
            ? ble.ScanDuty.SCAN_MODE_LOW_POWER
            : power === 'high'
            ? ble.ScanDuty.SCAN_MODE_LOW_LATENCY
            : ble.ScanDuty.SCAN_MODE_BALANCED,
        reportMode: ble.ScanReportMode.NORMAL
      };
      try {
        await this.port.startDiscovery(filters, options, (results: ble.ScanResult[]): void => {
          if (round !== this.epoch) {
            return;
          }
          results.forEach((raw: ble.ScanResult): void => {
            // 用户回调可同步 close/reset；同一系统批次的余项也必须重新核验轮次。
            if (round !== this.epoch) {
              return;
            }
            const deviceId = this.port.normalizeConnectionDeviceId(raw.deviceId);
            if (deviceId === undefined) {
              return;
            }
            const device = parseAdvertisement(raw);
            device.deviceId = deviceId;
            if (
              normalized.length > 0 &&
              !normalized.some(
                (uuid: string): boolean => device.advertisServiceUUIDs.indexOf(uuid) >= 0
              )
            ) {
              return;
            }
            const entry = this.record(device);
            if (entry === undefined) {
              return;
            }
            // 有界去重：仅覆盖当前轮次且缓存条目持续存在的区间。
            // 条目淘汰/过期或开始新轮次后，同地址允许再次上报。
            if (!duplicates && entry.reportedRound === round) {
              return;
            }
            entry.reportedRound = round;
            if (interval === 0) {
              this.events.discovery.emit(
                { devices: [device] },
                (): boolean => round === this.epoch
              );
            } else {
              this.batch.set(device.deviceId, device);
              if (this.batch.size >= this.configuration.discoveryBatchLimit) {
                // 容量到达即投递；无需等待这些地址再次广播来补报。
                this.flush();
              } else if (this.timer === -1) {
                this.timer = setTimeout((): void => {
                  if (round === this.epoch) {
                    this.flush();
                  }
                }, interval);
              }
            }
          });
        }, deadline);
        if (round !== this.epoch) {
          throw new BluetoothRuntimeError(1509000, 'Scan start cancelled', 'discovery');
        }
        this.active = true;
        this.stateChanged();
      } catch (e) {
        if (round === this.epoch) {
          ++this.epoch;
          this.clearBatch();
          this.active = false;
          this.stateChanged();
        }
        // Port 持有系统槽和 scanner 清理；这里不能再等待清理或重复提交停止。
        throw e as Error;
      }
    });
    this.tail = operation.then(
      (): void => {
        this.operationPhase = '';
      },
      (): void => {
        this.operationPhase = '';
      }
    );
    return operation;
  }

  stop(): Promise<void> {
    const lifecycle = this.lifecycle;
    const operation = this.tail.then(async (): Promise<void> => {
      this.operationPhase = 'stop';
      if (lifecycle !== this.lifecycle) {
        throw new BluetoothRuntimeError(1509000, 'Scan stop cancelled', 'discovery');
      }
      await this.stopNow();
    });
    this.tail = operation.then(
      (): void => {
        this.operationPhase = '';
      },
      (): void => {
        this.operationPhase = '';
      }
    );
    return operation;
  }

  reset(): Promise<void> {
    return this.shutdown();
  }

  close(): Promise<void> {
    return this.shutdown();
  }

  private shutdown(): Promise<void> {
    // 只有已完成启动且当前没有系统启停未决时才新增 stop；Port 负责迟到启动的清理。
    const pendingSystemOperation = this.operationPhase !== '';
    const shouldStop = this.active && !pendingSystemOperation;
    this.invalidate();
    let failure: Error | undefined = undefined;
    try {
      this.port.removeDiscoveryObserver();
    } catch (e) {
      failure = e as Error;
    }
    // close 不能等待结果未知的系统调用，也不能在它结束前提交第二个 stop。
    if (pendingSystemOperation) {
      return failure === undefined ? Promise.resolve() : Promise.reject(failure);
    }
    const operation = this.tail.then(async (): Promise<void> => {
      if (shouldStop) {
        try {
          await this.stopNow();
        } catch (e) {
          if (failure === undefined) {
            failure = e as Error;
          }
        }
      }
      if (failure !== undefined) {
        throw failure as Error;
      }
    });
    this.tail = operation.then(
      (): void => {},
      (): void => {}
    );
    return operation;
  }

  private invalidate(): void {
    ++this.lifecycle;
    ++this.epoch;
    this.active = false;
    this.clearBatch();
    this.devices.clear();
    this.knownDevices.clear();
  }

  private async stopNow(
    deadline: number = this.port.monotonicNowMs() + this.configuration.operationTimeoutMs
  ): Promise<void> {
    const round = ++this.epoch;
    this.clearBatch();
    try {
      await this.port.stopDiscovery(deadline);
    } finally {
      if (round === this.epoch) {
        this.active = false;
        this.stateChanged();
      }
    }
  }

  private clearBatch(): void {
    if (this.timer !== -1) {
      clearTimeout(this.timer);
    }
    this.timer = -1;
    this.batch.clear();
  }

  private flush(): void {
    const round = this.epoch;
    const devices = Array.from(this.batch.values());
    // 容量提前投递也结束当前计时窗口；先清理再调用业务，允许同步重入。
    this.clearBatch();
    if (devices.length > 0) {
      this.events.discovery.emit(
        { devices: devices },
        (): boolean => round === this.epoch
      );
    }
  }
}
