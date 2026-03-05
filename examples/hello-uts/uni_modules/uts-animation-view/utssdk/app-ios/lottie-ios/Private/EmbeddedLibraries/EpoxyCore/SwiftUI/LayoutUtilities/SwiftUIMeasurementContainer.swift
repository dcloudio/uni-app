// Created by Bryn Bodayle on 1/24/22.
// Copyright © 2022 Airbnb Inc. All rights reserved.

#if canImport(SwiftUI)
import SwiftUI

// MARK: - SwiftUIMeasurementContainer

/// A view that has an `intrinsicContentSize` of the `uiView`'s `systemLayoutSizeFitting(…)` and
/// supports double layout pass sizing and content size category changes.
///
/// This container view uses an injected proposed width to measure the view and return its ideal
/// height through the `SwiftUISizingContext` binding.
///
/// - SeeAlso: ``MeasuringViewRepresentable``
@available(iOS 13.0, tvOS 13.0, macOS 10.15, *)
final class SwiftUIMeasurementContainer<Content: ViewType>: ViewType {

  // MARK: Lifecycle

  init(content: Content, strategy: SwiftUIMeasurementContainerStrategy) {
    self.content = content
    self.strategy = strategy

    // On iOS 15 and below, passing zero can result in a constraint failure the first time a view
    // is displayed, but the system gracefully recovers afterwards. On iOS 16, it's fine to pass
    // zero.
    let initialSize: CGSize
    if #available(iOS 16, tvOS 16, macOS 13, *) {
      initialSize = .zero
    } else {
      initialSize = .init(width: 375, height: 150)
    }
    super.init(frame: .init(origin: .zero, size: initialSize))

    addSubview(content)
    setUpConstraints()
  }

  @available(*, unavailable)
  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  // MARK: Internal

  /// The  most recently measured fitting size of the `uiView` that fits within the current
  /// `proposedSize`.
  ///
  /// Contains `proposedSize`/`bounds.size` fallbacks for dimensions with no intrinsic size, as
  /// compared to `intrinsicContentSize` which has `UIView.noIntrinsicMetric` fields in the case of
  /// no intrinsic size.
  var measuredFittingSize: CGSize {
    _measuredFittingSize ?? measureView()
  }

  /// The `UIView` content that's being measured by this container.
  var content: Content {
    didSet {
      guard content !== oldValue else { return }
      oldValue.removeFromSuperview()
      addSubview(content)
      // Invalidate the strategy since it's derived from this view.
      _resolvedStrategy = nil
      // Re-configure the constraints since they depend on the resolved strategy.
      setUpConstraints()
      // Finally, we need to re-measure the view.
      _measuredFittingSize = nil
    }
  }

  /// The proposed size at the time of the latest measurement.
  ///
  /// Has a side-effect of updating the `measuredIntrinsicContentSize` if it's changed.
  var proposedSize = CGSize.noIntrinsicMetric {
    didSet {
      guard oldValue != proposedSize else { return }
      // The proposed size is only used by the measurement, so just re-measure.
      _measuredFittingSize = nil
    }
  }

  /// The measurement strategy of this container.
  ///
  /// Has a side-effect of updating the `measuredIntrinsicContentSize` if it's changed.
  var strategy: SwiftUIMeasurementContainerStrategy {
    didSet {
      guard oldValue != strategy else { return }
      // Invalidate the resolved strategy since it's derived from this strategy.
      _resolvedStrategy = nil
      // Then, re-measure the view.
      _measuredFittingSize = nil
    }
  }

  override var intrinsicContentSize: CGSize {
    _intrinsicContentSize
  }

  #if os(macOS)
  override func layout() {
    super.layout()

    // We need to re-measure the view whenever the size of the bounds changes, as the previous size
    // may now be incorrect.
    if latestMeasurementBoundsSize != nil, bounds.size != latestMeasurementBoundsSize {
      // This will trigger SwiftUI to re-measure the view.
      super.invalidateIntrinsicContentSize()
    }
  }
  #else
  override func layoutSubviews() {
    super.layoutSubviews()

    // We need to re-measure the view whenever the size of the bounds changes, as the previous size
    // may now be incorrect.
    if latestMeasurementBoundsSize != nil, bounds.size != latestMeasurementBoundsSize {
      // This will trigger SwiftUI to re-measure the view.
      super.invalidateIntrinsicContentSize()
    }
  }
  #endif

  override func invalidateIntrinsicContentSize() {
    super.invalidateIntrinsicContentSize()

    // Invalidate the resolved strategy in case it changes with the re-measurement as it relies on
    // the intrinsic size.
    _resolvedStrategy = nil
    _measuredFittingSize = nil
  }

  // MARK: Private

  /// The most recently measured intrinsic content size of the `uiView`, else `noIntrinsicMetric` if
  /// it has not yet been measured.
  ///
  /// Contains `UIView.noIntrinsicMetric` fallbacks for dimensions with no intrinsic size,
  /// as compared to `measuredFittingSize` which has `proposedSize`/`bounds.size` fallbacks.
  private var _intrinsicContentSize = CGSize.noIntrinsicMetric

  /// The bounds size at the time of the latest measurement.
  private var latestMeasurementBoundsSize: CGSize?

  /// The most recently updated set of constraints constraining `uiView` to `self`.
  private var uiViewConstraints = [NSLayoutConstraint.Attribute: NSLayoutConstraint]()

  /// The cached `resolvedStrategy` to prevent unnecessary re-measurements.
  private var _resolvedStrategy: ResolvedSwiftUIMeasurementContainerStrategy?

  /// The cached `measuredFittingSize` to prevent unnecessary re-measurements.
  private var _measuredFittingSize: CGSize?

  /// The resolved measurement strategy.
  private var resolvedStrategy: ResolvedSwiftUIMeasurementContainerStrategy {
    if let resolvedStrategy = _resolvedStrategy {
      return resolvedStrategy
    }

    let resolved: ResolvedSwiftUIMeasurementContainerStrategy
    switch strategy {
    case .automatic:
      // Perform an intrinsic size measurement pass, which gives us valid values for
      // `UILabel.preferredMaxLayoutWidth`.
      let intrinsicSize = content.systemLayoutFittingIntrinsicSize()

      // If the view has a intrinsic width and contains a double layout pass subview, give it the
      // proposed width to allow the label content to gracefully wrap to multiple lines.
      if intrinsicSize.width > 0, content.containsDoubleLayoutPassSubviews() {
        resolved = .intrinsicHeightProposedWidth
      } else {
        let zero = CGFloat(0)
        switch (width: intrinsicSize.width, height: intrinsicSize.height) {
        case (width: ...zero, height: ...zero):
          resolved = .proposed
        case (width: ...zero, height: zero.nextUp...):
          resolved = .intrinsicHeightProposedWidth
        case (width: zero.nextUp..., height: ...zero):
          resolved = .intrinsicWidthProposedHeight
        default:
          resolved = .intrinsic(intrinsicSize)
        }
      }
    case .proposed:
      resolved = .proposed
    case .intrinsicHeightProposedWidth:
      resolved = .intrinsicHeightProposedWidth
    case .intrinsicWidthProposedHeight:
      resolved = .intrinsicWidthProposedHeight
    case .intrinsic:
      resolved = .intrinsic(content.systemLayoutFittingIntrinsicSize())
    }
    _resolvedStrategy = resolved
    return resolved
  }

  private func setUpConstraints() {
    content.translatesAutoresizingMaskIntoConstraints = false

    let leading = content.leadingAnchor.constraint(equalTo: leadingAnchor)
    let top = content.topAnchor.constraint(equalTo: topAnchor)
    let trailing = content.trailingAnchor.constraint(equalTo: trailingAnchor)
    let bottom = content.bottomAnchor.constraint(equalTo: bottomAnchor)
    let newConstraints: [NSLayoutConstraint.Attribute: NSLayoutConstraint] = [
      .leading: leading, .top: top, .trailing: trailing, .bottom: bottom,
    ]
    // Start with the lowest priority constraints so we aren't measuring the view too early, the
    // priorities will be updated later on.
    prioritizeConstraints(newConstraints, strategy: .intrinsic(.zero))

    NSLayoutConstraint.deactivate(Array(uiViewConstraints.values))
    uiViewConstraints = newConstraints
    NSLayoutConstraint.activate(Array(uiViewConstraints.values))
  }

  /// Prioritizes the given constraints based on the provided resolved strategy.
  private func prioritizeConstraints(
    _ constraints: [NSLayoutConstraint.Attribute: NSLayoutConstraint],
    strategy: ResolvedSwiftUIMeasurementContainerStrategy)
  {
    // Give a required constraint in the dimensions that are fixed to the bounds, otherwise almost
    // required.
    switch strategy {
    case .proposed:
      constraints[.trailing]?.priority = .required
      constraints[.bottom]?.priority = .required
    case .intrinsicHeightProposedWidth:
      constraints[.trailing]?.priority = .required
      constraints[.bottom]?.priority = .almostRequired
    case .intrinsicWidthProposedHeight:
      constraints[.trailing]?.priority = .almostRequired
      constraints[.bottom]?.priority = .required
    case .intrinsic:
      constraints[.trailing]?.priority = .almostRequired
      constraints[.bottom]?.priority = .almostRequired
    }

    #if os(macOS)
    // On macOS, views default to having required constraints setting their height / width
    // equal to their intrinsic content size. These have to be disabled in favor of the constraints
    // we create here.
    content.isVerticalContentSizeConstraintActive = false
    content.isHorizontalContentSizeConstraintActive = false
    #endif
  }

  /// Measures the `uiView`, storing the resulting size in `measuredIntrinsicContentSize`.
  private func measureView() -> CGSize {
    latestMeasurementBoundsSize = bounds.size
    prioritizeConstraints(uiViewConstraints, strategy: resolvedStrategy)

    var measuredSize: CGSize
    let proposedSizeElseBounds = proposedSize.replacingNoIntrinsicMetric(with: bounds.size)

    switch resolvedStrategy {
    case .proposed:
      measuredSize = .noIntrinsicMetric

    case .intrinsicHeightProposedWidth:
      measuredSize = content.systemLayoutFittingIntrinsicHeightFixedWidth(proposedSizeElseBounds.width)
      measuredSize.width = ViewType.noIntrinsicMetric

    case .intrinsicWidthProposedHeight:
      measuredSize = content.systemLayoutFittingIntrinsicWidthFixedHeight(proposedSizeElseBounds.height)
      measuredSize.height = ViewType.noIntrinsicMetric

    case .intrinsic(let size):
      measuredSize = size

      // If the measured size exceeds an available width or height, set the measured size to
      // `noIntrinsicMetric` to ensure that the component can be compressed, otherwise it will
      // overflow beyond the proposed size.
      // - If the previous intrinsic content size is the same as the new proposed size, we don't
      //   do this as SwiftUI sometimes "proposes" the same intrinsic size back to the component and
      //   we don't want that scenario to prevent size changes when there is actually more space
      //   available.
      if
        proposedSize.width != ViewType.noIntrinsicMetric,
        measuredSize.width > proposedSizeElseBounds.width,
        _intrinsicContentSize.width != proposedSize.width
      {
        measuredSize.width = ViewType.noIntrinsicMetric
      }
      if
        proposedSize.height != ViewType.noIntrinsicMetric,
        measuredSize.height > proposedSizeElseBounds.height,
        _intrinsicContentSize.height != proposedSize.height
      {
        measuredSize.height = ViewType.noIntrinsicMetric
      }
    }

    _intrinsicContentSize = measuredSize

    let measuredFittingSize = measuredSize.replacingNoIntrinsicMetric(with: proposedSizeElseBounds)
    _measuredFittingSize = measuredFittingSize
    return measuredFittingSize
  }
}

// MARK: - SwiftUIMeasurementContainerStrategy

/// The measurement strategy of a `SwiftUIMeasurementContainer`.
enum SwiftUIMeasurementContainerStrategy {
  /// The container makes a best effort to correctly choose the measurement strategy of the view.
  ///
  /// The best effort is based on a number of heuristics:
  /// - The `uiView` will be given its intrinsic width and/or height when measurement in that
  ///   dimension produces a positive value, while zero/negative values will result in that
  ///   dimension receiving the available space proposed by the parent.
  /// - If the view contains `UILabel` subviews that require a double layout pass as determined by
  ///   a `preferredMaxLayoutWidth` that's greater than zero after a layout, then the view will
  ///   default to `intrinsicHeightProposedWidth` to allow the labels to wrap.
  ///
  /// If you would like to opt out of automatic sizing for performance or to override the default
  /// behavior, choose another strategy.
  case automatic

  /// The `uiView` is sized to fill the area proposed by its parent.
  ///
  /// Typically used for views that should expand greedily in both axes, e.g. a background view.
  case proposed

  /// The `uiView` is sized with its intrinsic height and expands horizontally to fill the width
  /// proposed by its parent.
  ///
  /// Typically used for views that have a height that's a function of their width, e.g. a row with
  /// text that can wrap to multiple lines.
  case intrinsicHeightProposedWidth

  /// The `uiView` is sized with its intrinsic width and expands vertically to fill the height
  /// proposed by its parent.
  ///
  /// Typically used for views that are free to grow vertically but have a fixed width, e.g. a view
  /// in a horizontal carousel.
  case intrinsicWidthProposedHeight

  /// The `uiView` is sized to its intrinsic width and height.
  ///
  /// Typically used for components with a specific intrinsic size in both axes, e.g. controls or
  /// inputs.
  case intrinsic
}

// MARK: - ResolvedSwiftUIMeasurementContainerStrategy

/// The resolved measurement strategy of a `SwiftUIMeasurementContainer`, matching the cases of the
/// `SwiftUIMeasurementContainerStrategy` without the automatic case.
private enum ResolvedSwiftUIMeasurementContainerStrategy {
  case proposed, intrinsicHeightProposedWidth, intrinsicWidthProposedHeight, intrinsic(CGSize)
}

// MARK: - UILayoutPriority

extension LayoutPriorityType {
  /// An "almost required" constraint, useful for creating near-required constraints that don't
  /// error when unable to be satisfied.
  @nonobjc
  fileprivate static var almostRequired: LayoutPriorityType { .init(rawValue: required.rawValue - 1) }
}

// MARK: - UIView

extension ViewType {
  /// The `systemLayoutSizeFitting(…)` of this view with a compressed size and fitting priorities.
  @nonobjc
  fileprivate func systemLayoutFittingIntrinsicSize() -> CGSize {
    #if os(macOS)
    intrinsicContentSize
    #else
    systemLayoutSizeFitting(
      UIView.layoutFittingCompressedSize,
      withHorizontalFittingPriority: .fittingSizeLevel,
      verticalFittingPriority: .fittingSizeLevel)
    #endif
  }

  /// The `systemLayoutSizeFitting(…)` of this view with a compressed height with a fitting size
  /// priority and with the given fixed width and fitting priority.
  @nonobjc
  fileprivate func systemLayoutFittingIntrinsicHeightFixedWidth(
    _ width: CGFloat,
    priority: LayoutPriorityType = .almostRequired)
    -> CGSize
  {
    #if os(macOS)
    return CGSize(width: width, height: intrinsicContentSize.height)
    #else
    let targetSize = CGSize(width: width, height: UIView.layoutFittingCompressedSize.height)

    return systemLayoutSizeFitting(
      targetSize,
      withHorizontalFittingPriority: priority,
      verticalFittingPriority: .fittingSizeLevel)
    #endif
  }

  /// The `systemLayoutSizeFitting(…)` of this view with a compressed width with a fitting size
  /// priority and with the given fixed height and fitting priority.
  @nonobjc
  fileprivate func systemLayoutFittingIntrinsicWidthFixedHeight(
    _ height: CGFloat,
    priority: LayoutPriorityType = .almostRequired)
    -> CGSize
  {
    #if os(macOS)
    return CGSize(width: intrinsicContentSize.width, height: height)
    #else
    let targetSize = CGSize(width: UIView.layoutFittingCompressedSize.width, height: height)

    return systemLayoutSizeFitting(
      targetSize,
      withHorizontalFittingPriority: .fittingSizeLevel,
      verticalFittingPriority: priority)
    #endif
  }

  /// Whether this view or any of its subviews has a subview that has a double layout pass `UILabel`
  /// as determined by a non-zero `preferredMaxLayoutWidth`, which implies that it should get a
  /// `intrinsicHeightProposedWidth` sizing strategy to allow the label to wrap and grow.
  @nonobjc
  fileprivate func containsDoubleLayoutPassSubviews() -> Bool {
    #if os(macOS)
    return false
    #else
    var contains = false
    if let label = self as? UILabel, label.preferredMaxLayoutWidth > 0 {
      contains = true
    }
    for subview in subviews {
      contains = contains || subview.containsDoubleLayoutPassSubviews()
    }
    return contains
    #endif
  }
}

// MARK: - CGSize

extension CGSize {
  /// A `CGSize` with `noIntrinsicMetric` for both its width and height.
  fileprivate static var noIntrinsicMetric: CGSize {
    .init(width: ViewType.noIntrinsicMetric, height: ViewType.noIntrinsicMetric)
  }

  /// Returns a `CGSize` with its width and/or height replaced with the corresponding field of the
  /// provided `fallback` size if they are `UIView.noIntrinsicMetric`.
  fileprivate func replacingNoIntrinsicMetric(with fallback: CGSize) -> CGSize {
    .init(
      width: width == ViewType.noIntrinsicMetric ? fallback.width : width,
      height: height == ViewType.noIntrinsicMetric ? fallback.height : height)
  }
}
#endif
