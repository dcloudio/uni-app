import Foundation
import UIKit

public final class AmapPolygonPointModel: NSObject {
    public let latitude: Double
    public let longitude: Double

    public init(latitude: Double, longitude: Double) {
        self.latitude = latitude
        self.longitude = longitude
    }
}

public final class AmapPolygonModel: NSObject {
    public let points: [AmapPolygonPointModel]
    public var strokeWidth: Double?
    public var strokeColor: UIColor?
    public var fillColor: UIColor?
    public var zIndex: Double = 0

    public init(points: [AmapPolygonPointModel]) {
        self.points = points
    }
}
