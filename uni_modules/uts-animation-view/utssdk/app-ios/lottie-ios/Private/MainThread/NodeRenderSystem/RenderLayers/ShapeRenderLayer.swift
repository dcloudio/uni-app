//
//  RenderLayer.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/18/19.
//

import QuartzCore

/// The layer responsible for rendering shape objects
final class ShapeRenderLayer: ShapeContainerLayer {

  // MARK: Lifecycle

  init(renderer: Renderable & NodeOutput) {
    self.renderer = renderer
    super.init()
    anchorPoint = .zero
    actions = [
      "position" : NSNull(),
      "bounds" : NSNull(),
      "anchorPoint" : NSNull(),
      "path" : NSNull(),
      "transform" : NSNull(),
      "opacity" : NSNull(),
      "hidden" : NSNull(),
    ]
    shapeLayer.actions = [
      "position" : NSNull(),
      "bounds" : NSNull(),
      "anchorPoint" : NSNull(),
      "path" : NSNull(),
      "fillColor" : NSNull(),
      "strokeColor" : NSNull(),
      "lineWidth" : NSNull(),
      "miterLimit" : NSNull(),
      "lineDashPhase" : NSNull(),
      "opacity": NSNull(),
      "hidden" : NSNull(),
    ]
    addSublayer(shapeLayer)

    renderer.setupSublayers(layer: shapeLayer)
  }

  override init(layer: Any) {
    guard let layer = layer as? ShapeRenderLayer else {
      fatalError("init(layer:) wrong class.")
    }
    renderer = layer.renderer
    super.init(layer: layer)
  }

  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  // MARK: Internal

  fileprivate(set) var renderer: Renderable & NodeOutput

  let shapeLayer = CAShapeLayer()

  override func hasRenderUpdate(forFrame: CGFloat) -> Bool {
    isHidden = !renderer.isEnabled
    guard isHidden == false else { return false }
    return renderer.hasRenderUpdates(forFrame)
  }

  override func rebuildContents(forFrame _: CGFloat) {
    if renderer.shouldRenderInContext {
      if let newPath = renderer.outputPath {
        bounds = renderer.renderBoundsFor(newPath.boundingBox)
      } else {
        bounds = .zero
      }
      position = bounds.origin
      setNeedsDisplay()
    } else {
      shapeLayer.path = renderer.outputPath
      renderer.updateShapeLayer(layer: shapeLayer)
    }
  }

  override func draw(in ctx: CGContext) {
    if let path = renderer.outputPath {
      if !path.isEmpty {
        ctx.addPath(path)
      }
    }
    renderer.render(ctx)
  }

  override func updateRenderScale() {
    super.updateRenderScale()
    shapeLayer.contentsScale = renderScale
  }
}
