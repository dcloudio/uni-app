// Created by Cal Stephens on 12/14/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - PreCompLayer

/// The `CALayer` type responsible for rendering `PreCompLayerModel`s
final class PreCompLayer: BaseCompositionLayer {

  // MARK: Lifecycle

  init(preCompLayer: PreCompLayerModel) {
    self.preCompLayer = preCompLayer
    super.init(layerModel: preCompLayer)
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

    preCompLayer = typedLayer.preCompLayer
    super.init(layer: typedLayer)
  }

  // MARK: Internal

  let preCompLayer: PreCompLayerModel

  /// Post-init setup for `PreCompLayer`s.
  /// Should always be called after `PreCompLayer.init(preCompLayer:)`.
  ///
  /// This is a workaround for a hard-to-reproduce crash that was
  /// triggered when `PreCompLayer.init` was called reentantly. We didn't
  /// have any consistent repro steps for this crash (it happened 100% of
  /// the time for some testers, and 0% of the time for other testers),
  /// but moving this code out of `PreCompLayer.init` does seem to fix it.
  ///
  /// The stack trace looked like:
  ///  - `_os_unfair_lock_recursive_abort`
  ///  - `-[CALayerAccessibility__UIKit__QuartzCore dealloc]`
  ///  - `PreCompLayer.__allocating_init(preCompLayer:context:)` <- reentrant init call
  ///  - ...
  ///  - `CALayer.setupLayerHierarchy(for:context:)`
  ///  - `PreCompLayer.init(preCompLayer:context:)`
  ///
  func setup(context: LayerContext) throws {
    try setupLayerHierarchy(
      for: context.animation.assetLibrary?.precompAssets[preCompLayer.referenceID]?.layers ?? [],
      context: context)
  }

  override func setupAnimations(context: LayerAnimationContext) throws {
    var context = context
    context = context.addingKeypathComponent(preCompLayer.name)
    try setupLayerAnimations(context: context)

    let timeRemappingInterpolator = preCompLayer.timeRemapping.flatMap { KeyframeInterpolator(keyframes: $0.keyframes) }

    let contextForChildren = context
      // `timeStretch` and `startTime` are a simple linear function so can be inverted from a
      // "global time to local time" function into the simpler "local time to global time".
      .withSimpleTimeRemapping { [preCompLayer] layerLocalFrame in
        (layerLocalFrame * AnimationFrameTime(preCompLayer.timeStretch)) + AnimationFrameTime(preCompLayer.startTime)
      }
      // `timeRemappingInterpolator` is arbitrarily complex and cannot be inverted,
      // so can only be applied via `complexTimeRemapping` from global time to local time.
      .withComplexTimeRemapping(required: preCompLayer.timeRemapping != nil) { [preCompLayer] globalTime in
        if let timeRemappingInterpolator {
          let remappedLocalTime = timeRemappingInterpolator.value(frame: globalTime) as! LottieVector1D
          return remappedLocalTime.cgFloatValue * context.animation.framerate
        } else {
          return (globalTime - preCompLayer.startTime) / preCompLayer.timeStretch
        }
      }

    try setupChildAnimations(context: contextForChildren)
  }

}

// MARK: CustomLayoutLayer

extension PreCompLayer: CustomLayoutLayer {
  func layout(superlayerBounds: CGRect) {
    anchorPoint = .zero

    // Pre-comp layers use a size specified in the layer model,
    // and clip the composition to that bounds
    bounds = CGRect(
      x: superlayerBounds.origin.x,
      y: superlayerBounds.origin.y,
      width: CGFloat(preCompLayer.width),
      height: CGFloat(preCompLayer.height))

    contentsLayer.masksToBounds = true
  }
}
