'use strict';
const MS_SECOND = 1000;

const monthsWrapper = document.querySelector('.clock__wrapper_months');
const daysWrapper = document.querySelector('.clock__wrapper_days');
const hoursWrapper = document.querySelector('.clock__wrapper_hours');

document.querySelector('.clock').addEventListener('mouseover', (event) => {
  if (event.target.classList.contains('clock__wrapper')) {
    showTitle(event.target, event.target.firstElementChild);
  }
});

document.querySelector('.clock').addEventListener('mouseout', (event) => {
  if (event.target.classList.contains('clock__wrapper')) {
    hiddenTitle(event.target, event.target.firstElementChild);
  }
});

function showTitle(wrapper, title) {
  wrapper.classList.add('hover');
  title.classList.add('visible');
}

function hiddenTitle(wrapper, title) {
  wrapper.classList.remove('hover');
  title.classList.remove('visible');
}

const monthsArrow = document.querySelector('.clock__arrow_months');
const daysArrow = document.querySelector('.clock__arrow_days');
const hoursArrow = document.querySelector('.clock__arrow_hours');
const minutesArrow = document.querySelector('.clock__arrow_minutes');
const secondsArrow = document.querySelector('.clock__arrow_seconds');

const MONTHS_POINTS = 12;
const DAYS_POINTS = daysInThisMonth();
const HOURS_POINTS = 12;
const SECONDS_POINTS = 60;

function daysInThisMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

let degRotate = 360;
const monthsRotatePart = degRotate / MONTHS_POINTS;
const daysRotatePart = degRotate / DAYS_POINTS;
const hoursRotatePart = degRotate / HOURS_POINTS;

setRotatePoints(MONTHS_POINTS, monthsWrapper, monthsRotatePart);
setRotatePoints(DAYS_POINTS, daysWrapper, daysRotatePart);
setRotatePoints(HOURS_POINTS, hoursWrapper, hoursRotatePart);

function setRotatePoints(points, nodeContainer, rotatePart) {
  for (let i = points; i >= 1; i -= 1) {
    const pointWrapper = document.createElement('div');
    const point = document.createElement('div');

    pointWrapper.className = 'point-wrapper';
    point.className = 'point';
    pointWrapper.style.transform = `translateX(-50%) rotate(${degRotate}deg)`;
    point.style.transform = `rotate(-${degRotate}deg)`;
    point.textContent = i;
    pointWrapper.appendChild(point);
    nodeContainer.appendChild(pointWrapper);

    degRotate -= rotatePart;
  }

  degRotate = 360;
}

const MONTHS_ROTATE_ANGLE = degRotate / MONTHS_POINTS;
const DAYS_ROTATE_ANGLE = degRotate / DAYS_POINTS;
const HOURS_ROTATE_ANGLE = degRotate / HOURS_POINTS;
const MIN_AND_SEC_ROTATE_ANGLE = degRotate / SECONDS_POINTS;

clock();
setInterval(clock, MS_SECOND);

function clock() {
  const date = new Date();

  const months = date.getMonth();
  const days = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const month = months * MONTHS_ROTATE_ANGLE;
  const day = days * DAYS_ROTATE_ANGLE;
  const hour = hours * HOURS_ROTATE_ANGLE;
  const minute = minutes * MIN_AND_SEC_ROTATE_ANGLE;
  const second = seconds * MIN_AND_SEC_ROTATE_ANGLE;

  monthsArrow.style.transform = `translateX(-50%) rotate(${month}deg)`;
  daysArrow.style.transform = `translateX(-50%) rotate(${day}deg)`;
  hoursArrow.style.transform = `translateX(-50%) rotate(${hour}deg)`;
  minutesArrow.style.transform = `translateX(-50%) rotate(${minute}deg)`;
  secondsArrow.style.transform = `translateX(-50%) rotate(${second}deg)`;
}
