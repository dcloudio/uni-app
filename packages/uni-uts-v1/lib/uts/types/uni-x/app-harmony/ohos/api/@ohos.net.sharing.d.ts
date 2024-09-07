/*
 * Copyright (C) 2022-2023 Huawei Device Co., Ltd.
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
 * @kit NetworkKit
 */

import type connection from './@ohos.net.connection';
/**
 * Provides network sharing related interfaces.
 * @namespace sharing
 * @syscap SystemCapability.Communication.NetManager.NetSharing
 * @since 9
 */
declare namespace sharing {
    /**
     * Get the handle of the data network.
     * @typedef { connection.NetHandle }
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 9
     */
    type NetHandle = connection.NetHandle;
}
export default sharing;
