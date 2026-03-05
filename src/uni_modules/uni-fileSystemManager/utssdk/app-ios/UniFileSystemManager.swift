//
//  UniFileSystemManager.swift
//  DCloud
//
//  Created by Fred on 2024/12/18.
//

import Foundation
import Darwin
import DCloudUniappRuntime
import DCloudUTSFoundation

/*
 文件描述符相关概念：
 
 1. Flag概念：
 a: 打开文件用于追加。 如果文件不存在，则创建该文件。   O_CREAT && O_APPEND && O_WRONLY
 a+: 打开文件用于读取和追加。 如果文件不存在，则创建该文件   O_CREAT && O_APPEND && O_RDWR
 ax: 类似于 'a'，但如果路径存在，则失败。    O_APPEND && O_WRONLY && O_CREAT && O_EXCL
 ax+: 类似于 'a+'，但如果路径存在，则失败     O_CREAT && O_EXCL && O_APPEND && O_RDWR
 as:  打开文件用于追加（在同步模式中）。 如果文件不存在，则创建该文件
 as+: 打开文件用于读取和追加（在同步模式中）。 如果文件不存在，则创建该文件
 r: 打开文件用于读取。 如果文件不存在，则会发生异常   O_RDONLY
 r+: 打开文件用于读取和写入。 如果文件不存在，则会发生异常  O_RDWR
 w: 打开文件用于写入。 如果文件不存在则创建文件，如果文件存在则截断文件。O_WRONLY && O_CREAT && O_TRUNC
 w+: 打开文件用于读取和写入。 如果文件不存在则创建文件，如果文件存在则截断文件   O_RDWR && O_CREAT && O_TRUNC
 wx: 类似于 'w'，但如果路径存在，则失败 O_WRONLY && O_CREAT && O_EXCL
 wx+: 类似于 'w+'，但如果路径存在，则失败   O_RDWR && O_CREAT && O_EXCL
 
 
 2. POSIX 文件标志位
 1. O_RDONLY： 以只读方式打开文件（r）。
 2. O_WRONLY： 以只写方式打开文件（w）。
 3. O_RDWR： 以读写方式打开文件（r+）。
 4. O_APPEND： 追加写入模式（a）。
 5. O_CREAT： 如果文件不存在则创建文件。
 6. O_EXCL： 与 O_CREAT 一起使用时，如果文件已存在则操作失败（x）。
 7. O_TRUNC： 如果文件存在，打开时清空文件内容（w）。
 8. O_DSYNC / O_SYNC： 打开文件时启用同步写入模式。
 
 O_SYNC:
 作用：确保数据和元数据（metadata）都被同步写入到存储设备。
 •    当使用 O_SYNC 标志打开文件时，写入操作（例如 write() 系统调用）会等待，直到数据和相关元数据都被实际写入到磁盘，保证数据的完整性。
 •    场景：适用于需要强一致性和数据安全的场景，比如数据库写入或日志文件。
 
 O_DSYNC:
 •    作用：确保数据被同步写入存储设备，但不保证元数据的同步。
 •    O_DSYNC 比 O_SYNC 更高效，因为它只同步数据部分，而文件元数据（例如文件修改时间、文件大小）不一定会立即同步。
 •    场景：适用于对写入性能有要求，但只需要确保数据一致性的场景，例如记录大批量日志数据。
 */

public enum UniFileSystemManagerFlag: Int {
    case a = 0
    case aplus
    case ax
    case axplus
    case `as`
    case asplus
    case r
    case rplus
    case w
    case wplus
    case wx
    case wxplus
    
    public func toString() -> String {
        switch self {
        case .a: return "a"
        case .aplus: return "a+"
        case .ax: return "ax"
        case .axplus: return "ax+"
        case .`as`: return "as"
        case .asplus: return "as+"
        case .r: return "r"
        case .rplus: return "r+"
        case .w: return "w"
        case .wplus: return "w+"
        case .wx: return "wx"
        case .wxplus: return "wx+"
        }
    }
}

/// 文件操作权限枚举
public enum UniFilePermission: Int {
    case readOnly = 0
    case writeOnly
    case readWrite
    
    var permissionFlag: Int32 {
        switch self {
        case .readOnly: return O_RDONLY
        case .writeOnly: return O_WRONLY
        case .readWrite: return O_RDWR
        }
    }
}


public class UniFileOpenOptions: NSObject {
    public let rawValue: Int32
    
    // 定义选项值
    public static let create = UniFileOpenOptions(rawValue: O_CREAT)
    public static let exclusive = UniFileOpenOptions(rawValue: O_EXCL)
    public static let truncate = UniFileOpenOptions(rawValue: O_TRUNC)
    public static let append = UniFileOpenOptions(rawValue: O_APPEND)
    public static let sync = UniFileOpenOptions(rawValue: O_SYNC)
    public static let dsync = UniFileOpenOptions(rawValue: O_DSYNC)
    
    // 初始化方法
    public init(rawValue: Int32) {
        self.rawValue = rawValue
    }
    
    // 合并选项
    public class func combine(options: [UniFileOpenOptions]) -> UniFileOpenOptions {
        let combinedRawValue = options.reduce(0) { $0 | $1.rawValue }
        return UniFileOpenOptions(rawValue: combinedRawValue)
    }
    
    // 检查选项是否包含
    public func contains(option: UniFileOpenOptions) -> Bool {
        return (self.rawValue & option.rawValue) != 0
    }
}


@objcMembers
public class UniFileSystemManager: NSObject {
    /// 底层文件打开方法
    /// - Parameters:
    ///   - path: 文件路径
    ///   - permission: 文件访问权限
    ///   - options: 文件打开选项
    /// - Returns: 文件描述符
    @discardableResult
    private static func openFile(
        path: String,
        flag: String
    ) -> (Int32?, UniFileSystemManagerError?) {
        let path = UTSiOS.convert2AbsFullPath(path)
        
        var permission: UniFilePermission = .readWrite
        var options: UniFileOpenOptions?
        
        if flag == UniFileSystemManagerFlag.a.toString() {
            // a: 打开文件用于追加。 如果文件不存在，则创建该文件。   O_CREAT && O_APPEND && O_WRONLY
            permission = .writeOnly
            options = UniFileOpenOptions.combine(options: [.append, .create])
        } else if flag == UniFileSystemManagerFlag.aplus.toString() {
            // a+: 打开文件用于读取和追加。 如果文件不存在，则创建该文件   O_CREAT && O_APPEND && O_RDWR
            permission = .readWrite
            options = UniFileOpenOptions.combine(options: [.append, .create])
        } else if flag == UniFileSystemManagerFlag.ax.toString() {
            //ax: 类似于 'a'，但如果路径存在，则失败。    O_APPEND && O_WRONLY && O_CREAT && O_EXCL
            permission = .writeOnly
            options = UniFileOpenOptions.combine(options: [.append, .create, .exclusive])
        } else if flag == UniFileSystemManagerFlag.axplus.toString() {
            // ax+: 类似于 'a+'，但如果路径存在，则失败     O_CREAT && O_EXCL && O_APPEND && O_RDWR
            permission = .readWrite
            options = UniFileOpenOptions.combine(options: [.append, .create, .exclusive])
        } else if flag == UniFileSystemManagerFlag.as.toString() {
            // as:  打开文件用于追加（在同步模式中）。 如果文件不存在，则创建该文件 O_CREAT && O_APPEND && O_WRONLY && O_SYNC
            permission = .writeOnly
            options = UniFileOpenOptions.combine(options: [.append, .create, .sync])
        } else if flag == UniFileSystemManagerFlag.asplus.toString() {
            // as+: 打开文件用于读取和追加（在同步模式中）。 如果文件不存在，则创建该文件 O_CREAT && O_APPEND && O_RDWR && O_SYNC
            permission = .readWrite
            options = UniFileOpenOptions.combine(options: [.append, .create, .sync])
        } else if flag == UniFileSystemManagerFlag.r.toString() {
            // r: 打开文件用于读取。 如果文件不存在，则会发生异常   O_RDONLY
            permission = .readOnly
        } else if flag == UniFileSystemManagerFlag.rplus.toString() {
            // r+: 打开文件用于读取和写入。 如果文件不存在，则会发生异常  O_RDWR
            permission = .readWrite
        } else if flag == UniFileSystemManagerFlag.w.toString() {
            // w: 打开文件用于写入。 如果文件不存在则创建文件，如果文件存在则截断文件。O_WRONLY && O_CREAT && O_TRUNC
            permission = .writeOnly
            options = UniFileOpenOptions.combine(options: [.truncate, .create])
        } else if flag == UniFileSystemManagerFlag.wplus.toString() {
            // w+: 打开文件用于读取和写入。 如果文件不存在则创建文件，如果文件存在则截断文件   O_RDWR && O_CREAT && O_TRUNC
            permission = .readWrite
            options = UniFileOpenOptions.combine(options: [.truncate, .create])
        } else if flag == UniFileSystemManagerFlag.wx.toString() {
            // wx: 类似于 'w'，但如果路径存在，则失败 O_WRONLY && O_CREAT && O_EXCL
            permission = .writeOnly
            options = UniFileOpenOptions.combine(options: [.exclusive, .create])
        } else if flag == UniFileSystemManagerFlag.wxplus.toString() {
            // wx+: 类似于 'w+'，但如果路径存在，则失败   O_RDWR && O_CREAT && O_EXCL
            permission = .readWrite
            options = UniFileOpenOptions.combine(options: [.exclusive, .create])
        }
        
        var combinedFlags = permission.permissionFlag
        if let options = options {
            combinedFlags = combinedFlags | options.rawValue
        }
        
        if isDirectory(path) {
            combinedFlags = combinedFlags | O_DIRECTORY
        }
        
        // 使用darwin底层open函数
        let fd = Darwin.open(
            path,
            combinedFlags,
            S_IRUSR | S_IWUSR | S_IRGRP | S_IROTH
        )
        
        guard fd >= 0 else {
            let errorMessage = String(cString: strerror(errno))
            UNILogDebug("文件打开失败: \(errorMessage) (\(errno))")
            
            let error = UniFileSystemManagerError.from(errno: errno)
            return (nil, error)
        }
        
        return (fd, nil)
    }
    
    /// 底层文件打开方法
    /// - Parameters:
    ///   - path: 文件路径
    ///   - permission: 文件访问权限
    ///   - options: 文件打开选项
    /// - Returns: 文件描述符
    private static func openFile(
        path: String,
        permission: UniFilePermission = .readWrite,
        options: UniFileOpenOptions
    ) -> Int32 {
        let path = UTSiOS.convert2AbsFullPath(path)
        let combinedFlags = permission.permissionFlag | options.rawValue
        
        // 使用darwin底层open函数
        let fd = Darwin.open(
            path,
            combinedFlags,
            S_IRUSR | S_IWUSR | S_IRGRP | S_IROTH
        )
        
        guard fd >= 0 else {
            UNILogDebug("文件打开失败: \(String(cString: strerror(errno)))")
            return -1
        }
        
        return fd
    }
    
    /// 高性能文件读取
    /// - Parameters:
    ///   - fileDescriptor: 文件描述符
    ///   - bufferSize: 读取缓冲区大小
    /// - Returns: 读取的数据
    private static func readFile(
        fileDescriptor: Int32,
        bufferSize: Int = 1024 * 256
    ) -> Data? {
        let buffer = UnsafeMutableRawPointer.allocate(byteCount: bufferSize, alignment: 1)
        defer {
            buffer.deallocate()
        }
        
        var readData = Data()
        
        while true {
            let bytesRead = Darwin.read(fileDescriptor, buffer, bufferSize)
            
            guard bytesRead > 0 else {
                if bytesRead == 0 { break }  // 文件读取完毕
                UNILogDebug("读取错误: \(String(cString: strerror(errno)))")
                return nil
            }
            
            readData.append(buffer.assumingMemoryBound(to: UInt8.self), count: bytesRead)
        }
        
        return readData
    }
    
    /// 关闭文件描述符
    /// - Parameter fileDescriptor: 文件描述符
    @discardableResult
    private static func close(
        fileDescriptor: Int32
    ) -> (Bool, UniFileSystemManagerError?) {
        
        guard let _ = getPath(fileDescriptor: fileDescriptor)  else {
            return (false, .badFileDescriptor)
        }
        
        let result = Darwin.close(fileDescriptor)
        
        guard result == 0 else {
            UNILogDebug("关闭文件描述符失败: \(String(cString: strerror(errno)))")
            
            let error = UniFileSystemManagerError.from(errno: errno)
            return (false, error)
        }
        
        return (true, nil)
    }
    
    /// 获取文件元信息
    /// - Parameter path: 文件路径
    /// - Returns: 文件元信息
    @discardableResult
    private static func getFileAttributes(
        path: String
    ) -> (Darwin.stat?, UniFileSystemManagerError?) {
        let path = UTSiOS.convert2AbsFullPath(path)
        var fileStat = Darwin.stat()
        
        guard stat(path, &fileStat) == 0 else {
            UNILogDebug("获取文件元信息失败: \(String(cString: strerror(errno)))")
            
            let error = UniFileSystemManagerError.from(errno: errno)
            return (nil, error)
        }
        
        return (fileStat, nil)
    }
    
    /// 获取文件元信息
    /// - Parameter fileDescriptor: 文件描述符
    /// - Returns: 文件元信息
    private static func fstat(
        fileDescriptor: Int32
    ) -> (Darwin.stat?, UniFileSystemManagerError?) {
        
        guard let _ = getPath(fileDescriptor: fileDescriptor)  else {
            return (nil, .badFileDescriptor)
        }
        
        var fileStat = Darwin.stat()
        
        guard Darwin.fstat(fileDescriptor, &fileStat) == 0 else {
            UNILogDebug("获取文件元信息失败: \(String(cString: strerror(errno)))")
            
            let error = UniFileSystemManagerError.from(errno: errno)
            return (nil, error)
        }
        
        return (fileStat, nil)
    }
    
    /// 创建目录
    /// - Parameters:
    ///   - path: 目录路径
    ///   - mode: 目录权限
    /// - Returns: 是否创建成功
    @discardableResult
    private static func mkdir(
        path: String,
        mode: mode_t = S_IRWXU | S_IRGRP | S_IXGRP | S_IROTH | S_IXOTH
    ) -> (Bool, UniFileSystemManagerError?) {
        let path = UTSiOS.convert2AbsFullPath(path)
        let result = Darwin.mkdir(path, mode)
        guard result == 0 else {
            UNILogDebug("创建目录失败: \(String(cString: strerror(errno)))")
            
            let error = UniFileSystemManagerError.from(errno: errno)
            return (false, error)
        }
        
        return (true, nil)
    }
    
    /// 删除文件
    /// - Parameter path: 文件路径
    /// - Returns: 是否删除成功
    @discardableResult
    private static func unlink(
        path: String
    ) -> (Bool, UniFileSystemManagerError?) {
        let path = UTSiOS.convert2AbsFullPath(path)
        let result = Darwin.unlink(path)
        
        guard result == 0 else {
            let errorMessage = String(cString: strerror(errno))
            UNILogDebug("删除文件失败: \(errorMessage) (\(errno))")
            
            let error = UniFileSystemManagerError.from(errno: errno)
            return (false, error)
        }
        
        return (true, nil)
    }
    
    /// 删除目录
    /// - Parameter path: 目录路径
    /// - Returns: 是否删除成功
    @discardableResult
    private static func rmdir(
        path: String
    ) -> (Bool, UniFileSystemManagerError?) {
        let result = Darwin.rmdir(path)
        
        guard result == 0 else {
            let errorMessage = String(cString: strerror(errno))
            UNILogDebug("删除目录失败: \(errorMessage) (\(errno))")
            let error = UniFileSystemManagerError.from(errno: errno)
            return (false, error)
        }
        
        return (true, nil)
    }
    
    /// 截断文件内容
    /// - Parameters:
    ///   - path: 文件路径
    ///   - length: 截断位置，默认0。如果 length 小于文件长度（字节），则只有前面 length 个字节会保留在文件中，其余内容会被删除；如果 length 大于文件长度，不做处理
    /// - Returns: 完成回调
    @discardableResult
    private static func truncate(
        path: String,
        length: off_t
    ) -> (Bool, UniFileSystemManagerError?) {
        let result = Darwin.truncate(path, length)
        
        guard result == 0 else {
            let errorMessage = String(cString: strerror(errno))
            UNILogDebug("截断文件内容失败: \(errorMessage) (\(errno))")
            
            let error = UniFileSystemManagerError.from(errno: errno)
            return (false, error)
        }
        
        return (true, nil)
    }
    
    
    /// 截断文件内容
    /// - Parameters:
    ///   - fd: 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得
    ///   - length: 截断位置，默认0。如果 length 小于文件长度（字节），则只有前面 length 个字节会保留在文件中，其余内容会被删除；如果 length 大于文件长度，不做处理
    /// - Returns: 完成回调
    @discardableResult
    private static func ftruncate(
        fileDescriptor: Int32,
        length: off_t
    ) -> (Bool, UniFileSystemManagerError?) {
        
        guard let _ = getPath(fileDescriptor: fileDescriptor)  else {
            return (false, .badFileDescriptor)
        }
        
        let result = Darwin.ftruncate(fileDescriptor, length)
        
        guard result == 0 else {
            let errorMessage = String(cString: strerror(errno))
            UNILogDebug("截断文件内容失败: \(errorMessage) (\(errno))")
            
            let error = UniFileSystemManagerError.from(errno: errno)
            return (false, error)
        }
        
        return (true, nil)
    }
    
    private static func getPath(fileDescriptor: Int32) -> String? {
        var buffer = [CChar](repeating: 0, count: Int(PATH_MAX)) // 缓冲区大小
        if fcntl(fileDescriptor, F_GETPATH, &buffer) == 0 { // 使用 F_GETPATH 获取路径
            return String(cString: buffer)
        } else {
            let error = errno // 获取错误码
            print("Failed to get file path. Error: \(String(cString: strerror(error)))")
            return nil
        }
    }
}

/// 编码类型
public enum UniFileEncoding: String {
    case base64 = "base64"
    case utf8 = "utf-8"
    case ascii = "ascii"
}

public enum UniFileSystemManagerError: Error, Equatable {
    public static func == (lhs: UniFileSystemManagerError, rhs: UniFileSystemManagerError) -> Bool {
        return lhs.description == rhs.description
    }
    
    case argumentInvalid
    case encodingNotSupport
    case encodingFailed
    case fileNotFound
    case fileNameTooLong
    case failedRemove
    case notDirectory
    case isDirectory
    case permissionDenied
    case directoryNotEmpty
    case systemError
    case alreadyExist
    case busy
    case readOnly
    case illegalOperation
    case outOfSpace
    case outOfMemory
    case badAddress
    case tooLarge
    case brotli_failed
    case unzip_UnableToOpen
    case unzip_EntryFailed(Error?)
    case unzip_Failed
    case invalidFlag
    case badFileDescriptor
    case unknownError
    case navtiveError(Error?)
    
    public var nativeErrorDescription: String? {
        switch self {
        case .navtiveError(let error):
            return error?.localizedDescription
        case .unzip_EntryFailed(let error):
            return error?.localizedDescription
        default:
            return nil
        }
    }
    
    /// 从 NSError 转换为 UniFileSystemManagerError
    public static func from(originalError: NSError) -> UniFileSystemManagerError {
        switch originalError.code {
        case NSFileWriteNoPermissionError, NSFileReadNoPermissionError: return .permissionDenied
        case NSFileWriteInvalidFileNameError: return .fileNameTooLong
        case NSFileNoSuchFileError, NSFileReadInvalidFileNameError : return .fileNotFound
        case NSFileWriteInvalidFileNameError: return argumentInvalid
        case NSFileReadCorruptFileError: return badAddress
        case NSFileReadTooLargeError: return .tooLarge
        case NSFileWriteFileExistsError: return .alreadyExist
        case NSFileWriteOutOfSpaceError: return .outOfSpace
        case NSFileWriteUnknownError: return .unknownError
        default: return .navtiveError(originalError as Error)
        }
    }
    
    /// 从 errno 转换为 UniFileSystemManagerError
    public static func from(errno: Int32) -> UniFileSystemManagerError {
        switch errno {
        case Darwin.ENOENT: return .fileNotFound
        case Darwin.EEXIST: return .alreadyExist
        case Darwin.ENOTDIR: return .notDirectory
        case Darwin.ENOTEMPTY: return .directoryNotEmpty
        case Darwin.EACCES: return .permissionDenied
        case Darwin.EBUSY: return .busy
        case Darwin.EROFS: return .readOnly
        case Darwin.EISDIR: return .isDirectory
        case Darwin.EINVAL: return .argumentInvalid
        case Darwin.ENOSPC: return .outOfSpace
        case Darwin.ENOMEM: return .outOfMemory
        case Darwin.EBADF: return .badFileDescriptor
        default: return .unknownError
        }
    }
    
    /// 转换为interface中定义的对应错误码
    public var errorCode: NSNumber {
        switch self {
        case .argumentInvalid: return 1300022
        case .encodingNotSupport: return 1200002
        case .encodingFailed: return 1300201
        case .fileNotFound: return 1300002
        case .fileNameTooLong: return 1300020
        case .failedRemove: return 1300201
        case .notDirectory: return 1300016
        case .isDirectory: return 1300021
        case .permissionDenied: return 1300013
        case .directoryNotEmpty: return 1300066
        case .systemError: return 1300201
        case .alreadyExist: return 1301005
        case .busy: return 1300017
        case .readOnly: return 1300019
        case .illegalOperation: return 1301003
        case .outOfSpace: return 1300018
        case .outOfMemory: return 1300202
        case .badAddress: return 1300011
        case .tooLarge: return 1300018
        case .brotli_failed: return 1301111
        case .unzip_Failed: return 1301104
        case .unzip_EntryFailed: return 1301103
        case .unzip_UnableToOpen: return 1301102
        case .invalidFlag: return 1302003
        case .badFileDescriptor: return 1300009
        case .unknownError: return 1300015
        default: return 1300015
        }
    }
    
    /// 获取对应的错误描述
    public var description: String {
        switch self {
        case .argumentInvalid: return "Invalid argument"
        case .encodingNotSupport: return "Type error. only support base64 / utf-8 / ascii"
        case .encodingFailed: return "Failed to encoding"
        case .fileNotFound: return "No such file or directory"
        case .fileNameTooLong: return "File name too long"
        case .notDirectory: return "Not a directory"
        case .isDirectory: return "Is a directory"
        case .failedRemove: return "Failed to remove"
        case .permissionDenied: return "Permission denied"
        case .directoryNotEmpty: return "Directory not empty"
        case .systemError: return "System error"
        case .alreadyExist: return "File already exists"
        case .busy: return "Device or resource busy"
        case .readOnly: return "Read-only file system"
        case .illegalOperation: return "Illegal operation on a directory"
        case .outOfSpace: return "No space left on device"
        case .outOfMemory: return "Out of memory"
        case .badAddress: return "Bad address"
        case .tooLarge: return "File too large"
        case .brotli_failed: return "Decompress fail"
        case .unzip_Failed: return "unzip fail"
        case .unzip_EntryFailed: return "unzip entry fail"
        case .unzip_UnableToOpen: return "unzip open file fail"
        case .navtiveError(let err): return err?.localizedDescription ?? ""
        case .invalidFlag: return "Invalid flag"
        case .badFileDescriptor: return "Bad file descriptor"
        default: return "Unknown error"
        }
    }
}

extension UniFileSystemManager {
    public typealias fileStatsArrayCallback = ([FileStats]?, UniFileSystemManagerError?) -> Void
    public typealias fileInfoCallback = (GetFileInfoSuccessResult?, UniFileSystemManagerError?) -> Void
    public typealias anyCallback = (Any?, UniFileSystemManagerError?) -> Void
    public typealias boolCallback = (Bool, UniFileSystemManagerError?) -> Void
    public typealias intCallback = (Int32?, UniFileSystemManagerError?) -> Void
    public typealias stringCallback = (String?, UniFileSystemManagerError?) -> Void
    public typealias stringArrayCallback = ([String]?, UniFileSystemManagerError?) -> Void
    
    private static let fileManager = FileManager.default
    private static let fileGlobalQueue = DispatchQueue.global(qos: .userInteractive)
    private static var fileQueues: [String: DispatchQueue] = [:]
    private static let fileQueueLock = DispatchQueue(label: "com.uni.filequeues.lock", attributes: .concurrent)
    private static func getFileQueue(for path: String) -> DispatchQueue {
        // 优化：读取操作允许并发
        if let existingQueue = fileQueueLock.sync(execute: { fileQueues[path] }) {
            return existingQueue
        }
        
        // 创建新队列时需要加独占写锁
        let newQueue = DispatchQueue(label: "com.uni.fileoperation.\(path.hashValue)", qos: .userInteractive)
        fileQueueLock.async(flags: .barrier) {
            fileQueues[path] = newQueue
        }
        
        return newQueue
    }
    
    private static func cleanFileQueue(for filePath: String) {
        fileQueueLock.async(flags: .barrier) {
            fileQueues.removeValue(forKey: filePath)
        }
    }
    
    
    /// 分片读取文件
    /// - Parameters:
    ///   - encoding: 编码类型
    ///   - path: 文件路径
    ///   - chunkSize: 分片大小（单次加载大小）
    ///   - completionHandler: 完成回调
    public static func readFile(
        encoding: String? = nil,
        path: String,
        chunkSize: Int = 1024 * 256, // 默认 256KB 分片大小
        completionHandler: anyCallback? = nil
    ) {
        
        if let encoding = encoding {
            if encoding != UniFileEncoding.utf8.rawValue && encoding != UniFileEncoding.ascii.rawValue && encoding != UniFileEncoding.base64.rawValue {
                completionHandler?(false, .encodingNotSupport)
                return
            }
        }
        
        let absolutePath = UTSiOS.convert2AbsFullPath(path)
        
        switch validatePath(atPath: absolutePath) {
        case .invalid(let ststus):
            completionHandler?(false, ststus.toError())
            return
        case .valid(let status):
            if status.isReadable == false {
                completionHandler?(false, .permissionDenied)
                return
            }
            
            safeRead()
        }
        
        func safeRead() {
            let fileQueue = getFileQueue(for: absolutePath)
            
            fileQueue.async {
                let fileUrl = URL(fileURLWithPath: absolutePath)
                
                guard let fileHandle = try? FileHandle(forReadingFrom: fileUrl) else {
                    completionHandler?(nil, .badAddress)
                    return
                }
                
                defer {
                    if #available(iOS 13.0, *) {
                        try? fileHandle.close()
                    } else {
                        fileHandle.closeFile()
                    }
                    
                    // 清理文件队列
                    cleanFileQueue(for: absolutePath)
                }
                
                var result: Any?
                
                if encoding == UniFileEncoding.base64.rawValue {
                    let data = fileHandle.readDataToEndOfFile()
                    result = data.base64EncodedString()
                } else {
                    var aggregatedData = Data()
                    while true {
                        let chunkData = fileHandle.readData(ofLength: chunkSize)
                        if chunkData.isEmpty { break }
                        aggregatedData.append(chunkData)
                    }
                    
                    if encoding == UniFileEncoding.utf8.rawValue {
                        func safeUTF8String(from data: Data) -> String {
                            var validData = data
                            var isUnSafe = false
                            while !validData.isEmpty {
                                if let str = String(data: validData, encoding: .utf8) {
                                    return str + (isUnSafe ? "�" : "")
                                }
                                isUnSafe = true
                                validData.removeLast()  // 逐字节丢弃，直到能正确解析
                            }
                            return ""
                        }
                        
                        result = safeUTF8String(from: aggregatedData)
                    } else if encoding == UniFileEncoding.ascii.rawValue {
                        result = String(data: aggregatedData, encoding: .ascii)
                    } else {
                        result = ArrayBuffer.fromData(aggregatedData)
                    }
                }
                
                if result == nil {
                    completionHandler?(nil, .encodingFailed)
                } else {
                    completionHandler?(result, nil)
                }
            }
        }
    }
    
    /// 同步读取文件
    /// - Parameters:
    ///   - filePath: 文件路径
    ///   - encoding: 编码类型
    /// - Returns: 返回结果
    public static func readFileSync(_ filePath: String, _ encoding: String?) -> (Any?, UniFileSystemManagerError?) {
        let semaphore = DispatchSemaphore(value: 0)
        
        var result: (data: Any?, error: UniFileSystemManagerError?) = (nil, nil)
        
        UniFileSystemManager.readFile(encoding: encoding, path: filePath) { data, error in
            result = (data, error)
            semaphore.signal()
        }
        
        _ = semaphore.wait(timeout: .distantFuture)
        
        return result
    }
    
    /// 分片写入文件
    /// - Parameters:
    ///   - encoding: 编码类型
    ///   - path: 文件路径
    ///   - data: 写入数据
    ///   - chunkSize: 分片大小
    ///   - completionHandler: 完成回调
    public static func writeFile(
        encoding: String? = nil,
        path: String,
        data: Any!,
        chunkSize: Int = 1024 * 256, // 默认 256KB 分片大小
        completionHandler: boolCallback? = nil
    ) {
        if let encoding = encoding {
            if encoding != UniFileEncoding.utf8.rawValue && encoding != UniFileEncoding.ascii.rawValue && encoding != UniFileEncoding.base64.rawValue {
                completionHandler?(false, .encodingNotSupport)
                return
            }
        }
        
        let absolutePath = UTSiOS.convert2AbsFullPath(path)
        
        switch validatePath(atPath:  absolutePath) {
        case .invalid(let status):
            if status.toError() == UniFileSystemManagerError.fileNotFound {
                if creatFile(absolutePath) {
                    safeWrite()
                } else {
                    completionHandler?(false, .systemError)
                }
            } else {
                completionHandler?(false, status.toError())
            }
        case .valid(let status):
            // 目标文件存在，并且是目录路径
            if isDirectory(absolutePath) {
                completionHandler?(false, .illegalOperation)
                return
            } else if status.isWritable == false {
                completionHandler?(false, .permissionDenied)
                return
            }
            
            //存在的先remove，再create
            let (success, _) = unlink(path: absolutePath)
            
            if success, creatFile(absolutePath) {
                safeWrite()
            } else {
                completionHandler?(false, .systemError)
            }
        }
        
        func safeWrite() {
            let fileQueue = getFileQueue(for: absolutePath)
            
            fileQueue.async {
                let fileUrl = URL(fileURLWithPath: absolutePath)
                
                guard let fileHandle = try? FileHandle(forWritingTo: fileUrl) else {
                    completionHandler?(false, .fileNotFound)
                    return
                }
                
                defer {
                    if #available(iOS 13.0, *) {
                        try? fileHandle.close()
                    } else {
                        fileHandle.closeFile()
                    }
                    
                    // 清理文件队列
                    cleanFileQueue(for: absolutePath)
                }
                
                // 分片写入逻辑
                func writeChunks(_ chunkData: Data) {
                    var offsetTemp = 0
                    let totalSize = chunkData.count
                    
                    while offsetTemp < totalSize {
                        let length = min(chunkSize, totalSize - offsetTemp)
                        let chunk = chunkData.subdata(in: offsetTemp..<(offsetTemp + length))
                        fileHandle.write(chunk)
                        offsetTemp += length
                    }
                }
                
                // 处理不同数据类型
                if let buffer = data as? ArrayBuffer {
                    let bufferData = buffer.toData()
                    fileHandle.seekToEndOfFile()
                    writeChunks(bufferData)
                    completionHandler?(true, nil)
                } else if let string = data as? String {
                    guard let encodedData = encodeData(string, encoding: encoding) else {
                        completionHandler?(false, .encodingFailed)
                        return
                    }
                    fileHandle.seekToEndOfFile()
                    writeChunks(encodedData)
                    completionHandler?(true, nil)
                } else {
                    completionHandler?(false, .fileNotFound)
                }
            }
        }
    }
    
    /// 删除文件
    /// - Parameters:
    ///   - filePath: 文件路径
    ///   - completionHandler: 完成回调
    public static func removeFile(
        filePath: String,
        completionHandler: boolCallback? = nil
    ) {
        
        let filePath = UTSiOS.convert2AbsFullPath(filePath)
        
        switch validatePath(atPath: filePath){
        case .invalid(let status):
            completionHandler?(false, status.toError())
        case .valid(let status):
            if status.isDirectory {
                completionHandler?(false, .isDirectory)
                return
            } else if status.isDeletable == false {
                completionHandler?(false, .permissionDenied)
                return
            }
            fileGlobalQueue.async {
                do {
                    try fileManager.removeItem(atPath: filePath)
                    completionHandler?(true, nil)
                } catch let error as NSError {
                    completionHandler?(false, UniFileSystemManagerError.from(originalError: error))
                }
            }
        }
    }
    
    /// 创建文件
    /// - Parameter path: 文件路径
    /// - Returns: 是否创建成功
    @discardableResult
    public static func creatFile(_ path: String) -> Bool {
        let path = UTSiOS.convert2AbsFullPath(path)
        if isExist(path) { return true }
        
        let dir = (path as NSString).deletingLastPathComponent
        if !isExist(dir) {
            let group = DispatchGroup()
            group.enter()
            createDirectory(path: dir, recursive: true) { success, error in
                defer {
                    group.leave()
                }
                if success {
                    fileManager.createFile(atPath: path, contents: nil, attributes: nil)
                }
            }
            group.wait()
        } else {
            fileManager.createFile(atPath: path, contents: nil, attributes: nil)
        }
        
        return isExist(path)
    }
    
    /// 创建目录
    /// - Parameters:
    ///   - filePath: 目录路径
    ///   - recursive: 是否递归创建
    ///   - completionHandler: 完成回调
    public static func createDirectory(
        path: String,
        recursive: Bool,
        completionHandler: boolCallback? = nil
    ) {
        guard !isEmpty(path) else {
            completionHandler?(false, .argumentInvalid)
            return
        }
        
        guard isSandbox(path) else {
            completionHandler?(false, .permissionDenied)
            return
        }
        
        let absolutePath = UTSiOS.convert2AbsFullPath(path)
        
        guard !isExist(path) else {
            completionHandler?(false, .alreadyExist)
            return
        }
        
        fileGlobalQueue.async {
            do {
                try fileManager.createDirectory(atPath: absolutePath, withIntermediateDirectories: recursive, attributes: nil)
                completionHandler?(true, nil)
            } catch let error as NSError {
                completionHandler?(false, UniFileSystemManagerError.from(originalError: error))
            }
        }
    }
    
    
    /// 同步创建目录
    /// - Parameters:
    ///   - filePath: 目录路径
    ///   - recursive: 是否递归创建
    /// - Returns: 是否成功创建
    @discardableResult
    public static func createDirectorySync(_ dirPath: String, _ recursive: Bool) -> Bool {
        let semaphore = DispatchSemaphore(value: 0)
        var result: (success: Bool, error: UniFileSystemManagerError?) = (false, nil)
        
        UniFileSystemManager.createDirectory(path: dirPath, recursive: recursive) { success, error in
            result = (success, error)
            semaphore.signal()
        }
        _ = semaphore.wait(timeout: .distantFuture)
        
        if result.success {
            return true
        }
        return false
    }
    
    
    /// 删除目录
    /// - Parameters:
    ///   - filePath: 目录路径
    ///   - recursive: 是否递归删除
    ///   - completionHandler: 完成回调
    public static func removeDirectory(
        filePath: String,
        recursive: Bool,
        completionHandler: boolCallback? = nil
    ) {
        
        let filePath = UTSiOS.convert2AbsFullPath(filePath)
        
        switch validatePath(atPath: filePath) {
        case .invalid(let status):
            completionHandler?(false, status.toError())
        case .valid(let status):
            if status.isDeletable == false {
                completionHandler?(false, .permissionDenied)
                return
            } else if status.isDirectory == false {
                completionHandler?(false, .notDirectory)
                return
            } else {
                fileGlobalQueue.async {
                    //非递归删除
                    if recursive == false {
                        let (success, error) = rmdir(path: filePath)
                        if let error = error, success == false {
                            completionHandler?(false, error)
                        } else {
                            completionHandler?(true, nil)
                        }
                        return
                    }
                    
                    //递归删除
                    do {
                        try fileManager.removeItem(atPath: filePath)
                        completionHandler?(true, nil)
                    } catch {
                        readDirectoryList(filePath) { list, error in
                            if let list = list, list.count == 0 {
                                completionHandler?(true, nil)
                            } else {
                                completionHandler?(false, .systemError)
                            }
                        }
                    }
                }
            }
        }
    }
    
    
    /// 同步删除目录
    /// - Parameters:
    ///   - dirPath: 目录路径
    ///   - recursive: 是否递归删除
    /// - Returns: 返回结果
    @discardableResult
    public static func removeDirectorySync(_ dirPath: String, _ recursive: Bool) -> (Bool, UniFileSystemManagerError?){
        let semaphore = DispatchSemaphore(value: 0)
        var result: (success: Bool, error: UniFileSystemManagerError?) = (false, nil)
        
        UniFileSystemManager.removeDirectory(filePath: dirPath, recursive: recursive) { success, error in
            result = (success, error)
            semaphore.signal()
        }
        _ = semaphore.wait(timeout: .distantFuture)
        
        return result
    }
    
    /// 读取目录内文件列表
    /// - Parameter path: 目录路径
    /// - Returns: 读取结果
    public static func readDirectoryListSync(_ path: String) -> ([String]?, UniFileSystemManagerError?) {
        let filePath = UTSiOS.convert2AbsFullPath(path)
        switch validatePath(atPath: filePath) {
        case .invalid(let status):
            return (nil, status.toError())
        case .valid(let status):
            if status.isDirectory == false {
                return (nil, .notDirectory)
            } else if status.isReadable == false {
                return (nil, .permissionDenied)
            }
            do {
                let list = try fileManager.contentsOfDirectory(atPath: filePath)
                return (list, nil)
            } catch let error as NSError {
                return (nil,  UniFileSystemManagerError.from(originalError: error))
            }
        }
    }
    
    /// 读取目录内文件列表
    /// - Parameters:
    ///   - path: 目录路径
    ///   - completionHandler: 完成回调
    public static func readDirectoryList(
        _ path: String,
        completionHandler: stringArrayCallback? = nil
    ) {
        let filePath = UTSiOS.convert2AbsFullPath(path)
        switch validatePath(atPath: filePath) {
        case .invalid(let status):
            completionHandler?(nil, status.toError())
        case .valid(let status):
            if status.isDirectory == false {
                completionHandler?(nil, .notDirectory)
                return
            } else if status.isReadable == false {
                completionHandler?(nil, .permissionDenied)
                return
            }
            
            fileGlobalQueue.async {
                do {
                    let list = try fileManager.contentsOfDirectory(atPath: filePath)
                    completionHandler?(list, nil)
                } catch let error as NSError {
                    completionHandler?(nil, UniFileSystemManagerError.from(originalError: error))
                }
            }
        }
    }
    
    /// 重命名文件, 可以把文件从 oldPath 移动到 newPath
    /// - Parameters:
    ///   - oldPath: 源文件路径
    ///   - newPath: 新文件路径
    ///   - completionHandler: 完成回调
    public static func rename(
        oldPath: String,
        newPath: String,
        completionHandler: boolCallback? = nil
    ) {
        let oldPath = UTSiOS.convert2AbsFullPath(oldPath)
        let newPath = UTSiOS.convert2AbsFullPath(newPath)
        
        switch validatePath(atPath: oldPath) {
        case .invalid(let status):
            completionHandler?(false, status.toError())
            return
        case .valid(let status):
            if status.isDirectory {
                completionHandler?(false, .isDirectory)
                return
            } else if status.isReadable == false {
                completionHandler?(false, .permissionDenied)
                return
            }
        }
        
        if oldPath == newPath {
            completionHandler?(true, nil)
            return
        }
        
        switch validatePath(atPath: newPath) {
        case .invalid(let status):
            /// 和 Android、微信小程序保持一致，rename 新路径如果上一级别目录不存在，返回错误 1300002；上一级别目录存在，不管file是否存在都能rename成功，file存在就覆盖
            
            let dir = (newPath as NSString).deletingLastPathComponent
            if !isExist(dir) {
                completionHandler?(false, status.toError())
                return
            }
            
        case .valid(let status):
            if status.isDirectory {
                completionHandler?(false, .isDirectory)
                return
            } else if status.isWritable == false {
                completionHandler?(false, .permissionDenied)
                return
            }
            //存在的先remove
            let (success, _) = unlink(path: newPath)
            
            if !success {
                completionHandler?(false, .systemError)
            }
        }
        
        rename()
        
        func rename() {
            fileGlobalQueue.async {
                do {
                    try fileManager.moveItem(atPath: oldPath, toPath: newPath)
                    completionHandler?(true, nil)
                } catch let error as NSError {
                    completionHandler?(false, UniFileSystemManagerError.from(originalError: error))
                }
            }
        }
    }
    
    /// 复制文件
    /// - Parameters:
    ///   - oldPath: 源文件路径
    ///   - newPath: 新文件路径
    ///   - completionHandler: 完成回调
    public static func copyFile(
        srcPath: String,
        destPath: String,
        completionHandler: boolCallback? = nil
    ) {
        let srcPath = UTSiOS.convert2AbsFullPath(srcPath)
        var destPath = UTSiOS.convert2AbsFullPath(destPath)
        if destPath.hasSuffix("/") {
            destPath = String(destPath.dropLast())
        }
        
        switch validatePath(atPath: srcPath) {
        case .invalid(let status):
            completionHandler?(false, status.toError())
            return
        case .valid(let status):
            if status.isDirectory {
                completionHandler?(false, .isDirectory)
                return
            } else if status.isReadable == false {
                completionHandler?(false, .permissionDenied)
                return
            }
        }
        
        if srcPath == destPath {
            completionHandler?(true, nil)
            return
        }
        
        switch validatePath(atPath: destPath) {
        case .invalid(let status):
            if status.toError() == UniFileSystemManagerError.fileNotFound {
                let dir = (destPath as NSString).deletingLastPathComponent
                if !isExist(dir) {
                    createDirectorySync(dir, true)
                }
                
            } else {
                completionHandler?(false, status.toError())
                return
            }
        case .valid(let status):
            if status.isDirectory {
                completionHandler?(false, .isDirectory)
                return
            } else if status.isWritable == false {
                completionHandler?(false, .permissionDenied)
                return
            }
            
            //存在的先remove
            let (success, _) = unlink(path: destPath)
            
            if !success {
                completionHandler?(false, .systemError)
            }
        }
        
        copy()
        
        func copy() {
            fileGlobalQueue.async {
                do {
                    try fileManager.copyItem(atPath: srcPath, toPath: destPath)
                    completionHandler?(true, nil)
                } catch let error as NSError {
                    completionHandler?(false, UniFileSystemManagerError.from(originalError: error))
                }
            }
        }
    }
    
    /// 获取该本地临时文件 或 本地缓存文件 信息
    /// - Parameters:
    ///   - filePath: 文件路径
    ///   - digestAlgorithm: 摘要算法
    ///   - completionHandler: 完成回调
    public static func getFileInfo(
        filePath: String,
        digestAlgorithm: String?,
        completionHandler: fileInfoCallback? = nil
    ) {
        let filePath = UTSiOS.convert2AbsFullPath(filePath)
        
        switch validatePath(atPath: filePath) {
        case .invalid(let status):
            completionHandler?(nil, status.toError())
        case .valid(let status):
            if status.isDirectory {
                completionHandler?(nil, .isDirectory)
                return
            } else if status.isReadable == false {
                completionHandler?(nil, .permissionDenied)
                return
            }
            
            fileGlobalQueue.async {
                var digest = ""
                let digestAlgorithm = digestAlgorithm ?? "md5"
                if digestAlgorithm.lowercased() == UniFileDigest.DigestType.md5.rawValue {
                    digest = UniFileDigest.toDigest(forFileAtPath: filePath, type: .md5) ?? ""
                } else if digestAlgorithm.lowercased() == UniFileDigest.DigestType.sha1.rawValue {
                    digest = UniFileDigest.toDigest(forFileAtPath: filePath, type: .sha1) ?? ""
                }
                //                else if digestAlgorithm.lowercased() == UniFileDigest.DigestType.sha256.rawValue {
                //                    digest = UniFileDigest.toDigest(forFileAtPath: filePath, type: .sha256) ?? ""
                //                }
                else {
                    completionHandler?(nil, .argumentInvalid)
                    return
                }
                
                let (stat, error) = getFileAttributes(path: filePath)
                if let stat = stat {
                    let result = GetFileInfoSuccessResult()
                    result.digest = digest
                    result.errMsg = "getFileInfo:ok"
                    result.size = stat.st_size as NSNumber
                    completionHandler?(result, nil)
                    return
                }
                
                completionHandler?(nil, error)
            }
        }
    }
    
    /// 获取文件 Stats 对象
    /// - Parameters:
    ///   - filePath: 文件/目录路径 (本地路径)
    ///   - recursive: 是否递归获取目录下的每个文件的 Stats 信息
    ///   - completionHandler: 完成回调
    public static func getStat(
        filePath: String,
        recursive: Bool,
        completionHandler: fileStatsArrayCallback? = nil
    ) {
        let absolutePath = UTSiOS.convert2AbsFullPath(filePath)
        
        switch validatePath(atPath: absolutePath) {
        case .invalid(let status):
            completionHandler?(nil, status.toError())
        case .valid(let status):
            if status.isReadable == false {
                completionHandler?(nil, .permissionDenied)
                return
            }
            get()
        }
        
        func get() {
            fileGlobalQueue.async {
                var list = [FileStats]()
                if recursive == false || isDirectory(absolutePath) == false {
                    let fileStats = FileStats()
                    let (stat, error) = getFileAttributes(path: absolutePath)
                    if let stat = stat {
                        fileStats.path = isDirectory(absolutePath) == false ? "" : "/"
                        fileStats.stats = stat.toStat()
                        list.append(fileStats)
                        completionHandler?(list, nil)
                    } else {
                        completionHandler?(nil, error)
                    }
                    
                    return
                }
                
                if recursive && isDirectory(absolutePath) {
                    let fileStats = FileStats()
                    let (stat, error) = getFileAttributes(path: absolutePath)
                    if let stat = stat {
                        fileStats.path = "/"
                        fileStats.stats = stat.toStat()
                        list.append(fileStats)
                    }
                    
                    if let enumerator = fileManager.enumerator(atPath: absolutePath) {
                        for case let path as String in enumerator {
                            let fullPath = (absolutePath as NSString).appendingPathComponent(path)
                            let relativePath = "/\(path)"
                            let fileStats = FileStats()
                            let (stat, error) = getFileAttributes(path: fullPath)
                            if let stat = stat {
                                fileStats.path = relativePath
                                fileStats.stats = stat.toStat()
                                list.append(fileStats)
                            }
                        }
                    }
                    
                    completionHandler?(list, nil)
                }
            }
        }
    }
    
    /// 在文件结尾追加内容
    /// - Parameters:
    ///   - encoding: 编码类型
    ///   - path: 文件路径
    ///   - data: 写入数据
    ///   - chunkSize: 分片大小
    ///   - completionHandler: 完成回调
    public static func appendFile(
        encoding: String? = nil,
        path: String,
        data: Any!,
        chunkSize: Int = 1024 * 256, // 默认 256KB 分片大小
        completionHandler: boolCallback? = nil
    ) {
        if let encoding = encoding {
            if encoding != UniFileEncoding.utf8.rawValue || encoding != UniFileEncoding.utf8.rawValue || encoding != UniFileEncoding.utf8.rawValue {
                completionHandler?(false, .encodingNotSupport)
                return
            }
        }
        
        let absolutePath = UTSiOS.convert2AbsFullPath(path)
        
        switch validatePath(atPath:  absolutePath) {
        case .invalid(let status):
            completionHandler?(false, status.toError())
        case .valid(let status):
            // 目标文件存在，并且是目录路径
            if isDirectory(absolutePath) {
                completionHandler?(false, .illegalOperation)
                return
            } else if status.isWritable == false {
                completionHandler?(false, .permissionDenied)
                return
            }
            
            safeWrite()
        }
        
        func safeWrite() {
            let fileQueue = getFileQueue(for: absolutePath)
            
            fileQueue.async {
                let fileUrl = URL(fileURLWithPath: absolutePath)
                
                guard let fileHandle = try? FileHandle(forWritingTo: fileUrl) else {
                    completionHandler?(false, .fileNotFound)
                    return
                }
                
                defer {
                    if #available(iOS 13.0, *) {
                        try? fileHandle.close()
                    } else {
                        fileHandle.closeFile()
                    }
                    
                    // 清理文件队列
                    cleanFileQueue(for: absolutePath)
                }
                
                // 分片写入逻辑
                func writeChunks(_ chunkData: Data) {
                    var offset = 0
                    let totalSize = chunkData.count
                    
                    while offset < totalSize {
                        let length = min(chunkSize, totalSize - offset)
                        let chunk = chunkData.subdata(in: offset..<(offset + length))
                        fileHandle.write(chunk)
                        offset += length
                    }
                }
                
                // 处理不同数据类型
                if let buffer = data as? ArrayBuffer {
                    let bufferData = buffer.toData()
                    fileHandle.seekToEndOfFile()
                    writeChunks(bufferData)
                    completionHandler?(true, nil)
                } else if let string = data as? String {
                    guard let encodedData = encodeData(string, encoding: encoding) else {
                        completionHandler?(false, .encodingFailed)
                        return
                    }
                    fileHandle.seekToEndOfFile()
                    writeChunks(encodedData)
                    completionHandler?(true, nil)
                } else {
                    completionHandler?(false, .fileNotFound)
                }
            }
        }
    }
    
    /// 保存临时文件到本地
    /// - Parameters:
    ///   - tempFilePath: 临时存储文件路径 (本地路径)
    ///   - filePath: 要存储的文件路径 (本地路径)
    ///   - completionHandler: 完成回调
    public static func saveFile(
        tempFilePath: String,
        filePath: String?,
        completionHandler: stringCallback? = nil
    ) {
        let defaultPath = UniResource.CACHE_PATH + "uni-store/"
        var destPath = ""
        if let filePath = filePath {
            destPath = filePath
            if destPath.hasSuffix("/") {
                destPath = String(filePath.dropLast())
            }
        } else {
            let fileName = URL(fileURLWithPath: tempFilePath).lastPathComponent
            destPath = defaultPath + fileName
        }
        
        copyFile(srcPath: tempFilePath, destPath: destPath) { success, error in
            if let error = error, !success {
                completionHandler?(nil, error)
            } else {
                unlink(path: tempFilePath)
                completionHandler?(destPath, nil)
            }
        }
    }
    
    /// 删除已保存的本地缓存文件
    /// - Parameters:
    ///   - filePath: 需要删除的文件路径 (本地路径)
    ///   - completionHandler: 完成回调
    public static func removeSavedFile(
        filePath: String,
        completionHandler: boolCallback? = nil
    ) {
        removeFile(filePath: filePath) { success, error in
            completionHandler?(success, error)
        }
    }
    
    
    /// 解压文件
    /// - Parameters:
    ///   - zipFilePath: 源文件路径，支持本地路径, 只可以是 zip 压缩文件
    ///   - targetPath: 目标目录路径, 支持本地路径
    ///   - completionHandler: 完成回调
    public static func unzip(
        zipFilePath: String,
        targetPath: String,
        completionHandler: boolCallback? = nil
    ) {
        let zipFilePath = UTSiOS.convert2AbsFullPath(zipFilePath)
        let targetPath = UTSiOS.convert2AbsFullPath(targetPath)
        
        //保证源文件路径的合理性
        switch validatePath(atPath: zipFilePath) {
        case .invalid(let status):
            completionHandler?(false, status.toError())
            return
        case .valid(let status):
            if status.isReadable == false {
                completionHandler?(false, .permissionDenied)
                return
            }
            if !zipFilePath.hasSuffix(".zip") {
                completionHandler?(false, .argumentInvalid)
                return
            }
        }
        
        //保证目标目录路径的合理性
        switch validatePath(atPath: targetPath) {
        case .invalid(let status):
            if status.toError() == UniFileSystemManagerError.fileNotFound {
                if createDirectorySync(targetPath, true) == false {
                    completionHandler?(false, .fileNotFound)
                }
            } else {
                completionHandler?(false, status.toError())
                return
            }
        case .valid(let status):
            if status.isDirectory == false {
                completionHandler?(false, .notDirectory)
                return
            } else if status.isWritable == false {
                completionHandler?(false, .permissionDenied)
                return
            }
        }
        
        unzip()
        
        func unzip() {
            fileGlobalQueue.async {
                do {
                    try UniFileDecompressTool.unzip(at: zipFilePath, to: targetPath)
                    completionHandler?(true, nil)
                } catch let error as UniFileDecompressTool.UniArchiveError {
                    switch error {
                    case .unableToOpenArchive:
                        completionHandler?(false, .unzip_UnableToOpen)
                    case .entryExtractionFailed(_, let error):
                        completionHandler?(false, .unzip_EntryFailed(error))
                    default:
                        completionHandler?(false, .unzip_Failed)
                    }
                } catch {
                    completionHandler?(false, .navtiveError(error))
                }
            }
        }
    }
    
    
    /// 获取该已保存的本地缓存文件列表
    /// - Parameter completionHandler: 完成回调
    public static func getSavedFileList(
        completionHandler: stringArrayCallback? = nil
    ) {
        let storePath = UniResource.CACHE_PATH + "uni-store/"
        let filePath = UTSiOS.convert2AbsFullPath(storePath)
        
        readDirectoryList(filePath) { list, error in
            let dict = list?.map {
                return storePath + $0
            }
            completionHandler?(dict, error)
        }
    }
    
    
    /// 对文件内容进行截断操作
    /// - Parameters:
    ///   - filePath: 要截断的文件路径
    ///   - length: 截断位置，默认0。如果 length 小于文件长度（字节），则只有前面 length 个字节会保留在文件中，其余内容会被删除；如果 length 大于文件长度，不做处理
    ///   - completionHandler: 完成回调
    public static func truncate(
        filePath: String,
        length: NSNumber? = 0,
        completionHandler: boolCallback? = nil
    ) {
        let absolutePath = UTSiOS.convert2AbsFullPath(filePath)
        
        switch validatePath(atPath: absolutePath) {
        case .invalid(let status):
            completionHandler?(false, status.toError())
        case .valid(let status):
            if status.isDirectory {
                completionHandler?(false, .isDirectory)
                return
            } else if status.isWritable == false {
                completionHandler?(false, .permissionDenied)
                return
            } else {
                let length = length ?? 0
                fileGlobalQueue.async {
                    let (success, error) = truncate(path: absolutePath, length: off_t(truncating: length))
                    completionHandler?(success, error)
                }
            }
        }
    }
    
    
    /// 打开文件，返回文件描述符
    /// - Parameters:
    ///   - filePath: 文件路径 (本地路径)
    ///   - flag: 文件系统标志，默认值: 'r'
    ///   - completionHandler: 完成回调
    public static func open(
        filePath: String,
        flag: String,
        completionHandler: intCallback? = nil
    ) {
        if flag != UniFileSystemManagerFlag.a.toString()
            && flag != UniFileSystemManagerFlag.aplus.toString()
            && flag != UniFileSystemManagerFlag.ax.toString()
            && flag != UniFileSystemManagerFlag.r.toString()
            && flag != UniFileSystemManagerFlag.rplus.toString()
            && flag != UniFileSystemManagerFlag.w.toString()
            && flag != UniFileSystemManagerFlag.wx.toString()
            && flag != UniFileSystemManagerFlag.wplus.toString()
            && flag != UniFileSystemManagerFlag.wxplus.toString() {
            
            completionHandler?(nil, .invalidFlag)
        }
        
        let absolutePath = UTSiOS.convert2AbsFullPath(filePath)
        
        switch validatePath(atPath: absolutePath) {
        case .invalid(let status):
            if status.toError() == .fileNotFound {
                fileGlobalQueue.async {
                    let (fd, error) = openFile(path: absolutePath, flag: flag)
                    completionHandler?(fd, error)
                }
            } else {
                completionHandler?(nil, status.toError())
            }
        case .valid(let status):
            if status.isReadable == false || status.isWritable == false {
                completionHandler?(nil, .permissionDenied)
                return
            } else {
                fileGlobalQueue.async {
                    let (fd, error) = openFile(path: absolutePath, flag: flag)
                    completionHandler?(fd, error)
                }
            }
        }
    }
    
    
    /// 关闭文件
    /// - Parameters:
    ///   - fd: 需要被关闭的文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得
    ///   - completionHandler: 完成回调
    public static func close(
        fd: String,
        completionHandler: boolCallback? = nil
    ) {
        fileGlobalQueue.async {
            let (success, error) = close(fileDescriptor: Int32(fd) ?? -1)
            completionHandler?(success, error)
        }
    }
    
    
    /// 获取文件的状态信息
    /// - Parameters:
    ///   - fd: 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得
    ///   - completionHandler: 完成回调
    public static func fstat(
        fd: String,
        completionHandler: ((Stats?, UniFileSystemManagerError?) -> Void)? = nil
    ) {
        fileGlobalQueue.async {
            let (stat, error) = fstat(fileDescriptor: Int32(fd) ?? -1)
            completionHandler?(stat?.toStat(), error)
        }
    }
    
    
    /// 对文件内容进行截断操作
    /// - Parameters:
    ///   - fd: 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得
    ///   - length: 截断位置，默认0。如果 length 小于文件长度（字节），则只有前面 length 个字节会保留在文件中，其余内容会被删除；如果 length 大于文件长度，不做处理
    ///   - completionHandler: 完成回调
    public static func ftruncate(
        fd: String,
        length: NSNumber? = 0,
        completionHandler: boolCallback? = nil
    ) {
        fileGlobalQueue.async {
            let length = length ?? 0
            let (success, error) = ftruncate(fileDescriptor: Int32(fd) ?? -1, length: off_t(truncating: length))
            completionHandler?(success, error)
        }
    }
    
    /// 分片写入文件
    /// - Parameters:
    ///   - encoding: 编码类型
    ///   - path: 文件路径
    ///   - data: 写入数据
    ///   - chunkSize: 分片大小
    ///   - offset: 只在 data 类型是 ArrayBuffer 时有效，决定 ArrayBuffer 中要被写入的部位，即 ArrayBuffer 中的索引，默认0
    ///   - length: 只在 data 类型是 ArrayBuffer 时有效，指定要写入的字节数，默认为 ArrayBuffer 从0开始偏移 offset 个字节后剩余的字节数
    ///   - completionHandler: 完成回调
    public static func write(
        encoding: String? = nil,
        fd: String,
        data: Any!,
        offset: NSNumber?,
        length: NSNumber?,
        position: NSNumber?,
        chunkSize: Int = 1024 * 256, // 默认 256KB 分片大小
        completionHandler: intCallback? = nil
    ) {
        guard let absolutePath = getPath(fileDescriptor: Int32(fd) ?? -1) else {
            completionHandler?(nil, .badFileDescriptor)
            return
        }
        
        if let encoding = encoding {
            if encoding != UniFileEncoding.utf8.rawValue && encoding != UniFileEncoding.ascii.rawValue && encoding != UniFileEncoding.base64.rawValue {
                completionHandler?(nil, .encodingNotSupport)
                return
            }
        }
        
        safeWrite()
        
        func safeWrite() {
            let fileQueue = getFileQueue(for: absolutePath)
            
            fileQueue.async {
                let fileUrl = URL(fileURLWithPath: absolutePath)
                
                guard let fileHandle = try? FileHandle(forWritingTo: fileUrl) else {
                    completionHandler?(nil, .fileNotFound)
                    return
                }
                
                defer {
                    if #available(iOS 13.0, *) {
                        try? fileHandle.close()
                    } else {
                        fileHandle.closeFile()
                    }
                    
                    // 清理文件队列
                    cleanFileQueue(for: absolutePath)
                }
                
                // 分片写入逻辑
                func writeChunks(_ chunkData: Data, isArrayBuffer: Bool? = false) -> UInt64 {
                    let originalSize = fileHandle.seekToEndOfFile()
                    
                    let isArrayBuffer = isArrayBuffer ?? false
                    
                    // offset参数：ArrayBuffer 中的索引，只在 data 类型是 ArrayBuffer 时有效
                    var offsetTemp = 0
                    if let offset = offset, isArrayBuffer {
                        offsetTemp = Int(truncating: offset)
                    }
                    
                    // length参数：写入的字节数，只在 data 类型是 ArrayBuffer 时有效
                    var totalSize = chunkData.count - offsetTemp
                    if let length = length, isArrayBuffer {
                        totalSize = Int(truncating: length + (offset ?? 0))
                        
                        //截取的offset+截取的length > 写入数据arrryBuffer的总长度， 则取当前写入数据总长度，否则会crash
                        if totalSize > chunkData.count {
                            totalSize = chunkData.count
                        }
                    }
                    
                    while offsetTemp < totalSize {
                        let length = min(chunkSize, totalSize - offsetTemp)
                        let chunk = chunkData.subdata(in: offsetTemp..<(offsetTemp + length))
                        fileHandle.write(chunk)
                        offsetTemp += length
                    }
                    
                    let newSize = fileHandle.seekToEndOfFile()
                    
                    return newSize - originalSize
                }
                
                // 处理不同数据类型
                if let buffer = data as? ArrayBuffer {
                    let bufferData = buffer.toData()
                    if let position = position {
                        // 获取文件当前末尾的位置
                        let currentFileSize = fileHandle.seekToEndOfFile()
                        
                        // 如果目标位置大于文件当前大小，填充空字节
                        if position > currentFileSize {
                            let emptyBytes = Int(truncating: position - currentFileSize)
                            
                            // 在当前位置之前填充空字节（例如填充零字节）
                            let emptyData = Data(repeating: 0, count: emptyBytes)
                            fileHandle.write(emptyData)
                        }
                        
                        // 将文件指针设置到目标位置
                        fileHandle.seek(toFileOffset: position.toUInt64())
                    }
                    let bytesWritten = writeChunks(bufferData, isArrayBuffer: true)
                    completionHandler?(Int32(bytesWritten), nil)
                } else if let string = data as? String {
                    guard let encodedData = encodeData(string, encoding: encoding) else {
                        completionHandler?(nil, .encodingFailed)
                        return
                    }
                    if let position = position {
                        fileHandle.seek(toFileOffset: position.toUInt64())
                    }
                    let bytesWritten = writeChunks(encodedData)
                    completionHandler?(Int32(bytesWritten), nil)
                } else {
                    completionHandler?(nil, .fileNotFound)
                }
            }
        }
    }
    
    /// 分片读取文件
    /// - Parameters:
    ///   - encoding: 编码类型
    ///   - path: 文件路径
    ///   - chunkSize: 分片大小（单次加载大小）
    ///   - completionHandler: 完成回调
    public static func read(
        arrayBuffer: ArrayBuffer,
        fd: String,
        offset: NSNumber?,
        length: NSNumber?,
        position: NSNumber?,
        chunkSize: Int = 1024 * 256,
        completionHandler: intCallback? = nil
    ) {
        guard let absolutePath = getPath(fileDescriptor: Int32(fd) ?? -1) else {
            completionHandler?(nil, .badFileDescriptor)
            return
        }
        
        safeRead()
        
        func safeRead() {
            let fileQueue = getFileQueue(for: absolutePath)
            
            let workItem = DispatchWorkItem {
                
                let fileUrl = URL(fileURLWithPath: absolutePath)
                
                guard let fileHandle = try? FileHandle(forReadingFrom: fileUrl) else {
                    completionHandler?(nil, .badAddress)
                    return
                }
                
                defer {
                    if #available(iOS 13.0, *) {
                        try? fileHandle.close()
                    } else {
                        fileHandle.closeFile()
                    }
                    // 清理文件队列
                    cleanFileQueue(for: absolutePath)
                }
                
                if let position = position {
                    fileHandle.seek(toFileOffset: position.toUInt64())
                }
                
                var aggregatedData = Data()
                while true {
                    let chunkData = fileHandle.readData(ofLength: chunkSize)
                    if chunkData.isEmpty { break }
                    aggregatedData.append(chunkData)
                }
                
                var _length: NSNumber = length ?? 0
                let _offset: NSNumber = offset ?? 0
                
                //需要被写入arrayBuffer的数据指针指向的区域指针
                if let bufferPointer = arrayBuffer.buffer {
                    // 确定要写入的长度
                    let writeLength = min(Int(truncating: _length), aggregatedData.count, Int(truncating: arrayBuffer.byteLength) - Int(truncating: _offset))
                    _length = NSNumber(writeLength)
                    
                    //截取读取文件中需要被写入arrayBuffer的数据
                    let sourceData = aggregatedData.subdata(in: 0..<writeLength)
                    
                    //                    aggregatedData.withUnsafeBytes { buffer in
                    //                        let floatArray = buffer.bindMemory(to: Double.self)
                    //                        for (index, value) in floatArray.enumerated() {
                    //                            print("第 \(index + 1) 个 Float: \(value)")
                    //                        }
                    //                    }
                    //                    let temp = sourceData.withUnsafeBytes { $0.load(fromByteOffset: 0, as: Double.self) }
                    //                    let dataView = DataView(arrayBuffer, _offset, _length)
                    //                    dataView.setFloat64(0, temp)
                    
                    // 将数据写入当前arrayBuffer实例对应的内存地址中
                    sourceData.withUnsafeBytes { (sourceBytes: UnsafeRawBufferPointer) in
                        let  targetPointer = bufferPointer.advanced(by: Int(truncating: _offset))
                        
                        if let sourcePointer = sourceBytes.baseAddress {
                            memcpy(targetPointer, sourcePointer, writeLength)
                        }
                    }
                    
                    completionHandler?(Int32(truncating: _length), nil)
                    
                    print("写入完成，arrayBuffer 内容已更新")
                } else {
                    completionHandler?(nil, .systemError)
                }
            }
            
            fileQueue.async(execute: workItem)
        }
    }
    
    
    /// 读取指定压缩类型的本地文件内容
    /// - Parameters:
    ///   - filePath: 要读取的文件的路径
    ///   - compressionAlgorithm: 文件压缩类型，目前仅支持 'br'
    ///   - completionHandler: 完成回调
    public static func readCompressedFile(
        filePath: String,
        compressionAlgorithm: String,
        completionHandler: stringCallback? = nil
    ) {
        let filePath = UTSiOS.convert2AbsFullPath(filePath)
        
        if compressionAlgorithm.toLowerCase() != "br" {
            completionHandler?(nil, .brotli_failed)
            return
        }
        
        switch validatePath(atPath: filePath) {
        case .invalid(let status):
            completionHandler?(nil, status.toError())
        case .valid(let status):
            if status.isDirectory{
                completionHandler?(nil, .isDirectory)
                return
            } else if status.isReadable == false {
                completionHandler?(nil, .permissionDenied)
                return
            } else {
                brotli()
            }
        }
        
        //brotli
        func brotli() {
            fileGlobalQueue.async {
                do {
                    let data = try UniFileDecompressTool.brotliDecompress(filePath: filePath)
                    completionHandler?(String(data: data, encoding: .utf8), nil)
                }  catch {
                    completionHandler?(nil, .brotli_failed)
                }
            }
        }
    }
    
    
    /// 读取压缩包内的文件
    /// - Parameters:
    ///   - filePath: 要读取的压缩包的路径 (本地路径)
    ///   - encoding: 统一指定读取文件的字符编码，只在 entries 值为"all"时有效, 如果 entries 值为 null 且不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容
    ///   - entries: 要读取的压缩包内的文件列表（当不传入时表示读取压缩包内所有文件
    ///   - completionHandler: 完成回调
    public static func readZipEntry(
        filePath: String,
        encoding: String?,
        entries: [EntryItem]?,
        completionHandler: (([String: ZipFileItem]?, UniFileSystemManagerError?) -> Void)? = nil
    ) {
        let filePath = UTSiOS.convert2AbsFullPath(filePath)
        switch validatePath(atPath: filePath) {
        case .invalid(let status):
            completionHandler?(nil, status.toError())
        case .valid(let status):
            if status.isDirectory {
                completionHandler?(nil, .isDirectory)
                return
            } else if status.isReadable == false {
                completionHandler?(nil, .permissionDenied)
                return
            } else {
                readZip()
            }
        }
        
        func readZip() {
            let base64String = encodeBase64(filePath)
            var targetPath = UniResource.CACHE_PATH + base64String
            targetPath = UTSiOS.convert2AbsFullPath(targetPath)
            
            if isExist(targetPath) {
                removeDirectorySync(targetPath, true)
            } else {
                createDirectorySync(targetPath, true)
            }
            
            
            var dict: [String: ZipFileItem] = [:]
            
            unzip(zipFilePath: filePath, targetPath: targetPath) { success, error in
                if let error = error, !success {
                    completionHandler?(nil, error)
                } else {
                    //entries 不为nil时
                    if let entries = entries {
                        entries.forEach {
                            let path = targetPath + "/" + $0.path
                            if !isExist(path) || isDirectory(path) {
                                let zipFileItem = ZipFileItem()
                                zipFileItem.errMsg = "no such file, or this is dirctory"
                                dict.set($0.path, zipFileItem)
                            } else {
                                let (data, error) = readFileSync(path, encoding)
                                if let data = data {
                                    let zipFileItem = ZipFileItem()
                                    zipFileItem.errMsg = "readZipEntry:ok"
                                    zipFileItem.data = data
                                    dict.set($0.path, zipFileItem)
                                } else {
                                    completionHandler?(nil, error)
                                    return
                                }
                            }
                        }
                    } else { //entries 值为nil时，读取压缩包内所有文件
                        if let enumerator = fileManager.enumerator(atPath: targetPath) {
                            for case let path as String in enumerator {
                                let fullPath = (targetPath as NSString).appendingPathComponent(path)
                                let (data, error) = readFileSync(fullPath, encoding)
                                if let data = data {
                                    let zipFileItem = ZipFileItem()
                                    zipFileItem.errMsg = "readZipEntry:ok"
                                    zipFileItem.data = data
                                    dict.set(path, zipFileItem)
                                } else {
                                    completionHandler?(nil, error)
                                    return
                                }
                            }
                        }
                    }
                    
                    completionHandler?(dict, nil)
                    removeDirectorySync(targetPath, true)
                }
            }
        }
        
        func encodeBase64(_ input: String) -> String {
            let string = UniFileDigest.toDigest(forFileAtPath: filePath, type: .md5) ?? ""
            return string
        }
    }
    
}

extension Darwin.stat {
    func toStat() -> UniFileSystemManagerStats {
        let stat = UniFileSystemManagerStats()
        stat.mode = self.st_mode as NSNumber
        stat.size = self.st_size as NSNumber
        stat.lastAccessedTime = self.st_atimespec.tv_sec as NSNumber
        stat.lastModifiedTime = st_mtimespec.tv_sec as NSNumber
        return stat
    }
}

extension UniFileSystemManager {
    /// 检查路径是否为空
    public static func isEmpty(_ path: String) -> Bool {
        return path.trimmingCharacters(in: .whitespaces).isEmpty
    }
    
    /// 目录或者文件是否存在
    public static func isExist(_ path: String) -> Bool {
        let path = UTSiOS.convert2AbsFullPath(path)
        return fileManager.fileExists(atPath: path)
    }
    
    /// 判断是否为目录
    public static func isDirectory(_ path: String) -> Bool {
        let path = UTSiOS.convert2AbsFullPath(path)
        // 如果路径为空，直接返回 false
        if path.isEmpty {
            return false
        }
        // 先检查路径是否以 "/" 结尾，如果是，认为它是一个目录
        if path.hasSuffix("/") {
            return true
        }
        
        // 使用 FileManager 判断实际存在的文件/目录
        let fileManager = FileManager.default
        var isDirectory: ObjCBool = false
        
        // 如果文件存在，判断是文件还是目录
        if fileManager.fileExists(atPath: path, isDirectory: &isDirectory) {
            return isDirectory.boolValue
        }
        
        return false
    }
    
    /// 是否为沙盒路径
    public static func isSandbox(_ path: String) -> Bool {
        let sandboxPath = NSHomeDirectory()
        let absolutePath = UTSiOS.convert2AbsFullPath(path)
        return absolutePath.starts(with: sandboxPath)
    }
}


extension UniFileSystemManager {
    /// 数据编码工具方法
    private static func encodeData(_ string: String, encoding: String?) -> Data? {
        var encoding = encoding
        if encoding == nil {
            encoding = UniFileEncoding.utf8.rawValue
        }
        if encoding == UniFileEncoding.utf8.rawValue {
            return string.data(using: .utf8)
        } else if encoding == UniFileEncoding.ascii.rawValue {
            // 与微信保持一致，以Unicode码点为ascii
            
            /*
             方式                          Swift代码                                        适用范围
             ASCII asciiValue           char.asciiValue                         仅限 ASCII（0~127），中文返回 nil
             Unicode 码点         char.unicodeScalars.first!.value                   所有字符，适用于非 ASCII
             按 UTF-16 读取         .data(using: .utf16BigEndian)                        适用于按 字节存储
             */
            let charArray = Array(string)
            var byteArray = [UInt8]()
            for char in charArray {
                for scalar in char.unicodeScalars {
                    let byteValue = UInt8(truncatingIfNeeded: scalar.value)
                    byteArray.append(byteValue)
                }
            }
            return Data(byteArray)
        } else if encoding == UniFileEncoding.base64.rawValue {
            return Data(base64Encoded: string)
        } else {
            return nil
        }
    }
    
    private enum UniFilePathValidationResult {
        /// 路径无效(为空、非沙盒、不存在)
        case invalid(_ status: InvalidElement)
        /// 路径有效
        case valid(_ status: ValidElement)
        
        struct InvalidElement {
            var isEmpty: Bool = false
            var isExist: Bool = false
            var isDirectory: Bool = false
            var isSandbox: Bool = false
            
            //about: remove dir
            func toError() -> UniFileSystemManagerError {
                if self.isEmpty {
                    return .argumentInvalid
                } else if self.isSandbox == false {
                    return .permissionDenied
                } else {
                    return .fileNotFound
                }
            }
        }
        
        struct ValidElement {
            var isReadable: Bool = false  //是否可读取
            var isWritable: Bool = false //是否可写入
            var isExecutable: Bool = false //是否可执行
            var isDeletable: Bool = false //是否可删除
            var isDirectory: Bool = false //是否是目录
        }
    }
    
    /// 路径检验
    private static func validatePath(atPath absolutePath: String) -> UniFilePathValidationResult {
        
        let absolutePath = absolutePath.trimmingCharacters(in: .whitespacesAndNewlines)
        
        if absolutePath.isEmpty {
            return .invalid(UniFilePathValidationResult.InvalidElement(isEmpty: true))
        }
        let sandboxPath = NSHomeDirectory()
        var isDirectory: ObjCBool = false
        let isExist = fileManager.fileExists(atPath: absolutePath, isDirectory: &isDirectory)
        let isSandbox = absolutePath.starts(with: sandboxPath) // 检查路径是否在沙盒范围内
        
        var isPackage = false
        if  UniSDKEngine.shared.config.ipaType == .package {
            isPackage = true
        }
        if (!isPackage && !isSandbox) || !isExist {
            return .invalid(UniFilePathValidationResult.InvalidElement(
                isEmpty: false,
                isExist: isExist,
                isDirectory: isDirectory.boolValue,
                isSandbox: isSandbox
            ))
        } else {
            // 检查操作权限
            let isReadable = fileManager.isReadableFile(atPath: absolutePath)
            let isWritable = fileManager.isWritableFile(atPath: absolutePath)
            let isExecutable = fileManager.isExecutableFile(atPath: absolutePath)
            let isDeletable = fileManager.isDeletableFile(atPath: absolutePath)
            
            var status = UniFilePathValidationResult.ValidElement()
            status.isReadable = isReadable
            status.isWritable = isWritable
            status.isExecutable = isExecutable
            status.isDeletable = isDeletable
            status.isDirectory = isDirectory.boolValue
            
            return .valid(status)
        }
    }
}

