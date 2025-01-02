// VARIABLES
const container = document.querySelector("#container");
let dimension = 16;

// FUNCTIONS

// creates a singular row of dimension divs
function createRow() {
    const row = document.createElement("div");
    row.setAttribute("id", "row");

    for (let i = 0; i < dimension; ++i) {
        const pixel = document.createElement("div");
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