import Foundation

public final class AmapMarkerModel: NSObject {
    public let id: Int
    public var latitude: Double
    public var longitude: Double
    public let iconPath: String

    public var title: String?
    public var rotate: Double = 0
    public var alpha: Double = 1
    public var width: Double?
    public var height: Double?
    public var ariaLabel: String?
    public var anchorX: Double = 0.5
    public var anchorY: Double = 1
    public var clusterId: Int?
    public var joinCluster: Bool = false
    public var label: AmapMarkerLabelModel?
    public var callout: AmapMarkerCalloutModel?

    public init(id: Int, latitude: Double, longitude: Double, iconPath: String) {
        self.id = id
        self.latitude = latitude
        self.longitude = longitude
        self.iconPath = iconPath
    }
}
