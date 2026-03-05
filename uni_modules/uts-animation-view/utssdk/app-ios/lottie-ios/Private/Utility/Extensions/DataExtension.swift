//
//  DataExtension.swift
//  Lottie
//
//  Created by René Fouquet on 03.05.21.
//

#if canImport(UIKit)
import UIKit
#elseif canImport(AppKit)
import AppKit
#endif

extension Data {

  init(assetName: String, in bundle: Bundle) throws {
    #if canImport(UIKit)
    if let asset = NSDataAsset(name: assetName, bundle: bundle) {
      self = asset.data
      return
    } else {
      throw DotLottieError.assetNotFound(name: assetName, bundle: bundle)
    }
    #else
    if #available(macOS 10.11, *) {
      if let asset = NSDataAsset(name: assetName, bundle: bundle) {
        self = asset.data
        return
      } else {
        throw DotLottieError.assetNotFound(name: assetName, bundle: bundle)
      }
    }
    throw DotLottieError.loadingFromAssetNotSupported
    #endif
  }
}
