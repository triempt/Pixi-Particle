import * as PIXI from "pixi.js";
import { BaseEffect } from "./BaseEffect";
import { ComponentType } from "./ComponentType";
import { EffectSequence } from "./EffectSequence";
import { EffectSequenceComponentType } from "./EffectSequenceComponentType";
import { MovieClip } from "./MovieClip";
import { Particle } from "./Particle";
import { ParticleEmitter } from "./ParticleEmitter";
import { Sprite } from "./Sprite";
import { BaseEmitterCore } from "./core/BaseEmitterCore";
export declare class FX {
    static settingsVersion: number;
    static readonly version: string;
    private static _bundleHash;
    useBlendModes: boolean;
    particleCount: number;
    emitterCount: number;
    effectSequenceCount: number;
    maxParticles: number;
    particleFac: number;
    private _active;
    private _timeElapsed;
    private _cache;
    private _settingsCache;
    private _nameMaps;
    private _effects;
    __containers: {
        [key: string]: PIXI.Container;
    };
    static ComponentType: any;
    static EffectSequenceComponentType: any;
    private static _blendModes;
    static __emitterCores: any;
    constructor();
    /**
     * Starts the process.
     *
     * @param {} - No parameters.
     * @return {} - No return value.
     */
    start(): void;
    /**
     * Pauses the execution of the function.
     *
     * @param {}
     * @return {}
     */
    pause(): void;
    /**
     * Updates the state of the object based on the elapsed time.
     *
     * @param {number} delta - The time delta to update by. Default is 1.
     */
    update(delta?: number): void;
    /**
     * Clears the cache by resetting all cache objects to empty values.
     *
     * @param {}
     * @return {}
     */
    clearCache(): void;
    /**
     * Sets the value of the floorY property for all emitters in the settings cache.
     *
     * @param {number} value - The new value for the floorY property.
     */
    setFloorY(value: number): void;
    /**
     * Disposes of all the effects in the list and clears the cache.
     */
    dispose(): void;
    /**
     * Loads the bundle files and returns a promise that resolves to the parsed sprite sheet result.
     *
     * @param {string} bundleSettingsUrl - The URL of the bundle settings.
     * @param {string} spritesheetUrl - The URL of the sprite sheet.
     * @param {string} spritesheetFilter - The filter for the sprite sheet. Default is an empty string.
     * @param {string[]} additionalAssets - An array of additional asset URLs. Default is an empty array.
     * @return {Promise<IParseSpriteSheetResult>} A promise that resolves to the parsed sprite sheet result.
     */
    loadBundleFiles(bundleSettingsUrl: string, spritesheetUrl: string, spritesheetFilter?: string, additionalAssets?: string[]): Promise<IParseSpriteSheetResult>;
    /**
     * Initializes the bundle with the given settings and optionally clears the cache.
     *
     * @param {any} bundleSettings - The settings for the bundle.
     * @param {boolean} clearCache - Whether to clear the cache or not. Optional, default is false.
     * @returns {IParseSpriteSheetResult} The result of parsing the sprite sheet.
     */
    initBundle(bundleSettings: any, clearCache?: boolean): IParseSpriteSheetResult;
    /**
     * Adds a particle emitter to the FX object.
     *
     * @param {string} componentId - The unique identifier for the emitter component.
     * @param {IEmitterSettings} settings - The settings for the emitter.
     * @throws {Error} Throws an error if the componentId already exists.
     * @return {FX} Returns the FX object for chaining.
     */
    addParticleEmitter(componentId: string, settings: IEmitterSettings): FX;
    /**
     * Adds an effect sequence to the component with the specified ID.
     *
     * @param {string} componentId - The ID of the component.
     * @param {IEffectSequenceSettings} settings - The settings for the effect sequence.
     * @throws {Error} If a component with the same ID already exists.
     * @return {FX} The current instance of the FX class.
     */
    addEffectSequence(componentId: string, settings: IEffectSequenceSettings): FX;
    /**
     * Initializes a sprite with the specified component ID and settings.
     *
     * @param {string} componentId - The ID of the component.
     * @param {ISpriteSettings} settings - The settings for the sprite.
     * @throws {Error} Throws an error if the component ID already exists.
     * @returns {FX} Returns the current instance of the FX class.
     */
    initSprite(componentId: string, settings: ISpriteSettings): FX;
    /**
     * Initializes a movie clip with the specified component ID and settings.
     *
     * @param {string} componentId - The unique identifier for the movie clip component.
     * @param {IMovieClipSettings} settings - The settings for the movie clip.
     * @return {FX} The instance of the FX class.
     */
    initMovieClip(componentId: string, settings: IMovieClipSettings): FX;
    /**
     * Retrieves the movie clips from the settings cache.
     *
     * @return {Object} An object containing movie clip settings.
     */
    getMovieClips(): {
        [key: string]: IMovieClipSettings;
    };
    /**
     * Retrieves the sprites from the settings cache.
     *
     * @return {Object} An object containing sprite settings.
     */
    getSprites(): {
        [key: string]: ISpriteSettings;
    };
    /**
     * Adds a container to the __containers object with the specified key.
     *
     * @param {string} key - The key used to identify the container in the __containers object.
     * @param {PIXI.Container} container - The container to be added.
     */
    addContainer(key: string, container: PIXI.Container): void;
    /**
     * Retrieves the EffectSequence object with the specified name.
     *
     * @param {string} name - The name of the EffectSequence to retrieve.
     * @return {EffectSequence} - The EffectSequence object with the specified name.
     */
    getEffectSequence(name: string, cloneSettings?: boolean): EffectSequence;
    /**
     * Retrieves an EffectSequence object by its component ID.
     *
     * @param {string} componentId - The ID of the component.
     * @return {EffectSequence} The retrieved EffectSequence object.
     */
    getEffectSequenceById(componentId: string, cloneSettings?: boolean): EffectSequence;
    /**
     * Retrieves a particle emitter by its name.
     *
     * @param {string} name - The name of the particle emitter.
     * @param {boolean} autoRecycleOnComplete - (Optional) Specifies whether the emitter should auto recycle when complete. Default is true.
     * @param {boolean} cloneSettings - (Optional) Specifies whether the emitter settings should be cloned. Default is false.
     * @return {ParticleEmitter} The particle emitter with the specified name.
     */
    getParticleEmitter(name: string, autoRecycleOnComplete?: boolean, cloneSettings?: boolean): ParticleEmitter;
    /**
     * Retrieves a particle emitter by its component ID.
     *
     * @param {string} componentId - The ID of the component.
     * @param {boolean} autoRecycleOnComplete - Whether the emitter should automatically recycle itself when it completes.
     * @param {boolean} cloneSettings - Whether to clone the settings object before applying them to the emitter.
     * @return {ParticleEmitter} The retrieved particle emitter.
     */
    getParticleEmitterById(componentId: string, autoRecycleOnComplete?: boolean, cloneSettings?: boolean): ParticleEmitter;
    /**
     * Creates a particle emitter from the specified settings.
     *
     * @param {IEmitterSettings} settings - The settings of the emitter to create.
     * @param {boolean} autoRecycleOnComplete - Whether the emitter should automatically recycle itself when it completes.
     * @return {ParticleEmitter} The created particle emitter.
     */
    createParticleEmitterFrom(settings: IEmitterSettings, autoRecycleOnComplete?: boolean): ParticleEmitter;
    createEffectSequenceEmitterFrom(settings: IEffectSequenceSettings): EffectSequence;
    /**
     * Stops the specified particle emitter.
     *
     * @param {ParticleEmitter} emitter - The particle emitter to stop.
     * @param {boolean} [dispose=false] - Whether to dispose the emitter or recycle it.
     */
    stopEmitter(emitter: ParticleEmitter, dispose?: boolean): void;
    /**
     * Stops all effects.
     *
     * @param {none} none - This function does not take any parameters.
     * @return {void} This function does not return a value.
     */
    stopAllEffects(): void;
    /**
     * Parses a sprite sheet.
     *
     * @param {PIXI.Spritesheet} spriteSheet - The sprite sheet to parse.
     * @param {string} filter - Optional filter to apply to the sprite sheet.
     * @return {IParseSpriteSheetResult} The result of parsing the sprite sheet.
     */
    parseSpriteSheet(spriteSheet: PIXI.Spritesheet, filter?: string): IParseSpriteSheetResult;
    /**
     * Parses the texture cache and returns the result as an IParseSpriteSheetResult object.
     *
     * @param {string} [filter] - An optional parameter to filter the results.
     * @returns {IParseSpriteSheetResult} - The parsed sprite sheet result.
     */
    parseTextureCache(filter?: string): IParseSpriteSheetResult;
    /**
     * Returns if the FX instance is active.
     *
     * @return {boolean} The value of the 'active' property.
     */
    get active(): boolean;
    __addActiveEffect(effect: BaseEffect): void;
    __removeActiveEffect(effect: BaseEffect): void;
    __getSprite(componentId: string): Sprite;
    __getMovieClip(componentId: string): MovieClip;
    __getParticle(): Particle;
    __getEmitterCore(type: string, emitter: ParticleEmitter): BaseEmitterCore;
    __recycleParticle(particle: Particle): void;
    __recycleSprite(componentId: string, object: any): void;
    __recycleMovieClip(componentId: string, object: any): void;
    __recycleEmitter(emitter: ParticleEmitter): void;
    __recycleEffectSequence(effectSequence: EffectSequence): void;
    __recycleEmitterCore(core: BaseEmitterCore): void;
    __getBlendMode(value: number | String): any;
    __getSequenceSettings(componentId: string): IEffectSequenceSettings;
    __getEmitterSettings(componentId: string): IEmitterSettings;
    private parseObject;
}
export declare enum SpawnType {
    ParticleEmitter = 0,
    EffectSequence = 1
}
/**
 * Represents the base effect interface.
 */
export interface IBaseEffect {
    /**
     * The name of the effect.
     */
    name: string;
    /**
     * The unique identifier of the effect.
     */
    id: any;
    /**
     * The container ID associated with the effect.
     */
    containerId: string;
}
/**
 * Interface for emitter settings
 */
export interface IEmitterSettings extends IBaseEffect {
    __isClone?: boolean;
    /**
     * Core settings for the emitter
     */
    core: ICoreSettings;
    /**
     * Minimum frequency at which particles are spawned
     */
    spawnFrequencyMin: number;
    /**
     * Maximum frequency at which particles are spawned
     */
    spawnFrequencyMax: number;
    /**
     * Settings for individual particles
     */
    particleSettings: IParticleSettings;
    /**
     * Maximum number of particles
     */
    maxParticles: number;
    /**
     * Minimum number of particles spawned at once
     */
    spawnCountMin: number;
    /**
     * Maximum number of particles spawned at once
     */
    spawnCountMax: number;
    /**
     * Duration of the emitter in seconds
     */
    duration: number;
    /**
     * Flag indicating if the emitter should run indefinitely
     */
    infinite: boolean;
    /**
     * Flag indicating if gravity should be applied to particles
     */
    useGravity: boolean;
    /**
     * Gravity value applied to particles
     */
    gravity: number;
    /**
     * Flag indicating if particles should collide with a floor
     */
    useFloor: boolean;
    /**
     * Y position of the floor
     */
    floorY: number;
    /**
     * Rotation of the emitter in degrees
     */
    rotation: number;
    /**
     * Automatic rotation of the emitter in degrees per second
     */
    autoRotation: number;
    /**
     * Array of child emitters spawned by this emitter
     */
    childs: IEmitterSpawn[];
}
/**
 * Interface representing an emitter spawn.
 */
export interface IEmitterSpawn {
    /**
     * Unique identifier for the spawn.
     */
    id: string;
    /**
     * Type of the spawn.
     */
    type: SpawnType;
    /**
     * Scale of the spawn.
     */
    scale: number;
    /**
     * Name of the spawn.
     */
    name: string;
    /**
     * Whether the spawn should adopt rotation.
     */
    adoptRotation: boolean;
    /**
     * Identifier of the container for the spawn.
     */
    containerId: string;
    settings?: IEmitterSettings | IEffectSequenceSettings;
}
/**
 * Represents the spawns of an emitter at different stages.
 */
export interface IEmitterSpawns {
    /**
     * Spawns when the emitter starts.
     */
    onStart: IEmitterSpawn[];
    /**
     * Spawns when the emitter reaches halfway.
     */
    onHalfway: IEmitterSpawn[];
    /**
     * Spawns when the emitter bounces.
     */
    onBounce: IEmitterSpawn[];
    /**
     * Spawns when the emitter completes.
     */
    onComplete: IEmitterSpawn[];
    /**
     * Iterate over all spawns.
     * @returns Iterator for all spawns.
     */
    [Symbol.iterator](): Iterator<IEmitterSpawn[]>;
}
/**
 * Represents the settings for an effect sequence.
 */
export interface IEffectSequenceSettings extends IBaseEffect {
    __isClone?: boolean;
    /**
     * The effects in the sequence.
     */
    effects: IEffectSettings[];
    /**
     * The delay before the sequence starts.
     */
    delay: number;
    /**
     * The minimum scale of the effects.
     */
    scaleMin: number;
    /**
     * The maximum scale of the effects.
     */
    scaleMax: number;
}
/**
 * Represents the settings for an effect.
 */
export interface IEffectSettings {
    /**
     * The ID of the component.
     */
    componentId: string;
    /**
     * The type of the component.
     */
    componentType: EffectSequenceComponentType;
    /**
     * The delay before the effect starts.
     */
    delay: number;
    /**
     * The parameters of the component.
     */
    componentParams: IMovieClipComponentParams | IBaseComponentParams;
    /**
     * The minimum scale of the effect.
     */
    scaleMin: number;
    /**
     * The maximum scale of the effect.
     */
    scaleMax: number;
    /**
     * The minimum alpha of the effect.
     */
    alphaMin: number;
    /**
     * The maximum alpha of the effect.
     */
    alphaMax: number;
    /**
     * The minimum rotation of the effect.
     */
    rotationMin: number;
    /**
     * The maximum rotation of the effect.
     */
    rotationMax: number;
    /**
     * The blend mode of the effect.
     */
    blendMode: number;
    /**
     * The tint of the effect.
     */
    tint: number;
    /**
     * The duration of the effect.
     */
    duration: number;
    /**
     * The ID of the container.
     */
    containerId: string;
    /**
     * The trigger value of the effect.
     */
    triggerValue: string;
}
/**
 * Represents the settings for a sprite.
 */
export interface ISpriteSettings {
    /**
     * The texture of the sprite.
     */
    texture: string;
    /**
     * The X anchor of the sprite.
     */
    anchorX: number;
    /**
     * The Y anchor of the sprite.
     */
    anchorY: number;
}
/**
 * Interface for MovieClip settings.
 */
export interface IMovieClipSettings {
    /**
     * Array of texture strings.
     */
    textures: string[];
    /**
     * X-coordinate of the anchor point.
     */
    anchorX: number;
    /**
     * Y-coordinate of the anchor point.
     */
    anchorY: number;
}
/**
 * Interface for core settings.
 */
export interface ICoreSettings {
    /**
     * Type of core.
     */
    type: string;
    /**
     * Parameters for the core.
     */
    params: ICircleCoreParams | IRingCoreParams | IBoxCoreParams;
}
/**
 * Interface for circle core parameters.
 */
export interface ICircleCoreParams {
    /**
     * Radius of the circle.
     */
    radius: number;
    /**
     * Flag indicating if the core is radial.
     */
    radial: boolean;
    /**
     * Angle of the core.
     */
    angle: number;
}
/**
 * Interface for ring core parameters.
 */
export interface IRingCoreParams {
    /**
     * Radius of the ring.
     */
    radius: number;
    /**
     * Flag indicating if the core is radial.
     */
    radial: boolean;
    /**
     * Angle of the core.
     */
    angle: number;
    /**
     * Flag indicating if the ring is uniform.
     */
    uniform: boolean;
}
/**
 * Interface for box core parameters.
 */
export interface IBoxCoreParams {
    /**
     * Width of the box.
     */
    width: number;
    /**
     * Height of the box.
     */
    height: number;
    /**
     * Flag indicating if the core is radial.
     */
    radial: boolean;
}
export interface IParticleSettings {
    /**
     * The type of component.
     */
    componentType: ComponentType;
    /**
     * The ID of the component.
     */
    componentId: string;
    /**
     * The parameters for the base component.
     */
    componentParams: IBaseComponentParams;
    /**
     * The minimum duration of the particle.
     */
    durationMin: number;
    /**
     * The maximum duration of the particle.
     */
    durationMax: number;
    /**
     * Flag indicating whether motion is enabled.
     */
    useMotion: boolean;
    /**
     * Flag indicating whether rotation is enabled.
     */
    useRotation: boolean;
    /**
     * Flag indicating whether alpha is enabled.
     */
    useAlpha: boolean;
    /**
     * Flag indicating whether scale is enabled.
     */
    useScale: boolean;
    /**
     * Flag indicating whether tint is enabled.
     */
    useTint: boolean;
    /**
     * Flag indicating whether child particles are enabled.
     */
    useChilds: boolean;
    /**
     * Flag indicating whether spawn particles are enabled.
     */
    useSpawns: boolean;
    /**
     * The minimum distance of the particle.
     */
    distanceMin: number;
    /**
     * The maximum distance of the particle.
     */
    distanceMax: number;
    /**
     * The easing function for the distance.
     */
    distanceEase: string;
    /**
     * The minimum move speed of the particle.
     */
    moveSpeedMin: number;
    /**
     * The maximum move speed of the particle.
     */
    moveSpeedMax: number;
    /**
     * The minimum bounce factor of the particle.
     */
    bounceFacMin: number;
    /**
     * The maximum bounce factor of the particle.
     */
    bounceFacMax: number;
    /**
     * The minimum friction of the particle.
     */
    frictionMin: number;
    /**
     * The maximum friction of the particle.
     */
    frictionMax: number;
    /**
     * Flag indicating whether alignment is enabled.
     */
    align: boolean;
    /**
     * The blend mode of the particle.
     */
    blendMode: number | String;
    /**
     * Flag indicating whether the particle is rendered on top.
     */
    addOnTop: boolean;
    /**
     * The minimum rotation speed of the particle.
     */
    rotationSpeedMin: number;
    /**
     * The maximum rotation speed of the particle.
     */
    rotationSpeedMax: number;
    /**
     * Flag indicating whether the rotation direction is random.
     */
    randomRotationDirection: boolean;
    /**
     * Flag indicating whether the start rotation is random.
     */
    randomStartRotation: boolean;
    /**
     * Flag indicating whether fade in is enabled.
     */
    fadeIn: boolean;
    /**
     * The fade in duration factor of the particle.
     */
    fadeInDurationFac: number;
    /**
     * The easing function for the fade in.
     */
    fadeInEase: string;
    /**
     * Minimum starting alpha value
     * @type {number}
     */
    alphaStartMin: number;
    /**
     * Maximum starting alpha value
     * @type {number}
     */
    alphaStartMax: number;
    /**
     * Minimum ending alpha value
     * @type {number}
     */
    alphaEndMin: number;
    /**
     * Maximum ending alpha value
     * @type {number}
     */
    alphaEndMax: number;
    /**
     * Easing function for alpha transitions
     * @type {string}
     */
    alphaEase: string;
    /**
     * Starting tint value
     * @type {number}
     */
    tintStart: number;
    /**
     * Ending tint value
     * @type {number}
     */
    tintEnd: number;
    /**
     * Easing function for tint transitions
     * @type {string}
     */
    tintEase: string;
    /**
     * Whether to scale in or not
     * @type {boolean}
     */
    scaleIn: boolean;
    /**
     * Duration factor for scale in animation
     * @type {number}
     */
    scaleInDurationFac: number;
    /**
     * Easing function for scale in animation
     * @type {string}
     */
    scaleInEase: string;
    /**
     * Whether to use uniform scaling or not
     * @type {boolean}
     */
    uniformScale: boolean;
    /**
     * Minimum starting scale X value
     * @type {number}
     */
    scaleXStartMin: number;
    /**
     * Maximum starting scale X value
     * @type {number}
     */
    scaleXStartMax: number;
    /**
     * Minimum ending scale X value
     * @type {number}
     */
    scaleXEndMin: number;
    /**
     * Maximum ending scale X value
     * @type {number}
     */
    scaleXEndMax: number;
    /**
     * Easing function for scale X transitions
     * @type {string}
     */
    scaleXEase: string;
    /**
     * Minimum starting scale Y value
     * @type {number}
     */
    scaleYStartMin: number;
    /**
     * Maximum starting scale Y value
     * @type {number}
     */
    scaleYStartMax: number;
    /**
     * Minimum ending scale Y value
     * @type {number}
     */
    scaleYEndMin: number;
    /**
     * Maximum ending scale Y value
     * @type {number}
     */
    scaleYEndMax: number;
    /**
     * Easing function for scale Y transitions
     * @type {string}
     */
    scaleYEase: string;
    /**
     * Minimum starting scale value
     * @type {number}
     */
    scaleStartMin: number;
    /**
     * Maximum starting scale value
     * @type {number}
     */
    scaleStartMax: number;
    /**
     * Minimum ending scale value
     * @type {number}
     */
    scaleEndMin: number;
    /**
     * Maximum ending scale value
     * @type {number}
     */
    scaleEndMax: number;
    /**
     * Easing function for scale transitions
     * @type {string}
     */
    scaleEase: string;
    /**
     * Whether to stop emitting particles on bounce
     * @type {boolean}
     */
    stopOnBounce: boolean;
    /**
     * The spawn configuration
     * @type {IEmitterSpawns}
     */
    spawn: IEmitterSpawns;
    /**
     * The child emitter spawns
     * @type {IEmitterSpawn[]}
     */
    childs: IEmitterSpawn[];
}
/**
 * Parameters for the  MovieClipComponent.
 */
export interface IMovieClipComponentParams extends IBaseComponentParams {
    /**
     * Minimum animation speed.
     */
    animationSpeedMin: number;
    /**
     * Maximum animation speed.
     */
    animationSpeedMax: number;
    /**
     * Whether the animation should loop.
     */
    loop: boolean;
}
/**
 * Base parameters for a component.
 */
export interface IBaseComponentParams {
    /**
     * X coordinate of the anchor point.
     */
    anchorX: number;
    /**
     * Y coordinate of the anchor point.
     */
    anchorY: number;
}
/**
 * Parent interface for particle emitters.
 */
export interface IParticleEmitterParent {
    /**
     * Remove a child emitter.
     * @param emitter The emitter to remove.
     * @returns The removed emitter.
     */
    __removeChildEmitter(emitter: any): any;
}
/**
 * Interface for a particle.
 */
export interface IParticle extends IParticleEmitterParent {
    /**
     * The component ID of the particle.
     */
    componentId: string;
    /**
     * Initialize the particle.
     * @param emitter The particle emitter.
     * @param def The particle settings.
     * @param scaleMod The scale modifier.
     * @returns The initialized particle.
     */
    init(emitter: ParticleEmitter, def: IParticleSettings, scaleMod?: number): IParticle;
    /**
     * Update the particle.
     * @param dt The time delta.
     */
    update(dt: number): void;
    /**
     * Recycle the particle.
     */
    recycle(): void;
    /**
     * Dispose the particle.
     */
    dispose(): void;
}
/**
 * Result of parsing a sprite sheet.
 */
export interface IParseSpriteSheetResult {
    /**
     * List of sprite names.
     */
    sprites: string[];
    /**
     * List of movie clip names.
     */
    movieClips: string[];
}
/**
 * Additional asset information.
 */
export interface IAdditionalAsset {
    /**
     * The name of the asset.
     */
    name: string;
    /**
     * The URL of the asset.
     */
    url: string;
}
