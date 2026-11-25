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
struct UniProduct: Identifiable, Hashable {
    let id: String
    var title: String?
    var description: String?
    var price: Decimal?
    var displayPrice: String?
    var currencyCode: String?
    var product: Product?
    
    /// The type for this product. e.g. consumable, nonConsumable, autoRenewable, nonRenewable
    var type: UniProductType? {
        if let product {
            return UniProductType(type: product.type)
        }
        return nil
    }
    
    /// 判断app store中是否包含该product
    var isValidFromAppStore: Bool {
        return product != nil
    }
    
    init(identifier: String) {
        self.id = identifier
    }
    
    init(product: Product) {
        self.init(identifier: product.id)
        self.title = product.displayName
        self.description = product.description
        self.displayPrice = product.displayPrice
        self.currencyCode = product.priceFormatStyle.currencyCode
        self.price = product.price
        self.product = product
    }
}
