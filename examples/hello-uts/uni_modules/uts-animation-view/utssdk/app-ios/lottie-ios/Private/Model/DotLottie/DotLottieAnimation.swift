//
// DotLottieAnimation.swift
// Pods
//
// Created by Evandro Harrison Hoffmann on 28/06/2021.
//

import Foundation

// MARK: - DotLottieAnimation

struct DotLottieAnimation: Codable {
  /// Id of Animation
  var id: String

  /// Loop enabled
  var loop: Bool? = false

  /// Animation Playback Speed
  var speed: Double? = 1

  /// 1 or -1
  var direction: Int? = 1

  /// mode - "bounce" | "normal"
  var mode: DotLottieAnimationMode? = .normal

  /// Loop mode for animation
  var loopMode: LottieLoopMode {
    switch mode {
    case .bounce:
      return .autoReverse
    case .normal, nil:
      return (loop ?? false) ? .loop : .playOnce
    }
  }

  /// Animation speed
  var animationSpeed: Double {
    (speed ?? 1) * Double(direction ?? 1)
  }

  /// Loads `LottieAnimation` from `animationUrl`
  /// - Returns: Deserialized `LottieAnimation`. Optional.
  func animation(url: URL) throws -> LottieAnimation {
    let animationUrl = url.appendingPathComponent("\(id).json")
    let data = try Data(contentsOf: animationUrl)
    return try LottieAnimation.from(data: data)
  }
}

// MARK: - DotLottieAnimationMode

enum DotLottieAnimationMode: String, Codable {
  case normal
  case bounce
}
