// Created by Cal Stephens on 8/11/23.
// Copyright © 2023 Airbnb Inc. All rights reserved.

#if canImport(SwiftUI)
import SwiftUI

/// A wrapper which exposes Lottie's `AnimatedSwitch` to SwiftUI
@available(iOS 13.0, tvOS 13.0, macOS 10.15, *)
public struct LottieSwitch: UIViewConfiguringSwiftUIView {

  // MARK: Lifecycle

  public init(animation: LottieAnimation?) {
    self.animation = animation
  }

  // MARK: Public

  public var body: some View {
    AnimatedSwitch.swiftUIView {
      let animatedSwitch = AnimatedSwitch(animation: animation, configuration: configuration)
      animatedSwitch.isOn = isOn?.wrappedValue ?? false
      return animatedSwitch
    }
    .configure { context in
      // We check referential equality of the animation before updating as updating the
      // animation has a side-effect of rebuilding the animation layer, and it would be
      // prohibitive to do so on every state update.
      if animation !== context.view.animationView.animation {
        context.view.animationView.animation = animation
      }

      #if os(macOS)
      // Disable the intrinsic content size constraint on the inner animation view,
      // or the Epoxy `SwiftUIMeasurementContainer` won't size this view correctly.
      context.view.animationView.isVerticalContentSizeConstraintActive = false
      context.view.animationView.isHorizontalContentSizeConstraintActive = false
      #endif

      if let isOn = isOn?.wrappedValue, isOn != context.view.isOn {
        context.view.setIsOn(isOn, animated: true)
      }
    }
    .configurations(configurations)
  }

  /// Returns a copy of this `LottieView` updated to have the given closure applied to its
  /// represented `LottieAnimationView` whenever it is updated via the `updateUIView(…)`
  /// or `updateNSView(…)` method.
  public func configure(_ configure: @escaping (AnimatedSwitch) -> Void) -> Self {
    var copy = self
    copy.configurations.append { context in
      configure(context.view)
    }
    return copy
  }

  /// Returns a copy of this view with its `LottieConfiguration` updated to the given value.
  public func configuration(_ configuration: LottieConfiguration) -> Self {
    var copy = self
    copy.configuration = configuration

    copy = copy.configure { view in
      if view.animationView.configuration != configuration {
        view.animationView.configuration = configuration
      }
    }

    return copy
  }

  /// Returns a copy of this view with the given `Binding` reflecting the `isOn` state of the switch.
  public func isOn(_ binding: Binding<Bool>) -> Self {
    var copy = self
    copy.isOn = binding
    return copy.configure { view in
      view.stateUpdated = { isOn in
        DispatchQueue.main.async {
          binding.wrappedValue = isOn
        }
      }
    }
  }

  /// Returns a copy of this view with the "on" animation configured
  /// to start and end at the given progress values.
  /// Defaults to playing the entire animation forwards (0...1).
  public func onAnimation(
    fromProgress onStartProgress: AnimationProgressTime,
    toProgress onEndProgress: AnimationProgressTime)
    -> Self
  {
    configure { view in
      if onStartProgress != view.onStartProgress || onEndProgress != view.onEndProgress {
        view.setProgressForState(
          fromProgress: onStartProgress,
          toProgress: onEndProgress,
          forOnState: true)
      }
    }
  }

  /// Returns a copy of this view with the "on" animation configured
  /// to start and end at the given progress values.
  /// Defaults to playing the entire animation backwards (1...0).
  public func offAnimation(
    fromProgress offStartProgress: AnimationProgressTime,
    toProgress offEndProgress: AnimationProgressTime)
    -> Self
  {
    configure { view in
      if offStartProgress != view.offStartProgress || offEndProgress != view.offEndProgress {
        view.setProgressForState(
          fromProgress: offStartProgress,
          toProgress: offEndProgress,
          forOnState: false)
      }
    }
  }

  /// Returns a copy of this view using the given value provider for the given keypath.
  /// The value provider must be `Equatable` to avoid unnecessary state updates / re-renders.
  public func valueProvider<ValueProvider: AnyValueProvider & Equatable>(
    _ valueProvider: ValueProvider,
    for keypath: AnimationKeypath)
    -> Self
  {
    configure { view in
      if (view.animationView.valueProviders[keypath] as? ValueProvider) != valueProvider {
        view.animationView.setValueProvider(valueProvider, keypath: keypath)
      }
    }
  }

  // MARK: Internal

  var configurations = [SwiftUIView<AnimatedSwitch, Void>.Configuration]()

  // MARK: Private

  private let animation: LottieAnimation?
  private var configuration: LottieConfiguration = .shared
  private var isOn: Binding<Bool>?

}
#endif
