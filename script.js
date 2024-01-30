const status = document.querySelector(".game--status");
status.textContent = "It's X's turn";

const cells = document.querySelectorAll(".cell");
let isXTurn = true;
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (isGameActive && cell.textContent === "") {
      if (isXTurn) {
        cell.textContent = "X";
        status.textContent = "It's O's turn";
      } else {
        cell.textContent = "O";
        status.textContent = "It's X's turn";
      }
      isXTurn = !isXTurn;

      // Check for a win or draw
      checkGameStatus();
    }
  });
});

const restart = document.querySelector(".game--restart");
restart.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.textContent = "";
  });

  status.textContent = "It's X's turn";
  isXTurn = true;
  isGameActive = true;
});

function checkGameStatus() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      status.textContent = `${cells[a].textContent} wins! :)`;
      isGameActive = false;
      return;
    }
  }

  if ([...cells].every((cell) => cell.textContent !== "")) {
    status.textContent = "Game ended in a draw!";
    isGameActive = false;
  }
}
