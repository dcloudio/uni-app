//
//  KeyframeGroup.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/14/19.
//

// MARK: - KeyframeGroup

/// Used for coding/decoding a group of Keyframes by type.
///
/// Keyframe data is wrapped in a dictionary { "k" : KeyframeData }.
/// The keyframe data can either be an array of keyframes or, if no animation is present, the raw value.
/// This helper object is needed to properly decode the json.
final class KeyframeGroup<T> {

  // MARK: Lifecycle

  init(
    keyframes: ContiguousArray<Keyframe<T>>,
    unsupportedAfterEffectsExpression: String? = nil)
  {
    self.keyframes = keyframes
    self.unsupportedAfterEffectsExpression = unsupportedAfterEffectsExpression
  }

  init(
    _ value: T,
    unsupportedAfterEffectsExpression: String? = nil)
  {
    keyframes = [Keyframe(value)]
    self.unsupportedAfterEffectsExpression = unsupportedAfterEffectsExpression
  }

  // MARK: Internal

  enum KeyframeWrapperKey: String, CodingKey {
    case keyframeData = "k"
    case unsupportedAfterEffectsExpression = "x"
  }

  let keyframes: ContiguousArray<Keyframe<T>>

  /// lottie-ios doesn't support After Effects expressions, but we parse them so we can log diagnostics.
  /// More info: https://helpx.adobe.com/after-effects/using/expression-basics.html
  let unsupportedAfterEffectsExpression: String?

}

// MARK: Decodable

extension KeyframeGroup: Decodable where T: Decodable {
  convenience init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: KeyframeWrapperKey.self)
    let unsupportedAfterEffectsExpression = try? container.decode(String.self, forKey: .unsupportedAfterEffectsExpression)

    if let keyframeData: T = try? container.decode(T.self, forKey: .keyframeData) {
      /// Try to decode raw value; No keyframe data.
      self.init(
        keyframes: [Keyframe<T>(keyframeData)],
        unsupportedAfterEffectsExpression: unsupportedAfterEffectsExpression)
    } else {
      // Decode and array of keyframes.
      //
      // Body Movin and Lottie deal with keyframes in different ways.
      //
      // A keyframe object in Body movin defines a span of time with a START
      // and an END, from the current keyframe time to the next keyframe time.
      //
      // A keyframe object in Lottie defines a singular point in time/space.
      // This point has an in-tangent and an out-tangent.
      //
      // To properly decode this we must iterate through keyframes while holding
      // reference to the previous keyframe.

      var keyframesContainer = try container.nestedUnkeyedContainer(forKey: .keyframeData)
      var keyframes = ContiguousArray<Keyframe<T>>()
      var previousKeyframeData: KeyframeData<T>?
      while !keyframesContainer.isAtEnd {
        // Ensure that Time and Value are present.

        let keyframeData = try keyframesContainer.decode(KeyframeData<T>.self)

        guard
          let value: T = keyframeData.startValue ?? previousKeyframeData?.endValue,
          let time = keyframeData.time
        else {
          /// Missing keyframe data. JSON must be corrupt.
          throw DecodingError.dataCorruptedError(
            forKey: KeyframeWrapperKey.keyframeData,
            in: container,
            debugDescription: "Missing keyframe data.")
        }

        keyframes.append(Keyframe<T>(
          value: value,
          time: AnimationFrameTime(time),
          isHold: keyframeData.isHold,
          inTangent: previousKeyframeData?.inTangent,
          outTangent: keyframeData.outTangent,
          spatialInTangent: previousKeyframeData?.spatialInTangent,
          spatialOutTangent: keyframeData.spatialOutTangent))
        previousKeyframeData = keyframeData
      }
      self.init(
        keyframes: keyframes,
        unsupportedAfterEffectsExpression: unsupportedAfterEffectsExpression)
    }
  }
}

// MARK: Encodable

extension KeyframeGroup: Encodable where T: Encodable {
  func encode(to encoder: Encoder) throws {
    var container = encoder.container(keyedBy: KeyframeWrapperKey.self)

    if keyframes.count == 1 {
      let keyframe = keyframes[0]
      try container.encode(keyframe.value, forKey: .keyframeData)
    } else {
      var keyframeContainer = container.nestedUnkeyedContainer(forKey: .keyframeData)

      for i in 1..<keyframes.endIndex {
        let keyframe = keyframes[i - 1]
        let nextKeyframe = keyframes[i]
        let keyframeData = KeyframeData<T>(
          startValue: keyframe.value,
          endValue: nextKeyframe.value,
          time: keyframe.time,
          hold: keyframe.isHold ? 1 : nil,
          inTangent: nextKeyframe.inTangent,
          outTangent: keyframe.outTangent,
          spatialInTangent: nil,
          spatialOutTangent: nil)
        try keyframeContainer.encode(keyframeData)
      }
    }
  }
}

// MARK: DictionaryInitializable

extension KeyframeGroup: DictionaryInitializable where T: AnyInitializable {
  convenience init(dictionary: [String: Any]) throws {
    var keyframes = ContiguousArray<Keyframe<T>>()
    let unsupportedAfterEffectsExpression = dictionary[KeyframeWrapperKey.unsupportedAfterEffectsExpression.rawValue] as? String
    if
      let rawValue = dictionary[KeyframeWrapperKey.keyframeData.rawValue],
      let value = try? T(value: rawValue)
    {
      keyframes = [Keyframe<T>(value)]
    } else {
      var frameDictionaries: [[String: Any]]
      if let singleFrameDictionary = dictionary[KeyframeWrapperKey.keyframeData.rawValue] as? [String: Any] {
        frameDictionaries = [singleFrameDictionary]
      } else {
        frameDictionaries = try dictionary.value(for: KeyframeWrapperKey.keyframeData)
      }
      var previousKeyframeData: KeyframeData<T>?
      for frameDictionary in frameDictionaries {
        let data = try KeyframeData<T>(dictionary: frameDictionary)
        guard
          let value: T = data.startValue ?? previousKeyframeData?.endValue,
          let time = data.time
        else {
          throw InitializableError.invalidInput()
        }
        keyframes.append(Keyframe<T>(
          value: value,
          time: time,
          isHold: data.isHold,
          inTangent: previousKeyframeData?.inTangent,
          outTangent: data.outTangent,
          spatialInTangent: previousKeyframeData?.spatialInTangent,
          spatialOutTangent: data.spatialOutTangent))
        previousKeyframeData = data
      }
    }

    self.init(
      keyframes: keyframes,
      unsupportedAfterEffectsExpression: unsupportedAfterEffectsExpression)
  }
}

// MARK: Equatable

extension KeyframeGroup: Equatable where T: Equatable {
  static func == (_ lhs: KeyframeGroup<T>, _ rhs: KeyframeGroup<T>) -> Bool {
    lhs.keyframes == rhs.keyframes
  }
}

// MARK: Hashable

extension KeyframeGroup: Hashable where T: Hashable {
  func hash(into hasher: inout Hasher) {
    hasher.combine(keyframes)
  }
}

// MARK: Sendable

extension KeyframeGroup: Sendable where T: Sendable { }

extension Keyframe {
  /// Creates a copy of this `Keyframe` with the same timing data, but a different value
  func withValue<Value>(_ newValue: Value) -> Keyframe<Value> {
    Keyframe<Value>(
      value: newValue,
      time: time,
      isHold: isHold,
      inTangent: inTangent,
      outTangent: outTangent,
      spatialInTangent: spatialInTangent,
      spatialOutTangent: spatialOutTangent)
  }
}

extension KeyframeGroup {
  /// Maps the values of each individual keyframe in this group
  func map<NewValue>(_ transformation: (T) throws -> NewValue) rethrows -> KeyframeGroup<NewValue> {
    KeyframeGroup<NewValue>(
      keyframes: ContiguousArray(try keyframes.map { keyframe in
        keyframe.withValue(try transformation(keyframe.value))
      }),
      unsupportedAfterEffectsExpression: unsupportedAfterEffectsExpression)
  }
}

// MARK: - AnyKeyframeGroup

/// A type-erased wrapper for `KeyframeGroup`s
protocol AnyKeyframeGroup {
  /// An untyped copy of these keyframes
  var untyped: KeyframeGroup<Any> { get }

  /// An untyped `KeyframeInterpolator` for these keyframes
  var interpolator: AnyValueProvider { get }
}

// MARK: - KeyframeGroup + AnyKeyframeGroup

extension KeyframeGroup: AnyKeyframeGroup where T: AnyInterpolatable {
  var untyped: KeyframeGroup<Any> {
    map { $0 as Any }
  }

  var interpolator: AnyValueProvider {
    KeyframeInterpolator(keyframes: keyframes)
  }
}
