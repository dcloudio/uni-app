//
//  File.swift
//
//
//  Created by Denis Koryttsev on 10.05.2022.
//

extension BlendMode {
  /// The Core Image filter name for this `BlendMode`, that can be applied to a `CALayer`'s `compositingFilter`.
  /// Supported compositing filters are defined here: https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/uid/TP30000136-SW71
  var filterName: String? {
    switch self {
    case .normal: return nil
    case .multiply: return "multiplyBlendMode"
    case .screen: return "screenBlendMode"
    case .overlay: return "overlayBlendMode"
    case .darken: return "darkenBlendMode"
    case .lighten: return "lightenBlendMode"
    case .colorDodge: return "colorDodgeBlendMode"
    case .colorBurn: return "colorBurnBlendMode"
    case .hardLight: return "hardLightBlendMode"
    case .softLight: return "softLightBlendMode"
    case .difference: return "differenceBlendMode"
    case .exclusion: return "exclusionBlendMode"
    case .hue: return "hueBlendMode"
    case .saturation: return "saturationBlendMode"
    case .color: return "colorBlendMode"
    case .luminosity: return "luminosityBlendMode"
    }
  }
}
