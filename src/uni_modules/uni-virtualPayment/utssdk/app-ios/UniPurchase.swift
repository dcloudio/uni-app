//
//  UniPurchase.swift
//  UniStorekit
//
//  Created by DCloud on 2024/6/28.
//

import Foundation
import StoreKit

struct UniPurchaseOption {
    var quantity: Int = 1
    var appAccountToken: String?
    var simulatesAskToBuyInSandbox: Bool = false
    var promotionalOffer: UniPromotionalOffer?
}

struct UniPromotionalOffer {
    var offerID: String = ""
    var keyID: String = ""
    var nonce: String = ""
    var signature: String = ""
    var timestamp: Int = 1
}

@available(iOS 15.0, *)
struct UniPurchase: Identifiable, Hashable {
    var product: UniProduct
    var transaction: Transaction
    
    /// Transaction id
    var id: String {
        return String(transaction.id)
    }
    
    var originalID: String {
        return String(transaction.originalID)
    }
    
    var productId: String {
        return transaction.productID
    }
    
    var quantity: Int {
        return transaction.purchasedQuantity
    }
    
    var purchaseDate: Date {
        return transaction.purchaseDate
    }
    
    var originalPurchaseDate: Date {
        return transaction.originalPurchaseDate
    }
    
    var appAccountToken: String? {
        return transaction.appAccountToken?.uuidString.lowercased()
    }
    
    var jsonRepresentationBase64String: String {
        return transaction.jsonRepresentation.base64EncodedString()
    }
    
    func finish() async {
        await transaction.finish()
        let purchseKey = self.productId + String(self.id) + String(self.originalID) + self.jsonRepresentationBase64String
        if let _ = UniStoreKit.shared.cacheTransactionsMap[purchseKey] {
            UniStoreKit.shared.cacheTransactionsMap.removeValue(forKey: purchseKey)
        }
    } 
    
    func finish(completion: (() -> Void)?) {
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
