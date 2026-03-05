//
//  LottieAnimation.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/7/19.
//

import Foundation

// MARK: - CoordinateSpace

public enum CoordinateSpace: Int, Codable, Sendable {
  case type2d
  case type3d
}

// MARK: - LottieAnimation

/// The `LottieAnimation` model is the top level model object in Lottie.
///
/// A `LottieAnimation` holds all of the animation data backing a Lottie Animation.
/// Codable, see JSON schema [here](https://github.com/airbnb/lottie-web/tree/master/docs/json).
public final class LottieAnimation: Codable, Sendable, DictionaryInitializable {

  // MARK: Lifecycle

  required public init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: LottieAnimation.CodingKeys.self)
    version = try container.decode(String.self, forKey: .version)
    type = try container.decodeIfPresent(CoordinateSpace.self, forKey: .type) ?? .type2d
    startFrame = try container.decode(AnimationFrameTime.self, forKey: .startFrame)
    endFrame = try container.decode(AnimationFrameTime.self, forKey: .endFrame)
    framerate = try container.decode(Double.self, forKey: .framerate)
    width = try container.decode(Double.self, forKey: .width)
    height = try container.decode(Double.self, forKey: .height)
    layers = try container.decode([LayerModel].self, ofFamily: LayerType.self, forKey: .layers)
    glyphs = try container.decodeIfPresent([Glyph].self, forKey: .glyphs)
    fonts = try container.decodeIfPresent(FontList.self, forKey: .fonts)
    assetLibrary = try container.decodeIfPresent(AssetLibrary.self, forKey: .assetLibrary)
    markers = try container.decodeIfPresent([Marker].self, forKey: .markers)

    if let markers {
      var markerMap: [String: Marker] = [:]
      for marker in markers {
        markerMap[marker.name] = marker
      }
      self.markerMap = markerMap
    } else {
      markerMap = nil
    }
  }

  public init(dictionary: [String: Any]) throws {
    version = try dictionary.value(for: CodingKeys.version)
    if
      let typeRawValue = dictionary[CodingKeys.type.rawValue] as? Int,
      let type = CoordinateSpace(rawValue: typeRawValue)
    {
      self.type = type
    } else {
      type = .type2d
    }
    startFrame = try dictionary.value(for: CodingKeys.startFrame)
    endFrame = try dictionary.value(for: CodingKeys.endFrame)
    framerate = try dictionary.value(for: CodingKeys.framerate)
    width = try dictionary.value(for: CodingKeys.width)
    height = try dictionary.value(for: CodingKeys.height)
    let layerDictionaries: [[String: Any]] = try dictionary.value(for: CodingKeys.layers)
    layers = try [LayerModel].fromDictionaries(layerDictionaries)
    if let glyphDictionaries = dictionary[CodingKeys.glyphs.rawValue] as? [[String: Any]] {
      glyphs = try glyphDictionaries.map { try Glyph(dictionary: $0) }
    } else {
      glyphs = nil
    }
    if let fontsDictionary = dictionary[CodingKeys.fonts.rawValue] as? [String: Any] {
      fonts = try FontList(dictionary: fontsDictionary)
    } else {
      fonts = nil
    }
    if let assetLibraryDictionaries = dictionary[CodingKeys.assetLibrary.rawValue] as? [[String: Any]] {
      assetLibrary = try AssetLibrary(value: assetLibraryDictionaries)
    } else {
      assetLibrary = nil
    }
    if let markerDictionaries = dictionary[CodingKeys.markers.rawValue] as? [[String: Any]] {
      let markers = try markerDictionaries.map { try Marker(dictionary: $0) }
      var markerMap: [String: Marker] = [:]
      for marker in markers {
        markerMap[marker.name] = marker
      }
      self.markers = markers
      self.markerMap = markerMap
    } else {
      markers = nil
      markerMap = nil
    }
  }

  // MARK: Public

  /// The start time of the composition in frameTime.
  public let startFrame: AnimationFrameTime

  /// The end time of the composition in frameTime.
  public let endFrame: AnimationFrameTime

  /// The frame rate of the composition.
  public let framerate: Double

  /// Return all marker names, in order, or an empty list if none are specified
  public var markerNames: [String] {
    guard let markers else { return [] }
    return markers.map { $0.name }
  }

  // MARK: Internal

  enum CodingKeys: String, CodingKey {
    case version = "v"
    case type = "ddd"
    case startFrame = "ip"
    case endFrame = "op"
    case framerate = "fr"
    case width = "w"
    case height = "h"
    case layers
    case glyphs = "chars"
    case fonts
    case assetLibrary = "assets"
    case markers
  }

  /// The version of the JSON Schema.
  let version: String

  /// The coordinate space of the composition.
  let type: CoordinateSpace

  /// The height of the composition in points.
  let width: Double

  /// The width of the composition in points.
  let height: Double

  /// The list of animation layers
  let layers: [LayerModel]

  /// The list of glyphs used for text rendering
  let glyphs: [Glyph]?

  /// The list of fonts used for text rendering
  let fonts: FontList?

  /// Asset Library
  let assetLibrary: AssetLibrary?

  /// Markers
  let markers: [Marker]?
  let markerMap: [String: Marker]?

  /// The marker to use if "reduced motion" is enabled.
  /// Supported marker names are case insensitive, and include:
  ///  - reduced motion
  ///  - reducedMotion
  ///  - reduced_motion
  ///  - reduced-motion
  var reducedMotionMarker: Marker? {
    let allowedReducedMotionMarkerNames = Set([
      "reduced motion",
      "reduced_motion",
      "reduced-motion",
      "reducedmotion",
    ])

    return markers?.first(where: { marker in
      allowedReducedMotionMarkerNames.contains(marker.name.lowercased())
    })
  }
}
