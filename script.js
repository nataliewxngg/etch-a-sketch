// VARIABLES
const container = document.querySelector("#container");
const colorPicker = document.querySelector("input");
let dimension = 16;
let enableDraw = false;

// FUNCTIONS

// creates a singular row of dimension divs
function createRow() {
    const row = document.createElement("div");
    row.setAttribute("id", "row");

    for (let i = 0; i < dimension; ++i) {
        const pixel = document.createElement("div");

        pixel.addEventListener("mousedown", (e) => {
            e.preventDefault(); // prevents mouse from becoming "block" icon 
            enableDraw = true;
            pixel.style["background"] = colorPicker.value;
            pixel.style["border"] = `1px solid ${colorPicker.value}`;
        });
        pixel.addEventListener("mouseup", () => {
            enableDraw = false;
        });
        pixel.addEventListener("mouseover", () => {
            if (enableDraw) {
                pixel.style["background"] = colorPicker.value;
                pixel.style["border"] = `1px solid ${colorPicker.value}`;
            }
        });
        row.appendChild(pixel);
    }
    container.appendChild(row);
}

// creates a dimension x dimension grid 
function createGrid() {
    for (let i = 0; i < dimension; ++i) {
        createRow();
    }
}

// MAIN
createGrid();