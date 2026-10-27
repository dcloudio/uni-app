import UIKit

final class AmapMarkerCalloutView: UIView {
    private static let arrowHeight: CGFloat = 8
    private static let arrowHalfWidth: CGFloat = 7
    private static let maximumWidth: CGFloat = 300
    private static let horizontalScreenInset: CGFloat = 24

    private let textLabel = UILabel()
    private var callout = AmapMarkerCalloutModel()

    override init(frame: CGRect) {
        super.init(frame: frame)
        configureView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        configureView()
    }

    func apply(_ model: AmapMarkerCalloutModel) {
        callout = model

        let fontSize = CGFloat(max(1, model.fontSize))
        let padding = CGFloat(max(0, model.padding))
        let borderWidth = CGFloat(max(0, model.borderWidth))
        let availableScreenWidth = max(1, UIScreen.main.bounds.width - 2 * AmapMarkerCalloutView.horizontalScreenInset)
        let maximumBodyWidth = min(AmapMarkerCalloutView.maximumWidth, availableScreenWidth)
        let maximumLabelWidth = max(1, maximumBodyWidth - 2 * (padding + borderWidth))

        textLabel.text = model.content
        textLabel.font = .systemFont(ofSize: fontSize)
        textLabel.textColor = model.color
        textLabel.textAlignment = AmapMarkerCalloutView.textAlignment(model.textAlign)
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

        frame.size = CGSize(
            width: ceil(bodySize.width),
            height: ceil(bodySize.height + AmapMarkerCalloutView.arrowHeight)
        )
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
        let borderWidth = CGFloat(max(0, callout.borderWidth))
        let inset = max(0.5, borderWidth / 2)
        let bodyRect = CGRect(
            x: inset,
            y: inset,
            width: max(1, bounds.width - 2 * inset),
            height: max(1, bounds.height - AmapMarkerCalloutView.arrowHeight - 2 * inset)
        )
        guard bodyRect.width > 0, bodyRect.height > 0 else { return }

        let radius = min(
            CGFloat(max(0, callout.borderRadius)),
            min(bodyRect.width, bodyRect.height) / 2
        )
        let middleX = bodyRect.midX
        let arrowHalfWidth = min(AmapMarkerCalloutView.arrowHalfWidth, max(0, bodyRect.width / 2 - radius))
        let path = UIBezierPath()
        path.move(to: CGPoint(x: bodyRect.minX + radius, y: bodyRect.minY))
        path.addLine(to: CGPoint(x: bodyRect.maxX - radius, y: bodyRect.minY))
        path.addArc(
            withCenter: CGPoint(x: bodyRect.maxX - radius, y: bodyRect.minY + radius),
            radius: radius,
            startAngle: -.pi / 2,
            endAngle: 0,
            clockwise: true
        )
        path.addLine(to: CGPoint(x: bodyRect.maxX, y: bodyRect.maxY - radius))
        path.addArc(
            withCenter: CGPoint(x: bodyRect.maxX - radius, y: bodyRect.maxY - radius),
            radius: radius,
            startAngle: 0,
            endAngle: .pi / 2,
            clockwise: true
        )
        path.addLine(to: CGPoint(x: middleX + arrowHalfWidth, y: bodyRect.maxY))
        path.addLine(to: CGPoint(x: middleX, y: bounds.height - inset))
        path.addLine(to: CGPoint(x: middleX - arrowHalfWidth, y: bodyRect.maxY))
        path.addLine(to: CGPoint(x: bodyRect.minX + radius, y: bodyRect.maxY))
        path.addArc(
            withCenter: CGPoint(x: bodyRect.minX + radius, y: bodyRect.maxY - radius),
            radius: radius,
            startAngle: .pi / 2,
            endAngle: .pi,
            clockwise: true
        )
        path.addLine(to: CGPoint(x: bodyRect.minX, y: bodyRect.minY + radius))
        path.addArc(
            withCenter: CGPoint(x: bodyRect.minX + radius, y: bodyRect.minY + radius),
            radius: radius,
            startAngle: .pi,
            endAngle: .pi * 1.5,
            clockwise: true
        )
        path.close()
        layer.shadowPath = path.cgPath

        callout.bgColor.setFill()
        path.fill()
        if borderWidth > 0 {
            callout.borderColor.setStroke()
            path.lineWidth = borderWidth
            path.stroke()
        }
    }

    private func configureView() {
        backgroundColor = .clear
        isOpaque = false
        isUserInteractionEnabled = true
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
