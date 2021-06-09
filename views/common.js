var timer;

ipcRenderer.on('load', (event, args) => {
    if (args.timer) {
        let timerDisplay = document.getElementById('timer');
        timerDisplay.style.float = 'right';
        timerDisplay.textContent = args.display;
        startTimer(args.timer, timerDisplay);
    }

    if (args.answer) {
        let radio = document.getElementById(`answer-${args.answer.value}`)
        if (radio) {
            radio.checked = true
            if (args.answer.message === 'correct') {
                radio.parentElement.childNodes[3].style.color = 'green'
                for (let index = 1; index <= 4; index++) {
                    document.getElementById(`answer-${index}`).disabled = true;
                }
            } else {
                radio.parentElement.childNodes[3].style.color = 'red'
            }
        }
    }
});

window.onunload = () => {
    ipcRenderer.send('close', {
        timer: timer
    })
}

function startTimer(duration, display) {
    timer = duration;
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

function displayTimer(duration, display) {
    minutes = parseInt(duration / 60, 10);
    seconds = parseInt(duration % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
}

ipcRenderer.on('reply', (event, args) => {
    for (let index = 1; index <= 4; index++) {
        if (index === args.value) {
            if (args.message === 'correct') {
                document.getElementById(`answer-${args.value}`).parentElement.childNodes[3].style.color = 'green'   
                if (args.id !== 2) {
                    window.location.href = `../page${args.id + 1}/index.html`
                } else {
                    ipcRenderer.send('end')
                }
            } else {
                document.getElementById(`answer-${index}`).parentElement.childNodes[3].style.color = 'red'
            }
        } else {
            document.getElementById(`answer-${index}`).parentElement.childNodes[3].style.color = 'black'
        }
    }
})