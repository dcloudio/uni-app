import Foundation

struct ConnectionGeneration: Hashable, Comparable, Sendable {
    let rawValue: UInt64
    static func < (lhs: Self, rhs: Self) -> Bool { lhs.rawValue < rhs.rawValue }
}

struct GATTDatabaseRevision: Hashable, Comparable, Sendable {
    let rawValue: UInt64
    static func < (lhs: Self, rhs: Self) -> Bool { lhs.rawValue < rhs.rawValue }
}

struct OperationID: Hashable, Sendable {
    let rawValue: UInt64
}
