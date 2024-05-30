/// <reference types="pixi.js" />
import { Color } from "./util/Color";
import { Easing } from "./util/Easing";
import { FXSignal } from "./util/FXSignal";
import { Node } from "./util/LinkedList";
import { Rnd } from "./util/Rnd";
export class Particle extends Node {
    constructor() {
        super();
        this.dx = 0;
        this.dy = 0;
        this._childEmitters = [];
        this._hasChildEmitters = false;
        this._spawnOnHalfway = false;
        this.__recycled = true;
        this.__on = {
            died: new FXSignal(),
            bounced: new FXSignal(),
            updated: new FXSignal()
        };
        this._color = new Color();
    }
    // *********************************************************************************************
    // * Public																	                                        				   *
    // *********************************************************************************************
    init(emitter, settings, scaleMod) {
        const component = this.component;
        const fx = this.__fx;
        this.emitter = emitter;
        this.settings = settings;
        const duration = this.duration = Rnd.float(settings.durationMin, settings.durationMax) * scaleMod;
        this._dt = 1 / this.duration;
        this.time = 0;
        this.__recycled = false;
        settings.addOnTop ? emitter.container.addChild(component) : emitter.container.addChildAt(component, 0);
        component.blendMode = fx.__getBlendMode(settings.blendMode);
        this.startX = component.x;
        this.startY = component.y;
        this.useGravity = emitter.settings.useGravity;
        this.useScale = settings.useScale;
        this.useRotation = settings.useRotation;
        this.useAlpha = settings.useAlpha;
        this.useTint = settings.useTint;
        this.useSpawns = settings.useSpawns;
        this.useChilds = settings.useChilds;
        this.useMotion = settings.useMotion;
        if (this.useGravity) {
            this.gravity = emitter.settings.gravity;
            this.useFloor = emitter.settings.useFloor;
            this.floorY = emitter.settings.floorY;
            this.bounceFac = Rnd.float(settings.bounceFacMin, settings.bounceFacMax) * scaleMod;
            this.friction = 1 - Rnd.float(settings.frictionMin, settings.frictionMax) * scaleMod;
            this._spawnOnBounce = settings.spawn.onBounce.length > 0;
            this.useAlign = settings.align;
            if (settings.useMotion) {
                const speed = Rnd.float(settings.moveSpeedMin, settings.moveSpeedMax);
                this.moveSpeedX = speed * this.dx * scaleMod;
                this.moveSpeedY = speed * this.dy * scaleMod;
            }
            else {
                this.moveSpeedX = this.moveSpeedY = 0;
            }
        }
        else {
            if (settings.useMotion) {
                const d = this.distance = Rnd.integer(settings.distanceMin, settings.distanceMax) * 0.8 * scaleMod;
                this.deltaX = ((component.x + d * this.dx) - this.startX) * 0.8;
                this.deltaY = ((component.y + d * this.dy) - this.startY) * 0.8;
                this.distanceEase = Easing[settings.distanceEase];
                this.useAlign = false;
            }
            else {
                component.x = this.startX;
                component.y = this.startY;
            }
        }
        if (settings.useRotation && settings.randomStartRotation && !this.useAlign) {
            component.rotation = Rnd.float(0, 6.28319);
        }
        if (settings.useAlpha) {
            this.alphaStart = component.alpha = Rnd.float(settings.alphaStartMin, settings.alphaStartMax);
            this.alphaDelta = Rnd.float(settings.alphaEndMin, settings.alphaEndMax) - this.alphaStart;
            this.alphaEase = Easing[settings.alphaEase] || null;
            this.useFadeIn = settings.fadeIn;
            if (settings.fadeIn) {
                this.alphaDuration = duration * (1 - settings.fadeInDurationFac);
                this.fadeInDuration = duration * settings.fadeInDurationFac;
                this.fadeInEase = Easing[settings.fadeInEase || 'easeInSine'];
            }
        }
        if (settings.useScale) {
            this.uniformScale = settings.uniformScale;
            this.useScaleIn = settings.scaleIn;
            if (settings.useScale) {
                this.uniformScale = settings.uniformScale;
                this.scaleEase = Easing[settings.scaleEase];
                if (settings.uniformScale) {
                    this.scaleStart = component.scale.x = component.scale.y = Rnd.float(settings.scaleStartMin, settings.scaleStartMax) * scaleMod;
                    this.scaleDelta = (Rnd.float(settings.scaleEndMin, settings.scaleEndMax) - this.scaleStart) * scaleMod;
                }
                else {
                    this.scaleXStart = component.scale.x = Rnd.float(settings.scaleXStartMin, settings.scaleXStartMax) * scaleMod;
                    this.scaleXDelta = (Rnd.float(settings.scaleXEndMin, settings.scaleXEndMax) - this.scaleXStart) * scaleMod;
                    this.scaleXEase = Easing[settings.scaleXEase];
                    this.scaleYStart = component.scale.y = Rnd.float(settings.scaleYStartMin, settings.scaleYStartMax) * scaleMod;
                    this.scaleYDelta = (Rnd.float(settings.scaleYEndMin, settings.scaleYEndMax) - this.scaleYStart) * scaleMod;
                    this.scaleYEase = Easing[settings.scaleYEase];
                }
                if (settings.scaleIn) {
                    this.scaleDuration = duration * (1 - settings.scaleInDurationFac);
                    this.scaleInDuration = duration * settings.scaleInDurationFac;
                    this.scaleInEase = Easing[settings.scaleInEase || 'easeInSine'];
                }
            }
            else {
                if (settings.uniformScale) {
                    component.scale.x = settings.scaleStartMin;
                    component.scale.y = settings.scaleStartMin;
                }
                else {
                    component.scale.x = settings.scaleXStartMin;
                    component.scale.y = settings.scaleYStartMin;
                }
            }
        }
        if (settings.useRotation) {
            this.rotationSpeed = Rnd.float(settings.rotationSpeedMin, settings.rotationSpeedMax) * scaleMod;
            if (settings.randomRotationDirection)
                this.rotationSpeed *= Rnd.sign();
        }
        if (settings.useTint) {
            this.tintEase = Easing[settings.tintEase];
            this._color.setRgb(settings.tintStart, settings.tintEnd);
        }
        if (settings.useChilds) {
            this._childEmitters.length = 0;
            let l = settings.childs.length;
            this._hasChildEmitters = l > 0;
            if (this._childEmitters) {
                while (--l > -1) {
                    const def = settings.childs[l];
                    const em = fx.getParticleEmitterById(def.id);
                    em.init(emitter.container, true, (def.scale || 1) * (scaleMod || 1));
                    if (def.adoptRotation) {
                        em.rotation = component.rotation;
                        em.__adoptRotation = true;
                    }
                    em.__parent = this;
                    this._childEmitters.push(em);
                }
            }
        }
        if (settings.useSpawns) {
            if (settings.spawn.onStart.length > 0) {
                emitter.__subSpawn(this, settings.spawn.onStart);
            }
            this._spawnOnHalfway = settings.spawn.onHalfway.length > 0;
        }
        if (emitter.__on.particleSpawned.__hasCallback) {
            emitter.__on.particleSpawned.dispatch(this);
        }
        return this;
    }
    update(dt) {
        const t = this.time += dt;
        const duration = this.duration;
        if (t >= duration) {
            this.emitter.__removeParticle(this);
            return;
        }
        const component = this.component;
        const mod = t * dt;
        //Motion
        if (this.useGravity) {
            const dt2 = dt / 0.0166666;
            component.x += this.moveSpeedX * dt2;
            component.y += this.moveSpeedY * dt2;
            this.moveSpeedY += this.gravity * dt2;
            if (this.useAlign) {
                component.rotation = Math.atan2(this.moveSpeedY, this.moveSpeedX);
            }
            if (this.useFloor && this.floorY > 0) {
                if (component.y > this.floorY) {
                    component.y = this.floorY;
                    this.moveSpeedY *= -this.bounceFac;
                    this.moveSpeedX *= this.friction;
                    if (this.useSpawns && this._spawnOnBounce) {
                        this.emitter.__subSpawn(this, this.settings.spawn.onBounce);
                    }
                    const emitter = this.emitter;
                    if (emitter.__on.particleBounced.__hasCallback) {
                        emitter.__on.particleBounced.dispatch(this);
                    }
                    if (this.__on.bounced.__hasCallback) {
                        this.__on.bounced.dispatch(this);
                    }
                    if (this.settings.stopOnBounce) {
                        emitter.__removeParticle(this);
                    }
                    return;
                }
            }
        }
        else if (this.useMotion) {
            if (this.distanceEase) {
                component.x = this.distanceEase(t, this.startX, this.deltaX, duration);
                component.y = this.distanceEase(t, this.startY, this.deltaY, duration);
            }
            else {
                component.x = this.deltaX * mod + this.startX;
                component.y = this.deltaY * mod + this.startY;
            }
        }
        //Alpha
        if (this.useAlpha) {
            if (this.useFadeIn) {
                if (t < this.fadeInDuration) {
                    component.alpha = this.fadeInEase(t, 0, this.alphaStart, this.fadeInDuration);
                }
                else {
                    component.alpha = this.alphaEase(t - this.fadeInDuration, this.alphaStart, this.alphaDelta, this.alphaDuration);
                }
            }
            else {
                if (this.alphaEase) {
                    component.alpha = this.alphaEase(t, this.alphaStart, this.alphaDelta, duration);
                }
                else {
                    component.alpha = (this.alphaDelta) * mod + this.alphaStart;
                }
            }
        }
        //Rotation
        if (this.useRotation) {
            component.rotation += this.rotationSpeed;
        }
        //Scale
        if (this.useScale) {
            if (this.uniformScale) {
                if (this.useScaleIn) {
                    if (t < this.scaleInDuration) {
                        component.scale.x = component.scale.y = this.scaleInEase(t, 0, this.scaleStart, this.scaleInDuration);
                    }
                    else {
                        component.scale.x = component.scale.y = this.scaleEase(t - this.scaleInDuration, this.scaleStart, this.scaleDelta, this.scaleDuration);
                    }
                }
                else {
                    if (this.scaleEase) {
                        component.scale.x = this.scaleEase(t, this.scaleStart, this.scaleDelta, duration);
                        component.scale.y = this.scaleEase(t, this.scaleStart, this.scaleDelta, duration);
                    }
                    else {
                        component.scale.x = component.scale.y = this.scaleDelta * mod + this.scaleStart;
                    }
                }
            }
            else {
                if (this.useScaleIn) {
                    if (t < this.scaleInDuration) {
                        component.scale.x = this.scaleInEase(t, 0, this.scaleXStart, this.scaleInDuration);
                        component.scale.y = this.scaleInEase(t, 0, this.scaleYStart, this.scaleInDuration);
                    }
                    else {
                        component.scale.x = this.scaleEase(t - this.scaleInDuration, this.scaleXStart, this.scaleXDelta, this.scaleDuration);
                        component.scale.y = this.scaleEase(t - this.scaleInDuration, this.scaleYStart, this.scaleYDelta, this.scaleDuration);
                    }
                }
                else {
                    if (this.scaleXEase) {
                        component.scale.x = this.scaleXEase(t, this.scaleXStart, this.scaleXDelta, duration);
                    }
                    else {
                        component.scale.x = this.scaleXDelta * mod + this.scaleXStart;
                    }
                    if (this.scaleYEase) {
                        component.scale.y = this.scaleYEase(t, this.scaleYStart, this.scaleYDelta, duration);
                    }
                    else {
                        component.scale.y = this.scaleYDelta * mod + this.scaleYStart;
                    }
                }
            }
        }
        //Tint
        if (this.useTint) {
            component.tint = this._color.tween(this.tintEase, t, duration);
        }
        //Spawn t = 0.5
        if (this._spawnOnHalfway) {
            if (t >= 0.5) {
                this._spawnOnHalfway = false;
                this.emitter.__subSpawn(this, this.settings.spawn.onHalfway);
            }
        }
        if (this.useChilds && this._hasChildEmitters) {
            const childs = this._childEmitters;
            let l = childs.length;
            while (--l > -1) {
                const child = childs[l];
                if (child.__recycled)
                    continue;
                child.x = component.position.x;
                child.y = component.position.y;
                if (child.__adoptRotation) {
                    child.rotation = component.rotation;
                }
            }
        }
        if (this.emitter.__on.particleUpdated.__hasCallback) {
            this.emitter.__on.particleUpdated.dispatch(this);
        }
        if (this.__on.updated.__hasCallback) {
            this.__on.updated.dispatch(this);
        }
    }
    stop() {
        this.time = this.duration;
    }
    recycle() {
        if (this.emitter.__on.particleDied.__hasCallback) {
            this.emitter.__on.particleDied.dispatch(this);
        }
        const on = this.__on;
        if (on.died.__hasCallback) {
            on.died.dispatch(this);
            on.died.removeAll();
        }
        if (on.updated.__hasCallback) {
            on.updated.removeAll();
        }
        if (on.bounced.__hasCallback) {
            on.bounced.removeAll();
        }
        if (this._hasChildEmitters) {
            const childs = this._childEmitters;
            let l = childs.length;
            while (--l > -1) {
                childs[l].stop(true);
            }
            this._childEmitters.length = 0;
            this._hasChildEmitters = false;
        }
        this.component.recycle();
        this.__fx.__recycleParticle(this);
        this.dx = this.dy = this.deltaX = this.deltaY = 0;
        this.component = null;
        this.emitter = null;
        this.settings = null;
        this.__recycled = true;
    }
    dispose() {
        this.recycle();
        this.__fx = null;
    }
    get x() {
        return this.component.x;
    }
    get y() {
        return this.component.y;
    }
    get on() {
        return this.__on;
    }
    // *********************************************************************************************
    // * Internal																                                        				   *
    // *********************************************************************************************
    __removeChildEmitter(emitter) {
        const index = this._childEmitters.indexOf(emitter);
        if (index > -1) {
            this._childEmitters.splice(index, 1);
            if (this._childEmitters.length == 0)
                this._hasChildEmitters = false;
        }
    }
}
//# sourceMappingURL=Particle.js.map