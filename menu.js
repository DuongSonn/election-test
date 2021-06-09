const {
    app,
} = require('electron')

const isMac = process.platform === 'darwin'

exports.template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [{
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                role: 'services'
            },
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            }
        ]
    }] : []),
    // { role: 'fileMenu' }
    {
        label: 'File',
        submenu: [
            isMac ? {
                role: 'close'
            } : {
                role: 'quit'
            }
        ]
    },
]