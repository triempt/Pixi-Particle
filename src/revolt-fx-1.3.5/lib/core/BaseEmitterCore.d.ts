import { IBoxCoreParams, ICircleCoreParams, IRingCoreParams } from "../FX";
import { Particle } from "../Particle";
import { ParticleEmitter } from "../ParticleEmitter";
export declare class BaseEmitterCore {
    type: string;
    x: number;
    y: number;
    emitter: ParticleEmitter;
    protected _settings: ICircleCoreParams | IBoxCoreParams | IRingCoreParams;
    protected _posInterpolationStep: number;
    protected _dx: number;
    protected _dy: number;
    protected _rotation: number;
    protected _t: number;
    __x: number;
    __y: number;
    __scaleMod: number;
    constructor(type: string);
    init(emitter: ParticleEmitter): void;
    emit(particle: Particle): void;
    prepare(spawnCount: number): void;
    step(): void;
    recycle(): void;
    dispose(): void;
    get rotation(): number;
    set rotation(value: number);
}
