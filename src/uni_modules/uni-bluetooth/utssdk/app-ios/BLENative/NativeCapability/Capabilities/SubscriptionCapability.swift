import Foundation

struct SubscriptionKey: Hashable, Sendable {
    let path: CharacteristicPath
    let generation: ConnectionGeneration
    init(path: CharacteristicPath, generation: ConnectionGeneration) { self.path = path; self.generation = generation }
}

enum SubscriptionCallbackDecision: Equatable, Sendable {
    case accepted(enabled: Bool, stateChanged: Bool)
    case rejected
    case ignoredStale
}

enum SubscriptionValueDecision: Equatable, Sendable {
    case accepted
    case ignoredInactive
    case ignoredStale
}

final class SubscriptionCapability {
    private var active: Set<SubscriptionKey> = []
    private var pendingChanges: [SubscriptionKey: Bool] = [:]
    private var acceptedGenerationByDevice: [PlatformDeviceID: ConnectionGeneration] = [:]
    init() {}

    func isActive(path: CharacteristicPath, generation: ConnectionGeneration) -> Bool {
        active.contains(SubscriptionKey(path: path, generation: generation))
    }

    func reconcileOrphanState(path: CharacteristicPath, generation: ConnectionGeneration, enabled: Bool) {
        guard acceptedGenerationByDevice[path.device] == generation else { return }
        let key = SubscriptionKey(path: path, generation: generation)
        guard pendingChanges[key] == nil else { return }
        if enabled { active.insert(key) } else { active.remove(key) }
    }

    /// Opens the callback acceptance window for a newly connected generation.
    /// Runtime owns session/peripheral validation; this capability owns the
    /// generation-scoped subscription state that follows that validation.
    func activate(device: PlatformDeviceID, generation: ConnectionGeneration) {
        acceptedGenerationByDevice[device] = generation
    }

    @discardableResult
    func beginChange(
        path: CharacteristicPath,
        generation: ConnectionGeneration,
        enabled: Bool
    ) -> Bool {
        guard acceptedGenerationByDevice[path.device] == generation else { return false }
        let key = SubscriptionKey(path: path, generation: generation)
        guard pendingChanges[key] == nil else { return false }
        pendingChanges[key] = enabled
        return true
    }

    @discardableResult
    func cancelChange(path: CharacteristicPath, generation: ConnectionGeneration) -> Bool {
        pendingChanges.removeValue(forKey: SubscriptionKey(path: path, generation: generation)) != nil
    }

    /// Applies a correlated notification-state callback. Only a successful
    /// callback can mutate active state; platform failures leave the prior
    /// state unchanged and are completed by Runtime.
    func acceptNotificationState(
        path: CharacteristicPath,
        generation: ConnectionGeneration,
        enabled: Bool,
        error: Error? = nil
    ) -> SubscriptionCallbackDecision {
        guard acceptedGenerationByDevice[path.device] == generation else { return .ignoredStale }
        let key = SubscriptionKey(path: path, generation: generation)
        guard let expectedEnabled = pendingChanges.removeValue(forKey: key) else { return .rejected }
        guard error == nil else { return .rejected }
        guard expectedEnabled == enabled else { return .rejected }

        let wasActive = active.contains(key)
        if enabled { active.insert(key) } else { active.remove(key) }
        return .accepted(enabled: enabled, stateChanged: wasActive != enabled)
    }

    /// Admits a characteristic value as a notification event. Read response
    /// correlation remains in Runtime because the platform uses the same
    /// callback for reads and notifications.
    func admitValue(
        path: CharacteristicPath,
        generation: ConnectionGeneration
    ) -> SubscriptionValueDecision {
        guard acceptedGenerationByDevice[path.device] == generation else { return .ignoredStale }
        guard active.contains(SubscriptionKey(path: path, generation: generation)) else {
            return .ignoredInactive
        }
        return .accepted
    }

    func invalidate(device: PlatformDeviceID, generation: ConnectionGeneration) {
        if acceptedGenerationByDevice[device] == generation {
            acceptedGenerationByDevice.removeValue(forKey: device)
        }
        pendingChanges = pendingChanges.filter { $0.key.path.device != device || $0.key.generation != generation }
        active = active.filter { $0.path.device != device || $0.generation != generation }
    }

    func invalidateAll() {
        acceptedGenerationByDevice.removeAll()
        pendingChanges.removeAll()
        active.removeAll()
    }
}
