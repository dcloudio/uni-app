import Foundation

protocol BluetoothClock: AnyObject {
    var now: UInt64 { get }
    @discardableResult
    func schedule(after milliseconds: Int, _ action: @escaping () -> Void) -> AnyObject
    func cancel(_ token: AnyObject)
}

final class SystemBluetoothClock: BluetoothClock {
    init() {}
    var now: UInt64 { DispatchTime.now().uptimeNanoseconds }
    @discardableResult func schedule(after milliseconds: Int, _ action: @escaping () -> Void) -> AnyObject {
        let item = DispatchWorkItem(block: action)
        DispatchQueue.global().asyncAfter(deadline: .now() + .milliseconds(milliseconds), execute: item)
        return item
    }
    func cancel(_ token: AnyObject) { (token as? DispatchWorkItem)?.cancel() }
}
