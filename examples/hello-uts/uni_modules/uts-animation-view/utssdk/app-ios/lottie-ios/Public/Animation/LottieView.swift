// Created by Bryn Bodayle on 1/20/22.
// Copyright © 2022 Airbnb Inc. All rights reserved.

#if canImport(SwiftUI)
import SwiftUI

// MARK: - LottieView

/// A wrapper which exposes Lottie's `LottieAnimationView` to SwiftUI
@available(iOS 13.0, tvOS 13.0, macOS 10.15, *)
public struct LottieView<Placeholder: View>: UIViewConfiguringSwiftUIView {

  // MARK: Lifecycle

  /// Creates a `LottieView` that displays the given animation
  public init(animation: LottieAnimation?) where Placeholder == EmptyView {
    _animationSource = State(initialValue: animation.map(LottieAnimationSource.lottieAnimation))
    placeholder = nil
  }

  /// Initializes a `LottieView` with the provided `DotLottieFile` for display.
  ///
  /// - Important: Avoid using this initializer with the `SynchronouslyBlockingCurrentThread` APIs.
  ///              If decompression of a `.lottie` file is necessary, prefer using the `.init(_ loadAnimation:)`
  ///              initializer, which takes an asynchronous closure:
  /// ```
  /// LottieView {
  ///  try await DotLottieFile.named(name)
  /// }
  /// ```
  public init(dotLottieFile: DotLottieFile?) where Placeholder == EmptyView {
    _animationSource = State(initialValue: dotLottieFile.map(LottieAnimationSource.dotLottieFile))
    placeholder = nil
  }

  /// Creates a `LottieView` that asynchronously loads and displays the given `LottieAnimation`.
  /// The `loadAnimation` closure is called exactly once in `onAppear`.
  /// If you wish to call `loadAnimation` again at a different time, you can use `.reloadAnimationTrigger(...)`.
  public init(_ loadAnimation: @escaping () async throws -> LottieAnimation?) where Placeholder == EmptyView {
    self.init(loadAnimation, placeholder: EmptyView.init)
  }

  /// Creates a `LottieView` that asynchronously loads and displays the given `LottieAnimation`.
  /// The `loadAnimation` closure is called exactly once in `onAppear`.
  /// If you wish to call `loadAnimation` again at a different time, you can use `.reloadAnimationTrigger(...)`.
  /// While the animation is loading, the `placeholder` view is shown in place of the `LottieAnimationView`.
  public init(
    _ loadAnimation: @escaping () async throws -> LottieAnimation?,
    @ViewBuilder placeholder: @escaping (() -> Placeholder))
  {
    self.init {
      try await loadAnimation().map(LottieAnimationSource.lottieAnimation)
    } placeholder: {
      placeholder()
    }
  }

  /// Creates a `LottieView` that asynchronously loads and displays the given `DotLottieFile`.
  /// The `loadDotLottieFile` closure is called exactly once in `onAppear`.
  /// If you wish to call `loadAnimation` again at a different time, you can use `.reloadAnimationTrigger(...)`.
  /// You can use the `DotLottieFile` static methods API which use Swift concurrency to load your `.lottie` files:
  /// ```
  /// LottieView {
  ///  try await DotLottieFile.named(name)
  /// }
  /// ```
  public init(_ loadDotLottieFile: @escaping () async throws -> DotLottieFile?) where Placeholder == EmptyView {
    self.init(loadDotLottieFile, placeholder: EmptyView.init)
  }

  /// Creates a `LottieView` that asynchronously loads and displays the given `DotLottieFile`.
  /// The `loadDotLottieFile` closure is called exactly once in `onAppear`.
  /// If you wish to call `loadAnimation` again at a different time, you can use `.reloadAnimationTrigger(...)`.
  /// While the animation is loading, the `placeholder` view is shown in place of the `LottieAnimationView`.
  /// You can use the `DotLottieFile` static methods API which use Swift concurrency to load your `.lottie` files:
  /// ```
  /// LottieView {
  ///  try await DotLottieFile.named(name)
  /// } placeholder: {
  ///  LoadingView()
  /// }
  /// ```
  public init(
    _ loadDotLottieFile: @escaping () async throws -> DotLottieFile?,
    @ViewBuilder placeholder: @escaping (() -> Placeholder))
  {
    self.init {
      try await loadDotLottieFile().map(LottieAnimationSource.dotLottieFile)
    } placeholder: {
      placeholder()
    }
  }

  /// Creates a `LottieView` that asynchronously loads and displays the given `LottieAnimationSource`.
  /// The `loadAnimation` closure is called exactly once in `onAppear`.
  /// If you wish to call `loadAnimation` again at a different time, you can use `.reloadAnimationTrigger(...)`.
  /// While the animation is loading, the `placeholder` view is shown in place of the `LottieAnimationView`.
  public init(_ loadAnimation: @escaping () async throws -> LottieAnimationSource?) where Placeholder == EmptyView {
    self.init(loadAnimation, placeholder: EmptyView.init)
  }

  /// Creates a `LottieView` that asynchronously loads and displays the given `LottieAnimationSource`.
  /// The `loadAnimation` closure is called exactly once in `onAppear`.
  /// If you wish to call `loadAnimation` again at a different time, you can use `.reloadAnimationTrigger(...)`.
  /// While the animation is loading, the `placeholder` view is shown in place of the `LottieAnimationView`.
  public init(
    _ loadAnimation: @escaping () async throws -> LottieAnimationSource?,
    @ViewBuilder placeholder: @escaping () -> Placeholder)
  {
    self.loadAnimation = loadAnimation
    self.placeholder = placeholder
    _animationSource = State(initialValue: nil)
  }

  // MARK: Public

  public var body: some View {
    LottieAnimationView.swiftUIView {
      LottieAnimationView(
        animationSource: animationSource,
        imageProvider: imageProviderConfiguration?.imageProvider,
        textProvider: textProvider,
        fontProvider: fontProvider,
        configuration: configuration,
        logger: logger)
    }
    .sizing(sizing)
    .configure { context in
      applyCurrentAnimationConfiguration(to: context.view)
    }
    .configurations(configurations)
    .opacity(animationSource == nil ? 0 : 1)
    .overlay {
      placeholder?()
        .opacity(animationSource == nil ? 1 : 0)
    }
    .onAppear {
      loadAnimationIfNecessary()
    }
    .valueChanged(value: reloadAnimationTrigger) { _ in
      reloadAnimationTriggerDidChange()
    }
  }

  /// Returns a copy of this `LottieView` updated to have the given closure applied to its
  /// represented `LottieAnimationView` whenever it is updated via the `updateUIView(…)`
  /// or `updateNSView(…)` method.
  public func configure(_ configure: @escaping (LottieAnimationView) -> Void) -> Self {
    var copy = self
    copy.configurations.append { context in
      configure(context.view)
    }
    return copy
  }

  /// Returns a copy of this view that can be resized by scaling its animation to fit the size
  /// offered by its parent.
  public func resizable() -> Self {
    var copy = self
    copy.sizing = .proposed
    return copy
  }

  @available(*, deprecated, renamed: "playing()", message: "Will be removed in a future major release.")
  public func play() -> Self {
    playbackMode(.playing(.fromProgress(nil, toProgress: 1, loopMode: .playOnce)))
  }

  /// Returns a copy of this view that loops its animation from the start to end whenever visible
  public func looping() -> Self {
    playbackMode(.playing(.fromProgress(0, toProgress: 1, loopMode: .loop)))
  }

  @available(*, deprecated, renamed: "playing(_:)", message: "Will be removed in a future major release.")
  public func play(loopMode: LottieLoopMode = .playOnce) -> Self {
    playbackMode(.playing(.fromProgress(nil, toProgress: 1, loopMode: loopMode)))
  }

  @available(*, deprecated, renamed: "playbackMode(_:)", message: "Will be removed in a future major release.")
  public func play(_ playbackMode: LottiePlaybackMode) -> Self {
    self.playbackMode(playbackMode)
  }

  /// Returns a copy of this view playing with the given playback mode
  public func playing(_ mode: LottiePlaybackMode.PlaybackMode) -> Self {
    playbackMode(.playing(mode))
  }

  /// Returns a copy of this view playing from the current frame to the end frame,
  /// with the given `LottiePlaybackMode`.
  public func playing(loopMode: LottieLoopMode) -> Self {
    playbackMode(.playing(.fromProgress(nil, toProgress: 1, loopMode: loopMode)))
  }

  // Returns a copy of this view playing once from the current frame to the end frame
  public func playing() -> Self {
    playbackMode(.playing(.fromProgress(nil, toProgress: 1, loopMode: .playOnce)))
  }

  /// Returns a copy of this view paused with the given state
  public func paused(at state: LottiePlaybackMode.PausedState = .currentFrame) -> Self {
    playbackMode(.paused(at: state))
  }

  /// Returns a copy of this view using the given `LottiePlaybackMode`
  public func playbackMode(_ playbackMode: LottiePlaybackMode) -> Self {
    var copy = self
    copy.playbackMode = playbackMode
    return copy
  }

  /// Returns a copy of this view playing its animation at the given speed
  public func animationSpeed(_ animationSpeed: Double) -> Self {
    var copy = self
    copy.animationSpeed = animationSpeed
    return copy
  }

  /// Returns a copy of this view with the given closure that is called whenever the
  /// `LottieAnimationSource` provided via `init` is loaded and applied to the underlying `LottieAnimationView`.
  public func animationDidLoad(_ animationDidLoad: @escaping (LottieAnimationSource) -> Void) -> Self {
    var copy = self
    copy.animationDidLoad = animationDidLoad
    return copy
  }

  /// Returns a copy of this view with the given `LottieCompletionBlock` that is called
  /// when an animation finishes playing.
  public func animationDidFinish(_ animationCompletionHandler: LottieCompletionBlock?) -> Self {
    var copy = self
    copy.animationCompletionHandler = { [previousCompletionHandler = self.animationCompletionHandler] completed in
      previousCompletionHandler?(completed)
      animationCompletionHandler?(completed)
    }
    return copy
  }

  /// Returns a copy of this view updated to have the provided background behavior.
  public func backgroundBehavior(_ value: LottieBackgroundBehavior) -> Self {
    configure { view in
      view.backgroundBehavior = value
    }
  }

  /// Returns a copy of this view with its accessibility label updated to the given value.
  public func accessibilityLabel(_ accessibilityLabel: String?) -> Self {
    configure { view in
      #if os(macOS)
      view.setAccessibilityElement(accessibilityLabel != nil)
      view.setAccessibilityLabel(accessibilityLabel)
      #else
      view.isAccessibilityElement = accessibilityLabel != nil
      view.accessibilityLabel = accessibilityLabel
      #endif
    }
  }

  /// Returns a copy of this view with its `LottieConfiguration` updated to the given value.
  public func configuration(_ configuration: LottieConfiguration) -> Self {
    var copy = self
    copy.configuration = configuration

    copy = copy.configure { view in
      if view.configuration != configuration {
        view.configuration = configuration
      }
    }

    return copy
  }

  /// Returns a copy of this view with its `LottieLogger` updated to the given value.
  ///  - The underlying `LottieAnimationView`'s `LottieLogger` is immutable after configured,
  ///    so this value is only used when initializing the `LottieAnimationView` for the first time.
  public func logger(_ logger: LottieLogger) -> Self {
    var copy = self
    copy.logger = logger
    return copy
  }

  /// Returns a copy of this view with its image provider updated to the given value.
  /// The image provider must be `Equatable` to avoid unnecessary state updates / re-renders.
  public func imageProvider<ImageProvider: AnimationImageProvider & Equatable>(_ imageProvider: ImageProvider) -> Self {
    var copy = self

    copy.imageProviderConfiguration = (
      imageProvider: imageProvider,
      imageProvidersAreEqual: { untypedLHS, untypedRHS in
        guard
          let lhs = untypedLHS as? ImageProvider,
          let rhs = untypedRHS as? ImageProvider
        else { return false }

        return lhs == rhs
      })

    return copy
  }

  /// Returns a copy of this view with its text provider updated to the given value.
  /// The image provider must be `Equatable` to avoid unnecessary state updates / re-renders.
  public func textProvider<TextProvider: AnimationKeypathTextProvider & Equatable>(_ textProvider: TextProvider) -> Self {
    var copy = self
    copy.textProvider = textProvider

    copy = copy.configure { view in
      if (view.textProvider as? TextProvider) != textProvider {
        view.textProvider = textProvider
      }
    }

    return copy
  }

  /// Returns a copy of this view with its image provider updated to the given value.
  /// The image provider must be `Equatable` to avoid unnecessary state updates / re-renders.
  public func fontProvider<FontProvider: AnimationFontProvider & Equatable>(_ fontProvider: FontProvider) -> Self {
    var copy = self
    copy.fontProvider = fontProvider

    copy = configure { view in
      if (view.fontProvider as? FontProvider) != fontProvider {
        view.fontProvider = fontProvider
      }
    }

    return copy
  }

  /// Returns a copy of this view using the given value provider for the given keypath.
  /// The value provider must be `Equatable` to avoid unnecessary state updates / re-renders.
  public func valueProvider<ValueProvider: AnyValueProvider & Equatable>(
    _ valueProvider: ValueProvider,
    for keypath: AnimationKeypath)
    -> Self
  {
    configure { view in
      if (view.valueProviders[keypath] as? ValueProvider) != valueProvider {
        view.setValueProvider(valueProvider, keypath: keypath)
      }
    }
  }

  /// Returns a copy of this view updated to display the given `AnimationProgressTime`.
  ///  - If the `currentProgress` value is provided, the `currentProgress` of the
  ///    underlying `LottieAnimationView` is updated. This will pause any existing animations.
  ///  - If the `animationProgress` is `nil`, no changes will be made and any existing animations
  ///    will continue playing uninterrupted.
  public func currentProgress(_ currentProgress: AnimationProgressTime?) -> Self {
    guard let currentProgress else { return self }
    var copy = self
    copy.playbackMode = .paused(at: .progress(currentProgress))
    return copy
  }

  /// Returns a copy of this view updated to display the given `AnimationFrameTime`.
  ///  - If the `currentFrame` value is provided, the `currentFrame` of the
  ///    underlying `LottieAnimationView` is updated. This will pause any existing animations.
  ///  - If the `currentFrame` is `nil`, no changes will be made and any existing animations
  ///    will continue playing uninterrupted.
  public func currentFrame(_ currentFrame: AnimationFrameTime?) -> Self {
    guard let currentFrame else { return self }
    var copy = self
    copy.playbackMode = .paused(at: .frame(currentFrame))
    return copy
  }

  /// Returns a copy of this view updated to display the given time value.
  ///  - If the `currentTime` value is provided, the `currentTime` of the
  ///    underlying `LottieAnimationView` is updated. This will pause any existing animations.
  ///  - If the `currentTime` is `nil`, no changes will be made and any existing animations
  ///    will continue playing uninterrupted.
  public func currentTime(_ currentTime: TimeInterval?) -> Self {
    guard let currentTime else { return self }
    var copy = self
    copy.playbackMode = .paused(at: .time(currentTime))
    return copy
  }

  /// Returns a new instance of this view, which will invoke the provided `loadAnimation` closure
  /// whenever the `binding` value is updated.
  ///
  /// - Note: This function requires a valid `loadAnimation` closure provided during view initialization,
  ///         otherwise `reloadAnimationTrigger` will have no effect.
  /// - Parameters:
  ///   - binding: The binding that triggers the reloading when its value changes.
  ///   - showPlaceholder: When `true`, the current animation will be removed before invoking `loadAnimation`,
  ///     displaying the `Placeholder` until the new animation loads.
  ///     When `false`, the previous animation remains visible while the new one loads.
  public func reloadAnimationTrigger(_ value: some Equatable, showPlaceholder: Bool = true) -> Self {
    var copy = self
    copy.reloadAnimationTrigger = AnyEquatable(value)
    copy.showPlaceholderWhileReloading = showPlaceholder
    return copy
  }

  /// Returns a view that updates the given binding each frame with the animation's `realtimeAnimationProgress`.
  /// The `LottieView` is wrapped in a `TimelineView` with the `.animation` schedule.
  ///  - This is a one-way binding. Its value is updated but never read.
  ///  - If provided, the binding will be updated each frame with the `realtimeAnimationProgress`
  ///    of the underlying `LottieAnimationView`. This is potentially expensive since it triggers
  ///    a state update every frame.
  ///  - If the binding is `nil`, the `TimelineView` will be paused and no updates will occur to the binding.
  @available(iOS 15.0, tvOS 15.0, macOS 12.0, *)
  public func getRealtimeAnimationProgress(_ realtimeAnimationProgress: Binding<AnimationProgressTime>?) -> some View {
    TimelineView(.animation(paused: realtimeAnimationProgress == nil)) { _ in
      configure { view in
        if let realtimeAnimationProgress {
          DispatchQueue.main.async {
            realtimeAnimationProgress.wrappedValue = view.realtimeAnimationProgress
          }
        }
      }
    }
  }

  /// Returns a view that updates the given binding each frame with the animation's `realtimeAnimationProgress`.
  /// The `LottieView` is wrapped in a `TimelineView` with the `.animation` schedule.
  ///  - This is a one-way binding. Its value is updated but never read.
  ///  - If provided, the binding will be updated each frame with the `realtimeAnimationProgress`
  ///    of the underlying `LottieAnimationView`. This is potentially expensive since it triggers
  ///    a state update every frame.
  ///  - If the binding is `nil`, the `TimelineView` will be paused and no updates will occur to the binding.
  @available(iOS 15.0, tvOS 15.0, macOS 12.0, *)
  public func getRealtimeAnimationFrame(_ realtimeAnimationFrame: Binding<AnimationFrameTime>?) -> some View {
    TimelineView(.animation(paused: realtimeAnimationFrame == nil)) { _ in
      configure { view in
        if let realtimeAnimationFrame {
          DispatchQueue.main.async {
            realtimeAnimationFrame.wrappedValue = view.realtimeAnimationFrame
          }
        }
      }
    }
  }

  /// Returns a copy of this view with the `DotLottieConfigurationComponents`
  /// updated to the given value.
  ///  - Defaults to `[.imageProvider]`
  ///  - If a component is specified here, that value in the `DotLottieConfiguration`
  ///    of an active dotLottie animation will override any value provided via other methods.
  public func dotLottieConfigurationComponents(
    _ dotLottieConfigurationComponents: DotLottieConfigurationComponents)
    -> Self
  {
    var copy = self
    copy.dotLottieConfigurationComponents = dotLottieConfigurationComponents
    return copy
  }

  // MARK: Internal

  var configurations = [SwiftUIView<LottieAnimationView, Void>.Configuration]()

  // MARK: Private

  @State private var animationSource: LottieAnimationSource?
  private var playbackMode: LottiePlaybackMode?
  private var animationSpeed: Double?
  private var reloadAnimationTrigger: AnyEquatable?
  private var loadAnimation: (() async throws -> LottieAnimationSource?)?
  private var animationDidLoad: ((LottieAnimationSource) -> Void)?
  private var animationCompletionHandler: LottieCompletionBlock?
  private var showPlaceholderWhileReloading = false
  private var textProvider: AnimationKeypathTextProvider = DefaultTextProvider()
  private var fontProvider: AnimationFontProvider = DefaultFontProvider()
  private var configuration: LottieConfiguration = .shared
  private var dotLottieConfigurationComponents: DotLottieConfigurationComponents = .imageProvider
  private var logger: LottieLogger = .shared
  private var sizing = SwiftUIMeasurementContainerStrategy.automatic
  private let placeholder: (() -> Placeholder)?

  private var imageProviderConfiguration: (
    imageProvider: AnimationImageProvider,
    imageProvidersAreEqual: (AnimationImageProvider, AnimationImageProvider) -> Bool)?

  private func loadAnimationIfNecessary() {
    guard let loadAnimation else { return }

    Task {
      do {
        animationSource = try await loadAnimation()
      } catch {
        logger.warn("Failed to load asynchronous Lottie animation with error: \(error)")
      }
    }
  }

  private func reloadAnimationTriggerDidChange() {
    guard loadAnimation != nil else { return }

    if showPlaceholderWhileReloading {
      animationSource = nil
    }

    loadAnimationIfNecessary()
  }

  /// Applies playback configuration for the current animation to the `LottieAnimationView`
  private func applyCurrentAnimationConfiguration(to view: LottieAnimationView) {
    guard let animationSource else { return }
    var imageProviderConfiguration = imageProviderConfiguration
    var playbackMode = playbackMode
    var animationSpeed = animationSpeed

    // When playing a dotLottie animation, its `DotLottieConfiguration`
    // can override some behavior of the animation.
    if let dotLottieConfiguration = animationSource.dotLottieAnimation?.configuration {
      // Only use the value from the `DotLottieConfiguration` is that component
      // is specified in the list of `dotLottieConfigurationComponents`.
      if dotLottieConfigurationComponents.contains(.loopMode) {
        playbackMode = playbackMode?.loopMode(dotLottieConfiguration.loopMode)
      }

      if dotLottieConfigurationComponents.contains(.animationSpeed) {
        animationSpeed = dotLottieConfiguration.speed
      }

      if
        dotLottieConfigurationComponents.contains(.imageProvider),
        let dotLottieImageProvider = dotLottieConfiguration.dotLottieImageProvider
      {
        imageProviderConfiguration = (
          imageProvider: dotLottieImageProvider,
          imageProvidersAreEqual: { untypedLHS, untypedRHS in
            guard
              let lhs = untypedLHS as? DotLottieImageProvider,
              let rhs = untypedRHS as? DotLottieImageProvider
            else { return false }

            return lhs == rhs
          })
      }
    }

    // We check referential equality of the animation before updating as updating the
    // animation has a side-effect of rebuilding the animation layer, and it would be
    // prohibitive to do so on every state update.
    if animationSource.animation !== view.animation {
      view.loadAnimation(animationSource)
      animationDidLoad?(animationSource)
    }

    if 
      let playbackMode,
      playbackMode != view.currentPlaybackMode
    {
      view.setPlaybackMode(playbackMode, completion: animationCompletionHandler)
    }

    if
      let (imageProvider, imageProvidersAreEqual) = imageProviderConfiguration,
      !imageProvidersAreEqual(imageProvider, view.imageProvider)
    {
      view.imageProvider = imageProvider
    }

    if
      let animationSpeed,
      animationSpeed != view.animationSpeed
    {
      view.animationSpeed = animationSpeed
    }
  }
}

@available(iOS 13.0, tvOS 13.0, macOS 10.15, *)
extension View {

  /// The `.overlay` modifier that uses a `ViewBuilder` is available in iOS 15+, this helper function helps us to use the same API in older OSs
  fileprivate func overlay(
    @ViewBuilder content: () -> some View)
    -> some View
  {
    overlay(content(), alignment: .center)
  }
}

#endif
