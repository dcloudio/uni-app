//
//  ImageAsset.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/9/19.
//

import CoreGraphics
import Foundation

#if canImport(UIKit)
import UIKit
#elseif canImport(AppKit)
import AppKit
#endif

// MARK: - ImageAsset

public final class ImageAsset: Asset {

  // MARK: Lifecycle

  required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: ImageAsset.CodingKeys.self)
    name = try container.decode(String.self, forKey: .name)
    directory = try container.decode(String.self, forKey: .directory)
    width = try container.decode(Double.self, forKey: .width)
    height = try container.decode(Double.self, forKey: .height)
    try super.init(from: decoder)
  }

  required init(dictionary: [String: Any]) throws {
    name = try dictionary.value(for: CodingKeys.name)
    directory = try dictionary.value(for: CodingKeys.directory)
    width = try dictionary.value(for: CodingKeys.width)
    height = try dictionary.value(for: CodingKeys.height)
    try super.init(dictionary: dictionary)
  }

  // MARK: Public

  /// Image name
  public let name: String

  /// Image Directory
  public let directory: String

  /// Image Size
  public let width: Double

  public let height: Double

  override public func encode(to encoder: Encoder) throws {
    try super.encode(to: encoder)
    var container = encoder.container(keyedBy: CodingKeys.self)
    try container.encode(name, forKey: .name)
    try container.encode(directory, forKey: .directory)
    try container.encode(width, forKey: .width)
    try container.encode(height, forKey: .height)
  }

  // MARK: Internal

  enum CodingKeys: String, CodingKey {
    case name = "p"
    case directory = "u"
    case width = "w"
    case height = "h"
  }
}

extension Data {

  // MARK: Lifecycle

  /// Initializes `Data` from an `ImageAsset`.
  ///
  /// Returns nil when the input is not recognized as valid Data URL.
  /// - parameter imageAsset: The image asset that contains Data URL.
  init?(imageAsset: ImageAsset) {
    self.init(dataString: imageAsset.name)
  }

  /// Initializes `Data` from a [Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) String.
  ///
  /// Returns nil when the input is not recognized as valid Data URL.
  /// - parameter dataString: The data string to parse.
  /// - parameter options: Options for the string parsing. Default value is `[]`.
  init?(dataString: String, options: DataURLReadOptions = []) {
    let trimmedDataString = dataString.trimmingCharacters(in: .whitespacesAndNewlines)
    guard
      dataString.hasPrefix("data:"),
      let url = URL(string: trimmedDataString)
    else {
      return nil
    }
    // The code below is needed because Data(contentsOf:) floods logs
    // with messages since url doesn't have a host. This only fixes flooding logs
    // when data inside Data URL is base64 encoded.
    if
      let base64Range = trimmedDataString.range(of: ";base64,"),
      !options.contains(DataURLReadOptions.legacy)
    {
      let encodedString = String(trimmedDataString[base64Range.upperBound...])
      self.init(base64Encoded: encodedString)
    } else {
      try? self.init(contentsOf: url)
    }
  }

  // MARK: Internal

  struct DataURLReadOptions: OptionSet {
    let rawValue: Int

    /// Will read Data URL using Data(contentsOf:)
    static let legacy = DataURLReadOptions(rawValue: 1 << 0)
  }

}

extension ImageAsset {
  /// A `CGImage` loaded from this asset if represented using a Base 64 encoding
  var base64Image: CGImage? {
    guard let data = Data(imageAsset: self) else { return nil }

    #if canImport(UIKit)
    return UIImage(data: data)?.cgImage
    #elseif canImport(AppKit)
    return NSImage(data: data)?.lottie_CGImage
    #endif
  }
}
