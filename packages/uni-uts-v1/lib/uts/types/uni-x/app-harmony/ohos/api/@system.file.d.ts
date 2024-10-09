/*
 * Copyright (c) 2020-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 */
/**
 * @interface FileResponse
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileResponse {
    /**
     * File URI.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    uri: string;
    /**
     * File size, in bytes.
     * If type is dir, the length value is fixed to 0.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    length: number;
    /**
     * Timestamp when the file is stored, which is the number of milliseconds elapsed since 1970/01/01 00:00:00.
     * For lite wearables, the value is fixed to 0, because this parameter is restricted by the underlying file system.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    lastModifiedTime: number;
    /**
     * File type. The values are as follows:
     * dir: directory
     * file: file
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    type: 'dir' | 'file';
    /**
     * File list. When the recursive value is true and the type is dir, the file information under the subdirectory will be returned.
     * Otherwise, no value will be returned.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    subFiles?: Array<FileResponse>;
}
/**
 * @interface FileMoveOption
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileMoveOption {
    /**
     * URI of the file to move.
     * Restricted by the underlying file system of lite wearables, the value must meet the following requirements:
     * 1. The URI cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     * 2. The maximum number of characters allowed is 128.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    srcUri: string;
    /**
     * URI of the file moved to the target location.
     * Restricted by the underlying file system of lite wearables, the value must meet the following requirements:
     * 1. The URI cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     * 2. The maximum number of characters allowed is 128.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    dstUri: string;
    /**
     * Called when the source file is moved to the specified location successfully.
     * This function returns the URI of the file moved to the target location.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    success?: (uri: string) => void;
    /**
     * Called when moving fails.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    complete?: () => void;
}
/**
 * @interface FileListResponse
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileListResponse {
    /**
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    fileList: Array<FileResponse>;
}
/**
 * @interface FileListOption
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileListOption {
    /**
     * URI of the directory.
     * Restricted by the underlying file system of lite wearables, the value must meet the following requirements:
     * 1. The URI cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     * 2. The maximum number of characters allowed is 128.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    uri: string;
    /**
     * Called when the list is obtained successfully.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    success?: (data: FileListResponse) => void;
    /**
     * Called when the list fails to be obtained.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    complete?: () => void;
}
/**
 * @interface FileCopyOption
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileCopyOption {
    /**
     * URI of the file to copy.
     * Restricted by the underlying file system of lite wearables, the value must meet the following requirements:
     * 1. The URI cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     * 2. The maximum number of characters allowed is 128.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    srcUri: string;
    /**
     * URI of the file moved to the target location.
     * Restricted by the underlying file system of lite wearables, the value must meet the following requirements:
     * 1. The URI cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     * 2. The maximum number of characters allowed is 128.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    dstUri: string;
    /**
     * Called when the copy file is saved successful.
     * This function returns the URI of the file saved to the target location.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    success?: (uri: string) => void;
    /**
     * Called when the copy or save operation fails.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    complete?: () => void;
}
/**
 * @interface FileGetOption
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileGetOption {
    /**
     * File URI, which cannot be an application resource path.
     * Restricted by the underlying file system of lite wearables, the value must meet the following requirements:
     * 1. The URI cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     * 2. The maximum number of characters allowed is 128.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    uri: string;
    /**
     * Whether to recursively obtain the file list under a subdirectory.
     * The default value is false.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    recursive?: boolean;
    /**
     * Called when file information is obtained successfully.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    success?: (file: FileResponse) => void;
    /**
     * Called when file information fails to be obtained.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    complete?: () => void;
}
/**
 * @interface FileDeleteOption
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileDeleteOption {
    /**
     * URI of the file to be deleted, which cannot be an application resource path.
     * Restricted by the underlying file system of lite wearables, the value must meet the following requirements:
     * 1. The URI cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     * 2. The maximum number of characters allowed is 128.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    uri: string;
    /**
     * Called when local files are deleted successfully.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    success?: () => void;
    /**
     * Called when the deletion fails.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    complete?: () => void;
}
/**
 * @interface FileWriteTextOption
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileWriteTextOption {
    /**
     * URI of a local file. If it does not exist, a file will be created.
     * Restricted by the underlying file system of lite wearables, the value must meet the following requirements:
     * 1. The URI cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     * 2. The maximum number of characters allowed is 128.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    uri: string;
    /**
     * Character string to write into the local file.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    text: string;
    /**
     * Encoding format. The default format is UTF-8.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    encoding?: string;
    /**
     * Whether to enable the append mode. The default value is false.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    append?: boolean;
    /**
     * Called when texts are written into a file successfully.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    success?: () => void;
    /**
     * Called when texts fail to be written into a file.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    complete?: () => void;
}
/**
 * @interface FileReadTextResponse
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileReadTextResponse {
    /**
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    text: string;
}
/**
 * @interface FileReadTextOption
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileReadTextOption {
    /**
     * URI of a local file.
     * Restricted by the underlying file system of lite wearables, the value must meet the following requirements:
     * 1. The URI cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     * 2. The maximum number of characters allowed is 128.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    uri: string;
    /**
     * Encoding format. The default format is UTF-8.
     * Currently, only UTF-8 is supported.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    encoding?: string;
    /**
     * Position where the reading starts.
     * The default value is the start position of the file.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    position?: number;
    /**
     * Position where the reading starts.
     * The default value is the start position of the file.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    length?: number;
    /**
     * Called when texts are read successfully.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    success?: (data: FileReadTextResponse) => void;
    /**
     * Called when texts fail to be read.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    complete?: () => void;
}
/**
 * @interface FileWriteArrayBufferOption
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileWriteArrayBufferOption {
    /**
     * URI of a local file. If it does not exist, a file will be created.
     * Restricted by the underlying file system of lite wearables, the value must meet the following requirements:
     * 1. The URI cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     * 2. The maximum number of characters allowed is 128.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    uri: string;
    /**
     * Buffer from which the data is derived.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    buffer: Uint8Array;
    /**
     * Offset to the position where the writing starts. The default value is 0.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    position?: number;
    /**
     * Whether to enable the append mode.
     * The default value is false. If the value is true, the position parameter will become invalid.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    append?: boolean;
    /**
     * Called when data from a buffer is written into a file successfully.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    success?: () => void;
    /**
     * Called when data from a buffer fails to be written into a file.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    complete?: () => void;
}
/**
 * @interface FileReadArrayBufferResponse
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileReadArrayBufferResponse {
    /**
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    buffer: Uint8Array;
}
/**
 * @interface FileReadArrayBufferOption
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileReadArrayBufferOption {
    /**
     * URI of a local file.
     * Restricted by the underlying file system of lite wearables, the value must meet the following requirements:
     * 1. The URI cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     * 2. The maximum number of characters allowed is 128.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    uri: string;
    /**
     * Position where the reading starts.
     * The default value is the start position of the file.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    position?: number;
    /**
     * Length of the content to read.
     * If this parameter is not set, all content of the file will be read.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    length?: number;
    /**
     * Called when the buffer data is read successfully.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    success?: (data: FileReadArrayBufferResponse) => void;
    /**
     * Called when the buffer data fails to be read.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    complete?: () => void;
}
/**
 * @interface FileAccessOption
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileAccessOption {
    /**
     * URI of the directory or file.
     * Restricted by the underlying file system of lite wearables, the value must meet the following requirements:
     * 1. The URI cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     * 2. The maximum number of characters allowed is 128.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    uri: string;
    /**
     * Called when the check result is obtained successfully.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    success?: () => void;
    /**
     * Called when the check fails.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    complete?: () => void;
}
/**
 * @interface FileMkdirOption
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileMkdirOption {
    /**
     * URI of the directory.
     * Restricted by the underlying file system of lite wearables, the value must meet the following requirements:
     * 1. The URI cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     * 2. The maximum number of characters allowed is 128.
     * 3. A maximum of five recursions are allowed for creating the directory.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    uri: string;
    /**
     * Whether to create the directory after creating its upper-level directory recursively.
     * The default value is false.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    recursive?: boolean;
    /**
     * Called when the directory is created successfully.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    success?: () => void;
    /**
     * Called when the creation fails.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    complete?: () => void;
}
/**
 * @interface FileRmdirOption
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export interface FileRmdirOption {
    /**
     * URI of the directory.
     * Restricted by the underlying file system of lite wearables, the value must meet the following requirements:
     * 1. The URI cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     * 2. The maximum number of characters allowed is 128.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    uri: string;
    /**
     * Whether to delete files and subdirectories recursively.
     * The default value is false.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    recursive?: boolean;
    /**
     * Called when the directory is deleted successfully.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    success?: () => void;
    /**
     * Called when the deletion fails.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     */
    complete?: () => void;
}
/**
 * @syscap SystemCapability.FileManagement.File.FileIO.Lite
 * @since 3
 * @deprecated since 10
 */
export default class File {
    /**
     * Moves the source file to a specified location.
     *
     * @param { FileMoveOption } options - Options.
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     * @useinstead ohos.file.fs.moveFile
     */
    static move(options: FileMoveOption): void;
    /**
     * Copies a source file and save the copy to a specified location.
     *
     * @param { FileCopyOption } options - Options.
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     * @useinstead ohos.file.fs.copyFile
     */
    static copy(options: FileCopyOption): void;
    /**
     * Obtains the list of files in a specified directory.
     *
     * @param { FileListOption } options - Options.
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     * @useinstead ohos.file.fs.listFile
     */
    static list(options: FileListOption): void;
    /**
     * Obtains information about a local file.
     *
     * @param { FileGetOption } options - Options.
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     * @useinstead ohos.file.fs.stat
     */
    static get(options: FileGetOption): void;
    /**
     * Deletes local files.
     *
     * @param { FileDeleteOption } options - Options.
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     * @useinstead ohos.file.fs.unlink
     */
    static delete(options: FileDeleteOption): void;
    /**
     * Writes texts into a file.
     *
     * @param { FileWriteTextOption } options - Options.
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     * @useinstead ohos.file.fs.write
     */
    static writeText(options: FileWriteTextOption): void;
    /**
     * Reads texts from a file.
     *
     * @param { FileReadTextOption } options - Options.
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     * @useinstead ohos.file.fs.readText
     */
    static readText(options: FileReadTextOption): void;
    /**
     * Writes data from a buffer into a file.
     *
     * @param { FileWriteArrayBufferOption } options - Options.
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     * @useinstead ohos.file.fs.write
     */
    static writeArrayBuffer(options: FileWriteArrayBufferOption): void;
    /**
     * Reads buffer data from a file.
     *
     * @param { FileReadArrayBufferOption } options - Options.
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     * @useinstead ohos.file.fs.read
     */
    static readArrayBuffer(options: FileReadArrayBufferOption): void;
    /**
     * Checks whether a file or directory exists.
     *
     * @param { FileAccessOption } options - Options.
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     * @useinstead ohos.file.fs.access
     */
    static access(options: FileAccessOption): void;
    /**
     * Creates a directory.
     *
     * @param { FileMkdirOption } options - Options.
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     * @useinstead ohos.file.fs.mkdir
     */
    static mkdir(options: FileMkdirOption): void;
    /**
     * Deletes a directory.
     *
     * @param { FileRmdirOption } options - Options.
     * @syscap SystemCapability.FileManagement.File.FileIO.Lite
     * @since 3
     * @deprecated since 10
     * @useinstead ohos.file.fs.rmdir
     */
    static rmdir(options: FileRmdirOption): void;
}
