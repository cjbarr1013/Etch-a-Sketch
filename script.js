/* Grid Drawing Event Listeners */
const grid = document.querySelector(".grid");
let gridFlag = false;
const gridFlagOff = () => {
    gridFlag = false
}
const gridFlagOn = () => {
    gridFlag = true
}
grid.addEventListener("mousedown", gridFlagOn)
grid.addEventListener("mouseup", gridFlagOff)
grid.addEventListener("mouseleave", gridFlagOff)

/* Grid Slider */
const slider = document.querySelector(".slider");
const sliderOutput = document.querySelector(".slider-output");
sliderOutput.textContent = slider.value;

slider.addEventListener("input", () => {
    sliderOutput.textContent = slider.value;
})

slider.addEventListener("mouseup", resetGrid)

/* Reset Button */
const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", resetGrid)

/* Color Picker */
const colorPicker = document.querySelector("#color-picker");
/* colorPicker.addEventListener("input", ) */

/* Functions */
function createGrid(sliderValue) {
    const gridDimensions = grid.getBoundingClientRect();
    const squareWidth = (gridDimensions.width / sliderValue) + "px";
    const squareHeight = (gridDimensions.height / sliderValue) + "px";

    for (let i = 1; i <= (sliderValue); i++) {
        const row = document.createElement("div");
        row.classList.add("grid-row");
        grid.appendChild(row);
        for (let j = 1; j <= (sliderValue); j++) {
            const square = document.createElement("div");
            square.classList.add("grid-square");
            square.style.width = squareWidth;
            square.style.height = squareHeight;
            square.addEventListener("mouseover", changeSquareColor);
            row.appendChild(square);
        }
    }
}

function deleteGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function resetGrid() {
    deleteGrid();
    createGrid(slider.value);
}

function changeSquareColor() {
    if (gridFlag) {
        this.classList.add("grid-square-fill");
    }
}

createGrid(slider.value);

/* 
To-do:
- Add ability to change color
- Make it so you have to "click" & "mouseover" to draw
- Add rainbow button and functionality
- Add darkening button and functionality
- Add eraser button and functionality
- Finish up styling
 */