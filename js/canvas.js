'use strict';

const myCanvas = document.getElementById("canvas-bigOval");
myCanvas.width = 470;
myCanvas.height = 470;
const stepsAmount = 100;
const xBigOvl = 235;  // центр большого круга
const yBigOvl = 235;
const space = 12.5;    // зазор между квадратом и кругом
const rBigOvl = xBigOvl - space; // радиус большого круга
const rSmallBlue = 10; // радиус маленького синего шара
const color1 = 'PowderBlue';
//const color2 = 'Pink';
//const colorBigOvl = color1;
const delayFrame = 30;
const innerText1 ='Start Cycle';
const innerText2 ='Start All';
const extCircle = {
  xCenter: xBigOvl,
  yCenter: yBigOvl,
  spaceDown: space,
  radius: rBigOvl,
  colorCircle: '#ffffff',
  cycleNum: 1,
  stepsAmount: 100,
  smallBallColor: 'Blue',
  colorStop1: 'LightBlue',
  colorStop2: 'MidnightBlue',
}
const buttonColor = document.getElementById("ColorBtn");
buttonColor.addEventListener('click', changeColorBigCircle);
const buttonStart = document.getElementById("StartBtn");
buttonStart.addEventListener('click', actionStart);
const buttonStop = document.getElementById('StopBtn');
buttonStop.addEventListener('click', actionStop);
const buttonBall = document.getElementById('colorBall');
buttonBall.addEventListener('click', changeSmallColor);

drawCanvas(extCircle.xCenter, extCircle.yCenter, extCircle.radius, extCircle.colorCircle, myCanvas);
drawSmallBalls4Start();

setTimeout(() => (document.body.style.background = "Tan"), 2000);

function actionStart() {
  buttonStart.disabled = true;
  extCircle.stepsAmount = stepsAmount;
  drawAnimation();

}

async function drawAnimation() {
  let t = 0;
  let str = "";

  if (buttonStart.innerText === innerText1) {
    smallBlueBall[0].iTime2Go = 0;
    smallBlueBall[1].iTime2Go = 10;
    smallBlueBall[2].iTime2Go = 20;
    smallBlueBall[3].iTime2Go = 30;
    smallBlueBall[4].iTime2Go = 40;
    smallBlueBall[5].iTime2Go = 50;
    smallBlueBall[6].iTime2Go = 60;
    smallBlueBall[7].iTime2Go = 70;
  } else {
    smallBlueBall[0].iTime2Go = 0;
    smallBlueBall[1].iTime2Go = 0;
    smallBlueBall[2].iTime2Go = 0;
    smallBlueBall[3].iTime2Go = 0;
    smallBlueBall[4].iTime2Go = 0;
    smallBlueBall[5].iTime2Go = 0;
    smallBlueBall[6].iTime2Go = 0;
    smallBlueBall[7].iTime2Go = 0;
  }

  smallBlueBall[0].iStart = true;

  do {
    for (let i = 0; i < 8; i++) {
      if (t >= smallBlueBall[i].iTime2Go) {
        smallBlueBall[i].iStart = true;

      }
    }
    let promise = new Promise((resolve) => {
      setTimeout(() => resolve(1), delayFrame);
    });
    let result = await promise;
      console.log(result);
    promise.then(
      function (result) {
        if (result) {
          ++extCircle.cycleNum;
          drawPicture();
          t = extCircle.cycleNum;
          console.log(str);
        }
      }
    );
  } while (t < extCircle.stepsAmount * 81);
}

 function  drawPicture () {
   //draw new frame
   drawCanvas(xBigOvl, yBigOvl, rBigOvl, extCircle.colorCircle, myCanvas);
   newPositionBall(xBigOvl, yBigOvl, rBigOvl - 10);
   drawSmallBallsRunning();
}

function drawCanvas(x, y, r, color, canvas) {
  let ctx = canvas.getContext("2d");
  let path = new Path2D();
  path.arc(x, y, r, 0, 2 * Math.PI);
  ctx.lineWidth = 2;
  ctx.fillStyle = color;
  ctx.strokeStyle = "Violet";
  ctx.stroke(path);
  ctx.fill(path);
}

function drawCanvasGrdn(x, y, r, color, canvas) {
  let ctx = canvas.getContext("2d");
  let x1 = x - r * Math.cos(Math.PI / 4);
  let y1 = y - r * Math.cos(Math.PI / 4);
  let x2 = x + r * Math.cos(Math.PI / 4);
  let y2 = y + r * Math.cos(Math.PI / 4);
  let path = new Path2D();
  let gradient = ctx.createLinearGradient(x1, y1, x2, y2);

  path.arc(x, y, r, 0, 2 * Math.PI);
  ctx.lineWidth = 2;
  ctx.fillStyle = color;
  ctx.strokeStyle = extCircle.smallBallColor;
  ctx.stroke(path);

  gradient.addColorStop(0, extCircle.colorStop1);
  gradient.addColorStop(.25, extCircle.smallBallColor);
  gradient.addColorStop(.75, extCircle.smallBallColor);
  gradient.addColorStop(1, extCircle.colorStop2);
  ctx.fillStyle = gradient;
  ctx.fill(path);
}

function changeColorBigCircle() {
  extCircle.stepsAmount = 0;
  let colorChange = $('#color1').val();

  if (colorChange === color1) {
    extCircle.colorCircle = colorChange;
    drawCanvas(extCircle.xCenter, extCircle.yCenter, extCircle.radius, colorChange, myCanvas);
  } else {
    extCircle.colorCircle = colorChange;
    drawCanvas(extCircle.xCenter, extCircle.yCenter, extCircle.radius, colorChange, myCanvas);
  }
  drawSmallBalls4Start();
  extCircle.cycleNum = 0;
  buttonStart.disabled = false;
}

function drawSmallBalls4Start() {
  for (let i = 0; i < 8; i++) {
    smallBlueBall[i].iStart = 0;
    drawCanvasGrdn(smallBlueBall[i].xStart, smallBlueBall[i].yStart, rSmallBlue, extCircle.smallBallColor, myCanvas);
    smallBlueBall[i].xCurrent = smallBlueBall[i].xStart;
    smallBlueBall[i].yCurrent = smallBlueBall[i].yStart;
  }
}
function drawSmallBallsRunning(){
  for (let i = 0; i < 8; i++) {
    drawCanvasGrdn(smallBlueBall[i].xCurrent, smallBlueBall[i].yCurrent, rSmallBlue, extCircle.smallBallColor, myCanvas);
  }
}

function actionStop() {
  extCircle.stepsAmount = 0;
  drawCanvas(extCircle.xCenter, extCircle.yCenter, extCircle.radius, extCircle.colorCircle, myCanvas);
  drawSmallBalls4Start();
  buttonStart.innerText = changeInnerText(innerText1, innerText2);
  buttonStart.disabled = false;
}

function changeInnerText(Text1, Text2) {
  extCircle.cycleNum = 0;
  if (buttonStart.innerText === Text1) {
    return Text2;
  } else {
    return Text1;
  }
}

function changeSmallColor() {
  let colorChange = $('#color1').val();
  let str = String(colorChange);
  // конвертируем в HSV
  console.log(str);
  let unpackedRGB = unpack(colorChange);
  let rgb = new Array(3);
  rgb[0] = unpackedRGB.r;
  rgb[1] = unpackedRGB.g;
  rgb[2] = unpackedRGB.b;

  let hsv = RGBToHSL(rgb);
  console.log(hsv[0] + " " + hsv[1] + " " + hsv[2]);
  let v1 = 0.9  //hsv[2] * 2;
  let v2 = 0.2  //hsv[2] / 2;

  // вычисляем боковые теневые цвета
  let newRGB1 = HSVtoRGB(hsv[0], hsv[1], v1);
  let newRGB2 = HSVtoRGB(hsv[0], hsv[1], v2);
  let rShadow1 = newRGB1.r;
  let gShadow1 = newRGB1.g;
  let bShadow1 = newRGB1.b;
  let rMain = Math.round(rgb[0] * 255);
  let gMain = Math.round(rgb[1] * 255);
  let bMain = Math.round(rgb[2] * 255);
  let rShadow2 = newRGB2.r;
  let gShadow2 = newRGB2.g;
  let bShadow2 = newRGB2.b;
  let strShadow1 = `rgb(${rShadow1}, ${gShadow1}, ${bShadow1}), `;
  let strMainColor = `rgb(${rMain}, ${gMain}, ${bMain}), `;
  let strShadow2 = `rgb(${rShadow2}, ${gShadow2}, ${bShadow2}))`;
  str = `rgba(0, 0, 0, 0) linear-gradient(120deg, ` + strShadow1 + strMainColor + strShadow2;
  $('#colorBall').css('background', str);
  console.log("2. " + rgbPack(rShadow1, gShadow1, bShadow1));
  extCircle.colorStop1 = rgbPack(rShadow1, gShadow1, bShadow1);
  extCircle.smallBallColor = rgbPack(rMain, gMain, bMain);
  extCircle.colorStop2 = rgbPack(rShadow2, gShadow2, bShadow2);
  actionStop();
}

function HSVtoRGB(H, S, V) {
  // It expects 0<=H<=360, 0<=S<=1 and 0<=V<=1 and returns an object that contains R, G and B (integer values between 0 and 255)
  let V2 = V * (1 - S);
  let r = ((H >= 0 && H <= 60) || (H >= 300 && H <= 360)) ? V : ((H >= 120 && H <= 240) ? V2 : ((H >= 60 && H <= 120) ? mix(V, V2, (H - 60) / 60) : ((H >= 240 && H <= 300) ? mix(V2, V, (H - 240) / 60) : 0)));
  let g = (H >= 60 && H <= 180) ? V : ((H >= 240 && H <= 360) ? V2 : ((H >= 0 && H <= 60) ? mix(V2, V, H / 60) : ((H >= 180 && H <= 240) ? mix(V, V2, (H - 180) / 60) : 0)));
  let b = (H >= 0 && H <= 120) ? V2 : ((H >= 180 && H <= 300) ? V : ((H >= 120 && H <= 180) ? mix(V2, V, (H - 120) / 60) : ((H >= 300 && H <= 360) ? mix(V, V2, (H - 300) / 60) : 0)));

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

function mix(a, b, v) {
  return (1 - v) * a + v * b;
}

function unpack(color) {
  let r = 1 / 255;
  let g = 1 / 255;
  let b = 1 / 255;
  console.log(color);
  if (color.length === 7) {
    r = parseInt(color.substring(1, 3), 16) / 255;
    g = parseInt(color.substring(3, 5), 16) / 255;
    b = parseInt(color.substring(5, 7), 16) / 255;
    return {
      r: r,
      g: g,
      b: b,
    };
  } else if (color.length === 4) {
    r = parseInt(color.substring(1, 2), 16) / 15;
    g = parseInt(color.substring(2, 3), 16) / 15;
    b = parseInt(color.substring(3, 4), 16) / 15;
    return {
      r: r,
      g: g,
      b: b,
    };
  }
}

function RGBToHSL(rgb) {
  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];
  const minC = Math.min(r, g, b);
  const maxC = Math.max(r, g, b);
  let deltaC = maxC - minC;
  let h = 0;
  let s = 0;
  let l = (minC + maxC) / 2;
  if (l > 0 && l < 1) {
    s = deltaC / (l < 0.5 ? (2 * l) : (2 - 2 * l));
  }
  if (deltaC > 0) {
    if (maxC === r && maxC !== g) h += (g - b) / deltaC;
    if (maxC === g && maxC !== b) h += (2 + (b - r) / deltaC);
    if (maxC === b && maxC !== r) h += (4 + (r - g) / deltaC);
    h *= 60;
  }
  return [h, s, l];
}

function dec2hex(x) {
  return (x < 16 ? '0' : '') + x.toString(16);
}

function rgbPack(r, g, b) {
  return '#' + dec2hex(r) + dec2hex(g) + dec2hex(b);
}