//
//  LayerDebugging.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/24/19.
//

import QuartzCore

// MARK: - LayerDebugStyle

struct LayerDebugStyle {
  let anchorColor: CGColor
  let boundsColor: CGColor
  let anchorWidth: CGFloat
  let boundsWidth: CGFloat
}

// MARK: - LayerDebugging

protocol LayerDebugging {
  var debugStyle: LayerDebugStyle { get }
}

// MARK: - CustomLayerDebugging

protocol CustomLayerDebugging {
  func layerForDebugging() -> CALayer
}

// MARK: - DebugLayer

class DebugLayer: CALayer {
  init(style: LayerDebugStyle) {
    super.init()
    zPosition = 1000
    bounds = CGRect(x: 0, y: 0, width: style.anchorWidth, height: style.anchorWidth)
    backgroundColor = style.anchorColor
  }

  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}

extension CALayer {

  @nonobjc
  public func logLayerTree(withIndent: Int = 0) {
    var string = ""
    for _ in 0...withIndent {
      string = string + "  "
    }
    string = string + "|_" + String(describing: self)
    LottieLogger.shared.info(string)
    if let sublayers {
      for sublayer in sublayers {
        sublayer.logLayerTree(withIndent: withIndent + 1)
      }
    }
  }

}

// MARK: - CompositionLayer + CustomLayerDebugging

extension CompositionLayer: CustomLayerDebugging {
  func layerForDebugging() -> CALayer {
    contentsLayer
  }
}

extension CALayer {

  @nonobjc
  func setDebuggingState(visible: Bool) {
    var sublayers = sublayers
    if let cust = self as? CustomLayerDebugging {
      sublayers = cust.layerForDebugging().sublayers
    }

    if let sublayers {
      for i in 0..<sublayers.count {
        if let debugLayer = sublayers[i] as? DebugLayer {
          debugLayer.removeFromSuperlayer()
          break
        }
      }
    }

    if let sublayers {
      for sublayer in sublayers {
        sublayer.setDebuggingState(visible: visible)
      }
    }

    if visible {
      let style: LayerDebugStyle
      if let layerDebugging = self as? LayerDebugging {
        style = layerDebugging.debugStyle
      } else {
        style = LayerDebugStyle.defaultStyle()
      }
      let debugLayer = DebugLayer(style: style)
      var container = self
      if let cust = self as? CustomLayerDebugging {
        container = cust.layerForDebugging()
      }
      container.addSublayer(debugLayer)
      debugLayer.position = .zero
      borderWidth = style.boundsWidth
      borderColor = style.boundsColor
    } else {
      borderWidth = 0
      borderColor = nil
    }
  }
}

// MARK: - MainThreadAnimationLayer + LayerDebugging

extension MainThreadAnimationLayer: LayerDebugging {
  var debugStyle: LayerDebugStyle {
    LayerDebugStyle.topLayerStyle()
  }
}

// MARK: - NullCompositionLayer + LayerDebugging

extension NullCompositionLayer: LayerDebugging {
  var debugStyle: LayerDebugStyle {
    LayerDebugStyle.nullLayerStyle()
  }
}

// MARK: - ShapeCompositionLayer + LayerDebugging

extension ShapeCompositionLayer: LayerDebugging {
  var debugStyle: LayerDebugStyle {
    LayerDebugStyle.shapeLayerStyle()
  }
}

// MARK: - ShapeRenderLayer + LayerDebugging

extension ShapeRenderLayer: LayerDebugging {
  var debugStyle: LayerDebugStyle {
    LayerDebugStyle.shapeRenderLayerStyle()
  }
}

extension LayerDebugStyle {
  static func defaultStyle() -> LayerDebugStyle {
    let anchorColor = CGColor.rgb(1, 0, 0)
    let boundsColor = CGColor.rgb(1, 1, 0)
    return LayerDebugStyle(
      anchorColor: anchorColor,
      boundsColor: boundsColor,
      anchorWidth: 10,
      boundsWidth: 2)
  }

  static func topLayerStyle() -> LayerDebugStyle {
    let anchorColor = CGColor.rgba(1, 0.5, 0, 0)
    let boundsColor = CGColor.rgb(0, 1, 0)

    return LayerDebugStyle(
      anchorColor: anchorColor,
      boundsColor: boundsColor,
      anchorWidth: 10,
      boundsWidth: 2)
  }

  static func nullLayerStyle() -> LayerDebugStyle {
    let anchorColor = CGColor.rgba(0, 0, 1, 0)
    let boundsColor = CGColor.rgb(0, 1, 0)

    return LayerDebugStyle(
      anchorColor: anchorColor,
      boundsColor: boundsColor,
      anchorWidth: 10,
      boundsWidth: 2)
  }

  static func shapeLayerStyle() -> LayerDebugStyle {
    let anchorColor = CGColor.rgba(0, 1, 0, 0)
    let boundsColor = CGColor.rgb(0, 1, 0)

    return LayerDebugStyle(
      anchorColor: anchorColor,
      boundsColor: boundsColor,
      anchorWidth: 10,
      boundsWidth: 2)
  }

  static func shapeRenderLayerStyle() -> LayerDebugStyle {
    let anchorColor = CGColor.rgba(0, 1, 1, 0)
    let boundsColor = CGColor.rgb(0, 1, 0)

    return LayerDebugStyle(
      anchorColor: anchorColor,
      boundsColor: boundsColor,
      anchorWidth: 10,
      boundsWidth: 2)
  }
}

extension [LayerModel] {

  var parents: [Int] {
    var array = [Int]()
    for layer in self {
      if let parent = layer.parent {
        array.append(parent)
      } else {
        array.append(-1)
      }
    }
    return array
  }

}
