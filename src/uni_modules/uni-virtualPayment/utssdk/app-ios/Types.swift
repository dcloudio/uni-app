//
//  Types.swift
//  UniStorekit
//
//  Created by DCloud on 2024/6/28.
//

import Foundation
import StoreKit

@available(iOS 15.0, *)
public enum UniPurchaseResult {
    case success(UniPurchase)
    case pending
    case error(UniStoreKitError)
    
    public var isSuccess: Bool {
        if case .success = self {
            return true
        }
        return false
    }
}

@available(iOS 15.0, *)
public enum UniProductType {
    case consumable
    case nonConsumable
    case autoRenewable
    case nonRenewable
    case unknown
    
    init(type: Product.ProductType) {
        switch type {
        case .consumable: self = .consumable
        case .nonConsumable: self = .nonConsumable
        case .autoRenewable: self = .autoRenewable
        case .nonRenewable: self = .nonRenewable
        default: self = .unknown
        }
    }
}
