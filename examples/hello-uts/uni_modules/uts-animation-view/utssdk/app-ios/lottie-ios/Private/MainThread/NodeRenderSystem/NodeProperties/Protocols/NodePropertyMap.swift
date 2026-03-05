//
//  NodePropertyMap.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/21/19.
//

import QuartzCore

// MARK: - NodePropertyMap

protocol NodePropertyMap {
  var properties: [AnyNodeProperty] { get }
}

extension NodePropertyMap {

  var childKeypaths: [KeypathSearchable] {
    []
  }

  var keypathLayer: CALayer? {
    nil
  }

  /// Checks if the node's local contents need to be rebuilt.
  func needsLocalUpdate(frame: CGFloat) -> Bool {
    for property in properties {
      if property.needsUpdate(frame: frame) {
        return true
      }
    }
    return false
  }

  /// Rebuilds only the local nodes that have an update for the frame
  func updateNodeProperties(frame: CGFloat) {
    for property in properties {
      property.update(frame: frame)
    }
  }

}
