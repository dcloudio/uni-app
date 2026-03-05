//
//  AnimationContext.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 2/1/19.
//

import Foundation
import QuartzCore

/// A completion block for animations.
///  - `true` is passed in if the animation completed playing.
///  - `false` is passed in if the animation was interrupted and did not complete playing.
public typealias LottieCompletionBlock = (_ completed: Bool) -> Void

// MARK: - AnimationContext

struct AnimationContext {

  init(
    playFrom: AnimationFrameTime,
    playTo: AnimationFrameTime,
    closure: LottieCompletionBlock?)
  {
    self.playTo = playTo
    self.playFrom = playFrom
    self.closure = AnimationCompletionDelegate(completionBlock: closure)
  }

  var playFrom: AnimationFrameTime
  var playTo: AnimationFrameTime
  var closure: AnimationCompletionDelegate

}

// MARK: Equatable

extension AnimationContext: Equatable {
  /// Whether or not the two given `AnimationContext`s are functionally equivalent
  ///  - This checks whether or not a completion handler was provided,
  ///    but does not check whether or not the two completion handlers are equivalent.
  static func == (_ lhs: AnimationContext, _ rhs: AnimationContext) -> Bool {
    lhs.playTo == rhs.playTo
      && lhs.playFrom == rhs.playFrom
      && (lhs.closure.completionBlock == nil) == (rhs.closure.completionBlock == nil)
  }
}

// MARK: - AnimationContextState

enum AnimationContextState {
  case playing
  case cancelled
  case complete
}

// MARK: - AnimationCompletionDelegate

class AnimationCompletionDelegate: NSObject, CAAnimationDelegate {

  // MARK: Lifecycle

  init(completionBlock: LottieCompletionBlock?) {
    self.completionBlock = completionBlock
    super.init()
  }

  // MARK: Public

  public func animationDidStop(_ anim: CAAnimation, finished flag: Bool) {
    guard ignoreDelegate == false else { return }
    animationState = flag ? .complete : .cancelled
    if let animationLayer, let key = animationKey {
      animationLayer.removeAnimation(forKey: key)
      if flag {
        animationLayer.currentFrame = (anim as! CABasicAnimation).toValue as! CGFloat
      }
    }
    if let completionBlock {
      completionBlock(flag)
    }
  }

  // MARK: Internal

  var animationLayer: RootAnimationLayer?
  var animationKey: String?
  var ignoreDelegate = false
  var animationState: AnimationContextState = .playing

  let completionBlock: LottieCompletionBlock?
}
