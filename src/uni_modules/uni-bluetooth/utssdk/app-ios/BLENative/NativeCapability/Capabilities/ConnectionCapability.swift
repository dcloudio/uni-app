import Foundation

enum ConnectionTransitionDecision: Equatable, Sendable {
    case accepted(DeviceSession)
    case rejected
}

/// Owns connection admission, session transitions and connection-attempt deadlines.
/// It does not submit CoreBluetooth work or terminate PendingOperationRegistry records.
final class ConnectionCapability {
    private let sessions: DeviceSessionStore
    private let clock: BluetoothClock
    private var connectionTimers: [PlatformDeviceID: AnyObject] = [:]
    private var connectionTimerGenerations: [PlatformDeviceID: ConnectionGeneration] = [:]
    // One bounded tombstone per device makes terminal callbacks idempotent without retaining sessions.
    private var latestTerminatedGenerations: [PlatformDeviceID: ConnectionGeneration] = [:]

    init(sessions: DeviceSessionStore, clock: BluetoothClock) {
        self.sessions = sessions
        self.clock = clock
    }

    func begin(device: PlatformDeviceID, maximumConcurrentConnections: Int?) -> Result<DeviceSession, BluetoothError> {
        if let session = sessions.sessions[device] {
            switch session.state {
            case .connecting, .disconnecting:
                return .failure(.connectionInProgress)
            case .connected:
                return .failure(.alreadyConnected)
            }
        }
        if let maximumConcurrentConnections,
           sessions.sessions.count >= maximumConcurrentConnections {
            return .failure(.connectionLimitExceeded)
        }
        guard let session = sessions.begin(device: device) else {
            return .failure(.alreadyConnected)
        }
        return .success(session)
    }

    func acceptConnected(device: PlatformDeviceID, generation: ConnectionGeneration) -> ConnectionTransitionDecision {
        guard var session = sessions.sessions[device], session.generation == generation,
              session.state == .connecting else { return .rejected }
        session.state = .connected
        sessions.update(session)
        return .accepted(session)
    }

    @discardableResult
    func markDisconnecting(device: PlatformDeviceID) -> Bool {
        guard var session = sessions.sessions[device], session.state != .disconnecting else { return false }
        session.state = .disconnecting
        sessions.update(session)
        return true
    }

    private func removeSession(device: PlatformDeviceID, generation: ConnectionGeneration) -> Bool {
        cancelTimeout(device: device)
        return sessions.remove(device: device, generation: generation)
    }

    func acceptDisconnected(device: PlatformDeviceID, generation: ConnectionGeneration) -> ConnectionTransitionDecision {
        guard let session = sessions.sessions[device], session.generation == generation else { return .rejected }
        guard removeSession(device: device, generation: generation) else { return .rejected }
        latestTerminatedGenerations[device] = generation
        return .accepted(session)
    }

    func acceptTimeout(device: PlatformDeviceID, generation: ConnectionGeneration) -> ConnectionTransitionDecision {
        acceptDisconnected(device: device, generation: generation)
    }

    func isTerminated(device: PlatformDeviceID, generation: ConnectionGeneration) -> Bool {
        guard let latest = latestTerminatedGenerations[device] else { return false }
        return generation <= latest
    }

    func scheduleTimeout(
        device: PlatformDeviceID,
        generation: ConnectionGeneration,
        queue: DispatchQueue,
        after milliseconds: Int,
        onTimeout: @escaping () -> Void
    ) {
        cancelTimeout(device: device)
        connectionTimerGenerations[device] = generation
        connectionTimers[device] = clock.schedule(after: milliseconds) { [weak self] in
            guard let self else { return }
            queue.async {
                guard self.connectionTimerGenerations[device] == generation else {
                    return
                }
                guard self.sessions.sessions[device]?.generation == generation else {
                    self.connectionTimers.removeValue(forKey: device)
                    self.connectionTimerGenerations.removeValue(forKey: device)
                    return
                }
                self.connectionTimers.removeValue(forKey: device)
                self.connectionTimerGenerations.removeValue(forKey: device)
                onTimeout()
            }
        }
    }

    func cancelTimeout(device: PlatformDeviceID) {
        if let timer = connectionTimers.removeValue(forKey: device) {
            clock.cancel(timer)
        }
        connectionTimerGenerations.removeValue(forKey: device)
    }

    func clearAll() {
        connectionTimers.values.forEach(clock.cancel)
        connectionTimers.removeAll()
        connectionTimerGenerations.removeAll()
        latestTerminatedGenerations.removeAll()
    }

    var timerDevices: Set<PlatformDeviceID> {
        Set(connectionTimers.keys)
    }

    var timerGenerations: [PlatformDeviceID: ConnectionGeneration] {
        connectionTimerGenerations
    }
}
