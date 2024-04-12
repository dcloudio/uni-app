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
 * Defines the ParticleOptions Interface.
 * @interface ParticleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the ParticleOptions Interface.
 * @interface ParticleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface ParticleOptions<PARTICLE extends ParticleType, COLOR_UPDATER extends ParticleUpdater, OPACITY_UPDATER extends ParticleUpdater, SCALE_UPDATER extends ParticleUpdater, ACC_SPEED_UPDATER extends ParticleUpdater, ACC_ANGLE_UPDATER extends ParticleUpdater, SPIN_UPDATER extends ParticleUpdater> {
    /**
     * Particle emitter.
     * @type { EmitterOptions<PARTICLE> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Particle emitter.
     * @type { EmitterOptions<PARTICLE> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    emitter: EmitterOptions<PARTICLE>;
    /**
     * Particle color.
     * @type { ?ParticleColorPropertyOptions<COLOR_UPDATER> }
     * @default {range:['#FFFFFF','#FFFFFF']}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Particle color.
     * @type { ?ParticleColorPropertyOptions<COLOR_UPDATER> }
     * @default {range:['#FFFFFF','#FFFFFF']}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    color?: ParticleColorPropertyOptions<COLOR_UPDATER>;
    /**
     * Particle opacity.
     * @type { ?ParticlePropertyOptions<number, OPACITY_UPDATER> }
     * @default {range:[1.0,1.0]}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Particle opacity.
     * @type { ?ParticlePropertyOptions<number, OPACITY_UPDATER> }
     * @default {range:[1.0,1.0]}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    opacity?: ParticlePropertyOptions<number, OPACITY_UPDATER>;
    /**
     * Particle scale.
     * @type { ?ParticlePropertyOptions<number, SCALE_UPDATER> }
     * @default {range:[1.0,1.0]}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Particle scale.
     * @type { ?ParticlePropertyOptions<number, SCALE_UPDATER> }
     * @default {range:[1.0,1.0]}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    scale?: ParticlePropertyOptions<number, SCALE_UPDATER>;
    /**
     * Particle velocity.
     * @type { ?object }
     * @default {speed:[0,0];angle:[0,0]}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Particle velocity.
     * @type { ?object }
     * @default {speed:[0,0];angle:[0,0]}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    velocity?: {
        speed: [
            number,
            number
        ];
        angle: [
            number,
            number
        ];
    };
    /**
     * Particle acceleration.
     * @type { ?object }
     * @default {speed:{range:[0,0]};angle:{range:[0,0]}}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Particle acceleration.
     * @type { ?object }
     * @default {speed:{range:[0,0]};angle:{range:[0,0]}}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    acceleration?: {
        speed?: ParticlePropertyOptions<number, ACC_SPEED_UPDATER>;
        angle?: ParticlePropertyOptions<number, ACC_ANGLE_UPDATER>;
    };
    /**
     * Particle spin.
     * @type { ?ParticlePropertyOptions<number, SPIN_UPDATER> }
     * @default {range:[0,0]}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Particle spin.
     * @type { ?ParticlePropertyOptions<number, SPIN_UPDATER> }
     * @default {range:[0,0]}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    spin?: ParticlePropertyOptions<number, SPIN_UPDATER>;
}
/**
 * Defines the parameters for a point-like particle.
 * @interface PointParticleParameters
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the parameters for a point-like particle.
 * @interface PointParticleParameters
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface PointParticleParameters {
    /**
     * Particle radius.
     * @type { VP }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Particle radius.
     * @type { VP }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    radius: VP;
}
/**
 * Defines the parameters for an image-like particle.
 * @interface ImageParticleParameters
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the parameters for an image-like particle.
 * @interface ImageParticleParameters
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface ImageParticleParameters {
    /**
     * Particle image pixelMap.
     * @type { ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Particle image pixelMap.
     * @type { ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    src: ResourceStr;
    /**
     * Particle image size.
     * @type { [Dimension, Dimension] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Particle image size.
     * @type { [Dimension, Dimension] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    size: [
        Dimension,
        Dimension
    ];
    /**
     * Image fit.
     * @type { ?ImageFit }
     * @default ImageFit.Cover
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Image fit.
     * @type { ?ImageFit }
     * @default ImageFit.Cover
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    objectFit?: ImageFit;
}
/**
 * Defines the particle configs.
 * @interface ParticleConfigs
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the particle configs.
 * @interface ParticleConfigs
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface ParticleConfigs {
    /**
     * Point-like Particle.
     * @type { PointParticleParameters }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Point-like Particle.
     * @type { PointParticleParameters }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    [ParticleType.POINT]: PointParticleParameters;
    /**
     * Image-like Particle.
     * @type { ImageParticleParameters }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Image-like Particle.
     * @type { ImageParticleParameters }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    [ParticleType.IMAGE]: ImageParticleParameters;
}
/**
 * Defines the emitter Options.
 * @interface EmitterOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the emitter Options.
 * @interface EmitterOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface EmitterOptions<PARTICLE extends ParticleType> {
    /**
     * Set particle config.
     * @type { object }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set particle config.
     * @type { object }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    particle: {
        /**
         * Particle type.
         * @type { PARTICLE }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Particle type.
         * @type { PARTICLE }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        type: PARTICLE;
        /**
         * Particle config.
         * @type { ParticleConfigs[PARTICLE] }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Particle config.
         * @type { ParticleConfigs[PARTICLE] }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        config: ParticleConfigs[PARTICLE];
        /**
         * Particle count.
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Particle count.
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        count: number;
        /**
         * Particle lifetime.
         * @type { ?number }
         * @default 1000
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Particle lifetime.
         * @type { ?number }
         * @default 1000
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        lifetime?: number;
    };
    /**
     * Emitting rate, that is, the number of particles produced per second.
     * @type { ?number }
     * @default 5
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Emitting rate, that is, the number of particles produced per second.
     * @type { ?number }
     * @default 5
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    emitRate?: number;
    /**
     * Shape of emitter.
     * @type { ?ParticleEmitterShape }
     * @default ParticleEmitterShape.RECTANGLE
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Shape of emitter.
     * @type { ?ParticleEmitterShape }
     * @default ParticleEmitterShape.RECTANGLE
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    shape?: ParticleEmitterShape;
    /**
     * Position of emitter.
     * The first element means X-axis location.
     * The second element means the Y-axis location.
     * @type { ?[Dimension, Dimension] }
     * @default [0,0]
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Position of emitter.
     * The first element means X-axis location.
     * The second element means the Y-axis location.
     * @type { ?[Dimension, Dimension] }
     * @default [0,0]
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    position?: [
        Dimension,
        Dimension
    ];
    /**
     * Size of emitter.
     * The first element means emitter width.
     * The second element means emitter height.
     * @type { ?[Dimension, Dimension] }
     * @default ['100%','100%']
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Size of emitter.
     * The first element means emitter width.
     * The second element means emitter height.
     * @type { ?[Dimension, Dimension] }
     * @default ['100%','100%']
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    size?: [
        Dimension,
        Dimension
    ];
}
/**
 * Defines the particle property updater configs.
 * @interface ParticlePropertyUpdaterConfigs
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the particle property updater configs.
 * @interface ParticlePropertyUpdaterConfigs
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface ParticlePropertyUpdaterConfigs<T> {
    /**
     * No effect of particle updater.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * No effect of particle updater.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    [ParticleUpdater.NONE]: void;
    /**
     * Random effect of particle updater.
     * @type { [T, T] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Random effect of particle updater.
     * @type { [T, T] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    [ParticleUpdater.RANDOM]: [
        T,
        T
    ];
    /**
     * Curve effect of particle updater.
     * @type { Array<ParticlePropertyAnimation<T>> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Curve effect of particle updater.
     * @type { Array<ParticlePropertyAnimation<T>> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    [ParticleUpdater.CURVE]: Array<ParticlePropertyAnimation<T>>;
}
/**
 * Defines the particle property Options.
 * @interface ParticlePropertyOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the particle property Options.
 * @interface ParticlePropertyOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface ParticlePropertyOptions<TYPE, UPDATER extends ParticleUpdater> {
    /**
     * Initial range, within which the initial value are randomly generated.
     * @type { [TYPE, TYPE] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Initial range, within which the initial value are randomly generated.
     * @type { [TYPE, TYPE] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    range: [
        TYPE,
        TYPE
    ];
    /**
     * Particle property updater.
     * @type { ?object }
     * @default  {type:UPDATER.NONE;config:ParticlePropertyUpdaterConfigs<UPDATER.NONE>[UPDATER.NONE]}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Particle property updater.
     * @type { ?object }
     * @default  {type:UPDATER.NONE;config:ParticlePropertyUpdaterConfigs<UPDATER.NONE>[UPDATER.NONE]}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    updater?: {
        type: UPDATER;
        config: ParticlePropertyUpdaterConfigs<TYPE>[UPDATER];
    };
}
/**
 * Defines the particle color property updater configs.
 * @interface ParticleColorPropertyUpdaterConfigs
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the particle color property updater configs.
 * @interface ParticleColorPropertyUpdaterConfigs
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface ParticleColorPropertyUpdaterConfigs {
    /**
     * No effect of particle color property updater.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * No effect of particle color property updater.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    [ParticleUpdater.NONE]: void;
    /**
     * Random effect of particle color property updater.
     * @type { object }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Random effect of particle color property updater.
     * @type { object }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    [ParticleUpdater.RANDOM]: {
        r: [
            number,
            number
        ];
        g: [
            number,
            number
        ];
        b: [
            number,
            number
        ];
        a: [
            number,
            number
        ];
    };
    /**
     * Curve effect of particle color property updater.
     *
     * @type { Array<ParticlePropertyAnimation<ResourceColor>> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Curve effect of particle color property updater.
     *
     * @type { Array<ParticlePropertyAnimation<ResourceColor>> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    [ParticleUpdater.CURVE]: Array<ParticlePropertyAnimation<ResourceColor>>;
}
/**
 * Defines the particle color property updater configs which can support generics.
 * @interface ParticleColorPropertyOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the particle color property updater configs which can support generics.
 * @interface ParticleColorPropertyOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface ParticleColorPropertyOptions<UPDATER extends ParticleUpdater> {
    /**
     * Initial color range, within which the initial color is randomly generated.
     * @type { [ResourceColor, ResourceColor] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Initial color range, within which the initial color is randomly generated.
     * @type { [ResourceColor, ResourceColor] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    range: [
        ResourceColor,
        ResourceColor
    ];
    /**
     * Particle color property updater.
     * @type { ?object }
     * @default {type:UPDATER.NONE;config:ParticleColorPropertyUpdaterConfigs[UPDATER.NONE]}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Particle color property updater.
     * @type { ?object }
     * @default {type:UPDATER.NONE;config:ParticleColorPropertyUpdaterConfigs[UPDATER.NONE]}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    updater?: {
        type: UPDATER;
        config: ParticleColorPropertyUpdaterConfigs[UPDATER];
    };
}
/**
 * Defines the particle property lifecycle.
 * @interface ParticlePropertyAnimation
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the particle property lifecycle.
 * @interface ParticlePropertyAnimation
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface ParticlePropertyAnimation<T> {
    /**
     * Start position of the particle animation.
     * @type { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Start position of the particle animation.
     * @type { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    from: T;
    /**
     * End position of the particle animation.
     * @type { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * End position of the particle animation.
     * @type { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    to: T;
    /**
     * Start millis of the particle animation.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Start millis of the particle animation.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    startMillis: number;
    /**
     * End millis of the particle animation.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * End millis of the particle animation.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    endMillis: number;
    /**
     * Curve of the particle animation.
     * @type { ?(Curve | ICurve) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Curve of the particle animation.
     * @type { ?(Curve | ICurve) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    curve?: Curve | ICurve;
}
/**
 * Defines the particle Interface.
 * @interface ParticleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the particle Interface.
 * @interface ParticleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface ParticleInterface {
    /**
     * create a particle array.
     * @param { object } value - Particle value
     * particles - list of ParticleOptions.
     * @returns { ParticleAttribute } Returns the particle attribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * create a particle array.
     * @param { object } value - Particle value
     * particles - list of ParticleOptions.
     * @returns { ParticleAttribute } Returns the particle attribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    <PARTICLE extends ParticleType, COLOR_UPDATER extends ParticleUpdater, OPACITY_UPDATER extends ParticleUpdater, SCALE_UPDATER extends ParticleUpdater, ACC_SPEED_UPDATER extends ParticleUpdater, ACC_ANGLE_UPDATER extends ParticleUpdater, SPIN_UPDATER extends ParticleUpdater>(value: {
        particles: Array<ParticleOptions<PARTICLE, COLOR_UPDATER, OPACITY_UPDATER, SCALE_UPDATER, ACC_SPEED_UPDATER, ACC_ANGLE_UPDATER, SPIN_UPDATER>>;
    }): ParticleAttribute;
}
/**
 * Enumerates the particle types.
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Enumerates the particle types.
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum ParticleType {
    /**
     * Point-like particle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Point-like particle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    POINT = 'point',
    /**
     * Image-like particle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Image-like particle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    IMAGE = 'image'
}
/**
 * Enumerates the emitter shapes of a particle.
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Enumerates the emitter shapes of a particle.
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum ParticleEmitterShape {
    /**
     * Rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    RECTANGLE = 'rectangle',
    /**
     * Circle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Circle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    CIRCLE = 'circle',
    /**
     * Ellipse.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Ellipse.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    ELLIPSE = 'ellipse'
}
/**
 * Enumerates the updater types of a particle.
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Enumerates the updater types of a particle.
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum ParticleUpdater {
    /**
     * No updater is used.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * No updater is used.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    NONE = 'none',
    /**
     * Random updater.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Random updater.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    RANDOM = 'random',
    /**
     * Curve updater.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Curve updater.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    CURVE = 'curve'
}
/**
 * Defines the Particle component attribute functions.
 * @extends CommonMethod<ParticleAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the Particle component attribute functions.
 * @extends CommonMethod<ParticleAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class ParticleAttribute extends CommonMethod<ParticleAttribute> {
}
/**
 * Defines Particle Component.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Particle Component.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const Particle: ParticleInterface;
