//
//  NodeProperty.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/30/19.
//

import CoreGraphics
import Foundation

/// A node property that holds a reference to a T ValueProvider and a T ValueContainer.
class NodeProperty<T>: AnyNodeProperty {

  // MARK: Lifecycle

  init(provider: AnyValueProvider) {
    valueProvider = provider
    originalValueProvider = valueProvider
    typedContainer = ValueContainer<T>(provider.value(frame: 0) as! T)
    typedContainer.setNeedsUpdate()
  }

  // MARK: Internal

  var valueProvider: AnyValueProvider
  var originalValueProvider: AnyValueProvider

  var valueType: Any.Type { T.self }

  var value: T {
    typedContainer.outputValue
  }

  var valueContainer: AnyValueContainer {
    typedContainer
  }

  func needsUpdate(frame: CGFloat) -> Bool {
    valueContainer.needsUpdate || valueProvider.hasUpdate(frame: frame)
  }

  func setProvider(provider: AnyValueProvider) {
    guard provider.valueType == valueType else { return }
    valueProvider = provider
    valueContainer.setNeedsUpdate()
  }

  func update(frame: CGFloat) {
    typedContainer.setValue(valueProvider.value(frame: frame), forFrame: frame)
  }

  // MARK: Fileprivate

  fileprivate var typedContainer: ValueContainer<T>
}
