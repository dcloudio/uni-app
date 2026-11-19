import { AdapterSnapshot, BluetoothPort, PowerListener } from '../types';
import { BluetoothRuntimeError } from '../errors';

export class AdapterCapability {
  private initialized: boolean = false;
  private port: BluetoothPort;
  private powerListener: PowerListener;

  constructor(port: BluetoothPort, powerListener: PowerListener) {
    this.port = port;
    this.powerListener = powerListener;
  }

  observe(): void {
    this.port.observePower(this.powerListener);
  }

  open(): void {
    this.observe();
    const state = this.port.getPower();
    if (!state.available) {
      const poweredOff = this.port.isPoweredOff();
      throw new BluetoothRuntimeError(
        poweredOff ? 1509603 : 1500102,
        poweredOff ? 'Bluetooth is powered off' : 'Bluetooth is unavailable',
        'open'
      );
    }
    this.initialized = true;
  }

  close(): void {
    const wasInitialized = this.initialized;
    this.initialized = false;
    this.port.removePowerObserver();
    if (!wasInitialized) {
      throw new BluetoothRuntimeError(1500101, 'Bluetooth adapter is not initialized', 'close');
    }
  }

  removeObserverIfIdle(hasListeners: boolean): void {
    if (!this.initialized && !hasListeners) {
      this.port.removePowerObserver();
    }
  }

  snapshot(): AdapterSnapshot {
    if (!this.initialized) {
      throw new BluetoothRuntimeError(
        1500101,
        'Bluetooth adapter is not initialized',
        'getAdapterState'
      );
    }
    return this.port.getPower();
  }
}
