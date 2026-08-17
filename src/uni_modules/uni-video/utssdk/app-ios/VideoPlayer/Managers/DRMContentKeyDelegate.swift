//
//  DRMContentKeyDelegate.swift
//  UniVideoPlayer
//
//  Created by Fred on 3/12/25.
//

import Foundation
import AVFoundation
import DCloudUniappRuntime

/// DRM 内容密钥代理（用于桥接 Actor 和 Delegate）
@available(iOS 13.0, *)
class DRMContentKeyDelegate: NSObject, AVContentKeySessionDelegate {

    private let drmManager: DRMManager

    init(drmManager: DRMManager) {
        self.drmManager = drmManager
        super.init()
    }

    func contentKeySession(_ session: AVContentKeySession, didProvide keyRequest: AVContentKeyRequest) {
        Task {
            do {
                try await drmManager.handleContentKeyRequest(keyRequest)
            } catch {
                UNILogDebug("[DRMContentKeyDelegate] Key request failed: \(error)")
                keyRequest.processContentKeyResponseError(error)
            }
        }
    }

    func contentKeySession(_ session: AVContentKeySession, didProvideRenewingContentKeyRequest keyRequest: AVContentKeyRequest) {
        Task {
            do {
                try await drmManager.handleContentKeyRequest(keyRequest)
            } catch {
                UNILogDebug("[DRMContentKeyDelegate] Key renewal failed: \(error)")
                keyRequest.processContentKeyResponseError(error)
            }
        }
    }

    func contentKeySession(_ session: AVContentKeySession, contentKeyRequest keyRequest: AVContentKeyRequest, didFailWithError err: Error) {
        UNILogDebug("[DRMContentKeyDelegate] Content key request failed: \(err)")
    }
}
