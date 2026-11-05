import Foundation

final class BluetoothEventHub {
    enum AdapterState: Equatable, Sendable { case poweredOn, poweredOff, resetting, unauthorized, unsupported, unknown }
    struct AdapterStateEvent: Sendable {
        let state: AdapterState
        let discovering: Bool
        init(state: AdapterState, discovering: Bool = false) {
            self.state = state
            self.discovering = discovering
        }
    }
    typealias AdapterStateListener = (AdapterStateEvent) -> Void
    enum ConnectionState: Sendable { case connecting, connected, disconnected }
    struct ConnectionEvent: Sendable {
        let device: PlatformDeviceID
        let generation: ConnectionGeneration
        let state: ConnectionState
        init(device: PlatformDeviceID, generation: ConnectionGeneration, state: ConnectionState) {
            self.device = device; self.generation = generation; self.state = state
        }
    }
    typealias DiscoveryListener = ([AdvertisementSnapshot]) -> Void
    typealias ConnectionListener = (ConnectionEvent) -> Void
    struct CharacteristicValueEvent: Sendable {
        let path: CharacteristicPath
        let generation: ConnectionGeneration
        let value: Data
        init(path: CharacteristicPath, generation: ConnectionGeneration, value: Data) {
            self.path = path; self.generation = generation; self.value = value
        }
    }
    typealias CharacteristicValueListener = (CharacteristicValueEvent) -> Void
    private var nextToken: UInt64 = 0
    private var discoveryListeners: [UInt64: DiscoveryListener] = [:]
    private var connectionListeners: [UInt64: ConnectionListener] = [:]
    private var characteristicValueListeners: [UInt64: CharacteristicValueListener] = [:]
    private var adapterStateListeners: [UInt64: AdapterStateListener] = [:]
    let maximumListeners: Int
    let maximumBufferedCountPerType: Int
    private(set) var droppedEventCount: Int = 0
    private var bufferedDiscovery: [[AdvertisementSnapshot]] = []
    private var bufferedConnections: [ConnectionEvent] = []
    private var bufferedCharacteristicValues: [CharacteristicValueEvent] = []
    private var bufferedAdapterStates: [AdapterStateEvent] = []
    init(maximumListeners: Int = 16, maximumBufferedCountPerType: Int = 64) {
        self.maximumListeners = maximumListeners
        self.maximumBufferedCountPerType = maximumBufferedCountPerType
    }
    func addAdapterStateListener(_ listener: @escaping AdapterStateListener) -> UInt64? {
        guard adapterStateListeners.count < maximumListeners else { return nil }
        nextToken &+= 1
        let token = nextToken
        adapterStateListeners[token] = listener
        let buffered = bufferedAdapterStates; bufferedAdapterStates.removeAll()
        buffered.forEach { adapterStateListeners[token]?($0) }
        return token
    }
    func removeAdapterStateListener(_ token: UInt64?) {
        if let token { adapterStateListeners.removeValue(forKey: token) }
        else { adapterStateListeners.removeAll() }
    }
    func publishAdapterState(_ event: AdapterStateEvent) {
        guard !adapterStateListeners.isEmpty else { return buffer(&bufferedAdapterStates, event) }
        Array(adapterStateListeners.keys).forEach { adapterStateListeners[$0]?(event) }
    }
    func addDiscoveryListener(_ listener: @escaping DiscoveryListener) -> UInt64? {
        guard discoveryListeners.count < maximumListeners else { return nil }
        nextToken &+= 1
        let token = nextToken
        discoveryListeners[token] = listener
        let buffered = bufferedDiscovery; bufferedDiscovery.removeAll()
        buffered.forEach { discoveryListeners[token]?($0) }
        return token
    }
    func removeDiscoveryListener(_ token: UInt64?) {
        if let token { discoveryListeners.removeValue(forKey: token) }
        else { discoveryListeners.removeAll() }
    }
    func publishDiscovery(_ batch: [AdvertisementSnapshot]) {
        guard !batch.isEmpty else { return }
        guard !discoveryListeners.isEmpty else { return buffer(&bufferedDiscovery, batch) }
        Array(discoveryListeners.keys).forEach { discoveryListeners[$0]?(batch) }
    }
    func addConnectionListener(_ listener: @escaping ConnectionListener) -> UInt64? {
        guard connectionListeners.count < maximumListeners else { return nil }
        nextToken &+= 1
        let token = nextToken
        connectionListeners[token] = listener
        let buffered = bufferedConnections; bufferedConnections.removeAll()
        buffered.forEach { connectionListeners[token]?($0) }
        return token
    }
    func publishConnection(_ event: ConnectionEvent) {
        guard !connectionListeners.isEmpty else { return buffer(&bufferedConnections, event) }
        Array(connectionListeners.keys).forEach { connectionListeners[$0]?(event) }
    }
    func removeConnectionListener(_ token: UInt64?) {
        if let token { connectionListeners.removeValue(forKey: token) }
        else { connectionListeners.removeAll() }
    }
    func addCharacteristicValueListener(_ listener: @escaping CharacteristicValueListener) -> UInt64? {
        guard characteristicValueListeners.count < maximumListeners else { return nil }
        nextToken &+= 1
        let token = nextToken
        characteristicValueListeners[token] = listener
        let buffered = bufferedCharacteristicValues; bufferedCharacteristicValues.removeAll()
        buffered.forEach { characteristicValueListeners[token]?($0) }
        return token
    }
    func removeCharacteristicValueListener(_ token: UInt64?) {
        if let token { characteristicValueListeners.removeValue(forKey: token) }
        else { characteristicValueListeners.removeAll() }
    }
    func publishCharacteristicValue(_ event: CharacteristicValueEvent) {
        guard !characteristicValueListeners.isEmpty else { return buffer(&bufferedCharacteristicValues, event) }
        Array(characteristicValueListeners.keys).forEach { characteristicValueListeners[$0]?(event) }
    }

    func removeAllListeners() {
        discoveryListeners.removeAll(); connectionListeners.removeAll()
        characteristicValueListeners.removeAll(); adapterStateListeners.removeAll()
        bufferedDiscovery.removeAll(); bufferedConnections.removeAll()
        bufferedCharacteristicValues.removeAll(); bufferedAdapterStates.removeAll()
    }

    private func buffer<T>(_ storage: inout [T], _ value: T) {
        guard maximumBufferedCountPerType > 0 else { droppedEventCount += 1; return }
        if storage.count >= maximumBufferedCountPerType {
            // Characteristic values are lossy by contract; retain the oldest entries.
            droppedEventCount += 1
            return
        }
        storage.append(value)
    }
}
