//
//  InvertedMatteLayer.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/28/19.
//

import QuartzCore

/// A layer that inverses the alpha output of its input layer.
///
/// WARNING: This is experimental and probably not very performant.
final class InvertedMatteLayer: CALayer, CompositionLayerDelegate {

  // MARK: Lifecycle

  init(inputMatte: CompositionLayer) {
    self.inputMatte = inputMatte
    super.init()
    inputMatte.layerDelegate = self
    anchorPoint = .zero
    bounds = inputMatte.bounds
    setNeedsDisplay()
  }

  override init(layer: Any) {
    guard let layer = layer as? InvertedMatteLayer else {
      fatalError("init(layer:) wrong class.")
    }
    inputMatte = nil
    super.init(layer: layer)
  }

  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  // MARK: Internal

  let inputMatte: CompositionLayer?

  func frameUpdated(frame _: CGFloat) {
    setNeedsDisplay()
    displayIfNeeded()
  }

  override func draw(in ctx: CGContext) {
    guard let inputMatte else { return }
    ctx.setFillColor(.rgb(0, 0, 0))
    ctx.fill(bounds)
    ctx.setBlendMode(.destinationOut)
    inputMatte.render(in: ctx)
  }

}
