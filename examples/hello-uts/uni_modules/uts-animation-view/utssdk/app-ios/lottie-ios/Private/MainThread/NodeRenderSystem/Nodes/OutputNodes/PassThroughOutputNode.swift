//
//  PassThroughOutputNode.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/30/19.
//

import CoreGraphics

class PassThroughOutputNode: NodeOutput {

  // MARK: Lifecycle

  init(parent: NodeOutput?) {
    self.parent = parent
  }

  // MARK: Internal

  let parent: NodeOutput?

  var hasUpdate = false
  var isEnabled = true

  var outputPath: CGPath? {
    if let parent {
      return parent.outputPath
    }
    return nil
  }

  func hasOutputUpdates(_ forFrame: CGFloat) -> Bool {
    /// Changes to this node do not affect downstream nodes.
    let parentUpdate = parent?.hasOutputUpdates(forFrame) ?? false
    /// Changes to upstream nodes do, however, affect this nodes state.
    hasUpdate = hasUpdate || parentUpdate
    return parentUpdate
  }

  func hasRenderUpdates(_ forFrame: CGFloat) -> Bool {
    /// Return true if there are upstream updates or if this node has updates
    let upstreamUpdates = parent?.hasOutputUpdates(forFrame) ?? false
    hasUpdate = hasUpdate || upstreamUpdates
    return hasUpdate
  }
}
