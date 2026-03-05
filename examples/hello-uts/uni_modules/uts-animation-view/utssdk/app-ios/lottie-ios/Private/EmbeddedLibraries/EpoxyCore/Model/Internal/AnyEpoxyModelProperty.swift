// Created by eric_horacek on 12/1/20.
// Copyright © 2020 Airbnb Inc. All rights reserved.

// MARK: - AnyEpoxyModelProperty

/// An erased `EpoxyModelProperty`, with the ability to call the `UpdateStrategy` even when the type
/// has been erased.
protocol AnyEpoxyModelProperty {
  /// Returns the updated property from updating from given old to new property.
  func update(old: Any, new: Any) -> Any
}

// MARK: - EpoxyModelProperty + AnyEpoxyModelProperty

extension EpoxyModelProperty: AnyEpoxyModelProperty {
  func update(old: Any, new: Any) -> Any {
    guard let typedOld = old as? Value else {
      EpoxyLogger.shared.assertionFailure(
        "Expected old to be of type \(Value.self), instead found \(old). This is programmer error.")
      return defaultValue()
    }
    guard let typedNew = new as? Value else {
      EpoxyLogger.shared.assertionFailure(
        "Expected new to be of type \(Value.self), instead found \(old). This is programmer error.")
      return defaultValue()
    }
    return updateStrategy.update(typedOld, typedNew)
  }
}
