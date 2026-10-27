import UIKit

public final class AmapMarkerLabelModel: NSObject {
    public var content: String = ""
    public var color: UIColor = .black
    public var fontSize: Double = 14
    public var x: Double = 0
    public var y: Double = 0
    public var borderWidth: Double = 0
    public var borderColor: UIColor = .clear
    public var bgColor: UIColor = .white
    public var borderRadius: Double = 0
    public var padding: Double = 5
    public var textAlign: String = "left"

    public override init() {
        super.init()
    }
}
