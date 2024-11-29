/*
 * Copyright (c) 2022-2024 Huawei Device Co., Ltd.
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
 * @kit CoreFileKit
 */
import { AsyncCallback } from './@ohos.base';
import stream from './@ohos.util.stream';
export default fileIo;
/**
 * FileIO
 *
 * @namespace fileIo
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * FileIO
 *
 * @namespace fileIo
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * FileIO
 *
 * @namespace fileIo
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace fileIo {
    export { access };
    export { accessSync };
    export { close };
    export { closeSync };
    export { copy };
    export { copyDir };
    export { copyDirSync };
    export { copyFile };
    export { copyFileSync };
    export { createRandomAccessFile };
    export { createRandomAccessFileSync };
    export { createStream };
    export { createStreamSync };
    export { createReadStream };
    export { createWriteStream };
    export { createWatcher };
    export { dup };
    export { fdatasync };
    export { fdatasyncSync };
    export { fdopenStream };
    export { fdopenStreamSync };
    export { fsync };
    export { fsyncSync };
    export { listFile };
    export { listFileSync };
    export { lseek };
    export { lstat };
    export { lstatSync };
    export { mkdir };
    export { mkdirSync };
    export { mkdtemp };
    export { mkdtempSync };
    export { moveDir };
    export { moveDirSync };
    export { moveFile };
    export { moveFileSync };
    export { open };
    export { openSync };
    export { read };
    export { readSync };
    export { readLines };
    export { readLinesSync };
    export { readText };
    export { readTextSync };
    export { rename };
    export { renameSync };
    export { rmdir };
    export { rmdirSync };
    export { stat };
    export { statSync };
    export { symlink };
    export { symlinkSync };
    export { truncate };
    export { truncateSync };
    export { unlink };
    export { unlinkSync };
    export { utimes };
    export { write };
    export { writeSync };
    export { AccessModeType };
    export { File };
    export { OpenMode };
    export { RandomAccessFile };
    export { ReaderIterator };
    export { Stat };
    export { Stream };
    export { ReadStream };
    export { WriteStream };
    export { Watcher };
    export { WhenceType };
    export { TaskSignal };
    export { connectDfs };
    export { disconnectDfs };
    export type { Progress };
    export type { CopyOptions };
    export type { ProgressListener };
    export type { DfsListeners };
    /**
     * Mode Indicates the open flags.
     *
     * @namespace OpenMode
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Mode Indicates the open flags.
     *
     * @namespace OpenMode
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    /**
    * Mode Indicates the open flags.
    *
    * @namespace OpenMode
    * @syscap SystemCapability.FileManagement.File.FileIO
    * @crossplatform
    * @atomicservice
    * @since 11
    */
    namespace OpenMode {
        /**
         * Read only Permission.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @since 9
         */
        /**
         * Read only Permission.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @since 10
         */
        /**
         * Read only Permission.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        const READ_ONLY = 0o0;
        /**
         * Write only Permission.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @since 9
         */
        /**
         * Write only Permission.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @since 10
         */
        /**
         * Write only Permission.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        const WRITE_ONLY = 0o1;
        /**
         * Write and Read Permission.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @since 9
         */
        /**
         * Write and Read Permission.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @since 10
         */
        /**
         * Write and Read Permission.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        const READ_WRITE = 0o2;
        /**
         * If not exist, create file.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @since 9
         */
        /**
         * If not exist, create file.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @since 10
         */
        /**
         * If not exist, create file.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        const CREATE = 0o100;
        /**
         * File truncate len 0.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @since 9
         */
        /**
         * File truncate len 0.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @since 10
         */
        /**
         * File truncate len 0.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        const TRUNC = 0o1000;
        /**
         * File append write.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @since 9
         */
        /**
         * File append write.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @since 10
         */
        /**
         * File append write.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        const APPEND = 0o2000;
        /**
         * File open in nonblocking mode.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @since 9
         */
        /**
         * File open in nonblocking mode.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @since 10
         */
        const NONBLOCK = 0o4000;
        /**
         * File is Dir.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @since 9
         */
        /**
         * File is Dir.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @since 10
         */
        const DIR = 0o200000;
        /**
         * File is not symbolic link.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @since 9
         */
        /**
         * File is not symbolic link.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @since 10
         */
        const NOFOLLOW = 0o400000;
        /**
         * SYNC IO.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @since 9
         */
        /**
         * SYNC IO.
         *
         * @constant
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @crossplatform
         * @since 10
         */
        const SYNC = 0o4010000;
    }
}
/**
 * Access file.
 *
 * @param { string } path - path.
 * @returns { Promise<boolean> } return Promise
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Access file.
 *
 * @param { string } path - path.
 * @returns { Promise<boolean> } Returns the file is accessible or not in promise mode.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Access file.
 *
 * @param { string } path - path.
 * @returns { Promise<boolean> } Returns the file is accessible or not in promise mode.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
/**
 * Access file.
 *
 * @param { string } path - path.
 * @param { AccessModeType } [mode = fs.AccessModeType.EXIST] - accessibility mode.
 * @returns { Promise<boolean> } Returns the file is accessible or not in promise mode.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare function access(path: string, mode?: AccessModeType): Promise<boolean>;
/**
 * Access file.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<boolean> } callback - The callback is used to return the file is accessible or not.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Access file.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<boolean> } callback - The callback is used to return the file is accessible or not.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Access file.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<boolean> } callback - The callback is used to return the file is accessible or not.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function access(path: string, callback: AsyncCallback<boolean>): void;
/**
 * Access file with sync interface.
 *
 * @param { string } path - path.
 * @returns { boolean } Returns the file is accessible or not.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Access file with sync interface.
 *
 * @param { string } path - path.
 * @returns { boolean } Returns the file is accessible or not.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Access file with sync interface.
 *
 * @param { string } path - path.
 * @returns { boolean } Returns the file is accessible or not.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
/**
 *
 * Access file with sync interface.
 *
 * @param { string } path - path.
 * @param { AccessModeType } [mode = fs.AccessModeType.EXIST] - accessibility mode.
 * @returns { boolean } Returns the file is accessible or not.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare function accessSync(path: string, mode?: AccessModeType): boolean;
/**
 * Close file or fd.
 *
 * @param { number | File } file - file object or fd.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Close file or fd.
 *
 * @param { number | File } file - file object or fd.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Close file or fd.
 *
 * @param { number | File } file - file object or fd.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function close(file: number | File): Promise<void>;
/**
 * Close file or fd.
 *
 * @param { number | File } file - file object or fd.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Close file or fd.
 *
 * @param { number | File } file - file object or fd.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Close file or fd.
 *
 * @param { number | File } file - file object or fd.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function close(file: number | File, callback: AsyncCallback<void>): void;
/**
 * Close file or fd with sync interface.
 *
 * @param { number | File } file - file object or fd.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Close file or fd with sync interface.
 *
 * @param { number | File } file - file object or fd.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Close file or fd with sync interface.
 *
 * @param { number | File } file - file object or fd.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function closeSync(file: number | File): void;
/**
 * Copy file or directory.
 *
 * @param { string } srcUri - src uri.
 * @param { string } destUri - dest uri.
 * @param { CopyOptions } [options] - options.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
 * <br>2.Incorrect parameter types.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied by the file system
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900021 - File table overflow
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
declare function copy(srcUri: string, destUri: string, options?: CopyOptions): Promise<void>;
/**
 * Copy file or directory.
 *
 * @param { string } srcUri - src uri.
 * @param { string } destUri - dest uri.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
 * <br>2.Incorrect parameter types.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied by the file system
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900021 - File table overflow
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
declare function copy(srcUri: string, destUri: string, callback: AsyncCallback<void>): void;
/**
 * Copy file or directory.
 *
 * @param { string } srcUri - src uri.
 * @param { string } destUri - dest uri.
 * @param { CopyOptions } options - options.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
 * <br>2.Incorrect parameter types.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied by the file system
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900021 - File table overflow
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
declare function copy(srcUri: string, destUri: string, options: CopyOptions, callback: AsyncCallback<void>): void;
/**
 * Copy directory.
 *
 * @param { string } src - source path.
 * @param { string } dest - destination path.
 * @param { number } [mode = 0] - mode.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function copyDir(src: string, dest: string, mode?: number): Promise<void>;
/**
 * Copy directory.
 *
 * @param { string } src - source path.
 * @param { string } dest - destination path.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function copyDir(src: string, dest: string, callback: AsyncCallback<void>): void;
/**
 * Copy directory.
 *
 * @param { string } src - source path.
 * @param { string } dest - destination path.
 * @param { AsyncCallback<void, Array<ConflictFiles>> } callback - Return the callback function.
 * @throws { BusinessError } 13900015 - File exists
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function copyDir(src: string, dest: string, callback: AsyncCallback<void, Array<ConflictFiles>>): void;
/**
 * Copy directory.
 *
 * @param { string } src - source path.
 * @param { string } dest - destination path.
 * @param { number } mode - mode.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function copyDir(src: string, dest: string, mode: number, callback: AsyncCallback<void>): void;
/**
 * Copy directory.
 *
 * @param { string } src - source path.
 * @param { string } dest - destination path.
 * @param { number } mode - mode.
 * @param { AsyncCallback<void, Array<ConflictFiles>> } callback - Return the callback function.
 * @throws { BusinessError } 13900015 - File exists
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function copyDir(src: string, dest: string, mode: number, callback: AsyncCallback<void, Array<ConflictFiles>>): void;
/**
 * Copy directory with sync interface.
 *
 * @param { string } src - source path.
 * @param { string } dest - destination path.
 * @param { number } [mode = 0] - mode.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function copyDirSync(src: string, dest: string, mode?: number): void;
/**
 * Copy file.
 *
 * @param { string | number } src - src.
 * @param { string | number } dest - dest.
 * @param { number } [mode = 0] - mode.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Copy file.
 *
 * @param { string | number } src - src.
 * @param { string | number } dest - dest.
 * @param { number } [mode = 0] - mode.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Copy file.
 *
 * @param { string | number } src - src.
 * @param { string | number } dest - dest.
 * @param { number } [mode = 0] - mode.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function copyFile(src: string | number, dest: string | number, mode?: number): Promise<void>;
/**
 * Copy file.
 *
 * @param { string | number } src - src.
 * @param { string | number } dest - dest.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Copy file.
 *
 * @param { string | number } src - src.
 * @param { string | number } dest - dest.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Copy file.
 *
 * @param { string | number } src - src.
 * @param { string | number } dest - dest.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function copyFile(src: string | number, dest: string | number, callback: AsyncCallback<void>): void;
/**
 * Copy file.
 *
 * @param { string | number } src - src.
 * @param { string | number } dest - dest.
 * @param { number } [mode = 0] - mode.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Copy file.
 *
 * @param { string | number } src - src.
 * @param { string | number } dest - dest.
 * @param { number } [mode = 0] - mode.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Copy file.
 *
 * @param { string | number } src - src.
 * @param { string | number } dest - dest.
 * @param { number } [mode = 0] - mode.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function copyFile(src: string | number, dest: string | number, mode: number, callback: AsyncCallback<void>): void;
/**
 * Copy file with sync interface.
 *
 * @param { string | number } src - src.
 * @param { string | number } dest - dest.
 * @param { number } [mode = 0] - mode.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Copy file with sync interface.
 *
 * @param { string | number } src - src.
 * @param { string | number } dest - dest.
 * @param { number } [mode = 0] - mode.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Copy file with sync interface.
 *
 * @param { string | number } src - src.
 * @param { string | number } dest - dest.
 * @param { number } [mode = 0] - mode.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function copyFileSync(src: string | number, dest: string | number, mode?: number): void;
/**
 * Create class Stream.
 *
 * @param { string } path - path.
 * @param { string } mode - mode.
 * @returns { Promise<Stream> } return Promise
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare function createStream(path: string, mode: string): Promise<Stream>;
/**
 * Create class Stream.
 *
 * @param { string } path - path.
 * @param { string } mode - mode.
 * @param { AsyncCallback<Stream> } callback - callback.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare function createStream(path: string, mode: string, callback: AsyncCallback<Stream>): void;
/**
 * Create class Stream with sync interface.
 *
 * @param { string } path - path.
 * @param { string } mode - mode.
 * @returns { Stream } createStream
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare function createStreamSync(path: string, mode: string): Stream;
/**
 * Create class RandomAccessFile.
 *
 * @param { string | File } file - file path, object.
 * @param { number } [mode = OpenMode.READ_ONLY] - mode.
 * @returns { Promise<RandomAccessFile> } Returns the RandomAccessFile object which has been created in promise mode.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
/**
 * Create class RandomAccessFile.
 *
 * @param { string | File } file - file path, object.
 * @param { number } [mode = OpenMode.READ_ONLY] - mode.
 * @param { RandomAccessFileOptions } [options] - RandomAccessFile options
 * @returns { Promise<RandomAccessFile> } Returns the RandomAccessFile object which has been created in promise mode.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 12
 */
declare function createRandomAccessFile(file: string | File, mode?: number, options?: RandomAccessFileOptions): Promise<RandomAccessFile>;
/**
 * Create class RandomAccessFile.
 *
 * @param { string | File } file - file path, object.
 * @param { AsyncCallback<RandomAccessFile> } callback - The callback is used to return the RandomAccessFile object which has been created.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function createRandomAccessFile(file: string | File, callback: AsyncCallback<RandomAccessFile>): void;
/**
 * Create class RandomAccessFile.
 *
 * @param { string | File } file - file path, object.
 * @param { number } [mode = OpenMode.READ_ONLY] - mode.
 * @param { AsyncCallback<RandomAccessFile> } callback - The callback is used to return the RandomAccessFile object which has been created.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function createRandomAccessFile(file: string | File, mode: number, callback: AsyncCallback<RandomAccessFile>): void;
/**
 * Create class RandomAccessFile with sync interface.
 *
 * @param { string | File } file - file path, object.
 * @param { number } [mode = OpenMode.READ_ONLY] - mode.
 * @returns { RandomAccessFile } Returns the RandomAccessFile object which has been created.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
/**
 * Create class RandomAccessFile with sync interface.
 *
 * @param { string | File } file - file path, object.
 * @param { number } [mode = OpenMode.READ_ONLY] - mode.
 * @param { RandomAccessFileOptions } [options] - RandomAccessFile options
 * @returns { RandomAccessFile } Returns the RandomAccessFile object which has been created.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 12
 */
declare function createRandomAccessFileSync(file: string | File, mode?: number, options?: RandomAccessFileOptions): RandomAccessFile;
/**
 * Create file read stream.
 *
 * @param { string } path - file path.
 * @param { ReadStreamOptions } [options] - Optional parameters for ReadStream.
 * @returns { ReadStream } Returns the ReadStream object which has been created.
 * @throws { BusinessError } 401 - Parameter error
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 12
 */
declare function createReadStream(path: string, options?: ReadStreamOptions): ReadStream;
/**
 * Create file write stream.
 *
 * @param { string } path - file path.
 * @param { WriteStreamOptions } [options] - Optional parameters for ReadStream.
 * @returns { WriteStream } Returns the WriteStream object which has been created.
 * @throws { BusinessError } 401 - Parameter error
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 12
 */
declare function createWriteStream(path: string, options?: WriteStreamOptions): WriteStream;
/**
 * Create watcher to listen for file changes.
 *
 * @param { string } path - path.
 * @param { number } events - listened events.
 * @param { WatchEventListener } listener - Callback to invoke when an event of the specified type occurs.
 * @returns { Watcher } Returns the Watcher object which has been created.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900021 - File table overflow
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function createWatcher(path: string, events: number, listener: WatchEventListener): Watcher;
/**
 * Duplicate fd to File Object.
 *
 * @param { number } fd - fd.
 * @returns { File } return File
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function dup(fd: number): File;
/**
 * Synchronize file metadata.
 *
 * @param { number } fd - fd.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Synchronize file metadata.
 *
 * @param { number } fd - fd.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
declare function fdatasync(fd: number): Promise<void>;
/**
 * Synchronize file metadata.
 *
 * @param { number } fd - fd.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Synchronize file metadata.
 *
 * @param { number } fd - fd.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
declare function fdatasync(fd: number, callback: AsyncCallback<void>): void;
/**
 * Synchronize file metadata with sync interface.
 *
 * @param { number } fd - fd.
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Synchronize file metadata with sync interface.
 *
 * @param { number } fd - fd.
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
declare function fdatasyncSync(fd: number): void;
/**
 * Create class Stream by using fd.
 *
 * @param { number } fd - fd.
 * @param { string } mode - mode.
 * @returns { Promise<Stream> } Returns the Stream object in promise mode.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare function fdopenStream(fd: number, mode: string): Promise<Stream>;
/**
 * Create class Stream by using fd.
 *
 * @param { number } fd - fd.
 * @param { string } mode - mode.
 * @param { AsyncCallback<Stream> } callback - The callback is used to return the Stream object.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare function fdopenStream(fd: number, mode: string, callback: AsyncCallback<Stream>): void;
/**
 * Create class Stream by using fd with sync interface.
 *
 * @param { number } fd - fd.
 * @param { string } mode - mode.
 * @returns { Stream } Returns the Stream object.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare function fdopenStreamSync(fd: number, mode: string): Stream;
/**
 * Synchronize file.
 *
 * @param { number } fd - fd.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Synchronize file.
 *
 * @param { number } fd - fd.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
declare function fsync(fd: number): Promise<void>;
/**
 * Synchronize file.
 *
 * @param { number } fd - fd.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Synchronize file.
 *
 * @param { number } fd - fd.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
declare function fsync(fd: number, callback: AsyncCallback<void>): void;
/**
 * Synchronize file with sync interface.
 *
 * @param { number } fd - fd.
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Synchronize file with sync interface.
 *
 * @param { number } fd - fd.
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
declare function fsyncSync(fd: number): void;
/**
 * List file.
 *
 * @param { string } path - path.
 * @param { object } [options] - options.
 * @returns { Promise<string[]> } Returns an Array containing the name of files or directories that meet the filter criteria in promise mode.
 *      If present, Include the subdirectory structure.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * List file.
 *
 * @param { string } path - path.
 * @param { object } [options] - options.
 * @returns { Promise<string[]> } Returns an Array containing the name of files or directories that meet the filter criteria.
 *      If present, Include the subdirectory structure.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * List file.
 *
 * @param { string } path - path.
 * @param { ListFileOptions } [options] - options.
 * @returns { Promise<string[]> } Returns an Array containing the name of files or directories that meet the filter criteria.
 *      If present, Include the subdirectory structure.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function listFile(path: string, options?: ListFileOptions): Promise<string[]>;
/**
 * List file.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<string[]> } callback - The callback is used to return an Array containing the name of files or directories
 *      that meet the filter criteria in promise mode. If present, Include the subdirectory structure.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * List file.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<string[]> } callback - The callback is used to return an Array containing the name of files or directories
 *      that meet the filter criteria in promise mode. If present, Include the subdirectory structure.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * List file.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<string[]> } callback - The callback is used to return an Array containing the name of files or directories
 *      that meet the filter criteria in promise mode. If present, Include the subdirectory structure.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function listFile(path: string, callback: AsyncCallback<string[]>): void;
/**
 * List file.
 *
 * @param { string } path - path.
 * @param { object } [options] - options.
 * @param { AsyncCallback<string[]> } callback - The callback is used to return an Array containing the name of files or directories
 *      that meet the filter criteria in promise mode. If present, Include the subdirectory structure.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * List file.
 *
 * @param { string } path - path.
 * @param { object } [options] - options.
 * @param { AsyncCallback<string[]> } callback - The callback is used to return an Array containing the name of files or directories
 *      that meet the filter criteria in promise mode. If present, Include the subdirectory structure.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * List file.
 *
 * @param { string } path - path.
 * @param { ListFileOptions } [options] - options.
 * @param { AsyncCallback<string[]> } callback - The callback is used to return an Array containing the name of files or directories
 *      that meet the filter criteria in promise mode. If present, Include the subdirectory structure.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function listFile(path: string, options: ListFileOptions, callback: AsyncCallback<string[]>): void;
/**
 * List file with sync interface.
 *
 * @param { string } path - path.
 * @param { object } [options] - options.
 * @returns { string[] } Returns an Array containing the name of files or directories that meet the filter criteria.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * List file with sync interface.
 *
 * @param { string } path - path.
 * @param { object } [options] - options.
 * @returns { string[] } Returns an Array containing the name of files or directories that meet the filter criteria.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * List file with sync interface.
 *
 * @param { string } path - path.
 * @param { ListFileOptions } [options] - options.
 * @returns { string[] } Returns an Array containing the name of files or directories that meet the filter criteria.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function listFileSync(path: string, options?: ListFileOptions): string[];
/**
 *  Reposition file offset.
 *
 * @param { number } fd - file descriptor.
 * @param { number } offset - file offset.
 * @param { WhenceType } [whence = WhenceType.SEEK_SET] - directive whence.
 * @returns { number } Returns the file offset relative to starting position of file.
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900026 - Illegal seek
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
/**
 *  Reposition file offset.
 *
 * @param { number } fd - file descriptor.
 * @param { number } offset - file offset.
 * @param { WhenceType } [whence = WhenceType.SEEK_SET] - directive whence.
 * @returns { number } Returns the file offset relative to starting position of file.
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900026 - Illegal seek
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 12
 */
declare function lseek(fd: number, offset: number, whence?: WhenceType): number;
/**
 * Stat link file.
 *
 * @param { string } path - path.
 * @returns { Promise<Stat> } Returns the Stat object in promise mode.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare function lstat(path: string): Promise<Stat>;
/**
 * Stat link file.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<Stat> } callback - The callback is used to return the Stat object.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare function lstat(path: string, callback: AsyncCallback<Stat>): void;
/**
 * Stat link file with sync interface.
 *
 * @param { string } path - path.
 * @returns { Stat } Returns the Stat object.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare function lstatSync(path: string): Stat;
/**
 * Make dir.
 *
 * @param { string } path - path.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Make dir.
 *
 * @param { string } path - path.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Make dir.
 *
 * @param { string } path - path.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function mkdir(path: string): Promise<void>;
/**
 * Make dir.
 *
 * @param { string } path - path.
 * @param { boolean } recursion - whether to recursively make directory.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @atomicservice
 * @since 11
 */
declare function mkdir(path: string, recursion: boolean): Promise<void>;
/**
 * Make dir.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Make dir.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Make dir.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function mkdir(path: string, callback: AsyncCallback<void>): void;
/**
 * Make dir.
 *
 * @param { string } path - path.
 * @param { boolean } recursion - whether to recursively make directory.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @atomicservice
 * @since 11
 */
declare function mkdir(path: string, recursion: boolean, callback: AsyncCallback<void>): void;
/**
 * Make dir with sync interface.
 *
 * @param { string } path - path.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Make dir with sync interface.
 *
 * @param { string } path - path.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Make dir with sync interface.
 *
 * @param { string } path - path.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function mkdirSync(path: string): void;
/**
 * Make dir with sync interface.
 *
 * @param { string } path - path.
 * @param { boolean } recursion - whether to recursively make directory.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @atomicservice
 * @since 11
 */
declare function mkdirSync(path: string, recursion: boolean): void;
/**
 * Make temp dir.
 *
 * @param { string } prefix - dir prefix.
 * @returns { Promise<string> } Returns the path to the new directory in promise mode.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Make temp dir.
 *
 * @param { string } prefix - dir prefix.
 * @returns { Promise<string> } Returns the path to the new directory in promise mode.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
declare function mkdtemp(prefix: string): Promise<string>;
/**
 * Make temp dir.
 *
 * @param { string } prefix - dir prefix.
 * @param { AsyncCallback<string> } callback - The callback is used to return the path to the new directory.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Make temp dir.
 *
 * @param { string } prefix - dir prefix.
 * @param { AsyncCallback<string> } callback - The callback is used to return the path to the new directory.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
declare function mkdtemp(prefix: string, callback: AsyncCallback<string>): void;
/**
 * Make temp dir with sync interface.
 *
 * @param { string } prefix - dir prefix.
 * @returns { string } Returns the path to the new directory.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Make temp dir with sync interface.
 *
 * @param { string } prefix - dir prefix.
 * @returns { string } Returns the path to the new directory.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
declare function mkdtempSync(prefix: string): string;
/**
 * Move directory.
 *
 * @param { string } src - source file path.
 * @param { string } dest - destination file path.
 * @param { number } [mode = 0] - move mode when duplicate file name exists.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function moveDir(src: string, dest: string, mode?: number): Promise<void>;
/**
 * Move directory.
 *
 * @param { string } src - source file path.
 * @param { string } dest - destination file path.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function moveDir(src: string, dest: string, callback: AsyncCallback<void>): void;
/**
 * Move directory.
 *
 * @param { string } src - source file path.
 * @param { string } dest - destination file path.
 * @param { AsyncCallback<void, Array<ConflictFiles>> } callback - Return the callback function.
 * @throws { BusinessError } 13900015 - File exists
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function moveDir(src: string, dest: string, callback: AsyncCallback<void, Array<ConflictFiles>>): void;
/**
 * Move directory.
 *
 * @param { string } src - source file path.
 * @param { string } dest - destination file path.
 * @param { number } mode - move mode when duplicate file name exists.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function moveDir(src: string, dest: string, mode: number, callback: AsyncCallback<void>): void;
/**
 * Move directory.
 *
 * @param { string } src - source file path.
 * @param { string } dest - destination file path.
 * @param { number } mode - move mode when duplicate file name exists.
 * @param { AsyncCallback<void, Array<ConflictFiles>> } callback - Return the callback function.
 * @throws { BusinessError } 13900015 - File exists
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function moveDir(src: string, dest: string, mode: number, callback: AsyncCallback<void, Array<ConflictFiles>>): void;
/**
 * Move directory with sync interface.
 *
 * @param { string } src - source file path.
 * @param { string } dest - destination file path.
 * @param { number } [mode = 0] - move mode when duplicate file name exists.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare function moveDirSync(src: string, dest: string, mode?: number): void;
/**
 * Move file.
 *
 * @param { string } src - source file path.
 * @param { string } dest - destination file path.
 * @param { number } [mode = 0] - move mode when duplicate file name exists.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Move file.
 *
 * @param { string } src - source file path.
 * @param { string } dest - destination file path.
 * @param { number } [mode = 0] - move mode when duplicate file name exists.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
declare function moveFile(src: string, dest: string, mode?: number): Promise<void>;
/**
 * Move file.
 *
 * @param { string } src - source file path.
 * @param { string } dest - destination file path.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Move file.
 *
 * @param { string } src - source file path.
 * @param { string } dest - destination file path.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
declare function moveFile(src: string, dest: string, callback: AsyncCallback<void>): void;
/**
 * Move file.
 *
 * @param { string } src - source file path.
 * @param { string } dest - destination file path.
 * @param { number } [mode = 0] - move mode when duplicate file name exists.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Move file.
 *
 * @param { string } src - source file path.
 * @param { string } dest - destination file path.
 * @param { number } [mode = 0] - move mode when duplicate file name exists.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
declare function moveFile(src: string, dest: string, mode: number, callback: AsyncCallback<void>): void;
/**
 * Move file with sync interface.
 *
 * @param { string } src - source file path.
 * @param { string } dest - destination file path.
 * @param { number } [mode = 0] - move mode when duplicate file name exists.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Move file with sync interface.
 *
 * @param { string } src - source file path.
 * @param { string } dest - destination file path.
 * @param { number } [mode = 0] - move mode when duplicate file name exists.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
declare function moveFileSync(src: string, dest: string, mode?: number): void;
/**
 * Open file.
 *
 * @param { string } path - path.
 * @param { number } [mode = OpenMode.READ_ONLY] - mode.
 * @returns { Promise<File> } Returns the File object in Promise mode to record the file descriptor.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Open file.
 *
 * @param { string } path - path.
 * @param { number } [mode = OpenMode.READ_ONLY] - mode.
 * @returns { Promise<File> } Returns the File object in Promise mode to record the file descriptor.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Open file.
 *
 * @param { string } path - path.
 * @param { number } [mode = OpenMode.READ_ONLY] - mode.
 * @returns { Promise<File> } Returns the File object in Promise mode to record the file descriptor.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function open(path: string, mode?: number): Promise<File>;
/**
 * Open file.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<File> } callback - The callback is used to return the File object to record the file descriptor.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Open file.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<File> } callback - The callback is used to return the File object to record the file descriptor.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Open file.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<File> } callback - The callback is used to return the File object to record the file descriptor.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function open(path: string, callback: AsyncCallback<File>): void;
/**
 * Open file.
 *
 * @param { string } path - path.
 * @param { number } [mode = OpenMode.READ_ONLY] - mode.
 * @param { AsyncCallback<File> } callback - The callback is used to return the File object to record the file descriptor.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Open file.
 *
 * @param { string } path - path.
 * @param { number } [mode = OpenMode.READ_ONLY] - mode.
 * @param { AsyncCallback<File> } callback - The callback is used to return the File object to record the file descriptor.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Open file.
 *
 * @param { string } path - path.
 * @param { number } [mode = OpenMode.READ_ONLY] - mode.
 * @param { AsyncCallback<File> } callback - The callback is used to return the File object to record the file descriptor.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function open(path: string, mode: number, callback: AsyncCallback<File>): void;
/**
 * Open file with sync interface.
 *
 * @param { string } path - path.
 * @param { number } [mode = OpenMode.READ_ONLY] - mode.
 * @returns { File } Returns the File object to record the file descriptor.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Open file with sync interface.
 *
 * @param { string } path - path.
 * @param { number } [mode = OpenMode.READ_ONLY] - mode.
 * @returns { File } Returns the File object to record the file descriptor.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Open file with sync interface.
 *
 * @param { string } path - path.
 * @param { number } [mode = OpenMode.READ_ONLY] - mode.
 * @returns { File } Returns the File object to record the file descriptor.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900006 - No such device or address
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900017 - No such device
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900029 - Resource deadlock would occur
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function openSync(path: string, mode?: number): File;
/**
 * Read file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer } buffer - buffer.
 * @param { object } [options] - options.
 * @returns { Promise<number> } Returns the number of file bytes read to buffer in promise mode.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Read file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer } buffer - buffer.
 * @param { object } [options] - options.
 * @returns { Promise<number> } Returns the number of file bytes read to buffer in promise mode.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Read file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer } buffer - buffer.
 * @param { ReadOptions } [options] - options.
 * @returns { Promise<number> } Returns the number of file bytes read to buffer in promise mode.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function read(fd: number, buffer: ArrayBuffer, options?: ReadOptions): Promise<number>;
/**
 * Read file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer } buffer - buffer.
 * @param { AsyncCallback<number> } callback - The callback is used to return the number of file bytes read to buffer.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Read file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer } buffer - buffer.
 * @param { AsyncCallback<number> } callback - The callback is used to return the number of file bytes read to buffer.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Read file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer } buffer - buffer.
 * @param { AsyncCallback<number> } callback - The callback is used to return the number of file bytes read to buffer.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function read(fd: number, buffer: ArrayBuffer, callback: AsyncCallback<number>): void;
/**
 * Read file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer } buffer - buffer.
 * @param { object } [options] - options.
 * @param { AsyncCallback<number> } callback - The callback is used to return the number of file bytes read to buffer.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Read file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer } buffer - buffer.
 * @param { object } [options] - options.
 * @param { AsyncCallback<number> } callback - The callback is used to return the number of file bytes read to buffer.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Read file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer } buffer - buffer.
 * @param { ReadOptions } [options] - options.
 * @param { AsyncCallback<number> } callback - The callback is used to return the number of file bytes read to buffer.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function read(fd: number, buffer: ArrayBuffer, options: ReadOptions, callback: AsyncCallback<number>): void;
/**
 * Read file with sync interface.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer } buffer - buffer.
 * @param { object } [options] - options.
 * @returns { number } Returns the number of file bytes read to buffer.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Read file with sync interface.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer } buffer - buffer.
 * @param { object } [options] - options.
 * @returns { number } Returns the number of file bytes read to buffer.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Read file with sync interface.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer } buffer - buffer.
 * @param { ReadOptions } [options] - options.
 * @returns { number } Returns the number of file bytes read to buffer.
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function readSync(fd: number, buffer: ArrayBuffer, options?: ReadOptions): number;
/**
 * Read content line by line.
 *
 * @param { string } filePath - file path.
 * @param { Options } [options] - optional parameters
 * @returns { Promise<ReaderIterator> } Returns the iterator object in promise mode.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
declare function readLines(filePath: string, options?: Options): Promise<ReaderIterator>;
/**
 * Read content line by line.
 *
 * @param { string } filePath - file path.
 * @param { AsyncCallback<ReaderIterator> } callback - The callback is used to return the iterator object.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
declare function readLines(filePath: string, callback: AsyncCallback<ReaderIterator>): void;
/**
 * Read content line by line.
 *
 * @param { string } filePath - file path.
 * @param { Options } options - optional parameters
 * @param { AsyncCallback<ReaderIterator> } callback - The callback is used to return the iterator object.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
declare function readLines(filePath: string, options: Options, callback: AsyncCallback<ReaderIterator>): void;
/**
 * Read content line by line with sync interface.
 *
 * @param { string } filePath - file path.
 * @param { Options } [options] - optional parameters
 * @returns { ReaderIterator } Returns the iterator object.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900022 - Too many open files
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
declare function readLinesSync(filePath: string, options?: Options): ReaderIterator;
/**
 * Read text.
 *
 * @param { string } filePath - file path.
 * @param { object } [options] - options.
 * @returns { Promise<string> } Returns the contents of the read file in promise mode.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Read text.
 *
 * @param { string } filePath - file path.
 * @param { object } [options] - options.
 * @returns { Promise<string> } Returns the contents of the read file in promise mode.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Read text.
 *
 * @param { string } filePath - file path.
 * @param { ReadTextOptions } [options] - options.
 * @returns { Promise<string> } Returns the contents of the read file in promise mode.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function readText(filePath: string, options?: ReadTextOptions): Promise<string>;
/**
 * Read text.
 *
 * @param { string } filePath - file path.
 * @param { AsyncCallback<string> } callback - The callback is used to return the contents of the read file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Read text.
 *
 * @param { string } filePath - file path.
 * @param { AsyncCallback<string> } callback - The callback is used to return the contents of the read file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Read text.
 *
 * @param { string } filePath - file path.
 * @param { AsyncCallback<string> } callback - The callback is used to return the contents of the read file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function readText(filePath: string, callback: AsyncCallback<string>): void;
/**
 * Read text.
 *
 * @param { string } filePath - file path.
 * @param { object } [options] - options.
 * @param { AsyncCallback<string> } callback - The callback is used to return the contents of the read file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Read text.
 *
 * @param { string } filePath - file path.
 * @param { object } [options] - options.
 * @param { AsyncCallback<string> } callback - The callback is used to return the contents of the read file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Read text.
 *
 * @param { string } filePath - file path.
 * @param { ReadTextOptions } [options] - options.
 * @param { AsyncCallback<string> } callback - The callback is used to return the contents of the read file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function readText(filePath: string, options: ReadTextOptions, callback: AsyncCallback<string>): void;
/**
 * Read text with sync interface.
 *
 * @param { string } filePath - file path.
 * @param { object } [options] - options.
 * @returns { string } Returns the contents of the read file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Read text with sync interface.
 *
 * @param { string } filePath - file path.
 * @param { object } [options] - options.
 * @returns { string } Returns the contents of the read file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Read text with sync interface.
 *
 * @param { string } filePath - file path.
 * @param { ReadTextOptions } [options] - options.
 * @returns { string } Returns the contents of the read file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function readTextSync(filePath: string, options?: ReadTextOptions): string;
/**
 * Rename file.
 *
 * @param { string } oldPath - oldPath.
 * @param { string } newPath - newPath.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Rename file.
 *
 * @param { string } oldPath - oldPath.
 * @param { string } newPath - newPath.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Rename file.
 *
 * @param { string } oldPath - oldPath.
 * @param { string } newPath - newPath.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function rename(oldPath: string, newPath: string): Promise<void>;
/**
 * Rename file.
 *
 * @param { string } oldPath - oldPath.
 * @param { string } newPath - newPath.
 * @param { AsyncCallback<void> } callback - Returns the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Rename file.
 *
 * @param { string } oldPath - oldPath.
 * @param { string } newPath - newPath.
 * @param { AsyncCallback<void> } callback - Returns the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Rename file.
 *
 * @param { string } oldPath - oldPath.
 * @param { string } newPath - newPath.
 * @param { AsyncCallback<void> } callback - Returns the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function rename(oldPath: string, newPath: string, callback: AsyncCallback<void>): void;
/**
 * Rename file with sync interface.
 *
 * @param { string } oldPath - oldPath.
 * @param { string } newPath - newPath.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Rename file with sync interface.
 *
 * @param { string } oldPath - oldPath.
 * @param { string } newPath - newPath.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Rename file with sync interface.
 *
 * @param { string } oldPath - oldPath.
 * @param { string } newPath - newPath.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900016 - Cross-device link
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900028 - Too many links
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function renameSync(oldPath: string, newPath: string): void;
/**
 * Delete dir.
 *
 * @param { string } path - path.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system1
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Delete dir.
 *
 * @param { string } path - path.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system1
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Delete dir.
 *
 * @param { string } path - path.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system1
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function rmdir(path: string): Promise<void>;
/**
 * Delete dir.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system1
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Delete dir.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system1
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Delete dir.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system1
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function rmdir(path: string, callback: AsyncCallback<void>): void;
/**
 * Delete dir with sync interface.
 *
 * @param { string } path - path.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system1
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Delete dir with sync interface.
 *
 * @param { string } path - path.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system1
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Delete dir with sync interface.
 *
 * @param { string } path - path.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system1
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900032 - Directory not empty
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function rmdirSync(path: string): void;
/**
 * Get file information.
 *
 * @param { string | number } file - path or file descriptor.
 * @returns { Promise<Stat> } Returns the Stat object in promise mode.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Get file information.
 *
 * @param { string | number } file - path or file descriptor.
 * @returns { Promise<Stat> } Returns the Stat object in promise mode.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Get file information.
 *
 * @param { string | number } file - path or file descriptor.
 * @returns { Promise<Stat> } Returns the Stat object in promise mode.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function stat(file: string | number): Promise<Stat>;
/**
 * Get file information.
 *
 * @param { string | number } file - path or file descriptor.
 * @param { AsyncCallback<Stat> } callback - The callback is used to return the Stat object.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Get file information.
 *
 * @param { string | number } file - path or file descriptor.
 * @param { AsyncCallback<Stat> } callback - The callback is used to return the Stat object.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Get file information.
 *
 * @param { string | number } file - path or file descriptor.
 * @param { AsyncCallback<Stat> } callback - The callback is used to return the Stat object.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function stat(file: string | number, callback: AsyncCallback<Stat>): void;
/**
 * Get file information with sync interface.
 *
 * @param { string | number } file - path or file descriptor.
 * @returns { Stat } Returns the Stat object.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Get file information with sync interface.
 *
 * @param { string | number } file - path or file descriptor.
 * @returns { Stat } Returns the Stat object.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Get file information with sync interface.
 *
 * @param { string | number } file - path or file descriptor.
 * @returns { Stat } Returns the Stat object.
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900031 - Function not implemented
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900038 - Value too large for defined data type
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function statSync(file: string | number): Stat;
/**
 * Link file.
 *
 * @param { string } target - target.
 * @param { string } srcPath - srcPath.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare function symlink(target: string, srcPath: string): Promise<void>;
/**
 * Link file.
 *
 * @param { string } target - target.
 * @param { string } srcPath - srcPath.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare function symlink(target: string, srcPath: string, callback: AsyncCallback<void>): void;
/**
 * Link file with sync interface.
 *
 * @param { string } target - target.
 * @param { string } srcPath - srcPath.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900015 - File exists
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare function symlinkSync(target: string, srcPath: string): void;
/**
 * Truncate file.
 *
 * @param { string | number } file - path or file descriptor.
 * @param { number } [len = 0] - len.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Truncate file.
 *
 * @param { string | number } file - path or file descriptor.
 * @param { number } [len = 0] - len.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Truncate file.
 *
 * @param { string | number } file - path or file descriptor.
 * @param { number } [len = 0] - len.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function truncate(file: string | number, len?: number): Promise<void>;
/**
 * Truncate file.
 *
 * @param { string | number } file - path or file descriptor.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Truncate file.
 *
 * @param { string | number } file - path or file descriptor.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Truncate file.
 *
 * @param { string | number } file - path or file descriptor.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function truncate(file: string | number, callback: AsyncCallback<void>): void;
/**
 * Truncate file.
 *
 * @param { string | number } file - path or file descriptor.
 * @param { number } [len = 0] - len.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Truncate file.
 *
 * @param { string | number } file - path or file descriptor.
 * @param { number } [len = 0] - len.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Truncate file.
 *
 * @param { string | number } file - path or file descriptor.
 * @param { number } [len = 0] - len.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function truncate(file: string | number, len: number, callback: AsyncCallback<void>): void;
/**
 * Truncate file with sync interface.
 *
 * @param { string | number } file - path or file descriptor.
 * @param { number } [len = 0] - len.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Truncate file with sync interface.
 *
 * @param { string | number } file - path or file descriptor.
 * @param { number } [len = 0] - len.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Truncate file with sync interface.
 *
 * @param { string | number } file - path or file descriptor.
 * @param { number } [len = 0] - len.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900023 - Text file busy
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function truncateSync(file: string | number, len?: number): void;
/**
 * Delete file.
 *
 * @param { string } path - path.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Delete file.
 *
 * @param { string } path - path.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Delete file.
 *
 * @param { string } path - path.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function unlink(path: string): Promise<void>;
/**
 * Delete file.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Delete file.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Delete file.
 *
 * @param { string } path - path.
 * @param { AsyncCallback<void> } callback - Return the callback function.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function unlink(path: string, callback: AsyncCallback<void>): void;
/**
 * Delete file with sync interface.
 *
 * @param { string } path - path.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Delete file with sync interface.
 *
 * @param { string } path - path.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Delete file with sync interface.
 *
 * @param { string } path - path.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900011 - Out of memory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900014 - Device or resource busy
 * @throws { BusinessError } 13900018 - Not a directory
 * @throws { BusinessError } 13900019 - Is a directory
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900030 - File name too long
 * @throws { BusinessError } 13900033 - Too many symbolic links encountered
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function unlinkSync(path: string): void;
/**
 * Change file mtime.
 *
 * @param { string } path - path.
 * @param { number } mtime - last modification time
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
/**
 * Change file mtime.
 *
 * @param { string } path - path.
 * @param { number } mtime - last modification time
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900002 - No such file or directory
 * @throws { BusinessError } 13900012 - Permission denied
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900027 - Read-only file system
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 12
 */
declare function utimes(path: string, mtime: number): void;
/**
 * Write file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer | string } buffer - buffer.
 * @param { object } [options] - options.
 * @returns { Promise<number> } Returns the number of bytes written to the file in promise mode.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Write file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer | string } buffer - buffer.
 * @param { object } [options] - options.
 * @returns { Promise<number> } Returns the number of bytes written to the file in promise mode.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Write file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer | string } buffer - buffer.
 * @param { WriteOptions } [options] - options.
 * @returns { Promise<number> } Returns the number of bytes written to the file in promise mode.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function write(fd: number, buffer: ArrayBuffer | string, options?: WriteOptions): Promise<number>;
/**
 * Write file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer | string } buffer - buffer.
 * @param { AsyncCallback<number> } callback - The callback is used to return the number of bytes written to the file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Write file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer | string } buffer - buffer.
 * @param { AsyncCallback<number> } callback - The callback is used to return the number of bytes written to the file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Write file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer | string } buffer - buffer.
 * @param { AsyncCallback<number> } callback - The callback is used to return the number of bytes written to the file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function write(fd: number, buffer: ArrayBuffer | string, callback: AsyncCallback<number>): void;
/**
 * Write file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer | string } buffer - buffer.
 * @param { object } [options] - options.
 * @param { AsyncCallback<number> } callback - The callback is used to return the number of bytes written to the file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Write file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer | string } buffer - buffer.
 * @param { object } [options] - options.
 * @param { AsyncCallback<number> } callback - The callback is used to return the number of bytes written to the file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Write file.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer | string } buffer - buffer.
 * @param { WriteOptions } [options] - options.
 * @param { AsyncCallback<number> } callback - The callback is used to return the number of bytes written to the file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function write(fd: number, buffer: ArrayBuffer | string, options: WriteOptions, callback: AsyncCallback<number>): void;
/**
 * Write file with sync interface.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer | string } buffer - buffer.
 * @param { object } [options] - options.
 * @returns { number } Returns the number of bytes written to the file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Write file with sync interface.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer | string } buffer - buffer.
 * @param { object } [options] - options.
 * @returns { number } Returns the number of bytes written to the file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Write file with sync interface.
 *
 * @param { number } fd - file descriptor.
 * @param { ArrayBuffer | string } buffer - buffer.
 * @param { WriteOptions } [options] - options.
 * @returns { number } Returns the number of bytes written to the file.
 * @throws { BusinessError } 13900001 - Operation not permitted
 * @throws { BusinessError } 13900004 - Interrupted system call
 * @throws { BusinessError } 13900005 - I/O error
 * @throws { BusinessError } 13900008 - Bad file descriptor
 * @throws { BusinessError } 13900010 - Try again
 * @throws { BusinessError } 13900013 - Bad address
 * @throws { BusinessError } 13900020 - Invalid argument
 * @throws { BusinessError } 13900024 - File too large
 * @throws { BusinessError } 13900025 - No space left on device
 * @throws { BusinessError } 13900034 - Operation would block
 * @throws { BusinessError } 13900041 - Quota exceeded
 * @throws { BusinessError } 13900042 - Unknown error
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare function writeSync(fd: number, buffer: ArrayBuffer | string, options?: WriteOptions): number;
/**
 * Connect Distributed File System.
 *
 * @permission ohos.permission.DISTRIBUTED_DATASYNC
 * @param { string } networkId - The networkId of device.
 * @param { DfsListeners } listeners - The listeners of Distributed File System.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 201 - Permission denied.
 * @throws { BusinessError } 401 - The parameter check failed.Possible causes:1.Mandatory
parameters are left unspecified;
 * <br>2.Incorrect parameter types.
 * @throws { BusinessError } 13900045 - Connection failed.
 * @throws { BusinessError } 13900046 - Software caused connection abort.
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 12
 */
declare function connectDfs(networkId: string, listeners: DfsListeners): Promise<void>;
/**
 * Disconnect Distributed File System.
 *
 * @permission ohos.permission.DISTRIBUTED_DATASYNC
 * @param { string } networkId - The networkId of device.
 * @returns { Promise<void> } The promise returned by the function.
 * @throws { BusinessError } 201 - Permission denied.
 * @throws { BusinessError } 401 - The parameter check failed.Possible causes:1.Mandatory
parameters are left unspecified;
 * <br>2.Incorrect parameter types.
 * @throws { BusinessError } 13600004 - Failed to unmount.
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 12
 */
declare function disconnectDfs(networkId: string): Promise<void>;
/**
 * Progress data of copyFile
 *
 * @typedef Progress
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
interface Progress {
    /**
     * @type { number }
     * @readonly
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    readonly processedSize: number;
    /**
     * @type { number }
     * @readonly
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    readonly totalSize: number;
}
/**
 * Task signal.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 12
 */
export class TaskSignal {
    /**
     * Cancel the copy task in progress.
     *
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900012 - Permission denied by the file system
     * @throws { BusinessError } 13900043 - No task can be canceled.
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    cancel(): void;
    /**
     * Subscribe the cancel event of current task.
     *
     * @returns { Promise<string> } Return the result of the cancel event.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    onCancel(): Promise<string>;
}
/**
 * Get options of copy
 *
 * @typedef CopyOptions
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
interface CopyOptions {
    /**
     * Listener of copy progress
     *
     * @type { ?ProgressListener }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    progressListener?: ProgressListener;
    /**
     * Cancel signal of copy.
     *
     * @type { ?TaskSignal }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    copySignal?: TaskSignal;
}
/**
 * Listener of copy progress.
 *
 * @typedef { function } ProgressListener
 * @param { Progress } progress - indicates the progress data of copyFile
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
type ProgressListener = (progress: Progress) => void;
/**
 * File object.
 *
 * @interface File
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * File object.
 *
 * @interface File
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * File object.
 *
 * @interface File
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface File {
    /**
     * @type { number }
     * @readonly
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * @type { number }
     * @readonly
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    /**
     * @type { number }
     * @readonly
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly fd: number;
    /**
     * File path
     *
     * @type { string }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @throws { BusinessError } 14300002 - Invalid uri
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    readonly path: string;
    /**
     * File name
     *
     * @type { string }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    readonly name: string;
    /**
     * Get parent path of file.
     *
     * @returns { string } Return the parent path of file.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @throws { BusinessError } 14300002 - Invalid uri
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    getParent(): string;
    /**
     * Lock file with blocking method.
     *
     * @param { boolean } exclusive - whether lock is exclusive.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @throws { BusinessError } 13900043 - No record locks available
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    lock(exclusive?: boolean): Promise<void>;
    /**
     * Lock file with blocking method.
     *
     * @param { AsyncCallback<void> } callback - Return the callback function.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @throws { BusinessError } 13900043 - No record locks available
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    lock(callback: AsyncCallback<void>): void;
    /**
     * Lock file with blocking method.
     *
     * @param { boolean } exclusive - whether lock is exclusive.
     * @param { AsyncCallback<void> } callback - Return the callback function.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @throws { BusinessError } 13900043 - No record locks available
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    lock(exclusive: boolean, callback: AsyncCallback<void>): void;
    /**
     * Try to lock file with returning results immediately.
     *
     * @param { boolean } exclusive - whether lock is exclusive.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @throws { BusinessError } 13900043 - No record locks available
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    tryLock(exclusive?: boolean): void;
    /**
     * Unlock file.
     *
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @throws { BusinessError } 13900043 - No record locks available
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    unlock(): void;
}
/**
 * RandomAccessFile object.
 *
 * @interface RandomAccessFile
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
declare interface RandomAccessFile {
    /**
     * File descriptor
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    readonly fd: number;
    /**
     * File pointer
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    readonly filePointer: number;
    /**
     * Set file pointer.
     *
     * @param { number } filePointer - filePointer.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    setFilePointer(filePointer: number): void;
    /**
     * Close randomAccessFile with sync interface.
     *
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    close(): void;
    /**
     * Write randomAccessFile.
     *
     * @param { ArrayBuffer | string } buffer - buffer.
     * @param { object } [options] - options.
     * @returns { Promise<number> } Returns the number of bytes written to the file in promise mode.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    /**
     * Write randomAccessFile.
     *
     * @param { ArrayBuffer | string } buffer - buffer.
     * @param { WriteOptions } [options] - options.
     * @returns { Promise<number> } Returns the number of bytes written to the file in promise mode.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    write(buffer: ArrayBuffer | string, options?: WriteOptions): Promise<number>;
    /**
     * Write randomAccessFile.
     *
     * @param { ArrayBuffer | string } buffer - buffer.
     * @param { AsyncCallback<number> } callback - The callback is used to return the number of bytes written to the file.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    write(buffer: ArrayBuffer | string, callback: AsyncCallback<number>): void;
    /**
     * Write randomAccessFile.
     *
     * @param { ArrayBuffer | string } buffer - buffer.
     * @param { object } [options] - options.
     * @param { AsyncCallback<number> } callback - The callback is used to return the number of bytes written to the file.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    /**
     * Write randomAccessFile.
     *
     * @param { ArrayBuffer | string } buffer - buffer.
     * @param { WriteOptions } [options] - options.
     * @param { AsyncCallback<number> } callback - The callback is used to return the number of bytes written to the file.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    write(buffer: ArrayBuffer | string, options: WriteOptions, callback: AsyncCallback<number>): void;
    /**
     * Write randomAccessFile with sync interface.
     *
     * @param { ArrayBuffer | string } buffer - buffer.
     * @param { object } [options] - options.
     * @returns { number } Returns the number of bytes written to the file.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    /**
     * Write randomAccessFile with sync interface.
     *
     * @param { ArrayBuffer | string } buffer - buffer.
     * @param { WriteOptions } [options] - options.
     * @returns { number } Returns the number of bytes written to the file.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    writeSync(buffer: ArrayBuffer | string, options?: WriteOptions): number;
    /**
     * Read randomAccessFile.
     *
     * @param { ArrayBuffer } buffer - buffer.
     * @param { object } [options] - options.
     * @returns { Promise<number> } Returns the number of file bytes read to buffer in promise mode.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900019 - Is a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    /**
     * Read randomAccessFile.
     *
     * @param { ArrayBuffer } buffer - buffer.
     * @param { ReadOptions } [options] - options.
     * @returns { Promise<number> } Returns the number of file bytes read to buffer in promise mode.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900019 - Is a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    read(buffer: ArrayBuffer, options?: ReadOptions): Promise<number>;
    /**
     * Read randomAccessFile.
     *
     * @param { ArrayBuffer } buffer - buffer.
     * @param { AsyncCallback<number> } callback - The callback is used to return the number of file bytes read to buffer.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900019 - Is a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    read(buffer: ArrayBuffer, callback: AsyncCallback<number>): void;
    /**
     * Read randomAccessFile.
     *
     * @param { ArrayBuffer } buffer - buffer.
     * @param { object } [options] - options.
     * @param { AsyncCallback<number> } callback - The callback is used to return the number of file bytes read to buffer.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900019 - Is a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    /**
    * Read randomAccessFile.
    *
    * @param { ArrayBuffer } buffer - buffer.
    * @param { ReadOptions } [options] - options.
    * @param { AsyncCallback<number> } callback - The callback is used to return the number of file bytes read to buffer.
    * @throws { BusinessError } 13900004 - Interrupted system call
    * @throws { BusinessError } 13900005 - I/O error
    * @throws { BusinessError } 13900008 - Bad file descriptor
    * @throws { BusinessError } 13900010 - Try again
    * @throws { BusinessError } 13900013 - Bad address
    * @throws { BusinessError } 13900019 - Is a directory
    * @throws { BusinessError } 13900020 - Invalid argument
    * @throws { BusinessError } 13900034 - Operation would block
    * @throws { BusinessError } 13900042 - Unknown error
    * @syscap SystemCapability.FileManagement.File.FileIO
    * @since 11
    */
    read(buffer: ArrayBuffer, options: ReadOptions, callback: AsyncCallback<number>): void;
    /**
     * Read randomAccessFile with sync interface.
     *
     * @param { ArrayBuffer } buffer - buffer.
     * @param { object } [options] - options.
     * @returns { number } Returns the number of file bytes read to buffer.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900019 - Is a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    /**
     * Read randomAccessFile with sync interface.
     *
     * @param { ArrayBuffer } buffer - buffer.
     * @param { ReadOptions } [options] - options.
     * @returns { number } Returns the number of file bytes read to buffer.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900019 - Is a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    readSync(buffer: ArrayBuffer, options?: ReadOptions): number;
    /**
     * Generate read stream from RandomAccessFile object.
     *
     * @returns { ReadStream } Return ReadStream object.
     * @throws { BusinessError } 401 - Parameter error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900011 - Out of memory
     * @throws { BusinessError } 13900012 - Permission denied
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    getReadStream(): ReadStream;
    /**
     * Generate write stream from RandomAccessFile object.
     *
     * @returns { WriteStream } Return WriteStream object.
     * @throws { BusinessError } 401 - Parameter error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900011 - Out of memory
     * @throws { BusinessError } 13900012 - Permission denied
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    getWriteStream(): WriteStream;
}
/**
 * File Read Stream.
 *
 * @extends stream.Readable
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 12
 */
declare class ReadStream extends stream.Readable {
    /**
      * The ReadStream constructor.
      *
      * @syscap SystemCapability.FileManagement.File.FileIO
      * @since 12
      */
    constructor();
    /**
     * The Number of bytes read in the stream.
     *
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    readonly bytesRead: number;
    /**
     * The path of the file being read.
     *
     * @type { string }
     * @readonly
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    readonly path: string;
    /**
     * Set the file position indicator for the read stream.
     *
     * @param { number } offset - file offset.
     * @param { WhenceType } [whence = WhenceType.SEEK_SET] - directive whence.
     * @returns { number } Returns the offset relative to starting position of stream.
     * @throws { BusinessError } 401 - Parameter error
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900026 - Illegal seek
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    seek(offset: number, whence?: WhenceType): number;
    /**
     * Close ReadStream with sync interface.
     *
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    close(): void;
}
/**
 * File Write Stream.
 *
 * @extends stream.Writable
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 12
 */
declare class WriteStream extends stream.Writable {
    /**
      * The WriteStream constructor.
      *
      * @syscap SystemCapability.FileManagement.File.FileIO
      * @since 12
      */
    constructor();
    /**
     * The Number of bytes written in the stream.
     *
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    readonly bytesWritten: number;
    /**
     * The path of the file being written.
     *
     * @type { string }
     * @readonly
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    readonly path: string;
    /**
     * Set the file position indicator for the write stream.
     *
     * @param { number } offset - file offset.
     * @param { WhenceType } [whence = WhenceType.SEEK_SET] - directive whence.
     * @returns { number } Returns the offset relative to starting position of stream.
     * @throws { BusinessError } 401 - Parameter error
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900026 - Illegal seek
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    seek(offset: number, whence?: WhenceType): number;
    /**
     * Close WriteStream with sync interface.
     *
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    close(): void;
}
/**
 * Stat object.
 *
 * @interface Stat
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Stat object.
 *
 * @interface Stat
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * Stat object.
 *
 * @interface Stat
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface Stat {
    /**
     * @type { bigint }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * @type { bigint }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    readonly ino: bigint;
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly mode: number;
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    readonly uid: number;
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    readonly gid: number;
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly size: number;
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly atime: number;
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly mtime: number;
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * @type { number }
     * @readonly
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    readonly ctime: number;
    /**
     *
     * @type { LocationType }
     * @readonly
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    readonly location: LocationType;
    /**
     * Whether path/fd is block device.
     *
     * @returns { boolean } Returns whether the path/fd point to a block device or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Whether path/fd is block device.
     *
     * @returns { boolean } Returns whether the path/fd point to a block device or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    isBlockDevice(): boolean;
    /**
     * Whether path/fd is character device.
     *
     * @returns { boolean } Returns whether the path/fd point to a character device or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Whether path/fd is character device.
     *
     * @returns { boolean } Returns whether the path/fd point to a character device or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    isCharacterDevice(): boolean;
    /**
     * Whether path/fd is directory.
     *
     * @returns { boolean } Returns whether the path/fd point to a directory or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Whether path/fd is directory.
     *
     * @returns { boolean } Returns whether the path/fd point to a directory or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    /**
     * Whether path/fd is directory.
     *
     * @returns { boolean } Returns whether the path/fd point to a directory or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    isDirectory(): boolean;
    /**
     * Whether path/fd is fifo.
     *
     * @returns { boolean } Returns whether the path/fd point to a fifo file or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Whether path/fd is fifo.
     *
     * @returns { boolean } Returns whether the path/fd point to a fifo file or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    isFIFO(): boolean;
    /**
     * Whether path/fd is file.
     *
     * @returns { boolean } Returns whether the path/fd point to a normal file or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Whether path/fd is file.
     *
     * @returns { boolean } Returns whether the path/fd point to a normal file or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    /**
     * Whether path/fd is file.
     *
     * @returns { boolean } Returns whether the path/fd point to a normal file or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    isFile(): boolean;
    /**
     * Whether path/fd is socket.
     *
     * @returns { boolean } Returns whether the path/fd point to a socket file or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Whether path/fd is socket.
     *
     * @returns { boolean } Returns whether the path/fd point to a socket file or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    isSocket(): boolean;
    /**
     * Whether path/fd is symbolic link.
     *
     * @returns { boolean } Returns whether the path/fd point to a symbolic link or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Whether path/fd is symbolic link.
     *
     * @returns { boolean } Returns whether the path/fd point to a symbolic link or not.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @since 10
     */
    isSymbolicLink(): boolean;
}
/**
 * Stream object
 *
 * @interface Stream
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare interface Stream {
    /**
     * Close stream.
     *
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    close(): Promise<void>;
    /**
     * Close stream.
     *
     * @param { AsyncCallback<void> } callback - Return the callback function.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    close(callback: AsyncCallback<void>): void;
    /**
     * Close stream with sync interface.
     *
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    closeSync(): void;
    /**
     * Flush stream.
     *
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    flush(): Promise<void>;
    /**
     * Flush stream.
     *
     * @param { AsyncCallback<void> } callback - Return the callback function.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    flush(callback: AsyncCallback<void>): void;
    /**
     * Flush stream with sync interface.
     *
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    flushSync(): void;
    /**
     * Write stream.
     *
     * @param { ArrayBuffer | string } buffer - buffer.
     * @param { object } [options] - options.
     * @returns { Promise<number> } Returns the number of file bytes written to file in promise mode.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Write stream.
     *
     * @param { ArrayBuffer | string } buffer - buffer.
     * @param { WriteOptions } [options] - options.
     * @returns { Promise<number> } Returns the number of file bytes written to file in promise mode.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    write(buffer: ArrayBuffer | string, options?: WriteOptions): Promise<number>;
    /**
     * Write stream.
     *
     * @param { ArrayBuffer | string } buffer - buffer.
     * @param { AsyncCallback<number> } callback - The callback is used to return the number of file bytes written to file.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    write(buffer: ArrayBuffer | string, callback: AsyncCallback<number>): void;
    /**
     * Write stream.
     *
     * @param { ArrayBuffer | string } buffer - buffer.
     * @param { object } [options] - options.
     * @param { AsyncCallback<number> } callback - The callback is used to return the number of file bytes written to file.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Write stream.
     *
     * @param { ArrayBuffer | string } buffer - buffer.
     * @param { WriteOptions } [options] - options.
     * @param { AsyncCallback<number> } callback - The callback is used to return the number of file bytes written to file.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    write(buffer: ArrayBuffer | string, options: WriteOptions, callback: AsyncCallback<number>): void;
    /**
     * Write stream with sync interface.
     *
     * @param { ArrayBuffer | string } buffer - buffer.
     * @param { object } [options] - options.
     * @returns { number } Returns the number of file bytes written to file.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Write stream with sync interface.
     *
     * @param { ArrayBuffer | string } buffer - buffer.
     * @param { WriteOptions } [options] - options.
     * @returns { number } Returns the number of file bytes written to file.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    writeSync(buffer: ArrayBuffer | string, options?: WriteOptions): number;
    /**
     * Read stream.
     *
     * @param { ArrayBuffer } buffer - buffer.
     * @param { object } [options] - options.
     * @returns { Promise<number> } Returns the number of file bytes read to buffer in promise mode.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900019 - Is a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Read stream.
     *
     * @param { ArrayBuffer } buffer - buffer.
     * @param { ReadOptions } [options] - options.
     * @returns { Promise<number> } Returns the number of file bytes read to buffer in promise mode.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900019 - Is a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    read(buffer: ArrayBuffer, options?: ReadOptions): Promise<number>;
    /**
     * Read stream.
     *
     * @param { ArrayBuffer } buffer - buffer.
     * @param { AsyncCallback<number> } callback - The callback is used to return the number of file bytes read to buffer.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900019 - Is a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    read(buffer: ArrayBuffer, callback: AsyncCallback<number>): void;
    /**
     * Read stream.
     *
     * @param { ArrayBuffer } buffer - buffer.
     * @param { object } [options] - options.
     * @param { AsyncCallback<number> } callback - The callback is used to return the number of file bytes read to buffer.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900019 - Is a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Read stream.
     *
     * @param { ArrayBuffer } buffer - buffer.
     * @param { ReadOptions } [options] - options.
     * @param { AsyncCallback<number> } callback - The callback is used to return the number of file bytes read to buffer.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900019 - Is a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    read(buffer: ArrayBuffer, options: ReadOptions, callback: AsyncCallback<number>): void;
    /**
     * Read stream with sync interface.
     *
     * @param { ArrayBuffer } buffer - buffer.
     * @param { object } [options] - options.
     * @returns { number } Returns the number of file bytes read to file.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900019 - Is a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Read stream with sync interface.
     *
     * @param { ArrayBuffer } buffer - buffer.
     * @param { ReadOptions } [options] - options.
     * @returns { number } Returns the number of file bytes read to file.
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900010 - Try again
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900019 - Is a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    readSync(buffer: ArrayBuffer, options?: ReadOptions): number;
}
/**
 * Implements watcher event listening.
 *
 * @interface WatchEventListener
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
export interface WatchEventListener {
    /**
     * Specifies the callback function to be invoked.
     *
     * @param { WatchEvent } event - Event type for the callback to invoke.
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    (event: WatchEvent): void;
}
/**
 * Event Listening.
 *
 * @interface WatchEvent
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
export interface WatchEvent {
    /**
     * File name.
     *
     * @type { string }
     * @readonly
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    readonly fileName: string;
    /**
     * Event happened.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    readonly event: number;
    /**
     * Associated rename event.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    readonly cookie: number;
}
/**
 * Watcher object
 *
 * @interface Watcher
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
export interface Watcher {
    /**
     * Start watcher.
     *
     * @throws { BusinessError } 13900002 - No such file or directory
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900011 - Out of memory
     * @throws { BusinessError } 13900012 - Permission denied
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900015 - File exists
     * @throws { BusinessError } 13900018 - Not a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900021 - File table overflow
     * @throws { BusinessError } 13900022 - Too many open files
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900030 - File name too long
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    start(): void;
    /**
     * Stop watcher.
     *
     * @throws { BusinessError } 13900002 - No such file or directory
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900011 - Out of memory
     * @throws { BusinessError } 13900012 - Permission denied
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900015 - File exists
     * @throws { BusinessError } 13900018 - Not a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900021 - File table overflow
     * @throws { BusinessError } 13900022 - Too many open files
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900030 - File name too long
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    stop(): void;
}
/**
 * Reader Iterator Result
 *
 * @interface ReaderIteratorResult
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
export interface ReaderIteratorResult {
    /**
     * Whether reader iterator completes the traversal.
     *
     * @type { boolean }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    done: boolean;
    /**
     * The value of reader iterator.
     *
     * @type { string }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    value: string;
}
/**
 * ReaderIterator object
 *
 * @interface ReaderIterator
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
declare interface ReaderIterator {
    /**
     * Get next result from the iterator.
     *
     * @returns { ReaderIteratorResult } Returns the result of reader iterator.
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900037 - No data available
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    next(): ReaderIteratorResult;
}
/**
 * File filter type
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @since 10
 */
/**
 * File filter type
 *
 * @interface Filter
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export interface Filter {
    /**
     * The suffix of the file.
     *
     * @type { ?Array<string> }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    /**
     * The suffix of the file.
     *
     * @type { ?Array<string> }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    suffix?: Array<string>;
    /**
     * The display name of the file.
     *
     * @type { ?Array<string> }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    /**
     * The display name of the file.
     *
     * @type { ?Array<string> }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    displayName?: Array<string>;
    /**
     * The mimetype of the file.
     *
     * @type { ?Array<string> }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    /**
     * The mimetype of the file.
     *
     * @type { ?Array<string> }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    mimeType?: Array<string>;
    /**
     * The exceeding size of the file.
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    /**
     * The exceeding size of the file.
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fileSizeOver?: number;
    /**
     * The last modification time of the file.
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    /**
     * The last modification time of the file.
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    lastModifiedAfter?: number;
    /**
     * Whether to exclude media files.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    /**
     * Whether to exclude media files.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    excludeMedia?: boolean;
}
/**
 * Conflict Files type
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 10
 */
/**
 * Conflict Files type
 *
 * @interface ConflictFiles
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
export interface ConflictFiles {
    /**
     * The path of the source file.
     *
     * @type { string }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    /**
     * The path of the source file.
     *
     * @type { string }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    srcFile: string;
    /**
     * The path of the source file.
     *
     * @type { string }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    /**
     * The path of the destination file.
     *
     * @type { string }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    destFile: string;
}
/**
 * Options type
 *
 * @interface Options
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
export interface Options {
    /**
     * The encoding style.
     *
     * @type { ?string }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    encoding?: string;
}
/**
 * ReadOptions type
 *
 * @interface ReadOptions
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @atomicservice
 * @since 11
 */
export interface ReadOptions {
    /**
     * The offset when reading the file.
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @atomicservice
     * @since 11
     */
    offset?: number;
    /**
     * The length for reading.
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @atomicservice
     * @since 11
     */
    length?: number;
}
/**
 * ReadTextOptions type
 *
 * @interface ReadTextOptions
 * @extends ReadOptions
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @atomicservice
 * @since 11
 */
export interface ReadTextOptions extends ReadOptions {
    /**
     * The encoding style when reading text.
     *
     * @type { ?string }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @atomicservice
     * @since 11
     */
    encoding?: string;
}
/**
 * WriteOptions type
 *
 * @interface WriteOptions
 * @extends Options
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @atomicservice
 * @since 11
 */
export interface WriteOptions extends Options {
    /**
     * The offset when writing the file.
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @atomicservice
     * @since 11
     */
    offset?: number;
    /**
     * The length for writing.
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @atomicservice
     * @since 11
     */
    length?: number;
}
/**
 * ListFileOptions type
 *
 * @interface ListFileOptions
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @atomicservice
 * @since 11
 */
export interface ListFileOptions {
    /**
     * Whether to recursively list files.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @atomicservice
     * @since 11
     */
    recursion?: boolean;
    /**
     * The number of files listed.
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @atomicservice
     * @since 11
     */
    listNum?: number;
    /**
     * The filter of listing files.
     *
     * @type { ?Filter }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @atomicservice
     * @since 11
     */
    filter?: Filter;
}
/**
 * RandomAccessFileOptions type
 *
 * @interface RandomAccessFileOptions
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 12
 */
export interface RandomAccessFileOptions {
    /**
     * The starting position of file offset.
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    start?: number;
    /**
     * The ending position of file offset.
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    end?: number;
}
/**
 * ReadStreamOptions type
 *
 * @interface ReadStreamOptions
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 12
 */
export interface ReadStreamOptions {
    /**
     * The starting range for reading a file by stream.
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    start?: number;
    /**
     * The ending range for reading a file by stream.
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    end?: number;
}
/**
 * WriteStreamOptions type
 *
 * @interface WriteStreamOptions
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 12
 */
export interface WriteStreamOptions {
    /**
     * The mode for creating write stream.
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    mode?: number;
    /**
     * The starting range for writing a file by stream.
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    start?: number;
}
/**
 * The listeners of Distributed File System.
 *
 * @typedef DfsListeners
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 12
 */
interface DfsListeners {
    /**
     * The Listener of Distributed File System status
     *
     * @param { string } networkId - The networkId of device.
     * @param { number } status - The status code of Distributed File System.
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    onStatus(networkId: string, status: number): void;
}
/**
 * Enumeration of different types of whence.
 *
 * @enum { number } whence type
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
declare enum WhenceType {
    /**
     * Starting position of the file offset.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    SEEK_SET = 0,
    /**
     * Current position of the file offset.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    SEEK_CUR = 1,
    /**
     * Ending position of the file offset.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    SEEK_END = 2
}
/**
 * Enumeration of different types of file location.
 *
 * @enum { number } location type
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 11
 */
declare enum LocationType {
    /**
     * Local file.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    LOCAL = 1 << 0,
    /**
     * Cloud file.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 11
     */
    CLOUD = 1 << 1
}
/**
 * Enumeration of different types of access mode.
 *
 * @enum { number } access mode type
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @atomicservice
 * @since 12
 */
declare enum AccessModeType {
    /**
     * Check if the file exists.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @atomicservice
     * @since 12
     */
    EXIST = 0,
    /**
     * Check if the file has write permission.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @atomicservice
     * @since 12
     */
    WRITE = 2,
    /**
     * Check if the file has read permission.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @atomicservice
     * @since 12
     */
    READ = 4,
    /**
     * Check if the file has read and write permission.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @atomicservice
     * @since 12
     */
    READ_WRITE = 6
}
