//
//  UniFileTools.swift
//  TestFra
//
//  Created by Fred on 2024/12/28.
//

import CommonCrypto
import Compression
import Foundation
@_implementationOnly import ZIPFoundation
import zlib

/// 摘要加密算法
public class UniFileDigest: NSObject {
    public enum DigestType: String {
        case sha1
        case md5
        case sha256
    }

    public static func toDigest(forFileAtPath path: String, type: DigestType) -> String? {
        switch type {
        case .md5:
            return UniFileDigest.tomd5(path)
        case .sha1:
            return UniFileDigest.toSha1(path)
        case .sha256:
            return UniFileDigest.toSha256(path)
        }
    }

    private static func toSha256(_ path: String) -> String? {
        let bufferSize = 1024 * 256  // 每次读取 256KB 数据

        guard let file = FileHandle(forReadingAtPath: path) else {
            print("Failed to open file.")
            return nil
        }

        defer {
            file.closeFile()
        }

        var context = CC_SHA256_CTX()
        CC_SHA256_Init(&context)

        while autoreleasepool(invoking: {
            let data = file.readData(ofLength: bufferSize)
            guard !data.isEmpty else { return false }
            data.withUnsafeBytes { (bytes: UnsafeRawBufferPointer) in
                _ = CC_SHA256_Update(&context, bytes.baseAddress, CC_LONG(data.count))
            }
            return true
        }) {}

        var digest = Data(count: Int(CC_SHA256_DIGEST_LENGTH))
        digest.withUnsafeMutableBytes { (bytes: UnsafeMutableRawBufferPointer) in
            _ = CC_SHA256_Final(bytes.bindMemory(to: UInt8.self).baseAddress, &context)
        }

        return digest.map { String(format: "%02hhx", $0) }.joined()
    }

    private static func toSha1(_ path: String) -> String? {
        let bufferSize = 1024 * 256  // 每次读取 256kb 数据

        guard let file = FileHandle(forReadingAtPath: path) else {
            print("Failed to open file.")
            return nil
        }

        defer {
            file.closeFile()
        }

        var context = CC_SHA1_CTX()
        CC_SHA1_Init(&context)

        while autoreleasepool(invoking: {
            let data = file.readData(ofLength: bufferSize)
            guard !data.isEmpty else { return false }
            data.withUnsafeBytes { (bytes: UnsafeRawBufferPointer) in
                _ = CC_SHA1_Update(&context, bytes.baseAddress, CC_LONG(data.count))
            }
            return true
        }) {}

        var digest = Data(count: Int(CC_SHA1_DIGEST_LENGTH))
        digest.withUnsafeMutableBytes { (bytes: UnsafeMutableRawBufferPointer) in
            _ = CC_SHA1_Final(bytes.bindMemory(to: UInt8.self).baseAddress, &context)
        }

        return digest.map { String(format: "%02hhx", $0) }.joined()
    }

    private static func tomd5(_ path: String) -> String? {
        let bufferSize = 1024 * 256  // 每次读取 256kb 数据

        guard let file = FileHandle(forReadingAtPath: path) else {
            print("Failed to open file.")
            return nil
        }

        defer {
            file.closeFile()
        }

        var context = CC_MD5_CTX()
        CC_MD5_Init(&context)

        while autoreleasepool(invoking: {
            let data = file.readData(ofLength: bufferSize)
            guard !data.isEmpty else { return false }
            data.withUnsafeBytes { (bytes: UnsafeRawBufferPointer) in
                _ = CC_MD5_Update(&context, bytes.baseAddress, CC_LONG(data.count))
            }
            return true
        }) {}

        var digest = Data(count: Int(CC_MD5_DIGEST_LENGTH))
        digest.withUnsafeMutableBytes { (bytes: UnsafeMutableRawBufferPointer) in
            _ = CC_MD5_Final(bytes.bindMemory(to: UInt8.self).baseAddress, &context)
        }

        return digest.map { String(format: "%02hhx", $0) }.joined()
    }
}

/// 解压缩工具类
public class UniFileDecompressTool: NSObject {
    enum UniArchiveError: Error {
        case invalidPath
        case fileNotFound
        case onlySupportZip
        case tooLarge
        case unableToOpenArchive
        case entryExtractionFailed(entryPath: String, underlyingError: Error)
        case decompressionFailed(String)
        case unknown(error: Error)
    }

    /// 解压zip文件
    /// - Parameters:
    ///   - zipFilePath: zip文件路径
    ///   - destinationPath: 解压目录路径（确保该路径有效）
    public static func unzip(at zipFilePath: String, to destinationPath: String) throws {
        let fileManager = FileManager.default

        // 检查路径是否存在
        guard fileManager.fileExists(atPath: zipFilePath),
            fileManager.fileExists(atPath: destinationPath)
        else {
            throw UniArchiveError.fileNotFound
        }

        guard zipFilePath.hasSuffix(".zip") else {
            throw UniArchiveError.onlySupportZip
        }

        // 将路径字符串转换为 URL
        let zipURL = URL(fileURLWithPath: zipFilePath)
        let destinationURL = URL(fileURLWithPath: destinationPath)

        do {
            // 尝试打开 ZIP 文件
            let archive = try Archive(url: zipURL, accessMode: .read)

            // 遍历所有条目并逐一解压
            for entry in archive {
                //__MACOSX 是 macOS 系统在打包 ZIP 文件时自动生成的一个隐藏目录，其主要目的是存储文件的扩展属性（如 Finder 标签、文件权限、资源分支等），与 ZIP 中的主文件或目录相对应
                guard !entry.path.hasPrefix("__MACOSX/") else {
                    continue  // 跳过解压
                }

                let destinationEntryURL = destinationURL.appendingPathComponent(entry.path)

                // 确保目标路径父目录存在
                let parentDirectory = destinationEntryURL.deletingLastPathComponent()
                if !fileManager.fileExists(atPath: parentDirectory.path) {
                    try fileManager.createDirectory(
                        at: parentDirectory, withIntermediateDirectories: true)
                }

                do {
                    // 解压当前条目
                    _ = try archive.extract(entry, to: destinationEntryURL)
                } catch {
                    // 捕获单个文件解压失败的错误
                    throw UniArchiveError.entryExtractionFailed(
                        entryPath: entry.path, underlyingError: error)
                }
            }

        } catch let error as Archive.ArchiveError {
            switch error {
            case .unreadableArchive:
                throw UniArchiveError.unableToOpenArchive
            case .invalidLocalHeaderDataOffset, .invalidCentralDirectoryOffset, .invalidEntrySize,
                .invalidCentralDirectorySize, .invalidCentralDirectoryEntryCount:
                throw UniArchiveError.tooLarge
            default:
                throw UniArchiveError.unknown(error: error)
            }
        }
    }

    /// Brotli 解压方法
    public static func brotliDecompress(filePath: String) throws -> Data {
        guard let data = try? Data(contentsOf: URL(fileURLWithPath: filePath)) else {
            throw UniArchiveError.decompressionFailed("源数据为空")
        }

        let decompressedData = try data.withUnsafeBytes {
            (sourcePointer: UnsafeRawBufferPointer) -> Data in
            guard let sourceBaseAddress = sourcePointer.baseAddress else {
                throw UniArchiveError.decompressionFailed("源数据为空")
            }

            // 估计解压后大小，先设定一个足够大的缓冲区
            let estimatedSize = data.count * 5  // 经验值，Brotli 压缩比一般在 3-5 倍
            var destinationBuffer = Data(count: estimatedSize)

            let decompressedSize = destinationBuffer.withUnsafeMutableBytes {
                (destinationPointer: UnsafeMutableRawBufferPointer) -> Int in
                guard let destinationBaseAddress = destinationPointer.baseAddress else {
                    return -1
                }
                return compression_decode_buffer(
                    destinationBaseAddress.assumingMemoryBound(to: UInt8.self),
                    estimatedSize,
                    sourceBaseAddress.assumingMemoryBound(to: UInt8.self),
                    data.count,
                    nil,
                    COMPRESSION_BROTLI
                )
            }

            // 检查解压结果
            guard decompressedSize > 0 else {
                throw UniArchiveError.decompressionFailed("Brotli 解压失败")
            }

            // 截取实际解压后的数据
            destinationBuffer.count = decompressedSize
            return destinationBuffer
        }

        return decompressedData
    }
}
