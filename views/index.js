var time;
var timeDisplay;
const {
    ipcRenderer
} = require('electron')


window.onload = () => {
    time = 60 * 15;
    timeDisplay = document.getElementById('timer');
}

function startTimer(duration, display) {
    var timer = duration;
    var minutes;
    var seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

// document.getElementById('begin').onclick = () => {
//     var content = document.getElementById('content');
//     content.innerHTML = "";
//     content.innerHTML = '<object type="text/html" data="./page1/index.html" width="500" height="500"></object>';

//     timeDisplay.innerHTML = "15:00"
//     timeDisplay.style.float = "right"
//     startTimer(time, timeDisplay)
// }

