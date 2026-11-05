import CoreBluetooth
import Foundation

/// Exposes CoreBluetooth's per-mode payload limit. iOS does not expose a
/// portable ATT-MTU setter or change callback, so this capability has no such API.
final class MTUCapability {
    init() {}

    func writeType(for mode: BLEWriteMode) -> CBCharacteristicWriteType {
        mode == .withResponse ? .withResponse : .withoutResponse
    }

    func maximumWritePayloadLength(
        resource: any BluetoothRuntimeResource,
        peripheral: BluetoothPeripheralHandle,
        mode: BLEWriteMode
    ) -> Result<Int, BluetoothError> {
        let length = resource.maximumWriteValueLength(for: peripheral, type: writeType(for: mode))
        guard length >= 0 else { return .failure(.unsupported) }
        return .success(length)
    }

    /// Returns the value exposed by iOS for a WeChat-style `getBLEMTU` query.
    ///
    /// This is the maximum payload accepted for the selected write mode, not
    /// the negotiated ATT_MTU. CoreBluetooth does not expose the latter, and
    /// the payload must not be converted with a hard-coded `+3` offset.
    func reportedMTU(
        resource: any BluetoothRuntimeResource,
        peripheral: BluetoothPeripheralHandle,
        mode: BLEWriteMode
    ) -> Result<Int, BluetoothError> {
        maximumWritePayloadLength(resource: resource, peripheral: peripheral, mode: mode)
    }
}
