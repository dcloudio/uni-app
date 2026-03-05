//
//  TransformNodeOutput.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/30/19.
//

import QuartzCore

class GroupOutputNode: NodeOutput {

  // MARK: Lifecycle

  init(parent: NodeOutput?, rootNode: NodeOutput?) {
    self.parent = parent
    self.rootNode = rootNode
  }

  // MARK: Internal

  let parent: NodeOutput?
  let rootNode: NodeOutput?
  var isEnabled = true

  private(set) var outputPath: CGPath? = nil
  private(set) var transform: CATransform3D = CATransform3DIdentity

  func setTransform(_ xform: CATransform3D, forFrame _: CGFloat) {
    transform = xform
    outputPath = nil
  }

  func hasOutputUpdates(_ forFrame: CGFloat) -> Bool {
    guard isEnabled else {
      let upstreamUpdates = parent?.hasOutputUpdates(forFrame) ?? false
      outputPath = parent?.outputPath
      return upstreamUpdates
    }

    let upstreamUpdates = parent?.hasOutputUpdates(forFrame) ?? false
    if upstreamUpdates {
      outputPath = nil
    }
    let rootUpdates = rootNode?.hasOutputUpdates(forFrame) ?? false
    if rootUpdates {
      outputPath = nil
    }

    var localUpdates = false
    if outputPath == nil {
      localUpdates = true

      let newPath = CGMutablePath()
      if let parentNode = parent, let parentPath = parentNode.outputPath {
        /// First add parent path.
        newPath.addPath(parentPath)
      }
      var xform = CATransform3DGetAffineTransform(transform)
      if
        let rootNode,
        let rootPath = rootNode.outputPath,
        let xformedPath = rootPath.copy(using: &xform)
      {
        /// Now add root path. Note root path is transformed.
        newPath.addPath(xformedPath)
      }

      outputPath = newPath
    }

    return upstreamUpdates || localUpdates
  }

}
