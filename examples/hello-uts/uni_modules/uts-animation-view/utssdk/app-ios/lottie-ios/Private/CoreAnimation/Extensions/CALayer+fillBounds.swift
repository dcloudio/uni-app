// Created by Cal Stephens on 12/15/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - CALayer + fillBoundsOfSuperlayer

extension CALayer {
  /// Updates the `bounds` of this layer to fill the bounds of its `superlayer`
  /// without setting `frame` (which is not permitted if the layer can rotate)
  @nonobjc
  func fillBoundsOfSuperlayer() {
    guard let superlayer else { return }

    if let customLayerLayer = self as? CustomLayoutLayer {
      customLayerLayer.layout(superlayerBounds: superlayer.bounds)
    }

    else {
      // By default the `anchorPoint` of a layer is `CGPoint(x: 0.5, y: 0.5)`.
      // Setting it to `.zero` makes the layer have the same coordinate space
      // as its superlayer, which lets use use `superlayer.bounds` directly.
      anchorPoint = .zero

      bounds = superlayer.bounds
    }
  }
}

// MARK: - CustomLayoutLayer

/// A `CALayer` that sets a custom `bounds` and `anchorPoint` relative to its superlayer
protocol CustomLayoutLayer: CALayer {
  func layout(superlayerBounds: CGRect)
}
