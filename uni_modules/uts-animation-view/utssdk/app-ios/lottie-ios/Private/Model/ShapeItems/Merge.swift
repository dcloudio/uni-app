//
//  Merge.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/8/19.
//

// MARK: - MergeMode

enum MergeMode: Int, Codable, Sendable {
  case none
  case merge
  case add
  case subtract
  case intersect
  case exclude
}

// MARK: - Merge

final class Merge: ShapeItem {

  // MARK: Lifecycle

  required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: Merge.CodingKeys.self)
    mode = try container.decode(MergeMode.self, forKey: .mode)
    try super.init(from: decoder)
  }

  required init(dictionary: [String: Any]) throws {
    let modeRawType: Int = try dictionary.value(for: CodingKeys.mode)
    guard let mode = MergeMode(rawValue: modeRawType) else {
      throw InitializableError.invalidInput()
    }
    self.mode = mode
    try super.init(dictionary: dictionary)
  }

  // MARK: Internal

  /// The mode of the merge path
  let mode: MergeMode

  override func encode(to encoder: Encoder) throws {
    try super.encode(to: encoder)
    var container = encoder.container(keyedBy: CodingKeys.self)
    try container.encode(mode, forKey: .mode)
  }

  // MARK: Private

  private enum CodingKeys: String, CodingKey {
    case mode = "mm"
  }
}
