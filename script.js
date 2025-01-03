// VARIABLES
const container = document.querySelector("#container");
const colorPicker = document.querySelector("input");

const recent1 = document.getElementById("recent-1");
const recent2 = document.getElementById("recent-2");
let recents = [undefined, undefined];

recent1.addEventListener("click", () => colorPicker.value = recents[0]);
recent2.addEventListener("click", () => colorPicker.value = recents[1]);

const eraseButton = document.getElementById("eraser");
let erasing = false;
let enableEraser = false;

eraseButton.addEventListener("click", () => {
    erasing = !erasing;
    eraseButton.classList.toggle("clicked");

    // disable all other tools
    enableRandomColor = false;
    randomColorButton.classList.remove("clicked");
});

const randomColorButton = document.getElementById("random-color");
let enableRandomColor = false;

randomColorButton.addEventListener("click", () => {
    enableRandomColor = !enableRandomColor;
    randomColorButton.classList.toggle("clicked");
    
    // disable all other tools
    erasing = false;
    eraseButton.classList.remove("clicked");
});

const gridLinesButton = document.getElementById("grid-lines");
gridLinesButton.addEventListener("click", () => {
    const pixels = document.querySelectorAll("#row > div");
    pixels.forEach((pixel) => {
        pixel.classList.toggle("no-grid-lines");
    });
});

let dimension = 16;
let enableDraw = false;

// FUNCTIONS

// stores the most recently utilized color 
function addRecent() {
    if (colorPicker.value == recents[0]) return;

    if (recents[0] != undefined) {
        recents[1] = recents[0];
        recents[0] = colorPicker.value;
    } else recents[0] = colorPicker.value;
    
    recent1.style["background"] = recents[0];
    recent2.style["background"] = recents[1];
}

// generates a random rgba value
function randomRGBA() {
    let o = Math.round;
    let r = Math.random;
    let s = 255;
    return `rgba(${o(r() * s)}, ${o(r() * s)}, ${o(r() * s)})`;
}

// paints pixel with static or random color
function draw(pixel) {
    let color = randomRGBA();
    if (!enableRandomColor) {
        addRecent();
        color = colorPicker.value;
    } else color = randomRGBA();
          
    pixel.style["background"] = color;
    pixel.style["border"] = `1px solid ${color}`;
}

// creates a singular row of dimension divs
function createRow() {
    const row = document.createElement("div");
    row.setAttribute("id", "row");

    for (let i = 0; i < dimension; ++i) {
        const pixel = document.createElement("div");
        pixel.style["background"] = "white";

        pixel.addEventListener("mousedown", (e) => {
            e.preventDefault(); // prevents mouse from becoming "block" icon 
            if (!erasing) {
                enableDraw = true;
                draw(pixel);
            } else {
                enableEraser = true;
                pixel.style["background"] = "white";
                pixel.style["border"] = "1px solid lightgray";
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
            else if (enableEraser && erasing) {
                pixel.style["background"] = "white";
                pixel.style["border"] = "1px solid lightgray";
            } 
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

// MAIN
createGrid();