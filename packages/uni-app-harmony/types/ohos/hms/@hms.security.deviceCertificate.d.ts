/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file This module provides the capabilities to device certification.
 * @kit DeviceSecurityKit
 */
/**
 * Provides public api based device certificate.
 *
 * @namespace deviceCertificate
 * @syscap SystemCapability.Security.DeviceCertificate
 * @since 5.0.0(12)
 */
declare namespace deviceCertificate {
    /**
      * Provides to get device Token.
      *
      * @returns { Promise<string> } the device token.
      * @throws { BusinessError } 201 - has no permission.
      * @throws { BusinessError } 1003300005 - internal error.
      * @throws { BusinessError } 1003300006 - access cloud server fail.
      * @syscap SystemCapability.Security.DeviceCertificate
      * @since 5.0.0(12)
      */
    function getDeviceToken(): Promise<string>;
}
export default deviceCertificate;
