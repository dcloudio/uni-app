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
 * @file Defines all permissions.
 * @kit AbilityKit
 */

 /**
 * Indicates permissions.
 *
 * @typedef Permissions
 * @syscap SystemCapability.Security.AccessToken
 * @since 9
 */
 /**
 * Indicates permissions.
 *
 * @typedef Permissions
 * @syscap SystemCapability.Security.AccessToken
 * @atomicservice
 * @since 11
 */
export type Permissions =
  /**
   * @since 9
   */
  'ohos.permission.ANSWER_CALL'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_DEVICE_COLLABORATION_SERVICE'
  /**
   * @since 8
   */
  | 'ohos.permission.USE_BLUETOOTH'
  /**
   * @since 8
   */
  | 'ohos.permission.DISCOVER_BLUETOOTH'
  /**
   * @since 7
   */
  | 'ohos.permission.MANAGE_BLUETOOTH'
  /**
   * @since 10
   */
  | 'ohos.permission.ACCESS_BLUETOOTH'
  /**
   * @since 11
   */
  | 'ohos.permission.GET_BLUETOOTH_LOCAL_MAC'
  /**
   * @since 12
   */
  | 'ohos.permission.GET_BLUETOOTH_PEERS_MAC'
  /**
   * @since 12
   */
  | 'ohos.permission.SUBSCRIBE_SWING_ABILITY'
  /**
   * @since 12
   */
  | 'ohos.permission.MANAGER_SWING_MOTION'
  /**
   * @since 9
   */
  | 'ohos.permission.INTERNET'
  /**
   * @since 8
   */
  | 'ohos.permission.MODIFY_AUDIO_SETTINGS'
  /**
   * @since 7
   */
  | 'ohos.permission.ACCESS_NOTIFICATION_POLICY'
  /**
   * @since 8
   */
  | 'ohos.permission.READ_CALENDAR'
  /**
   * @since 8
   */
  | 'ohos.permission.READ_CALL_LOG'
  /**
   * @since 8
   */
  | 'ohos.permission.READ_CELL_MESSAGES'
  /**
   * @since 8
   */
  | 'ohos.permission.READ_CONTACTS'
  /**
   * @since 8
   */
  | 'ohos.permission.GET_TELEPHONY_STATE'
  /**
   * @since 10
   */
  | 'ohos.permission.GET_PHONE_NUMBERS'
  /**
   * @since 8
   */
  | 'ohos.permission.READ_MESSAGES'
  /**
   * @since 8
   */
  | 'ohos.permission.RECEIVE_MMS'
  /**
   * @since 8
   */
  | 'ohos.permission.RECEIVE_SMS'
  /**
   * @since 8
   */
  | 'ohos.permission.RECEIVE_WAP_MESSAGES'
  /**
   * @since 8
   */
  | 'ohos.permission.MICROPHONE'
  /**
   * @since 8
   */
  | 'ohos.permission.SEND_MESSAGES'
  /**
   * @since 8
   */
  | 'ohos.permission.WRITE_CALENDAR'
  /**
   * @since 8
   */
  | 'ohos.permission.WRITE_CALL_LOG'
  /**
   * @since 8
   */
  | 'ohos.permission.WRITE_CONTACTS'
  /**
   * @since 7
   */
  | 'ohos.permission.DISTRIBUTED_DATASYNC'
  /**
   * @since 9
   */
  | 'ohos.permission.DISTRIBUTED_SOFTBUS_CENTER'
  /**
   * @since 8
   */
  | 'ohos.permission.MANAGE_VOICEMAIL'
  /**
   * @since 7
   */
  | 'ohos.permission.REQUIRE_FORM'
  /**
   * @since 11
   */
  | 'ohos.permission.AGENT_REQUIRE_FORM'
  /**
   * @since 7
   */
  | 'ohos.permission.LOCATION_IN_BACKGROUND'
  /**
   * @since 7
   */
  | 'ohos.permission.LOCATION'
  /**
   * @since 9
   */
  | 'ohos.permission.APPROXIMATELY_LOCATION'
  /**
   * @since 12
   */
  | 'ohos.permission.CONTROL_LOCATION_SWITCH'
  /**
   * @since 12
   */
  | 'ohos.permission.MOCK_LOCATION'
  /**
   * @since 7
   */
  | 'ohos.permission.MEDIA_LOCATION'
  /**
   * @since 8
   */
  | 'ohos.permission.GET_NETWORK_INFO'
  /**
   * @since 8
   */
  | 'ohos.permission.PLACE_CALL'
  /**
   * @since 9
   */
  | 'ohos.permission.CAMERA'
  /**
   * @since 8
   */
  | 'ohos.permission.SET_NETWORK_INFO'
  /**
   * @since 7
   */
  | 'ohos.permission.REMOVE_CACHE_FILES'
  /**
   * @since 7
   */
  | 'ohos.permission.READ_MEDIA'
  /**
   * @since 7
   */
  | 'ohos.permission.REBOOT'
  /**
   * @since 7
   */
  | 'ohos.permission.RUNNING_LOCK'
  /**
   * @since 7
   */
  | 'ohos.permission.WRITE_MEDIA'
  /**
   * @since 7
   */
  | 'ohos.permission.SET_TIME'
  /**
   * @since 7
   */
  | 'ohos.permission.SET_TIME_ZONE'
  /**
   * @since 7
   */
  | 'ohos.permission.DOWNLOAD_SESSION_MANAGER'
  /**
   * @since 7
   */
  | 'ohos.permission.COMMONEVENT_STICKY'
  /**
   * @since 7
   */
  | 'ohos.permission.SYSTEM_FLOAT_WINDOW'
  /**
   * @since 9
   */
  | 'ohos.permission.PRIVACY_WINDOW'
  /**
   * @since 7
   */
  | 'ohos.permission.POWER_MANAGER'
  /**
   * @since 7
   */
  | 'ohos.permission.REFRESH_USER_ACTION'
  /**
   * @since 7
   */
  | 'ohos.permission.POWER_OPTIMIZATION'
  /**
   * @since 7
   */
  | 'ohos.permission.REBOOT_RECOVERY'
  /**
   * @since 7
   */
  | 'ohos.permission.MANAGE_LOCAL_ACCOUNTS'
  /**
   * @since 7
   */
  | 'ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS'
  /**
   * @since 7
   */
  | 'ohos.permission.VIBRATE'
  /**
   * @since 11
   */
  | 'ohos.permission.SYSTEM_LIGHT_CONTROL'
  /**
   * @since 7
   */
  | 'ohos.permission.ACTIVITY_MOTION'
  /**
   * @since 7
   */
  | 'ohos.permission.READ_HEALTH_DATA'
  /**
   * @since 7
   */
  | 'ohos.permission.CONNECT_IME_ABILITY'
  /**
   * @since 7
   */
  | 'ohos.permission.CONNECT_SCREEN_SAVER_ABILITY'
  /**
   * @since 7
   */
  | 'ohos.permission.READ_SCREEN_SAVER'
  /**
   * @since 7
   */
  | 'ohos.permission.WRITE_SCREEN_SAVER'
  /**
   * @since 7
   */
  | 'ohos.permission.SET_WALLPAPER'
  /**
   * @since 7
   */
  | 'ohos.permission.GET_WALLPAPER'
  /**
   * @since 7
   */
  | 'ohos.permission.CHANGE_ABILITY_ENABLED_STATE'
  /**
   * @since 7
   * @deprecated since 9
   */
  | 'ohos.permission.ACCESS_MISSIONS'
  /**
   * @since 7
   */
  | 'ohos.permission.CLEAN_BACKGROUND_PROCESSES'
  /**
   * @since 8
   */
  | 'ohos.permission.KEEP_BACKGROUND_RUNNING'
  /**
   * @since 7
   */
  | 'ohos.permission.UPDATE_CONFIGURATION'
  /**
   * @since 8
   */
  | 'ohos.permission.UPDATE_SYSTEM'
  /**
   * @since 8
   */
  | 'ohos.permission.FACTORY_RESET'
  /**
   * @since 12
   */
  | 'ohos.permission.ASSIST_DEVICE_UPDATE'
  /**
   * @since 12
   */
  | 'ohos.permission.RECEIVE_UPDATE_MESSAGE'
  /**
   * @since 10
   */
  | 'ohos.permission.UPDATE_MIGRATE'
  /**
   * @since 8
   */
  | 'ohos.permission.GRANT_SENSITIVE_PERMISSIONS'
  /**
   * @since 8
   */
  | 'ohos.permission.REVOKE_SENSITIVE_PERMISSIONS'
  /**
   * @since 8
   */
  | 'ohos.permission.GET_SENSITIVE_PERMISSIONS'
  /**
   * @since 7
   */
  | 'ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS_EXTENSION'
  /**
   * @since 7
   */
  | 'ohos.permission.LISTEN_BUNDLE_CHANGE'
  /**
   * @since 7
   */
  | 'ohos.permission.GET_BUNDLE_INFO'
  /**
   * @since 7
   */
  | 'ohos.permission.ACCELEROMETER'
  /**
   * @since 7
   */
  | 'ohos.permission.GYROSCOPE'
  /**
   * @since 7
   */
  | 'ohos.permission.GET_BUNDLE_INFO_PRIVILEGED'
  /**
   * @since 7
   */
  | 'ohos.permission.INSTALL_BUNDLE'
  /**
   * @since 7
   */
  | 'ohos.permission.MANAGE_SHORTCUTS'
  /**
   * @since 7
   */
  | 'ohos.permission.radio.ACCESS_FM_AM'
  /**
   * @since 8
   */
  | 'ohos.permission.SET_TELEPHONY_STATE'
  /**
   * @since 7
   * @deprecated since 9
   */
  | 'ohos.permission.START_ABILIIES_FROM_BACKGROUND'
  /**
   * @since 9
   */
  | 'ohos.permission.START_ABILITIES_FROM_BACKGROUND'
  /**
   * @since 7
   */
  | 'ohos.permission.BUNDLE_ACTIVE_INFO'
  /**
   * @since 9
   */
  | 'ohos.permission.START_INVISIBLE_ABILITY'
  /**
   * @since 7
   */
  | 'ohos.permission.sec.ACCESS_UDID'
  /**
   * @since 7
   */
  | 'ohos.permission.LAUNCH_DATA_PRIVACY_CENTER'
  /**
   * @since 9
   */
  | 'ohos.permission.MANAGE_MEDIA_RESOURCES'
  /**
   * @since 7
   */
  | 'ohos.permission.PUBLISH_AGENT_REMINDER'
  /**
   * @since 7
   */
  | 'ohos.permission.CONTROL_TASK_SYNC_ANIMATOR'
  /**
   * @since 7
   */
  | 'ohos.permission.INPUT_MONITORING'
  /**
   * @since 9
   */
  | 'ohos.permission.MANAGE_MISSIONS'
  /**
   * @since 8
   */
  | 'ohos.permission.NOTIFICATION_CONTROLLER'
  /**
   * @since 8
   */
  | 'ohos.permission.CONNECTIVITY_INTERNAL'
  /**
   * @since 10
   */
  | 'ohos.permission.MANAGE_NET_STRATEGY'
  /**
   * @since 10
   */
  | 'ohos.permission.GET_NETWORK_STATS'
  /**
   * @since 10
   */
  | 'ohos.permission.MANAGE_VPN'
  /**
   * @since 9
   */
  | 'ohos.permission.SET_ABILITY_CONTROLLER'
  /**
   * @since 8
   */
  | 'ohos.permission.USE_USER_IDM'
  /**
   * @since 8
   */
  | 'ohos.permission.MANAGE_USER_IDM'
  /**
   * @since 10
   */
  | 'ohos.permission.NETSYS_INTERNAL'
  /**
   * @since 6
   */
  | 'ohos.permission.ACCESS_BIOMETRIC'
  /**
   * @since 8
   */
  | 'ohos.permission.ACCESS_USER_AUTH_INTERNAL'
  /**
   * @since 11
   */
  | 'ohos.permission.MANAGE_FINGERPRINT_AUTH'
  /**
   * @since 8
   */
  | 'ohos.permission.ACCESS_PIN_AUTH'
  /**
   * @since 9
   */
  | 'ohos.permission.ACCESS_AUTH_RESPOOL'
  /**
   * @since 9
   */
  | 'ohos.permission.ENFORCE_USER_IDM'
  /**
   * @since 7
   */
  | 'ohos.permission.GET_RUNNING_INFO'
  /**
   * @since 7
   */
  | 'ohos.permission.CLEAN_APPLICATION_DATA'
  /**
   * @since 7
   */
  | 'ohos.permission.RUNNING_STATE_OBSERVER'
  /**
   * @since 7
   */
  | 'ohos.permission.CAPTURE_SCREEN'
  /**
   * @since 8
   */
  | 'ohos.permission.GET_WIFI_INFO'
  /**
   * @since 8
   */
  | 'ohos.permission.GET_WIFI_INFO_INTERNAL'
  /**
   * @since 8
   */
  | 'ohos.permission.SET_WIFI_INFO'
  /**
   * @since 8
   */
  | 'ohos.permission.GET_WIFI_PEERS_MAC'
  /**
   * @since 8
   */
  | 'ohos.permission.GET_WIFI_LOCAL_MAC'
  /**
   * @since 8
   */
  | 'ohos.permission.GET_WIFI_CONFIG'
  /**
   * @since 8
   */
  | 'ohos.permission.SET_WIFI_CONFIG'
  /**
   * @since 8
   */
  | 'ohos.permission.MANAGE_WIFI_CONNECTION'
  /**
   * @since 9
   */
  | 'ohos.permission.DUMP'
  /**
   * @since 8
   */
  | 'ohos.permission.MANAGE_WIFI_HOTSPOT'
  /**
   * @since 7
   */
  | 'ohos.permission.GET_ALL_APP_ACCOUNTS'
  /**
   * @since 7
   */
  | 'ohos.permission.MANAGE_SECURE_SETTINGS'
  /**
   * @since 8
   */
  | 'ohos.permission.READ_DFX_SYSEVENT'
  /**
   * @since 10
   */
  | 'ohos.permission.READ_HIVIEW_SYSTEM'
  /**
   * @since 10
   */
  | 'ohos.permission.WRITE_HIVIEW_SYSTEM'
  /**
   * @since 9
   */
  | 'ohos.permission.MANAGE_ENTERPRISE_DEVICE_ADMIN'
  /**
   * @since 9
   */
  | 'ohos.permission.SET_ENTERPRISE_INFO'
  /**
   * @since 9
   */
  | 'ohos.permission.ACCESS_BUNDLE_DIR'
  /**
   * @since 9
   */
  | 'ohos.permission.ENTERPRISE_SUBSCRIBE_MANAGED_EVENT'
  /**
   * @since 9
   */
  | 'ohos.permission.ENTERPRISE_SET_DATETIME'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_GET_DEVICE_INFO'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_RESET_DEVICE'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_SET_WIFI'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_GET_NETWORK_INFO'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_SET_ACCOUNT_POLICY'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_SET_NETWORK'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_MANAGE_SET_APP_RUNNING_POLICY'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_SET_SCREENOFF_TIME'
  /**
   * @since 11
   */
  | 'ohos.permission.ENTERPRISE_MANAGE_SECURITY'
  /**
   * @since 11
   */
  | 'ohos.permission.ENTERPRISE_MANAGE_BLUETOOTH'
  /**
   * @since 11
   */
  | 'ohos.permission.ENTERPRISE_MANAGE_WIFI'
  /**
   * @since 11
   */
  | 'ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS'
  /**
   * @since 11
   */
  | 'ohos.permission.ENTERPRISE_MANAGE_APPLICATION'
  /**
   * @since 11
   */
  | 'ohos.permission.ENTERPRISE_MANAGE_LOCATION'
  /**
   * @since 11
   */
  | 'ohos.permission.ENTERPRISE_REBOOT'
  /**
   * @since 11
   */
  | 'ohos.permission.ENTERPRISE_LOCK_DEVICE'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_GET_SETTINGS'
  /**
   * @since 11
   */
  | 'ohos.permission.ENTERPRISE_MANAGE_SETTINGS'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_INSTALL_BUNDLE'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_MANAGE_CERTIFICATE'
  /**
   * @since 11
   */
  | 'ohos.permission.ENTERPRISE_MANAGE_SYSTEM'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_RESTRICT_POLICY'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_MANAGE_USB'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_MANAGE_NETWORK'
  /**
   * @since 10
   */
  | 'ohos.permission.ENTERPRISE_SET_BROWSER_POLICY'
  /**
   * @since 12
   */
  | 'ohos.permission.ENTERPRISE_OPERATE_DEVICE'
  /**
   * @since 12
   */
  | 'ohos.permission.ENTERPRISE_ADMIN_MANAGE'
  /**
   * @since 12
   */
  | 'ohos.permission.ENTERPRISE_CONFIG'
  /**
   * @since 7
   */
  | 'ohos.permission.NFC_TAG'
  /**
   * @since 8
   */
  | 'ohos.permission.NFC_CARD_EMULATION'
  /**
   * @since 9
   */
  | 'ohos.permission.PERMISSION_USED_STATS'
  /**
   * @since 9
   */
  | 'ohos.permission.NOTIFICATION_AGENT_CONTROLLER'
  /**
   * @since 9
   */
  | 'ohos.permission.MOUNT_UNMOUNT_MANAGER'
  /**
   * @since 9
   */
  | 'ohos.permission.MOUNT_FORMAT_MANAGER'
  /**
   * @since 9
   */
  | 'ohos.permission.STORAGE_MANAGER'
  /**
   * @since 9
   */
  | 'ohos.permission.BACKUP'
  /**
   * @since 10
   */
  | 'ohos.permission.CLOUDFILE_SYNC_MANAGER'
  /**
   * @since 10
   */
  | 'ohos.permission.CLOUDFILE_SYNC'
  /**
   * @since 9
   */
  | 'ohos.permission.FILE_ACCESS_MANAGER'
  /**
   * @since 9
   */
  | 'ohos.permission.GET_DEFAULT_APPLICATION'
  /**
   * @since 9
   */
  | 'ohos.permission.SET_DEFAULT_APPLICATION'
  /**
   * @since 9
   */
  | 'ohos.permission.ACCESS_IDS'
  /**
   * @since 9
   */
  | 'ohos.permission.MANAGE_DISPOSED_APP_STATUS'
  /**
   * @since 9
   */
  | 'ohos.permission.ACCESS_DLP_FILE'
  /**
   * @since 9
   */
  | 'ohos.permission.PROVISIONING_MESSAGE'
  /**
   * @since 9
   */
  | 'ohos.permission.ACCESS_SYSTEM_SETTINGS'
  /**
   * @since 9
   */
  | 'ohos.permission.READ_IMAGEVIDEO'
  /**
   * @since 9
   */
  | 'ohos.permission.READ_AUDIO'
  /**
   * @since 9
   */
  | 'ohos.permission.READ_DOCUMENT'
  /**
   * @since 9
   */
  | 'ohos.permission.WRITE_IMAGEVIDEO'
  /**
   * @since 9
   */
  | 'ohos.permission.WRITE_AUDIO'
  /**
   * @since 9
   */
  | 'ohos.permission.WRITE_DOCUMENT'
  /**
   * @since 9
   */
  | 'ohos.permission.ABILITY_BACKGROUND_COMMUNICATION'
  /**
   * @since 9
   */
  | 'ohos.permission.securityguard.REPORT_SECURITY_INFO'
  /**
   * @since 9
   */
  | 'ohos.permission.securityguard.REQUEST_SECURITY_MODEL_RESULT'
  /**
   * @since 9
   */
  | 'ohos.permission.securityguard.REQUEST_SECURITY_EVENT_INFO'
  /**
   * @since 9
   */
  | 'ohos.permission.ACCESS_CERT_MANAGER_INTERNAL'
  /**
   * @since 9
   */
  | 'ohos.permission.ACCESS_CERT_MANAGER'
  /**
   * @since 9
   */
  | 'ohos.permission.GET_LOCAL_ACCOUNTS'
  /**
   * @since 9
   */
  | 'ohos.permission.MANAGE_DISTRIBUTED_ACCOUNTS'
  /**
   * @since 9
   */
  | 'ohos.permission.GET_DISTRIBUTED_ACCOUNTS'
  /**
   * @since 9
   */
  | 'ohos.permission.READ_ACCESSIBILITY_CONFIG'
  /**
   * @since 9
   */
  | 'ohos.permission.WRITE_ACCESSIBILITY_CONFIG'
  /**
   * @since 9
   */
  | 'ohos.permission.ACCESS_PUSH_SERVICE'
  /**
   * @since 10
   */
  | 'ohos.permission.READ_APP_PUSH_DATA'
  /**
   * @since 10
   */
  | 'ohos.permission.WRITE_APP_PUSH_DATA'
  /**
   * @since 9
   */
  | 'ohos.permission.MANAGE_AUDIO_CONFIG'
  /**
   * @since 12
   */
  | 'ohos.permission.MICROPHONE_CONTROL'
  /**
   * @since 9
   */
  | 'ohos.permission.MANAGE_CAMERA_CONFIG'
  /**
   * @since 12
   */
  | 'ohos.permission.CAMERA_CONTROL'
  /**
   * @since 9
   */
  | 'ohos.permission.RECEIVER_STARTUP_COMPLETED'
  /**
   * @since 9
   */
  | 'ohos.permission.READ_WHOLE_CALENDAR'
  /**
   * @since 9
   */
  | 'ohos.permission.WRITE_WHOLE_CALENDAR'
  /**
   * @since 10
   */
  | 'ohos.permission.ACCESS_SERVICE_DM'
  /**
   * @since 10
   */
  | 'ohos.permission.RUN_ANY_CODE'
  /**
   * @since 9
   */
  | 'ohos.permission.APP_TRACKING_CONSENT'
  /**
   * @since 10
   */
  | 'ohos.permission.PUBLISH_SYSTEM_COMMON_EVENT'
  /**
   * @since 10
   */
  | 'ohos.permission.ACCESS_SCREEN_LOCK_INNER'
  /**
   * @since 10
   */
  | 'ohos.permission.PRINT'
  /**
   * @since 10
   */
  | 'ohos.permission.MANAGE_PRINT_JOB'
  /**
   * @since 10
   */
  | 'ohos.permission.CHANGE_OVERLAY_ENABLED_STATE'
  /**
   * @since 10
   */
  | 'ohos.permission.CONNECT_CELLULAR_CALL_SERVICE'
  /**
   * @since 10
   */
  | 'ohos.permission.CONNECT_IMS_SERVICE'
  /**
   * @since 10
   */
  | 'ohos.permission.ACCESS_SENSING_WITH_ULTRASOUND'
  /**
   * @since 10
   */
  | 'ohos.permission.SUPPORT_USER_AUTH'
  /**
   * @since 10
   */
  | 'ohos.permission.PROXY_AUTHORIZATION_URI'
  /**
   * @since 10
   */
  | 'ohos.permission.INSTALL_ENTERPRISE_BUNDLE'
  /**
   * @since 10
   */
  | 'ohos.permission.GET_INSTALLED_BUNDLE_LIST'
  /**
   * @since 10
   */
  | 'ohos.permission.ACCESS_CAST_ENGINE_MIRROR'
  /**
   * @since 10
   */
  | 'ohos.permission.ACCESS_CAST_ENGINE_STREAM'
  /**
   * @since 10
   */
  | 'ohos.permission.DEVICE_STANDBY_EXEMPTION'
  /**
   * @since 10
   */
  | 'ohos.permission.RESTRICT_APPLICATION_ACTIVE'
  /**
   * @since 10
   */
  | 'ohos.permission.MANAGE_SENSOR'
  /**
   * @since 10
   */
  | 'ohos.permission.UPLOAD_SESSION_MANAGER'
  /**
   * @since 10
   */
  | 'ohos.permission.PREPARE_APP_TERMINATE'
  /**
   * @since 10
   */
  | 'ohos.permission.CLOUDDATA_CONFIG'
  /**
   * @since 10
   */
  | 'ohos.permission.FILE_GUARD_MANAGER'
  /**
   * @since 10
   */
  | 'ohos.permission.SET_FILE_GUARD_POLICY'
  /**
   * @since 10
   */
  | 'ohos.permission.securityguard.SET_MODEL_STATE'
  /**
   * @since 10
   */
  | 'ohos.permission.hsdr.HSDR_ACCESS'
  /**
   * @since 10
   */
  | 'ohos.permission.MANAGE_ECOLOGICAL_RULE'
  /**
   * @since 10
   */
  | 'ohos.permission.GET_SCENE_CODE'
  /**
   * @since 10
   */
  | 'ohos.permission.CAPTURE_VOICE_DOWNLINK_AUDIO'
  /**
   * @since 10
   */
  | 'ohos.permission.MANAGE_INTELLIGENT_VOICE'
  /**
   * @since 10
   */
  | 'ohos.permission.INSTALL_ENTERPRISE_MDM_BUNDLE'
  /**
   * @since 10
   */
  | 'ohos.permission.INSTALL_ENTERPRISE_NORMAL_BUNDLE'
  /**
   * @since 10
   */
  | 'ohos.permission.INSTALL_SELF_BUNDLE'
  /**
   * @since 10
   */
  | 'ohos.permission.OBSERVE_FORM_RUNNING'
  /**
   * @since 10
   */
  | 'ohos.permission.MANAGE_DEVICE_AUTH_CRED'
  /**
   * @since 10
   */
  | 'ohos.permission.UNINSTALL_BUNDLE'
  /**
   * @since 10
   */
  | 'ohos.permission.RECOVER_BUNDLE'
  /**
   * @since 10
   */
  | 'ohos.permission.GET_DOMAIN_ACCOUNTS'
  /**
   * @since 11
   */
  | 'ohos.permission.SET_UNREMOVABLE_NOTIFICATION'
  /**
   * @since 11
   */
  | 'ohos.permission.QUERY_ACCESSIBILITY_ELEMENT'
  /**
   * @since 11
   */
  | 'ohos.permission.ACTIVATE_THEME_PACKAGE'
  /**
   * @since 11
   */
  | 'ohos.permission.ATTEST_KEY'
  /**
   * @since 11
   */
  | 'ohos.permission.WAKEUP_VOICE'
  /**
   * @since 11
   */
  | 'ohos.permission.WAKEUP_VISION'
  /**
   * @since 11
   */
  | 'ohos.permission.ENABLE_DISTRIBUTED_HARDWARE'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_DISTRIBUTED_HARDWARE'
  /**
   * @since 11
   */
  | 'ohos.permission.INSTANTSHARE_SWITCH_CONTROL'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_INSTANTSHARE_SERVICE'
  /**
   * @since 11
   */
  | 'ohos.permission.SECURE_PASTE'
  /**
   * @since 11
   */
  | 'ohos.permission.READ_PASTEBOARD'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_INSTANTSHARE_PRIVATE_ABILITY'
  /**
   * @since 11
   */
  | 'ohos.permission.GET_BUNDLE_RESOURCES'
  /**
   * @since 11
   */
  | 'ohos.permission.SET_CODE_PROTECT_INFO'
  /**
   * @since 11
   */
  | 'ohos.permission.SET_ADVANCED_SECURITY_MODE'
  /**
   * @since 11
   */
  | 'ohos.permission.SET_DEVELOPER_MODE'
  /**
   * @since 11
   */
  | 'ohos.permission.RUN_DYN_CODE'
  /**
   * @since 11
   */
  | 'ohos.permission.COOPERATE_MANAGER'
  /**
   * @since 11
   */
  | 'ohos.permission.PERCEIVE_TRAIL'
  /**
   * @since 11
   */
  | 'ohos.permission.DISABLE_PERMISSION_DIALOG'
  /**
   * @since 11
   */
  | 'ohos.permission.EXECUTE_INSIGHT_INTENT'
  /**
   * @since 11
   */
  | 'ohos.permission.MANAGE_ACTIVATION_LOCK'
  /**
   * @since 11
   */
  | 'ohos.permission.VERIFY_ACTIVATION_LOCK'
  /**
   * @since 11
   */
  | 'ohos.permission.MANAGE_PRIVATE_PHOTOS'
  /**
   * @since 11
   */
  | 'ohos.permission.INPUT_CONTROL_DISPATCHING'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_OUC'
  /**
   * @since 11
   */
  | 'ohos.permission.TRUSTED_RING_HASH_DATA_PERMISSION'
  /**
   * @since 11
   */
  | 'ohos.permission.MANAGE_TRUSTED_RING'
  /**
   * @since 11
   */
  | 'ohos.permission.USE_TRUSTED_RING'
  /**
   * @since 11
   */
  | 'ohos.permission.RECORD_VOICE_CALL'
  /**
   * @since 11
   */
  | 'ohos.permission.MANAGE_APP_INSTALL_INFO'
  /**
   * @since 11
   */
  | 'ohos.permission.RECEIVE_APP_INSTALL_INFO_CHANGE'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_SECURITY_PRIVACY_CENTER'
  /**
   * @since 11
   */
  | 'ohos.permission.GET_SECURITY_PRIVACY_ADVICE'
  /**
   * @since 11
   */
  | 'ohos.permission.SET_SECURITY_PRIVACY_ADVICE'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_ADVANCED_SECURITY_MODE'
  /**
   * @since 11
   */
  | 'ohos.permission.USE_SECURITY_PRIVACY_MESSAGER'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_PASSWORDVAULT_ABILITY'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_PRIVATE_SPACE_MANAGER'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_PRIVATE_SPACE_PASSWORD_PROTECT'
  /**
   * @since 11
   */
  | 'ohos.permission.STORE_PERSISTENT_DATA'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_HIVIEWX'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_LOWPOWER_MANAGER'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_ACCOUNT_KIT_SERVICE'
  /**
   * @since 11
   */
  | 'ohos.permission.REQUEST_ANONYMOUS_ATTEST'
  /**
   * @since 11
   */
  | 'ohos.permission.WRITE_PRIVACY_PUSH_DATA'
  /**
   * @since 12
   */
  | 'ohos.permission.READ_PRIVACY_PUSH_DATA'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_MCP_AUTHORIZATION'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_ACCOUNT_KIT_SERVICE'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_HIVIEWCARE'
  /**
   * @since 11
   */
  | 'ohos.permission.CONNECT_UI_EXTENSION_ABILITY'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_ACCOUNT_KIT_UI'
  /**
   * @since 11
   */
  | 'ohos.permission.READ_WRITE_DOWNLOAD_DIRECTORY'
  /**
   * @since 11
   */
  | 'ohos.permission.READ_WRITE_DOCUMENTS_DIRECTORY'
  /**
   * @since 11
   */
  | 'ohos.permission.READ_WRITE_DESKTOP_DIRECTORY'
  /**
   * @since 11
   */
  | 'ohos.permission.SET_SANDBOX_POLICY'
  /**
   * @since 11
   */
  | 'ohos.permission.FILE_ACCESS_PERSIST'
  /**
   * @since 11
   */
  | 'ohos.permission.MANAGE_USB_CONFIG'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_DDK_USB'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_EXTENSIONAL_DEVICE_DRIVER'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_DDK_HID'
  /**
   * @since 11
   */
  | 'ohos.permission.MANAGE_APP_BOOT'
  /**
   * @since 11
   */
  | 'ohos.permission.INTERCEPT_INPUT_EVENT'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_STATUSBAR_ICON'
  /**
   * @since 11
   */
  | 'ohos.permission.START_SYSTEM_DIALOG'
  /**
   * @since 11
   */
  | 'ohos.permission.START_RECENT_ABILITY'
  /**
   * @since 11
   */
  | 'ohos.permission.READ_CLOUD_SYNC_CONFIG'
  /**
   * @since 11
   */
  | 'ohos.permission.MANAGE_CLOUD_SYNC_CONFIG'
  /**
   * @since 11
   */
  | 'ohos.permission.ACCESS_FINDDEVICE'
  /**
   * @since 11
   */
  | 'ohos.permission.MANAGE_FINDSERVICE'
  /**
   * @since 12
   */
  | 'ohos.permission.READ_FINDSERVICE'
  /**
   * @since 11
   */
  | 'ohos.permission.TRIGGER_ACTIVATIONLOCK'
  /**
   * @since 11
   */
  | 'ohos.permission.MANAGE_SYSTEM_AUDIO_EFFECTS'
  /**
   * @since 12
   */
  | 'ohos.permission.MANAGE_NEARLINK'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_NEARLINK'
  /**
   * @since 12
   */
  | 'ohos.permission.GET_NEARLINK_LOCAL_MAC'
  /**
   * @since 12
   */
  | 'ohos.permission.GET_NEARLINK_PEER_MAC'
  /**
   * @since 12
   */
  | 'ohos.permission.MANAGE_FINDNETWORK'
  /**
   * @since 12
   */
  | 'ohos.permission.OPERATE_FINDNETWORK'
  /**
   * @since 12
   */
  | 'ohos.permission.QUERY_FINDNETWORK_LOCATION'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_PROTOCOL_DFX_STATE'
  /**
   * @since 12
   */
  | 'ohos.permission.MANAGE_RGM'
  /**
   * @since 12
   */
  | 'ohos.permission.ALLOW_UPGRADE_GUIDE_ACCESS'
  /**
   * @since 12
   */
  | 'ohos.permission.READ_ACCOUNT_LOGIN_STATE'
  /**
   * @since 12
   */
  | 'ohos.permission.WRITE_ACCOUNT_LOGIN_STATE'
  /**
   * @since 12
   */
  | 'ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS_AS_USER'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_PROTOCOL_DFX_DATA'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_AI_ABILITY'
  /**
   * @since 12
   */
  | 'ohos.permission.hsdr.REQUEST_HSDR'
  /**
   * @since 12
   */
  | 'ohos.permission.MANAGE_USER_ACCOUNT_INFO'
  /**
   * @since 12
   */
  | 'ohos.permission.NOTIFY_DEBUG_ASSERT_RESULT'
  /**
   * @since 12
   */
  | 'ohos.permission.QUERY_PASSWORD_VAULT_DATA'
  /**
   * @since 12
   */
  | 'ohos.permission.SUBSCRIBE_NOTIFICATION_WINDOW_STATE'
  /**
   * @since 12
   */
  | 'ohos.permission.CHANGE_DISPLAYMODE'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_MEDIALIB_THUMB_DB'
  /**
   * @since 12
   */
  | 'ohos.permission.GET_PRIVACY_INDICATOR'
  /**
   * @since 12
   */
  | 'ohos.permission.SET_PRIVACY_INDICATOR'
  /**
   * @since 12
   */
  | 'ohos.permission.EXEMPT_PRIVACY_INDICATOR'
  /**
   * @since 12
   */
  | 'ohos.permission.EXEMPT_CAMERA_PRIVACY_INDICATOR'
  /**
   * @since 12
   */
  | 'ohos.permission.EXEMPT_MICROPHONE_PRIVACY_INDICATOR'
  /**
   * @since 12
   */
  | 'ohos.permission.EXEMPT_LOCATION_PRIVACY_INDICATOR'
  /**
   * @since 12
   */
  | 'ohos.permission.SET_SUPER_PRIVACY'
  /**
   * @since 12
   */
  | 'ohos.permission.MIGRATE_DATA'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_DYNAMIC_ICON'
  /**
   * @since 12
   */
  | 'ohos.permission.CHANGE_BUNDLE_UNINSTALL_STATE'
  /**
   * @since 12
   */
  | 'ohos.permission.GET_SUPER_PRIVACY'
  /**
   * @since 12
   */
  | 'ohos.permission.LAUNCH_SPAMSHIELD_PAGE'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_SPAMSHIELD_SERVICE'
  /**
   * @since 12
   */
  | 'ohos.permission.WRITE_GTOKEN_POLICY'
  /**
   * @since 12
   */
  | 'ohos.permission.READ_GTOKEN_POLICY'
  /**
   * @since 12
   */
  | 'ohos.permission.ENABLE_PROFILER'
  /**
   * @since 12
   */
  | 'ohos.permission.USE_CLOUD_DRIVE_SERVICE'
  /**
   * @since 12
   */
  | 'ohos.permission.USE_CLOUD_BACKUP_SERVICE'
  /**
   * @since 12
   */
  | 'ohos.permission.USE_CLOUD_COMMON_SERVICE'
  /**
   * @since 12
   */
  | 'ohos.permission.MANAGE_STYLUS_EVENT'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_SERVICE_NAVIGATION_INFO'
  /**
   * @since 12
   */
  | 'ohos.permission.PRELOAD_APPLICATION'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_TEXTAUTOFILL_ABILITY'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_LOCAL_BACKUP'
  /**
   * @since 12
   */
  | 'ohos.permission.CAST_AUDIO_OUTPUT'
  /**
   * @since 12
   */
  | 'ohos.permission.MANAGE_INPUT_INFRARED_EMITTER'
  /**
   * @since 12
   */
  | 'ohos.permission.START_DLP_CRED'
  /**
   * @since 12
   */
  | 'ohos.permission.START_SHORTCUT'
  /**
   * @since 12
   */
  | 'ohos.permission.GET_ACCOUNT_MINORS_INFO'
  /**
   * @since 12
   */
  | 'ohos.permission.KILL_APP_PROCESSES'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_SCREEN_LOCK_MEDIA_DATA'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_SCREEN_LOCK_ALL_DATA'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_LOCAL_THEME'
  /**
   * @since 12
   */
  | 'ohos.permission.INSTALL_CLONE_BUNDLE'
  /**
   * @since 12
   */
  | 'ohos.permission.UNINSTALL_CLONE_BUNDLE'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_SHADER_CACHE_DIR'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_SYSTEM_APP_CERT'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_USER_TRUSTED_CERT'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_BOOSTER_SERVICE'
  /**
   * @since 12
   */
  | 'ohos.permission.PROTECT_SCREEN_LOCK_DATA'
  /**
   * @since 12
   */
  | 'ohos.permission.PRELOAD_UI_EXTENSION_ABILITY'
  /**
   * @since 12
   */
  | 'ohos.permission.WRITE_RINGTONE'
  /**
   * @since 12
   */
  | 'ohos.permission.MANAGE_SETTINGS'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_DEVICE_COLLABORATION_PRIVATE_ABILITY'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_SEARCH_SERVICE'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_FILE_CONTENT_SHARE'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_SCREEN_LOCK'
  /**
   * @since 12
   */
  | 'ohos.permission.SET_PROCESS_CACHE_STATE'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_RINGTONE_RESOURCE'
  /**
   * @since 12
   */
  | 'ohos.permission.ALLOW_TIPS_ACCESS'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_SUBSCRIPTION_CAPSULE_DATA'
  /**
   * @since 12
   */
  | 'ohos.permission.INJECT_INPUT_EVENT'
  /**
   * @since 12
   */
  | 'ohos.permission.READ_HEALTH_MOTION'
  /**
   * @since 12
   */
  | 'ohos.permission.PERCEIVE_SMART_POWER_SCENARIO'
  /**
   * @since 12
   */
  | 'ohos.permission.QUERY_SECURITY_EVENT'
  /**
   * @since 12
   */
  | 'ohos.permission.REPORT_SECURITY_EVENT'
  /**
   * @since 12
   */
  | 'ohos.permission.QUERY_SECURITY_MODEL_RESULT'
  /**
   * @since 12
   */
  | 'ohos.permission.MANAGE_SECURITY_GUARD_CONFIG'
  /**
   * @since 12
   */
  | 'ohos.permission.COLLECT_SECURITY_EVENT'
  /**
   * @since 12
   */
  | 'ohos.permission.QUERY_AUDIT_EVENT'
  /**
   * @since 12
   */
  | 'ohos.permission.QUERY_SECURITY_POLICY_FROM_CLOUD'
  /**
   * @since 12
   */
  | 'ohos.permission.REPORT_SECURITY_EVENT_TO_CLOUD'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_SCAN_SERVICE'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_FACTORY_OTA_DIR'
  /**
   * @since 12
   */
  | 'ohos.permission.PRE_START_ATOMIC_SERVICE'
  /**
   * @since 12
   */
  | 'ohos.permission.FILTER_INPUT_EVENT'
  /**
   * @since 12
   */
  | 'ohos.permission.MANAGE_MOUSE_CURSOR'
  /**
   * @since 12
   */
  | 'ohos.permission.RECEIVE_FUSION_MESSAGES'
  /**
   * @since 12
   */
  | 'ohos.permission.PUBLISH_LOCATION_EVENT'
  /**
   * @since 12
   */
  | 'ohos.permission.DUMP_AUDIO'
  /**
   * @since 12
   */
  | 'ohos.permission.ACCESS_MULTICORE_HYBRID_ABILITY';