/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
import { AsyncCallback } from './@ohos.base';
export default document;
/**
 * document
 *
 * @namespace document
 * @syscap SystemCapability.FileManagement.UserFileService
 * @since 6
 * @deprecated since 9
 */
declare namespace document {
    export { choose };
    export { show };
}
/**
 * choose.
 *
 * @param { string[] } types - type.
 * @returns { Promise<string> } return Promise
 * @throws { TypedError } Parameter check failed
 * @syscap SystemCapability.FileManagement.UserFileService
 * @since 6
 * @deprecated since 9
 */
declare function choose(types?: string[]): Promise<string>;
/**
 * choose.
 *
 * @param { AsyncCallback<string> } [callback] - callback.
 * @throws { TypedError } Parameter check failed
 * @syscap SystemCapability.FileManagement.UserFileService
 * @since 6
 * @deprecated since 9
 */
declare function choose(callback: AsyncCallback<string>): void;
/**
 * choose.
 *
 * @param { string[] } types - type.
 * @param { AsyncCallback<string> } [callback] - callback.
 * @throws { TypedError } Parameter check failed
 * @syscap SystemCapability.FileManagement.UserFileService
 * @since 6
 * @deprecated since 9
 */
declare function choose(types: string[], callback: AsyncCallback<string>): void;
/**
 * show.
 *
 * @param { string } uri - uri.
 * @param { string } type - type.
 * @returns { Promise<void> } return Promise
 * @throws { TypedError } Parameter check failed
 * @syscap SystemCapability.FileManagement.UserFileService
 * @since 6
 * @deprecated since 9
 */
declare function show(uri: string, type: string): Promise<void>;
/**
 * show.
 *
 * @param { string } uri - uri.
 * @param { string } type - type.
 * @param { AsyncCallback<void> } [callback] - callback.
 * @throws { TypedError } Parameter check failed
 * @syscap SystemCapability.FileManagement.UserFileService
 * @since 6
 * @deprecated since 9
 */
declare function show(uri: string, type: string, callback: AsyncCallback<void>): void;
