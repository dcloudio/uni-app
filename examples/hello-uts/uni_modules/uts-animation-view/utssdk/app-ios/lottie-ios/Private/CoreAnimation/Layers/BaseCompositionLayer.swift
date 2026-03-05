// Created by Cal Stephens on 12/20/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - BaseCompositionLayer

/// The base type of `AnimationLayer` that can contain other `AnimationLayer`s
class BaseCompositionLayer: BaseAnimationLayer {

  // MARK: Lifecycle

  init(layerModel: LayerModel) {
    baseLayerModel = layerModel
    super.init()

    setupSublayers()
    compositingFilter = layerModel.blendMode.filterName
    name = layerModel.name
    contentsLayer.name = "\(layerModel.name) (Content)"
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

    baseLayerModel = typedLayer.baseLayerModel
    super.init(layer: typedLayer)
  }

  // MARK: Internal

  /// The layer that content / sublayers should be rendered in.
  /// This is the layer that transform animations are applied to.
  let contentsLayer = BaseAnimationLayer()

  /// Whether or not this layer render should render any visible content
  var renderLayerContents: Bool { true }

  /// Sets up the base `LayerModel` animations for this layer,
  /// and all child `AnimationLayer`s.
  ///  - Can be overridden by subclasses, which much call `super`.
  override func setupAnimations(context: LayerAnimationContext) throws {
    let layerContext = context.addingKeypathComponent(baseLayerModel.name)
    let childContext = renderLayerContents ? layerContext : context

    try setupLayerAnimations(context: layerContext)
    try setupChildAnimations(context: childContext)
  }

  func setupLayerAnimations(context: LayerAnimationContext) throws {
    let transformContext = context.addingKeypathComponent("Transform")

    try contentsLayer.addTransformAnimations(for: baseLayerModel.transform, context: transformContext)

    if renderLayerContents {
      try contentsLayer.addOpacityAnimation(for: baseLayerModel.transform, context: transformContext)

      try contentsLayer.addVisibilityAnimation(
        inFrame: CGFloat(baseLayerModel.inFrame),
        outFrame: CGFloat(baseLayerModel.outFrame),
        context: context)

      // There are two different drop shadow schemas, either using `DropShadowEffect` or `DropShadowStyle`.
      // If both happen to be present, prefer the `DropShadowEffect` (which is the drop shadow schema
      // supported on other platforms).
      let dropShadowEffect = baseLayerModel.effects.first(where: { $0 is DropShadowEffect }) as? DropShadowModel
      let dropShadowStyle = baseLayerModel.styles.first(where: { $0 is DropShadowStyle }) as? DropShadowModel
      if let dropShadowModel = dropShadowEffect ?? dropShadowStyle {
        try contentsLayer.addDropShadowAnimations(for: dropShadowModel, context: context)
      }
    }
  }

  func setupChildAnimations(context: LayerAnimationContext) throws {
    try super.setupAnimations(context: context)
  }

  override func addSublayer(_ layer: CALayer) {
    if layer === contentsLayer {
      super.addSublayer(contentsLayer)
    } else {
      contentsLayer.addSublayer(layer)
    }
  }

  // MARK: Private

  private let baseLayerModel: LayerModel

  private func setupSublayers() {
    addSublayer(contentsLayer)

    if
      renderLayerContents,
      let masks = baseLayerModel.masks?.filter({ $0.mode != .none }),
      !masks.isEmpty
    {
      contentsLayer.mask = MaskCompositionLayer(masks: masks)
    }
  }

}
