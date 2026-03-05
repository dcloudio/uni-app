//
//  ValueContainer.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/30/19.
//

import CoreGraphics
import Foundation

/// A container for a node value that is Typed to T.
class ValueContainer<T>: AnyValueContainer {

  // MARK: Lifecycle

  init(_ value: T) {
    outputValue = value
  }

  // MARK: Internal

  private(set) var lastUpdateFrame = CGFloat.infinity

  fileprivate(set) var needsUpdate = true

  var value: Any {
    outputValue as Any
  }

  var outputValue: T {
    didSet {
      needsUpdate = false
    }
  }

  func setValue(_ value: Any, forFrame: CGFloat) {
    if let typedValue = value as? T {
      needsUpdate = false
      lastUpdateFrame = forFrame
      outputValue = typedValue
    }
  }

  func setNeedsUpdate() {
    needsUpdate = true
  }
}
