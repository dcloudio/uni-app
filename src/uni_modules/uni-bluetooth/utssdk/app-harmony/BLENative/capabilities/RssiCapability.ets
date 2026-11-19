import { BluetoothPort } from '../types';
import { DeviceSession } from '../DeviceSessionStore';
import { RequestContext } from '../DeviceRequestQueue';
import { BluetoothRuntimeError } from '../errors';

export class RssiCapability {
  private port: BluetoothPort;

  constructor(port: BluetoothPort) {
    this.port = port;
  }

  read(session: DeviceSession): Promise<number> {
    return session.queue.submit(
      async (_context: RequestContext): Promise<number> => {
        if (session.state !== 'connected') {
          throw new BluetoothRuntimeError(1509003, 'Connection ended', 'rssi');
        }
        return await this.port.rssi(session.deviceId);
      }
    );
  }
}
