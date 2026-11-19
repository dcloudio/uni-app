import { ble } from '@kit.ConnectivityKit';
import {
  BluetoothPort,
  RuntimeConfiguration,
  ServiceSnapshot,
  CharacteristicSnapshot
} from '../types';
import { DeviceSession } from '../DeviceSessionStore';
import { RequestContext } from '../DeviceRequestQueue';
import { BluetoothRuntimeError } from '../errors';
import { normalizeUuid } from '../uuid';

export function findService(session: DeviceSession, serviceId: string): ble.GattService {
  const uuid = normalizeUuid(serviceId);
  if (session.catalog === undefined) {
    throw new BluetoothRuntimeError(
      1500101,
      'Discover GATT services before operation',
      'catalogNotReady'
    );
  }
  const matches = session.catalog.filter(
    (service: ble.GattService): boolean => normalizeUuid(service.serviceUuid) === uuid
  );
  if (matches.length === 0) {
    throw new BluetoothRuntimeError(1500103, 'Service not found', 'service');
  }
  if (matches.length !== 1) {
    throw new BluetoothRuntimeError(1509000, 'Service UUID is ambiguous', 'ambiguousPath');
  }
  return matches[0];
}
export function findCharacteristic(
  session: DeviceSession,
  serviceId: string,
  characteristicId: string
): ble.BLECharacteristic {
  const service = findService(session, serviceId);
  const uuid = normalizeUuid(characteristicId);
  const matches = service.characteristics.filter(
    (value: ble.BLECharacteristic): boolean => normalizeUuid(value.characteristicUuid) === uuid
  );
  if (matches.length === 0) {
    throw new BluetoothRuntimeError(1509002, 'Characteristic not found', 'characteristic');
  }
  if (matches.length !== 1) {
    throw new BluetoothRuntimeError(1509000, 'Characteristic UUID is ambiguous', 'ambiguousPath');
  }
  return matches[0];
}
export function requestCharacteristic(
  source: ble.BLECharacteristic,
  value: ArrayBuffer
): ble.BLECharacteristic {
  return {
    serviceUuid: source.serviceUuid,
    characteristicUuid: source.characteristicUuid,
    characteristicValue: value,
    descriptors: source.descriptors,
    properties: source.properties,
    characteristicValueHandle: source.characteristicValueHandle
  };
}
export function ensureCurrent(session: DeviceSession, revision: number): void {
  if (session.state !== 'connected') {
    throw new BluetoothRuntimeError(1509003, 'Connection ended', 'connection');
  }
  if (session.catalogRevision !== revision) {
    throw new BluetoothRuntimeError(1509000, 'GATT catalog changed', 'catalogInvalidated');
  }
}

export class GattCapability {
  private port: BluetoothPort;
  private configuration: RuntimeConfiguration;

  constructor(port: BluetoothPort, configuration: RuntimeConfiguration) {
    this.port = port;
    this.configuration = configuration;
  }

  async services(session: DeviceSession, refresh: boolean = false): Promise<ServiceSnapshot[]> {
    // 每个调用方独立占预算；后续出队复用已成功发现的完整树，不额外附加无限 waiter。
    const tree = await session.queue.submit(
      async (context: RequestContext): Promise<ble.GattService[]> => {
        if (session.state !== 'connected') {
          throw new BluetoothRuntimeError(1509003, 'Connection ended', 'services');
        }
        if (session.catalog !== undefined) {
          return session.catalog;
        }
        const services = await this.port.services(session.deviceId);
        if (context.canPublish() && session.state === 'connected') {
          session.catalog = flattenServices(services);
          ++session.catalogRevision;
        }
        return flattenServices(services);
      },
      this.configuration.discoveryTimeoutMs,
      0,
      false,
      (): void => {
        if (refresh && session.catalog !== undefined) {
          const previous = session.catalogRevision;
          session.catalog = undefined;
          ++session.catalogRevision;
          session.subscriptions.clear();
          session.queue.invalidateRevision(previous);
        }
      }
    );
    return tree.map((service: ble.GattService): ServiceSnapshot => {
      return { uuid: normalizeUuid(service.serviceUuid), isPrimary: service.isPrimary };
    });
  }

  characteristics(session: DeviceSession, serviceId: string): CharacteristicSnapshot[] {
    const service = findService(session, serviceId);
    return service.characteristics.map(
      (characteristic: ble.BLECharacteristic): CharacteristicSnapshot => {
        const p = characteristic.properties;
        return {
          uuid: normalizeUuid(characteristic.characteristicUuid),
          properties: {
            read: p?.read ?? false,
            write: p?.write ?? false,
            notify: p?.notify ?? false,
            indicate: p?.indicate ?? false,
            writeNoResponse: p?.writeNoResponse ?? false,
            writeDefault: p?.write ?? false
          }
        };
      }
    );
  }
}

function flattenServices(roots: ble.GattService[]): ble.GattService[] {
  const result: ble.GattService[] = [];
  const seen: Set<ble.GattService> = new Set();
  const pending = roots.slice();
  while (pending.length > 0) {
    const service = pending.shift();
    if (service === undefined || seen.has(service)) {
      continue;
    }
    seen.add(service);
    result.push(service);
    service.includeServices?.forEach((child: ble.GattService): void => {
      pending.push(child);
    });
  }
  return result;
}
