
// ======= ======= ======= original ======= ======= =======
// ======= ======= ======= original ======= ======= =======
// ======= ======= ======= original ======= ======= =======


// declare gameData variable in global space (so all functions have access to it)
let gameData;


// ======= initialize =======
function initialize() {
  console.log("== initialize ==")

  // call function that activates start button
  activateStartButton();
}


// ======= activateStartButton =======
function activateStartButton() {
  console.log("== activateStartButton ==")

  // assign event listener to start button
  let startBtn = document.getElementById("startGameBtn");
  startBtn.addEventListener("click", startGame);
}


// ======= startGame =======
function startGame() {
  console.log("== startGame ==")
  let player1name, player2name, player1label, player2label, messageDisplay;

  // get entered player names
  player1name = document.getElementById("player1entry").value;
  player2name = document.getElementById("player2entry").value;
  player1label = document.getElementById("player1label");

  // display player names on page
  player2label = document.getElementById("player2label");
  messageDisplay = document.getElementById("message");

  // clear messages from previous game (if any)
  let message = "";
  messageDisplay.innerText = message;

  // check if at least one player entered and warn if not
  if (!player1name) {
    message = "Please enter at least one player name";
    messageDisplay.innerText = message;

  // display player names and start game
  } else {
    if (player1name) {
      player1label.innerText = player1name;
    }
    if (player2name) {
      player2label.innerText = player2name;
    }

    // set player label styles to identify active player
    player1label.style.color = "red";
    player2label.style.color = "black";

    // clear player name entry fields
    document.getElementById("player1entry").value = "";
    document.getElementById("player2entry").value = "";

    // clear previous game data and board
    resetGameData();
    resetGameBoard();

    // allow entry of X's and O's
    activateCells();
  }
}


// ======= resetGameData =======
function resetGameData() {
  console.log("== resetGameData ==")

  // initialize game data for no gameboard entries (all null)
  gameData = {
    R1C1: null,
    R1C2: null,
    R1C3: null,

    R2C1: null,
    R2C2: null,
    R2C3: null,

    R3C1: null,
    R3C2: null,
    R3C3: null,

    currentPlay: "O"
  }
}


// ======= resetGameBoard =======
function resetGameBoard() {
  console.log("== resetGameBoard ==");

  // get all game board cells
  let cells = document.getElementById("gameboard").children;

  // loop through all cells to clear X's and O's
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
  };
}


// ======= activateCells =======
function activateCells() {
  console.log("== activateCells ==");

  // assign eventlistener to parent of gameboard cells
  gameboard = document.getElementById("gameboard");
  gameboard.addEventListener("click", selectCell);
}


// ======= selectCell =======
function selectCell(e) {
  console.log("== selectCell ==");

  // the "e" argument passes in the event that called the function (e = event)
  // The target of the event is the element clicked (accessed by e.target)
  // the currentTarget of the event is the element to which the listener is attached (accessed by e.currentTarget)

  console.log("e.target:", e.target);                 // clicked cell
  console.log("e.currentTarget:", e.currentTarget);   // gameboard (holds event listener)


  // get the id of the clicked cell
  let selectedCell = document.getElementById(e.target.id);
  console.log("selectedCell:", selectedCell);

  let player1label = document.getElementById("player1label");
  let player2label = document.getElementById("player2label");
  let messageDisplay = document.getElementById("message");

  // check to see the current status of the cell
  let selectedCellState = gameData[e.target.id];
  let message = "";

  // allow an X or O to be entered if cell is empty
  if (selectedCellState === null) {

    // toggle between "X marks and "O marks
    if (gameData.currentPlay === "O") {

      // place X in appropriate DOM and data locations
      gameData[e.target.id] = "X";
      selectedCell.innerText = "X";
      gameData.currentPlay = "X";

      // toggle player colors (red is active)
      player1label.style.color = "#bbb";
      player2label.style.color = "red";

    } else {

      // place O in appropriate DOM and data locations
      gameData[e.target.id] = "O";
      selectedCell.innerText = "O";

      // toggle player colors (red is active)
      gameData.currentPlay = "O";
      player1label.style.color = "red";
      player2label.style.color = "#bbb";
    }

  // cell not empty, warn player
  } else {
    message = "That cell is already filled";
  }

  // display message text (will be empty string for correct plays)
  messageDisplay.innerText = message;
  e.stopPropagation();
}

initialize();







// =======
