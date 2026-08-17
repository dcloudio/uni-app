//
//  LocalM3U8Handler.swift
//  UniVideoPlayer
//
//  Created by Fred on 2025/02/10.
//
//  功能说明:
//  =========
//  使用 AVAssetResourceLoader 处理本地 m3u8 文件 + 远程 ts 分片的场景
//
//  背景:
//  AVPlayer 不支持 file:// 协议的 m3u8 文件包含 http(s):// 的 ts 分片
//  会导致错误: CoreMediaErrorDomain Code=-12865
//
//  解决方案:
//  使用 AVAssetResourceLoader 拦截资源加载请求
//  - m3u8 文件：从本地文件系统读取
//  - ts 分片：从网络下载
//
//  技术实现:
//  1. 将 file:// URL 转换为自定义 scheme (uni-local-m3u8://)
//  2. 实现 AVAssetResourceLoaderDelegate
//  3. 拦截并处理所有资源加载请求

import Foundation
import AVFoundation

@available(iOS 13.0, *)
public class LocalM3U8Handler {

    public static let shared = LocalM3U8Handler()

    /// 自定义 scheme，用于触发 ResourceLoader
    private static let customScheme = "uni-local-m3u8"

    /// 存储 ResourceLoaderDelegate 实例，防止被释放
    private var delegateStorage: [String: M3U8ResourceLoaderDelegate] = [:]

    private init() {}

    // MARK: - 公开方法

    /// 处理本地 m3u8 文件
    /// - Parameters:
    ///   - localPath: 本地 m3u8 文件的绝对路径
    ///   - originalSrc: 原始 src 参数
    /// - Returns: (处理后的 AVURLAsset, 是否为本地视频)
    /// - Throws: 处理失败时抛出错误
    public func handleLocalM3U8(
        localPath: String,
        originalSrc: String
    ) throws -> (asset: AVURLAsset, isLocal: Bool) {
        // 1. 读取 m3u8 文件内容
        guard let content = try? String(contentsOfFile: localPath, encoding: .utf8) else {
            throw LocalM3U8Error.cannotReadFile(localPath)
        }

        // 2. 检查是否包含远程分片
        guard containsRemoteSegments(content) else {
            // 纯本地 m3u8，直接返回普通 AVURLAsset
            let url = URL(fileURLWithPath: localPath)
            let asset = AVURLAsset(url: url)
            return (asset, true)
        }

        // 3. 包含远程分片，使用 ResourceLoader 方案
        return try createAssetWithResourceLoader(localPath: localPath, content: content)
    }

    public func cleanup(for asset: AVURLAsset) {
        let key = asset.url.absoluteString
        delegateStorage.removeValue(forKey: key)
    }

    // MARK: - 私有方法

    /// 检查 m3u8 内容是否包含远程分片
    private func containsRemoteSegments(_ content: String) -> Bool {
        return content.contains("http://") || content.contains("https://")
    }

    /// 创建使用 ResourceLoader 的 AVURLAsset
    private func createAssetWithResourceLoader(
        localPath: String,
        content: String
    ) throws -> (asset: AVURLAsset, isLocal: Bool) {
        // 1. 创建自定义 scheme 的 URL
        let fileURL = URL(fileURLWithPath: localPath)
        guard let customURL = convertToCustomScheme(fileURL) else {
            throw LocalM3U8Error.invalidURL
        }

        // 2. 提取远程基础 URL
        guard let remoteBaseURL = extractRemoteBaseURL(from: content) else {
            throw LocalM3U8Error.cannotExtractRemoteURL
        }

        // 3. 创建 AVURLAsset
        let asset = AVURLAsset(url: customURL)

        // 4. 创建并设置 ResourceLoaderDelegate
        let delegate = M3U8ResourceLoaderDelegate(
            localM3U8Path: fileURL,
            remoteBaseURL: remoteBaseURL
        )

        let queue = DispatchQueue(label: "com.dcloud.uni.m3u8.resourceloader")
        asset.resourceLoader.setDelegate(delegate, queue: queue)

        delegateStorage[customURL.absoluteString] = delegate

        print("[LocalM3U8Handler] Created asset with ResourceLoader for: \(localPath)")
        print("[LocalM3U8Handler] Remote base URL: \(remoteBaseURL.absoluteString)")

        return (asset, false)
    }

    /// 将 file:// URL 转换为自定义 scheme
    private func convertToCustomScheme(_ fileURL: URL) -> URL? {
        var components = URLComponents(url: fileURL, resolvingAgainstBaseURL: false)
        components?.scheme = Self.customScheme
        return components?.url
    }

    /// 从 m3u8 内容提取远程基础 URL
    private func extractRemoteBaseURL(from content: String) -> URL? {
        let lines = content.components(separatedBy: .newlines)

        for line in lines {
            let trimmed = line.trimmingCharacters(in: .whitespaces)

            // 跳过注释行
            if trimmed.hasPrefix("#") {
                continue
            }

            // 找到第一个 http(s) URL
            if trimmed.hasPrefix("http://") || trimmed.hasPrefix("https://") {
                if let segmentURL = URL(string: trimmed) {
                    // 返回 ts 分片的目录 URL
                    return segmentURL.deletingLastPathComponent()
                }
            }
        }

        return nil
    }
}

@available(iOS 13.0, *)
public enum LocalM3U8Error: Error, LocalizedError {
    case cannotReadFile(String)
    case invalidURL
    case cannotExtractRemoteURL

    public var errorDescription: String? {
        switch self {
        case .cannotReadFile(let path):
            return "Cannot read m3u8 file: \(path)"
        case .invalidURL:
            return "Cannot create custom scheme URL"
        case .cannotExtractRemoteURL:
            return "Cannot extract remote base URL from m3u8 content"
        }
    }
}
