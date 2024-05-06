const grid = document.querySelector(".grid");
const gridDimensions = grid.getBoundingClientRect();

const slider = document.querySelector(".slider");
const sliderOutput = document.querySelector(".slider-output");
sliderOutput.textContent = slider.value;

const resetBtn = document.querySelector("#reset-btn");

slider.addEventListener("input", () => {
    sliderOutput.textContent = slider.value;
})

slider.addEventListener("mouseup", resetGrid)

resetBtn.addEventListener("click", resetGrid)

function createGrid(sliderValue) {
    const squareWidth = (gridDimensions.width / sliderValue) + "px";
    const squareHeight = (gridDimensions.height / sliderValue) + "px";

    for (let i = 1; i <= (sliderValue**2); i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square");
        square.style.width = squareWidth;
        square.style.height = squareHeight;
        square.addEventListener("mouseover", changeSquareColor);
        grid.appendChild(square);
    }
}

function clearGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function resetGrid() {
    clearGrid();
    createGrid(slider.value);
}

function changeSquareColor() {
    this.classList.add("grid-square-fill");
}

createGrid(slider.value);