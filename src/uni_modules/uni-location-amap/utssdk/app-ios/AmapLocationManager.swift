import Foundation
import UIKit
import CoreLocation
import AMapFoundationKit
import AMapLocationKit

public final class AmapLocationManager: NSObject, AMapLocationManagerDelegate, CLLocationManagerDelegate {
    public typealias LocationResult = [String: Any]
    public typealias SuccessCallback = (LocationResult) -> Void
    public typealias FailureCallback = (NSNumber, String) -> Void
    
    private typealias DriverError = (Int, String)
    
    private struct AuthorizationRequest {
        let id: UUID
        let requiresFullAccuracy: Bool
        let completion: (DriverError?) -> Void
    }
    
    private final class SingleRequest {
        var manager: AMapLocationManager?
        var timer: DispatchSourceTimer?
        var deadline: DispatchTime?
        var success: SuccessCallback?
        var failure: FailureCallback?
        
        init(success: @escaping SuccessCallback, failure: @escaping FailureCallback) {
            self.success = success
            self.failure = failure
        }
    }
    
    private var sdkInitialized = false
    private var authorizationManager: CLLocationManager?
    private var authorizationQueue: [AuthorizationRequest] = []
    private var requestingWhenInUse = false
    private var temporaryAuthorizationID: UUID?
    private var pumpingAuthorization = false
    private var singles: [UUID: SingleRequest] = [:]
    private var pendingUpdateID: UUID?
    private var pendingUpdateFailure: FailureCallback?
    private var updateManager: AMapLocationManager?
    private var updateBackground = false
    private var updateGeocode = false
    private var updateSuccess: SuccessCallback?
    private var updateFailure: FailureCallback?
    
    public override init() {
        super.init()
    }
    
    
    private static func onMain(_ action: @escaping () -> Void) {
        if Thread.isMainThread { action() }
        else { DispatchQueue.main.async(execute: action) }
    }
    
    private func initializeSDK() -> DriverError? {
        guard let key = Bundle.main.object(forInfoDictionaryKey: "AMapAPIKey") as? String,
              !key.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            return (1505605, "Info.plist 缺少有效的 AMapAPIKey")
        }
        if !sdkInitialized {
            AMapServices.shared().apiKey = key.trimmingCharacters(in: .whitespacesAndNewlines)
            AMapLocationManager.updatePrivacyShow(.didShow, privacyInfo: .didContain)
            AMapLocationManager.updatePrivacyAgree(.didAgree)
            sdkInitialized = true
        }
        return nil
    }
    
    public func requestLocation(
        highAccuracy: Bool,
        geocode: Bool,
        altitude: Bool,
        timeout: NSNumber,
        success: @escaping SuccessCallback,
        failure: @escaping FailureCallback
    ) {
        Self.onMain { [self] in
            if let error = initializeSDK() {
                failure(NSNumber(value: error.0), error.1); return
            }
            let seconds = highAccuracy ? timeout.doubleValue : 10
            let requiresFullAccuracy = highAccuracy || altitude
            guard seconds.isFinite, seconds > 0, seconds < Double(Int.max / 2) else {
                failure(NSNumber(value: 1505602), "单次定位 timeout 必须是有效的正数秒数"); return
            }
            let id = UUID()
            singles[id] = SingleRequest(success: success, failure: failure)
            authorize(id: id, requiresFullAccuracy: requiresFullAccuracy) { [weak self] error in
                guard let self = self, let request = self.singles[id] else { return }
                if let error = error {
                    self.finishSingle(id: id, result: nil, error: error); return
                }
                
                let deadline = DispatchTime.now() + seconds
                request.deadline = deadline
                let manager = AMapLocationManager()
                request.manager = manager
                self.configure(manager: manager, highAccuracy: requiresFullAccuracy,
                               geocode: geocode, timeout: seconds)
                let timer = DispatchSource.makeTimerSource(queue: .main)
                request.timer = timer
                timer.schedule(deadline: deadline, leeway: .nanoseconds(0))
                timer.setEventHandler { [weak self] in
                    self?.finishSingle(id: id, result: nil, error: (1505600, "单次定位超过总 deadline（\(seconds) 秒）"))
                }
                timer.resume()
                let accepted = manager.requestLocation(withReGeocode: geocode) { [weak self] location, reGeocode, error in
                    Self.onMain { [weak self] in
                        guard let self = self, self.singles[id] != nil else { return }
                        if let error = error {
                            self.finishSingle(id: id, result: nil, error: Self.mapError(error))
                        } else if let location = location {
                            let result = self.makeResult(location: location, reGeocode: geocode ? reGeocode : nil,
                                                         includeAltitude: altitude)
                            self.finishSingle(id: id, result: result, error: nil)
                        } else {
                            self.finishSingle(id: id, result: nil, error: (1505602, "定位失败：SDK 未返回位置"))
                        }
                    }
                }
                if !accepted {
                    self.finishSingle(id: id, result: nil, error: (1505602, "SDK 拒绝添加单次定位请求（requestLocation 返回 false）"))
                }
            }
        }
    }
    
    private func finishSingle(id: UUID, result: LocationResult?, error: DriverError?) {
        guard let request = singles.removeValue(forKey: id) else { return }
        var terminalError = error
        if let deadline = request.deadline, DispatchTime.now() >= deadline {
            let detail = error.map { "; \($0.1)" } ?? ""
            terminalError = (1505600, "单次定位超过总 deadline\(detail)")
        }
        let success = request.success
        let failure = request.failure
        request.success = nil
        request.failure = nil
        request.timer?.setEventHandler {}
        request.timer?.cancel()
        request.timer = nil
        request.manager?.delegate = nil
        request.manager?.stopUpdatingLocation()
        request.manager = nil
        if let error = terminalError { failure?(NSNumber(value: error.0), error.1) }
        else if let result = result { success?(result) }
    }
    
    public func startUpdatingLocation(
        highAccuracy: Bool,
        geocode: Bool,
        altitude: Bool,
        background: Bool,
        started: @escaping () -> Void,
        success: @escaping SuccessCallback,
        startFailure: @escaping FailureCallback,
        updateFailure: @escaping FailureCallback
    ) {
        Self.onMain { [self] in
            guard pendingUpdateID == nil, updateManager == nil else {
                startFailure(NSNumber(value: 1505602), "持续定位正在启动或运行，请先 stop 后再启动或切换前后台配置"); return
            }
            if let error = initializeSDK() {
                startFailure(NSNumber(value: error.0), error.1); return
            }
            if background {
                let modes = Bundle.main.object(forInfoDictionaryKey: "UIBackgroundModes") as? [String] ?? []
                guard modes.contains("location") else {
                    startFailure(NSNumber(value: 1505702), "Info.plist 未配置 location 后台模式"); return
                }
                guard UIApplication.shared.applicationState != .background else {
                    startFailure(NSNumber(value: 1505602), "请在前台发起后台持续定位"); return
                }
            }
            let id = UUID()
            pendingUpdateID = id
            pendingUpdateFailure = startFailure
            // 持续定位接受模糊权限，不申请临时精确，也不升级 Always。
            authorize(id: id, requiresFullAccuracy: false) { [weak self] error in
                guard let self = self, self.pendingUpdateID == id else { return }
                self.pendingUpdateID = nil
                self.pendingUpdateFailure = nil
                if let error = error {
                    startFailure(NSNumber(value: error.0), error.1); return
                }
                if background && UIApplication.shared.applicationState == .background {
                    startFailure(NSNumber(value: 1505602), "授权完成时应用已在后台，请回到前台重新启动"); return
                }
                let manager = AMapLocationManager()
                self.configure(manager: manager, highAccuracy: highAccuracy || altitude, geocode: geocode, timeout: 10)
                manager.allowsBackgroundLocationUpdates = background
                manager.pausesLocationUpdatesAutomatically = !background
                self.updateManager = manager
                self.updateBackground = background
                self.updateGeocode = geocode
                self.updateSuccess = success
                self.updateFailure = updateFailure
                manager.delegate = self
                manager.startUpdatingLocation()
                started()
            }
        }
    }
    
    public func stopUpdatingLocation() {
        Self.onMain { [self] in
            let pendingID = pendingUpdateID
            let cancelledFailure = pendingUpdateFailure
            pendingUpdateID = nil
            pendingUpdateFailure = nil
            authorizationQueue.removeAll { $0.id == pendingID }
            let manager = updateManager
            updateManager = nil
            updateSuccess = nil
            updateFailure = nil
            updateBackground = false
            updateGeocode = false
            manager?.delegate = nil
            manager?.stopUpdatingLocation()
            manager?.allowsBackgroundLocationUpdates = false
            manager?.pausesLocationUpdatesAutomatically = true
            cancelledFailure?(NSNumber(value: 1505602), "持续定位启动已取消")
            pumpAuthorization()
        }
    }
    
    public func amapLocationManager(
        _ manager: AMapLocationManager!,
        didUpdate location: CLLocation!,
        reGeocode: AMapLocationReGeocode!
    ) {
        Self.onMain { [weak self] in
            guard let self = self, let manager = manager, manager === self.updateManager,
                  let location = location,
                  self.updateBackground || UIApplication.shared.applicationState != .background else { return }
            self.updateSuccess?(self.makeResult(location: location,
                                                reGeocode: self.updateGeocode ? reGeocode : nil,
                                                includeAltitude: true))
        }
    }
    
    public func amapLocationManager(_ manager: AMapLocationManager!, didFailWithError error: Error!) {
        Self.onMain { [weak self] in
            guard let self = self, let manager = manager, manager === self.updateManager,
                  let error = error,
                  self.updateBackground || UIApplication.shared.applicationState != .background else { return }
            let mapped = Self.mapError(error)
            self.updateFailure?(NSNumber(value: mapped.0), mapped.1)
        }
    }
    
    @available(iOS 14.0, *)
    public func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        Self.onMain { [weak self] in
            guard let self = self, manager === self.authorizationManager else { return }
            self.pumpAuthorization()
        }
    }
    
    public func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        Self.onMain { [weak self] in
            guard let self = self, manager === self.authorizationManager else { return }
            self.pumpAuthorization()
        }
    }
    
    private func authorize(id: UUID, requiresFullAccuracy: Bool, completion: @escaping (DriverError?) -> Void) {
        if authorizationManager == nil {
            let manager = CLLocationManager()
            authorizationManager = manager
            manager.delegate = self
        }
        authorizationQueue.append(AuthorizationRequest(id: id, requiresFullAccuracy: requiresFullAccuracy, completion: completion))
        pumpAuthorization()
    }
    
    private func pumpAuthorization() {
        guard !pumpingAuthorization, temporaryAuthorizationID == nil,
              let manager = authorizationManager else { return }
        pumpingAuthorization = true
        defer { pumpingAuthorization = false }
        while let request = authorizationQueue.first {
            var error: DriverError?
            let status = manager.authorizationStatus
            if !CLLocationManager.locationServicesEnabled() {
                error = (1505003, "定位服务已关闭")
            } else if status == .denied || status == .restricted {
                error = (1505004, "定位权限被拒绝或受限制")
            } else if status == .notDetermined {
                if !requestingWhenInUse {
                    requestingWhenInUse = true
                    manager.requestWhenInUseAuthorization()
                }
                return
            } else if #available(iOS 14.0, *), request.requiresFullAccuracy,
                      manager.accuracyAuthorization == .reducedAccuracy {
                requestingWhenInUse = false
                let descriptions = Bundle.main.object(forInfoDictionaryKey: "NSLocationTemporaryUsageDescriptionDictionary") as? [String: Any]
                guard let purpose = descriptions?["PurposeKey"] as? String,
                      !purpose.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
                    authorizationQueue.removeFirst()
                    request.completion((1505800, "Info.plist 缺少临时精确定位用途 PurposeKey"))
                    continue
                }
                temporaryAuthorizationID = request.id
                manager.requestTemporaryFullAccuracyAuthorization(withPurposeKey: "PurposeKey") { [weak self] systemError in
                    DispatchQueue.main.async { [weak self] in
                        guard let self = self, self.temporaryAuthorizationID == request.id else { return }
                        self.temporaryAuthorizationID = nil
                        if let index = self.authorizationQueue.firstIndex(where: { $0.id == request.id }) {
                            let pending = self.authorizationQueue.remove(at: index)
                            let status = manager.authorizationStatus
                            if status == .denied || status == .restricted {
                                pending.completion((1505004, "定位权限被拒绝或受限制"))
                            } else if let systemError = systemError {
                                pending.completion((1505800, Self.errorMessage(systemError)))
                            } else if manager.accuracyAuthorization != .fullAccuracy {
                                pending.completion((1505800, "定位精度仍为降低精度"))
                            } else {
                                pending.completion(nil)
                            }
                        }
                        self.pumpAuthorization()
                    }
                }
                return
            }
            requestingWhenInUse = false
            authorizationQueue.removeFirst()
            request.completion(error)
        }
    }
    
    private func configure(manager: AMapLocationManager, highAccuracy: Bool, geocode: Bool, timeout: Double) {
        manager.desiredAccuracy = highAccuracy ? kCLLocationAccuracyBest : kCLLocationAccuracyHundredMeters
        manager.locationTimeout = max(2, Int(ceil(timeout)))
        manager.reGeocodeTimeout = max(2, Int(ceil(timeout)))
        manager.locatingWithReGeocode = geocode
        if #available(iOS 14.0, *) {
            manager.locationAccuracyMode = .reduceAccuracy
        }
    }
    
    private func makeResult(location: CLLocation, reGeocode: AMapLocationReGeocode?, includeAltitude: Bool) -> LocationResult {
        var result: LocationResult = [
            "latitude": location.coordinate.latitude,
            "longitude": location.coordinate.longitude,
            "accuracy": location.horizontalAccuracy,
            "horizontalAccuracy": location.horizontalAccuracy,
            "verticalAccuracy": location.verticalAccuracy,
            "speed": max(location.speed, 0),
            "altitude": includeAltitude ? location.altitude : 0,
            "coordinateType": "gcj02"
        ]
        if let reGeocode = reGeocode {
            result["address"] = reGeocode.formattedAddress ?? ""
            result["country"] = reGeocode.country ?? ""
            result["province"] = reGeocode.province ?? ""
            result["city"] = reGeocode.city ?? ""
            result["district"] = reGeocode.district ?? ""
            result["street"] = reGeocode.street ?? ""
            result["streetNumber"] = reGeocode.number ?? ""
            result["cityCode"] = reGeocode.citycode ?? ""
            result["adCode"] = reGeocode.adcode ?? ""
            result["name"] = reGeocode.poiName ?? ""
        }
        return result
    }
    
    private static func errorMessage(_ error: Error) -> String {
        let error = error as NSError
        return "domain=\(error.domain), code=\(error.code), message=\(error.localizedDescription)"
    }
    
    private static func mapError(_ error: Error) -> DriverError {
        let nsError = error as NSError
        let message = errorMessage(error)
        if nsError.domain == kCLErrorDomain && nsError.code == CLError.denied.rawValue {
            return (1505004, message)
        }
        if nsError.domain == AMapFoundationErrorInvaildUserKey &&
            nsError.code == AMapFoundationErrorInvaildUserKeyCode {
            return (1505605, message)
        }
        if nsError.domain == AMapLocationErrorDomain {
            switch nsError.code {
            case 3: return (1505603, message)
            case 4: return (1505600, message)
            case 12: return (1505800, message)
            default: break
            }
        }
        return (1505602, message)
    }
    
    deinit {
        let authorization = authorizationManager
        let continuous = updateManager
        let requests = Array(singles.values)
        Self.onMain {
            authorization?.delegate = nil
            continuous?.delegate = nil
            continuous?.stopUpdatingLocation()
            for request in requests {
                request.success = nil
                request.failure = nil
                request.timer?.setEventHandler {}
                request.timer?.cancel()
                request.timer = nil
                request.manager?.delegate = nil
                request.manager?.stopUpdatingLocation()
                request.manager = nil
            }
        }
    }
}
