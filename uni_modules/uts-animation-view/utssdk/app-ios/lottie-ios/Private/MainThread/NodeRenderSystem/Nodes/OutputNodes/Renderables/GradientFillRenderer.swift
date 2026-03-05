//
//  GradientFillRenderer.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/30/19.
//

import QuartzCore

// MARK: - GradientFillLayer

private final class GradientFillLayer: CALayer {

  var start: CGPoint = .zero {
    didSet {
      setNeedsDisplay()
    }
  }

  var numberOfColors = 0 {
    didSet {
      setNeedsDisplay()
    }
  }

  var colors: [CGFloat] = [] {
    didSet {
      setNeedsDisplay()
    }
  }

  var end: CGPoint = .zero {
    didSet {
      setNeedsDisplay()
    }
  }

  var type: GradientType = .none {
    didSet {
      setNeedsDisplay()
    }
  }

  override func draw(in ctx: CGContext) {
    var alphaColors = [CGColor]()
    var alphaLocations = [CGFloat]()

    var gradientColors = [CGColor]()
    var colorLocations = [CGFloat]()
    let maskColorSpace = CGColorSpaceCreateDeviceGray()
    for i in 0..<numberOfColors {
      let ix = i * 4
      if colors.count > ix {
        let color = CGColor.rgb(colors[ix + 1], colors[ix + 2], colors[ix + 3])
        gradientColors.append(color)
        colorLocations.append(colors[ix])
      }
    }

    var drawMask = false
    for i in stride(from: numberOfColors * 4, to: colors.endIndex, by: 2) {
      let alpha = colors[i + 1]
      if alpha < 1 {
        drawMask = true
      }
      alphaLocations.append(colors[i])
      alphaColors.append(.gray(alpha))
    }

    /// First draw a mask is necessary.
    if drawMask {
      guard
        let maskGradient = CGGradient(
          colorsSpace: maskColorSpace,
          colors: alphaColors as CFArray,
          locations: alphaLocations),
        let maskContext = CGContext(
          data: nil,
          width: ctx.width,
          height: ctx.height,
          bitsPerComponent: 8,
          bytesPerRow: ctx.width,
          space: maskColorSpace,
          bitmapInfo: 0)
      else { return }
      let flipVertical = CGAffineTransform(a: 1, b: 0, c: 0, d: -1, tx: 0, ty: CGFloat(maskContext.height))
      maskContext.concatenate(flipVertical)
      maskContext.concatenate(ctx.ctm)
      if type == .linear {
        maskContext.drawLinearGradient(
          maskGradient,
          start: start,
          end: end,
          options: [.drawsAfterEndLocation, .drawsBeforeStartLocation])
      } else {
        maskContext.drawRadialGradient(
          maskGradient,
          startCenter: start,
          startRadius: 0,
          endCenter: start,
          endRadius: start.distanceTo(end),
          options: [.drawsAfterEndLocation, .drawsBeforeStartLocation])
      }
      /// Clips the gradient
      if let alphaMask = maskContext.makeImage() {
        ctx.clip(to: ctx.boundingBoxOfClipPath, mask: alphaMask)
      }
    }

    /// Now draw the gradient
    guard
      let gradient = CGGradient(
        colorsSpace: LottieConfiguration.shared.colorSpace,
        colors: gradientColors as CFArray,
        locations: colorLocations)
    else { return }

    if type == .linear {
      ctx.drawLinearGradient(gradient, start: start, end: end, options: [.drawsAfterEndLocation, .drawsBeforeStartLocation])
    } else {
      ctx.drawRadialGradient(
        gradient,
        startCenter: start,
        startRadius: 0,
        endCenter: start,
        endRadius: start.distanceTo(end),
        options: [.drawsAfterEndLocation, .drawsBeforeStartLocation])
    }
  }

}

// MARK: - GradientFillRenderer

/// A rendered for a Path Fill
final class GradientFillRenderer: PassThroughOutputNode, Renderable {

  // MARK: Lifecycle

  override init(parent: NodeOutput?) {
    super.init(parent: parent)

    maskLayer.fillColor = .rgb(1, 1, 1)
    gradientLayer.mask = maskLayer

    maskLayer.actions = [
      "startPoint" : NSNull(),
      "endPoint" : NSNull(),
      "opacity" : NSNull(),
      "locations" : NSNull(),
      "colors" : NSNull(),
      "bounds" : NSNull(),
      "anchorPoint" : NSNull(),
      "isRadial" : NSNull(),
      "path" : NSNull(),
    ]
    gradientLayer.actions = maskLayer.actions
  }

  // MARK: Internal

  var shouldRenderInContext = false

  var start: CGPoint = .zero {
    didSet {
      hasUpdate = true
    }
  }

  var numberOfColors = 0 {
    didSet {
      hasUpdate = true
    }
  }

  var colors: [CGFloat] = [] {
    didSet {
      hasUpdate = true
    }
  }

  var end: CGPoint = .zero {
    didSet {
      hasUpdate = true
    }
  }

  var opacity: CGFloat = 0 {
    didSet {
      hasUpdate = true
    }
  }

  var type: GradientType = .none {
    didSet {
      hasUpdate = true
    }
  }

  var fillRule: CAShapeLayerFillRule {
    get { maskLayer.fillRule }
    set { maskLayer.fillRule = newValue }
  }

  func render(_: CGContext) {
    // do nothing
  }

  func setupSublayers(layer: CAShapeLayer) {
    layer.addSublayer(gradientLayer)
    layer.fillColor = nil
  }

  func updateShapeLayer(layer: CAShapeLayer) {
    hasUpdate = false

    guard let path = layer.path else {
      return
    }

    let frame = path.boundingBox
    let anchor = CGPoint(
      x: -frame.origin.x / frame.size.width,
      y: -frame.origin.y / frame.size.height)
    maskLayer.path = path
    maskLayer.bounds = path.boundingBox
    maskLayer.anchorPoint = anchor

    gradientLayer.bounds = maskLayer.bounds
    gradientLayer.anchorPoint = anchor

    // setup gradient properties
    gradientLayer.start = start
    gradientLayer.end = end
    gradientLayer.numberOfColors = numberOfColors
    gradientLayer.colors = colors
    gradientLayer.opacity = Float(opacity)
    gradientLayer.type = type
  }

  // MARK: Private

  private let gradientLayer = GradientFillLayer()
  private let maskLayer = CAShapeLayer()

}
