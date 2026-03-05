//
//  PrecompAsset.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/9/19.
//

final class PrecompAsset: Asset {

  // MARK: Lifecycle

  required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: PrecompAsset.CodingKeys.self)
    layers = try container.decode([LayerModel].self, ofFamily: LayerType.self, forKey: .layers)
    try super.init(from: decoder)
  }

  required init(dictionary: [String: Any]) throws {
    let layerDictionaries: [[String: Any]] = try dictionary.value(for: CodingKeys.layers)
    layers = try [LayerModel].fromDictionaries(layerDictionaries)
    try super.init(dictionary: dictionary)
  }

  // MARK: Internal

  enum CodingKeys: String, CodingKey {
    case layers
  }

  /// Layers of the precomp
  let layers: [LayerModel]

  override func encode(to encoder: Encoder) throws {
    try super.encode(to: encoder)
    var container = encoder.container(keyedBy: CodingKeys.self)
    try container.encode(layers, forKey: .layers)
  }
}
