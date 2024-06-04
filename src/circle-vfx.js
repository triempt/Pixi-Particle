(async () => {
    const width = 1200;
    const height = 640;
    const floorY = 590;
    var angle = 0;

    const app = new PIXI.Application();
    const fx = new revolt.FX();
    await app.init({ backgroundColor: '#000000', resizeTo: window });
    document.body.appendChild(app.canvas);

    var resize = function () {
        var w = window.innerWidth - 20;
        var ratio = width / height;

        var h2 = w / ratio;
        var scale = h2 / height;
        app.stage.scale.set(scale);
        app.renderer.resize(w, h2);
    };
    window.addEventListener('resize', resize);
    resize();

    const container = new PIXI.Container();
    app.stage.addChild(container);

    // Debug show dot
    var debug = new PIXI.Graphics();
    app.stage.addChild(debug);

    //Stats infomation
    const statsInfo = document.getElementById('stats');
    app.ticker.add((ticker) => {
        //Update the RevoltFX instance
        fx.update(ticker.deltaTime);
        statsInfo.textContent = 'Emitters ' + fx.emitterCount + ' / Particles ' + fx.particleCount + ' / ' + Math.round(app.ticker.FPS) + ' FPS';
    });

    // Container where particle appear
    const content = new PIXI.Container();
    content.interactive = true;
    content.width = width;
    content.height = height;
    console.log('content width: ', content.width);
    container.addChild(content);


    PIXI.Assets.add({ alias: 'fx_settings', src: 'assets/circle/CircleFX.json' });
    PIXI.Assets.add({ alias: 'fx_spritesheet', src: 'assets/circle/textpacker.json' });
    PIXI.Assets.load(['fx_settings', 'fx_spritesheet']).then(function (data) {
        //Init the bundle
        fx.initBundle(data.fx_settings);
        fx.maxParticles = 10000;
        // fx.setFloorY(floorY);

        app.ticker.add(function () {
            //Update the RevoltFX instance
            fx.update();
        });

        content.on('pointerdown', (e) => {
            console.log("pointerdown"); //=> data is nulls

            const local = e.getLocalPosition(content);
            createRocket(local.x, local.y);
        });

        function printMousePos(event) {
            // document.body.textContent =
            //     "clientX: " + event.clientX +
            //     " - clientY: " + event.clientY;
            createRocket(event.clientX, event.clientY);
        }

        document.addEventListener("click", printMousePos);
        var createRocket = (x, y) => {
            const emitter = fx.getParticleEmitter('circle-glow');
            console.log("emitter: ", emitter); //=> data is nulls

            emitter.init(container);
            emitter.x = x;
            emitter.y = y;
            emitter.rotation = Math.PI;
            emitter.start();
            console.log("_particles: ", emitter._particles); //=>nulls


            emitter.settings.autoRotation = false;
            emitter.init(container);
            angle = 0;

            app.ticker.add(update, app);

            emitter.on.started.add(emitter => {
                console.log('emitter-one-start', emitter.particles);
            });

            //Register for a particle spawned signal (event)
            // emitter.on.particleSpawned.add(particle => {
            //     console.log('particle: ', particle);

            //     drawDot(particle.x, particle.y, 20, 0x00ff00);

            //     //Register for an update signal for that particle
            //     particle.on.updated.add(function (particle) {
            //         drawDot(particle.x, particle.y, 5, 0x00ff00);
            //     });

            //     //Register for a died signal for that particle
            //     particle.on.died.add(function (particle) {
            //         drawDot(particle.x, particle.y, 15, 0xff0000);
            //     });
            // });

            emitter.on.completed.addOnce(function (emitter) {
                console.log('Done');
            });

            function update() {
            }
            function stop() {
                const main = main;

                container.removeChild(content);
                containers.floor.visible = false;

                app.ticker.remove(update, this);

                fx.stopAllEffects();
            }
        }
    });

    function drawDot(x, y, size, color) {
        debug.beginFill(color, 0.2).drawCircle(x, y, size).endFill();
    }

})();