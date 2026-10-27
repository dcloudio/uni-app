import AMapFoundationKit
import CoreLocation
import DCloudUniappRuntime
import Foundation
import MAMapKit
import UIKit

final class AmapControlPosition {
    let left: Double
    let top: Double
    let width: Double
    let height: Double

    init(left: Double, top: Double, width: Double, height: Double) {
        self.left = left
        self.top = top
        self.width = width
        self.height = height
    }
}

final class AmapControlModel {
    let position: AmapControlPosition
    let iconPath: String?
    let id: Int?
    let clickable: Bool

    init(
        position: AmapControlPosition,
        iconPath: String?,
        id: Int?,
        clickable: Bool
    ) {
        self.position = position
        self.iconPath = iconPath
        self.id = id
        self.clickable = clickable
    }
}

private final class AmapControlButton: UIButton {
    let controlId: Int?

    init(controlId: Int?) {
        self.controlId = controlId
        super.init(frame: .zero)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

final class InnerAmapMap: MAMapView, MAMapViewDelegate, CLLocationManagerDelegate {
    private enum PolylineOverlayRole {
        case border
        case content
        case arrow
    }

    private struct PolylineOverlayStyle {
        let model: AmapPolylineModel
        let role: PolylineOverlayRole
    }

    private let locationManager = CLLocationManager()
    private var shouldShowUserLocation = false
    private var hasRequestedLocationPermission = false
    private var markerAnnotations: [Int: AmapPointAnnotation] = [:]
    private var markerMoveGenerations: [Int: UInt] = [:]
    private var polylineOverlays: [MAPolyline] = []
    private var polylineStyles: [ObjectIdentifier: PolylineOverlayStyle] = [:]
    private var polygonOverlays: [MAPolygon] = []
    private var polygonModels: [ObjectIdentifier: AmapPolygonModel] = [:]
    private var circleOverlays: [MACircle] = []
    private var circleModels: [ObjectIdentifier: AmapCircleModel] = [:]
    private var groundOverlays: [String: (MAGroundOverlay, AmapGroundOverlayModel)] = [:]
    private var groundOverlayGenerations: [String: UInt] = [:]
    private var mapLoadedCallback: (([String: Any]) -> Void)? = nil
    private var mapClickCallback: (([String: Any]) -> Void)? = nil
    private var markerTapCallback: (([String: Any]) -> Void)? = nil
    private var calloutTapCallback: (([String: Any]) -> Void)? = nil
    private var anchorPointTapCallback: (([String: Any]) -> Void)? = nil
    private var poiTapCallback: (([String: Any]) -> Void)? = nil
    private var controlTapCallback: (([String: Any]) -> Void)? = nil
    private var regionChangeCallback: (([String: Any]) -> Void)? = nil
    private var regionChangeInProgress = false
    private var regionChangeInitialZoomLevel: CGFloat = 0
    private var regionChangeWasUserAction = false
    private var regionChangeCausedBy = "update"
    private var pendingMapTapWorkItem: DispatchWorkItem? = nil
    private var mapTapGeneration: UInt = 0
    private var controlViews: [UIView] = []
    private var controlGeneration: UInt = 0
    
    static func hasValidAPIKey() -> Bool {
        guard let apiKey = Bundle.main.object(forInfoDictionaryKey: "AMapAPIKey") as? String,
              !apiKey.isEmpty else {
            return false
        }
        AMapServices.shared().apiKey = apiKey
        AMapServices.shared().enableHTTPS = true
        return true
    }

    init() {
        MAMapView.updatePrivacyShow(.didShow, privacyInfo: .didContain)
        MAMapView.updatePrivacyAgree(.didAgree)

        super.init(frame: .zero)
        delegate = self
        locationManager.delegate = self
        showsScale = false
        showsCompass = false
        zoomLevel = 16
        minZoomLevel = 5
        maxZoomLevel = 20
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setCenter(latitude: Double, longitude: Double, animated: Bool) {
        let coordinate = CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
        setCenter(coordinate, animated: animated)
    }

    func moveToCurrentLocation() -> Bool {
        guard let location = userLocation.location else { return false }
        let coordinate = location.coordinate
        guard coordinate.latitude != 0, coordinate.longitude != 0 else { return false }
        setCenter(
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            animated: true
        )
        return true
    }

    func getCenterLocation() -> AmapCenterLocationModel {
        let coordinate = centerCoordinate
        return AmapCenterLocationModel(
            latitude: coordinate.latitude,
            longitude: coordinate.longitude
        )
    }

    func getRegion() -> AmapRegionModel {
        let currentRegion = region
        let latDelta = currentRegion.span.latitudeDelta / 2
        let lngDelta = currentRegion.span.longitudeDelta / 2
        let center = currentRegion.center
        return AmapRegionModel(
            southwestLatitude: center.latitude - latDelta,
            southwestLongitude: center.longitude - lngDelta,
            northeastLatitude: center.latitude + latDelta,
            northeastLongitude: center.longitude + lngDelta
        )
    }
    
    func setScale(scale: Double, animated: Bool) {
        setZoomLevel(CGFloat(scale), animated: animated)
    }
    
    func setMinScale(zoom: Double) {
        minZoomLevel = CGFloat(zoom)
    }
    
    func setMaxScale(zoom: Double) {
        maxZoomLevel = CGFloat(zoom)
    }
    
    func getScale() -> Double {
        Double(zoomLevel)
    }
    
    func setTheme(theme: String) {
        switch theme {
        case "satellite":
            mapType = .satellite
        case "night":
            mapType = .standardNight
        case "navi":
            mapType = .navi
        case "bus":
            mapType = .bus
        default:
            mapType = .standard
        }
    }
    
    func setLayerStyle(id: String) {
        switch id {
        case "2":
            mapType = .satellite
        case "3":
            mapType = .standardNight
        case "4":
            mapType = .navi
        case "5":
            mapType = .bus
        case "6":
            mapType = .naviNight
        default:
            mapType = .standard
        }
    }
    
    func setShowLocation(show: Bool) {
        shouldShowUserLocation = show
        guard show else {
            disableUserLocation()
            return
        }

        let status: CLAuthorizationStatus
        if #available(iOS 14.0, *) {
            status = locationManager.authorizationStatus
        } else {
            status = CLLocationManager.authorizationStatus()
        }

        switch status {
        case .notDetermined:
            disableUserLocation()
            requestLocationPermission()
        case .authorizedWhenInUse, .authorizedAlways:
            enableUserLocation()
        case .denied, .restricted:
            disableUserLocation()
        @unknown default:
            disableUserLocation()
        }
    }
    
    func setEnableTraffic(enable: Bool) {
        isShowTraffic = enable
    }
    
    func setEnableSatellite(enable: Bool) {
        mapType = enable ? .satellite : .standard
    }

    func setEnableRotate(enable: Bool) {
        isRotateEnabled = enable
    }

    func setEnableZoom(enable: Bool) {
        isZoomEnabled = enable
    }

    func setEnableScroll(enable: Bool) {
        isScrollEnabled = enable
    }

    func setShowCompass(show: Bool) {
        showsCompass = show
    }

    func setShowScale(show: Bool) {
        showsScale = show
    }

    func setEnable3D(enable: Bool) {
        isShowsBuildings = enable
    }

    func setEnablePoi(enable: Bool) {
        isShowsLabels = enable
    }

    func setEnableBuilding(enable: Bool) {
        isShowsBuildings = enable
    }

    func setEnableIndoorMap(enable: Bool) {
        isShowsIndoorMap = enable
    }

    func setEnableOverlooking(enable: Bool) {
        isRotateCameraEnabled = enable
    }

    func setRotate(rotate: Double, animated: Bool) {
        setRotationDegree(CGFloat(rotate), animated: animated, duration: animated ? 0.25 : 0)
    }

    func setSkew(skew: Double, animated: Bool) {
        setCameraDegree(CGFloat(skew), animated: animated, duration: animated ? 0.25 : 0)
    }

    func setCameraPosition(latitude: Double, longitude: Double, zoom: Double, skew: Double, rotate: Double, animated: Bool) {
        let status = MAMapStatus()
        status.centerCoordinate = CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
        status.zoomLevel = CGFloat(zoom)
        status.rotationDegree = CGFloat(rotate)
        status.cameraDegree = CGFloat(skew)
        status.screenAnchor = screenAnchor
        setMapStatus(status, animated: animated, duration: animated ? 0.25 : 0)
    }
    
    func requestLocationPermission() {
        guard !hasRequestedLocationPermission else { return }

        let status: CLAuthorizationStatus
        if #available(iOS 14.0, *) {
            status = locationManager.authorizationStatus
        } else {
            status = CLLocationManager.authorizationStatus()
        }
        guard status == .notDetermined else { return }

        hasRequestedLocationPermission = true
        locationManager.requestWhenInUseAuthorization()
    }

    @available(iOS 14.0, *)
    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        handleLocationAuthorizationChange(manager.authorizationStatus)
    }

    func locationManager(
        _ manager: CLLocationManager,
        didChangeAuthorization status: CLAuthorizationStatus
    ) {
        handleLocationAuthorizationChange(status)
    }

    private func handleLocationAuthorizationChange(_ status: CLAuthorizationStatus) {
        DispatchQueue.main.async { [weak self] in
            guard let self else { return }
            guard self.shouldShowUserLocation else {
                self.disableUserLocation()
                return
            }
            switch status {
            case .authorizedWhenInUse, .authorizedAlways:
                self.enableUserLocation()
            default:
                self.disableUserLocation()
            }
        }
    }

    private func enableUserLocation() {
        showsUserLocation = true
        setUserTrackingMode(.followWithHeading, animated: true)
    }

    private func disableUserLocation() {
        showsUserLocation = false
        setUserTrackingMode(.none, animated: true)
    }

    func setOnMapLoadedCallback(iCallBack: @escaping ([String: Any]) -> Void) {
        mapLoadedCallback = iCallBack
    }

    func setOnMapClickCallback(iCallBack: @escaping ([String: Any]) -> Void) {
        mapClickCallback = iCallBack
    }

    public func setOnMarkerTapCallback(iCallBack: @escaping ([String: Any]) -> Void) {
        markerTapCallback = iCallBack
    }

    public func setOnCalloutTapCallback(iCallBack: @escaping ([String: Any]) -> Void) {
        calloutTapCallback = iCallBack
    }

    public func setOnAnchorPointTapCallback(iCallBack: @escaping ([String: Any]) -> Void) {
        anchorPointTapCallback = iCallBack
    }

    public func setOnPoiTapCallback(iCallBack: @escaping ([String: Any]) -> Void) {
        poiTapCallback = iCallBack
    }

    public func setOnControlTapCallback(iCallBack: @escaping ([String: Any]) -> Void) {
        controlTapCallback = iCallBack
    }

    public func setOnRegionChangeCallback(iCallBack: @escaping ([String: Any]) -> Void) {
        regionChangeCallback = iCallBack
    }

    func setControls(controls: [AmapControlModel]) {
        controlGeneration &+= 1
        let generation = controlGeneration
        removeControlViews()

        controls.forEach { model in
            let frame = CGRect(
                x: CGFloat(model.position.left),
                y: CGFloat(model.position.top),
                width: max(0, CGFloat(model.position.width)),
                height: max(0, CGFloat(model.position.height))
            )
            let control: UIView
            if model.clickable {
                let button = AmapControlButton(controlId: model.id)
                button.frame = frame
                button.accessibilityIdentifier = model.id.map(String.init) ?? String(button.hashValue)
                button.addTarget(self, action: #selector(handleControlTap(_:)), for: .touchUpInside)
                control = button
            } else {
                let imageView = UIImageView(frame: frame)
                imageView.accessibilityIdentifier = model.id.map(String.init) ?? String(imageView.hashValue)
                imageView.contentMode = .scaleAspectFit
                imageView.isUserInteractionEnabled = false
                control = imageView
            }

            addSubview(control)
            controlViews.append(control)

            guard let iconPath = model.iconPath, !iconPath.isEmpty else { return }
            UTSiOS.loadImage(iconPath) { [weak self, weak control] image, _ in
                DispatchQueue.main.async {
                    guard let self,
                          self.controlGeneration == generation,
                          let control,
                          control.superview === self else { return }
                    if let button = control as? UIButton {
                        button.setImage(image, for: .normal)
                    } else if let imageView = control as? UIImageView {
                        imageView.image = image
                    }
                }
            }
        }
    }

    func setMarkers(markers: [AmapMarkerModel]) {
        var latestMarkers: [Int: AmapMarkerModel] = [:]
        markers.forEach { marker in
            latestMarkers[marker.id] = marker
        }

        var annotationsToRemove: [AmapPointAnnotation] = []
        Array(markerAnnotations.keys).forEach { markerId in
            guard latestMarkers[markerId] == nil,
                  let annotation = markerAnnotations[markerId] else { return }
            invalidateMarkerMove(markerId: markerId, annotation: annotation)
            (view(for: annotation) as? AmapMarkerAnnotationView)?.prepareForMapRemoval()
            annotationsToRemove.append(annotation)
            markerAnnotations.removeValue(forKey: markerId)
        }
        if !annotationsToRemove.isEmpty {
            removeAnnotations(annotationsToRemove)
        }

        var annotationsToAdd: [AmapPointAnnotation] = []
        latestMarkers.forEach { markerId, marker in
            guard let existingAnnotation = markerAnnotations[markerId] else {
                let annotation = AmapPointAnnotation(marker: marker)
                markerAnnotations[markerId] = annotation
                annotationsToAdd.append(annotation)
                return
            }

            guard !isSameMarker(existingAnnotation.marker, marker) else { return }
            replaceMarker(existingAnnotation, with: marker)
        }

        if !annotationsToAdd.isEmpty {
            addAnnotations(annotationsToAdd)
        }
    }

    private func replaceMarker(_ annotation: AmapPointAnnotation, with marker: AmapMarkerModel) {
        invalidateMarkerMove(markerId: annotation.marker.id, annotation: annotation)
        (view(for: annotation) as? AmapMarkerAnnotationView)?.prepareForMapRemoval()
        removeAnnotation(annotation)

        let replacement = AmapPointAnnotation(marker: marker)
        markerAnnotations[marker.id] = replacement
        addAnnotation(replacement)
    }

    private func isSameMarker(_ lhs: AmapMarkerModel, _ rhs: AmapMarkerModel) -> Bool {
        lhs.id == rhs.id
            && lhs.latitude == rhs.latitude
            && lhs.longitude == rhs.longitude
            && lhs.iconPath == rhs.iconPath
            && lhs.title == rhs.title
            && lhs.rotate == rhs.rotate
            && lhs.alpha == rhs.alpha
            && lhs.width == rhs.width
            && lhs.height == rhs.height
            && lhs.ariaLabel == rhs.ariaLabel
            && lhs.anchorX == rhs.anchorX
            && lhs.anchorY == rhs.anchorY
            && isSameCallout(lhs.callout, rhs.callout)
            && isSameLabel(lhs.label, rhs.label)
            && lhs.clusterId == rhs.clusterId
            && lhs.joinCluster == rhs.joinCluster
    }

    private func isSameCallout(
        _ lhs: AmapMarkerCalloutModel?,
        _ rhs: AmapMarkerCalloutModel?
    ) -> Bool {
        switch (lhs, rhs) {
        case (nil, nil):
            return true
        case let (lhs?, rhs?):
            return lhs.content == rhs.content
                && lhs.color.isEqual(rhs.color)
                && lhs.fontSize == rhs.fontSize
                && lhs.borderRadius == rhs.borderRadius
                && lhs.borderWidth == rhs.borderWidth
                && lhs.borderColor.isEqual(rhs.borderColor)
                && lhs.bgColor.isEqual(rhs.bgColor)
                && lhs.padding == rhs.padding
                && lhs.display == rhs.display
                && lhs.textAlign == rhs.textAlign
        default:
            return false
        }
    }

    private func isSameLabel(
        _ lhs: AmapMarkerLabelModel?,
        _ rhs: AmapMarkerLabelModel?
    ) -> Bool {
        switch (lhs, rhs) {
        case (nil, nil):
            return true
        case let (lhs?, rhs?):
            return lhs.content == rhs.content
                && lhs.color.isEqual(rhs.color)
                && lhs.fontSize == rhs.fontSize
                && lhs.x == rhs.x
                && lhs.y == rhs.y
                && lhs.borderWidth == rhs.borderWidth
                && lhs.borderColor.isEqual(rhs.borderColor)
                && lhs.bgColor.isEqual(rhs.bgColor)
                && lhs.borderRadius == rhs.borderRadius
                && lhs.padding == rhs.padding
                && lhs.textAlign == rhs.textAlign
        default:
            return false
        }
    }

    private func clearMarkers() {
        markerAnnotations.values.forEach { annotation in
            invalidateMarkerMove(markerId: annotation.marker.id, annotation: annotation)
            (view(for: annotation) as? AmapMarkerAnnotationView)?.prepareForMapRemoval()
        }
        if !markerAnnotations.isEmpty {
            removeAnnotations(Array(markerAnnotations.values))
        }
        markerAnnotations.removeAll()
    }

    func addMarkers(markers: [AmapMarkerModel], clear: Bool) {
        if clear {
            clearMarkers()
        }

        var latestMarkers: [Int: AmapMarkerModel] = [:]
        var markerIds: [Int] = []
        markers.forEach { marker in
            if latestMarkers[marker.id] == nil {
                markerIds.append(marker.id)
            }
            latestMarkers[marker.id] = marker
        }

        var annotationsToAdd: [AmapPointAnnotation] = []
        markerIds.forEach { markerId in
            guard let marker = latestMarkers[markerId] else { return }
            if let existingAnnotation = markerAnnotations[markerId] {
                if isSameMarker(existingAnnotation.marker, marker) {
                    return
                }
                invalidateMarkerMove(markerId: markerId, annotation: existingAnnotation)
                (view(for: existingAnnotation) as? AmapMarkerAnnotationView)?.prepareForMapRemoval()
                removeAnnotation(existingAnnotation)
            }

            let annotation = AmapPointAnnotation(marker: marker)
            markerAnnotations[markerId] = annotation
            annotationsToAdd.append(annotation)
        }

        if !annotationsToAdd.isEmpty {
            addAnnotations(annotationsToAdd)
        }
    }

    func removeMarkers(ids: [NSNumber]) {
        var annotationsToRemove: [AmapPointAnnotation] = []
        ids.forEach { id in
            let markerId = id.intValue
            guard let annotation = markerAnnotations[markerId] else {
                markerMoveGenerations[markerId] = (markerMoveGenerations[markerId] ?? 0) &+ 1
                return
            }
            invalidateMarkerMove(markerId: markerId, annotation: annotation)
            (view(for: annotation) as? AmapMarkerAnnotationView)?.prepareForMapRemoval()
            markerAnnotations.removeValue(forKey: markerId)
            annotationsToRemove.append(annotation)
        }

        if !annotationsToRemove.isEmpty {
            removeAnnotations(annotationsToRemove)
        }
    }

    func translateMarker(
        markerId: Int,
        latitude: Double,
        longitude: Double,
        duration: Double,
        rotate: Double?,
        moveWithRotate: Bool,
        autoRotate: Bool,
        callback: @escaping (Bool) -> Void
    ) {
        guard let annotation = markerAnnotations[markerId] else {
            callback(false)
            return
        }

        let generation = invalidateMarkerMove(markerId: markerId, annotation: annotation)

        let totalDuration = duration / 1000.0
        let finalRotateDegree = resolveTranslateRotateDegree(
            annotation: annotation,
            latitude: latitude,
            longitude: longitude,
            rotate: rotate,
            autoRotate: autoRotate
        )

        guard let annotationView = view(for: annotation) as? AmapMarkerAnnotationView else {
            // marker 未在屏幕内渲染：平移照常执行，旋转仅更新模型，复用渲染时生效
            if let finalRotateDegree {
                annotation.marker.rotate = finalRotateDegree
            }
            addMarkerMoveAnimation(
                annotation,
                latitude: latitude,
                longitude: longitude,
                duration: totalDuration,
                generation: generation
            )
            callback(true)
            return
        }
                
        let rotateDuration: Double
        let moveDuration: Double
        let moveDelay: Double
        if finalRotateDegree != nil, !moveWithRotate {
            // 先旋转占 30% 时长，再平移占 70% 时长
            rotateDuration = totalDuration * 0.3
            moveDuration = totalDuration * 0.7
            moveDelay = totalDuration * 0.3
        } else {
            rotateDuration = totalDuration
            moveDuration = totalDuration
            moveDelay = 0
        }

        if let finalRotateDegree {
            startMarkerRotationAnimation(
                annotationView,
                annotation: annotation,
                toRotateDegree: finalRotateDegree,
                duration: rotateDuration
            )
        }

        if moveDelay > 0 {
            DispatchQueue.main.asyncAfter(deadline: .now() + moveDelay) { [weak self, weak annotation] in
                guard let self,
                      let annotation,
                      self.markerAnnotations[annotation.marker.id] === annotation,
                      self.markerMoveGenerations[annotation.marker.id] == generation else { return }
                self.addMarkerMoveAnimation(
                    annotation,
                    latitude: latitude,
                    longitude: longitude,
                    duration: moveDuration,
                    generation: generation
                )
            }
        } else {
            addMarkerMoveAnimation(
                annotation,
                latitude: latitude,
                longitude: longitude,
                duration: moveDuration,
                generation: generation
            )
        }

        callback(true)
    }

    func moveAlong(
        markerId: Int,
        path: [AmapPolylinePointModel],
        duration: Double,
        callback: @escaping (Bool) -> Void
    ) {
        guard let annotation = markerAnnotations[markerId] else {
            callback(false)
            return
        }

        let generation = invalidateMarkerMove(markerId: markerId, annotation: annotation)
        let baseRotationDegree = annotation.marker.rotate
        guard !path.isEmpty else {
            callback(true)
            return
        }

        let finalPoint = path[path.count - 1]
        let coordinates = path.map {
            CLLocationCoordinate2D(latitude: $0.latitude, longitude: $0.longitude)
        }
        let durationInSeconds = duration / 1000.0
        guard durationInSeconds > 0 else {
            annotation.coordinate = coordinates[coordinates.count - 1]
            annotation.marker.latitude = finalPoint.latitude
            annotation.marker.longitude = finalPoint.longitude
            let finalDirection = movementDirection(
                for: coordinates,
                fallback: annotation.movingDirection
            )
            let finalRotateDegree = movementRotateDegree(
                directionDegree: finalDirection,
                baseRotationDegree: baseRotationDegree
            )
            annotation.marker.rotate = finalRotateDegree
            (view(for: annotation) as? AmapMarkerAnnotationView)?.setMovementRotation(
                directionDegree: finalDirection - Double(rotationDegree),
                baseRotationDegree: baseRotationDegree,
                immediate: true
            )
            callback(true)
            return
        }

        addMarkerMoveAnimation(
            annotation,
            coordinates: coordinates,
            duration: durationInSeconds,
            generation: generation,
            movementBaseRotationDegree: baseRotationDegree,
            completion: { [weak self, weak annotation] isFinished in
                guard isFinished,
                      let self,
                      let annotation,
                      self.markerAnnotations[markerId] === annotation,
                      self.markerMoveGenerations[markerId] == generation else { return }
                annotation.marker.latitude = finalPoint.latitude
                annotation.marker.longitude = finalPoint.longitude
                let finalDirection = annotation.movingDirection
                annotation.marker.rotate = self.movementRotateDegree(
                    directionDegree: finalDirection,
                    baseRotationDegree: baseRotationDegree
                )
                self.view(for: annotation).flatMap {
                    $0 as? AmapMarkerAnnotationView
                }?.setMovementRotation(
                    directionDegree: finalDirection - Double(self.rotationDegree),
                    baseRotationDegree: baseRotationDegree,
                    immediate: true
                )
                callback(true)
            }
        )
    }

    @discardableResult
    private func invalidateMarkerMove(
        markerId: Int,
        annotation: AmapPointAnnotation
    ) -> UInt {
        let generation = (markerMoveGenerations[markerId] ?? 0) &+ 1
        markerMoveGenerations[markerId] = generation
        annotation.cancelAllMoveAnimations()
        (view(for: annotation) as? AmapMarkerAnnotationView)?.clearIconRotationAnimations()
        return generation
    }

    private func movementRotateDegree(
        directionDegree: Double,
        baseRotationDegree: Double
    ) -> Double {
        baseRotationDegree + directionDegree - Double(rotationDegree)
    }

    private func movementDirection(
        for coordinates: [CLLocationCoordinate2D],
        fallback: Double
    ) -> Double {
        guard coordinates.count >= 2,
              let start = coordinates.dropLast().last,
              let end = coordinates.last else {
            return fallback
        }
        return atan2(
            end.longitude - start.longitude,
            end.latitude - start.latitude
        ) * 180.0 / .pi
    }

    private func resolveTranslateRotateDegree(
        annotation: AmapPointAnnotation,
        latitude: Double,
        longitude: Double,
        rotate: Double?,
        autoRotate: Bool
    ) -> Double? {
        guard autoRotate else { return rotate }
        let startCoordinate = annotation.coordinate
        let bearingDegree = atan2(
            longitude - startCoordinate.longitude,
            latitude - startCoordinate.latitude
        ) * 180.0 / .pi
        // 补偿地图当前旋转角，保证屏幕视觉朝向正确
        return bearingDegree - Double(rotationDegree)
    }

    private func addMarkerMoveAnimation(
        _ annotation: AmapPointAnnotation,
        latitude: Double,
        longitude: Double,
        duration: Double,
        generation: UInt
    ) {
        addMarkerMoveAnimation(
            annotation,
            coordinates: [CLLocationCoordinate2DMake(latitude, longitude)],
            duration: duration,
            generation: generation
        )
    }

    private func addMarkerMoveAnimation(
        _ annotation: AmapPointAnnotation,
        coordinates: [CLLocationCoordinate2D],
        duration: Double,
        generation: UInt,
        movementBaseRotationDegree: Double? = nil,
        completion: @escaping (Bool) -> Void = { _ in }
    ) {
        var keyCoordinates = coordinates
        annotation.addMoveAnimation(
            withKeyCoordinates: &keyCoordinates,
            count: UInt(keyCoordinates.count),
            withDuration: CGFloat(duration),
            withName: nil,
            completeCallback: { [weak self, weak annotation] isFinished in
                guard isFinished,
                      let self,
                      let annotation,
                      self.markerAnnotations[annotation.marker.id] === annotation,
                      self.markerMoveGenerations[annotation.marker.id] == generation else { return }
                completion(true)
            },
            stepCallback: { [weak self, weak annotation] (ani: MAAnnotationMoveAnimation?) in
                guard ani != nil else { return }
                guard let self,
                      let annotation,
                      self.markerAnnotations[annotation.marker.id] === annotation,
                      self.markerMoveGenerations[annotation.marker.id] == generation else { return }
                let currentDir = annotation.movingDirection
                let annotationView = self.view(for: annotation) as? AmapMarkerAnnotationView
                if let movementBaseRotationDegree {
                    let compensatedDirection = currentDir - Double(self.rotationDegree)
                    annotation.marker.rotate = self.movementRotateDegree(
                        directionDegree: currentDir,
                        baseRotationDegree: movementBaseRotationDegree
                    )
                    annotationView?.setMovementRotation(
                        directionDegree: compensatedDirection,
                        baseRotationDegree: movementBaseRotationDegree
                    )
                }
            }
        )
    }

    private func startMarkerRotationAnimation(
        _ annotationView: AmapMarkerAnnotationView,
        annotation: AmapPointAnnotation,
        toRotateDegree: Double,
        duration: Double
    ) {
        // 动画发起前直接落地 model 终态，view 复用或屏幕外渲染时保持一致
        annotation.marker.rotate = toRotateDegree
        annotationView.setIconRotation(toDegree: toRotateDegree, duration: duration)
    }

    func setPolyline(models: [AmapPolylineModel]) {
        if !polylineOverlays.isEmpty {
            removeOverlays(polylineOverlays)
        }
        polylineOverlays.removeAll()
        polylineStyles.removeAll()
        models.forEach { model in
            guard model.points.count >= 2 else { return }
            var coordinates = model.points.map { point in
                CLLocationCoordinate2D(latitude: point.latitude, longitude: point.longitude)
            }
            if model.borderColor != nil,
               let borderWidth = model.borderWidth,
               borderWidth > 0,
               let borderPolyline = MAPolyline(
                   coordinates: &coordinates,
                   count: UInt(coordinates.count)
               ) {
                polylineOverlays.append(borderPolyline)
                polylineStyles[ObjectIdentifier(borderPolyline)] = PolylineOverlayStyle(
                    model: model,
                    role: .border
                )
            }

            let colorCount = model.colorList?.count ?? 0
            let polyline: MAPolyline?
            if colorCount > 0 {
                let indexes = Self.colorIndexes(pointCount: coordinates.count, colorCount: colorCount)
                polyline = MAMultiPolyline(
                    coordinates: &coordinates,
                    count: UInt(coordinates.count),
                    drawStyleIndexes: indexes
                )
            } else {
                polyline = MAPolyline(
                    coordinates: &coordinates,
                    count: UInt(coordinates.count)
                )
            }
            guard let polyline else { return }
            polylineOverlays.append(polyline)
            polylineStyles[ObjectIdentifier(polyline)] = PolylineOverlayStyle(
                model: model,
                role: .content
            )

            if model.arrowLine,
               model.arrowIconPath?.isEmpty == false,
               let arrowPolyline = MAPolyline(
                   coordinates: &coordinates,
                   count: UInt(coordinates.count)
               ) {
                polylineOverlays.append(arrowPolyline)
                polylineStyles[ObjectIdentifier(arrowPolyline)] = PolylineOverlayStyle(
                    model: model,
                    role: .arrow
                )
            }
        }
        if !polylineOverlays.isEmpty {
            addOverlays(polylineOverlays)
        }
    }

    func setPolygons(models: [AmapPolygonModel]) {
        if !polygonOverlays.isEmpty {
            removeOverlays(polygonOverlays)
        }
        polygonOverlays.removeAll()
        polygonModels.removeAll()

        let sortedModels = models.enumerated().sorted { lhs, rhs in
            lhs.element.zIndex == rhs.element.zIndex
                ? lhs.offset < rhs.offset
                : lhs.element.zIndex < rhs.element.zIndex
        }.map(\.element)

        sortedModels.forEach { model in
            guard model.points.count >= 3 else { return }
            var coordinates = model.points.map { point in
                CLLocationCoordinate2D(latitude: point.latitude, longitude: point.longitude)
            }
            guard let polygon = MAPolygon(
                coordinates: &coordinates,
                count: UInt(coordinates.count)
            ) else { return }
            polygonOverlays.append(polygon)
            polygonModels[ObjectIdentifier(polygon)] = model
        }
        if !polygonOverlays.isEmpty {
            addOverlays(polygonOverlays)
        }
    }

    func setCircles(models: [AmapCircleModel]) {
        if !circleOverlays.isEmpty {
            removeOverlays(circleOverlays)
        }
        circleOverlays.removeAll()
        circleModels.removeAll()

        models.forEach { model in
            let center = CLLocationCoordinate2D(
                latitude: model.latitude,
                longitude: model.longitude
            )
            guard let circle = MACircle(
                center: center,
                radius: max(0, model.radius)
            ) else { return }
            circleOverlays.append(circle)
            circleModels[ObjectIdentifier(circle)] = model
        }
        if !circleOverlays.isEmpty {
            addOverlays(circleOverlays)
        }
    }

    func addGroundOverlay(model: AmapGroundOverlayModel, callback: @escaping (Bool) -> Void) {
        let overlayId = model.id

        // upsert：失效同 id 在途的图片加载并移除旧 overlay，再按新模型重建
        let generation = (groundOverlayGenerations[overlayId] ?? 0) &+ 1
        groundOverlayGenerations[overlayId] = generation
        if let existingOverlay = groundOverlays.removeValue(forKey: overlayId)?.0 {
            removeOverlays([existingOverlay])
        }

        UTSiOS.loadImage(model.src) { [weak self] image, _ in
            DispatchQueue.main.async {
                guard let self,
                      self.groundOverlayGenerations[overlayId] == generation else { return }
                guard let image else {
                    callback(false)
                    return
                }

                let bounds = MACoordinateBounds(
                    northEast: CLLocationCoordinate2D(
                        latitude: model.northeast.latitude,
                        longitude: model.northeast.longitude
                    ),
                    southWest: CLLocationCoordinate2D(
                        latitude: model.southwest.latitude,
                        longitude: model.southwest.longitude
                    )
                )
                guard let overlay = MAGroundOverlay(bounds: bounds, icon: image) else {
                    callback(false)
                    return
                }

                self.groundOverlays[overlayId] = (overlay, model)
                if model.visible {
                    self.insertGroundOverlayByZIndex(overlay, model: model)
                }
                callback(true)
            }
        }
    }

    func removeGroundOverlay(id: String, callback: @escaping (Bool) -> Void) {
        // 无论字典中是否存在该 id，先递增 generation 使同 id 在途的图片加载回调失效，
        // 防止 remove 后 add 的回调又把 overlay 加回地图
        groundOverlayGenerations[id] = (groundOverlayGenerations[id] ?? 0) &+ 1

        guard let (overlay, _) = groundOverlays.removeValue(forKey: id) else {
            callback(false)
            return
        }
        removeOverlays([overlay])
        callback(true)
    }

    func updateGroundOverlay(model: AmapGroundOverlayModel, callback: @escaping (Bool) -> Void) {
        // 只能更新已存在的图层：字典中不存在该 id（含在途 add 尚未完成）时直接失败
        guard let (existingOverlay, existingModel) = groundOverlays[model.id] else {
            callback(false)
            return
        }

        // src 未变（existingModel.src 与请求 model.src 均为加载前的原始路径，可直接比较）：
        // 复用 overlay 现有 icon 原地更新，不重新加载图片，避免闪烁与加载失败丢图层
        if model.src == existingModel.src, let existingIcon = existingOverlay.icon {
            let newBounds = groundOverlayBounds(for: model)
            let oldBounds = existingOverlay.bounds
            let boundsChanged = oldBounds.northEast.latitude != newBounds.northEast.latitude
                || oldBounds.northEast.longitude != newBounds.northEast.longitude
                || oldBounds.southWest.latitude != newBounds.southWest.latitude
                || oldBounds.southWest.longitude != newBounds.southWest.longitude
            if boundsChanged {
                existingOverlay.setGroundOverlayWith(newBounds, icon: existingIcon)
            }
            groundOverlays[model.id] = (existingOverlay, model)
            applyGroundOverlayStateDiff(overlay: existingOverlay, oldModel: existingModel, newModel: model)
            callback(true)
            return
        }

        // src 变化：generation 递增使同 id 在途加载失效，但保留旧 overlay 兜底，
        // 新图加载成功后原地替换，失败时旧图层保持不变
        let generation = (groundOverlayGenerations[model.id] ?? 0) &+ 1
        groundOverlayGenerations[model.id] = generation

        UTSiOS.loadImage(model.src) { [weak self] image, _ in
            DispatchQueue.main.async {
                guard let self,
                      self.groundOverlayGenerations[model.id] == generation else {
                    callback(false)
                    return
                }
                guard let image else {
                    // 加载失败：不移除旧 overlay，图层保持原状
                    callback(false)
                    return
                }
                // generation 校验通过后以字典当前记录为准（期间可能被同 src 的
                // update 原地刷新过），再对 overlay 做原地更新
                guard let (existingOverlay, currentModel) = self.groundOverlays[model.id] else {
                    callback(false)
                    return
                }

                // 原地更新 bounds 与新图，不重建 overlay，避免闪烁
                existingOverlay.setGroundOverlayWith(self.groundOverlayBounds(for: model), icon: image)
                self.groundOverlays[model.id] = (existingOverlay, model)
                self.applyGroundOverlayStateDiff(overlay: existingOverlay, oldModel: currentModel, newModel: model)
                callback(true)
            }
        }
    }

    /// 由 model 构造 ground overlay 的坐标范围
    private func groundOverlayBounds(for model: AmapGroundOverlayModel) -> MACoordinateBounds {
        MACoordinateBounds(
            northEast: CLLocationCoordinate2D(
                latitude: model.northeast.latitude,
                longitude: model.northeast.longitude
            ),
            southWest: CLLocationCoordinate2D(
                latitude: model.southwest.latitude,
                longitude: model.southwest.longitude
            )
        )
    }

    /// 高德 renderer 无 zIndex 属性，层级由 overlay 添加顺序决定，
    /// 改用 insertOverlay 相对插入实现 zIndex，zIndex 相等时后添加的在上层。
    /// 调用前需保证 groundOverlays 已写入该 overlay 的最新 model，且 overlay 未添加到地图
    private func insertGroundOverlayByZIndex(_ overlay: MAGroundOverlay, model: AmapGroundOverlayModel) {
        let siblings = (self.overlays ?? []).compactMap { item -> (MAGroundOverlay, AmapGroundOverlayModel)? in
            guard let ground = item as? MAGroundOverlay,
                  let pair = self.groundOverlays.values.first(where: { $0.0 === ground }),
                  pair.1.visible
            else { return nil }
            return pair
        }
        let sortedSiblings = siblings.enumerated().sorted { lhs, rhs in
            lhs.element.1.zIndex == rhs.element.1.zIndex
                ? lhs.offset < rhs.offset
                : lhs.element.1.zIndex < rhs.element.1.zIndex
        }.map(\.element)

        if let anchor = sortedSiblings.last(where: { $0.1.zIndex <= model.zIndex }) {
            // 存在 zIndex <= 当前值的其他可见 overlay：
            // 插到其中 zIndex 最大者（相等时取后添加的）上方
            self.insert(overlay, above: anchor.0)
        } else if let anchor = sortedSiblings.first {
            // 其他可见 overlay 的 zIndex 都更大：
            // 插到 zIndex 最小者（相等时取先添加的）下方
            self.insert(overlay, below: anchor.0)
        } else {
            // 没有其他可见 overlay 时保持直接添加
            self.add(overlay)
        }
    }

    /// 对已在地图上的 ground overlay 按新旧 model 差量同步 visible/zIndex/opacity。
    /// 调用前需保证 groundOverlays 已写入 newModel
    private func applyGroundOverlayStateDiff(
        overlay: MAGroundOverlay,
        oldModel: AmapGroundOverlayModel,
        newModel: AmapGroundOverlayModel
    ) {
        let wasVisible = oldModel.visible
        let isVisible = newModel.visible

        if wasVisible && isVisible {
            if oldModel.zIndex != newModel.zIndex {
                // zIndex 变化：移除后按新 zIndex 重新相对插入
                removeOverlays([overlay])
                insertGroundOverlayByZIndex(overlay, model: newModel)
            }
        } else if isVisible {
            // 隐藏 → 可见：按 zIndex 相对插入
            insertGroundOverlayByZIndex(overlay, model: newModel)
        } else if wasVisible {
            // 可见 → 隐藏：直接移除
            removeOverlays([overlay])
        }

        if oldModel.opacity != newModel.opacity,
           let renderer = self.renderer(for: overlay) as? MAGroundOverlayRenderer {
            // renderer 尚未创建时跳过，下次渲染时 rendererFor 回调会用新 model 重建
            renderer.alpha = isVisible
                ? CGFloat(min(max(newModel.opacity, 0), 1))
                : 0
        }
    }

    func setIncludePoints(points: [AmapIncludePointModel], animated: Bool) {
        guard let first = points.first else { return }

        let firstCoordinate = CLLocationCoordinate2D(
            latitude: first.latitude,
            longitude: first.longitude
        )
        guard points.count > 1 else {
            setCenter(firstCoordinate, animated: animated)
            return
        }

        let mapPoints = points.map { point in
            MAMapPointForCoordinate(CLLocationCoordinate2D(
                latitude: point.latitude,
                longitude: point.longitude
            ))
        }
        var minX = mapPoints[0].x
        var maxX = mapPoints[0].x
        var minY = mapPoints[0].y
        var maxY = mapPoints[0].y
        for point in mapPoints.dropFirst() {
            minX = min(minX, point.x)
            maxX = max(maxX, point.x)
            minY = min(minY, point.y)
            maxY = max(maxY, point.y)
        }

        let width = maxX - minX
        let height = maxY - minY
        guard width > 0 || height > 0 else {
            setCenter(firstCoordinate, animated: animated)
            return
        }

        let mapRect = MAMapRectMake(
            minX,
            minY,
            max(width, 1),
            max(height, 1)
        )
        setVisibleMapRect(
            mapRect,
            edgePadding: UIEdgeInsets(top: 40, left: 40, bottom: 40, right: 40),
            animated: animated
        )
    }
    
    func prepareForDestroy() {
        cancelPendingMapTap()
        controlGeneration &+= 1
        mapLoadedCallback = nil
        mapClickCallback = nil
        markerTapCallback = nil
        calloutTapCallback = nil
        anchorPointTapCallback = nil
        poiTapCallback = nil
        controlTapCallback = nil
        regionChangeCallback = nil
        regionChangeInProgress = false
        regionChangeWasUserAction = false
        hideByClickCallouts()
        markerAnnotations.values.forEach { annotation in
            invalidateMarkerMove(markerId: annotation.marker.id, annotation: annotation)
            (view(for: annotation) as? AmapMarkerAnnotationView)?.prepareForMapRemoval()
        }
        markerMoveGenerations.removeAll()
        delegate = nil
        if !markerAnnotations.isEmpty {
            removeAnnotations(Array(markerAnnotations.values))
            markerAnnotations.removeAll()
        }
        if !polylineOverlays.isEmpty {
            removeOverlays(polylineOverlays)
            polylineOverlays.removeAll()
            polylineStyles.removeAll()
        }
        if !polygonOverlays.isEmpty {
            removeOverlays(polygonOverlays)
            polygonOverlays.removeAll()
            polygonModels.removeAll()
        }
        if !circleOverlays.isEmpty {
            removeOverlays(circleOverlays)
            circleOverlays.removeAll()
            circleModels.removeAll()
        }
        if !groundOverlays.isEmpty {
            removeOverlays(groundOverlays.values.map(\.0))
            groundOverlays.removeAll()
        }
        groundOverlayGenerations.removeAll()
        removeControlViews()
        showsUserLocation = false
        removeFromSuperview()
    }

    private func removeControlViews() {
        controlViews.forEach { $0.removeFromSuperview() }
        controlViews.removeAll()
    }

    @objc private func handleControlTap(_ sender: AmapControlButton) {
        let controlId = sender.controlId ?? sender.hashValue
        controlTapCallback?([
            "type": "controltap",
            "detail": ["controlId": controlId]
        ])
    }

    func mapViewDidFinishLoadingMap(_ mapView: MAMapView!) {
        mapLoadedCallback?(["type": "updated", "detail": [String: Any]()])
    }

    func mapViewRegionChanged(_ mapView: MAMapView!) {
        updateRegionChangeCauseIfNeeded(mapView)
    }

    func mapView(_ mapView: MAMapView!, regionWillChangeAnimated animated: Bool) {
        beginRegionChange(mapView, wasUserAction: false)
    }

    func mapView(_ mapView: MAMapView!, regionWillChangeAnimated animated: Bool, wasUserAction: Bool) {
        beginRegionChange(mapView, wasUserAction: wasUserAction)
    }

    func mapView(_ mapView: MAMapView!, regionDidChangeAnimated animated: Bool) {
        endRegionChange(mapView)
    }

    func mapView(_ mapView: MAMapView!, regionDidChangeAnimated animated: Bool, wasUserAction: Bool) {
        endRegionChange(mapView, wasUserAction: wasUserAction)
    }

    private func beginRegionChange(_ mapView: MAMapView, wasUserAction: Bool) {
        if regionChangeInProgress {
            if wasUserAction {
                regionChangeWasUserAction = true
            }
            updateRegionChangeCauseIfNeeded(mapView)
            return
        }

        regionChangeInProgress = true
        regionChangeInitialZoomLevel = mapView.zoomLevel
        regionChangeWasUserAction = wasUserAction
        regionChangeCausedBy = wasUserAction ? "gesture" : "update"
        regionChangeCallback?([
            "type": "begin",
            "detail": [String: Any]()
        ])
    }

    private func updateRegionChangeCauseIfNeeded(_ mapView: MAMapView) {
        guard regionChangeInProgress, regionChangeWasUserAction else { return }
        if abs(mapView.zoomLevel - regionChangeInitialZoomLevel) > 0.0001 {
            regionChangeCausedBy = "scale"
        }
    }

    private func endRegionChange(_ mapView: MAMapView, wasUserAction: Bool? = nil) {
        guard regionChangeInProgress else { return }
        if wasUserAction == true {
            regionChangeWasUserAction = true
        }
        updateRegionChangeCauseIfNeeded(mapView)
        if regionChangeWasUserAction && regionChangeCausedBy != "scale" {
            regionChangeCausedBy = "drag"
        }
        let detail: [String: Any] = [
            "skew": Double(mapView.cameraDegree),
            "rotate": Double(mapView.rotationDegree)
        ]
        regionChangeCallback?([
            "type": "end",
            "detail": detail,
            "causedBy": regionChangeCausedBy
        ])
        regionChangeInProgress = false
        regionChangeWasUserAction = false
    }
    
    func mapView(_ mapView: MAMapView!, didSingleTappedAt coordinate: CLLocationCoordinate2D) {
        hideByClickCallouts()
        let point = mapView.convert(coordinate, toPointTo: mapView)
        let screenPoint: CGPoint
        if let window = mapView.window {
            screenPoint = mapView.convert(point, to: window)
        } else {
            screenPoint = point
        }
        let detail: [String: Any] = [
            "latitude": coordinate.latitude,
            "longitude": coordinate.longitude,
            "x": point.x,
            "y": point.y,
            "screenX": screenPoint.x,
            "screenY": screenPoint.y
        ]
        cancelPendingMapTap()
        let generation = mapTapGeneration
        let workItem = DispatchWorkItem { [weak self] in
            guard let self, self.mapTapGeneration == generation else { return }
            self.pendingMapTapWorkItem = nil
            self.mapClickCallback?(["type": "tap", "detail": detail])
        }
        pendingMapTapWorkItem = workItem
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.05, execute: workItem)
    }

    func mapView(_ mapView: MAMapView!, didTouchPois pois: [Any]!) {
        guard let pois, let poi = pois.first as? MATouchPoi else { return }
        cancelPendingMapTap()

        let coordinate = poi.coordinate
        let point = mapView.convert(coordinate, toPointTo: mapView)
        let screenPoint: CGPoint
        if let window = mapView.window {
            screenPoint = mapView.convert(point, to: window)
        } else {
            screenPoint = point
        }
        let detail: [String: Any] = [
            "latitude": coordinate.latitude,
            "longitude": coordinate.longitude,
            "name": poi.name ?? "",
            "x": point.x,
            "y": point.y,
            "screenX": screenPoint.x,
            "screenY": screenPoint.y
        ]
        poiTapCallback?(["type": "poitap", "detail": detail])
    }

    private func cancelPendingMapTap() {
        pendingMapTapWorkItem?.cancel()
        pendingMapTapWorkItem = nil
        mapTapGeneration &+= 1
    }

    func mapView(_ mapView: MAMapView!, didAnnotationViewTapped view: MAAnnotationView!) {
        if let userLocation = view.annotation as? MAUserLocation {
            let coordinate = userLocation.coordinate
            let point = mapView.convert(coordinate, toPointTo: mapView)
            let screenPoint: CGPoint
            if let window = mapView.window {
                screenPoint = mapView.convert(point, to: window)
            } else {
                screenPoint = point
            }
            let detail: [String: Any] = [
                "latitude": coordinate.latitude,
                "longitude": coordinate.longitude,
                "x": point.x,
                "y": point.y,
                "screenX": screenPoint.x,
                "screenY": screenPoint.y
            ]
            anchorPointTapCallback?(["type": "anchorpointtap", "detail": detail])
            return
        }

        // AmapMarkerAnnotationView owns marker/callout gestures so callout taps
        // cannot also enter the SDK's annotation tap callback.
        guard !(view is AmapMarkerAnnotationView),
              let annotation = view.annotation as? AmapPointAnnotation else { return }
        emitMarkerTap(annotation)
    }

    func mapView(_ mapView: MAMapView!, viewFor annotation: MAAnnotation!) -> MAAnnotationView! {
        guard let markerAnnotation = annotation as? AmapPointAnnotation else {
            return nil
        }
        
        let annotationView = mapView.dequeueReusableAnnotationView(
            withIdentifier: AmapMarkerAnnotationView.reuseIdentifier
        ) as? AmapMarkerAnnotationView
        ?? AmapMarkerAnnotationView(
            annotation: markerAnnotation,
            reuseIdentifier: AmapMarkerAnnotationView.reuseIdentifier
        )
        annotationView.configure(annotation: markerAnnotation)
        annotationView.markerTapCallback = { [weak self, weak annotationView] tappedView in
            guard let self,
                  let annotationView,
                  tappedView === annotationView,
                  let annotation = tappedView.annotation as? AmapPointAnnotation else { return }
            self.hideByClickCallouts(except: tappedView)
            tappedView.toggleByClickCallout()
            tappedView.superview?.bringSubviewToFront(tappedView)
            self.emitMarkerTap(annotation)
        }
        annotationView.calloutTapCallback = { [weak self] markerId in
            self?.calloutTapCallback?([
                "type": "callouttap",
                "detail": ["markerId": markerId]
            ])
        }
        return annotationView
    }

    private func hideByClickCallouts(except retainedView: AmapMarkerAnnotationView? = nil) {
        markerAnnotations.values.forEach { annotation in
            guard let markerView = view(for: annotation) as? AmapMarkerAnnotationView,
                  markerView !== retainedView else { return }
            markerView.hideByClickCallout()
        }
    }

    private func emitMarkerTap(_ annotation: AmapPointAnnotation) {
        let point = convert(annotation.coordinate, toPointTo: self)
        let screenPoint: CGPoint
        if let window {
            screenPoint = convert(point, to: window)
        } else {
            screenPoint = point
        }
        let detail: [String: Any] = [
            "markerId": annotation.marker.id,
            "x": point.x,
            "y": point.y,
            "screenX": screenPoint.x,
            "screenY": screenPoint.y
        ]
        markerTapCallback?(["type": "markertap", "detail": detail])
    }

    func mapView(_ mapView: MAMapView!, rendererFor overlay: MAOverlay!) -> MAOverlayRenderer! {
        if let groundOverlay = overlay as? MAGroundOverlay {
            let renderer = MAGroundOverlayRenderer(groundOverlay: groundOverlay)
            if let model = groundOverlays.values.first(where: { $0.0 === groundOverlay })?.1 {
                // 高德 renderer 无 zIndex 属性，层级由 overlay 添加顺序决定
                renderer?.alpha = model.visible
                    ? CGFloat(min(max(model.opacity, 0), 1))
                    : 0
            }
            return renderer
        }

        if let circle = overlay as? MACircle,
           let model = circleModels[ObjectIdentifier(circle)] {
            let renderer = MACircleRenderer(circle: circle)
            if let strokeColor = model.strokeColor {
                renderer?.strokeColor = strokeColor
            }
            if let fillColor = model.fillColor {
                renderer?.fillColor = fillColor
            }
            renderer?.lineWidth = CGFloat(max(0, model.strokeWidth ?? 0))
            return renderer
        }

        if let polygon = overlay as? MAPolygon,
           let model = polygonModels[ObjectIdentifier(polygon)] {
            let renderer = MAPolygonRenderer(polygon: polygon)
            if let strokeColor = model.strokeColor {
                renderer?.strokeColor = strokeColor
            }
            if let fillColor = model.fillColor {
                renderer?.fillColor = fillColor
            }
            renderer?.lineWidth = CGFloat(max(0, model.strokeWidth ?? 0))
            return renderer
        }

        guard let polyline = overlay as? MAPolyline,
              let style = polylineStyles[ObjectIdentifier(polyline)] else { return nil }
        let model = style.model

        if style.role == .border {
            let renderer = MAPolylineRenderer(polyline: polyline)
            renderer?.strokeColor = model.borderColor
            renderer?.lineWidth = CGFloat(max(0, model.width ?? 5.0) + 2 * max(0, model.borderWidth ?? 0))
            renderer?.lineDashType = model.dottedLine
                ? kMALineDashTypeSquare
                : kMALineDashTypeNone
            renderer?.lineJoinType = kMALineJoinRound
            renderer?.lineCapType = kMALineCapButt
            return renderer
        }

        if style.role == .arrow {
            let renderer = MAPolylineRenderer(polyline: polyline)
            renderer?.strokeColor = .clear
            renderer?.lineWidth = CGFloat(max(0, model.width ?? 5.0))
            renderer?.lineJoinType = kMALineJoinRound
            renderer?.lineCapType = kMALineCapButt
            if let arrowIconPath = model.arrowIconPath, !arrowIconPath.isEmpty {
                UTSiOS.loadImage(arrowIconPath) { [weak renderer] image, _ in
                    DispatchQueue.main.async {
                        renderer?.strokeColor = .white
                        renderer?.strokeImage = image?.amapLineTextureImage()
                            ?? UIImage.amapDefaultArrowImage()
                    }
                }
            }
            return renderer
        }

        if let multiPolyline = polyline as? MAMultiPolyline,
           let colors = model.colorList,
           !colors.isEmpty {
            let renderer = MAMultiColoredPolylineRenderer(multiPolyline: multiPolyline)
            renderer?.strokeColors = colors
            renderer?.isGradient = true
            configure(renderer: renderer, model: model)
            return renderer
        }

        let renderer = MAPolylineRenderer(polyline: polyline)
        configure(renderer: renderer, model: model)
        return renderer
    }

    private func configure(renderer: MAPolylineRenderer?, model: AmapPolylineModel) {
        renderer?.strokeColor = model.color
            ?? UIColor(red: 45.0 / 255.0, green: 215.0 / 255.0, blue: 1.0, alpha: 1.0)
        renderer?.lineWidth = CGFloat(max(0, model.width ?? 5.0))
        renderer?.lineDashType = model.dottedLine
            ? kMALineDashTypeSquare
            : kMALineDashTypeNone
        renderer?.lineJoinType = kMALineJoinRound
        renderer?.lineCapType = kMALineCapButt
        renderer?.is3DArrowLine = model.arrowLine && model.arrowIconPath?.isEmpty != false
    }

    private static func colorIndexes(pointCount: Int, colorCount: Int) -> [NSNumber] {
        guard pointCount > 1, colorCount > 1 else { return [0] }
        return (0..<colorCount).map { index in
            NSNumber(value: index * (pointCount - 1) / (colorCount - 1))
        }
    }

}

private extension UIImage {
    // AMap maps the texture's vertical axis to the polyline direction.
    func amapLineTextureImage() -> UIImage {
        guard size.width > 0, size.height > 0 else { return self }

        let targetSize = CGSize(width: size.height, height: size.width)
        let format = UIGraphicsImageRendererFormat()
        format.scale = scale
        format.opaque = false
        let renderer = UIGraphicsImageRenderer(size: targetSize, format: format)
        return renderer.image { context in
            let cgContext = context.cgContext
            cgContext.translateBy(x: targetSize.width / 2, y: targetSize.height / 2)
            cgContext.rotate(by: -.pi / 2)
            draw(in: CGRect(
                x: -size.width / 2,
                y: -size.height / 2,
                width: size.width,
                height: size.height
            ))
        }
    }

    static func amapDefaultArrowImage() -> UIImage? {
        guard let bundlePath = Bundle.main.path(forResource: "AMap", ofType: "bundle") else {
            return nil
        }
        return UIImage(contentsOfFile: bundlePath + "/images/traffic_texture_blue.png")
    }
}
