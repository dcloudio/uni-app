import Darwin
import Foundation

public enum ZstdError: Error, Equatable {
    case invalidArgument(String)
    case range(String)
    case runtime(String)
    case allocationFailure
}

private typealias ZstdDecompressFileFunction = @convention(c) (
    UnsafePointer<CChar>?,
    UnsafePointer<CChar>?,
    Int
) -> OpaquePointer?
private typealias ZstdResultErrorKindFunction = @convention(c) (OpaquePointer?) -> UInt32
private typealias ZstdResultErrorMessageFunction = @convention(c) (
    OpaquePointer?
) -> UnsafePointer<CChar>?
private typealias ZstdResultDestroyFunction = @convention(c) (OpaquePointer?) -> Void

private enum ZstdNativeErrorKind {
    static let none: UInt32 = 0
    static let invalidArgument: UInt32 = 1
    static let range: UInt32 = 2
}

private final class ZstdDynamicAPI: @unchecked Sendable {
    let binaryURL: URL
    let decompressFile: ZstdDecompressFileFunction
    let resultErrorKind: ZstdResultErrorKindFunction
    let resultErrorMessage: ZstdResultErrorMessageFunction
    let resultDestroy: ZstdResultDestroyFunction

    // Keep the framework loaded while any cached function pointer can be used.
    private let libraryHandle: UnsafeMutableRawPointer

    private init(
        binaryURL: URL,
        libraryHandle: UnsafeMutableRawPointer,
        decompressFile: ZstdDecompressFileFunction,
        resultErrorKind: ZstdResultErrorKindFunction,
        resultErrorMessage: ZstdResultErrorMessageFunction,
        resultDestroy: ZstdResultDestroyFunction
    ) {
        self.binaryURL = binaryURL
        self.libraryHandle = libraryHandle
        self.decompressFile = decompressFile
        self.resultErrorKind = resultErrorKind
        self.resultErrorMessage = resultErrorMessage
        self.resultDestroy = resultDestroy
    }

    static func load(from binaryURL: URL) throws -> ZstdDynamicAPI {
        _ = dlerror()
        guard let libraryHandle = dlopen(binaryURL.path, RTLD_LAZY | RTLD_LOCAL) else {
            throw ZstdError.runtime(
                "unable to load zstd framework at \(binaryURL.path): \(dynamicLoaderError())"
            )
        }

        do {
            return try ZstdDynamicAPI(
                binaryURL: binaryURL,
                libraryHandle: libraryHandle,
                decompressFile: loadSymbol(
                    "uasm_zstd_decompress_file",
                    from: libraryHandle,
                    as: ZstdDecompressFileFunction.self
                ),
                resultErrorKind: loadSymbol(
                    "uasm_zstd_result_error_kind",
                    from: libraryHandle,
                    as: ZstdResultErrorKindFunction.self
                ),
                resultErrorMessage: loadSymbol(
                    "uasm_zstd_result_error_message",
                    from: libraryHandle,
                    as: ZstdResultErrorMessageFunction.self
                ),
                resultDestroy: loadSymbol(
                    "uasm_zstd_result_destroy",
                    from: libraryHandle,
                    as: ZstdResultDestroyFunction.self
                )
            )
        } catch {
            dlclose(libraryHandle)
            throw error
        }
    }

    private static func loadSymbol<T>(
        _ name: String,
        from libraryHandle: UnsafeMutableRawPointer,
        as type: T.Type
    ) throws -> T {
        _ = dlerror()
        guard let symbol = dlsym(libraryHandle, name) else {
            throw ZstdError.runtime(
                "unable to load zstd symbol \(name): \(dynamicLoaderError())"
            )
        }
        return unsafeBitCast(symbol, to: type)
    }

    private static func dynamicLoaderError() -> String {
        guard let message = dlerror() else {
            return "unknown dynamic loader error"
        }
        return String(cString: message)
    }
}

private final class ZstdDynamicLoader: @unchecked Sendable {
    static let shared = ZstdDynamicLoader()

    private let lock = NSLock()
    private var loadedAPI: ZstdDynamicAPI?

    private init() {}

    func load(at frameworkURL: URL? = nil) throws -> ZstdDynamicAPI {
        lock.lock()
        defer { lock.unlock() }

        if let loadedAPI, frameworkURL == nil {
            return loadedAPI
        }

        let binaryURL = try resolveBinaryURL(at: frameworkURL)
        if let loadedAPI {
            guard loadedAPI.binaryURL == binaryURL else {
                throw ZstdError.invalidArgument(
                    "zstd framework is already loaded from \(loadedAPI.binaryURL.path)"
                )
            }
            return loadedAPI
        }

        let api = try ZstdDynamicAPI.load(from: binaryURL)
        loadedAPI = api
        return api
    }

    private func resolveBinaryURL(at frameworkURL: URL?) throws -> URL {
        let resolvedFrameworkURL: URL
        if let frameworkURL {
            guard frameworkURL.pathExtension == "framework" else {
                throw ZstdError.invalidArgument(
                    "expected a zstd.framework URL, not \(frameworkURL.lastPathComponent)"
                )
            }
            resolvedFrameworkURL = frameworkURL
        } else {
            guard let frameworksURL = Bundle.main.privateFrameworksURL else {
                throw ZstdError.runtime("unable to locate the application Frameworks directory")
            }
            resolvedFrameworkURL = frameworksURL.appendingPathComponent(
                "UasmUniZstdDecompress.framework",
                isDirectory: true
            )
        }

        let binaryName = resolvedFrameworkURL.deletingPathExtension().lastPathComponent
        let binaryURL = resolvedFrameworkURL
            .appendingPathComponent(binaryName)
            .standardizedFileURL
            .resolvingSymlinksInPath()
        guard FileManager.default.fileExists(atPath: binaryURL.path) else {
            throw ZstdError.runtime("zstd framework binary not found at \(binaryURL.path)")
        }
        return binaryURL
    }
}

public enum UniZstdDecompress {
    public static let defaultMaximumOutputSize = 1 * 1024 * 1024 * 1024 * 1024

    /// Loads an embedded zstd.framework, or a specific signed framework URL.
    public static func loadFramework(at frameworkURL: URL? = nil) throws {
        _ = try ZstdDynamicLoader.shared.load(at: frameworkURL)
    }

    public static func decompress(
        from inputURL: URL,
        to outputURL: URL,
        maximumOutputSize: Int = defaultMaximumOutputSize
    ) throws -> Int {
        guard inputURL.isFileURL else {
            throw ZstdError.invalidArgument("zstd input URL must be a file URL")
        }
        guard outputURL.isFileURL else {
            throw ZstdError.invalidArgument("zstd output URL must be a file URL")
        }
        guard maximumOutputSize > 0 else {
            throw ZstdError.range("maximum output size must be a positive integer")
        }

        let inputAccessStarted = inputURL.startAccessingSecurityScopedResource()
        defer {
            if inputAccessStarted {
                inputURL.stopAccessingSecurityScopedResource()
            }
        }
        let outputAccessStarted = outputURL.startAccessingSecurityScopedResource()
        defer {
            if outputAccessStarted {
                outputURL.stopAccessingSecurityScopedResource()
            }
        }

        let api = try ZstdDynamicLoader.shared.load()
        return try inputURL.withUnsafeFileSystemRepresentation { inputPath in
            guard let inputPath else {
                throw ZstdError.invalidArgument("zstd input URL has no file-system path")
            }
            return try outputURL.withUnsafeFileSystemRepresentation { outputPath in
                guard let outputPath else {
                    throw ZstdError.invalidArgument("zstd output URL has no file-system path")
                }
                try checkResult(
                    api.decompressFile(inputPath, outputPath, maximumOutputSize),
                    using: api
                )
                return 0
            }
        }
    }

    private static func checkResult(
        _ result: OpaquePointer?,
        using api: ZstdDynamicAPI
    ) throws {
        guard let result else {
            throw ZstdError.allocationFailure
        }
        defer { api.resultDestroy(result) }

        let errorKind = api.resultErrorKind(result)
        guard errorKind != ZstdNativeErrorKind.none else {
            return
        }
        let message = api.resultErrorMessage(result).map(String.init(cString:))
            ?? "zstd returned an error without a message"
        switch errorKind {
        case ZstdNativeErrorKind.invalidArgument:
            throw ZstdError.invalidArgument(message)
        case ZstdNativeErrorKind.range:
            throw ZstdError.range(message)
        default:
            throw ZstdError.runtime(message)
        }
    }
}
