// VARIABLES

const container = document.querySelector("#container");

const colorPicker = document.querySelector("input");
const recent1 = document.getElementById("recent-1");
const recent2 = document.getElementById("recent-2");

const eraseButton = document.getElementById("eraser");
const randomColorButton = document.getElementById("random-color");
const gridLinesButton = document.getElementById("grid-lines");
const dimensionSlider = document.getElementById("dimension-slider");
const clearButton = document.getElementById("clear");

let recents = [undefined, undefined];

let erasing = false;
let enableEraser = false;
let enableDraw = false;
let enableRandomColor = false;
dimensionSlider.value = 16; 
let dimension = 16;
let enableGridLines = false;

const dimensionsText = document.createElement("p");
dimensionsText.textContent = `${dimension} x ${dimension}`;
document.querySelector("#editor-tools > div").insertBefore(dimensionsText, dimensionSlider);

// EVENT LISTENERS

recent1.addEventListener("click", () => colorPicker.value = recents[0]);
recent2.addEventListener("click", () => colorPicker.value = recents[1]);

eraseButton.addEventListener("click", () => {
    erasing = !erasing;
    eraseButton.classList.toggle("clicked");

    // disable random color if eraser is toggled
    enableRandomColor = false;
    randomColorButton.classList.remove("clicked");
});

randomColorButton.addEventListener("click", () => {
    enableRandomColor = !enableRandomColor;
    randomColorButton.classList.toggle("clicked");
    
    // disable eraser if random color is toggled
    erasing = false;
    eraseButton.classList.remove("clicked");
});

gridLinesButton.addEventListener("click", () => {
    enableGridLines = !enableGridLines;
    toggleGridLines();
});

dimensionSlider.addEventListener("input", () => dimensionsText.textContent = `${dimensionSlider.value} x ${dimensionSlider.value}`);
dimensionSlider.addEventListener("change", () => { // only update/repaint the container once user settles on a set dimension
    dimension = dimensionSlider.value;
    recreateGrid();
});

clearButton.addEventListener("click", () => recreateGrid());

// FUNCTIONS

function toggleGridLines() {
    const pixels = document.querySelectorAll("#row > div");
    pixels.forEach((pixel) => pixel.classList.toggle("no-grid-lines"));
}

function recreateGrid() {
    container.textContent = null;
    createGrid();
    if (enableGridLines) toggleGridLines();
}

function randomRGBA() {
    let o = Math.round;
    let r = Math.random;
    let s = 255;
    return `rgba(${o(r() * s)}, ${o(r() * s)}, ${o(r() * s)})`;
}

// updates the array 'recents' to keep track of the most recently utilized colors 
function addRecent() {

    // change is unnecessary if most recently used color is color currently using already 
    if (colorPicker.value == recents[0]) return; 

    if (recents[0] != undefined) {
        recents[1] = recents[0];
        recents[0] = colorPicker.value;
    } else recents[0] = colorPicker.value;
    
    // updates the ui to display the most recently utilized palette
    recent1.style["background"] = recents[0];
    recent2.style["background"] = recents[1];
}

// paints a pixel with a static or random color (depending on boolean variables)
function draw(pixel) {
    let color = randomRGBA();

    if (!enableRandomColor) {
        addRecent();
        color = colorPicker.value;
    } else color = randomRGBA();
          
    pixel.style["background"] = color;
    pixel.style["border"] = `1px solid ${color}`;
}

function erase(pixel) {
    pixel.style["background"] = "white";
    pixel.style["border"] = "1px solid lightgray";
}

// creates a singular row of 'dimension' divs
function createRow() {
    const row = document.createElement("div");
    row.setAttribute("id", "row");

    for (let i = 0; i < dimension; ++i) {
        const pixel = document.createElement("div");

        pixel.addEventListener("mousedown", (e) => {
            e.preventDefault(); // prevents mouse from becoming "block" icon 
            if (!erasing) {
                enableDraw = true;
                draw(pixel);
            } else {
                enableEraser = true;
                erase();
            }
        });
        pixel.addEventListener("mouseup", () => {
            if (!erasing) {
                enableDraw = false;
            } else {
                enableEraser = false;
            }
        });
        pixel.addEventListener("mouseover", () => {
            if (enableDraw && !erasing)
                draw(pixel);
            else if (enableEraser && erasing) erase();
        });
        row.appendChild(pixel);
    }
    container.appendChild(row);
}

// creates a dimension x dimension grid 
function createGrid() {
    for (let i = 0; i < dimension; ++i)
        createRow();
}

// MAIN CODE

createGrid();