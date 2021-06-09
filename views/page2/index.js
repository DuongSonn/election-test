const {
    ipcRenderer
} = require('electron')

document.getElementById('answer-1').onclick = () => {
    ipcRenderer.send('answer', {
        value: 1,
        id: 2,
    })
}
document.getElementById('answer-2').onclick = () => {
    ipcRenderer.send('answer', {
        value: 2,
        id: 2,
    })
}
document.getElementById('answer-3').onclick = () => {
    ipcRenderer.send('answer', {
        value: 3,
        id: 2,
    })
}
document.getElementById('answer-4').onclick = () => {
    ipcRenderer.send('answer', {
        value: 4,
        id: 2,
    })
}

window.onload = () => {
    ipcRenderer.send('load', {
        id: 2
    });
}

document.getElementsByClassName('next-btn')[0].onclick = () => {
    ipcRenderer.send('end');
}