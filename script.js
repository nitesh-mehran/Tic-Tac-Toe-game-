let gamecells = document.querySelectorAll(".cell");
let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
let restartBtn = document.querySelector(".restartBtn");
let alertBox = document.querySelector(".alertBox");

//Making variables
let currentplayer = "X";
let nextplayer = "O";
let playerTurn = currentplayer;

player1.textContent = `Player 1 : ${currentplayer}`
player2.textContent = `Player 2: ${nextplayer}`

// Function To Start Game
const startGame = () => {
  gamecells.forEach((cell) => {
    cell.addEventListener("click", handleClick);
  });
};

const handleClick = (e) =>{
  if (e.target.textContent === "") {
    e.target.textContent = playerTurn;
  }

  if (cheakWin()) {
    // console.log(`${playerTurn} is a Winner!`);
    showAlert(`${playerTurn} is a Winner!`)
    DisableCells();
  } else if (cheakTie()) {
    // console.log("It's A Tie");
    showAlert("It's A Tie")
    DisableCells();
  } else {
    changePlayerTrun();
  }

}

//Function to Chagne Player Trun
const changePlayerTrun = () => {
  playerTurn = playerTurn === currentplayer ? nextplayer : currentplayer;
};

// Function to cheak win
const cheakWin = () => {
  const winingConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winingConditions.length; i++) {
    const [pos1, pos2, pos3] = winingConditions[i];
    if (
      gamecells[pos1].textContent !== "" &&
      gamecells[pos1].textContent === gamecells[pos2].textContent &&
      gamecells[pos2].textContent === gamecells[pos3].textContent
    ) {
      return true;
    }
  }

  return false;
};

//Function to cheak tie
const cheakTie = () => {
  let emptyCellsCount = 0;
  gamecells.forEach((cell) => {
    if (cell.textContent === "") {
      emptyCellsCount++;
    }
  });

  return emptyCellsCount === 0 && !cheakWin();
};

//Function to Disable game-board cells after win && tie
const DisableCells = () =>{
  gamecells.forEach(cell =>{
    cell.removeEventListener("click", handleClick)
    cell.classList.add("disabled")
  })
}

//Function to RestartGame
 const RestartGame = ()=>{
  gamecells.forEach(cell=>{
    cell.textContent = '';
    cell.classList.remove("disabled")
   startGame();
  })
 }

 const showAlert = (msg)=>{
    alertBox.style.display = "block";
    alertBox.textContent = msg;
    setTimeout(() => {
    alertBox.style.display = "none";
      
    }, 2000);
 }

restartBtn.addEventListener("click", RestartGame)

//calling start game function
startGame();
