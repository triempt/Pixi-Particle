let particleTex =  "./images/particle.png";
let particleTex2 = "./images/circle.png";

let particle1 = new ParticleExample(
    // The image to use
    [particleTex],
    {
        "lifetime": {
            "min": 0.4,
            "max": 0.7
        },
        "frequency": 0.001,
        "emitterLifetime": 0.2,
        "maxParticles": 100,
        "addAtBack": true,
        "pos": {
            "x": 200,
            "y": 200
        },
        "behaviors": [
            {
                "type": "alpha",
                "config": {
                    "alpha": {
                        "list": [
                            {
                                "time": 0,
                                "value": 0.74
                            },
                            {
                                "time": 1,
                                "value": 0
                            }
                        ]
                    }
                }
            },
            {
                "type": "moveSpeed",
                "config": {
                    "speed": {
                        "list": [
                            {
                                "time": 0,
                                "value": 100
                            },
                            {
                                "time": 1,
                                "value": 50
                            }
                        ]
                    }
                }
            },
            {
                "type": "scale",
                "config": {
                    "scale": {
                        "list": [
                            {
                                "time": 0,
                                "value": 0.1
                            },
                            {
                                "time": 1,
                                "value": .3
                            }
                        ]
                    },
                    "minMult": 1
                }
            },
            {
                "type": "color",
                "config": {
                    "color": {
                        "list": [
                            {
                                "time": 0,
                                "value": "f08cff"
                            },
                            {
                                "time": 1,
                                "value": "575757"
                            }
                        ]
                    }
                }
            },
            {
                "type": "rotation",
                "config": {
                    "accel": 0,
                    "minSpeed": 0,
                    "maxSpeed": 200,
                    "minStart": 0,
                    "maxStart": 360
                }
            },
            {
                "type": "textureRandom",
                "config": {
                    "textures": [
                        particleTex
                    ]
                }
            },
            {
                "type": "spawnPoint",
                "config": {}
            }
        ]
    }
);
let particle2 = new ParticleExample(
    // The image to use
    [particleTex2],
    {
        "lifetime": {
            "min": 0.4,
            "max": 0.7
        },
        "frequency": 0.001,
        "emitterLifetime": 0.2,
        "maxParticles": 100,
        "addAtBack": true,
        "pos": {
            "x": 200,
            "y": 200
        },
        "behaviors": [
            {
                "type": "alpha",
                "config": {
                    "alpha": {
                        "list": [
                            {
                                "time": 0,
                                "value": 0.74
                            },
                            {
                                "time": 1,
                                "value": 0
                            }
                        ]
                    }
                }
            },
            {
                "type": "moveSpeed",
                "config": {
                    "speed": {
                        "list": [
                            {
                                "time": 0,
                                "value": 100
                            },
                            {
                                "time": 1,
                                "value": 50
                            }
                        ]
                    }
                }
            },
            {
                "type": "scale",
                "config": {
                    "scale": {
                        "list": [
                            {
                                "time": 0,
                                "value": 0.1
                            },
                            {
                                "time": 1,
                                "value": .3
                            }
                        ]
                    },
                    "minMult": 1
                }
            },
            {
                "type": "color",
                "config": {
                    "color": {
                        "list": [
                            {
                                "time": 0,
                                "value": "f08cff"
                            },
                            {
                                "time": 1,
                                "value": "575757"
                            }
                        ]
                    }
                }
            },
            {
                "type": "rotation",
                "config": {
                    "accel": 0,
                    "minSpeed": 0,
                    "maxSpeed": 200,
                    "minStart": 0,
                    "maxStart": 360
                }
            },
            {
                "type": "textureRandom",
                "config": {
                    "textures": [
                        particleTex2
                    ]
                }
            },
            {
                "type": "spawnPoint",
                "config": {}
            }
        ]
    }
);