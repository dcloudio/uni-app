//
//  DotLottieCacheProvider.swift
//  Lottie
//
//  Created by Evandro Hoffmann on 20/10/22.
//

/// `DotLottieCacheProvider` is a protocol that describes a DotLottie Cache.
/// DotLottie Cache is used when loading `DotLottie` models. Using a DotLottie Cache
/// can increase performance when loading an animation multiple times.
///
/// Lottie comes with a prebuilt LRU DotLottie Cache.
public protocol DotLottieCacheProvider: Sendable {

  func file(forKey: String) -> DotLottieFile?

  func setFile(_ lottie: DotLottieFile, forKey: String)

  func clearCache()

}
