
const fx = new revolt.FX();
const app = new PIXI.Application();

var width = 1200;
var height = 640;

await app.init({ backgroundColor: '#000000', width, height });
document.getElementById('canvas').appendChild(app.canvas);
//Load the assets using PIXI Assets loader
// PIXI.Assets.add({ alias: 'fx_settings', src: './assets/circle/CircleFX.json' });
// PIXI.Assets.add({ alias: 'fx_spritesheet', src: './assets/circle/textpacker.json' });
// PIXI.Assets.add({ alias: 'example_spritesheet', src: './assets/circle/textpacker.png' });

// PIXI.Assets.load(['fx_settings', 'fx_spritesheet']).then(function (data) {
//     //Init the bundle
//     fx.initBundle(data.fx_settings);

//     app.ticker.add(function () {
//         //Update the RevoltFX instance
//         fx.update();
//     });

// });
const rfxBundleSettings = './assets/circle/CircleFX.json';
const rfxSpritesheet = './assets/circle/textpacker.json';
const additionalAssets = ['assets/rfx-examples.json'];
// let sprite = PIXI.Sprite.from('./images/Bubbles99.png');
// const logo = await PIXI.Sprite.from('./images/Bubbles99.png');
app.ticker = new PIXI.Ticker();
console.log("ticker: ", app.ticker);
//Load bundle files and the additional example spritesheet
await fx.loadBundleFiles(rfxBundleSettings, rfxSpritesheet, null, null).then(function (data) {

    var content = new PIXI.Container();
    content.x = width * 0.5;
    content.y = height * 0.5;
    app.stage.addChild(content);

    // var logo = sprite;
    // logo.anchor.set(0.5);
    // logo.alpha = 0.6;
    // content.addChild(logo);

    const emitter = fx.getParticleEmitter('circle-glow');
    emitter.x = 100;
    emitter.y = 100;
    emitter.rotation = Math.PI;
    emitter.on.started.add(emitter => { console.log("start fx: ", emitter) });
    emitter.init(content);


    app.ticker.add(function () {
        //Update the RevoltFX instance
        fx.update();
    });

}).catch(function (err) {
    console.log('Error', err);
});


//Inititialize it with the target PIXI container

