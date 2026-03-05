// Created by Cal Stephens on 8/14/23.
// Copyright © 2023 Airbnb Inc. All rights reserved.

final class DropShadowEffect: LayerEffect {

  // MARK: Lifecycle

  required init(from decoder: Decoder) throws {
    try super.init(from: decoder)
  }

  required init(dictionary: [String: Any]) throws {
    try super.init(dictionary: dictionary)
  }

  // MARK: Internal

  /// The color of the drop shadow
  var color: ColorEffectValue? {
    value(named: "Shadow Color")
  }

  /// Opacity between 0 and 255
  var opacity: Vector1DEffectValue? {
    value(named: "Opacity")
  }

  /// The direction / angle of the drop shadow, in degrees
  var direction: Vector1DEffectValue? {
    value(named: "Direction")
  }

  /// The distance of the drop shadow
  var distance: Vector1DEffectValue? {
    value(named: "Distance")
  }

  /// The softness of the drop shadow
  var softness: Vector1DEffectValue? {
    value(named: "Softness")
  }

}
