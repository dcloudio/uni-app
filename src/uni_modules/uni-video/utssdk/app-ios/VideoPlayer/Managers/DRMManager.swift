//
//  DRMManager.swift
//  UniVideoPlayer
//
//  Created by Fred on 3/12/25.
//

import Foundation
import AVFoundation
import DCloudUniappRuntime

/// DRM 管理器 - 支持 FairPlay DRM
@available(iOS 13.0, *)
class DRMManager {

    // MARK: - Properties
    private let configuration: DRMConfiguration
    private var certificateData: Data?
    private let queue = DispatchQueue(label: "com.univideoplayer.drm", qos: .userInitiated)

    // MARK: - Initialization
    init(configuration: DRMConfiguration) {
        self.configuration = configuration
    }

    // MARK: - Public Methods

    func loadCertificate() async throws {
        guard let certificateURL = configuration.certificateURL else {
            throw UniVideoPlayerError.drmFailed("Certificate URL not provided")
        }

        do {
            var request = URLRequest(url: certificateURL)
            configuration.headers?.forEach { key, value in
                request.setValue(value, forHTTPHeaderField: key)
            }

            let (data, response) = try await URLSession.shared.data(for: request)

            guard let httpResponse = response as? HTTPURLResponse,
                  (200...299).contains(httpResponse.statusCode) else {
                throw UniVideoPlayerError.drmFailed("Failed to load certificate")
            }

            queue.sync {
                self.certificateData = data
            }
            UNILogDebug("[DRMManager] Certificate loaded successfully")
        } catch {
            UNILogDebug("[DRMManager] Failed to load certificate: \(error)")
            throw UniVideoPlayerError.drmFailed("Certificate load error: \(error.localizedDescription)")
        }
    }

    /// 处理 DRM 内容密钥请求
    func handleContentKeyRequest(_ keyRequest: AVContentKeyRequest) async throws {
        let certData = queue.sync { certificateData }
        guard let certificateData = certData else {
            throw UniVideoPlayerError.drmFailed("Certificate not loaded")
        }

        do {
            // 获取 SPC (Server Playback Context)
            let spcData = try await keyRequest.makeStreamingContentKeyRequestData(
                forApp: certificateData,
                contentIdentifier: keyRequest.identifier as? Data,
                options: nil
            )

            // 向许可证服务器请求 CKC (Content Key Context)
            let ckcData = try await requestLicense(with: spcData)

            // 创建并处理响应
            let keyResponse = AVContentKeyResponse(fairPlayStreamingKeyResponseData: ckcData)
            keyRequest.processContentKeyResponse(keyResponse)

            UNILogDebug("[DRMManager] Content key processed successfully")
        } catch {
            UNILogDebug("[DRMManager] Failed to process content key: \(error)")
            keyRequest.processContentKeyResponseError(error)
            throw UniVideoPlayerError.drmFailed("Content key processing failed: \(error.localizedDescription)")
        }
    }

    // MARK: - Private Methods

    /// 向许可证服务器请求 CKC
    private func requestLicense(with spcData: Data) async throws -> Data {
        guard let licenseURL = configuration.licenseURL else {
            throw UniVideoPlayerError.drmFailed("License URL not provided")
        }

        var request = URLRequest(url: licenseURL)
        request.httpMethod = "POST"
        request.httpBody = spcData

        configuration.headers?.forEach { key, value in
            request.setValue(value, forHTTPHeaderField: key)
        }

        let (data, response) = try await URLSession.shared.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw UniVideoPlayerError.drmFailed("Failed to request license")
        }

        return data
    }
}

// MARK: - AVContentKeySessionDelegate Helper
@available(iOS 13.0, *)
extension DRMManager {

    /// 创建内容密钥会话
    static func createContentKeySession() -> AVContentKeySession {
        return AVContentKeySession(keySystem: .fairPlayStreaming)
    }
}
