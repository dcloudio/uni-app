// Created by Cal Stephens on 5/4/22.
// Copyright © 2022 Airbnb Inc. All rights reserved.

// MARK: - CompatibilityIssue

/// A compatibility issue that was encountered while setting up an animation with the Core Animation engine
struct CompatibilityIssue: CustomStringConvertible {
  let message: String
  let context: String

  var description: String {
    "[\(context)] \(message)"
  }
}

// MARK: - CompatibilityTracker

/// A type that tracks whether or not an animation is compatible with the Core Animation engine
final class CompatibilityTracker {

  // MARK: Lifecycle

  init(mode: Mode, logger: LottieLogger) {
    self.mode = mode
    self.logger = logger
  }

  // MARK: Internal

  /// How compatibility issues should be handled
  enum Mode {
    /// When a compatibility issue is encountered, an error will be thrown immediately,
    /// aborting the animation setup process as soon as possible.
    case abort

    /// When a compatibility issue is encountered, it is stored in `CompatibilityTracker.issues`
    case track
  }

  enum Error: Swift.Error {
    case encounteredCompatibilityIssue(CompatibilityIssue)
  }

  /// Records a compatibility issue that will be reported according to `CompatibilityTracker.Mode`
  func logIssue(message: String, context: String) throws {
    logger.assert(!context.isEmpty, "Compatibility issue context is unexpectedly empty")

    let issue = CompatibilityIssue(
      // Compatibility messages are usually written in source files using multi-line strings,
      // but converting them to be a single line makes it easier to read the ultimate log output.
      message: message.replacingOccurrences(of: "\n", with: " "),
      context: context)

    switch mode {
    case .abort:
      throw CompatibilityTracker.Error.encounteredCompatibilityIssue(issue)
    case .track:
      issues.append(issue)
    }
  }

  /// Asserts that a condition is true, otherwise logs a compatibility issue that will be reported
  /// according to `CompatibilityTracker.Mode`
  func assert(
    _ condition: Bool,
    _ message: @autoclosure () -> String,
    context: @autoclosure () -> String)
    throws
  {
    if !condition {
      try logIssue(message: message(), context: context())
    }
  }

  /// Reports the compatibility issues that were recorded when setting up the animation,
  /// and clears the set of tracked issues.
  func reportCompatibilityIssues(_ handler: ([CompatibilityIssue]) -> Void) {
    handler(issues)
    issues = []
  }

  // MARK: Private

  private let mode: Mode
  private let logger: LottieLogger

  /// Compatibility issues encountered while setting up the animation
  private var issues = [CompatibilityIssue]()

}

// MARK: - CompatibilityTrackerProviding

protocol CompatibilityTrackerProviding {
  var compatibilityTracker: CompatibilityTracker { get }
  var compatibilityIssueContext: String { get }
}

extension CompatibilityTrackerProviding {
  /// Records a compatibility issue that will be reported according to `CompatibilityTracker.Mode`
  func logCompatibilityIssue(_ message: String) throws {
    try compatibilityTracker.logIssue(message: message, context: compatibilityIssueContext)
  }

  /// Asserts that a condition is true, otherwise logs a compatibility issue that will be reported
  /// according to `CompatibilityTracker.Mode`
  func compatibilityAssert(
    _ condition: Bool,
    _ message: @autoclosure () -> String)
    throws
  {
    try compatibilityTracker.assert(condition, message(), context: compatibilityIssueContext)
  }
}

// MARK: - LayerContext + CompatibilityTrackerProviding

extension LayerContext: CompatibilityTrackerProviding {
  var compatibilityIssueContext: String {
    layerName
  }
}

// MARK: - LayerAnimationContext + CompatibilityTrackerProviding

extension LayerAnimationContext: CompatibilityTrackerProviding {
  var compatibilityIssueContext: String {
    currentKeypath.fullPath
  }
}
