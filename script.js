const grid = document.querySelector(".grid");
const gridDimensions = grid.getBoundingClientRect()

function createGrid() {
    const squareWidth = (gridDimensions.width / 16) + "px"
    const squareHeight = (gridDimensions.height / 16) + "px";

    for (let i = 1; i <= (16**2); i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square")
        square.style.width = squareWidth;
        square.style.height = squareHeight;
        square.addEventListener("mouseover", changeSquareColor)
        grid.appendChild(square);
    }
}

function changeSquareColor() {
    this.classList.add("grid-square-hovered")
}

createGrid()