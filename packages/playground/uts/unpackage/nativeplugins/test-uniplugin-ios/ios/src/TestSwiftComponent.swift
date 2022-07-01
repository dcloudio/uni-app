import UIKit;
import MapKit;
@objc(TestSwiftComponent)
class TestSwiftComponent : DCUniComponent, MKMapViewDelegate {
    var mapLoadedEvent = false;
    var showTraffic = false;
    var mapView: MKMapView? = nil;
    override func onCreateComponent(_ ref: String, _ type: String, _ styles: [AnyHashable: Any], _ attributes: [AnyHashable: Any], _ events: [Any], _ uniInstance: DCUniSDKInstance) {
        self.showTraffic = DCUniConvert.bool(attributes[AnyHashable("showTraffic")] ?? false);
    }
    override func loadView() -> UIView {
        self.mapView = MKMapView.init();
        return self.mapView!;
    }
    override func viewDidLoad() {
        self.mapView!.delegate = self;
        if (self.showTraffic) {
            self.mapView.showsTraffic = true;
        }
    }
    override func updateAttributes(_ attributes: [AnyHashable: Any] = Dictionary<AnyHashable, Any>()) {
        if (attributes["showsTraffic"] != nil) {
            self.showTraffic = DCUniConvert.bool(attributes[AnyHashable("showsTraffic")]!);
            self.mapView.showsTraffic = self.showTraffic;
        }
    }
    override func addEvent(_ eventName: String) {
        if (eventName == "mapLoaded") {
            self.mapLoadedEvent = true;
        }
    }
    override func removeEvent(_ eventName: String) {
        if (eventName == "mapLoaded") {
            self.mapLoadedEvent = false;
        }
    }
    @objc
    public static func wx_export_method_0() -> String {
        return "focus:";
    }
    @objc
    func focus(_ options: NSDictionary) {
        print(options);
    }
    func mapViewDidFinishLoadingMap(_ mapView: MKMapView) {
        if (self.mapLoadedEvent) {
            self.fireEvent("mapLoaded", {
                mapLoaded: "success"
            });
        }
    }
}
