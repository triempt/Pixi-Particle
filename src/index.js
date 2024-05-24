(async () => {
    // create Pixi app
    const app = new PIXI.Application();
    await app.init({ backgroundColor: 0x000000, width: 1024, height: 768 });
    document.body.appendChild(app.canvas);
    let container = new PIXI.Container();
    // starting emitter
    await PIXI.Assets.load('./images/T_Sparkle.png');
    const emitter = new PIXI.particles.Emitter(app.stage, createEmitterConfig());
    PIXI.Ticker.shared.maxFPS = 60;
    (function play() { emitter.playOnce(play); })();

    // emmiter configuration
    function createEmitterConfig() {
        const pos = { x: 487, y: 479 };
        const colour = '0x0F22D4';
        const duration = 5; //seconds

        return {
            // Particle properties
            lifetime: { min: 0.5, max: 1.5 }, // Lifetime range
            frequency: 0.001, // Emission frequency
            maxParticles: 200, // Maximum particles
            emitterLifetime: duration, // Emitter lifetime
            addAtBack: false, // Add particles at back
            autoUpdate: true, // Auto-update
            emit: false, // Start emitting
            pos, // Position
            behaviors: [
                // Particle behaviors
                { type: 'alpha', config: { alpha: { list: [{ value: 1, time: 0 }, { value: 0.5, time: 0.8 }, { value: 0.1, time: 1 }] } } }, // Alpha
                { type: 'scale', config: { scale: { list: [{ value: 0.1, time: 0 }, { value: 1, time: 1 }] } } }, // Scale
                { type: 'color', config: { color: { list: [{ value: '#ffffff', time: 0.3 }, { value: colour, time: 1 }] } } }, // Color
                { type: 'moveSpeed', config: { speed: { list: [{ value: 20, time: 0 }, { value: 300, time: 1 }], isStepped: false }, minMult: 0.2 } }, // Movement speed
                { type: 'rotationStatic', config: { min: -110, max: -70 } }, // Rotation
                { type: 'textureSingle', config: { texture: PIXI.Texture.from('./images/T_Sparkle.png') } }, // Texture
            ],
        };
    }
})();