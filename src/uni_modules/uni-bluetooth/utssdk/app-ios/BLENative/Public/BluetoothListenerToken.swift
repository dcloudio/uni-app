import Foundation

/// Identifies a listener owned by one BluetoothClient. Tokens cannot be constructed by consumers.
public struct BluetoothListenerToken: Hashable, Sendable {
    enum Kind: Hashable, Sendable { case adapter, discovery, connection, value }
    let owner: UUID
    let kind: Kind
    let value: UInt64
}
