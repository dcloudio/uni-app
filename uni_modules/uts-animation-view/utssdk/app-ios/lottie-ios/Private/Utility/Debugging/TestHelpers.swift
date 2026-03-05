// Created by Cal Stephens on 1/28/22.
// Copyright © 2022 Airbnb Inc. All rights reserved.

enum TestHelpers {
  /// Whether or not snapshot tests are currently running in a test target
  static var snapshotTestsAreRunning = false

  /// Whether or not performance tests are currently running in a test target
  static var performanceTestsAreRunning = false
}
