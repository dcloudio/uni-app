// Created by Cal Stephens on 12/14/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - ShapeLayer

/// The CALayer type responsible for rendering `ShapeLayerModel`s
final class ShapeLayer: BaseCompositionLayer {

  // MARK: Lifecycle

  init(shapeLayer: ShapeLayerModel, context: LayerContext) throws {
    self.shapeLayer = shapeLayer
    super.init(layerModel: shapeLayer)
    try setUpGroups(context: context)
  }

  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  /// Called by CoreAnimation to create a shadow copy of this layer
  /// More details: https://developer.apple.com/documentation/quartzcore/calayer/1410842-init
  override init(layer: Any) {
    guard let typedLayer = layer as? Self else {
      fatalError("\(Self.self).init(layer:) incorrectly called with \(type(of: layer))")
    }

    shapeLayer = typedLayer.shapeLayer
    super.init(layer: typedLayer)
  }

  // MARK: Private

  private let shapeLayer: ShapeLayerModel

  private func setUpGroups(context: LayerContext) throws {
    let shapeItems = shapeLayer.items.map { ShapeItemLayer.Item(item: $0, groupPath: []) }
    try setupGroups(from: shapeItems, parentGroup: nil, parentGroupPath: [], context: context)
  }

}

// MARK: - GroupLayer

/// The CALayer type responsible for rendering `Group`s
final class GroupLayer: BaseAnimationLayer {

  // MARK: Lifecycle

  init(group: Group, items: [ShapeItemLayer.Item], groupPath: [String], context: LayerContext) throws {
    self.group = group
    self.items = items
    self.groupPath = groupPath
    super.init()
    try setupLayerHierarchy(context: context)
  }

  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  /// Called by CoreAnimation to create a shadow copy of this layer
  /// More details: https://developer.apple.com/documentation/quartzcore/calayer/1410842-init
  override init(layer: Any) {
    guard let typedLayer = layer as? Self else {
      fatalError("\(Self.self).init(layer:) incorrectly called with \(type(of: layer))")
    }

    group = typedLayer.group
    items = typedLayer.items
    groupPath = typedLayer.groupPath
    super.init(layer: typedLayer)
  }

  // MARK: Internal

  override func setupAnimations(context: LayerAnimationContext) throws {
    try super.setupAnimations(context: context)

    if let (shapeTransform, context) = nonGroupItems.first(ShapeTransform.self, context: context) {
      try addTransformAnimations(for: shapeTransform, context: context)
      try addOpacityAnimation(for: shapeTransform, context: context)
    }
  }

  // MARK: Private

  private let group: Group

  /// `ShapeItemLayer.Item`s rendered by this `Group`
  ///  - In the original `ShapeLayer` data model, these items could have originated from a different group
  private let items: [ShapeItemLayer.Item]

  /// The keypath that represents this group, with respect to the parent `ShapeLayer`
  ///  - Due to the way `GroupLayer`s are setup, the original `ShapeItem`
  ///    hierarchy from the `ShapeLayer` data model may no longer exactly
  ///    match the hierarchy of `GroupLayer` / `ShapeItemLayer`s constructed
  ///    at runtime. Since animation keypaths need to match the original
  ///    structure of the `ShapeLayer` data model, we track that info here.
  private let groupPath: [String]

  /// Child group items contained in this group. Correspond to a child `GroupLayer`
  private lazy var childGroups = items.filter { $0.item is Group }

  /// `ShapeItem`s (other than nested `Group`s) that are rendered by this layer
  private lazy var nonGroupItems = items.filter { !($0.item is Group) }

  private func setupLayerHierarchy(context: LayerContext) throws {
    // Groups can contain other groups, so we may have to continue
    // recursively creating more `GroupLayer`s
    try setupGroups(from: items, parentGroup: group, parentGroupPath: groupPath, context: context)

    // Create `ShapeItemLayer`s for each subgroup of shapes that should be rendered as a single unit
    //  - These groups are listed from front-to-back, so we have to add the sublayers in reverse order
    let renderGroups = items.shapeRenderGroups(groupHasChildGroupsToInheritUnusedItems: !childGroups.isEmpty)
    for shapeRenderGroup in renderGroups.validGroups.reversed() {
      // When there are multiple path-drawing items, they're supposed to be rendered
      // in a single `CAShapeLayer` (instead of rendering them in separate layers) so
      // `CAShapeLayerFillRule.evenOdd` can be applied correctly if the paths overlap.
      // Since a `CAShapeLayer` only supports animating a single `CGPath` from a single `KeyframeGroup<BezierPath>`,
      // this requires combining all of the path-drawing items into a single set of keyframes.
      if
        shapeRenderGroup.pathItems.count > 1,
        // We currently only support this codepath for `Shape` items that directly contain bezier path keyframes.
        // We could also support this for other path types like rectangles, ellipses, and polygons with more work.
        shapeRenderGroup.pathItems.allSatisfy({ $0.item is Shape }),
        // `Trim`s are currently only applied correctly using individual `ShapeItemLayer`s,
        // because each path has to be trimmed separately.
        !shapeRenderGroup.otherItems.contains(where: { $0.item is Trim })
      {
        let allPathKeyframes = shapeRenderGroup.pathItems.compactMap { ($0.item as? Shape)?.path }
        let combinedShape = CombinedShapeItem(
          shapes: Keyframes.combined(allPathKeyframes),
          name: group.name)

        let sublayer = try ShapeItemLayer(
          shape: ShapeItemLayer.Item(item: combinedShape, groupPath: shapeRenderGroup.pathItems[0].groupPath),
          otherItems: shapeRenderGroup.otherItems,
          context: context)

        addSublayer(sublayer)
      }

      // Otherwise, if each `ShapeItem` that draws a `GGPath` animates independently,
      // we have to create a separate `ShapeItemLayer` for each one. This may render
      // incorrectly if there are multiple paths that overlap with each other.
      else {
        for pathDrawingItem in shapeRenderGroup.pathItems {
          let sublayer = try ShapeItemLayer(
            shape: pathDrawingItem,
            otherItems: shapeRenderGroup.otherItems,
            context: context)

          addSublayer(sublayer)
        }
      }
    }
  }

}

extension CALayer {

  // MARK: Fileprivate

  /// Sets up `GroupLayer`s for each `Group` in the given list of `ShapeItem`s
  ///  - Each `Group` item becomes its own `GroupLayer` sublayer.
  ///  - Other `ShapeItem` are applied to all sublayers
  fileprivate func setupGroups(
    from items: [ShapeItemLayer.Item],
    parentGroup: Group?,
    parentGroupPath: [String],
    context: LayerContext)
    throws
  {
    // If the layer has any `Repeater`s, set up each repeater
    // and then handle any remaining groups like normal.
    if items.contains(where: { $0.item is Repeater }) {
      let repeaterGroupings = items.split(whereSeparator: { $0.item is Repeater })

      // Iterate through the groupings backwards to preserve the expected rendering order
      for repeaterGrouping in repeaterGroupings.reversed() {
        // Each repeater applies to the previous items in the list
        if let repeater = repeaterGrouping.trailingSeparator?.item as? Repeater {
          try setUpRepeater(
            repeater,
            items: repeaterGrouping.grouping,
            parentGroupPath: parentGroupPath,
            context: context)
        }

        // Any remaining items after the last repeater are handled like normal
        else {
          try setupGroups(
            from: repeaterGrouping.grouping,
            parentGroup: parentGroup,
            parentGroupPath: parentGroupPath,
            context: context)
        }
      }
    }

    else {
      let groupLayers = try makeGroupLayers(
        from: items,
        parentGroup: parentGroup,
        parentGroupPath: parentGroupPath,
        context: context)

      for groupLayer in groupLayers {
        addSublayer(groupLayer)
      }
    }
  }

  // MARK: Private

  /// Sets up this layer using the given `Repeater`
  private func setUpRepeater(
    _ repeater: Repeater,
    items allItems: [ShapeItemLayer.Item],
    parentGroupPath: [String],
    context: LayerContext)
    throws
  {
    let items = allItems.filter { !($0.item is Repeater) }
    let copyCount = Int(try repeater.copies.exactlyOneKeyframe(context: context, description: "repeater copies").value)

    for index in 0..<copyCount {
      let groupLayers = try makeGroupLayers(
        from: items,
        parentGroup: nil, // The repeater layer acts as the parent of its sublayers
        parentGroupPath: parentGroupPath,
        context: context)

      for groupLayer in groupLayers {
        let repeatedLayer = RepeaterLayer(repeater: repeater, childLayer: groupLayer, index: index)
        addSublayer(repeatedLayer)
      }
    }
  }

  /// Creates a `GroupLayer` for each `Group` in the given list of `ShapeItem`s
  ///  - Each `Group` item becomes its own `GroupLayer` sublayer.
  ///  - Other `ShapeItem` are applied to all sublayers
  private func makeGroupLayers(
    from items: [ShapeItemLayer.Item],
    parentGroup: Group?,
    parentGroupPath: [String],
    context: LayerContext)
    throws -> [GroupLayer]
  {
    var groupItems = items.compactMap { $0.item as? Group }.filter { !$0.hidden }
    var otherItems = items.filter { !($0.item is Group) && !$0.item.hidden }

    // Handle the top-level `shapeLayer.items` array. This is typically just a single `Group`,
    // but in practice can be any combination of items. The implementation expects all path-drawing
    // shape items to be managed by a `GroupLayer`, so if there's a top-level path item we
    // have to create a placeholder group.
    if parentGroup == nil, otherItems.contains(where: { $0.item.drawsCGPath }) {
      groupItems = [Group(items: items.map { $0.item }, name: "")]
      otherItems = []
    }

    // Any child items that wouldn't be included in a valid shape render group
    // need to be applied to child groups (otherwise they'd be silently ignored).
    let inheritedItemsForChildGroups = otherItems
      .shapeRenderGroups(groupHasChildGroupsToInheritUnusedItems: !groupItems.isEmpty)
      .unusedItems

    // Groups are listed from front to back,
    // but `CALayer.sublayers` are listed from back to front.
    let groupsInZAxisOrder = groupItems.reversed()

    return try groupsInZAxisOrder.compactMap { group in
      var pathForChildren = parentGroupPath
      if !group.name.isEmpty {
        pathForChildren.append(group.name)
      }

      let childItems = group.items
        .filter { !$0.hidden }
        .map { ShapeItemLayer.Item(item: $0, groupPath: pathForChildren) }

      // Some shape item properties are affected by scaling (e.g. stroke width).
      // The child group may have a `ShapeTransform` that affects the scale of its items,
      // but shouldn't affect the scale of any inherited items. To prevent this scale
      // from affecting inherited items, we have to apply an inverse scale to them.
      let inheritedItems = try inheritedItemsForChildGroups.map { item in
        ShapeItemLayer.Item(
          item: try item.item.scaledCopyForChildGroup(group, context: context),
          groupPath: item.groupPath)
      }

      return try GroupLayer(
        group: group,
        items: childItems + inheritedItems,
        groupPath: pathForChildren,
        context: context)
    }
  }
}

extension ShapeItem {
  /// Whether or not this `ShapeItem` is responsible for rendering a `CGPath`
  var drawsCGPath: Bool {
    switch type {
    case .ellipse, .rectangle, .shape, .star:
      return true

    case .fill, .gradientFill, .group, .gradientStroke, .merge,
         .repeater, .round, .stroke, .trim, .transform, .unknown:
      return false
    }
  }

  /// Whether or not this `ShapeItem` provides a fill for a set of shapes
  var isFill: Bool {
    switch type {
    case .fill, .gradientFill:
      return true

    case .ellipse, .rectangle, .shape, .star, .group, .gradientStroke,
         .merge, .repeater, .round, .stroke, .trim, .transform, .unknown:
      return false
    }
  }

  /// Whether or not this `ShapeItem` provides a stroke for a set of shapes
  var isStroke: Bool {
    switch type {
    case .stroke, .gradientStroke:
      return true

    case .ellipse, .rectangle, .shape, .star, .group, .gradientFill,
         .merge, .repeater, .round, .fill, .trim, .transform, .unknown:
      return false
    }
  }

  // For any inherited shape items that are affected by scaling (e.g. strokes but not fills),
  // any `ShapeTransform` in the given child group isn't supposed to be applied to the item.
  // To cancel out the effect of the transform, we can apply an inverse transform to the
  // shape item.
  func scaledCopyForChildGroup(_ childGroup: Group, context: LayerContext) throws -> ShapeItem {
    guard
      // Path-drawing items aren't inherited by child groups in this way
      !drawsCGPath,
      // Stroke widths are affected by scaling, but fill colors aren't.
      // We can expand this to other types of items in the future if necessary.
      let stroke = self as? StrokeShapeItem,
      // We only need to handle scaling if there's a `ShapeTransform` present
      let transform = childGroup.items.first(where: { $0 is ShapeTransform }) as? ShapeTransform
    else { return self }

    let newWidth = try Keyframes.combined(stroke.width, transform.scale) { strokeWidth, scale -> LottieVector1D in
      // Since we're applying this scale to a scalar value rather than to a layer,
      // we can only handle cases where the scale is also a scalar (e.g. the same for both x and y)
      try context.compatibilityAssert(scale.x == scale.y, """
        The Core Animation rendering engine doesn't support applying separate x/y scale values \
        (x: \(scale.x), y: \(scale.y)) to this stroke item (\(self.name)).
        """)

      return LottieVector1D(strokeWidth.value * (100 / scale.x))
    }

    return stroke.copy(width: newWidth)
  }
}

extension Collection {
  /// Splits this collection into two groups, based on the given predicate
  func grouped(by predicate: (Element) -> Bool) -> (trueElements: [Element], falseElements: [Element]) {
    var trueElements = [Element]()
    var falseElements = [Element]()

    for element in self {
      if predicate(element) {
        trueElements.append(element)
      } else {
        falseElements.append(element)
      }
    }

    return (trueElements, falseElements)
  }

  /// Splits this collection into an array of grouping separated by the given separator.
  /// For example, `[A, B, C]` split by `B` returns an array with two elements:
  ///  1. `(grouping: [A], trailingSeparator: B)`
  ///  2. `(grouping: [C], trailingSeparator: nil)`
  func split(whereSeparator separatorPredicate: (Element) -> Bool)
    -> [(grouping: [Element], trailingSeparator: Element?)]
  {
    guard !isEmpty else { return [] }

    var groupings: [(grouping: [Element], trailingSeparator: Element?)] = []

    for element in self {
      if groupings.isEmpty || groupings.last?.trailingSeparator != nil {
        groupings.append((grouping: [], trailingSeparator: nil))
      }

      if separatorPredicate(element) {
        groupings[groupings.indices.last!].trailingSeparator = element
      } else {
        groupings[groupings.indices.last!].grouping.append(element)
      }
    }

    return groupings
  }
}

// MARK: - ShapeRenderGroup

/// A group of `ShapeItem`s that should be rendered together as a single unit
struct ShapeRenderGroup {
  /// The items in this group that render `CGPath`s.
  /// Valid shape render groups must have at least one path-drawing item.
  var pathItems: [ShapeItemLayer.Item] = []
  /// Shape items that modify the appearance of the shapes rendered by this group
  var otherItems: [ShapeItemLayer.Item] = []
}

extension [ShapeItemLayer.Item] {
  /// Splits this list of `ShapeItem`s into groups that should be rendered together as individual units,
  /// plus the remaining items that were not included in any group.
  ///  - groupHasChildGroupsToInheritUnusedItems: whether or not this group has child groups
  ///    that will inherit any items that aren't used as part of a valid render group
  func shapeRenderGroups(groupHasChildGroupsToInheritUnusedItems: Bool)
    -> (validGroups: [ShapeRenderGroup], unusedItems: [ShapeItemLayer.Item])
  {
    var renderGroups = [ShapeRenderGroup()]

    for item in self {
      // `renderGroups` is non-empty, so is guaranteed to have a valid end index
      var lastIndex: Int {
        renderGroups.indices.last!
      }

      if item.item.drawsCGPath {
        // Trims should only affect paths that precede them in the group,
        // so if the existing group already has a trim we create a new group for this path item.
        if renderGroups[lastIndex].otherItems.contains(where: { $0.item is Trim }) {
          renderGroups.append(ShapeRenderGroup())
        }

        renderGroups[lastIndex].pathItems.append(item)
      }

      // `Fill` items are unique, because they specifically only apply to _previous_ shapes in a `Group`
      //  - For example, with [Rectangle, Fill(Red), Circle, Fill(Blue)], the Rectangle should be Red
      //    but the Circle should be Blue.
      //  - To handle this, we create a new `ShapeRenderGroup` when we encounter a `Fill` item
      else if item.item.isFill {
        renderGroups[lastIndex].otherItems.append(item)

        // There are cases where the current render group doesn't have a path-drawing
        // shape item yet, and could just contain this fill. Some examples:
        //  - `[Circle, Fill(Red), Fill(Green)]`: In this case, the second fill would
        //    be unused and silently ignored. To avoid this we render the fill using
        //    the shape items from the previous group.
        // - `[Circle, Fill(Red), Group, Fill(Green)]`: In this case, the second fill
        //   is inherited and rendered by the child group.
        if
          renderGroups[lastIndex].pathItems.isEmpty,
          !groupHasChildGroupsToInheritUnusedItems,
          lastIndex != renderGroups.indices.first
        {
          renderGroups[lastIndex].pathItems = renderGroups[lastIndex - 1].pathItems
        }

        // Finalize the group so the fill item doesn't affect following shape items
        renderGroups.append(ShapeRenderGroup())
      }

      // Other items in the list are applied to all subgroups
      else {
        for index in renderGroups.indices {
          renderGroups[index].otherItems.append(item)
        }
      }
    }

    /// The main thread rendering engine draws each Stroke and Fill as a separate `CAShapeLayer`.
    /// As an optimization, we can combine them into a single shape layer when a few conditions are met:
    ///  1. There is at most one stroke and one fill (a `CAShapeLayer` can only render one of each)
    ///  2. The stroke is drawn on top of the fill (the behavior of a `CAShapeLayer`)
    ///  3. The fill and stroke have the same `opacity` animations (since a `CAShapeLayer` can only render
    ///     a single set of `opacity` animations).
    /// Otherwise, each stroke / fill needs to be split into a separate layer.
    renderGroups = renderGroups.flatMap { group -> [ShapeRenderGroup] in
      let (strokesAndFills, otherItems) = group.otherItems.grouped(by: { $0.item.isFill || $0.item.isStroke })
      let (strokes, fills) = strokesAndFills.grouped(by: { $0.item.isStroke })

      // A `CAShapeLayer` can only draw a single fill and a single stroke
      let hasAtMostOneFill = fills.count <= 1
      let hasAtMostOneStroke = strokes.count <= 1

      // A `CAShapeLayer` can only draw a stroke on top of a fill -- if the fill is supposed to be
      // drawn on top of the stroke, then they have to be rendered as separate layers.
      let strokeDrawnOnTopOfFill: Bool
      if
        let strokeIndex = strokesAndFills.firstIndex(where: { $0.item.isStroke }),
        let fillIndex = strokesAndFills.firstIndex(where: { $0.item.isFill })
      {
        strokeDrawnOnTopOfFill = strokeIndex < fillIndex
      } else {
        strokeDrawnOnTopOfFill = false
      }

      // `Fill` and `Stroke` items have an `alpha` property that can be animated separately,
      // but each layer only has a single `opacity` property. We can only use a single `CAShapeLayer`
      // when the items have the same `alpha` animations.
      let allAlphaAnimationsAreIdentical = {
        strokesAndFills.allSatisfy { item in
          (item.item as? OpacityAnimationModel)?.opacity
            == (strokesAndFills.first?.item as? OpacityAnimationModel)?.opacity
        }
      }

      // If all the required conditions are met, this group can be rendered using a single `ShapeItemLayer`
      if
        hasAtMostOneFill,
        hasAtMostOneStroke,
        strokeDrawnOnTopOfFill,
        allAlphaAnimationsAreIdentical()
      {
        return [group]
      }

      // Otherwise each stroke / fill needs to be rendered as a separate `ShapeItemLayer`
      return strokesAndFills.map { strokeOrFill in
        ShapeRenderGroup(
          pathItems: group.pathItems,
          otherItems: [strokeOrFill] + otherItems)
      }
    }

    // All valid render groups must have a path, otherwise the items wouldn't be rendered
    renderGroups = renderGroups.filter { renderGroup in
      !renderGroup.pathItems.isEmpty
    }

    let itemsInValidRenderGroups = NSSet(
      array: renderGroups.lazy
        .flatMap { $0.pathItems + $0.otherItems }
        .map { $0.item })

    // `unusedItems` should only include each original item a single time,
    // and should preserve the existing order
    let itemsNotInValidRenderGroups = filter { item in
      !itemsInValidRenderGroups.contains(item.item)
    }

    return (validGroups: renderGroups, unusedItems: itemsNotInValidRenderGroups)
  }
}
