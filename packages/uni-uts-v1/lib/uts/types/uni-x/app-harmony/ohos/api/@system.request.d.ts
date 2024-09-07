/*
 * Copyright (c) 2020 Huawei Device Co., Ltd.
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
 * @kit BasicServicesKit
 */
/**
 * @interface UploadResponse
 * @syscap SystemCapability.MiscServices.Upload
 * @since 3
 * @deprecated since 9
 * @useinstead ohos.request
 */
export interface UploadResponse {
    /**
     * Status code returned by the server.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    code: number;
    /**
     * Content returned by the server.
     * The value type is determined by the returned content.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    data: string;
    /**
     * Headers returned by the server.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    headers: Object;
}
/**
 * @interface DownloadResponse
 * @syscap SystemCapability.MiscServices.Download
 * @since 3
 * @deprecated since 9
 */
export interface DownloadResponse {
    /**
     * Download token, which is used to obtain the download status.
     *
     * @syscap SystemCapability.MiscServices.Download
     * @since 3
     * @deprecated since 9
     */
    token: string;
}
/**
 * @interface OnDownloadCompleteResponse
 * @syscap SystemCapability.MiscServices.Download
 * @since 3
 * @deprecated since 9
 */
export interface OnDownloadCompleteResponse {
    /**
     * URI of the download file.
     *
     * @syscap SystemCapability.MiscServices.Download
     * @since 3
     * @deprecated since 9
     */
    uri: string;
}
/**
 * @interface RequestFile
 * @syscap SystemCapability.MiscServices.Upload
 * @since 3
 * @deprecated since 9
 */
export interface RequestFile {
    /**
     * File name in the header when multipart is used.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    filename?: string;
    /**
     * Name of a form item when multipart is used. The default value is file.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    name?: string;
    /**
     * Local storage directory of a file.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    uri: string;
    /**
     * Type of the file content.
     * By default, the type is obtained based on the suffix of the file name or URI.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    type?: string;
}
/**
 * @interface RequestData
 * @syscap SystemCapability.MiscServices.Upload
 * @since 3
 * @deprecated since 9
 */
export interface RequestData {
    /**
     * Name of the form element.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    name: string;
    /**
     * Value of the form element.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    value: string;
}
/**
 * @interface UploadRequestOptions
 * @syscap SystemCapability.MiscServices.Upload
 * @since 3
 * @deprecated since 9
 */
export interface UploadRequestOptions {
    /**
     * Resource URL.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    url: string;
    /**
     * Form data in the request body.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    data?: Array<RequestData>;
    /**
     * List of files to upload, which is submitted through multipart/form-data.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    files: Array<RequestFile>;
    /**
     * Request header.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    header?: Object;
    /**
     * Request methods available: POST and PUT. The default value is POST.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    method?: string;
    /**
     * Called when the files are uploaded successfully.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    success?: (data: UploadResponse) => void;
    /**
     * Called when uploading fails.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    fail?: (data: any, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    complete?: () => void;
}
/**
 * @interface DownloadRequestOptions
 * @syscap SystemCapability.MiscServices.Download
 * @since 3
 * @deprecated since 9
 */
export interface DownloadRequestOptions {
    /**
     * Resource URL.
     *
     * @syscap SystemCapability.MiscServices.Download
     * @since 3
     * @deprecated since 9
     */
    url: string;
    /**
     * Name of the file to downloaded.
     * The value is obtained from the current request or resource URL by default.
     *
     * @syscap SystemCapability.MiscServices.Download
     * @since 3
     * @deprecated since 9
     */
    filename?: string;
    /**
     * Request header.
     *
     * @syscap SystemCapability.MiscServices.Download
     * @since 3
     * @deprecated since 9
     */
    header?: string;
    /**
     * Download description.
     * The default value is the file name.
     *
     * @syscap SystemCapability.MiscServices.Download
     * @since 3
     * @deprecated since 9
     */
    description?: string;
    /**
     * Called when the files are successfully downloaded.
     *
     * @syscap SystemCapability.MiscServices.Download
     * @since 3
     * @deprecated since 9
     */
    success?: (data: DownloadResponse) => void;
    /**
     * Called when downloading fails.
     *
     * @syscap SystemCapability.MiscServices.Download
     * @since 3
     * @deprecated since 9
     */
    fail?: (data: any, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.MiscServices.Download
     * @since 3
     * @deprecated since 9
     */
    complete?: () => void;
}
/**
 * @interface OnDownloadCompleteOptions
 * @syscap SystemCapability.MiscServices.Download
 * @since 3
 * @deprecated since 9
 */
export interface OnDownloadCompleteOptions {
    /**
     * Token of the result returned by the download function.
     *
     * @syscap SystemCapability.MiscServices.Download
     * @since 3
     * @deprecated since 9
     */
    token: string;
    /**
     * Called when the downloads are successfully obtained
     *
     * @syscap SystemCapability.MiscServices.Download
     * @since 3
     * @deprecated since 9
     */
    success?: (data: OnDownloadCompleteResponse) => void;
    /**
     * Called when the downloads fail to be obtained.
     *
     * @syscap SystemCapability.MiscServices.Download
     * @since 3
     * @deprecated since 9
     */
    fail?: (data: any, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.MiscServices.Download
     * @since 3
     * @deprecated since 9
     */
    complete?: () => void;
}
/**
 * @since 3
 * @deprecated since 9
 */
export default class Request {
    /**
     * Upload files.
     *
     * @param { UploadRequestOptions } options Options.
     * @syscap SystemCapability.MiscServices.Upload
     * @since 3
     * @deprecated since 9
     */
    static upload(options: UploadRequestOptions): void;
    /**
     * This API is used to download files.
     *
     * @param { DownloadRequestOptions } options Options.
     * @syscap SystemCapability.MiscServices.Download
     * @since 3
     * @deprecated since 9
     */
    static download(options: DownloadRequestOptions): void;
    /**
     * Listens to download task status.
     *
     * @param { OnDownloadCompleteOptions } options Options.
     * @syscap SystemCapability.MiscServices.Download
     * @since 3
     * @deprecated since 9
     */
    static onDownloadComplete(options: OnDownloadCompleteOptions): void;
}
