// Created by Cal Stephens on 1/11/22.
// Copyright © 2022 Airbnb Inc. All rights reserved.

// MARK: - KeyframeGroup + exactlyOneKeyframe

extension KeyframeGroup {
  /// Retrieves the first `Keyframe` from this group,
  /// and asserts that there are not any extra keyframes that would be ignored
  ///  - This should only be used in cases where it's fundamentally not possible to
  ///    support animating a given property (e.g. if Core Animation itself doesn't
  ///    support the property).
  func exactlyOneKeyframe(
    context: CompatibilityTrackerProviding,
    description: String,
    fileID _: StaticString = #fileID,
    line _: UInt = #line)
    throws
    -> T
  {
    try context.compatibilityAssert(
      keyframes.count == 1,
      """
      The Core Animation rendering engine does not support animating multiple keyframes
      for \(description) values, due to limitations of Core Animation.
      """)

    return keyframes[0].value
  }
}
