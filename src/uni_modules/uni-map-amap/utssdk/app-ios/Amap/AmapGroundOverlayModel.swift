import Foundation

public final class AmapGroundOverlayPointModel: NSObject {
    public let latitude: Double
    public let longitude: Double

    public init(latitude: Double, longitude: Double) {
        self.latitude = latitude
        self.longitude = longitude
    }
}

public final class AmapGroundOverlayModel: NSObject {
    public let id: String
    public let src: String
    public let southwest: AmapGroundOverlayPointModel
    public let northeast: AmapGroundOverlayPointModel
    public var visible: Bool
    public var zIndex: Double
    public var opacity: Double

    public init(
        id: String,
        src: String,
        southwest: AmapGroundOverlayPointModel,
        northeast: AmapGroundOverlayPointModel,
        visible: Bool = true,
        zIndex: Double = 0,
        opacity: Double = 1
    ) {
        self.id = id
        self.src = src
        self.southwest = southwest
        self.northeast = northeast
        self.visible = visible
        self.zIndex = zIndex
        self.opacity = min(max(opacity, 0), 1)
    }
}
