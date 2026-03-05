//
//  Mask.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/8/19.
//

// MARK: - MaskMode

enum MaskMode: String, Codable {
  case add = "a"
  case subtract = "s"
  case intersect = "i"
  case lighten = "l"
  case darken = "d"
  case difference = "f"
  case none = "n"
}

// MARK: - Mask

final class Mask: Codable, DictionaryInitializable {

  // MARK: Lifecycle

  required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: Mask.CodingKeys.self)
    mode = try container.decodeIfPresent(MaskMode.self, forKey: .mode) ?? .add
    opacity = try container
      .decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .opacity) ?? KeyframeGroup(LottieVector1D(100))
    shape = try container.decode(KeyframeGroup<BezierPath>.self, forKey: .shape)
    inverted = try container.decodeIfPresent(Bool.self, forKey: .inverted) ?? false
    expansion = try container
      .decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .expansion) ?? KeyframeGroup(LottieVector1D(0))
  }

  init(dictionary: [String: Any]) throws {
    if
      let modeRawType = dictionary[CodingKeys.mode.rawValue] as? String,
      let mode = MaskMode(rawValue: modeRawType)
    {
      self.mode = mode
    } else {
      mode = .add
    }
    if let opacityDictionary = dictionary[CodingKeys.opacity.rawValue] as? [String: Any] {
      opacity = try KeyframeGroup<LottieVector1D>(dictionary: opacityDictionary)
    } else {
      opacity = KeyframeGroup(LottieVector1D(100))
    }
    let shapeDictionary: [String: Any] = try dictionary.value(for: CodingKeys.shape)
    shape = try KeyframeGroup<BezierPath>(dictionary: shapeDictionary)
    inverted = (try? dictionary.value(for: CodingKeys.inverted)) ?? false
    if let expansionDictionary = dictionary[CodingKeys.expansion.rawValue] as? [String: Any] {
      expansion = try KeyframeGroup<LottieVector1D>(dictionary: expansionDictionary)
    } else {
      expansion = KeyframeGroup(LottieVector1D(0))
    }
  }

  // MARK: Internal

  enum CodingKeys: String, CodingKey {
    case mode
    case opacity = "o"
    case inverted = "inv"
    case shape = "pt"
    case expansion = "x"
  }

  let mode: MaskMode

  let opacity: KeyframeGroup<LottieVector1D>

  let shape: KeyframeGroup<BezierPath>

  let inverted: Bool

  let expansion: KeyframeGroup<LottieVector1D>
}
