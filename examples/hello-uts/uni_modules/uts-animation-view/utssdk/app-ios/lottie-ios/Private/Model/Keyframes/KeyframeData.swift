//
//  Keyframe.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/7/19.
//

// MARK: - KeyframeData

/// A generic class used to parse and remap keyframe json.
///
/// Keyframe json has a couple of different variations and formats depending on the
/// type of keyframea and also the version of the JSON. By parsing the raw data
/// we can reconfigure it into a constant format.
final class KeyframeData<T> {

  // MARK: Lifecycle

  init(
    startValue: T?,
    endValue: T?,
    time: AnimationFrameTime?,
    hold: Int?,
    inTangent: LottieVector2D?,
    outTangent: LottieVector2D?,
    spatialInTangent: LottieVector3D?,
    spatialOutTangent: LottieVector3D?)
  {
    self.startValue = startValue
    self.endValue = endValue
    self.time = time
    self.hold = hold
    self.inTangent = inTangent
    self.outTangent = outTangent
    self.spatialInTangent = spatialInTangent
    self.spatialOutTangent = spatialOutTangent
  }

  // MARK: Internal

  enum CodingKeys: String, CodingKey {
    case startValue = "s"
    case endValue = "e"
    case time = "t"
    case hold = "h"
    case inTangent = "i"
    case outTangent = "o"
    case spatialInTangent = "ti"
    case spatialOutTangent = "to"
  }

  /// The start value of the keyframe
  let startValue: T?
  /// The End value of the keyframe. Note: Newer versions animation json do not have this field.
  let endValue: T?
  /// The time in frames of the keyframe.
  let time: AnimationFrameTime?
  /// A hold keyframe freezes interpolation until the next keyframe that is not a hold.
  let hold: Int?

  /// The in tangent for the time interpolation curve.
  let inTangent: LottieVector2D?
  /// The out tangent for the time interpolation curve.
  let outTangent: LottieVector2D?

  /// The spacial in tangent of the vector.
  let spatialInTangent: LottieVector3D?
  /// The spacial out tangent of the vector.
  let spatialOutTangent: LottieVector3D?

  var isHold: Bool {
    if let hold {
      return hold > 0
    }
    return false
  }
}

// MARK: Encodable

extension KeyframeData: Encodable where T: Encodable { }

// MARK: Decodable

extension KeyframeData: Decodable where T: Decodable { }

// MARK: DictionaryInitializable

extension KeyframeData: DictionaryInitializable where T: AnyInitializable {
  convenience init(dictionary: [String: Any]) throws {
    let startValue = try? dictionary[CodingKeys.startValue.rawValue].flatMap(T.init)
    let endValue = try? dictionary[CodingKeys.endValue.rawValue].flatMap(T.init)
    let time: AnimationFrameTime? = try? dictionary.value(for: CodingKeys.time)
    let hold: Int? = try? dictionary.value(for: CodingKeys.hold)
    let inTangent: LottieVector2D? = try? dictionary.value(for: CodingKeys.inTangent)
    let outTangent: LottieVector2D? = try? dictionary.value(for: CodingKeys.outTangent)
    let spatialInTangent: LottieVector3D? = try? dictionary.value(for: CodingKeys.spatialInTangent)
    let spatialOutTangent: LottieVector3D? = try? dictionary.value(for: CodingKeys.spatialOutTangent)

    self.init(
      startValue: startValue,
      endValue: endValue,
      time: time,
      hold: hold,
      inTangent: inTangent,
      outTangent: outTangent,
      spatialInTangent: spatialInTangent,
      spatialOutTangent: spatialOutTangent)
  }
}
