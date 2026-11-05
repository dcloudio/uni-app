import Foundation

/// Read-only view of Runtime state. Every query is evaluated on Runtime.queue.
final class BluetoothQueries {
    private let runtime: BluetoothRuntime

    init(runtime: BluetoothRuntime) { self.runtime = runtime }

    func adapterSnapshot(completion: @escaping (BluetoothAdapterSnapshot) -> Void) {
        runtime.sync({ BluetoothAdapterSnapshot(runtime: self.runtime) }, completion: completion)
    }

    func discoveredDevices(completion: @escaping ([BluetoothDiscoveredDeviceSnapshot]) -> Void) {
        runtime.sync({
            self.runtime.pruneExpiredDiscoveryCache()
            return self.runtime.discovery.registry.snapshots.values.map {
                BluetoothDiscoveredDeviceSnapshot(
                    device: $0.device,
                    name: $0.name,
                    rssi: $0.rssi,
                    manufacturerData: $0.manufacturerData,
                    observedAt: $0.observedAt,
                    discoveryGeneration: $0.generation,
                    localName: $0.localName,
                    serviceUUIDs: $0.serviceUUIDs,
                    serviceData: $0.serviceData,
                    connectable: $0.connectable
                )
            }.sorted { $0.observedAt < $1.observedAt }
        }, completion: completion)
    }

    func connectedDevices(services: [BluetoothUUID]? = nil, completion: @escaping ([BluetoothConnectedDeviceSnapshot]) -> Void) {
        runtime.sync({
            self.runtime.sessions.sessions.values.map {
                let state: BluetoothConnectionState
                switch $0.state { case .connecting: state = .connecting; case .connected: state = .connected; case .disconnecting: state = .disconnecting }
                return BluetoothConnectedDeviceSnapshot(device: $0.device, generation: $0.generation.rawValue, state: state)
            }.filter { snapshot in
                guard let services else { return true }
                let device = snapshot.device
                let advertisedServices = Set(self.runtime.discovery.registry.snapshot(for: device)?.serviceUUIDs ?? [])
                let gattServices: Set<UUID>
                if let session = self.runtime.sessions.sessions[device],
                   let gatt = self.runtime.gatt.snapshot(device: device, generation: session.generation) {
                    gattServices = Set(gatt.services.keys.map { $0.uuid.canonical128 })
                } else {
                    gattServices = []
                }
                let availableServices = advertisedServices.union(gattServices)
                return services.contains { availableServices.contains($0.canonical128) }
            }.sorted { $0.device.rawValue.uuidString < $1.device.rawValue.uuidString }
        }, completion: completion)
    }

    func gattSnapshot(device: PlatformDeviceID, generation: UInt64? = nil, completion: @escaping (BluetoothGATTSnapshot?) -> Void) {
        runtime.sync({
            let id = device
            guard let session = self.runtime.sessions.sessions[id], generation == nil || generation == session.generation.rawValue,
                  let snapshot = self.runtime.gatt.snapshot(device: id, generation: session.generation) else { return nil }
            let services = snapshot.services.values.map { service in
                let characteristics = service.characteristics.map { characteristic in
                    BluetoothCharacteristicSnapshot(uuid: characteristic.id.uuid, properties: BluetoothCharacteristicProperties(rawValue: UInt(characteristic.properties)))
                }
                return BluetoothServiceSnapshot(uuid: service.id.uuid, isPrimary: service.isPrimary, characteristics: characteristics)
            }.sorted { $0.uuid.canonical128.uuidString < $1.uuid.canonical128.uuidString }
            return BluetoothGATTSnapshot(device: device, connectionGeneration: session.generation.rawValue, revision: snapshot.revision.rawValue, services: services)
        }, completion: completion)
    }

}
