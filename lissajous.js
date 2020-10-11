const SCALE = 250;
const OFFSET = 250;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.strokeStyle = "#f0f0f0";
context.lineWidth = 4;

let x = 0;
let y = 0;

let a = 2.483;
let b = 1.4915;
let delta = Math.PI / 2;

function draw() {
  context.beginPath();
  context.moveTo(x, y);
  for (let t = 0.0; t < 15; t += 0.1) {
    x = Math.sin(a * t + delta) * SCALE + OFFSET;
    y = Math.sin(b * t) * SCALE + OFFSET;
    context.lineTo(x, y);
    context.stroke();
  }
}

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function update(element) {
  const elements = document.getElementsByName(element.name);
  let label = Array.from(elements).find((e) => e.tagName === "LABEL");
  let input = Array.from(elements).find((e) => e.tagName === "INPUT");
  if (element.name === "a") a = input.value;
  if (element.name === "b") b = input.value;
  if (element.name === "delta") delta = Math.PI / input.value;
  if (element.name === "a" || element.name === "b") {
    label.innerHTML = `${element.name} = ${input.value}`;
  }
  if (element.name === "delta") {
    label.innerHTML = `${element.name} = PI / ${input.value}`;
  }
  updateEquations();
  clear();
  draw();
}

function updateEquations() {
  const equations = Array.from(document.getElementsByClassName("equation"));
  let xLabel = equations.find((e) => e.id === "x");
  let yLabel = equations.find((e) => e.id === "y");
  equations.forEach((label) => label.classList.add("bold"));
  xLabel.innerHTML = `x = sin(${a}*t*${delta})`;
  yLabel.innerHTML = `y = sin(${b}*t)`;
}

updateEquations();
draw();
