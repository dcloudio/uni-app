// Created by Cal Stephens on 1/11/22.
// Copyright © 2022 Airbnb Inc. All rights reserved.

import QuartzCore

extension CALayer {

  // MARK: Internal

  /// Sets up an `AnimationLayer` / `CALayer` hierarchy in this layer,
  /// using the given list of layers.
  @nonobjc
  func setupLayerHierarchy(
    for layers: [LayerModel],
    context: LayerContext)
    throws
  {
    // A `LottieAnimation`'s `LayerModel`s are listed from front to back,
    // but `CALayer.sublayers` are listed from back to front.
    // We reverse the layer ordering to match what Core Animation expects.
    // The final view hierarchy must display the layers in this exact order.
    let layersInZAxisOrder = layers.reversed()

    let layersByIndex = Dictionary(grouping: layersInZAxisOrder, by: \.index)
      .compactMapValues(\.first)

    /// Layers specify a `parent` layer. Child layers inherit the `transform` of their parent.
    ///  - We can't add the child as a sublayer of the parent `CALayer`, since that would
    ///    break the ordering specified in `layersInZAxisOrder`.
    ///  - Instead, we create an invisible `TransformLayer` to handle the parent
    ///    transform animations, and add the child layer to that `TransformLayer`.
    func makeParentTransformLayer(
      childLayerModel: LayerModel,
      childLayer: CALayer,
      name: (LayerModel) -> String)
      -> CALayer
    {
      guard
        let parentIndex = childLayerModel.parent,
        let parentLayerModel = layersByIndex[parentIndex]
      else { return childLayer }

      let parentLayer = TransformLayer(layerModel: parentLayerModel)
      parentLayer.name = name(parentLayerModel)
      parentLayer.addSublayer(childLayer)

      return makeParentTransformLayer(
        childLayerModel: parentLayerModel,
        childLayer: parentLayer,
        name: name)
    }

    // Create an `AnimationLayer` for each `LayerModel`
    for (layerModel, mask) in try layersInZAxisOrder.pairedLayersAndMasks() {
      guard let layer = try layerModel.makeAnimationLayer(context: context) else {
        continue
      }

      // If this layer has a `parent`, we create an invisible `TransformLayer`
      // to handle displaying / animating the parent transform.
      let parentTransformLayer = makeParentTransformLayer(
        childLayerModel: layerModel,
        childLayer: layer,
        name: { parentLayerModel in
          "\(layerModel.name) (parent, \(parentLayerModel.name))"
        })

      // Create the `mask` layer for this layer, if it has a `MatteType`
      if
        let mask,
        let maskLayer = try maskLayer(for: mask.model, type: mask.matteType, context: context)
      {
        let maskParentTransformLayer = makeParentTransformLayer(
          childLayerModel: mask.model,
          childLayer: maskLayer,
          name: { parentLayerModel in
            "\(mask.model.name) (mask of \(layerModel.name)) (parent, \(parentLayerModel.name))"
          })

        // Set up a parent container to host both the layer
        // and its mask in the same coordinate space
        let maskContainer = BaseAnimationLayer()
        maskContainer.name = "\(layerModel.name) (parent, masked)"
        maskContainer.addSublayer(parentTransformLayer)

        // Core Animation will silently fail to apply a mask if a `mask` layer
        // itself _also_ has a `mask`. As a workaround, we can wrap this layer's
        // mask in an additional container layer which never has its own `mask`.
        let additionalMaskParent = BaseAnimationLayer()
        additionalMaskParent.addSublayer(maskParentTransformLayer)
        maskContainer.mask = additionalMaskParent

        addSublayer(maskContainer)
      }

      else {
        addSublayer(parentTransformLayer)
      }
    }
  }

  // MARK: Fileprivate

  /// Creates a mask `CALayer` from the given matte layer model, using the `MatteType`
  /// from the layer that is being masked.
  fileprivate func maskLayer(
    for matteLayerModel: LayerModel,
    type: MatteType,
    context: LayerContext)
    throws -> CALayer?
  {
    switch type {
    case .add:
      return try matteLayerModel.makeAnimationLayer(context: context)

    case .invert:
      guard let maskLayer = try matteLayerModel.makeAnimationLayer(context: context) else {
        return nil
      }

      // We can invert the mask layer by having a large solid black layer with the
      // given mask layer subtracted out using the `xor` blend mode. When applied to the
      // layer being masked, this creates an inverted mask where only areas _outside_
      // of the mask layer are visible.
      // https://developer.apple.com/documentation/coregraphics/cgblendmode/xor
      //  - The inverted mask is supposed to expand infinitely around the shape,
      //    so we use `InfiniteOpaqueAnimationLayer`
      let base = InfiniteOpaqueAnimationLayer()
      base.backgroundColor = .rgb(0, 0, 0)
      base.addSublayer(maskLayer)
      maskLayer.compositingFilter = "xor"
      return base

    case .none, .unknown:
      return nil
    }
  }

}

extension Collection<LayerModel> {
  /// Pairs each `LayerModel` within this array with
  /// a `LayerModel` to use as its mask, if applicable
  /// based on the layer's `MatteType` configuration.
  ///  - Assumes the layers are sorted in z-axis order.
  fileprivate func pairedLayersAndMasks() throws
    -> [(layer: LayerModel, mask: (model: LayerModel, matteType: MatteType)?)]
  {
    var layersAndMasks = [(layer: LayerModel, mask: (model: LayerModel, matteType: MatteType)?)]()
    var unprocessedLayers = reversed()

    while let layer = unprocessedLayers.popLast() {
      /// If a layer has a `MatteType`, then the next layer will be used as its `mask`
      if
        let matteType = layer.matte,
        matteType != .none,
        let maskLayer = unprocessedLayers.popLast()
      {
        layersAndMasks.append((layer: layer, mask: (model: maskLayer, matteType: matteType)))
      }

      else {
        layersAndMasks.append((layer: layer, mask: nil))
      }
    }

    return layersAndMasks
  }
}
