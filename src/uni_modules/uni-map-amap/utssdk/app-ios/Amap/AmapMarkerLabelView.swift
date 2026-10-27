import UIKit

final class AmapMarkerLabelView: UIView {
    private static let maximumWidth: CGFloat = 300
    private static let horizontalScreenInset: CGFloat = 24

    private let textLabel = UILabel()
    private var labelModel = AmapMarkerLabelModel()

    override init(frame: CGRect) {
        super.init(frame: frame)
        configureView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        configureView()
    }

    func apply(_ model: AmapMarkerLabelModel) {
        labelModel = model

        let fontSize = CGFloat(max(1, model.fontSize))
        let padding = CGFloat(max(0, model.padding))
        let borderWidth = CGFloat(max(0, model.borderWidth))
        let availableScreenWidth = max(1, UIScreen.main.bounds.width - 2 * AmapMarkerLabelView.horizontalScreenInset)
        let maximumBodyWidth = min(AmapMarkerLabelView.maximumWidth, availableScreenWidth)
        let maximumLabelWidth = max(1, maximumBodyWidth - 2 * (padding + borderWidth))

        textLabel.text = model.content
        textLabel.font = .systemFont(ofSize: fontSize)
        textLabel.textColor = model.color
        textLabel.textAlignment = AmapMarkerLabelView.textAlignment(model.textAlign)
        textLabel.lineBreakMode = .byCharWrapping

        let measuredSize = textLabel.sizeThatFits(CGSize(
            width: maximumLabelWidth,
            height: CGFloat.greatestFiniteMagnitude
        ))
        let labelSize = CGSize(
            width: max(1, min(maximumLabelWidth, ceil(measuredSize.width))),
            height: max(fontSize + 2, ceil(measuredSize.height))
        )
        let bodySize = CGSize(
            width: labelSize.width + 2 * (padding + borderWidth),
            height: labelSize.height + 2 * (padding + borderWidth)
        )

        frame.size = CGSize(width: ceil(bodySize.width), height: ceil(bodySize.height))
        textLabel.frame = CGRect(
            x: borderWidth + padding,
            y: borderWidth + padding,
            width: labelSize.width,
            height: labelSize.height
        )
        layer.shadowColor = UIColor.black.cgColor
        layer.shadowOpacity = 0.18
        layer.shadowRadius = 4
        layer.shadowOffset = CGSize(width: 0, height: 2)
        layer.masksToBounds = false
        setNeedsDisplay()
    }

    override func draw(_ rect: CGRect) {
        let borderWidth = CGFloat(max(0, labelModel.borderWidth))
        let inset = max(0.5, borderWidth / 2)
        let bodyRect = CGRect(
            x: inset,
            y: inset,
            width: max(1, bounds.width - 2 * inset),
            height: max(1, bounds.height - 2 * inset)
        )
        guard bodyRect.width > 0, bodyRect.height > 0 else { return }

        let radius = min(
            CGFloat(max(0, labelModel.borderRadius)),
            min(bodyRect.width, bodyRect.height) / 2
        )
        let path = UIBezierPath(roundedRect: bodyRect, cornerRadius: radius)
        layer.shadowPath = path.cgPath

        labelModel.bgColor.setFill()
        path.fill()
        if borderWidth > 0 {
            labelModel.borderColor.setStroke()
            path.lineWidth = borderWidth
            path.stroke()
        }
    }

    private func configureView() {
        backgroundColor = .clear
        isOpaque = false
        isUserInteractionEnabled = false
        textLabel.backgroundColor = .clear
        textLabel.numberOfLines = 0
        addSubview(textLabel)
    }

    private static func textAlignment(_ value: String) -> NSTextAlignment {
        switch value.lowercased() {
        case "center":
            return .center
        case "right":
            return .right
        default:
            return .left
        }
    }
}
