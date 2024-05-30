/// <reference types="pixi.js" />

import { FX } from "./FX";
import * as PIXI from 'pixi.js';

export class Sprite extends PIXI.Sprite {

    public __sequenceEndTime: number;
    public __fx: FX;

    constructor(public componentId: string, texture: string, anchorX?: number, anchorY?: number) {
        super(PIXI.Texture.from(texture));
        this.anchor.set(anchorX || 0.5, anchorY || 0.5);
        this.__sequenceEndTime = null;
    }

    // *********************************************************************************************
    // * Public										                                        											   *
    // *********************************************************************************************
    public recycle() {
        this.tint = 0xffffff;
        this.alpha = 1;
        this.rotation = 0;
        this.scale.set(1);
        if (this.parent) this.parent.removeChild(this);
        this.__fx.__recycleSprite(this.componentId, this);
    }

    public dispose() {
        this.__fx = null;
        this.recycle();
        // @ts-ignore
        this.destroy(false);
    }

    // *********************************************************************************************
    // * Private																		                                        		   *
    // *********************************************************************************************

    // *********************************************************************************************
    // * Events			                                        																		   *
    // *********************************************************************************************

}
