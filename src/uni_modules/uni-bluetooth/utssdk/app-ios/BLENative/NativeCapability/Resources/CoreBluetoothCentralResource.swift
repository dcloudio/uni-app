import CoreBluetooth
import Foundation

/// CoreBluetooth adapter for the constructible Native resource handles.
final class CoreBluetoothCentralResource: NSObject, BluetoothRuntimeResource, CoreBluetoothCentralPort, CBCentralManagerDelegate, CBPeripheralDelegate {
    private let callbackQueue: DispatchQueue
    private let handlers: BluetoothResourceHandlers
    private(set) var central: CBCentralManager?
    private(set) var generation: UInt64 = 0
    private(set) var resourceToken: UUID = UUID()
    var resourceGeneration: UInt64 { generation }
    private var peripherals: [UUID: BluetoothPeripheralHandle] = [:]
    private var services: [ObjectIdentifier: BluetoothServiceHandle] = [:]
    private var characteristics: [ObjectIdentifier: BluetoothCharacteristicHandle] = [:]
    // Snapshot cancellation generations before a reconnect rebinds the shared peripheral handle.
    private var pendingDisconnectGenerations: [UUID: [ConnectionGeneration]] = [:]

    var state: CBManagerState { central?.state ?? .unknown }
    var isScanning: Bool { central?.isScanning ?? false }

    required init(queue: DispatchQueue, handlers: BluetoothResourceHandlers) {
        self.callbackQueue = queue; self.handlers = handlers; super.init()
    }

    func start() {
        dispatchPrecondition(condition: .onQueue(callbackQueue))
        guard central == nil else { return }
        generation &+= 1
        resourceToken = UUID()
        central = CBCentralManager(delegate: self, queue: callbackQueue)
    }

    func invalidateResource() {
        dispatchPrecondition(condition: .onQueue(callbackQueue))
        peripherals.values.forEach { $0.coreBluetoothPeripheral?.delegate = nil }
        peripherals.removeAll()
        services.removeAll()
        characteristics.removeAll()
        pendingDisconnectGenerations.removeAll()
        generation &+= 1
        resourceToken = UUID()
    }

    func stop() {
        dispatchPrecondition(condition: .onQueue(callbackQueue))
        if let manager = central {
            if manager.isScanning { manager.stopScan() }
            manager.delegate = nil
            central = nil
        }
        invalidateResource()
    }
    func startScan(services: [CBUUID]?, allowDuplicates: Bool) {
        dispatchPrecondition(condition: .onQueue(callbackQueue))
        central?.scanForPeripherals(withServices: services, options: [CBCentralManagerScanOptionAllowDuplicatesKey: allowDuplicates])
    }
    func stopScan() { dispatchPrecondition(condition: .onQueue(callbackQueue)); central?.stopScan() }
    @discardableResult
    func connect(_ peripheral: BluetoothPeripheralHandle) -> Bool {
        dispatchPrecondition(condition: .onQueue(callbackQueue))
        guard let value = peripheral.coreBluetoothPeripheral, let central else {
            return false
        }
        peripheral.state = .connecting
        central.connect(value)
        return true
    }
    func isDisconnectPending(_ peripheral: BluetoothPeripheralHandle) -> Bool {
        dispatchPrecondition(condition: .onQueue(callbackQueue))
        return !(pendingDisconnectGenerations[peripheral.identifier]?.isEmpty ?? true)
    }
    func disconnect(_ peripheral: BluetoothPeripheralHandle) {
        dispatchPrecondition(condition: .onQueue(callbackQueue))
        guard let value = peripheral.coreBluetoothPeripheral, let central else { return }
        if let connectionGeneration = peripheral.connectionGeneration,
           pendingDisconnectGenerations[peripheral.identifier]?.last != connectionGeneration {
            pendingDisconnectGenerations[peripheral.identifier, default: []].append(connectionGeneration)
        }
        peripheral.state = .disconnecting
        central.cancelPeripheralConnection(value)
    }
    func cancelConnection(_ peripheral: BluetoothPeripheralHandle) { disconnect(peripheral) }
    func releasePeripheral(device: PlatformDeviceID) {
        dispatchPrecondition(condition: .onQueue(callbackQueue))
        guard let handle = peripherals[device.rawValue],
              handle.state != .connecting, handle.state != .connected else { return }
        handle.coreBluetoothPeripheral?.delegate = nil
        peripherals.removeValue(forKey: device.rawValue)
        services = services.filter { $0.value.ownerPeripheralIdentifier != device.rawValue }
        characteristics = characteristics.filter { $0.value.ownerPeripheralIdentifier != device.rawValue }
    }
    func discoverServices(_ peripheral: BluetoothPeripheralHandle, services: [CBUUID]? = nil) {
        dispatchPrecondition(condition: .onQueue(callbackQueue)); peripheral.coreBluetoothPeripheral?.discoverServices(services)
    }
    func discoverCharacteristics(_ peripheral: BluetoothPeripheralHandle, for service: BluetoothServiceHandle) {
        dispatchPrecondition(condition: .onQueue(callbackQueue));
        if let cbService = service.coreBluetoothService { peripheral.coreBluetoothPeripheral?.discoverCharacteristics(nil, for: cbService) }
    }
    func setNotifyValue(_ enabled: Bool, peripheral: BluetoothPeripheralHandle, characteristic: BluetoothCharacteristicHandle) {
        dispatchPrecondition(condition: .onQueue(callbackQueue));
        if let cbCharacteristic = characteristic.coreBluetoothCharacteristic {
            peripheral.coreBluetoothPeripheral?.setNotifyValue(enabled, for: cbCharacteristic)
        }
    }
    func readValue(_ peripheral: BluetoothPeripheralHandle, characteristic: BluetoothCharacteristicHandle) {
        dispatchPrecondition(condition: .onQueue(callbackQueue));
        if let cbCharacteristic = characteristic.coreBluetoothCharacteristic {
            peripheral.coreBluetoothPeripheral?.readValue(for: cbCharacteristic)
        }
    }
    func readRSSI(_ peripheral: BluetoothPeripheralHandle) {
        dispatchPrecondition(condition: .onQueue(callbackQueue)); peripheral.coreBluetoothPeripheral?.readRSSI()
    }
    func writeValue(_ value: Data, peripheral: BluetoothPeripheralHandle, characteristic: BluetoothCharacteristicHandle, type: CBCharacteristicWriteType) {
        dispatchPrecondition(condition: .onQueue(callbackQueue));
        guard let cbCharacteristic = characteristic.coreBluetoothCharacteristic,
              let cbPeripheral = peripheral.coreBluetoothPeripheral else {
            return
        }
        cbPeripheral.writeValue(value, for: cbCharacteristic, type: type)
    }
    func maximumWriteValueLength(for peripheral: BluetoothPeripheralHandle, type: CBCharacteristicWriteType) -> Int {
        if let value = peripheral.coreBluetoothPeripheral { return value.maximumWriteValueLength(for: type) }
        return type == .withResponse ? peripheral.maximumWriteWithResponseLength : peripheral.maximumWriteWithoutResponseLength
    }

    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        callbackQueue.async { [weak self] in
            guard let self else { return }
            guard let current = self.central, current === central else {
                self.handlers.ingressRejected?(.staleCentral)
                return
            }
            self.handlers.state(central.state)
        }
    }
    func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String: Any], rssi RSSI: NSNumber) {
        guard self.central === central else { handlers.ingressRejected?(.staleCentral); return }
        guard let handle = registerDiscoveredPeripheral(peripheral) else {
            handlers.ingressRejected?(.stalePeripheral)
            return
        }
        handlers.discovery?(handle, advertisementData, RSSI)
    }
    func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
        guard self.central === central else {
            handlers.ingressRejected?(.staleCentral); return
        }
        guard let handle = currentPeripheralHandle(peripheral) else {
            handlers.ingressRejected?(.stalePeripheral); return
        }
        handle.state = .connected
        peripheral.delegate = self
        handlers.connection?(handle, true, nil, handle.connectionGeneration)
    }
    func centralManager(_ central: CBCentralManager, didFailToConnect peripheral: CBPeripheral, error: Error?) {
        guard self.central === central else {
            handlers.ingressRejected?(.staleCentral); return
        }
        guard let handle = currentPeripheralHandle(peripheral) else {
            handlers.ingressRejected?(.stalePeripheral); return
        }
        // Deferred reconnect admission guarantees that an outstanding cancellation
        // remains the oldest attempt until CoreBluetooth acknowledges it.
        let callbackGeneration = consumePendingDisconnectGeneration(device: peripheral.identifier) ?? handle.connectionGeneration
        handle.state = .disconnected
        handlers.connection?(handle, false, error, callbackGeneration)
    }
    func centralManager(_ central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: Error?) {
        guard self.central === central else {
            handlers.ingressRejected?(.staleCentral); return
        }
        guard let handle = currentPeripheralHandle(peripheral) else {
            handlers.ingressRejected?(.stalePeripheral); return
        }
        let callbackGeneration = consumePendingDisconnectGeneration(device: peripheral.identifier) ?? handle.connectionGeneration
        handle.state = .disconnected
        handlers.connection?(handle, false, error, callbackGeneration)
    }
    func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
        guard let handle = currentPeripheralHandle(peripheral) else { handlers.ingressRejected?(.stalePeripheral); return }
        let values = peripheral.services?.map { serviceHandle($0, peripheral: handle) }; handle.install(values ?? []); handlers.gatt?(handle, values, error)
    }
    func peripheral(_ peripheral: CBPeripheral, didDiscoverCharacteristicsFor service: CBService, error: Error?) {
        guard let peripheralHandle = currentPeripheralHandle(peripheral) else { handlers.ingressRejected?(.stalePeripheral); return }
        let serviceHandle = self.serviceHandle(service, peripheral: peripheralHandle)
        let values = service.characteristics?.map { characteristicHandle($0, peripheral: peripheralHandle) }; serviceHandle.install(values ?? []); handlers.characteristics?(peripheralHandle, serviceHandle, values, error)
    }
    func peripheral(_ peripheral: CBPeripheral, didModifyServices invalidatedServices: [CBService]) {
        guard let handle = currentPeripheralHandle(peripheral) else { handlers.ingressRejected?(.stalePeripheral); return }
        handlers.servicesModified?(handle, invalidatedServices.map { serviceHandle($0, peripheral: handle) })
    }
    func peripheral(_ peripheral: CBPeripheral, didUpdateNotificationStateFor characteristic: CBCharacteristic, error: Error?) {
        guard let peripheralHandle = currentPeripheralHandle(peripheral) else { handlers.ingressRejected?(.stalePeripheral); return }
        let handle = characteristicHandle(characteristic, peripheral: peripheralHandle); handle.isNotifying = characteristic.isNotifying
        handlers.notification?(peripheralHandle, handle, error)
    }
    func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?) {
        guard let peripheralHandle = currentPeripheralHandle(peripheral) else { handlers.ingressRejected?(.stalePeripheral); return }
        let handle = characteristicHandle(characteristic, peripheral: peripheralHandle); handle.value = characteristic.value
        handlers.value?(peripheralHandle, handle, error)
    }
    func peripheral(_ peripheral: CBPeripheral, didReadRSSI RSSI: NSNumber, error: Error?) {
        guard let handle = currentPeripheralHandle(peripheral) else { handlers.ingressRejected?(.stalePeripheral); return }
        handlers.rssi?(handle, RSSI, error)
    }
    func peripheral(_ peripheral: CBPeripheral, didWriteValueFor characteristic: CBCharacteristic, error: Error?) {
        guard let handle = currentPeripheralHandle(peripheral) else { handlers.ingressRejected?(.stalePeripheral); return }
        handlers.write?(handle, characteristicHandle(characteristic, peripheral: handle), error)
    }
    func peripheralIsReady(toSendWriteWithoutResponse peripheral: CBPeripheral) {
        guard let handle = currentPeripheralHandle(peripheral) else { handlers.ingressRejected?(.stalePeripheral); return }
        handle.canSendWriteWithoutResponse = peripheral.canSendWriteWithoutResponse; handlers.writeReady?(handle)
    }

    private func registerDiscoveredPeripheral(_ peripheral: CBPeripheral) -> BluetoothPeripheralHandle? {
        if let handle = peripherals[peripheral.identifier], handle.coreBluetoothPeripheral === peripheral {
            handle.state = peripheral.state; handle.canSendWriteWithoutResponse = peripheral.canSendWriteWithoutResponse
            handle.bindResource(token: resourceToken, generation: generation, underlyingPeripheral: peripheral)
            return handle
        }
        if let handle = peripherals[peripheral.identifier], handle.state == .connecting || handle.state == .connected {
            return nil
        }
        let handle = BluetoothPeripheralHandle(identifier: peripheral.identifier, state: peripheral.state, canSendWriteWithoutResponse: peripheral.canSendWriteWithoutResponse)
        handle.bindResource(token: resourceToken, generation: generation, underlyingPeripheral: peripheral)
        peripherals[peripheral.identifier] = handle; return handle
    }

    private func currentPeripheralHandle(_ peripheral: CBPeripheral) -> BluetoothPeripheralHandle? {
        guard let handle = peripherals[peripheral.identifier],
              handle.coreBluetoothPeripheral === peripheral,
              handle.underlyingPeripheralIdentity == ObjectIdentifier(peripheral),
              handle.resourceToken == resourceToken,
              handle.resourceGeneration == generation else { return nil }
        handle.state = peripheral.state
        handle.canSendWriteWithoutResponse = peripheral.canSendWriteWithoutResponse
        return handle
    }

    private func consumePendingDisconnectGeneration(device: UUID) -> ConnectionGeneration? {
        guard var generations = pendingDisconnectGenerations[device], !generations.isEmpty else { return nil }
        let generation = generations.removeFirst()
        if generations.isEmpty {
            pendingDisconnectGenerations.removeValue(forKey: device)
        } else {
            pendingDisconnectGenerations[device] = generations
        }
        return generation
    }

    private func serviceHandle(_ service: CBService, peripheral: BluetoothPeripheralHandle) -> BluetoothServiceHandle {
        let key = ObjectIdentifier(service)
        if let value = services[key], value.ownerPeripheralIdentifier == peripheral.identifier,
           value.ownerResourceToken == resourceToken, value.ownerResourceGeneration == generation {
            return value
        }
        let value = BluetoothServiceHandle(uuid: BluetoothUUID(coreBluetooth: service.uuid) ?? BluetoothUUID(canonical128: UUID()), isPrimary: service.isPrimary)
        value.coreBluetoothService = service
        value.bindProvenance(peripheral: peripheral)
        services[key] = value
        return value
    }
    private func characteristicHandle(_ characteristic: CBCharacteristic, peripheral: BluetoothPeripheralHandle) -> BluetoothCharacteristicHandle {
        let key = ObjectIdentifier(characteristic)
        if let value = characteristics[key], value.ownerPeripheralIdentifier == peripheral.identifier,
           value.ownerResourceToken == resourceToken, value.ownerResourceGeneration == generation {
            return value
        }
        let value = BluetoothCharacteristicHandle(uuid: BluetoothUUID(coreBluetooth: characteristic.uuid) ?? BluetoothUUID(canonical128: UUID()), properties: characteristic.properties.rawValue, value: characteristic.value, isNotifying: characteristic.isNotifying)
        value.coreBluetoothCharacteristic = characteristic
        value.bindProvenance(peripheral: peripheral)
        characteristics[key] = value
        return value
    }
}
