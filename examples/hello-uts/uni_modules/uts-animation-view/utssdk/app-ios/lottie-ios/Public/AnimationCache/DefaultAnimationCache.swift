//
//  DefaultAnimationCache.swift
//  Lottie
//
//  Created by Marcelo Fabri on 10/18/22.
//

import Foundation

// MARK: - DefaultAnimationCache

/// A thread-safe Animation Cache that will store animations up to `cacheSize`.
///
/// Once `cacheSize` is reached, animations can be ejected.
/// The default size of the cache is 100.
///
/// This cache implementation also responds to memory pressure.
public class DefaultAnimationCache: AnimationCacheProvider {

  // MARK: Lifecycle

  public init() {
    cache.countLimit = Self.defaultCacheCountLimit
  }

  // MARK: Public

  /// The global shared Cache.
  public static let sharedCache = DefaultAnimationCache()

  /// The maximum number of animations that can be stored in the cache.
  public var cacheSize: Int {
    get { cache.countLimit }
    set { cache.countLimit = newValue }
  }

  /// Clears the Cache.
  public func clearCache() {
    cache.removeAllValues()
  }

  public func animation(forKey key: String) -> LottieAnimation? {
    cache.value(forKey: key)
  }

  public func setAnimation(_ animation: LottieAnimation, forKey key: String) {
    cache.setValue(animation, forKey: key)
  }

  // MARK: Private

  private static let defaultCacheCountLimit = 100

  /// The underlying storage of this cache.
  ///  - We use the `LRUCache` library instead of `NSCache`, because `NSCache`
  ///    clears all cached values when the app is backgrounded instead of
  ///    only when the app receives a memory warning notification.
  private let cache = LRUCache<String, LottieAnimation>()
}

// MARK: Sendable

// LottieAnimationCache has a Sendable requirement, but we can't
// redesign DefaultAnimationCache to be properly Sendable without
// making breaking changes.
// swiftlint:disable:next no_unchecked_sendable
extension DefaultAnimationCache: @unchecked Sendable { }
