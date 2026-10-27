import Foundation
import CoreMotion

public final class AccelerometerNative {

    public typealias AccelerometerCallback = (_ x: NSNumber, _ y: NSNumber, _ z: NSNumber) -> Void

    private static var motionManager: CMMotionManager? = nil
    private static var listener: AccelerometerCallback? = nil
    private static let queue: OperationQueue = {
        let queue = OperationQueue()
        queue.name = "uni.accelerometer.queue"
        return queue
    }()

    public static func setListener(_ callback: @escaping AccelerometerCallback) {
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

        if !manager.isAccelerometerAvailable {
            return NSNumber(value: 801)
        }

        if manager.isAccelerometerActive {
            manager.stopAccelerometerUpdates()
        }

        manager.accelerometerUpdateInterval = mapIntervalToSeconds(interval)
        manager.startAccelerometerUpdates(to: queue) { data, _ in
            guard let data = data else {
                return
            }
            listener?(NSNumber(value: data.acceleration.x), NSNumber(value: data.acceleration.y), NSNumber(value: data.acceleration.z))
        }
        return NSNumber(value: 0)
    }

    public static func stop() -> NSNumber {
        guard let manager = motionManager else {
            return NSNumber(value: 0)
        }
        if manager.isAccelerometerActive {
            manager.stopAccelerometerUpdates()
        }
        return NSNumber(value: 0)
    }

    private static func mapIntervalToSeconds(_ interval: String) -> TimeInterval {
        switch interval {
        case "game":
            return 0.02
        case "ui":
            return 0.02
        default:
            return 0.2
        }
    }
}
