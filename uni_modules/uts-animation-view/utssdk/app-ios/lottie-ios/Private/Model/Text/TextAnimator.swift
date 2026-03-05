//
//  TextAnimator.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/9/19.
//

final class TextAnimator: Codable, DictionaryInitializable {

  // MARK: Lifecycle

  required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: TextAnimator.CodingKeys.self)
    name = try container.decodeIfPresent(String.self, forKey: .name) ?? ""
    let animatorContainer = try container.nestedContainer(keyedBy: TextAnimatorKeys.self, forKey: .textAnimator)
    fillColor = try animatorContainer.decodeIfPresent(KeyframeGroup<LottieColor>.self, forKey: .fillColor)
    strokeColor = try animatorContainer.decodeIfPresent(KeyframeGroup<LottieColor>.self, forKey: .strokeColor)
    strokeWidth = try animatorContainer.decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .strokeWidth)
    tracking = try animatorContainer.decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .tracking)
    anchor = try animatorContainer.decodeIfPresent(KeyframeGroup<LottieVector3D>.self, forKey: .anchor)
    position = try animatorContainer.decodeIfPresent(KeyframeGroup<LottieVector3D>.self, forKey: .position)
    scale = try animatorContainer.decodeIfPresent(KeyframeGroup<LottieVector3D>.self, forKey: .scale)
    skew = try animatorContainer.decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .skew)
    skewAxis = try animatorContainer.decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .skewAxis)
    rotationX = try animatorContainer.decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .rotationX)
    rotationY = try animatorContainer.decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .rotationY)
    if let rotation = try animatorContainer.decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .rotation) {
      rotationZ = rotation
    } else if let rotation = try animatorContainer.decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .rotationZ) {
      rotationZ = rotation
    } else {
      rotationZ = nil
    }
    opacity = try animatorContainer.decodeIfPresent(KeyframeGroup<LottieVector1D>.self, forKey: .opacity)
  }

  init(dictionary: [String: Any]) throws {
    name = (try? dictionary.value(for: CodingKeys.name)) ?? ""
    let animatorDictionary: [String: Any] = try dictionary.value(for: CodingKeys.textAnimator)
    if let fillColorDictionary = animatorDictionary[TextAnimatorKeys.fillColor.rawValue] as? [String: Any] {
      fillColor = try? KeyframeGroup<LottieColor>(dictionary: fillColorDictionary)
    } else {
      fillColor = nil
    }
    if let strokeColorDictionary = animatorDictionary[TextAnimatorKeys.strokeColor.rawValue] as? [String: Any] {
      strokeColor = try? KeyframeGroup<LottieColor>(dictionary: strokeColorDictionary)
    } else {
      strokeColor = nil
    }
    if let strokeWidthDictionary = animatorDictionary[TextAnimatorKeys.strokeWidth.rawValue] as? [String: Any] {
      strokeWidth = try? KeyframeGroup<LottieVector1D>(dictionary: strokeWidthDictionary)
    } else {
      strokeWidth = nil
    }
    if let trackingDictionary = animatorDictionary[TextAnimatorKeys.tracking.rawValue] as? [String: Any] {
      tracking = try? KeyframeGroup<LottieVector1D>(dictionary: trackingDictionary)
    } else {
      tracking = nil
    }
    if let anchorDictionary = animatorDictionary[TextAnimatorKeys.anchor.rawValue] as? [String: Any] {
      anchor = try? KeyframeGroup<LottieVector3D>(dictionary: anchorDictionary)
    } else {
      anchor = nil
    }
    if let positionDictionary = animatorDictionary[TextAnimatorKeys.position.rawValue] as? [String: Any] {
      position = try? KeyframeGroup<LottieVector3D>(dictionary: positionDictionary)
    } else {
      position = nil
    }
    if let scaleDictionary = animatorDictionary[TextAnimatorKeys.scale.rawValue] as? [String: Any] {
      scale = try? KeyframeGroup<LottieVector3D>(dictionary: scaleDictionary)
    } else {
      scale = nil
    }
    if let skewDictionary = animatorDictionary[TextAnimatorKeys.skew.rawValue] as? [String: Any] {
      skew = try? KeyframeGroup<LottieVector1D>(dictionary: skewDictionary)
    } else {
      skew = nil
    }
    if let skewAxisDictionary = animatorDictionary[TextAnimatorKeys.skewAxis.rawValue] as? [String: Any] {
      skewAxis = try? KeyframeGroup<LottieVector1D>(dictionary: skewAxisDictionary)
    } else {
      skewAxis = nil
    }
    if let rotationDictionary = animatorDictionary[TextAnimatorKeys.rotationX.rawValue] as? [String: Any] {
      rotationX = try? KeyframeGroup<LottieVector1D>(dictionary: rotationDictionary)
    } else {
      rotationX = nil
    }

    if let rotationDictionary = animatorDictionary[TextAnimatorKeys.rotationY.rawValue] as? [String: Any] {
      rotationY = try? KeyframeGroup<LottieVector1D>(dictionary: rotationDictionary)
    } else {
      rotationY = nil
    }

    if let rotationDictionary = animatorDictionary[TextAnimatorKeys.rotation.rawValue] as? [String: Any] {
      rotationZ = try? KeyframeGroup<LottieVector1D>(dictionary: rotationDictionary)
    } else if let rotationDictionary = animatorDictionary[TextAnimatorKeys.rotationZ.rawValue] as? [String: Any] {
      rotationZ = try? KeyframeGroup<LottieVector1D>(dictionary: rotationDictionary)
    } else {
      rotationZ = nil
    }

    if let opacityDictionary = animatorDictionary[TextAnimatorKeys.opacity.rawValue] as? [String: Any] {
      opacity = try KeyframeGroup<LottieVector1D>(dictionary: opacityDictionary)
    } else {
      opacity = nil
    }
  }

  // MARK: Internal

  let name: String

  /// Anchor
  let anchor: KeyframeGroup<LottieVector3D>?

  /// Position
  let position: KeyframeGroup<LottieVector3D>?

  /// Scale
  let scale: KeyframeGroup<LottieVector3D>?

  /// Skew
  let skew: KeyframeGroup<LottieVector1D>?

  /// Skew Axis
  let skewAxis: KeyframeGroup<LottieVector1D>?

  /// Rotation on X axis
  let rotationX: KeyframeGroup<LottieVector1D>?

  /// Rotation on Y axis
  let rotationY: KeyframeGroup<LottieVector1D>?

  /// Rotation on Z axis
  let rotationZ: KeyframeGroup<LottieVector1D>?

  /// Opacity
  let opacity: KeyframeGroup<LottieVector1D>?

  /// Stroke Color
  let strokeColor: KeyframeGroup<LottieColor>?

  /// Fill Color
  let fillColor: KeyframeGroup<LottieColor>?

  /// Stroke Width
  let strokeWidth: KeyframeGroup<LottieVector1D>?

  /// Tracking
  let tracking: KeyframeGroup<LottieVector1D>?

  func encode(to encoder: Encoder) throws {
    var container = encoder.container(keyedBy: CodingKeys.self)
    var animatorContainer = container.nestedContainer(keyedBy: TextAnimatorKeys.self, forKey: .textAnimator)
    try animatorContainer.encodeIfPresent(fillColor, forKey: .fillColor)
    try animatorContainer.encodeIfPresent(strokeColor, forKey: .strokeColor)
    try animatorContainer.encodeIfPresent(strokeWidth, forKey: .strokeWidth)
    try animatorContainer.encodeIfPresent(tracking, forKey: .tracking)
  }

  // MARK: Private

  private enum CodingKeys: String, CodingKey {
//    case textSelector = "s" TODO
    case textAnimator = "a"
    case name = "nm"
  }

  private enum TextSelectorKeys: String, CodingKey {
    case start = "s"
    case end = "e"
    case offset = "o"
  }

  private enum TextAnimatorKeys: String, CodingKey {
    case fillColor = "fc"
    case strokeColor = "sc"
    case strokeWidth = "sw"
    case tracking = "t"
    case anchor = "a"
    case position = "p"
    case scale = "s"
    case skew = "sk"
    case skewAxis = "sa"
    case rotation = "r"
    case rotationX = "rx"
    case rotationY = "ry"
    case rotationZ = "rz"
    case opacity = "o"
  }
}
