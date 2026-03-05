// Created by Cal Stephens on 8/14/23.
// Copyright © 2023 Airbnb Inc. All rights reserved.

final class DropShadowStyle: LayerStyle {

  // MARK: Lifecycle

  required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: DropShadowStyle.CodingKeys.self)
    opacity = try container.decode(KeyframeGroup<LottieVector1D>.self, forKey: .opacity)
    color = try container.decode(KeyframeGroup<LottieColor>.self, forKey: .color)
    angle = try container.decode(KeyframeGroup<LottieVector1D>.self, forKey: .angle)
    size = try container.decode(KeyframeGroup<LottieVector1D>.self, forKey: .size)
    distance = try container.decode(KeyframeGroup<LottieVector1D>.self, forKey: .distance)
    try super.init(from: decoder)
  }

  required init(dictionary: [String: Any]) throws {
    let opacityDictionary: [String: Any] = try dictionary.value(for: CodingKeys.opacity)
    opacity = try KeyframeGroup<LottieVector1D>(dictionary: opacityDictionary)
    let colorDictionary: [String: Any] = try dictionary.value(for: CodingKeys.color)
    color = try KeyframeGroup<LottieColor>(dictionary: colorDictionary)
    let angleDictionary: [String: Any] = try dictionary.value(for: CodingKeys.angle)
    angle = try KeyframeGroup<LottieVector1D>(dictionary: angleDictionary)
    let sizeDictionary: [String: Any] = try dictionary.value(for: CodingKeys.size)
    size = try KeyframeGroup<LottieVector1D>(dictionary: sizeDictionary)
    let distanceDictionary: [String: Any] = try dictionary.value(for: CodingKeys.distance)
    distance = try KeyframeGroup<LottieVector1D>(dictionary: distanceDictionary)
    try super.init(dictionary: dictionary)
  }

  // MARK: Internal

  /// The opacity of the drop shadow
  let opacity: KeyframeGroup<LottieVector1D>

  /// The color of the drop shadow
  let color: KeyframeGroup<LottieColor>

  /// The angle of the drop shadow, in degrees,
  /// with `0` representing a shadow straight-down from the layer
  /// (`offsetY=distance, offsetX=0`).
  let angle: KeyframeGroup<LottieVector1D>

  /// The size of the drop shadow
  let size: KeyframeGroup<LottieVector1D>

  /// The distance of the drop shadow
  let distance: KeyframeGroup<LottieVector1D>

  override func encode(to encoder: Encoder) throws {
    try super.encode(to: encoder)
    var container = encoder.container(keyedBy: CodingKeys.self)
    try container.encode(opacity, forKey: .opacity)
    try container.encode(color, forKey: .color)
    try container.encode(angle, forKey: .angle)
    try container.encode(size, forKey: .size)
    try container.encode(distance, forKey: .distance)
  }

  // MARK: Private

  private enum CodingKeys: String, CodingKey {
    case color = "c"
    case opacity = "o"
    case angle = "a"
    case size = "s"
    case distance = "d"
  }
}
