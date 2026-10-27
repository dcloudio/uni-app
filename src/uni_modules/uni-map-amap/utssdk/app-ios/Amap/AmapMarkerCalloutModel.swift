import UIKit

public final class AmapMarkerCalloutModel: NSObject {
    public var content: String = ""
    public var color: UIColor = .black
    public var fontSize: Double = 14
    public var borderRadius: Double = 10
    public var borderWidth: Double = 0
    public var borderColor: UIColor = .clear
    public var bgColor: UIColor = .white
    public var padding: Double = 10
    public var display: String = "BYCLICK"
    public var textAlign: String = "left"

    public override init() {
        super.init()
    }
}
