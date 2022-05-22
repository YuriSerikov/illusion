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
