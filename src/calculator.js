const calculator = document.getElementById("app2");

calculator.innerHTML = `
<div id="calculator" data-aos="fade-up">
    <div id="screen">
        <p id="history"></p>
        <p id="result">0</p>
    </div>
    <div class="line">
        <button id="calc-c">C</button>
        <button id="calc-ce">CE</button>
        <button id="calc-percent">%</button>
        <button id="calc-divide">÷</button>
    </div>
    <div class="line">
        <button id="calc-7" class="white-btn">7</button>
        <button id="calc-8" class="white-btn">8</button>
        <button id="calc-9" class="white-btn">9</button>
        <button id="calc-multiply">×</button>
    </div>
    <div class="line">
        <button id="calc-4" class="white-btn">4</button>
        <button id="calc-5" class="white-btn">5</button>
        <button id="calc-6" class="white-btn">6</button>
        <button id="calc-minus">-</button>
    </div>
    <div class="line">
        <button id="calc-1" class="white-btn">1</button>
        <button id="calc-2" class="white-btn">2</button>
        <button id="calc-3" class="white-btn">3</button>
        <button id="calc-plus">+</button>
    </div>
    <div class="line">
        <button id="calc-plus-minus" class="white-btn">±</button>
        <button id="calc-0" class="white-btn">0</button>
        <button id="calc-dot" class="white-btn">.</button>
        <button id="calc-equals">=</button>
    </div>
</div>
`;

const resultP = document.getElementById("result");
const historyP = document.getElementById("history");
let resultString = "0";
let resultNumber = 0;
let value = 0;
let historyString = "";
let typedEqual = false;
let lastAction = "sum"; // Used in equals(). Starts as a "sum" because it will add the first input to the initial 0;

//add click event to number buttons
const buttonNumbers = [
  document.getElementById("calc-0"),
  document.getElementById("calc-1"),
  document.getElementById("calc-2"),
  document.getElementById("calc-3"),
  document.getElementById("calc-4"),
  document.getElementById("calc-5"),
  document.getElementById("calc-6"),
  document.getElementById("calc-7"),
  document.getElementById("calc-8"),
  document.getElementById("calc-9"),
];
for (let i = 0; i < buttonNumbers.length; i++) {
  generateButton(buttonNumbers[i], i);
}

const buttonDot = document.getElementById("calc-dot");
buttonDot.addEventListener("click", () => {
  if (resultString.indexOf(".") == -1) {
    resultString += ".";
  }
  resultP.textContent = checkLength(resultString);
});

const buttonSum = document.getElementById("calc-plus");
buttonSum.addEventListener("click", () => {
  checkEquals();
  equals(lastAction);
  lastAction = "sum";
  calculateResult();
});

const buttonSubtract = document.getElementById("calc-minus");
buttonSubtract.addEventListener("click", () => {
  checkEquals();
  equals(lastAction);
  lastAction = "subtract";
  calculateResult();
});

const buttonMultiply = document.getElementById("calc-multiply");
buttonMultiply.addEventListener("click", () => {
  checkEquals();
  equals(lastAction);
  lastAction = "multiply";
  calculateResult();
});

const buttonDivide = document.getElementById("calc-divide");
buttonDivide.addEventListener("click", () => {
  checkEquals();
  equals(lastAction);
  lastAction = "divide";
  calculateResult();
});

const buttonEquals = document.getElementById("calc-equals");
buttonEquals.addEventListener("click", () => {
  equals(lastAction);
  calculateResult(value);
  typedEqual = true;
});

const buttonC = document.getElementById("calc-c");
buttonC.addEventListener("click", () => {
  resultString = "0";
  resultNumber = 0;
  value = 0;
  historyString = "";
  typedEqual = false;
  lastAction = "sum";
  calculateResult();
});

const buttonCE = document.getElementById("calc-ce");
buttonCE.addEventListener("click", () => {
  calculateResult(0);
  typedEqual = false;
  resultP.textContent = "0";
});

const buttonPlusMinus = document.getElementById("calc-plus-minus");
buttonPlusMinus.addEventListener("click", () => {
  if (!typedEqual) {
    value = 0 - value;
    calculateResult(value);
    resultP.textContent = checkLength(value);
  } else {
    resultNumber = 0 - resultNumber;
    calculateResult();
  }
});

//---------FUNCTIONS

function generateButton(button, num) {
  button.addEventListener("click", () => {
    updateResult(num);
  });
}

function updateResult(num) {
  if (resultString == "0") {
    resultString = String(num);
  } else {
    resultString += String(num);
  }
  value = Number(resultString);
  resultP.textContent = checkLength(resultString);
}

function calculateResult(optionalNumber) {
  resultString = "0";
  updateResult(0);
  value = optionalNumber || 0; //increments on multiple "=" presses.
  resultP.textContent = checkLength(resultNumber);
}

//calculate last action on new action;
function equals(mode) {
  switch (mode) {
    case "sum":
      sum();
      break;
    case "subtract":
      subtract();
      break;
    case "multiply":
      multiply();
      break;
    case "divide":
      divide();
      break;
    case "none":
      break;
  }
}

function checkEquals() {
  if (typedEqual) {
    lastAction = "none";
    typedEqual = false;
  }
}

function checkLength(stringNum) {
  stringNum = String(stringNum);
  if (stringNum.length > 16) {
    stringNum = stringNum.slice(0, 16);
    console.log("Cut the string to 16");
    if (stringNum.indexOf(".") != -1) {
      console.log("Checked for .");
      for (let i = 0; i < 16; i++) {
        if (
          stringNum.charAt(stringNum.length - 1) == "0" ||
          stringNum.charAt(stringNum.length - 1) == "."
        ) {
          console.log("sliced last");
          stringNum = stringNum.slice(0, -1);
        }
      }
    }
  }
  return stringNum;
}

function sum() {
  resultNumber += value;
}

function subtract() {
  resultNumber -= value;
}

function multiply() {
  if (value != 0) {
    resultNumber *= value;
  }
}

function divide() {
  if (value != 0) {
    resultNumber = resultNumber / value;
  }
}
