import Foundation
import CoreMotion
import DCloudUTSFoundation

public final class UniGyroscopeNative {

    public typealias GyroscopeCallback = (_ x: NSNumber, _ y: NSNumber, _ z: NSNumber) -> Void

    private static var motionManager: CMMotionManager? = nil
    private static var listener: GyroscopeCallback? = nil
    private static let queue: OperationQueue = {
        let queue = OperationQueue()
        queue.name = "uni.gyroscope.queue"
        return queue
    }()

    public static func setListener(_ callback: @escaping GyroscopeCallback) {
        listener = callback
    }

    public static func removeListener() {
        listener = nil
    }

    public static func start(_ interval: String) -> NSNumber {
        let manager: CMMotionManager
        if let existing = motionManager {
            manager = existing
        } else {
            let created = CMMotionManager()
            motionManager = created
            guard let saved = motionManager else {
                return NSNumber(value: 802)
            }
            manager = saved
        }

        if !manager.isGyroAvailable {
            return NSNumber(value: 801)
        }
        if manager.isGyroActive {
            manager.stopGyroUpdates()
        }
        manager.gyroUpdateInterval = mapInterval(interval)
        manager.startGyroUpdates(to: queue) { data, _ in
            guard let data = data else {
                return
            }
            listener?(NSNumber(value: data.rotationRate.x), NSNumber(value: data.rotationRate.y), NSNumber(value: data.rotationRate.z))
        }
        return NSNumber(value: 0)
    }

    public static func stop() -> NSNumber {
        guard let manager = motionManager else {
            return NSNumber(value: 0)
        }
        if manager.isGyroActive {
            manager.stopGyroUpdates()
        }
        return NSNumber(value: 0)
    }

    private static func mapInterval(_ interval: String) -> TimeInterval {
        switch interval {
        case "game":
            return 0.02
        case "ui":
            return 0.06
        default:
            return 0.2
        }
    }
}
