// Created by Cal Stephens on 12/13/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - ShapeItemLayer

/// A CALayer type that renders an array of `[ShapeItem]`s,
/// from a `Group` in a `ShapeLayerModel`.
final class ShapeItemLayer: BaseAnimationLayer {

  // MARK: Lifecycle

  /// Initializes a `ShapeItemLayer` that renders a `Group` from a `ShapeLayerModel`
  /// - Parameters:
  ///   - shape: The `ShapeItem` in this group that renders a `GGPath`
  ///   - otherItems: Other items in this group that affect the appearance of the shape
  init(shape: Item, otherItems: [Item], context: LayerContext) throws {
    self.shape = shape
    self.otherItems = otherItems

    try context.compatibilityAssert(
      shape.item.drawsCGPath,
      "`ShapeItemLayer` must contain exactly one `ShapeItem` that draws a `GPPath`")

    try context.compatibilityAssert(
      !otherItems.contains(where: { $0.item.drawsCGPath }),
      "`ShapeItemLayer` must contain exactly one `ShapeItem` that draws a `GPPath`")

    super.init()

    setupLayerHierarchy()
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

    shape = typedLayer.shape
    otherItems = typedLayer.otherItems
    super.init(layer: typedLayer)
  }

  // MARK: Internal

  /// An item that can be displayed by this layer
  struct Item {
    /// A `ShapeItem` that should be rendered by this layer
    let item: ShapeItem

    /// The set of groups that this item descends from
    ///  - Due to the way `GroupLayer`s are setup, the original `ShapeItem`
    ///    hierarchy from the `ShapeLayer` data model may no longer exactly
    ///    match the hierarchy of `GroupLayer` / `ShapeItemLayer`s constructed
    ///    at runtime. Since animation keypaths need to match the original
    ///    structure of the `ShapeLayer` data model, we track that info here.
    let groupPath: [String]
  }

  override func setupAnimations(context: LayerAnimationContext) throws {
    try super.setupAnimations(context: context)

    guard let sublayerConfiguration else { return }

    switch sublayerConfiguration.fill {
    case .solidFill(let shapeLayer):
      try setupSolidFillAnimations(shapeLayer: shapeLayer, context: context)

    case .gradientFill(let gradientLayers):
      try setupGradientFillAnimations(layers: gradientLayers, context: context)
    }

    if let gradientStrokeConfiguration = sublayerConfiguration.gradientStroke {
      try setupGradientStrokeAnimations(layers: gradientStrokeConfiguration, context: context)
    }
  }

  // MARK: Private

  private struct GradientLayers {
    /// The `CALayer` that renders the RGB components of the gradient
    let gradientColorLayer: GradientRenderLayer
    /// The `CALayer` that renders the alpha components of the gradient,
    /// masking the `gradientColorLayer`
    let gradientAlphaLayer: GradientRenderLayer?
    /// The `CAShapeLayer` that clips the gradient layers to the expected shape
    let shapeMaskLayer: CAShapeLayer
    /// The top-most `CAShapeLayer` used to render `Stroke`s over the gradient if necessary
    let overlayLayer: CAShapeLayer?
  }

  /// The configuration of this layer's `fill` sublayers
  private enum FillLayerConfiguration {
    /// This layer displays a single `CAShapeLayer`
    case solidFill(CAShapeLayer)

    /// This layer displays a `GradientRenderLayer` masked by a `CAShapeLayer`.
    case gradientFill(GradientLayers)
  }

  /// The `ShapeItem` in this group that renders a `GGPath`
  private let shape: Item

  /// Other items in this group that affect the appearance of the shape
  private let otherItems: [Item]

  /// The current configuration of this layer's sublayer(s)
  private var sublayerConfiguration: (fill: FillLayerConfiguration, gradientStroke: GradientLayers?)?

  private func setupLayerHierarchy() {
    // We have to build a different layer hierarchy depending on if
    // we're rendering a gradient (a `CAGradientLayer` masked by a `CAShapeLayer`)
    // or a solid shape (a simple `CAShapeLayer`).
    let fillLayerConfiguration: FillLayerConfiguration
    if let gradientFill = otherItems.first(GradientFill.self) {
      fillLayerConfiguration = setupGradientFillLayerHierarchy(for: gradientFill)
    } else {
      fillLayerConfiguration = setupSolidFillLayerHierarchy()
    }

    let gradientStrokeConfiguration: GradientLayers?
    if let gradientStroke = otherItems.first(GradientStroke.self) {
      gradientStrokeConfiguration = setupGradientStrokeLayerHierarchy(for: gradientStroke)
    } else {
      gradientStrokeConfiguration = nil
    }

    sublayerConfiguration = (fillLayerConfiguration, gradientStrokeConfiguration)
  }

  private func setupSolidFillLayerHierarchy() -> FillLayerConfiguration {
    let shapeLayer = CAShapeLayer()
    addSublayer(shapeLayer)

    // `CAShapeLayer.fillColor` defaults to black, so we have to
    // nil out the background color if there isn't an expected fill color
    if !otherItems.contains(where: { $0.item is Fill }) {
      shapeLayer.fillColor = nil
    }

    return .solidFill(shapeLayer)
  }

  private func setupGradientFillLayerHierarchy(
    for gradientFill: GradientFill)
    -> FillLayerConfiguration
  {
    let container = BaseAnimationLayer()
    let pathContainer = BaseAnimationLayer()

    let pathMask = CAShapeLayer()
    pathMask.fillColor = .rgb(0, 0, 0)
    pathContainer.mask = pathMask

    let rgbGradientLayer = GradientRenderLayer()
    pathContainer.addSublayer(rgbGradientLayer)
    container.addSublayer(pathContainer)

    let overlayLayer = CAShapeLayer()
    overlayLayer.fillColor = nil
    container.addSublayer(overlayLayer)

    addSublayer(container)

    let alphaGradientLayer: GradientRenderLayer?
    if gradientFill.hasAlphaComponent {
      alphaGradientLayer = GradientRenderLayer()
      rgbGradientLayer.mask = alphaGradientLayer
    } else {
      alphaGradientLayer = nil
    }

    return .gradientFill(GradientLayers(
      gradientColorLayer: rgbGradientLayer,
      gradientAlphaLayer: alphaGradientLayer,
      shapeMaskLayer: pathMask,
      overlayLayer: overlayLayer))
  }

  private func setupGradientStrokeLayerHierarchy(
    for gradientStroke: GradientStroke)
    -> GradientLayers
  {
    let container = BaseAnimationLayer()

    let pathMask = CAShapeLayer()
    pathMask.fillColor = nil
    pathMask.strokeColor = .rgb(0, 0, 0)
    container.mask = pathMask

    let rgbGradientLayer = GradientRenderLayer()
    container.addSublayer(rgbGradientLayer)
    addSublayer(container)

    let alphaGradientLayer: GradientRenderLayer?
    if gradientStroke.hasAlphaComponent {
      alphaGradientLayer = GradientRenderLayer()
      rgbGradientLayer.mask = alphaGradientLayer
    } else {
      alphaGradientLayer = nil
    }

    return GradientLayers(
      gradientColorLayer: rgbGradientLayer,
      gradientAlphaLayer: alphaGradientLayer,
      shapeMaskLayer: pathMask,
      overlayLayer: nil)
  }

  private func setupSolidFillAnimations(
    shapeLayer: CAShapeLayer,
    context: LayerAnimationContext)
    throws
  {
    var trimPathMultiplier: PathMultiplier? = nil
    if let (trim, context) = otherItems.first(Trim.self, where: { !$0.isEmpty }, context: context) {
      trimPathMultiplier = try shapeLayer.addAnimations(for: trim, context: context)

      try context.compatibilityAssert(
        otherItems.first(Fill.self) == nil,
        """
        The Core Animation rendering engine doesn't currently support applying
        trims to filled shapes (only stroked shapes).
        """)
    }

    try shapeLayer.addAnimations(
      for: shape.item,
      context: context.for(shape),
      pathMultiplier: trimPathMultiplier ?? 1,
      roundedCorners: otherItems.first(RoundedCorners.self))

    if let (fill, context) = otherItems.first(Fill.self, context: context) {
      try shapeLayer.addAnimations(for: fill, context: context)
    }

    if let (stroke, context) = otherItems.first(Stroke.self, context: context) {
      try shapeLayer.addStrokeAnimations(for: stroke, context: context)
    }
  }

  private func setupGradientFillAnimations(
    layers: GradientLayers,
    context: LayerAnimationContext)
    throws
  {
    let pathLayers = [layers.shapeMaskLayer, layers.overlayLayer]
    for pathLayer in pathLayers {
      try pathLayer?.addAnimations(
        for: shape.item,
        context: context.for(shape),
        pathMultiplier: 1,
        roundedCorners: otherItems.first(RoundedCorners.self))
    }

    if let (gradientFill, context) = otherItems.first(GradientFill.self, context: context) {
      layers.shapeMaskLayer.fillRule = gradientFill.fillRule.caFillRule
      try layers.gradientColorLayer.addGradientAnimations(for: gradientFill, type: .rgb, context: context)
      try layers.gradientAlphaLayer?.addGradientAnimations(for: gradientFill, type: .alpha, context: context)
    }

    if let (stroke, context) = otherItems.first(Stroke.self, context: context) {
      try layers.overlayLayer?.addStrokeAnimations(for: stroke, context: context)
    }
  }

  private func setupGradientStrokeAnimations(
    layers: GradientLayers,
    context: LayerAnimationContext)
    throws
  {
    var trimPathMultiplier: PathMultiplier? = nil
    if let (trim, context) = otherItems.first(Trim.self, context: context) {
      trimPathMultiplier = try layers.shapeMaskLayer.addAnimations(for: trim, context: context)
    }

    try layers.shapeMaskLayer.addAnimations(
      for: shape.item,
      context: context.for(shape),
      pathMultiplier: trimPathMultiplier ?? 1,
      roundedCorners: otherItems.first(RoundedCorners.self))

    if let (gradientStroke, context) = otherItems.first(GradientStroke.self, context: context) {
      try layers.gradientColorLayer.addGradientAnimations(for: gradientStroke, type: .rgb, context: context)
      try layers.gradientAlphaLayer?.addGradientAnimations(for: gradientStroke, type: .alpha, context: context)

      try layers.shapeMaskLayer.addStrokeAnimations(for: gradientStroke, context: context)
    }
  }

}

// MARK: - [ShapeItem] helpers

extension [ShapeItemLayer.Item] {
  /// The first `ShapeItem` in this array of the given type
  func first<ItemType: ShapeItem>(
    _: ItemType.Type,
    where condition: (ItemType) -> Bool = { _ in true },
    context: LayerAnimationContext)
    -> (item: ItemType, context: LayerAnimationContext)?
  {
    for item in self {
      if let match = item.item as? ItemType, condition(match) {
        return (match, context.for(item))
      }
    }

    return nil
  }

  /// The first `ShapeItem` in this array of the given type
  func first<ItemType: ShapeItem>(_: ItemType.Type) -> ItemType? {
    for item in self {
      if let match = item.item as? ItemType {
        return match
      }
    }

    return nil
  }
}

extension LayerAnimationContext {
  /// An updated `LayerAnimationContext` with the`AnimationKeypath`
  /// that refers to this specific `ShapeItem`.
  func `for`(_ item: ShapeItemLayer.Item) -> LayerAnimationContext {
    var context = self

    for parentGroupName in item.groupPath {
      context.currentKeypath.keys.append(parentGroupName)
    }

    context.currentKeypath.keys.append(item.item.name)
    return context
  }
}
