//
//  LottieImageProvider.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/25/19.
//

import QuartzCore

// MARK: - AnimationImageProvider

/// Image provider is a protocol that is used to supply images to `LottieAnimationView`.
///
/// Some animations require a reference to an image. The image provider loads and
/// provides those images to the `LottieAnimationView`.  Lottie includes a couple of
/// prebuilt Image Providers that supply images from a Bundle, or from a FilePath.
///
/// Additionally custom Image Providers can be made to load images from a URL,
/// or to Cache images.
public protocol AnimationImageProvider {

  /// Whether or not the resulting image of this image provider can be cached by Lottie. Defaults to true.
  /// If true, Lottie may internally cache the result of `imageForAsset`
  var cacheEligible: Bool { get }

  /// The image to display for the given `ImageAsset` defined in the `LottieAnimation` JSON file.
  func imageForAsset(asset: ImageAsset) -> CGImage?

  /// Specifies how the layer's contents are positioned or scaled within its bounds for a given asset.
  /// Defaults to `.resize`, which stretches the image to fill the layer.
  func contentsGravity(for asset: ImageAsset) -> CALayerContentsGravity
}

extension AnimationImageProvider {
  public var cacheEligible: Bool {
    true
  }

  /// The default value is `.resize`, similar to that of `CALayer`.
  public func contentsGravity(for _: ImageAsset) -> CALayerContentsGravity {
    .resize
  }
}
