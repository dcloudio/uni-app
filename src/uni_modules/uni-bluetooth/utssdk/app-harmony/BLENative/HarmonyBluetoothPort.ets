import { access, ble, connection } from '@kit.ConnectivityKit';
import { BusinessError, deviceInfo, systemDateTime } from '@kit.BasicServicesKit';
import { abilityAccessCtrl, common, Permissions } from '@kit.AbilityKit';
import {
  AdapterSnapshot,
  BluetoothPort,
  PowerListener,
  ScanListener,
  ConnectionListener,
  ValueListener,
  MtuListener
} from './types';
import { BluetoothRuntimeError, systemBluetoothError } from './errors';

class ClientBinding {
  client: ble.GattClientDevice;
  active: boolean = true;
  closed: boolean = false;
  connectionObserved: boolean = false;
  valueObserved: boolean = false;
  mtuObserved: boolean = false;
  connection: (state: ble.BLEConnectionChangeState) => void;
  value: (value: ble.BLECharacteristic) => void;
  mtu: (mtu: number) => void;

  constructor(
    client: ble.GattClientDevice,
    connectionHandler: (state: ble.BLEConnectionChangeState) => void,
    valueHandler: (value: ble.BLECharacteristic) => void,
    mtuHandler: (mtu: number) => void
  ) {
    this.client = client;
    this.connection = (state: ble.BLEConnectionChangeState): void => {
      if (this.active) {
        connectionHandler(state);
      }
    };
    this.value = (value: ble.BLECharacteristic): void => {
      if (this.active) {
        valueHandler(value);
      }
    };
    this.mtu = (mtu: number): void => {
      if (this.active) {
        mtuHandler(mtu);
      }
    };
  }
}

class ScanOperation {
  readonly deadline: number;
  readonly phase: string;
  readonly resolve: () => void;
  readonly reject: (error: Error) => void;
  timer: number = -1;
  callerSettled: boolean = false;

  constructor(deadline: number, phase: string, resolve: () => void, reject: (error: Error) => void) {
    this.deadline = deadline;
    this.phase = phase;
    this.resolve = resolve;
    this.reject = reject;
  }
}

class ScanBinding {
  readonly scanner: ble.BleScanner;
  handler: ((report: ble.ScanReport) => void) | undefined = undefined;
  active: boolean = false;
  retired: boolean = false;
  needsStop: boolean = false;
  operation: ScanOperation | undefined = undefined;

  constructor(scanner: ble.BleScanner) {
    this.scanner = scanner;
  }
}

export class HarmonyBluetoothPort implements BluetoothPort {
  private powerHandler: ((state: access.BluetoothState) => void) | undefined = undefined;
  // 只保留一个 scanner；本地超时不代表系统已完成，未决期间禁止创建替代扫描。
  private scan: ScanBinding | undefined = undefined;
  private scanGeneration: number = 0;
  private clients: Map<string, ClientBinding> = new Map();
  // 关闭失败的 client 只用于重试清理，禁止再用于 GATT 操作。
  private pendingClientCleanup: Map<string, ClientBinding> = new Map();

  monotonicNowMs(): number {
    return systemDateTime.getUptime(systemDateTime.TimeType.STARTUP, false);
  }

  normalizeConnectionDeviceId(deviceId: string): string | undefined {
    return /^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/.test(deviceId)
      ? deviceId.toUpperCase()
      : undefined;
  }

  isValidRandomDeviceId(deviceId: string): boolean {
    try {
      return access.isValidRandomDeviceId(deviceId);
    } catch (e) {
      // 权限、蓝牙状态及系统异常须保留原始错误，不能当作地址已失效。
      throw this.error(e as Error, 'validateDeviceId');
    }
  }

  async requestBluetoothPermission(context: common.UIAbilityContext): Promise<void> {
    const permission: Permissions = 'ohos.permission.ACCESS_BLUETOOTH';
    try {
      const result = await abilityAccessCtrl
        .createAtManager()
        .requestPermissionsFromUser(context, [permission]);
      const index = result.permissions.indexOf(permission);
      if (index < 0 || index >= result.authResults.length) {
        throw new BluetoothRuntimeError(
          1500104,
          'Missing Bluetooth permission result',
          'permission'
        );
      }
      const status = result.authResults[index];
      const reason = result.errorReasons?.[index];
      const hasReason = result.errorReasons === undefined || reason !== undefined;
      const denied = status === abilityAccessCtrl.GrantStatus.PERMISSION_DENIED &&
        hasReason && (reason === undefined || reason === 0);
      // authResults=2 表示请求无效；reason=4 仍明确指向用户未同意隐私声明。
      const privacyDenied = reason === 4 &&
        (status === abilityAccessCtrl.GrantStatus.PERMISSION_DENIED || status === 2);
      // errorReasons=4 means Privacy Statement declined; other nonzero reasons
      // describe request/configuration/service failures, not user denial.
      if (denied || privacyDenied) {
        throw new BluetoothRuntimeError(
          1509602,
          `Bluetooth permission denied (authResult=${status}, errorReason=${reason})`,
          'permission', status, status, reason
        );
      }
      if (
        !hasReason ||
        (reason !== undefined && reason !== 0) ||
        (status !== abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED &&
          status !== abilityAccessCtrl.GrantStatus.PERMISSION_DENIED)
      ) {
        throw new BluetoothRuntimeError(
          1500104,
          `Bluetooth permission request failed (authResult=${status}, errorReason=${reason})`,
          'permission',
          status, status, reason
        );
      }
    } catch (e) {
      throw this.error(e as Error, 'permission');
    }
  }

  observePower(listener: PowerListener): void {
    if (this.powerHandler !== undefined) {
      return;
    }
    const handler = (state: access.BluetoothState): void => {
      listener(this.available(state), state === access.BluetoothState.STATE_OFF);
    };
    try {
      access.on('stateChange', handler);
      this.powerHandler = handler;
    } catch (e) {
      throw this.error(e as Error, 'observeAdapter');
    }
  }

  removePowerObserver(): void {
    const handler = this.powerHandler;
    if (handler === undefined) {
      return;
    }
    try {
      access.off('stateChange', handler);
      this.powerHandler = undefined;
    } catch (e) {
      // 保留准确引用，允许下一次清理重试，禁止 off(type) 清掉其他使用者。
      throw this.error(e as Error, 'removeAdapterObserver');
    }
  }

  getPower(): AdapterSnapshot {
    return { available: this.available(this.state()), discovering: false };
  }

  isPoweredOff(): boolean {
    return this.state() === access.BluetoothState.STATE_OFF;
  }

  async startDiscovery(
    filters: ble.ScanFilter[],
    options: ble.ScanOptions,
    listener: ScanListener,
    deadline: number = this.monotonicNowMs() + 10000
  ): Promise<void> {
    // 替换旧 scanner 的清理和新启动共用固定期限，不因 await 重新计时。
    const generation = this.scanGeneration;
    const previous = this.scan;
    if (previous !== undefined) {
      this.ensureScanResolved(previous);
      await this.stopScanBinding(previous, deadline);
      if (this.scan !== previous || generation !== this.scanGeneration) {
        throw new BluetoothRuntimeError(1509000, 'Scan start cancelled', 'discovery');
      }
    }
    // close 可发生在上面的 await 期间，退役标记不能作为新一轮回调开关复用。
    const binding = this.createScanBinding();
    this.scan = binding;
    const handler = (report: ble.ScanReport): void => {
      if (this.scan === binding && binding.active && !binding.retired) {
        const operation = binding.operation;
        // 后台 timer 可能延迟；先到的广播也不能越过启动期限。
        if (operation !== undefined && this.monotonicNowMs() >= operation.deadline) {
          this.retireScan(binding);
          this.settleScan(operation, this.scanTimeout(operation.phase));
          return;
        }
        listener(report.scanResult);
      }
    };
    binding.handler = handler;
    binding.active = true;
    try {
      binding.scanner.on('BLEDeviceFind', handler);
      if (binding.retired || generation !== this.scanGeneration) {
        throw new BluetoothRuntimeError(1509000, 'Scan start cancelled', 'discovery');
      }
      // SDK 文档要求无过滤传 null，声明遗漏了 null，仅在系统边界适配。
      const systemFilters: ble.ScanFilter[] | null = filters.length === 0 ? null : filters;
      await this.executeScan(binding, 'startDiscovery', deadline, (): Promise<void> => {
        binding.needsStop = true;
        return binding.scanner.startScan(systemFilters as ble.ScanFilter[], options);
      });
    } catch (e) {
      this.retireScan(binding);
      this.cleanupScan(binding);
      throw this.error(e as Error, 'startDiscovery');
    }
  }

  async stopDiscovery(deadline: number = this.monotonicNowMs() + 10000): Promise<void> {
    const binding = this.scan;
    if (binding === undefined) {
      return;
    }
    this.ensureScanResolved(binding);
    await this.stopScanBinding(binding, deadline);
  }

  removeDiscoveryObserver(): void {
    ++this.scanGeneration;
    const binding = this.scan;
    if (binding === undefined) {
      return;
    }
    // close 立即结束本地等待，但保留未决系统槽；迟到结果只操作捕获的 binding。
    binding.retired = true;
    const operation = binding.operation;
    if (operation !== undefined) {
      this.settleScan(operation, new BluetoothRuntimeError(
        1509000, 'Scan operation cancelled by adapter reset or close', 'discovery'
      ) as Error);
    }
    this.removeScanObserver(binding);
  }

  private createScanBinding(): ScanBinding {
    try {
      return new ScanBinding(ble.createBleScanner());
    } catch (e) {
      throw this.error(e as Error, 'startDiscovery');
    }
  }

  private ensureScanResolved(binding: ScanBinding): void {
    if (binding.operation !== undefined) {
      throw new BluetoothRuntimeError(
        1509000, 'Previous scan system operation is unresolved', 'scanUnresolved'
      );
    }
  }

  private removeScanObserver(binding: ScanBinding): void {
    binding.active = false;
    const handler = binding.handler;
    if (handler === undefined) {
      return;
    }
    try {
      binding.scanner.off('BLEDeviceFind', handler);
      binding.handler = undefined;
    } catch (e) {
      // 先屏蔽旧事件；保留引用供下一次清理重试。
      throw this.error(e as Error, 'removeScanObserver');
    }
  }

  private retireScan(binding: ScanBinding): void {
    binding.retired = true;
    try {
      this.removeScanObserver(binding);
    } catch (_) {
      // 退役标记已屏蔽回调；保留清理状态供后续处理。
    }
  }

  private async stopScanBinding(binding: ScanBinding, deadline: number): Promise<void> {
    binding.retired = true;
    let failure: Error | undefined = undefined;
    try {
      this.removeScanObserver(binding);
    } catch (e) {
      failure = e as Error;
    }
    if (binding.needsStop) {
      await this.executeScan(binding, 'stopDiscovery', deadline,
        (): Promise<void> => binding.scanner.stopScan());
    }
    if (failure !== undefined) {
      throw failure;
    }
  }

  private cleanupScan(binding: ScanBinding): void {
    if (binding.operation !== undefined || !binding.needsStop) {
      return;
    }
    // 迟到启动无论成功/失败都尝试停止；不自动重试，不创建新 scanner。
    this.stopScanBinding(binding, this.monotonicNowMs() + 10000).catch((): void => {
      // 异步清理失败不产生未处理的 Promise 拒绝。
    });
  }

  private executeScan(
    binding: ScanBinding,
    phase: string,
    deadline: number,
    invoke: () => Promise<void>
  ): Promise<void> {
    return new Promise<void>((resolve, reject): void => {
      const operation = new ScanOperation(deadline, phase, resolve, reject);
      if (this.monotonicNowMs() >= deadline) {
        this.retireScan(binding);
        this.settleScan(operation, this.scanTimeout(phase));
        return;
      }
      binding.operation = operation;
      this.armScanTimeout(binding, operation);
      try {
        invoke().then(
          (): void => this.completeScan(binding, operation),
          (error: Error): void => this.completeScan(binding, operation, this.error(error, phase))
        );
      } catch (e) {
        this.completeScan(binding, operation, this.error(e as Error, phase));
      }
    });
  }

  private completeScan(binding: ScanBinding, operation: ScanOperation, error?: Error): void {
    if (binding.operation !== operation) {
      return;
    }
    binding.operation = undefined;
    if (operation.phase === 'stopDiscovery' && error === undefined) {
      binding.needsStop = false;
    }
    if (!operation.callerSettled) {
      if (this.monotonicNowMs() >= operation.deadline) {
        this.retireScan(binding);
        this.settleScan(operation, this.scanTimeout(operation.phase));
      } else {
        this.settleScan(operation, error);
      }
    }
    if (binding.retired && operation.phase === 'startDiscovery') {
      this.cleanupScan(binding);
    }
  }

  private armScanTimeout(binding: ScanBinding, operation: ScanOperation): void {
    operation.timer = setTimeout((): void => {
      if (binding.operation !== operation || operation.callerSettled) {
        return;
      }
      // 包含休眠的单调期限；提前唤醒仅重排剩余时间。
      if (this.monotonicNowMs() < operation.deadline) {
        this.armScanTimeout(binding, operation);
        return;
      }
      this.retireScan(binding);
      this.settleScan(operation, this.scanTimeout(operation.phase));
    }, Math.max(0, operation.deadline - this.monotonicNowMs()));
  }

  private scanTimeout(phase: string): Error {
    return new BluetoothRuntimeError(
      1509005, 'Scan system operation timed out; outcomeUnknown', phase
    ) as Error;
  }

  private settleScan(operation: ScanOperation, error?: Error): void {
    if (operation.callerSettled) {
      return;
    }
    operation.callerSettled = true;
    clearTimeout(operation.timer);
    operation.timer = -1;
    if (error === undefined) {
      operation.resolve();
    } else {
      operation.reject(error);
    }
  }

  getConnectedDevices(): string[] {
    if (deviceInfo.sdkApiVersion < 21) {
      throw new BluetoothRuntimeError(
        1500105,
        'System GATT client query requires API21',
        'connectedDevices'
      );
    }
    try {
      return ble.getConnectedBLEDevices(ble.BleProfile.GATT_CLIENT);
    } catch (e) {
      throw this.error(e as Error, 'connectedDevices');
    }
  }

  deviceName(deviceId: string): string {
    try {
      return connection.getRemoteDeviceName(deviceId);
    } catch (_) {
      return '';
    } // 名称为可选元数据，不覆盖查询本身的错误。
  }

  createClient(
    deviceId: string,
    listener: ConnectionListener,
    valueListener: ValueListener,
    mtuListener: MtuListener
  ): void {
    let binding: ClientBinding | undefined = undefined;
    try {
      if (this.clients.has(deviceId)) {
        throw new BluetoothRuntimeError(1509000, 'Client already exists', 'createClient');
      }
      if (this.pendingClientCleanup.has(deviceId)) {
        this.closeClient(deviceId);
      }
      const client = ble.createGattClientDevice(deviceId);
      binding = new ClientBinding(
        client,
        (state: ble.BLEConnectionChangeState): void => listener(deviceId, state),
        (value: ble.BLECharacteristic): void => valueListener(deviceId, value),
        (mtu: number): void => {
          mtuListener(deviceId, mtu);
        }
      );
      client.on('BLEConnectionStateChange', binding.connection);
      binding.connectionObserved = true;
      client.on('BLECharacteristicChange', binding.value);
      binding.valueObserved = true;
      client.on('BLEMtuChange', binding.mtu);
      binding.mtuObserved = true;
      this.clients.set(deviceId, binding);
    } catch (e) {
      if (binding !== undefined) {
        this.pendingClientCleanup.set(deviceId, binding);
        this.releaseBinding(binding);
        if (binding.closed) {
          this.pendingClientCleanup.delete(deviceId);
        }
      }
      throw this.error(e as Error, 'createClient');
    }
  }

  private client(deviceId: string): ble.GattClientDevice {
    const binding = this.clients.get(deviceId);
    if (binding === undefined) {
      throw new BluetoothRuntimeError(1509003, 'BLE client does not exist', 'connection');
    }
    return binding.client;
  }

  connect(deviceId: string): void {
    try {
      this.client(deviceId).connect();
    } catch (e) {
      throw this.error(e as Error, 'connect');
    }
  }

  disconnect(deviceId: string): void {
    try {
      this.client(deviceId).disconnect();
    } catch (e) {
      throw this.error(e as Error, 'disconnect');
    }
  }

  closeClient(deviceId: string): void {
    const binding = this.clients.get(deviceId) ?? this.pendingClientCleanup.get(deviceId);
    if (binding === undefined) {
      return;
    }
    this.clients.delete(deviceId);
    this.pendingClientCleanup.set(deviceId, binding);
    const failure = this.releaseBinding(binding);
    if (binding.closed) {
      this.pendingClientCleanup.delete(deviceId);
    }
    if (failure !== undefined) {
      throw failure;
    }
  }

  retryClientCleanup(): void {
    let failure: Error | undefined = undefined;
    const deviceIds = Array.from(this.pendingClientCleanup.keys());
    deviceIds.forEach((deviceId: string): void => {
      try {
        this.closeClient(deviceId);
      } catch (e) {
        if (failure === undefined) {
          failure = e as Error;
        }
      }
    });
    if (failure !== undefined) {
      throw failure as Error;
    }
  }

  private releaseBinding(binding: ClientBinding): Error | undefined {
    // 精确 off 或 close 失败时，已排队的旧事件仍必须立即失效。
    binding.active = false;
    let failure: Error | undefined = undefined;
    try {
      if (binding.connectionObserved) {
        binding.client.off('BLEConnectionStateChange', binding.connection);
        binding.connectionObserved = false;
      }
    } catch (e) {
      failure = this.error(e as Error, 'removeConnectionObserver');
    }
    try {
      if (binding.valueObserved) {
        binding.client.off('BLECharacteristicChange', binding.value);
        binding.valueObserved = false;
      }
    } catch (e) {
      if (failure === undefined) {
        failure = this.error(e as Error, 'removeValueObserver');
      }
    }
    try {
      if (binding.mtuObserved) {
        binding.client.off('BLEMtuChange', binding.mtu);
        binding.mtuObserved = false;
      }
    } catch (e) {
      if (failure === undefined) {
        failure = this.error(e as Error, 'removeMtuObserver');
      }
    }
    try {
      binding.client.close();
      binding.closed = true;
    } catch (e) {
      if (failure === undefined) {
        failure = this.error(e as Error, 'closeClient');
      }
    }
    return failure;
  }

  async services(deviceId: string): Promise<ble.GattService[]> {
    try {
      return await this.client(deviceId).getServices();
    } catch (e) {
      throw this.error(e as Error, 'services');
    }
  }

  async read(
    deviceId: string,
    characteristic: ble.BLECharacteristic
  ): Promise<ble.BLECharacteristic> {
    try {
      return await this.client(deviceId).readCharacteristicValue(characteristic);
    } catch (e) {
      throw this.error(e as Error, 'read');
    }
  }

  async write(
    deviceId: string,
    characteristic: ble.BLECharacteristic,
    type: ble.GattWriteType
  ): Promise<void> {
    try {
      await this.client(deviceId).writeCharacteristicValue(characteristic, type);
    } catch (e) {
      throw this.error(e as Error, 'write');
    }
  }

  async notify(
    deviceId: string,
    characteristic: ble.BLECharacteristic,
    enable: boolean,
    indication: boolean
  ): Promise<void> {
    try {
      if (indication) {
        await this.client(deviceId).setCharacteristicChangeIndication(characteristic, enable);
      } else {
        await this.client(deviceId).setCharacteristicChangeNotification(characteristic, enable);
      }
    } catch (e) {
      throw this.error(e as Error, 'subscription');
    }
  }

  async rssi(deviceId: string): Promise<number> {
    try {
      return await this.client(deviceId).getRssiValue();
    } catch (e) {
      throw this.error(e as Error, 'rssi');
    }
  }

  setMtu(deviceId: string, mtu: number): void {
    try {
      this.client(deviceId).setBLEMtuSize(mtu);
    } catch (e) {
      throw this.error(e as Error, 'mtu');
    }
  }

  private error(error: Error, phase: string): Error {
    if (error instanceof BluetoothRuntimeError) {
      return error as Error;
    }
    const system = error as BusinessError;
    // 类型断言不代表系统来源；普通异常不能补造 code=0 后走系统失败映射。
    if (typeof system.code === 'number' && Number.isFinite(system.code)) {
      return systemBluetoothError(system.code, system.message, phase) as Error;
    }
    return new BluetoothRuntimeError(1509000, error.message, phase) as Error;
  }

  private state(): access.BluetoothState {
    try {
      return access.getState();
    } catch (e) {
      throw this.error(e as Error, 'getAdapterState');
    }
  }

  private available(state: access.BluetoothState): boolean {
    return state === access.BluetoothState.STATE_ON || state === access.BluetoothState.STATE_BLE_ON;
  }
}
