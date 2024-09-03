/*
* Copyright (C) 2021-2024 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @file
 * @kit MediaKit
 */
import { ErrorCallback, AsyncCallback, Callback } from './@ohos.base';
import audio from "./@ohos.multimedia.audio";
import type image from './@ohos.multimedia.image';
import type { SoundPool as _SoundPool } from './multimedia/soundPool';
import type { PlayParameters as _PlayParameters } from './multimedia/soundPool';
import type drm from './@ohos.multimedia.drm';
/**
 * @namespace media
 * @since 6
 */
/**
 * @namespace media
 * @atomicservice
 * @since 11
 */
/**
 * @namespace media
 * @syscap SystemCapability.Multimedia.Media
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace media {
    /**
     * Creates an AVPlayer instance.
     * @param { AsyncCallback<AVPlayer> } callback - used to return AVPlayer instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @since 9
     */
    /**
     * Creates an AVPlayer instance.
     * @param { AsyncCallback<AVPlayer> } callback - used to return AVPlayer instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @atomicservice
     * @since 11
     */
    /**
     * Creates an AVPlayer instance.
     * @param { AsyncCallback<AVPlayer> } callback - used to return AVPlayer instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createAVPlayer(callback: AsyncCallback<AVPlayer>): void;
    /**
     * Creates an AVPlayer instance.
     * @returns { Promise<AVPlayer> } A Promise instance used to return AVPlayer instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @since 9
     */
    /**
     * Creates an AVPlayer instance.
     * @returns { Promise<AVPlayer> } A Promise instance used to return AVPlayer instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @atomicservice
     * @since 11
     */
    /**
     * Creates an AVPlayer instance.
     * @returns { Promise<AVPlayer> } A Promise instance used to return AVPlayer instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createAVPlayer(): Promise<AVPlayer>;
    /**
     * Creates an AVRecorder instance.
     * @param { AsyncCallback<AVRecorder> } callback - used to return AVRecorder instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @since 9
     */
    /**
     * Creates an AVRecorder instance.
     * @param { AsyncCallback<AVRecorder> } callback - used to return AVRecorder instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @crossplatform
     * @since 12
     */
    function createAVRecorder(callback: AsyncCallback<AVRecorder>): void;
    /**
     * Creates an AVRecorder instance.
     * @returns { Promise<AVRecorder> } A Promise instance used to return AVRecorder instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @since 9
     */
    /**
     * Creates an AVRecorder instance.
     * @returns { Promise<AVRecorder> } A Promise instance used to return AVRecorder instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createAVRecorder(): Promise<AVRecorder>;
    /**
     * Creates an AudioPlayer instance.
     * @returns { AudioPlayer } Returns an AudioPlayer instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Media.AudioPlayer
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.multimedia.media/media#createAVPlayer
     */
    function createAudioPlayer(): AudioPlayer;
    /**
     * Creates an AudioRecorder instance.
     * @returns { AudioRecorder } Returns an AudioRecorder instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Media.AudioRecorder
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.multimedia.media/media#createAVRecorder
     */
    function createAudioRecorder(): AudioRecorder;
    /**
     * Create MediaSource from url.
     * @param { string } url : The location for the media source.
     * @param { Record<string, string> } headers : Headers attached to network request while player request data.
     * @returns { MediaSource } MediaSource instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 5400101 - No memory.
     * @syscap SystemCapability.Multimedia.Media.Core
     * @since 12
     */
    function createMediaSourceWithUrl(url: string, headers?: Record<string, string>): MediaSource;
    /**
     * Creates an VideoPlayer instance.
     * @param { AsyncCallback<VideoPlayer> } callback - used to return AudioPlayer instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Media.VideoPlayer
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.multimedia.media/media#createAVPlayer
     */
    function createVideoPlayer(callback: AsyncCallback<VideoPlayer>): void;
    /**
     * Creates an VideoPlayer instance.
     * @returns { Promise<VideoPlayer> } A Promise instance used to return VideoPlayer instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Media.VideoPlayer
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.multimedia.media/media#createAVPlayer
     */
    function createVideoPlayer(): Promise<VideoPlayer>;
    /**
     * Creates a soundPool instance.
     *
     * @param {number} maxStreams The maximum number of simultaneous streams for this soundPool instance
     * @param {audio.AudioRendererInfo} audioRenderInfo Audio renderer information
     * @param {AsyncCallback<SoundPool>} callback Callback used to return soundPool instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    function createSoundPool(maxStreams: number, audioRenderInfo: audio.AudioRendererInfo, callback: AsyncCallback<SoundPool>): void;
    /**
     * Creates a soundPool instance.
     *
     * @param {number} maxStreams The maximum number of simultaneous streams for this soundPool instance
     * @param {audio.AudioRendererInfo} audioRenderInfo Audio renderer information
     * @returns {Promise<SoundPool>} A Promise instance used to return SoundPool instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    function createSoundPool(maxStreams: number, audioRenderInfo: audio.AudioRendererInfo): Promise<SoundPool>;
    /**
     * Creates an AVScreenCaptureRecorder instance.
     * @returns { Promise<AVScreenCaptureRecorder> } A Promise instance used to return AVScreenCaptureRecorder instance if the operation is successful;
     * returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
     * @since 12
     */
    function createAVScreenCaptureRecorder(): Promise<AVScreenCaptureRecorder>;
    /**
     * Manages and plays sound. Before calling an SoundPool method, you must use createSoundPool()
     * to create an SoundPool instance.
     *
     * @typedef { _SoundPool }
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    type SoundPool = _SoundPool;
    /**
     * Describes play parameters.
     *
     * @typedef { _PlayParameters }
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    type PlayParameters = _PlayParameters;
    /**
     * Enumerates state change reason.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @since 9
     */
    /**
     * Enumerates state change reason.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @atomicservice
     * @since 11
     */
    /**
     * Enumerates state change reason.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum StateChangeReason {
        /**
         * State changed by user operation.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 9
         */
        /**
         * State changed by user operation.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        /**
         * State changed by user operation.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        USER = 1,
        /**
         * State changed by background action.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 9
         */
        /**
         * State changed by background action.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        /**
         * State changed by background action.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        BACKGROUND = 2
    }
    /**
     * Creates an AVMetadataExtractor instance.
     * @returns { Promise<AVMetadataExtractor> } A Promise instance used to return AVMetadataExtractor instance
     * if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Returned by promise.
     * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
     * @since 11
     */
    /**
     * Creates an AVMetadataExtractor instance.
     * @returns { Promise<AVMetadataExtractor> } A Promise instance used to return AVMetadataExtractor instance
     * if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Returned by promise.
     * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
     * @crossplatform
     * @since 12
     */
    function createAVMetadataExtractor(): Promise<AVMetadataExtractor>;
    /**
     * Creates an AVMetadataExtractor instance.
     * @param { AsyncCallback<AVMetadataExtractor> } callback - Callback used to return AVMetadataExtractor instance
     * if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Returned by callback.
     * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
     * @since 11
     */
    /**
     * Creates an AVMetadataExtractor instance.
     * @param { AsyncCallback<AVMetadataExtractor> } callback - Callback used to return AVMetadataExtractor instance
     * if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Returned by callback.
     * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
     * @crossplatform
     * @since 12
     */
    function createAVMetadataExtractor(callback: AsyncCallback<AVMetadataExtractor>): void;
    /**
     * Creates an AVImageGenerator instance.
     * @returns { Promise<AVImageGenerator> } A Promise instance used to return AVImageGenerator instance
     * if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Returned by promise.
     * @syscap SystemCapability.Multimedia.Media.AVImageGenerator
     * @since 12
     */
    function createAVImageGenerator(): Promise<AVImageGenerator>;
    /**
     * Creates an AVImageGenerator instance.
     * @param { AsyncCallback<AVImageGenerator> } callback - Callback used to return AVImageGenerator instance
     * if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 5400101 - No memory. Returned by callback.
     * @syscap SystemCapability.Multimedia.Media.AVImageGenerator
     * @since 12
     */
    function createAVImageGenerator(callback: AsyncCallback<AVImageGenerator>): void;
    /**
     * Fetch media meta data or audio art picture from source. Before calling an AVMetadataExtractor method,
     * you must use createAVMetadataExtractor() to create an AVMetadataExtractor instance.
     * @typedef AVMetadataExtractor
     * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
     * @since 11
     */
    /**
     * Fetch media meta data or audio art picture from source. Before calling an AVMetadataExtractor method,
     * you must use createAVMetadataExtractor() to create an AVMetadataExtractor instance.
     * @typedef AVMetadataExtractor
     * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
     * @crossplatform
     * @since 12
     */
    interface AVMetadataExtractor {
        /**
         * Media file descriptor.
         * @type { ?AVFileDescriptor }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * Media file descriptor.
         * @type { ?AVFileDescriptor }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        fdSrc?: AVFileDescriptor;
        /**
         * DataSource descriptor.
         * @type { ?AVDataSrcDescriptor }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * DataSource descriptor.
         * @type { ?AVDataSrcDescriptor }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        dataSrc?: AVDataSrcDescriptor;
        /**
         * It will extract the resource to fetch media meta data info.
         * @param { AsyncCallback<AVMetadata> } callback - A callback instance used to return when fetchMetadata completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Returned by callback.
         * @throws { BusinessError } 5400106 - Unsupported format. Returned by callback.
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * It will extract the resource to fetch media meta data info.
         * @param { AsyncCallback<AVMetadata> } callback - A callback instance used to return when fetchMetadata completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Returned by callback.
         * @throws { BusinessError } 5400106 - Unsupported format. Returned by callback.
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        fetchMetadata(callback: AsyncCallback<AVMetadata>): void;
        /**
         * It will extract the resource to fetch media meta data info.
         * @returns { Promise<AVMetadata> } A Promise instance used to return when fetchMetadata completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Returned by promise.
         * @throws { BusinessError } 5400106 - Unsupported format. Returned by promise.
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * It will extract the resource to fetch media meta data info.
         * @returns { Promise<AVMetadata> } A Promise instance used to return when fetchMetadata completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Returned by promise.
         * @throws { BusinessError } 5400106 - Unsupported format. Returned by promise.
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        fetchMetadata(): Promise<AVMetadata>;
        /**
         * It will extract the audio resource to fetch an album cover.
         * @param { AsyncCallback<image.PixelMap> } callback - A callback instance used
         * to return when fetchAlbumCover completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @throws { BusinessError } 5400106 - Unsupported format. Returned by callback.
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * It will extract the audio resource to fetch an album cover.
         * @param { AsyncCallback<image.PixelMap> } callback - A callback instance used
         * to return when fetchAlbumCover completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @throws { BusinessError } 5400106 - Unsupported format. Returned by callback.
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        fetchAlbumCover(callback: AsyncCallback<image.PixelMap>): void;
        /**
         * It will extract the audio resource to fetch an album cover.
         * @returns { Promise<image.PixelMap> } A Promise instance used to return when fetchAlbumCover completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Returned by promise.
         * @throws { BusinessError } 5400106 - Unsupported format. Returned by promise.
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * It will extract the audio resource to fetch an album cover.
         * @returns { Promise<image.PixelMap> } A Promise instance used to return when fetchAlbumCover completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Returned by promise.
         * @throws { BusinessError } 5400106 - Unsupported format. Returned by promise.
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        fetchAlbumCover(): Promise<image.PixelMap>;
        /**
         * Release resources used for AVMetadataExtractor.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when release completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Returned by callback.
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * Release resources used for AVMetadataExtractor.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when release completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Returned by callback.
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Release resources used for AVMetadataExtractor.
         * @returns { Promise<void> } A Promise instance used to return when release completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Returned by promise.
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * Release resources used for AVMetadataExtractor.
         * @returns { Promise<void> } A Promise instance used to return when release completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Returned by promise.
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        release(): Promise<void>;
    }
    /**
     * Provides the container definition for media meta data.
     * @typedef AVMetadata
     * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
     * @since 11
     */
    /**
     * Provides the container definition for media meta data.
     * @typedef AVMetadata
     * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
     * @crossplatform
     * @since 12
     */
    interface AVMetadata {
        /**
         * The metadata to retrieve the information about the album title
         * of the media source.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * The metadata to retrieve the information about the album title
         * of the media source. This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        album?: string;
        /**
         * The metadata to retrieve the information about the performer or
         * artist associated with the media source.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * The metadata to retrieve the information about the performer or
         * artist associated with the media source. This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        albumArtist?: string;
        /**
         * The metadata to retrieve the information about the artist of
         * the media source.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * The metadata to retrieve the information about the artist of
         * the media source. This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        artist?: string;
        /**
         * The metadata to retrieve the information about the author of
         * the media source.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * The metadata to retrieve the information about the author of
         * the media source. This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        author?: string;
        /**
         * The metadata to retrieve the information about the created time of
         * the media source.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * The metadata to retrieve the information about the created time of
         * the media source. This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        dateTime?: string;
        /**
         * The metadata to retrieve the information about the created or modified time
         * with the specific date format of the media source.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * The metadata to retrieve the information about the created or modified time
         * with the specific date format of the media source. This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        dateTimeFormat?: string;
        /**
         * The metadata to retrieve the information about the composer of
         * the media source.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * The metadata to retrieve the information about the composer of
         * the media source. This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        composer?: string;
        /**
         * The metadata to retrieve the playback duration of the media source.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * The metadata to retrieve the playback duration of the media source. This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        duration?: string;
        /**
         * The metadata to retrieve the content type or genre of the data
         * source.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * The metadata to retrieve the content type or genre of the data
         * source.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        genre?: string;
        /**
         * If this value exists the media contains audio content.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * If this value exists the media contains audio content. This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        hasAudio?: string;
        /**
         * If this value exists the media contains video content.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * If this value exists the media contains video content. This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        hasVideo?: string;
        /**
         * The metadata to retrieve the mime type of the media source. Some
         * example mime types include: "video/mp4", "audio/mp4", "audio/amr-wb",
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * The metadata to retrieve the mime type of the media source. Some
         * example mime types include: "video/mp4", "audio/mp4", "audio/amr-wb". This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        mimeType?: string;
        /**
         * The metadata to retrieve the number of tracks, such as audio, video,
         * text, in the media source, such as a mp4 or 3gpp file.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * The metadata to retrieve the number of tracks, such as audio, video,
         * text, in the media source, such as a mp4 or 3gpp file. This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        trackCount?: string;
        /**
         * It is the audio sample rate, if available.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * It is the audio sample rate, if available. This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        sampleRate?: string;
        /**
         * The metadata to retrieve the media source title.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * The metadata to retrieve the media source title. This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        title?: string;
        /**
         * If the media contains video, this key retrieves its height.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * If the media contains video, this key retrieves its height. This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        videoHeight?: string;
        /**
         * If the media contains video, this key retrieves its width.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * If the media contains video, this key retrieves its width. This field is readonly in current version.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        videoWidth?: string;
        /**
         * The metadata to retrieve the information about the video
         * orientation.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 11
         */
        /**
         * The metadata to retrieve the information about the video
         * orientation.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @crossplatform
         * @since 12
         */
        videoOrientation?: string;
        /**
        * This value exists if the video is HDR video.
        * @type { ?HdrType }
        * @readonly
        * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
        * @crossplatform
        * @since 12
        */
        hdrType?: HdrType;
        /**
         * The geographical location info of the video.
         * @type { ?Location }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 12
         */
        location?: Location;
        /**
         * Custom parameter key-value map read from moov.meta.list.
         * @type { ?Record<string, string> }
         * @syscap SystemCapability.Multimedia.Media.AVMetadataExtractor
         * @since 12
         */
        customInfo?: Record<string, string>;
    }
    /**
     * Enumerates options about the HDR Type of the video.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @crossplatform
     * @since 12
     */
    enum HdrType {
        /**
         * This option is used to mark none HDR type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @since 12
         */
        AV_HDR_TYPE_NONE = 0,
        /**
         * This option is used to mark HDR Vivid type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @since 12
         */
        AV_HDR_TYPE_VIVID = 1
    }
    /**
     * Generate an image from a video resource with the specific time. Before calling an AVImageGenerator method,
     * you must use createAVImageGenerator() to create an AVImageGenerator instance.
     * @typedef AVImageGenerator
     * @syscap SystemCapability.Multimedia.Media.AVImageGenerator
     * @since 12
     */
    interface AVImageGenerator {
        /**
         * Media file descriptor.
         * @type { ?AVFileDescriptor }
         * @syscap SystemCapability.Multimedia.Media.AVImageGenerator
         * @since 12
         */
        fdSrc?: AVFileDescriptor;
        /**
         * It will fetch a picture at @timeUs from the given video resource.
         * @param { number } timeUs - The time expected to fetch picture from the video resource.
         * The unit is microsecond(us).
         * @param { AVImageQueryOptions } options - The time options about the relationship
         * between the given timeUs and a key frame, see @AVImageQueryOptions .
         * @param { PixelMapParams } param - The output pixel map format params, see @PixelMapParams .
         * @param { AsyncCallback<image.PixelMap> } callback - A callback instance used
         * to return when fetchFrameByTime completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Returned by callback.
         * @throws { BusinessError } 5400106 - Unsupported format. Returned by callback.
         * @syscap SystemCapability.Multimedia.Media.AVImageGenerator
         * @since 12
         */
        fetchFrameByTime(timeUs: number, options: AVImageQueryOptions, param: PixelMapParams, callback: AsyncCallback<image.PixelMap>): void;
        /**
         * It will decode the given video resource. Then fetch a picture
         * at @timeUs according the given @options and @param .
         * @param { number } timeUs - The time expected to fetch picture from the video resource.
         * The unit is microsecond(us).
         * @param { AVImageQueryOptions } options - The time options about the relationship
         * between the given timeUs and a key frame, see @AVImageQueryOptions .
         * @param { PixelMapParams } param - The output pixel map format params, see @PixelMapParams .
         * @returns { Promise<image.PixelMap> } A Promise instance used to return the pixel map
         * when fetchFrameByTime completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Returned by promise.
         * @throws { BusinessError } 5400106 - Unsupported format. Returned by promise.
         * @syscap SystemCapability.Multimedia.Media.AVImageGenerator
         * @since 12
         */
        fetchFrameByTime(timeUs: number, options: AVImageQueryOptions, param: PixelMapParams): Promise<image.PixelMap>;
        /**
         * Release resources used for AVImageGenerator.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when release completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Returned by callback.
         * @syscap SystemCapability.Multimedia.Media.AVImageGenerator
         * @since 12
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Release resources used for AVImageGenerator.
         * @returns { Promise<void> } A Promise instance used to return when release completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Returned by promise.
         * @syscap SystemCapability.Multimedia.Media.AVImageGenerator
         * @since 12
         */
        release(): Promise<void>;
    }
    /**
     * Enumerates options about the relationship between the given timeUs and a key frame.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.AVImageGenerator
     * @since 12
     */
    enum AVImageQueryOptions {
        /**
         * This option is used to fetch a key frame from the given media
         * resource that is located right after or at the given time.
         * @syscap SystemCapability.Multimedia.Media.AVImageGenerator
         * @since 12
         */
        AV_IMAGE_QUERY_NEXT_SYNC,
        /**
         * This option is used to fetch a key frame from the given media
         * resource that is located right before or at the given time.
         * @syscap SystemCapability.Multimedia.Media.AVImageGenerator
         * @since 12
         */
        AV_IMAGE_QUERY_PREVIOUS_SYNC,
        /**
         * This option is used to fetch a key frame from the given media
         * resource that is located closest to or at the given time.
         * @syscap SystemCapability.Multimedia.Media.AVImageGenerator
         * @since 12
         */
        AV_IMAGE_QUERY_CLOSEST_SYNC
    }
    /**
     * Expected pixel map format for the fetched image from video resource.
     * @typedef PixelMapParams
     * @syscap SystemCapability.Multimedia.Media.AVImageGenerator
     * @since 12
     */
    interface PixelMapParams {
        /**
         * Expected pixelmap's width, -1 means to keep consistent with the
         * original dimensions of the given video resource.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVImageGenerator
         * @since 12
         */
        width?: number;
        /**
         * Expected pixelmap's width, -1 means to keep consistent with the
         * original dimensions of the given video resource.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVImageGenerator
         * @since 12
         */
        height?: number;
    }
    /**
      * Enumerates ErrorCode types, return in BusinessError::code.
      *
      * @enum { number }
      * @syscap SystemCapability.Multimedia.Media.Core
      * @since 9
      */
    /**
     * Enumerates ErrorCode types, return in BusinessError::code.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @atomicservice
     * @since 11
     */
    enum AVErrorCode {
        /**
         * Operation success.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 9
         */
        /**
         * Operation success.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        AVERR_OK = 0,
        /**
         * Permission denied.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 9
         */
        /**
         * Permission denied.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        AVERR_NO_PERMISSION = 201,
        /**
         * Invalid parameter.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 9
         */
        /**
         * Invalid parameter.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        AVERR_INVALID_PARAMETER = 401,
        /**
         * The api is not supported in the current version.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 9
         */
        /**
         * The api is not supported in the current version.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        AVERR_UNSUPPORT_CAPABILITY = 801,
        /**
         * The system memory is insufficient or the number of services reaches the upper limit.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 9
         */
        /**
         * The system memory is insufficient or the number of services reaches the upper limit.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        AVERR_NO_MEMORY = 5400101,
        /**
         * Current status does not allow or do not have permission to perform this operation.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 9
         */
        /**
         * Current status does not allow or do not have permission to perform this operation.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        AVERR_OPERATE_NOT_PERMIT = 5400102,
        /**
         * Data flow exception information.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 9
         */
        /**
         * Data flow exception information.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        AVERR_IO = 5400103,
        /**
         * System or network response timeout.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 9
         */
        /**
         * System or network response timeout.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        AVERR_TIMEOUT = 5400104,
        /**
         * Service process died.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 9
         */
        /**
         * Service process died.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        AVERR_SERVICE_DIED = 5400105,
        /**
         * Unsupported media format.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 9
         */
        /**
         * Unsupported media format.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        AVERR_UNSUPPORT_FORMAT = 5400106,
        /**
         * Audio interrupted.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        AVERR_AUDIO_INTERRUPTED = 5400107
    }
    /**
     * Describes AVPlayer states.
     * @typedef {'idle' | 'initialized' | 'prepared' | 'playing' | 'paused' | 'completed' | 'stopped' | 'released' | 'error'}
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @since 9
  
     */
    /**
     * Describes AVPlayer states.
     * @typedef {'idle' | 'initialized' | 'prepared' | 'playing' | 'paused' | 'completed' | 'stopped' | 'released' | 'error'}
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @atomicservice
     * @since 11
  
     */
    /**
     * Describes AVPlayer states.
     * @typedef {'idle' | 'initialized' | 'prepared' | 'playing' | 'paused' | 'completed' | 'stopped' | 'released' | 'error'}
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    type AVPlayerState = 'idle' | 'initialized' | 'prepared' | 'playing' | 'paused' | 'completed' | 'stopped' | 'released' | 'error';
    /**
     * Defines the OnStateChange callback.
     *
     * @typedef { function } OnAVPlayerStateChangeHandle
     * @param { AVPlayerState } state - state for AVPlayer.
     * @param { StateChangeReason } reason - reason for state change.
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    type OnAVPlayerStateChangeHandle = (state: AVPlayerState, reason: StateChangeReason) => void;
    /**
     * Defines the OnBufferingUpdateHandler callback.
     *
     * @typedef { function } OnBufferingUpdateHandler
     * @param { BufferingInfoType } infoType - define the Buffering info Type.
     * @param { number } value - define the value of buffering info type if exist.
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    type OnBufferingUpdateHandler = (infoType: BufferingInfoType, value: number) => void;
    /**
     * Defines the OnVideoSizeChangeHandler callback.
     *
     * @typedef { function } OnVideoSizeChangeHandler
     * @param { number } width - Value of video Width.
     * @param { number } height - Value of video Height.
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    type OnVideoSizeChangeHandler = (width: number, height: number) => void;
    /**
     * Manages and plays media. Before calling an AVPlayer method, you must use createAVPlayer()
     * to create an AVPlayer instance.
     *
     * @typedef AVPlayer
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @since 9
     */
    /**
     * Manages and plays media. Before calling an AVPlayer method, you must use createAVPlayer()
     * to create an AVPlayer instance.
     *
     * @typedef AVPlayer
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @atomicservice
     * @since 11
     */
    /**
     * Manages and plays media. Before calling an AVPlayer method, you must use createAVPlayer()
     * to create an AVPlayer instance.
     *
     * @typedef AVPlayer
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface AVPlayer {
        /**
         * Prepare audio/video playback, it will request resource for playing.
         * @param { AsyncCallback<void> } callback - instance used to return when prepare completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @throws { BusinessError } 5400106 - Unsupport format. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Prepare audio/video playback, it will request resource for playing.
         * @param { AsyncCallback<void> } callback - instance used to return when prepare completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @throws { BusinessError } 5400106 - Unsupport format. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Prepare audio/video playback, it will request resource for playing.
         * @param { AsyncCallback<void> } callback - instance used to return when prepare completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @throws { BusinessError } 5400106 - Unsupport format. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        prepare(callback: AsyncCallback<void>): void;
        /**
         * Prepare audio/video playback, it will request resource for playing.
         * @returns { Promise<void> } A Promise instance used to return when prepare completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @throws { BusinessError } 5400106 - Unsupport format. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Prepare audio/video playback, it will request resource for playing.
         * @returns { Promise<void> } A Promise instance used to return when prepare completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @throws { BusinessError } 5400106 - Unsupport format. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Prepare audio/video playback, it will request resource for playing.
         * @returns { Promise<void> } A Promise instance used to return when prepare completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @throws { BusinessError } 5400106 - Unsupport format. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        prepare(): Promise<void>;
        /**
         * Play audio/video playback.
         * @param { AsyncCallback<void> } callback - instance used to return when play completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Play audio/video playback.
         * @param { AsyncCallback<void> } callback - instance used to return when play completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Play audio/video playback.
         * @param { AsyncCallback<void> } callback - instance used to return when play completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        play(callback: AsyncCallback<void>): void;
        /**
         * Play audio/video playback.
         * @returns { Promise<void> } A Promise instance used to return when play completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Play audio/video playback.
         * @returns { Promise<void> } A Promise instance used to return when play completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Play audio/video playback.
         * @returns { Promise<void> } A Promise instance used to return when play completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        play(): Promise<void>;
        /**
         * Pause audio/video playback.
         * @param { AsyncCallback<void> } callback - instance used to return when pause completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Pause audio/video playback.
         * @param { AsyncCallback<void> } callback - instance used to return when pause completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Pause audio/video playback.
         * @param { AsyncCallback<void> } callback - instance used to return when pause completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        pause(callback: AsyncCallback<void>): void;
        /**
         * Pause audio/video playback.
         * @returns { Promise<void> } A Promise instance used to return when pause completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Pause audio/video playback.
         * @returns { Promise<void> } A Promise instance used to return when pause completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Pause audio/video playback.
         * @returns { Promise<void> } A Promise instance used to return when pause completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        pause(): Promise<void>;
        /**
         * Stop audio/video playback.
         * @param { AsyncCallback<void> } callback - instance used to return when stop completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Stop audio/video playback.
         * @param { AsyncCallback<void> } callback - instance used to return when stop completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Stop audio/video playback.
         * @param { AsyncCallback<void> } callback - instance used to return when stop completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        stop(callback: AsyncCallback<void>): void;
        /**
         * Stop audio/video playback.
         * @returns { Promise<void> } A Promise instance used to return when stop completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Stop audio/video playback.
         * @returns { Promise<void> } A Promise instance used to return when stop completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Stop audio/video playback.
         * @returns { Promise<void> } A Promise instance used to return when stop completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        stop(): Promise<void>;
        /**
         * Reset AVPlayer, it will to idle state and can set src again.
         * @param { AsyncCallback<void> } callback - instance used to return when reset completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Reset AVPlayer, it will to idle state and can set src again.
         * @param { AsyncCallback<void> } callback - instance used to return when reset completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Reset AVPlayer, it will to idle state and can set src again.
         * @param { AsyncCallback<void> } callback - instance used to return when reset completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        reset(callback: AsyncCallback<void>): void;
        /**
         * Reset AVPlayer, it will to idle state and can set src again.
         * @returns { Promise<void> } A Promise instance used to return when reset completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Reset AVPlayer, it will to idle state and can set src again.
         * @returns { Promise<void> } A Promise instance used to return when reset completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Reset AVPlayer, it will to idle state and can set src again.
         * @returns { Promise<void> } A Promise instance used to return when reset completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        reset(): Promise<void>;
        /**
         * Releases resources used for AVPlayer.
         * @param { AsyncCallback<void> } callback - instance used to return when release completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Releases resources used for AVPlayer.
         * @param { AsyncCallback<void> } callback - instance used to return when release completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Releases resources used for AVPlayer.
         * @param { AsyncCallback<void> } callback - instance used to return when release completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Releases resources used for AVPlayer.
         * @returns { Promise<void> } A Promise instance used to return when release completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Releases resources used for AVPlayer.
         * @returns { Promise<void> } A Promise instance used to return when release completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Releases resources used for AVPlayer.
         * @returns { Promise<void> } A Promise instance used to return when release completed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        release(): Promise<void>;
        /**
         * Jumps to the specified playback position.
         * @param { number } timeMs - Playback position to jump, should be in [0, duration].
         * @param { SeekMode } mode - See @SeekMode .
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Jumps to the specified playback position.
         * @param { number } timeMs - Playback position to jump, should be in [0, duration].
         * @param { SeekMode } mode - See @SeekMode .
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Jumps to the specified playback position.
         * @param { number } timeMs - Playback position to jump, should be in [0, duration].
         * @param { SeekMode } mode - See @SeekMode .
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        seek(timeMs: number, mode?: SeekMode): void;
        /**
         * Sets the volume.
         * @param { number } volume - Relative volume. The value ranges from 0.00 to 1.00. The value 1 indicates the maximum volume (100%).
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Sets the volume.
         * @param { number } volume - Relative volume. The value ranges from 0.00 to 1.00. The value 1 indicates the maximum volume (100%).
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        setVolume(volume: number): void;
        /**
         * Get all track infos in MediaDescription, should be called after data loaded callback.
         * @param { AsyncCallback<Array<MediaDescription>> } callback - Async callback return track info in MediaDescription.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Get all track infos in MediaDescription, should be called after data loaded callback.
         * @param { AsyncCallback<Array<MediaDescription>> } callback - Async callback return track info in MediaDescription.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Get all track infos in MediaDescription, should be called after data loaded callback.
         * @param { AsyncCallback<Array<MediaDescription>> } callback - Async callback return track info in MediaDescription.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getTrackDescription(callback: AsyncCallback<Array<MediaDescription>>): void;
        /**
         * Get all track infos in MediaDescription, should be called after data loaded callback.
         * @returns { Promise<Array<MediaDescription>> } A Promise instance used to return the track info in MediaDescription.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Get all track infos in MediaDescription, should be called after data loaded callback.
         * @returns { Promise<Array<MediaDescription>> } A Promise instance used to return the track info in MediaDescription.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Get all track infos in MediaDescription, should be called after data loaded callback.
         * @returns { Promise<Array<MediaDescription>> } A Promise instance used to return the track info in MediaDescription.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getTrackDescription(): Promise<Array<MediaDescription>>;
        /**
         * Set MediaSource to AVPlayer, this interface is exclusive with fd/url/dataSrc assign.
         * @param { MediaSource } src : MediaSource instance to be set to the avplayer instance.
         * @param { PlaybackStrategy } strategy : Play strategy of the media source.
         * @returns { Promise<void> } A Promise instance used to return when setMediaSource completed.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        setMediaSource(src: MediaSource, strategy?: PlaybackStrategy): Promise<void>;
        /**
         * Add subtitle resource represented by FD to the player.
         * @param { number } fd : The file descriptor of subtitle source from file system.
         * The caller is responsible to close the file descriptor.
         * @param { number } offset : The offset into the file where the data to be read, in bytes.
         * By default, the offset is zero.
         * @param { number } length : The length in bytes of the data to be read.
         * By default, the length is the rest of bytes in the file from the offset.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - The parameter check failed. Return by promise.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        addSubtitleFromFd(fd: number, offset?: number, length?: number): Promise<void>;
        /**
         * Add subtitle resource represented by url to the player. After the Promise returns,
         * subtitle info can be obtained by @getTrackDescription
         * @param { string } url : Address of external subtitle file.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - The parameter check failed. Return by promise.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        addSubtitleFromUrl(url: string): Promise<void>;
        /**
         * Media URI. Mainstream media formats are supported.
         * Network:http://xxx
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Media URI. Mainstream media formats are supported.
         * Network:http://xxx
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Media URI. Mainstream media formats are supported.
         * Network:http://xxx
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        url?: string;
        /**
         * Media file descriptor. Mainstream media formats are supported.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Media file descriptor. Mainstream media formats are supported.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Media file descriptor. Mainstream media formats are supported.
         * @type { ?AVFileDescriptor }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        fdSrc?: AVFileDescriptor;
        /**
         * DataSource descriptor. Supports mainstream media formats.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 10
         */
        /**
         * DataSource descriptor. Supports mainstream media formats.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * DataSource descriptor. Supports mainstream media formats.
         * @type { ?AVDataSrcDescriptor }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        dataSrc?: AVDataSrcDescriptor;
        /**
         * Whether to loop media playback.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Whether to loop media playback.
         * @type { boolean }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        loop: boolean;
        /**
         * Describes audio interrupt mode, refer to {@link #audio.InterruptMode}. If it is not
         * set, the default mode will be used. Set it before calling the {@link #play()} in the
         * first time in order for the interrupt mode to become effective thereafter.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Describes audio interrupt mode, refer to {@link #audio.InterruptMode}. If it is not
         * set, the default mode will be used. Set it before calling the {@link #play()} in the
         * first time in order for the interrupt mode to become effective thereafter.
         * @type { ?audio.InterruptMode }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        audioInterruptMode?: audio.InterruptMode;
        /**
         * Describes audio renderer info, refer to {@link #audio.AudioRendererInfo}. Set it before
         * calling the {@link #prepare()} in the first time in order for the audio renderer info to
         * become effective thereafter.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 10
         */
        /**
         * Describes audio renderer info, refer to {@link #audio.AudioRendererInfo}. Set it before
         * calling the {@link #prepare()} in the first time in order for the audio renderer info to
         * become effective thereafter.
         * @type { ?audio.AudioRendererInfo }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        audioRendererInfo?: audio.AudioRendererInfo;
        /**
         * Obtains the current audio effect mode, refer to {@link #audio.AudioEffectMode}.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 10
         */
        /**
         * Obtains the current audio effect mode, refer to {@link #audio.AudioEffectMode}.
         * @type { ?audio.AudioEffectMode }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        audioEffectMode?: audio.AudioEffectMode;
        /**
         * Current playback position.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Current playback position.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly currentTime: number;
        /**
         * Playback duration, When the data source does not support seek, it returns - 1, such as a live broadcast scenario.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Playback duration, When the data source does not support seek, it returns - 1, such as a live broadcast scenario.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Playback duration, When the data source does not support seek, it returns - 1, such as a live broadcast scenario.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly duration: number;
        /**
         * Playback state.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Playback state.
         * @type { AVPlayerState }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly state: AVPlayerState;
        /**
         * Video player will use this id get a surface instance.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Video player will use this id get a surface instance.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Video player will use this id get a surface instance.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        surfaceId?: string;
        /**
         * Video width, valid after prepared.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Video width, valid after prepared.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly width: number;
        /**
         * Video height, valid after prepared.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Video height, valid after prepared.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly height: number;
        /**
         * Video scale type. By default, the {@link #VIDEO_SCALE_TYPE_FIT} will be used, for more
         * information, refer to {@link #VideoScaleType} .
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Video scale type. By default, the {@link #VIDEO_SCALE_TYPE_FIT} will be used, for more
         * information, refer to {@link #VideoScaleType} .
         * @type { ?VideoScaleType }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        videoScaleType?: VideoScaleType;
        /**
         * Set payback speed.
         * @param { PlaybackSpeed } speed - playback speed, see @PlaybackSpeed .
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Set payback speed.
         * @param { PlaybackSpeed } speed - playback speed, see @PlaybackSpeed .
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        setSpeed(speed: PlaybackSpeed): void;
        /**
         * select a specified bitrate to playback, only valid for HLS protocol network stream. By default, the
         * player will select the appropriate bitrate according to the network connection speed. The
         * available bitrate list reported by {@link #on('availableBitrates')}. Set it to select
         * a specified bitrate. If the specified bitrate is not in the list of available bitrate, the player
         * will select the minimal and closest one from the available bitrate list.
         * @param { number } bitrate - the playback bitrate must be expressed in bits per second.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * select a specified bitrate to playback, only valid for HLS protocol network stream. By default, the
         * player will select the appropriate bitrate according to the network connection speed. The
         * available bitrate list reported by {@link #on('availableBitrates')}. Set it to select
         * a specified bitrate. If the specified bitrate is not in the list of available bitrate, the player
         * will select the minimal and closest one from the available bitrate list.
         * @param { number } bitrate - the playback bitrate must be expressed in bits per second.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        setBitrate(bitrate: number): void;
        /**
         * Set decryption session to codec module.
         * @param { drm.MediaKeySession } mediaKeySession - Handle of MediaKeySession to decrypt encrypted media.
         * @param { boolean } secureVideoPath - Secure video path required or not.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 11
         */
        /**
         * Set decryption session to codec module.
         * @param { drm.MediaKeySession } mediaKeySession - Handle of MediaKeySession to decrypt encrypted media.
         * @param { boolean } secureVideoPath - Secure video path required or not.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        setDecryptionConfig(mediaKeySession: drm.MediaKeySession, secureVideoPath: boolean): void;
        /**
         * Get media key system info from media source.
         * @returns { Array<drm.MediaKeySystemInfo> } MediaKeySystemInfo with PSSH.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 11
         */
        /**
         * Get media key system info from media source.
         * @returns { Array<drm.MediaKeySystemInfo> } MediaKeySystemInfo with PSSH.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        getMediaKeySystemInfos(): Array<drm.MediaKeySystemInfo>;
        /**
         * Register listens for mediaKeySystemInfoUpdate events.
         * @param { 'mediaKeySystemInfoUpdate' } type - Type of the event to listen for.
         * @param { function } callback - Callback used to listen for the mediaKeySystemInfoUpdate event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 11
         */
        /**
         * Register listens for mediaKeySystemInfoUpdate events.
         * @param { 'mediaKeySystemInfoUpdate' } type - Type of the event to listen for.
         * @param { Callback<Array<drm.MediaKeySystemInfo>> } callback - Callback used to listen for the mediaKeySystemInfoUpdate event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        on(type: 'mediaKeySystemInfoUpdate', callback: Callback<Array<drm.MediaKeySystemInfo>>): void;
        /**
         * Unregister listens for mediaKeySystemInfoUpdate events.
         * @param { 'mediaKeySystemInfoUpdate' } type - Type of the event to listen for.
         * @param { function } callback - Callback for event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 11
         */
        /**
         * Unregister listens for mediaKeySystemInfoUpdate events.
         * @param { 'mediaKeySystemInfoUpdate' } type - Type of the event to listen for.
         * @param { Callback<Array<drm.MediaKeySystemInfo>> } callback - Callback for event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        off(type: 'mediaKeySystemInfoUpdate', callback?: Callback<Array<drm.MediaKeySystemInfo>>): void;
        /**
         * Register listens for media playback stateChange event.
         * @param { 'stateChange' } type - Type of the playback event to listen for.
         * @param { function } callback - Callback used to listen for the playback stateChange event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Register listens for media playback stateChange event.
         * @param { 'stateChange' } type - Type of the playback event to listen for.
         * @param { function } callback - Callback used to listen for the playback stateChange event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Register listens for media playback stateChange event.
         * @param { 'stateChange' } type - Type of the playback event to listen for.
         * @param { OnAVPlayerStateChangeHandle } callback - Callback used to listen for the playback stateChange event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(type: 'stateChange', callback: OnAVPlayerStateChangeHandle): void;
        /**
         * Unregister listens for media playback stateChange event.
         * @param { 'stateChange' } type - Type of the playback event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Unregister listens for media playback stateChange event.
         * @param { 'stateChange' } type - Type of the playback event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Unregister listens for media playback stateChange event.
         * @param { 'stateChange' } type - Type of the playback event to listen for.
         * @param { OnAVPlayerStateChangeHandle } callback - Callback used to listen for stateChange event
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        off(type: 'stateChange', callback?: OnAVPlayerStateChangeHandle): void;
        /**
         * Register listens for media playback volumeChange event.
         * @param { 'volumeChange' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback volume event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Register listens for media playback volumeChange event.
         * @param { 'volumeChange' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback volume event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(type: 'volumeChange', callback: Callback<number>): void;
        /**
         * Unregister listens for media playback volumeChange event.
         * @param { 'volumeChange' } type - Type of the playback event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Unregister listens for media playback volumeChange event.
         * @param { 'volumeChange' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback volume event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @since 12
         */
        off(type: 'volumeChange', callback?: Callback<number>): void;
        /**
         * Register listens for media playback endOfStream event.
         * @param { 'endOfStream' } type - Type of the playback event to listen for.
         * @param { Callback<void> } callback - Callback used to listen for the playback end of stream.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Register listens for media playback endOfStream event.
         * @param { 'endOfStream' } type - Type of the playback event to listen for.
         * @param { Callback<void> } callback - Callback used to listen for the playback end of stream.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(type: 'endOfStream', callback: Callback<void>): void;
        /**
         * Unregister listens for media playback endOfStream event.
         * @param { 'endOfStream' } type - Type of the playback event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Unregister listens for media playback endOfStream event.
         * @param { 'endOfStream' } type - Type of the playback event to listen for.
         * @param { Callback<void> } callback - Callback used to listen for the playback end of stream.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @since 12
         */
        off(type: 'endOfStream', callback?: Callback<void>): void;
        /**
         * Register listens for media playback seekDone event.
         * @param { 'seekDone' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback seekDone event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Register listens for media playback seekDone event.
         * @param { 'seekDone' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback seekDone event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Register listens for media playback seekDone event.
         * @param { 'seekDone' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback seekDone event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(type: 'seekDone', callback: Callback<number>): void;
        /**
         * Unregister listens for media playback seekDone event.
         * @param { 'seekDone' } type - Type of the playback event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Unregister listens for media playback seekDone event.
         * @param { 'seekDone' } type - Type of the playback event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Unregister listens for media playback seekDone event.
         * @param { 'seekDone' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback seekDone event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        off(type: 'seekDone', callback?: Callback<number>): void;
        /**
         * Register listens for media playback speedDone event.
         * @param { 'speedDone' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback speedDone event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Register listens for media playback speedDone event.
         * @param { 'speedDone' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback speedDone event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(type: 'speedDone', callback: Callback<number>): void;
        /**
         * Unregister listens for media playback speedDone event.
         * @param { 'speedDone' } type - Type of the playback event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Unregister listens for media playback speedDone event.
         * @param { 'speedDone' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback speedDone event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @since 12
         */
        off(type: 'speedDone', callback?: Callback<number>): void;
        /**
         * Register listens for media playback setBitrateDone event.
         * @param { 'bitrateDone' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback setBitrateDone event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Register listens for media playback setBitrateDone event.
         * @param { 'bitrateDone' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback setBitrateDone event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        on(type: 'bitrateDone', callback: Callback<number>): void;
        /**
         * Unregister listens for media playback setBitrateDone event.
         * @param { 'bitrateDone' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback setBitrateDone event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        off(type: 'bitrateDone', callback?: Callback<number>): void;
        /**
         * Register listens for media playback timeUpdate event.
         * @param { 'timeUpdate' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback timeUpdate event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Register listens for media playback timeUpdate event.
         * @param { 'timeUpdate' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback timeUpdate event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Register listens for media playback timeUpdate event.
         * @param { 'timeUpdate' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback timeUpdate event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(type: 'timeUpdate', callback: Callback<number>): void;
        /**
         * Unregister listens for media playback timeUpdate event.
         * @param { 'timeUpdate' } type - Type of the playback event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Unregister listens for media playback timeUpdate event.
         * @param { 'timeUpdate' } type - Type of the playback event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Unregister listens for media playback timeUpdate event.
         * @param { 'timeUpdate' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback timeUpdate event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        off(type: 'timeUpdate', callback?: Callback<number>): void;
        /**
         * Register listens for media playback durationUpdate event.
         * @param { 'durationUpdate' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback durationUpdate event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Register listens for media playback durationUpdate event.
         * @param { 'durationUpdate' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback durationUpdate event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(type: 'durationUpdate', callback: Callback<number>): void;
        /**
         * Unregister listens for media playback durationUpdate event.
         * @param { 'durationUpdate' } type - Type of the playback event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Unregister listens for media playback durationUpdate event.
         * @param { 'durationUpdate' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback durationUpdate event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @since 12
         */
        off(type: 'durationUpdate', callback?: Callback<number>): void;
        /**
         * Register listens for video playback buffering events.
         * @param { 'bufferingUpdate' } type - Type of the playback buffering update event to listen for.
         * @param { function } callback - Callback used to listen for the buffering update event,
           * return BufferingInfoType and the value.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Register listens for video playback buffering events.
         * @param { 'bufferingUpdate' } type - Type of the playback buffering update event to listen for.
         * @param { OnBufferingUpdateHandler } callback - Callback used to listen for the buffering update event,
           * return BufferingInfoType and the value.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(type: 'bufferingUpdate', callback: OnBufferingUpdateHandler): void;
        /**
         * Unregister listens for video playback buffering events.
         * @param { 'bufferingUpdate' } type - Type of the playback buffering update event to listen for.
           * return BufferingInfoType and the value.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Unregister listens for video playback buffering events.
         * @param { 'bufferingUpdate' } type - Type of the playback buffering update event to listen for.
         * @param { OnBufferingUpdateHandler } callback - Callback used to listen for the buffering update event,
           * return BufferingInfoType and the value.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        off(type: 'bufferingUpdate', callback?: OnBufferingUpdateHandler): void;
        /**
         * Register listens for start render video frame events.
         * @param { 'startRenderFrame' } type - Type of the playback event to listen for.
         * @param { Callback<void> } callback - Callback used to listen for the playback event return .
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Register listens for start render video frame events.
         * @param { 'startRenderFrame' } type - Type of the playback event to listen for.
         * @param { Callback<void> } callback - Callback used to listen for the playback event return .
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        on(type: 'startRenderFrame', callback: Callback<void>): void;
        /**
         * Unregister listens for start render video frame events.
         * @param { 'startRenderFrame' } type - Type of the playback event to listen for.
         * @param { Callback<void> } callback - Callback used to listen for the playback event return .
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        off(type: 'startRenderFrame', callback?: Callback<void>): void;
        /**
         * Register listens for video size change event.
         * @param { 'videoSizeChange' } type - Type of the playback event to listen for.
         * @param { function } callback - Callback used to listen for the playback event return video size.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Register listens for video size change event.
         * @param { 'videoSizeChange' } type - Type of the playback event to listen for.
         * @param { OnVideoSizeChangeHandler } callback - Callback used to listen for the playback event return video size.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(type: 'videoSizeChange', callback: OnVideoSizeChangeHandler): void;
        /**
         * Unregister listens for video size change event.
         * @param { 'videoSizeChange' } type - Type of the playback event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Unregister listens for video size change event.
         * @param { 'videoSizeChange' } type - Type of the playback event to listen for.
         * @param { OnVideoSizeChangeHandler } callback - Callback used to listen for the playback event return video size.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        off(type: 'videoSizeChange', callback?: OnVideoSizeChangeHandler): void;
        /**
         * Register listens for audio interrupt event, refer to {@link #audio.InterruptEvent}
         * @param { 'audioInterrupt' } type - Type of the playback event to listen for.
         * @param { function } callback - Callback used to listen for the playback event return audio interrupt info.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Register listens for audio interrupt event, refer to {@link #audio.InterruptEvent}
         * @param { 'audioInterrupt' } type - Type of the playback event to listen for.
         * @param { Callback<audio.InterruptEvent> } callback - Callback used to listen for the playback event return audio interrupt info.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(type: 'audioInterrupt', callback: Callback<audio.InterruptEvent>): void;
        /**
         * Unregister listens for audio interrupt event, refer to {@link #audio.InterruptEvent}
         * @param { 'audioInterrupt' } type - Type of the playback event to listen for.
         * @param { Callback<audio.InterruptEvent> } callback - Callback used to listen for the playback event return audio interrupt info.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 9
         */
        off(type: 'audioInterrupt', callback?: Callback<audio.InterruptEvent>): void;
        /**
         * Register listens for available bitrate list collect completed events for HLS protocol stream playback.
         * This event will be reported after the {@link #prepare} called.
         * @param { 'availableBitrates' } type - Type of the playback event to listen for.
         * @param { function } callback - Callback used to listen for the playback event return available bitrate list.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Register listens for available bitrate list collect completed events for HLS protocol stream playback.
         * This event will be reported after the {@link #prepare} called.
         * @param { 'availableBitrates' } type - Type of the playback event to listen for.
         * @param { Callback<Array<number>> } callback - Callback used to listen for the playback event return available bitrate list.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(type: 'availableBitrates', callback: Callback<Array<number>>): void;
        /**
         * Unregister listens for available bitrate list collect completed events for HLS protocol stream playback.
         * This event will be reported after the {@link #prepare} called.
         * @param { 'availableBitrates' } type - Type of the playback event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Unregister listens for available bitrate list collect completed events for HLS protocol stream playback.
         * This event will be reported after the {@link #prepare} called.
         * @param { 'availableBitrates' } type - Type of the playback event to listen for.
         * @param { Callback<Array<number>> } callback - Callback used to listen for the playback event return available bitrate list.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        off(type: 'availableBitrates', callback?: Callback<Array<number>>): void;
        /**
         * Register listens for playback error events.
         * @param { 'error' } type - Type of the playback error event to listen for.
         * @param { ErrorCallback } callback - Callback used to listen for the playback error event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 5400101 - No memory.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400103 - I/O error.
         * @throws { BusinessError } 5400104 - Time out.
         * @throws { BusinessError } 5400105 - Service died.
         * @throws { BusinessError } 5400106 - Unsupport format.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Register listens for playback error events.
         * @param { 'error' } type - Type of the playback error event to listen for.
         * @param { ErrorCallback } callback - Callback used to listen for the playback error event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 5400101 - No memory.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400103 - I/O error.
         * @throws { BusinessError } 5400104 - Time out.
         * @throws { BusinessError } 5400105 - Service died.
         * @throws { BusinessError } 5400106 - Unsupport format.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Register listens for playback error events.
         * @param { 'error' } type - Type of the playback error event to listen for.
         * @param { ErrorCallback } callback - Callback used to listen for the playback error event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 5400101 - No memory.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400103 - I/O error.
         * @throws { BusinessError } 5400104 - Time out.
         * @throws { BusinessError } 5400105 - Service died.
         * @throws { BusinessError } 5400106 - Unsupport format.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(type: 'error', callback: ErrorCallback): void;
        /**
         * Unregister listens for playback error events.
         * @param { 'error' } type - Type of the playback error event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 9
         */
        /**
         * Unregister listens for playback error events.
         * @param { 'error' } type - Type of the playback error event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Unregister listens for playback error events.
         * @param { 'error' } type - Type of the playback error event to listen for.
         * @param { ErrorCallback } callback - Callback used to listen for the playback error event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        off(type: 'error', callback?: ErrorCallback): void;
        /**
         * Subscribes output device change event callback.
         * The event is triggered when output device change for this stream.
         * @param { 'audioOutputDeviceChangeWithInfo' } type - Type of the event to listen for.
         * @param { Callback<audio.AudioStreamDeviceChangeInfo> } callback - Callback used to listen device change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 11
         */
        /**
         * Subscribes output device change event callback.
         * The event is triggered when output device change for this stream.
         * @param { 'audioOutputDeviceChangeWithInfo' } type - Type of the event to listen for.
         * @param { Callback<audio.AudioStreamDeviceChangeInfo> } callback - Callback used to listen device change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        on(type: 'audioOutputDeviceChangeWithInfo', callback: Callback<audio.AudioStreamDeviceChangeInfo>): void;
        /**
         * Unsubscribes output device change event callback.
         * @param { 'audioOutputDeviceChangeWithInfo' } type - Type of the event to listen for.
         * @param { Callback<audio.AudioStreamDeviceChangeInfo> } callback - Callback used to listen device change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 11
         */
        /**
         * Unsubscribes output device change event callback.
         * @param { 'audioOutputDeviceChangeWithInfo' } type - Type of the event to listen for.
         * @param { Callback<audio.AudioStreamDeviceChangeInfo> } callback - Callback used to listen device change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        off(type: 'audioOutputDeviceChangeWithInfo', callback?: Callback<audio.AudioStreamDeviceChangeInfo>): void;
        /**
         * Subscribes listener for subtitle update event.
         * @param { 'subtitleUpdate' } type - Type of the event to listen for.
         * @param { Callback<SubtitleInfo> } callback - Callback used to listen subtitle update event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        on(type: 'subtitleUpdate', callback: Callback<SubtitleInfo>): void;
        /**
         * Unsubscribes listener for subtitle update event.
         * @param { 'subtitleUpdate' } type - Type of the event to listen for.
         * @param { Callback<SubtitleInfo> } callback - Callback used to listen subtitle update event.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 12
         */
        off(type: 'subtitleUpdate', callback?: Callback<SubtitleInfo>): void;
    }
    /**
     * Enumerates ErrorCode types, return in BusinessError::code
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @since 8
     * @deprecated since 11
     * @useinstead ohos.multimedia.media/media.AVErrorCode
     */
    enum MediaErrorCode {
        /**
         * operation success.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.media/media.AVErrorCode#AVERR_OK
         */
        MSERR_OK = 0,
        /**
         * malloc or new memory failed. maybe system have no memory.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.media/media.AVErrorCode#AVERR_NO_MEMORY
         */
        MSERR_NO_MEMORY = 1,
        /**
         * no permission for the operation.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.media/media.AVErrorCode#AVERR_OPERATE_NOT_PERMIT
         */
        MSERR_OPERATION_NOT_PERMIT = 2,
        /**
         * invalid argument.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.media/media.AVErrorCode#AVERR_INVALID_PARAMETER
         */
        MSERR_INVALID_VAL = 3,
        /**
         * an I/O error occurred.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.media/media.AVErrorCode#AVERR_IO
         */
        MSERR_IO = 4,
        /**
         * operation time out.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.media/media.AVErrorCode#AVERR_TIMEOUT
         */
        MSERR_TIMEOUT = 5,
        /**
         * unknown error.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.media/media.AVErrorCode#AVERR_INVALID_PARAMETER
         */
        MSERR_UNKNOWN = 6,
        /**
         * media service died.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.media/media.AVErrorCode#AVERR_SERVICE_DIED
         */
        MSERR_SERVICE_DIED = 7,
        /**
         * operation is not permit in current state.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.media/media.AVErrorCode#AVERR_INVALID_PARAMETER
         */
        MSERR_INVALID_STATE = 8,
        /**
         * operation is not supported in current version.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.media/media.AVErrorCode#AVERR_UNSUPPORT_CAPABILITY
         */
        MSERR_UNSUPPORTED = 9
    }
    /**
     * Enumerates buffering info type, for network playback.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @since 8
     */
    /**
     * Enumerates buffering info type, for network playback.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum BufferingInfoType {
        /**
         * begin to buffering
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * begin to buffering
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        BUFFERING_START = 1,
        /**
         * end to buffering
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * end to buffering
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        BUFFERING_END = 2,
        /**
         * buffering percent
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * buffering percent
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        BUFFERING_PERCENT = 3,
        /**
         * cached duration in milliseconds
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * cached duration in milliseconds
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        CACHED_DURATION = 4
    }
    /**
     * Media source descriptor. User can set media data information
  
     * @typedef MediaSource
     * @syscap SystemCapability.Multimedia.Media.Core
     * @atomicservice
     * @since 12
     */
    interface MediaSource {
        /**
         * Set Media Mime Type to help player handle extended Media source.
         * @param { AVMimeTypes } mimeType - for MediaSource define. see @ AVMimeTypes.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 12
         */
        setMimeType(mimeType: AVMimeTypes): void;
    }
    /**
     * Enumerates Media Mime types, used for MediaSource define;
     * @enum { string }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @atomicservice
     * @since 12
     */
    enum AVMimeTypes {
        /**
         * Indicate current file is index file for hls Media.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 12
         */
        APPLICATION_M3U8 = 'application/m3u8'
    }
    /**
     * Provides preferred playback settings for player.
     *
     * @typedef PlaybackStrategy
     * @syscap SystemCapability.Multimedia.Media.Core
     * @atomicservice
     * @since 12
     */
    interface PlaybackStrategy {
        /**
         * Choose a stream with width close to it.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 12
         */
        preferredWidth?: number;
        /**
         * Choose a stream with height close to it.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 12
         */
        preferredHeight?: number;
        /**
         * Choose a preferred buffer duration.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 12
         */
        preferredBufferDuration?: number;
        /**
         * If true, the player should choose HDR stream if exist.
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 12
         */
        preferredHdr?: boolean;
    }
    /**
     * Media file descriptor. The caller needs to ensure that the fd is valid and
     * the offset and length are correct.
     *
     * @typedef AVFileDescriptor
     * @syscap SystemCapability.Multimedia.Media.Core
     * @since 9
     */
    /**
     * Media file descriptor. The caller needs to ensure that the fd is valid and
     * the offset and length are correct.
     *
     * @typedef AVFileDescriptor
     * @syscap SystemCapability.Multimedia.Media.Core
     * @atomicservice
     * @since 11
     */
    /**
     * Media file descriptor. The caller needs to ensure that the fd is valid and
     * the offset and length are correct.
     *
     * @typedef AVFileDescriptor
     * @syscap SystemCapability.Multimedia.Media.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface AVFileDescriptor {
        /**
         * The file descriptor of audio or video source from file system. The caller
         * is responsible to close the file descriptor.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 9
         */
        /**
         * The file descriptor of audio or video source from file system. The caller
         * is responsible to close the file descriptor.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        /**
         * The file descriptor of audio or video source from file system. The caller
         * is responsible to close the file descriptor.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        fd: number;
        /**
         * The offset into the file where the data to be read, in bytes. By default,
         * the offset is zero.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 9
         */
        /**
         * The offset into the file where the data to be read, in bytes. By default,
         * the offset is zero.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        /**
         * The offset into the file where the data to be read, in bytes. By default,
         * the offset is zero.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        offset?: number;
        /**
         * The length in bytes of the data to be read. By default, the length is the
         * rest of bytes in the file from the offset.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 9
         */
        /**
         * The length in bytes of the data to be read. By default, the length is the
         * rest of bytes in the file from the offset.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        /**
         * The length in bytes of the data to be read. By default, the length is the
         * rest of bytes in the file from the offset.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        length?: number;
    }
    /**
      * DataSource descriptor. The caller needs to ensure that the fileSize and
      * callback is valid.
      *
      * @typedef AVDataSrcDescriptor
      * @syscap SystemCapability.Multimedia.Media.AVPlayer
      * @since 10
      */
    /**
     * DataSource descriptor. The caller needs to ensure that the fileSize and
     * callback is valid.
     *
     * @typedef AVDataSrcDescriptor
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @atomicservice
     * @since 11
     */
    /**
     * DataSource descriptor. The caller needs to ensure that the fileSize and
     * callback is valid.
     *
     * @typedef AVDataSrcDescriptor
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface AVDataSrcDescriptor {
        /**
         * Size of the file, -1 means the file size is unknown, in this case,
         * seek and setSpeed can't be executed, loop can't be set, and can't replay.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 10
         */
        /**
         * Size of the file, -1 means the file size is unknown, in this case,
         * seek and setSpeed can't be executed, loop can't be set, and can't replay.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Size of the file, -1 means the file size is unknown, in this case,
         * seek and setSpeed can't be executed, loop can't be set, and can't replay.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        fileSize: number;
        /**
         * Callback function implemented by users, which is used to fill data.
         * buffer - The buffer need to fill.
         * length - The stream length player want to get.
         * pos - The stream position player want get start, and is an optional parameter.
         * When fileSize set to -1, this parameter is not used.
         * Returns length of the data to be filled.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @since 10
         */
        /**
         * Callback function implemented by users, which is used to fill data.
         * buffer - The buffer need to fill.
         * length - The stream length player want to get.
         * pos - The stream position player want get start, and is an optional parameter.
         * When fileSize set to -1, this parameter is not used.
         * Returns length of the data to be filled.
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @atomicservice
         * @since 11
         */
        /**
         * Callback function implemented by users, which is used to fill data.
         * buffer - The buffer need to fill.
         * length - The stream length player want to get.
         * pos - The stream position player want get start, and is an optional parameter.
         * When fileSize set to -1, this parameter is not used.
         * Returns length of the data to be filled.
         * @type { function }
         * @syscap SystemCapability.Multimedia.Media.AVPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        callback: (buffer: ArrayBuffer, length: number, pos?: number) => number;
    }
    /**
     * Provides subtitle information.
     * Can be synchronized to the time reported by AVPlayer#timeUpdate event
     *
     * @typedef SubtitleInfo
     * @syscap SystemCapability.Multimedia.Media.Core
     * @atomicservice
     * @since 12
     */
    interface SubtitleInfo {
        /**
         * Duration of the text to be displayed, as milliseconds.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 12
         */
        duration?: number;
        /**
         * Display start time of the text, as milliseconds.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 12
         */
        startTime?: number;
        /**
         * Text information of current update event.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 12
         */
        text?: string;
    }
    /**
     * Describes audio playback states.
     * @typedef { 'idle' | 'playing' | 'paused' | 'stopped' | 'error' }
     * @syscap SystemCapability.Multimedia.Media.AudioPlayer
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.multimedia.media/media.AVPlayerState
     */
    type AudioState = 'idle' | 'playing' | 'paused' | 'stopped' | 'error';
    /**
     * Manages and plays audio. Before calling an AudioPlayer method, you must use createAudioPlayer()
     * to create an AudioPlayer instance.
     *
     * @typedef AudioPlayer
     * @syscap SystemCapability.Multimedia.Media.AudioPlayer
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.multimedia.media/media.AVPlayer
     */
    interface AudioPlayer {
        /**
         * Starts audio playback.
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#play
         */
        play(): void;
        /**
         * Pauses audio playback.
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#pause
         */
        pause(): void;
        /**
         * Stops audio playback.
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#stop
         */
        stop(): void;
        /**
         * Resets audio playback.
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#reset
         */
        reset(): void;
        /**
         * Jumps to the specified playback position.
         * @param { number } timeMs - Playback position to jump
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#seek
         */
        seek(timeMs: number): void;
        /**
         * Sets the volume.
         * @param { number } vol - Relative volume. The value ranges from 0.00 to 1.00. The value 1 indicates the maximum volume (100%).
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#setVolume
         */
        setVolume(vol: number): void;
        /**
         * Releases resources used for audio playback.
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#release
         */
        release(): void;
        /**
         * Get all track infos in MediaDescription, should be called after data loaded callback.
         * @param { AsyncCallback<Array<MediaDescription>> } callback - async callback return track info in MediaDescription.
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#getTrackDescription
         */
        getTrackDescription(callback: AsyncCallback<Array<MediaDescription>>): void;
        /**
         * Get all track infos in MediaDescription, should be called after data loaded callback.
         * @returns { Promise<Array<MediaDescription>> } A Promise instance used to return the track info in MediaDescription.
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#getTrackDescription
         */
        getTrackDescription(): Promise<Array<MediaDescription>>;
        /**
         * Listens for audio playback buffering events.
         * @param { 'bufferingUpdate' } type - Type of the playback buffering update event to listen for.
         * @param { function } callback - Callback used to listen for the buffering update event,
         * return BufferingInfoType and the value.
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#event:bufferingUpdate
         */
        on(type: 'bufferingUpdate', callback: (infoType: BufferingInfoType, value: number) => void): void;
        /**
         * Audio media URI. Mainstream audio formats are supported.
         * local:fd://XXX, file://XXX. network:http://xxx
         * @type { string }
         * @permission ohos.permission.READ_MEDIA or ohos.permission.INTERNET
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#url
         */
        src: string;
        /**
         * Audio file descriptor. Mainstream audio formats are supported.
         * @type { AVFileDescriptor }
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 9
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#fdSrc
         */
        fdSrc: AVFileDescriptor;
        /**
         * Whether to loop audio playback. The value true means to loop playback.
         * @type { boolean }
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#loop
         */
        loop: boolean;
        /**
         * Describes audio interrupt mode, refer to {@link #audio.InterruptMode}. If it is not
         * set, the default mode will be used. Set it before calling the {@link #play()} in the
         * first time in order for the interrupt mode to become effective thereafter.
         * @type { ?audio.InterruptMode }
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 9
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#audioInterruptMode
         */
        audioInterruptMode?: audio.InterruptMode;
        /**
         * Current playback position.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#currentTime
         */
        readonly currentTime: number;
        /**
         * Playback duration, When the data source does not support seek, it returns - 1, such as a live broadcast scenario.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#duration
         */
        readonly duration: number;
        /**
         * Playback state.
         * @type { AudioState }
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#state
         */
        readonly state: AudioState;
        /**
         * Listens for audio playback events.
         * @param { 'play' | 'pause' | 'stop' | 'reset' | 'dataLoad' | 'finish' | 'volumeChange' } type - Type of the playback event to listen for.
         * @param { function } callback - Callback used to listen for the playback event.
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#event:stateChange
         */
        on(type: 'play' | 'pause' | 'stop' | 'reset' | 'dataLoad' | 'finish' | 'volumeChange', callback: () => void): void;
        /**
         * Listens for audio playback events.
         * @param { 'timeUpdate' } type - Type of the playback event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback event.
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#event:timeUpdate
         */
        on(type: 'timeUpdate', callback: Callback<number>): void;
        /**
         * Listens for audio interrupt event, refer to {@link #audio.InterruptEvent}
         * @param { 'audioInterrupt' } type - Type of the playback event to listen for.
         * @param { function } callback - Callback used to listen for the playback event return audio interrupt info.
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 9
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#event:audioInterrupt
         */
        on(type: 'audioInterrupt', callback: (info: audio.InterruptEvent) => void): void;
        /**
         * Listens for playback error events.
         * @param { 'error' } type - Type of the playback error event to listen for.
         * @param { ErrorCallback } callback - Callback used to listen for the playback error event.
         * @syscap SystemCapability.Multimedia.Media.AudioPlayer
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#event:error
         */
        on(type: 'error', callback: ErrorCallback): void;
    }
    /**
    * Describes media recorder states.
    * @typedef {'idle' | 'prepared' | 'started' | 'paused' | 'stopped' | 'released' | 'error'}
    * @syscap SystemCapability.Multimedia.Media.AVRecorder
    * @since 9
    */
    /**
    * Describes media recorder states.
    * @typedef {'idle' | 'prepared' | 'started' | 'paused' | 'stopped' | 'released' | 'error'}
    * @syscap SystemCapability.Multimedia.Media.AVRecorder
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    type AVRecorderState = 'idle' | 'prepared' | 'started' | 'paused' | 'stopped' | 'released' | 'error';
    /**
     * Defines the onMove callback.
     *
     * @typedef { function } OnAVRecorderStateChangeHandler
     * @param { AVRecorderState } state - state value for AVRecorder.
     * @param { StateChangeReason } reason - reason for state change.
     * @syscap SystemCapability.Multimedia.Media.AVPlayer
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    type OnAVRecorderStateChangeHandler = (state: AVRecorderState, reason: StateChangeReason) => void;
    /**
     * Manages and record audio/video. Before calling an AVRecorder method, you must use createAVRecorder()
     * to create an AVRecorder instance.
     *
     * @typedef AVRecorder
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @since 9
     */
    /**
     * Manages and record audio/video. Before calling an AVRecorder method, you must use createAVRecorder()
     * to create an AVRecorder instance.
     *
     * @typedef AVRecorder
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface AVRecorder {
        /**
         * Prepares for recording.
         * @permission ohos.permission.MICROPHONE
         * @param { AVRecorderConfig } config - Recording parameters.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when prepare completed.
         * @throws { BusinessError } 201 - Permission denied. Return by callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Prepares for recording.
         * @permission ohos.permission.MICROPHONE
         * @param { AVRecorderConfig } config - Recording parameters.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when prepare completed.
         * @throws { BusinessError } 201 - Permission denied. Return by callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        prepare(config: AVRecorderConfig, callback: AsyncCallback<void>): void;
        /**
         * Prepares for recording.
         * @permission ohos.permission.MICROPHONE
         * @param { AVRecorderConfig } config - Recording parameters.
         * @returns { Promise<void> } A Promise instance used to return when prepare completed.
         * @throws { BusinessError } 201 - Permission denied. Return by promise.
         * @throws { BusinessError } 401 - The parameter check failed. Return by promise.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Prepares for recording.
         * @permission ohos.permission.MICROPHONE
         * @param { AVRecorderConfig } config - Recording parameters.
         * @returns { Promise<void> } A Promise instance used to return when prepare completed.
         * @throws { BusinessError } 201 - Permission denied. Return by promise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        prepare(config: AVRecorderConfig): Promise<void>;
        /**
         * Get AVRecorderConfig.it must be called after prepare.
         * @param { AsyncCallback<AVRecorderConfig> } callback - Callback used to return the input config in AVRecorderConfig.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by callback.
         * @throws { BusinessError } 5400103 - IO error. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        getAVRecorderConfig(callback: AsyncCallback<AVRecorderConfig>): void;
        /**
         * Get AVRecorderConfig.it must be called after prepare.
         * @returns { Promise<AVRecorderConfig> } A Promise instance used to return the input config in AVRecorderConfig.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by promise.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        getAVRecorderConfig(): Promise<AVRecorderConfig>;
        /**
         * Get input surface.it must be called between prepare completed and start.
         * @param { AsyncCallback<string> } callback - Callback used to return the input surface id in string.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by callback.
         * @throws { BusinessError } 5400103 - IO error. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        getInputSurface(callback: AsyncCallback<string>): void;
        /**
         * Get input surface. it must be called between prepare completed and start.
         * @returns { Promise<string> } A Promise instance used to return the input surface id in string.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by promise.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        getInputSurface(): Promise<string>;
        /**
         * Update the video orientation before recorder start.
         * @param { number } rotation: Rotation angle, should be [0, 90, 180, 270].
         * @returns { Promise<void> } A Promise instance used to return when the function is finished.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 12
         */
        updateRotation(rotation: number): Promise<void>;
        /**
         * Start AVRecorder, it will to started state.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when start completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by callback.
         * @throws { BusinessError } 5400103 - IO error. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Start AVRecorder, it will to started state.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when start completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by callback.
         * @throws { BusinessError } 5400103 - IO error. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        start(callback: AsyncCallback<void>): void;
        /**
         * Start AVRecorder, it will to started state.
         * @returns { Promise<void> } A Promise instance used to return when start completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by promise.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Start AVRecorder, it will to started state.
         * @returns { Promise<void> } A Promise instance used to return when start completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by promise.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        start(): Promise<void>;
        /**
         * Start AVRecorder, it will to paused state.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when pause completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by callback.
         * @throws { BusinessError } 5400103 - IO error. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Start AVRecorder, it will to paused state.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when pause completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by callback.
         * @throws { BusinessError } 5400103 - IO error. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        pause(callback: AsyncCallback<void>): void;
        /**
         * Start AVRecorder, it will to paused state.
         * @returns { Promise<void> } A Promise instance used to return when pause completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by promise.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Start AVRecorder, it will to paused state.
         * @returns { Promise<void> } A Promise instance used to return when pause completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by promise.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        pause(): Promise<void>;
        /**
         * Resume AVRecorder, it will to started state.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when resume completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by callback.
         * @throws { BusinessError } 5400103 - IO error. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Resume AVRecorder, it will to started state.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when resume completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by callback.
         * @throws { BusinessError } 5400103 - IO error. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        resume(callback: AsyncCallback<void>): void;
        /**
         * Resume AVRecorder, it will to started state.
         * @returns { Promise<void> } A Promise instance used to return when resume completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by promise.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Resume AVRecorder, it will to started state.
         * @returns { Promise<void> } A Promise instance used to return when resume completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by promise.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        resume(): Promise<void>;
        /**
         * Stop AVRecorder, it will to stopped state.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when stop completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by callback.
         * @throws { BusinessError } 5400103 - IO error. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Stop AVRecorder, it will to stopped state.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when stop completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by callback.
         * @throws { BusinessError } 5400103 - IO error. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        stop(callback: AsyncCallback<void>): void;
        /**
         * Stop AVRecorder, it will to stopped state.
         * @returns { Promise<void> } A Promise instance used to return when stop completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by promise.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Stop AVRecorder, it will to stopped state.
         * @returns { Promise<void> } A Promise instance used to return when stop completed.
         * @throws { BusinessError } 5400102 - Operate not permit. Return by promise.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        stop(): Promise<void>;
        /**
         * Reset AVRecorder, it will to idle state.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when reset completed.
         * @throws { BusinessError } 5400103 - IO error. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Reset AVRecorder, it will to idle state.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when reset completed.
         * @throws { BusinessError } 5400103 - IO error. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        reset(callback: AsyncCallback<void>): void;
        /**
         * Reset AVRecorder, it will to idle state.
         * @returns { Promise<void> } A Promise instance used to return when reset completed.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Reset AVRecorder, it will to idle state.
         * @returns { Promise<void> } A Promise instance used to return when reset completed.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        reset(): Promise<void>;
        /**
         * Releases resources used for AVRecorder, it will to released state.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when release completed.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Releases resources used for AVRecorder, it will to released state.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when release completed.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Releases resources used for AVRecorder, it will to released state.
         * @returns { Promise<void> } A Promise instance used to return when release completed.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Releases resources used for AVRecorder, it will to released state.
         * @returns { Promise<void> } A Promise instance used to return when release completed.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        release(): Promise<void>;
        /**
         * Get AudioCapturer info from current AVRecorder.
         * @param { AsyncCallback<audio.AudioCapturerChangeInfo> } callback - A callback used to return AudioCapturerChangeInfo.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400103 - I/O error.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        getCurrentAudioCapturerInfo(callback: AsyncCallback<audio.AudioCapturerChangeInfo>): void;
        /**
         * Get AudioCapturer info from current AVRecorder.
         * @returns { Promise<audio.AudioCapturerChangeInfo> } A Promise instance used to return AudioCapturerChangeInfo.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400103 - I/O error.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        getCurrentAudioCapturerInfo(): Promise<audio.AudioCapturerChangeInfo>;
        /**
         * Get max audio capturer amplitude from current AVRecorder.
         * @param { AsyncCallback<number> } callback - A callback used to return max Amplitude.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        getAudioCapturerMaxAmplitude(callback: AsyncCallback<number>): void;
        /**
         * Get max audio capturer amplitude from current AVRecorder.
         * @returns { Promise<number> } A Promise instance used to return max Amplitude.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        getAudioCapturerMaxAmplitude(): Promise<number>;
        /**
         * Get available encoder and encoder info for AVRecorder.
         * @param { AsyncCallback<Array<EncoderInfo>> } callback - A callback used to return available encoder info.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        getAvailableEncoder(callback: AsyncCallback<Array<EncoderInfo>>): void;
        /**
         * Get available encoder and encoder info for AVRecorder.
         * @returns { Promise<Array<EncoderInfo>> } A Promise instance used to return available encoder info.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        getAvailableEncoder(): Promise<Array<EncoderInfo>>;
        /**
         * Recorder state.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Recorder state.
         * @type { AVRecorderState }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly state: AVRecorderState;
        /**
         * Listens for recording audioCapturerChange events.
         * @param { 'audioCapturerChange' } type - Type of the audioCapturerChange event to listen for.
         * @param { Callback<audio.AudioCapturerChangeInfo> } callback - Callback used to listen device change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        on(type: 'audioCapturerChange', callback: Callback<audio.AudioCapturerChangeInfo>): void;
        /**
         * Listens for recording stateChange events.
         * @param { 'stateChange' } type - Type of the recording event to listen for.
         * @param { function } callback - Callback used to listen for the recorder stateChange event.
         * @throws { BusinessError } 5400103 - IO error. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Listens for recording stateChange events.
         * @param { 'stateChange' } type - Type of the recording event to listen for.
         * @param { OnAVRecorderStateChangeHandler } callback - Callback used to listen for the recorder stateChange event.
         * @throws { BusinessError } 5400103 - IO error. Return by callback.
         * @throws { BusinessError } 5400105 - Service died. Return by callback.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(type: 'stateChange', callback: OnAVRecorderStateChangeHandler): void;
        /**
         * Listens for recording error events.
         * @param { 'error' } type - Type of the recording error event to listen for.
         * @param { ErrorCallback } callback - Callback used to listen for the recorder error event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 5400101 - No memory.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400103 - I/O error.
         * @throws { BusinessError } 5400104 - Time out.
         * @throws { BusinessError } 5400105 - Service died.
         * @throws { BusinessError } 5400106 - Unsupport format.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Listens for recording error events.
         * @param { 'error' } type - Type of the recording error event to listen for.
         * @param { ErrorCallback } callback - Callback used to listen for the recorder error event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 5400101 - No memory.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400103 - I/O error.
         * @throws { BusinessError } 5400104 - Time out.
         * @throws { BusinessError } 5400105 - Service died.
         * @throws { BusinessError } 5400106 - Unsupport format.
         * @throws { BusinessError } 5400107 - Audio interrupted.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        /**
         * Listens for recording error events.
         * @param { 'error' } type - Type of the recording error event to listen for.
         * @param { ErrorCallback } callback - Callback used to listen for the recorder error event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 5400101 - No memory.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400103 - I/O error.
         * @throws { BusinessError } 5400104 - Time out.
         * @throws { BusinessError } 5400105 - Service died.
         * @throws { BusinessError } 5400106 - Unsupport format.
         * @throws { BusinessError } 5400107 - Audio interrupted.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(type: 'error', callback: ErrorCallback): void;
        /**
         * Cancel Listens for recording stateChange events.
         * @param { 'stateChange' } type - Type of the recording stateChange event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Cancel Listens for recording stateChange events.
         * @param { 'stateChange' } type - Type of the recording stateChange event to listen for.
         * @param { OnAVRecorderStateChangeHandler } callback - Callback used to listen for the recorder stateChange event.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        off(type: 'stateChange', callback?: OnAVRecorderStateChangeHandler): void;
        /**
         * Cancel Listens for recording error events.
         * @param { 'error' } type - Type of the recording error event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Cancel Listens for recording error events.
         * @param { 'error' } type - Type of the recording error event to listen for.
         * @param { ErrorCallback } callback - Callback used to listen for the recorder error event.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        off(type: 'error', callback?: ErrorCallback): void;
        /**
         * Cancel Listens for recording audioCapturerChange events.
         * @param { 'audioCapturerChange' } type - Type of the audioCapturerChange event to listen for.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        /**
         * Cancel Listens for recording audioCapturerChange events.
         * @param { 'audioCapturerChange' } type - Type of the audioCapturerChange event to listen for.
         * @param { Callback<audio.AudioCapturerChangeInfo> } callback - Callback used to listen device change event.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 12
         */
        off(type: 'audioCapturerChange', callback?: Callback<audio.AudioCapturerChangeInfo>): void;
    }
    /**
     * Enumerates audio encoding formats, it will be deprecated after API8, use @CodecMimeType to replace.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.AudioRecorder
     * @since 6
     * @deprecated since 8
     * @useinstead ohos.multimedia.media/media.CodecMimeType
     */
    enum AudioEncoder {
        /**
         * Default audio encoding format, which is AMR-NB.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 8
         */
        DEFAULT = 0,
        /**
         * Indicates the AMR-NB audio encoding format.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 8
         */
        AMR_NB = 1,
        /**
         * Indicates the AMR-WB audio encoding format.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 8
         */
        AMR_WB = 2,
        /**
         * Advanced Audio Coding Low Complexity (AAC-LC).
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 8
         */
        AAC_LC = 3,
        /**
         * High-Efficiency Advanced Audio Coding (HE-AAC).
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 8
         */
        HE_AAC = 4
    }
    /**
     * Enumerates audio output formats, it will be deprecated after API8, use @ContainerFormatType to replace.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.AudioRecorder
     * @since 6
     * @deprecated since 8
     * @useinstead ohos.multimedia.media/media.ContainerFormatType
     */
    enum AudioOutputFormat {
        /**
         * Default audio output format, which is Moving Pictures Expert Group 4 (MPEG-4).
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 8
         */
        DEFAULT = 0,
        /**
         * Indicates the Moving Picture Experts Group-4 (MPEG4) media format.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 8
         */
        MPEG_4 = 2,
        /**
         * Indicates the Adaptive Multi-Rate Narrowband (AMR-NB) media format.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 8
         */
        AMR_NB = 3,
        /**
         * Indicates the Adaptive Multi-Rate Wideband (AMR-WB) media format.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 8
         */
        AMR_WB = 4,
        /**
         * Audio Data Transport Stream (ADTS), a transmission stream format of Advanced Audio Coding (AAC) audio.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 8
         */
        AAC_ADTS = 6
    }
    /**
     * Provides the geographical location definitions for media resources.
     *
     * @typedef Location
     * @syscap SystemCapability.Multimedia.Media.Core
     * @since 6
     */
    /**
     * Provides the geographical location definitions for media resources.
     *
     * @typedef Location
     * @syscap SystemCapability.Multimedia.Media.Core
     * @crossplatform
     * @since 12
     */
    interface Location {
        /**
         * Latitude.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 6
         */
        /**
         * Latitude.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @since 12
         */
        latitude: number;
        /**
         * Longitude.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 6
         */
        /**
         * Longitude.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @since 12
         */
        longitude: number;
    }
    /**
     * Provides the audio recorder configuration definitions.
     *
     * @typedef AudioRecorderConfig
     * @syscap SystemCapability.Multimedia.Media.AudioRecorder
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.multimedia.media/media.AVRecorderConfig
     */
    interface AudioRecorderConfig {
        /**
         * Audio encoding format. The default value is DEFAULT, it will be deprecated after API8.
         * use "audioEncoderMime" instead.
         * @type { ?AudioEncoder }
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 8
         * @useinstead ohos.multimedia.media/media.AudioRecorderConfig.audioEncoderMime
         */
        audioEncoder?: AudioEncoder;
        /**
         * Audio encoding bit rate.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 9
         */
        audioEncodeBitRate?: number;
        /**
         * Audio sampling rate.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 9
         */
        audioSampleRate?: number;
        /**
         * Number of audio channels.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 9
         */
        numberOfChannels?: number;
        /**
         * Audio output format. The default value is DEFAULT, it will be deprecated after API8.
         * it will be replaced with "fileFormat".
         * @type { ?AudioOutputFormat }
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 8
         * @useinstead ohos.multimedia.media/media.AudioRecorderConfig.fileFormat
         */
        format?: AudioOutputFormat;
        /**
         * Audio output uri.support two kind of uri now.
         * format like: scheme + "://" + "context".
         * file:  file://path
         * fd:    fd://fd
         * @type { string }
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 9
         */
        uri: string;
        /**
         * Geographical location information.
         * @type { ?Location }
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 9
         */
        location?: Location;
        /**
         * audio encoding format MIME. it used to replace audioEncoder.
         * @type { ?CodecMimeType }
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 8
         * @deprecated since 9
         */
        audioEncoderMime?: CodecMimeType;
        /**
         * output file format. see @ContainerFormatType , it used to replace "format".
         * @type { ?ContainerFormatType }
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 8
         * @deprecated since 9
         */
        fileFormat?: ContainerFormatType;
    }
    /**
     * Manages and record audio. Before calling an AudioRecorder method, you must use createAudioRecorder()
     * to create an AudioRecorder instance.
     *
     * @typedef AudioRecorder
     * @syscap SystemCapability.Multimedia.Media.AudioRecorder
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.multimedia.media/media.AVRecorder
     */
    interface AudioRecorder {
        /**
         * Prepares for recording.
         * @permission ohos.permission.MICROPHONE
         * @param { AudioRecorderConfig } config - Recording parameters.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVRecorder#prepare
         */
        prepare(config: AudioRecorderConfig): void;
        /**
         * Starts audio recording.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVRecorder#start
         */
        start(): void;
        /**
         * Pauses audio recording.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVRecorder#pause
         */
        pause(): void;
        /**
         * Resumes audio recording.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVRecorder#resume
         */
        resume(): void;
        /**
         * Stops audio recording.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVRecorder#stop
         */
        stop(): void;
        /**
         * Releases resources used for audio recording.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVRecorder#release
         */
        release(): void;
        /**
         * Resets audio recording.
         * Before resetting audio recording, you must call stop() to stop recording. After audio recording is reset,
         * you must call prepare() to set the recording configurations for another recording.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVRecorder#reset
         */
        reset(): void;
        /**
         * Listens for audio recording events.
         * @param { 'prepare' | 'start' | 'pause' | 'resume' | 'stop' | 'release' | 'reset' } type - Type of the audio recording event to listen for.
         * @param { function } callback - Callback used to listen for the audio recording event.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVRecorder#on
         */
        on(type: 'prepare' | 'start' | 'pause' | 'resume' | 'stop' | 'release' | 'reset', callback: () => void): void;
        /**
         * Listens for audio recording error events.
         * @param { 'error' } type - Type of the audio recording error event to listen for.
         * @param { ErrorCallback } callback - Callback used to listen for the audio recording error event.
         * @syscap SystemCapability.Multimedia.Media.AudioRecorder
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVRecorder#on
         */
        on(type: 'error', callback: ErrorCallback): void;
    }
    /**
     * Describes video playback states.
     * @typedef { 'idle' | 'prepared' | 'playing' | 'paused' | 'stopped' | 'error' }
     * @syscap SystemCapability.Multimedia.Media.VideoPlayer
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.multimedia.media/media.AVPlayerState
     */
    type VideoPlayState = 'idle' | 'prepared' | 'playing' | 'paused' | 'stopped' | 'error';
    /**
     * Enumerates playback speed.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.VideoPlayer
     * @since 8
     */
    /**
     * Enumerates playback speed.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.VideoPlayer
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum PlaybackSpeed {
        /**
         * playback at 0.75x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         */
        /**
         * playback at 0.75x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        SPEED_FORWARD_0_75_X = 0,
        /**
         * playback at normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         */
        /**
         * playback at normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        SPEED_FORWARD_1_00_X = 1,
        /**
         * playback at 1.25x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         */
        /**
         * playback at 1.25x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        SPEED_FORWARD_1_25_X = 2,
        /**
         * playback at 1.75x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         */
        /**
         * playback at 1.75x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        SPEED_FORWARD_1_75_X = 3,
        /**
         * playback at 2.0x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         */
        /**
         * playback at 2.0x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        SPEED_FORWARD_2_00_X = 4,
        /**
         * playback at 0.5x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 12
         */
        /**
         * playback at 0.5x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @atomicservice
         * @since 12
         */
        SPEED_FORWARD_0_50_X = 5,
        /**
         * playback at 1.5x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 12
         */
        /**
         * playback at 1.5x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @atomicservice
         * @since 12
         */
        SPEED_FORWARD_1_50_X = 6,
        /**
         * playback at 0.25x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 12
         */
        /**
         * playback at 0.25x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @atomicservice
         * @since 12
         */
        SPEED_FORWARD_0_25_X = 8,
        /**
         * playback at 0.125x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 12
         */
        /**
         * playback at 0.125x normal speed
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @atomicservice
         * @since 12
         */
        SPEED_FORWARD_0_125_X = 9
    }
    /**
     * Manages and plays video. Before calling an video method, you must use createVideoPlayer() to create an VideoPlayer
     * instance.
     *
     * @typedef VideoPlayer
     * @syscap SystemCapability.Multimedia.Media.VideoPlayer
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.multimedia.media/media.AVPlayer
     */
    interface VideoPlayer {
        /**
         * Set display surface.
         * @param {string} surfaceId - surface id, video player will use this id get a surface instance.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when release output buffer completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#surfaceId
         */
        setDisplaySurface(surfaceId: string, callback: AsyncCallback<void>): void;
        /**
         * Set display surface.
         * @param {string} surfaceId - surface id, video player will use this id get a surface instance.
         * @returns { Promise<void> } A Promise instance used to return when release output buffer completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#surfaceId
         */
        setDisplaySurface(surfaceId: string): Promise<void>;
        /**
         * Prepare video playback, it will request resource for playing.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when prepare completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#prepare
         */
        prepare(callback: AsyncCallback<void>): void;
        /**
         * Prepare video playback, it will request resource for playing.
         * @returns { Promise<void> } A Promise instance used to return when prepare completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#prepare
         */
        prepare(): Promise<void>;
        /**
         * Starts video playback.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when start completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#play
         */
        play(callback: AsyncCallback<void>): void;
        /**
         * Starts video playback.
         * @returns { Promise<void> } A Promise instance used to return when start completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#play
         */
        play(): Promise<void>;
        /**
         * Pauses video playback.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when pause completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#pause
         */
        pause(callback: AsyncCallback<void>): void;
        /**
         * Pauses video playback.
         * @returns { Promise<void> } A Promise instance used to return when pause completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#pause
         */
        pause(): Promise<void>;
        /**
         * Stops video playback.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when stop completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#stop
         */
        stop(callback: AsyncCallback<void>): void;
        /**
         * Stops video playback.
         * @returns { Promise<void> } A Promise instance used to return when stop completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#stop
         */
        stop(): Promise<void>;
        /**
         * Resets video playback, it will release the resource.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when reset completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#reset
         */
        reset(callback: AsyncCallback<void>): void;
        /**
         * Resets video playback, it will release the resource.
         * @returns { Promise<void> } A Promise instance used to return when reset completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#reset
         */
        reset(): Promise<void>;
        /**
         * Jumps to the specified playback position by default SeekMode(SEEK_PREV_SYNC),
         * the performance may be not the best.
         * @param { number } timeMs - Playback position to jump
         * @param { AsyncCallback<number> } callback - A callback instance used to return when seek completed
         * and return the seeking position result.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#seek
         */
        seek(timeMs: number, callback: AsyncCallback<number>): void;
        /**
         * Jumps to the specified playback position.
         * @param { number } timeMs - Playback position to jump
         * @param { SeekMode } mode - seek mode, see @SeekMode .
         * @param { AsyncCallback<number> } callback - A callback instance used to return when seek completed
         * and return the seeking position result.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#seek
         */
        seek(timeMs: number, mode: SeekMode, callback: AsyncCallback<number>): void;
        /**
         * Jumps to the specified playback position.
         * @param { number } timeMs - Playback position to jump
         * @param { SeekMode } mode - seek mode, see @SeekMode .
         * @returns { Promise<number> } A Promise instance used to return when seek completed
         * and return the seeking position result.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#seek
         */
        seek(timeMs: number, mode?: SeekMode): Promise<number>;
        /**
         * Sets the volume.
         * @param { number } vol - Relative volume. The value ranges from 0.00 to 1.00. The value 1 indicates the maximum volume (100%).
         * @param { AsyncCallback<void> } callback - A callback instance used to return when set volume completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#setVolume
         */
        setVolume(vol: number, callback: AsyncCallback<void>): void;
        /**
         * Sets the volume.
         * @param { number } vol - Relative volume. The value ranges from 0.00 to 1.00. The value 1 indicates the maximum volume (100%).
         * @returns { Promise<void> } A Promise instance used to return when set volume completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#setVolume
         */
        setVolume(vol: number): Promise<void>;
        /**
         * Releases resources used for video playback.
         * @param { AsyncCallback<void> } callback - A callback instance used to return when release completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#release
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Releases resources used for video playback.
         * @returns { Promise<void> } A Promise instance used to return when release completed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#release
         */
        release(): Promise<void>;
        /**
         * Get all track infos in MediaDescription, should be called after data loaded callback.
         * @param { AsyncCallback<Array<MediaDescription>> } callback - async callback return track info in MediaDescription.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#getTrackDescription
         */
        getTrackDescription(callback: AsyncCallback<Array<MediaDescription>>): void;
        /**
         * Get all track infos in MediaDescription, should be called after data loaded callback.
         * @returns { Promise<Array<MediaDescription>> } A Promise instance used to return the track info in MediaDescription.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#getTrackDescription
         */
        getTrackDescription(): Promise<Array<MediaDescription>>;
        /**
         * media url. Mainstream video formats are supported.
         * local:fd://XXX, file://XXX. network:http://xxx
         * @type { string }
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#url
         */
        url: string;
        /**
         * Video file descriptor. Mainstream video formats are supported.
         * @type { AVFileDescriptor }
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 9
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#fdSrc
         */
        fdSrc: AVFileDescriptor;
        /**
         * Whether to loop video playback. The value true means to loop playback.
         * @type { boolean }
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#loop
         */
        loop: boolean;
        /**
         * Current playback position.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#currentTime
         */
        readonly currentTime: number;
        /**
         * Playback duration, if -1 means cannot seek.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#duration
         */
        readonly duration: number;
        /**
         * Playback state.
         * @type { VideoPlayState }
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#state
         */
        readonly state: VideoPlayState;
        /**
         * video width, valid after prepared.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#width
         */
        readonly width: number;
        /**
         * video height, valid after prepared.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#height
         */
        readonly height: number;
        /**
         * Describes audio interrupt mode, refer to {@link #audio.InterruptMode}. If it is not
         * set, the default mode will be used. Set it before calling the {@link #play()} in the
         * first time in order for the interrupt mode to become effective thereafter.
         * @type { ?audio.InterruptMode }
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 9
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#audioInterruptMode
         */
        audioInterruptMode?: audio.InterruptMode;
        /**
         * video scale type. By default, the {@link #VIDEO_SCALE_TYPE_FIT} will be used, for more
         * information, refer to {@link #VideoScaleType}
         * @type { ?VideoScaleType }
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 9
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#videoScaleType
         */
        videoScaleType?: VideoScaleType;
        /**
         * set payback speed.
         * @param { number } speed - playback speed, see @PlaybackSpeed .
         * @param { AsyncCallback<number> } callback Callback used to return actually speed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#setSpeed
         */
        setSpeed(speed: number, callback: AsyncCallback<number>): void;
        /**
         * set output surface.
         * @param { number } speed - playback speed, see @PlaybackSpeed .
         * @returns { Promise<number> } A Promise instance used to return actually speed.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#setSpeed
         */
        setSpeed(speed: number): Promise<number>;
        /**
         * Listens for video playback completed events.
         * @param { 'playbackCompleted' } type - Type of the playback event to listen for.
         * @param { Callback<void> } callback - Callback used to listen for the playback event return.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#event:stateChange
         */
        on(type: 'playbackCompleted', callback: Callback<void>): void;
        /**
         * Listens for video playback buffering events.
         * @param { 'bufferingUpdate' } type - Type of the playback buffering update event to listen for.
         * @param { function } callback - Callback used to listen for the buffering update event,
         * return BufferingInfoType and the value.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#event:bufferingUpdate
         */
        on(type: 'bufferingUpdate', callback: (infoType: BufferingInfoType, value: number) => void): void;
        /**
         * Listens for start render video frame events.
         * @param { 'startRenderFrame' } type - Type of the playback event to listen for.
         * @param { Callback<void> } callback - Callback used to listen for the playback event return.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#event:startRenderFrame
         */
        on(type: 'startRenderFrame', callback: Callback<void>): void;
        /**
         * Listens for video size changed event.
         * @param { 'videoSizeChanged' } type - Type of the playback event to listen for.
         * @param { function } callback - Callback used to listen for the playback event return video size.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#event:videoSizeChange
         */
        on(type: 'videoSizeChanged', callback: (width: number, height: number) => void): void;
        /**
         * Listens for audio interrupt event, refer to {@link #audio.InterruptEvent}
         * @param { 'audioInterrupt' } type - Type of the playback event to listen for.
         * @param { function } callback - Callback used to listen for the playback event return audio interrupt info.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 9
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#event:audioInterrupt
         */
        on(type: 'audioInterrupt', callback: (info: audio.InterruptEvent) => void): void;
        /**
         * Listens for playback error events.
         * @param { 'error' } type - Type of the playback error event to listen for.
         * @param { ErrorCallback } callback - Callback used to listen for the playback error event.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.multimedia.media/media.AVPlayer#event:error
         */
        on(type: 'error', callback: ErrorCallback): void;
    }
    /**
     * Enumerates video scale type.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.VideoPlayer
     * @since 9
     */
    /**
     * Enumerates video scale type.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.VideoPlayer
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum VideoScaleType {
        /**
         * The content is stretched to the fit the display surface rendering area. When
         * the aspect ratio of the content is not same as the display surface, the aspect
         * of the content is not maintained. This is the default scale type.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 9
         */
        /**
         * The content is stretched to the fit the display surface rendering area. When
         * the aspect ratio of the content is not same as the display surface, the aspect
         * of the content is not maintained. This is the default scale type.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        VIDEO_SCALE_TYPE_FIT = 0,
        /**
         * The content is stretched to the fit the display surface rendering area. When
         * the aspect ratio of the content is not the same as the display surface, content's
         * aspect ratio is maintained and the content is cropped to fit the display surface.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @since 9
         */
        /**
         * The content is stretched to the fit the display surface rendering area. When
         * the aspect ratio of the content is not the same as the display surface, content's
         * aspect ratio is maintained and the content is cropped to fit the display surface.
         * @syscap SystemCapability.Multimedia.Media.VideoPlayer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        VIDEO_SCALE_TYPE_FIT_CROP = 1
    }
    /**
     * Enumerates container format type(The abbreviation for 'container format type' is CFT).
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @since 8
     */
    /**
     * Enumerates container format type(The abbreviation for 'container format type' is CFT).
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum ContainerFormatType {
        /**
         * A video container format type mp4.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * A video container format type mp4.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @since 12
         */
        CFT_MPEG_4 = 'mp4',
        /**
         * A audio container format type m4a.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * A audio container format type m4a.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        CFT_MPEG_4A = 'm4a',
        /**
         * A audio container format type mp3.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 12
         */
        CFT_MP3 = 'mp3'
    }
    /**
     * Enumerates media data type.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @since 8
     */
    /**
     * Enumerates media data type.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @atomicservice
     * @since 11
     */
    enum MediaType {
        /**
         * track is audio.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * track is audio.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        MEDIA_TYPE_AUD = 0,
        /**
         * track is video.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * track is video.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        MEDIA_TYPE_VID = 1,
        /**
         * Track is subtitle.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 12
         */
        MEDIA_TYPE_SUBTITLE = 2
    }
    /**
     * Enumerates media description key.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @since 8
     */
    /**
     * Enumerates media description key.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @atomicservice
     * @since 11
     */
    enum MediaDescriptionKey {
        /**
         * key for track index, value type is number.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * key for track index, value type is number.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        MD_KEY_TRACK_INDEX = 'track_index',
        /**
         * key for track type, value type is number, see @MediaType.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * key for track type, value type is number, see @MediaType.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        MD_KEY_TRACK_TYPE = 'track_type',
        /**
         * key for codec mime type, value type is string.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * key for codec mime type, value type is string.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        MD_KEY_CODEC_MIME = 'codec_mime',
        /**
         * key for duration, value type is number.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * key for duration, value type is number.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        MD_KEY_DURATION = 'duration',
        /**
         * key for bitrate, value type is number.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * key for bitrate, value type is number.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        MD_KEY_BITRATE = 'bitrate',
        /**
         * key for video width, value type is number.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * key for video width, value type is number.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        MD_KEY_WIDTH = 'width',
        /**
         * key for video height, value type is number.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * key for video height, value type is number.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        MD_KEY_HEIGHT = 'height',
        /**
         * key for video frame rate, value type is number.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * key for video frame rate, value type is number.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        MD_KEY_FRAME_RATE = 'frame_rate',
        /**
         * key for audio channel count, value type is number
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * key for audio channel count, value type is number
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        MD_KEY_AUD_CHANNEL_COUNT = 'channel_count',
        /**
         * key for audio sample rate, value type is number
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * key for audio sample rate, value type is number
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        MD_KEY_AUD_SAMPLE_RATE = 'sample_rate',
        /**
         * key for audio bit depth, value type is number
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 12
         */
        MD_KEY_AUD_SAMPLE_DEPTH = 'sample_depth',
        /**
         * Key for language.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 12
         */
        MD_KEY_LANGUAGE = 'language'
    }
    /**
     * Enumerates audio source type for recorder.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @since 9
     */
    /**
     * Enumerates audio source type for recorder.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum AudioSourceType {
        /**
         * Default audio source type.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Default audio source type.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        AUDIO_SOURCE_TYPE_DEFAULT = 0,
        /**
         * Source type mic.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Source type mic.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        AUDIO_SOURCE_TYPE_MIC = 1
    }
    /**
     * Enumerates video source type for recorder.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @since 9
     */
    /**
     * Enumerates video source type for recorder.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @crossplatform
     * @since 12
     */
    enum VideoSourceType {
        /**
         * Surface raw data.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Surface raw data.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        VIDEO_SOURCE_TYPE_SURFACE_YUV = 0,
        /**
         * Surface ES data.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Surface ES data.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        VIDEO_SOURCE_TYPE_SURFACE_ES = 1
    }
    /**
     * Provides encoder info.
     *
     * @typedef EncoderInfo
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @since 11
     */
    interface EncoderInfo {
        /**
         * encoder format MIME
         * @type { CodecMimeType }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        mimeType: CodecMimeType;
        /**
         * encoder type, audio or video
         * @type { string }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        type: string;
        /**
         * audio or video encoder bitRate range
         * @type { ?Range }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        bitRate?: Range;
        /**
         * video encoder frame rate range
         * @type { ?Range }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        frameRate?: Range;
        /**
         * video encoder width range
         * @type { ?Range }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        width?: Range;
        /**
         * video encoder height range
         * @type { ?Range }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        height?: Range;
        /**
         * audio encoder channel range
         * @type { ?Range }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        channels?: Range;
        /**
         * audio encoder sample rate collection
         * @type { ?Array<number> }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        sampleRate?: Array<number>;
    }
    /**
     * Provides Range with lower and upper limit.
     *
     * @typedef Range
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @since 11
     */
    interface Range {
        /**
         * lower limit of the range
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        min: number;
        /**
         * upper limit of the range
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        max: number;
    }
    /**
     * Provides the media recorder profile definitions.
     *
     * @typedef AVRecorderProfile
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @since 9
     */
    /**
     * Provides the media recorder profile definitions.
     *
     * @typedef AVRecorderProfile
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface AVRecorderProfile {
        /**
         * Indicates the audio bitrate.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Indicates the audio bitrate.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        audioBitrate?: number;
        /**
         * Indicates the number of audio channels.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Indicates the number of audio channels.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        audioChannels?: number;
        /**
         * Indicates the audio encoding format.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Indicates the audio encoding format.
         * @type { ?CodecMimeType }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        audioCodec?: CodecMimeType;
        /**
         * Indicates the audio sampling rate.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Indicates the audio sampling rate.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        audioSampleRate?: number;
        /**
         * Indicates the output file format.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Indicates the output file format.
         * @type { ContainerFormatType }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        fileFormat: ContainerFormatType;
        /**
         * Indicates the video bitrate.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Indicates the video bitrate.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        videoBitrate?: number;
        /**
         * Indicates the video encoding format.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Indicates the video encoding format.
         * @type { ?CodecMimeType }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        videoCodec?: CodecMimeType;
        /**
         * Indicates the video width.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Indicates the video width.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        videoFrameWidth?: number;
        /**
         * Indicates the video height.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Indicates the video height.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        videoFrameHeight?: number;
        /**
         * Indicates the video frame rate.
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Indicates the video frame rate.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        videoFrameRate?: number;
        /**
         * Whether to record HDR video.
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 11
         */
        /**
         * Whether to record HDR video.
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        isHdr?: boolean;
        /**
         * Whether to encode the video in temporal scale mode.
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        enableTemporalScale?: boolean;
    }
    /**
     * Provides the media recorder configuration definitions.
     *
     * @typedef AVRecorderConfig
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @since 9
     */
    /**
     * Provides the media recorder configuration definitions.
     *
     * @typedef AVRecorderConfig
     * @syscap SystemCapability.Multimedia.Media.AVRecorder
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface AVRecorderConfig {
        /**
         * Audio source type, details see @AudioSourceType .
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Audio source type, details see @AudioSourceType .
         * @type { ?AudioSourceType }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        audioSourceType?: AudioSourceType;
        /**
         * Video source type, details see @VideoSourceType .
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Video source type, details see @VideoSourceType .
         * @type { ?VideoSourceType }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @since 12
         */
        videoSourceType?: VideoSourceType;
        /**
         * Video recorder profile, details see @AVRecorderProfile .
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * Video recorder profile, details see @AVRecorderProfile .
         * @type { AVRecorderProfile }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        profile: AVRecorderProfile;
        /**
         * File output uri, support a kind of uri now.
         * format like: "fd://" + "context".
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         */
        /**
         * File output uri, support a kind of uri now.
         * format like: "fd://" + "context".
         * @type { string }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        url: string;
        /**
         * Sets the video rotation angle in output file, and for the file to playback, mp4 support
         * the range of rotation angle should be {0, 90, 180, 270}, default is 0.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         * @deprecated since 12
         * @useinstead ohos.multimedia.media/media.AVMetadata#videoOrientation
         */
        rotation?: number;
        /**
         * Geographical location information.
         * @type { ?Location }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 9
         * @deprecated since 12
         * @useinstead ohos.multimedia.media/media.AVMetadata#location
         */
        location?: Location;
        /**
         * Set global metadata info. Details see @AVMetadata
         * @type { ?AVMetadata }
         * @syscap SystemCapability.Multimedia.Media.AVRecorder
         * @since 12
         */
        metadata?: AVMetadata;
    }
    /**
     * Provides the container definition for media description key-value pairs.
     *
     * @typedef MediaDescription
     * @syscap SystemCapability.Multimedia.Media.Core
     * @since 8
     */
    /**
     * Provides the container definition for media description key-value pairs.
     *
     * @typedef MediaDescription
     * @syscap SystemCapability.Multimedia.Media.Core
     * @atomicservice
     * @since 11
     */
    /**
     * Provides the container definition for media description key-value pairs.
     *
     * @typedef MediaDescription
     * @syscap SystemCapability.Multimedia.Media.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface MediaDescription {
        /**
         * key:value pair, key see @MediaDescriptionKey .
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * key:value pair, key see @MediaDescriptionKey .
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        /**
         * key:value pair, key see @MediaDescriptionKey .
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        [key: string]: Object;
    }
    /**
     * Enumerates seek mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @since 8
     */
    /**
     * Enumerates seek mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @atomicservice
     * @since 11
     */
    /**
     * Enumerates seek mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum SeekMode {
        /**
         * seek to the next sync frame of the given timestamp
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * seek to the next sync frame of the given timestamp
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        /**
         * seek to the next sync frame of the given timestamp
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        SEEK_NEXT_SYNC = 0,
        /**
         * seek to the previous sync frame of the given timestamp
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * seek to the previous sync frame of the given timestamp
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 11
         */
        /**
         * seek to the previous sync frame of the given timestamp
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        SEEK_PREV_SYNC = 1,
        /**
         * Seek to the closest frame of the given timestamp.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @atomicservice
         * @since 12
         */
        SEEK_CLOSEST = 2
    }
    /**
     * Enumerates Codec MIME types.
     *
     * @enum { string }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @since 8
     */
    /**
     * Enumerates Codec MIME types.
     *
     * @enum { string }
     * @syscap SystemCapability.Multimedia.Media.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum CodecMimeType {
        /**
         * H.263 codec MIME type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * H.263 codec MIME type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @since 12
         */
        VIDEO_H263 = 'video/h263',
        /**
         * H.264 codec MIME type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * H.264 codec MIME type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @since 12
         */
        VIDEO_AVC = 'video/avc',
        /**
         * MPEG2 codec MIME type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * MPEG2 codec MIME type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @since 12
         */
        VIDEO_MPEG2 = 'video/mpeg2',
        /**
         * MPEG4 codec MIME type
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * MPEG4 codec MIME type
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @since 12
         */
        VIDEO_MPEG4 = 'video/mp4v-es',
        /**
         * VP8 codec MIME type
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * VP8 codec MIME type
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @since 12
         */
        VIDEO_VP8 = 'video/x-vnd.on2.vp8',
        /**
         * AAC codec MIME type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * AAC codec MIME type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        AUDIO_AAC = 'audio/mp4a-latm',
        /**
         * vorbis codec MIME type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * vorbis codec MIME type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @since 12
         */
        AUDIO_VORBIS = 'audio/vorbis',
        /**
         * flac codec MIME type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 8
         */
        /**
         * flac codec MIME type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @since 12
         */
        AUDIO_FLAC = 'audio/flac',
        /**
         * H.265 codec MIME type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 11
         */
        /**
         * H.265 codec MIME type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @crossplatform
         * @since 12
         */
        VIDEO_HEVC = 'video/hevc',
        /**
         * mp3 codec MIME type.
         * @syscap SystemCapability.Multimedia.Media.Core
         * @since 12
         */
        AUDIO_MP3 = 'audio/mpeg'
    }
    /**
     *  Enumerates AVScreenCaptureRecord preset types.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
     * @since 12
     */
    enum AVScreenCaptureRecordPreset {
        /**
         * Screen record normal type, h264/aac mp4
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        SCREEN_RECORD_PRESET_H264_AAC_MP4 = 0,
        /**
         * Screen record high efficient type, h265/aac mp4
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        SCREEN_RECORD_PRESET_H265_AAC_MP4 = 1
    }
    /**
     *  Enumerates AVScreenCapture callback state type.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
     * @since 12
     */
    enum AVScreenCaptureStateCode {
        /**
         * Screen capture started
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        SCREENCAPTURE_STATE_STARTED = 0,
        /**
         * Screen capture canceled
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        SCREENCAPTURE_STATE_CANCELED = 1,
        /**
         * Screen capture stopped by user
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        SCREENCAPTURE_STATE_STOPPED_BY_USER = 2,
        /**
         * Screen capture stopped by interrupt
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        SCREENCAPTURE_STATE_INTERRUPTED_BY_OTHER = 3,
        /**
         * Screen capture stopped by phone call
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        SCREENCAPTURE_STATE_STOPPED_BY_CALL = 4,
        /**
         * Screen capture microphone not available
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        SCREENCAPTURE_STATE_MIC_UNAVAILABLE = 5,
        /**
         * Screen capture microphone is muted by user
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        SCREENCAPTURE_STATE_MIC_MUTED_BY_USER = 6,
        /**
         * Screen capture microphone is unmuted by user
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        SCREENCAPTURE_STATE_MIC_UNMUTED_BY_USER = 7,
        /**
         * Screen capture enter private scene
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        SCREENCAPTURE_STATE_ENTER_PRIVATE_SCENE = 8,
        /**
         * Screen capture exit private scene
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        SCREENCAPTURE_STATE_EXIT_PRIVATE_SCENE = 9
    }
    /**
     * Provides the media AVScreenCaptureRecord config definition.
     *
     * @typedef AVScreenCaptureRecordConfig
     * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
     * @since 12
     */
    interface AVScreenCaptureRecordConfig {
        /**
         * Indicates record file descriptor.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        fd: number;
        /**
         * Indicates video frame width.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        frameWidth?: number;
        /**
         * Indicates video frame height.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        frameHeight?: number;
        /**
         * Indicates video bitrate.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        videoBitrate?: number;
        /**
         * Indicates audio sample rate.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        audioSampleRate?: number;
        /**
         * Indicates audio channel count.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        audioChannelCount?: number;
        /**
         * Indicates audio bitrate.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        audioBitrate?: number;
        /**
         * Indicates AVScreenCaptureRecordPreset, details see @AVScreenCaptureRecordPreset
         * @type { ?AVScreenCaptureRecordPreset }
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        preset?: AVScreenCaptureRecordPreset;
    }
    /**
     * Provides screen capture record. Before calling an AVScreenCaptureRecorder method, you must use createAVScreenCaptureRecorder()
     * to create an AVScreenCaptureRecorder instance.
     *
     * @typedef AVScreenCaptureRecorder
     * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
     * @since 12
     */
    interface AVScreenCaptureRecorder {
        /**
         * Init AVScreenCaptureRecorder.
         * @param { AVScreenCaptureRecordConfig } config - AVScreenCaptureRecorder config.
         * @returns { Promise<void> } A Promise instance used to return when init completed.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed. Return by promise.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        init(config: AVScreenCaptureRecordConfig): Promise<void>;
        /**
         * Start screen capture recording.
         * @returns { Promise<void> } A Promise instance used to return when startRecording completed.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        startRecording(): Promise<void>;
        /**
         * Stop screen capture recording.
         * @returns { Promise<void> } A Promise instance used to return when stopRecording completed.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        stopRecording(): Promise<void>;
        /**
         * Set microphone enable or disable.
         * @param { boolean } enable - Set microphone enable or disable during recording.
         * @returns { Promise<void> } A Promise instance used to return when setMicEnabled completed.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        setMicEnabled(enable: boolean): Promise<void>;
        /**
         * Release screen capture recording.
         * @returns { Promise<void> } A Promise instance used to return when release completed.
         * @throws { BusinessError } 5400103 - IO error. Return by promise.
         * @throws { BusinessError } 5400105 - Service died. Return by promise.
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        release(): Promise<void>;
        /**
         * Listens for AVScreenCaptureRecord info callback.
         * @param { 'stateChange' } type - Type of the AVScreenCaptureRecord event to listen for.
         * @param { Callback<AVScreenCaptureStateCode> } callback - Callback used to listen for the AVScreenCaptureRecord info return.
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        on(type: 'stateChange', callback: Callback<AVScreenCaptureStateCode>): void;
        /**
         * Listens for AVScreenCaptureRecord info callback.
         * @param { 'error' } type - Type of the AVScreenCaptureRecord event to listen for.
         * @param { ErrorCallback } callback - Callback used to listen for the AVScreenCaptureRecord error return.
         * @throws { BusinessError } 5400103 - IO error. Return by ErrorCallback.
         * @throws { BusinessError } 5400105 - Service died. Return by ErrorCallback.
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        on(type: 'error', callback: ErrorCallback): void;
        /**
         * Unregister listens for AVScreenCaptureRecord info callback.
         * @param { 'stateChange' } type - Type of the AVScreenCaptureRecord event to listen for.
         * @param { Callback<AVScreenCaptureStateCode> } callback - Callback used to listen for the AVScreenCaptureRecord info return.
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        off(type: 'stateChange', callback?: Callback<AVScreenCaptureStateCode>): void;
        /**
         * Unregister listens for AVScreenCaptureRecord error callback.
         * @param { 'error' } type - Type of the AVScreenCaptureRecord event to listen for.
         * @param { ErrorCallback } callback - Callback used to listen for the AVScreenCaptureRecord error return.
         * @syscap SystemCapability.Multimedia.Media.AVScreenCapture
         * @since 12
         */
        off(type: 'error', callback?: ErrorCallback): void;
    }
}
export default media;
