/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Defines the capabilities of iap(in-App purchase) module.
 * @kit IAPKit
 */
import type { AsyncCallback } from '@ohos.base';
import type common from '@ohos.app.ability.common';
/**
 * This module provides the capabilities to use in-App purchase.
 *
 * @namespace iap
 * @syscap SystemCapability.Payment.IAP
 * @stagemodelonly
 * @since 4.0.0(10)
 */
/**
 * This module provides the capabilities to use in-App purchase.
 *
 * @namespace iap
 * @syscap SystemCapability.Payment.IAP
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace iap {
    /**
     * Request parameter of the queryPurchases or queryOwnedPurchases or queryPurchaseRecords API.
     *
     * @typedef QueryPurchasesParameter
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Request parameter of the queryPurchases or queryOwnedPurchases or queryPurchaseRecords API.
     *
     * @typedef QueryPurchasesParameter
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface QueryPurchasesParameter {
        /**
         * Type of a product to be queried.
         *
         * @type { ProductType }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Type of a product to be queried.
         *
         * @type { ProductType }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        productType: ProductType;
        /**
         * Data location flag for query in pagination mode.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Data location flag for query in pagination mode.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        continuationToken?: string;
        /**
         * Type of querying purchase. ALL as default if value is NULL.
         *
         * @type { ?PurchaseQueryType }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Type of querying purchase.
         *
         * @type { ?PurchaseQueryType }
         * @default PurchaseQueryType.UNFINISHED
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        queryType?: PurchaseQueryType;
    }
    /**
     * Request parameter of queryProducts API.
     *
     * @typedef QueryProductsParameter
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Request parameter of queryProducts API.
     *
     * @typedef QueryProductsParameter
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface QueryProductsParameter {
        /**
         * Type of a product to be queried.
         *
         * @type { ProductType }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Type of a product to be queried.
         *
         * @type { ProductType }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        productType: ProductType;
        /**
         * ID list of products to be queried.
         * Each product ID must exist and be unique in the current app.
         * The product ID is the same as that you set when configuring product information in AppGallery Connect.
         *
         * @type { string[] }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * ID list of products to be queried.
         * Each product ID must exist and be unique in the current app.
         * The product ID is the same as that you set when configuring product information in AppGallery Connect.
         *
         * @type { string[] }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        productIds: string[];
    }
    /**
     * Request parameter of the purchase API.
     *
     * @typedef PurchaseParameter
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Request parameter of the purchase API.
     *
     * @typedef PurchaseParameter
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface PurchaseParameter {
        /**
         * ID of product to be queried.
         * Each product ID must exist and be unique in the current app.
         * The product ID is the same as that you set when configuring product information in AppGallery Connect.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * ID of product to be queried.
         * Each product ID must exist and be unique in the current app.
         * The product ID is the same as that you set when configuring product information in AppGallery Connect.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        productId: string;
        /**
         * Type of a product to be queried.
         *
         * @type { ProductType }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Type of a product to be queried.
         *
         * @type { ProductType }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        productType: ProductType;
        /**
         * Information stored on the merchant side.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Information stored on the merchant side.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        developerPayload?: string;
        /**
         * This parameter is used to pass the extra fields set by a merchant in a JSON string in the key:value format.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * This parameter is used to pass the extra fields set by a merchant in a JSON string in the key:value format.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        reservedInfo?: string;
    }
    /**
     * Request parameter of the consumePurchase API.
     *
     * @typedef ConsumePurchaseParameter
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     * @deprecated since 4.1.0(11)
     */
    interface ConsumePurchaseParameter {
        /**
         * Purchase token, which is generated by the Huawei IAP server during payment and returned to the app.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         * @deprecated since 4.1.0(11)
         */
        purchaseToken: string;
        /**
         * User-defined challenge, which uniquely identifies a consumption request.
         * It is recorded in the purchase information and returned after the consumption is successful.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         * @deprecated since 4.1.0(11)
         */
        developerChallenge?: string;
    }
    /**
     * Request parameter of the finishPurchase API.
     *
     * @typedef FinishPurchaseParameter
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    /**
     * Request parameter of the finishPurchase API.
     *
     * @typedef FinishPurchaseParameter
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface FinishPurchaseParameter {
        /**
         * Type of a product to be queried.
         *
         * @type { ProductType }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Type of a product to be queried.
         *
         * @type { ProductType }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        productType: ProductType;
        /**
         * Purchase token, which is generated by the Huawei IAP server during payment and returned to the app.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Purchase token, which is generated by the Huawei IAP server during payment and returned to the app.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        purchaseToken: string;
        /**
         * Purchase order ID returned in the purchase order payload.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Purchase order ID returned in the purchase order payload.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        purchaseOrderId: string;
    }
    /**
     * QueryPurchasesResult object represents purchased product information.
     *
     * @typedef QueryPurchasesResult
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     * @deprecated since 4.1.0(11)
     */
    interface QueryPurchasesResult {
        /**
         * ID list of found products.
         *
         * @type { string[] }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         * @deprecated since 4.1.0(11)
         */
        productList: string[];
        /**
         * Information about products that have been purchased but not consumed or about all existing subscription
         * relationships of users using the queryOwnedPurchases method. Returned in json strings.
         *
         * @type { string[] }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         * @deprecated since 4.1.0(11)
         */
        inAppPurchaseDataList: string[];
        /**
         * Signature character string of each subscription relationship in the inAppPurchaseDataStrList list.
         *
         * @type { string[] }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         * @deprecated since 4.1.0(11)
         */
        inAppSignatureList: string[];
        /**
         * Data location flag.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         * @deprecated since 4.1.0(11)
         */
        continuationToken?: string;
        /**
         * Signature algorithm.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         * @deprecated since 4.1.0(11)
         */
        signatureAlgorithm: string;
    }
    /**
     * Represents signed query purchase result.
     *
     * @typedef QueryPurchaseResult
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    /**
     * Represents signed query purchase result.
     *
     * @typedef QueryPurchaseResult
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface QueryPurchaseResult {
        /**
         * Signed purchase data list, including purchase order and subscription status.
         *
         * @type { string[] }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Signed purchase data list, including purchase order and subscription status.
         *
         * @type { string[] }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        purchaseDataList: string[];
        /**
         * Data location flag.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Data location flag.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        continuationToken?: string;
    }
    /**
     * Product information.
     *
     * @typedef Product
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Product information.
     *
     * @typedef Product
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface Product {
        /**
         * Product ID.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Product ID.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        id: string;
        /**
         * Type of a product to be queried.
         *
         * @type { ProductType }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Type of a product to be queried.
         *
         * @type { ProductType }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        type: ProductType;
        /**
         * Product name, which is set during product information configuration.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Product name, which is set during product information configuration.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        name: string;
        /**
         * Description of a product, which is set during product information configuration.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Description of a product, which is set during product information configuration.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        description: string;
        /**
         * Displayed price of a product, including the currency symbol and actual price of the product.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         * @deprecated since 4.1.0(11)
         */
        price: string;
        /**
         * Displayed price of a product, including the currency symbol and actual price of the product.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Displayed price of a product, including the currency symbol and actual price of the product.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        localPrice?: string;
        /**
         * Product price in micro unit, which equals to the actual product price multiplied by 1,000,000.
         *
         * @type { number }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Product price in micro unit, which equals to the actual product price multiplied by 1,000,000.
         *
         * @type { number }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        microPrice: number;
        /**
         * Original price of a product, including the currency symbol and actual price of the product.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Original price of a product, including the currency symbol and actual price of the product.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        originalLocalPrice: string;
        /**
         * Original price of a product in micro unit, which equals to the original product price multiplied by 1,000,000.
         *
         * @type { number }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Original price of a product in micro unit, which equals to the original product price multiplied by 1,000,000.
         *
         * @type { number }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        originalMicroPrice: number;
        /**
         * Currency used to pay for a product.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Currency used to pay for a product.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        currency: string;
        /**
         * The status of product.
         *
         * @type { ?ProductStatus }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        status?: ProductStatus;
        /**
         * The subscription information of auto-renewables product.
         *
         * @type { ?SubscriptionInfo }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * The subscription information of auto-renewables product.
         *
         * @type { ?SubscriptionInfo }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        subscriptionInfo?: SubscriptionInfo;
        /**
         * The raw JSON representation of the product information.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * The raw JSON representation of the product information.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        jsonRepresentation?: string;
    }
    /**
     * Subscription information.
     *
     * @typedef SubscriptionInfo
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    /**
     * Subscription information.
     *
     * @typedef SubscriptionInfo
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface SubscriptionInfo {
        /**
         * Period unit.
         *
         * @type { PeriodUnit }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Period unit.
         *
         * @type { PeriodUnit }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        periodUnit: PeriodUnit;
        /**
         * Number of periods.
         *
         * @type { number }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Number of periods.
         *
         * @type { number }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        periodCount: number;
        /**
         * Subscription group id.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Subscription group id.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        groupId: string;
        /**
         * Subscription group level.The rank of the subscription relative to other subscriptions in the same subscription group.
         *
         * @type { number }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Subscription group level.The rank of the subscription relative to other subscriptions in the same subscription group.
         *
         * @type { number }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        groupLevel: number;
        /**
         * Whether a user has subscribed to promotions in the same group.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Whether a user has subscribed to promotions in the same group.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        hasEligibilityForIntroOffer?: boolean;
        /**
         * Introductory offer.
         *
         * @type { ?SubscriptionOffer }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Introductory offer.
         *
         * @type { ?SubscriptionOffer }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        introductoryOffer?: SubscriptionOffer;
    }
    /**
     * Subscription offer information.
     *
     * @typedef SubscriptionOffer
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    /**
     * Subscription offer information.
     *
     * @typedef SubscriptionOffer
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface SubscriptionOffer {
        /**
         * Payment mode of the offer.
         *
         * @type { OfferPaymentMode }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Payment mode of the offer.
         *
         * @type { OfferPaymentMode }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        paymentMode: OfferPaymentMode;
        /**
         * Period unit.
         *
         * @type { PeriodUnit }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Period unit.
         *
         * @type { PeriodUnit }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        periodUnit: PeriodUnit;
        /**
         * Number of promotion periods.
         *
         * @type { number }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Number of promotion periods.
         *
         * @type { number }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        periodCount: number;
        /**
         * Displayed price of the offer, including the currency symbol and actual price of the product.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Displayed price of the offer, including the currency symbol and actual price of the product.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        localPrice: string;
        /**
         * Offer price in micro unit, which equals to the actual offer price multiplied by 1,000,000.
         *
         * @type { number }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Offer price in micro unit, which equals to the actual offer price multiplied by 1,000,000.
         *
         * @type { number }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        microPrice: number;
        /**
         * Subscription offer type.
         *
         * @type { OfferType }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Subscription offer type.
         *
         * @type { OfferType }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        offerType: OfferType;
    }
    /**
     * PurchaseResult object represents purchase result.
     *
     * @typedef PurchaseResult
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     * @deprecated since 4.1.0(11)
     */
    interface PurchaseResult {
        /**
         * Information about products that have been purchased.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         * @deprecated since 4.1.0(11)
         */
        inAppPurchaseData: string;
        /**
         * Signature string generated after consumption data is signed using a private payment key.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         * @deprecated since 4.1.0(11)
         */
        signature: string;
        /**
         * Signature algorithm.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         * @deprecated since 4.1.0(11)
         */
        signatureAlgorithm: string;
    }
    /**
     * Represents create purchase result.
     *
     * @typedef CreatePurchaseResult
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    /**
     * Represents create purchase result.
     *
     * @typedef CreatePurchaseResult
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface CreatePurchaseResult {
        /**
         * Purchase data, including purchase order and subscription status.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Purchase data, including purchase order and subscription status.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        purchaseData: string;
    }
    /**
     * ConsumeResult object represents consume result.
     *
     * @typedef ConsumeResult
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     * @deprecated since 4.1.0(11)
     */
    interface ConsumeResult {
        /**
         * Consumption result data.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         * @deprecated since 4.1.0(11)
         */
        consumedPurchaseData: string;
        /**
         * Signature string generated after consumption data is signed using a private payment key.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         * @deprecated since 4.1.0(11)
         */
        signature: string;
        /**
         * Signature algorithm.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         * @deprecated since 4.1.0(11)
         */
        signatureAlgorithm: string;
    }
    /**
     * Represents the parameter of UI window.
     *
     * @typedef UIWindowParameter
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface UIWindowParameter {
        /**
         * The window screen mode.
         *
         * @type { WindowScreenMode }
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        windowScreenMode: WindowScreenMode;
    }
    /**
     * Checks whether the currently signed-in HUAWEI ID is located in a country or region where HUAWEI IAP is available.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @returns { Promise<void> } return void
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Checks whether the currently signed-in HUAWEI ID is located in a country or region where HUAWEI IAP is available.
     *
     * @param { common.Context } context - The context of an ability.
     * @returns { Promise<void> } return void
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    /**
     * Checks whether the currently signed-in HUAWEI ID is located in a country or region where HUAWEI IAP is available.
     *
     * @param { common.Context } context - The context of an ability.
     * @returns { Promise<void> } return void
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function queryEnvironmentStatus(context: common.Context): Promise<void>;
    /**
     * Checks whether the currently signed-in HUAWEI ID is located in a country or region where HUAWEI IAP is available.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { AsyncCallback<void> } callback - callback
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Checks whether the currently signed-in HUAWEI ID is located in a country or region where HUAWEI IAP is available.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { AsyncCallback<void> } callback - callback
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    function queryEnvironmentStatus(context: common.Context, callback: AsyncCallback<void>): void;
    /**
     * Obtains product details configured in AppGallery Connect.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { QueryProductsParameter } parameter - QueryProductsParameter.
     * @returns { Promise<Array<Product>> } Returns an array of products.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860003 - Invalid product information.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860007 - The app to which the product belongs is not released in a specified location.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Obtains product details configured in AppGallery Connect.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { QueryProductsParameter } parameter - QueryProductsParameter.
     * @returns { Promise<Array<Product>> } Returns an array of products.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860003 - Invalid product information.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860007 - The app to which the product belongs is not released in a specified location.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function queryProducts(context: common.UIAbilityContext, parameter: QueryProductsParameter): Promise<Array<Product>>;
    /**
     * Obtains product details configured in AppGallery Connect.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { QueryProductsParameter } parameter - QueryProductsParameter.
     * @param { AsyncCallback<Array<Product>> } callback - callback with an array of products
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860003 - Invalid product information.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860007 - The app to which the product belongs is not released in a specified location.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    function queryProducts(context: common.UIAbilityContext, parameter: QueryProductsParameter, callback: AsyncCallback<Array<Product>>): void;
    /**
     * Creates orders for products managed by the PMS, including consumables and non-consumables.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { PurchaseParameter } parameter - PurchaseParameter
     * @returns { Promise<PurchaseResult> } Returns PurchaseResult.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860003 - Invalid product information.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860007 - The app to which the product belongs is not released in a specified location.
     * @throws { BusinessError } 1001860051 - Failed to purchase a product because the user already owns the product.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @throws { BusinessError } 1001860056 - The user is not allowed to make purchase.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     * @deprecated since 4.1.0(11)
     * @useinstead iap#createPurchase
     */
    function purchase(context: common.UIAbilityContext, parameter: PurchaseParameter): Promise<PurchaseResult>;
    /**
     * Creates orders for products managed by the PMS, including consumables and non-consumables.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { PurchaseParameter } parameter - PurchaseParameter
     * @param { AsyncCallback<PurchaseResult> } callback - PurchaseResult.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860003 - Invalid product information.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860007 - The app to which the product belongs is not released in a specified location.
     * @throws { BusinessError } 1001860051 - Failed to purchase a product because the user already owns the product.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @throws { BusinessError } 1001860056 - The user is not allowed to make purchase.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     * @deprecated since 4.1.0(11)
     * @useinstead iap#createPurchase
     */
    function purchase(context: common.UIAbilityContext, parameter: PurchaseParameter, callback: AsyncCallback<PurchaseResult>): void;
    /**
     * Creates orders for products managed by the PMS, including all type of products.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { PurchaseParameter } parameter - Purchase parameter.
     * @returns { Promise<CreatePurchaseResult> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860003 - Invalid product information.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860007 - The app to which the product belongs is not released in a specified location.
     * @throws { BusinessError } 1001860051 - Failed to purchase a product because the user already owns the product.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @throws { BusinessError } 1001860056 - The user is not allowed to make purchase.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    /**
     * Creates orders for products managed by the PMS, including all type of products.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { PurchaseParameter } parameter - Purchase parameter.
     * @returns { Promise<CreatePurchaseResult> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860003 - Invalid product information.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860007 - The app to which the product belongs is not released in a specified location.
     * @throws { BusinessError } 1001860051 - Failed to purchase a product because the user already owns the product.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @throws { BusinessError } 1001860056 - The user is not allowed to make purchase.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function createPurchase(context: common.UIAbilityContext, parameter: PurchaseParameter): Promise<CreatePurchaseResult>;
    /**
     * Creates orders for products managed by the PMS, including all type of products.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { PurchaseParameter } parameter - Purchase parameter.
     * @param { AsyncCallback<CreatePurchaseResult> } callback - The callback of creating purchase result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860003 - Invalid product information.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860007 - The app to which the product belongs is not released in a specified location.
     * @throws { BusinessError } 1001860051 - Failed to purchase a product because the user already owns the product.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @throws { BusinessError } 1001860056 - The user is not allowed to make purchase.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    function createPurchase(context: common.UIAbilityContext, parameter: PurchaseParameter, callback: AsyncCallback<CreatePurchaseResult>): void;
    /**
     * Queries information about all purchased products, including consumables and non-consumables.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { QueryPurchasesParameter } parameter - QueryPurchasesParameter
     * @returns { Promise<QueryPurchasesResult> } QueryPurchasesResult
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860003 - Invalid product information.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860007 - The app to which the product belongs is not released in a specified location.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860053 - The purchase has been finished and cannot be finished again.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     * @deprecated since 4.1.0(11)
     * @useinstead iap#queryPurchases
     */
    function queryOwnedPurchases(context: common.UIAbilityContext, parameter: QueryPurchasesParameter): Promise<QueryPurchasesResult>;
    /**
     * Queries information about all purchased products, including consumables and non-consumables.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { QueryPurchasesParameter } parameter - QueryPurchasesParameter
     * @param { AsyncCallback<QueryPurchasesResult> } callback - callback
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860003 - Invalid product information.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860007 - The app to which the product belongs is not released in a specified location.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860053 - The purchase has been finished and cannot be finished again.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     * @deprecated since 4.1.0(11)
     * @useinstead iap#queryPurchases
     */
    function queryOwnedPurchases(context: common.UIAbilityContext, parameter: QueryPurchasesParameter, callback: AsyncCallback<QueryPurchasesResult>): void;
    /**
     * Consumes a consumable after it is delivered to a user who has completed payment.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { ConsumePurchaseParameter } parameter - Returns PurchaseResult.
     * @returns { Promise<ConsumeResult> } Returns PurchaseResult.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860007 - The app to which the product belongs is not released in a specified location.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860052 - The purchase cannot be finished because the user has not paid for it.
     * @throws { BusinessError } 1001860053 - The purchase has been finished and cannot be finished again.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     * @deprecated since 4.1.0(11)
     * @useinstead iap#finishPurchase
     */
    function consumePurchase(context: common.UIAbilityContext, parameter: ConsumePurchaseParameter): Promise<ConsumeResult>;
    /**
     * Consumes a consumable after it is delivered to a user who has completed payment.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { ConsumePurchaseParameter } parameter - ConsumePurchaseParameter.
     * @param { AsyncCallback<ConsumeResult> } callback - callback.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860007 - The app to which the product belongs is not released in a specified location.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860052 - The purchase cannot be finished because the user has not paid for it.
     * @throws { BusinessError } 1001860053 - The purchase has been finished and cannot be finished again.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     * @deprecated since 4.1.0(11)
     * @useinstead iap#finishPurchase
     */
    function consumePurchase(context: common.UIAbilityContext, parameter: ConsumePurchaseParameter, callback: AsyncCallback<ConsumeResult>): void;
    /**
     * Completes the purchase after delivering the purchased content or enable the purchased service to user.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { FinishPurchaseParameter } parameter - The request parameter for finishing purchase.
     * @returns { Promise<void> } Returns void.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860052 - The purchase cannot be finished because the user has not paid for it.
     * @throws { BusinessError } 1001860053 - The purchase has been finished and cannot be finished again.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    /**
     * Completes the purchase after delivering the purchased content or enable the purchased service to user.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { FinishPurchaseParameter } parameter - The request parameter for finishing purchase.
     * @returns { Promise<void> } Returns void.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860052 - The purchase cannot be finished because the user has not paid for it.
     * @throws { BusinessError } 1001860053 - The purchase has been finished and cannot be finished again.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function finishPurchase(context: common.UIAbilityContext, parameter: FinishPurchaseParameter): Promise<void>;
    /**
     * Completes the purchase after delivering the purchased content or enable the purchased service to user.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { FinishPurchaseParameter } parameter - The request parameter for finishing purchase.
     * @param { AsyncCallback<void> } callback - callback.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860052 - The purchase cannot be finished because the user has not paid for it.
     * @throws { BusinessError } 1001860053 - The purchase has been finished and cannot be finished again.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    function finishPurchase(context: common.UIAbilityContext, parameter: FinishPurchaseParameter, callback: AsyncCallback<void>): void;
    /**
     * Obtains the historical consumption information about consumable receipts.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { QueryPurchasesParameter } parameter - QueryPurchasesParameter.
     * @returns { Promise<QueryPurchasesResult> } return QueryPurchasesResult
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     * @deprecated since 4.1.0(11)
     * @useinstead iap#queryPurchases
     */
    function queryPurchaseRecords(context: common.UIAbilityContext, parameter: QueryPurchasesParameter): Promise<QueryPurchasesResult>;
    /**
     * Obtains the historical consumption information about consumable receipts.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { QueryPurchasesParameter } parameter - parameter of type QueryPurchasesParameter.
     * @param { AsyncCallback<QueryPurchasesResult> } callback - callback.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     * @deprecated since 4.1.0(11)
     * @useinstead iap#queryPurchases
     */
    function queryPurchaseRecords(context: common.UIAbilityContext, parameter: QueryPurchasesParameter, callback: AsyncCallback<QueryPurchasesResult>): void;
    /**
     * Obtains the purchased data information.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { QueryPurchasesParameter } parameter - Query purchases parameter.
     * @returns { Promise<QueryPurchaseResult> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    /**
     * Obtains the purchased data information.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { QueryPurchasesParameter } parameter - Query purchases parameter.
     * @returns { Promise<QueryPurchaseResult> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function queryPurchases(context: common.UIAbilityContext, parameter: QueryPurchasesParameter): Promise<QueryPurchaseResult>;
    /**
     * Obtains the purchased data information.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { QueryPurchasesParameter } parameter - Query purchases parameter.
     * @param { AsyncCallback<QueryPurchaseResult> } callback - The callback of querying purchases.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    function queryPurchases(context: common.UIAbilityContext, parameter: QueryPurchasesParameter, callback: AsyncCallback<QueryPurchaseResult>): void;
    /**
     * Show subscription management page, include subscription list and detail.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { UIWindowParameter } uiParameter - A parameter that manages the ui window style.
     * @param { string } [groupId] - Subscription group id.
     * @returns { Promise<void> } return void
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function showManagedSubscriptions(context: common.Context, uiParameter: UIWindowParameter, groupId?: string): Promise<void>;
    /**
     * Checks whether the signed-in HUAWEI ID and the app provision type meet the requirements of the sandbox testing.
     *
     * @param { common.Context } context - The context of an ability.
     * @returns { Promise<boolean> } If in sandbox environment return true, otherwise return false.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001860001 - System internal error.
     * @throws { BusinessError } 1001860002 - The application is not authorized.
     * @throws { BusinessError } 1001860004 - Too frequent API calls.
     * @throws { BusinessError } 1001860005 - Network connection error.
     * @throws { BusinessError } 1001860050 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1001860054 - The country or region of the signed-in HUAWEI ID does not support IAP.
     * @throws { BusinessError } 1001860057 - The app provision type is not debug.
     * @throws { BusinessError } 1001860058 - The HUAWEI ID is not test account.
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function isSandboxActivated(context: common.Context): Promise<boolean>;
    /**
     * Indicates the product Type.
     *
     * @enum { number }
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Indicates the product Type.
     *
     * @enum { number }
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum ProductType {
        /**
         * Consumable product
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Consumable product
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        CONSUMABLE = 0,
        /**
         * Non-Consumable product for one time purchase
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Non-Consumable product for one time purchase
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        NONCONSUMABLE = 1,
        /**
         * Auto-renewable subscription product
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Auto-renewable subscription product
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        AUTORENEWABLE = 2
    }
    /**
     * Indicates the purchase querying type.
     *
     * @enum { number }
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    /**
     * Indicates the purchase querying type.
     *
     * @enum { number }
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum PurchaseQueryType {
        /**
         * All purchases, including purchased consumables, non-consumables and auto-renewables history.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * All purchases, including purchased consumables, non-consumables and auto-renewables history.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        ALL = 0,
        /**
         * Purchased but not delivered products.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Purchased but not delivered products.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNFINISHED = 1,
        /**
         * Purchased non-consumable and auto-renewables currently in effect.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Purchased non-consumable and auto-renewables currently in effect.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        CURRENT_ENTITLEMENT = 2
    }
    /**
     * Indicates the subscription period unit.
     *
     * @enum { number }
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    /**
     * Indicates the subscription period unit.
     *
     * @enum { number }
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum PeriodUnit {
        /**
         * Day unit.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Day unit.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        DAY = 0,
        /**
         * Week unit.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Week unit.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        WEEK = 1,
        /**
         * Month unit.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Month unit.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        MONTH = 2,
        /**
         * Year unit.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Year unit.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        YEAR = 3,
        /**
         * Minute unit.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Minute unit.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        MINUTE = 4
    }
    /**
     * Indicates the payment mode of subscription offer.
     *
     * @enum { number }
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    /**
     * Indicates the payment mode of subscription offer.
     *
     * @enum { number }
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum OfferPaymentMode {
        /**
         * Free trial.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Free trial.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        FREE_TRIAL = 1,
        /**
         * Indicates the discount applies over a single billing period or multiple billing periods.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Indicates the discount applies over a single billing period or multiple billing periods.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        PAY_AS_YOU_GO = 2,
        /**
         * Indicates the system applies the discount up front.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Indicates the system applies the discount up front.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        PAY_UP_FRONT = 3
    }
    /**
     * Indicates the type of subscription offer.
     *
     * @enum { number }
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    /**
     * Indicates the type of subscription offer.
     *
     * @enum { number }
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum OfferType {
        /**
         * Introductory offer.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Introductory offer.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        INTRODUCTORY = 0,
        /**
         * Promotional offer.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Promotional offer.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        PROMOTIONAL = 1
    }
    /**
     * Indicates the screen mode of window.
     *
     * @enum { number }
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum WindowScreenMode {
        /**
         * Semi-modal dialog box.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        DIALOG_BOX = 1,
        /**
         * Full screen.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        FULLSCREEN = 2
    }
    /**
     * Indicates the product status.
     *
     * @enum { number }
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum ProductStatus {
        /**
         * Valid.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        VALID = 0,
        /**
         * Cancled. Products in this status cannot be renewed or subscribed to.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        CANCELED = 1,
        /**
         * Offline. New subscription is not allowed, but existed subscription can be renewed.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        OFFLINE = 3
    }
    /**
     * Indicates the iap error code.
     *
     * @enum { number }
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    /**
     * Indicates the iap error code.
     *
     * @enum { number }
     * @syscap SystemCapability.Payment.IAP
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum IAPErrorCode {
        /**
         * The operation was canceled by the user.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * The operation was canceled by the user.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        USER_CANCELED = 1001860000,
        /**
         * System internal error.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * System internal error.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        SYSTEM_ERROR = 1001860001,
        /**
         * The application is not authorized.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * The application is not authorized.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        APP_NOT_AUTHORIZED = 1001860002,
        /**
         * Invalid product information.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Invalid product information.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        INVALID_PRODUCT = 1001860003,
        /**
         * Too frequent API calls.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Too frequent API calls.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        FREQUENT_CALLS = 1001860004,
        /**
         * Network connection error.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Network connection error.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        NETWORK_ERROR = 1001860005,
        /**
         * The app to which the product belongs is not released in a specified location.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * The app to which the product belongs is not released in a specified location.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        PRODUCT_TERRITORY_NOT_SUPPORTED = 1001860007,
        /**
         * The HUAWEI ID is not signed in.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * The HUAWEI ID is not signed in.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        ACCOUNT_NOT_LOGGED_IN = 1001860050,
        /**
         * Failed to purchase a product because the user already owns the product.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * Failed to purchase a product because the user already owns the product.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        PRODUCT_OWNED = 1001860051,
        /**
         * The purchase cannot be finished because the user has not paid for it.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * The purchase cannot be finished because the user has not paid for it.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        PURCHASE_NOT_PAID = 1001860052,
        /**
         * The purchase has been finished and cannot be finished again.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * The purchase has been finished and cannot be finished again.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        PURCHASE_FINISHED = 1001860053,
        /**
         * The country or region of the signed-in HUAWEI ID does not support IAP.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * The country or region of the signed-in HUAWEI ID does not support IAP.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        ACCOUNT_TERRITORY_NOT_SUPPORTED = 1001860054,
        /**
         * The user is not allowed to make purchase.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        /**
         * The user is not allowed to make purchase.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        USER_NOT_ALLOWED = 1001860056,
        /**
         * The app provision type is not debug.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        APP_NOT_DEBUG = 1001860057,
        /**
         * The HUAWEI ID is not test account.
         *
         * @syscap SystemCapability.Payment.IAP
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        ACCOUNT_NOT_TEST = 1001860058
    }
}
export default iap;
