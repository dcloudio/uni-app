//
//  Repeater.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/8/19.
//

final class Repeater: ShapeItem {

  // MARK: Lifecycle

  required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: Repeater.CodingKeys.self)
    copies = try container
      .decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .copies) ?? KeyframeGroup(LottieVector1D(0))
    offset = try container
      .decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .offset) ?? KeyframeGroup(LottieVector1D(0))
    let transformContainer = try container.nestedContainer(keyedBy: TransformKeys.self, forKey: .transform)
    startOpacity = try transformContainer
      .decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .startOpacity) ?? KeyframeGroup(LottieVector1D(100))
    endOpacity = try transformContainer
      .decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .endOpacity) ?? KeyframeGroup(LottieVector1D(100))
    if let rotation = try transformContainer.decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .rotation) {
      rotationZ = rotation
    } else if let rotation = try transformContainer.decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .rotationZ) {
      rotationZ = rotation
    } else {
      rotationZ = KeyframeGroup(LottieVector1D(0))
    }

    rotationX = try transformContainer
      .decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .rotationX) ?? KeyframeGroup(LottieVector1D(0))
    rotationY = try transformContainer
      .decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .rotationY) ?? KeyframeGroup(LottieVector1D(0))

    position = try transformContainer
      .decodeIfPresent(KeyframeGroup<LottieVector3D>.self, forKey: .position) ??
      KeyframeGroup(LottieVector3D(x: Double(0), y: 0, z: 0))
    anchorPoint = try transformContainer
      .decodeIfPresent(KeyframeGroup<LottieVector3D>.self, forKey: .anchorPoint) ??
      KeyframeGroup(LottieVector3D(x: Double(0), y: 0, z: 0))
    scale = try transformContainer
      .decodeIfPresent(KeyframeGroup<LottieVector3D>.self, forKey: .scale) ??
      KeyframeGroup(LottieVector3D(x: Double(100), y: 100, z: 100))
    try super.init(from: decoder)
  }

  required init(dictionary: [String: Any]) throws {
    if let copiesDictionary = dictionary[CodingKeys.copies.rawValue] as? [String: Any] {
      copies = try KeyframeGroup<LottieVector1D>(dictionary: copiesDictionary)
    } else {
      copies = KeyframeGroup(LottieVector1D(0))
    }
    if let offsetDictionary = dictionary[CodingKeys.offset.rawValue] as? [String: Any] {
      offset = try KeyframeGroup<LottieVector1D>(dictionary: offsetDictionary)
    } else {
      offset = KeyframeGroup(LottieVector1D(0))
    }
    let transformDictionary: [String: Any] = try dictionary.value(for: CodingKeys.transform)
    if let startOpacityDictionary = transformDictionary[TransformKeys.startOpacity.rawValue] as? [String: Any] {
      startOpacity = try KeyframeGroup<LottieVector1D>(dictionary: startOpacityDictionary)
    } else {
      startOpacity = KeyframeGroup(LottieVector1D(100))
    }
    if let endOpacityDictionary = transformDictionary[TransformKeys.endOpacity.rawValue] as? [String: Any] {
      endOpacity = try KeyframeGroup<LottieVector1D>(dictionary: endOpacityDictionary)
    } else {
      endOpacity = KeyframeGroup(LottieVector1D(100))
    }
    if let rotationDictionary = transformDictionary[TransformKeys.rotationX.rawValue] as? [String: Any] {
      rotationX = try KeyframeGroup<LottieVector1D>(dictionary: rotationDictionary)
    } else {
      rotationX = KeyframeGroup(LottieVector1D(0))
    }
    if let rotationDictionary = transformDictionary[TransformKeys.rotationY.rawValue] as? [String: Any] {
      rotationY = try KeyframeGroup<LottieVector1D>(dictionary: rotationDictionary)
    } else {
      rotationY = KeyframeGroup(LottieVector1D(0))
    }
    if let rotationDictionary = transformDictionary[TransformKeys.rotation.rawValue] as? [String: Any] {
      rotationZ = try KeyframeGroup<LottieVector1D>(dictionary: rotationDictionary)
    } else if let rotationDictionary = transformDictionary[TransformKeys.rotationZ.rawValue] as? [String: Any] {
      rotationZ = try KeyframeGroup<LottieVector1D>(dictionary: rotationDictionary)
    } else {
      rotationZ = KeyframeGroup(LottieVector1D(0))
    }
    if let positionDictionary = transformDictionary[TransformKeys.position.rawValue] as? [String: Any] {
      position = try KeyframeGroup<LottieVector3D>(dictionary: positionDictionary)
    } else {
      position = KeyframeGroup(LottieVector3D(x: Double(0), y: 0, z: 0))
    }
    if let anchorPointDictionary = transformDictionary[TransformKeys.anchorPoint.rawValue] as? [String: Any] {
      anchorPoint = try KeyframeGroup<LottieVector3D>(dictionary: anchorPointDictionary)
    } else {
      anchorPoint = KeyframeGroup(LottieVector3D(x: Double(0), y: 0, z: 0))
    }
    if let scaleDictionary = transformDictionary[TransformKeys.scale.rawValue] as? [String: Any] {
      scale = try KeyframeGroup<LottieVector3D>(dictionary: scaleDictionary)
    } else {
      scale = KeyframeGroup(LottieVector3D(x: Double(100), y: 100, z: 100))
    }
    try super.init(dictionary: dictionary)
  }

  // MARK: Internal

  /// The number of copies to repeat
  let copies: KeyframeGroup<LottieVector1D>

  /// The offset of each copy
  let offset: KeyframeGroup<LottieVector1D>

  /// Start Opacity
  let startOpacity: KeyframeGroup<LottieVector1D>

  /// End opacity
  let endOpacity: KeyframeGroup<LottieVector1D>

  /// The rotation on X axis
  let rotationX: KeyframeGroup<LottieVector1D>

  /// The rotation on Y axis
  let rotationY: KeyframeGroup<LottieVector1D>

  /// The rotation on Z axis
  let rotationZ: KeyframeGroup<LottieVector1D>

  /// Anchor Point
  let anchorPoint: KeyframeGroup<LottieVector3D>

  /// Position
  let position: KeyframeGroup<LottieVector3D>

  /// Scale
  let scale: KeyframeGroup<LottieVector3D>

  override func encode(to encoder: Encoder) throws {
    try super.encode(to: encoder)
    var container = encoder.container(keyedBy: CodingKeys.self)
    try container.encode(copies, forKey: .copies)
    try container.encode(offset, forKey: .offset)
    var transformContainer = container.nestedContainer(keyedBy: TransformKeys.self, forKey: .transform)
    try transformContainer.encode(startOpacity, forKey: .startOpacity)
    try transformContainer.encode(endOpacity, forKey: .endOpacity)
    try transformContainer.encode(rotationX, forKey: .rotationX)
    try transformContainer.encode(rotationY, forKey: .rotationY)
    try transformContainer.encode(rotationZ, forKey: .rotationZ)
    try transformContainer.encode(position, forKey: .position)
    try transformContainer.encode(anchorPoint, forKey: .anchorPoint)
    try transformContainer.encode(scale, forKey: .scale)
  }

  // MARK: Private

  private enum CodingKeys: String, CodingKey {
    case copies = "c"
    case offset = "o"
    case transform = "tr"
  }

  private enum TransformKeys: String, CodingKey {
    case rotation = "r"
    case rotationX = "rx"
    case rotationY = "ry"
    case rotationZ = "rz"
    case startOpacity = "so"
    case endOpacity = "eo"
    case anchorPoint = "a"
    case position = "p"
    case scale = "s"
  }
}
