// VARIABLES
const container = document.querySelector("#container");
const colorPicker = document.querySelector("input");

const recent1 = document.getElementById("recent-1");
const recent2 = document.getElementById("recent-2");
let recents = [undefined, undefined];

recent1.addEventListener("click", () => colorPicker.value = recents[0]);
recent2.addEventListener("click", () => colorPicker.value = recents[1]);

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

// creates a singular row of dimension divs
function createRow() {
    const row = document.createElement("div");
    row.setAttribute("id", "row");

    for (let i = 0; i < dimension; ++i) {
        const pixel = document.createElement("div");

        pixel.addEventListener("mousedown", (e) => {
            e.preventDefault(); // prevents mouse from becoming "block" icon 
            enableDraw = true;
            addRecent();
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
    for (let i = 0; i < dimension; ++i)
        createRow();
}

// MAIN
createGrid();