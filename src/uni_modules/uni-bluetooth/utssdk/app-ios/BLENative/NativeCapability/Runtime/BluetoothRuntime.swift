import CoreBluetooth
import Foundation

enum ConnectionAdmissionPolicy: Equatable, Sendable {
    case optimistic
    case requireFreshDiscovery
}

enum ConnectionLimitPolicy: Equatable, Sendable {
    case systemManaged
    case applicationManaged
}

struct BluetoothRuntimeConfiguration: Equatable, Sendable {
    let connectionLimitPolicy: ConnectionLimitPolicy
    let maximumConcurrentConnections: Int
    let registryMaximumDeviceCount: Int
    let registryEntryTTLMilliseconds: Int
    let connectionFreshnessWindowMilliseconds: Int
    let connectionAdmissionPolicy: ConnectionAdmissionPolicy
    let maximumPendingOperationsPerDevice: Int
    let maximumOperationsPerLane: Int
    let laneWaitTimeoutMilliseconds: Int
    let writeWithoutResponseMaximumQueuedCountPerDevice: Int
    let writeWithoutResponseMaximumQueuedBytesPerDevice: Int
    let writeWithoutResponseMaximumSubmissionsPerDrain: Int
    let eventMaximumBufferedCountPerType: Int
    let listenerMaximumCountPerEventType: Int
    let quarantinedLaneMaximumCountPerDevice: Int
    let quarantinedLaneMaximumCountPerRuntime: Int
    let discoveryBatchMaximumDeviceCount: Int
    let readNotifyCorrelation: ReadNotifyCorrelationPolicy
    let adapterInitializationTimeoutMilliseconds: Int
    let discoveryTimeoutMilliseconds: Int
    let characteristicOperationTimeoutMilliseconds: Int
    let rssiTimeoutMilliseconds: Int
    init(
        connectionLimitPolicy: ConnectionLimitPolicy = .systemManaged,
        maximumConcurrentConnections: Int = 12,
        registryMaximumDeviceCount: Int = 256,
        registryEntryTTLMilliseconds: Int = 15 * 60 * 1000,
        connectionFreshnessWindowMilliseconds: Int = 30 * 1000,
        connectionAdmissionPolicy: ConnectionAdmissionPolicy = .optimistic,
        maximumPendingOperationsPerDevice: Int = 32,
        maximumOperationsPerLane: Int = 8,
        laneWaitTimeoutMilliseconds: Int = 10_000,
        writeWithoutResponseMaximumQueuedCountPerDevice: Int = 64,
        writeWithoutResponseMaximumQueuedBytesPerDevice: Int = 256 * 1024,
        writeWithoutResponseMaximumSubmissionsPerDrain: Int = 8,
        eventMaximumBufferedCountPerType: Int = 64,
        listenerMaximumCountPerEventType: Int = 16,
        quarantinedLaneMaximumCountPerDevice: Int = 8,
        quarantinedLaneMaximumCountPerRuntime: Int = 32,
        discoveryBatchMaximumDeviceCount: Int = 128,
        readNotifyCorrelation: ReadNotifyCorrelationPolicy = .concurrent,
        adapterInitializationTimeoutMilliseconds: Int = 10_000,
        discoveryTimeoutMilliseconds: Int = 15_000,
        characteristicOperationTimeoutMilliseconds: Int = 10_000,
        rssiTimeoutMilliseconds: Int = 1_000
    ) throws {
        guard (1...64).contains(maximumConcurrentConnections),
              (1...2048).contains(registryMaximumDeviceCount),
              (1000...86_400_000).contains(registryEntryTTLMilliseconds),
              (1000...(5 * 60 * 1000)).contains(connectionFreshnessWindowMilliseconds),
              (1...256).contains(maximumPendingOperationsPerDevice),
              (1...256).contains(maximumOperationsPerLane),
              (1...300_000).contains(laneWaitTimeoutMilliseconds),
              (1...512).contains(writeWithoutResponseMaximumQueuedCountPerDevice),
              (1024...(4 * 1024 * 1024)).contains(writeWithoutResponseMaximumQueuedBytesPerDevice),
              (1...32).contains(writeWithoutResponseMaximumSubmissionsPerDrain),
              (1...512).contains(eventMaximumBufferedCountPerType),
              (1...64).contains(listenerMaximumCountPerEventType),
              (1...32).contains(quarantinedLaneMaximumCountPerDevice),
              (1...256).contains(quarantinedLaneMaximumCountPerRuntime),
              quarantinedLaneMaximumCountPerRuntime >= quarantinedLaneMaximumCountPerDevice,
              (1...512).contains(discoveryBatchMaximumDeviceCount),
              (1...300_000).contains(adapterInitializationTimeoutMilliseconds),
              (1...300_000).contains(discoveryTimeoutMilliseconds),
              (1...300_000).contains(characteristicOperationTimeoutMilliseconds),
              (1...300_000).contains(rssiTimeoutMilliseconds) else {
            throw BluetoothError.invalidParameter("runtime configuration")
        }
        self.connectionLimitPolicy = connectionLimitPolicy
        self.maximumConcurrentConnections = maximumConcurrentConnections
        self.registryMaximumDeviceCount = registryMaximumDeviceCount
        self.registryEntryTTLMilliseconds = registryEntryTTLMilliseconds
        self.connectionFreshnessWindowMilliseconds = connectionFreshnessWindowMilliseconds
        self.connectionAdmissionPolicy = connectionAdmissionPolicy
        self.maximumPendingOperationsPerDevice = maximumPendingOperationsPerDevice
        self.maximumOperationsPerLane = maximumOperationsPerLane
        self.laneWaitTimeoutMilliseconds = laneWaitTimeoutMilliseconds
        self.writeWithoutResponseMaximumQueuedCountPerDevice = writeWithoutResponseMaximumQueuedCountPerDevice
        self.writeWithoutResponseMaximumQueuedBytesPerDevice = writeWithoutResponseMaximumQueuedBytesPerDevice
        self.writeWithoutResponseMaximumSubmissionsPerDrain = writeWithoutResponseMaximumSubmissionsPerDrain
        self.eventMaximumBufferedCountPerType = eventMaximumBufferedCountPerType
        self.listenerMaximumCountPerEventType = listenerMaximumCountPerEventType
        self.quarantinedLaneMaximumCountPerDevice = quarantinedLaneMaximumCountPerDevice
        self.quarantinedLaneMaximumCountPerRuntime = quarantinedLaneMaximumCountPerRuntime
        self.discoveryBatchMaximumDeviceCount = discoveryBatchMaximumDeviceCount
        self.readNotifyCorrelation = readNotifyCorrelation
        self.adapterInitializationTimeoutMilliseconds = adapterInitializationTimeoutMilliseconds
        self.discoveryTimeoutMilliseconds = discoveryTimeoutMilliseconds
        self.characteristicOperationTimeoutMilliseconds = characteristicOperationTimeoutMilliseconds
        self.rssiTimeoutMilliseconds = rssiTimeoutMilliseconds
    }
    static let v1Default = try! Self()
}

private final class DeferredConnectionRequest {
    let id = UUID()
    let timeoutMilliseconds: Int?
    let enqueuedAt: UInt64
    let completion: (Result<ConnectionGeneration, BluetoothError>) -> Void
    var timeoutToken: AnyObject?

    init(
        timeoutMilliseconds: Int?,
        enqueuedAt: UInt64,
        completion: @escaping (Result<ConnectionGeneration, BluetoothError>) -> Void
    ) {
        self.timeoutMilliseconds = timeoutMilliseconds
        self.enqueuedAt = enqueuedAt
        self.completion = completion
    }
}

final class BluetoothRuntime {
    typealias Lifecycle = BluetoothRuntimeLifecycle
    let queue: DispatchQueue
    private let queueKey = DispatchSpecificKey<Bool>()
    let configuration: BluetoothRuntimeConfiguration
    let operations: PendingOperationRegistry
    let sessions: DeviceSessionStore
    let discovery: DiscoveryCapability
    let gatt: GATTProfileCapability
    let subscriptions: SubscriptionCapability
    let metrics: LinkMetricsCapability
    let mtu: MTUCapability
    let io: CharacteristicIOCapability
    let connection: ConnectionCapability
    let events: BluetoothEventHub
    let adapterLifecycle: AdapterLifecycleCapability
    var lifecycle: Lifecycle { adapterLifecycle.lifecycle }
    private(set) var centralResource: BluetoothRuntimeResource?
    private var openWaiters: [UUID: (Result<Void, BluetoothError>) -> Void] = [:]
    private let clock: BluetoothClock
    var resourceToken: UUID? { adapterLifecycle.resourceToken }
    private lazy var delegateRouter = DelegateRouter(runtime: self)
    private var discoveryBatchTimer: AnyObject?
    private let lanes = OperationLaneScheduler()
    private var laneDeadlineRevisions: [OperationID: UUID] = [:]
    private var peripherals: [PlatformDeviceID: BluetoothPeripheralHandle] = [:]
    private var gattOperationTimers: [OperationID: AnyObject] = [:]
    private var deferredConnections: [PlatformDeviceID: DeferredConnectionRequest] = [:]

    init(configuration: BluetoothRuntimeConfiguration = .v1Default) {
        self.configuration = configuration
        let clock = SystemBluetoothClock()
        let sessions = DeviceSessionStore()
        self.clock = clock
        self.adapterLifecycle = AdapterLifecycleCapability(clock: clock)
        self.operations = PendingOperationRegistry()
        self.sessions = sessions
        self.discovery = DiscoveryCapability(
            registry: PeripheralRegistry(
                maximumDeviceCount: configuration.registryMaximumDeviceCount,
                entryTTLMilliseconds: configuration.registryEntryTTLMilliseconds
            ),
            maximumBatchDeviceCount: configuration.discoveryBatchMaximumDeviceCount
        )
        self.gatt = GATTProfileCapability()
        self.subscriptions = SubscriptionCapability()
        self.metrics = LinkMetricsCapability(deadlineMilliseconds: configuration.rssiTimeoutMilliseconds)
        self.mtu = MTUCapability()
        self.io = CharacteristicIOCapability(
            maximumQuarantinedLaneCountPerDevice: configuration.quarantinedLaneMaximumCountPerDevice,
            maximumQuarantinedLaneCountPerRuntime: configuration.quarantinedLaneMaximumCountPerRuntime
        )
        self.connection = ConnectionCapability(sessions: sessions, clock: clock)
        self.events = BluetoothEventHub(
            maximumListeners: configuration.listenerMaximumCountPerEventType,
            maximumBufferedCountPerType: configuration.eventMaximumBufferedCountPerType
        )
        self.queue = DispatchQueue(label: "uni.bluetooth.runtime")
        self.queue.setSpecific(key: queueKey, value: true)
    }
    func withQueue<T>(_ body: () throws -> T) rethrows -> T {
        if DispatchQueue.getSpecific(key: queueKey) == true { return try body() }
        return try queue.sync(execute: body)
    }
    func sync<T>(_ body: @escaping () -> T, completion: @escaping (T) -> Void) {
        queue.async { completion(body()) }
    }

    func beginInitialization() -> Bool {
        dispatchPrecondition(condition: .onQueue(queue))
        guard let resourceToken = adapterLifecycle.beginInitialization() else { return false }
        centralResource = CoreBluetoothCentralResource(queue: queue, handlers: BluetoothResourceHandlers(state: { [weak self] state in
            guard let self else { return }
            guard self.adapterLifecycle.isCurrentResource(resourceToken) else { _ = self.delegateRouter.record(.ignoredStale(.resourceReplaced)); return }
            dispatchPrecondition(condition: .onQueue(self.queue))
            switch state {
            case .poweredOn: _ = self.applyAdapterState(poweredOn: true, resetting: false, adapterState: .poweredOn)
            case .resetting: _ = self.applyAdapterState(poweredOn: false, resetting: true, adapterState: .resetting)
            case .poweredOff: _ = self.applyAdapterState(poweredOn: false, resetting: false, adapterState: .poweredOff)
            case .unauthorized: _ = self.applyAdapterState(poweredOn: false, resetting: false, adapterState: .unauthorized)
            case .unsupported: _ = self.applyAdapterState(poweredOn: false, resetting: false, adapterState: .unsupported)
            case .unknown: _ = self.applyAdapterState(poweredOn: false, resetting: false, adapterState: .unknown)
            @unknown default: _ = self.applyAdapterState(poweredOn: false, resetting: false, adapterState: .unknown)
            }
        }, discovery: { [weak self] peripheral, advertisement, rssi in
            guard let self else { return }
             guard self.adapterLifecycle.isCurrentResource(resourceToken),
                   self.isCurrentResourcePeripheral(peripheral) else { _ = self.delegateRouter.record(.ignoredStale(.resourceReplaced)); return }
             let advertisedLocalName = advertisement[CBAdvertisementDataLocalNameKey] as? String
             let peripheralName = peripheral.coreBluetoothPeripheral?.name
             // iOS may omit LocalName from an advertisement while still exposing
             // the cached CBPeripheral.name. Prefer the advertised value, then
             // fall back to the native peripheral name for display/connection UI.
             let name = advertisedLocalName ?? peripheralName
              let data = advertisement[CBAdvertisementDataManufacturerDataKey] as? Data
             let serviceUUIDs = (advertisement[CBAdvertisementDataServiceUUIDsKey] as? [CBUUID] ?? []).compactMap {
                 BluetoothUUID(coreBluetooth: $0)?.canonical128
             }
             let serviceData = (advertisement[CBAdvertisementDataServiceDataKey] as? [CBUUID: Data] ?? [:]).reduce(into: [String: Data]()) { result, entry in
                 let key = BluetoothUUID(coreBluetooth: entry.key)?.canonical128.uuidString ?? entry.key.uuidString
                 result[key] = entry.value
             }
             let connectable: Bool?
             if let value = advertisement[CBAdvertisementDataIsConnectable] as? Bool {
                 connectable = value
             } else if let value = advertisement[CBAdvertisementDataIsConnectable] as? NSNumber {
                 connectable = value.boolValue
             } else {
                 connectable = nil
             }
             let device = PlatformDeviceID(rawValue: peripheral.identifier)
             let protectedDevices = Set(self.sessions.sessions.keys)
             let decision = self.discovery.consume(
                 device: device,
                 name: name,
                 rssi: rssi,
                 manufacturerData: data,
                 observedAt: self.clock.now,
                 protectedDevices: protectedDevices,
                 localName: advertisedLocalName ?? peripheralName,
                 serviceUUIDs: serviceUUIDs,
                 serviceData: serviceData,
                 connectable: connectable
             )
            guard decision.accepted else {
                _ = self.delegateRouter.record(.ignoredStale(.unknown))
                return
            }
            _ = self.delegateRouter.consumeDiscoveryEvent(device: device, generation: decision.generation)
            decision.removedDevices.forEach {
                self.peripherals.removeValue(forKey: $0)
                self.centralResource?.releasePeripheral(device: $0)
            }
            if decision.registered,
               (self.sessions.sessions[device] == nil || self.peripherals[device] === peripheral) {
                self.peripherals[device] = peripheral
            }
            decision.publications.forEach { self.events.publishDiscovery($0) }
        }, connection: { [weak self] peripheral, connected, error, callbackGeneration in
            guard let self else { return }
            guard self.resourceToken == resourceToken,
                  self.isCurrentResourcePeripheral(peripheral) else {
                _ = self.delegateRouter.record(.ignoredStale(.resourceReplaced)); return
            }
            let device = PlatformDeviceID(rawValue: peripheral.identifier)
            defer {
                if !connected {
                    self.resumeDeferredConnectionIfPossible(device: device)
                }
            }
            guard let session = self.sessions.sessions[device] else {
                if let callbackGeneration,
                   self.connection.isTerminated(device: device, generation: callbackGeneration) {
                    _ = self.delegateRouter.record(.ignoredStale(.terminatedConnection(callbackGeneration)))
                    return
                }
                _ = self.delegateRouter.record(.rejectedNoSession); return
            }
            guard callbackGeneration == session.generation else {
                _ = self.delegateRouter.record(.ignoredStale(.generationMismatch(expected: session.generation, received: callbackGeneration ?? ConnectionGeneration(rawValue: 0))))
                return
            }
            guard let current = self.peripherals[device], current === peripheral else {
                _ = self.delegateRouter.record(.ignoredStale(.peripheralMismatch))
                return
            }
            self.connection.cancelTimeout(device: device)
            if connected {
                let decision = self.delegateRouter.resolve(device: device, generation: session.generation, kind: .connection)
                guard case .consumed(let operation) = decision.consumption, let operation else {
                    // resolve already records the orphan classification.
                    return
                }
                guard case .accepted = self.connection.acceptConnected(device: device, generation: session.generation) else {
                    _ = self.delegateRouter.record(.ignoredStale(.generationMismatch(expected: session.generation, received: session.generation)))
                    return
                }
                self.subscriptions.activate(device: device, generation: session.generation)
                _ = self.finishResolvedOperation(operation, outcome: .connection(session.generation))
            } else {
                if let operation = self.operations.first(device: device, generation: session.generation, kind: .connection) {
                    let decision = self.delegateRouter.resolve(device: device, generation: session.generation, kind: .connection)
                    if case .consumed(let resolved) = decision.consumption, resolved == operation {
                        let platformError = error.map(BluetoothPlatformError.init(error:))
                        let outcome: PendingOperationOutcome = .failure(.connectionFailed(platformError))
                        _ = self.finishResolvedOperation(operation, outcome: outcome)
                    }
                }
                self.cancelQueuedWrites(device: device, generation: session.generation, reason: "disconnect")
                self.cancelPendingOperationsOnDisconnect(device: device, generation: session.generation)
                self.subscriptions.invalidate(device: device, generation: session.generation)
                self.gatt.invalidate(device: device, generation: session.generation)
                _ = self.connection.acceptDisconnected(device: device, generation: session.generation)
            }
            self.events.publishConnection(.init(device: device, generation: session.generation, state: connected ? .connected : .disconnected))
        }, gatt: { [weak self] peripheral, services, error in
            guard let self else { return }
            guard self.resourceToken == resourceToken,
                  self.isCurrentResourcePeripheral(peripheral) else { _ = self.delegateRouter.record(.ignoredStale(.resourceReplaced)); return }
            let device = PlatformDeviceID(rawValue: peripheral.identifier)
            guard let session = self.sessions.sessions[device] else { _ = self.delegateRouter.record(.rejectedNoSession); return }
            guard peripheral.connectionGeneration == session.generation else { _ = self.delegateRouter.record(.ignoredStale(.generationMismatch(expected: session.generation, received: peripheral.connectionGeneration ?? ConnectionGeneration(rawValue: 0)))); return }
            guard session.state == .connected, let current = self.peripherals[device], current === peripheral,
                  let revision = self.gatt.snapshot(device: device, generation: session.generation)?.revision else { _ = self.delegateRouter.record(.ignoredStale(.gattRevisionMismatch)); return }
            if self.consumeDiscoveryOrphan(device: device, generation: session.generation, kind: .serviceDiscovery) { return }
            guard let services else {
                let decision = self.delegateRouter.resolve(device: device, generation: session.generation, kind: .serviceDiscovery, gattRevision: revision)
                guard case .consumed(let operation) = decision.consumption, let operation else { return }
                let outcome: PendingOperationOutcome = error.map { .failure(.platform(BluetoothPlatformError(error: $0))) } ?? .failure(.internalFailure("missing services"))
                _ = self.finishResolvedOperation(operation, outcome: outcome)
                return
            }
            guard case .accepted(let callbackRevision) = self.gatt.classifyServiceDiscoveryCallback(
                device: device,
                generation: session.generation,
                services: services
            ), callbackRevision == revision else {
                _ = self.delegateRouter.record(.ignoredStale(.gattRevisionMismatch))
                return
            }
            let decision = self.delegateRouter.resolve(device: device, generation: session.generation, kind: .serviceDiscovery, gattRevision: revision)
            guard case .consumed(let operation) = decision.consumption, let operation else { return }
            if let error { _ = self.finishResolvedOperation(operation, outcome: .failure(.platform(BluetoothPlatformError(error: error)))); return }
            let commit = self.gatt.commitServiceDiscovery(
                services,
                device: device,
                generation: session.generation,
                revision: revision
            )
            if commit == .rejectedDuplicateUUID {
                self.rejectAmbiguousGATT(operation: operation, device: device, generation: session.generation)
                return
            }
            guard case .accepted = commit else {
                _ = self.delegateRouter.record(.invariantViolation(.init("GATT service discovery commit rejected", device: device)))
                _ = self.finishResolvedOperation(operation, outcome: .failure(.internalFailure("GATT service discovery commit rejected")))
                return
            }
            services.forEach { $0.bindProvenance(peripheral: peripheral, revision: revision) }
            _ = self.finishResolvedOperation(operation, outcome: .gattRevision(revision))
        }, characteristics: { [weak self] peripheral, service, characteristics, error in
            guard let self else { return }
            guard self.resourceToken == resourceToken,
                  self.isCurrentResourcePeripheral(peripheral) else { _ = self.delegateRouter.record(.ignoredStale(.resourceReplaced)); return }
            let device = PlatformDeviceID(rawValue: peripheral.identifier)
            guard let session = self.sessions.sessions[device] else { _ = self.delegateRouter.record(.rejectedNoSession); return }
            guard peripheral.connectionGeneration == session.generation else { _ = self.delegateRouter.record(.ignoredStale(.generationMismatch(expected: session.generation, received: peripheral.connectionGeneration ?? ConnectionGeneration(rawValue: 0)))); return }
            guard session.state == .connected, let current = self.peripherals[device], current === peripheral,
                  let revision = self.gatt.snapshot(device: device, generation: session.generation)?.revision else { _ = self.delegateRouter.record(.ignoredStale(.gattRevisionMismatch)); return }
            if self.consumeDiscoveryOrphan(device: device, generation: session.generation, kind: .characteristicDiscovery, service: ServiceID(uuid: service.uuid)) { return }
            let decision = self.delegateRouter.resolve(device: device, generation: session.generation, kind: .characteristicDiscovery, service: ServiceID(uuid: service.uuid), gattRevision: revision)
            guard case .consumed(let operation) = decision.consumption, let operation else { return }
            if let error { _ = self.finishResolvedOperation(operation, outcome: .failure(.platform(BluetoothPlatformError(error: error)))); return }
            guard let characteristics else { _ = self.finishResolvedOperation(operation, outcome: .failure(.internalFailure("missing characteristics"))); return }
            let commit = self.gatt.commitCharacteristicDiscovery(
                service: service,
                characteristics: characteristics,
                device: device,
                generation: session.generation,
                revision: revision
            )
            if commit == .rejectedDuplicateUUID {
                self.rejectAmbiguousGATT(operation: operation, device: device, generation: session.generation)
                return
            }
            guard case .accepted = commit else {
                _ = self.delegateRouter.record(.invariantViolation(.init("GATT characteristic discovery commit rejected", device: device)))
                _ = self.finishResolvedOperation(operation, outcome: .failure(.internalFailure("GATT characteristic discovery commit rejected")))
                return
            }
            service.bindProvenance(peripheral: peripheral, revision: revision)
            _ = self.finishResolvedOperation(operation, outcome: .gattRevision(revision))
        }, servicesModified: { [weak self] peripheral, _ in
            guard let self else { return }
            guard self.resourceToken == resourceToken,
                  self.isCurrentResourcePeripheral(peripheral) else { _ = self.delegateRouter.record(.ignoredStale(.resourceReplaced)); return }
            let device = PlatformDeviceID(rawValue: peripheral.identifier)
            guard let session = self.sessions.sessions[device] else { _ = self.delegateRouter.record(.rejectedNoSession); return }
            guard peripheral.connectionGeneration == session.generation else { _ = self.delegateRouter.record(.ignoredStale(.generationMismatch(expected: session.generation, received: peripheral.connectionGeneration ?? ConnectionGeneration(rawValue: 0)))); return }
            guard session.state == .connected, let current = self.peripherals[device], current === peripheral else {
                _ = self.delegateRouter.record(.ignoredStale(.peripheralMismatch))
                return
            }
            let generation = session.generation
            switch self.gatt.acceptServiceChanged(
                device: device,
                generation: generation,
                currentServices: peripheral.services,
                operations: self.operations
            ) {
            case .accepted:
                break
            case .rejectedNoSnapshot:
                _ = self.delegateRouter.record(.ignoredStale(.gattRevisionMismatch))
                return
            case .rejectedDiscoveryInFlight:
                _ = self.delegateRouter.record(.ignoredStale(.unknown))
                return
            }
            _ = self.delegateRouter.consumeEvent(device: device, generation: generation, kind: "serviceChanged")
            self.subscriptions.invalidate(device: device, generation: generation)
            self.subscriptions.activate(device: device, generation: generation)
            self.cancelQueuedWrites(device: device, generation: generation, reason: "gattDatabaseChanged")
            self.cancelPendingOperationsOnGATTInvalidation(device: device, generation: generation)
        }, notification: { [weak self] peripheral, characteristic, error in
            guard let self else { return }
            guard self.resourceToken == resourceToken,
                  self.isCurrentResourcePeripheral(peripheral) else { _ = self.delegateRouter.record(.ignoredStale(.resourceReplaced)); return }
            self.handleNotificationState(peripheral: peripheral, characteristic: characteristic, error: error)
        }, value: { [weak self] peripheral, characteristic, error in
            guard let self else { return }
            guard self.resourceToken == resourceToken,
                  self.isCurrentResourcePeripheral(peripheral) else { _ = self.delegateRouter.record(.ignoredStale(.resourceReplaced)); return }
            self.handleCharacteristicValue(peripheral: peripheral, characteristic: characteristic, error: error)
        }, rssi: { [weak self] peripheral, rssi, error in
            guard let self else { return }
            guard self.resourceToken == resourceToken,
                  self.isCurrentResourcePeripheral(peripheral) else { _ = self.delegateRouter.record(.ignoredStale(.resourceReplaced)); return }
            self.handleRSSI(peripheral: peripheral, rssi: rssi, error: error)
        }, write: { [weak self] peripheral, characteristic, error in
            guard let self else { return }
            guard self.resourceToken == resourceToken,
                  self.isCurrentResourcePeripheral(peripheral) else { _ = self.delegateRouter.record(.ignoredStale(.resourceReplaced)); return }
            self.handleWriteResponse(peripheral: peripheral, characteristic: characteristic, error: error)
        }, writeReady: { [weak self] peripheral in
            guard let self else { return }
            guard self.resourceToken == resourceToken,
                  self.isCurrentResourcePeripheral(peripheral) else { _ = self.delegateRouter.record(.ignoredStale(.resourceReplaced)); return }
            let device = PlatformDeviceID(rawValue: peripheral.identifier)
            guard let session = self.sessions.sessions[device] else { _ = self.delegateRouter.record(.rejectedNoSession); return }
            guard let current = self.peripherals[device], current === peripheral else {
                _ = self.delegateRouter.record(.ignoredStale(.peripheralMismatch))
                return
            }
            _ = self.delegateRouter.consumeEvent(device: device, generation: session.generation, kind: "writeReady")
            self.pumpWithoutResponse(device: device)
        }, ingressRejected: { [weak self] rejection in
            guard let self else { return }
            switch rejection {
            case .staleCentral:
                _ = self.delegateRouter.record(.ignoredStale(.resourceReplaced))
            case .stalePeripheral:
                _ = self.delegateRouter.record(.ignoredStale(.peripheralMismatch))
            }
        }))
        centralResource?.start()
        return true
    }

    func open(completion: @escaping (Result<Void, BluetoothError>) -> Void) {
        queue.async { [weak self] in
            guard let self else { return }
            switch self.lifecycle {
            case .ready:
                completion(.success(()))
                return
            case .unavailable:
                self.failAdmission(self.adapterUnavailableError(), completion: completion)
                return
            case .resetting:
                self.failAdmission(self.adapterUnavailableError(for: .resetting), completion: completion)
                return
            case .shuttingDown:
                self.failAdmission(.cancelled("shutdown"), completion: completion)
                return
            case .idle, .initializing:
                break
            }
            self.openWaiters[UUID()] = completion
            if self.lifecycle == .idle {
                _ = self.beginInitialization()
                self.adapterLifecycle.scheduleInitializationTimeout(queue: self.queue, after: self.configuration.adapterInitializationTimeoutMilliseconds) { [weak self] in
                    self?.initializationTimedOut()
                }
            }
        }
    }

    func startDiscovery(options: DiscoveryOptions, completion: @escaping (Result<Void, BluetoothError>) -> Void) {
        queue.async { [weak self] in
            guard let self else { return }
            guard self.lifecycle == .ready, let resource = self.centralResource else {
                self.failAdmission(self.adapterReadinessError(), completion: completion); return
            }
            self.pruneExpiredDiscoveryCache()
            if let timer = self.discoveryBatchTimer { self.clock.cancel(timer) }
            self.discoveryBatchTimer = nil
            let decision = self.discovery.start(options: options)
            if decision.replacesActiveScan { resource.stopScan() }
            let services = options.services?.map { CBUUID(nsuuid: $0.canonical128) }
            resource.startScan(services: services, allowDuplicates: options.allowDuplicates)
             if decision.reportIntervalMilliseconds > 0 {
                 self.scheduleDiscoveryBatch(after: decision.reportIntervalMilliseconds, generation: decision.generation)
             }
             if let adapterState = self.currentAdapterEventState() {
                 self.events.publishAdapterState(.init(state: adapterState, discovering: self.discovery.isDiscovering))
             }
             completion(.success(()))
         }
     }

    func stopDiscovery(completion: @escaping (Result<Void, BluetoothError>) -> Void) {
        queue.async { [weak self] in
            guard let self else { return }
            let pendingBatch = self.discovery.flushBatch()
            self.discovery.stop()
            if let timer = self.discoveryBatchTimer { self.clock.cancel(timer) }
            self.discoveryBatchTimer = nil
            self.centralResource?.stopScan()
            if !pendingBatch.isEmpty { self.events.publishDiscovery(pendingBatch) }
            if let adapterState = self.currentAdapterEventState() {
                self.events.publishAdapterState(.init(state: adapterState, discovering: self.discovery.isDiscovering))
            }
             completion(.success(()))
         }
     }

    func connect(device: PlatformDeviceID, timeoutMilliseconds: Int? = nil, completion: @escaping (Result<ConnectionGeneration, BluetoothError>) -> Void) {
        queue.async { [weak self] in
            guard let self else { return }
            if let timeoutMilliseconds, timeoutMilliseconds <= 0 {
                self.failAdmission(.invalidParameter("timeout"), completion: completion)
                return
            }
            guard self.lifecycle == .ready, let resource = self.centralResource else {
                self.failAdmission(self.adapterReadinessError(), completion: completion); return
            }
            guard let peripheral = self.peripherals[device] else {
                self.failAdmission(.deviceNotFound, completion: completion); return
            }
            if self.sessions.sessions[device] == nil, let error = self.notConnectableError(device: device) {
                self.failAdmission(error, completion: completion)
                return
            }
            if self.sessions.sessions[device] == nil, let error = self.staleDiscoveryError(device: device) {
                self.failAdmission(error, completion: completion)
                return
            }
            if resource.isDisconnectPending(peripheral) {
                self.deferConnection(
                    device: device,
                    timeoutMilliseconds: timeoutMilliseconds,
                    completion: completion
                )
                return
            }
            self.beginConnection(
                device: device,
                peripheral: peripheral,
                resource: resource,
                timeoutMilliseconds: timeoutMilliseconds,
                completion: completion
            )
        }
    }

    private func beginConnection(
        device: PlatformDeviceID,
        peripheral: BluetoothPeripheralHandle,
        resource: any BluetoothRuntimeResource,
        timeoutMilliseconds: Int?,
        completion: @escaping (Result<ConnectionGeneration, BluetoothError>) -> Void
    ) {
        dispatchPrecondition(condition: .onQueue(queue))
        let maximumConcurrentConnections = configuration.connectionLimitPolicy == .applicationManaged
            ? configuration.maximumConcurrentConnections
            : nil
        guard case .success(let session) = connection.begin(
            device: device,
            maximumConcurrentConnections: maximumConcurrentConnections
        ) else {
            if let session = sessions.sessions[device] {
                switch session.state {
                case .connecting, .disconnecting:
                    failAdmission(.connectionInProgress, completion: completion)
                case .connected:
                    failAdmission(.alreadyConnected, completion: completion)
                }
            } else if let maximumConcurrentConnections,
                      sessions.sessions.count >= maximumConcurrentConnections {
                failAdmission(.connectionLimitExceeded, completion: completion)
            } else {
                failAdmission(.internalFailure("connection admission failed"), completion: completion)
            }
            return
        }
        let operation = operations.insert(device: device, generation: session.generation, kind: .connection) { outcome in
            switch outcome {
            case .connection(let generation): completion(.success(generation))
            case .failure(let error): completion(.failure(error))
            default: completion(.failure(.internalFailure("invalid connection outcome")))
            }
        }
        peripheral.bindConnectionGeneration(session.generation)
        guard resource.connect(peripheral) else {
            _ = connection.acceptDisconnected(device: device, generation: session.generation)
            _ = finishGattOperation(operation, outcome: .failure(.deviceNotFound))
            return
        }
        operations.markSubmitted(operation)
        events.publishConnection(.init(device: device, generation: session.generation, state: .connecting))
        if let timeoutMilliseconds {
            connection.scheduleTimeout(device: device, generation: session.generation, queue: queue, after: timeoutMilliseconds) { [weak self] in
                guard let self else { return }
                guard case .accepted = self.connection.acceptTimeout(device: device, generation: session.generation) else {
                    return
                }
                resource.disconnect(peripheral)
                self.events.publishConnection(.init(device: device, generation: session.generation, state: .disconnected))
                _ = self.finishGattOperation(operation, outcome: .failure(.timeout))
            }
        }
    }

    private func deferConnection(
        device: PlatformDeviceID,
        timeoutMilliseconds: Int?,
        completion: @escaping (Result<ConnectionGeneration, BluetoothError>) -> Void
    ) {
        dispatchPrecondition(condition: .onQueue(queue))
        guard deferredConnections[device] == nil else {
            failAdmission(.connectionInProgress, completion: completion)
            return
        }
        let request = DeferredConnectionRequest(
            timeoutMilliseconds: timeoutMilliseconds,
            enqueuedAt: clock.now,
            completion: completion
        )
        deferredConnections[device] = request
        if let timeoutMilliseconds {
            request.timeoutToken = clock.schedule(after: timeoutMilliseconds) { [weak self, weak request] in
                guard let self, let request else { return }
                self.queue.async {
                    guard self.deferredConnections[device]?.id == request.id else { return }
                    self.deferredConnections.removeValue(forKey: device)
                    self.failAdmission(.timeout, completion: request.completion)
                }
            }
        }
    }

    private func resumeDeferredConnectionIfPossible(device: PlatformDeviceID) {
        dispatchPrecondition(condition: .onQueue(queue))
        guard let request = deferredConnections[device] else { return }
        guard lifecycle == .ready,
              let peripheral = peripherals[device],
              let resource = centralResource else {
            finishDeferredConnection(device: device, error: adapterUnavailableError())
            return
        }
        if let error = notConnectableError(device: device) {
            finishDeferredConnection(device: device, error: error)
            return
        }
        if let error = staleDiscoveryError(device: device) {
            finishDeferredConnection(device: device, error: error)
            return
        }
        guard !resource.isDisconnectPending(peripheral) else { return }
        deferredConnections.removeValue(forKey: device)
        if let token = request.timeoutToken { clock.cancel(token) }

        var remainingTimeout = request.timeoutMilliseconds
        if let timeoutMilliseconds = request.timeoutMilliseconds {
            let elapsedNanoseconds = clock.now >= request.enqueuedAt ? clock.now - request.enqueuedAt : 0
            let elapsedMilliseconds = Int(elapsedNanoseconds / 1_000_000)
            remainingTimeout = timeoutMilliseconds - elapsedMilliseconds
            guard remainingTimeout! > 0 else {
                failAdmission(.timeout, completion: request.completion)
                return
            }
        }
        beginConnection(
            device: device,
            peripheral: peripheral,
            resource: resource,
            timeoutMilliseconds: remainingTimeout,
            completion: request.completion
        )
    }

    private func finishDeferredConnection(device: PlatformDeviceID, error: BluetoothError) {
        dispatchPrecondition(condition: .onQueue(queue))
        guard let request = deferredConnections.removeValue(forKey: device) else { return }
        if let token = request.timeoutToken { clock.cancel(token) }
        failAdmission(error, completion: request.completion)
    }

    private func notConnectableError(device: PlatformDeviceID) -> BluetoothError? {
        guard discovery.registry.snapshot(for: device)?.connectable == false else { return nil }
        return .notConnectable
    }

    private func staleDiscoveryError(device: PlatformDeviceID) -> BluetoothError? {
        guard sessions.sessions[device] == nil else { return nil }
        guard let snapshot = discovery.registry.snapshot(for: device) else {
            return .deviceNotFound
        }
        let now = clock.now
        let ageMilliseconds = Int((now >= snapshot.observedAt ? now - snapshot.observedAt : 0) / 1_000_000)
        guard ageMilliseconds > configuration.connectionFreshnessWindowMilliseconds else { return nil }
        guard configuration.connectionAdmissionPolicy == .requireFreshDiscovery else {
            return nil
        }
        return .staleDiscovery(
            ageMilliseconds: ageMilliseconds,
            freshnessWindowMilliseconds: configuration.connectionFreshnessWindowMilliseconds
        )
    }

    func pruneExpiredDiscoveryCache() {
        dispatchPrecondition(condition: .onQueue(queue))
        let now = clock.now
        let ttlNanoseconds = UInt64(discovery.registry.entryTTLMilliseconds) * 1_000_000
        let expiredBefore = now > ttlNanoseconds ? now - ttlNanoseconds : 0
        let removedDevices = discovery.registry.prune(
            expiredBefore: expiredBefore,
            protected: Set(sessions.sessions.keys)
        )
        removedDevices.forEach {
            peripherals.removeValue(forKey: $0)
            centralResource?.releasePeripheral(device: $0)
        }
    }

    private func finishAllDeferredConnections(error: BluetoothError) {
        dispatchPrecondition(condition: .onQueue(queue))
        let devices = Array(deferredConnections.keys)
        devices.forEach { finishDeferredConnection(device: $0, error: error) }
    }

    func disconnect(device: PlatformDeviceID, completion: @escaping (Result<Void, BluetoothError>) -> Void) {
        queue.async { [weak self] in
            guard let self else { return }
            // 与其它接口一致：未初始化/适配器不可用先报 readiness 错误（未初始化 -> 1509601）。
            guard self.lifecycle == .ready else {
                self.failAdmission(self.adapterReadinessError(), completion: completion)
                return
            }
            let cancelledDeferredConnection = self.deferredConnections[device] != nil
            if cancelledDeferredConnection {
                self.finishDeferredConnection(device: device, error: .cancelled("connection cancelled"))
            }
            guard let session = self.sessions.sessions[device], let peripheral = self.peripherals[device] else {
                if cancelledDeferredConnection {
                    completion(.success(()))
                    return
                }
                // 适配器已就绪但没有该设备的连接 -> 无连接（1509607），而不是设备未找到。
                self.failAdmission(.notConnected, completion: completion)
                return
            }
            guard session.state != .disconnecting else {
                if cancelledDeferredConnection {
                    completion(.success(()))
                } else {
                    self.failAdmission(.busy("disconnect busy"), completion: completion)
                }
                return
            }
            guard self.connection.markDisconnecting(device: device) else {
                self.failAdmission(.busy("disconnect busy"), completion: completion); return
            }
            self.centralResource?.disconnect(peripheral)
            completion(.success(()))
        }
    }

    func discoverServices(device: PlatformDeviceID, completion: @escaping (Result<GATTDatabaseRevision, BluetoothError>) -> Void) {
        queue.async { [weak self] in
            guard let self, let session = self.sessions.sessions[device], session.state == .connected,
                  let peripheral = self.peripherals[device], let resource = self.centralResource else {
                completion(.failure(self?.connectionContextError(device: device) ?? .internalFailure("runtime released"))); return
            }
            let admission = self.gatt.admitServiceDiscovery(
                device: device,
                generation: session.generation,
                operations: self.operations,
                maximumPendingOperations: self.configuration.maximumPendingOperationsPerDevice
            )
            guard case .success(let discoveryAdmission) = admission else {
                if case .failure(let error) = admission { self.failAdmission(error, completion: completion) }
                return
            }
            let revision = discoveryAdmission.revision
            let operation = self.operations.insert(device: device, generation: session.generation, kind: .serviceDiscovery, gattRevision: revision) { outcome in
                switch outcome {
                case .gattRevision(let value): completion(.success(value))
                case .failure(let error): completion(.failure(error))
                default: completion(.failure(.internalFailure("invalid GATT outcome")))
                }
            }
            self.gattOperationTimers[operation] = self.clock.schedule(after: self.configuration.discoveryTimeoutMilliseconds) { [weak self] in
                self?.queue.async { guard let self else { return }; _ = self.finishGattOperation(operation, outcome: .failure(.timeout)) }
            }
            self.operations.markSubmitted(operation)
            resource.discoverServices(peripheral, services: nil)
        }
    }

    func discoverCharacteristics(device: PlatformDeviceID, service: ServiceID, completion: @escaping (Result<GATTDatabaseRevision, BluetoothError>) -> Void) {
        queue.async { [weak self] in
            guard let self, let session = self.sessions.sessions[device], session.state == .connected,
                  let peripheral = self.peripherals[device], let resource = self.centralResource else {
                completion(.failure(self?.connectionContextError(device: device) ?? .internalFailure("runtime released"))); return
            }
            guard let cbService = peripheral.services.first(where: { $0.uuid.canonical128 == service.uuid.canonical128 }) else {
                self.failAdmission(.serviceNotFound, completion: completion); return
            }
            let admission = self.gatt.admitCharacteristicDiscovery(
                device: device,
                generation: session.generation,
                service: service,
                operations: self.operations,
                maximumPendingOperations: self.configuration.maximumPendingOperationsPerDevice
            )
            guard case .success(let discoveryAdmission) = admission else {
                if case .failure(let error) = admission { self.failAdmission(error, completion: completion) }
                return
            }
            let revision = discoveryAdmission.revision
            let operation = self.operations.insert(device: device, generation: session.generation, kind: .characteristicDiscovery, service: service, gattRevision: revision) { outcome in
                switch outcome {
                case .gattRevision(let value): completion(.success(value))
                case .failure(let error): completion(.failure(error))
                default: completion(.failure(.internalFailure("invalid GATT outcome")))
                }
            }
            self.gattOperationTimers[operation] = self.clock.schedule(after: self.configuration.discoveryTimeoutMilliseconds) { [weak self] in
                self?.queue.async { guard let self else { return }; _ = self.finishGattOperation(operation, outcome: .failure(.timeout)) }
            }
            self.operations.markSubmitted(operation)
            resource.discoverCharacteristics(peripheral, for: cbService)
        }
    }

    func setNotifyValue(path: CharacteristicPath, enabled: Bool, completion: @escaping (Result<Bool, BluetoothError>) -> Void) {
        queue.async { [weak self] in
            guard let self, let session = self.sessions.sessions[path.device], session.state == .connected,
                  let peripheral = self.peripherals[path.device], self.centralResource != nil else {
                completion(.failure(self?.connectionContextError(device: path.device) ?? .internalFailure("runtime released"))); return
            }
            guard let snapshot = self.gatt.snapshot(device: path.device, generation: session.generation) else {
                self.failAdmission(.gattNotReady, completion: completion); return
            }
            guard let service = snapshot.services[path.service] else {
                self.failAdmission(.serviceNotFound, completion: completion); return
            }
            guard let characteristicSnapshot = service.characteristics.first(where: { $0.id == path.characteristic }),
                  self.resolveCharacteristic(path: path, peripheral: peripheral) != nil else {
                self.failAdmission(.characteristicNotFound, completion: completion); return
            }
            let admission = self.io.admitSubscription(
                path: path,
                generation: session.generation,
                characteristic: characteristicSnapshot,
                enabled: enabled,
                currentlyActive: self.subscriptions.isActive(path: path, generation: session.generation),
                policy: self.configuration.readNotifyCorrelation,
                operations: self.operations,
                maximumPendingOperations: self.configuration.maximumPendingOperationsPerDevice,
                discoveryBlocked: self.gatt.isDiscoveryQuarantined(device: path.device, generation: session.generation)
            )
            guard case .success(let subscriptionAdmission) = admission else {
                if case .failure(let error) = admission { self.failAdmission(error, completion: completion) }
                return
            }
            if subscriptionAdmission.alreadySatisfied {
                completion(.success(enabled)); return
            }
            guard subscriptionAdmission.operation != nil else {
                self.failAdmission(.internalFailure("missing subscription admission"), completion: completion); return
            }
            let operation = self.operations.insert(device: path.device, generation: session.generation, kind: .subscriptionChange, path: path, gattRevision: snapshot.revision) { outcome in
                switch outcome {
                case .subscription(let value): completion(.success(value))
                case .failure(let error): completion(.failure(error))
                default: completion(.failure(.internalFailure("invalid subscription outcome")))
                }
            }
            self.enqueueLane(operation, payload: .subscription(enabled))
        }
    }

    func readValue(path: CharacteristicPath, completion: @escaping (Result<Data, BluetoothError>) -> Void) {
        queue.async { [weak self] in
            guard let self, let session = self.sessions.sessions[path.device], session.state == .connected,
                  let peripheral = self.peripherals[path.device], self.centralResource != nil else {
                completion(.failure(self?.connectionContextError(device: path.device) ?? .internalFailure("runtime released"))); return
            }
            guard let snapshot = self.gatt.snapshot(device: path.device, generation: session.generation) else {
                self.failAdmission(.gattNotReady, completion: completion); return
            }
            guard let service = snapshot.services[path.service] else {
                self.failAdmission(.serviceNotFound, completion: completion); return
            }
            guard let characteristicSnapshot = service.characteristics.first(where: { $0.id == path.characteristic }),
                  self.resolveCharacteristic(path: path, peripheral: peripheral) != nil else {
                self.failAdmission(.characteristicNotFound, completion: completion); return
            }
            let subscriptionActive = self.subscriptionMayDeliverValues(path: path, generation: session.generation)
            let admission = self.io.admitRead(
                path: path,
                generation: session.generation,
                characteristic: characteristicSnapshot,
                subscriptionActive: subscriptionActive,
                policy: self.configuration.readNotifyCorrelation,
                operations: self.operations,
                maximumPendingOperations: self.configuration.maximumPendingOperationsPerDevice,
                discoveryBlocked: self.gatt.isDiscoveryQuarantined(device: path.device, generation: session.generation)
            )
            guard case .success = admission else {
                if case .failure(let error) = admission {
                    self.failAdmission(error, completion: completion)
                }
                return
            }
            let operation = self.operations.insert(device: path.device, generation: session.generation, kind: .read, path: path, gattRevision: snapshot.revision) { outcome in
                switch outcome {
                case .value(let value): completion(.success(value))
                case .failure(let error): completion(.failure(error))
                default: completion(.failure(.internalFailure("invalid read outcome")))
                }
            }
            self.enqueueLane(operation, payload: .read)
        }
    }

    func readRSSI(device: PlatformDeviceID, completion: @escaping (Result<Int, BluetoothError>) -> Void) {
        queue.async { [weak self] in
            guard let self, let session = self.sessions.sessions[device], session.state == .connected,
                  let peripheral = self.peripherals[device], let resource = self.centralResource else {
                completion(.failure(self?.connectionContextError(device: device) ?? .internalFailure("runtime released"))); return
            }
            guard self.metrics.state(device: device, generation: session.generation) != .quarantined else {
                self.failAdmission(.busy("RSSI lane quarantined until late callback or disconnect"), completion: completion); return
            }
            if let cached = self.metrics.cachedValue(device: device, generation: session.generation, now: self.clock.now) {
                completion(.success(cached)); return
            }
            if let leader = self.metrics.inFlightOperation(device: device, generation: session.generation) {
                let attached: PendingOperationRegistry.Completion = { outcome in
                    switch outcome {
                    case .rssi(let value): completion(.success(value))
                    case .failure(let error): completion(.failure(error))
                    default: completion(.failure(.internalFailure("invalid RSSI outcome")))
                    }
                }
                guard self.operations.attach(leader, completion: attached) else {
                    self.failAdmission(.busy("RSSI read in flight"), completion: completion); return
                }
                return
            }
            guard self.operations.count(device: device, generation: session.generation) < self.configuration.maximumPendingOperationsPerDevice else {
                self.failAdmission(.resourceLimitExceeded("pendingOperations"), completion: completion); return
            }
            let operation = self.operations.insert(device: device, generation: session.generation, kind: .rssi) { outcome in
                switch outcome {
                case .rssi(let value): completion(.success(value))
                case .failure(let error): completion(.failure(error))
                default: completion(.failure(.internalFailure("invalid RSSI outcome")))
                }
            }
            self.operations.markSubmitted(operation)
            self.metrics.beginReading(operation: operation, device: device, generation: session.generation)
            self.scheduleLaneDeadline(operation, milliseconds: self.metrics.deadlineMilliseconds)
            resource.readRSSI(peripheral)
        }
    }

    func writeValue(path: CharacteristicPath, value: Data, mode: BLEWriteMode, completion: @escaping (Result<Void, BluetoothError>) -> Void) {
        queue.async { [weak self] in
            guard let self, let session = self.sessions.sessions[path.device], session.state == .connected,
                  let peripheral = self.peripherals[path.device], let resource = self.centralResource else {
                completion(.failure(self?.connectionContextError(device: path.device) ?? .internalFailure("runtime released"))); return
            }
            guard let snapshot = self.gatt.snapshot(device: path.device, generation: session.generation) else {
                self.failAdmission(.gattNotReady, completion: completion); return
            }
            guard let service = snapshot.services[path.service] else {
                self.failAdmission(.serviceNotFound, completion: completion); return
            }
            guard let characteristicSnapshot = service.characteristics.first(where: { $0.id == path.characteristic }),
                  let characteristic = self.resolveCharacteristic(path: path, peripheral: peripheral) else {
                self.failAdmission(.characteristicNotFound, completion: completion); return
            }
            let admission = self.io.admitWrite(
                path: path,
                generation: session.generation,
                value: value,
                resource: resource,
                peripheral: peripheral,
                characteristic: characteristicSnapshot,
                mode: mode,
                operations: self.operations,
                maximumPendingOperations: self.configuration.maximumPendingOperationsPerDevice,
                maximumQueuedCount: self.configuration.writeWithoutResponseMaximumQueuedCountPerDevice,
                maximumQueuedBytes: self.configuration.writeWithoutResponseMaximumQueuedBytesPerDevice,
                discoveryBlocked: self.gatt.isDiscoveryQuarantined(device: path.device, generation: session.generation)
            )
            guard case .success(let writeAdmission) = admission else {
                if case .failure(let error) = admission {
                    self.failAdmission(error, completion: completion)
                }
                return
            }
            let operation = self.operations.insert(device: path.device, generation: session.generation, kind: writeAdmission.policy.kind, path: path, gattRevision: snapshot.revision) { outcome in
                switch outcome {
                case .void: completion(.success(()))
                case .failure(let error): completion(.failure(error))
                default: completion(.failure(.internalFailure("invalid write outcome")))
                }
            }
            if mode == .withResponse {
                self.enqueueLane(operation, payload: .write(value))
                return
            }
            let queued = CharacteristicIOCapability.QueuedWrite(operation: operation, path: path, generation: session.generation, peripheral: peripheral, characteristic: characteristic, data: value)
            self.io.scheduleTimeout(operation: operation, action: writeAdmission.operation.timeoutAction, clock: self.clock, queue: self.queue, after: self.configuration.characteristicOperationTimeoutMilliseconds) { [weak self] decision in
                guard let self else { return }
                if case .expireQueuedWrite = decision.action, !decision.stateChanged {
                    _ = self.finishGattOperation(operation, outcome: .failure(.outcomeUnknown))
                } else {
                    _ = self.finishGattOperation(operation, outcome: .failure(.timeout))
                }
            }
            guard self.io.enqueueWithoutResponse(
                queued,
                byteCount: value.count,
                maximumCount: self.configuration.writeWithoutResponseMaximumQueuedCountPerDevice,
                maximumBytes: self.configuration.writeWithoutResponseMaximumQueuedBytesPerDevice,
                maximumSubmissionsPerDrain: self.configuration.writeWithoutResponseMaximumSubmissionsPerDrain
            ) else {
                _ = self.finishGattOperation(operation, outcome: .failure(.resourceLimitExceeded("writeWithoutResponseQueue")))
                return
            }
            self.pumpWithoutResponse(device: path.device)
        }
    }

    private func enqueueLane(_ operation: OperationID, payload: OperationLaneScheduler.Payload) {
        guard let record = operations.records[operation] else { return }
        let waitingDeadline = clock.now + UInt64(configuration.laneWaitTimeoutMilliseconds) * 1_000_000
        guard lanes.enqueue(record, payload: payload, waitingDeadline: waitingDeadline, maximumCount: configuration.maximumOperationsPerLane) else {
            _ = finishGattOperation(operation, outcome: .failure(.resourceLimitExceeded("operationLane")))
            return
        }
        scheduleLaneDeadline(operation, milliseconds: configuration.laneWaitTimeoutMilliseconds)
        advanceLane(OperationLaneScheduler.Key(record))
    }

    private func scheduleLaneDeadline(_ operation: OperationID, milliseconds: Int) {
        if let timer = gattOperationTimers.removeValue(forKey: operation) { clock.cancel(timer) }
        let deadlineRevision = UUID()
        laneDeadlineRevisions[operation] = deadlineRevision
        gattOperationTimers[operation] = clock.schedule(after: milliseconds) { [weak self] in
            self?.queue.async {
                guard let self, self.laneDeadlineRevisions[operation] == deadlineRevision,
                      let record = self.operations.records[operation] else { return }
                if record.status == .submitted {
                    if record.kind == .rssi {
                        self.metrics.timedOut(device: record.device, generation: record.generation)
                    } else {
                        self.quarantineUnknownOperation(record)
                    }
                    _ = self.finishGattOperation(operation, outcome: .failure(.outcomeUnknown))
                } else {
                    _ = self.finishGattOperation(operation, outcome: .failure(.timeout))
                }
            }
        }
    }

    private func advanceLane(_ key: OperationLaneScheduler.Key) {
        guard case .ready = lifecycle,
              let entry = lanes.head(key), let record = operations.records[entry.operation],
              record.status == .queued else { return }
        guard clock.now < entry.waitingDeadline else {
            _ = finishGattOperation(record.id, outcome: .failure(.timeout)); return
        }
        guard let session = sessions.sessions[record.device], session.state == .connected,
              session.generation == record.generation,
              let peripheral = peripherals[record.device], isCurrentSessionPeripheral(peripheral, session: session),
              let resource = centralResource else {
            _ = finishGattOperation(record.id, outcome: .failure(.cancelled("connectionChanged"))); return
        }
        guard !gatt.isDiscoveryQuarantined(device: record.device, generation: record.generation) else { return }
        guard let path = record.path,
              let snapshot = gatt.snapshot(device: record.device, generation: record.generation), snapshot.revision == record.gattRevision,
              let characteristic = resolveCharacteristic(path: path, peripheral: peripheral),
              let properties = snapshot.services[path.service]?.characteristics.first(where: { $0.id == path.characteristic }) else {
            _ = finishGattOperation(record.id, outcome: .failure(.cancelled("gattDatabaseChanged"))); return
        }
        switch entry.payload {
        case .read:
            guard !io.isReadQuarantined(path) else { return }
            guard io.canRead(properties) else {
                _ = finishGattOperation(record.id, outcome: .failure(.propertyNotSupported)); return
            }
            if configuration.readNotifyCorrelation == .strict,
               subscriptionMayDeliverValues(path: path, generation: record.generation) {
                _ = finishGattOperation(record.id, outcome: .failure(.busy("strict read conflicts with subscription"))); return
            }
            if configuration.readNotifyCorrelation == .concurrent,
               subscriptionMayDeliverValues(path: path, generation: record.generation) {
                operations.markReadValueSourceAmbiguous(record.id)
            }
        case .write(let value):
            guard io.canStartWrite(path) else { return }
            let policy: CharacteristicIOCapability.WritePolicy
            switch io.writePolicy(resource: resource, peripheral: peripheral, characteristic: properties, mode: .withResponse) {
            case .success(let current): policy = current
            case .failure(let error):
                _ = finishGattOperation(record.id, outcome: .failure(error)); return
            }
            guard value.count <= policy.maximumLength else {
                _ = finishGattOperation(record.id, outcome: .failure(.invalidParameter("payload exceeds maximum write length"))); return
            }
        case .subscription(let enabled):
            guard io.canStartSubscription(path) else { return }
            let mask = CBCharacteristicProperties.notify.rawValue | CBCharacteristicProperties.indicate.rawValue
            guard properties.properties & mask != 0 else {
                _ = finishGattOperation(record.id, outcome: .failure(.propertyNotSupported)); return
            }
            if configuration.readNotifyCorrelation == .strict, enabled,
               operations.first(device: record.device, generation: record.generation, kind: .read, path: path, submittedOnly: true) != nil {
                _ = finishGattOperation(record.id, outcome: .failure(.busy("strict subscription conflicts with read"))); return
            }
            if subscriptions.isActive(path: path, generation: record.generation) == enabled {
                _ = finishGattOperation(record.id, outcome: .subscription(enabled)); return
            }
            guard subscriptions.beginChange(path: path, generation: record.generation, enabled: enabled) else {
                _ = finishGattOperation(record.id, outcome: .failure(.busy("subscription state transition busy"))); return
            }
            if enabled, configuration.readNotifyCorrelation == .concurrent,
               let read = operations.first(device: record.device, generation: record.generation, kind: .read, path: path, submittedOnly: true) {
                operations.markReadValueSourceAmbiguous(read)
            }
        }
        operations.markSubmitted(record.id)
        scheduleLaneDeadline(record.id, milliseconds: configuration.characteristicOperationTimeoutMilliseconds)
        switch entry.payload {
        case .read: resource.readValue(peripheral, characteristic: characteristic)
        case .write(let value): resource.writeValue(value, peripheral: peripheral, characteristic: characteristic, type: .withResponse)
        case .subscription(let enabled): resource.setNotifyValue(enabled, peripheral: peripheral, characteristic: characteristic)
        }
    }

    private func resumeLanes(device: PlatformDeviceID, generation: ConnectionGeneration) {
        queue.async { [weak self] in
            guard let self else { return }
            for key in self.lanes.keys(device: device, generation: generation) { self.advanceLane(key) }
        }
    }

    private func subscriptionMayDeliverValues(path: CharacteristicPath, generation: ConnectionGeneration) -> Bool {
        subscriptions.isActive(path: path, generation: generation) || !io.canStartSubscription(path) ||
            peripherals[path.device].flatMap { resolveCharacteristic(path: path, peripheral: $0) }?.isNotifying == true ||
            operations.first(device: path.device, generation: generation, kind: .subscriptionChange, path: path, submittedOnly: true) != nil
    }

    private func consumeDiscoveryOrphan(device: PlatformDeviceID, generation: ConnectionGeneration,
                                        kind: PendingOperationKind, service: ServiceID? = nil, path: CharacteristicPath? = nil) -> Bool {
        guard gatt.consumeDiscoveryQuarantine(device: device, generation: generation, kind: kind, service: service, path: path) else { return false }
        _ = delegateRouter.record(.drainedOrphan(CorrelationLaneID(device: device, generation: generation, kind: String(describing: kind))))
        resumeLanes(device: device, generation: generation)
        return true
    }

    private func quarantineUnknownOperation(_ record: PendingOperationRegistry.Record) {
        let active = record.readValueSourceAmbiguous || (record.path.map { subscriptionMayDeliverValues(path: $0, generation: record.generation) } ?? false)
        _ = io.quarantineSubmittedOperation(kind: record.kind, path: record.path, policy: configuration.readNotifyCorrelation, subscriptionActive: active)
        guard let path = record.path else { return }
        let isolated: Bool
        switch record.kind {
        case .read: isolated = io.isReadQuarantined(path)
        case .writeWithResponse: isolated = !io.canStartWrite(path)
        case .subscriptionChange: isolated = !io.canStartSubscription(path)
        default: return
        }
        // A full quarantine budget must not silently reopen an ambiguous lane.
        if !isolated, let peripheral = peripherals[record.device] {
            lanes.pause(device: record.device, generation: record.generation)
            _ = connection.markDisconnecting(device: record.device)
            centralResource?.disconnect(peripheral)
        }
    }

    /// Cancels a pending operation on the Runtime queue. Submitted CoreBluetooth
    /// work cannot be withdrawn; its SDK completion is therefore outcome-unknown.
    func cancel(operation: OperationID, completion: @escaping (Result<Void, BluetoothError>) -> Void) {
        queue.async { [weak self] in
            guard let self, let record = self.operations.records[operation] else {
                completion(.failure(.invalidParameter("operation")))
                return
            }
            if record.status == .queued, record.kind == .writeWithoutResponse,
               self.io.removeQueuedWrite(operation: operation, device: record.device) {
                _ = self.finishGattOperation(operation, outcome: .failure(.cancelled("cancelled")))
                completion(.success(()))
                return
            }
            if record.status == .submitted {
                if record.kind == .rssi { self.metrics.quarantine(device: record.device, generation: record.generation) }
                self.quarantineUnknownOperation(record)
                _ = self.finishGattOperation(operation, outcome: .failure(.outcomeUnknown))
            } else {
                _ = self.finishGattOperation(operation, outcome: .failure(.cancelled("cancelled")))
            }
            completion(.success(()))
        }
    }

    func maximumWritePayloadLength(for device: PlatformDeviceID, mode: BLEWriteMode, completion: @escaping (Result<Int, BluetoothError>) -> Void) {
        queue.async { [weak self] in
            guard let self, let session = self.sessions.sessions[device], session.state == .connected,
                  let peripheral = self.peripherals[device], let resource = self.centralResource else {
                completion(.failure(self?.connectionContextError(device: device) ?? .internalFailure("runtime released"))); return
            }
            completion(self.mtu.maximumWritePayloadLength(resource: resource, peripheral: peripheral, mode: mode))
        }
    }

    /// Compatibility projection for APIs such as WeChat's getBLEMTU.
    /// The result is the iOS write payload limit for the selected mode.
    func reportedMTU(for device: PlatformDeviceID, mode: BLEWriteMode, completion: @escaping (Result<Int, BluetoothError>) -> Void) {
        queue.async { [weak self] in
            guard let self, let session = self.sessions.sessions[device], session.state == .connected,
                  let peripheral = self.peripherals[device], let resource = self.centralResource else {
                completion(.failure(self?.connectionContextError(device: device) ?? .internalFailure("runtime released"))); return
            }
            completion(self.mtu.reportedMTU(resource: resource, peripheral: peripheral, mode: mode))
        }
    }

    private func isCurrentResourcePeripheral(_ peripheral: BluetoothPeripheralHandle) -> Bool {
        guard let resource = centralResource else { return false }
        return peripheral.resourceToken == resource.resourceToken &&
            peripheral.resourceGeneration == resource.resourceGeneration
    }

    private func isCurrentSessionPeripheral(_ peripheral: BluetoothPeripheralHandle, session: DeviceSession) -> Bool {
        isCurrentResourcePeripheral(peripheral) && peripheral.connectionGeneration == session.generation
    }

    private func resolveCharacteristic(path: CharacteristicPath, peripheral: BluetoothPeripheralHandle) -> BluetoothCharacteristicHandle? {
        guard let session = sessions.sessions[path.device] else { return nil }
        guard let service = peripheral.services.first(where: { $0.uuid.canonical128 == path.service.uuid.canonical128 }) else { return nil }
        guard let revision = gatt.snapshot(device: path.device, generation: session.generation)?.revision,
              service.gattRevision == revision else { return nil }
        return service.characteristics.first {
            $0.uuid.canonical128 == path.characteristic.uuid.canonical128 && $0.gattRevision == revision
        }
    }
    private func handleNotificationState(peripheral: BluetoothPeripheralHandle, characteristic: BluetoothCharacteristicHandle, error: Error?) {
        dispatchPrecondition(condition: .onQueue(queue))
        let device = PlatformDeviceID(rawValue: peripheral.identifier)
        guard let session = sessions.sessions[device] else { _ = delegateRouter.record(.rejectedNoSession); return }
        guard isCurrentSessionPeripheral(peripheral, session: session) else { _ = delegateRouter.record(.ignoredStale(.generationMismatch(expected: session.generation, received: peripheral.connectionGeneration ?? ConnectionGeneration(rawValue: 0)))); return }
        guard let current = peripherals[device], current === peripheral,
              let service = peripheral.services.first(where: { $0.characteristics.contains(where: { $0 === characteristic }) }) else { _ = delegateRouter.record(.ignoredStale(.peripheralMismatch)); return }
        let path = CharacteristicPath(device: device, service: ServiceID(uuid: service.uuid), characteristic: CharacteristicID(uuid: characteristic.uuid))
        if io.consumeSubscriptionQuarantine(path) {
            if error == nil { subscriptions.reconcileOrphanState(path: path, generation: session.generation, enabled: characteristic.isNotifying) }
            _ = delegateRouter.record(.drainedOrphan(CorrelationLaneID(device: device, generation: session.generation, kind: "subscriptionChange")))
            resumeLanes(device: device, generation: session.generation)
            return
        }
        guard let revision = gatt.snapshot(device: device, generation: session.generation)?.revision else {
            _ = delegateRouter.record(.ignoredStale(.gattRevisionMismatch))
            return
        }
        let decision = delegateRouter.resolve(device: device, generation: session.generation, kind: .subscriptionChange, path: path, gattRevision: revision)
        guard case .consumed(let operation) = decision.consumption, let operation else { return }
        let subscriptionResult = subscriptions.acceptNotificationState(
            path: path,
            generation: session.generation,
            enabled: characteristic.isNotifying,
            error: error
        )
        switch subscriptionResult {
        case .accepted(let enabled, _):
            _ = finishResolvedOperation(operation, outcome: .subscription(enabled))
        case .rejected:
            if error == nil, let record = operations.records[operation] { quarantineUnknownOperation(record) }
            let outcome: PendingOperationOutcome = error.map {
                .failure(.platform(BluetoothPlatformError(error: $0)))
            } ?? .failure(BluetoothError(
                code: .internalFailure,
                context: .init(message: "subscription callback rejected"),
                outcome: .submittedOutcomeUnknown,
                retry: .callerMustResolve
            ))
            _ = finishResolvedOperation(operation, outcome: outcome)
        case .ignoredStale:
            _ = finishResolvedOperation(operation, outcome: .failure(.outcomeUnknown))
        }
    }

    private func handleCharacteristicValue(peripheral: BluetoothPeripheralHandle, characteristic: BluetoothCharacteristicHandle, error: Error?) {
        dispatchPrecondition(condition: .onQueue(queue))
        let device = PlatformDeviceID(rawValue: peripheral.identifier)
        guard let session = sessions.sessions[device] else { _ = delegateRouter.record(.rejectedNoSession); return }
        guard isCurrentSessionPeripheral(peripheral, session: session) else { _ = delegateRouter.record(.ignoredStale(.generationMismatch(expected: session.generation, received: peripheral.connectionGeneration ?? ConnectionGeneration(rawValue: 0)))); return }
        guard let current = peripherals[device], current === peripheral,
              let service = peripheral.services.first(where: { $0.characteristics.contains(where: { $0 === characteristic }) }) else { _ = delegateRouter.record(.ignoredStale(.peripheralMismatch)); return }
        let path = CharacteristicPath(device: device, service: ServiceID(uuid: service.uuid), characteristic: CharacteristicID(uuid: characteristic.uuid))
        guard let revision = gatt.snapshot(device: device, generation: session.generation)?.revision else { _ = delegateRouter.record(.ignoredStale(.gattRevisionMismatch)); return }
        let decision = delegateRouter.resolve(device: device, generation: session.generation, kind: .read, path: path, gattRevision: revision)
        var completedReadOperation: OperationID?
        if case .consumed(let operation) = decision.consumption, let operation {
            let ambiguous = operations.records[operation]?.readValueSourceAmbiguous == true ||
                (configuration.readNotifyCorrelation == .concurrent && subscriptionMayDeliverValues(path: path, generation: session.generation))
            completedReadOperation = ambiguous ? nil : operation
            if ambiguous {
                if let record = operations.records[operation] { quarantineUnknownOperation(record) }
                _ = finishResolvedOperation(operation, outcome: .failure(.outcomeUnknown))
            } else if let error { _ = finishResolvedOperation(operation, outcome: .failure(.platform(BluetoothPlatformError(error: error)))) }
            else if let value = characteristic.value { _ = finishResolvedOperation(operation, outcome: .value(value)) }
            else { _ = finishResolvedOperation(operation, outcome: .failure(.internalFailure("missing characteristic value"))) }
        } else if io.consumeReadQuarantine(path) {
            _ = delegateRouter.record(.drainedOrphan(CorrelationLaneID(device: device, generation: session.generation, gattRevision: revision, kind: "read")))
            resumeLanes(device: device, generation: session.generation)
            return
        }
        if error == nil, let value = characteristic.value {
            let shouldPublish: Bool
            if completedReadOperation != nil {
                shouldPublish = true
            } else if case .accepted = subscriptions.admitValue(path: path, generation: session.generation) {
                shouldPublish = true
            } else {
                shouldPublish = false
            }
            if shouldPublish {
                _ = delegateRouter.route(device: device, generation: session.generation, operation: nil, gattRevision: revision)
                events.publishCharacteristicValue(.init(path: path, generation: session.generation, value: value))
            }
        }
    }

    private func handleRSSI(peripheral: BluetoothPeripheralHandle, rssi: NSNumber?, error: Error?) {
        dispatchPrecondition(condition: .onQueue(queue))
        let device = PlatformDeviceID(rawValue: peripheral.identifier)
        guard let session = sessions.sessions[device] else {
            _ = delegateRouter.record(.rejectedNoSession)
            return
        }
        guard isCurrentSessionPeripheral(peripheral, session: session) else {
            _ = delegateRouter.record(.ignoredStale(.generationMismatch(expected: session.generation, received: peripheral.connectionGeneration ?? ConnectionGeneration(rawValue: 0))))
            return
        }
        guard session.state == .connected, let current = peripherals[device], current === peripheral else {
            _ = delegateRouter.record(.ignoredStale(.peripheralMismatch))
            return
        }
        if metrics.consumeQuarantine(device: device, generation: session.generation) {
            _ = delegateRouter.record(.drainedOrphan(CorrelationLaneID(device: device, generation: session.generation, kind: "rssi")))
            resumeLanes(device: device, generation: session.generation)
            return
        }
        let decision = delegateRouter.resolve(device: device, generation: session.generation, kind: .rssi)
        guard case .consumed(let operation) = decision.consumption, let operation else { return }
        let outcome = metrics.outcome(rssi: rssi, error: error)
        if case .rssi(let value) = outcome {
            metrics.store(value: value, device: device, generation: session.generation, at: clock.now)
        }
        _ = finishResolvedOperation(operation, outcome: outcome)
    }

    private func handleWriteResponse(peripheral: BluetoothPeripheralHandle, characteristic: BluetoothCharacteristicHandle, error: Error?) {
        dispatchPrecondition(condition: .onQueue(queue))
        let device = PlatformDeviceID(rawValue: peripheral.identifier)
        guard let session = sessions.sessions[device] else { _ = delegateRouter.record(.rejectedNoSession); return }
        guard isCurrentSessionPeripheral(peripheral, session: session) else { _ = delegateRouter.record(.ignoredStale(.generationMismatch(expected: session.generation, received: peripheral.connectionGeneration ?? ConnectionGeneration(rawValue: 0)))); return }
        guard session.state == .connected, let current = peripherals[device], current === peripheral,
              let service = peripheral.services.first(where: { $0.characteristics.contains(where: { $0 === characteristic }) }) else { _ = delegateRouter.record(.ignoredStale(.peripheralMismatch)); return }
        let path = CharacteristicPath(device: device, service: ServiceID(uuid: service.uuid), characteristic: CharacteristicID(uuid: characteristic.uuid))
        if io.consumeWriteQuarantine(path) {
            _ = delegateRouter.record(.drainedOrphan(CorrelationLaneID(device: device, generation: session.generation, kind: "writeWithResponse")))
            resumeLanes(device: device, generation: session.generation)
            return
        }
        guard let revision = gatt.snapshot(device: device, generation: session.generation)?.revision else {
            _ = delegateRouter.record(.ignoredStale(.gattRevisionMismatch))
            return
        }
        let decision = delegateRouter.resolve(device: device, generation: session.generation, kind: .writeWithResponse, path: path, gattRevision: revision)
        guard case .consumed(let operation) = decision.consumption, let operation else { return }
        if let error {
            _ = finishResolvedOperation(operation, outcome: .failure(.platform(BluetoothPlatformError(error: error))))
        } else {
            _ = finishResolvedOperation(operation, outcome: .void)
        }
    }

    private func pumpWithoutResponse(device: PlatformDeviceID) {
        dispatchPrecondition(condition: .onQueue(queue))
        io.pumpWithoutResponse(device: device, queue: queue) { [weak self] in
            self?.drainWithoutResponse(device: device)
        }
    }

    private func drainWithoutResponse(device: PlatformDeviceID) {
        dispatchPrecondition(condition: .onQueue(queue))
        guard let resource = centralResource,
              let peripheral = peripherals[device],
              let session = sessions.sessions[device], session.state == .connected else { return }
        let hasMore = io.drainWithoutResponse(device: device, peripheral: peripheral) { item in
            resource.writeValue(item.data, peripheral: item.peripheral, characteristic: item.characteristic, type: .withoutResponse)
            _ = finishGattOperation(item.operation, outcome: .void)
        }
        if hasMore { pumpWithoutResponse(device: device) }
    }

    private func cancelQueuedWrites(device: PlatformDeviceID, generation: ConnectionGeneration, reason: String) {
        dispatchPrecondition(condition: .onQueue(queue))
        let items = io.cancelQueuedWrites(device: device, generation: generation)
        items.forEach { _ = finishGattOperation($0.operation, outcome: .failure(.cancelled(reason))) }
    }

    private func cancelPendingOperationsOnDisconnect(device: PlatformDeviceID, generation: ConnectionGeneration) {
        dispatchPrecondition(condition: .onQueue(queue))
        lanes.pause(device: device, generation: generation)
        let ids = operations.records.values
            .filter { $0.device == device && $0.generation == generation }
            .map(\.id)
        ids.forEach { operation in
            guard let record = operations.records[operation] else { return }
            let outcome: PendingOperationOutcome = record.status == .submitted
                ? .failure(.outcomeUnknown)
                : .failure(.cancelled("disconnect"))
            _ = finishGattOperation(operation, outcome: outcome)
        }
        io.clearDeviceState(device: device, clock: clock)
        metrics.clear(device: device)
        lanes.resume(device: device, generation: generation)
    }

    private func rejectAmbiguousGATT(operation: OperationID, device: PlatformDeviceID, generation: ConnectionGeneration) {
        gatt.invalidate(device: device, generation: generation)
        subscriptions.invalidate(device: device, generation: generation)
        subscriptions.activate(device: device, generation: generation)
        _ = finishResolvedOperation(operation, outcome: .failure(.unsupportedGATTIdentity))
        cancelQueuedWrites(device: device, generation: generation, reason: "unsupportedGATTIdentity")
        cancelPendingOperationsOnGATTInvalidation(device: device, generation: generation)
    }

    private func cancelPendingOperationsOnGATTInvalidation(device: PlatformDeviceID, generation: ConnectionGeneration) {
        dispatchPrecondition(condition: .onQueue(queue))
        lanes.pause(device: device, generation: generation)
        let ids = operations.records.values
            .filter { $0.device == device && $0.generation == generation && $0.gattRevision != nil }
            .map(\.id)
        ids.forEach { operation in
            guard let record = operations.records[operation] else { return }
            if record.status == .submitted {
                quarantineUnknownOperation(record)
            }
            let outcome: PendingOperationOutcome = record.status == .submitted
                ? .failure(.outcomeUnknown)
                : .failure(.cancelled("gattDatabaseChanged"))
            _ = finishGattOperation(operation, outcome: outcome)
        }
        lanes.resume(device: device, generation: generation)
    }

    private func scheduleDiscoveryBatch(after milliseconds: Int, generation: UInt64) {
        discoveryBatchTimer = clock.schedule(after: milliseconds) { [weak self] in
            guard let self else { return }
            self.queue.async {
                guard let batch = self.discovery.flushBatch(generation: generation) else { return }
                if !batch.isEmpty { self.events.publishDiscovery(batch) }
                self.scheduleDiscoveryBatch(after: milliseconds, generation: generation)
            }
        }
    }

    @discardableResult
    private func finishGattOperation(_ operation: OperationID, outcome: PendingOperationOutcome) -> Bool {
        if let record = operations.records[operation], record.status == .submitted, record.kind.isDiscovery,
           case .failure(let error) = outcome, [.timeout, .cancelled, .outcomeUnknown].contains(error.code) {
            gatt.quarantineDiscovery(record)
        }
        laneDeadlineRevisions.removeValue(forKey: operation)
        io.finishTimeout(operation: operation, clock: clock)
        if let timer = gattOperationTimers.removeValue(forKey: operation) { clock.cancel(timer) }
        if let record = operations.records[operation], record.kind == .subscriptionChange, record.status == .submitted,
           let path = record.path {
            subscriptions.cancelChange(path: path, generation: record.generation)
        }
        if case .failure(let error) = outcome,
           let record = operations.records[operation] {
            let operationContext = BluetoothOperationContext(
                operationID: record.id,
                kind: String(describing: record.kind),
                device: record.device,
                generation: record.generation,
                gattRevision: record.gattRevision,
                characteristicPath: record.path
            )
            let submitted = record.status == .submitted
            let terminalOutcome: BluetoothOutcome = submitted && error.outcome == .notSubmitted
                ? .submittedOutcomeUnknown : error.outcome
            let structured = BluetoothError(
                code: submitted && error.code == .cancelled ? .outcomeUnknown : error.code,
                context: BluetoothErrorContext(
                    message: error.context.message,
                    operation: operationContext,
                    adapterReason: error.context.adapterReason,
                    sessionReason: error.context.sessionReason,
                    gattReason: error.context.gattReason,
                    busyReason: error.context.busyReason,
                    resourceReason: error.context.resourceReason,
                    platform: error.context.platform
                ),
                outcome: terminalOutcome,
                retry: terminalOutcome == .submittedOutcomeUnknown ? .callerMustResolve : error.retry
            )
            return finishOperation(operation, outcome: .failure(structured))
        }
        return finishOperation(operation, outcome: outcome)
    }

    private func finishOperation(_ operation: OperationID, outcome: PendingOperationOutcome) -> Bool {
        if let record = operations.records[operation] {
            lanes.remove(record)
            let key = OperationLaneScheduler.Key(record)
            queue.async { [weak self] in self?.advanceLane(key) }
        }
        if let record = operations.records[operation], record.kind == .rssi { metrics.complete(record) }
        return operations.finish(operation, outcome: outcome)
    }

    /// The caller must have obtained `operation` from DelegateRouter.resolve.
    /// Keeping this separate from route prevents a callback from being
    /// classified twice before its once-terminal completion is delivered.
    @discardableResult
    private func finishResolvedOperation(_ operation: OperationID, outcome: PendingOperationOutcome) -> Bool {
        finishGattOperation(operation, outcome: outcome)
    }

    private func finishOpen(_ result: Result<Void, BluetoothError>) {
        dispatchPrecondition(condition: .onQueue(queue))
        adapterLifecycle.cancelInitializationTimeout()
        let waiters = openWaiters.values; openWaiters.removeAll()
        waiters.forEach { $0(result) }
    }

    private func failAdmission<T>(_ error: BluetoothError,
                                  operation: BluetoothOperationContext? = nil,
                                  completion: @escaping (Result<T, BluetoothError>) -> Void) {
        dispatchPrecondition(condition: .onQueue(queue))
        let structured = BluetoothError(
            code: error.code,
            context: BluetoothErrorContext(
                message: error.context.message,
                operation: operation ?? error.context.operation,
                adapterReason: error.context.adapterReason,
                sessionReason: error.context.sessionReason,
                gattReason: error.context.gattReason,
                discoveryReason: error.context.discoveryReason,
                discoveryAgeMilliseconds: error.context.discoveryAgeMilliseconds,
                discoveryFreshnessWindowMilliseconds: error.context.discoveryFreshnessWindowMilliseconds,
                busyReason: error.context.busyReason,
                resourceReason: error.context.resourceReason,
                platform: error.context.platform
            ),
            outcome: .notSubmitted,
            retry: error.retry
        )
        completion(.failure(structured))
    }

    private func initializationTimedOut() {
        dispatchPrecondition(condition: .onQueue(queue))
        let decision = adapterLifecycle.timeout()
        guard decision.accepted else { return }
        centralResource?.stop(); centralResource = nil
        finishOpen(.failure(.timeout))
    }

    private func adapterUnavailableError(for state: AdapterLifecycleObservedState? = nil) -> BluetoothError {
        let observedState = state ?? adapterLifecycle.observedState
        let reason: AdapterUnavailableReason
        switch observedState {
        case .poweredOff: reason = .poweredOff
        case .unauthorized: reason = .unauthorized
        case .unsupported: reason = .unsupported
        case .resetting: reason = .resetting
        case .poweredOn, .unknown, nil: reason = .unknown
        }
        return .adapterUnavailable(reason: reason)
    }

    /// Error for an operation attempted before the adapter is usable.
    /// `.idle`/`.initializing` mean the adapter was never opened -> not initialized.
    private func adapterReadinessError() -> BluetoothError {
        switch lifecycle {
        case .idle, .initializing: return .runtimeNotReady
        case .resetting: return adapterUnavailableError(for: .resetting)
        case .unavailable: return adapterUnavailableError()
        case .shuttingDown: return .cancelled("shutdown")
        case .ready: return .internalFailure("adapter unexpectedly not ready")
        }
    }

    /// Error for an operation that needs an active connection. Distinguishes
    /// "adapter not initialized", "device not connected", "transition in progress"
    /// and "connection context temporarily missing".
    private func connectionContextError(device: PlatformDeviceID) -> BluetoothError {
        guard lifecycle == .ready else { return adapterReadinessError() }
        guard let session = sessions.sessions[device] else { return .notConnected }
        guard session.state == .connected else { return .connectionInProgress }
        return .notReady
    }

    func applyAdapterState(poweredOn: Bool, resetting: Bool = false) -> Bool {
        applyAdapterState(poweredOn: poweredOn, resetting: resetting, adapterState: resetting ? .resetting : (poweredOn ? .poweredOn : .poweredOff))
    }

    @discardableResult
    private func applyAdapterState(poweredOn: Bool, resetting: Bool, adapterState: BluetoothEventHub.AdapterState) -> Bool {
        dispatchPrecondition(condition: .onQueue(queue))
        let observedState: AdapterLifecycleObservedState
        switch adapterState {
        case .poweredOn: observedState = .poweredOn
        case .poweredOff: observedState = .poweredOff
        case .resetting: observedState = .resetting
        case .unauthorized: observedState = .unauthorized
        case .unsupported: observedState = .unsupported
        case .unknown: observedState = .unknown
        }
        let decision = adapterLifecycle.apply(observedState)
        guard decision.accepted else { return false }
        if decision.shouldInvalidateResource {
            invalidateAdapterResources(reason: resetting ? "adapterResetting" : "adapterUnavailable")
        }
        if decision.stateChanged {
            events.publishAdapterState(.init(state: adapterState, discovering: discovery.isDiscovering))
        }
        switch decision.openDecision {
        case .success: finishOpen(.success(()))
        case .unavailable: finishOpen(.failure(adapterUnavailableError(for: observedState)))
        case .timeout: finishOpen(.failure(.timeout))
        case .shutdown: finishOpen(.failure(.cancelled("shutdown")))
        case .none: break
        }
        return true
    }

    private func currentAdapterEventState() -> BluetoothEventHub.AdapterState? {
        guard let observedState = adapterLifecycle.observedState else { return nil }
        switch observedState {
        case .poweredOn: return .poweredOn
        case .poweredOff: return .poweredOff
        case .resetting: return .resetting
        case .unauthorized: return .unauthorized
        case .unsupported: return .unsupported
        case .unknown: return .unknown
        }
    }

    private func invalidateAdapterResources(reason: String) {
        dispatchPrecondition(condition: .onQueue(queue))
        finishAllDeferredConnections(error: .cancelled(reason))
        centralResource?.invalidateResource()
        discovery.stop()
        discoveryBatchTimer.map(clock.cancel)
        discoveryBatchTimer = nil
        centralResource?.stopScan()
        connection.clearAll()
        let activeSessions = Array(sessions.sessions.values)
        activeSessions.forEach { session in
            cancelQueuedWrites(device: session.device, generation: session.generation, reason: reason)
            cancelPendingOperationsOnDisconnect(device: session.device, generation: session.generation)
            subscriptions.invalidate(device: session.device, generation: session.generation)
            gatt.invalidate(device: session.device, generation: session.generation)
            events.publishConnection(.init(device: session.device, generation: session.generation, state: .disconnected))
        }
        sessions.removeAll()
        peripherals.removeAll()
        io.clearState(clock: clock)
    }

    @discardableResult
    func shutdown() -> [OperationID] {
        dispatchPrecondition(condition: .onQueue(queue))
        let decision = adapterLifecycle.shutdown()
        guard decision.accepted else { return [] }
        finishOpen(.failure(.cancelled("shutdown")))
        finishAllDeferredConnections(error: .cancelled("shutdown"))
        discovery.stop()
        if let timer = discoveryBatchTimer { clock.cancel(timer) }
        discoveryBatchTimer = nil
        centralResource?.stop()
        centralResource = nil
        connection.clearAll()
        let ids = Array(operations.records.keys)
        ids.forEach { _ = finishGattOperation($0, outcome: .failure(.cancelled("shutdown"))) }
        gatt.invalidateAll()
        subscriptions.invalidateAll()
        discovery.registry.removeAll()
        io.clearState(clock: clock)
        metrics.clearAll()
        lanes.clear()
        sessions.removeAll()
        adapterLifecycle.clear()
        return ids
    }
}

enum StaleReason: Hashable, Sendable {
    case generationMismatch(expected: ConnectionGeneration, received: ConnectionGeneration)
    case terminatedConnection(ConnectionGeneration)
    case gattRevisionMismatch
    case shutdown
    case resourceReplaced
    case peripheralMismatch
    case unknown
}

struct CorrelationLaneID: Hashable, Sendable {
    let device: PlatformDeviceID
    let generation: ConnectionGeneration
    let gattRevision: GATTDatabaseRevision?
    let kind: String

    init(device: PlatformDeviceID,
                generation: ConnectionGeneration,
                gattRevision: GATTDatabaseRevision? = nil,
                kind: String) {
        self.device = device
        self.generation = generation
        self.gattRevision = gattRevision
        self.kind = kind
    }
}

struct InvariantContext: Hashable, Sendable {
    let message: String
    let device: PlatformDeviceID?

    init(_ message: String, device: PlatformDeviceID? = nil) {
        self.message = message
        self.device = device
    }
}

enum DelegateConsumption: Hashable, Sendable {
    case consumed(OperationID?)
    case consumedEvent(CorrelationLaneID)
    case ignoredStale(StaleReason)
    case drainedOrphan(CorrelationLaneID)
    case rejectedNoSession
    case invariantViolation(InvariantContext)

    // Source compatibility for broad assertions while detailed context is adopted.
    static var ignoredStale: Self { .ignoredStale(.unknown) }
    static var drainedOrphan: Self {
        .drainedOrphan(CorrelationLaneID(
            device: PlatformDeviceID(rawValue: UUID()),
            generation: ConnectionGeneration(rawValue: 0),
            kind: "delegate"
        ))
    }
    static var invariantViolation: Self { .invariantViolation(InvariantContext("unspecified")) }

    static func == (lhs: Self, rhs: Self) -> Bool {
        switch (lhs, rhs) {
        case let (.consumed(left), .consumed(right)):
            return left == right
        case let (.consumedEvent(left), .consumedEvent(right)):
            return left == right
        case (.ignoredStale, .ignoredStale),
             (.drainedOrphan, .drainedOrphan),
             (.rejectedNoSession, .rejectedNoSession),
             (.invariantViolation, .invariantViolation):
            return true
        default:
            return false
        }
    }

    func hash(into hasher: inout Hasher) {
        switch self {
        case .consumed(let operation):
            hasher.combine(0)
            hasher.combine(operation)
        case .consumedEvent(let lane):
            hasher.combine(5)
            hasher.combine(lane)
        case .ignoredStale:
            hasher.combine(1)
        case .drainedOrphan:
            hasher.combine(2)
        case .rejectedNoSession:
            hasher.combine(3)
        case .invariantViolation:
            hasher.combine(4)
        }
    }
}

final class DelegateRouter {
    private unowned let runtime: BluetoothRuntime
    // The router never owns or removes operation completions.
    init(runtime: BluetoothRuntime) { self.runtime = runtime }
    func route(device: PlatformDeviceID, generation: ConnectionGeneration, operation: OperationID?, gattRevision: GATTDatabaseRevision? = nil) -> DelegateConsumption {
        let result: DelegateConsumption
        guard let session = runtime.sessions.sessions[device] else { result = .rejectedNoSession; return record(result) }
        guard session.generation == generation else {
            result = .ignoredStale(.generationMismatch(expected: session.generation, received: generation))
            return record(result)
        }
        guard let operation else { result = .consumed(nil); return record(result) }
        guard let operationRecord = runtime.operations.records[operation] else {
            result = .drainedOrphan(CorrelationLaneID(device: device, generation: generation, gattRevision: gattRevision, kind: "delegate"))
            return record(result)
        }
        guard operationRecord.status == .submitted else {
            return record(.drainedOrphan(CorrelationLaneID(device: device, generation: generation, gattRevision: gattRevision, kind: "delegate")))
        }
        guard operationRecord.device == device else {
            result = .invariantViolation(InvariantContext("operation device mismatch", device: device))
            return record(result)
        }
        guard operationRecord.generation == generation else {
            result = .ignoredStale(.generationMismatch(expected: generation, received: operationRecord.generation))
            return record(result)
        }
        guard gattRevision == nil || operationRecord.gattRevision == gattRevision else {
            result = .ignoredStale(.gattRevisionMismatch)
            return record(result)
        }
        result = .consumed(operation)
        return record(result)
    }

    /// Resolves a callback from its lane metadata. Handlers must not select an
    /// operation and then bypass the router: this method performs correlation,
    /// classifies orphan/stale callbacks, and returns the operation to finish.
    func resolve(device: PlatformDeviceID,
                        generation: ConnectionGeneration,
                        kind: PendingOperationKind,
                        path: CharacteristicPath? = nil,
                        service: ServiceID? = nil,
                        gattRevision: GATTDatabaseRevision? = nil) -> (consumption: DelegateConsumption, operation: OperationID?) {
        guard let session = runtime.sessions.sessions[device] else {
            let result = record(.rejectedNoSession); return (result, nil)
        }
        guard session.generation == generation else {
            let result = record(.ignoredStale(.generationMismatch(expected: session.generation, received: generation))); return (result, nil)
        }
        if let operation = runtime.operations.first(device: device, generation: generation, kind: kind, path: path, service: service, gattRevision: gattRevision, submittedOnly: true) {
            let result = record(.consumed(operation)); return (result, operation)
        }
        // An operation on the same lane but a different revision is stale;
        // absence of any lane record is an orphan callback.
        if gattRevision != nil,
           runtime.operations.first(device: device, generation: generation, kind: kind, path: path, service: service, submittedOnly: true) != nil {
            let result = record(.ignoredStale(.gattRevisionMismatch)); return (result, nil)
        }
        let result = record(.drainedOrphan(CorrelationLaneID(device: device, generation: generation, gattRevision: gattRevision, kind: String(describing: kind)))); return (result, nil)
    }

    /// Explicitly drains an operation only when the caller intentionally does
    /// not have a Result outcome to deliver. Normal delegate completions must
    /// use `route` followed by Runtime's once-terminal `finishGattOperation`.
    func consume(device: PlatformDeviceID, generation: ConnectionGeneration, operation: OperationID?, gattRevision: GATTDatabaseRevision? = nil) -> DelegateConsumption {
        let result = route(device: device, generation: generation, operation: operation, gattRevision: gattRevision)
        guard case .consumed(let operation) = result, let operation else { return result }
        if runtime.operations.terminate(operation) { return .consumed(operation) }
        return record(.drainedOrphan)
    }

    /// Records a delegate event that is accepted by the current resource lane
    /// but has no pending operation to terminate.
    func consumeEvent(device: PlatformDeviceID, generation: ConnectionGeneration, kind: String, gattRevision: GATTDatabaseRevision? = nil) -> DelegateConsumption {
        guard let session = runtime.sessions.sessions[device] else {
            let result = record(.rejectedNoSession)
            return result
        }
        guard session.generation == generation else {
            let result = record(.ignoredStale(.generationMismatch(expected: session.generation, received: generation)))
            return result
        }
        let result = DelegateConsumption.consumedEvent(CorrelationLaneID(device: device, generation: generation, gattRevision: gattRevision, kind: kind))
        return record(result)
    }

    /// Discovery is a valid delegate event before a connection Session exists.
    func consumeDiscoveryEvent(device: PlatformDeviceID, generation: UInt64) -> DelegateConsumption {
        let result = DelegateConsumption.consumedEvent(CorrelationLaneID(device: device, generation: ConnectionGeneration(rawValue: generation), kind: "discovery"))
        return record(result)
    }

    @discardableResult
    @inline(__always)
    func record(_ result: DelegateConsumption) -> DelegateConsumption { result }
}
