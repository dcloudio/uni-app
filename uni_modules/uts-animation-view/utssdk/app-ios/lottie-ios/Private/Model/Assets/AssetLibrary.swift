//
//  AssetLibrary.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/9/19.
//

final class AssetLibrary: Codable, AnyInitializable, Sendable {

  // MARK: Lifecycle

  required init(from decoder: Decoder) throws {
    var container = try decoder.unkeyedContainer()
    var containerForKeys = container

    var decodedAssets = [String : Asset]()

    var imageAssets = [String : ImageAsset]()
    var precompAssets = [String : PrecompAsset]()

    while
      !container.isAtEnd,
      let keyContainer = try? containerForKeys.nestedContainer(keyedBy: PrecompAsset.CodingKeys.self)
    {
      if
        keyContainer.contains(.layers),
        let precompAsset = try? container.decode(PrecompAsset.self)
      {
        decodedAssets[precompAsset.id] = precompAsset
        precompAssets[precompAsset.id] = precompAsset
      } else if let imageAsset = try? container.decode(ImageAsset.self) {
        decodedAssets[imageAsset.id] = imageAsset
        imageAssets[imageAsset.id] = imageAsset
      }
    }
    assets = decodedAssets
    self.precompAssets = precompAssets
    self.imageAssets = imageAssets
  }

  init(value: Any) throws {
    guard let dictionaries = value as? [[String: Any]] else {
      throw InitializableError.invalidInput()
    }
    var decodedAssets = [String : Asset]()
    var imageAssets = [String : ImageAsset]()
    var precompAssets = [String : PrecompAsset]()
    for dictionary in dictionaries {
      if dictionary[PrecompAsset.CodingKeys.layers.rawValue] != nil {
        let asset = try PrecompAsset(dictionary: dictionary)
        decodedAssets[asset.id] = asset
        precompAssets[asset.id] = asset
      } else if let asset = try? ImageAsset(dictionary: dictionary) {
        decodedAssets[asset.id] = asset
        imageAssets[asset.id] = asset
      }
    }
    assets = decodedAssets
    self.precompAssets = precompAssets
    self.imageAssets = imageAssets
  }

  // MARK: Internal

  /// The Assets
  let assets: [String: Asset]

  let imageAssets: [String: ImageAsset]
  let precompAssets: [String: PrecompAsset]

  func encode(to encoder: Encoder) throws {
    var container = encoder.unkeyedContainer()
    try container.encode(contentsOf: Array(assets.values))
  }
}
