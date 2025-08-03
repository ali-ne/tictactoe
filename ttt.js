const body = document.getElementById("body");
const leftSide = document.getElementById("leftSide");
const rightSide = document.getElementById("rightSide");
const playersArea = document.getElementById("players");
const inputNameP1 = document.getElementById("nameP1");
const inputNameP2 = document.getElementById("nameP2");
const startBtn = document.getElementById("start");
const newRound = document.getElementById("newRound");
const endGame = document.getElementById("endGame");
const players = document.querySelectorAll(".playername");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const table = document.getElementById("set");
const tab = document.querySelectorAll(".tab");
const form = document.querySelectorAll(".choose");

const scoreX = document.createElement("p");
const scoreO = document.createElement("p");
const np1 = document.createElement("p");
const np2 = document.createElement("p");
const rounds = document.createElement("p");
const holderX = document.createElement("p");
const holderO = document.createElement("p");

let pointsx = 0;
let pointso = 0;
let round = 0;
let validPlayers = 0;
let clicks = 0;
let imgClicked;
let p = "x";
let matrix = ["t", "t", "t", "t", "t", "t", "t", "t", "t"];
let imagesBlocked = 0;

endGame.disabled = true;
newRound.disabled = true;

startBtn.addEventListener("click", function (ev) {
  ev.preventDefault();

  const p1 = inputNameP1.value.toLowerCase();
  const p2 = inputNameP2.value.toLowerCase();

  if (
    p1 !== "" &&
    p2 !== "" &&
    table.classList.contains("inactive") &&
    validPlayers == 0
  ) {
    p = "x";
    pointsx = 0;
    pointso = 0;
    clicks = 0;
    validPlayers = 1;
    addRounds();
    matrix = ["t", "t", "t", "t", "t", "t", "t", "t", "t"];

    inputNameP1.value = "";
    inputNameP2.value = "";

    holderX.id = "holderX";
    holderX.innerText = "X";
    scoreX.id = "scoreX";
    scoreX.innerText = pointsx;
    np1.innerText = p1;
    np1.id = "nameX";
    np1.classList.add("playername");
    score1.append(holderX, scoreX, np1);

    holderO.id = "holderX";
    holderO.innerText = "O";
    scoreO.id = "scoreO";
    scoreO.innerText = pointso;
    np2.innerText = p2;
    np2.id = "nameO";
    np2.classList.add("playername");
    score2.append(holderO, scoreO, np2);

    tab.forEach(function (row) {
      row.src = "sqr.png";
    });

    tab.forEach(function (img) {
      img.classList.add("hovering");
    });

    score1.classList.add("HLP");
    table.classList.remove("inactive");
    table.classList.add("active");

    startBtn.disabled = true;
    inputNameP1.disabled = true;
    inputNameP2.disabled = true;
    endGame.disabled = false;
    newRound.disabled = true;
  }
});

function addRounds() {
  round++;
  rounds.innerHTML = "Partida: " + round;
  rounds.id = "rounds";
  body.appendChild(rounds);
}

newRound.addEventListener("click", function () {
  if (table.classList.contains("inactive") && validPlayers == 1) {
    p = "x";
    clicks = 0;
    matrix = ["t", "t", "t", "t", "t", "t", "t", "t", "t"];
    addRounds();
    imagesBlocked = 0;

    tab.forEach(function (img) {
      img.src = "sqr.png";
    });

    tab.forEach(function (img) {
      img.classList.add("hovering");
    });

    score1.classList.add("HLP");
    score2.classList.remove("HLP");
    score1.classList.remove("won");
    score2.classList.remove("won");
    table.classList.remove("inactive");
    table.classList.add("active");
  }
});

tab.forEach((tab) => {
  tab.addEventListener("click", function () {
    imgClicked = this;

    if (imgClicked.src.includes("sqr.png") && imagesBlocked == 0) {
      imgClicked.classList.remove("hovering");
      if (p === "x") {
        imgClicked.src = "x.png";
        score1.classList.remove("HLP");
        score2.classList.add("HLP");
        scoreMatrix(imgClicked.id, p);
        p = "o";
        clicks++;
        if (clicks == 9) {
          score2.classList.remove("HLP");
          setTimeout(draw, 200);
        }
      } else {
        imgClicked.src = "o.png";
        score2.classList.remove("HLP");
        score1.classList.add("HLP");
        scoreMatrix(imgClicked.id, p);
        p = "x";
        clicks++;
      }
    }
  });
});

/*function scoreMatrix(pos, p) {
  matrix[pos - 1] = p;
  if (
    (matrix[0] == "x" && matrix[1] == "x" && matrix[2] == "x") ||
    (matrix[3] == "x" && matrix[4] == "x" && matrix[5] == "x") ||
    (matrix[6] == "x" && matrix[7] == "x" && matrix[8] == "x") ||
    (matrix[0] == "o" && matrix[1] == "o" && matrix[2] == "o") ||
    (matrix[3] == "o" && matrix[4] == "o" && matrix[5] == "o") ||
    (matrix[6] == "o" && matrix[7] == "o" && matrix[8] == "o") ||
    (matrix[0] == "x" && matrix[3] == "x" && matrix[6] == "x") ||
    (matrix[1] == "x" && matrix[4] == "x" && matrix[7] == "x") ||
    (matrix[2] == "x" && matrix[5] == "x" && matrix[8] == "x") ||
    (matrix[0] == "o" && matrix[3] == "o" && matrix[6] == "o") ||
    (matrix[1] == "o" && matrix[4] == "o" && matrix[7] == "o") ||
    (matrix[2] == "o" && matrix[5] == "o" && matrix[8] == "o") ||
    (matrix[0] == "x" && matrix[4] == "x" && matrix[8] == "x") ||
    (matrix[2] == "x" && matrix[4] == "x" && matrix[6] == "x") ||
    (matrix[0] == "o" && matrix[4] == "o" && matrix[8] == "o") ||
    (matrix[2] == "o" && matrix[4] == "o" && matrix[6] == "o")
  ) {
    winner();
  }
}*/
function scoreMatrix(pos, p) {
  matrix[pos - 1] = p;
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (matrix[a] === p && matrix[b] === p && matrix[c] === p) {
      winner();
      return;
    }
  }
}

function winner() {
  table.classList.add("inactive");
  newRound.disabled = false;
  imagesBlocked = 1;

  //markLine();

  tab.forEach(function (img) {
    if (img.src.endsWith("x.png") && p == "x") {
      img.src = "xw.png";
      score1.classList.add("won");
    }
    if (img.src.endsWith("o.png") && p == "o") {
      img.src = "ow.png";
      score2.classList.add("won");
    }
    img.classList.remove("hovering");
    //img.classList.add("inactive");
  });

  if (p == "x") {
    pointsx++;
    score2.classList.remove("HLP");
  }
  if (p == "o") {
    pointso++;
    score1.classList.remove("HLP");
  }
  scoreX.innerText = pointsx;
  scoreO.innerText = pointso;
}

function draw() {
  clicks = 0;
  imagesBlocked = 1;
  newRound.disabled = false;

  table.classList.remove("active");
  table.classList.add("inactive");
  score1.classList.add("HLP");
  score2.classList.add("HLP");

  tab.forEach(function (img) {
    if (img.src.endsWith("x.png")) {
      img.src = "xdraw.png";
    }
    if (img.src.endsWith("o.png")) {
      img.src = "odraw.png";
    }
  });
}

endGame.addEventListener("click", function () {
  validPlayers = 0;
  round = 0;
  clicks = 0;
  pointsx = 0;
  pointso = 0;
  imagesBlocked = 0;

  table.classList.remove("active");
  table.classList.add("inactive");
  score1.classList.remove("HLP");
  score2.classList.remove("HLP");
  score1.classList.remove("won");
  score2.classList.remove("won");

  rounds.innerText = "";
  holderX.innerText = "";
  holderO.innerText = "";
  scoreX.innerText = "";
  scoreO.innerText = "";
  np1.innerText = "";
  np2.innerText = "";

  startBtn.disabled = false;
  inputNameP1.disabled = false;
  inputNameP2.disabled = false;
  endGame.disabled = true;
  newRound.disabled = true;

  tab.forEach(function (row) {
    row.src = "gray.png";
  });

  tab.forEach(function (img) {
    img.classList.remove("hovering");
  });
});
