import Foundation

enum BluetoothRuntimeLifecycle: Equatable, Sendable {
    case idle
    case initializing
    case ready
    case unavailable
    case resetting
    case shuttingDown
}

enum AdapterLifecycleObservedState: Equatable, Sendable {
    case poweredOn
    case poweredOff
    case resetting
    case unauthorized
    case unsupported
    case unknown
}

enum AdapterLifecycleOpenDecision: Equatable, Sendable {
    case none
    case success
    case unavailable
    case timeout
    case shutdown
}

struct AdapterLifecycleTransitionDecision: Equatable, Sendable {
    let accepted: Bool
    let stateChanged: Bool
    let shouldInvalidateResource: Bool
    let openDecision: AdapterLifecycleOpenDecision
    let lifecycle: BluetoothRuntimeLifecycle

    init(
        accepted: Bool,
        stateChanged: Bool,
        shouldInvalidateResource: Bool,
        openDecision: AdapterLifecycleOpenDecision,
        lifecycle: BluetoothRuntimeLifecycle
    ) {
        self.accepted = accepted
        self.stateChanged = stateChanged
        self.shouldInvalidateResource = shouldInvalidateResource
        self.openDecision = openDecision
        self.lifecycle = lifecycle
    }
}

/// Owns adapter lifecycle state, resource-generation identity and initialization
/// deadline. Runtime remains responsible for resource creation and cross-capability cleanup.
final class AdapterLifecycleCapability {
    private let clock: BluetoothClock
    private(set) var lifecycle: BluetoothRuntimeLifecycle = .idle
    private(set) var resourceToken: UUID?
    private(set) var observedState: AdapterLifecycleObservedState?
    private var initializationTimer: AnyObject?

    init(clock: BluetoothClock) {
        self.clock = clock
    }

    var isAvailable: Bool {
        lifecycle == .ready
    }

    @discardableResult
    func beginInitialization() -> UUID? {
        guard lifecycle == .idle else { return nil }
        lifecycle = .initializing
        let token = UUID()
        resourceToken = token
        return token
    }

    func transition(to value: BluetoothRuntimeLifecycle) {
        lifecycle = value
    }

    func apply(_ state: AdapterLifecycleObservedState) -> AdapterLifecycleTransitionDecision {
        guard lifecycle != .shuttingDown else {
            return decision(accepted: false, stateChanged: false, shouldInvalidateResource: false, openDecision: .shutdown)
        }

        let stateChanged = observedState != state
        observedState = state
        guard stateChanged else {
            return decision(accepted: true, stateChanged: false, shouldInvalidateResource: false, openDecision: .none)
        }

        switch state {
        case .unknown:
            if lifecycle == .idle { lifecycle = .initializing }
            return decision(accepted: true, stateChanged: true, shouldInvalidateResource: false, openDecision: .none)
        case .resetting:
            lifecycle = .resetting
            return decision(accepted: true, stateChanged: true, shouldInvalidateResource: true, openDecision: .none)
        case .poweredOn:
            lifecycle = .ready
            return decision(accepted: true, stateChanged: true, shouldInvalidateResource: false, openDecision: .success)
        case .poweredOff, .unauthorized, .unsupported:
            lifecycle = .unavailable
            return decision(accepted: true, stateChanged: true, shouldInvalidateResource: true, openDecision: .unavailable)
        }
    }

    func timeout() -> AdapterLifecycleTransitionDecision {
        guard lifecycle == .initializing || lifecycle == .resetting else {
            return decision(accepted: false, stateChanged: false, shouldInvalidateResource: false, openDecision: .none)
        }
        invalidateResource()
        lifecycle = .idle
        return decision(accepted: true, stateChanged: true, shouldInvalidateResource: false, openDecision: .timeout)
    }

    func shutdown() -> AdapterLifecycleTransitionDecision {
        guard lifecycle != .shuttingDown else {
            return decision(accepted: false, stateChanged: false, shouldInvalidateResource: false, openDecision: .shutdown)
        }
        lifecycle = .shuttingDown
        invalidateResource()
        return decision(accepted: true, stateChanged: true, shouldInvalidateResource: false, openDecision: .shutdown)
    }

    func isCurrentResource(_ token: UUID) -> Bool {
        resourceToken == token
    }

    func scheduleInitializationTimeout(queue: DispatchQueue, after milliseconds: Int, onTimeout: @escaping () -> Void) {
        cancelInitializationTimeout()
        initializationTimer = clock.schedule(after: milliseconds) { [weak self] in
            guard self != nil else { return }
            queue.async { onTimeout() }
        }
    }

    func cancelInitializationTimeout() {
        if let timer = initializationTimer {
            clock.cancel(timer)
            initializationTimer = nil
        }
    }

    var hasInitializationTimer: Bool {
        initializationTimer != nil
    }

    func invalidateResource() {
        resourceToken = nil
    }

    func clear() {
        cancelInitializationTimeout()
        resourceToken = nil
        observedState = nil
        lifecycle = .idle
    }

    private func decision(
        accepted: Bool,
        stateChanged: Bool,
        shouldInvalidateResource: Bool,
        openDecision: AdapterLifecycleOpenDecision
    ) -> AdapterLifecycleTransitionDecision {
        AdapterLifecycleTransitionDecision(
            accepted: accepted,
            stateChanged: stateChanged,
            shouldInvalidateResource: shouldInvalidateResource,
            openDecision: openDecision,
            lifecycle: lifecycle
        )
    }
}
