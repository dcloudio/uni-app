import CoreLocation
import MAMapKit

final class AmapPointAnnotation: MAAnimatedAnnotation {
    let marker: AmapMarkerModel

    init(marker: AmapMarkerModel) {
        self.marker = marker
        super.init()
        coordinate = CLLocationCoordinate2D(latitude: marker.latitude, longitude: marker.longitude)
        title = marker.title
    }

    func cancelAllMoveAnimations() {
        guard let animations = allMoveAnimations() else {
            return
        }
        animations.forEach { animation in
            animation.cancel()
        }
    }
}
