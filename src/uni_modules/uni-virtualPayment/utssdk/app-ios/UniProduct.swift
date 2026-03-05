//
//  UniProduct.swift
//  UniStorekit
//
//  Created by DCloud on 2024/6/28.
//

import Foundation
import StoreKit

/// Information about a product configured in App Store Connect.
@available(iOS 15.0, *)
public struct UniProduct: Identifiable, Hashable {
    public let id: String
    public var title: String?
    public var description: String?
    public var price: Decimal?
    public var displayPrice: String?
    public var currencyCode: String?
    public var product: Product?
    
    /// The type for this product. e.g. consumable, nonConsumable, autoRenewable, nonRenewable
    public var type: UniProductType? {
        if let product {
            return UniProductType(type: product.type)
        }
        return nil
    }
    
    /// 判断app store中是否包含该product
    public var isValidFromAppStore: Bool {
        return product != nil
    }
    
    public init(identifier: String) {
        self.id = identifier
    }
    
    public init(product: Product) {
        self.init(identifier: product.id)
        self.title = product.displayName
        self.description = product.description
        self.displayPrice = product.displayPrice
        self.currencyCode = product.priceFormatStyle.currencyCode
        self.price = product.price
        self.product = product
    }
}
