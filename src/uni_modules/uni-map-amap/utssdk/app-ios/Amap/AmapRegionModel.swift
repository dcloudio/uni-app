import Foundation

public final class AmapRegionModel: NSObject {
    public let southwestLatitude: Double
    public let southwestLongitude: Double
    public let northeastLatitude: Double
    public let northeastLongitude: Double

    public init(
        southwestLatitude: Double,
        southwestLongitude: Double,
        northeastLatitude: Double,
        northeastLongitude: Double
    ) {
        self.southwestLatitude = southwestLatitude
        self.southwestLongitude = southwestLongitude
        self.northeastLatitude = northeastLatitude
        self.northeastLongitude = northeastLongitude
    }
}
