//
//  TextLayer.swift
//  Pods
//
//  Created by Brandon Withrow on 8/3/20.
//

import CoreGraphics
import CoreText
import Foundation
import QuartzCore
/// Needed for NSMutableParagraphStyle...
#if os(OSX)
import AppKit
#else
import UIKit
#endif

// MARK: - CoreTextRenderLayer

/// A CALayer subclass that renders text content using CoreText
final class CoreTextRenderLayer: CALayer {

  // MARK: Public

  public var text: String? {
    didSet {
      needsContentUpdate = true
      setNeedsLayout()
      setNeedsDisplay()
    }
  }

  public var font: CTFont? {
    didSet {
      needsContentUpdate = true
      setNeedsLayout()
      setNeedsDisplay()
    }
  }

  public var alignment: NSTextAlignment = .left {
    didSet {
      needsContentUpdate = true
      setNeedsLayout()
      setNeedsDisplay()
    }
  }

  public var lineHeight: CGFloat = 0 {
    didSet {
      needsContentUpdate = true
      setNeedsLayout()
      setNeedsDisplay()
    }
  }

  public var tracking: CGFloat = 0 {
    didSet {
      needsContentUpdate = true
      setNeedsLayout()
      setNeedsDisplay()
    }
  }

  public var fillColor: CGColor? {
    didSet {
      needsContentUpdate = true
      setNeedsLayout()
      setNeedsDisplay()
    }
  }

  public var strokeColor: CGColor? {
    didSet {
      needsContentUpdate = true
      setNeedsLayout()
      setNeedsDisplay()
    }
  }

  public var strokeWidth: CGFloat = 0 {
    didSet {
      needsContentUpdate = true
      setNeedsLayout()
      setNeedsDisplay()
    }
  }

  public var strokeOnTop = false {
    didSet {
      setNeedsLayout()
      setNeedsDisplay()
    }
  }

  public var preferredSize: CGSize? {
    didSet {
      needsContentUpdate = true
      setNeedsLayout()
      setNeedsDisplay()
    }
  }

  public func sizeToFit() {
    updateTextContent()
    bounds = drawingRect
    anchorPoint = drawingAnchor
    setNeedsLayout()
    setNeedsDisplay()
  }

  // MARK: Internal

  override func action(forKey _: String) -> CAAction? {
    nil
  }

  override func draw(in ctx: CGContext) {
    guard let attributedString else { return }
    updateTextContent()
    guard fillFrameSetter != nil || strokeFrameSetter != nil else { return }

    ctx.textMatrix = .identity
    ctx.setAllowsAntialiasing(true)
    ctx.setAllowsFontSubpixelPositioning(true)
    ctx.setAllowsFontSubpixelQuantization(true)

    ctx.setShouldAntialias(true)
    ctx.setShouldSubpixelPositionFonts(true)
    ctx.setShouldSubpixelQuantizeFonts(true)

    if contentsAreFlipped() {
      ctx.translateBy(x: 0, y: drawingRect.height)
      ctx.scaleBy(x: 1.0, y: -1.0)
    }

    let drawingPath = CGPath(rect: drawingRect, transform: nil)

    let fillFrame: CTFrame?
    if let setter = fillFrameSetter {
      fillFrame = CTFramesetterCreateFrame(setter, CFRangeMake(0, attributedString.length), drawingPath, nil)
    } else {
      fillFrame = nil
    }

    let strokeFrame: CTFrame?
    if let setter = strokeFrameSetter {
      strokeFrame = CTFramesetterCreateFrame(setter, CFRangeMake(0, attributedString.length), drawingPath, nil)
    } else {
      strokeFrame = nil
    }

    // This fixes a vertical padding issue that arises when drawing some fonts.
    // For some reason some fonts, such as Helvetica draw with and ascender that is greater than the one reported by CTFontGetAscender.
    // I suspect this is actually an issue with the Attributed string, but cannot reproduce.

    if let fillFrame {
      ctx.adjustWithLineOrigins(in: fillFrame, with: font)
    } else if let strokeFrame {
      ctx.adjustWithLineOrigins(in: strokeFrame, with: font)
    }

    if !strokeOnTop, let strokeFrame {
      CTFrameDraw(strokeFrame, ctx)
    }

    if let fillFrame {
      CTFrameDraw(fillFrame, ctx)
    }

    if strokeOnTop, let strokeFrame {
      CTFrameDraw(strokeFrame, ctx)
    }
  }

  // MARK: Private

  private var drawingRect: CGRect = .zero
  private var drawingAnchor: CGPoint = .zero
  private var fillFrameSetter: CTFramesetter?
  private var attributedString: NSAttributedString?
  private var strokeFrameSetter: CTFramesetter?
  private var needsContentUpdate = false

  // Draws Debug colors for the font alignment.
  @available(macOS 10.15, iOS 13, watchOS 6, tvOS 13, *)
  private func drawDebug(_ ctx: CGContext) {
    if let font {
      let ascent = CTFontGetAscent(font)
      let descent = CTFontGetDescent(font)
      let capHeight = CTFontGetCapHeight(font)
      let leading = CTFontGetLeading(font)

      // Ascent Red
      ctx.setFillColor(CGColor(srgbRed: 1, green: 0, blue: 0, alpha: 0.5))
      ctx.fill(CGRect(x: 0, y: 0, width: drawingRect.width, height: ascent))

      // Descent Blue
      ctx.setFillColor(CGColor(srgbRed: 0, green: 0, blue: 1, alpha: 0.5))
      ctx.fill(CGRect(x: 0, y: ascent, width: drawingRect.width, height: descent))

      // Leading Yellow
      ctx.setFillColor(CGColor(srgbRed: 1, green: 1, blue: 0, alpha: 0.5))
      ctx.fill(CGRect(x: 0, y: ascent + descent, width: drawingRect.width, height: leading))

      // Cap height Green
      ctx.setFillColor(CGColor(srgbRed: 0, green: 1, blue: 0, alpha: 0.5))
      ctx.fill(CGRect(x: 0, y: ascent - capHeight, width: drawingRect.width, height: capHeight))

      if drawingRect.height - ascent + descent + leading > 0 {
        // Remainder
        ctx.setFillColor(CGColor(srgbRed: 0, green: 1, blue: 1, alpha: 0.5))
        ctx
          .fill(CGRect(
            x: 0,
            y: ascent + descent + leading,
            width: drawingRect.width,
            height: drawingRect.height - ascent + descent + leading))
      }
    }
  }

  private func updateTextContent() {
    guard needsContentUpdate else { return }
    needsContentUpdate = false
    guard let font, let text, text.count > 0, fillColor != nil || strokeColor != nil else {
      drawingRect = .zero
      drawingAnchor = .zero
      attributedString = nil
      fillFrameSetter = nil
      strokeFrameSetter = nil
      return
    }

    // Get Font properties
    let ascent = CTFontGetAscent(font)
    let descent = CTFontGetDescent(font)
    let capHeight = CTFontGetCapHeight(font)
    let leading = CTFontGetLeading(font)
    let minLineHeight = -(ascent + descent + leading)

    // Calculate line spacing
    let lineSpacing = max(CGFloat(minLineHeight) + lineHeight, CGFloat(minLineHeight))
    // Build Attributes
    let paragraphStyle = NSMutableParagraphStyle()
    paragraphStyle.lineSpacing = lineSpacing
    paragraphStyle.lineHeightMultiple = 1
    paragraphStyle.maximumLineHeight = ascent + descent + leading
    paragraphStyle.alignment = alignment
    paragraphStyle.lineBreakMode = NSLineBreakMode.byWordWrapping
    var attributes: [NSAttributedString.Key: Any] = [
      NSAttributedString.Key.ligature: 0,
      NSAttributedString.Key.font: font,
      NSAttributedString.Key.kern: tracking,
      NSAttributedString.Key.paragraphStyle: paragraphStyle,
    ]

    if let fillColor {
      attributes[NSAttributedString.Key.foregroundColor] = fillColor
    }

    let attrString = NSAttributedString(string: text, attributes: attributes)
    attributedString = attrString

    if fillColor != nil {
      let setter = CTFramesetterCreateWithAttributedString(attrString as CFAttributedString)
      fillFrameSetter = setter
    } else {
      fillFrameSetter = nil
    }

    if let strokeColor {
      attributes[NSAttributedString.Key.foregroundColor] = nil
      attributes[NSAttributedString.Key.strokeWidth] = strokeWidth
      attributes[NSAttributedString.Key.strokeColor] = strokeColor
      let strokeAttributedString = NSAttributedString(string: text, attributes: attributes)
      strokeFrameSetter = CTFramesetterCreateWithAttributedString(strokeAttributedString as CFAttributedString)
    } else {
      strokeFrameSetter = nil
      strokeWidth = 0
    }

    guard let setter = fillFrameSetter ?? strokeFrameSetter else {
      return
    }

    // Calculate drawing size and anchor offset
    let textAnchor: CGPoint
    if let preferredSize {
      drawingRect = CGRect(origin: .zero, size: preferredSize)
      drawingRect.size.height += (ascent - capHeight)
      drawingRect.size.height += descent
      textAnchor = CGPoint(x: 0, y: ascent - capHeight)
    } else {
      let size = CTFramesetterSuggestFrameSizeWithConstraints(
        setter,
        CFRange(location: 0, length: attrString.length),
        nil,
        CGSize(width: CGFloat.greatestFiniteMagnitude, height: CGFloat.greatestFiniteMagnitude),
        nil)
      switch alignment {
      case .left:
        textAnchor = CGPoint(x: 0, y: ascent)
      case .right:
        textAnchor = CGPoint(x: size.width, y: ascent)
      case .center:
        textAnchor = CGPoint(x: size.width * 0.5, y: ascent)
      default:
        textAnchor = .zero
      }
      drawingRect = CGRect(
        x: 0,
        y: 0,
        width: ceil(size.width),
        height: ceil(size.height))
    }

    // Now Calculate Anchor
    drawingAnchor = CGPoint(
      x: textAnchor.x.remap(fromLow: 0, fromHigh: drawingRect.size.width, toLow: 0, toHigh: 1),
      y: textAnchor.y.remap(fromLow: 0, fromHigh: drawingRect.size.height, toLow: 0, toHigh: 1))

    if fillFrameSetter != nil, strokeFrameSetter != nil {
      drawingRect.size.width += strokeWidth
      drawingRect.size.height += strokeWidth
    }
  }

}

extension CGContext {

  fileprivate func adjustWithLineOrigins(in frame: CTFrame, with font: CTFont?) {
    guard let font else { return }

    let count = CFArrayGetCount(CTFrameGetLines(frame))

    guard count > 0 else { return }

    var o = [CGPoint](repeating: .zero, count: 1)
    CTFrameGetLineOrigins(frame, CFRange(location: count - 1, length: 1), &o)

    let diff = CTFontGetDescent(font) - o[0].y
    if diff > 0 {
      translateBy(x: 0, y: diff)
    }
  }
}
