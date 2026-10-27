import DCloudUniappRuntime
import MAMapKit
import UIKit

final class AmapMarkerAnnotationView: MAAnnotationView {
    static let reuseIdentifier = "uni-map-amap-marker"
    static let translateRotationAnimationKey = "translateMarkerRotation"
    static let movementRotationAnimationKey = "moveAlongMarkerRotation"
    // moveAlong 逐帧转向的指数平滑系数：每帧向目标收敛 25%，
    // 60fps 下约 100ms 完成主要收敛（6 帧后剩余不足 18%）
    static let movementRotationSmoothingFactor: Double = 0.25
    // 逐帧插值的收敛阈值：与目标差值小于该值时直接落地，保证最终精确收敛
    static let movementRotationSnapThresholdDegree: Double = 0.05

    var markerTapCallback: ((AmapMarkerAnnotationView) -> Void)?
    var calloutTapCallback: ((Int) -> Void)?

    // 图标由自定义视图承载：SDK 移动动画会旋转内置 imageView（movingDirection），
    // 内置 imageView 不再放置内容，被旋转时无视觉影响
    private let iconView = UIImageView()
    private var labelView: AmapMarkerLabelView?
    private var calloutView: AmapMarkerCalloutView?
    private var markerTapGesture: UITapGestureRecognizer?
    private var calloutTapGesture: UITapGestureRecognizer?
    private var imageLoadGeneration = 0
    private var currentRotationDegree: Double = 0

    private var marker: AmapMarkerModel? {
        (annotation as? AmapPointAnnotation)?.marker
    }

    override init(annotation: MAAnnotation?, reuseIdentifier: String?) {
        super.init(annotation: annotation, reuseIdentifier: reuseIdentifier)
        iconView.isUserInteractionEnabled = false
        addSubview(iconView)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    func configure(annotation markerAnnotation: AmapPointAnnotation) {
        resetContent()
        annotation = markerAnnotation
        canShowCallout = false
        accessibilityLabel = markerAnnotation.marker.ariaLabel
        isAccessibilityElement = markerAnnotation.marker.ariaLabel?.isEmpty == false
        alpha = 1
        iconView.alpha = CGFloat(max(0, min(markerAnnotation.marker.alpha, 1)))
        installMarkerTapGesture()
        configureLabel(markerAnnotation.marker)
        configureCallout(markerAnnotation.marker)

        let generation = imageLoadGeneration
        applyMarkerImage(nil, marker: markerAnnotation.marker)
        loadMarkerImage(markerAnnotation.marker) { [weak self] image in
            guard let self,
                  self.imageLoadGeneration == generation,
                  self.annotation === markerAnnotation else {
                return
            }
            self.applyMarkerImage(image, marker: markerAnnotation.marker)
        }
    }

    override func prepareForReuse() {
        super.prepareForReuse()
        resetContent()
        annotation = nil
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        positionLabel()
        positionCallout()
    }

    override func point(inside point: CGPoint, with event: UIEvent?) -> Bool {
        if super.point(inside: point, with: event) {
            return true
        }
        guard let calloutView, !calloutView.isHidden else { return false }
        return calloutView.point(inside: calloutView.convert(point, from: self), with: event)
    }

    func toggleByClickCallout() {
        guard let calloutView, !isAlwaysCallout else { return }
        calloutView.isHidden.toggle()
    }

    func hideByClickCallout() {
        guard !isAlwaysCallout else { return }
        calloutView?.isHidden = true
    }

    func prepareForMapRemoval() {
        resetContent()
    }

    private func loadMarkerImage(_ marker: AmapMarkerModel, completion: @escaping (UIImage?) -> Void) {
        guard !marker.iconPath.isEmpty else {
            completion(defaultMarkerImage())
            return
        }

        UTSiOS.loadImage(marker.iconPath) { [weak self] image, _ in
            DispatchQueue.main.async {
                completion(image ?? self?.defaultMarkerImage())
            }
        }
    }

    private func defaultMarkerImage() -> UIImage? {
        guard let bundlePath = Bundle.main.path(forResource: "uni-map-amap", ofType: "bundle"),
              let imagePath = Bundle(path: bundlePath)?.path(forResource: "uni_app_map_marker_ic", ofType: "png") else {
            return nil
        }
        return UIImage(contentsOfFile: imagePath)
    }

    private func applyMarkerImage(_ image: UIImage?, marker: AmapMarkerModel) {
        let resolvedImage = resizedImage(image, width: marker.width, height: marker.height)
        iconView.image = resolvedImage
        let size = resolvedImage?.size ?? .zero
        if size.width > 0, size.height > 0 {
            // 内置 imageView 不承载内容，手动以图标尺寸布局 annotationView.bounds
            bounds = CGRect(origin: .zero, size: size)
        }
        iconView.transform = .identity
        iconView.frame = bounds
        centerOffset = CGPoint(
            x: (0.5 - marker.anchorX) * size.width,
            y: (0.5 - marker.anchorY) * size.height
        )
        transform = .identity
        iconView.transform = CGAffineTransform(rotationAngle: CGFloat(marker.rotate * .pi / 180))
        currentRotationDegree = marker.rotate
        positionCallout()
    }

    private var isAlwaysCallout: Bool {
        marker?.callout?.display.uppercased() == "ALWAYS"
    }

    func setIconRotation(toDegree: Double, duration: Double) {
        let fromRadian = CGFloat(currentRotationDegree * .pi / 180.0)
        let toRadian = CGFloat(toDegree * .pi / 180.0)

        // 清理未完成的上一次旋转动画，避免叠加
        iconView.layer.removeAnimation(forKey: Self.translateRotationAnimationKey)

        // 动画发起前直接落地终态，动画结束或被打断时视图停留在终态，无闪回/残留
        iconView.transform = CGAffineTransform(rotationAngle: toRadian)
        currentRotationDegree = toDegree

        guard duration > 0 else { return }

        let rotationAnimation = CABasicAnimation(keyPath: "transform.rotation.z")
        rotationAnimation.fromValue = fromRadian
        rotationAnimation.toValue = toRadian
        rotationAnimation.duration = duration
        iconView.layer.add(
            rotationAnimation,
            forKey: Self.translateRotationAnimationKey
        )
    }

    // movingDirection is relative to north. The caller supplies the map-rotation
    // compensated direction, so the marker's rotate remains the base offset.
    //
    // 逐帧场景（moveAlong stepCallback 每帧驱动，immediate = false）：
    // 基于当前角度与目标角度做最短角路径插值（差值归一化到 (-180, 180]，
    // 处理 ±360/±180 环绕），每帧按平滑系数向目标收敛，拐点处 movingDirection
    // 突变时旋转渐进过渡而非瞬跳；不使用 CABasicAnimation 逐帧叠加（会互相打断）。
    // 非逐帧场景（duration<=0 直接落地、动画完成同步，immediate = true）：
    // 无动画直接落地终态。
    func setMovementRotation(
        directionDegree: Double,
        baseRotationDegree: Double,
        immediate: Bool = false
    ) {
        iconView.layer.removeAnimation(forKey: Self.movementRotationAnimationKey)
        let targetDegree = baseRotationDegree + directionDegree

        guard !immediate else {
            applyMovementRotation(targetDegree)
            return
        }

        // 最短角路径差值，归一化到 (-180, 180]
        let delta = Self.shortestAngleDelta(from: currentRotationDegree, to: targetDegree)
        let nextDegree = abs(delta) < Self.movementRotationSnapThresholdDegree
            ? targetDegree
            : currentRotationDegree + delta * Self.movementRotationSmoothingFactor
        applyMovementRotation(nextDegree)
    }

    private func applyMovementRotation(_ degree: Double) {
        iconView.transform = CGAffineTransform(
            rotationAngle: CGFloat(degree * .pi / 180.0)
        )
        currentRotationDegree = degree
    }

    /// 计算从 from 旋转到 to 的最短角路径差值，结果归一化到 (-180, 180]
    private static func shortestAngleDelta(from: Double, to: Double) -> Double {
        var delta = (to - from).truncatingRemainder(dividingBy: 360.0)
        if delta <= -180.0 {
            delta += 360.0
        } else if delta > 180.0 {
            delta -= 360.0
        }
        return delta
    }

    func clearIconRotationAnimations() {
        iconView.layer.removeAnimation(forKey: Self.translateRotationAnimationKey)
        iconView.layer.removeAnimation(forKey: Self.movementRotationAnimationKey)
    }

    private func configureCallout(_ marker: AmapMarkerModel) {
        let model: AmapMarkerCalloutModel
        if let callout = marker.callout {
            model = callout
        } else if let title = marker.title, !title.isEmpty {
            model = AmapMarkerCalloutModel()
            model.content = title
        } else {
            return
        }
        guard !model.content.isEmpty else { return }

        let view = AmapMarkerCalloutView()
        view.apply(model)
        view.isHidden = model.display.uppercased() != "ALWAYS"
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(handleCalloutTap))
        tapGesture.cancelsTouchesInView = true
        view.addGestureRecognizer(tapGesture)
        addSubview(view)
        calloutView = view
        calloutTapGesture = tapGesture
        positionCallout()
    }

    private func configureLabel(_ marker: AmapMarkerModel) {
        guard let model = marker.label, !model.content.isEmpty else { return }

        let view = AmapMarkerLabelView()
        view.apply(model)
        addSubview(view)
        labelView = view
        positionLabel()
    }

    private func installMarkerTapGesture() {
        iconView.isUserInteractionEnabled = true
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(handleMarkerTap))
        tapGesture.cancelsTouchesInView = true
        iconView.addGestureRecognizer(tapGesture)
        markerTapGesture = tapGesture
    }

    private func positionCallout() {
        guard let calloutView else { return }
        calloutView.center = CGPoint(
            x: bounds.midX,
            y: iconView.frame.minY - calloutView.bounds.height / 2
        )
    }

    private func positionLabel() {
        guard let labelView, let model = marker?.label else { return }
        // 对齐微信/腾讯小程序 marker.label 语义：设置 frame.origin 而非 center，
        // x/y 为相对图标的偏移，默认 label 紧贴图标右侧显示、顶部与图标平齐，不遮挡图标
        labelView.frame.origin = CGPoint(
            x: bounds.maxX + CGFloat(model.x),
            y: bounds.minY + CGFloat(model.y)
        )
    }

    private func resetContent() {
        imageLoadGeneration += 1
        // 移除 translateMarker 遗留的旋转动画，避免复用后残留
        clearIconRotationAnimations()
        iconView.transform = .identity
        iconView.image = nil
        iconView.alpha = 1
        iconView.frame = .zero
        if let markerTapGesture {
            iconView.removeGestureRecognizer(markerTapGesture)
        }
        if let calloutTapGesture, let calloutView {
            calloutView.removeGestureRecognizer(calloutTapGesture)
        }
        labelView?.removeFromSuperview()
        labelView = nil
        calloutView?.removeFromSuperview()
        calloutView = nil
        markerTapGesture = nil
        calloutTapGesture = nil
        markerTapCallback = nil
        calloutTapCallback = nil
        // 内置 imageView 清理保留，防 SDK 内部状态残留
        imageView.layer.removeAnimation(forKey: Self.translateRotationAnimationKey)
        imageView.layer.removeAnimation(forKey: Self.movementRotationAnimationKey)
        imageView.transform = .identity
        imageView.alpha = 1
        imageView.isUserInteractionEnabled = false
        image = nil
        currentRotationDegree = 0
        bounds = .zero
        transform = .identity
        accessibilityLabel = nil
        isAccessibilityElement = false
        canShowCallout = false
    }

    @objc private func handleMarkerTap() {
        markerTapCallback?(self)
    }

    @objc private func handleCalloutTap() {
        guard let marker else { return }
        calloutTapCallback?(marker.id)
    }

    private func resizedImage(_ image: UIImage?, width: Double?, height: Double?) -> UIImage? {
        guard let image else {
            return nil
        }
        guard width != nil || height != nil else {
            return image
        }

        let targetWidth = CGFloat(width ?? Double(image.size.width))
        let targetHeight = CGFloat(height ?? Double(image.size.height))
        guard targetWidth > 0, targetHeight > 0 else {
            return image
        }

        let renderer = UIGraphicsImageRenderer(size: CGSize(width: targetWidth, height: targetHeight))
        return renderer.image { _ in
            image.draw(in: CGRect(x: 0, y: 0, width: targetWidth, height: targetHeight))
        }
    }
}
