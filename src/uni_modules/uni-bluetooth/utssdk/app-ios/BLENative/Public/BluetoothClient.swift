import Foundation

/// Owns one BLE transport runtime. Retain the client while using its operations.
/// Completions and listeners execute on its serial runtime queue, never the main queue.
/// Listener registration/removal is synchronous; registration may replay buffered events.
/// Callbacks may register/remove this client's listeners, but must not block waiting for other operations.
public final class BluetoothClient {
    private let runtime: BluetoothRuntime
    private let queries: BluetoothQueries
    private let listenerOwner = UUID()

    public convenience init() {
        self.init(runtime: BluetoothRuntime())
    }

    init(runtime: BluetoothRuntime) {
        self.runtime = runtime
        self.queries = BluetoothQueries(runtime: runtime)
    }

    public func open(completion: @escaping (Result<Void, BluetoothError>) -> Void) { runtime.open(completion: completion) }
    public func shutdown(completion: @escaping () -> Void) { runtime.sync({ _ = self.runtime.shutdown() }, completion: { _ in completion() }) }
    public func startDiscovery(options: DiscoveryOptions, completion: @escaping (Result<Void, BluetoothError>) -> Void) { runtime.startDiscovery(options: options, completion: completion) }
    public func stopDiscovery(completion: @escaping (Result<Void, BluetoothError>) -> Void) { runtime.stopDiscovery(completion: completion) }
    /// A nil timeout sets no connection deadline. Paths always address the current connection.
    public func connect(device: PlatformDeviceID, timeoutMilliseconds: Int? = nil, completion: @escaping (Result<Void, BluetoothError>) -> Void) {
        runtime.connect(device: device, timeoutMilliseconds: timeoutMilliseconds) { completion($0.map { _ in () }) }
    }
    public func disconnect(device: PlatformDeviceID, completion: @escaping (Result<Void, BluetoothError>) -> Void) { runtime.disconnect(device: device, completion: completion) }
    public func discoverServices(device: PlatformDeviceID, completion: @escaping (Result<Void, BluetoothError>) -> Void) { runtime.discoverServices(device: device) { completion($0.map { _ in () }) } }
    public func discoverCharacteristics(device: PlatformDeviceID, service: ServiceID, completion: @escaping (Result<Void, BluetoothError>) -> Void) { runtime.discoverCharacteristics(device: device, service: service) { completion($0.map { _ in () }) } }
    public func readValue(path: CharacteristicPath, completion: @escaping (Result<Data, BluetoothError>) -> Void) { runtime.readValue(path: path, completion: completion) }
    /// Success means an ATT response with .withResponse, or local submission with .withoutResponse.
    /// Neither mode proves peripheral business completion.
    public func writeValue(path: CharacteristicPath, value: Data, mode: BLEWriteMode, completion: @escaping (Result<Void, BluetoothError>) -> Void) { runtime.writeValue(path: path, value: value, mode: mode, completion: completion) }
    public func setNotifyValue(path: CharacteristicPath, enabled: Bool, completion: @escaping (Result<Bool, BluetoothError>) -> Void) { runtime.setNotifyValue(path: path, enabled: enabled, completion: completion) }
    public func readRSSI(device: PlatformDeviceID, completion: @escaping (Result<Int, BluetoothError>) -> Void) { runtime.readRSSI(device: device, completion: completion) }
    public func maximumWritePayloadLength(for device: PlatformDeviceID, mode: BLEWriteMode, completion: @escaping (Result<Int, BluetoothError>) -> Void) { runtime.maximumWritePayloadLength(for: device, mode: mode, completion: completion) }
    public func adapterSnapshot(completion: @escaping (BluetoothAdapterSnapshot) -> Void) { queries.adapterSnapshot(completion: completion) }
    public func discoveredDevices(completion: @escaping ([BluetoothDiscoveredDeviceSnapshot]) -> Void) { queries.discoveredDevices(completion: completion) }
    public func connectedDevices(services: [BluetoothUUID]? = nil, completion: @escaping ([BluetoothConnectedDeviceSnapshot]) -> Void) { queries.connectedDevices(services: services, completion: completion) }
    public func gattSnapshot(device: PlatformDeviceID, generation: UInt64? = nil, completion: @escaping (BluetoothGATTSnapshot?) -> Void) { queries.gattSnapshot(device: device, generation: generation, completion: completion) }

    @discardableResult public func addAdapterStateListener(_ listener: @escaping (BluetoothAdapterEvent) -> Void) throws -> BluetoothListenerToken {
        try registerListener(kind: .adapter) { runtime.events.addAdapterStateListener {
            listener(BluetoothAdapterEvent(state: BluetoothClient.adapterState($0.state), discovering: $0.discovering))
        } }
    }
    @discardableResult public func addDiscoveryListener(_ listener: @escaping ([BluetoothDiscoveredDeviceSnapshot]) -> Void) throws -> BluetoothListenerToken {
        try registerListener(kind: .discovery) { runtime.events.addDiscoveryListener { batch in
            listener(batch.map {
                BluetoothDiscoveredDeviceSnapshot(
                    device: $0.device,
                    name: $0.name,
                    rssi: $0.rssi,
                    manufacturerData: $0.manufacturerData,
                    observedAt: $0.observedAt,
                    discoveryGeneration: $0.generation,
                    localName: $0.localName,
                    serviceUUIDs: $0.serviceUUIDs,
                    serviceData: $0.serviceData,
                    connectable: $0.connectable
                )
            })
        } }
    }
    @discardableResult public func addConnectionListener(_ listener: @escaping (BluetoothConnectionEvent) -> Void) throws -> BluetoothListenerToken {
        try registerListener(kind: .connection) { runtime.events.addConnectionListener { event in
            listener(BluetoothConnectionEvent(device: event.device, generation: event.generation.rawValue, state: BluetoothClient.connectionState(event.state)))
        } }
    }
    @discardableResult public func addCharacteristicValueListener(_ listener: @escaping (BluetoothCharacteristicValueEvent) -> Void) throws -> BluetoothListenerToken {
        try registerListener(kind: .value) { runtime.events.addCharacteristicValueListener { event in
            listener(BluetoothCharacteristicValueEvent(path: event.path, generation: event.generation.rawValue, value: event.value))
        } }
    }
    public func removeListener(_ token: BluetoothListenerToken) {
        guard token.owner == listenerOwner else { return }
        runtime.withQueue {
            switch token.kind {
            case .adapter: runtime.events.removeAdapterStateListener(token.value)
            case .discovery: runtime.events.removeDiscoveryListener(token.value)
            case .connection: runtime.events.removeConnectionListener(token.value)
            case .value: runtime.events.removeCharacteristicValueListener(token.value)
            }
        }
    }

    public func removeAllListeners() { runtime.withQueue { runtime.events.removeAllListeners() } }

    private func registerListener(kind: BluetoothListenerToken.Kind, _ register: () -> UInt64?) throws -> BluetoothListenerToken {
        try runtime.withQueue {
            guard let value = register() else { throw BluetoothError.resourceLimitExceeded("listeners") }
            return BluetoothListenerToken(owner: listenerOwner, kind: kind, value: value)
        }
    }

    private static func adapterState(_ state: BluetoothEventHub.AdapterState) -> BluetoothAdapterState {
        switch state {
        case .poweredOn: return .poweredOn
        case .poweredOff: return .poweredOff
        case .resetting: return .resetting
        case .unauthorized: return .unauthorized
        case .unsupported: return .unsupported
        case .unknown: return .unknown
        }
    }

    private static func connectionState(_ state: BluetoothEventHub.ConnectionState) -> BluetoothConnectionState {
        switch state {
        case .connecting: return .connecting
        case .connected: return .connected
        case .disconnected: return .disconnected
        }
    }
}
