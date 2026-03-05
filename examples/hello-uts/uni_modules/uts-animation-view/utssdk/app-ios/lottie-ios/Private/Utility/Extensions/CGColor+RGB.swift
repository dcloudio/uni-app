// Created by Cal Stephens on 1/7/22.
// Copyright © 2022 Airbnb Inc. All rights reserved.

import QuartzCore

extension CGColor {
  /// Initializes a `CGColor` using the given `RGB` values
  static func rgb(_ red: CGFloat, _ green: CGFloat, _ blue: CGFloat) -> CGColor {
    rgba(red, green, blue, 1.0)
  }

  /// Initializes a `CGColor` using the given grayscale value
  static func gray(_ gray: CGFloat) -> CGColor {
    CGColor(
      colorSpace: CGColorSpaceCreateDeviceGray(),
      components: [gray, 1.0])!
  }

  /// Initializes a `CGColor` using the given `RGBA` values
  static func rgba(_ red: CGFloat, _ green: CGFloat, _ blue: CGFloat, _ alpha: CGFloat) -> CGColor {
    CGColor(
      colorSpace: LottieConfiguration.shared.colorSpace,
      components: [red, green, blue, alpha])!
  }
}
