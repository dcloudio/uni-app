/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file Defines the capabilities of pdf module.
 * @kit PDFKit
 */
import image from '@ohos.multimedia.image';
/**
* This module provides the capability to load the pdf.
* @namespace pdfService
* @syscap SystemCapability.OfficeService.PDFService.Core
* @since 5.0.0(12)
*/
declare namespace pdfService {
    /**
     * The information of fonts.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class FontInfo {
        /**
         * Constructor
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        constructor();
        /**
         * The file path of font file.
         * @type { ?string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        fontPath?: string;
        /**
         * The font name.
         * @type { ?string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        fontName?: string;
    }
    /**
     * The information of header and footer in PDFPage.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
    */
    export class HeaderFooterInfo {
        /**
         * Constructor
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        constructor();
        /**
         * The font info.
         * @type { FontInfo }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        fontInfo: FontInfo;
        /**
         * The text size of header and footer text.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        textSize: number;
        /**
         * The character set of text.
         * @type { CharsetType }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        charset: CharsetType;
        /**
         * Whether there is underline of text.
         * @type { boolean }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        underline: boolean;
        /**
         * The RGB text color.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        textColor: number;
        /**
         * The left margin of header and footer in pixels.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        leftMargin: number;
        /**
         * The top margin of header in pixels.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        topMargin: number;
        /**
         * The right margin of header and footer in pixels.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        rightMargin: number;
        /**
         * The bottom margin of footer in pixels.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        bottomMargin: number;
        /**
         * The text content at the left of header.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        headerLeftText: string;
        /**
         * The text content at the center of header.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        headerCenterText: string;
        /**
         * The text content at the right of header.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        headerRightText: string;
        /**
         * The text content at the left of footer.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        footerLeftText: string;
        /**
         * The text content at the center of footer.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        footerCenterText: string;
        /**
         * The text content at the right of footer.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        footerRightText: string;
    }
    /**
     * The public information of watermark in PDFPage.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
    */
    export class WatermarkInfo {
        /**
         * Constructor
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        constructor();
        /**
         * The type of the watermark object.
         * @type { WatermarkType }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        watermarkType: WatermarkType;
        /**
         * The zoom scale of the watermark object.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        scale: number;
        /**
         * The rotation angle of the watermark object.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        rotation: number;
        /**
         * The opacity of the watermark object.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        opacity: number;
        /**
         * Whether the watermark is on top of the page.
         * @type { boolean }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        isOnTop: boolean;
        /**
         * The horizontal alignment of the watermark object in page.
         * @type { WatermarkAlignment }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        horizontalAlignment: WatermarkAlignment;
        /**
         * The relative horizontal space of the watermark object in page.
         * If left aligned, the space describes the space between the object and left edge in pixels;
         * If center aligned, the space describes the space between the object and the vertical center line in pixels;
         * If right aligned, the space describes the space between the object and right edge in pixels;
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        horizontalSpace: number;
        /**
         * The vertical alignment of the watermark object in page.
         * @type { WatermarkAlignment }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        verticalAlignment: WatermarkAlignment;
        /**
         * The vertical space of the watermark object in page.
         * If top aligned, the space describes the space between the object and top edge in pixels;
         * If center aligned, the space describes the space between the object and the horizontal center line in pixels;
         * If bottom aligned, the space describes the space between the object and bottom edge in pixels;
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        verticalSpace: number;
    }
    /**
     * The information of text watermark in PDFPage.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
    */
    export class TextWatermarkInfo extends WatermarkInfo {
        /**
         * The content of text watermark.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        content: string;
        /**
         * The font path of the text watermark.
         * @type { FontInfo }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        fontInfo: FontInfo;
        /**
         * The text size of the text watermark.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        textSize: number;
        /**
         * The RGB color of the text watermark.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        textColor: number;
    }
    /**
     * The information of image watermark in PDFPage.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
    */
    export class ImageWatermarkInfo extends WatermarkInfo {
        /**
         * The file path of the watermark image.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        imagePath: string;
    }
    /**
     * The information of background in PDFPage.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
    */
    export class BackgroundInfo {
        /**
         * Constructor
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        constructor();
        /**
         * The file path of background image.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        imagePath: string;
        /**
         * The RGB color of background
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        backgroundColor: number;
        /**
         * The zoom scale of the background object.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        scale: number;
        /**
         * The rotation angle of the background object.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        rotation: number;
        /**
         * The opacity of the background.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        opacity: number;
        /**
         * Whether the watermark is on top of the page.
         * @type { boolean }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        isOnTop: boolean;
        /**
         * The horizontal alignment of the background object in page.
         * @type { BackgroundAlignment }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        horizontalAlignment: BackgroundAlignment;
        /**
         * The relative horizontal space of the background object in page.
         * If left aligned, the space describes the space between the object and left edge in pixels;
         * If center aligned, the space describes the space between the object and the vertical center line in pixels;
         * If right aligned, the space describes the space between the object and right edge in pixels;
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        horizontalSpace: number;
        /**
         * The vertical alignment of the background object in page.
         * @type { BackgroundAlignment }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        verticalAlignment: BackgroundAlignment;
        /**
         * The vertical space of the background object in page.
         * If top aligned, the space describes the space between the object and top edge in pixels;
         * If center aligned, the space describes the space between the object and the horizontal center line in pixels;
         * If bottom aligned, the space describes the space between the object and bottom edge in pixels;
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        verticalSpace: number;
    }
    /**
     * PDF Document class
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
    */
    export class PdfDocument {
        /**
         * Constructor
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        constructor();
        /**
         * Load a file with a specified file path or uri.
         * @param { string } path - file path.
         * @param { string } password - File encryption password.
         * @param { (progress: number) => number } onProgress - Progress bar callback function.
         * @returns { ParseResult } ParseResult enum type.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        loadDocument(path: string, password?: string, onProgress?: (progress: number) => number): ParseResult;
        /**
         * Release PDF documents.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        releaseDocument(): void;
        /**
         * Save document to specified file path.
         * @param { string } path - file path.
         * @param { (progress: number) => number } onProgress - Progress bar callback function
         * @returns { boolean } Whether the document was saved successfully.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        saveDocument(path: string, onProgress?: (progress: number) => number): boolean;
        /**
         * Create a blank document.
         * @param { number } width - Document width.
         * @param { number } height - Document height.
         * @returns { boolean } Whether the document was successfully created.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        createDocument(width: number, height: number): boolean;
        /**
         * Whether the document is encrypted.
         * @param { string } path - file path.
         * @returns { boolean } Whether the document is encrypted.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        isEncrypted(path: string): boolean;
        /**
         * Remove the encryption lock.
         * @returns { boolean } Whether the encryption lock was successfully deleted.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        removeSecurity(): boolean;
        /**
         * Get the number of document pages.
         * @returns { number } Number of document pages.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getPageCount(): number;
        /**
         * Get the object of the specified page.
         * @param { number } index - Get the page object.
         * @returns { PdfPage } Specify the page object.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getPage(index: number): PdfPage;
        /**
         * Insert PDF page at specified location.
         * @param { number } index - At which page to insert PDF page.
         * @param { number } width - Insert PDF page width.
         * @param { number } height - Insert PDF page height.
         * @returns { PdfPage } Inserted PDF page.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        insertBlankPage(index: number, width: number, height: number): PdfPage;
        /**
         * Add Pages from other Documents to the current Document.
         * @param { PdfDocument } document - PdfDocument object.
         * @param { number } fromIndex - From which page of other documents should I start adding.
         * @param { number } pageCount - Add number of pages.
         * @param { number } index - From which page of the current document do you start adding.
         * @returns { PdfPage } Inserted PDF page.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        insertPageFromDocument(document: PdfDocument, fromIndex: number, pageCount: number, index: number): PdfPage;
        /**
         * Delete PDF page at specified location.
         * @param { number } index - Starting from which PDF page to delete.
         * @param { number } count - Delete several PDF pages.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        deletePage(index: number, count: number): void;
        /**
         * Move the specified page to the index position
         * @param { number } index - Starting from which PDF page to delete.
         * @param { number } dest - End PDF pages.
         * @returns { boolean } Whether the specified page was successfully moved to the index position.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        movePage(index: number, dest: number): boolean;
        /**
         * Get font weight.
         * @returns { number } The font weight.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getFontWeight(): number;
        /**
         * Set font weight.
         * @param { number } weight - Font weight.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        setFontWeight(weight: number): void;
        /**
         * Get PDF metadata (author, creator, provider).
         * @returns { MetaData } PDF metadata.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getMetadata(): Metadata;
        /**
         * Convert pdf document to images and save the images to a specified file path.
         * @param { string } path - file path.
         * @param { ImageFormat } format - Picture enumeration type.
         * @param { (progress: number) => number } onProgress - Progress bar callback function.
         * @returns { boolean } Whether the image was successfully converted.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        convertToImage(path: string, format: ImageFormat, onProgress?: (progress: number) => number): boolean;
        /**
         * Get Root Bookmark.
         * @returns { Bookmark } Bookmark.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getRootBookmark(): Bookmark;
        /**
         * Get Root Bookmarks.
         * @returns { Array<Bookmark> } Array<Bookmark>.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getRootBookmarks(): Array<Bookmark>;
        /**
         * Create Bookmark.
         * @returns { Bookmark } Bookmark.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        createBookmark(): Bookmark;
        /**
         * Remove Bookmark.
         * @param { Bookmark } bookmark - bookmark.
         * @returns { boolean } Whether the image was successfully converted.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        removeBookmark(bookmark: Bookmark): boolean;
        /**
         * Insert Bookmark.
         * @param { Bookmark } bookmark - bookmark.
         * @param { Bookmark } parent - parent.
         * @param { number } position - position.
         * @returns { boolean } Whether the image was successfully converted.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        insertBookmark(bookmark: Bookmark, parent: Bookmark, position: number): boolean;
        /**
         * Add header and footer to the whole document.
         * @param { HeaderFooterInfo } info - Header and footer information.
         * @param { number } startIndex - start page index (inclusive) of header and footer.
         * @param { number } endIndex - end page index (inclusive) of header and footer.
         * @param { boolean } oddPages - whether add header and footer on the odd pages in the page range.
         * @param { boolean } evenPages - whether add header and footer on the even pages in the page range.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        addHeaderFooter(info: HeaderFooterInfo, startIndex: number, endIndex: number, oddPages: boolean, evenPages: boolean): void;
        /**
         * Get header and footer of the document.
         * @returns { HeaderFooterInfo } header and footer information.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getHeaderFooter(): HeaderFooterInfo;
        /**
         * Whether the document has header or footer.
         * @returns { boolean } Whether there is header and footer information on this page.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        hasHeaderFooter(): boolean;
        /**
         * Remove header and footer of the document.
         * @returns { boolean } Whether the header and footer were successfully removed.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        removeHeaderFooter(): boolean;
        /**
         * Add watermark to the whole document.
         * @param { WatermarkInfo } info - Watermark information.
         * @param { number } startIndex - start page index (inclusive) of watermark.
         * @param { number } endIndex - end page index (inclusive) of watermark.
         * @param { boolean } oddPages - whether add watermark on the odd pages in the page range.
         * @param { boolean } evenPages - whether add watermark on the even pages in the page range.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        addWatermark(info: WatermarkInfo, startIndex: number, endIndex: number, oddPages: boolean, evenPages: boolean): void;
        /**
         * Get Watermark information of the document.
         * @returns { WatermarkInfo } watermark information.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getWatermark(): WatermarkInfo;
        /**
         * Whether the document has watermark.
         * @returns { boolean } Whether there is watermark information on the page.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        hasWatermark(): boolean;
        /**
         * Remove watermark of the document.
         * @returns { boolean } Whether the removal was successfully.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        removeWatermark(): boolean;
        /**
         * Add background to the whole document.
         * @param { BackgroundInfo } info - Background information.
         * @param { number } startIndex - start page index (inclusive) of background.
         * @param { number } endIndex - end page index (inclusive) of background.
         * @param { boolean } oddPages - whether add background on the odd pages in the page range.
         * @param { boolean } evenPages - whether add background on the even pages in the page range.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        addBackground(info: BackgroundInfo, startIndex: number, endIndex: number, oddPages: boolean, evenPages: boolean): void;
        /**
         * Get document background information.
         * @returns { BackgroundInfo } Document background information.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getBackground(): BackgroundInfo;
        /**
         * Whether the document has background.
         * @returns { boolean } Is there a background.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        hasBackground(): boolean;
        /**
         * Remove background of the document.
         * @returns { boolean } Whether the removal was successfully.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        removeBackground(): boolean;
    }
    /**
     * PDF Metadata
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class Metadata {
        /**
         * The title of the document.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        title: string;
        /**
         * The author of the document.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        author: string;
        /**
         * The subject/theme of the document.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        subject: string;
        /**
         * The keywords of the document.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        keywords: string;
        /**
         * The creator, or if the file was converted to PDF from another format, the name of the program that created the original file.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        creator: string;
        /**
         * The converter, if the file is converted to PDF from another format, the application that converts to PDF.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        producer: string;
        /**
         * Creation date.
         * @type { Date }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        creationDate: Date;
        /**
         * Modified date.
         * @type { Date }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        modifiedDate: Date;
    }
    /**
     * BorderStyle
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum BorderStyle {
        /**
         * No border.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        NONE = 0,
        /**
         * Solid border.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        SOLID = 1,
        /**
         * Beveled border.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        BEVELED = 2,
        /**
         * Inset border.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        INSET = 3,
        /**
         * Underline border.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        UNDERLINE = 4,
        /**
         * Dash border.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        DASH = 5
    }
    /**
     * AnnotationFlag
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum AnnotationFlag {
        /**
         * The annotation is invisible.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        INVISIBLE = 1,
        /**
         * The annotation is hidden.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        HIDDEN = 2,
        /**
         * The annotation is printed.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PRINTED = 4
    }
    /**
     * The PdfAnnotation object on PdfPage.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class PdfAnnotation {
        /**
         * The annotation type.
         * @type { AnnotationType }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        type: AnnotationType;
        /**
         * The unique id of the annotation.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        uniqueId: string;
        /**
         * Get the PDF page of the annotation.
         * @returns { PdfPage } The pdf page holding the annotation.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getPdfPage(): PdfPage;
        /**
         * Get the index of current annotation in page.
         * @returns { number } The annotation index.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getAnnotationIndex(): number;
        /**
         * Get info of current anntation.
         * @returns { PdfAnnotationInfo } The annotation info.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getAnnotationInfo(): PdfAnnotationInfo;
        /**
         * Move the annotation to specified coordinates.
         * @param { number } x - Destination x coordinate.
         * @param { number } y - Destination y coordinate.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        moveTo(x: number, y: number): void;
        /**
         * Whether the current annotation is a mark up type annotation.
         * @returns { boolean } Whether the anntation is markup.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        isMarkup(): boolean;
    }
    /**
     * The information of an annotation in page.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class PdfAnnotationInfo {
        /**
         * The annotation type.
         * @type { AnnotationType }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        type: AnnotationType;
        /**
         * The unique id of the annotation.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        uniqueId: string;
        /**
         * The content of the annotation.
         * @type { ?string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        content?: string;
        /**
         * The modified time of the annotation.
         * @type { ?Date }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        modifiedTime?: Date;
        /**
         * The border of the annotation.
         * @type { ?PdfBorder }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        border?: PdfBorder;
        /**
         * The flag of the annotation.
         * @type { ?AnnotationFlag }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        flag?: AnnotationFlag;
        /**
         * The title of the annotation.
         * @type { ?string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        title?: string;
        /**
         * The opacity of the annotation.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        opacity?: number;
        /**
         * The subject of the annotation.
         * @type { ?string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        subject?: string;
        /**
         * The creation date of the annotation.
         * @type { ?Date }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        creationDate?: Date;
    }
    /**
     * The information of text type annotation.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class TextAnnotationInfo extends PdfAnnotationInfo {
        /**
         * The iconName of text type annotation.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        iconName: string;
        /**
         * The text annotation state of text type annotation.
         * @type { TextAnnotationState }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        state: TextAnnotationState;
        /**
         * The x coordinate (distance to left edge) of text type annotation.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        x: number;
        /**
         * The y coordinate (distance to bottom edge) of text type annotation.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        y: number;
        /**
         * The RGB color of text type annotation.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        color?: number;
    }
    /**
     * The information of link type annotation.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class LinkAnnotationInfo extends PdfAnnotationInfo {
        /**
         * left.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        left: number;
        /**
         * bottom.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        bottom: number;
        /**
         * right.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        right: number;
        /**
         * top.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        top: number;
        /**
         * The highlight mode of the link.
         * @type { ?HighlightMode }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        highlightMode?: HighlightMode;
        /**
         * The RGB color of the link.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        color?: number;
    }
    /**
     * The information of free-text type annotation.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class FreeTextAnnotationInfo extends PdfAnnotationInfo {
        /**
         * The x coordinate (distance to left edge) of text type annotation.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        x: number;
        /**
         * The y coordinate (distance to bottom edge) of text type annotation.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        y: number;
        /**
         * The width of the free text.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        width?: number;
        /**
         * The fill color of the annotation.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        fillColor?: number;
        /**
         * The textStyle of the annotation.
         * @type { ?TextStyle }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        textStyle?: TextStyle;
        /**
         * The text alignment of the text.
         * @type { ?AlignmentType }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        textAlignment?: AlignmentType;
    }
    /**
     * The information of square type annotation.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class SquareAnnotationInfo extends PdfAnnotationInfo {
        /**
         * The distance to left edge of the page.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        left: number;
        /**
         * The distance to bottom edge of the page.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        bottom: number;
        /**
         * The distance to right edge of the page.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        right: number;
        /**
         * The distance to top edge of the page.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        top: number;
        /**
         * The line color of the square.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        lineColor?: number;
        /**
         * The fill color of the square.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        fillColor?: number;
    }
    /**
     * The information of oval type annotation.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class OvalAnnotationInfo extends PdfAnnotationInfo {
        /**
         * The distance to left edge of the page.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        left: number;
        /**
         * The distance to bottom edge of the page.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        bottom: number;
        /**
         * The distance to right edge of the page.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        right: number;
        /**
         * The distance to top edge of the page.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        top: number;
        /**
         * The line color of the oval annotation.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        lineColor?: number;
        /**
         * The fill color of the oval annotation.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        fillColor?: number;
    }
    /**
     * The information of polygon type annotation.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class PolygonAnnotationInfo extends PdfAnnotationInfo {
        /**
         * The array of PDFPoints in order describing the polygon.
         * @type { Array<PdfPoint> }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        vertexes: Array<PdfPoint>;
        /**
         * The line color of the annotation.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        lineColor?: number;
        /**
         * The fill color of the annotation.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        fillColor?: number;
    }
    /**
     * The information of line type annotation.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class LineAnnotationInfo extends PdfAnnotationInfo {
        /**
         * The x coordinate (distance to left edge) of start point.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        startX: number;
        /**
         * The y coordinate (distance to bottom edge) of start point.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        startY: number;
        /**
         * The x coordinate (distance to left edge) of end point.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        endX: number;
        /**
         * The y coordinate (distance to bottom edge) of end point.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        endY: number;
        /**
         * The style at the start point.
         * @type { LineEndStyle }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        startPointStyle: LineEndStyle;
        /**
         * The style at the end point.
         * @type { LineEndStyle }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        endPointStyle: LineEndStyle;
        /**
         * The line color of the annotation.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        lineColor?: number;
    }
    /**
     * The information of polyline type annotation.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class PolylineAnnotationInfo extends PdfAnnotationInfo {
        /**
         * The array of PDFPoints in order describing the polygon.
         * @type { Array<PdfPoint> }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        vertexes: Array<PdfPoint>;
        /**
         * The line color of the annotation.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        lineColor?: number;
    }
    /**
     * The information of highlight type annotation.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class HighlightAnnotationInfo extends PdfAnnotationInfo {
        /**
         * The array of PDFPoints of the highlight region.
         * Each link annotation has 4*n points, each group of 4 points are:
         *  - 1st point: the top-left point of a rectangle
         *  - 2nd point: the top-right point of a rectangle
         *  - 3rd point: the bottom-left point of a rectangle
         *  - 4th point: the bottom-right point of a rectangle
         * @type { Array<PdfPoint> }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        quadPoints: Array<PdfPoint>;
        /**
         * The RGB color of the highlight.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        color?: number;
    }
    /**
     * The information of underline type annotation.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class UnderlineAnnotationInfo extends PdfAnnotationInfo {
        /**
         * The array of PDFPoints of the highlight region.
         * Each link annotation has 4*n points, each group of 4 points are:
         *  - 1st point: the top-left point of a rectangle
         *  - 2nd point: the top-right point of a rectangle
         *  - 3rd point: the bottom-left point of a rectangle
         *  - 4th point: the bottom-right point of a rectangle
         * @type { Array<PdfPoint> }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        quadPoints: Array<PdfPoint>;
    }
    /**
     * The information of strikethrough type annotation.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class StrikethroughAnnotationInfo extends PdfAnnotationInfo {
        /**
         * The array of PDFPoints of the highlight region.
         * Each link annotation has 4*n points, each group of 4 points are:
         *  - 1st point: the top-left point of a rectangle
         *  - 2nd point: the top-right point of a rectangle
         *  - 3rd point: the bottom-left point of a rectangle
         *  - 4th point: the bottom-right point of a rectangle
         * @type { Array<PdfPoint> }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        quadPoints: Array<PdfPoint>;
    }
    /**
     * The information of ink type annotation.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class InkAnnotationInfo extends PdfAnnotationInfo {
        /**
         * The array of PdfPoint in order describing the ink annotation.
         * @type { Array<PdfPoint> }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        inkPoints: Array<PdfPoint>;
        /**
         * The line color of the annotation.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        lineColor?: number;
    }
    /**
     * The information of stamp type annotation.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class StampAnnotationInfo extends PdfAnnotationInfo {
        /**
         * The file path of the image as stamp.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        imagePath: string;
        /**
          * The distance to left edge of the page.
          * @type { number }
          * @syscap SystemCapability.OfficeService.PDFService.Core
          * @since 5.0.0(12)
          */
        left: number;
        /**
          * The distance to bottom edge of the page.
          * @type { number }
          * @syscap SystemCapability.OfficeService.PDFService.Core
          * @since 5.0.0(12)
          */
        bottom: number;
        /**
          * The distance to right edge of the page.
          * @type { number }
          * @syscap SystemCapability.OfficeService.PDFService.Core
          * @since 5.0.0(12)
          */
        right: number;
        /**
          * The distance to top edge of the page.
          * @type { number }
          * @syscap SystemCapability.OfficeService.PDFService.Core
          * @since 5.0.0(12)
          */
        top: number;
    }
    /**
     * A point location of a pdf page.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class PdfPoint {
        /**
         * Constructor
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        constructor();
        /**
         * x coordinate of point (distance to the left edge of the page).
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        x: number;
        /**
         * y coordinate of point (distance to the bottom edge of the page).
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        y: number;
    }
    /**
     * A rectangle of a pdf page.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class PdfRect {
        /**
         * Constructor
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        constructor();
        /**
         * The distance between the left edge and the rectangle.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        left: number;
        /**
         * The distance between the top edge and the rectangle.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        top: number;
        /**
         * The distance between the right edge and the rectangle.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        right: number;
        /**
         * The distance between the bottom edge and the rectangle.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        bottom: number;
    }
    /**
     * The PDF matrix used to describe a rectangle area in pdf page.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class PdfMatrix {
        /**
         * Constructor
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        constructor();
        /**
         * The x coordinate (the distance between the left edge).
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        x: number;
        /**
         * The x coordinate (the distance between the bottom edge).
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        y: number;
        /**
         * The width of the matrix area.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        width: number;
        /**
         * The height of the matrix area.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        height: number;
        /**
         * The rotation angle of the matrix area.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        rotate: number;
    }
    /**
     * The pdf page.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class PdfPage {
        /**
         * Get PDF Document object.
         * @returns { PdfDocument } document object.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getDocument(): PdfDocument;
        /**
         * Get annotations in the page.
         * @returns { Array<PdfAnnotation> } Annotation list.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getAnnotations(): Array<PdfAnnotation>;
        /**
         * Add annotation to page.
         * @param { PdfAnnotationInfo } annotationInfo - annotation information.
         * @returns { PdfAnnotation } pdf annotation.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        addAnnotation(annotationInfo: PdfAnnotationInfo): PdfAnnotation;
        /**
         * Set an existiong annotation's info.
         * @param { PdfAnnotation } annotation - the annotation.
         * @param { PdfAnnotationInfo } annotationInfo - annotation information.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        setAnnotation(annotation: PdfAnnotation, annotationInfo: PdfAnnotationInfo): void;
        /**
         * remove an existing Annotation.
         * @param { PdfAnnotation } annotation - annotation obj.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        removeAnnotation(annotation: PdfAnnotation): void;
        /**
         * Get the index of the current page.
         * @returns { number } Page index.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getIndex(): number;
        /**
         * Get the width of the current page.
         * @returns { number } Page Width.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getWidth(): number;
        /**
         * Get the height of the current page.
         * @returns { number } Page height.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getHeight(): number;
        /**
         * Set page boundary, boxtype is an enumeration value.
         * @param { BoxType } boxtype - Page boundaries.
         * @param { PdfRect } rect - rectangle.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        setBox(boxtype: BoxType, rect: PdfRect): void;
        /**
         * Get page boundary, boxtype is an enumeration value.
         * @param { BoxType } boxtype - Page boundaries.
         * @returns { PdfRect } rectangle.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getBox(boxtype: BoxType): PdfRect;
        /**
         * Set the page rotation angle.
         * @param { RotationAngle } rotation - Rotation angle enumeration value.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        setRotation(rotation: RotationAngle): void;
        /**
         * Get the rotation angle of the page.
         * @returns { RotationAngle } Rotation angle.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getRotation(): RotationAngle;
        /**
         * Get the pixelMap of current page as image.
         * @returns { image.PixelMap } image.PixelMap.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getPagePixelMap(): image.PixelMap;
        /**
         * Get the pixelMap of current page as a snapshot with more parameters.
         * @param { PdfMatrix } matrix - matrix, describes the area of the image in page.
         * @param { boolean } isGray - isGray, describes whether get a gray-only image.
         * @param { boolean } drawAnnotations - drawAnnotations, describes whether draw the annotations in image.
         * @returns { image.PixelMap } image.PixelMap.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getCustomPagePixelMap(matrix: PdfMatrix, isGray: boolean, drawAnnotations: boolean): image.PixelMap;
        /**
         * Get the pixelMap of current page as a snapshot with more parameters.
         * @param { PdfMatrix } matrix - matrix, describes the area of the image in page.
         * @param { number } bitmapwidth - bitmapwidth, describes the width of the image in page.
         * @param { number } bitmapHeight - bitmapHeight, describes the Height of the image in page.
         * @param { boolean } isGray - isGray, describes whether get a gray-only image.
         * @param { boolean } drawAnnotations - drawAnnotations, describes whether draw the annotations in image.
         * @returns { image.PixelMap } image.PixelMap.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getAreaPixelMap(matrix: PdfMatrix, bitmapwidth: number, bitmapHeight: number, isGray: boolean, drawAnnotations: boolean): image.PixelMap;
        /**
         * Add text content to the page.
         * This method can only add text line by line instead of multiple lines.
         * @param { string } text - text content.
         * @param { number } x - the x coordinate(distance to the left edge) of the location to add text.
         * @param { number } y - the y coordinate(distance to the bottom edge) of the location to add text.
         * @param { TextStyle } style - TextStyle.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        addTextObject(text: string, x: number, y: number, style: TextStyle): void;
        /**
         * Add image object to the page.
         * @param { string } path - file path.
         * @param { number } x - the x coordinate(distance to the left edge) of the top-bottom point of the image.
         * @param { number } y - the y coordinate(distance to the bottom edge) of the top-bottom point of the image.
         * @param { number } width - the width of the image.
         * @param { number } height - the height of the image.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        addImageObject(path: string, x: number, y: number, width: number, height: number): void;
        /**
         * Get all graphics objects in current page.
         * Return in positional order (from left to right, top to bottom, supporting mirroring languages).
         * @returns { Array<GraphicsObject> } All graphics objects.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getGraphicsObjects(): Array<GraphicsObject>;
        /**
         * Delete a specified GraphicsObject.
         * @returns { GraphicsObject } All TextObject objects.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        deleteGraphicsObject(object: GraphicsObject): void;
        /**
         * Release PDF page.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        release(): void;
    }
    /**
     * The GraphicsObject in pdf page.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class GraphicsObject {
        /**
         * The type of the current graphics object.
         * @type { GraphicsObjectType }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        type: GraphicsObjectType;
        /**
         * The x coordinate(distance to the left edge) of the GraphicsObject location.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        x: number;
        /**
         * The y coordinate(distance to the bottom edge) of the GraphicsObject location.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        y: number;
        /**
         * The rectangle describing the clip of the GraphicsObject.
         * @type { PdfRect }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        clipRect: PdfRect;
        /**
         * The stroke color.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        strokeColor: number;
        /**
         * The stroke transparency.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        strokeOpacity: number;
        /**
         * The fill color.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        fillColor: number;
        /**
         * The fill transparency.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        fillOpacity: number;
        /**
         * The rotation angle.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        rotate: number;
    }
    /**
     * TextObject type of GraphicsObject
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class TextObject extends GraphicsObject {
        /**
         * The text content.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        text: string;
        /**
         * The font info.
         * @type { FontInfo }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        fontInfo: FontInfo;
        /**
         * The text size.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        textSize: number;
        /**
         * The space between each character.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        charspace: number;
        /**
         * The space between each word.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        wordspace: number;
        /**
         * The list of character areas.
         * Each area is described by a rectangle for its location as left, right, top, bottom.
         * @type { Array<PdfRect> }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        charRects: Array<PdfRect>;
        /**
         * Character unicode array.
         * @type { Array<number> }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        charUnicodes: Array<number>;
    }
    /**
     * ImageObject type of GraphicsObject
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class ImageObject extends GraphicsObject {
        /**
         * Use a special syntax to represent small image data directly within the content stream.
         * @type { image.PixelMap }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        pixelMap: image.PixelMap;
        /**
         * The width of the image object.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        width: number;
        /**
         * The height of the image object.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        height: number;
    }
    /**
     * Bookmark of pdf document.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class Bookmark {
        /**
         * Is root bookmark.
         * @returns { boolean } Is root bookmark.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        isRootBookmark(): boolean;
        /**
         * Get parent bookmark.
         * @returns { Bookmark } Parent bookmark.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getParent(): Bookmark;
        /**
         * Whether this bookmark have child nodes.
         * @returns { boolean } Whether there are child nodes.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        hasChild(): boolean;
        /**
         * Get child bookmarks.
         * @returns { Array<Bookmark> } The child bookmark nodes.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getChildren(): Array<Bookmark>;
        /**
         * Get destination info.
         * @returns { DestInfo } The destination info.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getDestInfo(): DestInfo;
        /**
         * Set destination info.
         * @param { BookmarkInfo } info - The destination info.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        setDestInfo(info: DestInfo): void;
        /**
         * Get bookmark information.
         * @returns { BookmarkInfo } The bookmark info.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        getBookmarkInfo(): BookmarkInfo;
        /**
         * Set bookmark info.
         * @param { BookmarkInfo } info - BookmarkInfo.
         * @throws { BusinessError } 401 - invalid input parameter.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        setBookmarkInfo(info: BookmarkInfo): void;
    }
    /**
     * The information of bookmark.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class BookmarkInfo {
        /**
         * Constructor
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        constructor();
        /**
         * The bookmark title.
         * @type { string }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        title: string;
        /**
         * The color of bookmark title.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        titleColor?: number;
        /**
         * Whether is bold text.
         * @type { ?boolean }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        isBold?: boolean;
        /**c
         * @type { ?boolean }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        isItalic?: boolean;
    }
    /**
     * The destination info.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class DestInfo {
        /**
         * Constructor
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        constructor();
        /**
         * The page fitting mode when jump to the destination.
         * @type { FitMode }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        fitMode: FitMode;
        /**
         * The page index.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        pageIndex: number;
        /**
         * Distance from the left edge, x when choose FIT_MODE_XYZ or left when choose FIT_MODE_RECT.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        left?: number;
        /**
         * Distance from the top edge, y when choose FIT_MODE_XYZ or right when choose FIT_MODE_RECT.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        top?: number;
        /**
         * Distance from the right edge, used when choose FIT_MODE_RECT.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        right?: number;
        /**
         * Distance from the bottom edge, used when choose FIT_MODE_RECT.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        bottom?: number;
        /**
         * Magnification factor when choose FIT_MODE_XYZ.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        zoom?: number;
    }
    /**
     * The style of text.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class TextStyle {
        /**
         * The font info.
         * @type { ?FontInfo }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        fontInfo?: FontInfo;
        /**
         * The text size.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        textSize?: number;
        /**
         * The text color.
         * @type { ?number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        textColor?: number;
        /**
         * Whether is bold text.
         * @type { ?boolean }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        isBold?: boolean;
        /**
         * Whether is italic text.
         * @type { ?boolean }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        isItalic?: boolean;
        /**
         * Whether is underline text.
         * @type { ?boolean }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        isUnderline?: boolean;
        /**
         * Whether is strikethrough text.
         * @type { ?boolean }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        isStrikethrough?: boolean;
    }
    /**
     * Open document return value.
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum ParseResult {
        /**
         * Successfully parsed.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PARSE_SUCCESS = 0,
        /**
         * File error.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PARSE_ERROR_FILE = 1,
        /**
         * Format error.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PARSE_ERROR_FORMAT = 2,
        /**
         * Password error.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PARSE_ERROR_PASSWORD = 3,
        /**
         * Handler error.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PARSE_ERROR_HANDLER = 4,
        /**
         * Cert error.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PARSE_ERROR_CERT = 5
    }
    /**
     * Page layout display mode
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum PageLayout {
        /**
         * Layout single page.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        LAYOUT_SINGLE = 1,
        /**
         * Layout double page.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        LAYOUT_DOUBLE = 2
    }
    /**
     * Page adaptation method
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum PageFit {
        /**
         * Actual size.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        FIT_NONE = 0,
        /**
         * Zoom by page.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        FIT_PAGE = 1,
        /**
         * Fit by width.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        FIT_WIDTH = 2,
        /**
         * Adapt to height.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        FIT_HEIGHT = 3
    }
    /**
     * Rotation angle.
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum RotationAngle {
        /**
         * Angle 0 degree.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        ANGLE_0 = 0,
        /**
         * Angle 90 degrees.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        ANGLE_90 = 90,
        /**
         * Angle 180 degrees.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        ANGLE_180 = 180,
        /**
         * Angle 270 degrees.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        ANGLE_270 = 270
    }
    /**
     * Page boundaries.
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum BoxType {
        /**
         * Define the boundaries of the physical media on which the page is displayed or printed.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        BOX_MEDIA = 0,
        /**
         * Defines the visible area of ​​the default user space.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        BOX_CROP = 1,
        /**
         * Defines the area to which page content should be clipped when output in a production environment.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        BOX_BLEED = 2,
        /**
         * Expected size of finished page after trimming.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        BOX_TRIM = 3,
        /**
         * Define the scope of meaningful content that the page creator wants for the page.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        BOX_ART = 4
    }
    /**
     * Graphic object type.
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum GraphicsObjectType {
        /**
         * text object.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        OBJECT_TEXT = 1,
        /**
         * path object.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        OBJECT_PATH = 2,
        /**
         * image object.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        OBJECT_IMAGE = 3,
        /**
         * shading object.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        OBJECT_SHADING = 4,
        /**
         * form object.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        OBJECT_FORM = 5
    }
    /**
     * Text Annotation State.
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum TextAnnotationState {
        /**
         * Commented and tagged by user.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        UNMARKED = 0,
        /**
         * Comments are not marked by the user, by default.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        MARKED = 1
    }
    /**
     * Highlight Mode.
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum HighlightMode {
        /**
         * Contents of accessories notes.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        HIGHLIGHT_INVERT = 1,
        /**
         * Invert annotation borders.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        HIGHLIGHT_OUTLINE = 2,
        /**
         * Pressed appearance for displaying annotations.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        HIGHLIGHT_PUSH = 3,
        /**
         * Toggle, only useful for widget comments.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        HIGHLIGHT_TOGGLE = 4
    }
    /**
     * Alignment Type.
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum AlignmentType {
        /**
         * The distance to left edge of the page.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        LEFT = 0,
        /**
         * The distance to center line of the page.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        MIDDLE = 1,
        /**
         * The distance to right edge of the page.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        RIGHT = 2
    }
    /**
     * Line style of line ends.
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum LineEndStyle {
        /**
         * No style.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        STYLE_NONE = 0,
        /**
         * Square end.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        STYLE_SQUARE = 1,
        /**
         * Circle end.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        STYLE_CIRCLE = 2,
        /**
         * Diamond end.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        STYLE_DIAMOND = 3,
        /**
         * Open arrow end.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        STYLE_OPEN_ARROW = 4,
        /**
         * Closed arrow end.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        STYLE_CLOSED_ARROW = 5,
        /**
         * Butt end.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        STYLE_BUTT = 6,
        /**
         * ROpenArrow end.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        STYLE_R_OPEN_ARROW = 7,
        /**
         * RClosedArrow end.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        STYLE_R_CLOSED_ARROW = 8,
        /**
         * Slash end.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        STYLE_SLASH = 9
    }
    /**
     * Image Format
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum ImageFormat {
        /**
         * PNG.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PNG = 0,
        /**
         * BMP.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        BMP = 1,
        /**
         * JPEG.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        JPEG = 2
    }
    /**
     * Annotation Type.
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum AnnotationType {
        /**
         * Unknown text.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        UNKNOWN = 0,
        /**
         * Sticky text.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        TEXT = 1,
        /**
         * Link.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        LINK = 2,
        /**
         * Free text.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        FREETEXT = 3,
        /**
         * Line.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        LINE = 4,
        /**
         * Square, including rectangle.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        SQUARE = 5,
        /**
         * Oval, including circle.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        OVAL = 6,
        /**
         * Polygon.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        POLYGON = 7,
        /**
         * Polyline.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        POLYLINE = 8,
        /**
         * Highlight.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        HIGHLIGHT = 9,
        /**
         * Underline.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        UNDERLINE = 10,
        /**
         * Strikethrough.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        STRIKETHROUGH = 12,
        /**
         * Stamp.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        STAMP = 13,
        /**
         * Ink.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        INK = 15,
        /**
         * Popup.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        POPUP = 16
    }
    /**
     * PdfBorder.
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export class PdfBorder {
        /**
         * Constructor
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        constructor();
        /**
         * The border style.
         * @type { BorderStyle }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        borderStyle: BorderStyle;
        /**
         * The border width.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        borderWidth: number;
        /**
         * The border color.
         * @type { number }
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        borderColor: number;
    }
    /**
     * Page fit mode.
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum FitMode {
        /**
         * Zoom the page by a top-left point in page, and the content of the page magnified by the factor zoom.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        FIT_MODE_XYZ = 1,
        /**
         * Fit the page to the entire width of the page within the window.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        FIT_MODE_HORIZONTAL = 2,
        /**
         * Fit the page to the entire height of the page within the window.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        FIT_MODE_VERTICAL = 3,
        /**
         * Fit the page to a rectangle of the page within the window.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        FIT_MODE_RECT = 4
    }
    /**
     * Watermark Type.
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum WatermarkType {
        /**
         * Text watermark.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        WATERMARK_TEXT = 1,
        /**
         * Image watermark.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        WATERMARK_IMAGE = 2
    }
    /**
     * Watermark Alignment.
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum WatermarkAlignment {
        /**
         * Top align the watermark.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        WATERMARK_ALIGNMENT_TOP = 0,
        /**
         * Vertical center align the watermark.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        WATERMARK_ALIGNMENT_VCENTER = 1,
        /**
         * Bottom align the watermark.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        WATERMARK_ALIGNMENT_BOTTOM = 2,
        /**
         * Left align the watermark.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        WATERMARK_ALIGNMENT_LEFT = 3,
        /**
         * Horizontal center align the watermark.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        WATERMARK_ALIGNMENT_HCENTER = 4,
        /**
         * Right align the watermark.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        WATERMARK_ALIGNMENT_RIGHT = 5
    }
    /**
     * Background alignment.
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum BackgroundAlignment {
        /**
         * Top align the background.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        BACKGROUND_ALIGNMENT_TOP = 0,
        /**
         * Vertical center align the background.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        BACKGROUND_ALIGNMENT_VCENTER = 1,
        /**
         * Bottom align the background.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        BACKGROUND_ALIGNMENT_BOTTOM = 2,
        /**
         * Left align the background.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        BACKGROUND_ALIGNMENT_LEFT = 3,
        /**
         * Horizontal center align the background.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        BACKGROUND_ALIGNMENT_HCENTER = 4,
        /**
         * Right align the background.
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        BACKGROUND_ALIGNMENT_RIGHT = 5
    }
    /**
     * Character set.
     * @enum { number }
     * @syscap SystemCapability.OfficeService.PDFService.Core
     * @since 5.0.0(12)
     */
    export enum CharsetType {
        /**
         * CID
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_CID_FONT_CHARSET = 0x100000,
        /**
         * ANSI
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_ANSI_CHARSET = 0,
        /**
         * Default
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_DEFAULT_CHARSET = 1,
        /**
         * Symbol
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_SYMBOL_CHARSET = 2,
        /**
         * Shift JIS
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_SHIFT_JIS_CHARSET = 128,
        /**
         * Hangeul
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_HANGUL_CHARSET = 129,
        /**
         * GB2312
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_GB2312_CHARSET = 134,
        /**
         * Chinese BIG5
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_CHINESE_BIG5_CHARSET = 136,
        /**
         * Thai
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_THAI_CHARSET = 222,
        /**
         * East Europe
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_EAST_EUROPE_CHARSET = 238,
        /**
         * Russian
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_RUSSIAN_CHARSET = 204,
        /**
         * Greek
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_GREEK_CHARSET = 161,
        /**
         * Turkish
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_TURKISH_CHARSET = 162,
        /**
         * Vietnamese
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_VIETNAMESE_CHARSET = 163,
        /**
         * Hebrew
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_HEBREW_CHARSET = 177,
        /**
         * Arabic
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_ARABIC_CHARSET = 178,
        /**
         * Baltic
         * @syscap SystemCapability.OfficeService.PDFService.Core
         * @since 5.0.0(12)
         */
        PDF_FONT_BALTIC_CHARSET = 186
    }
}
export default pdfService;
