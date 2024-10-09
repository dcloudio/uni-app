/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit ArkData
 */
/**
 * Provides methods for uniform data type definition and query.
 *
 * @namespace uniformTypeDescriptor
 * @syscap SystemCapability.DistributedDataManager.UDMF.Core
 * @since 10
 */
/**
 * Provides methods for uniform data type definition and query.
 *
 * @namespace uniformTypeDescriptor
 * @syscap SystemCapability.DistributedDataManager.UDMF.Core
 * @atomicservice
 * @since 11
 */
declare namespace uniformTypeDescriptor {
    /**
     * Uniform data type IDs.
     *
     * @enum { string }
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Uniform data type IDs.
     *
     * @enum { string }
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    enum UniformDataType {
        /**
         * Base data type for physical hierarchy, which identifies the physical representation of the data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        ENTITY = 'general.entity',
        /**
         * Base data type for logical hierarchy, which identifies the logical content representation of the data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        OBJECT = 'general.object',
        /**
         * Base data type for mixed object. For example, a PDF file contains both text and special formatting data.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        COMPOSITE_OBJECT = 'general.composite-object',
        /**
         * Text data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Text data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        TEXT = 'general.text',
        /**
         * Plain text data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Plain text data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        PLAIN_TEXT = 'general.plain-text',
        /**
         * HTML data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * HTML data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        HTML = 'general.html',
        /**
         * Hyperlink data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Hyperlink data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        HYPERLINK = 'general.hyperlink',
        /**
         * XML(Extensible Markup Language) data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        XML = 'general.xml',
        /**
         * Xhtml data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        XHTML = 'general.xhtml',
        /**
         * Rss data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        RSS = 'general.rss',
        /**
         * Real synchronized multimedia integration language.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        SMIL = 'com.real.smil',
        /**
         * Source code data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        SOURCE_CODE = 'general.source-code',
        /**
         * Script data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        SCRIPT = 'general.script',
        /**
         * Shell script data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        SHELL_SCRIPT = 'general.shell-script',
        /**
         * C-shell script data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        CSH_SCRIPT = 'general.csh-script',
        /**
         * Perl script data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        PERL_SCRIPT = 'general.perl-script',
        /**
         * PHP script data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        PHP_SCRIPT = 'general.php-script',
        /**
         * Python script data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        PYTHON_SCRIPT = 'general.python-script',
        /**
         * Ruby script data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        RUBY_SCRIPT = 'general.ruby-script',
        /**
         * TypeScript data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        TYPE_SCRIPT = 'general.type-script',
        /**
         * JavaScript data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        JAVA_SCRIPT = 'general.java-script',
        /**
         * Css data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        CSS = 'general.css',
        /**
         * C header data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        C_HEADER = 'general.c-header',
        /**
         * C source code data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        C_SOURCE = 'general.c-source',
        /**
         * C++ header data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        C_PLUS_PLUS_HEADER = 'general.c-plus-plus-header',
        /**
         * C++ source code data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        C_PLUS_PLUS_SOURCE = 'general.c-plus-plus-source',
        /**
         * Java source code data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        JAVA_SOURCE = 'general.java-source',
        /**
         * Tex source code data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        TEX = 'general.tex',
        /**
         * Markdown format.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        MARKDOWN = 'general.markdown',
        /**
         * Asc text data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        ASC_TEXT = 'general.asc-text',
        /**
         * Rich text data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        RICH_TEXT = 'general.rich-text',
        /**
         * Delimited values text data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        DELIMITED_VALUES_TEXT = 'general.delimited-values-text',
        /**
         * Comma separated values text data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        COMMA_SEPARATED_VALUES_TEXT = 'general.comma-separated-values-text',
        /**
         * Tab separated values text data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        TAB_SEPARATED_VALUES_TEXT = 'general.tab-separated-values-text',
        /**
         * Ebook data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        EBOOK = 'general.ebook',
        /**
         * EPUB ebook file format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        EPUB = 'general.epub',
        /**
         * AZW ebook file format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        AZW = 'com.amazon.azw',
        /**
         * AZW3 ebook file format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        AZW3 = 'com.amazon.azw3',
        /**
         * KFX ebook file format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        KFX = 'com.amazon.kfx',
        /**
         * MOBI ebook file format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        MOBI = 'com.amazon.mobi',
        /**
         * Media data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        MEDIA = 'general.media',
        /**
         * Image data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Image data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        IMAGE = 'general.image',
        /**
         * JPEG image format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        JPEG = 'general.jpeg',
        /**
         * PNG image format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        PNG = 'general.png',
        /**
         * Raw image format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        RAW_IMAGE = 'general.raw-image',
        /**
         * TIFF image format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        TIFF = 'general.tiff',
        /**
         * Windows bitmap image data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        BMP = 'com.microsoft.bmp',
        /**
         * Windows icon data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        ICO = 'com.microsoft.ico',
        /**
         * Adobe Photoshop document data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        PHOTOSHOP_IMAGE = 'com.adobe.photoshop-image',
        /**
         * Adobe Illustrator document data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        AI_IMAGE = 'com.adobe.illustrator.ai-image',
        /**
         * Base type for fax images.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        FAX = 'general.fax',
        /**
         *  J2 jConnect fax file format.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        JFX_FAX = 'com.j2.jfx-fax',
        /**
         * The electronic fax document format.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        EFX_FAX = 'com.js.efx-fax',
        /**
         * X bitmap image.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        XBITMAP_IMAGE = 'general.xbitmap-image',
        /**
         * Gif image format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        GIF = 'general.gif',
        /**
         * Tagged Graphics (TGA), a type of image format.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        TGA_IMAGE = 'com.truevision.tga-image',
        /**
         * Silicon Graphics image.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        SGI_IMAGE = 'com.sgi.sgi-image',
        /**
         * OpenEXR image.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OPENEXR_IMAGE = 'com.ilm.openexr-image',
        /**
         * FlashPix image.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        FLASHPIX_IMAGE = 'com.kodak.flashpix.image',
        /**
         * Microsoft Word data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        WORD_DOC = 'com.microsoft.word.doc',
        /**
         * Microsoft Excel data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        EXCEL = 'com.microsoft.excel.xls',
        /**
         * Microsoft PowerPoint presentation data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        PPT = 'com.microsoft.powerpoint.ppt',
        /**
         * Microsoft Word dot data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        WORD_DOT = 'com.microsoft.word.dot',
        /**
         * Microsoft Powerpoint pps data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        POWERPOINT_PPS = 'com.microsoft.powerpoint.pps',
        /**
         * Microsoft Powerpoint pot data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        POWERPOINT_POT = 'com.microsoft.powerpoint.pot',
        /**
         * Microsoft Excel xlt data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        EXCEL_XLT = 'com.microsoft.excel.xlt',
        /**
         * Microsoft Visio vsd data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        VISIO_VSD = 'com.microsoft.visio.vsd',
        /**
         * PDF data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        PDF = 'com.adobe.pdf',
        /**
         * PostScript data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        POSTSCRIPT = 'com.adobe.postscript',
        /**
         * Encapsulated PostScript data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        ENCAPSULATED_POSTSCRIPT = 'com.adobe.encapsulated-postscript',
        /**
         * Video data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Video data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        VIDEO = 'general.video',
        /**
         * AVI video format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        AVI = 'general.avi',
        /**
         * MPEG video format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        MPEG = 'general.mpeg',
        /**
         * MPEG4 video format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        MPEG4 = 'general.mpeg-4',
        /**
         * 3GPP video format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        VIDEO_3GPP = 'general.3gpp',
        /**
         * 3GPP2 video format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        VIDEO_3GPP2 = 'general.3gpp2',
        /**
         * Ts video format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        TS = 'general.ts',
        /**
         * Mpegurl video format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        MPEGURL_VIDEO = 'general.mpegurl-video',
        /**
         * Windows WM video format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        WINDOWS_MEDIA_WM = 'com.microsoft.windows-media-wm',
        /**
         * Windows WMV video format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        WINDOWS_MEDIA_WMV = 'com.microsoft.windows-media-wmv',
        /**
         * Windows WMP video format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        WINDOWS_MEDIA_WMP = 'com.microsoft.windows-media-wmp',
        /**
         * Windows WVX video format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        WINDOWS_MEDIA_WVX = 'com.microsoft.windows-media-wvx',
        /**
         * Windows WMX video format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        WINDOWS_MEDIA_WMX = 'com.microsoft.windows-media-wmx',
        /**
         * RealMedia.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        REALMEDIA = 'com.real.realmedia',
        /**
         * Matroska video format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        MATROSKA_VIDEO = 'org.matroska.mkv',
        /**
         * Flash data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        FLASH = 'com.adobe.flash',
        /**
         * Audio data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Audio data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        AUDIO = 'general.audio',
        /**
         * AAC audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        AAC = 'general.aac',
        /**
         * AIFF audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        AIFF = 'general.aiff',
        /**
         * ALAC audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        ALAC = 'general.alac',
        /**
         * FLAC audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        FLAC = 'general.flac',
        /**
         * MP3 audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        MP3 = 'general.mp3',
        /**
         * OGG audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        OGG = 'general.ogg',
        /**
         * PCM audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        PCM = 'general.pcm',
        /**
         * Windows WMA audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        WINDOWS_MEDIA_WMA = 'com.microsoft.windows-media-wma',
        /**
         * Waveform audio format data type created by Microsoft.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        WAVEFORM_AUDIO = 'com.microsoft.waveform-audio',
        /**
         * Windows WAX audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        WINDOWS_MEDIA_WAX = 'com.microsoft.windows-media-wax',
        /**
         * Au file format.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        AU_AUDIO = 'general.au-audio',
        /**
         * Audio Interchange File Format.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        AIFC_AUDIO = 'general.aifc-audio',
        /**
         * Mpegurl audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        MPEGURL_AUDIO = 'general.mpegurl-audio',
        /**
         * Mpeg-4 audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        MPEG_4_AUDIO = 'general.mpeg-4-audio',
        /**
         * Mp2 audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        MP2 = 'general.mp2',
        /**
         * Mpeg audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        MPEG_AUDIO = 'general.mpeg-audio',
        /**
         * Ulaw audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        ULAW_AUDIO = 'general.ulaw-audio',
        /**
         * Digidesign Sound Designer II audio.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        SD2_AUDIO = 'com.digidesign.sd2-audio',
        /**
         * RealMedia audio.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        REALAUDIO = 'com.real.realaudio',
        /**
         * Matroska audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        MATROSKA_AUDIO = 'org.matroska.mka',
        /**
         * File data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * File data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        FILE = 'general.file',
        /**
         * Directory data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        DIRECTORY = 'general.directory',
        /**
         * Folder data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Folder data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        FOLDER = 'general.folder',
        /**
         * Symlink data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        SYMLINK = 'general.symlink',
        /**
         * Archive file data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        ARCHIVE = 'general.archive',
        /**
         * Bzip2 archive file data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        BZ2_ARCHIVE = 'general.bz2-archive',
        /**
         * Opg archive data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OPG = 'general.opg',
        /**
         * Taz archive data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        TAZ_ARCHIVE = 'general.taz-archive',
        /**
         * Web archive data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        WEB_ARCHIVE = 'general.web-archive',
        /**
         * Disk image archive file data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        DISK_IMAGE = 'general.disk-image',
        /**
         * Iso data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        ISO = 'general.iso',
        /**
         * Tar archive data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        TAR_ARCHIVE = 'general.tar-archive',
        /**
         * Zip archive data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        ZIP_ARCHIVE = 'general.zip-archive',
        /**
         * Java archive data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        JAVA_ARCHIVE = 'com.sun.java-archive',
        /**
         * GNU archive data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        GNU_TAR_ARCHIVE = 'org.gnu.gnu-tar-archive',
        /**
         * Gzip archive data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        GNU_ZIP_ARCHIVE = 'org.gnu.gnu-zip-archive',
        /**
         * Gzip tar archive data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        GNU_ZIP_TAR_ARCHIVE = 'org.gnu.gnu-zip-tar-archive',
        /**
         * Office Open XML.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OPENXML = 'org.openxmlformats.openxml',
        /**
         * Office Open XML Document.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        WORDPROCESSINGML_DOCUMENT = 'org.openxmlformats.wordprocessingml.document',
        /**
         * Office Open XML Workbook.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        SPREADSHEETML_SHEET = 'org.openxmlformats.spreadsheetml.sheet',
        /**
         * Office Open XML Presentation.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        PRESENTATIONML_PRESENTATION = 'org.openxmlformats.presentationml.presentation',
        /**
         * Office Open XML Drawingml visio.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        DRAWINGML_VISIO = 'org.openxmlformats.drawingml.visio',
        /**
         * Office Open XML Drawingml template.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        DRAWINGML_TEMPLATE = 'org.openxmlformats.drawingml.template',
        /**
         * Office Open XML Wordprocessingml template.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        WORDPROCESSINGML_TEMPLATE = 'org.openxmlformats.wordprocessingml.template',
        /**
         * Office Open XML Presentationml template.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        PRESENTATIONML_TEMPLATE = 'org.openxmlformats.presentationml.template',
        /**
         * Office Open XML Presentationml slideshow.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        PRESENTATIONML_SLIDESHOW = 'org.openxmlformats.presentationml.slideshow',
        /**
         * Office Open XML Spreadsheetml template.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        SPREADSHEETML_TEMPLATE = 'org.openxmlformats.spreadsheetml.template',
        /**
         * Open Document Format for Office Applications.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OPENDOCUMENT = 'org.oasis.opendocument',
        /**
         * OpenDocument Text.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OPENDOCUMENT_TEXT = 'org.oasis.opendocument.text',
        /**
         * OpenDocument Spreadsheet.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OPENDOCUMENT_SPREADSHEET = 'org.oasis.opendocument.spreadsheet',
        /**
         * OpenDocument Presentation.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OPENDOCUMENT_PRESENTATION = 'org.oasis.opendocument.presentation',
        /**
         * OpenDocument Graphics.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OPENDOCUMENT_GRAPHICS = 'org.oasis.opendocument.graphics',
        /**
         * OpenDocument Formulat.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OPENDOCUMENT_FORMULA = 'org.oasis.opendocument.formula',
        /**
         * Stuffit archive.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        STUFFIT_ARCHIVE = 'com.allume.stuffit-archive',
        /**
         * Rar archive.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        RAR_ARCHIVE = 'com.rarlab.rar-archive',
        /**
         * 7-zip archive.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        SEVEN_ZIP_ARCHIVE = 'org.7-zip.7-zip-archive',
        /**
         * Calendar data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        CALENDAR = 'general.calendar',
        /**
         * VCalendar type, a type of calendar format.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        VCS = 'general.vcs',
        /**
         * ICalendar type, a type of calendar format.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        ICS = 'general.ics',
        /**
         * Contact data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        CONTACT = 'general.contact',
        /**
         * Database data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        DATABASE = 'general.database',
        /**
         * Message data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        MESSAGE = 'general.message',
        /**
         * Base type for executable data.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        EXECUTABLE = 'general.executable',
        /**
         * Microsoft Windows application.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        PORTABLE_EXECUTABLE = 'com.microsoft.portable-executable',
        /**
         * Java class.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        SUN_JAVA_CLASS = 'com.sun.java-class',
        /**
         * A file format data type stand for electronic business card.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        VCARD = 'general.vcard',
        /**
         * Navigation data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        NAVIGATION = 'general.navigation',
        /**
         * Location data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        LOCATION = 'general.location',
        /**
         * Base type for fonts.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        FONT = 'general.font',
        /**
         * TrueType font.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        TRUETYPE_FONT = 'general.truetype-font',
        /**
         * TrueType collection font.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        TRUETYPE_COLLECTION_FONT = 'general.truetype-collection-font',
        /**
         * OpenType font.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OPENTYPE_FONT = 'general.opentype-font',
        /**
         * PostScript font.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        POSTSCRIPT_FONT = 'com.adobe.postscript-font',
        /**
         * A Printer Font Binary version of Adobe's Type 1.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        POSTSCRIPT_PFB_FONT = 'com.adobe.postscript-pfb-font',
        /**
         * Adobe Type 1 font.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        POSTSCRIPT_PFA_FONT = 'com.adobe.postscript-pfa-font',
        /**
         * OpenHarmony system defined form data type(the data is provided and bound to OpenHarmony system).
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * OpenHarmony system defined form data type(the data is provided and bound to OpenHarmony system).
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        OPENHARMONY_FORM = 'openharmony.form',
        /**
         * OpenHarmony system defined app item data type(the data is provided and bound to OpenHarmony system).
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * OpenHarmony system defined app item data type(the data is provided and bound to OpenHarmony system).
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        OPENHARMONY_APP_ITEM = 'openharmony.app-item',
        /**
         * OpenHarmony system defined pixel map data type(the data is provided and bound to OpenHarmony system).
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * OpenHarmony system defined pixel map data type(the data is provided and bound to OpenHarmony system).
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        OPENHARMONY_PIXEL_MAP = 'openharmony.pixel-map',
        /**
         * OpenHarmony system defined atomic service data type(the data is provided and bound to OpenHarmony system).
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        OPENHARMONY_ATOMIC_SERVICE = 'openharmony.atomic-service',
        /**
         * OpenHarmony system defined package, which is a directory presented to the user as a file(the data is provided
         * <br>and bound to OpenHarmony system).
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        OPENHARMONY_PACKAGE = 'openharmony.package',
        /**
         * OpenHarmony system defined ability package(the data is provided and bound to OpenHarmony system).
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        OPENHARMONY_HAP = 'openharmony.hap',
        /**
         * OpenHarmony system AppNotepad data format.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OPENHARMONY_HDOC = 'openharmony.hdoc',
        /**
         * OpenHarmony system Notes data format.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OPENHARMONY_HINOTE = 'openharmony.hinote',
        /**
         * OpenHarmony system defined styled string.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OPENHARMONY_STYLED_STRING = 'openharmony.styled-string',
        /**
         * OpenHarmony system defined Want.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OPENHARMONY_WANT = 'openharmony.want',
        /**
         * Ofd data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OFD = 'general.ofd',
        /**
         * Cad data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        CAD = 'general.cad',
        /**
         * Octet stream data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        OCTET_STREAM = 'general.octet-stream'
    }
    /**
     * Class describing the uniform data type defined in the {@code UniformDataType}, which consists of attributes and
     * <br>methods describing the uniform data type and its relationships to other uniform data types.
     *
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 11
     */
    class TypeDescriptor {
        /**
         * Type ID of the uniform data type, which corresponds to the enum string in the {@code UniformDataType}.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        readonly typeId: string;
        /**
         * Uniform data type IDs that the uniform data type belongs to.
         *
         * @type { Array<string> }
         * @readonly
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        readonly belongingToTypes: Array<string>;
        /**
         * A textual description for the uniform data type.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        readonly description: string;
        /**
         * Reference URL for the uniform data type, which describes the detail information of the type.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        readonly referenceURL: string;
        /**
         * Default icon file path for the uniform data type.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        readonly iconFile: string;
        /**
         * File name extensions for the uniform data type.
         *
         * @type { Array<string> }
         * @readonly
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        readonly filenameExtensions: Array<string>;
        /**
         * MIMETypes of the uniform data type.
         *
         * @type { Array<string> }
         * @readonly
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 12
         */
        readonly mimeTypes: Array<string>;
        /**
         * Checks whether the uniform data type belongs to the given uniform data type.
         *
         * @param { string } type - A uniform data type to be compared.
         * @returns { boolean } Returns true if the data type belongs to the given data type, else false.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect Parameters types.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        belongsTo(type: string): boolean;
        /**
         * Checks whether the uniform data type is the lower level type of the given uniform data type.
         *
         * @param { string } type - A uniform data type to be compared.
         * @returns { boolean } Returns true if the data type is the lower level type of the given data type, else false.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect Parameters types.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        isLowerLevelType(type: string): boolean;
        /**
         * Checks whether the uniform data type is the higher level type of the given uniform data type.
         *
         * @param { string } type - A uniform data type to be compared.
         * @returns { boolean } Returns true if the data type is the higher level type of the given data type, else false.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect Parameters types.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        isHigherLevelType(type: string): boolean;
        /**
         * Checks whether the uniform type descriptor is equal to the given uniform type descriptor.
         *
         * @param { TypeDescriptor } typeDescriptor - A uniform type descriptor to be compared.
         * @returns { boolean } Returns true if the type descriptor is equal to the given type descriptor, else false.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect Parameters types.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        equals(typeDescriptor: TypeDescriptor): boolean;
    }
    /**
     * Queries and returns the uniform type descriptor by the given uniform data type ID.
     *
     * @param { string } typeId - Uniform data type ID.
     * @returns { TypeDescriptor } Returns the uniform type descriptor corresponding to the uniform data type ID or null
     * <br>if the uniform data type does not exist.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 11
     */
    function getTypeDescriptor(typeId: string): TypeDescriptor;
    /**
     * Queries and returns the uniform type descriptor by the given filename extension and the uniform data type it belongs to.
     *
     * @param { string } filenameExtension - Filename extension.
     * @param { string } [belongsTo] - A uniform data type ID it belongs to.
     * @returns { string } Returns the uniform data type ID corresponding to the given filename extension and the
     * <br>uniform data type it belongs to(If the 'belongsTo' parameter is set) or flexible type if the uniform data type does not exist.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 11
     */
    function getUniformDataTypeByFilenameExtension(filenameExtension: string, belongsTo?: string): string;
    /**
     * Queries and returns the uniform type descriptor by the given MIME type and the uniform data type it belongs to.
     *
     * @param { string } mimeType - MIME type.
     * @param { string } [belongsTo] - A uniform data type ID it belongs to.
     * @returns { string } Returns the uniform data type ID corresponding to the given MIME type and the uniform data type
     * <br>it belongs to(If the 'belongsTo' parameter is set) or flexible type if the uniform data type does not exist.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 11
     */
    function getUniformDataTypeByMIMEType(mimeType: string, belongsTo?: string): string;
}
export default uniformTypeDescriptor;
