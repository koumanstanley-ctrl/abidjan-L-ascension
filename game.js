/* =====================================================
   ABIDJAN : L'ASCENSION
   STALAY GAMES
   VERSION 0.2
===================================================== */


/* =====================================================
   VARIABLES
===================================================== */

let money = 10000;

let reputation = 0;

let vehicles = 0;

let businesses = 0;


/* =====================================================
   SCÈNE
===================================================== */

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x79c8ed);


/* =====================================================
   CAMÉRA
===================================================== */

const camera =
    new THREE.PerspectiveCamera(

        60,

        window.innerWidth /
        window.innerHeight,

        0.1,

        500
    );


camera.position.set(
    0,
    8,
    13
);


/* =====================================================
   RENDERER
===================================================== */

const renderer =
    new THREE.WebGLRenderer({

        antialias: true

    });


renderer.setSize(

    window.innerWidth,

    window.innerHeight
);


renderer.setPixelRatio(

    Math.min(
        window.devicePixelRatio,
        1.7
    )
);


renderer.shadowMap.enabled =
    true;


renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;


document
    .getElementById("game")
    .appendChild(renderer.domElement);


/* =====================================================
   LUMIÈRES
===================================================== */

const skyLight =
    new THREE.HemisphereLight(

        0xffffff,

        0x446644,

        1.6
    );


scene.add(skyLight);


const sun =
    new THREE.DirectionalLight(

        0xffffff,

        2.2
    );


sun.position.set(

    30,
    50,
    20
);


sun.castShadow = true;


sun.shadow.mapSize.width =
    1024;

sun.shadow.mapSize.height =
    1024;


scene.add(sun);


/* =====================================================
   SOL
===================================================== */

const ground =
    new THREE.Mesh(

        new THREE.PlaneGeometry(
            120,
            120
        ),

        new THREE.MeshStandardMaterial({

            color: 0x5f8f55

        })
    );


ground.rotation.x =
    -Math.PI / 2;


ground.receiveShadow =
    true;


scene.add(ground);


/* =====================================================
   ROUTE
===================================================== */

function createRoad(

    x,
    z,
    width,
    depth

) {

    const road =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                width,
                0.12,
                depth

            ),

            new THREE.MeshStandardMaterial({

                color: 0x303238

            })
        );


    road.position.set(

        x,
        0.06,
        z

    );


    road.receiveShadow =
        true;


    scene.add(road);
}


createRoad(

    0,
    0,
    16,
    110
);


/* =====================================================
   TROTTOIRS
===================================================== */

function createSidewalk(x) {

    const sidewalk =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                3,
                0.18,
                110

            ),

            new THREE.MeshStandardMaterial({

                color: 0xb5a990

            })
        );


    sidewalk.position.set(

        x,
        0.09,
        0

    );


    scene.add(sidewalk);
}


createSidewalk(-9.5);

createSidewalk(9.5);


/* =====================================================
   MARQUAGES
===================================================== */

for (

    let z = -52;

    z < 55;

    z += 7

) {

    const line =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                0.25,
                0.03,
                3

            ),

            new THREE.MeshStandardMaterial({

                color: 0xffffff

            })
        );


    line.position.set(

        0,
        0.13,
        z

    );


    scene.add(line);
}


/* =====================================================
   BÂTIMENTS
===================================================== */

function createBuilding(

    x,
    z,
    width,
    depth,
    height,
    color,
    label

) {

    const building =
        new THREE.Group();


    /* MURS */

    const walls =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                width,
                height,
                depth

            ),

            new THREE.MeshStandardMaterial({

                color: color

            })
        );


    walls.position.y =
        height / 2;


    walls.castShadow =
        true;


    walls.receiveShadow =
        true;


    building.add(walls);


    /* TOIT */

    const roof =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                width + 0.5,
                0.45,
                depth + 0.5

            ),

            new THREE.MeshStandardMaterial({

                color: 0x873d28

            })
        );


    roof.position.y =
        height + 0.2;


    roof.castShadow =
        true;


    building.add(roof);


    /* PORTE */

    const door =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                1.6,
                2.7,
                0.12

            ),

            new THREE.MeshStandardMaterial({

                color: 0x57351f

            })
        );


    door.position.set(

        0,
        1.35,
        depth / 2 + 0.07

    );


    building.add(door);


    /* POIGNÉE */

    const handle =
        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.08,
                8,
                8

            ),

            new THREE.MeshStandardMaterial({

                color: 0xffd166

            })
        );


    handle.position.set(

        0.45,
        1.4,
        depth / 2 + 0.15

    );


    building.add(handle);


    /* FENÊTRES */

    for (

        let px =
            -width / 2 + 1.5;

        px <
            width / 2;

        px += 2.5

    ) {

        const windowMesh =
            new THREE.Mesh(

                new THREE.BoxGeometry(

                    1.25,
                    1.25,
                    0.1

                ),

                new THREE.MeshStandardMaterial({

                    color: 0x73c9e8,

                    metalness: 0.2,

                    roughness: 0.25

                })
            );


        windowMesh.position.set(

            px,
            height * 0.62,
            depth / 2 + 0.08

        );


        building.add(windowMesh);
    }


    /* ENSEIGNE */

    const sign =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                Math.min(

                    width - 1,

                    6

                ),

                0.7,
                0.12

            ),

            new THREE.MeshStandardMaterial({

                color: 0xffb000

            })
        );


    sign.position.set(

        0,
        height * 0.86,
        depth / 2 + 0.1

    );


    building.add(sign);


    building.position.set(

        x,
        0,
        z

    );


    scene.add(building);


    return building;
}


/* =====================================================
   VILLE
===================================================== */

createBuilding(

    -16,
    -12,
    8,
    8,
    7,
    0xe6a65c,
    "Commerce"

);


const shop =
    createBuilding(

        16,
        -20,
        9,
        8,
        6,
        0x23a66f,
        "Boutique"

    );


createBuilding(

    -17,
    12,
    9,
    8,
    10,
    0x4d83c5,
    "Immeuble"

);


createBuilding(

    17,
    10,
    8,
    8,
    8,
    0xd85f55,
    "Maison"

);


createBuilding(

    -16,
    32,
    9,
    9,
    9,
    0xd7d0c4,
    "Maison"

);


createBuilding(

    17,
    32,
    10,
    8,
    12,
    0x8f70b8,
    "Immeuble"

);


/* =====================================================
   ARBRES
===================================================== */

function createTree(x, z) {

    const tree =
        new THREE.Group();


    const trunk =
        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.28,
                0.35,
                2.2,
                8

            ),

            new THREE.MeshStandardMaterial({

                color: 0x71432c

            })
        );


    trunk.position.y =
        1.1;


    tree.add(trunk);


    const leaves =
        new THREE.Mesh(

            new THREE.SphereGeometry(

                1.6,
                10,
                10

            ),

            new THREE.MeshStandardMaterial({

                color: 0x207a38

            })
        );


    leaves.position.y =
        3;


    leaves.castShadow =
        true;


    tree.add(leaves);


    tree.position.set(

        x,
        0,
        z

    );


    scene.add(tree);
}


const treePositions = [

    [-13, -38],
    [13, -38],
    [-13, -2],
    [13, 5],
    [-13, 23],
    [13, 25],
    [-25, 5],
    [25, -5]

];


treePositions.forEach(

    position => {

        createTree(

            position[0],
            position[1]

        );

    }
);


/* =====================================================
   JOUEUR
===================================================== */

const player =
    new THREE.Group();


/* jambes */

function createPart(

    geometry,
    color

) {

    const part =
        new THREE.Mesh(

            geometry,

            new THREE.MeshStandardMaterial({

                color: color

            })
        );


    part.castShadow =
        true;


    return part;
}


const legLeft =
    createPart(

        new THREE.CylinderGeometry(

            0.18,
            0.2,
            1.4,
            8

        ),

        0x202633
    );


legLeft.position.set(

    -0.25,
    0.7,
    0

);


player.add(legLeft);


const legRight =
    createPart(

        new THREE.CylinderGeometry(

            0.18,
            0.2,
            1.4,
            8

        ),

        0x202633

    );


legRight.position.set(

    0.25,
    0.7,
    0

);


player.add(legRight);


/* corps */

const body =
    createPart(

        new THREE.CylinderGeometry(

            0.48,
            0.55,
            1.45,
            10

        ),

        0x1769aa

    );


body.position.y =
    1.9;


player.add(body);


/* tête */

const head =
    createPart(

        new THREE.SphereGeometry(

            0.48,
            16,
            16

        ),

        0x8b5a3c

    );


head.position.y =
    3;


player.add(head);


/* cheveux */

const hair =
    createPart(

        new THREE.SphereGeometry(

            0.49,
            16,
            8

        ),

        0x171717

    );


hair.scale.y =
    0.5;


hair.position.y =
    3.32;


player.add(hair);


/* bras */

const armLeft =
    createPart(

        new THREE.CylinderGeometry(

            0.14,
            0.16,
            1.15,
            8

        ),

        0x8b5a3c

    );


armLeft.rotation.z =
    -0.25;


armLeft.position.set(

    -0.62,
    1.95,
    0

);


player.add(armLeft);


const armRight =
    createPart(

        new THREE.CylinderGeometry(

            0.14,
            0.16,
            1.15,
            8

        ),

        0x8b5a3c

    );


armRight.rotation.z =
    0.25;


armRight.position.set(

    0.62,
    1.95,
    0

);


player.add(armRight);


player.position.set(

    0,
    0,
    30

);


scene.add(player);


/* =====================================================
   PNJ
===================================================== */

function createNPC(

    x,
    z,
    shirt

) {

    const npc =
        new THREE.Group();


    const body =
        createPart(

            new THREE.CylinderGeometry(

                0.4,
                0.48,
                1.3,
                8

            ),

            shirt

        );


    body.position.y =
        1.7;


    npc.add(body);


    const head =
        createPart(

            new THREE.SphereGeometry(

                0.4,
                12,
                12

            ),

            0x7b4b32

        );


    head.position.y =
        2.7;


    npc.add(head);


    npc.position.set(

        x,
        0,
        z

    );


    scene.add(npc);
}


createNPC(

    -5,
    15,
    0xdd4444

);


createNPC(

    6,
    -4,
    0x6b58c9

);


createNPC(

    -6,
    -18,
    0x23a66f

);


/* =====================================================
   VOITURE
===================================================== */

function createCar(

    x,
    z,
    color

) {

    const car =
        new THREE.Group();


    const base =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                3.5,
                0.7,
                1.7

            ),

            new THREE.MeshStandardMaterial({

                color: color

            })

        );


    base.position.y =
        0.7;


    base.castShadow =
        true;


    car.add(base);


    const cabin =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                1.8,
                0.7,
                1.45

            ),

            new THREE.MeshStandardMaterial({

                color: 0x222831

            })

        );


    cabin.position.set(

        -0.1,
        1.3,
        0

    );


    car.add(cabin);


    const wheelPositions = [

        [-1.2, -0.9],
        [-1.2, 0.9],
        [1.2, -0.9],
        [1.2, 0.9]

    ];


    wheelPositions.forEach(

        position => {

            const wheel =
                new THREE.Mesh(

                    new THREE.CylinderGeometry(

                        0.38,
                        0.38,
                        0.25,
                        12

                    ),

                    new THREE.MeshStandardMaterial({

                        color: 0x111111

                    })

                );


            wheel.rotation.z =
                Math.PI / 2;


            wheel.position.set(

                position[0],
                0.45,
                position[1]

            );


            car.add(wheel);

        }
    );


    car.position.set(

        x,
        0,
        z

    );


    scene.add(car);


    return car;
}


const taxi =
    createCar(

        3,
        -10,
        0xf0c419

    );


const car2 =
    createCar(

        -3,
        20,
        0xffffff

    );


/* =====================================================
   HUD
===================================================== */

function updateMoney() {

    document
        .getElementById("money")
        .textContent =
        "💰 " +
        money.toLocaleString("fr-FR") +
        " FCFA";


    document
        .getElementById("phoneMoney")
        .textContent =
        money.toLocaleString("fr-FR");
}


function showMessage(text) {

    const message =
        document
            .getElementById("message");


    message.textContent =
        text;


    message.style.display =
        "block";


    setTimeout(

        () => {

            message.style.display =
                "none";

        },

        2500

    );
}


/* =====================================================
   JOYSTICK
===================================================== */

const joystick =
    document.getElementById(
        "joystick"
    );


const stick =
    document.getElementById(
        "stick"
    );


let joyX = 0;

let joyY = 0;

let touching = false;


function updateJoystick(

    x,
    y

) {

    const rect =
        joystick.getBoundingClientRect();


    let dx =
        x -
        (
            rect.left +
            rect.width / 2
        );


    let dy =
        y -
        (
            rect.top +
            rect.height / 2
        );


    const max =
        38;


    const distance =
        Math.sqrt(

            dx * dx +
            dy * dy

        );


    if (distance > max) {

        dx =
            dx / distance * max;

        dy =
            dy / distance * max;

    }


    stick.style.left =
        37 + dx + "px";


    stick.style.top =
        37 + dy + "px";


    joyX =
        dx / max;


    joyY =
        dy / max;
}


function resetJoystick() {

    touching =
        false;


    joyX =
        0;


    joyY =
        0;


    stick.style.left =
        "37px";


    stick.style.top =
        "37px";
}


joystick.addEventListener(

    "touchstart",

    event => {

        touching =
            true;


        const touch =
            event.touches[0];


        updateJoystick(

            touch.clientX,
            touch.clientY

        );


        event.preventDefault();

    },

    { passive: false }

);


joystick.addEventListener(

    "touchmove",

    event => {

        if (!touching)
            return;


        const touch =
            event.touches[0];


        updateJoystick(

            touch.clientX,
            touch.clientY

        );


        event.preventDefault();

    },

    { passive: false }

);


joystick.addEventListener(

    "touchend",

    resetJoystick

);


/* =====================================================
   DÉPLACEMENT
===================================================== */

function movePlayer() {

    const speed =
        0.13;


    player.position.x +=
        joyX * speed;


    player.position.z +=
        joyY * speed;


    player.position.x =
        THREE.MathUtils.clamp(

            player.position.x,

            -35,
            35

        );


    player.position.z =
        THREE.MathUtils.clamp(

            player.position.z,

            -48,
            48

        );


    if (

        Math.abs(joyX) > 0.1 ||
        Math.abs(joyY) > 0.1

    ) {

        player.rotation.y =
            Math.atan2(

                joyX,
                joyY

            );

    }
}


/* =====================================================
   CAMÉRA
===================================================== */

function updateCamera() {

    camera.position.x +=

        (
            player.position.x -
            camera.position.x

        ) * 0.08;


    camera.position.z +=

        (
            player.position.z +
            11 -
            camera.position.z

        ) * 0.08;


    camera.position.y +=

        (
            8 -
            camera.position.y

        ) * 0.08;


    camera.lookAt(

        player.position.x,
        1.5,
        player.position.z

    );
}


/* =====================================================
   MINI MAP
===================================================== */

function updateMap() {

    const mapPlayer =
        document.getElementById(
            "mapPlayer"
        );


    let x =
        55 +
        player.position.x *
        1.5;


    let z =
        55 +
        player.position.z;


    x =
        THREE.MathUtils.clamp(

            x,
            5,
            105

        );


    z =
        THREE.MathUtils.clamp(

            z,
            5,
            105

        );


    mapPlayer.style.left =
        x + "px";


    mapPlayer.style.top =
        z + "px";
}


/* =====================================================
   MISSION
===================================================== */

document
    .getElementById("actionButton")
    .addEventListener(

        "click",

        () => {

            const distance =
                player.position.distanceTo(

                    shop.position

                );


            if (distance < 8) {

                money +=
                    2500;


                reputation +=
                    1;


                updateMoney();


                document
                    .getElementById(
                        "mission"
                    )
                    .textContent =
                    "🎉 Mission réussie !";


                showMessage(

                    "🔥 +2 500 FCFA"

                );

            } else {

                showMessage(

                    "🏪 Approche-toi du commerce !"

                );

            }

        }
    );


/* =====================================================
   TÉLÉPHONE
===================================================== */

document
    .getElementById("phoneButton")
    .addEventListener(

        "click",

        () => {

            const menu =
                document.getElementById(
                    "phoneMenu"
                );


            if (
                menu.style.display ===
                "block"
            ) {

                menu.style.display =
                    "none";

            } else {

                menu.style.display =
                    "block";

            }


            updateMoney();

        }
    );


/* =====================================================
   BOUCLE DU JEU
===================================================== */

function animate() {

    requestAnimationFrame(
        animate
    );


    movePlayer();


    updateCamera();


    updateMap();


    renderer.render(

        scene,
        camera

    );
}


animate();


/* =====================================================
   REDIMENSIONNEMENT
===================================================== */

window.addEventListener(

    "resize",

    () => {

        camera.aspect =

            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(

            window.innerWidth,
            window.innerHeight

        );

    }
);
