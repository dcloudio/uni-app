import Foundation
import UIKit

public final class AmapPolylinePointModel: NSObject {
    public let latitude: Double
    public let longitude: Double

    public init(latitude: Double, longitude: Double) {
        self.latitude = latitude
        self.longitude = longitude
    }
}

public final class AmapPolylineModel: NSObject {
    public let points: [AmapPolylinePointModel]
    public var color: UIColor?
    public var width: Double?
    public var dottedLine = false
    public var arrowLine = false
    public var arrowIconPath: String?
    public var borderColor: UIColor?
    public var borderWidth: Double?
    public var colorList: [UIColor]?

    public init(points: [AmapPolylinePointModel]) {
        self.points = points
    }
}
