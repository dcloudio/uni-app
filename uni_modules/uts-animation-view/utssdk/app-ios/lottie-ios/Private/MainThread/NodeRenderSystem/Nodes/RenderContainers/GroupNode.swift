//
//  GroupNode.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/18/19.
//

import QuartzCore

// MARK: - GroupNodeProperties

final class GroupNodeProperties: NodePropertyMap, KeypathSearchable {

  // MARK: Lifecycle

  init(transform: ShapeTransform?) {
    if let transform {
      anchor = NodeProperty(provider: KeyframeInterpolator(keyframes: transform.anchor.keyframes))
      position = NodeProperty(provider: KeyframeInterpolator(keyframes: transform.position.keyframes))
      scale = NodeProperty(provider: KeyframeInterpolator(keyframes: transform.scale.keyframes))
      rotationX = NodeProperty(provider: KeyframeInterpolator(keyframes: transform.rotationX.keyframes))
      rotationY = NodeProperty(provider: KeyframeInterpolator(keyframes: transform.rotationY.keyframes))
      rotationZ = NodeProperty(provider: KeyframeInterpolator(keyframes: transform.rotationZ.keyframes))
      opacity = NodeProperty(provider: KeyframeInterpolator(keyframes: transform.opacity.keyframes))
      skew = NodeProperty(provider: KeyframeInterpolator(keyframes: transform.skew.keyframes))
      skewAxis = NodeProperty(provider: KeyframeInterpolator(keyframes: transform.skewAxis.keyframes))
    } else {
      /// Transform node missing. Default to empty transform.
      anchor = NodeProperty(provider: SingleValueProvider(LottieVector3D(x: CGFloat(0), y: CGFloat(0), z: CGFloat(0))))
      position = NodeProperty(provider: SingleValueProvider(LottieVector3D(x: CGFloat(0), y: CGFloat(0), z: CGFloat(0))))
      scale = NodeProperty(provider: SingleValueProvider(LottieVector3D(x: CGFloat(100), y: CGFloat(100), z: CGFloat(100))))
      rotationX = NodeProperty(provider: SingleValueProvider(LottieVector1D(0)))
      rotationY = NodeProperty(provider: SingleValueProvider(LottieVector1D(0)))
      rotationZ = NodeProperty(provider: SingleValueProvider(LottieVector1D(0)))
      opacity = NodeProperty(provider: SingleValueProvider(LottieVector1D(100)))
      skew = NodeProperty(provider: SingleValueProvider(LottieVector1D(0)))
      skewAxis = NodeProperty(provider: SingleValueProvider(LottieVector1D(0)))
    }
    keypathProperties = [
      "Anchor Point" : anchor,
      PropertyName.position.rawValue : position,
      PropertyName.scale.rawValue : scale,
      PropertyName.rotation.rawValue : rotationZ,
      "Rotation X" : rotationX,
      "Rotation Y" : rotationY,
      "Rotation Z" : rotationZ,
      PropertyName.opacity.rawValue : opacity,
      "Skew" : skew,
      "Skew Axis" : skewAxis,
    ]
    properties = Array(keypathProperties.values)
  }

  // MARK: Internal

  var keypathName = "Transform"

  var childKeypaths: [KeypathSearchable] = []

  let keypathProperties: [String: AnyNodeProperty]
  let properties: [AnyNodeProperty]

  let anchor: NodeProperty<LottieVector3D>
  let position: NodeProperty<LottieVector3D>
  let scale: NodeProperty<LottieVector3D>
  let rotationX: NodeProperty<LottieVector1D>
  let rotationY: NodeProperty<LottieVector1D>
  let rotationZ: NodeProperty<LottieVector1D>

  let opacity: NodeProperty<LottieVector1D>
  let skew: NodeProperty<LottieVector1D>
  let skewAxis: NodeProperty<LottieVector1D>

  var caTransform: CATransform3D {
    CATransform3D.makeTransform(
      anchor: anchor.value.pointValue,
      position: position.value.pointValue,
      scale: scale.value.sizeValue,
      rotationX: rotationX.value.cgFloatValue,
      rotationY: rotationY.value.cgFloatValue,
      rotationZ: rotationZ.value.cgFloatValue,
      skew: skew.value.cgFloatValue,
      skewAxis: skewAxis.value.cgFloatValue)
  }
}

// MARK: - GroupNode

final class GroupNode: AnimatorNode {

  // MARK: Lifecycle

  // MARK: Initializer
  init(name: String, parentNode: AnimatorNode?, tree: NodeTree) {
    self.parentNode = parentNode
    keypathName = name
    rootNode = tree.rootNode
    properties = GroupNodeProperties(transform: tree.transform)
    groupOutput = GroupOutputNode(parent: parentNode?.outputNode, rootNode: rootNode?.outputNode)
    var childKeypaths: [KeypathSearchable] = tree.childrenNodes
    childKeypaths.append(properties)
    self.childKeypaths = childKeypaths

    for childContainer in tree.renderContainers {
      container.insertRenderLayer(childContainer)
    }
  }

  // MARK: Internal

  // MARK: Properties
  let groupOutput: GroupOutputNode

  let properties: GroupNodeProperties

  let rootNode: AnimatorNode?

  var container = ShapeContainerLayer()

  // MARK: Keypath Searchable

  let keypathName: String

  let childKeypaths: [KeypathSearchable]

  let parentNode: AnimatorNode?
  var hasLocalUpdates = false
  var hasUpstreamUpdates = false
  var lastUpdateFrame: CGFloat? = nil

  var keypathLayer: CALayer? {
    container
  }

  // MARK: Animator Node Protocol

  var propertyMap: NodePropertyMap & KeypathSearchable {
    properties
  }

  var outputNode: NodeOutput {
    groupOutput
  }

  var isEnabled = true {
    didSet {
      container.isHidden = !isEnabled
    }
  }

  func performAdditionalLocalUpdates(frame: CGFloat, forceLocalUpdate: Bool) -> Bool {
    rootNode?.updateContents(frame, forceLocalUpdate: forceLocalUpdate) ?? false
  }

  func performAdditionalOutputUpdates(_ frame: CGFloat, forceOutputUpdate: Bool) {
    rootNode?.updateOutputs(frame, forceOutputUpdate: forceOutputUpdate)
  }

  func rebuildOutputs(frame: CGFloat) {
    container.opacity = Float(properties.opacity.value.cgFloatValue) * 0.01
    container.transform = properties.caTransform
    groupOutput.setTransform(container.transform, forFrame: frame)
  }

}
