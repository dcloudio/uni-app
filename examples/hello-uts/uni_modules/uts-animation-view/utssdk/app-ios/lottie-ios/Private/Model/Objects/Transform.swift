//
//  Transform.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/7/19.
//

/// The animatable transform for a layer. Controls position, rotation, scale, and opacity.
final class Transform: Codable, DictionaryInitializable {

  // MARK: Lifecycle

  required init(from decoder: Decoder) throws {
    /// This manual override of decode is required because we want to throw an error
    /// in the case that there is not position data.
    let container = try decoder.container(keyedBy: Transform.CodingKeys.self)

    // AnchorPoint
    anchorPoint = try container
      .decodeIfPresent(KeyframeGroup<LottieVector3D>.self, forKey: .anchorPoint) ??
      KeyframeGroup(LottieVector3D(x: Double(0), y: 0, z: 0))

    // Position
    if container.contains(.positionX), container.contains(.positionY) {
      // Position dimensions are split into two keyframe groups
      positionX = try container.decode(KeyframeGroup<LottieVector1D>.self, forKey: .positionX)
      positionY = try container.decode(KeyframeGroup<LottieVector1D>.self, forKey: .positionY)
      position = nil
    } else if let positionKeyframes = try? container.decode(KeyframeGroup<LottieVector3D>.self, forKey: .position) {
      // Position dimensions are a single keyframe group.
      position = positionKeyframes
      positionX = nil
      positionY = nil
    } else if
      let positionContainer = try? container.nestedContainer(keyedBy: PositionCodingKeys.self, forKey: .position),
      let positionX = try? positionContainer.decode(KeyframeGroup<LottieVector1D>.self, forKey: .positionX),
      let positionY = try? positionContainer.decode(KeyframeGroup<LottieVector1D>.self, forKey: .positionY)
    {
      /// Position keyframes are split and nested.
      self.positionX = positionX
      self.positionY = positionY
      position = nil
    } else {
      /// Default value.
      position = KeyframeGroup(LottieVector3D(x: Double(0), y: 0, z: 0))
      positionX = nil
      positionY = nil
    }

    // Scale
    scale = try container
      .decodeIfPresent(KeyframeGroup<LottieVector3D>.self, forKey: .scale) ??
      KeyframeGroup(LottieVector3D(x: Double(100), y: 100, z: 100))

    // Rotation
    if let rotation = try container.decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .rotationX) {
      rotationX = rotation
    } else {
      rotationX = KeyframeGroup(LottieVector1D(0))
    }

    if let rotation = try container.decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .rotationY) {
      rotationY = rotation
    } else {
      rotationY = KeyframeGroup(LottieVector1D(0))
    }

    if let rotation = try container.decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .rotationZ) {
      rotationZ = rotation
    } else {
      rotationZ = try container
        .decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .rotation) ?? KeyframeGroup(LottieVector1D(0))
    }
    rotation = nil
    // Opacity
    opacity = try container
      .decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .opacity) ?? KeyframeGroup(LottieVector1D(100))
  }

  init(dictionary: [String: Any]) throws {
    if
      let anchorPointDictionary = dictionary[CodingKeys.anchorPoint.rawValue] as? [String: Any],
      let anchorPoint = try? KeyframeGroup<LottieVector3D>(dictionary: anchorPointDictionary)
    {
      self.anchorPoint = anchorPoint
    } else {
      anchorPoint = Transform.default.anchorPoint
    }

    if
      let xDictionary = dictionary[CodingKeys.positionX.rawValue] as? [String: Any],
      let yDictionary = dictionary[CodingKeys.positionY.rawValue] as? [String: Any]
    {
      positionX = try KeyframeGroup<LottieVector1D>(dictionary: xDictionary)
      positionY = try KeyframeGroup<LottieVector1D>(dictionary: yDictionary)
      position = nil
    } else if
      let positionDictionary = dictionary[CodingKeys.position.rawValue] as? [String: Any],
      positionDictionary[KeyframeGroup<LottieVector3D>.KeyframeWrapperKey.keyframeData.rawValue] != nil
    {
      position = try KeyframeGroup<LottieVector3D>(dictionary: positionDictionary)
      positionX = nil
      positionY = nil
    } else if
      let positionDictionary = dictionary[CodingKeys.position.rawValue] as? [String: Any],
      let xDictionary = positionDictionary[PositionCodingKeys.positionX.rawValue] as? [String: Any],
      let yDictionary = positionDictionary[PositionCodingKeys.positionY.rawValue] as? [String: Any]
    {
      positionX = try KeyframeGroup<LottieVector1D>(dictionary: xDictionary)
      positionY = try KeyframeGroup<LottieVector1D>(dictionary: yDictionary)
      position = nil
    } else {
      position = Transform.default.position
      positionX = nil
      positionY = nil
    }

    if
      let scaleDictionary = dictionary[CodingKeys.scale.rawValue] as? [String: Any],
      let scale = try? KeyframeGroup<LottieVector3D>(dictionary: scaleDictionary)
    {
      self.scale = scale
    } else {
      scale = Transform.default.scale
    }

    if
      let rotationDictionary = dictionary[CodingKeys.rotationX.rawValue] as? [String: Any],
      let rotation = try? KeyframeGroup<LottieVector1D>(dictionary: rotationDictionary)
    {
      rotationX = rotation
    } else {
      rotationX = Transform.default.rotationX
    }

    if
      let rotationDictionary = dictionary[CodingKeys.rotationY.rawValue] as? [String: Any],
      let rotation = try? KeyframeGroup<LottieVector1D>(dictionary: rotationDictionary)
    {
      rotationY = rotation
    } else {
      rotationY = Transform.default.rotationY
    }

    if
      let rotationDictionary = dictionary[CodingKeys.rotation.rawValue] as? [String: Any],
      let rotation = try? KeyframeGroup<LottieVector1D>(dictionary: rotationDictionary)
    {
      rotationZ = rotation
    } else if
      let rotationDictionary = dictionary[CodingKeys.rotationZ.rawValue] as? [String: Any],
      let rotation = try? KeyframeGroup<LottieVector1D>(dictionary: rotationDictionary)
    {
      rotationZ = rotation
    } else {
      rotationZ = Transform.default.rotationZ
    }
    rotation = nil
    if
      let opacityDictionary = dictionary[CodingKeys.opacity.rawValue] as? [String: Any],
      let opacity = try? KeyframeGroup<LottieVector1D>(dictionary: opacityDictionary)
    {
      self.opacity = opacity
    } else {
      opacity = Transform.default.opacity
    }
  }

  init(
    anchorPoint: KeyframeGroup<LottieVector3D>,
    position: KeyframeGroup<LottieVector3D>?,
    positionX: KeyframeGroup<LottieVector1D>?,
    positionY: KeyframeGroup<LottieVector1D>?,
    scale: KeyframeGroup<LottieVector3D>,
    rotationX: KeyframeGroup<LottieVector1D>,
    rotationY: KeyframeGroup<LottieVector1D>,
    rotationZ: KeyframeGroup<LottieVector1D>,
    opacity: KeyframeGroup<LottieVector1D>,
    rotation: KeyframeGroup<LottieVector1D>?)
  {
    self.anchorPoint = anchorPoint
    self.position = position
    self.positionX = positionX
    self.positionY = positionY
    self.scale = scale
    self.rotationX = rotationX
    self.rotationY = rotationY
    self.rotationZ = rotationZ
    self.opacity = opacity
    self.rotation = rotation
  }

  // MARK: Internal

  enum CodingKeys: String, CodingKey {
    case anchorPoint = "a"
    case position = "p"
    case positionX = "px"
    case positionY = "py"
    case scale = "s"
    case rotation = "r"
    case rotationX = "rx"
    case rotationY = "ry"
    case rotationZ = "rz"
    case opacity = "o"
  }

  enum PositionCodingKeys: String, CodingKey {
    case split = "s"
    case positionX = "x"
    case positionY = "y"
  }

  /// Default transform values to use if no transform is provided
  static var `default`: Transform {
    Transform(
      anchorPoint: KeyframeGroup(LottieVector3D(x: Double(0), y: 0, z: 0)),
      position: KeyframeGroup(LottieVector3D(x: Double(0), y: 0, z: 0)),
      positionX: nil,
      positionY: nil,
      scale: KeyframeGroup(LottieVector3D(x: Double(100), y: 100, z: 100)),
      rotationX: KeyframeGroup(LottieVector1D(0)),
      rotationY: KeyframeGroup(LottieVector1D(0)),
      rotationZ: KeyframeGroup(LottieVector1D(0)),
      opacity: KeyframeGroup(LottieVector1D(100)),
      rotation: nil)
  }

  /// The anchor point of the transform.
  let anchorPoint: KeyframeGroup<LottieVector3D>

  /// The position of the transform. This is nil if the position data was split.
  let position: KeyframeGroup<LottieVector3D>?

  /// The positionX of the transform. This is nil if the position property is set.
  let positionX: KeyframeGroup<LottieVector1D>?

  /// The positionY of the transform. This is nil if the position property is set.
  let positionY: KeyframeGroup<LottieVector1D>?

  /// The scale of the transform.
  let scale: KeyframeGroup<LottieVector3D>

  /// The rotation of the transform on X axis.
  let rotationX: KeyframeGroup<LottieVector1D>

  /// The rotation of the transform on Y axis.
  let rotationY: KeyframeGroup<LottieVector1D>

  /// The rotation of the transform on Z axis.
  let rotationZ: KeyframeGroup<LottieVector1D>

  /// The opacity of the transform.
  let opacity: KeyframeGroup<LottieVector1D>

  // MARK: Private

  /// Here for the CodingKeys.rotation = "r". `r` and `rz` are the same.
  private let rotation: KeyframeGroup<LottieVector1D>?
}
