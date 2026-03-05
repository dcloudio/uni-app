//
//  chooseFile.swift
//  DCloud
//
//  Created by Fred on 2025/2/27.
//

import Foundation
import MobileCoreServices
import DCloudUniappRuntime
import DCloudUTSFoundation
import Darwin
import UniformTypeIdentifiers

public typealias handlerCallback = (ChooseFileSuccess?, NSNumber?) -> Void

enum UniChooseFileType {
    case image
    case video
    case audio
    case all
    
    var rawValue: String {
        switch self {
        case .image: return String(kUTTypeImage)
        case .video: return String(kUTTypeMovie)
        case .audio: return String(kUTTypeAudio)
        case .all: return String(kUTTypeItem)
        }
    }
    
    static func from(_ type: String?) -> UniChooseFileType {
        let type = type?.toLowerCase() ?? "all"
        if type == "image" {
            return .image
        } else if type == "video" {
            return .video
        } else if type == "audio" {
            return .audio
        } else {
            return .all
        }
    }
}

public class UniChooseFileManager: NSObject, UIDocumentPickerDelegate {
    
    public static let shared = UniChooseFileManager()
    
    private var completionHandler: handlerCallback?
    
    private var documentPicker: UIDocumentPickerViewController?
    
    public func chooseFile(
        count: NSNumber?,
        type: String?,
        `extension`: [String]?,
        sizeType: Any?,
        sourceType: [String]?,
        completionHandler: handlerCallback? = nil
    ) {
        let count = count ?? 100
        self.completionHandler = completionHandler
        /*
         •    kUTTypeItem: 所有类型
         •    kUTTypePDF: PDF 文件类型
         •    kUTTypeImage: 图片文件类型
         •    kUTTypePlainText: 纯文本文件类型
         •    kUTTypeAudio: 音频文件类型
         •    kUTTypeMovie: 视频文件类型
         •    kUTTypeSpreadsheet: 电子表格类型
         •    kUTTypeData: 任意二进制文件
         */
        
        documentPicker = UIDocumentPickerViewController(
            documentTypes: [UniChooseFileType.from(type).rawValue],
            in: .open
        )
        
        if count.intValue > 1 {
            documentPicker?.allowsMultipleSelection = true
        }
        
        documentPicker?.delegate = self
        documentPicker?.modalPresentationStyle = .formSheet
        
        if let documentPicker = documentPicker, let topVC = UIApplication.uni_findCurrentViewController() {
            topVC.present(documentPicker, animated: true, completion: nil)
        }
    }
    
    public func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
        let res = ChooseFileSuccess()
        
        var tempFiles: [ChooseFileTempFile] = []
        var tempFilePaths: [String] = []
        let group = DispatchGroup()
        let fileManager = FileManager.default
        
        DispatchQueue.global(qos: .userInitiated).async { [weak self] in
            guard let self = self else { return }
            
            for value in urls {
                if value.startAccessingSecurityScopedResource() {
                    group.enter()
                    
                    defer {
                        group.leave()
                    }
                    
                    let fileName = value.lastPathComponent
                    let targetURL = URL(fileURLWithPath: UTSiOS.getMediaCacheDir()).appendingPathComponent(fileName)
                    let targetPath = targetURL.path
                    
                    if fileManager.fileExists(atPath: targetPath) {
                        let chooseFileTempFile = ChooseFileTempFile()
                        chooseFileTempFile.name = fileName
                        chooseFileTempFile.path = targetPath
                        chooseFileTempFile.size = NSNumber(value: self.getFileSizeWithStat(fileURL: targetPath) ?? 0)
                        chooseFileTempFile.type = self.getType(targetPath)

                        DispatchQueue.main.async {
                            tempFilePaths.append(targetPath)
                            tempFiles.append(chooseFileTempFile)
                        }
                    } else {
                        do {
                            try fileManager.copyItem(at: value, to: targetURL)
                            if fileManager.fileExists(atPath: targetPath) {
                                let chooseFileTempFile = ChooseFileTempFile()
                                chooseFileTempFile.name = fileName
                                chooseFileTempFile.path = targetPath
                                chooseFileTempFile.size = NSNumber(value: self.getFileSizeWithStat(fileURL: targetPath) ?? 0)
                                chooseFileTempFile.type = self.getType(targetPath)
                                
                                DispatchQueue.main.async {
                                    tempFilePaths.append(targetPath)
                                    tempFiles.append(chooseFileTempFile)
                                }
                            } else {
                                DispatchQueue.main.async {
                                    self.completionHandler?(nil, NSNumber(value: 1101006))
                                    self.cleanup()
                                }
                                return
                            }
                        } catch {
                            DispatchQueue.main.async {
                                self.completionHandler?(nil, NSNumber(value: 1101006))
                                self.cleanup()
                            }
                            return
                        }
                    }
                    
                    value.stopAccessingSecurityScopedResource()
                } else {
                    DispatchQueue.main.async {
                        self.completionHandler?(nil, NSNumber(value: 1101005))
                        self.cleanup()
                    }
                    return
                }
            }
            
            group.notify(queue: DispatchQueue.main) {
                res.tempFiles = tempFiles
                res.tempFilePaths = tempFilePaths
                self.completionHandler?(res, nil)
                self.cleanup()
            }
        }
    }
    
    public func documentPickerWasCancelled(_ controller: UIDocumentPickerViewController) {
        completionHandler?(nil, NSNumber(value: 1101001))
        cleanup()
    }
    
    private func cleanup() {
        documentPicker = nil
        completionHandler = nil
    }
    
    private func getFileSizeWithStat(fileURL: String) -> Int64? {
        var fileStat = stat()
        
        guard stat(fileURL, &fileStat) == 0 else {
//            print("获取文件元信息失败: \(String(cString: strerror(errno)))")
            return nil
        }
        
        return fileStat.st_size
    }
    
    private func getType(_ url: String) -> String {
        let url = URL(fileURLWithPath: url)
        
        var type = "file"
        
        let fileExtension = url.pathExtension.lowercased()
        
        if #available(iOS 14.0, *) {
            if let uti = UTType(filenameExtension: fileExtension) {
                if uti.conforms(to: .image) {
                    type = "image"
                } else if uti.conforms(to: .movie) {
                    type = "video"
                } else if uti.conforms(to: .audio) {
                    type = "audio"
                }
            }
        } else {
            let videoExtensions = ["mp4", "mov", "avi", "mkv", "flv", "webm", "3gp", "3g2", "wmv", "mpg", "mpeg", "m4v", "f4v", "f4p", "f4a", "f4b", "ts", "mts", "m2ts", "vob", "rm", "rmvb", "asf", "swf", "divx", "xvid", "dv", "ogv", "ogm", "mxf", "roq", "nsv"]
            
            let audioExtensions = ["mp3", "aac", "wav", "flac", "alac", "wma", "m4a", "ogg", "opus", "amr", "aiff", "aif", "aifc", "pcm", "au", "ac3", "eac3", "caf", "dts", "mka"]
            
            let imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "tif", "webp", "heic", "heif", "raw", "cr2", "nef", "orf", "sr2", "arw", "dng", "rw2", "pef", "raf", "ico", "svg", "psd", "xcf"]
            
            if videoExtensions.contains(fileExtension) {
                type = "video"
            } else if imageExtensions.contains(fileExtension) {
                type = "image"
            } else if audioExtensions.contains(fileExtension) {
                type = "audio"
            }
        }
        
        return type
    }
}
