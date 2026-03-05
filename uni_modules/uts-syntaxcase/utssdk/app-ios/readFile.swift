import DCloudUTSFoundation

class ReadFile {
	public static func readFile(
	    _ path: String,
	    _ completionHandler: ((ArrayBuffer?, NSNumber) -> Void)? = nil
	) {
	    if FileManager.default.fileExists(atPath: path) == false {
	        completionHandler?(nil, 1)
	        return
	    }
	    
	    let fileUrl = URL(fileURLWithPath: path)
	    
	    do {
	        let fileData = try Data(contentsOf: fileUrl)
	        let result = ArrayBuffer.fromData(fileData)
	        if result == nil {
	            completionHandler?(nil, 2)
	            return
	        }
	        completionHandler?(result, 0)
	    } catch {
	        completionHandler?(nil, 1)
	    }
	}
}
