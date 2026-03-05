//
//  RoundedCorners.swift
//  Lottie
//
//  Created by Duolingo on 10/31/22.
//

// MARK: - RoundedCorners

final class RoundedCorners: ShapeItem {

  // MARK: Lifecycle

  required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: RoundedCorners.CodingKeys.self)
    radius = try
      container.decode(
        KeyframeGroup<LottieVector1D>.self,
        forKey: .radius)
    try super.init(from: decoder)
  }

  required init(dictionary: [String: Any]) throws {
    let radiusDictionary: [String: Any] = try dictionary.value(for: CodingKeys.radius)
    radius = try KeyframeGroup<LottieVector1D>(dictionary: radiusDictionary)
    try super.init(dictionary: dictionary)
  }

  // MARK: Internal

  /// The radius of rounded corners
  let radius: KeyframeGroup<LottieVector1D>

  override func encode(to encoder: Encoder) throws {
    try super.encode(to: encoder)
    var container = encoder.container(keyedBy: CodingKeys.self)
    try container.encode(radius, forKey: .radius)
  }

  // MARK: Private

  private enum CodingKeys: String, CodingKey {
    case radius = "r"
  }
}
