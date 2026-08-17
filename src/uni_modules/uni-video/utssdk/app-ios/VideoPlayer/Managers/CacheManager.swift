//
//  CacheManager.swift
//  UniVideoPlayer
//
//  Created by Fred on 3/12/25.
//

import Foundation
@_implementationOnly import KTVHTTPCache
import DCloudUniappRuntime

@available(iOS 13.0, *)
class CacheManager {

    // MARK: - Properties

    private var _isProxyServerRunning = false

    private var cacheSize: Int64
    
    private let cachePath = "Caches/uni-video"

    private let lock = NSLock()
    
    private static let defaultCacheSize: Int64 = 1000 * 1024 * 1024

    static let shared = CacheManager()

    // MARK: - Initialization
    private init() {
        self.cacheSize = CacheManager.defaultCacheSize
    }

    // MARK: - Public Methods
    func startProxyServer() throws {
        lock.lock()
        defer { lock.unlock() }

        guard !_isProxyServerRunning else {
            UNILogDebug("[CacheManager] Proxy server already running")
            return
        }

        do {
            KTVHTTPCache.downloadSetTimeoutInterval(60.0)
            let contentTypes: [String] = [
                "video/mp4",
                "video/x-m4v",
                "video/quicktime",
                "video/3gpp",
                "application/vnd.apple.mpegurl",
                "application/x-mpegURL",
                "application/octet-stream",
                "binary/octet-stream",
                "audio/wav",
                "audio/flac",
                "audio/aiff",
                "audio/caf",
                "audio/mpeg",
                "audio/mp4",
                "audio/m4a",
                "audio/x-m4a",
                "audio/aac",
                "audio/*",
                "video/*"
            ]
            KTVHTTPCache.downloadSetAcceptableContentTypes(contentTypes)

            let whitelistHeaders = [
                "User-Agent",
                "Connection",
                "Accept",
                "Accept-Encoding",
                "Accept-Language",
                "Range",
                "Referer"
            ]
            KTVHTTPCache.downloadSetWhitelistHeaderKeys(whitelistHeaders)

            KTVHTTPCache.downloadSetUnacceptableContentTypeDisposer { url, contentType in
                UNILogDebug("[CacheManager] Content-Type: \(contentType ?? "nil") for \(url)")
                return true
            }

            try KTVHTTPCache.proxyStart()

            setMaxCacheSize(cacheSize)

            setCachetRootPath(cachePath)

            #if DEBUG
            KTVHTTPCache.logSetConsoleLogEnable(false)
            #endif

            _isProxyServerRunning = true
            UNILogDebug("[CacheManager] ✅ Proxy server started, Cache Path: \(cachePath)")

            // 优化：异步预热缓存索引
            warmupCacheIndex()

        } catch {
            UNILogDebug("[CacheManager] ❌ Failed to start: \(error)")
            throw UniVideoPlayerError.cacheError("Failed to start proxy server: \(error.localizedDescription)")
        }
    }

    func stopProxyServer() {
        lock.lock()
        defer { lock.unlock() }

        guard _isProxyServerRunning else {
            return
        }

        KTVHTTPCache.proxyStop()
        _isProxyServerRunning = false
    }

    var isProxyServerRunning: Bool {
        lock.lock()
        defer { lock.unlock() }
        return _isProxyServerRunning
    }

    func isFullyCached(for url: URL) -> Bool {
        let cacheItem = KTVHTTPCache.cacheCacheItem(with: url)
        guard let item = cacheItem else { return false }

        let isComplete = item.cacheLength > 0 && item.cacheLength == item.totalLength
        if isComplete {
            UNILogDebug("[CacheManager] ✅ Video fully cached: \(url.lastPathComponent)")
        }
        return isComplete
    }

    func getCacheStatus(for url: URL) -> CacheStatus {
        let cacheItem = KTVHTTPCache.cacheCacheItem(with: url)
        guard let item = cacheItem else {
            return CacheStatus(isFullyCached: false, cachePercentage: 0, canPlayOffline: false)
        }

        let isComplete = item.cacheLength > 0 && item.cacheLength == item.totalLength
        let percentage = item.totalLength > 0 ? Double(item.cacheLength) / Double(item.totalLength) * 100 : 0

        return CacheStatus(
            isFullyCached: isComplete,
            cachePercentage: percentage,
            canPlayOffline: isComplete
        )
    }

    /// 获取本地代理播放URL
    func proxyURL(for originalURL: URL, enableCache: Bool) -> URL {
        guard enableCache else {
            return originalURL
        }

        let running = isProxyServerRunning
        guard running else {
            UNILogDebug("[CacheManager] ⚠️ Proxy server not running, using original URL")
            return originalURL
        }

        guard originalURL.scheme == "http" || originalURL.scheme == "https" else {
            return originalURL
        }

        if let proxyURL = KTVHTTPCache.proxyURL(withOriginalURL: originalURL) {
            let status = getCacheStatus(for: originalURL)
            if status.isFullyCached {
                UNILogDebug("[CacheManager] 🎯 Using proxy URL (cached: 100%)")
            } else {
                UNILogDebug("[CacheManager] 🔄 Using proxy URL (cached: \(String(format: "%.1f", status.cachePercentage))%)")
            }
            return proxyURL
        }

        return originalURL
    }

    private func getCacheDirectory() -> URL {
        let paths = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)
        return paths[0].appendingPathComponent(cachePath)
    }

    private func warmupCacheIndex() {
        DispatchQueue.global(qos: .utility).async {
            let startTime = CFAbsoluteTimeGetCurrent()

            _ = KTVHTTPCache.cacheAllCacheItems()

            let elapsed = (CFAbsoluteTimeGetCurrent() - startTime) * 1000
        }
    }

    func getCacheInfo(for url: URL) -> CacheInfo {
        let cacheItem = KTVHTTPCache.cacheCacheItem(with: url)

        let cachedBytes = cacheItem?.cacheLength ?? 0
        let totalBytes = cacheItem?.totalLength ?? 0

        return CacheInfo(
            url: url,
            cachedBytes: cachedBytes,
            totalBytes: totalBytes,
            isCached: cachedBytes > 0
        )
    }

    func deleteCache(for url: URL) {
        KTVHTTPCache.cacheDelete(with: url)
        UNILogDebug("[CacheManager] Deleted cache for URL: \(url)")
    }

    func deleteAllCache() {
        KTVHTTPCache.cacheDeleteAllCaches()
        UNILogDebug("[CacheManager] Deleted all caches")
    }


    func getTotalCacheSize() -> Int64 {
        return KTVHTTPCache.cacheTotalCacheLength()
    }

    func setMaxCacheSize(_ maxSize: Int64) {
        KTVHTTPCache.cacheSetMaxCacheLength(maxSize)
        UNILogDebug("[CacheManager] Set max cache size to: \(maxSize) bytes")
    }

    func setCachetRootPath(_ rootPath: String) {
        KTVHTTPCache.cacheSetRootPath(rootPath)
        UNILogDebug("[CacheManager] Set cache root path: \(rootPath)")
    }
    
    func getAllCacheItems() -> [CacheItemInfo] {
        let items = KTVHTTPCache.cacheAllCacheItems() ?? []
        return items.map { item in
            CacheItemInfo(
                url: item.url,
                cacheLength: item.cacheLength,
                totalLength: item.totalLength
            )
        }
    }
}


public struct CacheStatus {
    /// 是否已完全缓存
    public let isFullyCached: Bool
    /// 缓存百分比 (0-100)
    public let cachePercentage: Double
    /// 是否可以离线播放
    public let canPlayOffline: Bool
}

public struct CacheInfo {
    public let url: URL
    public let cachedBytes: Int64
    public let totalBytes: Int64
    public let isCached: Bool

    public var cachePercentage: Double {
        guard totalBytes > 0 else { return 0 }
        return Double(cachedBytes) / Double(totalBytes) * 100
    }
}

public struct CacheItemInfo {
    public let url: URL
    public let cacheLength: Int64
    public let totalLength: Int64

    public var isComplete: Bool {
        return cacheLength > 0 && cacheLength == totalLength
    }
}
