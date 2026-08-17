//
//  FirstFramePreviewCenter.swift
//  UniVideoPlayer
//
//  首帧捕获调度中心：统一控制 AVAssetImageGenerator 的并发、取消和执行顺序。
//  功能：可取消 + 限并发 + 超时 + 防晚到回写（防止“过期的首帧截图结果”覆盖当前 video 的 poster）
//

import AVFoundation
import UIKit

@available(iOS 13.0, *)
enum FirstFramePreviewPriority: Int {
    case visible = 100
    case normal = 50
    case background = 10
}

@available(iOS 13.0, *)
struct FirstFramePreviewHandle: Hashable {
    let id: UUID
    let ownerID: ObjectIdentifier
}

@available(iOS 13.0, *)
enum FirstFramePreviewResult {
    case success(UIImage, source: String)
    case cancelled(source: String)
    case failed(Error, source: String)
}

@available(iOS 13.0, *)
struct FirstFramePreviewRequest {
    let id: UUID
    let ownerID: ObjectIdentifier
    let source: String
    let asset: AVAsset
    let priority: FirstFramePreviewPriority
    let completion: @MainActor (FirstFramePreviewResult) -> Void

    init(
        id: UUID = UUID(),
        ownerID: ObjectIdentifier,
        source: String,
        asset: AVAsset,
        priority: FirstFramePreviewPriority = .normal,
        completion: @escaping @MainActor (FirstFramePreviewResult) -> Void
    ) {
        self.id = id
        self.ownerID = ownerID
        self.source = source
        self.asset = asset
        self.priority = priority
        self.completion = completion
    }
}

@available(iOS 13.0, *)
enum FirstFramePreviewError: Error {
    case emptyImage
    case generationFailed
}

@available(iOS 13.0, *)
actor FirstFramePreviewCenter {
    static let shared = FirstFramePreviewCenter()

    private let maxConcurrent = 2
    private var nextSequence: UInt64 = 0
    private var pending: [UUID: QueuedFirstFramePreviewRequest] = [:]
    private var running: [UUID: FirstFramePreviewOperation] = [:]

    func submit(_ request: FirstFramePreviewRequest) -> FirstFramePreviewHandle {
        nextSequence += 1
        pending[request.id] = QueuedFirstFramePreviewRequest(request: request, sequence: nextSequence)
        drain()
        return FirstFramePreviewHandle(id: request.id, ownerID: request.ownerID)
    }

    func cancel(_ handle: FirstFramePreviewHandle) {
        if pending.removeValue(forKey: handle.id) != nil {
            return
        }
        if let operation = running.removeValue(forKey: handle.id) {
            operation.cancel()
            drain()
        }
    }

    func cancel(ownerID: ObjectIdentifier) {
        let pendingIDs = pending.values
            .filter { $0.request.ownerID == ownerID }
            .map { $0.request.id }
        for id in pendingIDs {
            pending.removeValue(forKey: id)
        }

        let runningIDs = running.values
            .filter { $0.request.ownerID == ownerID }
            .map { $0.request.id }
        for id in runningIDs {
            if let operation = running.removeValue(forKey: id) {
                operation.cancel()
            }
        }
        drain()
    }

    private func drain() {
        while running.count < maxConcurrent, let queued = nextPendingRequest() {
            pending.removeValue(forKey: queued.request.id)
            start(queued.request)
        }
    }

    private func nextPendingRequest() -> QueuedFirstFramePreviewRequest? {
        pending.values.sorted { left, right in
            if left.request.priority.rawValue != right.request.priority.rawValue {
                return left.request.priority.rawValue > right.request.priority.rawValue
            }
            return left.sequence < right.sequence
        }.first
    }

    private func start(_ request: FirstFramePreviewRequest) {
        let operation = FirstFramePreviewOperation(request: request)
        running[request.id] = operation
        operation.start { [weak self] result in
            Task {
                await self?.complete(requestID: request.id, result: result)
            }
        }
    }

    private func complete(requestID: UUID, result: FirstFramePreviewResult) {
        guard let operation = running.removeValue(forKey: requestID) else { return }
        Task { @MainActor in
            operation.request.completion(result)
        }
        drain()
    }
}

@available(iOS 13.0, *)
private struct QueuedFirstFramePreviewRequest {
    let request: FirstFramePreviewRequest
    let sequence: UInt64
}

@available(iOS 13.0, *)
private final class FirstFramePreviewOperation {
    let request: FirstFramePreviewRequest
    private let generator: AVAssetImageGenerator
    private let timeoutNanoseconds: UInt64 = 3_000_000_000
    private var task: Task<Void, Never>?

    init(request: FirstFramePreviewRequest) {
        self.request = request
        self.generator = AVAssetImageGenerator(asset: request.asset)
        self.generator.appliesPreferredTrackTransform = true
        self.generator.requestedTimeToleranceBefore = .zero
        self.generator.requestedTimeToleranceAfter = .zero
    }

    func start(_ completion: @escaping (FirstFramePreviewResult) -> Void) {
        task = Task.detached { [request, generator, timeoutNanoseconds] in
            do {
                let image = try await Self.generateImage(
                    with: generator,
                    timeoutNanoseconds: timeoutNanoseconds
                )
                guard !Task.isCancelled else {
                    completion(.cancelled(source: request.source))
                    return
                }
                completion(.success(image, source: request.source))
            } catch is CancellationError {
                completion(.cancelled(source: request.source))
            } catch {
                completion(.failed(error, source: request.source))
            }
        }
    }

    func cancel() {
        task?.cancel()
        generator.cancelAllCGImageGeneration()
    }

    private static func generateImage(
        with generator: AVAssetImageGenerator,
        timeoutNanoseconds: UInt64
    ) async throws -> UIImage {
        try await withTaskCancellationHandler {
            try await withCheckedThrowingContinuation { continuation in
                let state = ContinuationState<UIImage>()
                let time = NSValue(time: CMTime(seconds: 0, preferredTimescale: 600))
                let timeoutTask = Task {
                    try? await Task.sleep(nanoseconds: timeoutNanoseconds)
                    guard !Task.isCancelled else { return }
                    generator.cancelAllCGImageGeneration()
                    state.resume(continuation, with: .failure(CancellationError()))
                }

                generator.generateCGImagesAsynchronously(forTimes: [time]) { _, cgImage, _, result, error in
                    timeoutTask.cancel()

                    switch result {
                    case .succeeded:
                        if let cgImage {
                            state.resume(continuation, with: .success(UIImage(cgImage: cgImage)))
                        } else {
                            state.resume(continuation, with: .failure(FirstFramePreviewError.emptyImage))
                        }
                    case .cancelled:
                        state.resume(continuation, with: .failure(CancellationError()))
                    case .failed:
                        state.resume(continuation, with: .failure(error ?? FirstFramePreviewError.generationFailed))
                    @unknown default:
                        state.resume(continuation, with: .failure(FirstFramePreviewError.generationFailed))
                    }
                }
            }
        } onCancel: {
            generator.cancelAllCGImageGeneration()
        }
    }
}

private final class ContinuationState<Value>: @unchecked Sendable {
    private let lock = NSLock()
    private var didResume = false

    func resume(
        _ continuation: CheckedContinuation<Value, Error>,
        with result: Result<Value, Error>
    ) {
        lock.lock()
        guard !didResume else {
            lock.unlock()
            return
        }
        didResume = true
        lock.unlock()

        switch result {
        case .success(let value):
            continuation.resume(returning: value)
        case .failure(let error):
            continuation.resume(throwing: error)
        }
    }
}
