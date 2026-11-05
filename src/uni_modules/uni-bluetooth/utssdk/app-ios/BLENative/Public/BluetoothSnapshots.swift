import Foundation

/// Stable, CoreBluetooth-free lifecycle values exposed to SDK consumers.
public enum BluetoothLifecycle: String, Sendable {
    case idle, initializing, ready, unavailable, resetting, shuttingDown
}

public enum BluetoothAdapterState: String, Sendable {
    case poweredOn, poweredOff, resetting, unauthorized, unsupported, unknown
}

public struct BluetoothAdapterEvent: Sendable {
    public let state: BluetoothAdapterState
    public let discovering: Bool
    init(state: BluetoothAdapterState, discovering: Bool = false) {
        self.state = state
        self.discovering = discovering
    }
}

public struct BluetoothAdapterSnapshot: Sendable {
    public let lifecycle: BluetoothLifecycle
    public let state: BluetoothAdapterState?
    public let discovering: Bool

    init(lifecycle: BluetoothLifecycle, state: BluetoothAdapterState?, discovering: Bool) {
        self.lifecycle = lifecycle
        self.state = state
        self.discovering = discovering
    }
}

public struct BluetoothDiscoveredDeviceSnapshot: Sendable {
    public let device: PlatformDeviceID
    public let name: String?
    public let localName: String?
    public let rssi: Int?
    public let manufacturerData: Data?
    public let serviceUUIDs: [BluetoothUUID]
    public let serviceData: [BluetoothUUID: Data]
    public let connectable: Bool?
    public let observedAt: UInt64
    public let discoveryGeneration: UInt64

    init(
        device: PlatformDeviceID,
        name: String?,
        rssi: Int?,
        manufacturerData: Data?,
        observedAt: UInt64,
        discoveryGeneration: UInt64,
        localName: String? = nil,
        serviceUUIDs: [UUID] = [],
        serviceData: [String: Data] = [:],
        connectable: Bool? = nil
    ) {
        self.device = device
        self.name = name
        self.localName = localName ?? name
        self.rssi = rssi
        self.manufacturerData = manufacturerData
        self.serviceUUIDs = serviceUUIDs.map(BluetoothUUID.init(canonical128:))
        self.serviceData = serviceData.reduce(into: [:]) { result, entry in
            if let uuid = UUID(uuidString: entry.key) {
                result[BluetoothUUID(canonical128: uuid)] = entry.value
            }
        }
        self.connectable = connectable
        self.observedAt = observedAt
        self.discoveryGeneration = discoveryGeneration
    }
}

public enum BluetoothConnectionState: String, Sendable { case connecting, connected, disconnecting, disconnected }

public struct BluetoothConnectedDeviceSnapshot: Sendable {
    public let device: PlatformDeviceID
    public let generation: UInt64
    public let state: BluetoothConnectionState

    init(device: PlatformDeviceID, generation: UInt64, state: BluetoothConnectionState) {
        self.device = device
        self.generation = generation
        self.state = state
    }
}

public struct BluetoothConnectionEvent: Sendable {
    public let device: PlatformDeviceID
    public let generation: UInt64
    public let state: BluetoothConnectionState
    init(device: PlatformDeviceID, generation: UInt64, state: BluetoothConnectionState) {
        self.device = device; self.generation = generation; self.state = state
    }
}

public struct BluetoothCharacteristicValueEvent: Sendable {
    public let path: CharacteristicPath
    public let generation: UInt64
    public let value: Data
    init(path: CharacteristicPath, generation: UInt64, value: Data) {
        self.path = path; self.generation = generation; self.value = value
    }
}

public struct BluetoothCharacteristicSnapshot: Sendable {
    public let uuid: BluetoothUUID
    public let properties: BluetoothCharacteristicProperties
    init(uuid: BluetoothUUID, properties: BluetoothCharacteristicProperties) {
        self.uuid = uuid; self.properties = properties
    }
}

public struct BluetoothServiceSnapshot: Sendable {
    public let uuid: BluetoothUUID
    public let isPrimary: Bool
    public let characteristics: [BluetoothCharacteristicSnapshot]
    init(uuid: BluetoothUUID, isPrimary: Bool = true, characteristics: [BluetoothCharacteristicSnapshot]) {
        self.uuid = uuid; self.isPrimary = isPrimary; self.characteristics = characteristics
    }
}

public struct BluetoothGATTSnapshot: Sendable {
    public let device: PlatformDeviceID
    public let connectionGeneration: UInt64
    public let revision: UInt64
    public let services: [BluetoothServiceSnapshot]
    init(device: PlatformDeviceID, connectionGeneration: UInt64, revision: UInt64, services: [BluetoothServiceSnapshot]) {
        self.device = device; self.connectionGeneration = connectionGeneration; self.revision = revision; self.services = services
    }
}
