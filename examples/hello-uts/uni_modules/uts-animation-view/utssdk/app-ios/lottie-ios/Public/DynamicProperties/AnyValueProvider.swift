//
//  AnyValueProvider.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/30/19.
//

import Foundation

// MARK: - AnyValueProvider

/// `AnyValueProvider` is a protocol that return animation data for a property at a
/// given time. Every frame a `LottieAnimationView` queries all of its properties and asks
/// if their ValueProvider has an update. If it does the LottieAnimationView will read the
/// property and update that portion of the animation.
///
/// Value Providers can be used to dynamically set animation properties at run time.
public protocol AnyValueProvider {

  /// The Type of the value provider
  var valueType: Any.Type { get }

  /// The type-erased storage for this Value Provider
  var typeErasedStorage: AnyValueProviderStorage { get }

  /// Asks the provider if it has an update for the given frame.
  func hasUpdate(frame: AnimationFrameTime) -> Bool

}

extension AnyValueProvider {
  /// Asks the provider to update the container with its value for the frame.
  public func value(frame: AnimationFrameTime) -> Any {
    typeErasedStorage.value(frame: frame)
  }
}

// MARK: - ValueProvider

/// A base protocol for strongly-typed Value Providers
protocol ValueProvider: AnyValueProvider {
  associatedtype Value: AnyInterpolatable

  /// The strongly-typed storage for this Value Provider
  var storage: ValueProviderStorage<Value> { get }
}

extension ValueProvider {
  public var typeErasedStorage: AnyValueProviderStorage {
    switch storage {
    case .closure(let typedClosure):
      return .closure(typedClosure)

    case .singleValue(let typedValue):
      return .singleValue(typedValue)

    case .keyframes(let keyframes):
      return .keyframes(
        keyframes.map { keyframe in
          keyframe.withValue(keyframe.value as Any)
        },
        interpolate: storage.value(frame:))
    }
  }
}

// MARK: - ValueProviderStorage

/// The underlying storage of a `ValueProvider`
public enum ValueProviderStorage<T: AnyInterpolatable> {
  /// The value provider stores a single value that is used on all frames
  case singleValue(T)

  /// The value provider stores a group of keyframes
  ///  - The main-thread rendering engine interpolates values in these keyframes
  ///    using `T`'s `Interpolatable` implementation.
  ///  - The Core Animation rendering engine constructs a `CAKeyframeAnimation`
  ///    using these keyframes. The Core Animation render server performs
  ///    the interpolation, without calling `T`'s `Interpolatable` implementation.
  case keyframes([Keyframe<T>])

  /// The value provider stores a closure that is invoked on every frame
  ///  - This is only supported by the main-thread rendering engine
  case closure((AnimationFrameTime) -> T)

  // MARK: Internal

  func value(frame: AnimationFrameTime) -> T {
    switch self {
    case .singleValue(let value):
      return value

    case .closure(let closure):
      return closure(frame)

    case .keyframes(let keyframes):
      return KeyframeInterpolator(keyframes: ContiguousArray(keyframes)).storage.value(frame: frame)
    }
  }
}

// MARK: - AnyValueProviderStorage

/// A type-erased representation of `ValueProviderStorage`
public enum AnyValueProviderStorage {
  /// The value provider stores a single value that is used on all frames
  case singleValue(Any)

  /// The value provider stores a group of keyframes
  ///  - Since we can't interpolate a type-erased `KeyframeGroup`,
  ///    the interpolation has to be performed in the `interpolate` closure.
  case keyframes([Keyframe<Any>], interpolate: (AnimationFrameTime) -> Any)

  /// The value provider stores a closure that is invoked on every frame
  case closure((AnimationFrameTime) -> Any)

  // MARK: Internal

  func value(frame: AnimationFrameTime) -> Any {
    switch self {
    case .singleValue(let value):
      return value

    case .closure(let closure):
      return closure(frame)

    case .keyframes(_, let valueForFrame):
      return valueForFrame(frame)
    }
  }
}
