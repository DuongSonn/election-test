// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    BrowserView,
    ipcMain,
    dialog,
    Menu
} = require('electron')
const path = require('path');
const { template } = require('./menu');
var answers = [];
var timer = 60 * 15;

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'views/begin/index.html'))

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    const view = new BrowserView()
    mainWindow.setBrowserView(view)
    view.setBounds({ x: 0, y: 0, width: 800, height: 100 })
    view.webContents.loadFile(path.join(__dirname, 'views/index.html'))

    ipcMain.on('answer', (event, args) => {
        if (args.id === 1 && args.value === 1) {
            answers[args.id-1] = {
                value: args.value,
                message: 'correct'
            }

            dialog.showMessageBoxSync(mainWindow, {
                message: 'correct',
                icon: path.join(__dirname, 'images/correct.jpg')
            });
            event.reply('reply', {
                message: 'correct',
                id: args.id,
                value: args.value
            });
        } else if (args.id === 2 && args.value === 2) {
            answers[args.id-1] = {
                value: args.value,
                message: 'correct'
            }

            dialog.showMessageBoxSync(mainWindow, {
                message: 'correct',
                icon: path.join(__dirname, 'images/correct.jpg')
            });
            event.reply('reply', {
                message: 'correct',
                id: args.id,
                value: args.value
            });
        } else {
            answers[args.id-1] = {
                value: args.value,
                message: 'wrong'
            }

            dialog.showMessageBoxSync(mainWindow, {
                message: 'wrong',
                type: 'error'
            });
            event.reply('reply', {
                message: 'wrong',
                value: args.value,
                id: args.id
            });
        }
    });

    ipcMain.on('load', (event, args) => {
        if (args.id) {
            var answer;
            if (answers[args.id -1]) {
                answer = answers[args.id -1]
            }

            let minutes = parseInt(timer / 60, 10);
            let seconds = parseInt(timer % 60, 10);
        
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
        
            let display = `${minutes}:${seconds}`;

            event.reply('load', {
                answer: answer,
                timer: timer,
                display: display
            });
        }
    });

    ipcMain.on('close', (event, args) => {
        if (args.timer) timer = args.timer
    })

    ipcMain.on('end', (event, args) => {
        if (answers.length >= 2) {
            let end = true
            for (let index = 0; index < 2; index++) {
                const element = answers[index];
                if (!element) {
                    end = false
                }
            }

            if (end) {
                dialog.showMessageBoxSync(mainWindow, {
                    message: 'You have finished your test!',
                    type: 'info'
                });
            }
        }
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.