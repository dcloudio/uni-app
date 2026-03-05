//
//  EventStreamParser.swift
//  EventSource
//
//  Created by Andres on 30/05/2019.
//  Copyright © 2019 inaka. All rights reserved.
//

import Foundation

final class EventStreamParser {
    
    /*
     Events are separated by end of line. End of line can be:
     \r = CR (Carriage Return) → Used as a new line character in Mac OS before X
     \n = LF (Line Feed) → Used as a new line character in Unix/Mac OS X
     \r\n = CR + LF → Used as a new line character in Windows
     */
    private let validNewlineCharacters = ["\r\n", "\n", "\r"]
    private let dataBuffer: NSMutableData
    
    init() {
        dataBuffer = NSMutableData()
    }
    
    var currentBuffer: String? {
        return NSString(data: dataBuffer as Data, encoding: String.Encoding.utf8.rawValue) as String?
    }
    
    func append(data: Data?) -> [Event] {
        guard let data = data else { return [] }
        dataBuffer.append(data)
        
        let events = extractEventsFromBuffer().compactMap { [weak self] eventString -> Event? in
            guard let self = self else { return nil }
            return Event(eventString: eventString, newLineCharacters: self.validNewlineCharacters)
        }
        
        return events
    }
    
    private func extractEventsFromBuffer() -> [String] {
        var events = [String]()
        
        var searchRange =  NSRange(location: 0, length: dataBuffer.length)
        while let foundRange = searchFirstEventDelimiter(in: searchRange) {
            /*
             if we found a delimiter range that means that from the beggining of the buffer
             until the beggining of the range where the delimiter was found we have an event.
             The beggining of the event is: searchRange.location
             The lenght of the event is the position where the foundRange was found.
             */
            
            let dataChunk = dataBuffer.subdata(
                with: NSRange(location: searchRange.location, length: foundRange.location - searchRange.location)
            )
            
            if let text = String(bytes: dataChunk, encoding: .utf8) {
                events.append(text)
            }
            
            // We move the searchRange start position (location) after the fundRange we just found and
            searchRange.location = foundRange.location + foundRange.length
            searchRange.length = dataBuffer.length - searchRange.location
        }
        
        // 清理 dataBuffer 中已解析的部分，避免重复解析。
        dataBuffer.replaceBytes(in: NSRange(location: 0, length: searchRange.location), withBytes: nil, length: 0)
        
        return events                      
    }

    /*
     This methods returns the range of the first delimiter found in the buffer. For example:
     If in the buffer we have: `id: event-id-1\ndata:event-data-first\n\n`
     This method will return the range for the `\n\n`.
	 */ 
    private func searchFirstEventDelimiter(in range: NSRange) -> NSRange? {
        let delimiters = validNewlineCharacters.map {
            "\($0)\($0)".data(using: String.Encoding.utf8)!
        }
        
        for delimiter in delimiters {
            let foundRange = dataBuffer.range(
                of: delimiter, options: NSData.SearchOptions(), in: range
            )
            
            if foundRange.location != NSNotFound {
                return foundRange
            }
        }
        
        return nil
    }
}
