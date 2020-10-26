const etchasketch = document.getElementById("app1");

etchasketch.innerHTML = `
<h2>Etch-a-sketch</h2>
<div class="eas" data-aos="fade-up">
    <div class="eas-container">
        <div oncontextmenu="return false;" id="grid-box" class="flex-column disableselect disabledrag"></div>
    </div>
    <div id="color-box">
        <button id="btn-black" class="selected"></button>
        <button id="btn-d-grey"></button>
        <button id="btn-grey"></button>
        <button id="btn-l-grey"></button>
        <button id="btn-white"></button>
    </div>
    <div class="eas-nav">
        <button id="reset-grid" class="primary-link"><span>Reset & Resize</span></button>
        <button id="rainbow-button" class="primary-link"><span>Rainbow</span></button>
    </div>
</div>
`;

const gridBox = document.getElementById("grid-box");
const gridPixel = document.getElementsByClassName("grid-pixel");
const resetButton = document.getElementById("reset-grid");
const rainbowButton = document.getElementById("rainbow-button");
let mouseDown = false;
let rainbowMode = false;
let currentColor = "black";

resetButton.addEventListener("click", createGrid);
rainbowButton.addEventListener("click", () => {
  if (!rainbowMode) {
    rainbowMode = true;
  } else {
    rainbowMode = false;
  }
  rainbowButton.classList.toggle("selected");
});

//Run main function
gridBuilder(46);

function colorPicker() {
  const colorBox = document.getElementById("color-box");
  const colorButtons = colorBox.querySelectorAll("button");

  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      //Remove "selected" from all buttons prior to selecting a new one
      colorButtons.forEach((button) => {
        button.classList.remove("selected");
      });

      //"select" button
      button.classList.add("selected");

      //Check button id to decide which color to use
      switch (button.id) {
        case "btn-black":
          currentColor = "black";
          break;
        case "btn-d-grey":
          currentColor = "dimgrey";
          break;
        case "btn-grey":
          currentColor = "darkgrey";
          break;
        case "btn-l-grey":
          currentColor = "lightgrey";
          break;
        case "btn-white":
          currentColor = "white";
          break;
      }
    });
  });
}
colorPicker();

function gridBuilder(gridSize) {
  //Mouse hold listener
  gridBox.onmousedown = () => {
    mouseDown = true;
  };
  gridBox.onmouseup = () => {
    mouseDown = false;
  };

  for (let i = 0; i < gridSize; i++) {
    let row = document.createElement("div");
    row.classList.add("flex-row");
    gridBox.appendChild(row);
    for (let j = 0; j < gridSize; j++) {
      let div = document.createElement("div");
      div.classList.add("grid-pixel");
      row.appendChild(div);
    }
  }

  //Adds coloring functionality to grid's pixels *ADD AFTER THE GRID IS BUILT*
  for (let i = 0; i < gridPixel.length; i++) {
    gridPixel[i].addEventListener("mouseover", () => {
      if (rainbowMode) {
        currentColor = getRandomColor();
      }
      if (mouseDown) {
        gridPixel[i].style.background = currentColor;
      }
    });
    gridPixel[i].addEventListener("mousedown", () => {
      gridPixel[i].style.background = currentColor;
    });
  }
}

function createGrid() {
  let gridSize = prompt("Please enter the new grid's size", 46);
  if (gridSize <= 0 || isNaN(gridSize)) {
    return;
  }
  removeGrid();
  gridBuilder(gridSize);
}

function removeGrid() {
  gridBox.innerHTML = "";
}

function getRandomColor() {
  const hexadecimal = "0123456789ABCDEF";
  let randomColor = "#";
  for (let i = 0; i < 6; i++) {
    randomColor += hexadecimal.charAt(Math.floor(Math.random() * 16));
  }
  console.log(randomColor);
  return randomColor;
}

/*
function darken(color, percentage){
    let modColor = color.replace("#", "");
    let R = modColor.substring(0,1);
    let G = modColor.substring(2,3);
    let B = modColor.substring(4,5);
    R = parseInt(R, 16);
    G = parseInt(G, 16);
    B = parseInt(B, 16);
    if(R > percentage){
        R = R-percentage;
    }else{
        R = 0;
    }
    if(G > percentage){
        G = G-percentage;
    }else{
        G = 0;
    }
    if(B > percentage){
        B = B-percentage;
    }else{
        B = 0;
    }
    R = R.toString(16);
    G = G.toString(16);
    B = B.toString(16);
    modColor = "#"+R+G+B;
    return modColor;
}
*/
