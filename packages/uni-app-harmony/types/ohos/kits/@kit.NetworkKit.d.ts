/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

import connection from '@ohos.net.connection';
import ethernet from '@ohos.net.ethernet';
import http from '@ohos.net.http';
import mdns from '@ohos.net.mdns';
import policy from '@ohos.net.policy';
import sharing from '@ohos.net.sharing';
import socket from '@ohos.net.socket';
import statistics from '@ohos.net.statistics';
import vpn from '@ohos.net.vpn';
import webSocket from '@ohos.net.webSocket';
import vpnExtension from '@ohos.net.vpnExtension';
import networkSecurity from '@ohos.net.networkSecurity';
import VpnExtensionAbility, { VpnExtensionContext } from '@ohos.app.ability.VpnExtensionAbility';

export {
  connection, ethernet, http, mdns, policy, sharing, webSocket,
  socket, statistics, vpn, vpnExtension, networkSecurity, 
  VpnExtensionAbility, VpnExtensionContext
};
