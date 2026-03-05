// Created by eric_horacek on 12/15/20.
// Copyright © 2020 Airbnb Inc. All rights reserved.

// MARK: - WillDisplayProviding

/// A sentinel protocol for enabling an `CallbackContextEpoxyModeled` to provide a `willDisplay`
/// closure property.
///
/// - SeeAlso: `DidDisplayProviding`
/// - SeeAlso: `DidEndDisplayingProviding`
protocol WillDisplayProviding { }

// MARK: - CallbackContextEpoxyModeled

extension CallbackContextEpoxyModeled where Self: WillDisplayProviding {

  // MARK: Internal

  /// A closure that's called when a view is about to be displayed, before it has been added to the
  /// view hierarcy.
  typealias WillDisplay = (_ context: CallbackContext) -> Void

  /// A closure that's called when the view is about to be displayed, before it has been added to
  /// the view hierarcy.
  var willDisplay: WillDisplay? {
    get { self[willDisplayProperty] }
    set { self[willDisplayProperty] = newValue }
  }

  /// Returns a copy of this model with the given will display closure called after the current will
  /// display closure of this model, if there is one.
  func willDisplay(_ value: WillDisplay?) -> Self {
    copy(updating: willDisplayProperty, to: value)
  }

  // MARK: Private

  private var willDisplayProperty: EpoxyModelProperty<WillDisplay?> {
    .init(keyPath: \Self.willDisplay, defaultValue: nil, updateStrategy: .chain())
  }
}
