//
//  M3U8ResourceLoaderDelegate.swift
//  UniVideoPlayer
//
//  Created by Fred on 2025/02/10.
//
//  功能说明:
//  =========
//  AVAssetResourceLoaderDelegate 实现
//  拦截并处理本地 m3u8 + 远程 ts 的资源加载请求
//
//  职责:
//  - 拦截 m3u8 请求，从本地文件系统读取
//  - 拦截 ts 请求，从网络下载
//  - 处理 Content-Type 和 Content-Length
//  - 支持 Range 请求（Byte Range Access）

import Foundation
import AVFoundation
import DCloudUniappRuntime

@available(iOS 13.0, *)
class M3U8ResourceLoaderDelegate: NSObject, AVAssetResourceLoaderDelegate {

    // MARK: - 属性

    private let localM3U8Path: URL

    /// 远程 ts 分片的基础 URL
    private let remoteBaseURL: URL

    private let urlSession: URLSession

    private var activeTasks: [AVAssetResourceLoadingRequest: URLSessionDataTask] = [:]

    private let taskLock = NSLock()

    // MARK: - 初始化

    init(localM3U8Path: URL, remoteBaseURL: URL) {
        self.localM3U8Path = localM3U8Path
        self.remoteBaseURL = remoteBaseURL

        // 配置网络会话
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = 30
        config.timeoutIntervalForResource = 300
        self.urlSession = URLSession(configuration: config)

        super.init()
    }

    // MARK: - AVAssetResourceLoaderDelegate

    func resourceLoader(
        _ resourceLoader: AVAssetResourceLoader,
        shouldWaitForLoadingOfRequestedResource loadingRequest: AVAssetResourceLoadingRequest
    ) -> Bool {
        guard let url = loadingRequest.request.url else {
            return false
        }

        UNILogDebug("[M3U8ResourceLoader] Request: \(url.absoluteString)")

        // 判断是 m3u8 还是 ts 文件
        let pathExtension = url.pathExtension.lowercased()

        if pathExtension == "m3u8" || pathExtension == "m3u" {
            handleM3U8Request(loadingRequest)
        } else if pathExtension == "ts" {
            handleTSRequest(loadingRequest)
        } else {
            UNILogDebug("[M3U8ResourceLoader] Unknown file type: \(pathExtension)")
            return false
        }

        return true
    }

    func resourceLoader(
        _ resourceLoader: AVAssetResourceLoader,
        didCancel loadingRequest: AVAssetResourceLoadingRequest
    ) {
        // 线程安全地取消对应的网络请求
        taskLock.lock()
        let task = activeTasks[loadingRequest]
        activeTasks.removeValue(forKey: loadingRequest)
        taskLock.unlock()

        task?.cancel()
        UNILogDebug("[M3U8ResourceLoader] Cancelled request")
    }

    // MARK: - 私有方法

    /// 处理 m3u8 请求（从本地读取）
    private func handleM3U8Request(_ loadingRequest: AVAssetResourceLoadingRequest) {
        DispatchQueue.global(qos: .userInitiated).async { [weak self] in
            guard let self = self else { return }

            do {
                let data = try Data(contentsOf: self.localM3U8Path)

                // 填充响应信息
                if let contentRequest = loadingRequest.contentInformationRequest {
                    contentRequest.contentType = "application/vnd.apple.mpegurl"
                    contentRequest.contentLength = Int64(data.count)
                    contentRequest.isByteRangeAccessSupported = true
                }

                // 处理数据请求（支持 Range）
                if let dataRequest = loadingRequest.dataRequest {
                    let requestedOffset = Int(dataRequest.requestedOffset)
                    let requestedLength = dataRequest.requestedLength
                    let currentOffset = Int(dataRequest.currentOffset)

                    // 计算实际读取范围
                    let startOffset = currentOffset
                    let endOffset = min(startOffset + requestedLength, data.count)

                    guard startOffset < data.count, endOffset > startOffset else {
                        throw M3U8LoaderError.invalidRange(
                            offset: startOffset,
                            length: requestedLength,
                            fileSize: data.count
                        )
                    }

                    // 提取请求的字节范围
                    let rangeData = data.subdata(in: startOffset..<endOffset)
                    dataRequest.respond(with: rangeData)

                    UNILogDebug("[M3U8ResourceLoader] ✅ M3U8 loaded: \(rangeData.count) bytes (offset: \(startOffset), total: \(data.count))")
                } else {
                    throw M3U8LoaderError.missingDataRequest
                }

                loadingRequest.finishLoading()

            } catch {
                UNILogDebug("[M3U8ResourceLoader] ❌ Failed to load m3u8: \(error.localizedDescription)")
                let nsError = (error as? M3U8LoaderError)?.toNSError() ??
                              NSError(domain: "M3U8ResourceLoader", code: -1, userInfo: [
                                NSLocalizedDescriptionKey: error.localizedDescription
                              ])
                loadingRequest.finishLoading(with: nsError)
            }
        }
    }

    /// 处理 ts 请求（从网络下载）
    private func handleTSRequest(_ loadingRequest: AVAssetResourceLoadingRequest) {
        guard let url = loadingRequest.request.url else {
            finishWithError(loadingRequest, error: .invalidURL)
            return
        }

        // 检查 dataRequest 是否存在
        guard loadingRequest.dataRequest != nil else {
            finishWithError(loadingRequest, error: .missingDataRequest)
            return
        }

        // 构建远程 ts 文件 URL
        let tsFileName = url.lastPathComponent
        let remoteURL = remoteBaseURL.appendingPathComponent(tsFileName)

        // 创建网络请求（支持 Range）
        var request = URLRequest(url: remoteURL)
        request.timeoutInterval = 30

        // 如果有 Range 请求，添加 Range header
        if let dataRequest = loadingRequest.dataRequest {
            let requestedOffset = dataRequest.requestedOffset
            let requestedLength = dataRequest.requestedLength

            if requestedOffset > 0 || requestedLength < Int.max {
                let rangeEnd = requestedOffset + Int64(requestedLength) - 1
                request.setValue("bytes=\(requestedOffset)-\(rangeEnd)", forHTTPHeaderField: "Range")
                UNILogDebug("[M3U8ResourceLoader] Requesting TS range: \(requestedOffset)-\(rangeEnd)")
            }
        }

        UNILogDebug("[M3U8ResourceLoader] Downloading TS: \(remoteURL.absoluteString)")

        // 创建数据任务
        let task = urlSession.dataTask(with: request) { [weak self] data, response, error in
            guard let self = self else { return }

            self.taskLock.lock()
            self.activeTasks.removeValue(forKey: loadingRequest)
            self.taskLock.unlock()

            if let error = error {
                UNILogDebug("[M3U8ResourceLoader] ❌ TS download failed: \(error.localizedDescription)")
                self.finishWithError(loadingRequest, error: .networkError(error))
                return
            }

            guard let data = data, !data.isEmpty else {
                UNILogDebug("[M3U8ResourceLoader] ❌ TS download returned empty data")
                self.finishWithError(loadingRequest, error: .emptyData)
                return
            }

            guard let httpResponse = response as? HTTPURLResponse else {
                UNILogDebug("[M3U8ResourceLoader] ❌ Invalid HTTP response")
                self.finishWithError(loadingRequest, error: .invalidResponse)
                return
            }

            // 检查 HTTP 状态码
            guard (200...299).contains(httpResponse.statusCode) else {
                UNILogDebug("[M3U8ResourceLoader] ❌ HTTP error: \(httpResponse.statusCode)")
                self.finishWithError(loadingRequest, error: .httpError(httpResponse.statusCode))
                return
            }

            // 填充响应信息
            if let contentRequest = loadingRequest.contentInformationRequest {
                // 优先使用 Content-Type header
                let contentType = httpResponse.mimeType ?? "video/MP2T"
                contentRequest.contentType = contentType

                // 处理 Content-Length（考虑 Range 响应）
                var contentLength: Int64
                if httpResponse.statusCode == 206 {
                    // Partial Content - 从 Content-Range 解析总长度
                    if let contentRange = httpResponse.value(forHTTPHeaderField: "Content-Range"),
                       let totalLength = self.parseContentRangeTotalLength(contentRange) {
                        contentLength = totalLength
                    } else {
                        contentLength = Int64(data.count)
                    }
                } else {
                    contentLength = httpResponse.expectedContentLength > 0 ?
                                    httpResponse.expectedContentLength :
                                    Int64(data.count)
                }

                contentRequest.contentLength = contentLength
                contentRequest.isByteRangeAccessSupported = true
            }

            if let dataRequest = loadingRequest.dataRequest {
                dataRequest.respond(with: data)
            }

            loadingRequest.finishLoading()

            UNILogDebug("[M3U8ResourceLoader] ✅ TS loaded: \(tsFileName) (\(data.count) bytes)")
        }

        taskLock.lock()
        activeTasks[loadingRequest] = task
        taskLock.unlock()

        task.resume()
    }

    // MARK: - Helper Methods

    /// 解析 Content-Range 头部的总长度
    /// 格式: "bytes 0-1023/2048" -> 2048
    private func parseContentRangeTotalLength(_ contentRange: String) -> Int64? {
        let components = contentRange.split(separator: "/")
        guard components.count == 2,
              let totalLength = Int64(components[1]) else {
            return nil
        }
        return totalLength
    }

    /// 统一的错误处理
    private func finishWithError(_ loadingRequest: AVAssetResourceLoadingRequest, error: M3U8LoaderError) {
        let nsError = error.toNSError()
        loadingRequest.finishLoading(with: nsError)
    }
}

// MARK: - 错误定义

/// M3U8 资源加载错误
enum M3U8LoaderError: Error {
    case invalidURL
    case missingDataRequest
    case invalidRange(offset: Int, length: Int, fileSize: Int)
    case networkError(Error)
    case emptyData
    case invalidResponse
    case httpError(Int)

    func toNSError() -> NSError {
        let domain = "M3U8ResourceLoader"
        var code: Int
        var description: String

        switch self {
        case .invalidURL:
            code = -1
            description = "Invalid URL in loading request"
        case .missingDataRequest:
            code = -2
            description = "Missing data request in loading request"
        case .invalidRange(let offset, let length, let fileSize):
            code = -3
            description = "Invalid range request: offset=\(offset), length=\(length), fileSize=\(fileSize)"
        case .networkError(let error):
            code = -4
            description = "Network error: \(error.localizedDescription)"
        case .emptyData:
            code = -5
            description = "Server returned empty data"
        case .invalidResponse:
            code = -6
            description = "Invalid HTTP response"
        case .httpError(let statusCode):
            code = -7
            description = "HTTP error: \(statusCode)"
        }

        return NSError(
            domain: domain,
            code: code,
            userInfo: [NSLocalizedDescriptionKey: description]
        )
    }
}
