// Created by eric_horacek on 12/1/20.
// Copyright © 2020 Airbnb Inc. All rights reserved.

// MARK: - SetContentProviding

/// A sentinel protocol for enabling an `CallbackContextEpoxyModeled` to provide a `setContent`
/// closure property.
protocol SetContentProviding { }

// MARK: - CallbackContextEpoxyModeled

extension CallbackContextEpoxyModeled where Self: SetContentProviding {

  // MARK: Internal

  /// A closure that's called to set the content on this model's view when it is first created and
  /// subsequently when the content changes.
  typealias SetContent = (CallbackContext) -> Void

  /// A closure that's called to set the content on this model's view when it is first created and
  /// subsequently when the content changes.
  var setContent: SetContent? {
    get { self[setContentProperty] }
    set { self[setContentProperty] = newValue }
  }

  /// Returns a copy of this model with the given setContent view closure called after the current
  /// setContent view closure of this model, if there is one.
  func setContent(_ value: SetContent?) -> Self {
    copy(updating: setContentProperty, to: value)
  }

  // MARK: Private

  private var setContentProperty: EpoxyModelProperty<SetContent?> {
    .init(keyPath: \Self.setContent, defaultValue: nil, updateStrategy: .chain())
  }
}
