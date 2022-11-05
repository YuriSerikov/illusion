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
const delayFrame = 30;
const innerText1 ='Старт';
const innerText2 ='Старт общий';
const extCircle = {
  xCenter: xBigOvl,
  yCenter: yBigOvl,
  spaceDown: space,
  radius: rBigOvl,
  colorCircle: '#808080',
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
      
    promise.then(
      function (result) {
        if (result) {
          ++extCircle.cycleNum;
          drawPicture();
          t = extCircle.cycleNum;
        }
      }
    );
  } while (t < extCircle.stepsAmount * 81);
}

 function  drawPicture () {
   //draw new frame
   let clr = extCircle.colorCircle;

   drawCanvas(xBigOvl, yBigOvl, rBigOvl, clr, myCanvas);
   newPositionBall(xBigOvl, yBigOvl, rBigOvl - 10);
   drawSmallBallsRunning();
   extCircle.colorCircle = changeBackColor(clr);

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

function changeInnerText(text1, text2) {
  extCircle.cycleNum = 0;
  let innerText = buttonStart.innerText;
  (innerText === text1) ? innerText = text2 : innerText = text1;
  return innerText;
}

function changeBackColor(colorChange) {
  /* цвет из формата HTML конвертируем в RGB затем HSV*/
  let unpackedRGB = unpack(colorChange);
  let r = unpackedRGB.r;
  let g = unpackedRGB.g;
  let b = unpackedRGB.b;

  let hsv = RGBToHSL(r, g, b);
  /* вычисляем оттенок для нового цвета */
  let h = hsv[0];


  h = h + 1;
  if (h >= 360) {
    h = h - 360;
  }
  /* конвертируем обратно в RGB*/

  let newRGB = HSVtoRGB(h / 360, hsv[1], hsv[2]);
  /* упаковываем цвет в формат HTML*/

  let colorChangeNew = rgbPack(newRGB.r, newRGB.g, newRGB.b);
  if (colorChangeNew === colorChange) {
    colorChangeNew = nextRed(colorChange);
  }

  const clrBox = $('#color1');
  clrBox.val(colorChangeNew.toUpperCase());
  clrBox.css('background', colorChangeNew);
  $.farbtastic('#colorpicker1').setColor(colorChangeNew);

  $('#redSlider').val(newRGB.r);
  $('#rLabel').text(newRGB.r);
  $('#greenSlider').val(newRGB.g);
  $('#gLabel').text(newRGB.g);
  $('#blueSlider').val(newRGB.b);
  $('#bLabel').text(newRGB.b);

  return colorChangeNew;
}

function HSVtoRGB(h, s, l) {
  let m2 = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
  let m1 = l * 2 - m2;

  return {
    r: Math.round(255 * hue2rgb(m1, m2, h + 0.33333)),
    g: Math.round(255 * hue2rgb(m1, m2, h)),
    b: Math.round(255 * hue2rgb(m1, m2, h - 0.33333))
  };
}

function hue2rgb(m1, m2, h) {
  let h1 = (h + 1) % 1;

  if (h1 * 6 < 1) {
    return m1 + (m2 - m1) * h1 * 6
  }
  if (h1 * 2 < 1) {
    return m2
  }
  if (h1 * 3 < 2) {
    return m1 + (m2 - m1) * (0.66666 - h1) * 6
  }
  return m1;
}


function unpack(color) {
  let r = 1 / 255;
  let g = 1 / 255;
  let b = 1 / 255;

  if (color.length === 7) {
    r = parseInt(color.substring(1, 3), 16) / 255;
    g = parseInt(color.substring(3, 5), 16) / 255;
    b = parseInt(color.substring(5, 7), 16) / 255;
  }
  if (color.length === 4) {
    r = parseInt(color.substring(1, 2), 16) / 15;
    g = parseInt(color.substring(2, 3), 16) / 15;
    b = parseInt(color.substring(3, 4), 16) / 15;
  }
  return {
    r: r,
    g: g,
    b: b,
  };
}

function RGBToHSL(r, g, b) {
  const maxC = Math.max(r, g, b);
  const minC = Math.min(r, g, b);
  let deltaC = maxC - minC;
  let l = (minC + maxC) / 2;
  let s = (l > 0 && l < 1) ? deltaC / (l < 0.5 ? (2 * l) : (2 - 2 * l)) : 0;

  let h = 0;
  if (deltaC > 0) {

    if (maxC === r && maxC !== g) {
      h += ((g - b) / deltaC);
      h = h * 60;
    }
    if (maxC === g && maxC !== b) {
      h += (2 + (b - r) / deltaC);
      h = h * 60;
    }
    if (maxC === b && maxC !== r) {
      h += (4 + (r - g) / deltaC);
      h = h * 60;
    }
  }
  if (h < 0) h = h + 360;
  if (h > 360) h = h - 360;

  return [h, s, l];
}

let dec2hex = x => ((x < 16 ? '0' : '') + x.toString(16));

let rgbPack = (r, g, b) => '#' + dec2hex(r) + dec2hex(g) + dec2hex(b);

function nextRed(clr) {
  let rgb = unpack(clr);
  let r = Math.round(rgb.r * 255);
  r = (r + 1) < 255 ? r + 1 : 1;
  let g = Math.round(rgb.g * 255);
  let b = Math.round(rgb.b * 255);
  return rgbPack(r, g, b);
}