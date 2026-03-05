//
//  AnimationFontProvider.swift
//  Lottie
//
//  Created by Brandon Withrow on 8/5/20.
//  Copyright © 2020 YurtvilleProds. All rights reserved.
//

import CoreText

// MARK: - AnimationFontProvider

/// Font provider is a protocol that is used to supply fonts to `LottieAnimationView`.
///
public protocol AnimationFontProvider {
  func fontFor(family: String, size: CGFloat) -> CTFont?
}

// MARK: - DefaultFontProvider

/// Default Font provider.
public final class DefaultFontProvider: AnimationFontProvider {

  // MARK: Lifecycle

  public init() { }

  // MARK: Public

  public func fontFor(family: String, size: CGFloat) -> CTFont? {
    CTFontCreateWithName(family as CFString, size, nil)
  }
}

// MARK: Equatable

extension DefaultFontProvider: Equatable {
  public static func ==(_: DefaultFontProvider, _: DefaultFontProvider) -> Bool {
    true
  }
}
