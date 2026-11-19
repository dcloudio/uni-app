import { ble } from '@kit.ConnectivityKit';
import { BluetoothPort, RuntimeConfiguration } from '../types';
import { DeviceSession } from '../DeviceSessionStore';
import { RequestContext } from '../DeviceRequestQueue';
import { BluetoothEventHub } from '../BluetoothEventHub';
import { BluetoothRuntimeError } from '../errors';
import { normalizeUuid } from '../uuid';
import { findCharacteristic, requestCharacteristic, ensureCurrent } from './GattCapability';

export class CharacteristicIOCapability {
  private port: BluetoothPort;
  private events: BluetoothEventHub;
  private configuration: RuntimeConfiguration;

  constructor(port: BluetoothPort, events: BluetoothEventHub, configuration: RuntimeConfiguration) {
    this.port = port;
    this.events = events;
    this.configuration = configuration;
  }

  async read(
    session: DeviceSession,
    serviceId: string,
    characteristicId: string
  ): Promise<ArrayBuffer> {
    const source = findCharacteristic(session, serviceId, characteristicId);
    if (!source.properties?.read) {
      throw new BluetoothRuntimeError(1509004, 'Read property not supported', 'read');
    }
    const revision = session.catalogRevision;
    const value = await session.queue.submit(
      async (_context: RequestContext): Promise<ArrayBuffer> => {
        ensureCurrent(session, revision);
        const characteristic = findCharacteristic(session, serviceId, characteristicId);
        const result = await this.port.read(
          session.deviceId,
          requestCharacteristic(characteristic, new ArrayBuffer(0))
        );
        ensureCurrent(session, revision);
        if (
          normalizeUuid(result.serviceUuid) !== normalizeUuid(source.serviceUuid) ||
          normalizeUuid(result.characteristicUuid) !== normalizeUuid(source.characteristicUuid)
        ) {
          throw new BluetoothRuntimeError(
            1509000,
            'Read result path does not match request',
            'readCorrelation'
          );
        }
        return result.characteristicValue;
      },
      this.configuration.operationTimeoutMs,
      0,
      false,
      undefined,
      revision
    );
    ensureCurrent(session, revision);
    this.events.value.emit({
      deviceId: session.deviceId,
      serviceId: normalizeUuid(source.serviceUuid),
      characteristicId: normalizeUuid(source.characteristicUuid),
      value: value
    });
    return value;
  }

  async write(
    session: DeviceSession,
    serviceId: string,
    characteristicId: string,
    input: ArrayBuffer,
    mode: string | undefined
  ): Promise<void> {
    if (!(input instanceof ArrayBuffer)) {
      throw new BluetoothRuntimeError(1509601, 'Write value must be ArrayBuffer', 'parameter');
    }
    const source = findCharacteristic(session, serviceId, characteristicId);
    if (mode !== undefined && mode !== 'write' && mode !== 'writeNoResponse') {
      throw new BluetoothRuntimeError(1509601, 'Invalid write type', 'parameter');
    }
    const wn =
      mode === 'writeNoResponse' ||
      (mode === undefined &&
        !source.properties?.write &&
        source.properties?.writeNoResponse === true);
    if (wn ? !source.properties?.writeNoResponse : !source.properties?.write) {
      throw new BluetoothRuntimeError(1509004, 'Write property not supported', 'write');
    }
    this.checkAbsoluteLength(input.byteLength);
    const revision = session.catalogRevision;
    let value = new ArrayBuffer(0);
    await session.queue.submit(
      async (_context: RequestContext): Promise<void> => {
        ensureCurrent(session, revision);
        this.checkLength(session, value.byteLength);
        const characteristic = findCharacteristic(session, serviceId, characteristicId);
        await this.port.write(
          session.deviceId,
          requestCharacteristic(characteristic, value),
          wn ? ble.GattWriteType.WRITE_NO_RESPONSE : ble.GattWriteType.WRITE
        );
        ensureCurrent(session, revision);
      },
      this.configuration.operationTimeoutMs,
      input.byteLength,
      wn,
      (): void => {
        value = input.slice(0);
      },
      revision
    );
  }

  private checkAbsoluteLength(bytes: number): void {
    if (bytes > 512) {
      throw new BluetoothRuntimeError(
        1509601,
        'Value exceeds maximum write payload limit',
        'writeLength'
      );
    }
  }

  private checkLength(session: DeviceSession, bytes: number): void {
    if (bytes > Math.min(512, session.observedMtu - 3)) {
      throw new BluetoothRuntimeError(
        1509601,
        'Value exceeds current MTU payload limit',
        'writeLength'
      );
    }
  }
}
