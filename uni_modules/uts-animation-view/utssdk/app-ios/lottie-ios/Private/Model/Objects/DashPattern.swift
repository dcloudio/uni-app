//
//  DashPattern.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/22/19.
//

// MARK: - DashElementType

enum DashElementType: String, Codable {
  case offset = "o"
  case dash = "d"
  case gap = "g"
}

// MARK: - DashElement

final class DashElement: Codable, DictionaryInitializable {

  // MARK: Lifecycle

  init(dictionary: [String: Any]) throws {
    let typeRawValue: String = try dictionary.value(for: CodingKeys.type)
    guard let type = DashElementType(rawValue: typeRawValue) else {
      throw InitializableError.invalidInput()
    }
    self.type = type
    let valueDictionary: [String: Any] = try dictionary.value(for: CodingKeys.value)
    value = try KeyframeGroup<LottieVector1D>(dictionary: valueDictionary)
  }

  // MARK: Internal

  enum CodingKeys: String, CodingKey {
    case type = "n"
    case value = "v"
  }

  let type: DashElementType
  let value: KeyframeGroup<LottieVector1D>

}
