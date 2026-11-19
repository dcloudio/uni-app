import { ble } from '@kit.ConnectivityKit';
import { BluetoothPort } from '../types';
import { DeviceSession } from '../DeviceSessionStore';
import { RequestContext } from '../DeviceRequestQueue';
import { BluetoothEventHub } from '../BluetoothEventHub';
import { BluetoothRuntimeError } from '../errors';
import { normalizeUuid } from '../uuid';
import { findCharacteristic, requestCharacteristic, ensureCurrent } from './GattCapability';

export class SubscriptionCapability {
  private port: BluetoothPort;
  private events: BluetoothEventHub;

  constructor(port: BluetoothPort, events: BluetoothEventHub) {
    this.port = port;
    this.events = events;
  }

  async configure(
    session: DeviceSession,
    serviceId: string,
    characteristicId: string,
    enable: boolean,
    type: string
  ): Promise<void> {
    if (type !== 'notification' && type !== 'indication') {
      throw new BluetoothRuntimeError(1509601, 'Invalid subscription type', 'parameter');
    }
    const source = findCharacteristic(session, serviceId, characteristicId);
    const indication = type === 'indication';
    if (indication ? !source.properties?.indicate : !source.properties?.notify) {
      throw new BluetoothRuntimeError(
        1509004,
        'Subscription property not supported',
        'subscription'
      );
    }
    if (
      !source.descriptors.some(
        (descriptor: ble.BLEDescriptor): boolean =>
          normalizeUuid(descriptor.descriptorUuid) === normalizeUuid('2902')
      )
    ) {
      throw new BluetoothRuntimeError(1509004, 'CCCD descriptor not found', 'subscription');
    }
    const revision = session.catalogRevision;
    const path = `${normalizeUuid(serviceId)}/${normalizeUuid(characteristicId)}/${type}`;
    await session.queue.submit(
      async (context: RequestContext): Promise<void> => {
        ensureCurrent(session, revision);
        const characteristic = findCharacteristic(session, serviceId, characteristicId);
        await this.port.notify(
          session.deviceId,
          requestCharacteristic(characteristic, new ArrayBuffer(0)),
          enable,
          indication
        );
        ensureCurrent(session, revision);
        if (context.canPublish()) {
          session.subscriptions.set(path, enable);
        }
      },
      undefined,
      0,
      false,
      undefined,
      revision
    );
  }

  received(session: DeviceSession, value: ble.BLECharacteristic): void {
    // 值事件只广播，不查 active，不参与 Read/Write 结果匹配。
    if (session.catalog === undefined) {
      return;
    }
    try {
      findCharacteristic(session, value.serviceUuid, value.characteristicUuid);
      this.events.value.emit({
        deviceId: session.deviceId,
        serviceId: normalizeUuid(value.serviceUuid),
        characteristicId: normalizeUuid(value.characteristicUuid),
        value: value.characteristicValue
      });
    } catch (_) {
      /* 已失效或歧义路径不投递。 */
    }
  }
}
