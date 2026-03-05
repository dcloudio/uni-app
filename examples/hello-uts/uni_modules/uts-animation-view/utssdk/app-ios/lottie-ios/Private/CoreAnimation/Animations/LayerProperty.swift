// Created by Cal Stephens on 1/11/22.
// Copyright © 2022 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - LayerProperty

/// A strongly typed value that can be used as the `keyPath` of a `CAAnimation`
///
/// Supported key paths and their expected value types are described
/// at https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/AnimatableProperties/AnimatableProperties.html#//apple_ref/doc/uid/TP40004514-CH11-SW1
/// and https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/Key-ValueCodingExtensions/Key-ValueCodingExtensions.html
struct LayerProperty<ValueRepresentation> {
  /// The `CALayer` KVC key path that this value should be assigned to
  let caLayerKeypath: String

  /// Whether or not the given value is the default value for this property
  ///  - If the keyframe values are just equal to the default value,
  ///    then we can improve performance a bit by just not creating
  ///    a CAAnimation (since it would be redundant).
  let isDefaultValue: (ValueRepresentation?) -> Bool

  /// A description of how this property can be customized dynamically
  /// at runtime using `AnimationView.setValueProvider(_:keypath:)`
  let customizableProperty: CustomizableProperty<ValueRepresentation>?
}

extension LayerProperty where ValueRepresentation: Equatable {
  /// Initializes a `LayerProperty` that corresponds to a property on `CALayer`
  /// or some other `CALayer` subclass like `CAShapeLayer`.
  /// - Parameters:
  ///   - caLayerKeypath: The Objective-C `#keyPath` to the `CALayer` property,
  ///     e.g. `#keyPath(CALayer.opacity)` or `#keyPath(CAShapeLayer.path)`.
  ///   - defaultValue: The default value of the property (e.g. the value of the
  ///     property immediately after calling `CALayer.init()`). Knowing this value
  ///     lets us perform some optimizations in `CALayer+addAnimation`.
  ///   - customizableProperty: A description of how this property can be customized
  ///     dynamically at runtime using `AnimationView.setValueProvider(_:keypath:)`.
  init(
    caLayerKeypath: String,
    defaultValue: ValueRepresentation?,
    customizableProperty: CustomizableProperty<ValueRepresentation>?)
  {
    self.init(
      caLayerKeypath: caLayerKeypath,
      isDefaultValue: { $0 == defaultValue },
      customizableProperty: customizableProperty)
  }
}

// MARK: - CustomizableProperty

/// A description of how a `CALayer` property can be customized dynamically
/// at runtime using `LottieAnimationView.setValueProvider(_:keypath:)`
struct CustomizableProperty<ValueRepresentation> {
  /// The name that `AnimationKeypath`s can use to refer to this property
  ///  - When building an animation for this property that will be applied
  ///    to a specific layer, this `name` is appended to the end of that
  ///    layer's `AnimationKeypath`. The combined keypath is used to query
  ///    the `ValueProviderStore`.
  let name: [PropertyName]

  /// A closure that coverts the type-erased value of an `AnyValueProvider`
  /// to the strongly-typed representation used by this property, if possible.
  ///  - `value` is the value for the current frame that should be converted,
  ///    as returned by `AnyValueProvider.typeErasedStorage`.
  ///  - `valueProvider` is the `AnyValueProvider` that returned the type-erased value.
  let conversion: (_ value: Any, _ valueProvider: AnyValueProvider) -> ValueRepresentation?
}

// MARK: - PropertyName

/// The name of a customizable property that can be used in an `AnimationKeypath`
///  - These values should be shared between the two rendering engines,
///    since they form the public API of the `AnimationKeypath` system.
enum PropertyName: String, CaseIterable {
  case color = "Color"
  case opacity = "Opacity"
  case scale = "Scale"
  case position = "Position"
  case rotation = "Rotation"
  case strokeWidth = "Stroke Width"
  case gradientColors = "Colors"
}

// MARK: CALayer properties

extension LayerProperty {
  static var position: LayerProperty<CGPoint> {
    .init(
      caLayerKeypath: "transform.translation",
      defaultValue: CGPoint(x: 0, y: 0),
      customizableProperty: .position)
  }

  static var positionX: LayerProperty<CGFloat> {
    .init(
      caLayerKeypath: "transform.translation.x",
      defaultValue: 0,
      customizableProperty: nil /* currently unsupported */ )
  }

  static var positionY: LayerProperty<CGFloat> {
    .init(
      caLayerKeypath: "transform.translation.y",
      defaultValue: 0,
      customizableProperty: nil /* currently unsupported */ )
  }

  static var scale: LayerProperty<CGFloat> {
    .init(
      caLayerKeypath: "transform.scale",
      defaultValue: 1,
      customizableProperty: nil /* currently unsupported */ )
  }

  static var scaleX: LayerProperty<CGFloat> {
    .init(
      caLayerKeypath: "transform.scale.x",
      defaultValue: 1,
      customizableProperty: .scaleX)
  }

  static var scaleY: LayerProperty<CGFloat> {
    .init(
      caLayerKeypath: "transform.scale.y",
      defaultValue: 1,
      customizableProperty: .scaleY)
  }

  static var rotationX: LayerProperty<CGFloat> {
    .init(
      caLayerKeypath: "transform.rotation.x",
      defaultValue: 0,
      customizableProperty: nil /* currently unsupported */ )
  }

  static var rotationY: LayerProperty<CGFloat> {
    .init(
      caLayerKeypath: "transform.rotation.y",
      defaultValue: 0,
      customizableProperty: nil /* currently unsupported */ )
  }

  static var rotationZ: LayerProperty<CGFloat> {
    .init(
      caLayerKeypath: "transform.rotation.z",
      defaultValue: 0,
      customizableProperty: .rotation)
  }

  static var anchorPoint: LayerProperty<CGPoint> {
    .init(
      caLayerKeypath: #keyPath(CALayer.anchorPoint),
      // This is intentionally not `GGPoint(x: 0.5, y: 0.5)` (the actual default)
      // to opt `anchorPoint` out of the KVC `setValue` flow, which causes issues.
      defaultValue: nil,
      customizableProperty: nil /* currently unsupported */ )
  }

  static var opacity: LayerProperty<CGFloat> {
    .init(
      caLayerKeypath: #keyPath(CALayer.opacity),
      defaultValue: 1,
      customizableProperty: .opacity)
  }

  static var isHidden: LayerProperty<Bool> {
    .init(
      caLayerKeypath: #keyPath(CALayer.isHidden),
      defaultValue: false,
      customizableProperty: nil /* unsupported */ )
  }

  static var transform: LayerProperty<CATransform3D> {
    .init(
      caLayerKeypath: #keyPath(CALayer.transform),
      isDefaultValue: { transform in
        guard let transform else { return false }
        return CATransform3DIsIdentity(transform)
      },
      customizableProperty: nil /* currently unsupported */ )
  }

  static var shadowOpacity: LayerProperty<CGFloat> {
    .init(
      caLayerKeypath: #keyPath(CALayer.shadowOpacity),
      defaultValue: 0,
      customizableProperty: nil /* currently unsupported */ )
  }

  static var shadowColor: LayerProperty<CGColor> {
    .init(
      caLayerKeypath: #keyPath(CALayer.shadowColor),
      defaultValue: .rgb(0, 0, 0),
      customizableProperty: nil /* currently unsupported */ )
  }

  static var shadowRadius: LayerProperty<CGFloat> {
    .init(
      caLayerKeypath: #keyPath(CALayer.shadowRadius),
      defaultValue: 3.0,
      customizableProperty: nil /* currently unsupported */ )
  }

  static var shadowOffset: LayerProperty<CGSize> {
    .init(
      caLayerKeypath: #keyPath(CALayer.shadowOffset),
      defaultValue: CGSize(width: 0, height: -3.0),
      customizableProperty: nil /* currently unsupported */ )
  }
}

// MARK: CAShapeLayer properties

extension LayerProperty {
  static var path: LayerProperty<CGPath> {
    .init(
      caLayerKeypath: #keyPath(CAShapeLayer.path),
      defaultValue: nil,
      customizableProperty: nil /* currently unsupported */ )
  }

  static var fillColor: LayerProperty<CGColor> {
    .init(
      caLayerKeypath: #keyPath(CAShapeLayer.fillColor),
      defaultValue: nil,
      customizableProperty: .color)
  }

  static var lineWidth: LayerProperty<CGFloat> {
    .init(
      caLayerKeypath: #keyPath(CAShapeLayer.lineWidth),
      defaultValue: 1,
      customizableProperty: .floatValue(.strokeWidth))
  }

  static var lineDashPhase: LayerProperty<CGFloat> {
    .init(
      caLayerKeypath: #keyPath(CAShapeLayer.lineDashPhase),
      defaultValue: 0,
      customizableProperty: nil /* currently unsupported */ )
  }

  static var strokeColor: LayerProperty<CGColor> {
    .init(
      caLayerKeypath: #keyPath(CAShapeLayer.strokeColor),
      defaultValue: nil,
      customizableProperty: .color)
  }

  static var strokeStart: LayerProperty<CGFloat> {
    .init(
      caLayerKeypath: #keyPath(CAShapeLayer.strokeStart),
      defaultValue: 0,
      customizableProperty: nil /* currently unsupported */ )
  }

  static var strokeEnd: LayerProperty<CGFloat> {
    .init(
      caLayerKeypath: #keyPath(CAShapeLayer.strokeEnd),
      defaultValue: 1,
      customizableProperty: nil /* currently unsupported */ )
  }
}

// MARK: CAGradientLayer properties

extension LayerProperty {
  static var colors: LayerProperty<[CGColor]> {
    .init(
      caLayerKeypath: #keyPath(CAGradientLayer.colors),
      defaultValue: nil,
      customizableProperty: .gradientColors)
  }

  static var locations: LayerProperty<[CGFloat]> {
    .init(
      caLayerKeypath: #keyPath(CAGradientLayer.locations),
      defaultValue: nil,
      customizableProperty: .gradientLocations)
  }

  static var startPoint: LayerProperty<CGPoint> {
    .init(
      caLayerKeypath: #keyPath(CAGradientLayer.startPoint),
      defaultValue: nil,
      customizableProperty: nil /* currently unsupported */ )
  }

  static var endPoint: LayerProperty<CGPoint> {
    .init(
      caLayerKeypath: #keyPath(CAGradientLayer.endPoint),
      defaultValue: nil,
      customizableProperty: nil /* currently unsupported */ )
  }
}

// MARK: - CustomizableProperty types

extension CustomizableProperty {
  static var color: CustomizableProperty<CGColor> {
    .init(
      name: [.color],
      conversion: { typeErasedValue, _ in
        guard let color = typeErasedValue as? LottieColor else {
          return nil
        }

        return .rgba(CGFloat(color.r), CGFloat(color.g), CGFloat(color.b), CGFloat(color.a))
      })
  }

  static var opacity: CustomizableProperty<CGFloat> {
    .init(
      name: [.opacity],
      conversion: { typeErasedValue, _ in
        guard let vector = typeErasedValue as? LottieVector1D else { return nil }

        // Lottie animation files express opacity as a numerical percentage value
        // (e.g. 50%, 100%, 200%) so we divide by 100 to get the decimal values
        // expected by Core Animation (e.g. 0.5, 1.0, 2.0).
        return vector.cgFloatValue / 100
      })
  }

  static var scaleX: CustomizableProperty<CGFloat> {
    .init(
      name: [.scale],
      conversion: { typeErasedValue, _ in
        guard let vector = typeErasedValue as? LottieVector3D else { return nil }

        // Lottie animation files express scale as a numerical percentage value
        // (e.g. 50%, 100%, 200%) so we divide by 100 to get the decimal values
        // expected by Core Animation (e.g. 0.5, 1.0, 2.0).
        return vector.pointValue.x / 100
      })
  }

  static var scaleY: CustomizableProperty<CGFloat> {
    .init(
      name: [.scale],
      conversion: { typeErasedValue, _ in
        guard let vector = typeErasedValue as? LottieVector3D else { return nil }

        // Lottie animation files express scale as a numerical percentage value
        // (e.g. 50%, 100%, 200%) so we divide by 100 to get the decimal values
        // expected by Core Animation (e.g. 0.5, 1.0, 2.0).
        return vector.pointValue.y / 100
      })
  }

  static var rotation: CustomizableProperty<CGFloat> {
    .init(
      name: [.rotation],
      conversion: { typeErasedValue, _ in
        guard let vector = typeErasedValue as? LottieVector1D else { return nil }

        // Lottie animation files express rotation in degrees
        // (e.g. 90º, 180º, 360º) so we covert to radians to get the
        // values expected by Core Animation (e.g. π/2, π, 2π)
        return vector.cgFloatValue * .pi / 180
      })
  }

  static var position: CustomizableProperty<CGPoint> {
    .init(
      name: [.position],
      conversion: { typeErasedValue, _ in
        guard let vector = typeErasedValue as? LottieVector3D else { return nil }
        return vector.pointValue
      })
  }

  static var gradientColors: CustomizableProperty<[CGColor]> {
    .init(
      name: [.gradientColors],
      conversion: { _, typeErasedValueProvider in
        guard let gradientValueProvider = typeErasedValueProvider as? GradientValueProvider else { return nil }
        return gradientValueProvider.colors.map { $0.cgColorValue }
      })
  }

  static var gradientLocations: CustomizableProperty<[CGFloat]> {
    .init(
      name: [.gradientColors],
      conversion: { _, typeErasedValueProvider in
        guard let gradientValueProvider = typeErasedValueProvider as? GradientValueProvider else { return nil }
        return gradientValueProvider.locations.map { CGFloat($0) }
      })
  }

  static func floatValue(_ name: PropertyName...) -> CustomizableProperty<CGFloat> {
    .init(
      name: name,
      conversion: { typeErasedValue, _ in
        guard let vector = typeErasedValue as? LottieVector1D else { return nil }
        return vector.cgFloatValue
      })
  }
}
