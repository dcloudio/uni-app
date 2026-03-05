//
//  AnimationSubview.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 2/4/19.
//

#if canImport(UIKit)
import UIKit

/// A view that can be added to a keypath of an AnimationView
public final class AnimationSubview: UIView {

  var viewLayer: CALayer? {
    layer
  }

}
#endif
