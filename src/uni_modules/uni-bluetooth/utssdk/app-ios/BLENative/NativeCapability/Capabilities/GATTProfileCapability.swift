import CoreBluetooth
import Foundation

struct CharacteristicSnapshot: Sendable {
    let id: CharacteristicID
    let properties: CBCharacteristicProperties.RawValue
    init(id: CharacteristicID, properties: CBCharacteristicProperties.RawValue) {
        self.id = id; self.properties = properties
    }
}
struct ServiceSnapshot: Sendable {
    let id: ServiceID
    let isPrimary: Bool
    let characteristics: [CharacteristicSnapshot]
    init(id: ServiceID, isPrimary: Bool = true, characteristics: [CharacteristicSnapshot]) {
        self.id = id; self.isPrimary = isPrimary; self.characteristics = characteristics
    }
}
struct GATTSessionKey: Hashable, Sendable {
    let device: PlatformDeviceID
    let generation: ConnectionGeneration
    init(device: PlatformDeviceID, generation: ConnectionGeneration) { self.device = device; self.generation = generation }
}
struct GATTSessionSnapshot: Sendable {
    let revision: GATTDatabaseRevision
    let services: [ServiceID: ServiceSnapshot]
}

struct GATTDiscoveryAdmission: Equatable, Sendable {
    let kind: PendingOperationKind
    let revision: GATTDatabaseRevision
    let service: ServiceID?
    let path: CharacteristicPath?

    init(kind: PendingOperationKind, revision: GATTDatabaseRevision,
                service: ServiceID? = nil, path: CharacteristicPath? = nil) {
        self.kind = kind
        self.revision = revision
        self.service = service
        self.path = path
    }
}

enum GATTServiceDiscoveryCallbackDecision: Equatable, Sendable {
    case accepted(revision: GATTDatabaseRevision)
    case rejectedNoSnapshot
    case rejectedStaleObjects
}

enum GATTServiceChangeDecision: Equatable, Sendable {
    case accepted(invalidatedRevision: GATTDatabaseRevision)
    case rejectedNoSnapshot
    case rejectedDiscoveryInFlight
}

enum GATTDiscoveryCommitDecision: Equatable, Sendable {
    case accepted(revision: GATTDatabaseRevision)
    case rejectedStaleRevision
    case rejectedMissingService
    case rejectedMissingCharacteristic
    case rejectedDuplicateUUID
}

final class GATTProfileCapability {
    private struct DiscoveryBarrier {
        let kind: PendingOperationKind
        let service: ServiceID?
        let path: CharacteristicPath?
    }
    private var unresolvedDiscoveries: [GATTSessionKey: DiscoveryBarrier] = [:]
    private var snapshots: [GATTSessionKey: GATTSessionSnapshot] = [:]
    private var rediscoveryBaselines: [GATTSessionKey: Set<ObjectIdentifier>] = [:]
    private var nextRevision: UInt64 = 0
    init() {}
    func isDiscoveryQuarantined(device: PlatformDeviceID, generation: ConnectionGeneration) -> Bool {
        unresolvedDiscoveries[GATTSessionKey(device: device, generation: generation)] != nil
    }

    func quarantineDiscovery(_ record: PendingOperationRegistry.Record) {
        guard record.kind.isDiscovery else { return }
        unresolvedDiscoveries[GATTSessionKey(device: record.device, generation: record.generation)] =
            DiscoveryBarrier(kind: record.kind, service: record.service, path: record.path)
    }

    func consumeDiscoveryQuarantine(device: PlatformDeviceID, generation: ConnectionGeneration,
                                    kind: PendingOperationKind, service: ServiceID? = nil, path: CharacteristicPath? = nil) -> Bool {
        let key = GATTSessionKey(device: device, generation: generation)
        guard let barrier = unresolvedDiscoveries[key], barrier.kind == kind,
              barrier.service == service, barrier.path == path else { return false }
        unresolvedDiscoveries.removeValue(forKey: key)
        return true
    }

    private func hasGATTWork(device: PlatformDeviceID, generation: ConnectionGeneration, operations: PendingOperationRegistry) -> Bool {
        isDiscoveryQuarantined(device: device, generation: generation) ||
            operations.records.values.contains { $0.device == device && $0.generation == generation && $0.gattRevision != nil }
    }
    func beginDiscovery(device: PlatformDeviceID, generation: ConnectionGeneration) -> GATTDatabaseRevision {
        nextRevision &+= 1
        let value = GATTDatabaseRevision(rawValue: nextRevision)
        snapshots[GATTSessionKey(device: device, generation: generation)] = GATTSessionSnapshot(revision: value, services: [:])
        return value
    }

    func admitServiceDiscovery(
        device: PlatformDeviceID,
        generation: ConnectionGeneration,
        operations: PendingOperationRegistry,
        maximumPendingOperations: Int
    ) -> Result<GATTDiscoveryAdmission, BluetoothError> {
        guard !hasGATTWork(device: device, generation: generation, operations: operations) else {
            return .failure(.busy("GATT discovery barrier"))
        }
        guard operations.count(device: device, generation: generation) < maximumPendingOperations else {
            return .failure(.resourceLimitExceeded("pendingOperations"))
        }
        guard operations.first(device: device, generation: generation, kind: .serviceDiscovery) == nil else {
            return .failure(.busy("service discovery busy"))
        }
        let revision = beginDiscovery(device: device, generation: generation)
        return .success(GATTDiscoveryAdmission(kind: .serviceDiscovery, revision: revision))
    }

    func admitCharacteristicDiscovery(
        device: PlatformDeviceID,
        generation: ConnectionGeneration,
        service: ServiceID,
        operations: PendingOperationRegistry,
        maximumPendingOperations: Int
    ) -> Result<GATTDiscoveryAdmission, BluetoothError> {
        guard !hasGATTWork(device: device, generation: generation, operations: operations) else {
            return .failure(.busy("GATT discovery barrier"))
        }
        guard let current = snapshot(device: device, generation: generation) else {
            return .failure(.gattNotReady)
        }
        guard current.services[service] != nil else {
            return .failure(.notReady)
        }
        guard operations.first(device: device, generation: generation, kind: .characteristicDiscovery, service: service) == nil else {
            return .failure(.busy("characteristic discovery busy"))
        }
        guard operations.count(device: device, generation: generation) < maximumPendingOperations else {
            return .failure(.resourceLimitExceeded("pendingOperations"))
        }
        return .success(GATTDiscoveryAdmission(
            kind: .characteristicDiscovery,
            revision: current.revision,
            service: service
        ))
    }

    func acceptServiceChanged(
        device: PlatformDeviceID,
        generation: ConnectionGeneration,
        currentServices: [BluetoothServiceHandle],
        operations: PendingOperationRegistry
    ) -> GATTServiceChangeDecision {
        let key = GATTSessionKey(device: device, generation: generation)
        guard let current = snapshots[key] else { return .rejectedNoSnapshot }
        guard operations.first(device: device, generation: generation, kind: .serviceDiscovery) == nil else {
            return .rejectedDiscoveryInFlight
        }
        guard !isDiscoveryQuarantined(device: device, generation: generation) else { return .rejectedDiscoveryInFlight }
        rediscoveryBaselines[key] = Set(currentServices.map(ObjectIdentifier.init))
        snapshots.removeValue(forKey: key)
        return .accepted(invalidatedRevision: current.revision)
    }

    func classifyServiceDiscoveryCallback(
        device: PlatformDeviceID,
        generation: ConnectionGeneration,
        services: [BluetoothServiceHandle]
    ) -> GATTServiceDiscoveryCallbackDecision {
        let key = GATTSessionKey(device: device, generation: generation)
        guard let current = snapshots[key] else { return .rejectedNoSnapshot }
        let callbackObjects = Set(services.map(ObjectIdentifier.init))
        if !callbackObjects.isEmpty,
           let baseline = rediscoveryBaselines[key],
           !baseline.isEmpty,
           callbackObjects.isSubset(of: baseline) {
            return .rejectedStaleObjects
        }
        return .accepted(revision: current.revision)
    }

    func commitServiceDiscovery(
        _ services: [BluetoothServiceHandle],
        device: PlatformDeviceID,
        generation: ConnectionGeneration,
        revision: GATTDatabaseRevision
    ) -> GATTDiscoveryCommitDecision {
        let key = GATTSessionKey(device: device, generation: generation)
        guard snapshots[key]?.revision == revision else { return .rejectedStaleRevision }
        guard Set(services.map(\.uuid)).count == services.count,
              services.allSatisfy({ Self.hasUniqueUUIDs($0.characteristics) }) else {
            return .rejectedDuplicateUUID
        }
        var catalog: [ServiceID: ServiceSnapshot] = [:]
        services.forEach { service in
            let id = ServiceID(uuid: service.uuid)
            catalog[id] = Self.makeServiceSnapshot(
                id: id,
                isPrimary: service.isPrimary,
                characteristics: service.characteristics
            )
        }
        snapshots[key] = GATTSessionSnapshot(revision: revision, services: catalog)
        rediscoveryBaselines.removeValue(forKey: key)
        return .accepted(revision: revision)
    }

    func commitCharacteristicDiscovery(
        service: BluetoothServiceHandle,
        characteristics: [BluetoothCharacteristicHandle],
        device: PlatformDeviceID,
        generation: ConnectionGeneration,
        revision: GATTDatabaseRevision
    ) -> GATTDiscoveryCommitDecision {
        let key = GATTSessionKey(device: device, generation: generation)
        guard let current = snapshots[key], current.revision == revision else {
            return .rejectedStaleRevision
        }
        let sid = ServiceID(uuid: service.uuid)
        guard current.services[sid] != nil else { return .rejectedMissingService }
        guard Self.hasUniqueUUIDs(characteristics) else { return .rejectedDuplicateUUID }
        var services = current.services
        services[sid] = Self.makeServiceSnapshot(id: sid, isPrimary: service.isPrimary, characteristics: characteristics)
        snapshots[key] = GATTSessionSnapshot(revision: revision, services: services)
        return .accepted(revision: revision)
    }

    func snapshot(device: PlatformDeviceID, generation: ConnectionGeneration) -> GATTSessionSnapshot? {
        snapshots[GATTSessionKey(device: device, generation: generation)]
    }
    func service(uuid: BluetoothUUID, device: PlatformDeviceID, generation: ConnectionGeneration, revision: GATTDatabaseRevision) -> ServiceSnapshot? {
        guard let snapshot = snapshots[GATTSessionKey(device: device, generation: generation)], snapshot.revision == revision else { return nil }
        return snapshot.services[ServiceID(uuid: uuid)]
    }
    func containsCharacteristic(_ path: CharacteristicPath, generation: ConnectionGeneration, revision: GATTDatabaseRevision) -> Bool {
        guard let current = snapshots[GATTSessionKey(device: path.device, generation: generation)] else { return false }
        guard current.revision == revision,
              let service = current.services[path.service] else { return false }
        return service.characteristics.contains { $0.id == path.characteristic }
    }
    func invalidate(device: PlatformDeviceID, generation: ConnectionGeneration) {
        let key = GATTSessionKey(device: device, generation: generation)
        unresolvedDiscoveries.removeValue(forKey: key)
        snapshots.removeValue(forKey: key)
        rediscoveryBaselines.removeValue(forKey: key)
    }
    func invalidateAll() {
        unresolvedDiscoveries.removeAll()
        snapshots.removeAll()
        rediscoveryBaselines.removeAll()
    }
    private static func hasUniqueUUIDs(_ characteristics: [BluetoothCharacteristicHandle]) -> Bool {
        Set(characteristics.map(\.uuid)).count == characteristics.count
    }

    private static func makeServiceSnapshot(
        id: ServiceID,
        isPrimary: Bool = true,
        characteristics: [BluetoothCharacteristicHandle]
    ) -> ServiceSnapshot {
        ServiceSnapshot(id: id, isPrimary: isPrimary, characteristics: characteristics.map { characteristic in
            CharacteristicSnapshot(
                id: CharacteristicID(uuid: characteristic.uuid),
                properties: characteristic.properties
            )
        })
    }
}
