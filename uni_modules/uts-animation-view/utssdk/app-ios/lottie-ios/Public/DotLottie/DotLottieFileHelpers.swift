//
//  DotLottieFileHelpers.swift
//  Lottie
//
//  Created by Evandro Hoffmann on 20/10/22.
//

import Foundation

extension DotLottieFile {

  public enum SynchronouslyBlockingCurrentThread {
    /// Loads an DotLottie from a specific filepath synchronously. Returns a `Result<DotLottieFile, Error>`
    /// Please use the asynchronous methods whenever possible. This operation will block the Thread it is running in.
    ///
    /// - Parameter filepath: The absolute filepath of the lottie to load. EG "/User/Me/starAnimation.lottie"
    /// - Parameter dotLottieCache: A cache for holding loaded lotties. Defaults to `LRUDotLottieCache.sharedCache`. Optional.
    public static func loadedFrom(
      filepath: String,
      dotLottieCache: DotLottieCacheProvider? = DotLottieCache.sharedCache)
      -> Result<DotLottieFile, Error>
    {
      LottieLogger.shared.assert(
        !Thread.isMainThread,
        "`DotLottieFile.SynchronouslyBlockingCurrentThread` methods shouldn't be called on the main thread.")

      /// Check cache for lottie
      if
        let dotLottieCache,
        let lottie = dotLottieCache.file(forKey: filepath)
      {
        return .success(lottie)
      }

      do {
        /// Decode the lottie.
        let url = URL(fileURLWithPath: filepath)
        let data = try Data(contentsOf: url)
        let lottie = try DotLottieFile(data: data, filename: url.deletingPathExtension().lastPathComponent)
        dotLottieCache?.setFile(lottie, forKey: filepath)
        return .success(lottie)
      } catch {
        /// Decoding Error.
        return .failure(error)
      }
    }

    /// Loads a DotLottie model from a bundle by its name synchronously. Returns a `Result<DotLottieFile, Error>`
    /// Please use the asynchronous methods whenever possible. This operation will block the Thread it is running in.
    ///
    /// - Parameter name: The name of the lottie file without the lottie extension. EG "StarAnimation"
    /// - Parameter bundle: The bundle in which the lottie is located. Defaults to `Bundle.main`
    /// - Parameter subdirectory: A subdirectory in the bundle in which the lottie is located. Optional.
    /// - Parameter dotLottieCache: A cache for holding loaded lotties. Defaults to `LRUDotLottieCache.sharedCache`. Optional.
    public static func named(
      _ name: String,
      bundle: Bundle = Bundle.main,
      subdirectory: String? = nil,
      dotLottieCache: DotLottieCacheProvider? = DotLottieCache.sharedCache)
      -> Result<DotLottieFile, Error>
    {
      LottieLogger.shared.assert(
        !Thread.isMainThread,
        "`DotLottieFile.SynchronouslyBlockingCurrentThread` methods shouldn't be called on the main thread.")

      /// Create a cache key for the lottie.
      let cacheKey = bundle.bundlePath + (subdirectory ?? "") + "/" + name

      /// Check cache for lottie
      if
        let dotLottieCache,
        let lottie = dotLottieCache.file(forKey: cacheKey)
      {
        return .success(lottie)
      }

      do {
        /// Decode animation.
        let data = try bundle.dotLottieData(name, subdirectory: subdirectory)
        let lottie = try DotLottieFile(data: data, filename: name)
        dotLottieCache?.setFile(lottie, forKey: cacheKey)
        return .success(lottie)
      } catch {
        /// Decoding error.
        LottieLogger.shared.warn("Error when decoding lottie \"\(name)\": \(error)")
        return .failure(error)
      }
    }

    /// Loads an DotLottie from a data synchronously. Returns a `Result<DotLottieFile, Error>`
    ///
    /// Please use the asynchronous methods whenever possible. This operation will block the Thread it is running in.
    ///
    /// - Parameters:
    ///   - data: The data(`Foundation.Data`) object to load DotLottie from
    ///   - filename: The name of the lottie file without the lottie extension. eg. "StarAnimation"
    public static func loadedFrom(
      data: Data,
      filename: String)
      -> Result<DotLottieFile, Error>
    {
      LottieLogger.shared.assert(
        !Thread.isMainThread,
        "`DotLottieFile.SynchronouslyBlockingCurrentThread` methods shouldn't be called on the main thread.")

      do {
        let dotLottieFile = try DotLottieFile(data: data, filename: filename)
        return .success(dotLottieFile)
      } catch {
        return .failure(error)
      }
    }
  }

  /// Loads a DotLottie model from a bundle by its name. Returns `nil` if a file is not found.
  ///
  /// - Parameter name: The name of the lottie file without the lottie extension. EG "StarAnimation"
  /// - Parameter bundle: The bundle in which the lottie is located. Defaults to `Bundle.main`
  /// - Parameter subdirectory: A subdirectory in the bundle in which the lottie is located. Optional.
  /// - Parameter dotLottieCache: A cache for holding loaded lotties. Defaults to `LRUDotLottieCache.sharedCache`. Optional.
  @available(iOS 13.0, macOS 10.15, tvOS 13.0, *)
  public static func named(
    _ name: String,
    bundle: Bundle = Bundle.main,
    subdirectory: String? = nil,
    dotLottieCache: DotLottieCacheProvider? = DotLottieCache.sharedCache)
    async throws -> DotLottieFile
  {
    try await withCheckedThrowingContinuation { continuation in
      DotLottieFile.named(name, bundle: bundle, subdirectory: subdirectory, dotLottieCache: dotLottieCache) { result in
        continuation.resume(with: result)
      }
    }
  }

  /// Loads a DotLottie model from a bundle by its name. Returns `nil` if a file is not found.
  ///
  /// - Parameter name: The name of the lottie file without the lottie extension. EG "StarAnimation"
  /// - Parameter bundle: The bundle in which the lottie is located. Defaults to `Bundle.main`
  /// - Parameter subdirectory: A subdirectory in the bundle in which the lottie is located. Optional.
  /// - Parameter dotLottieCache: A cache for holding loaded lotties. Defaults to `LRUDotLottieCache.sharedCache`. Optional.
  /// - Parameter dispatchQueue: A dispatch queue used to load animations. Defaults to `DispatchQueue.global()`. Optional.
  /// - Parameter handleResult: A closure to be called when the file has loaded.
  public static func named(
    _ name: String,
    bundle: Bundle = Bundle.main,
    subdirectory: String? = nil,
    dotLottieCache: DotLottieCacheProvider? = DotLottieCache.sharedCache,
    dispatchQueue: DispatchQueue = .dotLottie,
    handleResult: @escaping (Result<DotLottieFile, Error>) -> Void)
  {
    dispatchQueue.async {
      let result = SynchronouslyBlockingCurrentThread.named(
        name,
        bundle: bundle,
        subdirectory: subdirectory,
        dotLottieCache: dotLottieCache)

      DispatchQueue.main.async {
        handleResult(result)
      }
    }
  }

  /// Loads an DotLottie from a specific filepath.
  /// - Parameter filepath: The absolute filepath of the lottie to load. EG "/User/Me/starAnimation.lottie"
  /// - Parameter dotLottieCache: A cache for holding loaded lotties. Defaults to `LRUDotLottieCache.sharedCache`. Optional.
  @available(iOS 13.0, macOS 10.15, tvOS 13.0, *)
  public static func loadedFrom(
    filepath: String,
    dotLottieCache: DotLottieCacheProvider? = DotLottieCache.sharedCache)
    async throws -> DotLottieFile
  {
    try await withCheckedThrowingContinuation { continuation in
      DotLottieFile.loadedFrom(filepath: filepath, dotLottieCache: dotLottieCache) { result in
        continuation.resume(with: result)
      }
    }
  }

  /// Loads an DotLottie from a specific filepath.
  /// - Parameter filepath: The absolute filepath of the lottie to load. EG "/User/Me/starAnimation.lottie"
  /// - Parameter dotLottieCache: A cache for holding loaded lotties. Defaults to `LRUDotLottieCache.sharedCache`. Optional.
  /// - Parameter dispatchQueue: A dispatch queue used to load animations. Defaults to `DispatchQueue.global()`. Optional.
  /// - Parameter handleResult: A closure to be called when the file has loaded.
  public static func loadedFrom(
    filepath: String,
    dotLottieCache: DotLottieCacheProvider? = DotLottieCache.sharedCache,
    dispatchQueue: DispatchQueue = .dotLottie,
    handleResult: @escaping (Result<DotLottieFile, Error>) -> Void)
  {
    dispatchQueue.async {
      let result = SynchronouslyBlockingCurrentThread.loadedFrom(
        filepath: filepath,
        dotLottieCache: dotLottieCache)

      DispatchQueue.main.async {
        handleResult(result)
      }
    }
  }

  /// Loads a DotLottie model from the asset catalog by its name. Returns `nil` if a lottie is not found.
  /// - Parameter name: The name of the lottie file in the asset catalog. EG "StarAnimation"
  /// - Parameter bundle: The bundle in which the lottie is located. Defaults to `Bundle.main`
  /// - Parameter dotLottieCache: A cache for holding loaded lottie files. Defaults to `LRUDotLottieCache.sharedCache` Optional.
  @available(iOS 13.0, macOS 10.15, tvOS 13.0, *)
  public static func asset(
    named name: String,
    bundle: Bundle = Bundle.main,
    dotLottieCache: DotLottieCacheProvider? = DotLottieCache.sharedCache)
    async throws -> DotLottieFile
  {
    try await withCheckedThrowingContinuation { continuation in
      DotLottieFile.asset(named: name, bundle: bundle, dotLottieCache: dotLottieCache) { result in
        continuation.resume(with: result)
      }
    }
  }

  ///    Loads a DotLottie model from the asset catalog by its name. Returns `nil` if a lottie is not found.
  ///    - Parameter name: The name of the lottie file in the asset catalog. EG "StarAnimation"
  ///    - Parameter bundle: The bundle in which the lottie is located. Defaults to `Bundle.main`
  ///    - Parameter dotLottieCache: A cache for holding loaded lottie files. Defaults to `LRUDotLottieCache.sharedCache` Optional.
  ///    - Parameter dispatchQueue: A dispatch queue used to load animations. Defaults to `DispatchQueue.global()`. Optional.
  ///    - Parameter handleResult: A closure to be called when the file has loaded.
  public static func asset(
    named name: String,
    bundle: Bundle = Bundle.main,
    dotLottieCache: DotLottieCacheProvider? = DotLottieCache.sharedCache,
    dispatchQueue: DispatchQueue = .dotLottie,
    handleResult: @escaping (Result<DotLottieFile, Error>) -> Void)
  {
    dispatchQueue.async {
      /// Create a cache key for the lottie.
      let cacheKey = bundle.bundlePath + "/" + name

      /// Check cache for lottie
      if
        let dotLottieCache,
        let lottie = dotLottieCache.file(forKey: cacheKey)
      {
        /// If found, return the lottie.
        DispatchQueue.main.async {
          handleResult(.success(lottie))
        }
        return
      }

      do {
        /// Load data from Asset
        let data = try Data(assetName: name, in: bundle)

        /// Decode lottie.
        let lottie = try DotLottieFile(data: data, filename: name)
        dotLottieCache?.setFile(lottie, forKey: cacheKey)
        DispatchQueue.main.async {
          handleResult(.success(lottie))
        }
      } catch {
        /// Decoding error.
        DispatchQueue.main.async {
          handleResult(.failure(error))
        }
      }
    }
  }

  /// Loads a DotLottie animation asynchronously from the URL.
  ///
  /// - Parameter url: The url to load the animation from.
  /// - Parameter animationCache: A cache for holding loaded animations. Defaults to `LRUAnimationCache.sharedCache`. Optional.
  @available(iOS 13.0, macOS 10.15, tvOS 13.0, *)
  public static func loadedFrom(
    url: URL,
    session: URLSession = .shared,
    dotLottieCache: DotLottieCacheProvider? = DotLottieCache.sharedCache)
    async throws -> DotLottieFile
  {
    try await withCheckedThrowingContinuation { continuation in
      DotLottieFile.loadedFrom(url: url, session: session, dotLottieCache: dotLottieCache) { result in
        continuation.resume(with: result)
      }
    }
  }

  /// Loads a DotLottie animation asynchronously from the URL.
  ///
  /// - Parameter url: The url to load the animation from.
  /// - Parameter animationCache: A cache for holding loaded animations. Defaults to `LRUAnimationCache.sharedCache`. Optional.
  /// - Parameter handleResult: A closure to be called when the animation has loaded.
  public static func loadedFrom(
    url: URL,
    session: URLSession = .shared,
    dotLottieCache: DotLottieCacheProvider? = DotLottieCache.sharedCache,
    handleResult: @escaping (Result<DotLottieFile, Error>) -> Void)
  {
    if let dotLottieCache, let lottie = dotLottieCache.file(forKey: url.absoluteString) {
      handleResult(.success(lottie))
    } else {
      let task = session.dataTask(with: url) { data, _, error in
        do {
          if let error {
            throw error
          }
          guard let data else {
            throw DotLottieError.noDataLoaded
          }
          let lottie = try DotLottieFile(data: data, filename: url.deletingPathExtension().lastPathComponent)
          DispatchQueue.main.async {
            dotLottieCache?.setFile(lottie, forKey: url.absoluteString)
            handleResult(.success(lottie))
          }
        } catch {
          DispatchQueue.main.async {
            handleResult(.failure(error))
          }
        }
      }
      task.resume()
    }
  }

  /// Loads an DotLottie from a data asynchronously.
  ///
  /// - Parameters:
  ///   - data: The data(`Foundation.Data`) object to load DotLottie from
  ///   - filename: The name of the lottie file without the lottie extension. eg. "StarAnimation"
  ///   - dispatchQueue: A dispatch queue used to load animations. Defaults to `DispatchQueue.global()`. Optional.
  ///   - handleResult: A closure to be called when the file has loaded.
  public static func loadedFrom(
    data: Data,
    filename: String,
    dispatchQueue: DispatchQueue = .dotLottie,
    handleResult: @escaping (Result<DotLottieFile, Error>) -> Void)
  {
    dispatchQueue.async {
      do {
        let dotLottie = try DotLottieFile(data: data, filename: filename)
        DispatchQueue.main.async {
          handleResult(.success(dotLottie))
        }
      } catch {
        DispatchQueue.main.async {
          handleResult(.failure(error))
        }
      }
    }
  }

  /// Loads an DotLottie from a data asynchronously.
  ///
  /// - Parameters:
  ///   - data: The data(`Foundation.Data`) object to load DotLottie from
  ///   - filename: The name of the lottie file without the lottie extension. eg. "StarAnimation"
  ///   - dispatchQueue: A dispatch queue used to load animations. Defaults to `DispatchQueue.global()`. Optional.
  @available(iOS 13.0, macOS 10.15, tvOS 13.0, *)
  public static func loadedFrom(
    data: Data,
    filename: String,
    dispatchQueue: DispatchQueue = .dotLottie)
    async throws -> DotLottieFile
  {
    try await withCheckedThrowingContinuation { continuation in
      loadedFrom(data: data, filename: filename, dispatchQueue: dispatchQueue) { result in
        continuation.resume(with: result)
      }
    }
  }
}

extension DispatchQueue {
  /// A serial dispatch queue ensures that IO related to loading dot Lottie files don't overlap,
  /// which can trigger file loading errors due to concurrent unzipping on a single archive.
  public static let dotLottie = DispatchQueue(
    label: "com.airbnb.lottie.dot-lottie",
    qos: .userInitiated)
}
