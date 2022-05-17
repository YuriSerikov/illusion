//import {xBigOvl as xBigOval2 } from './canvas'

const xBigOval2 = 235;
//const yBigOval2 = 235;
const space2 = 12.5;    // зазор между квадратом и кругом
const rBigOval2 = xBigOval2 - space2; // радиус большого круга
const rSmallBlue2 = 10; // радиус маленького синего шара


class SmallBlueBalls {
    #id;                  // id of the Object
    color = '#0000ff';     // color of the Object
    iStart = false;        // true is in motion
    xStart = 235;          // position to begin
    yStart = 20;
    xStop = 235;           // position where to stop and start backward
    yStop = 445;
    xCurrent = 235;        // current position
    yCurrent = 20;
    iTime2Go = 0;          // current step of motion
    iDirection = 1;       // if backward = - 1

  constructor(id) {
    this.#id =id;
  }
}

  const pi = Math.PI;
  let smallBlueBall = new Array(8);

  for (let i = 0; i < 8; i++) {
    smallBlueBall[i] = new SmallBlueBalls(i);
    smallBlueBall[i].xStart = Math.trunc(rBigOval2 + space2 - (rBigOval2 - rSmallBlue2) * Math.sin(pi * i / 8)) +0.5;
    smallBlueBall[i].yStart = Math.trunc(rSmallBlue2 + space2   + (rBigOval2 - rSmallBlue2) * (1 - Math.cos(pi * i / 8))) +0.5;
    smallBlueBall[i].xStop = Math.trunc( rBigOval2 + space2 - (rBigOval2 - rSmallBlue2) * Math.sin(pi * i / 8 + pi)) +0.5;
    smallBlueBall[i].yStop = Math.trunc( rSmallBlue2 + space2 + (rBigOval2 - rSmallBlue2) * (1 - Math.cos(pi * i / 8 + pi))) +0.5;
    smallBlueBall[i].iStart = false;
    smallBlueBall[i].xCurrent = 0;
    smallBlueBall[i].yCurrent = 0;
    smallBlueBall[i].iDirection = 1;
    smallBlueBall[i].iTime2Go = 0;
  }

  smallBlueBall[3].xStart = smallBlueBall[3].xStart + 0.5;
  smallBlueBall[5].xStart = smallBlueBall[5].xStart + 0.5;
  smallBlueBall[5].yStart = smallBlueBall[5].yStart + 0.5;
  smallBlueBall[7].yStart = smallBlueBall[7].yStart + 0.5;
  smallBlueBall[1].yStop = smallBlueBall[1].yStop + 0.5;
  smallBlueBall[3].yStop = smallBlueBall[3].yStop + 1;
  smallBlueBall[5].yStop = smallBlueBall[5].yStop - 0.5;

function rClosest (R) {
  return R * Math.sqrt(2 - Math.sqrt(2)) / 2;
}
function rMiddle(R) {
  return R / Math.sqrt(2);
}
function rFurther(R) {
  return R * Math.sqrt(2 + Math.sqrt(2)) / 2;
}

function nextStep(i, xOval, yOval, rOval) {
  // position of the ball
  let x = smallBlueBall[i].xCurrent;
  let y = smallBlueBall[i].yCurrent;
  //let way = smallBlueBall[i].iDirection;
  let step;
  let position = distFromPoint(x, xOval, y, yOval);
  let r1 = rClosest(rOval);
  let r2 = rMiddle(rOval);
  let r3 = rFurther(rOval);

  if (position > r3) {
    step = (rOval - r3)/10 * smallBlueBall[i].iDirection;
    return step;
  }
  if (position > r2) {
    step = (r3 - r2)/10 * smallBlueBall[i].iDirection;
    return step;
  }
  if (position > r1) {
    step = (r2 - r1)/10 * smallBlueBall[i].iDirection;
    return step;
  }
    step = 2 * r1/21 * smallBlueBall[i].iDirection;
  return step;
}

function newPositionBall(xBigO, yBigO, R) {
  for (let i = 0; i < 8; i++) {

    if (!!smallBlueBall[i].iStart) {            // false - ball is still
      let step = nextStep(i, xBigO, yBigO, R);
      step = Math.fround(step * 100) / 100;
      let xPosition = smallBlueBall[i].xCurrent;
      let yPosition = smallBlueBall[i].yCurrent;
      let angle = i * Math.PI / 8;
      let isLast = isLastStep(step, i, R); // проверить, что это не последний шаг
      let way = smallBlueBall[i].iDirection;
      let xPositionNew;
      let yPositionNew;
      //isLast = false;
      console.log(isLast + " way = " + way);
      //step = step * way;
      console.log("след.шаг = " + step);
      if (way === 1) {
        if (!isLast) {
          xPositionNew = xPosition + step * Math.sin(angle);
          yPositionNew = yPosition + step * Math.cos(angle);
        } else {
          xPositionNew = smallBlueBall[i].xStop;
          yPositionNew = smallBlueBall[i].yStop;
          smallBlueBall[i].iDirection = -1;
        }

      } else {
        if (!isLast) {
          xPositionNew = xPosition + step * Math.sin(angle);
          yPositionNew = yPosition + step * Math.cos(angle);
        } else {
          xPositionNew = smallBlueBall[i].xStart;
          yPositionNew = smallBlueBall[i].yStart;
          smallBlueBall[i].iDirection = 1;
        }
      }
      console.log("x = " + xPositionNew + "  y = " + yPositionNew);
      smallBlueBall[i].xCurrent = xPositionNew;
      smallBlueBall[i].yCurrent = yPositionNew;
    }
  }
}

function isLastStep(step, i, rOval) {
  let way = smallBlueBall[i].iDirection;
  let x = smallBlueBall[i].xCurrent;
  let y = smallBlueBall[i].yCurrent;
  let r;

  if (way === 1) {
    let x1 = smallBlueBall[i].xStart;
    let y1 = smallBlueBall[i].yStart;
    r = distFromPoint(x, x1, y, y1) +  Math.abs(step);
  } else {
    let x1 = smallBlueBall[i].xStop;
    let y1 = smallBlueBall[i].yStop;
    r = distFromPoint(x, x1, y, y1) +  Math.abs(step);
  }
  console.log("distance: " + r);
    return r > rOval * 2;
}

function distFromPoint(x1, x2, y1, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}
