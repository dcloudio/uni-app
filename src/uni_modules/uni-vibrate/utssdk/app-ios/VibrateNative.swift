import AudioToolbox
import CoreHaptics
import Foundation
import UIKit

public class VibrateNative {
  public static func vibrateShort(_ type: String) -> Int {
    guard supportsShortHaptic() else {
      return 9_001_002
    }

    let impactStyle = mapImpactStyle(type: type)
    let trigger = {
      let generator = UIImpactFeedbackGenerator(style: impactStyle)
      generator.prepare()
      generator.impactOccurred()
    }

    if Thread.isMainThread {
      trigger()
    } else {
      DispatchQueue.main.sync(execute: trigger)
    }

    return 0
  }

  public static func vibrateLong() -> Int {
    guard supportsLongVibration() else {
      return 9_001_002
    }

    let trigger = {
      AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)
    }

    if Thread.isMainThread {
      trigger()
    } else {
      DispatchQueue.main.sync(execute: trigger)
    }

    return 0
  }

  private static func mapImpactStyle(type: String) -> UIImpactFeedbackGenerator.FeedbackStyle {
    switch type.lowercased() {
    case "heavy":
      return .heavy
    case "light":
      return .light
    case "medium":
      fallthrough
    default:
      return .medium
    }
  }

  private static func supportsShortHaptic() -> Bool {
    if #available(iOS 13.0, *) {
      return CHHapticEngine.capabilitiesForHardware().supportsHaptics
    }

    return UIDevice.current.userInterfaceIdiom == .phone
  }

  private static func supportsLongVibration() -> Bool {
    return UIDevice.current.userInterfaceIdiom == .phone
  }
}
