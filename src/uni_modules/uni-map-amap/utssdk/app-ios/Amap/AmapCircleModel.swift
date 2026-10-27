import Foundation
import UIKit

public final class AmapCircleModel: NSObject {
    public let latitude: Double
    public let longitude: Double
    public let radius: Double
    public var strokeColor: UIColor?
    public var fillColor: UIColor?
    public var strokeWidth: Double?

    public init(latitude: Double, longitude: Double, radius: Double) {
        self.latitude = latitude
        self.longitude = longitude
        self.radius = radius
    }
}
