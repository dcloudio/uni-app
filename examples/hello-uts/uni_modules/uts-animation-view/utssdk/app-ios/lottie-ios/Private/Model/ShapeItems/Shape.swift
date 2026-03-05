//
//  VectorShape.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/8/19.
//

/// An item that defines an custom shape
final class Shape: ShapeItem {

  // MARK: Lifecycle

  required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: Shape.CodingKeys.self)
    path = try container.decode(KeyframeGroup<BezierPath>.self, forKey: .path)
    direction = try container.decodeIfPresent(PathDirection.self, forKey: .direction)
    try super.init(from: decoder)
  }

  required init(dictionary: [String: Any]) throws {
    let pathDictionary: [String: Any] = try dictionary.value(for: CodingKeys.path)
    path = try KeyframeGroup<BezierPath>(dictionary: pathDictionary)
    if
      let directionRawValue = dictionary[CodingKeys.direction.rawValue] as? Int,
      let direction = PathDirection(rawValue: directionRawValue)
    {
      self.direction = direction
    } else {
      direction = nil
    }
    try super.init(dictionary: dictionary)
  }

  // MARK: Internal

  /// The Path
  let path: KeyframeGroup<BezierPath>

  let direction: PathDirection?

  override func encode(to encoder: Encoder) throws {
    try super.encode(to: encoder)
    var container = encoder.container(keyedBy: CodingKeys.self)
    try container.encode(path, forKey: .path)
    try container.encodeIfPresent(direction, forKey: .direction)
  }

  // MARK: Private

  private enum CodingKeys: String, CodingKey {
    case path = "ks"
    case direction = "d"
  }
}
