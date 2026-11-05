import Foundation
import CoreBluetooth
import DCloudUniappRuntime
import DCloudUTSFoundation

public final class BluetoothUTSServiceDataEntry {
    public let uuid: String
    public let data: ArrayBuffer

    public init(uuid: String, data: Data) {
        self.uuid = uuid
        self.data = ArrayBuffer.fromData(data)
    }
}

public final class BluetoothUTSDeviceSnapshot {
    public let deviceId: String
    public let name: String?
    public let localName: String
    public let rssi: Int
    public let advertisData: ArrayBuffer
    public let advertisServiceUUIDs: [String]
    public let serviceData: [BluetoothUTSServiceDataEntry]
    public let connectable: Bool?

    public init(snapshot: BluetoothDiscoveredDeviceSnapshot) {
        self.deviceId = snapshot.device.rawValue.uuidString
        self.name = snapshot.name
        self.localName = snapshot.localName ?? ""
        self.rssi = snapshot.rssi ?? 0
        self.advertisData = ArrayBuffer.fromData(snapshot.manufacturerData ?? Data())
        self.advertisServiceUUIDs = snapshot.serviceUUIDs.map { $0.canonical128.uuidString }
        self.serviceData = snapshot.serviceData
            .sorted { $0.key.canonical128.uuidString < $1.key.canonical128.uuidString }
            .map { BluetoothUTSServiceDataEntry(uuid: $0.key.canonical128.uuidString, data: $0.value) }
        self.connectable = snapshot.connectable
    }
}

public final class BluetoothUTSServiceSnapshot {
    public let uuid: String
    public let isPrimary: Bool

    public init(snapshot: BluetoothServiceSnapshot) {
        self.uuid = snapshot.uuid.canonical128.uuidString
        self.isPrimary = snapshot.isPrimary
    }
}

public final class BluetoothUTSCharacteristicSnapshot {
    public let uuid: String
    public let read: Bool
    public let write: Bool
    public let notify: Bool
    public let indicate: Bool
    public let writeNoResponse: Bool
    public let writeDefault: Bool

    public init(snapshot: BluetoothCharacteristicSnapshot) {
        let properties = snapshot.properties
        self.uuid = snapshot.uuid.canonical128.uuidString
        self.read = properties.contains(.read)
        self.write = properties.contains(.write)
        self.notify = properties.contains(.notify)
        self.indicate = properties.contains(.indicate)
        self.writeNoResponse = properties.contains(.writeWithoutResponse)
        self.writeDefault = properties.contains(.write)
    }
}

public final class BluetoothUTSCharacteristicValueSnapshot {
    public let deviceId: String
    public let serviceId: String
    public let characteristicId: String
    public let value: ArrayBuffer

    public init(deviceId: String, serviceId: String, characteristicId: String, value: Data) {
        self.deviceId = deviceId
        self.serviceId = serviceId
        self.characteristicId = characteristicId
        self.value = ArrayBuffer.fromData(value)
    }
}

/// Adapts the Native Swift API to closure and primitive types supported by UTS.
public final class BluetoothUTSAdapterBridge {
    public static let shared = BluetoothUTSAdapterBridge()

    private let runtime: BluetoothRuntime
    private let client: BluetoothClient

    private init() {
        let runtime = BluetoothRuntime()
        self.runtime = runtime
        self.client = BluetoothClient(runtime: runtime)
    }

    public func openAdapter(
        success: @escaping () -> Void,
        failure: @escaping (_ reason: String, _ state: Int) -> Void
    ) {
        client.open { [weak self] result in
            guard let self else { return }
            switch result {
            case .success:
                DispatchQueue.main.async(execute: success)
            case .failure(let error):
                let state = self.adapterStateCode(error: error)
                let reason = self.openFailureReason(error: error)
                DispatchQueue.main.async {
                    failure(reason, state)
                }
            }
        }
    }

    public func closeAdapter(
        success: @escaping () -> Void,
        notInitialized: @escaping () -> Void
    ) {
        client.adapterSnapshot { [weak self] snapshot in
            guard let self else { return }
            if snapshot.lifecycle == .idle {
                DispatchQueue.main.async(execute: notInitialized)
                return
            }
            self.client.shutdown {
                DispatchQueue.main.async(execute: success)
            }
        }
    }

    @discardableResult
    public func addAdapterStateListener(
        _ listener: @escaping (_ available: Bool, _ discovering: Bool) -> Void
    ) -> BluetoothListenerToken? {
        do {
            return try client.addAdapterStateListener { event in
                let available = event.state == .poweredOn
                DispatchQueue.main.async {
                    listener(available, event.discovering)
                }
            }
        } catch {
            return nil
        }
    }

    public func removeAdapterStateListener(_ token: BluetoothListenerToken?) {
        guard let token else { return }
        client.removeListener(token)
    }

    public func startDiscovery(
        services: [String]?,
        allowDuplicates: Bool,
        intervalMilliseconds: Int,
        success: @escaping () -> Void,
        failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void
    ) {
        do {
            let serviceUUIDs = try services.map { try $0.map { try Self.bluetoothUUID(from: $0) } }
            let options = try DiscoveryOptions(
                services: serviceUUIDs,
                allowDuplicates: allowDuplicates,
                reportIntervalMilliseconds: intervalMilliseconds
            )
            client.startDiscovery(options: options) { [weak self] result in
                guard let self else { return }
                self.dispatch(result, success: success, failure: failure)
            }
        } catch let error as BluetoothError {
            dispatchFailure(error, failure: failure)
        } catch {
            DispatchQueue.main.async {
                failure(1509601, self.adapterStateCode(), "invalidParameter")
            }
        }
    }

    public func stopDiscovery(
        success: @escaping () -> Void,
        failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void
    ) {
        client.stopDiscovery { [weak self] result in
            guard let self else { return }
            self.dispatch(result, success: success, failure: failure)
        }
    }

    @discardableResult
    public func addDiscoveryListener(
        _ listener: @escaping (_ devices: [BluetoothUTSDeviceSnapshot]) -> Void
    ) -> BluetoothListenerToken? {
        do {
            return try client.addDiscoveryListener { batch in
                let devices = batch.map { BluetoothUTSDeviceSnapshot(snapshot: $0) }
                DispatchQueue.main.async {
                    listener(devices)
                }
            }
        } catch {
            return nil
        }
    }

    public func removeDiscoveryListener(_ token: BluetoothListenerToken?) {
        guard let token else { return }
        client.removeListener(token)
    }

    public func getAdapterState(
        success: @escaping (_ available: Bool, _ discovering: Bool) -> Void,
        failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void
    ) {
        client.adapterSnapshot { [weak self] snapshot in
            guard let self else { return }
            if snapshot.lifecycle == .idle {
                self.dispatchFailure(.notReady, failure: failure)
                return
            }
            let available = snapshot.state == .poweredOn
            DispatchQueue.main.async {
                success(available, snapshot.discovering)
            }
        }
    }

    public func getDiscoveredDevices(
        success: @escaping (_ devices: [BluetoothUTSDeviceSnapshot]) -> Void,
        failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void
    ) {
        client.adapterSnapshot { [weak self] snapshot in
            guard let self else { return }
            if snapshot.lifecycle == .idle {
                self.dispatchFailure(.notReady, failure: failure)
                return
            }
            self.client.discoveredDevices { snapshots in
                let devices = snapshots.map { BluetoothUTSDeviceSnapshot(snapshot: $0) }
                DispatchQueue.main.async {
                    success(devices)
                }
            }
        }
    }

    private func adapterStateCode() -> Int {
        switch runtime.adapterLifecycle.observedState {
        case .resetting: return 1
        case .unsupported: return 2
        case .unauthorized: return 3
        case .poweredOff: return 4
        case .poweredOn: return 5
        case .unknown, nil: return 0
        }
    }

    private func adapterStateCode(error: BluetoothError) -> Int {
        guard let reason = error.context.adapterReason else {
            return adapterStateCode()
        }
        switch reason {
        case .resetting: return 1
        case .unsupported: return 2
        case .unauthorized: return 3
        case .poweredOff: return 4
        case .unknown: return 0
        }
    }

    private func openFailureReason(error: BluetoothError) -> String {
        if error.code == .timeout { return "timeout" }
        if error.code == .cancelled { return "cancelled" }
        if let reason = error.context.adapterReason {
            switch reason {
            case .poweredOff: return "poweredOff"
            case .unauthorized: return "unauthorized"
            case .unsupported: return "unsupported"
            case .resetting: return "resetting"
            case .unknown: return "unknown"
            }
        }
        return "unavailable"
    }

    private func dispatch(
        _ result: Result<Void, BluetoothError>,
        success: @escaping () -> Void,
        failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void
    ) {
        switch result {
        case .success:
            DispatchQueue.main.async(execute: success)
        case .failure(let error):
            dispatchFailure(error, failure: failure)
        }
    }

    private func dispatchFailure(
        _ error: BluetoothError,
        failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void
    ) {
        let state = adapterStateCode(error: error)
        let reason: String
        let errorCode: Int
        switch error.code {
        case .invalidParameter:
            errorCode = 1509601
            reason = "invalidParameter"
        case .unsupported:
            errorCode = 1500105
            reason = "unsupported"
        case .adapterUnavailable:
            errorCode = adapterErrorCode(error: error)
            reason = adapterFailureReason(error: error)
        case .runtimeNotReady, .sessionNotReady, .gattNotReady:
            errorCode = 1500101
            reason = "notReady"
        case .deviceNotFound:
            errorCode = 1509006
            reason = error.diagnosticReason ?? "deviceNotFound"
        case .notConnectable:
            errorCode = 1509604
            reason = "notConnectable"
        case .notConnected:
            errorCode = 1509003
            reason = error.message ?? "noConnection"
        case .alreadyConnected:
            errorCode = 1509007
            reason = "alreadyConnected"
        case .connectionInProgress:
            errorCode = 1509001
            reason = "connectionInProgress"
        case .connectionLimitExceeded:
            errorCode = 1510102
            reason = "connectionLimitExceeded"
        case .connectionFailed:
            if isConnectionLimitExceeded(error: error) {
                errorCode = 1510102
                reason = "connectionLimitExceeded"
            } else {
                errorCode = 1509001
                reason = connectionFailureReason(error: error)
            }
        case .serviceNotFound:
            errorCode = 1500103
            reason = "serviceNotFound"
        case .characteristicNotFound:
            errorCode = 1509002
            reason = "characteristicNotFound"
        case .propertyNotSupported:
            errorCode = 1509004
            reason = "propertyNotSupported"
        case .timeout:
            errorCode = 1509005
            reason = "timeout"
        case .cancelled:
            errorCode = 1509000
            reason = "cancelled"
        case .operationBusy:
            errorCode = 1509000
            reason = "busy"
        case .resourceLimitExceeded:
            errorCode = 1509000
            reason = "resourceLimitExceeded"
        case .outcomeUnknown:
            errorCode = 1509000
            reason = "outcomeUnknown"
        case .platformFailure, .internalFailure, .invariantViolation:
            errorCode = 1509000
            reason = platformFailureReason(error: error)
        }
        DispatchQueue.main.async {
            failure(errorCode, state, reason)
        }
    }

    private func adapterErrorCode(error: BluetoothError) -> Int {
        guard let reason = error.context.adapterReason else { return 1500104 }
        switch reason {
        case .unsupported: return 1500105
        case .unauthorized: return 1509602
        case .poweredOff: return 1509603
        case .resetting: return 1500102
        case .unknown: return 1500102
        }
    }

  private func connectionFailureReason(error: BluetoothError) -> String {
    guard let platform = error.platform,
          platform.domain == CBErrorDomain,
          platform.code == 14 else {
      return "connectionFailed"
    }
     return "peerRemovedPairingInformation"
  }

  private func isConnectionLimitExceeded(error: BluetoothError) -> Bool {
      guard let platform = error.platform,
            platform.domain == CBErrorDomain,
            let code = CBError.Code(rawValue: platform.code) else {
          return false
      }
      return code == .connectionLimitReached
  }

    private func adapterFailureReason(error: BluetoothError) -> String {
        guard let reason = error.context.adapterReason else { return "unavailable" }
        switch reason {
        case .unsupported: return "unsupported"
        case .unauthorized: return "unauthorized"
        case .poweredOff: return "poweredOff"
        case .resetting: return "resetting"
        case .unknown: return "unknown"
        }
    }

    private func platformFailureReason(error: BluetoothError) -> String {
        guard let platform = error.platform else { return "platformFailure" }
        if platform.domain == CBATTErrorDomain {
            switch platform.code {
            case 2: return "platformFailure:CBATTErrorDomain/2(readNotPermitted)"
            case 3: return "platformFailure:CBATTErrorDomain/3(writeNotPermitted)"
            case 5: return "platformFailure:CBATTErrorDomain/5(insufficientAuthentication)"
            case 6: return "platformFailure:CBATTErrorDomain/6(requestNotSupported)"
            case 7: return "platformFailure:CBATTErrorDomain/7(invalidOffset)"
            case 8: return "platformFailure:CBATTErrorDomain/8(insufficientAuthorization)"
            case 10: return "platformFailure:CBATTErrorDomain/10(attributeNotFound)"
            case 13: return "platformFailure:CBATTErrorDomain/13(invalidAttributeValueLength)"
            case 14: return "platformFailure:CBATTErrorDomain/14(unlikelyError)"
            default: break
            }
        }
        return "platformFailure:\(platform.domain)/\(platform.code)"
    }

    private static func bluetoothUUID(from rawValue: String) throws -> BluetoothUUID {
        let value = rawValue.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()
        let canonical: UUID?
        if let uuid = UUID(uuidString: value) {
            canonical = uuid
        } else if value.count == 4 {
            canonical = UUID(uuidString: "0000\(value)-0000-1000-8000-00805F9B34FB")
        } else if value.count == 8 {
            canonical = UUID(uuidString: "\(value)-0000-1000-8000-00805F9B34FB")
        } else {
            canonical = nil
        }
        guard let canonical else { throw BluetoothError.invalidParameter("service UUID") }
        return BluetoothUUID(canonical128: canonical)
    }
}
public class BluetoothUTSConnectedDeviceSnapshot {
  public let deviceId: String
  public let name: String?
  public let state: String

  public init(deviceId: String, name: String?, state: String) {
    self.deviceId = deviceId
    self.name = name
    self.state = state
  }
}

extension BluetoothUTSAdapterBridge {
  public func getDeviceRSSI(deviceId: String, success: @escaping (_ rssi: Int) -> Void, failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void) {
    guard let device = UUID(uuidString: deviceId) else {
      DispatchQueue.main.async {
        failure(1509601, self.adapterStateCode(), "invalidParameter")
      }
      return
    }

    client.readRSSI(device: PlatformDeviceID(rawValue: device)) { [weak self] result in
      guard let self else { return }
      switch result {
      case .success(let rssi):
        DispatchQueue.main.async { success(rssi) }
      case .failure(let error):
        self.dispatchFailure(error, failure: failure)
      }
    }
  }

  public func getMTU(deviceId: String, writeType: String?, success: @escaping (_ mtu: Int) -> Void, failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void) {
    guard let device = UUID(uuidString: deviceId) else {
      DispatchQueue.main.async {
        failure(1509601, self.adapterStateCode(), "invalidParameter")
      }
      return
    }

    let mode: BLEWriteMode = writeType == "writeNoResponse" ? .withoutResponse : .withResponse
    // The v1 contract exposes the write-mode payload limit, not the ATT MTU.
    // Project it onto the WeChat/UTS getBLEMTU name here.
    client.maximumWritePayloadLength(for: PlatformDeviceID(rawValue: device), mode: mode) { [weak self] result in
      guard let self else { return }
      switch result {
      case .success(let mtu):
        DispatchQueue.main.async { success(mtu) }
      case .failure(let error):
        self.dispatchFailure(error, failure: failure)
      }
    }
  }

  public func connect(deviceId: String, timeoutMilliseconds: Int? = nil, success: @escaping () -> Void, failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void) {
    guard let device = UUID(uuidString: deviceId) else {
      DispatchQueue.main.async {
        failure(1509601, self.adapterStateCode(), "invalidParameter")
      }
      return
    }

    client.connect(device: PlatformDeviceID(rawValue: device), timeoutMilliseconds: timeoutMilliseconds) { result in
      switch result {
      case .success(_):
        DispatchQueue.main.async {
          success()
        }
      case .failure(let error):
        self.dispatchFailure(error, failure: failure)
      }
    }
  }

  public func disconnect(deviceId: String, success: @escaping () -> Void, failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void) {
    guard let device = UUID(uuidString: deviceId) else {
      DispatchQueue.main.async {
        failure(1509601, self.adapterStateCode(), "invalidParameter")
      }
      return
    }

    client.disconnect(device: PlatformDeviceID(rawValue: device)) { result in
      switch result {
      case .success(_):
        DispatchQueue.main.async {
          success()
        }
      case .failure(let error):
        self.dispatchFailure(error, failure: failure)
      }
    }
  }

  @discardableResult
  public func addConnectionListener(_ listener: @escaping (_ deviceId: String, _ state: String) -> Void) -> BluetoothListenerToken? {
    do {
      return try client.addConnectionListener { event in
        let deviceId = event.device.rawValue.uuidString
        let state = event.state.rawValue
        DispatchQueue.main.async {
          listener(deviceId, state)
        }
      }
    } catch {
      return nil
    }
  }

  public func removeConnectionListener(_ token: BluetoothListenerToken?) {
    guard let token else { return }
    client.removeListener(token)
  }

  @discardableResult
  public func addCharacteristicValueListener(_ listener: @escaping (_ event: BluetoothUTSCharacteristicValueSnapshot) -> Void) -> BluetoothListenerToken? {
    do {
      return try client.addCharacteristicValueListener { event in
      let snapshot = BluetoothUTSCharacteristicValueSnapshot(
        deviceId: event.path.device.rawValue.uuidString,
        serviceId: event.path.service.uuid.canonical128.uuidString,
        characteristicId: event.path.characteristic.uuid.canonical128.uuidString,
        value: event.value
      )
      DispatchQueue.main.async {
        listener(snapshot)
      }
      }
    } catch {
      return nil
    }
  }

  public func removeCharacteristicValueListener(_ token: BluetoothListenerToken?) {
    guard let token else { return }
    client.removeListener(token)
  }

  public func getConnectedDevices(services: [String], success: @escaping (_ devices: [BluetoothUTSConnectedDeviceSnapshot]) -> Void, failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void) {
    guard !services.isEmpty else {
      DispatchQueue.main.async {
        failure(1509601, self.adapterStateCode(), "invalidParameter")
      }
      return
    }

    let serviceUUIDs: [BluetoothUUID]
    do {
      serviceUUIDs = try services.map { try Self.bluetoothUUID(from: $0) }
    } catch {
      DispatchQueue.main.async {
        failure(1509601, self.adapterStateCode(), "invalidParameter")
      }
      return
    }

    client.adapterSnapshot { [weak self] snapshot in
      guard let self else { return }
      guard snapshot.lifecycle != .idle else {
        self.dispatchFailure(.notReady, failure: failure)
        return
      }

      self.client.connectedDevices(services: serviceUUIDs) { snapshots in
        let devices = snapshots.map { snapshot in
          BluetoothUTSConnectedDeviceSnapshot(
            deviceId: snapshot.device.rawValue.uuidString,
            name: nil,
            state: snapshot.state.rawValue
          )
        }

        DispatchQueue.main.async {
          success(devices)
        }
      }
    }
  }

  public func getDeviceServices(deviceId: String, success: @escaping (_ services: [BluetoothUTSServiceSnapshot]) -> Void, failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void) {
    guard let device = UUID(uuidString: deviceId) else {
      DispatchQueue.main.async {
        failure(1509601, self.adapterStateCode(), "invalidParameter")
      }
      return
    }

    client.discoverServices(device: PlatformDeviceID(rawValue: device)) { [weak self] result in
      guard let self else { return }
      switch result {
      case .success:
        self.client.gattSnapshot(device: PlatformDeviceID(rawValue: device)) { snapshot in
          guard let snapshot else {
            self.dispatchFailure(.internalFailure("GATT service snapshot unavailable"), failure: failure)
            return
          }
          let services = snapshot.services.map { BluetoothUTSServiceSnapshot(snapshot: $0) }
          DispatchQueue.main.async { success(services) }
        }
      case .failure(let error):
        self.dispatchFailure(error, failure: failure)
      }
    }
  }

  public func getDeviceCharacteristics(deviceId: String, serviceId: String, success: @escaping (_ characteristics: [BluetoothUTSCharacteristicSnapshot]) -> Void, failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void) {
    guard let device = UUID(uuidString: deviceId) else {
      DispatchQueue.main.async {
        failure(1509601, self.adapterStateCode(), "invalidParameter")
      }
      return
    }

    let serviceUUID: BluetoothUUID
    do {
      serviceUUID = try Self.bluetoothUUID(from: serviceId)
    } catch {
      DispatchQueue.main.async {
        failure(1509601, self.adapterStateCode(), "invalidParameter")
      }
      return
    }

    client.discoverCharacteristics(device: PlatformDeviceID(rawValue: device), service: ServiceID(uuid: serviceUUID)) { [weak self] result in
      guard let self else { return }
      switch result {
      case .success:
        self.client.gattSnapshot(device: PlatformDeviceID(rawValue: device)) { snapshot in
          guard let snapshot,
                let service = snapshot.services.first(where: { $0.uuid == serviceUUID }) else {
            self.dispatchFailure(.internalFailure("GATT characteristic snapshot unavailable"), failure: failure)
            return
          }
          let characteristics = service.characteristics.map { BluetoothUTSCharacteristicSnapshot(snapshot: $0) }
          DispatchQueue.main.async { success(characteristics) }
        }
      case .failure(let error):
        self.dispatchFailure(error, failure: failure)
      }
    }
  }

  public func writeCharacteristicValue(deviceId: String, serviceId: String, characteristicId: String, value: ArrayBuffer, writeType: String?, success: @escaping () -> Void, failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void) {
    let path: CharacteristicPath
    do {
      path = try Self.characteristicPath(deviceId: deviceId, serviceId: serviceId, characteristicId: characteristicId)
    } catch {
      DispatchQueue.main.async {
        failure(1509601, self.adapterStateCode(), "invalidParameter")
      }
      return
    }

    let mode: BLEWriteMode = writeType == "writeNoResponse" ? .withoutResponse : .withResponse
    let data = value.toData()
    client.writeValue(path: path, value: data, mode: mode) { [weak self] result in
      guard let self else { return }
      self.dispatch(result, success: success, failure: failure)
    }
  }

  public func readCharacteristicValue(deviceId: String, serviceId: String, characteristicId: String, success: @escaping () -> Void, failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void) {
    let path: CharacteristicPath
    do {
      path = try Self.characteristicPath(deviceId: deviceId, serviceId: serviceId, characteristicId: characteristicId)
    } catch {
      DispatchQueue.main.async {
        failure(1509601, self.adapterStateCode(), "invalidParameter")
      }
      return
    }

    client.readValue(path: path) { [weak self] result in
      guard let self else { return }
      switch result {
      case .success(let value):
        DispatchQueue.main.async(execute: success)
      case .failure(let error):
        self.dispatchFailure(error, failure: failure)
      }
    }
  }

  public func notifyCharacteristicValueChange(deviceId: String, serviceId: String, characteristicId: String, state: Bool, type: String?, success: @escaping () -> Void, failure: @escaping (_ errorCode: Int, _ state: Int, _ reason: String) -> Void) {
    let path: CharacteristicPath
    do {
      path = try Self.characteristicPath(deviceId: deviceId, serviceId: serviceId, characteristicId: characteristicId)
    } catch {
      DispatchQueue.main.async {
        failure(1509601, self.adapterStateCode(), "invalidParameter")
      }
      return
    }
    // CoreBluetooth selects notification versus indication from the characteristic's properties.
    client.setNotifyValue(path: path, enabled: state) { [weak self] result in
      guard let self else { return }
      switch result {
      case .success(let enabled):
        DispatchQueue.main.async(execute: success)
      case .failure(let error):
        self.dispatchFailure(error, failure: failure)
      }
    }
  }

  private static func characteristicPath(deviceId: String, serviceId: String, characteristicId: String) throws -> CharacteristicPath {
    guard let device = UUID(uuidString: deviceId) else {
      throw BluetoothError.invalidParameter("deviceId")
    }
    let service = try bluetoothUUID(from: serviceId)
    let characteristic = try bluetoothUUID(from: characteristicId)
    return CharacteristicPath(
      device: PlatformDeviceID(rawValue: device),
      service: ServiceID(uuid: service),
      characteristic: CharacteristicID(uuid: characteristic)
    )
  }

}
