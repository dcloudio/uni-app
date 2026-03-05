// Created by eric_horacek on 3/15/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

/// A generic result builder that enables a DSL for building arrays of Epoxy models.
@resultBuilder
enum EpoxyModelArrayBuilder<Model> {
  typealias Expression = Model
  typealias Component = [Model]

  static func buildExpression(_ expression: Expression) -> Component {
    [expression]
  }

  static func buildExpression(_ expression: Component) -> Component {
    expression
  }

  static func buildExpression(_ expression: Expression?) -> Component {
    if let expression {
      return [expression]
    }
    return []
  }

  static func buildBlock(_ children: Component...) -> Component {
    children.flatMap { $0 }
  }

  static func buildBlock(_ component: Component) -> Component {
    component
  }

  static func buildOptional(_ children: Component?) -> Component {
    children ?? []
  }

  static func buildEither(first child: Component) -> Component {
    child
  }

  static func buildEither(second child: Component) -> Component {
    child
  }

  static func buildArray(_ components: [Component]) -> Component {
    components.flatMap { $0 }
  }
}
