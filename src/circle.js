let circleTex = "./images/circle.png";

let circlePart1 = new ParticleExample(
    // The image to use
    [circleTex],
    {
        "alpha": {
            "start": 0.3,
            "end": 0
        },
        "scale": {
            "start": .01,
            "end": .02,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#3fcbff",
            "end": "#3fcbff"
        },
        "speed": {
            "start": 0,
            "end": 0,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 360
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.2,
            "max": 0.8
        },
        "blendMode": "normal",
        "frequency": 0.001,
        "emitterLifetime": 0.1,
        "maxParticles": 2,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "point"
    }
);
let circlePart2 = new ParticleExample(
    // The image to use
    [circleTex],
    {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 1,
            "end": 2,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#3fcbff",
            "end": "#3fcbff"
        },
        "speed": {
            "start": 0,
            "end": 0,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 360
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.2,
            "max": 0.8
        },
        "blendMode": "normal",
        "frequency": 0.001,
        "emitterLifetime": 0.1,
        "maxParticles": 2,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "point"
    }
);