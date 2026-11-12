import Foundation

struct DeviceSession: Equatable, Sendable {
    enum State: Sendable { case connecting, connected, disconnecting }
    let device: PlatformDeviceID
    let generation: ConnectionGeneration
    var state: State
    init(device: PlatformDeviceID, generation: ConnectionGeneration, state: State) {
        self.device = device; self.generation = generation; self.state = state
    }
}

final class DeviceSessionStore {
    private(set) var sessions: [PlatformDeviceID: DeviceSession] = [:]
    private var nextGeneration: UInt64 = 0
    init() {}
    func begin(device: PlatformDeviceID) -> DeviceSession? {
        guard sessions[device] == nil else { return nil }
        nextGeneration &+= 1
        let session = DeviceSession(device: device, generation: ConnectionGeneration(rawValue: nextGeneration), state: .connecting)
        sessions[device] = session; return session
    }
    func update(_ session: DeviceSession) { sessions[session.device] = session }
    func remove(device: PlatformDeviceID, generation: ConnectionGeneration) -> Bool {
        guard sessions[device]?.generation == generation else { return false }
        sessions.removeValue(forKey: device); return true
    }
    func removeAll() { sessions.removeAll() }
}
