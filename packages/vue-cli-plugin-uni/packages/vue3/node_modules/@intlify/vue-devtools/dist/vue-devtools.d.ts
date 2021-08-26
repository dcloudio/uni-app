import type { CoreMissingType } from '@intlify/runtime';
import type { Emittable } from '@intlify/shared';
import type { Locale } from '@intlify/runtime';
import type { Path } from '@intlify/message-resolver';
import type { PathValue } from '@intlify/message-resolver';

export declare type VueDevToolsEmitter = Emittable<VueDevToolsEmitterEvents>;

export declare type VueDevToolsEmitterEvents = {
    [VueDevToolsTimelineEvents.COMPILE_ERROR]: VueDevToolsTimelineEventPayloads[VueDevToolsTimelineEvents.COMPILE_ERROR];
    [VueDevToolsTimelineEvents.MISSING]: VueDevToolsTimelineEventPayloads[VueDevToolsTimelineEvents.MISSING];
    [VueDevToolsTimelineEvents.FALBACK]: VueDevToolsTimelineEventPayloads[VueDevToolsTimelineEvents.FALBACK];
    [VueDevToolsTimelineEvents.MESSAGE_RESOLVE]: VueDevToolsTimelineEventPayloads[VueDevToolsTimelineEvents.MESSAGE_RESOLVE];
    [VueDevToolsTimelineEvents.MESSAGE_COMPILATION]: VueDevToolsTimelineEventPayloads[VueDevToolsTimelineEvents.MESSAGE_COMPILATION];
    [VueDevToolsTimelineEvents.MESSAGE_EVALUATION]: VueDevToolsTimelineEventPayloads[VueDevToolsTimelineEvents.MESSAGE_EVALUATION];
};

export declare const enum VueDevToolsIDs {
    PLUGIN = "vue-devtools-plugin-vue-i18n",
    CUSTOM_INSPECTOR = "vue-i18n-resource-inspector",
    TIMELINE = "vue-i18n-timeline"
}

export declare const VueDevToolsLabels: Record<string, string>;

export declare const VueDevToolsPlaceholders: Record<string, string>;

export declare const VueDevToolsTimelineColors: Record<string, number>;

export declare type VueDevToolsTimelineEventPayloads = {
    [VueDevToolsTimelineEvents.COMPILE_ERROR]: {
        message: PathValue;
        error: string;
        start?: number;
        end?: number;
        groupId?: string;
    };
    [VueDevToolsTimelineEvents.MISSING]: {
        locale: Locale;
        key: Path;
        type: CoreMissingType;
        groupId?: string;
    };
    [VueDevToolsTimelineEvents.FALBACK]: {
        key: Path;
        type: CoreMissingType;
        from?: Locale;
        to: Locale | 'global';
        groupId?: string;
    };
    [VueDevToolsTimelineEvents.MESSAGE_RESOLVE]: {
        type: VueDevToolsTimelineEvents.MESSAGE_RESOLVE;
        key: Path;
        message: PathValue;
        time: number;
        groupId?: string;
    };
    [VueDevToolsTimelineEvents.MESSAGE_COMPILATION]: {
        type: VueDevToolsTimelineEvents.MESSAGE_COMPILATION;
        message: PathValue;
        time: number;
        groupId?: string;
    };
    [VueDevToolsTimelineEvents.MESSAGE_EVALUATION]: {
        type: VueDevToolsTimelineEvents.MESSAGE_EVALUATION;
        value: unknown;
        time: number;
        groupId?: string;
    };
};

export declare const enum VueDevToolsTimelineEvents {
    COMPILE_ERROR = "compile-error",
    MISSING = "missing",
    FALBACK = "fallback",
    MESSAGE_RESOLVE = "message-resolve",
    MESSAGE_COMPILATION = "message-compilation",
    MESSAGE_EVALUATION = "message-evaluation"
}

export { }
