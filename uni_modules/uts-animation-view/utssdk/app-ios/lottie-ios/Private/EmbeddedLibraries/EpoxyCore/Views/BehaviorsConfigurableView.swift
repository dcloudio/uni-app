// Created by Tyler Hedrick on 5/26/20.
// Copyright © 2020 Airbnb Inc. All rights reserved.

// MARK: - BehaviorsConfigurableView

/// A view that can be configured with a `Behaviors` instance that contains the view's non-
/// `Equatable` properties that can be updated on view instances after initialization, e.g. callback
/// closures or delegates.
///
/// Since it is not possible to establish the equality of two `Behaviors` instances, `Behaviors`
/// will be set more often than `ContentConfigurableView.Content`, needing to be updated every time
/// the view's corresponding `EpoxyModeled` instance is updated. As such, setting behaviors should
/// be as lightweight as possible.
///
/// Properties of `Behaviors` should be mutually exclusive with the properties in the
/// `StyledView.Style` and `ContentConfigurableView.Content`.
///
/// - SeeAlso: `ContentConfigurableView`
/// - SeeAlso: `StyledView`
/// - SeeAlso: `EpoxyableView`
protocol BehaviorsConfigurableView: ViewType {
  /// The non-`Equatable` properties that can be changed over of the lifecycle this View's
  /// instances, e.g. callback closures or delegates.
  ///
  /// Defaults to `Never` for views that do not have `Behaviors`.
  associatedtype Behaviors = Never

  /// Updates the behaviors of this view to those in the given `behaviors`, else resets the
  /// behaviors if `nil`.
  ///
  /// Behaviors are optional as they must be "resettable" in order for Epoxy to reset the behaviors
  /// on your view when no behaviors are provided.
  func setBehaviors(_ behaviors: Self.Behaviors?)
}

// MARK: Defaults

extension BehaviorsConfigurableView where Behaviors == Never {
  func setBehaviors(_ behaviors: Never?) {
    switch behaviors {
    case nil:
      break
    }
  }
}
