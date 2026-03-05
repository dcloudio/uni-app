//
//  Marker.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/9/19.
//

/// A time marker
final class Marker: Codable, Sendable, DictionaryInitializable {

  // MARK: Lifecycle

  init(dictionary: [String: Any]) throws {
    name = try dictionary.value(for: CodingKeys.name)
    frameTime = try dictionary.value(for: CodingKeys.frameTime)
    durationFrameTime = try dictionary.value(for: CodingKeys.durationFrameTime)
  }

  // MARK: Internal

  enum CodingKeys: String, CodingKey {
    case name = "cm"
    case frameTime = "tm"
    case durationFrameTime = "dr"
  }

  /// The Marker Name
  let name: String

  /// The Frame time of the marker
  let frameTime: AnimationFrameTime

  /// The duration of the marker, in frames.
  let durationFrameTime: AnimationFrameTime
}
