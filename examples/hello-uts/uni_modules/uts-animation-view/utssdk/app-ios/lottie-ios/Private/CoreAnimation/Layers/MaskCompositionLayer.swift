// Created by Cal Stephens on 1/6/22.
// Copyright © 2022 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - MaskCompositionLayer

/// The CALayer type responsible for rendering the `Mask` of a `BaseCompositionLayer`
final class MaskCompositionLayer: CALayer {

  // MARK: Lifecycle

  init(masks: [Mask]) {
    maskLayers = masks.map(MaskLayer.init(mask:))
    super.init()

    var containerLayer = BaseAnimationLayer()
    var firstObject = true
    for maskLayer in maskLayers {
      if maskLayer.maskModel.mode.usableMode == .none {
        continue
      } else if maskLayer.maskModel.mode.usableMode == .add || firstObject {
        firstObject = false
        containerLayer.addSublayer(maskLayer)
      } else {
        containerLayer.mask = maskLayer
        let newContainer = BaseAnimationLayer()
        newContainer.addSublayer(containerLayer)
        containerLayer = newContainer
      }
    }

    addSublayer(containerLayer)
  }

  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  /// Called by CoreAnimation to create a shadow copy of this layer
  /// More details: https://developer.apple.com/documentation/quartzcore/calayer/1410842-init
  override init(layer: Any) {
    guard let typedLayer = layer as? Self else {
      fatalError("\(Self.self).init(layer:) incorrectly called with \(type(of: layer))")
    }

    maskLayers = typedLayer.maskLayers
    super.init(layer: typedLayer)
  }

  // MARK: Internal

  override func layoutSublayers() {
    super.layoutSublayers()

    for sublayer in sublayers ?? [] {
      sublayer.fillBoundsOfSuperlayer()
    }
  }

  // MARK: Private

  private let maskLayers: [MaskLayer]

}

// MARK: AnimationLayer

extension MaskCompositionLayer: AnimationLayer {
  func setupAnimations(context: LayerAnimationContext) throws {
    for maskLayer in maskLayers {
      try maskLayer.setupAnimations(context: context)
    }
  }
}

// MARK: MaskCompositionLayer.MaskLayer

extension MaskCompositionLayer {
  final class MaskLayer: CAShapeLayer {

    // MARK: Lifecycle

    init(mask: Mask) {
      maskModel = mask
      super.init()

      fillRule = .evenOdd
    }

    required init?(coder _: NSCoder) {
      fatalError("init(coder:) has not been implemented")
    }

    /// Called by CoreAnimation to create a shadow copy of this layer
    /// More details: https://developer.apple.com/documentation/quartzcore/calayer/1410842-init
    override init(layer: Any) {
      guard let typedLayer = layer as? Self else {
        fatalError("\(Self.self).init(layer:) incorrectly called with \(type(of: layer))")
      }

      maskModel = typedLayer.maskModel
      super.init(layer: typedLayer)
    }

    // MARK: Internal

    let maskModel: Mask

  }
}

// MARK: - MaskCompositionLayer.MaskLayer + AnimationLayer

extension MaskCompositionLayer.MaskLayer: AnimationLayer {
  func setupAnimations(context: LayerAnimationContext) throws {
    let shouldInvertMask = (maskModel.mode.usableMode == .subtract && !maskModel.inverted)
      || (maskModel.mode.usableMode == .add && maskModel.inverted)

    try addAnimations(
      for: maskModel.shape,
      context: context,
      transformPath: { maskPath in
        // If the mask is using `MaskMode.subtract` or has `inverted: true`,
        // we have to invert the area filled by the path. We can do that by
        // drawing a rectangle, and then adding a path (which is subtracted
        // from the rectangle based on the .evenOdd fill mode).
        if shouldInvertMask {
          let path = CGMutablePath()
          path.addRect(.veryLargeRect)
          path.addPath(maskPath)
          return path
        } else {
          return maskPath
        }
      })
  }
}
