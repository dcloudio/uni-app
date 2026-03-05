//
//  AnimatorNodeDebugging.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/18/19.
//

extension AnimatorNode {

  func printNodeTree() {
    parentNode?.printNodeTree()
    LottieLogger.shared.info(String(describing: type(of: self)))

    if let group = self as? GroupNode {
      LottieLogger.shared.info("* |Children")
      group.rootNode?.printNodeTree()
      LottieLogger.shared.info("*")
    } else {
      LottieLogger.shared.info("|")
    }
  }

}
