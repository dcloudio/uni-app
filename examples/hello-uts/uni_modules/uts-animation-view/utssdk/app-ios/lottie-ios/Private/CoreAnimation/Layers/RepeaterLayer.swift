// Created by Cal Stephens on 8/1/22.
// Copyright © 2022 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - RepeaterLayer

/// A layer that renders a child layer at some offset using a `Repeater`
final class RepeaterLayer: BaseAnimationLayer {

  // MARK: Lifecycle

  init(repeater: Repeater, childLayer: CALayer, index: Int) {
    repeaterTransform = RepeaterTransform(repeater: repeater, index: index)
    super.init()
    addSublayer(childLayer)
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

    repeaterTransform = typedLayer.repeaterTransform
    super.init(layer: typedLayer)
  }

  // MARK: Internal

  override func setupAnimations(context: LayerAnimationContext) throws {
    try super.setupAnimations(context: context)
    try addTransformAnimations(for: repeaterTransform, context: context)
  }

  // MARK: Private

  private let repeaterTransform: RepeaterTransform

}

// MARK: - RepeaterTransform

/// A transform model created from a `Repeater`
private struct RepeaterTransform {

  // MARK: Lifecycle

  init(repeater: Repeater, index: Int) {
    anchorPoint = repeater.anchorPoint
    scale = repeater.scale

    rotationX = repeater.rotationX.map { rotation in
      LottieVector1D(rotation.value * Double(index))
    }

    rotationY = repeater.rotationY.map { rotation in
      LottieVector1D(rotation.value * Double(index))
    }

    rotationZ = repeater.rotationZ.map { rotation in
      LottieVector1D(rotation.value * Double(index))
    }

    position = repeater.position.map { position in
      LottieVector3D(
        x: position.x * Double(index),
        y: position.y * Double(index),
        z: position.z * Double(index))
    }
  }

  // MARK: Internal

  let anchorPoint: KeyframeGroup<LottieVector3D>
  let position: KeyframeGroup<LottieVector3D>
  let rotationX: KeyframeGroup<LottieVector1D>
  let rotationY: KeyframeGroup<LottieVector1D>
  let rotationZ: KeyframeGroup<LottieVector1D>

  let scale: KeyframeGroup<LottieVector3D>

}

// MARK: TransformModel

extension RepeaterTransform: TransformModel {
  var _position: KeyframeGroup<LottieVector3D>? { position }
  var _positionX: KeyframeGroup<LottieVector1D>? { nil }
  var _positionY: KeyframeGroup<LottieVector1D>? { nil }
  var _skew: KeyframeGroup<LottieVector1D>? { nil }
  var _skewAxis: KeyframeGroup<LottieVector1D>? { nil }
}
