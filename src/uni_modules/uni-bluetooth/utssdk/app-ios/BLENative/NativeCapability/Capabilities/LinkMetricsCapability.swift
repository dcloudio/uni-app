import CoreBluetooth
import Foundation

/// Owns RSSI single-flight correlation, result policy and a short-lived cache.
/// Runtime owns scheduling, deadlines and lifecycle cleanup. The registry owns
/// every terminal completion, including fan-out to callers attached to the
/// in-flight read.
final class LinkMetricsCapability {
    enum ChannelState: Equatable {
        case idle, reading(OperationID), quarantined
    }
    struct CachedReading: Equatable {
        let value: Int
        let timestamp: UInt64
    }
    /// A single value drives two roles: the read deadline for the in-flight
    /// platform call, and the freshness window of the cached reading.
    let deadlineMilliseconds: Int
    private var channels: [GATTSessionKey: ChannelState] = [:]
    private var cache: [GATTSessionKey: CachedReading] = [:]

    init(deadlineMilliseconds: Int = 5_000) {
        precondition(deadlineMilliseconds > 0)
        self.deadlineMilliseconds = deadlineMilliseconds
    }

    func state(device: PlatformDeviceID, generation: ConnectionGeneration) -> ChannelState {
        channels[GATTSessionKey(device: device, generation: generation)] ?? .idle
    }

    /// The single RSSI read currently submitted to the platform, if any.
    func inFlightOperation(device: PlatformDeviceID, generation: ConnectionGeneration) -> OperationID? {
        if case .reading(let operation) = state(device: device, generation: generation) { return operation }
        return nil
    }

    /// A reading is only shareable while it is fresher than the timeout window.
    func cachedValue(device: PlatformDeviceID, generation: ConnectionGeneration, now: UInt64) -> Int? {
        let key = GATTSessionKey(device: device, generation: generation)
        guard let reading = cache[key], now >= reading.timestamp else { return nil }
        guard now - reading.timestamp <= UInt64(deadlineMilliseconds) * 1_000_000 else { return nil }
        return reading.value
    }

    func beginReading(operation: OperationID, device: PlatformDeviceID, generation: ConnectionGeneration) {
        channels[GATTSessionKey(device: device, generation: generation)] = .reading(operation)
    }

    func complete(_ record: PendingOperationRegistry.Record) {
        let key = GATTSessionKey(device: record.device, generation: record.generation)
        if case .reading(let operation) = channels[key], operation == record.id { channels[key] = .idle }
    }

    func store(value: Int, device: PlatformDeviceID, generation: ConnectionGeneration, at timestamp: UInt64) {
        cache[GATTSessionKey(device: device, generation: generation)] = CachedReading(value: value, timestamp: timestamp)
    }

    func quarantine(device: PlatformDeviceID, generation: ConnectionGeneration) {
        channels[GATTSessionKey(device: device, generation: generation)] = .quarantined
    }

    func consumeQuarantine(device: PlatformDeviceID, generation: ConnectionGeneration) -> Bool {
        let key = GATTSessionKey(device: device, generation: generation)
        guard channels[key] == .quarantined else { return false }
        channels.removeValue(forKey: key)
        return true
    }

    func timedOut(device: PlatformDeviceID, generation: ConnectionGeneration) {
        quarantine(device: device, generation: generation)
    }

    func clear(device: PlatformDeviceID) {
        channels = channels.filter { $0.key.device != device }
        cache = cache.filter { $0.key.device != device }
    }

    func clearAll() {
        channels.removeAll()
        cache.removeAll()
    }

    /// Converts the platform callback to the shared operation outcome without
    /// letting CoreBluetooth details leak into Runtime's routing decision.
    func outcome(rssi: NSNumber?, error: Error?) -> PendingOperationOutcome {
        if let error {
            return .failure(.platform(BluetoothPlatformError(error: error)))
        }
        if let rssi {
            return .rssi(rssi.intValue)
        }
        return .failure(.internalFailure("missing RSSI value"))
    }
}
