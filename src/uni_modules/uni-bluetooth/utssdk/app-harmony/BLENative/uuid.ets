import { BluetoothRuntimeError } from './errors';

export function normalizeUuid(value: string): string {
  const compact = value.trim().toLowerCase();
  if (/^[0-9a-f]{4}$/.test(compact)) {
    return `0000${compact}-0000-1000-8000-00805f9b34fb`;
  }
  if (/^[0-9a-f]{8}$/.test(compact)) {
    return `${compact}-0000-1000-8000-00805f9b34fb`;
  }
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(compact)) {
    return compact;
  }
  throw new BluetoothRuntimeError(1509601, 'Invalid Bluetooth UUID', 'parameter');
}
