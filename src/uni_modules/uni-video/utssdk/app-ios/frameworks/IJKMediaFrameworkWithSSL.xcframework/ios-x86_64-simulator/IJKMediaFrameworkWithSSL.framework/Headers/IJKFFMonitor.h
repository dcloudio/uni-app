/*
 * Copyright (c) 2016 Bilibili
 * Copyright (c) 2016 Zhang Rui <bbcallen@gmail.com>
 *
 * This file is part of ijkPlayer.
 *
 * ijkPlayer is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * ijkPlayer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with ijkPlayer; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
 */

#import <Foundation/Foundation.h>

@interface IJKFFMonitor : NSObject

- (instancetype)init;

@property(nonatomic) NSDictionary *mediaMeta;
@property(nonatomic) NSDictionary *videoMeta;
@property(nonatomic) NSDictionary *audioMeta;

@property(nonatomic, readonly) int64_t   duration;   // milliseconds
@property(nonatomic, readonly) int64_t   bitrate;    // bit / sec
@property(nonatomic, readonly) float     fps;        // frame / sec
@property(nonatomic, readonly) int       width;      // width
@property(nonatomic, readonly) int       height;     // height
@property(nonatomic, readonly) NSString *vcodec;     // video codec
@property(nonatomic, readonly) NSString *acodec;     // audio codec
@property(nonatomic, readonly) int       sampleRate;
@property(nonatomic, readonly) int64_t   channelLayout;

@property(nonatomic) NSString *vdecoder;

@property(nonatomic) int       tcpError;
@property(nonatomic) NSString *remoteIp;

@property(nonatomic) int       httpError;
@property(nonatomic) NSString *httpUrl;
@property(nonatomic) NSString *httpHost;
@property(nonatomic) int       httpCode;
@property(nonatomic) int64_t   httpOpenTick;
@property(nonatomic) int64_t   httpSeekTick;
@property(nonatomic) int       httpOpenCount;
@property(nonatomic) int       httpSeekCount;
@property(nonatomic) int64_t   lastHttpOpenDuration;
@property(nonatomic) int64_t   lastHttpSeekDuration;
@property(nonatomic) int64_t   filesize;

@property(nonatomic) int64_t   prepareStartTick;
@property(nonatomic) int64_t   prepareDuration;
@property(nonatomic) int64_t   firstVideoFrameLatency;
@property(nonatomic) int64_t   lastPrerollStartTick;
@property(nonatomic) int64_t   lastPrerollDuration;

@end
