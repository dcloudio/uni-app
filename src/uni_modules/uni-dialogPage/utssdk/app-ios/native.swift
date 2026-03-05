
import Foundation
import DCloudUTSFoundation
import DCloudUniappRuntime

typealias RouteErrorCode = NSNumber;

public typealias OpenDialogPageSuccess = AsyncApiSuccessResult
public typealias OpenDialogPageSuccessCallback = (OpenDialogPageSuccess)->Void
public protocol OpenDialogPageFail : IUniError {}
public typealias OpenDialogPageFailCallback = (OpenDialogPageFail)->Void
public typealias OpenDialogPageComplete = AsyncApiResult
public typealias OpenDialogPageCompleteCallback = (OpenDialogPageComplete)->Void


public typealias CloseDialogPageSuccess = AsyncApiSuccessResult
public typealias CloseDialogPageSuccessCallback = (CloseDialogPageSuccess)->Void
public protocol CloseDialogPageFail : IUniError {}
public typealias CloseDialogPageFailCallback = (CloseDialogPageFail)->Void
public typealias CloseDialogPageComplete = AsyncApiResult
public typealias CloseDialogPageCompleteCallback = (CloseDialogPageComplete)->Void

public class OpenDialogPageSuccessImpl : OpenDialogPageSuccess {
   public var errMsg: String = "openDialogPage: ok"
   init(_ args : Map<String, Any> ) {
       if  let errMsg = args["errMsg"] as? String {
           self.errMsg = errMsg
       }
   }
}

public class EventChannel {}

public class OpenDialogPageFailImpl : UniError, OpenDialogPageFail {
   init(_ args : Map<String, Any> ) {
       super.init()
       if  let errCode = args["errCode"] as? NSNumber {
           self.errCode = errCode
       }
       if  let errSubject = args["errSubject"] as? String {
           self.errSubject = errSubject
       }
       if  let errMsg = args["message"] as? String {
           self.errMsg = errMsg
       }
   }
}

open class OpenDialogPageOptions{
    public init() {}
    public init(_ obj: UTSJSONObject) {
        if let tmp = obj["url"] as? String {
            self.url = tmp
        }
        if let tmp = obj["animationType"] as? String {
            self.animationType = tmp
        }

        if let tmp = obj["animationDuration"] as? Float {
            self.animationDuration = NSNumber(tmp)
        }
        if let tmp = obj["disableEscBack"] as? Bool {
            self.disableEscBack = NSNumber(tmp)
        }

        if let tmp = obj["triggerParentHide"] as? Bool {
            self.triggerParentHide = NSNumber(tmp)
        }

        self.parentPage = obj["parentPage"]
        if let tmp = obj["success"] as? OpenDialogPageSuccessCallback {
            self.success = tmp
        }
        if let tmp = obj["fail"] as? OpenDialogPageFailCallback {
            self.fail = tmp
        }
        if let tmp = obj["complete"] as? OpenDialogPageCompleteCallback {
            self.complete = tmp
        }
    }

    public var url : String = ""
    public var animationType : String? = nil
    public var animationDuration : NSNumber? = nil
    public var disableEscBack : NSNumber? = nil
    public var triggerParentHide : NSNumber? = nil
    //Todo.. parentPage应为UniPage但定义为UniPage会导致jsexport导出失败原因未知暂时定义为Any
    public var parentPage : Any? = nil
//    public var parentPage : UniPage? = nil
    public var success : OpenDialogPageSuccessCallback? = nil
    public var fail : OpenDialogPageFailCallback? = nil
    public var complete : OpenDialogPageCompleteCallback? = nil
}

public class CloseDialogPageSuccessImpl : CloseDialogPageSuccess {
   public var errMsg = "closeDialogPage: ok"
   init(_ args : Map<String, Any> ) {
       if  let errMsg = args["errMsg"] as? String {
           self.errMsg = errMsg
       }
   }
}

public class CloseDialogPageFailImpl : UniError, CloseDialogPageFail {
   init(_ args : Map<String, Any> ) {
       super.init()
       if  let errCode = args["errCode"] as? NSNumber {
           self.errCode = errCode
       }
       if  let errSubject = args["errSubject"] as? String {
           self.errSubject = errSubject
       }
       if  let errMsg = args["message"] as? String {
           self.errMsg = errMsg
       }
   }
}

open class CloseDialogPageOptions {
    public init() {}
    public init(_ obj: UTSJSONObject) {
        if let tmp = obj["dialogPage"] as? UniPage {
            self.dialogPage = tmp
        }
        if let tmp = obj["animationType"] as? String {
            self.animationType = tmp
        }
        if let tmp = obj["animationDuration"] as? Float {
            self.animationDuration = NSNumber(tmp)
        }
        if let tmp = obj["success"] as? CloseDialogPageSuccessCallback {
            self.success = tmp
        }
        if let tmp = obj["fail"] as? CloseDialogPageFailCallback {
            self.fail = tmp
        }
        if let tmp = obj["complete"] as? CloseDialogPageCompleteCallback {
            self.complete = tmp
        }
    }
    public var dialogPage : UniPage? = nil
    public var animationType : String? = nil
    public var animationDuration : NSNumber? = nil
    public var success : CloseDialogPageSuccessCallback? = nil
    public var fail : CloseDialogPageFailCallback? = nil
    public var complete : CloseDialogPageCompleteCallback? = nil
}

public func openDialogPage(_ option : OpenDialogPageOptions) -> UniPage? {
    let ocOption = UniOpenDialogPageOptions()
    ocOption.url = option.url
    ocOption.parentPage = option.parentPage
    ocOption.animationType = option.animationType
    ocOption.animationDuration = option.animationDuration
    ocOption.triggerParentHide = option.triggerParentHide 
    ocOption.success = { args in
        let res = OpenDialogPageSuccessImpl(args)
        if let callback = option.success  {
            callback( res )
        }
        if let callback = option.complete  {
            callback( res )
        }
    }
    ocOption.fail = { args in
        let res = OpenDialogPageFailImpl(args)
        if let callback = option.fail  {
            callback( res )
        }
        if let callback = option.complete  {
            callback( res )
        }
    }
       
    let dialogPage = UniUTSJSImpl.openDialogPage(ocOption) as? UniPage
    return dialogPage
}
   
public  func closeDialogPage(_ option : CloseDialogPageOptions) {
    let ocOption = UniCloseDialogPageOptions()
    if let dialogPage = option.dialogPage  {
        ocOption.dialogPage = dialogPage
    }
    ocOption.animationType = option.animationType
    ocOption.animationDuration = option.animationDuration
    ocOption.success = { args in
        let res = CloseDialogPageSuccessImpl(args)
        if let callback = option.success  {
            callback( res )
        }
        if let callback = option.complete  {
            callback( res )
        }
    }
       
    ocOption.fail = { args in
        let res = CloseDialogPageFailImpl(args)
        if let callback = option.fail  {
           callback( res )
        }
        if let callback = option.complete  {
            callback( res )
        }
    }

    UniUTSJSImpl.closeDialogPage(ocOption)
}   
