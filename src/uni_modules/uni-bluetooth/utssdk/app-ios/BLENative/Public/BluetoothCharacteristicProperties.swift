import Foundation

/// GATT characteristic properties, independent of CoreBluetooth types.
public struct BluetoothCharacteristicProperties: OptionSet, Sendable {
    public let rawValue: UInt
    public init(rawValue: UInt) { self.rawValue = rawValue }

    public static let broadcast = Self(rawValue: 1 << 0)
    public static let read = Self(rawValue: 1 << 1)
    public static let writeWithoutResponse = Self(rawValue: 1 << 2)
    public static let write = Self(rawValue: 1 << 3)
    public static let notify = Self(rawValue: 1 << 4)
    public static let indicate = Self(rawValue: 1 << 5)
    public static let authenticatedSignedWrites = Self(rawValue: 1 << 6)
    public static let extendedProperties = Self(rawValue: 1 << 7)
    public static let notifyEncryptionRequired = Self(rawValue: 1 << 8)
    public static let indicateEncryptionRequired = Self(rawValue: 1 << 9)
}
