//
//  KTVHCRange.h
//  KTVHTTPCache
//
//  Created by Single on 2018/5/20.
//  Copyright © 2018年 Single. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef struct KTVHCRange {
    long long start;
    long long end;
} KTVHCRange;

static const long long KTVHCNotFound = LONG_LONG_MAX;

BOOL KTVHCRangeIsFull(KTVHCRange range);
BOOL KTVHCRangeIsVaild(KTVHCRange range);
BOOL KTVHCRangeIsInvaild(KTVHCRange range);
BOOL KTVHCEqualRanges(KTVHCRange range1, KTVHCRange range2);
long long KTVHCRangeGetLength(KTVHCRange range);
NSString * KTVHCStringFromRange(KTVHCRange range);
NSDictionary * KTVHCRangeFillToRequestHeaders(KTVHCRange range, NSDictionary *headers);
NSDictionary * KTVHCRangeFillToRequestHeadersIfNeeded(KTVHCRange range, NSDictionary *headers);
NSDictionary * KTVHCRangeFillToResponseHeaders(KTVHCRange range, NSDictionary *headers, long long totalLength);

KTVHCRange KTVHCMakeRange(long long start, long long end);
KTVHCRange KTVHCRangeZero(void);
KTVHCRange KTVHCRangeFull(void);
KTVHCRange KTVHCRangeInvaild(void);
KTVHCRange KTVHCRangeWithSeparateValue(NSString *value);
KTVHCRange KTVHCRangeWithRequestHeaderValue(NSString *value);
KTVHCRange KTVHCRangeWithResponseHeaderValue(NSString *value, long long *totalLength);
KTVHCRange KTVHCRangeWithEnsureLength(KTVHCRange range, long long ensureLength);
