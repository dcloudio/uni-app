//
//  MaskContainerLayer.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/25/19.
//

import QuartzCore

extension MaskMode {
  var usableMode: MaskMode {
    switch self {
    case .add:
      return .add
    case .subtract:
      return .subtract
    case .intersect:
      return .intersect
    case .lighten:
      return .add
    case .darken:
      return .darken
    case .difference:
      return .intersect
    case .none:
      return .none
    }
  }
}

// MARK: - MaskContainerLayer

final class MaskContainerLayer: CALayer {

  // MARK: Lifecycle

  init(masks: [Mask]) {
    super.init()
    anchorPoint = .zero
    var containerLayer = CALayer()
    var firstObject = true
    for mask in masks {
      let maskLayer = MaskLayer(mask: mask)
      maskLayers.append(maskLayer)
      if mask.mode.usableMode == .none {
        continue
      } else if mask.mode.usableMode == .add || firstObject {
        firstObject = false
        containerLayer.addSublayer(maskLayer)
      } else {
        containerLayer.mask = maskLayer
        let newContainer = CALayer()
        newContainer.addSublayer(containerLayer)
        containerLayer = newContainer
      }
    }
    addSublayer(containerLayer)
  }

  override init(layer: Any) {
    /// Used for creating shadow model layers. Read More here: https://developer.apple.com/documentation/quartzcore/calayer/1410842-init
    guard let layer = layer as? MaskContainerLayer else {
      fatalError("init(layer:) Wrong Layer Class")
    }
    super.init(layer: layer)
  }

  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  // MARK: Internal

  func updateWithFrame(frame: CGFloat, forceUpdates: Bool) {
    for maskLayer in maskLayers {
      maskLayer.updateWithFrame(frame: frame, forceUpdates: forceUpdates)
    }
  }

  // MARK: Fileprivate

  fileprivate var maskLayers: [MaskLayer] = []
}

extension CGRect {
  static var veryLargeRect: CGRect {
    CGRect(
      x: -10_000_000,
      y: -10_000_000,
      width: 20_000_000,
      height: 20_000_000)
  }
}

// MARK: - MaskLayer

private class MaskLayer: CALayer {

  // MARK: Lifecycle

  init(mask: Mask) {
    properties = MaskNodeProperties(mask: mask)
    super.init()
    addSublayer(maskLayer)
    anchorPoint = .zero
    maskLayer.fillColor = mask.mode == .add
      ? .rgb(1, 0, 0)
      : .rgb(0, 1, 0)
    maskLayer.fillRule = CAShapeLayerFillRule.evenOdd
    actions = [
      "opacity" : NSNull(),
    ]
  }

  override init(layer: Any) {
    properties = nil
    super.init(layer: layer)
  }

  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  // MARK: Internal

  let properties: MaskNodeProperties?

  let maskLayer = CAShapeLayer()

  func updateWithFrame(frame: CGFloat, forceUpdates: Bool) {
    guard let properties else { return }
    if properties.opacity.needsUpdate(frame: frame) || forceUpdates {
      properties.opacity.update(frame: frame)
      opacity = Float(properties.opacity.value.cgFloatValue)
    }

    if properties.shape.needsUpdate(frame: frame) || forceUpdates {
      properties.shape.update(frame: frame)
      properties.expansion.update(frame: frame)

      let shapePath = properties.shape.value.cgPath()
      var path = shapePath
      if
        properties.mode.usableMode == .subtract && !properties.inverted ||
        (properties.mode.usableMode == .add && properties.inverted)
      {
        /// Add a bounds rect to invert the mask
        let newPath = CGMutablePath()
        newPath.addRect(CGRect.veryLargeRect)
        newPath.addPath(shapePath)
        path = newPath
      }
      maskLayer.path = path
    }
  }
}

// MARK: - MaskNodeProperties

private class MaskNodeProperties: NodePropertyMap {

  // MARK: Lifecycle

  init(mask: Mask) {
    mode = mask.mode
    inverted = mask.inverted
    opacity = NodeProperty(provider: KeyframeInterpolator(keyframes: mask.opacity.keyframes))
    shape = NodeProperty(provider: KeyframeInterpolator(keyframes: mask.shape.keyframes))
    expansion = NodeProperty(provider: KeyframeInterpolator(keyframes: mask.expansion.keyframes))
    propertyMap = [
      PropertyName.opacity.rawValue : opacity,
      "Shape" : shape,
      "Expansion" : expansion,
    ]
    properties = Array(propertyMap.values)
  }

  // MARK: Internal

  var propertyMap: [String: AnyNodeProperty]

  var properties: [AnyNodeProperty]

  let mode: MaskMode
  let inverted: Bool

  let opacity: NodeProperty<LottieVector1D>
  let shape: NodeProperty<BezierPath>
  let expansion: NodeProperty<LottieVector1D>
}
