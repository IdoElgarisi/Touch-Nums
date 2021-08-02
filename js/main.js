'use strict'

var gNums = [];
var gBoardLength;
var tableCount = 0;
var counter = 1;
var gNextNum = document.querySelector('.nextNum span');

function init() {
    createModalBoard();
    renderBoard();
    gNextNum.innerHTML = counter;
    // counter=1;
}
// restart The Game
function restartGame() {
    counter = 1;
    init();
    getModalNums(gBoardLength);
}
function start() {

    var elBoard = document.querySelector('.board');
    elBoard.style.display = 'block';
    document.querySelector('.level').style.display = 'block';
    restartGame()


}

function cellClicked(clickedCell) {
    var elCell = clickedCell;
    var cell = document.querySelector('.cell');
    var board = document.querySelector('td');
    var currNum = parseInt(clickedCell.innerText);
    if (currNum === 1) startTimer();
    if (currNum === counter) {
        counter++
        gNextNum.innerHTML = counter;
        elCell.style.backgroundColor = 'rgb(91, 88, 255)';
        console.log(currNum)
        console.log(counter)
    } else {
        counter = 1;
        cell.style.backgroundColor = 'rgb(223, 156, 31)';
        // alert('Wrong');
        stopTimer()
        init();
        getModalNums(gBoardLength);
        
    }
    checkIfFinished();

}
function checkIfFinished() {
    if (counter === gBoardLength+1) {
        stopTimer()
        var strHtml = ` <div class="head">
        <h1 class="header">Congrats! </h1>
        <button class = "restart" onclick = "restartGame()"> Restart Game</button>
        </div>`;
        var newStr = document.querySelector('.board')
        newStr.innerHTML = strHtml;
    }
}

// create modal board
function createModalBoard() {
    shuffle(gNums);
}
//render board to the DOM
function renderBoard() {
    var strHTML = '';
    var tableSize = Math.sqrt(gNums.length);
    for (var i = 0; i < tableSize; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < tableSize; j++) {
            strHTML += `<td class="cell" onclick="cellClicked(this)">${gNums.pop()}</td>`;
        }
        strHTML += '<tr>';
    }
    document.querySelector('.board').innerHTML = strHTML;
}
// fillBoard(16);
function getModalNums(num) {
    stopTimer();
    counter=1;
    gBoardLength=num;
    gNextNum.innerHTML = counter;
    for (var i = 1; i <= num; i++) {
        gNums.push(i);
        tableCount++;
    }
    createModalBoard();
    renderBoard();
    var elBoard = document.querySelector('.board');
    elBoard.style.display = 'block';
    document.querySelector('.level').style.display = 'none';
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(items.length);
        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInt(max) {
    var min = 1;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Timer
var time1 = Date.now();
var myTime;
function startTimer() {
    time1 = Date.now();
    myTime = setInterval(timeCycle, 1);
}
function timeCycle() {
    var time2 = Date.now();
    var msTimeDiff = time2 - time1;
    var timeDiffStr = new Date(msTimeDiff).toISOString().slice(17, -1);
    document.querySelector('.stopwatch  span').innerHTML = timeDiffStr;
}
function stopTimer() {
    clearInterval(myTime);
    var finishTime = document.querySelector('.stopwatch span').innerHTML;
    // alert('Done at: ' + finishTime);
}