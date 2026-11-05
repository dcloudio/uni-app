import Foundation

enum PendingOperationKind: Hashable, Sendable {
    case generic
    case connection
    case serviceDiscovery
    case characteristicDiscovery
    case subscriptionChange
    case read
    case rssi
    case writeWithResponse
    case writeWithoutResponse

    var isDiscovery: Bool {
        self == .serviceDiscovery || self == .characteristicDiscovery
    }
}

/// Holds ordering and submission parameters only. Registry owns every terminal
/// result; Runtime owns deadlines and lifecycle cleanup.
final class OperationLaneScheduler {
    struct Key: Hashable {
        let device: PlatformDeviceID
        let generation: ConnectionGeneration
        let path: CharacteristicPath?
        let kind: PendingOperationKind

        init(_ record: PendingOperationRegistry.Record) {
            device = record.device; generation = record.generation
            path = record.path; kind = record.kind
        }
    }
    enum Payload {
        case read, write(Data), subscription(Bool)
    }
    struct Entry {
        let operation: OperationID
        let payload: Payload
        let waitingDeadline: UInt64
    }
    private var lanes: [Key: [Entry]] = [:]
    private var paused: Set<GATTSessionKey> = []

    func enqueue(_ record: PendingOperationRegistry.Record, payload: Payload, waitingDeadline: UInt64, maximumCount: Int) -> Bool {
        let key = Key(record)
        guard lanes[key, default: []].count < maximumCount else { return false }
        lanes[key, default: []].append(Entry(operation: record.id, payload: payload, waitingDeadline: waitingDeadline))
        return true
    }

    func head(_ key: Key) -> Entry? {
        guard !paused.contains(GATTSessionKey(device: key.device, generation: key.generation)) else { return nil }
        return lanes[key]?.first
    }

    func remove(_ record: PendingOperationRegistry.Record) {
        let key = Key(record)
        lanes[key]?.removeAll { $0.operation == record.id }
        if lanes[key]?.isEmpty == true { lanes.removeValue(forKey: key) }
    }

    func keys(device: PlatformDeviceID, generation: ConnectionGeneration) -> [Key] {
        lanes.keys.filter { $0.device == device && $0.generation == generation }
    }

    func pause(device: PlatformDeviceID, generation: ConnectionGeneration) {
        paused.insert(GATTSessionKey(device: device, generation: generation))
    }

    func resume(device: PlatformDeviceID, generation: ConnectionGeneration) {
        paused.remove(GATTSessionKey(device: device, generation: generation))
    }

    func clear() { lanes.removeAll(); paused.removeAll() }
}

enum PendingOperationOutcome {
    case connection(ConnectionGeneration)
    case gattRevision(GATTDatabaseRevision)
    case subscription(Bool)
    case value(Data)
    case rssi(Int)
    case void
    case failure(BluetoothError)
}

final class PendingOperationRegistry {
    typealias Completion = (PendingOperationOutcome) -> Void
    enum Status: Sendable { case queued, submitted, terminal }
    struct Record: Sendable {
        let id: OperationID
        let device: PlatformDeviceID
        let generation: ConnectionGeneration
        let kind: PendingOperationKind
        let path: CharacteristicPath?
        let service: ServiceID?
        let gattRevision: GATTDatabaseRevision?
        var status: Status
        // Disabling notify later cannot prove the origin of an overlapping value.
        var readValueSourceAmbiguous = false
    }
    private var nextID: UInt64 = 0
    private(set) var records: [OperationID: Record] = [:]
    private var completions: [OperationID: Completion] = [:]
    private var attachments: [OperationID: [Completion]] = [:]
    init() {}
    func insert(device: PlatformDeviceID, generation: ConnectionGeneration, kind: PendingOperationKind = .generic, path: CharacteristicPath? = nil, service: ServiceID? = nil, gattRevision: GATTDatabaseRevision? = nil, completion: Completion? = nil) -> OperationID {
        nextID &+= 1
        let id = OperationID(rawValue: nextID)
        records[id] = Record(id: id, device: device, generation: generation, kind: kind, path: path, service: service, gattRevision: gattRevision, status: .queued)
        if let completion { completions[id] = completion }
        return id
    }
    func markSubmitted(_ id: OperationID) { records[id]?.status = .submitted }
    /// Shares the terminal result of an already-pending operation with another
    /// caller. Used for RSSI single-flight so concurrent reads fan out from one
    /// platform submission while the registry stays the only completion owner.
    @discardableResult
    func attach(_ id: OperationID, completion: @escaping Completion) -> Bool {
        guard records[id] != nil else { return false }
        attachments[id, default: []].append(completion)
        return true
    }
    func markReadValueSourceAmbiguous(_ id: OperationID) {
        guard records[id]?.kind == .read else { return }
        records[id]?.readValueSourceAmbiguous = true
    }
    @discardableResult func terminate(_ id: OperationID) -> Bool {
        guard let record = records[id], record.status != .terminal else { return false }
        records.removeValue(forKey: id); completions.removeValue(forKey: id); attachments.removeValue(forKey: id)
        return true
    }
    func first(device: PlatformDeviceID, generation: ConnectionGeneration, kind: PendingOperationKind? = nil, path: CharacteristicPath? = nil, service: ServiceID? = nil, gattRevision: GATTDatabaseRevision? = nil, submittedOnly: Bool = false) -> OperationID? {
        records.values.filter { record in
            (!submittedOnly || record.status == .submitted) && record.device == device && record.generation == generation && (kind == nil || record.kind == kind) && (path == nil || record.path == path) && (service == nil || record.service == service) && (gattRevision == nil || record.gattRevision == gattRevision)
        }.min { $0.id.rawValue < $1.id.rawValue }?.id
    }
    func count(device: PlatformDeviceID, generation: ConnectionGeneration? = nil) -> Int {
        records.values.reduce(into: 0) { count, record in
            guard record.device == device, generation == nil || record.generation == generation else { return }
            count += 1
        }
    }

    func hasDiscoveryBarrier(device: PlatformDeviceID, generation: ConnectionGeneration) -> Bool {
        records.values.contains { $0.device == device && $0.generation == generation && $0.kind.isDiscovery }
    }
    @discardableResult
    func finish(_ id: OperationID, outcome: PendingOperationOutcome) -> Bool {
        guard let record = records[id], record.status != .terminal else { return false }
        records.removeValue(forKey: id)
        let completion = completions.removeValue(forKey: id)
        let attached = attachments.removeValue(forKey: id)
        completion?(outcome)
        attached?.forEach { $0(outcome) }
        return true
    }
    func removeAll(for device: PlatformDeviceID, generation: ConnectionGeneration) -> [OperationID] {
        let ids = records.values.filter { $0.device == device && $0.generation == generation }.map(\.id)
        ids.forEach { _ = terminate($0) }; return ids
    }
}
