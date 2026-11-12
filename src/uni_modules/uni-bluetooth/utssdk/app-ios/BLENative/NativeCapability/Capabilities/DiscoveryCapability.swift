import CoreBluetooth
import Foundation

struct AdvertisementSnapshot: Sendable, Equatable {
    let device: PlatformDeviceID
    let name: String?
    let localName: String?
    let rssi: Int?
    let manufacturerData: Data?
    let serviceUUIDs: [UUID]
    let serviceData: [String: Data]
    let connectable: Bool?
    let observedAt: UInt64
    let generation: UInt64

    init(
        device: PlatformDeviceID,
        name: String?,
        rssi: Int?,
        manufacturerData: Data?,
        observedAt: UInt64,
        generation: UInt64,
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
        self.serviceUUIDs = serviceUUIDs
        self.serviceData = serviceData
        self.connectable = connectable
        self.observedAt = observedAt
        self.generation = generation
    }
}

struct DiscoveryStartDecision: Equatable, Sendable {
    let generation: UInt64
    let replacesActiveScan: Bool
    let reportIntervalMilliseconds: Int
}

struct DiscoveryEventDecision: Equatable, Sendable {
    let accepted: Bool
    let registered: Bool
    let generation: UInt64
    let publications: [[AdvertisementSnapshot]]
    let removedDevices: Set<PlatformDeviceID>
}

enum PeripheralRegistryRecordDecision: Equatable, Sendable {
    case recorded(evicted: PlatformDeviceID?)
    case rejectedCapacity
}

final class PeripheralRegistry {
    private(set) var snapshots: [PlatformDeviceID: AdvertisementSnapshot] = [:]
    let maximumDeviceCount: Int
    let entryTTLMilliseconds: Int
    init(maximumDeviceCount: Int = 256, entryTTLMilliseconds: Int = 15 * 60 * 1000) {
        self.maximumDeviceCount = maximumDeviceCount; self.entryTTLMilliseconds = entryTTLMilliseconds
    }
    func record(_ snapshot: AdvertisementSnapshot, protected: Set<PlatformDeviceID> = []) -> PeripheralRegistryRecordDecision {
        var evicted: PlatformDeviceID?
        if snapshots[snapshot.device] == nil && snapshots.count >= maximumDeviceCount {
            let removable = snapshots.values.filter { !protected.contains($0.device) }.min { $0.observedAt < $1.observedAt }
            guard let removable else { return .rejectedCapacity }
            snapshots.removeValue(forKey: removable.device)
            evicted = removable.device
        }
        snapshots[snapshot.device] = snapshot
        return .recorded(evicted: evicted)
    }
    @discardableResult
    func prune(expiredBefore: UInt64, protected: Set<PlatformDeviceID> = []) -> Set<PlatformDeviceID> {
        let before = Set(snapshots.keys)
        snapshots = snapshots.filter { protected.contains($0.key) || $0.value.observedAt >= expiredBefore }
        return before.subtracting(snapshots.keys)
    }
    func snapshot(for device: PlatformDeviceID) -> AdvertisementSnapshot? { snapshots[device] }
    func removeAll() { snapshots.removeAll() }
}

final class DiscoveryCapability {
    private(set) var generation: UInt64 = 0
    private(set) var isDiscovering = false
    let registry: PeripheralRegistry
    private(set) var options: DiscoveryOptions?
    private var seen: Set<PlatformDeviceID> = []
    private var currentBatch: [PlatformDeviceID: AdvertisementSnapshot] = [:]
    private(set) var maximumBatchDeviceCount: Int
    init(registry: PeripheralRegistry = PeripheralRegistry(), maximumBatchDeviceCount: Int = 128) {
        self.registry = registry
        self.maximumBatchDeviceCount = maximumBatchDeviceCount
    }
    func start(options: DiscoveryOptions) -> DiscoveryStartDecision {
        let replacesActiveScan = isDiscovering
        generation &+= 1
        seen.removeAll()
        currentBatch.removeAll()
        self.options = options
        isDiscovering = true
        return DiscoveryStartDecision(
            generation: generation,
            replacesActiveScan: replacesActiveScan,
            reportIntervalMilliseconds: options.reportIntervalMilliseconds
        )
    }
    func stop() {
        generation &+= 1
        seen.removeAll()
        currentBatch.removeAll()
        options = nil
        isDiscovering = false
    }

    func flushBatch() -> [AdvertisementSnapshot] {
        let result = currentBatch.values.sorted { $0.observedAt < $1.observedAt }
        currentBatch.removeAll()
        return result
    }
    func flushBatch(generation expectedGeneration: UInt64) -> [AdvertisementSnapshot]? {
        guard isDiscovering, generation == expectedGeneration else { return nil }
        return flushBatch()
    }

    func consume(
        device: PlatformDeviceID,
        name: String?,
        rssi: NSNumber,
        manufacturerData: Data?,
        observedAt: UInt64,
        protectedDevices: Set<PlatformDeviceID> = [],
        localName: String? = nil,
        serviceUUIDs: [UUID] = [],
        serviceData: [String: Data] = [:],
        connectable: Bool? = nil
    ) -> DiscoveryEventDecision {
        guard isDiscovering, let options else {
            return DiscoveryEventDecision(accepted: false, registered: false, generation: generation, publications: [], removedDevices: [])
        }
        let ttlNanos = UInt64(registry.entryTTLMilliseconds) * 1_000_000
        var removedDevices = registry.prune(
            expiredBefore: observedAt > ttlNanos ? observedAt - ttlNanos : 0,
            protected: protectedDevices
        )
        removedDevices.forEach { currentBatch.removeValue(forKey: $0) }
        let validRSSI: Int? = rssi.intValue == 127 ? registry.snapshot(for: device)?.rssi : rssi.intValue
        let snapshot = AdvertisementSnapshot(
            device: device,
            name: name,
            rssi: validRSSI,
            manufacturerData: manufacturerData,
            observedAt: observedAt,
            generation: generation,
            localName: localName,
            serviceUUIDs: serviceUUIDs,
            serviceData: serviceData,
            connectable: connectable
        )
        switch registry.record(snapshot, protected: protectedDevices) {
        case .rejectedCapacity:
            return DiscoveryEventDecision(accepted: true, registered: false, generation: generation, publications: [], removedDevices: removedDevices)
        case .recorded(let evicted):
            if let evicted {
                removedDevices.insert(evicted)
                currentBatch.removeValue(forKey: evicted)
            }
        }
        removedDevices.remove(device)

        let shouldPublish = options.allowDuplicates || !seen.contains(device)
        seen.insert(device)
        guard shouldPublish else {
            return DiscoveryEventDecision(accepted: true, registered: true, generation: generation, publications: [], removedDevices: removedDevices)
        }
        if options.reportIntervalMilliseconds == 0 {
            return DiscoveryEventDecision(accepted: true, registered: true, generation: generation, publications: [[snapshot]], removedDevices: removedDevices)
        }
        currentBatch[device] = snapshot
        let publications = currentBatch.count >= maximumBatchDeviceCount ? [flushBatch()] : []
        return DiscoveryEventDecision(accepted: true, registered: true, generation: generation, publications: publications, removedDevices: removedDevices)
    }
}
