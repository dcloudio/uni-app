/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023. All rights reserved.
 */
/**
 * @file This module is used for remote communication.
 * @kit RemoteCommunicationKit
 */
import type BusinessError from '@ohos.base';
import type url from '@ohos.url';
import type cert from '@ohos.security.cert';
import type fs from '@ohos.file.fs';
/**
 * Provides HTTP-related APIs.
 * @namespace rcp
 * @syscap SystemCapability.Collaboration.RemoteCommunication
 * @since 4.1.0(11)
 */
declare namespace rcp {
    /**
     * @typedef URL
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type URL = url.URL;
    /**
     * @typedef X509Cert
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type X509Cert = cert.X509Cert;
    /**
     * @typedef File
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type File = fs.File;
    /**
     * @typedef RandomAccessFile
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type RandomAccessFile = fs.RandomAccessFile;
    /**
     * @typedef Stream
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type Stream = fs.Stream;
    /**
     * Some raw data type of ArkTs.
     * @typedef RawDataContent
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type RawDataContent = string | ArrayBuffer | object;
    /**
     * File descriptor.
     * @typedef FileDescriptor
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type FileDescriptor = number;
    /**
     * Something like a file.
     * @typedef LocalFile
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type LocalFile = FileDescriptor | File | RandomAccessFile;
    /**
     * Something can write to a file.
     * @typedef WriteFile
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface WriteFile {
        /**
         * Write to a file.
         * @param { ArrayBuffer } buffer - Buffer you want to write.
         * @returns { Promise<void | number> } Return the number of bytes you have written or noting if you do not care.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        write(buffer: ArrayBuffer): Promise<void | number>;
    }
    /**
     * Something can read from a file.
     * @typedef ReadFile
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface ReadFile {
        /**
         * Read from a file.
         * @param { ArrayBuffer } buffer - Where to set the result.
         * @returns { Promise<number> } Number of bytes you have read.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        read(buffer: ArrayBuffer): Promise<number>;
    }
    /**
     * Something can write to a stream.
     * @typedef WriteStream
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface WriteStream {
        /**
         * Write to a stream.
         * @param { ArrayBuffer } buffer - Buffer you want to write.
         * @returns { Promise<void | number> } Return the number of bytes you have written or nothing if you do not care.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        write(buffer: ArrayBuffer): Promise<void | number>;
    }
    /**
     * Something can write to a stream.
     * @typedef SyncWriteStream
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface SyncWriteStream {
        /**
         * Write to a stream.
         * @param { ArrayBuffer } buffer - Buffer you want to write.
         * @returns { void | number } Return the number of bytes you have written or nothing if you do not care.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        writeSync(buffer: ArrayBuffer): void | number;
    }
    /**
     * Something can read from a stream.
     * @typedef ReadStream
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface ReadStream {
        /**
         * Read from a stream.
         * @param { ArrayBuffer } buffer - Where to set the result.
         * @returns { Promise<number> } Return the number of bytes you have read.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        read(buffer: ArrayBuffer): Promise<number>;
    }
    /**
     * Something can read from a stream.
     * @typedef SyncReadStream
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface SyncReadStream {
        /**
         * Read from a stream.
         * @param { ArrayBuffer } buffer - Where to set the result.
         * @returns { number } Return the number of bytes you have read.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        readSync(buffer: ArrayBuffer): number;
    }
    /**
     * See {@link Response.body}, if your {@link Request.destination} is {@link DownloadToFile},
     * this is the path of your result.
     * @typedef DownloadedTo
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface DownloadedTo {
        /**
         * This is the path of your result if your {@link Request.destination} is {@link DownloadToFile}.
         * @type {Path}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        path: Path;
        /**
         * Whether the request is skipped.
         * @type {?true}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        requestSkipped?: true;
    }
    /**
     * Where to put you downloaded things.
     * @typedef TargetFile
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface TargetFile {
        /**
         * Where to put you downloaded things.
         * @type {Path}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        path: Path;
        /**
         * Whether the request should be skipped.
         * @type {?boolean}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        skipRequest?: boolean;
    }
    /**
     * Return a {@link TargetFile}.
     * @typedef TargetFileCallback
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type TargetFileCallback = (request: Request, suggestedPath: Path) => TargetFile | Promise<TargetFile>;
    /**
     * How to deal with the things downloaded.
     * @typedef IncomingDataCallback
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type IncomingDataCallback = (incomingData: ArrayBuffer) => void | Promise<void>;
    /**
     * The file you want to upload.
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export class UploadFromFile {
        /**
         * File or path.
         * @type {Path | LocalFile | ReadFile}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        readonly fileOrPath: Path | LocalFile | ReadFile;
        /**
         * Constructor.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        constructor(fileOrPath: Path | LocalFile | ReadFile);
    }
    /**
     * The stream you want to upload.
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export class UploadFromStream {
        /**
         * Something like a stream.
         * @type {Stream | ReadStream | SyncReadStream}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        readonly stream: Stream | ReadStream | SyncReadStream;
        /**
         * Constructor.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        constructor(stream: Stream | ReadStream | SyncReadStream);
    }
    /**
     * Use object of this interface to provide request body
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface INetworkInputQueue {
        /**
         * Writes data to the queue. Eventually bytes of data will be transferred to the remote server
         * The transfer will be aborted in case you write more bytes then the queue can store
         * Framework treats them similar to {@link RawDataContent} of the request
         * @param {string | ArrayBuffer} buffer - data to write to the queue.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        write(buffer: string | ArrayBuffer): void;
        /**
         * Finishes the transfer
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        close(): void;
        /**
         * Returns free space size
         * @returns { number } Returns number of bytes that you can write into the queue
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        getFreeSpace(): number;
    }
    /**
     * Use object of this interface to read response body
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface INetworkOutputQueue {
        /**
         * Reads received bytes
         * @param {number} maxBytesToRead - maximum bytes to read from the queue
         * @returns { ArrayBuffer } Returns array buffer object with bytes that have been read. No more then was requested
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        read(maxBytesToRead: number): ArrayBuffer;
        /**
         * Reads from the queue into provided buffer.
         * @param {ArrayBuffer} buffer - target buffer
         * @returns { number } Returns number of bytes that have been written into buffer
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        readInto(buffer: ArrayBuffer): number;
        /**
         * Returns the number of bytes in the queue.
         * @returns { number } Returns number of bytes in the queue that have been received from the Network
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        getStoredBytes(): number;
    }
    /**
     * Interface of the constructor of an object with NetworkOutputQueue interface
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface NetworkOutputQueueConstructor {
        /**
         * Creates network output queue with default parameters.
         * By default queue size is limited to 1 MBytes and active receiving pause policy is applied.
         * Active receiving pause policy is either the default one or a policy set for session or request.
         * Check {@link ReceivingPausePolicy } for the details
         * @returns { INetworkOutputQueue } Return a {@link INetworkOutputQueue} object.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        new (): INetworkOutputQueue;
        /**
         * Creates network output queue with provided maximum size and active receiving pause policy.
         * @param { number } maxSize - maximum queue size to use
         * @returns { INetworkOutputQueue } Return a {@link INetworkOutputQueue} object.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        new (maxSize: number): INetworkOutputQueue;
        /**
         * Creates network output queue with provided maximum size and receiving pause policy to use.
         * @param { number } maxSize - maximum queue size to use
         * @param { ReceivingPausePolicy } pausePolicyOverride pause policy settings for receiving.
         * @returns { INetworkOutputQueue } Return a {@link INetworkOutputQueue} object.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        new (maxSize: number, pausePolicyOverride: ReceivingPausePolicy): INetworkOutputQueue;
    }
    /**
     * Interface of constructor of an object with NetworkInputQueue interface
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface NetworkInputQueueConstructor {
        /**
         * Creates network input queue with default parameters.
         * By default queue size is limited to 1 MBytes and active sending pause policy is applied.
         * Active sending pause policy is either the default one or a policy set for session or request.
         * Check {@link SendingPausePolicy } for the details
         * @returns { INetworkInputQueue } Return a {@link INetworkInputQueue} object.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        new (): INetworkInputQueue;
        /**
         * Creates network input queue with provided maximum size and active sending pause policy.
         * @param { number } maxSize - maximum queue size to use
         * @returns { INetworkInputQueue } Return a {@link INetworkInputQueue} object.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        new (maxSize: number): INetworkInputQueue;
        /**
         * Creates network input queue with provided maximum size and sending pause policy to use.
         * They have priority over settings set for request or session.
         * @param { number } maxSize - maximum queue size to use
         * @param { ReceivingPausePolicy } pausePolicyOverride pause policy settings for sending.
         * @returns { INetworkInputQueue } Return a {@link INetworkInputQueue} object.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        new (maxSize: number, pausePolicyOverride: SendingPausePolicy): INetworkInputQueue;
    }
    /**
     * Constructor of an object with NetworkInputQueue interface
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export const NetworkInputQueue: NetworkInputQueueConstructor;
    /**
     * Constructor of an object with NetworkOutputQueue interface
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export const NetworkOutputQueue: NetworkOutputQueueConstructor;
    /**
     * Download to a file or a folder. If download to a folder, the file name is same as which it is in the server.
     * @typedef DownloadToFile
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type DownloadToFile = {
        kind: 'file';
        file: TargetFileCallback;
    } | {
        kind: 'file';
        file: Path;
        keepLocal?: boolean;
    } | {
        kind: 'file';
        file: LocalFile | WriteFile;
    } | {
        kind: 'folder';
        path: Path;
        keepLocal?: boolean;
    };
    /**
     * Download to a stream.
     * @typedef DownloadToStream
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type DownloadToStream = {
        kind: 'stream';
        stream: Stream | WriteStream | SyncWriteStream;
    };
    /**
     * Where to put the response body.
     * @typedef ResponseBodyDestination
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type ResponseBodyDestination = 'array-buffer' | IncomingDataCallback | DownloadToFile | DownloadToStream | INetworkOutputQueue;
    /**
     * Which information you want to collect during request processing.
     * This determines which {@link Response.debugInfo} will be collected.
     * @typedef InfoToCollect
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface InfoToCollect {
        /**
         * Whether to collect unclassified textual events. Default is false.
         * @type {?boolean}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        textual?: boolean;
        /**
         * Whether to collect incoming HTTP header events. Default is false.
         * @type {?boolean}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        incomingHeader?: boolean;
        /**
         * Whether to collect outgoing HTTP header events. Default is false.
         * @type {?boolean}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        outgoingHeader?: boolean;
        /**
         * Whether to collect events about incoming HTTP data. Default is false.
         * @type {?boolean}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        incomingData?: boolean;
        /**
         * Whether to collect events about outgoing HTTP data. Default is false.
         * @type {?boolean}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        outgoingData?: boolean;
        /**
         * Whether to collect incoming SSL/TLS events. Default is false.
         * @type {?boolean}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        incomingSslData?: boolean;
        /**
         * Whether to collect outgoing SSL/TLS events. Default is false.
         * @type {?boolean}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        outgoingSslData?: boolean;
    }
    /**
     * The URL or string can be used as the input parameter of an HTTP/HTTPS address.
     * @typedef URLOrString
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type URLOrString = URL | string;
    /**
     * HTTP request method.
     * @typedef HttpMethod
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type HttpMethod = 'GET' | 'POST' | 'HEAD' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | (string & NonNullable<unknown>);
    /**
     * HTTP request headers.
     * @typedef RequestHeaders
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type RequestHeaders = {
        [k: string]: string | string[] | undefined;
        'authorization'?: string;
        'accept'?: ContentType | ContentType[];
        'accept-charset'?: string | string[];
        'accept-encoding'?: ContentCoding | ContentCoding[];
        'accept-language'?: string | string[];
        'cache-control'?: string | string[];
        'cookie'?: string | string[];
        'range'?: string | string[];
        'upgrade'?: string | string[];
        'user-agent'?: string;
        'content-type'?: ContentType;
    };
    /**
     * HTTP response headers.
     * @typedef ResponseHeaders
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type ResponseHeaders = {
        [k: string]: string | string[] | undefined;
        'accept-ranges'?: 'none' | 'bytes' | (string & NonNullable<unknown>);
        'allow'?: HttpMethod | HttpMethod[];
        'cache-control'?: string | string[];
        'content-encoding'?: ContentCoding;
        'content-range'?: string;
        'content-type'?: ContentType;
        'date'?: string;
        'etag'?: string;
        'expires'?: string;
        'location'?: string;
        'retry-after'?: string;
        'set-cookie'?: string | string[];
        'server'?: string;
        'www-authenticate'?: string | string[];
    };
    /**
     * HTTP request predefined content types.
     * @typedef ContentType
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type ContentType = 'application/json' | 'text/plain' | 'multipart/form-data' | 'application/octet-stream' | 'application/x-www-form-urlencoded' | (string & NonNullable<unknown>);
    /**
     * HTTP request predefined content coding types.
     * @typedef ContentCoding
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type ContentCoding = 'aes128gcm' | 'br' | 'compress' | 'deflate' | 'exi' | 'gzip' | 'pack200-gzip' | 'x-compress' | 'x-gzip' | 'zstd' | (string & NonNullable<unknown>);
    /**
     * HTTP request path preference.
     * This is only a suggestion of the caller, and the system decides which path to use.
     * @typedef PathPreference
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type PathPreference = 'auto' | 'cellular';
    /**
     * The type of network service.
     * @typedef ServiceType
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    /**
     * The type of network service. Add some types.
     * @typedef ServiceType
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type ServiceType = 'default' | 'background' | 'realtimeVoice' | 'realtimeVideo' | 'callSignaling' | 'realtimeGame' | 'normalGame' | 'shortVideo' | 'longVideo' | 'livestreamingAnchor' | 'livestreamingWatcher' | 'download' | 'upload' | 'browser';
    /**
     * Set of rules that controls when a transfer is paused
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface PausePolicy {
        /**
         * Sets a policy for pausing response body receiving.
         * @type {?ReceivingPausePolicy}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        receiving?: ReceivingPausePolicy;
        /**
         * Sets a policy for pausing the request body sending.
         * @type {?SendingPausePolicy}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        sending?: SendingPausePolicy;
    }
    /**
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface ReceivingPauseByCache {
        /**
         * Pause receiving of the network data in case user callback or stream/file write method does not write the previous portion of data.
         * @type {'cacheSize'}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        kind: 'cacheSize';
        /**
         * The number of bytes was received after it was called.
         * @type {number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        size: number;
    }
    /**
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface ReceivingPauseByTimeout {
        /**
         * Pause receiving in case user callback or stream/file write method does not write the previous portion of data and the specified.
         * @type {'timeout'}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        kind: 'timeout';
        /**
         * The number of milliseconds pass after it was called.
         * @type {number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        timeoutMs: number;
    }
    /**
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type ReceivingPausePolicy = ReceivingPauseByCache | ReceivingPauseByTimeout;
    /**
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface SendingPausePolicy {
        /**
         * Pause sending in case user callback or stream/file that provides outgoing data does not return data during.
         * @type {'timeout'}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        kind: 'timeout';
        /**
         * The number of milliseconds pass after it was called.
         * @type {number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        timeoutMs: number;
    }
    /**
     * Timeout settings.
     * @typedef Timeout
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface Timeout {
        /**
         * Connection timeout. The default value is 60000, in ms.
         * @type {?number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        connectMs?: number;
        /**
         * Transfer timeout. The default value is 60000, in ms.
         * @type {?number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        transferMs?: number;
        /**
         * Inactivity timeout, in ms. By default, the timeout is not set.
         * The time interval between chunks of data sending to server or receiving from server cannot exceed this value.
         * @type {?number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        inactivityMs?: number;
    }
    /**
     * An HTTP range request asks the server to send only a portion of an HTTP message back to a client.
     * @typedef TransferRange
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface TransferRange {
        /**
         * Transfer start position.
         * @type {?number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        from?: number;
        /**
         * Transfer end position.
         * @type {?number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        to?: number;
    }
    /**
     * HTTP transfer configuration.
     * @typedef TransferConfiguration
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface TransferConfiguration {
        /**
         * Whether to automatically follow HTTP redirect response. True by default.
         * The maximum number of redirection is limited by the implementation.
         * @type {?boolean}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        autoRedirect?: boolean;
        /**
         * Set the maximum number of redirections for the request to follow if the autoRedirect property is true.
         * Default is 50, maximum value is 2147483647.
         * @type {?number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        maxAutoRedirects?: number;
        /**
         * Timeout configuration. If this option is not set, the default timeouts will be applied.
         * Please check the {@link Timeout}.
         * @type {?Timeout}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        timeout?: Timeout;
        /**
         * Whether to assume that the target server supports HTTP/3. Default is false.
         * @type {?boolean}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        assumesHTTP3Capable?: boolean;
        /**
         * HTTP request path preference.
         * This is only a suggestion of the caller, and the system decides which path to use.
         * Default is auto, which means to give no advice to the system.
         * @type {?PathPreference}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        pathPreference?: PathPreference;
        /**
         * The type of network service.
         * @type {?ServiceType}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        serviceType?: ServiceType;
        /**
         * Set of rules that controls when a transfer is paused. Applicable when you provide data to network or record incoming network data using callbacks
         * @type {?PausePolicy}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        pausePolicy?: PausePolicy;
    }
    /**
     * HTTP tracing configuration.
     * @typedef TracingConfiguration
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface TracingConfiguration {
        /**
         * Whether to print verbose logs when HTTP runs. Default is false.
         * @type {?boolean}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        verbose?: boolean;
        /**
         * Specify which request-processing events to collect. The collected events can be examined via response object.
         * Check {@link Response.debugInfo} please.
         * By default no events are collected.
         * @type {?InfoToCollect}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        infoToCollect?: InfoToCollect;
        /**
         * Whether to collect request timing information. Default is false.
         * @type {?boolean}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        collectTimeInfo?: boolean;
        /**
         * Callbacks to watch different HTTP events.
         * @type {?HttpEventsHandler}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        httpEventsHandler?: HttpEventsHandler;
    }
    /**
     * HTTP proxy configuration.
     * system: means that use system proxy configuration.
     * no-proxy: means do not use proxy.
     * object of @type {WebProxy} means providing custom proxy settings
     * @typedef ProxyConfiguration
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type ProxyConfiguration = 'system' | 'no-proxy' | WebProxy;
    /**
     * The server's authentication type.
     * @typedef AuthenticationType
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type AuthenticationType = 'basic' | 'ntlm' | 'digest';
    /**
     * HTTP credential. Some server or proxy server need this.
     * @typedef Credential
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface Credential {
        /**
         * Username of credential. Default is ''.
         * @type {string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        username: string;
        /**
         * Password of credential. Default is ''.
         * @type {string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        password: string;
    }
    /**
     * HTTP server authentication.
     * @typedef ServerAuthentication
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface ServerAuthentication {
        /**
         * Credential of server.
         * @type {Credential}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        credential: Credential;
        /**
         * Authentication type of server. If not set, negotiate with the server.
         * @type {?AuthenticationType}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        authenticationType?: AuthenticationType;
    }
    /**
     * A function that can directly return IP addresses based on hostname and port.
     * See {@link DnsConfiguration.dnsRules}.
     * @typedef DynamicDnsRule
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type DynamicDnsRule = (host: string, port: number) => IpAddress[];
    /**
     * Name resolution configuration.
     * @typedef DnsConfiguration
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface DnsConfiguration {
        /**
         * Dns rule configuration. Default is undefined.
         * {@link DnsServers}: means that preferentially use the specified dns servers to resolve hostname.
         * {@link StaticDnsRules}: means that preferentially use the specified address if hostname matches.
         * {@link DynamicDnsRule}: means that preferentially use the address returned in the function.
         * @type {?(DnsServers | StaticDnsRules | DynamicDnsRule)}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        dnsRules?: DnsServers | StaticDnsRules | DynamicDnsRule;
        /**
         * Dns over HTTPS configuration.  Default is undefined.
         * If set, preferentially use the address resolved by the DOH dns server.
         * @type {?DnsOverHttpsConfiguration}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        dnsOverHttps?: DnsOverHttpsConfiguration;
    }
    /**
     * The validation context of {@link ValidationCallback}
     * @typedef ValidationContext
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface ValidationContext {
        /**
         * The raw data which in PEM format of certificate.
         * @type {string[]}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        pemCerts: string[];
        /**
         * X509 certificate chain.
         * @type {X509Cert[]}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        x509Certs: X509Cert[];
        /**
         * The host of this request.
         * @type {string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        host: string;
        /**
         * The real IP which this request connect to.
         * @type {string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        ip: string;
    }
    /**
     * Self defined remote validation, {@link SecurityConfiguration.remoteValidation}.
     * @typedef ValidationCallback
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type ValidationCallback = (context: ValidationContext) => boolean | Promise<boolean>;
    /**
     * Cipher suite which TLS1.3+ support.
     * The framework has a built-in preference order, but your choice will be recorded.
     * @typedef TlsV13SpecificCipherSuite
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type TlsV13SpecificCipherSuite = 'TLS_AES_128_GCM_SHA256' | 'TLS_AES_256_GCM_SHA384' | 'TLS_CHACHA20_POLY1305_SHA256';
    /**
     * Cipher suite which TLS1.2+ support.
     * @typedef TlsV12SpecificCipherSuite
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type TlsV12SpecificCipherSuite = 'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256' | 'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256' | 'TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384' | 'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384' | 'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256' | 'TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256' | 'TLS_RSA_WITH_AES_128_GCM_SHA256' | 'TLS_RSA_WITH_AES_256_GCM_SHA384';
    /**
     * Cipher suite which TLS1.0+ support.
     * @typedef TlsV10SpecificCipherSuite
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type TlsV10SpecificCipherSuite = 'TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA' | 'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA' | 'TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA' | 'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA' | 'TLS_RSA_WITH_AES_128_CBC_SHA' | 'TLS_RSA_WITH_AES_256_CBC_SHA' | 'TLS_RSA_WITH_3DES_EDE_CBC_SHA';
    /**
     * Include all cipher suite.
     * @typedef CipherSuite
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type CipherSuite = TlsV13CipherSuite;
    /**
     * TLS1.3 cipher suite should include TLS1.2 cipher suite.
     * @typedef TlsV13CipherSuite
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type TlsV13CipherSuite = TlsV12CipherSuite | TlsV13SpecificCipherSuite;
    /**
     * TLS1.2 cipher suite should include TLS1.1 cipher suite.
     * @typedef TlsV12CipherSuite
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type TlsV12CipherSuite = TlsV11CipherSuite | TlsV12SpecificCipherSuite;
    /**
     * TLS1.1 cipher suite is same as TLS1.0 cipher suite.
     * @typedef TlsV11CipherSuite
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type TlsV11CipherSuite = TlsV10CipherSuite;
    /**
     * TLS1.0 cipher suite.
     * @typedef TlsV10CipherSuite
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type TlsV10CipherSuite = TlsV10SpecificCipherSuite;
    /**
     * TLS1.3 option.
     * @typedef TlsV13Option
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface TlsV13Option {
        /**
         * Version is TLS1.3.
         * @type {'TlsV1.3'}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        tlsVersion: 'TlsV1.3';
        /**
         * TlsV1.3 cipher suite.
         * @type {?TlsV13CipherSuite[]}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        cipherSuite?: TlsV13CipherSuite[];
    }
    /**
     * TLS1.2 option.
     * @typedef TlsV12Option
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface TlsV12Option {
        /**
         * Version is TLS1.2.
         * @type {'TlsV1.2'}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        tlsVersion: 'TlsV1.2';
        /**
         * TlsV1.2 cipher suite.
         * @type {?TlsV12CipherSuite[]}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        cipherSuite?: TlsV12CipherSuite[];
    }
    /**
     * TLS1.1 option.
     * @typedef TlsV11Option
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface TlsV11Option {
        /**
         * Version is TLS1.1.
         * @type {'TlsV1.1'}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        tlsVersion: 'TlsV1.1';
        /**
         * TlsV1.1 cipher suite.
         * @type {?TlsV11CipherSuite[]}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        cipherSuite?: TlsV11CipherSuite[];
    }
    /**
     * TLS1.0 option.
     * @typedef TlsV10Option
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface TlsV10Option {
        /**
         * Version is TLS1.0.
         * @type {'TlsV1.0'}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        tlsVersion: 'TlsV1.0';
        /**
         * TlsV1.0 cipher suite.
         * @type {?TlsV10CipherSuite[]}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        cipherSuite?: TlsV10CipherSuite[];
    }
    /**
     * Certificate pinning option.
     * @interface CertificatePinning
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface CertificatePinning {
        /**
         * Indicates the certificate public key will be checked.
         * @type {'public-key'}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        kind: 'public-key';
        /**
         * Public key hash.
         * @type {string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        publicKeyHash: string;
        /**
         * Certificate public key hash algorithm.
         * @type {'SHA-256'}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        hashAlgorithm: 'SHA-256';
    }
    /**
     * Security configuration.
     * @typedef SecurityConfiguration
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface SecurityConfiguration {
        /**
         * Certificate authority(CA) which is used to verify the remote server's identification.
         * Default is 'system', if this field is not set, system CA will be used to verify the remote server's
         * identification.
         * See {@link CertificateAuthority}.
         * @type {?('system' | 'skip' | CertificateAuthority)}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        /**
         * Certificate authority(CA) which is used to verify the remote server's identification.
         * @type {?('system' | 'skip' | CertificateAuthority | ValidationCallback)}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        remoteValidation?: 'system' | 'skip' | CertificateAuthority | ValidationCallback;
        /**
         * Client certificate which is sent to the remote server, the the remote server will use it to verify the
         * client's identification. Default is undefined, means server does not need to verify client.
         * See {@link ClientCertificate}.
         * @type {?ClientCertificate}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        certificate?: ClientCertificate;
        /**
         * TLS option.
         * 'system': use system tls configuration.
         * CipherSuite[]: do not specify tls version, just specify cipher suite.
         * @type {?('system' | CipherSuite[] | TlsV13Option | TlsV12Option | TlsV11Option | TlsV10Option)}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        tlsOptions?: 'system' | CipherSuite[] | TlsV13Option | TlsV12Option | TlsV11Option | TlsV10Option;
        /**
         * HTTP server authentication settings. No authentication by default.
         * @type {?ServerAuthentication}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        serverAuthentication?: ServerAuthentication;
        /**
         * Certificate pinning option. If server certificate's digest does not match
         * {@link CertificatePinning.publicKeyHash}, request will fail.
         * @type {?CertificatePinning | CertificatePinning[]}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        certificatePinning?: CertificatePinning | CertificatePinning[];
    }
    /**
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface ProcessingConfiguration {
        /**
         * Allows to specify extra steps that will be applied to obtained response object.
         * @type {?('default' | ResponseValidationCallback)}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        validateResponse?: 'default' | ResponseValidationCallback;
    }
    /**
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type ResponseValidationCallback = (response: Response) => boolean | Promise<boolean>;
    /**
     * HTTP configurations.
     * @typedef Configuration
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface Configuration {
        /**
         * HTTP transfer configuration.
         * @type {?TransferConfiguration}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        transfer?: TransferConfiguration;
        /**
         * HTTP tracing configuration.
         * @type {?TracingConfiguration}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        tracing?: TracingConfiguration;
        /**
         * HTTP proxy configuration.
         * @type {?ProxyConfiguration}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        proxy?: ProxyConfiguration;
        /**
         * HTTP dns configuration.
         * @type {?DnsConfiguration}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        dns?: DnsConfiguration;
        /**
         * HTTP security configuration.
         * @type {?SecurityConfiguration}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        security?: SecurityConfiguration;
        /**
         * HTTP response object processing configuration
         * @type {?ProcessingConfiguration}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        processing?: ProcessingConfiguration;
    }
    /**
     * Connection configuration.
     * @typedef ConnectionConfiguration
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface ConnectionConfiguration {
        /**
         * The maximum number of simultaneous TCP connections allowed to a single host
         * (a host being the same as a hostname + port number pair).
         * Default is 6, maximum value is 2147483647.
         * @type {?number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        readonly maxConnectionsPerHost?: number;
        /**
         * The maximum number of simultaneous TCP connections allowed total in this session.
         * Default is 64, maximum value is 2147483647.
         * @type {?number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        readonly maxTotalConnections?: number;
    }
    /**
     * Dns over HTTPS configuration.
     * @typedef DnsOverHttpsConfiguration
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface DnsOverHttpsConfiguration {
        /**
         * Url of DOH server.
         * @type {URLOrString}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        url: URLOrString;
        /**
         * Whether to skip certificates validation. Default is false.
         * @type {?boolean}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        skipCertificatesValidation?: boolean;
    }
    /**
     * Callback when HTTP body is received.
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    /**
     * Add void | Promise<void> as its return type.
     * @typedef OnDataReceive
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type OnDataReceive = (incomingData: ArrayBuffer) => number | void | Promise<void>;
    /**
     * Callback indicates the upload progress.
     * @typedef OnUploadProgress
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type OnUploadProgress = (totalSize: number, transferredSize: number) => void;
    /**
     * Callback indicates the download progress.
     * @typedef OnDownloadProgress
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type OnDownloadProgress = (totalSize: number, transferredSize: number) => void;
    /**
     * Callback when HTTP headers are received.
     * @typedef OnHeaderReceive
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type OnHeaderReceive = (headers: ResponseHeaders) => void;
    /**
     * Callback when HTTP transfer ended.
     * @typedef OnDataEnd
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type OnDataEnd = () => void;
    /**
     * Callback when {@link Request} or {@link Session} is canceled.
     * @typedef OnCanceled
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type OnCanceled = () => void;
    /**
     * Callback when {@link Session} is closed.
     * @typedef OnClosed
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type OnClosed = () => void;
    /**
     * Callbacks to watch different HTTP events.
     * @typedef HttpEventsHandler
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface HttpEventsHandler {
        /**
         * Callback called when a part of the HTTP response body is received.
         * If the callback is registered, then returned {@link Response|response object}
         * has undefined {@link Response.body|body} field.
         * @type {?OnDataReceive}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        onDataReceive?: OnDataReceive;
        /**
         * Callback called when an HTTP request part is sent to the server
         * @type {?OnUploadProgress}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        onUploadProgress?: OnUploadProgress;
        /**
         * Callback called when an HTTP response part is received from the server.
         * @type {?OnDownloadProgress}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        onDownloadProgress?: OnDownloadProgress;
        /**
         * Callback called when all HTTP requests are received.
         * @type {?OnHeaderReceive}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        onHeaderReceive?: OnHeaderReceive;
        /**
         * Callback called when an HTTP transmission is ended.
         * @type {?OnDataEnd}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        onDataEnd?: OnDataEnd;
        /**
         * Callback called when an HTTP request is canceled.
         * @type {?OnCanceled}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        onCanceled?: OnCanceled;
    }
    /**
     * Certificate authority(CA) which is used to verify the remote server's identification.
     * See {@link SecurityConfiguration.remoteValidation}.
     * @typedef CertificateAuthority
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface CertificateAuthority {
        /**
         * Certificate Authority certificates bundle used to verify the peer. It should be in PEM format.
         * @type {?(string | ArrayBuffer)}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        content?: string | ArrayBuffer;
        /**
         * A path to a Certificate Authority certificates file used to verify the peer. The file should be in PEM format.
         * @type {?string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        filePath?: string;
        /**
         * A path to the directory holding multiple CA certificates used to verify the peer.
         * The files in this directory should be PEM format.
         * The files must be named by the subject name's hash and an extension of '.0''.
         * For details, please see the documents.
         * @type {?string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        folderPath?: string;
    }
    /**
     * Client certificate which is sent to the remote server, the the remote server will use it to verify the client's
     * identification. See {@link SecurityConfiguration.certificate}.
     * @typedef ClientCertificate
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface ClientCertificate {
        /**
         * Client certificate content. It should be in 'PEM', 'DER' or 'P12' format.
         * The actual format should be specified by {@link type}.
         * @type {?(string | ArrayBuffer)}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        content?: string | ArrayBuffer;
        /**
         * A path to a client certificate. The file should be in 'PEM', 'DER' or 'P12' format.
         * The actual format should be specified by {@link type}.
         * @type {?string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        filePath?: string;
        /**
         * Client certificate type.
         * @type {?('PEM' | 'DER' | 'P12')}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        type?: 'PEM' | 'DER' | 'P12';
        /**
         * File name of your client certificate private key.
         * @type {?string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        key?: string;
        /**
         * Password for your client certificate private key.
         * @type {?string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        keyPassword?: string;
    }
    /**
     * IP address is just a string. It could be IPv4 string or IPv6 string.
     * It is used in {@link DnsServers} and {@link StaticDnsRule} and
     * the function type of {@link DnsConfiguration.dnsRules}.
     * @typedef IpAddress
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type IpAddress = string;
    /**
     * This interface is used in {@link DnsServers}, indicates a DNS server address and port.
     * @typedef IpAndPort
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface IpAndPort {
        /**
         * Indicates an IPv4 or IPv6 address.
         * @type {IpAddress}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        ip: IpAddress;
        /**
         * Indicates a port. Range: [0, 65535]. Default is 53
         * @type {?number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        port?: number;
    }
    /**
     * One of the types in {@link DnsConfiguration.dnsRules}.
     * @typedef DnsServers
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type DnsServers = IpAndPort[];
    /**
     * One of the types in {@link DnsConfiguration.dnsRules}.
     * @typedef StaticDnsRule
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface StaticDnsRule {
        /**
         * Indicates a hostname.
         * For example, URL is https://example.com:443, hostname is example.com.
         * For example, URL is https://example.com, hostname is example.com.
         * For example, URL is https://example.com:443/path, hostname is example.com.
         * For example, URL is https://example.com:443?name=value, hostname is example.com.
         * @type {string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        host: string;
        /**
         * Indicates a port. Range: [0, 65535].
         * @type {number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        port: number;
        /**
         * Indicates the IP addresses corresponding to the {@link host}.
         * @type {IpAddress[]}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        ipAddresses: IpAddress[];
    }
    /**
     * One of the types in {@link DnsConfiguration.dnsRules}.
     * @typedef StaticDnsRules
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type StaticDnsRules = StaticDnsRule[];
    /**
     * A function that determines whether a host uses a proxy or not.
     * See {@link WebProxy.exclusions}.
     * @typedef DynamicExclusionRule
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type DynamicExclusionRule = (url: URLOrString) => boolean;
    /**
     * Custom proxy configuration, see {@link ProxyConfiguration}.
     * @typedef WebProxy
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface WebProxy {
        /**
         * Indicates the URL of the proxy server. If you do not set port explicitly, port will be 1080.
         * @type {URLOrString}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        url: URLOrString;
        /**
         * Used to control when to create a proxy tunnel.
         * Tunnel or tunneling means that an HTTP CONNECT request is sent to the proxy, asking it to connect to
         * a remote host on a specific port number and then the traffic is just passed through the proxy.
         * 'auto' means create tunnel for HTTPS, and not to create for HTTP.
         * 'always' means always create tunnel.
         * The default is 'auto'.
         * @type {?('auto' | 'always')}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        createTunnel?: 'auto' | 'always';
        /**
         * If {@link Request.url} matches the rule of {@link exclusions}, the {@link Request} will not use proxy.
         * @type {?(URLOrString | URLOrString[] | DynamicExclusionRule)}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        exclusions?: URLOrString | URLOrString[] | DynamicExclusionRule;
        /**
         * The {@link SecurityConfiguration} in proxy.
         * @type {?SecurityConfiguration}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        security?: SecurityConfiguration;
    }
    /**
     * HTTP request cookies
     *
     * Allow you to specify all cookies you need in one object as follows: {'name1': 'value1', 'name2': 'value2'}.
     * Cookies will be transmitted in cookie header as follows: {'cookies': 'name1=value1; name2=value2'}.
     * @typedef RequestCookies
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface RequestCookies {
        [name: string]: string;
    }
    /**
     * HTTP request.
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export class Request {
        /**
         * The unique id for every single request. Generated by system.
         * @type {string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        readonly id: string;
        /**
         * In {@link constructor} the parameter could be {@link URLOrString}, but URL is just {@link URL},
         * string need to be converted to {@link URL}.
         * @type {URL}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        url: URL;
        /**
         * HTTP request method. Default is GET.
         * @type {HttpMethod}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        method: HttpMethod;
        /**
         * HTTP request headers.
         * @type {?RequestHeaders}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        headers?: RequestHeaders;
        /**
         * HTTP request body.
         * @type {?RequestContent}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        content?: RequestContent;
        /**
         * HTTP request cookies. The setting is converted to the HTTP Cookies header.
         * @type {?RequestCookies}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        cookies?: RequestCookies;
        /**
         * HTTP transfer ranges. The setting is converted to the HTTP Range header.
         * An HTTP request with range header asks the server to send back only a portion of an HTTP response.
         * @type {?(TransferRange | TransferRange[])}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        transferRange?: TransferRange | TransferRange[];
        /**
         * HTTP request configuration. See {@link Configuration}.
         * Used to override default or session-wide settings.
         * @type {?Configuration}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        configuration?: Configuration;
        /**
         * Where to put the response body.
         * @type {?ResponseBodyDestination}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        destination?: ResponseBodyDestination;
        /**
         * Constructor of {@link Request}. {@link url} is needed, others are optional.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        constructor(url: URLOrString, method?: HttpMethod, headers?: RequestHeaders, content?: RequestContent, cookies?: RequestCookies, transferRange?: TransferRange | TransferRange[], configuration?: Configuration);
    }
    /**
     * The callback signature which maybe used in {@link FormFieldFileValue.contentOrPath} and {@link RequestContent}.
     * This callback is called when API needs next portion of the data to send to the server.
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    /**
     * Return type could be {@link ArrayBuffer} | {@link Promise<ArrayBuffer>}
     * @typedef GetDataCallback
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type GetDataCallback = (maxSize: number) => ArrayBuffer | Promise<ArrayBuffer>;
    /**
     * HTTP request body, see {@link Request.content}.
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    /**
     * Add UploadFromFile | UploadFromStream as its type.
     * @typedef RequestContent
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    /**
     * Add NetworkInputQueue as its type.
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type RequestContent = RawDataContent | Form | MultipartForm | GetDataCallback | UploadFromFile | UploadFromStream | INetworkInputQueue;
    /**
     * HTTP simple form data.
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export class Form {
        /**
         * Constructor of {@link Form}. {@link fields} is needed.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        constructor(fields: FormFields);
        /**
         * HTTP simple form data fields.
         * @type {FormFields}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        fields: FormFields;
    }
    /**
     * HTTP multipart form data.
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export class MultipartForm {
        /**
         * Constructor of {@link MultipartForm}. {@link fields} is needed.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        constructor(fields: MultipartFormFields);
        /**
         * HTTP multipart form data fields.
         * @type {MultipartFormFields}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        fields: MultipartFormFields;
    }
    /**
     * HTTP simple form data fields, see {@link Form.fields}.
     * @typedef FormFields
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type FormFields = {
        [k: string]: FormFieldValue | FormFieldValue[];
    };
    /**
     * HTTP multipart form data fields, see {@link MultipartForm.fields}.
     * @typedef MultipartFormFields
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type MultipartFormFields = {
        [k: string]: MultipartFormFieldValue | MultipartFormFieldValue[];
    };
    /**
     * HTTP multipart form data field value, see {@link MultipartFormFields}.
     * @typedef MultipartFormFieldValue
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type MultipartFormFieldValue = FormFieldValue | FormFieldFileValue;
    /**
     * HTTP simple form data field value, see {@link Form.fields} and {@link MultipartFormFieldValue}.
     * @typedef FormFieldValue
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type FormFieldValue = string | number | boolean | bigint;
    /**
     * A file path which is used in {@link FormFieldFileValue.contentOrPath}.
     * @typedef Path
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type Path = string;
    /**
     * HTTP simple form data field value, see {@link MultipartFormFieldValue}.
     * @typedef FormFieldFileValue
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface FormFieldFileValue {
        /**
         * HTTP multipart form data content type.
         * @type {?ContentType}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        contentType?: ContentType;
        /**
         * HTTP multipart form data remote file name.
         * @type {?string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        remoteFileName?: string;
        /**
         * HTTP multipart form data content.
         * @type {Path | FileContent | GetDataCallback}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        contentOrPath: Path | FileContent | GetDataCallback;
    }
    /**
     * One of the type of {@link FormFieldFileValue.contentOrPath}.
     * @typedef FileContent
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface FileContent {
        /**
         * Content could be {@link string} or {@link ArrayBuffer}.
         * @type {string | ArrayBuffer}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        content: string | ArrayBuffer;
    }
    /**
     * HTTP debug information, see {@link Response.debugInfo}.
     * @typedef DebugInfo
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface DebugInfo {
        /**
         * Debug information type.
         * @type {DebugEvent}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        type: DebugEvent;
        /**
         * Debug information data.
         * @type {ArrayBuffer}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        data: ArrayBuffer;
    }
    /**
     * Indicates the http version.
     * @typedef HttpVersion
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export type HttpVersion = '1.0' | '1.1' | '2' | '3' | 'unknown';
    /**
     * HTTP response.
     * @typedef Response
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface Response {
        /**
         * HTTP request that initiated this response.
         * Set a {@link Request} in {@link Response} to let it know which {@link Request} it comes from.
         * @type {Request}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        readonly request: Request;
        /**
         * HTTP status code.
         * @type {number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        readonly statusCode: number;
        /**
         * HTTP response headers.
         * @type {ResponseHeaders}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        readonly headers: ResponseHeaders;
        /**
         * The last used effective URL.
         * If you follow redirects, it may not be the same value you set with {@link Request.url}.
         * @type {?URL}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        readonly effectiveUrl?: URL;
        /**
         * The HTTP response body.
         * @type {?ArrayBuffer}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        readonly body?: ArrayBuffer;
        /**
         * The path which the content downloaded.
         * @type {?DownloadedTo}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        readonly downloadedTo?: DownloadedTo;
        /**
         * The request/response processing debug info. Collected events depend on your
         * {@link TracingConfiguration.debug} setting.
         * @type {?DebugInfo[]}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        readonly debugInfo?: DebugInfo[];
        /**
         * The response time info. Whether to collect this, depends on your
         * {@link TracingConfiguration.collectTimeInfo} setting.
         * @type {?TimeInfo}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        readonly timeInfo?: TimeInfo;
        /**
         * The response cookies.
         * @type {?ResponseCookie[]}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        readonly cookies?: ResponseCookie[];
        /**
         * The http version.
         * @type {?HttpVersion}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        readonly httpVersion?: HttpVersion;
        /**
         * The reason phrase of the status line.
         * @type {?string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        readonly reasonPhrase?: string;
        /**
         * Converts {@link body} to UTF-8 {@link string}.
         * @returns { string | null } Returns UTF-8 string or {@link null} if {@link body} is not in UTF-8 format.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        toString(): string | null;
        /**
         * Return result of JSON deserialization of {@link toString()}.
         * @returns { object | null } Returns {@link JSON.parse} with parameter {@link toString()} if no exception.
         * Returns null in case of any exception occurred.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        toJSON(): object | null;
    }
    /**
     * HTTP response debug event type.
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type DebugEvent = 'text' | 'headerIn' | 'headerOut' | 'dataIn' | 'dataOut' | 'sslDataIn' | 'sslDataOut';
    /**
     * HTTP response timing information. It will be collected in {@link Response.timeInfo} and
     * {@link TracingConfiguration.collectTimeInfo} decides whether to collect it.
     * @typedef TimeInfo
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface TimeInfo {
        /**
         * The time in milliseconds from the start until the remote host name was resolved.
         * @type {number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        nameLookupTimeMs: number;
        /**
         * The time in milliseconds from the start until the connection to the remote host (or proxy) was completed.
         * @type {number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        connectTimeMs: number;
        /**
         * The time in milliseconds from the start until the TLS handshake to the remote host (or proxy) was completed.
         * @type {number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        tlsHandshakeTimeMs: number;
        /**
         * The time in milliseconds, it took from the start until the transfer is just about to begin.
         * @type {number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        preTransferTimeMs: number;
        /**
         * The time in milliseconds, it took from the start until the first byte is received.
         * @type {number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        startTransferTimeMs: number;
        /**
         * The total time in milliseconds for the HTTP transfer, including name resolving, TCP connect etc.
         * @type {number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        totalTimeMs: number;
        /**
         * The time in milliseconds it took for all redirection steps including name lookup, connect,
         * pre transfer and transfer.
         * before final transaction was started.
         * @type {number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        redirectTimeMs: number;
    }
    /**
     * HTTP response cookies. See {@link Response.cookies}.
     * @typedef ResponseCookie
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface ResponseCookie {
        /**
         * Response cookie name.
         * @type {string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        name: string;
        /**
         * Response cookie value.
         * @type {?string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        value?: string;
        /**
         * Response cookie domain attribute.
         * @type {?string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        domain?: string;
        /**
         * Response cookie path attribute.
         * @type {?string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        path?: string;
        /**
         * Response cookie expires attribute.
         * @type {?string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        expires?: string;
        /**
         * Response cookie maxAge attribute.
         * @type {?number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        maxAge?: number;
        /**
         * Response cookie Secure attribute.
         * @type {?true}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        isSecure?: true;
        /**
         * Response cookie httpOnly attribute.
         * @type {?true}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        httpOnly?: true;
        /**
         * Response cookie sameSite attribute.
         * @type {?string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        sameSite?: string;
        /**
         * Raw size of this response cookie.
         * Response cookie comes from 'Set-Cookies' header.
         * For example, header is {'Set-Cookies': 'my-cookie=my-value'},
         * so rawSize is equal to 'my-cookie=my-value' string length.
         * @type {?number}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        rawSize?: number;
        /**
         * All attributes in the response cookie.
         * @type {?CookieAttributes}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        cookieAttributes?: CookieAttributes;
    }
    /**
     * Response cooke attributes. See {@link ResponseCookie.cookieAttributes}.
     * @typedef CookieAttributes
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export type CookieAttributes = {
        [k: string]: string | undefined;
    };
    /**
     * Session is a main object to send HTTP requests.
     * @typedef Session
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface Session {
        /**
         * An unique id of {@link Session}.
         * @type {string}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        readonly id: string;
        /**
         * Configuration of {@link Session}.
         * @type {SessionConfiguration | undefined}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        readonly configuration: SessionConfiguration | undefined;
        /**
         * Send an HTTP request and get HTTP response.
         * Need ohos.permission.GET_NETWORK_INFO If you want to use 'cellular' of {@link PathPreference}.
         * @permission ohos.permission.INTERNET
         * @param { Request } request - An {@link Request} object.
         * @returns { Promise<Response> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1007900001 - Unsupported protocol.
         * @throws { BusinessError } 1007900003 - URL using bad/illegal format or missing URL.
         * @throws { BusinessError } 1007900005 - Couldn't resolve proxy name.
         * @throws { BusinessError } 1007900006 - Couldn't resolve host name.
         * @throws { BusinessError } 1007900007 - Couldn't connect to server.
         * @throws { BusinessError } 1007900008 - Weird server reply.
         * @throws { BusinessError } 1007900009 - Access denied to remote resource.
         * @throws { BusinessError } 1007900016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 1007900018 - Transferred a partial file.
         * @throws { BusinessError } 1007900025 - Upload failed.
         * @throws { BusinessError } 1007900026 - Failed to open/read local data from file/application.
         * @throws { BusinessError } 1007900027 - Out of memory.
         * @throws { BusinessError } 1007900028 - Timeout was reached.
         * @throws { BusinessError } 1007900047 - Number of redirects hit maximum amount.
         * @throws { BusinessError } 1007900052 - Server returned nothing (no headers, no data).
         * @throws { BusinessError } 1007900055 - Failed sending data to the peer.
         * @throws { BusinessError } 1007900056 - Failure when receiving data from the peer.
         * @throws { BusinessError } 1007900058 - Problem with the local SSL certificate.
         * @throws { BusinessError } 1007900059 - Couldn't use specified SSL cipher.
         * @throws { BusinessError } 1007900060 - SSL peer certificate or SSH remote key was not OK.
         * @throws { BusinessError } 1007900061 - Unrecognized or bad HTTP Content or Transfer-Encoding.
         * @throws { BusinessError } 1007900063 - Maximum file size exceeded.
         * @throws { BusinessError } 1007900070 - Disk full or allocation exceeded.
         * @throws { BusinessError } 1007900073 - Remote file already exists.
         * @throws { BusinessError } 1007900077 - Problem with the SSL CA cert (path? access rights?).
         * @throws { BusinessError } 1007900078 - Remote file not found.
         * @throws { BusinessError } 1007900094 - An authentication function returned an error.
         * @throws { BusinessError } 1007900999 - Internal Error.
         * @throws { BusinessError } 1007900998 - Method not supported.
         * @throws { BusinessError } 1007900997 - Invalid content type.
         * @throws { BusinessError } 1007900996 - Proxy type not supported.
         * @throws { BusinessError } 1007900995 - Get system proxy failed.
         * @throws { BusinessError } 1007900993 - Session is closed.
         * @throws { BusinessError } 1007900992 - Request is canceled.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        fetch(request: Request): Promise<Response>;
        /**
         * Send an HTTP GET request with specified URL and get HTTP response.
         * We will create a {@link Request} and call fetch.
         * No content will be set into the {@link Request}. Use {@link SessionConfiguration.headers} as its
         * {@link Request.headers}, use {@link SessionConfiguration.cookies} as its {@link Request.cookies}.
         * Need ohos.permission.GET_NETWORK_INFO If you want to use 'cellular' of {@link PathPreference}.
         * @permission ohos.permission.INTERNET
         * @param { URLOrString } url - An HTTP URL.
         * @returns { Promise<Response> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1007900001 - Unsupported protocol.
         * @throws { BusinessError } 1007900003 - URL using bad/illegal format or missing URL.
         * @throws { BusinessError } 1007900005 - Couldn't resolve proxy name.
         * @throws { BusinessError } 1007900006 - Couldn't resolve host name.
         * @throws { BusinessError } 1007900007 - Couldn't connect to server.
         * @throws { BusinessError } 1007900008 - Weird server reply.
         * @throws { BusinessError } 1007900009 - Access denied to remote resource.
         * @throws { BusinessError } 1007900016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 1007900018 - Transferred a partial file.
         * @throws { BusinessError } 1007900025 - Upload failed.
         * @throws { BusinessError } 1007900026 - Failed to open/read local data from file/application.
         * @throws { BusinessError } 1007900027 - Out of memory.
         * @throws { BusinessError } 1007900028 - Timeout was reached.
         * @throws { BusinessError } 1007900047 - Number of redirects hit maximum amount.
         * @throws { BusinessError } 1007900052 - Server returned nothing (no headers, no data).
         * @throws { BusinessError } 1007900055 - Failed sending data to the peer.
         * @throws { BusinessError } 1007900056 - Failure when receiving data from the peer.
         * @throws { BusinessError } 1007900058 - Problem with the local SSL certificate.
         * @throws { BusinessError } 1007900059 - Couldn't use specified SSL cipher.
         * @throws { BusinessError } 1007900060 - SSL peer certificate or SSH remote key was not OK.
         * @throws { BusinessError } 1007900061 - Unrecognized or bad HTTP Content or Transfer-Encoding.
         * @throws { BusinessError } 1007900063 - Maximum file size exceeded.
         * @throws { BusinessError } 1007900070 - Disk full or allocation exceeded.
         * @throws { BusinessError } 1007900073 - Remote file already exists.
         * @throws { BusinessError } 1007900077 - Problem with the SSL CA cert (path? access rights?).
         * @throws { BusinessError } 1007900078 - Remote file not found.
         * @throws { BusinessError } 1007900094 - An authentication function returned an error.
         * @throws { BusinessError } 1007900999 - Internal Error.
         * @throws { BusinessError } 1007900998 - Method not supported.
         * @throws { BusinessError } 1007900997 - Invalid content type.
         * @throws { BusinessError } 1007900996 - Proxy type not supported.
         * @throws { BusinessError } 1007900995 - Get system proxy failed.
         * @throws { BusinessError } 1007900993 - Session is closed.
         * @throws { BusinessError } 1007900992 - Request is canceled.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        /**
         * Send an HTTP GET request with specified URL and get HTTP response.
         * We will create a {@link Request} and call fetch.
         * No content will be set into the {@link Request}. Use {@link SessionConfiguration.headers} as its
         * {@link Request.headers}, use {@link SessionConfiguration.cookies} as its {@link Request.cookies}.
         * Need ohos.permission.GET_NETWORK_INFO If you want to use 'cellular' of {@link PathPreference}.
         * @permission ohos.permission.INTERNET
         * @param { URLOrString } url - An HTTP URL.
         * @param { ResponseBodyDestination } destination - Response destination.
         * @returns { Promise<Response> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1007900001 - Unsupported protocol.
         * @throws { BusinessError } 1007900003 - URL using bad/illegal format or missing URL.
         * @throws { BusinessError } 1007900005 - Couldn't resolve proxy name.
         * @throws { BusinessError } 1007900006 - Couldn't resolve host name.
         * @throws { BusinessError } 1007900007 - Couldn't connect to server.
         * @throws { BusinessError } 1007900008 - Weird server reply.
         * @throws { BusinessError } 1007900009 - Access denied to remote resource.
         * @throws { BusinessError } 1007900016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 1007900018 - Transferred a partial file.
         * @throws { BusinessError } 1007900025 - Upload failed.
         * @throws { BusinessError } 1007900026 - Failed to open/read local data from file/application.
         * @throws { BusinessError } 1007900027 - Out of memory.
         * @throws { BusinessError } 1007900028 - Timeout was reached.
         * @throws { BusinessError } 1007900047 - Number of redirects hit maximum amount.
         * @throws { BusinessError } 1007900052 - Server returned nothing (no headers, no data).
         * @throws { BusinessError } 1007900055 - Failed sending data to the peer.
         * @throws { BusinessError } 1007900056 - Failure when receiving data from the peer.
         * @throws { BusinessError } 1007900058 - Problem with the local SSL certificate.
         * @throws { BusinessError } 1007900059 - Couldn't use specified SSL cipher.
         * @throws { BusinessError } 1007900060 - SSL peer certificate or SSH remote key was not OK.
         * @throws { BusinessError } 1007900061 - Unrecognized or bad HTTP Content or Transfer-Encoding.
         * @throws { BusinessError } 1007900063 - Maximum file size exceeded.
         * @throws { BusinessError } 1007900070 - Disk full or allocation exceeded.
         * @throws { BusinessError } 1007900073 - Remote file already exists.
         * @throws { BusinessError } 1007900077 - Problem with the SSL CA cert (path? access rights?).
         * @throws { BusinessError } 1007900078 - Remote file not found.
         * @throws { BusinessError } 1007900094 - An authentication function returned an error.
         * @throws { BusinessError } 1007900999 - Internal Error.
         * @throws { BusinessError } 1007900998 - Method not supported.
         * @throws { BusinessError } 1007900997 - Invalid content type.
         * @throws { BusinessError } 1007900996 - Proxy type not supported.
         * @throws { BusinessError } 1007900995 - Get system proxy failed.
         * @throws { BusinessError } 1007900993 - Session is closed.
         * @throws { BusinessError } 1007900992 - Request is canceled.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        get(url: URLOrString, destination?: ResponseBodyDestination): Promise<Response>;
        /**
         * Send an HTTP POST request with specified URL and content, and get HTTP response.
         * We will create a {@link Request} and call fetch.
         * Use {@link SessionConfiguration.headers} as its {@link Request.headers},
         * use {@link SessionConfiguration.cookies} as its {@link Request.cookies}.
         * Need ohos.permission.GET_NETWORK_INFO If you want to use 'cellular' of {@link PathPreference}.
         * @permission ohos.permission.INTERNET
         * @param { URLOrString } url - An HTTP URL.
         * @param { RequestContent } content - An HTTP body.
         * @returns { Promise<Response> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1007900001 - Unsupported protocol.
         * @throws { BusinessError } 1007900003 - URL using bad/illegal format or missing URL.
         * @throws { BusinessError } 1007900005 - Couldn't resolve proxy name.
         * @throws { BusinessError } 1007900006 - Couldn't resolve host name.
         * @throws { BusinessError } 1007900007 - Couldn't connect to server.
         * @throws { BusinessError } 1007900008 - Weird server reply.
         * @throws { BusinessError } 1007900009 - Access denied to remote resource.
         * @throws { BusinessError } 1007900016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 1007900018 - Transferred a partial file.
         * @throws { BusinessError } 1007900025 - Upload failed.
         * @throws { BusinessError } 1007900026 - Failed to open/read local data from file/application.
         * @throws { BusinessError } 1007900027 - Out of memory.
         * @throws { BusinessError } 1007900028 - Timeout was reached.
         * @throws { BusinessError } 1007900047 - Number of redirects hit maximum amount.
         * @throws { BusinessError } 1007900052 - Server returned nothing (no headers, no data).
         * @throws { BusinessError } 1007900055 - Failed sending data to the peer.
         * @throws { BusinessError } 1007900056 - Failure when receiving data from the peer.
         * @throws { BusinessError } 1007900058 - Problem with the local SSL certificate.
         * @throws { BusinessError } 1007900059 - Couldn't use specified SSL cipher.
         * @throws { BusinessError } 1007900060 - SSL peer certificate or SSH remote key was not OK.
         * @throws { BusinessError } 1007900061 - Unrecognized or bad HTTP Content or Transfer-Encoding.
         * @throws { BusinessError } 1007900063 - Maximum file size exceeded.
         * @throws { BusinessError } 1007900070 - Disk full or allocation exceeded.
         * @throws { BusinessError } 1007900073 - Remote file already exists.
         * @throws { BusinessError } 1007900077 - Problem with the SSL CA cert (path? access rights?).
         * @throws { BusinessError } 1007900078 - Remote file not found.
         * @throws { BusinessError } 1007900094 - An authentication function returned an error.
         * @throws { BusinessError } 1007900999 - Internal Error.
         * @throws { BusinessError } 1007900998 - Method not supported.
         * @throws { BusinessError } 1007900997 - Invalid content type.
         * @throws { BusinessError } 1007900996 - Proxy type not supported.
         * @throws { BusinessError } 1007900995 - Get system proxy failed.
         * @throws { BusinessError } 1007900993 - Session is closed.
         * @throws { BusinessError } 1007900992 - Request is canceled.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        /**
         * Send an HTTP POST request with specified URL and content, and get HTTP response.
         * We will create a {@link Request} and call fetch.
         * Use {@link SessionConfiguration.headers} as its {@link Request.headers},
         * use {@link SessionConfiguration.cookies} as its {@link Request.cookies}.
         * Need ohos.permission.GET_NETWORK_INFO If you want to use 'cellular' of {@link PathPreference}.
         * @permission ohos.permission.INTERNET
         * @param { URLOrString } url - An HTTP URL.
         * @param { RequestContent } content - An HTTP body.
         * @param { ResponseBodyDestination } destination - Response destination.
         * @returns { Promise<Response> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1007900001 - Unsupported protocol.
         * @throws { BusinessError } 1007900003 - URL using bad/illegal format or missing URL.
         * @throws { BusinessError } 1007900005 - Couldn't resolve proxy name.
         * @throws { BusinessError } 1007900006 - Couldn't resolve host name.
         * @throws { BusinessError } 1007900007 - Couldn't connect to server.
         * @throws { BusinessError } 1007900008 - Weird server reply.
         * @throws { BusinessError } 1007900009 - Access denied to remote resource.
         * @throws { BusinessError } 1007900016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 1007900018 - Transferred a partial file.
         * @throws { BusinessError } 1007900025 - Upload failed.
         * @throws { BusinessError } 1007900026 - Failed to open/read local data from file/application.
         * @throws { BusinessError } 1007900027 - Out of memory.
         * @throws { BusinessError } 1007900028 - Timeout was reached.
         * @throws { BusinessError } 1007900047 - Number of redirects hit maximum amount.
         * @throws { BusinessError } 1007900052 - Server returned nothing (no headers, no data).
         * @throws { BusinessError } 1007900055 - Failed sending data to the peer.
         * @throws { BusinessError } 1007900056 - Failure when receiving data from the peer.
         * @throws { BusinessError } 1007900058 - Problem with the local SSL certificate.
         * @throws { BusinessError } 1007900059 - Couldn't use specified SSL cipher.
         * @throws { BusinessError } 1007900060 - SSL peer certificate or SSH remote key was not OK.
         * @throws { BusinessError } 1007900061 - Unrecognized or bad HTTP Content or Transfer-Encoding.
         * @throws { BusinessError } 1007900063 - Maximum file size exceeded.
         * @throws { BusinessError } 1007900070 - Disk full or allocation exceeded.
         * @throws { BusinessError } 1007900073 - Remote file already exists.
         * @throws { BusinessError } 1007900077 - Problem with the SSL CA cert (path? access rights?).
         * @throws { BusinessError } 1007900078 - Remote file not found.
         * @throws { BusinessError } 1007900094 - An authentication function returned an error.
         * @throws { BusinessError } 1007900999 - Internal Error.
         * @throws { BusinessError } 1007900998 - Method not supported.
         * @throws { BusinessError } 1007900997 - Invalid content type.
         * @throws { BusinessError } 1007900996 - Proxy type not supported.
         * @throws { BusinessError } 1007900995 - Get system proxy failed.
         * @throws { BusinessError } 1007900993 - Session is closed.
         * @throws { BusinessError } 1007900992 - Request is canceled.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        post(url: URLOrString, content?: RequestContent, destination?: ResponseBodyDestination): Promise<Response>;
        /**
         * Send an HTTP PUT request with specified URL and content, and get HTTP response.
         * We will create a {@link Request} and call fetch.
         * Use {@link SessionConfiguration.headers} as its {@link Request.headers},
         * use {@link SessionConfiguration.cookies} as its {@link Request.cookies}.
         * Need ohos.permission.GET_NETWORK_INFO If you want to use 'cellular' of {@link PathPreference}.
         * @permission ohos.permission.INTERNET
         * @param { URLOrString } url - An HTTP URL.
         * @param { RequestContent } content - An HTTP body.
         * @returns { Promise<Response> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1007900001 - Unsupported protocol.
         * @throws { BusinessError } 1007900003 - URL using bad/illegal format or missing URL.
         * @throws { BusinessError } 1007900005 - Couldn't resolve proxy name.
         * @throws { BusinessError } 1007900006 - Couldn't resolve host name.
         * @throws { BusinessError } 1007900007 - Couldn't connect to server.
         * @throws { BusinessError } 1007900008 - Weird server reply.
         * @throws { BusinessError } 1007900009 - Access denied to remote resource.
         * @throws { BusinessError } 1007900016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 1007900018 - Transferred a partial file.
         * @throws { BusinessError } 1007900025 - Upload failed.
         * @throws { BusinessError } 1007900026 - Failed to open/read local data from file/application.
         * @throws { BusinessError } 1007900027 - Out of memory.
         * @throws { BusinessError } 1007900028 - Timeout was reached.
         * @throws { BusinessError } 1007900047 - Number of redirects hit maximum amount.
         * @throws { BusinessError } 1007900052 - Server returned nothing (no headers, no data).
         * @throws { BusinessError } 1007900055 - Failed sending data to the peer.
         * @throws { BusinessError } 1007900056 - Failure when receiving data from the peer.
         * @throws { BusinessError } 1007900058 - Problem with the local SSL certificate.
         * @throws { BusinessError } 1007900059 - Couldn't use specified SSL cipher.
         * @throws { BusinessError } 1007900060 - SSL peer certificate or SSH remote key was not OK.
         * @throws { BusinessError } 1007900061 - Unrecognized or bad HTTP Content or Transfer-Encoding.
         * @throws { BusinessError } 1007900063 - Maximum file size exceeded.
         * @throws { BusinessError } 1007900070 - Disk full or allocation exceeded.
         * @throws { BusinessError } 1007900073 - Remote file already exists.
         * @throws { BusinessError } 1007900077 - Problem with the SSL CA cert (path? access rights?).
         * @throws { BusinessError } 1007900078 - Remote file not found.
         * @throws { BusinessError } 1007900094 - An authentication function returned an error.
         * @throws { BusinessError } 1007900999 - Internal Error.
         * @throws { BusinessError } 1007900998 - Method not supported.
         * @throws { BusinessError } 1007900997 - Invalid content type.
         * @throws { BusinessError } 1007900996 - Proxy type not supported.
         * @throws { BusinessError } 1007900995 - Get system proxy failed.
         * @throws { BusinessError } 1007900993 - Session is closed.
         * @throws { BusinessError } 1007900992 - Request is canceled.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        /**
         * Send an HTTP PUT request with specified URL and content, and get HTTP response.
         * We will create a {@link Request} and call fetch.
         * Use {@link SessionConfiguration.headers} as its {@link Request.headers},
         * use {@link SessionConfiguration.cookies} as its {@link Request.cookies}.
         * Need ohos.permission.GET_NETWORK_INFO If you want to use 'cellular' of {@link PathPreference}.
         * @permission ohos.permission.INTERNET
         * @param { URLOrString } url - An HTTP URL.
         * @param { RequestContent } content - An HTTP body.
         * @param { ResponseBodyDestination } destination - Response destination.
         * @returns { Promise<Response> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1007900001 - Unsupported protocol.
         * @throws { BusinessError } 1007900003 - URL using bad/illegal format or missing URL.
         * @throws { BusinessError } 1007900005 - Couldn't resolve proxy name.
         * @throws { BusinessError } 1007900006 - Couldn't resolve host name.
         * @throws { BusinessError } 1007900007 - Couldn't connect to server.
         * @throws { BusinessError } 1007900008 - Weird server reply.
         * @throws { BusinessError } 1007900009 - Access denied to remote resource.
         * @throws { BusinessError } 1007900016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 1007900018 - Transferred a partial file.
         * @throws { BusinessError } 1007900025 - Upload failed.
         * @throws { BusinessError } 1007900026 - Failed to open/read local data from file/application.
         * @throws { BusinessError } 1007900027 - Out of memory.
         * @throws { BusinessError } 1007900028 - Timeout was reached.
         * @throws { BusinessError } 1007900047 - Number of redirects hit maximum amount.
         * @throws { BusinessError } 1007900052 - Server returned nothing (no headers, no data).
         * @throws { BusinessError } 1007900055 - Failed sending data to the peer.
         * @throws { BusinessError } 1007900056 - Failure when receiving data from the peer.
         * @throws { BusinessError } 1007900058 - Problem with the local SSL certificate.
         * @throws { BusinessError } 1007900059 - Couldn't use specified SSL cipher.
         * @throws { BusinessError } 1007900060 - SSL peer certificate or SSH remote key was not OK.
         * @throws { BusinessError } 1007900061 - Unrecognized or bad HTTP Content or Transfer-Encoding.
         * @throws { BusinessError } 1007900063 - Maximum file size exceeded.
         * @throws { BusinessError } 1007900070 - Disk full or allocation exceeded.
         * @throws { BusinessError } 1007900073 - Remote file already exists.
         * @throws { BusinessError } 1007900077 - Problem with the SSL CA cert (path? access rights?).
         * @throws { BusinessError } 1007900078 - Remote file not found.
         * @throws { BusinessError } 1007900094 - An authentication function returned an error.
         * @throws { BusinessError } 1007900999 - Internal Error.
         * @throws { BusinessError } 1007900998 - Method not supported.
         * @throws { BusinessError } 1007900997 - Invalid content type.
         * @throws { BusinessError } 1007900996 - Proxy type not supported.
         * @throws { BusinessError } 1007900995 - Get system proxy failed.
         * @throws { BusinessError } 1007900993 - Session is closed.
         * @throws { BusinessError } 1007900992 - Request is canceled.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        put(url: URLOrString, content?: RequestContent, destination?: ResponseBodyDestination): Promise<Response>;
        /**
         * Download to a file.
         * We will create a {@link Request} and call fetch.
         * Use {@link SessionConfiguration.headers} as its {@link Request.headers},
         * use {@link SessionConfiguration.cookies} as its {@link Request.cookies}.
         * Need ohos.permission.GET_NETWORK_INFO If you want to use 'cellular' of {@link PathPreference}.
         * @permission ohos.permission.INTERNET
         * @param { URLOrString } url - An HTTP URL.
         * @param { DownloadToFile } downloadTo - Download to a file.
         * @returns { Promise<Response> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1007900001 - Unsupported protocol.
         * @throws { BusinessError } 1007900003 - URL using bad/illegal format or missing URL.
         * @throws { BusinessError } 1007900005 - Couldn't resolve proxy name.
         * @throws { BusinessError } 1007900006 - Couldn't resolve host name.
         * @throws { BusinessError } 1007900007 - Couldn't connect to server.
         * @throws { BusinessError } 1007900008 - Weird server reply.
         * @throws { BusinessError } 1007900009 - Access denied to remote resource.
         * @throws { BusinessError } 1007900016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 1007900018 - Transferred a partial file.
         * @throws { BusinessError } 1007900025 - Upload failed.
         * @throws { BusinessError } 1007900026 - Failed to open/read local data from file/application.
         * @throws { BusinessError } 1007900027 - Out of memory.
         * @throws { BusinessError } 1007900028 - Timeout was reached.
         * @throws { BusinessError } 1007900047 - Number of redirects hit maximum amount.
         * @throws { BusinessError } 1007900052 - Server returned nothing (no headers, no data).
         * @throws { BusinessError } 1007900055 - Failed sending data to the peer.
         * @throws { BusinessError } 1007900056 - Failure when receiving data from the peer.
         * @throws { BusinessError } 1007900058 - Problem with the local SSL certificate.
         * @throws { BusinessError } 1007900059 - Couldn't use specified SSL cipher.
         * @throws { BusinessError } 1007900060 - SSL peer certificate or SSH remote key was not OK.
         * @throws { BusinessError } 1007900061 - Unrecognized or bad HTTP Content or Transfer-Encoding.
         * @throws { BusinessError } 1007900063 - Maximum file size exceeded.
         * @throws { BusinessError } 1007900070 - Disk full or allocation exceeded.
         * @throws { BusinessError } 1007900073 - Remote file already exists.
         * @throws { BusinessError } 1007900077 - Problem with the SSL CA cert (path? access rights?).
         * @throws { BusinessError } 1007900078 - Remote file not found.
         * @throws { BusinessError } 1007900094 - An authentication function returned an error.
         * @throws { BusinessError } 1007900999 - Internal Error.
         * @throws { BusinessError } 1007900998 - Method not supported.
         * @throws { BusinessError } 1007900997 - Invalid content type.
         * @throws { BusinessError } 1007900996 - Proxy type not supported.
         * @throws { BusinessError } 1007900995 - Get system proxy failed.
         * @throws { BusinessError } 1007900993 - Session is closed.
         * @throws { BusinessError } 1007900992 - Request is canceled.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        downloadToFile(url: URLOrString, downloadTo: DownloadToFile): Promise<Response>;
        /**
         * Upload from a file.
         * We will create a {@link Request} and call fetch.
         * Use {@link SessionConfiguration.headers} as its {@link Request.headers},
         * use {@link SessionConfiguration.cookies} as its {@link Request.cookies}.
         * Need ohos.permission.GET_NETWORK_INFO If you want to use 'cellular' of {@link PathPreference}.
         * @permission ohos.permission.INTERNET
         * @param { URLOrString } url - An HTTP URL.
         * @param { UploadFromFile } uploadFrom - Upload from a file.
         * @returns { Promise<Response> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1007900001 - Unsupported protocol.
         * @throws { BusinessError } 1007900003 - URL using bad/illegal format or missing URL.
         * @throws { BusinessError } 1007900005 - Couldn't resolve proxy name.
         * @throws { BusinessError } 1007900006 - Couldn't resolve host name.
         * @throws { BusinessError } 1007900007 - Couldn't connect to server.
         * @throws { BusinessError } 1007900008 - Weird server reply.
         * @throws { BusinessError } 1007900009 - Access denied to remote resource.
         * @throws { BusinessError } 1007900016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 1007900018 - Transferred a partial file.
         * @throws { BusinessError } 1007900025 - Upload failed.
         * @throws { BusinessError } 1007900026 - Failed to open/read local data from file/application.
         * @throws { BusinessError } 1007900027 - Out of memory.
         * @throws { BusinessError } 1007900028 - Timeout was reached.
         * @throws { BusinessError } 1007900047 - Number of redirects hit maximum amount.
         * @throws { BusinessError } 1007900052 - Server returned nothing (no headers, no data).
         * @throws { BusinessError } 1007900055 - Failed sending data to the peer.
         * @throws { BusinessError } 1007900056 - Failure when receiving data from the peer.
         * @throws { BusinessError } 1007900058 - Problem with the local SSL certificate.
         * @throws { BusinessError } 1007900059 - Couldn't use specified SSL cipher.
         * @throws { BusinessError } 1007900060 - SSL peer certificate or SSH remote key was not OK.
         * @throws { BusinessError } 1007900061 - Unrecognized or bad HTTP Content or Transfer-Encoding.
         * @throws { BusinessError } 1007900063 - Maximum file size exceeded.
         * @throws { BusinessError } 1007900070 - Disk full or allocation exceeded.
         * @throws { BusinessError } 1007900073 - Remote file already exists.
         * @throws { BusinessError } 1007900077 - Problem with the SSL CA cert (path? access rights?).
         * @throws { BusinessError } 1007900078 - Remote file not found.
         * @throws { BusinessError } 1007900094 - An authentication function returned an error.
         * @throws { BusinessError } 1007900999 - Internal Error.
         * @throws { BusinessError } 1007900998 - Method not supported.
         * @throws { BusinessError } 1007900997 - Invalid content type.
         * @throws { BusinessError } 1007900996 - Proxy type not supported.
         * @throws { BusinessError } 1007900995 - Get system proxy failed.
         * @throws { BusinessError } 1007900993 - Session is closed.
         * @throws { BusinessError } 1007900992 - Request is canceled.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        uploadFromFile(url: URLOrString, uploadFrom: UploadFromFile): Promise<Response>;
        /**
         * Download to a stream.
         * We will create a {@link Request} and call fetch.
         * Use {@link SessionConfiguration.headers} as its {@link Request.headers},
         * use {@link SessionConfiguration.cookies} as its {@link Request.cookies}.
         * Need ohos.permission.GET_NETWORK_INFO If you want to use 'cellular' of {@link PathPreference}.
         * @permission ohos.permission.INTERNET
         * @param { URLOrString } url - An HTTP URL.
         * @param { DownloadToStream } downloadTo - Download to a stream.
         * @returns { Promise<Response> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1007900001 - Unsupported protocol.
         * @throws { BusinessError } 1007900003 - URL using bad/illegal format or missing URL.
         * @throws { BusinessError } 1007900005 - Couldn't resolve proxy name.
         * @throws { BusinessError } 1007900006 - Couldn't resolve host name.
         * @throws { BusinessError } 1007900007 - Couldn't connect to server.
         * @throws { BusinessError } 1007900008 - Weird server reply.
         * @throws { BusinessError } 1007900009 - Access denied to remote resource.
         * @throws { BusinessError } 1007900016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 1007900018 - Transferred a partial file.
         * @throws { BusinessError } 1007900025 - Upload failed.
         * @throws { BusinessError } 1007900026 - Failed to open/read local data from file/application.
         * @throws { BusinessError } 1007900027 - Out of memory.
         * @throws { BusinessError } 1007900028 - Timeout was reached.
         * @throws { BusinessError } 1007900047 - Number of redirects hit maximum amount.
         * @throws { BusinessError } 1007900052 - Server returned nothing (no headers, no data).
         * @throws { BusinessError } 1007900055 - Failed sending data to the peer.
         * @throws { BusinessError } 1007900056 - Failure when receiving data from the peer.
         * @throws { BusinessError } 1007900058 - Problem with the local SSL certificate.
         * @throws { BusinessError } 1007900059 - Couldn't use specified SSL cipher.
         * @throws { BusinessError } 1007900060 - SSL peer certificate or SSH remote key was not OK.
         * @throws { BusinessError } 1007900061 - Unrecognized or bad HTTP Content or Transfer-Encoding.
         * @throws { BusinessError } 1007900063 - Maximum file size exceeded.
         * @throws { BusinessError } 1007900070 - Disk full or allocation exceeded.
         * @throws { BusinessError } 1007900073 - Remote file already exists.
         * @throws { BusinessError } 1007900077 - Problem with the SSL CA cert (path? access rights?).
         * @throws { BusinessError } 1007900078 - Remote file not found.
         * @throws { BusinessError } 1007900094 - An authentication function returned an error.
         * @throws { BusinessError } 1007900999 - Internal Error.
         * @throws { BusinessError } 1007900998 - Method not supported.
         * @throws { BusinessError } 1007900997 - Invalid content type.
         * @throws { BusinessError } 1007900996 - Proxy type not supported.
         * @throws { BusinessError } 1007900995 - Get system proxy failed.
         * @throws { BusinessError } 1007900993 - Session is closed.
         * @throws { BusinessError } 1007900992 - Request is canceled.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        downloadToStream(url: URLOrString, downloadTo: DownloadToStream): Promise<Response>;
        /**
         * Upload from a stream.
         * We will create a {@link Request} and call fetch.
         * Use {@link SessionConfiguration.headers} as its {@link Request.headers},
         * use {@link SessionConfiguration.cookies} as its {@link Request.cookies}.
         * Need ohos.permission.GET_NETWORK_INFO If you want to use 'cellular' of {@link PathPreference}.
         * @permission ohos.permission.INTERNET
         * @param { URLOrString } url - An HTTP URL.
         * @param { UploadFromStream } uploadFrom - Upload from a stream.
         * @returns { Promise<Response> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1007900001 - Unsupported protocol.
         * @throws { BusinessError } 1007900003 - URL using bad/illegal format or missing URL.
         * @throws { BusinessError } 1007900005 - Couldn't resolve proxy name.
         * @throws { BusinessError } 1007900006 - Couldn't resolve host name.
         * @throws { BusinessError } 1007900007 - Couldn't connect to server.
         * @throws { BusinessError } 1007900008 - Weird server reply.
         * @throws { BusinessError } 1007900009 - Access denied to remote resource.
         * @throws { BusinessError } 1007900016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 1007900018 - Transferred a partial file.
         * @throws { BusinessError } 1007900025 - Upload failed.
         * @throws { BusinessError } 1007900026 - Failed to open/read local data from file/application.
         * @throws { BusinessError } 1007900027 - Out of memory.
         * @throws { BusinessError } 1007900028 - Timeout was reached.
         * @throws { BusinessError } 1007900047 - Number of redirects hit maximum amount.
         * @throws { BusinessError } 1007900052 - Server returned nothing (no headers, no data).
         * @throws { BusinessError } 1007900055 - Failed sending data to the peer.
         * @throws { BusinessError } 1007900056 - Failure when receiving data from the peer.
         * @throws { BusinessError } 1007900058 - Problem with the local SSL certificate.
         * @throws { BusinessError } 1007900059 - Couldn't use specified SSL cipher.
         * @throws { BusinessError } 1007900060 - SSL peer certificate or SSH remote key was not OK.
         * @throws { BusinessError } 1007900061 - Unrecognized or bad HTTP Content or Transfer-Encoding.
         * @throws { BusinessError } 1007900063 - Maximum file size exceeded.
         * @throws { BusinessError } 1007900070 - Disk full or allocation exceeded.
         * @throws { BusinessError } 1007900073 - Remote file already exists.
         * @throws { BusinessError } 1007900077 - Problem with the SSL CA cert (path? access rights?).
         * @throws { BusinessError } 1007900078 - Remote file not found.
         * @throws { BusinessError } 1007900094 - An authentication function returned an error.
         * @throws { BusinessError } 1007900999 - Internal Error.
         * @throws { BusinessError } 1007900998 - Method not supported.
         * @throws { BusinessError } 1007900997 - Invalid content type.
         * @throws { BusinessError } 1007900996 - Proxy type not supported.
         * @throws { BusinessError } 1007900995 - Get system proxy failed.
         * @throws { BusinessError } 1007900993 - Session is closed.
         * @throws { BusinessError } 1007900992 - Request is canceled.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        uploadFromStream(url: URLOrString, uploadFrom: UploadFromStream): Promise<Response>;
        /**
         * Send an HTTP HEAD request with specified URL and get HTTP response.
         * We will create a {@link Request} and call fetch.
         * No content will be set into the {@link Request}. Use {@link SessionConfiguration.headers} as its
         * {@link Request.headers}, use {@link SessionConfiguration.cookies} as its {@link Request.cookies}.
         * Need ohos.permission.GET_NETWORK_INFO If you want to use 'cellular' of {@link PathPreference}.
         * @permission ohos.permission.INTERNET
         * @param { URLOrString } url - An HTTP URL.
         * @returns { Promise<Response> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1007900001 - Unsupported protocol.
         * @throws { BusinessError } 1007900003 - URL using bad/illegal format or missing URL.
         * @throws { BusinessError } 1007900005 - Couldn't resolve proxy name.
         * @throws { BusinessError } 1007900006 - Couldn't resolve host name.
         * @throws { BusinessError } 1007900007 - Couldn't connect to server.
         * @throws { BusinessError } 1007900008 - Weird server reply.
         * @throws { BusinessError } 1007900009 - Access denied to remote resource.
         * @throws { BusinessError } 1007900016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 1007900018 - Transferred a partial file.
         * @throws { BusinessError } 1007900025 - Upload failed.
         * @throws { BusinessError } 1007900026 - Failed to open/read local data from file/application.
         * @throws { BusinessError } 1007900027 - Out of memory.
         * @throws { BusinessError } 1007900028 - Timeout was reached.
         * @throws { BusinessError } 1007900047 - Number of redirects hit maximum amount.
         * @throws { BusinessError } 1007900052 - Server returned nothing (no headers, no data).
         * @throws { BusinessError } 1007900055 - Failed sending data to the peer.
         * @throws { BusinessError } 1007900056 - Failure when receiving data from the peer.
         * @throws { BusinessError } 1007900058 - Problem with the local SSL certificate.
         * @throws { BusinessError } 1007900059 - Couldn't use specified SSL cipher.
         * @throws { BusinessError } 1007900060 - SSL peer certificate or SSH remote key was not OK.
         * @throws { BusinessError } 1007900061 - Unrecognized or bad HTTP Content or Transfer-Encoding.
         * @throws { BusinessError } 1007900063 - Maximum file size exceeded.
         * @throws { BusinessError } 1007900070 - Disk full or allocation exceeded.
         * @throws { BusinessError } 1007900073 - Remote file already exists.
         * @throws { BusinessError } 1007900077 - Problem with the SSL CA cert (path? access rights?).
         * @throws { BusinessError } 1007900078 - Remote file not found.
         * @throws { BusinessError } 1007900094 - An authentication function returned an error.
         * @throws { BusinessError } 1007900999 - Internal Error.
         * @throws { BusinessError } 1007900998 - Method not supported.
         * @throws { BusinessError } 1007900997 - Invalid content type.
         * @throws { BusinessError } 1007900996 - Proxy type not supported.
         * @throws { BusinessError } 1007900995 - Get system proxy failed.
         * @throws { BusinessError } 1007900993 - Session is closed.
         * @throws { BusinessError } 1007900992 - Request is canceled.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        head(url: URLOrString): Promise<Response>;
        /**
         * Send an HTTP DELETE request with specified URL and get HTTP response.
         * We will create a {@link Request} and call fetch.
         * No content will be set into the {@link Request}. Use {@link SessionConfiguration.headers} as its
         * {@link Request.headers}, use {@link SessionConfiguration.cookies} as its {@link Request.cookies}.
         * Need ohos.permission.GET_NETWORK_INFO If you want to use 'cellular' of {@link PathPreference}.
         * @permission ohos.permission.INTERNET
         * @param { URLOrString } url - An HTTP URL.
         * @returns { Promise<Response> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1007900001 - Unsupported protocol.
         * @throws { BusinessError } 1007900003 - URL using bad/illegal format or missing URL.
         * @throws { BusinessError } 1007900005 - Couldn't resolve proxy name.
         * @throws { BusinessError } 1007900006 - Couldn't resolve host name.
         * @throws { BusinessError } 1007900007 - Couldn't connect to server.
         * @throws { BusinessError } 1007900008 - Weird server reply.
         * @throws { BusinessError } 1007900009 - Access denied to remote resource.
         * @throws { BusinessError } 1007900016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 1007900018 - Transferred a partial file.
         * @throws { BusinessError } 1007900025 - Upload failed.
         * @throws { BusinessError } 1007900026 - Failed to open/read local data from file/application.
         * @throws { BusinessError } 1007900027 - Out of memory.
         * @throws { BusinessError } 1007900028 - Timeout was reached.
         * @throws { BusinessError } 1007900047 - Number of redirects hit maximum amount.
         * @throws { BusinessError } 1007900052 - Server returned nothing (no headers, no data).
         * @throws { BusinessError } 1007900055 - Failed sending data to the peer.
         * @throws { BusinessError } 1007900056 - Failure when receiving data from the peer.
         * @throws { BusinessError } 1007900058 - Problem with the local SSL certificate.
         * @throws { BusinessError } 1007900059 - Couldn't use specified SSL cipher.
         * @throws { BusinessError } 1007900060 - SSL peer certificate or SSH remote key was not OK.
         * @throws { BusinessError } 1007900061 - Unrecognized or bad HTTP Content or Transfer-Encoding.
         * @throws { BusinessError } 1007900063 - Maximum file size exceeded.
         * @throws { BusinessError } 1007900070 - Disk full or allocation exceeded.
         * @throws { BusinessError } 1007900073 - Remote file already exists.
         * @throws { BusinessError } 1007900077 - Problem with the SSL CA cert (path? access rights?).
         * @throws { BusinessError } 1007900078 - Remote file not found.
         * @throws { BusinessError } 1007900094 - An authentication function returned an error.
         * @throws { BusinessError } 1007900999 - Internal Error.
         * @throws { BusinessError } 1007900998 - Method not supported.
         * @throws { BusinessError } 1007900997 - Invalid content type.
         * @throws { BusinessError } 1007900996 - Proxy type not supported.
         * @throws { BusinessError } 1007900995 - Get system proxy failed.
         * @throws { BusinessError } 1007900993 - Session is closed.
         * @throws { BusinessError } 1007900992 - Request is canceled.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        delete(url: URLOrString): Promise<Response>;
        /**
         * Cancel a request or cancel some requests or cancel all requests.
         * @param { Request | Request[] } requestToCancel? - A request or some requests.
         * Undefined indicates all requests within this session.
         * @returns { void } Nothing should be returned.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        cancel(requestToCancel?: Request | Request[]): void;
        /**
         * Close a session. Closed session can not run requests.
         * @returns { void } Nothing should be returned.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        close(): void;
    }
    /**
     * Creates a session.
     * The maximum number of opened sessions {@link Session} is limited by the implementation.
     * @param { SessionConfiguration } sessionConfiguration? - Session configuration.
     * @returns { Session } Return an session with unique id.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1007900994 - Sessions number reached limit.
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export function createSession(sessionConfiguration?: SessionConfiguration): Session;
    /**
     * Listening to the {@link Session} close() or cancel() events. See {@link SessionConfiguration.sessionListener}.
     * @typedef SessionListener
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface SessionListener {
        /**
         * Callback called in case {@link Session} is canceled.
         * @type {?OnCanceled}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        onCanceled?: OnCanceled;
        /**
         * Callback called in case {@link Session} is closed.
         * @type {?OnClosed}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        onClosed?: OnClosed;
    }
    /**
     * Parameter of {@link Interceptor.intercept} and {@link RequestHandler.handle}.
     * @typedef RequestContext
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface RequestContext {
        /**
         * The request which you intercepted.
         * @type {Request}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        request: Request;
        /**
         * The session which keep the interceptor.
         * @type {Session}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        session: Session;
    }
    /**
     * Interceptor see {@link Session}.
     * @typedef Interceptor
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface Interceptor {
        /**
         * Intercept a {@link Request}, and return a {@link Response}.
         * @param { RequestContext } context the context which you intercepted.
         * @param { RequestHandler } next you can return a Promise<Response> directly,
         * or you can call the next interceptor.
         * @returns { Promise<Response> } you can return a Promise<Response> directly, or return the value from the next.
         * interceptor.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        intercept(context: RequestContext, next: RequestHandler): Promise<Response>;
    }
    /**
     * Interceptor handler {@link Interceptor}.
     * @typedef RequestHandler
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 5.0.0(12)
     */
    export interface RequestHandler {
        /**
         * Intercept a {@link Request}, and return a {@link Response}.
         * @param { RequestContext } context the context which you intercepted.
         * @returns { Promise<Response> } Our API will create a default handler for interceptors, so this is
         * just an interface.
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        handle(context: RequestContext): Promise<Response>;
    }
    /**
     * Session configuration. See {@link Session.configuration}.
     * @typedef SessionConfiguration
     * @syscap SystemCapability.Collaboration.RemoteCommunication
     * @since 4.1.0(11)
     */
    export interface SessionConfiguration {
        /**
         * Interceptors will be made into an interceptor chain.
         * Input: [A, B, C, D], made into A->B->C->D->defaultHandler.
         * @type {?Interceptor[]}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        interceptors?: Interceptor[];
        /**
         * Default request level configuration. The options can be overridden via {@link Request.configuration}.
         * @type {?Configuration}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        requestConfiguration?: Configuration;
        /**
         * Base URL prepended to {@link Request.url} if it's not an absolute URL.
         * For example, Request.url is '?name=value', baseAddress is 'https://example.com',
         * then the real URL becomes 'https://example.com?name=value' when request is sent to server.
         * @type {?URLOrString}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        baseAddress?: URLOrString;
        /**
         * If {@link Session.fetch} is called, but no {@link RequestHeaders} are in {@link Request},
         * {@link headers} will be the {@link Request.headers}.
         * @type {?RequestHeaders}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        headers?: RequestHeaders;
        /**
         * If {@link Session.fetch} is called, but no {@link RequestCookies} in {@link Request},
         * {@link cookies} will be the {@link Request.cookies}.
         * @type {?RequestCookies}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        cookies?: RequestCookies;
        /**
         * Listening to the {@link Session} close() or cancel() events. See {@link SessionListener}.
         * @type {?SessionListener}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 4.1.0(11)
         */
        sessionListener?: SessionListener;
        /**
         * Connection configuration. It's used to specify the maximum
         * number of simultaneous TCP connections allowed total in this session and allowed to a single host.
         * @type {?ConnectionConfiguration}
         * @syscap SystemCapability.Collaboration.RemoteCommunication
         * @since 5.0.0(12)
         */
        connectionConfiguration?: ConnectionConfiguration;
    }
}
export default rcp;
