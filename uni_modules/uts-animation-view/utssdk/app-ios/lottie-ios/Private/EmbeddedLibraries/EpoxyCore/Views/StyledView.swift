//  Created by Laura Skelton on 4/14/16.
//  Copyright © 2016 Airbnb. All rights reserved.

// MARK: - StyledView

/// A view that can be initialized with a `Style` instance that contains the view's invariant
/// configuration parameters, e.g. the `UIButton.ButtonType` of a `UIButton`.
///
/// A `Style` is expected to be invariant over the lifecycle of the view; it should not possible to
/// change the `Style` of a view after it is created. All variant properties of the view should
/// either be included in the `ContentConfigurableView.Content` if they are `Equatable` (e.g. a
/// title `String`) or the `BehaviorsConfigurableView.Behaviors` if they are not (e.g. a callback
/// closure).
///
/// A `Style` is `Hashable` to allow views of the same type with equal `Style`s to be reused by
/// establishing whether their invariant `Style` instances are equal.
///
/// Properties of `Style` should be mutually exclusive with the properties of the
/// `ContentConfigurableView.Content` and `BehaviorsConfigurableView.Behaviors`.
///
/// - SeeAlso: `ContentConfigurableView`
/// - SeeAlso: `BehaviorsConfigurableView`
/// - SeeAlso: `EpoxyableView`
protocol StyledView: ViewType {
  /// The style type of this view, passed into its initializer to configure the resulting instance.
  ///
  /// Defaults to `Never` for views that do not have a `Style`.
  associatedtype Style: Hashable = Never

  /// Creates an instance of this view configured with the given `Style` instance.
  init(style: Style)
}

// MARK: Defaults

extension StyledView where Style == Never {
  init(style: Never) {
    // An empty switch is required to silence the "'self.init' isn't called on all paths before
    // returning from initializer" error.
    switch style { }
  }
}
