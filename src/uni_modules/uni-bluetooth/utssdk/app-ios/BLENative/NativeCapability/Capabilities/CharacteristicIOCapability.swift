import CoreBluetooth
import Foundation

/// Correlation policy for characteristic read and notify on the same path.
/// `strict` excludes overlapping read and notify. `concurrent` permits platform
/// overlap, but shared callbacks cannot prove read success during a subscription.
enum ReadNotifyCorrelationPolicy: Equatable, Sendable {
    case strict
    case concurrent
}

enum CharacteristicIOTimeoutAction: Hashable, Sendable {
    case quarantineRead(CharacteristicPath)
    case expireRead(CharacteristicPath)
    case quarantineWrite(CharacteristicPath)
    case quarantineSubscription(CharacteristicPath)
    case expireQueuedWrite(PlatformDeviceID)
}

struct CharacteristicIOOperationAdmission: Equatable, Sendable {
    let kind: PendingOperationKind
    let timeoutAction: CharacteristicIOTimeoutAction

    init(kind: PendingOperationKind, timeoutAction: CharacteristicIOTimeoutAction) {
        self.kind = kind
        self.timeoutAction = timeoutAction
    }
}

struct CharacteristicIOWriteAdmission {
    let policy: CharacteristicIOCapability.WritePolicy
    let operation: CharacteristicIOOperationAdmission

    init(policy: CharacteristicIOCapability.WritePolicy, operation: CharacteristicIOOperationAdmission) {
        self.policy = policy
        self.operation = operation
    }
}

struct CharacteristicIOSubscriptionAdmission: Equatable, Sendable {
    let alreadySatisfied: Bool
    let operation: CharacteristicIOOperationAdmission?

    init(alreadySatisfied: Bool, operation: CharacteristicIOOperationAdmission?) {
        self.alreadySatisfied = alreadySatisfied
        self.operation = operation
    }
}

struct CharacteristicIOTimeoutDecision: Equatable, Sendable {
    let action: CharacteristicIOTimeoutAction
    let stateChanged: Bool

    init(action: CharacteristicIOTimeoutAction, stateChanged: Bool) {
        self.action = action
        self.stateChanged = stateChanged
    }
}

/// Owns characteristic I/O policy and mutable lane state. It does not own
/// pending operation completion or CoreBluetooth resources.
final class CharacteristicIOCapability {
    struct QueuedWrite {
        let operation: OperationID
        let path: CharacteristicPath
        let generation: ConnectionGeneration
        let peripheral: BluetoothPeripheralHandle
        let characteristic: BluetoothCharacteristicHandle
        let data: Data

        init(operation: OperationID, path: CharacteristicPath, generation: ConnectionGeneration,
                    peripheral: BluetoothPeripheralHandle, characteristic: BluetoothCharacteristicHandle, data: Data) {
            self.operation = operation
            self.path = path
            self.generation = generation
            self.peripheral = peripheral
            self.characteristic = characteristic
            self.data = data
        }
    }

    struct WritePolicy {
        let kind: PendingOperationKind
        let type: CBCharacteristicWriteType
        let maximumLength: Int

        init(kind: PendingOperationKind, type: CBCharacteristicWriteType, maximumLength: Int) {
            self.kind = kind
            self.type = type
            self.maximumLength = maximumLength
        }
    }

    private let maximumQuarantinedLaneCountPerDevice: Int
    private let maximumQuarantinedLaneCountPerRuntime: Int
    private var operationTimeouts: [OperationID: AnyObject] = [:]
    private var timeoutActions: [OperationID: CharacteristicIOTimeoutAction] = [:]
    private var quarantinedReadPaths: Set<CharacteristicPath> = []
    private var ambiguousReadPaths: Set<CharacteristicPath> = []
    private var quarantinedWritePaths: Set<CharacteristicPath> = []
    private var quarantinedSubscriptionPaths: Set<CharacteristicPath> = []
    private var withoutResponseQueues: [PlatformDeviceID: WriteWithoutResponsePump<QueuedWrite>] = [:]
    private var scheduledWritePumps: Set<PlatformDeviceID> = []

    init(
        maximumQuarantinedLaneCountPerDevice: Int = 32,
        maximumQuarantinedLaneCountPerRuntime: Int = 256
    ) {
        precondition(maximumQuarantinedLaneCountPerDevice > 0)
        precondition(maximumQuarantinedLaneCountPerRuntime >= maximumQuarantinedLaneCountPerDevice)
        self.maximumQuarantinedLaneCountPerDevice = maximumQuarantinedLaneCountPerDevice
        self.maximumQuarantinedLaneCountPerRuntime = maximumQuarantinedLaneCountPerRuntime
    }

    func canRead(_ characteristic: CharacteristicSnapshot) -> Bool {
        characteristic.properties & CBCharacteristicProperties.read.rawValue != 0
    }

    /// Read admission and its lane state live here; operation completion still
    /// belongs exclusively to PendingOperationRegistry.
    func admitRead(
        path: CharacteristicPath,
        generation: ConnectionGeneration,
        characteristic: CharacteristicSnapshot,
        subscriptionActive: Bool,
        policy: ReadNotifyCorrelationPolicy,
        operations: PendingOperationRegistry,
        maximumPendingOperations: Int,
        discoveryBlocked: Bool = false
    ) -> Result<CharacteristicIOOperationAdmission, BluetoothError> {
        guard !discoveryBlocked, !operations.hasDiscoveryBarrier(device: path.device, generation: generation) else {
            return .failure(.busy("GATT discovery barrier"))
        }
        guard canRead(characteristic) else {
            return .failure(.propertyNotSupported)
        }
        if policy == .strict {
            guard !subscriptionActive,
                  operations.first(device: path.device, generation: generation, kind: .subscriptionChange, path: path) == nil else {
                return .failure(.busy("strict read conflicts with active subscription"))
            }
        }
        guard !quarantinedReadPaths.contains(path) else {
            return .failure(.busy("read lane quarantined until disconnect"))
        }
        guard operations.count(device: path.device, generation: generation) < maximumPendingOperations else {
            return .failure(.resourceLimitExceeded("pendingOperations"))
        }
        // This admission hint must not swallow notifications. Runtime records
        // overlap history and keeps ambiguous reads isolated until disconnect,
        // while continuing to publish subscription values.
        let timeoutAction: CharacteristicIOTimeoutAction = policy == .strict || !subscriptionActive
            ? .quarantineRead(path)
            : .expireRead(path)
        return .success(CharacteristicIOOperationAdmission(kind: .read, timeoutAction: timeoutAction))
    }

    func admitSubscription(
        path: CharacteristicPath,
        generation: ConnectionGeneration,
        characteristic: CharacteristicSnapshot,
        enabled: Bool,
        currentlyActive: Bool,
        policy: ReadNotifyCorrelationPolicy,
        operations: PendingOperationRegistry,
        maximumPendingOperations: Int,
        discoveryBlocked: Bool = false
    ) -> Result<CharacteristicIOSubscriptionAdmission, BluetoothError> {
        guard !discoveryBlocked, !operations.hasDiscoveryBarrier(device: path.device, generation: generation) else {
            return .failure(.busy("GATT discovery barrier"))
        }
        let notifyMask = CBCharacteristicProperties.notify.rawValue | CBCharacteristicProperties.indicate.rawValue
        guard characteristic.properties & notifyMask != 0 else {
            return .failure(.propertyNotSupported)
        }
        guard canStartSubscription(path) else {
            return .failure(.busy("subscription lane quarantined until disconnect"))
        }
        // Symmetric half of the strict mutual exclusion: enabling a
        // subscription while a read is pending is only rejected under `strict`.
        if policy == .strict, enabled {
            guard !isReadQuarantined(path) else { return .failure(.busy("strict subscription conflicts with quarantined read")) }
            guard operations.first(device: path.device, generation: generation, kind: .read, path: path) == nil else {
                return .failure(.busy("strict subscription conflicts with pending read"))
            }
        }
        guard operations.count(device: path.device, generation: generation) < maximumPendingOperations else {
            return .failure(.resourceLimitExceeded("pendingOperations"))
        }
        guard currentlyActive != enabled || operations.first(device: path.device, generation: generation, kind: .subscriptionChange, path: path) != nil else {
            return .success(CharacteristicIOSubscriptionAdmission(alreadySatisfied: true, operation: nil))
        }
        return .success(CharacteristicIOSubscriptionAdmission(
            alreadySatisfied: false,
            operation: CharacteristicIOOperationAdmission(
                kind: .subscriptionChange,
                timeoutAction: .quarantineSubscription(path)
            )
        ))
    }

    func admitWrite(
        path: CharacteristicPath,
        generation: ConnectionGeneration,
        value: Data,
        resource: any BluetoothRuntimeResource,
        peripheral: BluetoothPeripheralHandle,
        characteristic: CharacteristicSnapshot,
        mode: BLEWriteMode,
        operations: PendingOperationRegistry,
        maximumPendingOperations: Int,
        maximumQueuedCount: Int,
        maximumQueuedBytes: Int,
        discoveryBlocked: Bool = false
    ) -> Result<CharacteristicIOWriteAdmission, BluetoothError> {
        guard !discoveryBlocked, !operations.hasDiscoveryBarrier(device: path.device, generation: generation) else {
            return .failure(.busy("GATT discovery barrier"))
        }
        let policy: WritePolicy
        switch writePolicy(
            resource: resource,
            peripheral: peripheral,
            characteristic: characteristic,
            mode: mode
        ) {
        case .success(let value):
            policy = value
        case .failure(let error):
            return .failure(error)
        }
        guard value.count <= policy.maximumLength else {
            return .failure(.invalidParameter("payload exceeds maximum write length"))
        }
        switch mode {
        case .withResponse:
            guard canStartWrite(path) else {
                return .failure(.busy("write lane quarantined until disconnect"))
            }
        case .withoutResponse:
            guard canEnqueueWithoutResponse(
                device: path.device,
                byteCount: value.count,
                maximumCount: maximumQueuedCount,
                maximumBytes: maximumQueuedBytes
            ) else {
                return .failure(.resourceLimitExceeded("writeWithoutResponseQueue"))
            }
        }
        guard operations.count(device: path.device, generation: generation) < maximumPendingOperations else {
            return .failure(.resourceLimitExceeded("pendingOperations"))
        }
        let timeoutAction: CharacteristicIOTimeoutAction = mode == .withoutResponse
            ? .expireQueuedWrite(path.device)
            : .quarantineWrite(path)
        return .success(CharacteristicIOWriteAdmission(
            policy: policy,
            operation: CharacteristicIOOperationAdmission(kind: policy.kind, timeoutAction: timeoutAction)
        ))
    }

    func scheduleTimeout(
        operation: OperationID,
        action: CharacteristicIOTimeoutAction,
        clock: BluetoothClock,
        queue: DispatchQueue,
        after milliseconds: Int,
        onTimeout: @escaping (CharacteristicIOTimeoutDecision) -> Void
    ) {
        finishTimeout(operation: operation, clock: clock)
        timeoutActions[operation] = action
        operationTimeouts[operation] = clock.schedule(after: milliseconds) { [weak self] in
            guard let self else { return }
            queue.async {
                guard self.operationTimeouts.removeValue(forKey: operation) != nil,
                      let action = self.timeoutActions.removeValue(forKey: operation) else { return }
                let stateChanged = self.applyTimeoutAction(operation: operation, action: action)
                onTimeout(CharacteristicIOTimeoutDecision(action: action, stateChanged: stateChanged))
            }
        }
    }

    func finishTimeout(operation: OperationID, clock: BluetoothClock) {
        if let timer = operationTimeouts.removeValue(forKey: operation) {
            clock.cancel(timer)
        }
        timeoutActions.removeValue(forKey: operation)
    }

    func quarantineRead(_ path: CharacteristicPath) {
        guard canInsertQuarantine(path, existing: quarantinedReadPaths) else { return }
        quarantinedReadPaths.insert(path)
    }

    func isReadQuarantined(_ path: CharacteristicPath) -> Bool { quarantinedReadPaths.contains(path) }

    func canStartWrite(_ path: CharacteristicPath) -> Bool {
        !quarantinedWritePaths.contains(path)
    }

    func quarantineWrite(_ path: CharacteristicPath) {
        guard canInsertQuarantine(path, existing: quarantinedWritePaths) else { return }
        quarantinedWritePaths.insert(path)
    }

    @discardableResult
    func consumeWriteQuarantine(_ path: CharacteristicPath) -> Bool {
        quarantinedWritePaths.remove(path) != nil
    }

    func canStartSubscription(_ path: CharacteristicPath) -> Bool {
        !quarantinedSubscriptionPaths.contains(path)
    }

    func quarantineSubscription(_ path: CharacteristicPath) {
        guard canInsertQuarantine(path, existing: quarantinedSubscriptionPaths) else { return }
        quarantinedSubscriptionPaths.insert(path)
    }

    /// Applies the lane consequence of a submitted operation becoming
    /// outcome-unknown. Completion and operation-record ownership remain in
    /// PendingOperationRegistry; this method only changes I/O admission state.
    @discardableResult
    func quarantineSubmittedOperation(kind: PendingOperationKind, path: CharacteristicPath?, policy: ReadNotifyCorrelationPolicy, subscriptionActive: Bool = false) -> Bool {
        guard let path else { return false }
        switch kind {
        case .read:
            let wasQuarantined = quarantinedReadPaths.contains(path)
            quarantineRead(path)
            if policy == .concurrent, subscriptionActive, quarantinedReadPaths.contains(path) {
                ambiguousReadPaths.insert(path)
            }
            return !wasQuarantined && quarantinedReadPaths.contains(path)
        case .writeWithResponse:
            let wasQuarantined = quarantinedWritePaths.contains(path)
            quarantineWrite(path)
            return !wasQuarantined && quarantinedWritePaths.contains(path)
        case .subscriptionChange:
            let wasQuarantined = quarantinedSubscriptionPaths.contains(path)
            quarantineSubscription(path)
            return !wasQuarantined && quarantinedSubscriptionPaths.contains(path)
        default:
            return false
        }
    }

    @discardableResult
    func consumeSubscriptionQuarantine(_ path: CharacteristicPath) -> Bool {
        quarantinedSubscriptionPaths.remove(path) != nil
    }

    func enqueueWithoutResponse(_ item: QueuedWrite, byteCount: Int,
                                       maximumCount: Int, maximumBytes: Int,
                                       maximumSubmissionsPerDrain: Int) -> Bool {
        let pump = withoutResponseQueues[item.path.device] ?? {
            let created = WriteWithoutResponsePump<QueuedWrite>(
                maximumQueuedCount: maximumCount,
                maximumQueuedBytes: maximumBytes,
                maximumSubmissionsPerDrain: maximumSubmissionsPerDrain
            )
            withoutResponseQueues[item.path.device] = created
            return created
        }()
        guard pump.enqueue(item, byteCount: byteCount) else {
            if pump.queuedCount == 0 { withoutResponseQueues.removeValue(forKey: item.path.device) }
            return false
        }
        return true
    }

    func canEnqueueWithoutResponse(device: PlatformDeviceID, byteCount: Int,
                                          maximumCount: Int, maximumBytes: Int) -> Bool {
        guard byteCount >= 0 else { return false }
        guard let pump = withoutResponseQueues[device] else {
            return byteCount <= maximumBytes
        }
        return pump.canEnqueue(byteCount: byteCount)
    }

    func queuedWriteCount(device: PlatformDeviceID) -> Int {
        withoutResponseQueues[device]?.queuedCount ?? 0
    }

    func pumpWithoutResponse(device: PlatformDeviceID, queue: DispatchQueue, drain: @escaping () -> Void) {
        guard scheduledWritePumps.insert(device).inserted else { return }
        queue.async { [weak self] in
            guard let self else { return }
            self.scheduledWritePumps.remove(device)
            drain()
        }
    }

    @discardableResult
    func drainWithoutResponse(device: PlatformDeviceID, peripheral: BluetoothPeripheralHandle,
                                     submit: (QueuedWrite) -> Void) -> Bool {
        guard peripheral.canSendWriteWithoutResponse,
              let pump = withoutResponseQueues[device], pump.queuedCount > 0 else { return false }
        _ = pump.drain(whileCanSubmit: { peripheral.canSendWriteWithoutResponse }, submit: submit)
        if pump.queuedCount == 0 { withoutResponseQueues.removeValue(forKey: device) }
        return pump.queuedCount > 0
    }

    func removeQueuedWrite(operation: OperationID, device: PlatformDeviceID) -> Bool {
        guard let pump = withoutResponseQueues[device], pump.remove(where: { $0.operation == operation }) != nil else { return false }
        if pump.queuedCount == 0 { withoutResponseQueues.removeValue(forKey: device) }
        return true
    }

    private func applyTimeoutAction(operation: OperationID, action: CharacteristicIOTimeoutAction) -> Bool {
        switch action {
        case .quarantineRead(let path):
            let wasQuarantined = quarantinedReadPaths.contains(path)
            quarantineRead(path)
            return !wasQuarantined && quarantinedReadPaths.contains(path)
        case .expireRead:
            // Runtime applies persistent ambiguity quarantine separately;
            // notifications cannot be used to drain a read response.
            return false
        case .quarantineWrite(let path):
            let wasQuarantined = quarantinedWritePaths.contains(path)
            quarantineWrite(path)
            return !wasQuarantined && quarantinedWritePaths.contains(path)
        case .quarantineSubscription(let path):
            let wasQuarantined = quarantinedSubscriptionPaths.contains(path)
            quarantineSubscription(path)
            return !wasQuarantined && quarantinedSubscriptionPaths.contains(path)
        case .expireQueuedWrite(let device):
            return removeQueuedWrite(operation: operation, device: device)
        }
    }

    func cancelQueuedWrites(device: PlatformDeviceID, generation: ConnectionGeneration) -> [QueuedWrite] {
        guard let pump = withoutResponseQueues[device] else { return [] }
        let items = pump.removeAll { $0.generation == generation }
        if pump.queuedCount == 0 { withoutResponseQueues.removeValue(forKey: device) }
        return items
    }

    func clearDeviceState(device: PlatformDeviceID, clock: BluetoothClock) {
        let timeoutIDs = timeoutActions.compactMap { operation, action in
            action.device == device ? operation : nil
        }
        timeoutIDs.forEach { operation in
            if let timer = operationTimeouts.removeValue(forKey: operation) {
                clock.cancel(timer)
            }
            timeoutActions.removeValue(forKey: operation)
        }
        withoutResponseQueues.removeValue(forKey: device)
        scheduledWritePumps.remove(device)
        quarantinedWritePaths = quarantinedWritePaths.filter { $0.device != device }
        quarantinedSubscriptionPaths = quarantinedSubscriptionPaths.filter { $0.device != device }
        clearReadQuarantine(device: device)
    }

    @discardableResult
    func consumeReadQuarantine(_ path: CharacteristicPath) -> Bool {
        guard !ambiguousReadPaths.contains(path) else { return false }
        return quarantinedReadPaths.remove(path) != nil
    }

    func clearReadQuarantine(device: PlatformDeviceID) {
        quarantinedReadPaths = quarantinedReadPaths.filter { $0.device != device }
        ambiguousReadPaths = ambiguousReadPaths.filter { $0.device != device }
    }

    func clearState(clock: BluetoothClock) {
        operationTimeouts.values.forEach(clock.cancel)
        operationTimeouts.removeAll()
        timeoutActions.removeAll()
        quarantinedReadPaths.removeAll()
        ambiguousReadPaths.removeAll()
        quarantinedWritePaths.removeAll()
        quarantinedSubscriptionPaths.removeAll()
        withoutResponseQueues.removeAll()
        scheduledWritePumps.removeAll()
    }

    var readQuarantineCount: Int { quarantinedReadPaths.count }

    func readQuarantineCount(device: PlatformDeviceID) -> Int {
        quarantinedReadPaths.filter { $0.device == device }.count
    }

    private func canInsertQuarantine(_ path: CharacteristicPath, existing: Set<CharacteristicPath>) -> Bool {
        guard !existing.contains(path) else { return false }
        let total = quarantinedReadPaths.union(quarantinedWritePaths).union(quarantinedSubscriptionPaths)
        let deviceCount = total.filter { $0.device == path.device }.count
        return deviceCount < maximumQuarantinedLaneCountPerDevice &&
            total.count < maximumQuarantinedLaneCountPerRuntime
    }

    func writePolicy(
        resource: any BluetoothRuntimeResource,
        peripheral: BluetoothPeripheralHandle,
        characteristic: CharacteristicSnapshot,
        mode: BLEWriteMode
    ) -> Result<WritePolicy, BluetoothError> {
        let property: CBCharacteristicProperties.RawValue
        let type: CBCharacteristicWriteType
        let kind: PendingOperationKind
        switch mode {
        case .withResponse:
            property = CBCharacteristicProperties.write.rawValue
            type = .withResponse
            kind = .writeWithResponse
        case .withoutResponse:
            property = CBCharacteristicProperties.writeWithoutResponse.rawValue
            type = .withoutResponse
            kind = .writeWithoutResponse
        }
        guard characteristic.properties & property != 0 else { return .failure(.propertyNotSupported) }
        let maximumLength = resource.maximumWriteValueLength(for: peripheral, type: type)
        guard maximumLength >= 0 else { return .failure(.unsupported) }
        return .success(WritePolicy(kind: kind, type: type, maximumLength: maximumLength))
    }

}

private extension CharacteristicIOTimeoutAction {
    var device: PlatformDeviceID {
        switch self {
        case .quarantineRead(let path), .expireRead(let path), .quarantineWrite(let path), .quarantineSubscription(let path):
            return path.device
        case .expireQueuedWrite(let device):
            return device
        }
    }
}

/// Bounded local submission queue for CoreBluetooth write-without-response.
/// It only controls local admission and submission cadence; it does not claim
/// ATT acknowledgement or remote business execution.
final class WriteWithoutResponsePump<Element> {
    private struct Entry {
        let element: Element
        let byteCount: Int
    }

    let maximumQueuedCount: Int
    let maximumQueuedBytes: Int
    let maximumSubmissionsPerDrain: Int
    private var entries: [Entry] = []
    private(set) var queuedBytes: Int = 0

    var queuedCount: Int { entries.count }
    var queuedElements: [Element] { entries.map(\.element) }

    init(maximumQueuedCount: Int, maximumQueuedBytes: Int, maximumSubmissionsPerDrain: Int) {
        precondition(maximumQueuedCount > 0)
        precondition(maximumQueuedBytes > 0)
        precondition(maximumSubmissionsPerDrain > 0)
        self.maximumQueuedCount = maximumQueuedCount
        self.maximumQueuedBytes = maximumQueuedBytes
        self.maximumSubmissionsPerDrain = maximumSubmissionsPerDrain
    }

    func canEnqueue(byteCount: Int) -> Bool {
        byteCount >= 0 && entries.count < maximumQueuedCount && byteCount <= maximumQueuedBytes - queuedBytes
    }

    @discardableResult
    func enqueue(_ element: Element, byteCount: Int) -> Bool {
        guard canEnqueue(byteCount: byteCount) else { return false }
        entries.append(Entry(element: element, byteCount: byteCount))
        queuedBytes += byteCount
        return true
    }

    @discardableResult
    func drain(whileCanSubmit canSubmit: () -> Bool, submit: (Element) -> Void) -> Int {
        var submitted = 0
        while submitted < maximumSubmissionsPerDrain, canSubmit(), !entries.isEmpty {
            let entry = entries.removeFirst()
            queuedBytes -= entry.byteCount
            submit(entry.element)
            submitted += 1
        }
        return submitted
    }

    func remove(where predicate: (Element) -> Bool) -> Element? {
        guard let index = entries.firstIndex(where: { predicate($0.element) }) else { return nil }
        let entry = entries.remove(at: index)
        queuedBytes -= entry.byteCount
        return entry.element
    }

    @discardableResult
    func removeAll(where predicate: (Element) -> Bool) -> [Element] {
        var removed: [Element] = []
        var retained: [Entry] = []
        retained.reserveCapacity(entries.count)
        entries.forEach { entry in
            if predicate(entry.element) {
                removed.append(entry.element)
                queuedBytes -= entry.byteCount
            } else {
                retained.append(entry)
            }
        }
        entries = retained
        return removed
    }

    @discardableResult
    func removeAll() -> [Element] {
        let removed = entries.map(\.element)
        entries.removeAll()
        queuedBytes = 0
        return removed
    }
}
