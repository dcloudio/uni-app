import CoreBluetooth
import Foundation

/// Constructible handles keep CoreBluetooth objects behind the Native boundary,
/// allowing Fakes to drive the same events without constructing CBPeer objects.
final class BluetoothCharacteristicHandle: NSObject {
    let uuid: BluetoothUUID
    let properties: CBCharacteristicProperties.RawValue
    var value: Data?
    var isNotifying: Bool
    private(set) var ownerPeripheralIdentifier: UUID?
    private(set) var ownerPeripheralIdentity: ObjectIdentifier?
    private(set) var ownerResourceToken: UUID?
    private(set) var ownerResourceGeneration: UInt64?
    private(set) var gattRevision: GATTDatabaseRevision?
    weak var coreBluetoothCharacteristic: CBCharacteristic?
    init(uuid: BluetoothUUID, properties: CBCharacteristicProperties.RawValue, value: Data? = nil, isNotifying: Bool = false) {
        self.uuid = uuid; self.properties = properties; self.value = value; self.isNotifying = isNotifying
    }

    func bindProvenance(peripheral: BluetoothPeripheralHandle, revision: GATTDatabaseRevision? = nil) {
        ownerPeripheralIdentifier = peripheral.identifier
        ownerPeripheralIdentity = peripheral.underlyingPeripheralIdentity
        ownerResourceToken = peripheral.resourceToken
        ownerResourceGeneration = peripheral.resourceGeneration
        if let revision { gattRevision = revision }
    }
}

final class BluetoothServiceHandle: NSObject {
    let uuid: BluetoothUUID
    let isPrimary: Bool
    private(set) var characteristics: [BluetoothCharacteristicHandle]
    private(set) var ownerPeripheralIdentifier: UUID?
    private(set) var ownerPeripheralIdentity: ObjectIdentifier?
    private(set) var ownerResourceToken: UUID?
    private(set) var ownerResourceGeneration: UInt64?
    private(set) var gattRevision: GATTDatabaseRevision?
    weak var coreBluetoothService: CBService?
    init(uuid: BluetoothUUID, isPrimary: Bool = true, characteristics: [BluetoothCharacteristicHandle] = []) {
        self.uuid = uuid; self.isPrimary = isPrimary; self.characteristics = characteristics
    }
    func install(_ characteristics: [BluetoothCharacteristicHandle]) { self.characteristics = characteristics }

    func bindProvenance(peripheral: BluetoothPeripheralHandle, revision: GATTDatabaseRevision? = nil) {
        ownerPeripheralIdentifier = peripheral.identifier
        ownerPeripheralIdentity = peripheral.underlyingPeripheralIdentity
        ownerResourceToken = peripheral.resourceToken
        ownerResourceGeneration = peripheral.resourceGeneration
        if let revision { gattRevision = revision }
        characteristics.forEach { $0.bindProvenance(peripheral: peripheral, revision: revision) }
    }
}

final class BluetoothPeripheralHandle: NSObject {
    let identifier: UUID
    var state: CBPeripheralState
    var canSendWriteWithoutResponse: Bool
    var maximumWriteWithResponseLength: Int
    var maximumWriteWithoutResponseLength: Int
    private(set) var services: [BluetoothServiceHandle]
    private(set) var resourceToken: UUID?
    private(set) var resourceGeneration: UInt64 = 0
    private(set) var connectionGeneration: ConnectionGeneration?
    private(set) var gattRevision: GATTDatabaseRevision?
    private(set) var underlyingPeripheralIdentity: ObjectIdentifier?
    // Keep the native handle alive for as long as the resource handle is live.
    // CoreBluetooth callbacks only provide the object during discovery; a weak
    // reference can be nil by the time createBLEConnection submits the request.
    var coreBluetoothPeripheral: CBPeripheral?
    init(identifier: UUID = UUID(), state: CBPeripheralState = .disconnected,
                canSendWriteWithoutResponse: Bool = true,
                maximumWriteWithResponseLength: Int = 512,
                maximumWriteWithoutResponseLength: Int = 512,
                services: [BluetoothServiceHandle] = []) {
        self.identifier = identifier; self.state = state
        self.canSendWriteWithoutResponse = canSendWriteWithoutResponse
        self.maximumWriteWithResponseLength = maximumWriteWithResponseLength
        self.maximumWriteWithoutResponseLength = maximumWriteWithoutResponseLength
        self.services = services
    }
    func install(_ services: [BluetoothServiceHandle]) { self.services = services }

    func bindResource(token: UUID, generation: UInt64, underlyingPeripheral: CBPeripheral? = nil) {
        resourceToken = token
        resourceGeneration = generation
        if let underlyingPeripheral {
            coreBluetoothPeripheral = underlyingPeripheral
            underlyingPeripheralIdentity = ObjectIdentifier(underlyingPeripheral)
        }
        services.forEach { $0.bindProvenance(peripheral: self) }
    }

    func bindConnectionGeneration(_ generation: ConnectionGeneration) {
        connectionGeneration = generation
    }

    func bindGATTRevision(_ revision: GATTDatabaseRevision) {
        gattRevision = revision
        services.forEach { $0.bindProvenance(peripheral: self, revision: revision) }
    }
}

enum BluetoothResourceIngressRejection: Sendable {
    case staleCentral
    case stalePeripheral
}

struct BluetoothResourceHandlers {
    typealias State = (CBManagerState) -> Void
    typealias Discovery = (BluetoothPeripheralHandle, [String: Any], NSNumber) -> Void
    typealias Connection = (BluetoothPeripheralHandle, Bool, Error?, ConnectionGeneration?) -> Void
    typealias GATT = (BluetoothPeripheralHandle, [BluetoothServiceHandle]?, Error?) -> Void
    typealias Characteristics = (BluetoothPeripheralHandle, BluetoothServiceHandle, [BluetoothCharacteristicHandle]?, Error?) -> Void
    typealias ServicesModified = (BluetoothPeripheralHandle, [BluetoothServiceHandle]) -> Void
    typealias Notification = (BluetoothPeripheralHandle, BluetoothCharacteristicHandle, Error?) -> Void
    typealias Value = (BluetoothPeripheralHandle, BluetoothCharacteristicHandle, Error?) -> Void
    typealias RSSI = (BluetoothPeripheralHandle, NSNumber?, Error?) -> Void
    typealias Write = (BluetoothPeripheralHandle, BluetoothCharacteristicHandle, Error?) -> Void
    typealias WriteReady = (BluetoothPeripheralHandle) -> Void
    typealias IngressRejected = (BluetoothResourceIngressRejection) -> Void
    let state: State
    let discovery: Discovery?
    let connection: Connection?
    let gatt: GATT?
    let characteristics: Characteristics?
    let servicesModified: ServicesModified?
    let notification: Notification?
    let value: Value?
    let rssi: RSSI?
    let write: Write?
    let writeReady: WriteReady?
    let ingressRejected: IngressRejected?
    init(state: @escaping State, discovery: Discovery? = nil, connection: Connection? = nil,
                gatt: GATT? = nil, characteristics: Characteristics? = nil, servicesModified: ServicesModified? = nil,
                notification: Notification? = nil, value: Value? = nil, rssi: RSSI? = nil,
                write: Write? = nil, writeReady: WriteReady? = nil,
                ingressRejected: IngressRejected? = nil) {
        self.state = state; self.discovery = discovery; self.connection = connection; self.gatt = gatt
        self.characteristics = characteristics; self.servicesModified = servicesModified; self.notification = notification
        self.value = value; self.rssi = rssi; self.write = write; self.writeReady = writeReady
        self.ingressRejected = ingressRejected
    }
}

protocol BluetoothRuntimeResource: AnyObject {
    init(queue: DispatchQueue, handlers: BluetoothResourceHandlers)
    var state: CBManagerState { get }
    var resourceToken: UUID { get }
    var resourceGeneration: UInt64 { get }
    func start()
    func stop()
    func invalidateResource()
    func startScan(services: [CBUUID]?, allowDuplicates: Bool)
    func stopScan()
    @discardableResult
    func connect(_ peripheral: BluetoothPeripheralHandle) -> Bool
    func isDisconnectPending(_ peripheral: BluetoothPeripheralHandle) -> Bool
    func disconnect(_ peripheral: BluetoothPeripheralHandle)
    func releasePeripheral(device: PlatformDeviceID)
    func discoverServices(_ peripheral: BluetoothPeripheralHandle, services: [CBUUID]?)
    func discoverCharacteristics(_ peripheral: BluetoothPeripheralHandle, for service: BluetoothServiceHandle)
    func setNotifyValue(_ enabled: Bool, peripheral: BluetoothPeripheralHandle, characteristic: BluetoothCharacteristicHandle)
    func readValue(_ peripheral: BluetoothPeripheralHandle, characteristic: BluetoothCharacteristicHandle)
    func readRSSI(_ peripheral: BluetoothPeripheralHandle)
    func writeValue(_ value: Data, peripheral: BluetoothPeripheralHandle, characteristic: BluetoothCharacteristicHandle, type: CBCharacteristicWriteType)
    func maximumWriteValueLength(for peripheral: BluetoothPeripheralHandle, type: CBCharacteristicWriteType) -> Int
}

protocol CoreBluetoothCentralPort: AnyObject {
    var state: CBManagerState { get }
    var isScanning: Bool { get }
    func startScan(services: [CBUUID]?, allowDuplicates: Bool)
    func stopScan()
    @discardableResult
    func connect(_ peripheral: BluetoothPeripheralHandle) -> Bool
    func cancelConnection(_ peripheral: BluetoothPeripheralHandle)
}

protocol PeripheralPort: AnyObject {
    var identifier: UUID { get }
    var state: CBPeripheralState { get }
}
