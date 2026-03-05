//
//  Archive+MemoryFile.swift
//  ZIPFoundation
//
//  Copyright © 2017-2021 Thomas Zoechling, https://www.peakstep.com and the ZIP Foundation project authors.
//  Released under the MIT License.
//
//  See https://github.com/weichsel/ZIPFoundation/blob/master/LICENSE for license information.
//

import Foundation

extension Archive {
  var isMemoryArchive: Bool { url.scheme == memoryURLScheme }
}

#if swift(>=5.0)

extension Archive {
  /// Returns a `Data` object containing a representation of the receiver.
  var data: Data? { memoryFile?.data }
}

class MemoryFile {

  // MARK: Lifecycle

  init(data: Data = Data()) {
    self.data = data
  }

  // MARK: Internal

  private(set) var data: Data

  func open(mode: String) -> FILEPointer? {
    let cookie = Unmanaged.passRetained(self)
    let writable = mode.count > 0 && (mode.first! != "r" || mode.last! == "+")
    let append = mode.count > 0 && mode.first! == "a"
    #if os(macOS) || canImport(UIKit) || os(Android)
    let result = writable
      ? funopen(cookie.toOpaque(), readStub, writeStub, seekStub, closeStub)
      : funopen(cookie.toOpaque(), readStub, nil, seekStub, closeStub)
    #else
    let stubs = cookie_io_functions_t(read: readStub, write: writeStub, seek: seekStub, close: closeStub)
    let result = fopencookie(cookie.toOpaque(), mode, stubs)
    #endif
    if append {
      fseeko(result, 0, SEEK_END)
    }
    return result
  }

  // MARK: Private

  private var offset = 0

}

extension MemoryFile {
  fileprivate func readData(buffer: UnsafeMutableRawBufferPointer) -> Int {
    let size = min(buffer.count, data.count - offset)
    let start = data.startIndex
    data.copyBytes(to: buffer.bindMemory(to: UInt8.self), from: start + offset..<start + offset + size)
    offset += size
    return size
  }

  fileprivate func writeData(buffer: UnsafeRawBufferPointer) -> Int {
    let start = data.startIndex
    if offset < data.count, offset + buffer.count > data.count {
      data.removeSubrange(start + offset..<start + data.count)
    } else if offset > data.count {
      data.append(Data(count: offset - data.count))
    }
    if offset == data.count {
      data.append(buffer.bindMemory(to: UInt8.self))
    } else {
      let start = data.startIndex // May have changed in earlier mutation
      data.replaceSubrange(start + offset..<start + offset + buffer.count, with: buffer.bindMemory(to: UInt8.self))
    }
    offset += buffer.count
    return buffer.count
  }

  fileprivate func seek(offset: Int, whence: Int32) -> Int {
    var result = -1
    if whence == SEEK_SET {
      result = offset
    } else if whence == SEEK_CUR {
      result = self.offset + offset
    } else if whence == SEEK_END {
      result = data.count + offset
    }
    self.offset = result
    return self.offset
  }
}

private func fileFromCookie(cookie: UnsafeRawPointer) -> MemoryFile {
  Unmanaged<MemoryFile>.fromOpaque(cookie).takeUnretainedValue()
}

private func closeStub(_ cookie: UnsafeMutableRawPointer?) -> Int32 {
  if let cookie {
    Unmanaged<MemoryFile>.fromOpaque(cookie).release()
  }
  return 0
}

#if os(macOS) || canImport(UIKit) || os(Android)
private func readStub(
  _ cookie: UnsafeMutableRawPointer?,
  _ bytePtr: UnsafeMutablePointer<Int8>?,
  _ count: Int32)
  -> Int32
{
  guard let cookie, let bytePtr else { return 0 }
  return Int32(fileFromCookie(cookie: cookie).readData(
    buffer: UnsafeMutableRawBufferPointer(start: bytePtr, count: Int(count))))
}

private func writeStub(
  _ cookie: UnsafeMutableRawPointer?,
  _ bytePtr: UnsafePointer<Int8>?,
  _ count: Int32)
  -> Int32
{
  guard let cookie, let bytePtr else { return 0 }
  return Int32(fileFromCookie(cookie: cookie).writeData(
    buffer: UnsafeRawBufferPointer(start: bytePtr, count: Int(count))))
}

private func seekStub(
  _ cookie: UnsafeMutableRawPointer?,
  _ offset: fpos_t,
  _ whence: Int32)
  -> fpos_t
{
  guard let cookie else { return 0 }
  return fpos_t(fileFromCookie(cookie: cookie).seek(offset: Int(offset), whence: whence))
}

#else
private func readStub(
  _ cookie: UnsafeMutableRawPointer?,
  _ bytePtr: UnsafeMutablePointer<Int8>?,
  _ count: Int)
  -> Int
{
  guard let cookie, let bytePtr else { return 0 }
  return fileFromCookie(cookie: cookie).readData(
    buffer: UnsafeMutableRawBufferPointer(start: bytePtr, count: count))
}

private func writeStub(
  _ cookie: UnsafeMutableRawPointer?,
  _ bytePtr: UnsafePointer<Int8>?,
  _ count: Int)
  -> Int
{
  guard let cookie, let bytePtr else { return 0 }
  return fileFromCookie(cookie: cookie).writeData(
    buffer: UnsafeRawBufferPointer(start: bytePtr, count: count))
}

private func seekStub(
  _ cookie: UnsafeMutableRawPointer?,
  _ offset: UnsafeMutablePointer<Int>?,
  _ whence: Int32)
  -> Int32
{
  guard let cookie, let offset else { return 0 }
  let result = fileFromCookie(cookie: cookie).seek(offset: Int(offset.pointee), whence: whence)
  if result >= 0 {
    offset.pointee = result
    return 0
  } else {
    return -1
  }
}
#endif
#endif
