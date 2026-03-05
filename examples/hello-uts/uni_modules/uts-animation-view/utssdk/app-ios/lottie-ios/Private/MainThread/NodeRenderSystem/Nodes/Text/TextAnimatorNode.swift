//
//  TextAnimatorNode.swift
//  lottie-ios-iOS
//
//  Created by Brandon Withrow on 2/19/19.
//

import QuartzCore

// MARK: - TextAnimatorNodeProperties

final class TextAnimatorNodeProperties: NodePropertyMap, KeypathSearchable {

  // MARK: Lifecycle

  init(textAnimator: TextAnimator) {
    keypathName = textAnimator.name
    var properties = [String : AnyNodeProperty]()

    if let keyframeGroup = textAnimator.anchor {
      anchor = NodeProperty(provider: KeyframeInterpolator(keyframes: keyframeGroup.keyframes))
      properties["Anchor"] = anchor
    } else {
      anchor = nil
    }

    if let keyframeGroup = textAnimator.position {
      position = NodeProperty(provider: KeyframeInterpolator(keyframes: keyframeGroup.keyframes))
      properties[PropertyName.position.rawValue] = position
    } else {
      position = nil
    }

    if let keyframeGroup = textAnimator.scale {
      scale = NodeProperty(provider: KeyframeInterpolator(keyframes: keyframeGroup.keyframes))
      properties[PropertyName.scale.rawValue] = scale
    } else {
      scale = nil
    }

    if let keyframeGroup = textAnimator.skew {
      skew = NodeProperty(provider: KeyframeInterpolator(keyframes: keyframeGroup.keyframes))
      properties["Skew"] = skew
    } else {
      skew = nil
    }

    if let keyframeGroup = textAnimator.skewAxis {
      skewAxis = NodeProperty(provider: KeyframeInterpolator(keyframes: keyframeGroup.keyframes))
      properties["Skew Axis"] = skewAxis
    } else {
      skewAxis = nil
    }

    if let keyframeGroup = textAnimator.rotationX {
      rotationX = NodeProperty(provider: KeyframeInterpolator(keyframes: keyframeGroup.keyframes))
      properties["Rotation X"] = rotationX
    } else {
      rotationX = nil
    }

    if let keyframeGroup = textAnimator.rotationY {
      rotationY = NodeProperty(provider: KeyframeInterpolator(keyframes: keyframeGroup.keyframes))
      properties["Rotation Y"] = rotationY
    } else {
      rotationY = nil
    }

    if let keyframeGroup = textAnimator.rotationZ {
      rotationZ = NodeProperty(provider: KeyframeInterpolator(keyframes: keyframeGroup.keyframes))
      properties["Rotation Z"] = rotationZ
      properties[PropertyName.rotation.rawValue] = rotationZ
    } else {
      rotationZ = nil
    }

    if let keyframeGroup = textAnimator.opacity {
      opacity = NodeProperty(provider: KeyframeInterpolator(keyframes: keyframeGroup.keyframes))
      properties[PropertyName.opacity.rawValue] = opacity
    } else {
      opacity = nil
    }

    if let keyframeGroup = textAnimator.strokeColor {
      strokeColor = NodeProperty(provider: KeyframeInterpolator(keyframes: keyframeGroup.keyframes))
      properties["Stroke Color"] = strokeColor
    } else {
      strokeColor = nil
    }

    if let keyframeGroup = textAnimator.fillColor {
      fillColor = NodeProperty(provider: KeyframeInterpolator(keyframes: keyframeGroup.keyframes))
      properties["Fill Color"] = fillColor
    } else {
      fillColor = nil
    }

    if let keyframeGroup = textAnimator.strokeWidth {
      strokeWidth = NodeProperty(provider: KeyframeInterpolator(keyframes: keyframeGroup.keyframes))
      properties[PropertyName.strokeWidth.rawValue] = strokeWidth
    } else {
      strokeWidth = nil
    }

    if let keyframeGroup = textAnimator.tracking {
      tracking = NodeProperty(provider: KeyframeInterpolator(keyframes: keyframeGroup.keyframes))
      properties["Tracking"] = tracking
    } else {
      tracking = nil
    }

    keypathProperties = properties

    self.properties = Array(keypathProperties.values)
  }

  // MARK: Internal

  let keypathName: String

  let anchor: NodeProperty<LottieVector3D>?
  let position: NodeProperty<LottieVector3D>?
  let scale: NodeProperty<LottieVector3D>?
  let skew: NodeProperty<LottieVector1D>?
  let skewAxis: NodeProperty<LottieVector1D>?
  let rotationX: NodeProperty<LottieVector1D>?
  let rotationY: NodeProperty<LottieVector1D>?
  let rotationZ: NodeProperty<LottieVector1D>?
  let opacity: NodeProperty<LottieVector1D>?
  let strokeColor: NodeProperty<LottieColor>?
  let fillColor: NodeProperty<LottieColor>?
  let strokeWidth: NodeProperty<LottieVector1D>?
  let tracking: NodeProperty<LottieVector1D>?

  let keypathProperties: [String: AnyNodeProperty]
  let properties: [AnyNodeProperty]

  var caTransform: CATransform3D {
    CATransform3D.makeTransform(
      anchor: anchor?.value.pointValue ?? .zero,
      position: position?.value.pointValue ?? .zero,
      scale: scale?.value.sizeValue ?? CGSize(width: 100, height: 100),
      rotationX: rotationX?.value.cgFloatValue ?? 0,
      rotationY: rotationY?.value.cgFloatValue ?? 0,
      rotationZ: rotationZ?.value.cgFloatValue ?? 0,
      skew: skew?.value.cgFloatValue,
      skewAxis: skewAxis?.value.cgFloatValue)
  }
}

// MARK: - TextOutputNode

final class TextOutputNode: NodeOutput {

  // MARK: Lifecycle

  init(parent: TextOutputNode?) {
    parentTextNode = parent
  }

  // MARK: Internal

  var parentTextNode: TextOutputNode?
  var isEnabled = true

  var outputPath: CGPath?

  var parent: NodeOutput? {
    parentTextNode
  }

  var xform: CATransform3D {
    get {
      _xform ?? parentTextNode?.xform ?? CATransform3DIdentity
    }
    set {
      _xform = newValue
    }
  }

  var opacity: CGFloat {
    get {
      _opacity ?? parentTextNode?.opacity ?? 1
    }
    set {
      _opacity = newValue
    }
  }

  var strokeColor: CGColor? {
    get {
      _strokeColor ?? parentTextNode?.strokeColor
    }
    set {
      _strokeColor = newValue
    }
  }

  var fillColor: CGColor? {
    get {
      _fillColor ?? parentTextNode?.fillColor
    }
    set {
      _fillColor = newValue
    }
  }

  var tracking: CGFloat {
    get {
      _tracking ?? parentTextNode?.tracking ?? 0
    }
    set {
      _tracking = newValue
    }
  }

  var strokeWidth: CGFloat {
    get {
      _strokeWidth ?? parentTextNode?.strokeWidth ?? 0
    }
    set {
      _strokeWidth = newValue
    }
  }

  func hasOutputUpdates(_: CGFloat) -> Bool {
    // TODO Fix This
    true
  }

  // MARK: Fileprivate

  fileprivate var _xform: CATransform3D?
  fileprivate var _opacity: CGFloat?
  fileprivate var _strokeColor: CGColor?
  fileprivate var _fillColor: CGColor?
  fileprivate var _tracking: CGFloat?
  fileprivate var _strokeWidth: CGFloat?
}

// MARK: - TextAnimatorNode

class TextAnimatorNode: AnimatorNode {

  // MARK: Lifecycle

  init(parentNode: TextAnimatorNode?, textAnimator: TextAnimator) {
    textOutputNode = TextOutputNode(parent: parentNode?.textOutputNode)
    textAnimatorProperties = TextAnimatorNodeProperties(textAnimator: textAnimator)
    self.parentNode = parentNode
  }

  // MARK: Internal

  let textOutputNode: TextOutputNode

  let textAnimatorProperties: TextAnimatorNodeProperties

  let parentNode: AnimatorNode?
  var hasLocalUpdates = false
  var hasUpstreamUpdates = false
  var lastUpdateFrame: CGFloat? = nil
  var isEnabled = true

  var outputNode: NodeOutput {
    textOutputNode
  }

  // MARK: Animator Node Protocol

  var propertyMap: NodePropertyMap & KeypathSearchable {
    textAnimatorProperties
  }

  func localUpdatesPermeateDownstream() -> Bool {
    true
  }

  func rebuildOutputs(frame _: CGFloat) {
    textOutputNode.xform = textAnimatorProperties.caTransform
    textOutputNode.opacity = (textAnimatorProperties.opacity?.value.cgFloatValue ?? 100) * 0.01
    textOutputNode.strokeColor = textAnimatorProperties.strokeColor?.value.cgColorValue
    textOutputNode.fillColor = textAnimatorProperties.fillColor?.value.cgColorValue
    textOutputNode.tracking = textAnimatorProperties.tracking?.value.cgFloatValue ?? 1
    textOutputNode.strokeWidth = textAnimatorProperties.strokeWidth?.value.cgFloatValue ?? 0
  }
}
