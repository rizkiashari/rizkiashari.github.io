let checker = {
  Windows: function Windows() {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function any() {
    return checker.Windows();
  },
};

let isMobile = checker.any();

document.addEventListener(
  "DOMContentLoaded",
  () => {
    // document.getElementById("btn").style.margin = "10px 3%";
    // document.getElementById("btn").style.width = "94%";
    // document.getElementById("btn").style.height = "10vh";
    // document.getElementById("btn").style.opacity = "0.4";
    // document.getElementById("btn").style.fontSize = "50px";
  },
  false
);

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onResize, false);
if (!isMobile) {
  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mouseup", onMouseUp, false);
  window.addEventListener("mousemove", mouseMove, false);
} else {
  window.addEventListener("touchstart", touchStart);
  window.addEventListener("touchmove", touchMove);
  window.addEventListener("touchend", touchEnd);
}
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x555588);
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 80;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.body.appendChild(renderer.domElement);

const controls = new THREE.TrackballControls(camera, renderer.domElement);
if (isMobile) controls.rotateSpeed = 1;
else controls.rotateSpeed = 4.0;

controls.zoomSpeed = 1.2;
controls.minDistance = 100;
controls.maxDistance = 400;
controls.noZoom = false;
controls.noPan = false;

controls.keys = [65, 83, 68];
controls.mouseButtons = { LEFT: 0, RIGHT: 2 };
controls.noPan = true;

camera.position.set(50, 50, 50);

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
//Create a SpotLight and turn on shadows for the light
const lightDimension = 500;
const light = new THREE.AmbientLight(0xdddddd, 0.5); // soft white light
scene.add(light);

const light1 = new THREE.SpotLight(0xffffff, 0.5);
light1.castShadow = true; // default false
scene.add(light1);

//Set up shadow properties for the light
light1.shadow.mapSize.width = 512; // default
light1.shadow.mapSize.height = 512; // default
light1.shadow.camera.near = 0.5; // default
light1.shadow.camera.far = 500; // default
light1.position.set(lightDimension, lightDimension, lightDimension);

const light2 = new THREE.SpotLight(0xffffff, 0.5);
light2.castShadow = true; // default false
scene.add(light2);

//Set up shadow properties for the light
light2.shadow.mapSize.width = 512; // default
light2.shadow.mapSize.height = 512; // default
light2.shadow.camera.near = 0.5; // default
light2.shadow.camera.far = 500; // default
light2.position.set(lightDimension, lightDimension, -lightDimension);

const light3 = new THREE.SpotLight(0xffffff, 0.5);
light3.castShadow = true; // default false
scene.add(light3);

//Set up shadow properties for the light
light3.shadow.mapSize.width = 512; // default
light3.shadow.mapSize.height = 512; // default
light3.shadow.camera.near = 0.5; // default
light3.shadow.camera.far = 500; // default
light3.position.set(lightDimension, -lightDimension, lightDimension);

const light4 = new THREE.SpotLight(0xffffff, 0.5);
light4.castShadow = true; // default false
scene.add(light4);

//Set up shadow properties for the light
light4.shadow.mapSize.width = 512; // default
light4.shadow.mapSize.height = 512; // default
light4.shadow.camera.near = 0.5; // default
light4.shadow.camera.far = 500; // default
light4.position.set(lightDimension, -lightDimension, -lightDimension);

const light5 = new THREE.SpotLight(0xffffff, 0.5);
light5.castShadow = true; // default false
scene.add(light5);

//Set up shadow properties for the light
light5.shadow.mapSize.width = 512; // default
light5.shadow.mapSize.height = 512; // default
light5.shadow.camera.near = 0.5; // default
light5.shadow.camera.far = 500; // default
light5.position.set(-lightDimension, -lightDimension, lightDimension);

//  Click event handler

let dragStart;
let dragEnd;
let currentPlane;
let currentSign;
let currentCoordinates;

function onMouseDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length) {
    controls.enabled = false;
    dragStart = intersects[0].point;
  } else {
    dragStart = undefined;
  }

  if (intersects.length) {
    const block = intersects[0];
    const { x, y, z } = block.point;
    const max = Math.max(Math.abs(x), Math.abs(y), Math.abs(z));
    const plane = [Math.abs(x), Math.abs(y), Math.abs(z)]
      .map((e) => e < max)
      .reduce((a, e, i) => (e ? a + i : a), "")
      .split("")
      .map((e) => "xyz"[e])
      .join("");
    let dir = "xyz";
    plane.split("").forEach((e) => (dir = dir.split(e).join("")));
    const sign = block.point[dir] < 0 ? -1 : 1;
    const coord = cube.get3DCoordinatesOfPiece(block.object.parent);

    currentPlane = plane;
    currentSign = sign;
    currentCoordinates = coord;
  }
}

function touchStart(event) {
  mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length) {
    controls.enabled = false;
    dragStart = intersects[0].point;
  } else {
    dragStart = undefined;
  }

  if (intersects.length) {
    controls.enabled = false;
    const block = intersects[0];
    const { x, y, z } = block.point;
    const max = Math.max(Math.abs(x), Math.abs(y), Math.abs(z));
    const plane = [Math.abs(x), Math.abs(y), Math.abs(z)]
      .map((e) => e < max)
      .reduce((a, e, i) => (e ? a + i : a), "")
      .split("")
      .map((e) => "xyz"[e])
      .join("");
    let dir = "xyz";
    plane.split("").forEach((e) => (dir = dir.split(e).join("")));
    const sign = block.point[dir] < 0 ? -1 : 1;
    const coord = cube.get3DCoordinatesOfPiece(block.object.parent);

    currentPlane = plane;
    currentSign = sign;
    currentCoordinates = coord;
  } else {
    controls.enabled = true;
  }
}

function onMouseUp(event) {
  if (dragStart && dragEnd) {
    const dx = dragEnd.x - dragStart.x;
    const dy = dragEnd.y - dragStart.y;
    const dz = dragEnd.z - dragStart.z;
    let dir;

    let rotationAxis;
    let rotationIndex;
    let rotationDirection;

    switch (currentPlane) {
      case "xy":
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) dir = "L";
          else dir = "R";
        } else {
          if (dy < 0) dir = "D";
          else dir = "U";
        }

        if (dir === "R" || dir === "L") {
          rotationAxis = "y";
          rotationIndex = currentCoordinates.y;
          rotationDirection = dir === "L" ? "anti" : "clockwise";
        } else {
          rotationAxis = "x";
          rotationIndex = currentCoordinates.x;
          rotationDirection = dir === "U" ? "anti" : "clockwise";
        }
        break;
      case "yz":
        if (Math.abs(dy) > Math.abs(dz)) {
          if (dy < 0) dir = "D";
          else dir = "U";
        } else {
          if (dz < 0) dir = "L";
          else dir = "R";
        }

        if (dir === "R" || dir === "L") {
          rotationAxis = "y";
          rotationIndex = currentCoordinates.y;
          rotationDirection = dir === "R" ? "anti" : "clockwise";
        } else {
          rotationAxis = "z";
          rotationIndex = currentCoordinates.z;
          rotationDirection = dir === "D" ? "anti" : "clockwise";
        }
        break;
      case "xz":
        if (Math.abs(dx) > Math.abs(dz)) {
          if (dx < 0) dir = "L";
          else dir = "R";
        } else {
          if (dz < 0) dir = "U";
          else dir = "D";
        }

        if (dir === "R" || dir === "L") {
          rotationAxis = "z";
          rotationIndex = currentCoordinates.z;
          rotationDirection = dir === "R" ? "anti" : "clockwise";
        } else {
          rotationAxis = "x";
          rotationIndex = currentCoordinates.x;
          rotationDirection = dir === "U" ? "anti" : "clockwise";
        }
        break;
    }
    if (currentSign === -1) {
      rotationDirection =
        rotationDirection == "clockwise" ? "anti" : "clockwise";
    }
    if (!cube.shuffling) {
      cube.rotateSclice(rotationAxis, rotationIndex, rotationDirection);
      setTimeout(() => {
        if (cube.checkGameStatus()) cube.showCongrats();
      }, 500);
    }
  }
  dragStart = undefined;
  dragEnd = undefined;
}

function touchEnd(event) {
  if (dragStart && dragEnd) {
    const dx = dragEnd.x - dragStart.x;
    const dy = dragEnd.y - dragStart.y;
    const dz = dragEnd.z - dragStart.z;
    let dir;

    let rotationAxis;
    let rotationIndex;
    let rotationDirection;

    switch (currentPlane) {
      case "xy":
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) dir = "L";
          else dir = "R";
        } else {
          if (dy < 0) dir = "D";
          else dir = "U";
        }

        if (dir === "R" || dir === "L") {
          rotationAxis = "y";
          rotationIndex = currentCoordinates.y;
          rotationDirection = dir === "L" ? "anti" : "clockwise";
        } else {
          rotationAxis = "x";
          rotationIndex = currentCoordinates.x;
          rotationDirection = dir === "U" ? "anti" : "clockwise";
        }
        break;
      case "yz":
        if (Math.abs(dy) > Math.abs(dz)) {
          if (dy < 0) dir = "D";
          else dir = "U";
        } else {
          if (dz < 0) dir = "L";
          else dir = "R";
        }

        if (dir === "R" || dir === "L") {
          rotationAxis = "y";
          rotationIndex = currentCoordinates.y;
          rotationDirection = dir === "R" ? "anti" : "clockwise";
        } else {
          rotationAxis = "z";
          rotationIndex = currentCoordinates.z;
          rotationDirection = dir === "D" ? "anti" : "clockwise";
        }
        break;
      case "xz":
        if (Math.abs(dx) > Math.abs(dz)) {
          if (dx < 0) dir = "L";
          else dir = "R";
        } else {
          if (dz < 0) dir = "U";
          else dir = "D";
        }

        if (dir === "R" || dir === "L") {
          rotationAxis = "z";
          rotationIndex = currentCoordinates.z;
          rotationDirection = dir === "R" ? "anti" : "clockwise";
        } else {
          rotationAxis = "x";
          rotationIndex = currentCoordinates.x;
          rotationDirection = dir === "U" ? "anti" : "clockwise";
        }
        break;
    }
    if (currentSign === -1) {
      rotationDirection =
        rotationDirection == "clockwise" ? "anti" : "clockwise";
    }
    if (!cube.shuffling) {
      cube.rotateSclice(rotationAxis, rotationIndex, rotationDirection);
      setTimeout(() => {
        if (cube.checkGameStatus()) cube.showCongrats();
      }, 500);
    }
  }
  dragStart = undefined;
  dragEnd = undefined;
}

let mouseEventQuata = 0;
let mouseEventLimit = mouseEventQuata;

function mouseMove(event) {
  if (mouseEventLimit < 0 || dragStart) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length == 0) {
      if (!isMobile) controls.enabled = true;
    } else {
      dragEnd = intersects[0].point;
      controls.enabled = false;
    }
    mouseEventLimit = mouseEventQuata;
  }
  mouseEventLimit--;
}

function touchMove(event) {
  if (mouseEventLimit < 0 || dragStart) {
    mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length) {
      dragEnd = intersects[0].point;
      controls.enabled = false;
    }
    mouseEventLimit = mouseEventQuata;
  }
  mouseEventLimit--;
}

const animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();
