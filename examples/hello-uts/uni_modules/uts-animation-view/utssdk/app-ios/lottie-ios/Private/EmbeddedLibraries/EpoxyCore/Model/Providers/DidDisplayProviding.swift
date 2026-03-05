// Created by eric_horacek on 1/6/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

// MARK: - DidDisplayProviding

/// A sentinel protocol for enabling an `CallbackContextEpoxyModeled` to provide a `didDisplay`
/// closure property.
///
/// - SeeAlso: `WillDisplayProviding`
/// - SeeAlso: `DidEndDisplayingProviding`
protocol DidDisplayProviding { }

// MARK: - CallbackContextEpoxyModeled

extension CallbackContextEpoxyModeled where Self: DidDisplayProviding {

  // MARK: Internal

  /// A closure that's called after a view has been added to the view hierarchy following any
  /// appearance animations.
  typealias DidDisplay = (_ context: CallbackContext) -> Void

  /// A closure that's called after the view has been added to the view hierarchy following any
  /// appearance animations.
  var didDisplay: DidDisplay? {
    get { self[didDisplayProperty] }
    set { self[didDisplayProperty] = newValue }
  }

  /// Returns a copy of this model with the given did display closure called after the current did
  /// display closure of this model, if there is one.
  func didDisplay(_ value: DidDisplay?) -> Self {
    copy(updating: didDisplayProperty, to: value)
  }

  // MARK: Private

  private var didDisplayProperty: EpoxyModelProperty<DidDisplay?> {
    .init(keyPath: \Self.didDisplay, defaultValue: nil, updateStrategy: .chain())
  }
}
