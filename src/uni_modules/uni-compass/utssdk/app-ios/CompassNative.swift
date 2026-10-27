import Foundation
import CoreLocation
import DCloudUTSFoundation

public typealias CompassUpdateListener = (_ direction: NSNumber, _ accuracy: NSNumber?) -> Void

public class CompassNative: NSObject, CLLocationManagerDelegate {

    private static let shared = CompassNative()

    private let locationManager: CLLocationManager
    private var listener: CompassUpdateListener? = nil
    private var started: Bool = false

    override init() {
        self.locationManager = CLLocationManager()
        super.init()
        self.locationManager.delegate = self
        self.locationManager.headingFilter = kCLHeadingFilterNone
    }

    public static func setListener(_ callback: CompassUpdateListener?) {
        CompassNative.shared.listener = callback
    }

    public static func removeListener() {
        CompassNative.shared.listener = nil
    }

    public static func start() -> NSNumber {
        if CompassNative.shared.started {
            return NSNumber(value: 0)
        }
        if !CLLocationManager.headingAvailable() {
            return NSNumber(value: 801)
        }
        CompassNative.shared.locationManager.startUpdatingHeading()
        CompassNative.shared.started = true
        return NSNumber(value: 0)
    }

    private static func canUseTrueHeading() -> Bool {
        if !CLLocationManager.locationServicesEnabled() {
            return false
        }
        let status: CLAuthorizationStatus
        if #available(iOS 14.0, *) {
            status = CompassNative.shared.locationManager.authorizationStatus
        } else {
            status = CLLocationManager.authorizationStatus()
        }
        return status == .authorizedAlways || status == .authorizedWhenInUse
    }

    private static func resolveHeading(_ heading: CLHeading) -> Double {
        if CompassNative.canUseTrueHeading() && heading.trueHeading >= 0 {
            return heading.trueHeading
        }
        return heading.magneticHeading
    }

    public static func stop() -> NSNumber {
        if !CompassNative.shared.started {
            return NSNumber(value: 0)
        }
        CompassNative.shared.locationManager.stopUpdatingHeading()
        CompassNative.shared.started = false
        return NSNumber(value: 0)
    }

    public func locationManager(_ manager: CLLocationManager, didUpdateHeading newHeading: CLHeading) {
        var direction = CompassNative.resolveHeading(newHeading)
        if direction < 0 {
            direction = direction.truncatingRemainder(dividingBy: 360.0) + 360.0
        }
        if direction >= 360.0 {
            direction = direction.truncatingRemainder(dividingBy: 360.0)
        }
        let accuracy: NSNumber? = newHeading.headingAccuracy >= 0 ? NSNumber(value: Double(newHeading.headingAccuracy)) : nil
        self.listener?(NSNumber(value: direction), accuracy)
    }

    public func locationManagerShouldDisplayHeadingCalibration(_ manager: CLLocationManager) -> Bool {
        return false
    }

    public func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        console.error("CompassNative didFailWithError: \(error.localizedDescription)")
    }
}
