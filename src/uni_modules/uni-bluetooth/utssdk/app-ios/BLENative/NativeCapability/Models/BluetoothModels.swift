import CoreBluetooth

extension BluetoothUUID {
    init?(coreBluetooth value: CBUUID) {
        let raw = value.uuidString.uppercased()
        if let uuid = UUID(uuidString: raw) { self.canonical128 = uuid; return }
        if raw.count == 4 { self.canonical128 = UUID(uuidString: "0000\(raw)-0000-1000-8000-00805F9B34FB")!; return }
        if raw.count == 8 { self.canonical128 = UUID(uuidString: "\(raw)-0000-1000-8000-00805F9B34FB")!; return }
        return nil
    }
}
