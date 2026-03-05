//
//  LRUAnimationCache.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 2/5/19.
//

@available(*, deprecated, message: """
  Use DefaultAnimationCache instead, which is thread-safe and automatically responds to memory pressure.
  """)
public typealias LRUAnimationCache = DefaultAnimationCache
