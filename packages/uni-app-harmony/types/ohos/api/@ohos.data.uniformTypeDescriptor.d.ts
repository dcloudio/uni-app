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
         * Windows WMX audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        WINDOWS_MEDIA_WMX = 'com.microsoft.windows-media-wmx',
        /**
         * Windows WVX audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        WINDOWS_MEDIA_WVX = 'com.microsoft.windows-media-wvx',
        /**
         * Windows WAX audio format data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        WINDOWS_MEDIA_WAX = 'com.microsoft.windows-media-wax',
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
         * Disk image archive file data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        DISK_IMAGE = 'general.disk-image',
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
         * Calendar data type.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        CALENDAR = 'general.calendar',
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
        OPENHARMONY_HAP = 'openharmony.hap'
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
         * Checks whether the uniform data type belongs to the given uniform data type.
         *
         * @param { string } type - A uniform data type to be compared.
         * @returns { boolean } Returns true if the data type belongs to the given data type, else false.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        belongsTo(type: string): boolean;
        /**
         * Checks whether the uniform data type is the lower level type of the given uniform data type.
         *
         * @param { string } type - A uniform data type to be compared.
         * @returns { boolean } Returns true if the data type is the lower level type of the given data type, else false.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        isLowerLevelType(type: string): boolean;
        /**
         * Checks whether the uniform data type is the higher level type of the given uniform data type.
         *
         * @param { string } type - A uniform data type to be compared.
         * @returns { boolean } Returns true if the data type is the higher level type of the given data type, else false.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 11
         */
        isHigherLevelType(type: string): boolean;
        /**
         * Checks whether the uniform type descriptor is equal to the given uniform type descriptor.
         *
         * @param { TypeDescriptor } typeDescriptor - A uniform type descriptor to be compared.
         * @returns { boolean } Returns true if the type descriptor is equal to the given type descriptor, else false.
         * @throws { BusinessError } 401 - Parameter error.
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
     * @throws { BusinessError } 401 - Parameter error.
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
     * <br>uniform data type it belongs to(If the 'belongsTo' parameter is set) or null if the uniform data type does not exist.
     * @throws { BusinessError } 401 - Parameter error.
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
     * <br>it belongs to(If the 'belongsTo' parameter is set) or null if the uniform data type does not exist.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 11
     */
    function getUniformDataTypeByMIMEType(mimeType: string, belongsTo?: string): string;
}
export default uniformTypeDescriptor;
