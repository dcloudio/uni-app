// Created by eric_horacek on 12/2/20.
// Copyright © 2020 Airbnb Inc. All rights reserved.

// MARK: - SetBehaviorsProviding

/// A sentinel protocol for enabling an `CallbackContextEpoxyModeled` to provide a `setBehaviors`
/// closure property.
protocol SetBehaviorsProviding { }

// MARK: - CallbackContextEpoxyModeled

extension CallbackContextEpoxyModeled where Self: SetBehaviorsProviding {

  // MARK: Internal

  /// A closure that's called to set the content on this model's view with behaviors (e.g. tap handler
  /// closures) whenever this model is updated.
  typealias SetBehaviors = (CallbackContext) -> Void

  /// A closure that's called to set the content on this model's view with behaviors (e.g. tap handler
  /// closures) whenever this model is updated.
  var setBehaviors: SetBehaviors? {
    get { self[setBehaviorsProperty] }
    set { self[setBehaviorsProperty] = newValue }
  }

  /// Returns a copy of this model with the set behaviors closure called after the current set
  /// behaviors closure of this model, if there is one.
  func setBehaviors(_ value: SetBehaviors?) -> Self {
    copy(updating: setBehaviorsProperty, to: value)
  }

  // MARK: Private

  private var setBehaviorsProperty: EpoxyModelProperty<SetBehaviors?> {
    .init(keyPath: \Self.setBehaviors, defaultValue: nil, updateStrategy: .chain())
  }
}
