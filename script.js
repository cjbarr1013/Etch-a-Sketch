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
let activeColor = colorPicker.value;
colorPicker.addEventListener("input", () => {
    if (document.querySelector("#draw").checked) {
        activeColor = colorPicker.value;
    }
})

/* Radios */
const radios = document.querySelectorAll('input[name="draw-option"]')
radios.forEach((item) => {
    item.addEventListener("change", () => {
        radioChange(item.value)
    });
})


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
    radios.forEach((item) => {
        if (item.checked) radioChange(item.value);
    })
}

function changeSquareColor() {
    if (gridFlag) {
        this.style.backgroundColor = activeColor;
    }
}

function radioChange(radio) {
    switch(radio) {
        case "draw":
            activeColor = colorPicker.value;
            removeRainbowListener();
            break;
        case "rainbow":
            document.querySelectorAll(".grid-square").forEach((square) => {
                square.addEventListener("mouseover", randomizeColor);
            })
            break;
        case "eraser":
            activeColor = "";
            removeRainbowListener();
            break;
    }
}

function randomizeColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    activeColor = color;
}

function removeRainbowListener() {
    document.querySelectorAll(".grid-square").forEach((square) => {
        square.removeEventListener("mouseover", randomizeColor);
    })
}

createGrid(slider.value);

/* 
To-do:
- Finish up styling
 */