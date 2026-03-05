// Created by Cal Stephens on 12/20/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

// MARK: - LayerContext

/// Context available when constructing an `AnimationLayer`
struct LayerContext {
  let animation: LottieAnimation
  let imageProvider: AnimationImageProvider
  let textProvider: AnimationKeypathTextProvider
  let fontProvider: AnimationFontProvider
  let compatibilityTracker: CompatibilityTracker
  var layerName: String

  func forLayer(_ layer: LayerModel) -> LayerContext {
    var context = self
    context.layerName = layer.name
    return context
  }
}

// MARK: - LayerModel + makeAnimationLayer

extension LayerModel {
  /// Constructs an `AnimationLayer` / `CALayer` that represents this `LayerModel`
  func makeAnimationLayer(context: LayerContext) throws -> BaseCompositionLayer? {
    let context = context.forLayer(self)

    if hidden {
      return TransformLayer(layerModel: self)
    }

    switch (type, self) {
    case (.precomp, let preCompLayerModel as PreCompLayerModel):
      let preCompLayer = PreCompLayer(preCompLayer: preCompLayerModel)
      try preCompLayer.setup(context: context)
      return preCompLayer

    case (.solid, let solidLayerModel as SolidLayerModel):
      return SolidLayer(solidLayerModel)

    case (.shape, let shapeLayerModel as ShapeLayerModel):
      return try ShapeLayer(shapeLayer: shapeLayerModel, context: context)

    case (.image, let imageLayerModel as ImageLayerModel):
      return ImageLayer(imageLayer: imageLayerModel, context: context)

    case (.text, let textLayerModel as TextLayerModel):
      return try TextLayer(textLayerModel: textLayerModel, context: context)

    case (.null, _):
      return TransformLayer(layerModel: self)

    case (.unknown, _), (.precomp, _), (.solid, _), (.image, _), (.shape, _), (.text, _):
      return nil
    }
  }

}
