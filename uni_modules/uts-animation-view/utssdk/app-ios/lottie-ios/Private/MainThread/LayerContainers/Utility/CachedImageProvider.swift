// Created by Jianjun Wu on 2022/5/12.
// Copyright © 2022 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - CachedImageProvider

private final class CachedImageProvider: AnimationImageProvider {

  // MARK: Lifecycle

  /// Initializes an image provider with an image provider
  ///
  /// - Parameter imageProvider: The provider to load image from asset
  ///
  public init(imageProvider: AnimationImageProvider) {
    self.imageProvider = imageProvider
  }

  // MARK: Public

  public func imageForAsset(asset: ImageAsset) -> CGImage? {
    if let image = imageCache.value(forKey: asset.id) {
      return image
    }
    if let image = imageProvider.imageForAsset(asset: asset) {
      imageCache.setValue(image, forKey: asset.id)
      return image
    }
    return nil
  }

  // MARK: Internal

  func contentsGravity(for asset: ImageAsset) -> CALayerContentsGravity {
    imageProvider.contentsGravity(for: asset)
  }

  // MARK: Private

  /// The underlying storage of this cache.
  ///  - We use the `LRUCache` library instead of `NSCache`, because `NSCache`
  ///    clears all cached values when the app is backgrounded instead of
  ///    only when the app receives a memory warning notification.
  private var imageCache = LRUCache<String, CGImage>()
  private let imageProvider: AnimationImageProvider

}

extension AnimationImageProvider {
  /// Create a cache enabled image provider which will reuse the asset image with the same asset id
  /// It wraps the current provider as image loader, and uses `NSCache` to cache the images for resue.
  /// The cache will be reset when the `animation` is reset.
  var cachedImageProvider: AnimationImageProvider {
    guard cacheEligible else { return self }
    return CachedImageProvider(imageProvider: self)
  }
}
