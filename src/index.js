(async () => {
    const width = 1200;
    const height = 640;
    const floorY = 590;
    var angle = 0;

    const app = new PIXI.Application();
    const fx = new revolt.FX();
    await app.init({ backgroundColor: '#aabbcc', resizeTo: window });
    document.body.appendChild(app.canvas);

    const stats = new PIXI.Container();

    // app.ticker.add((ticker) => {
    //     //Update the RevoltFX instance
    //     fx.update(ticker.deltaTime);
    //     stats.text = 'Emitters ' + fx.emitterCount + ' / Particles ' + fx.particleCount + ' / ' + Math.round(app.ticker.FPS) + ' FPS';
    // });

    console.log("app: ", app);
    console.log("ticker: ", app.ticker);
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
    var debug = new PIXI.Graphics();
    app.stage.addChild(container);
    app.stage.addChild(debug);

    PIXI.Assets.add({ alias: 'fx_settings', src: 'assets/default-bundle.json' });
    PIXI.Assets.add({ alias: 'fx_spritesheet', src: 'assets/revoltfx-spritesheet.json' });
    PIXI.Assets.add({ alias: 'example_spritesheet', src: 'assets/rfx-examples.json' });

    const data = PIXI.Assets.load(['fx_settings', 'fx_spritesheet', 'example_spritesheet']).then(function (data) {
        //Init the bundle
        fx.initBundle(data.fx_settings);
        fx.maxParticles = 10000;
        fx.setFloorY(floorY);

        app.ticker.add(function () {
            //Update the RevoltFX instance
            fx.update();
        });
        const buttonCircle = document.getElementById('button');
        buttonCircle.addEventListener("mouseup", (e) => {
            const emitter = fx.getParticleEmitter('fire-arc');
            console.log("emitter: ", emitter); //=> data is nulls

            emitter.init(container);
            emitter.x = 400;
            emitter.y = 400;
            emitter.rotation = Math.PI;
            emitter.start();
            console.log("_particles: ", emitter._particles); //=>nulls


            emitter.settings.autoRotation = false;
            emitter.init(container);
            angle = 0;
            update();


            main.app.ticker.add(update, this);
            // app.ticker.add(function (delta) {
            //     //Update the RevoltFX instance
            //     fx.update(delta);
            //     console.log("update count: ", emitter._particleCount); //=>nulls

            // });

            emitter.on.started.add(emitter => {
                console.log('emitter-one-start', emitter.particles);
            });



            //Register for a particle spawned signal (event)
            emitter.on.particleSpawned.add(particle => {
                //console.log('particle: ', particle);

                drawDot(particle.x, particle.y, 20, 0x00ff00);

                //Register for an update signal for that particle
                particle.on.updated.add(function (particle) {
                    drawDot(particle.x, particle.y, 5, 0x00ff00);
                });

                //Register for a died signal for that particle
                particle.on.died.add(function (particle) {
                    drawDot(particle.x, particle.y, 15, 0xff0000);
                });
            });

            emitter.on.completed.addOnce(function (emitter) {
                console.log('Done');
            });
            function update() {
                angle += 0.004;
                emitter.x = main.width * 0.5 + Math.cos(angle) * 300;
                emitter.y = main.height * 0.5 + Math.sin(angle * 2) * 200;
                emitter.rotation = Math.sin(angle) * 20;
            }
        

        });

    });


    //Load bundle files and the additional example spritesheet
    // await fx.loadBundleFiles(rfxBundleSettings, rfxSpritesheet, null, null).then(function (data) {

    //     // var logo = PIXI.Sprite.from('./images/Bubbles99.png');
    //     // logo.anchor.set(0.5);
    //     // logo.alpha = 0.6;
    //     // content.addChild(logo);
    //     const buttonCircle = document.getElementById('button');
    //     buttonCircle.addEventListener("mouseup", (e) => {
    //         const emitter = fx.getParticleEmitter('circle-glow');
    //         console.log("emitter: ", emitter); //=> data is nulls

    //         emitter.init(container);
    //         emitter.x = 100;
    //         emitter.y = 100;
    //         emitter.rotation = Math.PI;
    //         emitter.start();
    //         console.log("_particles: ", emitter._particles); //=>nulls
    //         app.ticker.add(function (delta) {
    //             //Update the RevoltFX instance
    //             fx.update(delta);
    //             console.log("update count: ", emitter._particleCount); //=>nulls

    //         });

    //         emitter.on.started.add(emitter => {
    //             console.log('emitter-one-start', emitter.particles);
    //         });



    //         //Register for a particle spawned signal (event)
    //         emitter.on.particleSpawned.add(particle => {
    //             console.log('particle: ', particle);

    //             drawDot(particle.x, particle.y, 20, 0x00ff00);

    //             //Register for an update signal for that particle
    //             particle.on.updated.add(function (particle) {
    //                 drawDot(particle.x, particle.y, 5, 0x00ff00);
    //             });

    //             //Register for a died signal for that particle
    //             particle.on.died.add(function (particle) {
    //                 drawDot(particle.x, particle.y, 15, 0xff0000);
    //             });
    //         });

    //         emitter.on.completed.addOnce(function (emitter) {
    //             console.log('Done');
    //         });

    //     });



    // }).catch(function (err) {
    //     console.log('Error', err);
    // });



    function drawDot(x, y, size, color) {
        debug.beginFill(color, 0.2).drawCircle(x, y, size).endFill();
    }
    //Inititialize it with the target PIXI container

})();