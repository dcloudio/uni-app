// Created by Cal Stephens on 7/14/23.
// Copyright © 2023 Airbnb Inc. All rights reserved.

/// How animation files should be decoded
public enum DecodingStrategy: Hashable {
  /// Use Codable. This is was the default strategy introduced on Lottie 3, but should be rarely
  /// used as it's slower than `dictionaryBased`. Kept here for any possible compatibility issues
  /// that may come up, but consider it soft-deprecated.
  case legacyCodable

  /// Manually deserialize a dictionary into an Animation.
  /// This should be at least 2-3x faster than using Codable and due to that
  /// it's the default as of Lottie 4.x.
  case dictionaryBased
}
