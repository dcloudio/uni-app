export class BluetoothRuntimeError extends Error {
  readonly uniCode: number;
  readonly platformCode: number;
  readonly phase: string;
  readonly authResult: number | undefined;
  readonly permissionErrorReason: number | undefined;

  constructor(
    uniCode: number, message: string, phase: string, platformCode: number = 0,
    authResult: number | undefined = undefined,
    permissionErrorReason: number | undefined = undefined
  ) {
    super(message);
    this.name = 'BluetoothRuntimeError';
    this.uniCode = uniCode;
    this.platformCode = platformCode;
    this.phase = phase;
    this.authResult = authResult;
    this.permissionErrorReason = permissionErrorReason;
  }
}

export function systemBluetoothError(
  code: number,
  message: string,
  phase: string
): BluetoothRuntimeError {
  let uniCode: number = 1500104;
  switch (code) {
    case 201:
      uniCode = 1509602;
      break;
    case 401:
      uniCode = 1509601;
      break;
    case 801:
    case 2900004: // Profile not supported.
      uniCode = 1500105;
      break;
    case 2900001: // Bluetooth service stopped, not necessarily powered off.
      uniCode = 1500102;
      break;
    case 2900003:
      uniCode = 1509603;
      break;
    case 2901003:
      uniCode = 1509003;
      break;
    case 2901000: // Read forbidden.
    case 2901001: // Write forbidden.
      uniCode = 1509004;
      break;
    case 12100001:
      // AbilityKit context/parameter error; not an authorization denial.
      if (phase === 'permission') {
        uniCode = 1509601;
      }
      break;
    // Busy/congested/resource limits and GATT encryption/authentication/
    // authorization failures remain system failures, not app permission denial.
  }
  return new BluetoothRuntimeError(uniCode, message, phase, code);
}
