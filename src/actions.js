
const keys = {busy:false};
const mouse = {endx:0, endy:0, spanx:0, spany:0};
const trans = {x:0, y:0};

function windowResized() {
  updateAspectRatio();
}

function updateJulia() {
  if (mouseButton != LEFT) return;
  data.consta = (mouseX - WIDTH / 2) / WIDTH * 2;
  data.constb = (mouseY - HEIGHT / 2) / HEIGHT * 2;
}

function mousePressed() {
  if (keys.busy) return;
  mouse.startx = mouseX;
  mouse.starty = mouseY;
  updateJulia();
}

function mouseReleased() {
  if (keys.busy) return;
  trans.x += mouse.spanx;
  trans.y += mouse.spany;
  mouse.spanx = 0;
  mouse.spany = 0;
}

function mouseDragged() {
  if (keys.busy) return;
  updateJulia();
  if (mouseButton != RIGHT) return;
  mouse.spanx = +(mouseX - mouse.startx) / WIDTH * data.zoom;
  mouse.spany = -(mouseY - mouse.starty) / HEIGHT * data.zoom;
  // data.xoff += (mouseX - pmouseX) * data.zoom / WIDTH;
  // data.yoff -= (mouseY - pmouseY) * data.zoom / WIDTH;
}

function mouseWheel(event) {
  const AMT = 0.90;
  changeZoom(AMT, event.delta);
}

function changeZoom(amt = 0.9, delta = 0) {
  let mxo = (mouseX - WIDTH / 2) / WIDTH;
  let myo = -(mouseY - HEIGHT / 2) / HEIGHT;
  if (delta > 0) {
    trans.x += mxo * data.zoom * (1 - amt);
    trans.y += myo * data.zoom * (1 - amt);
    data.zoom /= amt;
  } else {
    data.zoom *= amt;
    trans.x -= mxo * data.zoom * (1 - amt);
    trans.y -= myo * data.zoom * (1 - amt);
  }
}

function keyPressed() {
  keys[key] = true;

  if (key == "c") {
    toggleSettings();
  }
}

function keyReleased() {
  keys[key] = false;
}

function runKeys() {
  if (keys.w) changeZoom(0.95, -1);
  if (keys.s) changeZoom(0.95, +1);
}

function updateData() {
  data.xoff = trans.x + mouse.spanx;
  data.yoff = trans.y + mouse.spany;
}

/*




















*/
