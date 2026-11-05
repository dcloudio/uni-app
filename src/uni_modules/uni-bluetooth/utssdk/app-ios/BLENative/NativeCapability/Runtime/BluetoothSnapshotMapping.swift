import Foundation

extension BluetoothAdapterSnapshot {
    init(runtime: BluetoothRuntime) {
        let lifecycle: BluetoothLifecycle
        switch runtime.lifecycle {
        case .idle: lifecycle = .idle
        case .initializing: lifecycle = .initializing
        case .ready: lifecycle = .ready
        case .unavailable: lifecycle = .unavailable
        case .resetting: lifecycle = .resetting
        case .shuttingDown: lifecycle = .shuttingDown
        }
        let state: BluetoothAdapterState?
        switch runtime.adapterLifecycle.observedState {
        case .poweredOn: state = .poweredOn
        case .poweredOff: state = .poweredOff
        case .resetting: state = .resetting
        case .unauthorized: state = .unauthorized
        case .unsupported: state = .unsupported
        case .unknown: state = .unknown
        case nil: state = nil
        }
        self.init(lifecycle: lifecycle, state: state, discovering: runtime.discovery.isDiscovering)
    }
}
