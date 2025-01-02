// VARIABLES
const container = document.querySelector("#container");
let dimension = 16;
let enableDraw = false;

// FUNCTIONS

// creates a singular row of dimension divs
function createRow() {
    const row = document.createElement("div");
    row.setAttribute("id", "row");

    for (let i = 0; i < dimension; ++i) {
        const pixel = document.createElement("div");

        pixel.addEventListener("mousedown", () => {
            enableDraw = true;
            pixel.style["background"] = "black";
            pixel.style["border"] = "1px solid black";
        });
        pixel.addEventListener("mouseup", () => {
            enableDraw = false;
        });
        pixel.addEventListener("mouseover", () => {
            if (enableDraw) {
                pixel.style["background"] = "black";
                pixel.style["border"] = "1px solid black";
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