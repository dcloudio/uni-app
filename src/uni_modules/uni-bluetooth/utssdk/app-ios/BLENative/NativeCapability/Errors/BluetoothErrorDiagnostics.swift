import Foundation

struct BluetoothErrorContext: Equatable, Sendable {
    let message: String?
    let operation: BluetoothOperationContext?
    let adapterReason: AdapterUnavailableReason?
    let sessionReason: SessionErrorReason?
    let gattReason: GATTErrorReason?
    let discoveryReason: DiscoveryErrorReason?
    let discoveryAgeMilliseconds: Int?
    let discoveryFreshnessWindowMilliseconds: Int?
    let busyReason: BusyReason?
    let resourceReason: ResourceErrorReason?
    let platform: BluetoothPlatformError?

    static let empty = BluetoothErrorContext()

    init(message: String? = nil,
         operation: BluetoothOperationContext? = nil,
         adapterReason: AdapterUnavailableReason? = nil,
         sessionReason: SessionErrorReason? = nil,
         gattReason: GATTErrorReason? = nil,
         discoveryReason: DiscoveryErrorReason? = nil,
         discoveryAgeMilliseconds: Int? = nil,
         discoveryFreshnessWindowMilliseconds: Int? = nil,
         busyReason: BusyReason? = nil,
         resourceReason: ResourceErrorReason? = nil,
         platform: BluetoothPlatformError? = nil) {
        self.message = message
        self.operation = operation
        self.adapterReason = adapterReason
        self.sessionReason = sessionReason
        self.gattReason = gattReason
        self.discoveryReason = discoveryReason
        self.discoveryAgeMilliseconds = discoveryAgeMilliseconds
        self.discoveryFreshnessWindowMilliseconds = discoveryFreshnessWindowMilliseconds
        self.busyReason = busyReason
        self.resourceReason = resourceReason
        self.platform = platform
    }
}

struct BluetoothOperationContext: Equatable, Sendable {
    let operationID: OperationID?
    let kind: String
    let device: PlatformDeviceID?
    let generation: ConnectionGeneration?
    let gattRevision: GATTDatabaseRevision?
    let characteristicPath: CharacteristicPath?

    init(operationID: OperationID? = nil, kind: String, device: PlatformDeviceID? = nil,
         generation: ConnectionGeneration? = nil, gattRevision: GATTDatabaseRevision? = nil,
         characteristicPath: CharacteristicPath? = nil) {
        self.operationID = operationID; self.kind = kind; self.device = device
        self.generation = generation; self.gattRevision = gattRevision
        self.characteristicPath = characteristicPath
    }
}

enum AdapterUnavailableReason: String, Equatable, Sendable { case poweredOff, unauthorized, unsupported, resetting, unknown }
enum SessionErrorReason: String, Equatable, Sendable { case runtimeNotOpened, runtimeShuttingDown, noSession, connecting, connectedRequired, disconnecting, disconnected, generationChanged }
enum GATTErrorReason: String, Equatable, Sendable { case serviceDiscoveryRequired, characteristicDiscoveryRequired, revisionUnavailable, invalidatedByServiceChanged, oldRevision, resourceAbsent }
enum DiscoveryErrorReason: String, Equatable, Sendable { case staleDiscovery }
enum BusyReason: String, Equatable, Sendable { case sameOperationInFlight, laneQuarantined, disconnectInFlight, shutdown }
enum ResourceErrorReason: String, Equatable, Sendable { case concurrentConnections, pendingOperations, writeQueueCount, writeQueueBytes, listeners, eventBuffer, quarantine }
