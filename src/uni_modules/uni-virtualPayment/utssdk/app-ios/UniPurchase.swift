//
//  UniPurchase.swift
//  UniStorekit
//
//  Created by DCloud on 2024/6/28.
//

import Foundation
import StoreKit

public struct UniPurchaseOption {
    public var quantity: Int = 1
    public var appAccountToken: String?
    public var simulatesAskToBuyInSandbox: Bool = false
    public var promotionalOffer: UniPromotionalOffer?
}

public struct UniPromotionalOffer {
    public var offerID: String = ""
    public var keyID: String = ""
    public var nonce: String = ""
    public var signature: String = ""
    public var timestamp: Int = 1
}

@available(iOS 15.0, *)
public struct UniPurchase: Identifiable, Hashable {
    public var product: UniProduct
    public var transaction: Transaction
    
    /// Transaction id
    public var id: String {
        return String(transaction.id)
    }
    
    public var originalID: String {
        return String(transaction.originalID)
    }
    
    public var productId: String {
        return transaction.productID
    }
    
    public var quantity: Int {
        return transaction.purchasedQuantity
    }
    
    public var purchaseDate: Date {
        return transaction.purchaseDate
    }
    
    public var originalPurchaseDate: Date {
        return transaction.originalPurchaseDate
    }
    
    public var appAccountToken: String? {
        return transaction.appAccountToken?.uuidString.lowercased()
    }
    
    public var jsonRepresentationBase64String: String {
        return transaction.jsonRepresentation.base64EncodedString()
    }
    
    public func finish() async {
        await transaction.finish()
        let purchseKey = self.productId + String(self.id) + String(self.originalID) + self.jsonRepresentationBase64String
        if let _ = UniStoreKit.shared.cacheTransactionsMap[purchseKey] {
            UniStoreKit.shared.cacheTransactionsMap.removeValue(forKey: purchseKey)
        }
    } 
    
    public func finish(completion: (() -> Void)?) {
        Task {
            await transaction.finish()
            let purchseKey = self.productId + String(self.id) + String(self.originalID) + self.jsonRepresentationBase64String
            if let _ = UniStoreKit.shared.cacheTransactionsMap[purchseKey] {
                UniStoreKit.shared.cacheTransactionsMap.removeValue(forKey: purchseKey)
                // print("-------finish productId= \(self.productId)")
            }
            
            completion?()
        }
    }
}
