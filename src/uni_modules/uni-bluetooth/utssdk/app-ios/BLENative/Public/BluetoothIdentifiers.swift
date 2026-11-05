import Foundation

/// Opaque platform identifier for one discovered BLE peripheral.
public struct PlatformDeviceID: Hashable, Sendable {
    public let rawValue: UUID

    public init(rawValue: UUID) {
        self.rawValue = rawValue
    }
}

/// Canonical 128-bit representation of a Bluetooth UUID.
public struct BluetoothUUID: Hashable, Sendable {
    public let canonical128: UUID

    public init(canonical128: UUID) {
        self.canonical128 = canonical128
    }
}

public struct ServiceID: Hashable, Sendable {
    public let uuid: BluetoothUUID

    public init(uuid: BluetoothUUID) {
        self.uuid = uuid
    }
}

public struct CharacteristicID: Hashable, Sendable {
    public let uuid: BluetoothUUID

    public init(uuid: BluetoothUUID) {
        self.uuid = uuid
    }
}

public struct CharacteristicPath: Hashable, Sendable {
    public let device: PlatformDeviceID
    public let service: ServiceID
    public let characteristic: CharacteristicID

    public init(device: PlatformDeviceID, service: ServiceID, characteristic: CharacteristicID) {
        self.device = device
        self.service = service
        self.characteristic = characteristic
    }
}

public enum BLEWriteMode: Sendable {
    case withResponse
    case withoutResponse
}

public struct DiscoveryOptions: Equatable, Sendable {
    public let services: [BluetoothUUID]?
    public let allowDuplicates: Bool
    public let reportIntervalMilliseconds: Int

    public init(
        services: [BluetoothUUID]? = nil,
        allowDuplicates: Bool = false,
        reportIntervalMilliseconds: Int = 0
    ) throws {
        guard reportIntervalMilliseconds >= 0 else {
            throw BluetoothError.invalidParameter("report interval")
        }
        self.services = services.map { Array(Set($0)) }
        self.allowDuplicates = allowDuplicates
        self.reportIntervalMilliseconds = reportIntervalMilliseconds
    }
}
