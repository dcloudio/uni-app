//
//  Font.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/9/19.
//

// MARK: - Font

final class Font: Codable, Sendable, DictionaryInitializable {

  // MARK: Lifecycle

  init(dictionary: [String: Any]) throws {
    name = try dictionary.value(for: CodingKeys.name)
    familyName = try dictionary.value(for: CodingKeys.familyName)
    style = try dictionary.value(for: CodingKeys.style)
    ascent = try dictionary.value(for: CodingKeys.ascent)
  }

  // MARK: Internal

  let name: String
  let familyName: String
  let style: String
  let ascent: Double

  // MARK: Private

  private enum CodingKeys: String, CodingKey {
    case name = "fName"
    case familyName = "fFamily"
    case style = "fStyle"
    case ascent
  }

}

// MARK: - FontList

/// A list of fonts
final class FontList: Codable, Sendable, DictionaryInitializable {

  // MARK: Lifecycle

  init(dictionary: [String: Any]) throws {
    let fontDictionaries: [[String: Any]] = try dictionary.value(for: CodingKeys.fonts)
    fonts = try fontDictionaries.map { try Font(dictionary: $0) }
  }

  // MARK: Internal

  enum CodingKeys: String, CodingKey {
    case fonts = "list"
  }

  let fonts: [Font]

}
