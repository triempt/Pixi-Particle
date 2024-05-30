import circleEmitConfig1 from '../particles/circle1.json'  with { type: "json" };
import circleEmitConfig2 from '../particles/circle2.json'  with { type: "json" };
import circleEmitConfig3 from '../particles/circle3.json'  with { type: "json" };


(async () => {
    // create Pixi app
    const app = new PIXI.Application();
    await app.init({ backgroundColor: '#000000', width: 1024, height: 768 });
    document.body.appendChild(app.canvas);
    let container = new PIXI.Container();
    // starting emitter
    let texture = await PIXI.Assets.load('./images/Sparks.png');
    let fire = await PIXI.Assets.load('./images/Fire.png');
    app.stage.addChild(container);

    let circleTex = await PIXI.Assets.load('./images/circleGradient.png');

    const circleEmit1 = new PIXI.particles.Emitter(container, PIXI.particles.upgradeConfig(circleEmitConfig1, circleTex));
    const circleEmit2 = new PIXI.particles.Emitter(container, PIXI.particles.upgradeConfig(circleEmitConfig2, circleTex));
    const circleEmit3 = new PIXI.particles.Emitter(container, PIXI.particles.upgradeConfig(circleEmitConfig3, circleTex));
    circleEmit1.emit = false;
    circleEmit2.emit = false;
    circleEmit2.emit = false;
    circleEmit3.emit = false;

    const buttonCircle = document.getElementById('buttonCircle');
    buttonCircle.addEventListener("mouseup", (e) => {
        circleEmit1.emit = true;
        circleEmit2.emit = true;
        circleEmit3.emit = true;
    });

    //const framerate = document.getElementById('framerate');
    const particleCount = document.getElementById('particleCount');
    //framerate
    // Calculate the current time
    let elapsed = Date.now();
    let updateId;
    const update = () => {
        // Update the next frame
        updateId = requestAnimationFrame(update);

        const now = Date.now();
        if (circleEmit1) {
            // update emitter (convert to seconds)
            circleEmit1.update((now - elapsed) * 0.001);
            circleEmit2.update((now - elapsed) * 0.001);
            circleEmit3.update((now - elapsed) * 0.001);
        }

        //framerate.innerHTML = `${(1000 / (now - elapsed)).toFixed(2)} fps`;
        elapsed = now;

        if (circleEmit1 && particleCount) {
            particleCount.innerHTML = `${circleEmit1.particleCount} particles`;
        }

        // render the stage
        //app.renderer.render(app.stage);
    };

    update();
})();