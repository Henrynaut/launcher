//Written by Neil McHenry on June 7th, 2018

const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({});
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    // Quite app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// Handle create add window
function createAddWindow(){
    // Create new window
    addnWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title:'Add Package to List'
    });
    // Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    // Garbage collection handle
    addwindow.on('close', function(){
        addWindow = null;
    });
}

// Create menu template
const mainMenuTemplate = [
    {
        //Creates a menu called File
        label:'File',
        //add a submenu to the menu
        submenu:[
            {
                label: 'Add System',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Systems'
            },
            {
                label: 'Quit',
                //Checks which platform user is on and adds hotkey to menu
                accelerator: process.platform == 'darwin' ? 'Command+Q' :
                'Ctrl+Q',
                click(){
                    //Quits the application on click or hotkey press
                    app.quit();
                }
            }
        ]
    }
];

// If mac, add empty object to menu so that File isn't replaced with Electron
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}
